
const ElmCompiler = require('./broccoli-elm')
const BroccoliMergeTrees = require('broccoli-merge-trees')

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
    return new BroccoliMergeTrees([jsTree, elmTree])
  }
}

/**
 * @extends Addon
 *
 * See https://ember-cli.com/api/classes/Addon.html.
 */

module.exports = {
  name: 'ember-elm',

  setupPreprocessorRegistry(type, registry) {
    registry.add('js', new ElmPlugin)
  }
}
