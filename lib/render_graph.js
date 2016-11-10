const map = require('object-loops/map')
const join = require('./join')
const values = require('object-loops/values')
const slugify = require('./slugify')
const normalize = require('./normalize')
const applyStyle = require('./apply_style')
const idGenerator = require('./id_generator')

const COLORS = require('./defaults/colors')

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
      renderHouse(data, data, [])
    ]},
    '}'
  ], { indent: '  ' })
}

function renderHouse (data, house, path) {
  const people = house.people || {}
  const families = house.families || []
  const houses = house.houses || {}

  const meat = [
    // People and families
    values(map(families, (f, id) => renderFamily(data, house, f || {}, path.concat([id])))),
    values(map(people, (p, id) => renderPerson(data, house, p || {}, path.concat([id]))))
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

function renderPerson (data, house, person, path) {
  let id = path[path.length - 1]
  let label
  let href = person.links && person.links[0]

  if (person.name || person.fullname) {
    label =
      '<<table align="center" border="0" cellpadding="0" cellspacing="2" width="4">' +
      '<tr><td align="center">' +
      `${person.name || id}</td></tr>` +
      '<tr><td align="center">' +
      '<font point-size="10" color="#aaaaaa">' +
      `${person.fullname || person.name}</font></td></tr></table>>`
  } else {
    label = id
  }

  return [
    `"${id}" [`,
      { indent: [
        applyStyle(data, person.class || [], { before: {
          label, href
        } })
      ] },
    ']' ]
}

/*
 * For comments
 */

function summarizeFamily (family) {
  const parents = []
    .concat(family.parents || [])
    .concat(family.parents2 || [])
    .filter(Boolean)

  const children = []
    .concat(family.children || [])
    .concat(family.children2 || [])
    .filter(Boolean)

  return `[${parents.join(', ')}] -> [${children.join(', ')}]`
}

/*
 * Renders a family subgraph
 */

function renderFamily (data, house, family, path) {
  const slug = slugify(path)
  const color = COLORS[getId('family') % COLORS.length]
  const parents = family.parents || []
  const parents2 = family.parents2 || []
  const children = family.children || []
  const children2 = family.children2 || []
  const affinity = family.affinity || []
  const housename = family.house

  const hasParents = (parents.length + parents2.length) > 0
  const hasChildren = (children.length + children2.length) > 0
  const hasManyChildren = (children.length + children.length) > 1

  const union = `union_${slug}`
  const kids = `siblings_${slug}`

  return [
    '',
    `subgraph cluster_family_${slug} {`,
    style([':family']),
    { indent: [
      housename && renderHousePrelude(),
      // renderPeople(),
      renderSubFamilies(),
      '',
      `# Family ${summarizeFamily(family)}`,
      LINE2,
      '',
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

  function renderPeople () {
    const list = []
      .concat(parents)
      .concat(children)

    return `{${list.map(escape).join('; ')}}`
  }

  function renderHousePrelude () {
    let label = `<<b>${housename}</b>>`
    let labelhref = family.links && family.links[0]

    return [
      applyStyle(data, [':house'], { before: { label, labelhref } })
    ]
  }

  function renderSubFamilies () {
    // Reverse the families, because we assume people put "deeper" families last.
    // You want to render the deeper families first so that their parents are placed
    // in those families, rather than the parent families.
    const families = [].concat(family.families || []).reverse()
    return families.map((f, idx) => renderFamily(data, house, f, path.concat(idx)))
  }

  function renderParents () {
    return [
      `${union} [`,
      style([':union'], { fillcolor: color }),
      ']',
      '',
      parents.length > 0 && [
        `{${parents.map(escape).join(', ')}} -> ${union} [`,
        style([':parent-link'], { color }),
        ']'
      ],
      parents2.length > 0 && [
        `{${parents2.map(escape).join(', ')}} -> ${union} [`,
        style([':parent-link', ':parent2-link'], { color }),
        ']'
      ]
    ]
  }

  function renderLink () {
    return [
      `${union} -> ${kids} [`,
      style([':parent-link', ':parent-child-link'], { color: color }),
      ']' ]
  }

  function renderKids () {
    return [
      `${kids} [`,
      style([':children'], { fillcolor: color }),
      `]`,

      children.length > 0 && [
        `${kids} -> {${children.map(escape).join(', ')}} [`,
        style([':child-link'], { color }),
        ']'
      ],

      children2.length > 0 && [
        `${kids} -> {${children2.map(escape).join(', ')}} [`,
        style([':child-link', ':child2-link'], { color }),
        ']'
      ]

    ]
  }

  function renderKidLinks () {
    return [
      `{"${children.concat(children2).join('" -> "')}" [`,
      { indent: [
        applyStyle(data, [':child-links'], { before: {
          style: 'invis'
        }})
      ] },
      ']' ]
  }
}

/*
 * Escapes a name into a node name.
 */

function escape (str) {
  if (/^[A-Za-z]+$/.test(str)){
    return str
  } else {
    return JSON.stringify(str)
  }
}

/*
 * Export
 */

module.exports = render
