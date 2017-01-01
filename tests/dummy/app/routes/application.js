
import Ember from 'ember'
import Elm from 'dummy/elm-modules'

export default Ember.Route.extend({
  setupController(controller, model) {
    controller.set('value', '👋')
    controller.set('flags', 'wss://echo.websocket.org')
    controller.set('Elm', Elm)
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
})
