const defaults = {
  cookieName: 'shared_cookie_consent',
  cookieValue: 'yes',
  cookieValidDays: 3650,
  useRedirects: false,
  receivePageUrl: '',
  portalDomain: '',
  allowedDomains: [],
  text:
    'We use cookies to personalise content and ads, to provide social media features and to analyse our traffic. You consent to our cookies if you continue to use our website.',
  textButton: 'Agree',
}

export default class Options {
  constructor(options = {}, global = defaults) {
    if (!options.receivePageUrl) throw Error('[SharedCookieConsent] receivePageUrl option is required')
    if (!options.portalDomain) throw Error('[SharedCookieConsent] portalDomain option is required')

    Object.assign(this, this.defaultsOverride(global, options))

    const match = this.receivePageUrl.match(/https?:\/\/(www[0-9]?\.)?(.[^/:]+)/i)
    this.portalUrl = match[0]
    this.checkAllowedDomains = this.allowedDomains.length > 0
  }

  defaultsOverride(defaults, overrides) {
    let result = {}
    for (const k in defaults) {
      if (overrides.hasOwnProperty(k)) {
        result[k] = overrides[k]
      } else {
        result[k] = defaults[k]
      }
    }
    return result
  }
}
