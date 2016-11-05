const test = require('tape')
const join = require('./join')

test('join()', t => {
  t.equal(join(['a', 'b'], ','), 'a,b')
  t.equal(join(['a', ['b']], ','), 'a,b')
  t.equal(join(['a', ['b', 'c']], ','), 'a,b,c')
  t.equal(join(['a', ['b', null, 'c']], ','), 'a,b,c')
  t.end()
})
