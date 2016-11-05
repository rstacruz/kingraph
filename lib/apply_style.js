const map = require('object-loops/map')
const assign = require('object-assign')
const reduce = require('object-loops/reduce')
const values = require('object-loops/values')

const DEFAULT_STYLES = {
  ':edge': {
    dir: 'none',
    color: '#cccccc'
  },
  ':subgraph': {
    style: 'filled',
    color: '#fafafa',
    labeljust: 'l',
    fontname: 'sans-serif',
    fontsize: 16,
  },
  ':node': {
    shape: 'box',
    fontname: 'sans-serif',
    width: 2.5,
    bgcolor: 'white',
    color: '#cccccc'
  },
  ':digraph': {
    rankdir: 'LR',
    ranksep: 0.4,
    splines: 'ortho'
  },
  ':union': {
    shape: 'diamond',
    label: '',
    height: 0.1,
    width: 0.1,
    style: 'filled'
  },
  ':children': {
    shape: 'circle',
    label: '',
    height: 0.01,
    width: 0.01
  },
  ':parent-link': {},
  ':parent2-link': {
    style: 'dotted'
  },
  ':child-link': {
    dir: 'forward',
    arrowhead: 'tee',
    arrowsize: 2
  },
  ':child2-link': {
    style: 'dotted'
  },
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
