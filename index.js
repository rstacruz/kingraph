const map = require('object-loops/map')
const join = require('./lib/join')
const values = require('object-loops/values')
const slugify = require('./lib/slugify')
const normalize = require('./lib/normalize')
const applyStyle = require('./lib/apply_style')

const COLORS = require('./lib/defaults/colors')

function render (data) {
  data = normalize(data)
  var output = []

  return join([
    'digraph G {',
    { indent: [
      'edge [',
      { indent: applyStyle(data, [':edge']) },
      ']',
      '',
      'node [',
      { indent: applyStyle(data, [':node']) },
      ']',
      '',
      applyStyle(data, [':digraph']),
      '',
      renderHouse(data, data, [])
    ]},
    '}'
  ], { indent: '  ' })
}

function renderHouse (data, house, path) {
  const people = house.people || {}
  const families = house.families || {}

  return [
    '# People',
    values(map(people, (p, id) => renderPerson(data, house, p || {}, path.concat([id])))),
    values(map(families, (f, id) => renderFamily(data, house, f || {}, path.concat([id]))))
  ]
}

function renderPerson (data, house, person, path) {
  let id = path[path.length - 1]
  let label

  if (person.name || person.fullname) {
    label =
      '<<table align="center" border="0" cellpadding="0" cellspacing="2" width="4">' +
      '<tr><td align="center">' +
      `${person.name || id}</td></tr>` +
      '<tr><td align="center">' +
      '<font point-size="10" color="#aaaaaa">' +
      `${person.fullname || person.name}</font></td></tr></table>>`
  } else {
    label = JSON.stringify(id)
  }

  return `"${id}" [label=${label}, ${applyStyle(data, person.class || [])}]`
}

function renderFamily (data, house, family, path) {
  const index = path[path.length - 1]
  const slug = slugify(path, { sep: '_' })
  const color = COLORS[index % COLORS.length]
  const parents = family.parents || []
  const parents2 = family.parents2 || []
  const children = family.children || []
  const children2 = family.children2 || []

  const hasParents = (parents.length + parents2.length) > 0
  const hasChildren = (children.length + children.length) > 0
  const hasManyChildren = (children.length + children.length) > 1

  const union = `union_${slug}`
  const kids = `siblings_${slug}`

  return [
    hasParents && renderParents(),
    hasParents && hasChildren && renderLink(),
    hasChildren && renderKids(),
    (hasManyChildren > 1) && renderKidLinks()
  ]

  function renderParents () {
    return [
      '',
      `# Family ${JSON.stringify(path)}`,
      `${union} [`,
      { indent: [
        applyStyle(data, [':union'], { before: {
          color: color
        } }) ] },
      ']',
      '',
      `{rank=same; "${parents.join('", "')}"}`,
      '',
      parents.map(parent => {
        return [
          `"${parent}":e -> ${union} [`,
          { indent: [
            applyStyle(data, [':parent-link'], { before: {
              color: color
            } }) ] },
          ']' ]
      }),
      parents2.map(parent => {
        return [
          `"${parent}":e -> ${union} [`,
          { indent: [
            applyStyle(data, [':parent-link', ':parent2-link'], { before: {
              color: color
            } }) ] },
          ']' ]
      })
    ]
  }

  function renderLink () {
    return [
      `${union} -> ${kids} [`,
      { indent: [
        applyStyle(data, [':parent-link'], { before: {
          weight: 10,
          color: color
        } }) ] },
      ']' ]
  }

  function renderKids () {
    return [
      `${kids} [`,
      { indent: applyStyle(data, [':children']) },
      `]`,

      `{rank=same; "${children.join('", "')}"}`,

      children.map(kid => {
        return [
          `${kids} -> "${kid}":w [`,
          { indent: [
            applyStyle(data, [':child-link'], { before: {
              weight: 2,
              color: color
            } }) ] },
          ']' ]
      }),
      children2.map(kid => {
        return [
          `${kids} -> "${kid}":w [`,
          { indent: [
            applyStyle(data, [':child-link', ':child2-link'], { before: {
              weight: 2,
              color: color
            } }) ] },
          ']' ]
      })
    ]
  }

  function renderKidLinks () {
    return [
      `{"${children.concat(children2).join('" -> "')}" [`,
      { indent: [
        applyStyle(data, [':child-links'], { before: {
          style: 'invis',
          weight: 5
        }})
      ] },
      ']' ]
  }
}

/*
 * Export
 */

module.exports = render
