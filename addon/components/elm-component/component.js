
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
    this._super(...arguments)
    if (!this.src) throw new Error('ElmComponent missing src object')
  },

  didInsertElement() {
    this._super(...arguments)
    const { ports } = this.src.embed(this.element, this.flags)
    this.setup(ports)
  }
})
