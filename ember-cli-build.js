'use strict';

const EmberAddon = require("ember-cli/lib/broccoli/ember-addon");

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    elm: {
      mainDirs: ['/elm-modules/Main/']
    }
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  app.import("node_modules/jquery-emoji-picker/css/jquery.emojipicker.css");
  app.import("node_modules/jquery-emoji-picker/css/jquery.emojipicker.a.css");
  app.import("node_modules/jquery-emoji-picker/js/jquery.emojipicker.js");
  app.import("node_modules/jquery-emoji-picker/js/jquery.emojis.js");

  return app.toTree();
};
