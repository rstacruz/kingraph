const test = require('tape')
const gen = require('./id_generator')

test('idGenerator()', t => {
  let get
  get = gen()

  t.equal(get('family'), 0)
  t.equal(get('family'), 1)
  t.equal(get('family'), 2)
  t.equal(get('other'), 0)
  t.equal(get('other'), 1)

  t.end()
})
