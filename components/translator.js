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

      if (key.includes(" ")) {
        if (british.toLowerCase().match(regex)) {
          let match = british.match(new RegExp(key, "gi"))[0];

          if (this.isCapitalized(match)) {
            let old = key[0].toUpperCase() + key.slice(1);
            let ne = word[0].toUpperCase() + word.slice(1);
            british = british.replace(new RegExp(old, "g"), ne);
          } else {
            british = british.replace(regex, word);
          }
        }
      } else {
        let words = british.split(/\W/);
        let index = british.toLowerCase().split(/\W/).indexOf(key);

        if (index > -1) {
          if (this.isCapitalized(words[index])) {
            let old = key[0].toUpperCase() + key.slice(1);
            let ne = word[0].toUpperCase() + word.slice(1);
            british = british.replace(new RegExp(old, "g"), ne);
          } else {
            british = british.replace(new RegExp(key, "g"), word);
          }
        }
      }
    }

    // Changes American English spelling to British English spelling
    for (const [key, word] of Object.entries(americanToBritishSpelling)) {
      let words = british.split(/\W/);
      let index = british.toLowerCase().split(/\W/).indexOf(key);

      if (index > -1) {
        if (this.isCapitalized(words[index])) {
          let old = key[0].toUpperCase() + key.slice(1);
          let ne = word[0].toUpperCase() + word.slice(1);
          british = british.replace(new RegExp(old, "g"), ne);
        } else {
          british = british.replace(new RegExp(key, "g"), word);
        }
      }
    }

    // Changes American English titles to British English titles
    for (const [key, word] of Object.entries(americanToBritishTitles)) {
      let words = british.split(/\s/);
      let index = british.toLowerCase().split(/\s/).indexOf(key);

      if (index > -1) {
        if (this.isCapitalized(words[index])) {
          let old = key[0].toUpperCase() + key.slice(1);
          let ne = word[0].toUpperCase() + word.slice(1);
          british = british.replace(new RegExp(old, "g"), ne);
        } else {
          british = british.replace(new RegExp(key, "g"), word);
        }
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
    let matches = [];

    if (american.match(/\d+\.\d+/)) american = american.replace(/\./g, ":");

    // Translates American English only words
    for (const [key, word] of Object.entries(britishOnly)) {
      let regex = new RegExp(key, "g");

      if (key.includes(" ") || word.includes("-")) {
        if (matches.length == 0 || matches[0] !== word) {
          if (american.toLowerCase().match(regex)) {
            let match = american.match(new RegExp(key, "gi"))[0];

            if (this.isCapitalized(match)) {
              let old = key[0].toUpperCase() + key.slice(1);
              let ne = word[0].toUpperCase() + word.slice(1);
              american = american.replace(new RegExp(old, "g"), ne);
            } else {
              american = american.replace(regex, word);
            }

            matches.push(word);
          }
        }
      } else {
        let words = american.split(/\W/);
        let index = american.toLowerCase().split(/[\W]/).indexOf(key);

        if (index > -1) {
          if (this.isCapitalized(words[index])) {
            let old = key[0].toUpperCase() + key.slice(1);
            let ne = word[0].toUpperCase() + word.slice(1);
            american = american.replace(new RegExp(old, "g"), ne);
          } else {
            american = american.replace(new RegExp(key, "g"), word);
          }
        }
      }
    }

    // Changes American English spelling to British English spelling
    for (const [key, word] of Object.entries(americanToBritishSpelling)) {
      let words = american.split(/\W/);
      let index = american.toLowerCase().split(/\W/).indexOf(word);

      if (index > -1) {
        if (this.isCapitalized(words[index])) {
          let old = word[0].toUpperCase() + word.slice(1);
          let ne = key[0].toUpperCase() + key.slice(1);
          american = american.replace(new RegExp(old, "g"), ne);
        } else {
          american = american.replace(new RegExp(word, "g"), key);
        }
      }
    }

    // Changes American English titles to British English titles
    for (const [key, word] of Object.entries(americanToBritishTitles)) {
      let words = american.split(/\s/);
      let index = american.toLowerCase().split(/\s/).indexOf(word);

      if (index > -1) {
        if (this.isCapitalized(words[index])) {
          let old = word[0].toUpperCase() + word.slice(1) + " ";
          let ne = key[0].toUpperCase() + key.slice(1) + " ";
          american = american.replace(new RegExp(old, "g"), ne);
        } else {
          american = american.replace(new RegExp(word + " ", "g"), key + " ");
        }
      }
    }

    return american === sentence
      ? "Everything looks good to me!"
      : this.cleanCurseWords(american);
  }

  /**
   * Checks if a word is capitalized
   * @param {String} word
   *
   * @returns Returns a boolean value to determine if the word should be capitalized
   */
  isCapitalized(word) {
    return word[0] == word[0].toUpperCase();
  }

  /**
   * Checks if the words is in all caps
   * @param {String} word
   *
   * @returns Returns a boolean value to determine if the word is in all caps
   */
  isAllCaps(word) {
    return word == word.toUpperCase();
  }

  /**
   * Checks for curse words in a sentence and censors them
   * @param {String} sentence   Represents the sentence to attempt to translate
   *
   * @returns Returns the censored sentence
   */
  cleanCurseWords(sentence) {
    let cleaned = sentence;

    if (cursing.isProfane(sentence)) cleaned = cursing.clean(sentence);

    return cleaned;
  }
}

module.exports = Translator;
