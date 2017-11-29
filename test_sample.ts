import * as channelmanager from '../../../src/app/clients/channelmanager'
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import * as sinon from 'sinon'
import * as domain from '@siteminder/nexus2-domain'
import factory from '@siteminder/nexus2-domain/factories'
import * as bluebird from 'bluebird'
chai.use(chaiAsPromised)

const { assert, expect } = chai

/* To do almost no logic inside currently */
describe.only('clients#channelmanager', () => {
  describe('Test Provision', () => {
    let channelmanagerstub
    beforeEach(() => {
      channelmanagerstub = sinon.stub(channelmanager, 'getClient').returns({
        mutate: (query: any) => {
          return { data: { createHotel: { uuid: 'xxxx-xxxxx-xxx-xxxx' } } }
        }
      })
    })

    afterEach(() => {
      channelmanagerstub.resetBehavior()
    })

    it('should return channel manager uuid', () => {
      return channelmanager
        .provision(
          {
            id: 'id',
            currency: 'currency',
            timezone: 'timezone',
            region: 'apac'
          },
          {
            whiteLabelCode: 'whiteLabelCode',
            name: 'name',
            street: 'street',
            suburb: 'suburb',
            postcode: 'postcode',
            state: 'state',
            country: 'country'
          }
        )
        .then(uuid => {
          assert(uuid === 'xxxx-xxxxx-xxx-xxxx')
        })
    })
  })
})

