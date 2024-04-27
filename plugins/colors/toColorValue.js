const _ = require('lodash')

module.exports = function toColorValue(maybeFunction) {
  return _.isFunction(maybeFunction) ? maybeFunction({}) : maybeFunction
}
