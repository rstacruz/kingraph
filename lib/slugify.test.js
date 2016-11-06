const test = require('tape')
const slugify = require('./slugify')

test('slugify()', t => {
  t.equal(slugify('hi'), 'hi')
  t.equal(slugify(['hi', 'world']), 'hi_world')
  t.equal(slugify(['hi', 0]), 'hi_0')
  t.equal(slugify(['hi', 'k'], { sep: '-' }), 'hi-k')
  t.equal(slugify(['hi', ['k']], { sep: '-' }), 'hi-k')
  t.end()
})
