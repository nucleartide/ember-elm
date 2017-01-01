
const ElmCompiler = require('./lib/broccoli-elm')
const coffee = require('broccoli-coffee')
const fs = require('fs')
const util = require('util')
const BroccoliMergeTrees = require('broccoli-merge-trees')
const { log } = require('broccoli-stew')

class ElmPlugin {
  constructor() {
    this.name = 'ember-elm'
    this.ext = 'elm'
  }

  toTree(tree, inputPath, outputPath, options) {
    // tree.destDir is undefined when tree is a BroccoliMergeTree.
    // So we use outputPath instead, which seems to work.
    const destDir = tree.destDir || outputPath

    const jsTree = tree
    const elmTree = new ElmCompiler([tree], destDir)
    const merged = new BroccoliMergeTrees([jsTree, elmTree])
    // return log(merged, { output: 'tree' }) // debug
    return merged
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

