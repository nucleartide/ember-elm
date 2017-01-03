
const stringUtil = require('ember-cli-string-utils')

module.exports = {
  description: 'Generates an Elm module',

  locals(options) {
    return {
      elmModuleName: stringUtil.classify(options.entity.name)
    }
  },

  fileMapTokens() {
    return {
      '__elm-module-name__' ({ locals }) {
        return stringUtil.classify(locals.elmModuleName)
      }
    }
  }
}
