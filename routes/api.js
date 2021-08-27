"use strict";

const Translator = require("../components/translator.js");

/**
 * Module that handles most of the routing
 * @module ./routes/api
 *
 * @param {*} app   Represents the entire application
 *
 */
module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    const { text, locale } = req.body;
    let translation = "";

    if (text == undefined || !locale) {
      res.json({ error: "Required field(s) missing" });
      return;
    }

    if (text.trim().length === 0) {
      res.json({ error: "No text to translate" });
      return;
    }

    if (locale === "american-to-british") {
      translation = translator.inBritish(text.trim());
    } else {
      translation = translator.inAmerican(text.trim());
    }
    console.log(translation);

    let highlighted = translator.highlighter(translation, locale);
    console.log(highlighted);

    if (highlighted.length > 0) {
      highlighted.forEach((h) => {
        let word = h
          .replace('<span class="highlight">', "")
          .replace("</span>", "");
        console.log("As Text: " + word);
        translation = translation.replace(word, h);
        console.log("Highlighted: " + translation);
      });
    }

    res.json({ translation: translation });
  });
};
