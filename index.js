
const ElmCompiler = require('./broccoli-elm')
const BroccoliMergeTrees = require('broccoli-merge-trees')

class ElmPlugin {
  constructor(options) {
    this.name = 'ember-elm-components';
    this.ext = 'elm';
    this.options = options;
  }

  toTree(tree, inputPath, outputPath) {
    // tree.destDir is undefined when tree is a BroccoliMergeTree.
    // So we use outputPath instead, which seems to work.
    const destDir = tree.destDir || outputPath;
    const jsTree = tree;
    const elmTree = new ElmCompiler([tree], destDir, this.options);
    return new BroccoliMergeTrees([jsTree, elmTree]);
  }
}

/**
 * @extends Addon
 *
 * See https://ember-cli.com/api/classes/Addon.html.
 */

module.exports = {
  name: 'ember-elm-components',

  setupPreprocessorRegistry(type, registry) {
    let options = this.options || {}
    let elmOptions = options.elm;
    registry.add('js', new ElmPlugin(elmOptions));
  }
}
