import Vue from 'vue';
import axios from 'axios';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import Global from './globalVar';
import COS from 'cos-js-sdk-v5';
import hex_sha1 from '../assets/js/sha1';

var _this;
export function Tool() {
  _this = this;
  _this.baseURL = process.env.API_ROOT;
  _this._setEnv(process.env.NODE_ENV);
  _this.FILE_URL_DIVIDE = Global.FILE_URL_DIVIDE;
  _this.current_latitude = null;
  _this.current_longitude = null;
  _this.last_latitude = null;
  _this.last_longitude = null;
  _this.address = null;
  _this.reg_image = /(pic|pic&video)\/.+\.(jpg|png)/;
  _this.promise_signed_url = null;
  console.log('当前环境: ', process.env.API_ROOT);
}
/* 私有成员 */
Tool.prototype._setEnv = function (env) {
  switch (env) {
    case 'production':
      Global['Environment'] = Global.ENV_PROD;
      break;
    case 'development':
      Global['Environment'] = Global.ENV_TEST;
      break;
  }
}
Tool.prototype._fnTester = function (fn) {
  console.time(`${fn.name}函数执行时间`);
  fn();
  console.timeEnd(`${fn.name}函数执行时间`);
}
/* 公有成员 */
Tool.prototype.deepCopy = function (obj) {
  let json = JSON.stringify(obj);
  return JSON.parse(json);
}
Tool.prototype.typeOf = function (foo) {
  return Object.prototype.toString.apply(foo);
}
/**
 * 
 * @param {object} options 配置项
 * @param {boolean} noToken 是否不传Token
 * @param {boolean} disable_Indicator 是否禁用loading
 */
Tool.prototype.request = function (options, noToken, disable_Indicator) {
  // _this.updateApp();
  console.log('请求地址' + _this.baseURL + options.url);
  console.log('参数：');
  console.log(options.data || options.params);
  !options.baseURL && (options.baseURL = _this.baseURL);
  if (!noToken) {
    if (options.data) {
      options.data['ToKen'] = Global.ToKen;
      options.data['PhoneNumber'] = Global.PhoneNumber;
    }
    if (options.params) {
      options.params['ToKen'] = Global.ToKen;
      options.params['PhoneNumber'] = Global.PhoneNumber;
    }
  }
  if (!disable_Indicator) {
    Indicator.open({
      text: options.txt || '加载中...',
      spinnerType: 'fading-circle'
    });
  }
  if(options.mock) {
    var ms = Math.random() * 1000;
    var p = new Promise(resolve => {
      setTimeout(function() {
        resolve(options.mock);
      }, ms);
    });
    p.then(res => {
      !disable_Indicator && Indicator.close();
      options.success && options.success(options.mock);
    });
    return;
  }
  if(options.data) {
    options.data['version'] = Global['APP_VERSION'];
  }else if(options.params) {
    options.params['version'] = Global['APP_VERSION'];
  }
  console.log('请求之前最后发送的数据');
  console.log(options.data);
  axios(options).then(function (res) {
    !disable_Indicator && Indicator.close();
    console.log(res['data']);
    if (res['data']['errno'] == 0) {
      options.success ? options.success(res['data']) : _this.toaster('提交成功');
    } else {
      Indicator.close();
      console.log(res['data']['errmsg']);
      options.error ? options.error(res['data']) : _this.toaster(res['data']['errmsg'] || '操作失败');
    }
  }).catch(function (error) {
    !disable_Indicator && Indicator.close();
    console.log(error);
    _this.toaster('请检查网络连接');
  });
}
// 处理时间格式
Tool.prototype.handleTime = function (date, separator) {
  var year, month, day;
  year = date.getFullYear();
  month = date.getMonth() + 1;
  day = date.getDate();
  // hour = date.getHours();
  // min = date.getMinutes();
  // sec = date.getSeconds();
  month < 10 ? (month = '0' + month) : month;
  day < 10 ? (day = '0' + day) : day;
  // hour < 10 ? (hour = '0' + hour) : hour;
  // min < 10 ? (min = '0' + min) : min;
  // sec < 10 ? (sec = '0' + sec) : sec;
  return year + (separator || '/') + month + (separator || '/') + day;
}
/**
 * 返回函数连续调用时，停留时间大于或等于 idle，action 才会执行
 * @param idle   {number}    停留空闲时间，单位毫秒
 * @param action {function}  请求关联函数，实际应用需要调用的函数
 * @return {function}    返回客户调用函数
 */
