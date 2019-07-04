import BasePlugin from './BasePlugin'

import '../polyfills'
import { getCookie } from '../helpers/cookie'
import { getQueryString } from '../helpers/url'

export default class PortalPlugin extends BasePlugin {
  init() {
    if (getCookie(this.options.cookieName) || this.saveCookieFromUrl()) {
      return
    }
    this.showConsent()
  }

  /**
   * if url has parameter cc=1 then save cookie
   */
  saveCookieFromUrl() {
    const cookie = getQueryString('cc')
    if (cookie) {
      this.saveConsentCookie()
      return true
    } else {
      return false
    }
  }
}
