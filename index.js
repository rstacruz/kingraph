const map = require('object-loops/map')
const join = require('./lib/join')
const values = require('object-loops/values')
const slugify = require('./lib/slugify')
const normalize = require('./lib/normalize')
const applyStyle = require('./lib/apply_style')
const idGenerator = require('./lib/id_generator')

const COLORS = require('./lib/defaults/colors')

const getId = idGenerator()

const LINE = Array(76).join('#')
const LINE2 = '# ' + Array(74).join('-')

function render (data) {
  data = normalize(data)

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
  const houses = house.houses || {}

  const meat = [
    // Sub-houses
    renderHouses(data, houses, path),

    // People and families
    values(map(people, (p, id) => renderPerson(data, house, p || {}, path.concat([id])))),
    values(map(families, (f, id) => renderFamily(data, house, f || {}, path.concat([id]))))
  ]

  if (path.length === 0) {
    return meat
  } else {
    const name = house.name || path[path.length -1 ]

    return [
      '',
      LINE,
      `# House ${path}`,
      LINE,
      '',
      `subgraph cluster_${slugify(path)} {`,
      { indent: [
        `label=<<b>${name}</b>>`,
        applyStyle(data, [':house', `:house-${path.length}`]),
        '',
        meat
      ] },
      '}'
    ]
  }
}

function renderHouses (data, houses, path) {
  return values(map(houses, (house, id) => {
    return renderHouse(data, house, path.concat([id]))
  }))
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
  const slug = slugify(path)
  const color = COLORS[getId('family') % COLORS.length]
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
    '',
    `subgraph cluster_family_${slug} {`,
    { indent: [
      style([':cluster']),
      hasParents && renderParents(),
      hasParents && hasChildren && renderLink(),
      hasChildren && renderKids(),
      (hasManyChildren > 1) && renderKidLinks()
    ] },
    '}'
  ]

  function style (classes, before) {
    return { indent: applyStyle(data, classes, { before: (before || {}) }) }
  }

  function renderParents () {
    return [
      '',
      LINE2,
      `# Family ${JSON.stringify(path)}`,
      LINE2,
      '',
      `${union} [`,
      style([':union'], { color }),
      ']',
      '',
      `{rank=same; "${parents.join('", "')}"}`,
      '',
      parents.map(parent => {
        return [
          `"${parent}":e -> ${union} [`,
          style([':parent-link'], { color }),
          ']' ]
      }),
      parents2.map(parent => {
        return [
          `"${parent}":e -> ${union} [`,
          style([':parent-link', ':parent2-link'], { color }),
          ']' ]
      })
    ]
  }

  function renderLink () {
    return [
      `${union} -> ${kids} [`,
      style([':parent-link'], { weight: 10, color: color }),
      ']' ]
  }

  function renderKids () {
    return [
      `${kids} [`,
      style([':children']),
      `]`,

      `{rank=same; ${children.map(c => JSON.stringify(c)).join(', ')}}`,

      children.map(kid => {
        return [
          `${kids} -> ${JSON.stringify(kid)}:w [`,
          style([':child-link'], {
            weight: 2,
            color: color
          }),
          ']' ]
      }),
      children2.map(kid => {
        return [
          `${kids} -> ${JSON.stringify(kid)}:w [`,
          style([':child-link', ':child2-link'], {
            weight: 2,
            color: color
          }),
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
