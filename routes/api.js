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

  app.route("/api/translate").post((req, res) => {});
};
