import IframeLib from './libs/IframeLib'
import PortalLib from './libs/PortalLib'
import NoPortalLib from './libs/NoPortalLib'
import Options from './Options'
import './polyfills'

export default class SharedCookieConsent {
  constructor(options = {}) {
    this.options = new Options(options)
    this.modeLib = this._getLib()
    this.modeLib.init()
  }

  _getLib() {
    if (window.location.href.includes(this.options.receivePageUrl)) {
      return new IframeLib(this.options)
    } else if (window.location.host === this.options.portalDomain) {
      return new PortalLib(this.options)
    } else {
      return new NoPortalLib(this.options)
    }
  }
}
