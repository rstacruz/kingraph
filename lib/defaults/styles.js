const DEFAULT_STYLES = {
  ':edge': {
    dir: 'none',
    color: '#cccccc'
  },
  ':house': {
    style: 'filled',
    color: '#fafafa',
    labeljust: 'l',
    fontname: 'sans-serif',
    fontsize: 16,
  },
  ':house-2': {
    color: '#ffffff'
  },
  // Family subgraph
  ':family': {
    label: ''
  },
  ':node': {
    shape: 'box',
    fontname: 'sans-serif',
    width: 2.5,
    bgcolor: 'white',
    color: '#cccccc'
  },
  ':digraph': {
    rankdir: 'LR',
    ranksep: 0.4,
    splines: 'ortho'
  },
  ':union': {
    shape: 'diamond',
    label: '',
    height: 0.1,
    width: 0.1,
    style: 'filled'
  },
  ':children': {
    shape: 'circle',
    label: '',
    height: 0.01,
    width: 0.01
  },
  ':parent-link': {},
  ':parent2-link': {
    style: 'dotted'
  },
  ':child-link': {
    dir: 'forward',
    arrowhead: 'tee',
    arrowsize: 2
  },
  ':child2-link': {
    style: 'dotted'
  },
}

module.exports = DEFAULT_STYLES
