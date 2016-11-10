const renderGraph  = require('./render_graph')
const toPng = require('./to_png')

/*
 * Renders data into various formats.
 *
 * @param String format Can be `dot`, `svg`, `png` or `png-image`.
 *
 * Use `{ async: true }` to return a Promise.
 * Using `{ format: 'png' }` implies `async: true`.
 */

function render (data, options) {
  if (options && options.async) {
    return Promise.resolve(render(data, Object.assign({}, options, { async: false })))
  }

  const format = options && options.format || 'svg'

  const dot = renderGraph(data)
  if (format === 'dot') return dot

  const svg = require('viz.js')(dot, { format: 'svg', engine: 'dot' })
  if (format === 'svg') return svg

  if (format === 'png') return require('./to_png')(svg)
  if (format === 'png-image') return require('./to_png_image')(svg)
}

/*
 * Export
 */

module.exports = render
