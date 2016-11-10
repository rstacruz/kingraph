
/*
 * toPNG for the browser
 */

function toPng (svgXml) {
  var scaleFactor = 1

  if (typeof window !== 'undefined' && 'devicePixelRatio' in window) {
    if (window.devicePixelRatio > 1) {
      scaleFactor = window.devicePixelRatio
    }
  }

  var svgImage = new Image()
  svgImage.src = 'data:image/svg+xml;utf8,' + svgXml

  var pngImage = new Image()

  svgImage.onload = function() {
    var canvas = document.createElement('canvas')
    canvas.width = svgImage.width * scaleFactor
    canvas.height = svgImage.height * scaleFactor

    var context = canvas.getContext('2d')
    context.drawImage(svgImage, 0, 0, canvas.width, canvas.height)

    pngImage.src = canvas.toDataURL
    pngImage.width = svgImage.width
    pngImage.height = svgImage.height
  }

  return pngImage
}

module.exports = toPng
