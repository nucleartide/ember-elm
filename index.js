'use strict';

const ElmCompiler = require("./broccoli-elm");
const BroccoliMergeTrees = require("broccoli-merge-trees");

var defaultOptions = {
  includePath: undefined
};

class ElmPlugin {
  constructor(options) {
    this.name = "ember-elm";
    this.ext = "elm";
    this.options = Object.assign(
      {},
      defaultOptions,
      options
    );
  }

  toTree(tree, inputPath, outputPath) {
    // Ignore elm outside of the main app, so we don't try to compile tests.
    if (inputPath != "/") {
      return tree;
    }

    var elmTargets = tree;
    if (this.options.includePath) {
      elmTargets = this.options.includePath;
    }

    var elmOptions = Object.assign({}, this.options);
    delete elmOptions.includePath;

    // tree.destDir is undefined when tree is a BroccoliMergeTree.
    // So we use outputPath instead, which seems to work.
    const destDir = tree.destDir || outputPath;
    const jsTree = tree;
    const elmTree = new ElmCompiler([elmTargets], destDir, elmOptions);
    return new BroccoliMergeTrees([jsTree, elmTree]);
  }
}

/**
 * @extends Addon
 *
 * See https://ember-cli.com/api/classes/Addon.html.
 */

module.exports = {
  name: require('./package').name,

  setupPreprocessorRegistry(type, registry) {
    // No need to try to compile elm within the addon
    if (type == "parent") {
      let app = this.app || this;
      let options = app.options || {};
      let elmOptions = options.elm || {};
      registry.add("js", new ElmPlugin(elmOptions));
    }
  }
};
