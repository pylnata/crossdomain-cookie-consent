# Crossdomain-cookie-consent

This library solves the task to display cookie consent alert, shared within group of sites on different domains. A visitor who has once confirmed his consent to use cookies at one of the sites from the group will no longer be shown this alert at all other sites.

The main idea is that we have main site in group (let's call it a "portal") where we place special static page, that is used for communication between all sites in the group. 

## How to use

Let's consider that portal has address http://portal.com and we want to have shared cookie consent not only with it's subdomains http://subdomain1.portal.com, http://subdoman2.pportal.com, etc. but also with some sites on another domains http://site1.com, http://site2.com etc.

1. Create a static page receive.html (name is optional), that is assumed to be opened at address http://portal.com/receive.html and contains:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <script src="[PATH_TO_LIBRARY]/shared-cookie-consent.js"></script>
    <script>
      document.addEventListener(
        'DOMContentLoaded',
        function() {
          new SharedCookieConsent({
            portalDomain: 'portal.com',
            receivePage: 'http://portal.com/receive.html',
            allowedDomains: ['site1.com', 'site2.com'],
          })
        },
        false
      )
    </script>
  </body>
</html>
```

2. In code of every site of group (i.e. portal.com, subdomain*.portal.com, site*.com etc.), where we need shared cookie consent alert, add this code below:

```html
<script src="[PATH_TO_LIBRARY]/shared-cookie-consent.js"></script>
<script>
  document.addEventListener(
    'DOMContentLoaded',
    function() {
      new SharedCookieConsent({portalDomain: 'portal.com', receivePage: 'http://portal.com/receive.html' })
    },
    false
  )
</script>
```

Configuration of CookieConsent:

```javascript
{
  // 'portalDomain' is a domain of portal site. For instance: 'portal.com'. THIS OPTION IS REQUIRED
  portalDomain: '', // default
  // 'receivePage' is a url to special page at portal site, that was created on 1 step. For instance: 'http://portal.com/receive.html'. THIS OPTION IS REQUIRED
  receivePage: '', // default
  // 'allowedDomains' It makes sense to define this parameter only for configuration at receive.html (page created at first step). It contains a list of domains from group, other from portalUrl domain, that refer to portal and the check to access to portal will be perfomed every time someone another site calls  receive.html. You can leave it empty, then there is no check of access will be perfomed, but for security reasons it is recommended to set it.
  allowedDomains: [], // default
  // 'useRedirect' It makes sense to define this parameter in cofiguration on domains, other than the portalUrl domain only. If 'userRedirect' is set to true, then in the case of user uses browser with blocked third-party cookies,  redirect will be executed for getting information about user's agreement. Use this trick only if it suits your requirements. If `false` then on each site own cookie consent block will be shown.
  useRedirects: false, // default
  // 'text' is a message of cookie consent
  text: 'We use cookies to personalise content and ads, to provide social media features and to analyse our traffic. You consent to our cookies if you continue to use our website.', // default
  // 'textButton' label of button in cookie consent block
  textButton: 'Agree' // default
}
```

This library (with some changes) was created for and is used by http://foxford.ru projects.
