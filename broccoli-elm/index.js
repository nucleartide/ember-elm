const CachingWriter = require("broccoli-caching-writer");
const { compileToString } = require("node-elm-compiler");
const fs = require("fs");
const chalk = require("chalk");
const mkdirp = require("mkdirp");
const path = require("path");

const optionDefaults = {};

module.exports = class ElmCompiler extends CachingWriter {
  /**
   * Initialize ElmCompiler with an array of Broccoli nodes and a path
   * for the output JavaScript file. This path is relative to
   * `this.outputPath`, which is computed by a parent class.
   */

  constructor(inputNodes, destDir = "", options = {}) {
    super(inputNodes, {
      name: "ElmCompiler",
      annotation: "broccoli-elm",
      persistentOutput: false,
      cacheInclude: [/.*\.elm$/],
      cacheExclude: []
    });

    this.destDir = destDir;
    let useDebug = process.env.EMBER_ENV != "production";
    let optimize = process.env.EMBER_ENV == "production";
    this.options = Object.assign(
      {
        debug: useDebug,
        optimize: optimize
      },
      optionDefaults,
      options
    );
  }

  /**
   * Build the output JavaScript file.
   *
   * This method is called by a parent class.
   */

  build() {
    let options = Object.assign({}, this.options);
    return compileToString(this.listFiles(), options)
      .then(data => {
        // elm-make output
        let jsStr = data.toString();

        // if there are no Elm files to compile, do nothing
        if (!jsStr) return;

        // fix module exports
        jsStr =
          jsStr +
          `
        if (typeof exports == 'undefined') {
          define('${
            this.destDir
          }/elm-modules', ['exports'], function (exports) {
            exports['default'] = Elm;
          });
        } else {
          exports['default'] = Elm;
        }`;

        // build
        const dir = path.join(this.outputPath, this.destDir);
        mkdirp.sync(dir);
        fs.writeFileSync(path.join(dir, "elm-modules.js"), jsStr);
      })
      .catch(err => {
        // make error cleaner
        err.message = formatMessage(err.message);

        throw err;
      });
  }
};

function formatMessage(message) {
  const pathRegEx = /-- ([A-Z ]+)( -+ )(.+)/g;

  let tidyMessage = message
    .replace(/Compilation failed\s+\[=+\] - \d \/ \d/, "")
    .replace(pathRegEx, pathFix)
    .replace(/Detected errors in/, "\n\nDetected errors in")
    .replace(/\^+/g, makeRed);

  return wrapMarkers(" Elm Complier Errors ", tidyMessage);
}

function wrapMarkers(title, message) {
  let lineLengths = message.split("\n").map(s => {
    return s.trim().length;
  });
  let errWidth = Math.max.apply(Math, lineLengths);
  let startMarker = title
    .padStart(Math.floor((errWidth - title.length) / 2), "=")
    .padEnd(errWidth, "=");
  let endMarker = "=".repeat(errWidth);

  return `

${startMarker}

${message}

${endMarker}
`;
}

function makeRed(match) {
  return chalk.red(match);
}

function pathFix(match, errType, connector, tempPath) {
  const cleanPath = tempPath
    .replace(process.cwd(), "")
    .split(path.sep)
    .slice(3)
    .join(path.sep);

  return `-- ${chalk.red(errType)}${connector}${chalk.yellow(cleanPath)}`;
}
