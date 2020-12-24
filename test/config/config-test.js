const assert = require('assert')
const Config = require('../../src/config/config')

describe('Config Test', () => {

  it('get config', (done) => {
    assert.strictEqual('5555', Config.PORT)
    assert.strictEqual('mongodb://127.0.0.1:27017/correios-teste', Config.database.stringConnection)
    done()
  })
})
