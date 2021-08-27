const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

let Translator = require("../components/translator.js");

suite("Functional Tests", () => {
  /* My tests */
  suite("/api/translate Tests", () => {
    const PATH = "/api/translate";

    test("1)  Valid Data Test", () => {
      const data = [
        {
          text: "Mangoes are my favorite fruit.",
          locale: "american-to-british",
        },
        {
          text: "We watched the footie match for a while.",
          locale: "british-to-american",
        },
      ];

      chai
        .request(server)
        .post(PATH)
        .send(data[0])
        .end((err, res) => {
          assert.equal(res.status, 200, "response status should be 200");

          assert.property(
            res.body,
            "translation",
            "response should have returned an object with a property of 'translation'"
          );

          assert.notPropertyVal(
            res.body,
            "translation",
            Translator.prototype.inBritish(data[0].text),
            `response should have returned an object with a property of 'translation' that contains <span> tags`
          );
        });

      chai
        .request(server)
        .post(PATH)
        .send(data[1])
        .end((err, res) => {
          assert.equal(res.status, 200, "response status should be 200");

          assert.property(
            res.body,
            "translation",
            "response should have returned an object with a property of 'translation'"
          );

          assert.notPropertyVal(
            res.body,
            "translation",
            Translator.prototype.inAmerican(data[1].text),
            `response should have returned an object with a property of 'translation' that contains <span> tags`
          );
        });
    });

    test("2)  Missing Required Fields Test", () => {
      chai
        .request(server)
        .post(PATH)
        .send()
        .end((err, res) => {
          assert.equal(res.status, 200, "response status should be 200");

          assert.property(
            res.body,
            "error",
            "response should have returned an object with a property of 'error'"
          );

          assert.propertyVal(
            res.body,
            "error",
            "Required field(s) missing",
            "response should have returned an object with a property of 'error' that equals 'Required field(s) missing'"
          );
        });
    });

    test("3)  Missing 'text' Field Test", () => {
      const data = {
        locale: "doesn't really matter",
      };

      chai
        .request(server)
        .post(PATH)
        .send(data)
        .end((err, res) => {
          assert.equal(res.status, 200, "response status should be 200");

          assert.property(
            res.body,
            "error",
            "response should have returned an object with a property of 'error'"
          );

          assert.propertyVal(
            res.body,
            "error",
            "Required field(s) missing",
            "response should have returned an object with a property of 'error' that equals 'Required field(s) missing'"
          );
        });
    });

    test("4)  Missing 'locale' Field Test", () => {
      const data = {
        text: "doesn't really matter",
      };

      chai
        .request(server)
        .post(PATH)
        .send(data)
        .end((err, res) => {
          assert.equal(res.status, 200, "response status should be 200");

          assert.property(
            res.body,
            "error",
            "response should have returned an object with a property of 'error'"
          );

          assert.propertyVal(
            res.body,
            "error",
            "Required field(s) missing",
            "response should have returned an object with a property of 'error' that equals 'Required field(s) missing'"
          );
        });
    });

    test("5)  Empty 'text' Field Test", () => {
      const data = {
        text: "",
        locale: "doesn't really matter",
      };

      chai
        .request(server)
        .post(PATH)
        .send(data)
        .end((err, res) => {
          assert.equal(res.status, 200, "response status should be 200");

          assert.property(
            res.body,
            "error",
            "response should have returned an object with a property of 'error'"
          );

          assert.propertyVal(
            res.body,
            "error",
            "No text to translate",
            "response should have returned an object with a property of 'error' that equals 'No text to translate'"
          );
        });
    });

    test("6)  No Translation Test", () => {
      const data = {
        text: "Hello world",
        locale: "doesn't really matter",
      };

      chai
        .request(server)
        .post(PATH)
        .send(data)
        .end((err, res) => {
          assert.equal(res.status, 200, "response status should be 200");

          assert.property(
            res.body,
            "translation",
            "response should have returned an object with a property of 'translation'"
          );

          assert.propertyVal(
            res.body,
            "translation",
            "Everything looks good to me!",
            "response should have returned an object with a property of 'translation' that equals 'Everything looks good to me!'"
          );
        });
    });
  });
});
