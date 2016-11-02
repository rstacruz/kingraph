function render (raw) {
  return raw
}

function run () {
  const cli = require('meow')(`
    Usage:
      $ family-tree

    Options:
      -h, --help       show usage information
      -v, --version    print version info and exit
  `, {
    boolean: ['help', 'version'],
    alias: {
      h: 'help', v: 'version'
    }
  })

  require('read-input')(cli.input)
  .then(res => {
    res.files.forEach(file => {
      var input = require('js-yaml').safeLoad(file.data)
      console.log(render(input))
    })
  })
}

if (!module.parent) {
  run()
} else {
  module.exports = render
}
