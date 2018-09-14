// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
/* UI类组件 */
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import './assets/iconfont/iconfont.css';
import {Popup} from 'vue-ydui/dist/lib.rem/popup';
import 'vue-ydui/dist/ydui.base.css';
import preview from 'vue-photo-preview';
import 'vue-photo-preview/dist/skin.css';
import VuePreview from 'vue-preview';
/* 工具类 */
import router from './router';
import { Tool } from './common/common';
import Global from './common/globalVar';
import { Wheel } from './common/wheel';
import { Search } from 'mint-ui';
import store from './store/index';
// 全局通用组件
import Header from './components/Header';
import NameTitle from '@/components/NameTitle';
import CustomButton from './components/CustomButton';
import ImageBox from '@/components/ImageBox';
import MediaCapture from '@/components/MediaCapture';
import AddressPicker from '@/components/AddressPicker';
import CustomPicker from '@/components/CustomPicker';
import TimePicker from '@/components/TimePicker';
import '@/assets/css/pretty-checkbox.min.css';
import PrettyCheck from 'pretty-checkbox-vue/check';
import PrettyInput from 'pretty-checkbox-vue/input';
import PrettyRadio from 'pretty-checkbox-vue/radio';
// 自定义指令
import CustomCheck from '@/directives/CustomCheck';
//搜索
import {mapGetters, mapMutations} from 'vuex'

Vue.use(MintUI);
Vue.use(preview);
Vue.use(VuePreview, {fullscreenEl:false});

Vue.component(Popup.name, Popup);
Vue.component('p-input', PrettyInput);
Vue.component('p-check', PrettyCheck);
Vue.component('p-radio', PrettyRadio);
Vue.component('Header', Header);
Vue.component('NameTitle', NameTitle);
Vue.component('CustomButton', CustomButton);
Vue.component('ImageBox', ImageBox);
Vue.component('MediaCapture', MediaCapture);
Vue.component('AddressPicker', AddressPicker);
Vue.component('CustomPicker', CustomPicker);
Vue.component('TimePicker', TimePicker);
Vue.component(Search.name, Search);

Vue.directive('check', CustomCheck.check);
Vue.directive('nodata', CustomCheck.nodata);
Vue.directive('cosauth', CustomCheck.cosauth);

Vue.config.productionTip = false;

Vue.prototype.Tool = new Tool();
Vue.prototype.Wheel = new Wheel();
Vue.prototype.Global = Global;
/* 过滤时间 */
Vue.filter('killTime', function (value) {
  if(value.includes('00:00:00')) {
    var temp = value.split(' ');
    return temp[0];
  }else {
    return value;
  }
});
/* 过滤地点 */
Vue.filter('killStation', function(value) {
  var reg = /-[\u4E00-\u9FA5]+（[\u4E00-\u9FA5]+）[\u4E00-\u9FA5]+\//;
  if(reg.test(value)) {
    return value.replace(reg, '-');
  }else {
    return value;
  }
});
/* 过滤性别 */
Vue.filter('handleSex', function(value) {
  if(value === 0) {
    return '无';
  }else if(value === 1){
    return '男';
  }else {
    return '女';
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
