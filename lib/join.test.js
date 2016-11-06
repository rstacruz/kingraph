const test = require('tape')
const join = require('./join')

test('join()', t => {
  t.equal(join(['a', 'b'], { sep: ',' }), 'a,b')
  t.equal(join(['a', ['b']], { sep: ',' }), 'a,b')
  t.equal(join(['a', ['b', 'c']], { sep: ',' }), 'a,b,c')
  t.equal(join(['a', ['b', null, 'c']], { sep: ',' }), 'a,b,c')
  t.equal(join(['a', '', 'b'], { sep: ',' }), 'a,,b')
  t.equal(join(['a', false, 'b'], { sep: ',' }), 'a,b')
  t.equal(join(['a {', { indent: ['hello'] }, '}'], { sep: '\n', indent: '  ' }), 'a {\n  hello\n}')
  t.equal(join(['a {', { indent: ['hello'] }, '}']), 'a {\n\thello\n}')
  t.equal(join(['a {', { indent: ['hello {', { indent: ['world'] }, '}'] }, '}']),
    'a {\n\thello {\n\t\tworld\n\t}\n}')
  t.end()
})
