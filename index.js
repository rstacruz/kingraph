const redent = require('strip-indent')
const map = require('object-loops/map')
const values = require('object-loops/values')

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

function render (data) {
  var output = []

  const people = normalizePeople(data.people || [], data.options || {})
  const families = data.families || []

  return redent(`
    digraph G {
      # Header
      edge [dir=none, color="#cccccc"];
      node [shape=box, fontname="sans-serif", width=4, color="#cccccc"];
      rankdir=LR;
      ranksep=0.4;
      splines=ortho;

      # People
      ${values(map(people, renderPerson)).join('\n')}
      ${values(map(families, renderFamily)).join('')}
    }
  `)
}

function renderPerson (person, id) {
  const label = person.name
  return `"${id}" [fillcolor="blue;0.02:white", label=<${label}>];`
}

function renderFamily (family, id) {
  const color = COLORS[id % COLORS.length]
  const parents = family.parents || []
  const offsprings = family.offsprings || []
  return redent(`
    # Family ${id}
    m${id} [shape=diamond, label="", height=0.2, width=0.2, style=filled, color="${color}"];
    k${id} [shape=circle, label="", height=0.01, width=0.01];
    {rank=same; "${parents.join('", "')}"};
    {rank=same; "${offsprings.join('", "')}"};
    ${parents.map(parent => {
      return `"${parent}":e -> m${id} [color="${color}"];`
    }).join('\n')}
    m${id} -> k${id} [color="${color}"];
    ${offsprings.map(kid => {
      return `k${id} -> "${kid}":w [color="${color}"];`
    }).join('\n')}
  `)
}

/**
 * Normalizes people options.
 */

function normalizePeople (people, options) {
  return map(people, p => normalizePerson(p, options))
}

/**
 * Normalizes person names and such.
 */

function normalizePerson (person, options) {
  return person
}

/*
 * Export
 */

module.exports = render
