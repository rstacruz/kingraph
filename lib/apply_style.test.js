const test = require('tape')
const applyStyle = require('./apply_style')

test('applyStyle()', t => {
  let out

  let data = {
    styles: {
      'hello': { color: 'gold', dir: 'none' },
      'world': { style: 'filled', color: 'blue' }
    }
  }

  out = applyStyle(data, ['hello'])
  t.deepEqual(out, ['color="gold"', 'dir="none"'],
    'single class')

  out = applyStyle(data, ['world'])
  t.deepEqual(out, ['style="filled"', 'color="blue"'],
    'single class')

  out = applyStyle(data, ['hello', 'world'])
  t.deepEqual(out, ['color="blue"', 'dir="none"', 'style="filled"'],
    'multiple classes')

  out = applyStyle(data, ['world', 'hello'])
  t.deepEqual(out, ['color="blue"', 'dir="none"', 'style="filled"'],
    'multiple classes, reordered')

  out = applyStyle(data, ['hello'], { before: { color: 'red' }})
  t.deepEqual(out, ['color="gold"', 'dir="none"'],
    'before')

  out = applyStyle(data, ['hello'], { after: { color: 'red' }})
  t.deepEqual(out, ['color="red"', 'dir="none"'],
    'after')

  t.end()
})
