
const CachingWriter = require('broccoli-caching-writer')
const { compileToString } = require('node-elm-compiler')
const fs = require('fs')
const chalk = require('chalk')
const mkdirp = require('mkdirp')
const path = require('path')
const moduleNoise = require('./module-noise')

module.exports = class ElmCompiler extends CachingWriter {

  /**
   * Initialize ElmCompiler with an array of Broccoli nodes and a path
   * for the output JavaScript file. This path is relative to
   * `this.outputPath`, which is computed by a parent class.
   */

  constructor(inputNodes, destDir = '') {
    super(inputNodes, {
      name: 'ElmCompiler',
      annotation: 'broccoli-elm',
      persistentOutput: false,
      cacheInclude: [/.*\.elm$/],
      cacheExclude: []
    })

    this.destDir = destDir
  }

  /**
   * Build the output JavaScript file.
   *
   * This method is called by a parent class.
   */

  build() {
    return compileToString(this.listFiles(), { yes: true }).then(data => {
      // elm-make output
      let d = data.toString()

      // if nothing was compiled, do nothing
      if (!d) return

      // super hack, not sure why dummy app differs from real app
      // const firstLine = `define('dummy/elm-modules', ['exports'], function (exports) {\n`
      // const hasDefine = d.slice(0, firstLine.length) === firstLine
      // if (!hasDefine) d = firstLine + d

      // remove unnecessary scoping
      //d = d.replace(`(function() {`, '')
      //d = d.trim().slice(0, -`}).call(this);`.length)

      // replace module noise
      d = d.replace(moduleNoise, `
	if (typeof exports == 'undefined') {
		define('${this.destDir}/elm-modules', ['exports'], function (exports) {
			exports['default'] = Elm;
		});
	} else {
		exports['default'] = Elm;
	}
                    `)
      // d += `export default Elm;`
      //d += `exports['default'] = Elm;`

      // closing right brace and right parenthesis if needed
      // if (!hasDefine) d += '});'

      // build
      const dir = path.join(this.outputPath, this.destDir)
      mkdirp.sync(dir)
      fs.writeFileSync(path.join(dir, 'elm-modules.js'), d)
      // console.log(d.split('\n').slice(-100).join('\n'))
    }).catch(err => {
      // parse path from elm-make output
      const [, abspath] = /-- [A-Z ]+ -+ (.+)/.exec(err.message)
      const relpath = abspath
        .replace(process.cwd(), '')
        .split(path.sep)
        .slice(3)
        .join(path.sep)

      // make error cleaner
      err.message = err.message.replace(`- ${abspath}`, `-- ${relpath} --`)

      // make error red
      err.message = chalk.red(err.message)

      throw err
    })
  }
}
