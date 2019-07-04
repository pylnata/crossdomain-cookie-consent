/**
 * Get cookie by name function
 * @param {String} cname Cookie name
 */
export const getCookie = (cname) => {
  const name = cname + '='
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

/**
 * Set cookie function
 * @param {String} cname Cookie name
 * @param {String} cvalue Cookie value
 * @param {Number} days Expired Days
 * @param {String} domain Cookie Domain
 */
export const setCookie = (cname, cvalue, days, domain) => {
  if (domain && !domain.includes('.')) domain = ''
  let expires = ''
  if (days > 0) {
    const dt = new Date()
    dt.setTime(dt.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + dt.toGMTString()
  }
  const domainParam = domain ? ` domain=.${domain}; ` : ''
  document.cookie = `${cname}=${cvalue}${expires}; path=/;${domainParam}`
}
