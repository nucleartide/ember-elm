
const bullshit = `if (typeof define === "function" && define['amd'])
{
  define([], function() { return Elm; });
  return;
}

if (typeof module === "object")
{
  module['exports'] = Elm;
  return;
}

var globalElm = this['Elm'];
if (typeof globalElm === "undefined")
{
  this['Elm'] = Elm;
  return;
}

for (var publicModule in Elm)
{
  if (publicModule in globalElm)
  {
    throw new Error('There are two Elm modules called \`' + publicModule + '\` on this page! Rename one of them.');
  }
  globalElm[publicModule] = Elm[publicModule];
}`

const CachingWriter = require('broccoli-caching-writer')
const { compileToString } = require('node-elm-compiler')
const fs = require('fs')
const chalk = require('chalk')
const mkdirp = require('mkdirp')
const path = require('path')

module.exports = class ElmCompiler extends CachingWriter {

  /**
   * @param {Node[]} inputNodes - List of Broccoli nodes.
   * @param {String} destDir - Relative path of the output JS file.
   */

  constructor(inputNodes, destDir) {
    const options = {
      name: 'ElmCompiler',
      annotation: 'broccoli-elm',
      persistentOutput: false, // doesn't matter, we don't use this.outputPath
      cacheInclude: [/.*\.elm$/],
      cacheExclude: []
    }

    super(inputNodes, options)
    this.destDir = destDir
  }

  build() {
    return compileToString(this.listFiles(), { yes: true }).then(data => {
      let fileData = data.toString()
      fileData = fileData.replace(`(function() {`, '')
      fileData = fileData.trim().slice(0, -`}).call(this);`.length)
      fileData = fileData.replace(bullshit, '')
      fileData += `exports['default'] = Elm;`

      mkdirp.sync(path.join(this.outputPath, this.destDir))
      fs.writeFileSync(path.join(this.outputPath, this.destDir, 'elm-modules.js'), fileData)
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
  }
}

