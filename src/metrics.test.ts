import {expect} from 'chai'
import  Metric, {MetricsHandler} from './metrics'


const dbPath: string = 'db_test'
var dbMet: MetricsHandler

describe('Metrics', function () {
  before(function () {
    LevelDB.clear(dbPath)
    dbMet = new MetricsHandler(dbPath)
  })

  describe('#getOne', function () {
    it('should get empty array on non existing group', function (done) {
      dbMet.getOne(0, function (err: Error | null, result?: Metric[] ){
        expect(err).to.be.null
        expect(result).to.not.be.undefined
        expect(result).to.be.empty
        done()
      })
    })
  })
  9
  after(function () {
    dbMet.closeDb()
  })
})

