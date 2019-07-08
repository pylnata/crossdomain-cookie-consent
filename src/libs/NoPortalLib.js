import BaseLib from './BaseLib'

import { getCookie, setCookie } from '../helpers/cookie'

export default class NoPortalLib extends BaseLib {
  constructor(options) {
    super(options)
    /**
     * Flag to define if browser blocked Third-Party access to Cookies. Defined automatically below
     */
    this.thirdPartyCookiesBlocked = false
  }

  init() {
    if (getCookie(this.options.cookieName)) {
      return
    }
    if (getCookie('third_cookies_blocked')) {
      this.addListenerToLinks()
      return
    }
    this.addIframe()
    this.getMessageFromPortal()
  }

  addIframe() {
    /**
     * Create iframe with src to special page at portal
     */
    const iframe = document.createElement('iframe')
    iframe.src = this.options.receivePageUrl
    iframe.id = 'iframe_fxf'
    iframe.style.cssText = 'width:0;height:0;border:0; border:none;'
    document.body.appendChild(iframe)
    /**
     * Post request about agreement cookie to portal
     */
    window.addEventListener('load', () => {
      iframe.contentWindow.postMessage('if_cookie_exists', this.options.portalUrl)
    })
  }

  getMessageFromPortal() {
    /**
     *  Process answer from iframe
     */
    window.addEventListener('message', (event) => {
      if (event.origin !== this.options.portalUrl) {
        return
      }
      if (event.data == 'third_party_cookies_are_blocked') {
        this.thirdPartyCookiesBlocked = true
        setCookie('third_cookies_blocked', true)

        if (this.options.useRedirects) {
          const wasChecked = getCookie('checked')
          if (!wasChecked) {
            setCookie('checked', true)
            /**
             * redirect to portal for cookie value and return back with it's value in url
             */
            window.location.href = this.options.receivePageUrl + '?check=1'
            return
          }
        }
        this.showConsent()
      } else if (event.data == 'no') {
        this.showConsent()
      } else if (event.data == 'yes') {
        // If cookie exists at portal set local cookie to not do all this stuff next time
        this.saveConsentCookie()
      }
    })
  }

  saveConsentCookie() {
    setCookie(this.options.cookieName, this.options.cookieValue, this.options.cookieValidDays)
  }

  agreeActionHandler() {
    super.agreeActionHandler()
    if (!this.thirdPartyCookiesBlocked) {
      document.getElementById('iframe_fxf').contentWindow.postMessage('set_portal_cookie', this.options.portalUrl)
    } else if (this.options.useRedirects) {
      window.location.href = this.options.receivePageUrl + '?agree=1'
    } else {
      this.addListenerToLinks()
    }
  }

  addListenerToLinks() {
    const links = document.body.querySelectorAll('a')
    if (links.length > 0) {
      const goTo = (event) => {
        event.preventDefault()
        const link = event.target
        if (link.href.includes(this.options.portalUrl) && getCookie(this.options.cookieName)) {
          window.location.href = link.href + (link.href.includes('?') ? `&cc=1` : '?cc=1')
        } else {
          window.location.href = link.href
        }
      }
      links.forEach((link) => {
        link.addEventListener('click', goTo, false)
      })
    }
  }
}
