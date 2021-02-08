function stringToByte(str) {
  var bytes = new Array()
  var len, c
  len = str.length
  for (var i = 0; i < len; i++) {
    c = str.charCodeAt(i)
    if (c >= 0x010000 && c <= 0x10FFFF) {
      bytes.push(((c >> 18) & 0x07) | 0xF0)
      bytes.push(((c >> 12) & 0x3F) | 0x80)
      bytes.push(((c >> 6) & 0x3F) | 0x80)
      bytes.push((c & 0x3F) | 0x80)
    } else if (c >= 0x000800 && c <= 0x00FFFF) {
      bytes.push(((c >> 12) & 0x0F) | 0xE0)
      bytes.push(((c >> 6) & 0x3F) | 0x80)
      bytes.push((c & 0x3F) | 0x80)
    } else if (c >= 0x000080 && c <= 0x0007FF) {
      bytes.push(((c >> 6) & 0x1F) | 0xC0)
      bytes.push((c & 0x3F) | 0x80)
    } else {
      bytes.push(c & 0xFF)
    }
  }
  return bytes

}
function utf8ByteToUnicodeStr(utf8Bytes) {
  var unicodeStr = ""
  for (var pos = 0; pos < utf8Bytes.length;) {
    var flag = utf8Bytes[pos]
    var unicode = 0
    if ((flag >>> 7) === 0) {
      unicodeStr += String.fromCharCode(utf8Bytes[pos])
      pos += 1

    } else if ((flag & 0xFC) === 0xFC) {
      unicode = (utf8Bytes[pos] & 0x3) << 30
      unicode |= (utf8Bytes[pos + 1] & 0x3F) << 24
      unicode |= (utf8Bytes[pos + 2] & 0x3F) << 18
      unicode |= (utf8Bytes[pos + 3] & 0x3F) << 12
      unicode |= (utf8Bytes[pos + 4] & 0x3F) << 6
      unicode |= (utf8Bytes[pos + 5] & 0x3F)
      unicodeStr += String.fromCharCode(unicode)
      pos += 6

    } else if ((flag & 0xF8) === 0xF8) {
      unicode = (utf8Bytes[pos] & 0x7) << 24
      unicode |= (utf8Bytes[pos + 1] & 0x3F) << 18
      unicode |= (utf8Bytes[pos + 2] & 0x3F) << 12
      unicode |= (utf8Bytes[pos + 3] & 0x3F) << 6
      unicode |= (utf8Bytes[pos + 4] & 0x3F)
      unicodeStr += String.fromCharCode(unicode)
      pos += 5

    } else if ((flag & 0xF0) === 0xF0) {
      unicode = (utf8Bytes[pos] & 0xF) << 18
      unicode |= (utf8Bytes[pos + 1] & 0x3F) << 12
      unicode |= (utf8Bytes[pos + 2] & 0x3F) << 6
      unicode |= (utf8Bytes[pos + 3] & 0x3F)
      unicodeStr += String.fromCharCode(unicode)
      pos += 4

    } else if ((flag & 0xE0) === 0xE0) {
      unicode = (utf8Bytes[pos] & 0x1F) << 12;;
      unicode |= (utf8Bytes[pos + 1] & 0x3F) << 6
      unicode |= (utf8Bytes[pos + 2] & 0x3F)
      unicodeStr += String.fromCharCode(unicode)
      pos += 3

    } else if ((flag & 0xC0) === 0xC0) { //110
      unicode = (utf8Bytes[pos] & 0x3F) << 6
      unicode |= (utf8Bytes[pos + 1] & 0x3F)
      unicodeStr += String.fromCharCode(unicode)
      pos += 2

    } else {
      unicodeStr += String.fromCharCode(utf8Bytes[pos])
      pos += 1
    }
  }
  return unicodeStr
}



const someBy = stringToByte('%{^/]我')
let list = []
for (let index = 0; index < someBy.length; index++) {
  console.log(someBy[index])
  list.push(someBy[index])
}
console.log(list)
console.log(utf8ByteToUnicodeStr(list))
