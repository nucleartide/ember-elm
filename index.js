'use strict';

const ElmCompiler = require("./broccoli-elm");
const BroccoliMergeTrees = require("broccoli-merge-trees");

var defaultOptions = {
  includePaths: []
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

    var elmTargets = [tree];
    if (this.options.includePaths.length > 0) {
      elmTargets = this.options.includePaths;
    }

    var elmOptions = Object.assign({}, this.options);
    delete elmOptions.includePaths;

    // tree.destDir is undefined when tree is a BroccoliMergeTree.
    // So we use outputPath instead, which seems to work.
    const destDir = tree.destDir || outputPath;
    const jsTree = tree;
    const elmTree = new ElmCompiler(elmTargets, destDir, elmOptions);
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

      // We need to make sure ember-cli-babel runs after the elm compilation
      // because it wraps the compilation output in the AMD module loader.
      // Likely all preprocessors need to run after elm compilation , so we move them all to the back to the line.
      // WARNING: in some projects ember-cli-babel gets added to the js registry
      // by default, giving the impression this isn't needed.  These lines are for projects that aren't so lucky.
      let existingPreprocessors = registry.registeredForType('js');

      // registeredForType returns the internal copy, that would get mutated
      // by the lines below.
      let preprocessorsBeforeElm = existingPreprocessors.slice(0);
      preprocessorsBeforeElm.forEach(preprocessor =>
          registry.remove('js', preprocessor)
      );
      registry.add("js", new ElmPlugin(elmOptions));
      preprocessorsBeforeElm.forEach(preprocessor =>
          registry.add('js', preprocessor)
      );
    }
  }
};
