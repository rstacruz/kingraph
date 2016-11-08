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
    margin: 10
  },
  ':house-2': {
    color: '#ffffff'
  },
  // Family subgraph
  ':family': {
    label: '',
    style: 'invis',
    margin: 0
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
    style: 'filled',
    label: '',
    height: 0.1,
    width: 0.1
  },
  ':children': {
    shape: 'box',
    style: 'filled',
    label: '',
    height: 0.005, /* Make it look like a line. Brilliant! */
    penwidth: 0,
    width: 0.1
  },
  ':parent-link': {
    weight: 2 /* give priority to be straighter than parent2 */
  },
  ':parent2-link': {
    style: 'dotted',
    weight: 1
  },
  ':parent-child-link': {
    weight: 3 /* prefer bridges to be straight */
  },
  ':child-link': {
    dir: 'forward',
    arrowhead: 'tee',
    arrowsize: 2,
    weight: 2
  },
  ':child2-link': {
    style: 'dotted',
    weight: 1
  },
}

module.exports = DEFAULT_STYLES
