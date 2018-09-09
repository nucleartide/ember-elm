import { moduleForComponent, test } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import Elm from "dummy/tests/elm-modules";

moduleForComponent("elm-component", "Integration | Component | elm component", {
  integration: true
});

test("it works", function(assert) {
  const done = assert.async();
  this.set("Elm", Elm);
  this.render(hbs`{{elm-component src=Elm.Hello}}`);

  Ember.run.next(() => {
    assert.equal(
      this.$()
        .text()
        .trim(),
      "hello world"
    );
    done();
  });
});
