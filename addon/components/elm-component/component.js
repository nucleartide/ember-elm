import Ember from 'ember'
import layout from './template'

export default Ember.Component.extend({
  src: null,
  flags: null,
  ports: null, // action that accepts ports

  didInsertElement() {
    this._super(...arguments)

    const src = this.get('src')
    const flags = this.get('flags')
    const ports = this.get('ports')

    if (src && flags) {
      const app = src.embed(this.element, flags)
      if (ports) ports(app.ports)
    } else {
      throw new Error('uh oh')
    }
  }
})
