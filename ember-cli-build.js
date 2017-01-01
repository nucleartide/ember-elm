/*jshint node:true*/
/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    nodeModulesToVendor: [
    ]
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

 app.import('bower_components/jquery-emoji-picker/css/jquery.emojipicker.css')
 app.import('bower_components/jquery-emoji-picker/css/jquery.emojipicker.a.css')
 app.import('bower_components/jquery-emoji-picker/js/jquery.emojipicker.js')
 app.import('bower_components/jquery-emoji-picker/js/jquery.emojis.js')

  return app.toTree();
};
