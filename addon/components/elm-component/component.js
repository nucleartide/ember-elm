import Ember from 'ember'
import layout from './template'

export default Ember.Component.extend({
  src: null,
  flags: null,

  didInsertElement() {
    this._super(...arguments)

    const src = this.get('src')
    const flags = this.get('flags')

    if (src && flags) {
      src.embed(this.element, flags)
    } else {
      throw new Error('uh oh')
    }
  }
})
