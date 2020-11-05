export default  {
  /**
   * 数字转中文数字
   * @param num:number
   * @returns {*}
   */
  toChinesNum(num) {
    var arr1 = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九')
    var arr2 = new Array('', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿')//可继续追加更高位转换值
    if (!num || isNaN(num)) {
      return '零'
    }
    var english = num.toString().split('')
    var result = ''
    for (var i = 0; i < english.length; i++) {
      var des_i = english.length - 1 - i // 倒序排列设值
      result = arr2[i] + result
      var arr1_index = english[des_i]
      result = arr1[arr1_index] + result
    }
    // 将【零千、零百】换成【零】 【十零】换成【十】
    result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十')
    // 合并中间多个零为一个零
    result = result.replace(/零+/g, '零')
    // 将【零亿】换成【亿】【零万】换成【万】
    result = result.replace(/零亿/g, '亿').replace(/零万/g, '万')
    // 将【亿万】换成【亿】
    result = result.replace(/亿万/g, '亿')
    // 移除末尾的零
    result = result.replace(/零+$/, '')
    // 将【零一十】换成【零十】
    // result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十
    // 将【一十】换成【十】
    result = result.replace(/^一十/g, '十')
    return result
  },

  secondToString(second) {
    return second && completionTime(Math.floor(second / 3600)) + ':' + completionTime(Math.floor(Math.floor(second % 3600) / 60)) + ':' + completionTime(second % 60)
  },

  oneValues() {
    let args = {}
    let query = location.search.substring(1)
    let pairs = query.split('&')
    for (let i = 0; i < pairs.length; i++) {
      let pos = pairs[i].indexOf('=')
      if (pos === -1) continue
      let name = pairs[i].substring(0, pos)
      let value = pairs[i].substring(pos + 1)
      value = decodeURIComponent(value)
      args[name] = value
    }
    return args
  },

  /**
   * 补全时间
   * @param string
   * @returns {*}
   */
  completionTime(string) {
    if (string.toString().length === 1) {
      return '0' + string
    }
    return string
  },

  /**
   * 判断是不是ie浏览器
   * @returns {*}
   * @constructor
   */
  IEVersion() {
    let userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
    let isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE<11浏览器
    let isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
    let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
    if (isIE) {
      let reIE = new RegExp('MSIE (\\d+\\.\\d+);')
      reIE.test(userAgent)
      let fIEVersion = parseFloat(RegExp['$1'])
      if (fIEVersion === 7) {
        return 7
      } else if (fIEVersion === 8) {
        return 8
      } else if (fIEVersion === 9) {
        return 9
      } else if (fIEVersion === 10) {
        return 10
      } else {
        return 6 // IE版本<=7
      }
    } else if (isEdge) {
      return 'edge' // edge
    } else if (isIE11) {
      return 11 // IE11
    } else {
      return -1 // 不是ie浏览器
    }
  },

  // js乘法计算浮点数失准解决方法
  accMul(arg1, arg2) {
    let m = 0
    let s1 = arg1.toString()
    let s2 = arg2.toString()
    try {
      m += s1.split('.')[1].length
    } catch (e) {
    }
    try {
      m += s2.split('.')[1].length
    } catch (e) {
    }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
  },

  numberToUnits(num) {
    if (num >= 1000 && num < 10000) {
      return (num / 1000).toFixed(0) + '千'
    } else if (num >= 10000 && num < 1000000) {
      return Math.round(num / 10000) + '万'
    } else if (num >= 1000000) {
      return Math.round(num / 10000) + '百万'
    } else {
      return num
    }
  },
  deepClone:deepClone
  
}
function deepClone(target) {
  // 定义一个变量
  let result;
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === 'object') {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = []; // 将result赋值为一个数组，并且执行遍历
      for (let i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]))
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null) {
      result = null;
      // 判断如果当前的值是一个RegExp对象的话，直接赋值    
    } else if (target.constructor === RegExp) {
      result = target;
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {};
      for (let i in target) {
        result[i] = deepClone(target[i]);
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target;
  }
  // 返回最终结果
  return result;
}
