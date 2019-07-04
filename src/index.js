import IframePlugin from './plugins/IframePlugin'
import PortalPlugin from './plugins/PortalPlugin'
import NoPortalPlugin from './plugins/NoPortalPlugin'
import Options from './Options'
import './polyfills'

export default class SharedCookieConsent {
  constructor(options = {}) {
    this.options = new Options(options)
    this.modePlugin = this._getPlugin()
    this.modePlugin.init()
  }

  _getPlugin() {
    if (window.location.href.includes(this.options.receivePageUrl)) {
      return new IframePlugin(this.options)
    } else if (window.location.host === this.options.portalDomain) {
      return new PortalPlugin(this.options)
    } else {
      return new NoPortalPlugin(this.options)
    }
  }
}
