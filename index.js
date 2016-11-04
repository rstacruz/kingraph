const redent = require('strip-indent')
const map = require('object-loops/map')
const values = require('object-loops/values')

function render (data) {
  var output = []

  const people = normalizePeople(data.people || [], data.options || {})
  const families = data.families || []

  return redent(`
    digraph G {
      # Header
      edge [dir=none];
      node [shape=box, fontname="sans-serif", width=2];
      rankdir=LR;
      ranksep=0.4;
      splines=polyline;

      # People
      ${values(map(people, renderPerson)).join('\n')}
      ${values(map(families, renderFamily)).join('')}
    }
  `)
}

function renderPerson (person, id) {
  const label = person.name
  return `"${id}" [color="blue", label=<${label}>];`
}

function renderFamily (family, id) {
  const parents = family.parents || []
  const offsprings = family.offsprings || []
  return redent(`
    # Family ${id}
    m${id} [shape=diamond, label="", height=0.2, width=0.2];
    k${id} [shape=circle, label="", height=0.01, width=0.01];
    {rank=same; "${parents.join('", "')}"};
    {rank=same; "${offsprings.join('", "')}"};
    ${parents.map(parent => {
      return `"${parent}":e -> m${id};`
    }).join('\n')}
    m${id} -> k${id};
    ${offsprings.map(kid => {
      return `k${id} -> "${kid}":w;`
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
