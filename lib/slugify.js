const kebabCase = require('kebab-case')

function slugify (object, options) {
  const sep = options && options.sep || '_'

  if (Array.isArray(object)) {
    return object.map(f => slugify(f, options)).join(sep)
  }

  var result = kebabCase(object.toString())
  if (sep === '-') {
    return result
  } else {
    return result.split('-').join(sep)
  }
}

module.exports = slugify
