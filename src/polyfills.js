function includes(search, start) {
  if (typeof start !== 'number') {
    start = 0
  }
  if (start + search.length > this.length) {
    return false
  } else {
    return this.indexOf(search, start) !== -1
  }
}

function remove() {
  this.parentNode && this.parentNode.removeChild(this)
}

if (!String.prototype.includes) {
  String.prototype.includes = includes
}

if (!Element.prototype.remove) Element.prototype.remove = remove
if (Text && !Text.prototype.remove) Text.prototype.remove = remove