Tool.prototype.debounce = function (idle, action) {
  var last;
  return function () {
    var ctx = this,
      args = arguments;
    clearTimeout(last);
    last = setTimeout(function () {
      action.apply(ctx, args);
    }, idle);
  }
}
/**
 * 频率控制 返回函数连续调用时，action 执行频率限定为 次 / delay
 * @param delay  {number}    延迟时间，单位毫秒
 * @param action {function}  请求关联函数，实际应用需要调用的函数
 * @return {function}    返回客户调用函数
 */
Tool.prototype.throttle = function (delay, action) {
  var last = 0;
  return function () {
    var curr = +new Date();
    if (curr - last > delay) {
      action.apply(this, arguments);
      last = curr;
    }
  };
}
/* toast封装 */
Tool.prototype.toaster = function (message, iconClass) {
  var instance = Toast({
    message: message,
    duration: 2000,
    iconClass: iconClass || ''
  });
}
/* Indicator封装 */
Tool.prototype.MyIndicator = Indicator;
/* messagebox封装 */
Tool.prototype.MessageBox = MessageBox;
/* 静默上传 */
Tool.prototype.positionUpload = function(data) {
  var options = {
    url: '/home/data/x',
    baseURL: _this.baseURL,
    method: 'post',
    data: {
      PhoneNumber: Global.PhoneNumber,
      ToKen: Global.ToKen,
      Longtitude: data.longitude,
      Lattitude: data.latitude,
      Address: data.address
    }
  };
  axios(options).then(function(res) {
    console.log(res);
  });
}
/* 定位服务 */
Tool.prototype.getPositionInfo = function () {
  //通过经纬度计算距离
  /**
     * approx distance between two points on earth ellipsoid
     * @param {Object} lat1
     * @param {Object} lng1
     * @param {Object} lat2
     * @param {Object} lng2
     */
    function getFlatternDistance(lat1, lng1, lat2, lng2) {
      var radLat1 = lat1 * Math.PI / 180.0;
      var radLat2 = lat2 * Math.PI / 180.0;
      var a = radLat1 - radLat2;
      var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
      var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
      s = s * 6378.137;
      s = Math.round(s * 10000) / 10000;
      return s
    };
  //高德
  var successCallback = function(data) {
    if(data.latitude && data.longitude) {
      _this.last_latitude = _this.current_latitude;
      _this.last_longitude = _this.current_longitude;
      _this.current_latitude = data.latitude;
      _this.current_longitude = data.longitude;
      _this.address = data.address;
      var distance;
      if(_this.last_latitude) {
        console.log(_this.current_latitude, _this.current_longitude, _this.last_latitude, _this.last_longitude);
        distance = getFlatternDistance(_this.current_latitude, _this.current_longitude, _this.last_latitude, _this.last_longitude);
      }else {
        _this.positionUpload(data);
      }
      console.log('距离: ', distance);
      if(distance && distance > 100) {
        _this.positionUpload(data);
      }
    }
    
  }
  var failedCallback = function(err) {
    console.log('定位失败');
    console.log(err);
  }
  cordova.plugins.GaoDeLocation.getCurrentPosition(successCallback, failedCallback);
  //cordova
  // var onSuccess = function(position) {
  //   console.log('定位成功');
  //   console.log(position);
  //   var options = {
  //     url: '/home/data/x',
  //     baseURL: _this.baseURL,
  //     method: 'post',
  //     data: {
  //       PhoneNumber: Global.PhoneNumber,
  //       Token: Global.Token,
  //       Longtitude: position.coords.longitude,
  //       Lattitude: position.coords.latitude
  //     }
  //   };
  //   axios(options).then(function(res) {
  //     console.log(res);
  //   });
  // };
  // // onError Callback receives a PositionError object
  // //
  // function onError(error) {
  //   console.log(error);
  // }
  // navigator.geolocation.getCurrentPosition(onSuccess, onError);
}
/* 获取权限 */
Tool.prototype.initpermissions = function () {
  console.log("permissions begin");
  console.log(cordova.plugins);
  console.log('sllllssssssss');
  var list = [
    cordova.plugins.permissions.WRITE_EXTERNAL_STORAGE,
    cordova.plugins.permissions.READ_EXTERNAL_STORAGE,
    cordova.plugins.permissions.RECORD_AUDIO,
    cordova.plugins.permissions.RECORD_VIDEO,
    cordova.plugins.permissions.ACCESS_COARSE_LOCATION,
    cordova.plugins.permissions.ACCESS_FINE_LOCATION,
    cordova.plugins.permissions.ACCESS_LOCATION_EXTRA_COMMANDS,
    cordova.plugins.permissions.INTERNET,
  ];

  cordova.plugins.permissions.checkPermission(list, success, error);

  function error() {
    console.warn('Camera or Accounts permission is not turned on');
  }

  function success(status) {
    if (!status.hasPermission) {

      cordova.plugins.permissions.requestPermissions(
        list,
        function (status) {
          if (!status.hasPermission)
            error();
          else {

            console.log("permissions success");
          }
        },
        error);
    } else {

    }
  }
}
/* 检测是否所有文件上传成功 */
// Tool.prototype.checkAllUploaded = function() {
//   var flag = true;
//   if(_this.typeOf(arguments[0]) === '[object Array]') {
//     var l = arguments[0].length;
//     for(var j = 0;i < l;j++) {
//       if(!arguments[0][i]) {
//         flag = false;
//         break;
//       }
//     }
//   }else {
//     var len = arguments.length;
//     for(var i = 0;i < len;i++) {
//       if(!arguments[i]) {
//         flag = false;
//         break;
//       }
//     }
//   }

