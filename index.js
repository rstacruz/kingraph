const redent = require('strip-indent')
const map = require('object-loops/map')
const values = require('object-loops/values')
const normalize = require('./lib/normalize')
const applyStyle = require('./lib/apply_style')

const COLORS = [
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#f1c40f',
  '#e67e22',
  '#e74c3c'
]

const SYMBOLS = {
  male: '♂',
  female: '♀',
  deceased: '†'
}

function render (data) {
  data = normalize(data)
  var output = []

  const people = data.people
  const families = data.families || []

  return redent(`
    digraph G {
      # Header
      edge [${applyStyle(data, [':edge'])}];
      node [${applyStyle(data, [':node'])}];
      ${applyStyle(data, [':digraph'], { sep: '; ' })};

      # People
      ${values(map(people, (p, id) => renderPerson(p, id, data))).join('\n')}
      ${values(map(families, (f, id) => renderFamily(f, id, data))).join('')}
    }
  `)
}

function renderPerson (person, id, data) {
  const label =
    '<table align="center" border="0" cellpadding="0" cellspacing="2" width="4">' +
    '<tr><td align="center">' +
    `${person.name || id}</td></tr>` +
    '<tr><td align="center">' +
    '<font point-size="10" color="#aaaaaa">' +
    `${person.fullname || person.name}</font></td></tr></table>`

  return `"${id}" [label=<${label}>, ${applyStyle(data, person.class || [])}];`
}

function renderFamily (family, id, data) {
  const color = COLORS[id % COLORS.length]
  const parents = family.parents || []
  const parents2 = family.parents2 || []
  const children = family.children || []
  const children2 = family.children2 || []

  const hasParents = (parents.length + parents2.length) > 0
  const hasChildren = (children.length + children.length) > 0
  const hasManyChildren = (children.length + children.length) > 1

  return redent(`
    ${(hasParents) ? `
      # Family ${id}
      m${id} [color="${color}", ${applyStyle(data, [':union'])}];
      {rank=same; "${parents.join('", "')}"};
      ${parents.map(parent => {
        return `"${parent}":e -> m${id} [color="${color}", ${applyStyle(data, [':parent-link'])}];`
      }).join('\n')}
      ${parents2.map(parent => {
        return `"${parent}":e -> m${id} [color="${color}", ${applyStyle(data, [':parent-link', ':parent2-link'])}];`
      }).join('\n')}
    ` : ''}

    ${(hasParents && hasChildren) ? `
      m${id} -> k${id} [color="${color}", weight=10, ${applyStyle(data, [':parent-link'])}];
    ` : ''}

    ${hasChildren ? `
      k${id} [${applyStyle(data, [':children'])}];
      {rank=same; "${children.join('", "')}"};
      ${children.map(kid => {
        return `k${id} -> "${kid}":w [weight=2, color="${color}", ${applyStyle(data, [':child-link'])}];`
      }).join('\n')}
      ${children2.map(kid => {
        return `k${id} -> "${kid}":w [weight=2, color="${color}", ${applyStyle(data, [':child-link', ':child2-link'])}];`
      }).join('\n')}
    ` : ''}

    ${hasManyChildren > 1 ? `
      {"${children.concat(children2).join('" -> "')}" [style=invis, weight=5]};
    ` : ''}
  `)
}

/*
 * Export
 */

module.exports = render
