import { JSDOM } from 'jsdom'
import "jsdom-global/register"
import "chai/register-expect"

import BaseLib from "../src/libs/BaseLib"
import Options from "../src/Options"

describe("BaseLib", function () {

  const options = new Options({portalDomain: 'portal.com', receivePageUrl: 'http://portal.com/receive.html'})

  function newBaseLib() {
    return new BaseLib(options)
  }

  let lib
  before(() => {
    const { document } = (new JSDOM('')).window;
    global.document = document;
    lib = newBaseLib()
  })

  it ('appends div with id="cc_container" to body ', () => {
    lib.showConsent()
    expect(document.getElementById('cc_container').innerHTML).to.not.be.empty;
  });

  it ('remove div with id="cc_container" from document', () => {
    lib.hideConsent()
    setTimeout(() => {
      expect(document.getElementById('cc_container')).to.be.null
    }, 1000)
  })
})
