const EmberAddon = require("ember-cli/lib/broccoli/ember-addon");

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    babel: {
      compact: false
    },

    nodeModulesToVendor: ["node_modules/jquery-emoji-picker"]
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  app.import("vendor/css/jquery.emojipicker.css");
  app.import("vendor/css/jquery.emojipicker.a.css");
  app.import("vendor/js/jquery.emojipicker.js");
  app.import("vendor/js/jquery.emojis.js");

  return app.toTree();
};
