const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");

suite("Unit Tests", () => {
  /* My tests */
  suite("American English to British English Tests", () => {
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

  suite("British English to American English Tests", () => {
    test("1)   We watched the footie match for a while.", () => {
      let translated = Translator.prototype.inAmerican(
        "We watched the footie match for a while."
      );

      assert.equal(
        translated,
        "We watched the soccer match for a while.",
        `'We watched the soccer match for a while.' should be returned, not '${translated}'`
      );
    });

    test("2)   Paracetamol takes up to an hour to work.", () => {
      let translated = Translator.prototype.inAmerican(
        "Paracetamol takes up to an hour to work."
      );

      assert.equal(
        translated,
        "Tylenol takes up to an hour to work.",
        `'Tylenol takes up to an hour to work.' should be returned, not '${translated}'`
      );
    });

    test("3)   First, caramelise the onions.", () => {
      let translated = Translator.prototype.inAmerican(
        "First, caramelise the onions."
      );

      assert.equal(
        translated,
        "First, caramelize the onions.",
        `'First, caramelize the onions.' should be returned, not '${translated}'`
      );
    });

    test("4)   I spent the bank holiday at the funfair.", () => {
      let translated = Translator.prototype.inAmerican(
        "I spent the bank holiday at the funfair."
      );

      assert.equal(
        translated,
        "I spent the public holiday at the carnival.",
        `'I spent the public holiday at the carnival.' should be returned, not '${translated}'`
      );
    });

    test("5)   I had a bicky then went to the chippy.", () => {
      let translated = Translator.prototype.inAmerican(
        "I had a bicky then went to the chippy."
      );

      assert.equal(
        translated,
        "I had a cookie then went to the fish-and-chip shop.",
        `'I had a cookie then went to the fish-and-chip shop.' should be returned, not '${translated}'`
      );
    });

    test("6)   I've just got bits and bobs in my bum bag.", () => {
      let translated = Translator.prototype.inAmerican(
        "I've just got bits and bobs in my bum bag."
      );

      assert.equal(
        translated,
        "I've just got odds and ends in my fanny pack.",
        `'I've just got odds and ends in my fanny pack.' should be returned, not '${translated}'`
      );
    });

    test("7)   The car boot sale at Boxted Airfield was called off.", () => {
      let translated = Translator.prototype.inAmerican(
        "The car boot sale at Boxted Airfield was called off."
      );

      assert.equal(
        translated,
        "The swap meet at Boxted Airfield was called off.",
        `'The swap meet at Boxted Airfield was called off.' should be returned, not '${translated}'`
      );
    });

    test("8)   Have you met Mrs Kalyani?", () => {
      let translated = Translator.prototype.inAmerican(
        "Have you met Mrs Kalyani?"
      );

      assert.equal(
        translated,
        "Have you met Mrs. Kalyani?",
        `'Have you met Mrs. Kalyani?' should be returned, not '${translated}'`
      );
    });

    test("9)   Have you met Mrs Kalyani?", () => {
      let translated = Translator.prototype.inAmerican(
        "Prof Joyner of King's College, London."
      );

      assert.equal(
        translated,
        "Prof. Joyner of King's College, London.",
        `'Prof. Joyner of King's College, London.' should be returned, not '${translated}'`
      );
    });

    test("10)  Tea time is usually around 4 or 4.30.", () => {
      let translated = Translator.prototype.inAmerican(
        "Tea time is usually around 4 or 4.30."
      );

      assert.equal(
        translated,
        "Tea time is usually around 4 or 4:30.",
        `'Tea time is usually around 4 or 4:30.' should be returned, not '${translated}'`
      );
    });
  });
});
