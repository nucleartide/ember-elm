import Ember from 'ember';
import Elm from 'dummy/elm'

export default Ember.Controller.extend({
  Elm,

  flags: 'wss://echo.websocket.org'
});
