import React from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

// 通用组件
class BaseComponent {
  // 首字母大写
  static lowerCase(string) {
    return string.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase());
  }

  // 首字母大写
  static upperCase(string) {
    return string.toUpperCase();
  }

  // 将小数点清零
  static toInteger(num) {
    num = Math.round(parseFloat(num));
    return num;
  }

  // 保留一位小数点
  static toDecimal(num) {
    num = Math.round(parseFloat(num) * 10) / 10;
    if (num.toString().indexOf('.') < 0) {
      num = num.toString() + '.0';
    }
    return num;
  }

  // 保留两位小数点
  static toFloat(num) {
    num = Math.round(parseFloat(num) * 100) / 100;
    if (num.toString().indexOf('.') < 0) {
      num = num.toString() + '.00';
    }
    return num;
  }

  // 保留两位小数点，一位小数自动补零，例如：100000.00 | 100000.10
  static toZero(num) {
    num = Math.round(parseFloat(num) * 100) / 100;
    let xsd = num.toString().split('.');
    //Ext.log(xsd.length);
    if (xsd.length == 1) {
      num = num.toString() + '.00';
      return num;
    }
    if (xsd.length > 1) {
      if (xsd[1].length < 2) {
        num = num.toString() + '0';
      }
      return num;
    }
  }

  // 每三位数加逗号并且补零，例如：10,000,000.00
  static fixedPointNum(num, digits) {
    let floatNum;

    if (
      num === '' ||
      num === 'undefined' ||
      num === null ||
      num === undefined ||
      num === 'null'
    ) {
      num = 0;
    }

    if (
      digits === '' ||
      digits === 'undefined' ||
      digits === null ||
      digits === undefined ||
      digits === 'null'
    ) {
      digits = 2;
    }

    floatNum = parseFloat(num);

    if (isNaN(floatNum) || floatNum === 0) {
      return digits === 0 ? '0' : '0.00';
    } else {
      if (digits === 0 && floatNum < 1) {
        return '0';
      } else {
        return this.setComma(this.toZero(num));
      }
    }
  }

  // 每三位数加逗号，例如：100,000,000
  static setComma(num) {
    num = num + '';

    if (num !== '') {
      let regx = new RegExp(/(-?\d+)(\d{3})/);
      let bExists = num.indexOf('.', 0);
      let strArr = num.split('.');

      //콤마 표시
      while (regx.test(strArr[0])) {
        strArr[0] = strArr[0].replace(regx, '$1,$2');
      }

      //소수점 표시
      if (bExists > -1) return strArr[0] + '.' + strArr[1];
      else return strArr[0];
    } else {
      return '';
    }
  }

  // 个位数前面补零
  static zeroize(n, len) {
    len = len || 2;
    n += '';
    while (n.length < len) {
      n = '0' + n;
    }
    return n;
  }

  // 对象不是空
  static isNotEmpty(obj) {
    return this.isEmpty(obj) === false;
  }

  // 对象是空
  static isEmpty(obj) {
    if (obj === undefined) {
      return true;
    } else if (obj === null) {
      return true;
    } else if (obj === '') {
      return true;
    }
    return false;
  }

  // atob 加密
  static atob(string) {
    return Dimensions.get('window').atob(string);
  }

  // 转多国际 I18N JSON
  static parseMessageCSVI18n(csv) {
    let items = csv.split('\n'),
      resultObj = {
        namespace: '',
        cbb_items: {},
      };

    items.map((item, i) => {
      let itemSepa = item.split(',');

      if (itemSepa[0] === 'namespace') {
        resultObj.namespace = itemSepa[1].trim();
      } else {
        let nameSpace = itemSepa[0].trim();
        itemSepa.splice(0, 1);

        let message = itemSepa.join(', ');

        resultObj[nameSpace] = message;
        //resultObj.cbb_items[nameSpace] = message;
        //resultObj.messages[itemSepa[0].trim()] = itemSepa[1];
      }
    });

    return resultObj;
  }

  // 设置一个 GUID
  static getGuid() {
    let str =
      s4() +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      s4() +
      s4();

    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return str.toUpperCase();
  }

  /*
     [object Number]
     [object String]
     [object Boolean]
     [object Array]
     [object Object]
     */

  // 是否是布尔值
  static isBoolean(arg) {
    return Object.prototype.toString.call(arg) == '[object Boolean]';
  }

  // 是否是数字
  static isNumber(arg) {
    return Object.prototype.toString.call(arg) == '[object Number]';
  }

  // 是否是字符串
  static isString(arg) {
    return Object.prototype.toString.call(arg) == '[object String]';
  }

  // 是否是数组
  static isArray(arg) {
    return Object.prototype.toString.call(arg) == '[object Array]';
  }

  // 是否是对象
  static isObject(arg) {
    return Object.prototype.toString.call(arg) == '[object Object]';
  }

  // ES6 深拷贝，只能拷贝对象，不能拷贝数组
  static Clone(obj) {
    var proto = Object.getPrototypeOf(obj);
    return Object.assign({}, Object.create(proto), obj);
  }

  // ES5 深拷贝，能拷贝数组和对象
  static deepClone(obj) {
    var newObj = obj instanceof Array ? [] : {};
    for (var i in obj) {
      newObj[i] = typeof obj[i] == 'object' ? this.deepClone(obj[i]) : obj[i];
    }
    return newObj;
  }

  // 数组内的 json 排序功能: [{seqNbr: 1}, {seqNbr: 2}].sort(sortBy('seqNbr' , true, parseInt))
  static sortBy(filed, rev, primer) {
    rev = rev ? -1 : 1;
    return (a, b) => {
      a = a[filed];
      b = b[filed];
      if (typeof primer != 'undefined') {
        a = primer(a);
        b = primer(b);
      }
      if (a < b) {
        return rev * -1;
      }
      if (a > b) {
        return rev * 1;
      }
      return 1;
    };
  }

  // 只提取汉字
  static GetChinese(strValue) {
    if (strValue != null && strValue != '') {
      let reg = /[\u4e00-\u9fa5]/g;
      let text = strValue.match(reg) || '';
      if (text) {
        return text.join('');
      }
      return '';
    } else {
      return '';
    }
  }

  //去掉汉字
  static RemoveChinese(strValue) {
    if (strValue != null && strValue != '') {
      var reg = /[\u4e00-\u9fa5]/g;
      return strValue.replace(reg, '');
    } else {
      return '';
    }
  }

  static Rad(d) {
    return (d * Math.PI) / 180.0; //经纬度转换成三角函数中度分表形式。
  }

  //计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
  static GetDistance(lat1, lng1, lat2, lng2) {
    let radLat1 = this.Rad(lat1);
    let radLat2 = this.Rad(lat2);
    let a = radLat1 - radLat2;
    let b = this.Rad(lng1) - this.Rad(lng2);
    let s =
      2 *
      Math.asin(
        Math.sqrt(
          Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) *
              Math.cos(radLat2) *
              Math.pow(Math.sin(b / 2), 2),
        ),
      );
    s = s * 6378.137; // 地球半径，千米;
    s = Math.round(s * 10000) / 10000; //输出为公里
    s = Math.round(s * 1000) / 1; //单位修改为米,取整
    //s=s.toFixed(4);
    return s;
  }
  /** 获取当前时间是本年第几周 */
  static getWeekOfYear() {
    var today = new Date();
    var firstDay = new Date(today.getFullYear(), 0, 1);
    var dayOfWeek = firstDay.getDay();
    var spendDay = 1;
    if (dayOfWeek != 0) {
      spendDay = 7 - dayOfWeek + 1;
    }
    firstDay = new Date(today.getFullYear(), 0, 1 + spendDay);
    var d = Math.ceil((today.valueOf() - firstDay.valueOf()) / 86400000);
    var result = Math.ceil(d / 7);
    return result + 1;
  }
  /** 获取随机数 */
  static MathRand(n) {
    var Num = '';
    for (var i = 0; i < n; i++) {
      Num += Math.floor(Math.random() * 10);
    }
    return Num;
  }
}

