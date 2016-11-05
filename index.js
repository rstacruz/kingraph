const redent = require('strip-indent')
const map = require('object-loops/map')
const values = require('object-loops/values')
const normalize = require('./lib/normalize')
const applyStyle = require('./lib/apply_style')
const join = require('./lib/join')
const COLORS = require('./lib/defaults/colors')

function render (data) {
  data = normalize(data)
  var output = []

  return join([
    'digraph G {',
    { indent: [
      `edge [${applyStyle(data, [':edge'])}];`,
      `node [${applyStyle(data, [':node'])}];`,
      `${applyStyle(data, [':digraph'], { sep: '; ' })};`,
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

  return `"${id}" [label=${label}, ${applyStyle(data, person.class || [])}];`
}

function renderFamily (data, house, family, path) {
  const id = path[path.length - 1] // uhh
  const color = COLORS[id % COLORS.length]
  const parents = family.parents || []
  const parents2 = family.parents2 || []
  const children = family.children || []
  const children2 = family.children2 || []

  const hasParents = (parents.length + parents2.length) > 0
  const hasChildren = (children.length + children.length) > 0
  const hasManyChildren = (children.length + children.length) > 1

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
      `m${id} [color="${color}", ${applyStyle(data, [':union'])}];`,
      `{rank=same; "${parents.join('", "')}"};`,
      parents.map(parent => {
        return `"${parent}":e -> m${id} [color="${color}", ${applyStyle(data, [':parent-link'])}];`
      }),
      parents2.map(parent => {
        return `"${parent}":e -> m${id} [color="${color}", ${applyStyle(data, [':parent-link', ':parent2-link'])}];`
      })
    ]
  }

  function renderLink () {
    return `m${id} -> k${id} [color="${color}", weight=10, ${applyStyle(data, [':parent-link'])}];`
  }

  function renderKids () {
    return [
      `k${id} [${applyStyle(data, [':children'])}];`,
      `{rank=same; "${children.join('", "')}"};`,
      children.map(kid => {
        return `k${id} -> "${kid}":w [weight=2, color="${color}", ${applyStyle(data, [':child-link'])}];`
      }),
      children2.map(kid => {
        return `k${id} -> "${kid}":w [weight=2, color="${color}", ${applyStyle(data, [':child-link', ':child2-link'])}];`
      })
    ]
  }

  function renderKidLinks () {
    return `{"${children.concat(children2).join('" -> "')}" [style=invis, weight=5]};`
  }
}

/*
 * Export
 */

module.exports = render
