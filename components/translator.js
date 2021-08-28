const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

const badWords = require("bad-words");
let cursing = new badWords();
cursing.removeWords(
  "ass",
  "Nazi",
  "Nazis",
  "dick",
  "fanny",
  "pussy",
  "God",
  "hell"
);

cursing.addWords(
  "arsehole",
  "yiff",
  "yiffing",
  "bint",
  "dickheads",
  "dickhead",
  "munter",
  "pish",
  "damnit",
  "dammit"
);

/**
 * Module that translates American and British words
 * @module ./components/translator
 *
 */
class Translator {
  /**
   * Translates sentence to British English
   * @param {String} sentence   Represents the sentence to attempt to translate
   *
   * @returns Returns the translated sentence
   */
  inBritish(sentence) {
    let british = sentence;

    if (british.match(/\d{1,2}:\d{2}/)) {
      let match = british.match(/\d{1,2}:\d{2}/)[0];
      let newVal = match.replace(/:/, ".");
      british = british.replace(new RegExp(match, "g"), newVal);
    }

    // Translates American English words to British English
    for (const [key, word] of Object.entries(americanOnly)) {
      let regex = new RegExp(key, "g");

      if (british.toLowerCase().match(regex)) {
        let match = british.match(new RegExp(key, "gi"))[0];

        if (!key.includes(" ") && !key.includes("-")) {
          let res = british.split(/\W/).filter((b) => b == match);

          if (res.length == 1) {
            british = this.checkCasing(british, res[0], key, word);
          }
        } else {
          british = this.checkCasing(british, match, key, word);
        }
      }
    }

    // Changes American English spelling to British English spelling
    for (const [key, word] of Object.entries(americanToBritishSpelling)) {
      let words = british.split(/\W/);
      let index = british.toLowerCase().split(/\W/).indexOf(key);

      if (index > -1) {
        british = this.checkCasing(british, words[index], key, word);
      }
    }

    // Changes American English titles to British English titles
    for (const [key, word] of Object.entries(americanToBritishTitles)) {
      let words = british.split(/\s/);
      let index = british.toLowerCase().split(/\s/).indexOf(key);

      if (index > -1) {
        british = this.checkCasing(british, words[index], key, word);
      }
    }

    return british === sentence
      ? "Everything looks good to me!"
      : this.cleanCurseWords(british);
  }

  /**
   * Translates sentence to American English
   * @param {String} sentence   Represents the sentence to attempt to translate
   *
   * @returns Returns the translated sentence
   */
  inAmerican(sentence) {
    let american = sentence;
    let translations = [];

    if (american.match(/\d{1,2}\.\d{2}/)) {
      let match = american.match(/\d{1,2}\.\d{2}/)[0];
      let newVal = match.replace(/\./, ":");
      american = american.replace(new RegExp(match, "g"), newVal);
    }

    // Translates British English words to American English
    for (const [key, word] of Object.entries(britishOnly)) {
      let regex = new RegExp(key, "g");

      if (
        american.toLowerCase().match(regex) &&
        this.notTranslated(word, translations)
      ) {
        let match = american.match(new RegExp(key, "gi"))[0];

        if (!key.includes(" ") && !key.includes("-")) {
          let res = american.split(/\W/).filter((b) => b == match);

          if (res.length == 1) {
            american = this.checkCasing(american, res[0], key, word);
          }
        } else {
          american = this.checkCasing(american, match, key, word);
        }

        translations.push(word);
      }
    }

    // Changes American English spelling to British English spelling
    for (const [key, word] of Object.entries(americanToBritishSpelling)) {
      let words = american.split(/\W/);
      let index = american.toLowerCase().split(/\W/).indexOf(word);

      if (index > -1) {
        american = this.checkCasing(american, words[index], word, key);
      }
    }

    // Changes American English titles to British English titles
    for (const [key, word] of Object.entries(americanToBritishTitles)) {
      let words = american.split(/\s/);
      let index = american.toLowerCase().split(/\s/).indexOf(word);

      if (index > -1) {
        american = this.checkCasing(american, words[index], word, key);
      }
    }

    return american === sentence
      ? "Everything looks good to me!"
      : this.cleanCurseWords(american);
  }

  /**
   * Checks if a word has already been translated
   * @param {String} word           Represents the word to check for
   * @param {String[]} transWords   Represents the array of translated words
   *
   * @returns Returns a boolean value to determine if the word has been translated
   */
  notTranslated(word, transWords) {
    for (let i = 0; i < transWords.length; i++) {
      if (transWords[i] == word) return false;
    }

    return true;
  }

