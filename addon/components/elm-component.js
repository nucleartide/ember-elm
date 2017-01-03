
import Ember from 'ember'
import hbs from 'htmlbars-inline-precompile'

export default Ember.Component.extend({
  layout: hbs`{{yield}}`,

  // Elm module
  src: null,

  // anything you want to pass to the Elm module
  flags: null,

  // function that is passed the Elm module's ports
  setup(ports) {},

  didReceiveAttrs() {
    if (!this.src) throw new Error('elm-component missing src object')
  },

  didInsertElement() {
    // TODO: testing flags
    const { ports } = this.src.embed(this.element, this.flags || undefined)
    this.setup(ports)
  }
})
