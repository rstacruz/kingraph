const map = require('object-loops/map')
const assign = require('object-assign')
const reduce = require('object-loops/reduce')
const values = require('object-loops/values')

const DEFAULT_STYLES = {
  ':edge': {
    dir: 'none',
    color: '#cccccc'
  },
  ':node': {
    shape: 'box',
    fontname: 'sans-serif',
    width: 2.5,
    color: '#cccccc'
  },
  ':digraph': {
    rankdir: 'LR',
    ranksep: 0.4,
    splines: 'ortho'
  }
}

/**
 * Returns attributes for a given class
 *
 *     data = { styles: { ':root': { color: 'gold', dir: 'none' } } }
 *     applyStyle(data, [':root'])
 *     => 'color="gold", dir="none"'
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
 *     => 'color="gold", dir="none"'
 */

function renderStyle (properties, options) {
  const sep = options && options.sep || ', '
  return values(map(properties, (val, key) =>
    `${key}=${JSON.stringify(val)}`)).join(sep)
}

/*
 * Export
 */

module.exports = applyStyle
