import Component from '@ember/component';
import hbs from "htmlbars-inline-precompile";

export default Component.extend({
  layout: hbs`{{yield}}`,

  // Elm module
  src: undefined,

  // anything you want to pass to the Elm module
  flags: undefined,

  // function that is passed the Elm module's ports
  // eslint-disable-next-line
  setup(ports) {},

  didReceiveAttrs() {
    if (!this.src) throw new Error("elm-component missing src object");
  },

  didInsertElement() {
    const { ports } = this.src.init({
      node: this.element,
      flags: this.flags
    });
    this.setup(ports);
  }
});
