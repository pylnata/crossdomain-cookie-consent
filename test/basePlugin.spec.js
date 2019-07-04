import { JSDOM } from 'jsdom'
import "jsdom-global/register"
import "chai/register-expect"

import BasePlugin from "../src/plugins/BasePlugin"
import Options from "../src/Options"
import { getCookie } from '../src/helpers/cookie';

describe("BasePlugin", function () {

  const options = new Options({portalDomain: 'portal.com', receivePageUrl: 'http://portal.com/receive.html'})

  function newBasePlugin() {
    return new BasePlugin(options)
  }

  let plugin
  before(() => {
    const { document } = (new JSDOM('')).window;
    global.document = document;
    plugin = newBasePlugin()
  })

  it ('appends div with id="cc_container" to body ', () => {
    plugin.showConsent()
    expect(document.getElementById('cc_container').innerHTML).to.not.be.empty;
  });

  it ('remove div with id="cc_container" from document', () => {
    plugin.hideConsent()
    setTimeout(() => {
      expect(document.getElementById('cc_container')).to.be.null
    }, 1000)
  })
/*
  it ('set cookie with name="shared_cookie_consent" and value="yes"', () => {
    plugin.saveConsentCookie()
    expect(getCookie(plugin.options.cookieName)).to.be.equal('yes')
  })
  */
})
