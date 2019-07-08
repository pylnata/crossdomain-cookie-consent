import '../polyfills'
import { setCookie } from '../helpers/cookie'
import styles from '../styles'

class BaseLib {
  constructor(options) {
    this.options = options
    this.agreeActionHandler = this.agreeActionHandler.bind(this)
  }

  saveConsentCookie() {
    setCookie(
      this.options.cookieName,
      this.options.cookieValue,
      this.options.cookieValidDays,
      this.options.portalDomain
    )
  }

  hideConsent() {
    let opacity = 1
    const fadeOut = () => {
      if (opacity > 0) {
        opacity -= 0.3
        setTimeout(() => {
          fadeOut()
        }, 100)
        document.getElementById('cc_container').style.opacity = opacity
      } else {
        document.getElementById('cc_container').remove()
      }
    }
    fadeOut()
  }

  // Function executed once "Agree" button is pressed
  agreeActionHandler() {
    this.hideConsent()
    this.saveConsentCookie()
  }

  /**
   * Function to show div with cookie consent
   */
  showConsent() {
    let style = document.createElement('style')
    style.innerHTML = styles

    document.body.appendChild(style)
    let div = document.createElement('div')
    div.setAttribute('id', 'cc_container')
    div.innerHTML = `<div id="cc_div"><div class="cc_img"></div><div class="cc_right_content"><div class="cc_text">
    ${this.options.text}
    </div><div><button id="cc_good">${this.options.textButton}</button></div></div></div>`
    document.body.appendChild(div)
    document.getElementById('cc_good').addEventListener('click', this.agreeActionHandler)
  }
}

export default BaseLib
