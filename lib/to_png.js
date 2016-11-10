/*
 * Converts to PNG.
 */

function toPng (svgXml) {
  const svg2png = require('svg2png')
  return svg2png(svgXml)
}

module.exports = toPng
