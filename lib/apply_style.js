const map = require('object-loops/map')
const assign = require('object-assign')
const reduce = require('object-loops/reduce')
const values = require('object-loops/values')
const DEFAULT_STYLES = require('./defaults/styles')

/**
 * Returns attributes for a given class
 *
 *     data = { styles: { ':root': { color: 'gold', dir: 'none' } } }
 *     applyStyle(data, [':root'])
 *     => ['color="gold"', 'dir="none"']
 */

function applyStyle (data, classes, options) {
  const styles = data.styles || {}

  function applyStyles (acc, stylesheet) {
    return reduce(stylesheet, (styles, val, key) => {
      if (classes.indexOf(key) === -1) return styles
      return assign({}, styles, val)
    }, acc)
  }

  let result = {}
  result = applyStyles(result, DEFAULT_STYLES)
  result = applyStyles(result, data.styles || {})
  return renderStyle(result, options)
}

/**
 * Renders key/value into an attribute string
 *
 *     renderStyle({ color: 'gold', dir: 'none' ])
 *     => ['color="gold"', 'dir="none"']
 */

function renderStyle (properties, options) {
  return values(map(properties, (val, key) =>
    `${key}=${JSON.stringify(val)}`))
}

/*
 * Export
 */

module.exports = applyStyle
