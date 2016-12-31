
const CachingWriter = require('broccoli-caching-writer')
const { compileToString } = require('node-elm-compiler')
const fs = require('fs')
const chalk = require('chalk')

module.exports = class ElmCompiler extends CachingWriter {

  /**
   * @param {Node[]} inputNodes - List of Broccoli nodes.
   * @param {String} outputFile - Relative path of the output JS file.
   */

  constructor(inputNodes, outputFile) {
    console.log('constructing', outputFile)

    const options = {
      name: 'ElmCompiler',
      annotation: 'broccoli-elm',
      persistentOutput: false, // doesn't matter, we don't use this.outputPath
      cacheInclude: [/.*\.elm$/],
      cacheExclude: []
    }

    super(inputNodes, options)
    this.outputFile = outputFile
  }

  build() {
    /*
    return compileToString(this.listFiles(), { yes: true }).then(data => {
      fs.writeFileSync(this.outputFile, data.toString())
    }).catch(err => {
      // Format error messages nicely.
      // See https://github.com/broccolijs/broccoli-plugin#error-objects.
      err.file = 'Elm'
      err.treeDir = '.build()'
      const lines = err.message.split('\n')
      lines[0] = lines[0] + '\n'
      err.message = lines.join('\n')
      err.message = chalk.red(err.message)
      throw err
    })
    */
  }
}

