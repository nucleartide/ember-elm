
const ElmCompiler = require('./lib/broccoli-elm')
const coffee = require('broccoli-coffee')
const fs = require('fs')
const util = require('util')
const BroccoliMergeTrees = require('broccoli-merge-trees')
const { log } = require('broccoli-stew')

class ElmPlugin {
  constructor() {
    //this.name = 'ember-elm'
    this.ext = 'elm'
    //this.ext = 'js'
  }

  toTree(tree, inputPath, outputPath, something) {
    console.log(something.registry.app.import)
    const logTree = log(new BroccoliMergeTrees([new ElmCompiler([tree], 'asdf'), tree]), { output: 'tree', label: '\n\n\n\n\n\nmy-app-name tree' });
    return logTree
    //return new ElmCompiler([logTree], 'asdf')
    //return new ElmCompiler([tree], 'asdf')
  }
}

/**
 * See https://ember-cli.com/api/classes/Addon.html
 *
 * @extends Addon
 */

module.exports = {
  name: 'ember-elm',

  setupPreprocessorRegistry(type, registry) {
    registry.add('js', new ElmPlugin)
  }
}

