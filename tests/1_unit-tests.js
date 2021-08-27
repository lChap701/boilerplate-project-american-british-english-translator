const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");

suite("Unit Tests", () => {
  /* My tests */
  suite("American to British Tests", () => {
    test("1)   Mangoes are my favorite fruit.", () => {
      let translated = Translator.prototype.inBritish(
        "Mangoes are my favorite fruit."
      );

      assert.equal(
        translated,
        "Mangoes are my favourite fruit.",
        `should have returned 'Mangoes are my favourite fruit.', not '${translated}'`
      );
    });

    test("2)   I ate yoghurt for breakfast.", () => {
      let translated = Translator.prototype.inBritish(
        "I ate yogurt for breakfast."
      );

      assert.equal(
        translated,
        "I ate yoghurt for breakfast.",
        `should have returned 'I ate yoghurt for breakfast.', not '${translated}'`
      );
    });

    test("3)   We had a party at my friend's condo.", () => {
      let translated = Translator.prototype.inBritish(
        "We had a party at my friend's condo."
      );

      assert.equal(
        translated,
        "We had a party at my friend's flat.",
        `should have returned 'We had a party at my friend's flat.', not '${translated}'`
      );
    });

    test("4)   Can you toss this in the trashcan for me?", () => {
      let translated = Translator.prototype.inBritish(
        "Can you toss this in the trashcan for me?"
      );

      assert.equal(
        translated,
        "Can you toss this in the bin for me?",
        `'Can you toss this in the bin for me?' should be returned, not '${translated}'`
      );
    });

    test("5)   The parking lot was full.", () => {
      let translated = Translator.prototype.inBritish(
        "The parking lot was full."
      );

      assert.equal(
        translated,
        "The car park was full.",
        `'The car park was full.' should be returned, not '${translated}'`
      );
    });

    test("6)   Like a high tech Rube Goldberg machine.", () => {
      let translated = Translator.prototype.inBritish(
        "Like a high tech Rube Goldberg machine."
      );

      assert.equal(
        translated,
        "Everything looks good to me!",
        `'Everything looks good to me!' should be returned, not '${translated}'`
      );
    });

    test("7)   To play hooky means to skip class or work.", () => {
      let translated = Translator.prototype.inBritish(
        "To play hooky means to skip class or work."
      );

      assert.equal(
        translated,
        "To bunk off means to skip class or work.",
        `'To bunk off means to skip class or work.' should be returned, not '${translated}'`
      );
    });

    test("8)   No Mr. Bond, I expect you to die.", () => {
      let translated = Translator.prototype.inBritish(
        "No Mr. Bond, I expect you to die."
      );

      assert.equal(
        translated,
        "No Mr Bond, I expect you to die.",
        `'No Mr Bond, I expect you to die.' should be returned, not '${translated}'`
      );
    });

    test("9)   Dr. Grosh will see you now.", () => {
      let translated = Translator.prototype.inBritish(
        "Dr. Grosh will see you now."
      );

      assert.equal(
        translated,
        "Dr Grosh will see you now.",
        `'Dr Grosh will see you now.' should be returned, not '${translated}'`
      );
    });

    test("10)  Lunch is at 12:15 today.", () => {
      let translated = Translator.prototype.inBritish(
        "Lunch is at 12:15 today."
      );

      assert.equal(
        translated,
        "Lunch is at 12.15 today.",
        `'Lunch is at 12.15 today.' should be returned, not '${translated}'`
      );
    });
  });
});
