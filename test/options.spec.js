import 'chai/register-should'
import Options from '../src/Options'

describe('Options', () => {

  function newOptions() {
    return new Options({
      portalDomain: 'portal.com',
      receivePageUrl: 'http://portal.com/receive.html',
      allowedDomains: ['site1.com', 'site2.com'],
    })
  }
  let options
  before(() => {
    options = newOptions()
  })
  describe('constructor()', () => {
    it('should make an assignment to class instance', () => {
      should.exist(options.portalDomain)
    })
    it('should set defaults', () => {
      should.equal(options.cookieName, 'shared_cookie_consent')
    })
    it('should override defaults', () => {
     options.allowedDomains.should.eqls(['site1.com', 'site2.com'])
    })
  })
})
