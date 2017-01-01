import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, model) {
    this._super(...arguments)
    controller.set('value', '👋')
  },

  sendToElm: null,

  actions: {
    talkToElm() {
      this.get('sendToElm')(this.controller.get('value'))
      this.controller.set('value', '')
    },

    setupPorts(ports) {
      this.set('sendToElm', ports.emoji.send)
    }
  }
});
