import Route from '@ember/routing/route';
import Elm from "dummy/elm-modules";

export default Route.extend({
  sendToElm(emojis) {},

  setupController(controller, model) {
    controller.set("value", "👋");
    controller.set("flags", "wss://echo.websocket.org");
    controller.set("Elm", Elm);
  },

  actions: {
    "talk to elm"() {
      this.get("sendToElm")(this.controller.get("value"));
      this.controller.set("value", "");
    },

    "setup ports"(ports) {
      this.set("sendToElm", ports.emoji.send);
    }
  }
});
