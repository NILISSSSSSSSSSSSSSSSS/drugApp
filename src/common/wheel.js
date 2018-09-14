import { Tool } from './common';
import Global from './globalVar';

var _this;
export function Wheel() {
  _this = this;
}
/**
 * @param {object}
 * @example
 * {
 *  formData: {字段名: 字段值},
 *  fileList: {字段名: 字段值},
 *  reg: {字段名: 正则}
 * }
 * @returns 未检测通过返回{key: 未检测通过的字段名, type: 字段类型 formData || fileList, check: false}  检测通过返回{check: true}
 *检查请求参数 */
Wheel.prototype.checkParams = function(checkObj) {
  var keys = Object.keys(checkObj);
  var formData = checkObj['formData'];
  var fileList = checkObj['fileList'];
  var reg = checkObj['reg'];
  if(keys.includes('formData')) {
    var keys_formData = Object.keys(formData);
    for(var i = 0, len = keys_formData.length;i < len;i++) {
      var attr = keys_formData[i];
      var field = formData[attr];
      if(reg) {
        if(reg[attr]) {
          if(reg[attr].test(field)) {

          }else {
            return {
              key: attr,
              type: 'formData',
              check: false
            };
          }
        }
      }
      if(field === '' || field === undefined || field === null) {
        return {
          key: attr,
          type: 'formData',
          check: false
        };
      }
    }
  }
  if(keys.includes('fileList')) {
    var keys_fileList = Object.keys(fileList);
    for(var j = 0, l = keys_fileList.length;j < l;j++) {
      var attr = keys_fileList[j];
      var field = fileList[attr];
      if(field === '' || field === undefined || field === null) {
        return {
          key: attr,
          type: 'fileList',
          check: false
        };
      }
    }
  }
  return {check: true};
}
/* 设置cookie */
Wheel.prototype.setCookie = function(cname, cvalue, exdays) {
	var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
/* 获取cookie */
Wheel.prototype.getCookie = function(cname) {
	var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}
/* 清除cookie */
Wheel.prototype.clearCookie = function(name) {
	_this.setCookie(name, "", -1);
}
/* 提交表单数据轮子  适用于有图片提交的场景 */
Wheel.prototype.submit = function(params_myUpload, params_postForm) {
  //校验
  var checkObj = {
    formData: params_postForm['data'],
    fileList: params_myUpload['fileList']
  };
  var checkState = _this.checkParams(checkObj);
  console.log(checkObj);
  console.log(checkState);
  if(!checkState.check) {
    Tool.prototype.toaster('请检查提交内容后重试');
    return;
  }
  var postForm = function(temp) {
    var options = {
      url: params_postForm.url,
      method: 'post',
      data: Object.assign(params_postForm.data, temp),
      success: function(res) {
        Tool.prototype.MyIndicator.close();
        // Tool.prototype.toaster('提交成功');
        params_postForm.success(res, temp);
      }
    };
    Tool.prototype.request(options, false, true);
  }
  var FILE_URL_DIVIDE = Global.FILE_URL_DIVIDE;
  var submit = function() {
    Tool.prototype.myUpload(params_myUpload.fileType, params_myUpload.fileList, function(res){
      console.log('resolve回调')
      console.log(res)
      var temp = {};
      res.forEach((item) => {
        temp[item.attr] || (temp[item.attr] = '');
        if(temp[item.attr]) {
          temp[item.attr] += (FILE_URL_DIVIDE + item.data['Location']);
        }else {
          temp[item.attr] += item.data['Location'];
        }
      });
      console.log(temp);
      postForm(temp);
    });
  }
  submit();
}
/* 检测空对象 */
Wheel.prototype.checkState = function(obj) {
  if(JSON.stringify(obj) === '{}') {
      return false;
  }else {
      return true;
  }
}
/* imageBox 轮子函数 */
Wheel.prototype.chooseMediaType = function(instance, mediaType, fieldType) {
  return {
    type: fieldType,
    handler: function() {
      instance.$refs.media.chooseMediaType(mediaType, fieldType);
    }
  }
}
/**
 * 管理员判断各级路由返回情况
 */
Wheel.prototype.checkReturns = function(name) {
  if(Global['AdminParams']['village']) {
    return '/BigManage';
  }
  if(Global['AdminParams']['station']) {
    if(name === 'CheckSummary') {
      return '/BigManage/SelectCounty/SelectStation/SelectVillages';
    }
    return '/BigManage';
  }
  if(Global['AdminParams']['county']) {
    if(name === 'CheckSummary') {
      return '/BigManage/SelectCounty/SelectStation/SelectVillages';
    }else if(name === 'SelectVillages') {
      return '/BigManage/SelectCounty/SelectStation';
    }else if(name === 'SelectStation') {
      return '/BigManage';
    }
  }
  if(name === 'CheckSummary') {
    return '/BigManage/SelectCounty/SelectStation/SelectVillages';
  }else if(name === 'SelectVillages') {
    return '/BigManage/SelectCounty/SelectStation';
  }else if(name === 'SelectStation') {
    return '/BigManage/SelectCounty';
  }else if(name === 'SelectCounty') {
    return '/BigManage';
  }
}
/**
 * 判断返回首页的路由
 */
Wheel.prototype.checkReturnIndex = function() {
  switch(Global['UserType']) {
    case 1:
      return '/Drug';
      break;
    case 2:
      return '/Manage';
      break;
    case 3:
      return '/BigManage';
      break;
  }
}
/**
 * 初始化管理员的县站乡
 */
Wheel.prototype.initPlace = function() {
  Global['AdminParams']['county'] = Global['AdminParams_bak']['county'];
  Global['AdminParams']['station'] = Global['AdminParams_bak']['station'];
  Global['AdminParams']['villages'] = Global['AdminParams_bak']['villages'];
}
/**
 * 管理员查询数据
 */
Wheel.prototype.querySummary = function(queryType) {
    return Global['QUERY_TYPE_OBJ'][queryType];
}