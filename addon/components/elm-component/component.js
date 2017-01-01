
import Ember from 'ember'
import layout from './template'

export default Ember.Component.extend({
  layout,

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
    const { ports } = this.src.embed(this.element, this.flags)
    this.setup(ports)
  }
})