// 	return flag;
// }
/* 把文件路径转为文件并上传 */
Tool.prototype.myUpload = function (type, fileUrlList, cb) {
  Indicator.open({
    text: '处理中...',
    spinnerType: 'fading-circle'
  });
  var onErrorReadFile = function (err) {
    console.log(err);
  }
  var readFile = function (fileEntry, attr, resolve, reject, originFileName) {
    fileEntry.file(function (file) {
      var reader = new FileReader();
      reader.onloadend = function () {
        console.log("Successful file read: ");
        var key, blob;
        if(attr === 'Video') {
          key = type + '/' + originFileName;
          blob = new Blob([this.result]);
        }else {
          var timestamp = new Date().getTime();
          var fileName = Global.PhoneNumber + '_' + timestamp;
          var fileType = 'jpg';
          blob = new Blob([this.result], {type: "image/jpeg"});
          key = type + '/' + fileName + '.' + fileType;
        }
        _this.uploadCos(blob, key, attr, resolve, reject);
      };
      reader.readAsArrayBuffer(file);
    }, onErrorReadFile);
  }
  var promise_arr = [];
  var keys = Object.keys(fileUrlList);
  keys.forEach(attr => {
    fileUrlList[attr].forEach((url, index) => {
      var fileUrl = url;
      var file = fileUrl.split('/');
      var originFileName = file[file.length - 1];
      var p = new Promise((resolve, reject) => {
        window.resolveLocalFileSystemURL(fileUrl,
          function success(entry) {
            readFile(entry, attr, resolve, reject, originFileName);
          },
          function error(err) {
            reject(err);
          });
      });
      promise_arr.push(p);
    });
  });
  Promise.all(promise_arr).then(res => {
    console.log('all回调')
    console.log(res)
    cb(res);
  }).catch(err => {
    console.log(err);
    Indicator.close();
    _this.toaster('系统繁忙，请稍后重试');
  });
}

/* 对象存储服务 */
/**
 * 初始化COS实例
 * @param {string} PhoneNumber
 * @param {string} ToKen
 */
Tool.prototype.newCos = function(PhoneNumber, ToKen) {
  _this.COS = new COS({
    getAuthorization: function (options, callback) {
      var method = (options.Method || 'get').toLowerCase();
      var key = options.Key || '';
      var pathname = key.indexOf('/') === 0 ? key : '/' + key;

      var option = {
        url: '/home/auth',
        baseURL: _this.baseURL,
        // method: 'post',
        method: 'get',
        params: {
          method: method,
          pathname: pathname,
          PhoneNumber: PhoneNumber,
          ToKen: ToKen
        },
      };
      axios(option).then(function (res) {
        callback(res['data']);
      }).catch(function (err) {
        callback(err);
      });
    },
    FileParallelLimit: 3, // 控制文件上传并发数
    ChunkParallelLimit: 3, // 控制单个文件下分片上传并发数
    // ProgressInterval: 1000,  // 控制上传的 onProgress 回调的间隔
  });
}
// 上传
Tool.prototype.uploadCos = function (file, save_path, attr, resolve, reject) {
  console.log('*****************')
  console.log(file);
  _this.COS.putObject({
    Bucket: 'xcgk20180320-1256236574',
    // Bucket: '180419-1256236574',
    /* 必须 */
    Region: 'ap-chengdu',
    /* 必须 */
    Key: save_path,
    /* 必须 */
    StorageClass: 'STANDARD',
    Body: file, // 上传文件对象
  }, function (err, data) {
    if (err) {
      reject(err);
    } else {
      if (data.statusCode === 200) {
        resolve({
          data: data,
          attr: attr
        })
      } else {
        reject(err)
      }
    }
    console.log(err || data);
  });

}
/**
 * 获取COS签名后地址
 * @param {string} key 文件名
 * @param {function} cb 展示图片数组
 */
