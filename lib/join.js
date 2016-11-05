/**
 * Joins everything in `array` recursively.
 *
 *     join(['a', ['b', 'c']], ',')
 *     => 'a,b,c'
 */

function join (array, sep) {
  return flatten(array).join(sep || '')
}

function flatten (array) {
  if (!array) return []
  if (!Array.isArray(array)) return [array]

  return array.reduce((acc, frag) => {
    return acc.concat(flatten(frag))
  }, [])
}

module.exports = join
