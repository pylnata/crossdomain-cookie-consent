import BasePlugin from './BasePlugin'

import { getCookie, setCookie } from '../helpers/cookie'
import { getQueryString } from '../helpers/url'

export default class IframePlugin extends BasePlugin {
  init() {
    window.addEventListener('message', (event) => {
      /**
       * Do nothing if message from unauthorized url
       */
      if (this.options.checkAllowedDomains && !this.options.allowedDomains.includes(event.origin.split('//')[1])) {
        // console.log('This domain is not allowed to connect to portal')
        return
      }
      if (event.data === 'if_cookie_exists') {
        /**
         * Check if third-party sites allowed to set cookies and return this information to parent window
         */
        setCookie('test_3d_c', 1)
        if (!getCookie('test_3d_c')) {
          event.source.postMessage('third_party_cookies_are_blocked', `${event.origin}`)
          return
        }
        /**
         * Post information about agreement cookie at portal to parent window
         */
        event.source.postMessage(getCookie(this.options.cookieName) ? 'yes' : 'no', `${event.origin}`)
      } else if (event.data === 'set_portal_cookie') {
        this.saveConsentCookie()
      }
    })
    this.addRedirectFunctionalityInIframe()
  }

  /**
   * Logic used  if use_redirect is true
   */
  addRedirectFunctionalityInIframe() {
    const agree = getQueryString('agree')
    const check = getQueryString('check')
    if (!agree && !check) return

    let redirectUrl = document.referrer

    if (check == '1') {
      const cookieValue = getCookie(this.options.cookieName)
      const s = redirectUrl.includes('?') ? '&' : '?'
      if (cookieValue) {
        redirectUrl += s + 'cc=' + cookieValue
      }
    } else {
      this.saveConsentCookie()
    }
    window.location.href = decodeURIComponent(redirectUrl)
  }
}
