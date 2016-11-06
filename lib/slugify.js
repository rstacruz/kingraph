function slugify (object, options) {
  const sep = options && options.sep || '_'

  if (Array.isArray(object)) {
    return object.map(f => slugify(f, options)).join(sep)
  }

  return kebabCase(object.toString(), sep)
}

function kebabCase (str, sep) {
  return str.toLowerCase().match(/[a-z0-9]+/g).join(sep || '_')
}

module.exports = slugify
