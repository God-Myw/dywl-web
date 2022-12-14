import cookies from './util.cookies'

const util = function() {}
util.prototype.cookies = cookies
util.prototype.urlStringToArr = function(str) {
  try {
    if (typeof str !== 'string') {
      throw new Error(`需要string，传入${typeof str}`)
    }
  } catch (err) {
    console.log(err)
    return
  }
  str = str.replace(/\[/g, '')
  str = str.replace(/\]/g, '')
  str = str.replace(/,http/g, ',http')
  let arr = []
  arr = str.split(',http')
  let brr = []
  if (str === '') {
    brr = []
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].includes('http')) {
        brr.push(arr[i])
      } else {
        brr.push('http' + arr[i])
      }
    }
  }
  return brr
}
util.prototype.getImgNameFromUrl = function(url) {
  let imgName = ''
  let name = ''
  if (url.includes('.')) {
    imgName = url.split('/').slice(-1)[0]
    name = imgName.split('.')[0]
  }
  return name
}
util.prototype.urlMatchFileType = function(url) {
  if (/\?/g.test(url)) {
    url = url.split('?')[0]
  }
  if (/.(png|jpg|jpeg|gif)$/g.test(url)) {
    return 'image'
  }
  if (
    /.(avi|flv|mpg|mpeg|mpe|m1v|m2v|mpv2|mp2v|dat|ts|tp|tpr|pva|pss|mp4|m4v|m4p|m4b|3gp|3gpp|3g2|3gp2|ogg|mov|qt|amr|rm|ram|rmvb|rpm)$/g.test(
      url
    )
  ) {
    return 'video'
  }
}
export default new util()
