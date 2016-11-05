const test = require('tape')
const join = require('./join')

test('join()', t => {
  t.equal(join(['a', 'b'], { sep: ',' }), 'a,b')
  t.equal(join(['a', ['b']], { sep: ',' }), 'a,b')
  t.equal(join(['a', ['b', 'c']], { sep: ',' }), 'a,b,c')
  t.equal(join(['a', ['b', null, 'c']], { sep: ',' }), 'a,b,c')
  t.equal(join(['a', '', 'b'], { sep: ',' }), 'a,,b')
  t.equal(join(['a', false, 'b'], { sep: ',' }), 'a,b')
  t.end()
})
