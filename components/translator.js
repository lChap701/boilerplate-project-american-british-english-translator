const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

const badWords = require("bad-words");
let cursing = new badWords();
cursing.removeWords("ass", "Nazi", "Nazis", "dick");

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

    if (british.match(/\d+:\d+/)) british = british.replace(/:/g, ".");

    // Translates American English only words
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

    if (american.match(/\d+\.\d+/)) american = american.replace(/\./g, ":");

    // Translates American English only words
    for (const [key, word] of Object.entries(britishOnly)) {
      let regex = new RegExp(key, "g");
      /* let cnt = this.duplicateValueCheck(word, britishOnly);

      if (cnt > 1) {
        console.log(word + ": " + cnt);
      } */

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

  duplicateValueCheck(value, obj) {
    let values = Object.values(obj);
    let dupsCnt = values.reduce((dups, o2) => {
      if (value == o2) ++dups;
      return dups;
    }, 0);
    return dupsCnt;
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
    if (word[0] == word[0].toUpperCase()) {
      let old = change[0].toUpperCase() + change.slice(1);
      let ne = replacement[0].toUpperCase() + replacement.slice(1);
      return sentence.replace(new RegExp(old, "g"), ne);
    }

    if (word == word.toUpperCase()) {
      let old = change.toUpperCase();
      let ne = replacement.toUpperCase();
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
}

module.exports = Translator;
