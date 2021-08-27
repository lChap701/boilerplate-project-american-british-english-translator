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
        if (british.match(regex)) british = british.replace(regex, word);
      } else if (british.split(/\W/).indexOf(key) > -1) {
        british = british.replace(regex, word);
      }
    }

    // Changes American English spelling to British English spelling
    for (const [key, word] of Object.entries(americanToBritishSpelling))
      if (british.split(/\W/).indexOf(key) > -1)
        british = british.replace(new RegExp(key, "g"), word);

    // Changes American English titles to British English titles
    for (const [key, word] of Object.entries(americanToBritishTitles)) {
      let chars = british.split(/\s/);
      let index = british.toLowerCase().split(/\s/).indexOf(key);

      if (index > -1) {
        if (chars[index][0] === chars[index][0].toUpperCase()) {
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
    return;
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