  /**
   * Checks the casing of a word/phrase to preserve the casing of the sentence with it's replacement
   * @param {String} sentence       Represents the sentence to update
   * @param {String} word           Represents the word/phrase to check
   * @param {String} change         Represents the word to change
   * @param {String} replacement    Represents the word that will replace the old one
   *
   * @returns Returns a new sentence
   */
  checkCasing(sentence, word, change, replacement) {
    if (word == word.toUpperCase()) {
      let old = change.toUpperCase();
      let ne = replacement.toUpperCase();
      return sentence.replace(new RegExp(old, "g"), ne);
    }

    if (word[0] == word[0].toUpperCase()) {
      let old = change[0].toUpperCase() + change.slice(1);
      let ne = replacement[0].toUpperCase() + replacement.slice(1);
      return sentence.replace(new RegExp(old, "g"), ne);
    }

    return sentence.replace(new RegExp(change, "g"), replacement);
  }

  /**
   * Checks for curse words in a sentence and censors them
   * @param {String} sentence   Represents the sentence to attempt to translate
   *
   * @returns Returns the censored sentence
   */
  cleanCurseWords(sentence) {
    if (cursing.isProfane(sentence)) return cursing.clean(sentence);
    return sentence;
  }

  /**
   * Highlights the translated words in a sentence using the <span> element
   * @param {String} words    Represents the sentence that was translated
   * @param {String} type     Represents the type of English the sentence is in
   *
   * @returns Returns the translated words wrapped in <span> tags
   */
  highlighter(words, type = "american-to-british") {
    let transWords = [];

    if (type == "british-to-american") {
      if (words.match(/\d{1,2}:\d{2}/)) {
        let match = words.match(/\d{1,2}:\d{2}/)[0];
        transWords.push(match);
        words.replace(new RegExp(match, "g"), "");
      }

      // Checks for American versions of British only words
      for (const [key] of Object.entries(americanOnly)) {
        let translation = this.findTranslation(words, key);

        if (translation) {
          transWords.push(translation);
          words = words.replace(new RegExp(key, "gi"), "");
        }
      }

      // Checks for American spellings of words
      for (const [key] of Object.entries(americanToBritishSpelling)) {
        let translation = this.findTranslation(words, key);

        if (translation) {
          transWords.push(translation);
          words = words.replace(new RegExp(key, "gi"), "");
        }
      }

      // Checks for American titles
      for (const [key] of Object.entries(americanToBritishTitles)) {
        let wordsArr = words.split(/\s/);
        let index = words.toLowerCase().split(/\s/).indexOf(key);

        if (index > -1) {
          transWords.push(this.getCase(wordsArr[index], key));
          words = words.replace(new RegExp(key, "gi"), "");
        }
      }
    } else {
      if (words.match(/\d{1,2}\.\d{2}/)) {
        let match = words.match(/\d{1,2}\.\d{2}/)[0];
        transWords.push(match);
        words.replace(new RegExp(match, "g"), "");
      }

      // Checks for British versions of American only words
      for (const [key] of Object.entries(britishOnly)) {
        let translation = this.findTranslation(words, key);

        if (translation) {
          transWords.push(translation);
          words = words.replace(new RegExp(key, "gi"), "");
        }
      }

      // Checks for British spellings of words
      for (const [key, word] of Object.entries(americanToBritishSpelling)) {
        let translation = this.findTranslation(words, word);

        if (translation) {
          transWords.push(translation);
          words = words.replace(new RegExp(word, "gi"), "");
        }
      }

      // Checks for British titles
      for (const [key, word] of Object.entries(americanToBritishTitles)) {
        let wordsArr = words.split(/\s/);
        let index = words.toLowerCase().split(/\s/).indexOf(word);

        if (index > -1) {
          transWords.push(this.getCase(wordsArr[index], word));
          words = words.replace(new RegExp(word, "gi"), "");
        }
      }
    }

    return transWords.map((t) => `<span class="highlight">${t}</span>`);
  }

  /**
   * Checks if a translated word is in a sentence
   * @param {String} words    Represents the sentence
   * @param {String} word     Represents the translated word
   *
   * @returns Returns the translation or null
   */
  findTranslation(words, word) {
    if (words.toLowerCase().match(new RegExp(word, "g"))) {
      let match = words.match(new RegExp(word, "gi"))[0];

      if (!word.includes(" ") && !word.includes("-")) {
        let res = words.split(/\W/).filter((w) => w == match);
        if (res.length == 1) return this.getCase(res[0], word);
      } else {
        return this.getCase(match, word);
      }
    }

    return null;
  }

  /**
   * Gets the case (upper, lower, capitalized) the translated word should be in
   * @param {String} word   Represents the word to check the casing of
   * @param {String} org    The original value to change and/or return
   *
   * @returns Returns the translated word with the correct case
   */
  getCase(word, org) {
    if (word == word.toUpperCase()) return org.toUpperCase();

    if (word[0] == word[0].toUpperCase()) {
      return org[0].toUpperCase() + org.slice(1);
    }

    return org;
  }
}

module.exports = Translator;
