const test = require('tape')
const slugify = require('./slugify')

test('slugify()', t => {
  t.equal(slugify('hi'), 'hi')
  t.equal(slugify(['hi', 'world']), 'hi-world')
  t.equal(slugify(['hi', 0]), 'hi-0')
  t.equal(slugify(['hi', 'k'], { sep: '_' }), 'hi_k')
  t.equal(slugify(['hi', ['k']], { sep: '_' }), 'hi_k')
  t.end()
})