// 业务组件
class BusinessComponent {
  // 根据宽度显示图片高度
  static getImageSize({ imagesMaxWidth }) {
    let defaultWidth = 700;
    let defaultHeight = 368;

    let optimalWidth =
      imagesMaxWidth <= defaultWidth ? imagesMaxWidth : defaultWidth;
    let optimalHeight = (optimalWidth * defaultHeight) / defaultWidth;

    return {
      width: optimalWidth,
      height: optimalHeight,
    };
  }
  // css 转换为 rn-css
  static inheritedStyle(styles) {
    let styleJson = {};
    if (!styles) return {};
    if (typeof styles === 'string') {
      styles = styles.replace(/;\s+/g, ';').replace(/:\s+/g, ':');
      let styleArray = styles.split(';');
      styleArray.map(item => {
        if (!item) {
          return null;
        }
        let arr = item.split(':');
        if (this.checkCssName(arr[0])) {
          styleJson[this.resetPropertyName(arr[0])] = this.resetCssValue(
            arr[1],
          );
        }
      });
      return styleJson;
    } else if (typeof styles === 'object') {
      for (let name in styles) {
        console.log(name);
        if (this.checkCssName(name)) {
          styleJson[this.resetPropertyName(name)] = this.resetCssValue(
            styles[name],
          );
        }
      }
      return styleJson;
    }
    return styleJson;
  }
  // 重置 css val
  static resetCssValue(text) {
    if (/^\d+px$/.test(text)) {
      return text.replace(/px/g, '') * 1;
    }
    return text;
  }
  // turn things like 'align-items' into 'alignItems'
  static resetPropertyName(name) {
    name = name.replace(/(-.)/g, function(v) {
      return v[1].toUpperCase();
    });
    return name;
  }
  // 过滤不要的 css
  static checkCssName(cssName) {
    return (
      cssName !== 'margin' &&
      cssName !== 'padding' &&
      cssName !== 'border' &&
      cssName !== 'font' &&
      cssName !== 'list-style' &&
      cssName !== 'background' &&
      cssName !== 'text-decoration'
    );
  }
}

export { BaseComponent, BusinessComponent };