Tool.prototype.getCos = function(key, cb) {
  _this.COS.getObjectUrl({
    Bucket: 'xcgk20180320-1256236574', /* 必须 */
    Region: 'ap-chengdu',    /* 必须 */
    Key: key,              /* 必须 */
    Sign: true
  }, function(err, data) {
    //签名后的回调
    if(err) {
      
    }else {
      cb(data.Url);
    }
    console.log(err || data.Url);
  });
}
/* 校验手机号 */
Tool.prototype.checkPhone = function (phone) {
  return /^1[34578]\d{9}$/.test(phone);

 }
/* 验证身份证号 */
Tool.prototype.checkId = function (id) {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(id);
}
/**
 * 删除数组的最后多个元素，并以数组形式返回删除的元素
 * @param {number} 删除多少个就传多少
 */
Array.prototype.multiPop = function (num) {
  var res = [],
    temp;
  for (var i = 0, len = this.length; i < len; ++i) {
    temp = this.pop();
    res.push(temp);
  }
  return res;
}
/* 热更新服务 */
Tool.prototype.updateApp = function (cb) {
  var app = {

    // Application Constructor
    initialize: function () {
      this.bindEvents();
    },

    // Bind any events that are required.
    // Usually you should subscribe on 'deviceready' event to know, when you can start calling cordova modules
    bindEvents: function () {
      document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // deviceready Event Handler
    onDeviceReady: function () {
      // Add click event listener for our update button.
      // We do this here, because at this point Cordova modules are initialized.
      // Before that chcp is undefined.
      // document.getElementById('myFetchBtn').addEventListener('click', app.checkForUpdate);
      app.checkForUpdate();
    },

    checkForUpdate: function () {
      if(cb) {
        chcp.getVersionInfo(app.getVersionInfoCallback);
      }else {
        chcp.fetchUpdate(app.fetchUpdateCallback);
      }
    },
    getVersionInfoCallback: function(err, data) {
      if(err) {
        _this.toaster('更新失败');
      }else {
        console.log(data.buildVersion);
        cb();
        // if(!data.buildVersion.includes('103040')) {
        //   cb();
        // }
      }
    },
    fetchUpdateCallback: function (error, data) {
      if (error) {
        console.log('Failed to load the update with error code: ' + error.code);
        console.log(error.description);
        _this.toaster('暂无更新');
        // return;
      }else {
        console.log('Update is loaded, running the installation');
        Indicator.open({
          text: '更新中...',
          spinnerType: 'fading-circle'
        });
        chcp.installUpdate(app.installationCallback);
      }
    },

    installationCallback: function (error) {
      Indicator.close();
      if (error) {
        console.log('Failed to install the update with error code: ' + error.code);
        console.log(error.description);
        if(parseInt(error.code) === -16) {
          _this.toaster('更新成功');
        }else {
          _this.toaster('更新失败');
        }
      } else {
        console.log('Update installed!');
        _this.toaster('更新成功');
      }
    }
  };

  app.initialize();
}
/* 解析预览图片字符串 */
Tool.prototype.parseImage = function(origin, backendUrl) {
  var arr = backendUrl.split(_this.FILE_URL_DIVIDE);
  // arr.forEach((item, index) => {
  //   var key;
  //   key = item.match(_this.reg_image)[0];
  //   _this.getCos(key, origin, index);
  // });
  // arr.forEach(item => {
  //   var replaced_url = item.replace('xcgk20180320-1256236574.cos.ap-chengdu.myqcloud.com', 'xcgk20180320-1256236574.image.myqcloud.com');
  //   origin.push(replaced_url + '!thumbnail');
  // });
  arr.forEach(item => {
    origin.push(item);
  });
}
Tool.prototype.encode = hex_sha1;