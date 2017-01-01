import Ember from 'ember';
// import config from 'ember-elm/config/environment'
import dummyConfig from 'dummy/config/environment'

export default Ember.Route.extend({
  init() {
    console.log('lololol')
    //config
    dummyConfig
    debugger
  },

  setupController(controller, model) {
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
