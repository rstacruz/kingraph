/**
 * Joins everything in `array` recursively.
 *
 *     join(['a', ['b', 'c']], { sep: ',' })
 *     => 'a,b,c'
 */

function join (array, options) {
  return flatten(array).join(options && options.sep || '')
}

function flatten (array) {
  if (array === null || array === undefined || array === false) return []
  if (!Array.isArray(array)) return [array]

  return array.reduce((acc, frag) => {
    return acc.concat(flatten(frag))
  }, [])
}

module.exports = join
