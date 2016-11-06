function idGen () {
  var ids = {}

  return function (key) {
    if (typeof ids[key] === 'undefined') {
      return (ids[key] = 0)
    } else {
      return ++ids[key]
    }
  }
}

module.exports = idGen
