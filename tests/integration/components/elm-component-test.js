import { module, test } from 'qunit';
import { setupRenderingTest } from "ember-qunit";
import { render } from '@ember/test-helpers';
import hbs from "htmlbars-inline-precompile";
import Elm from "dummy/elm-modules";
import { run } from "@ember/runloop";

module("Integration | Component | elm component", function(hooks) {
  setupRenderingTest(hooks);

  test("it works", async function(assert) {
    const done = assert.async();
    this.set("Elm", Elm);
    await render(hbs`{{elm-component src=Elm.Main.Hello}}`);

    run.next(() => {
      assert.dom(this.element).hasText("hello world");
      done();
    });
  });
});
