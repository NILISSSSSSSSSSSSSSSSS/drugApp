<template>
  <div class="SystemWarning">
    <Header title="系统预警" back="/Manage/Violate"></Header>
    <mt-cell v-if="Object.keys(params.ReportOverdue)['length']" title="逾期未报到">
      <input type="checkbox" v-check v-model="check_1">
    </mt-cell>
    <div v-if="check_1" style="padding: 5px;">
      <mt-field label="决定日期" disabled v-model="params.ReportOverdue.StartTime"></mt-field>
      <mt-field label="当前日期" disabled v-model="params.ReportOverdue.NowTime"></mt-field>
      <mt-field label="逾期天数" disabled v-model="params.ReportOverdue.ReportOverdueDays"></mt-field>

      <mt-cell v-if="show_report_btn">
        <mt-button type="primary" size="small" @click="overdue(1, '确定点击上传按钮，上传违法/违规行为报告照片')" style="margin-right: 10px;">确定逾期</mt-button>
        <mt-button type="default" size="small" @click="notOverdue(1)">未逾期</mt-button>
      </mt-cell>
      <!-- <mt-cell v-if="media.image_1" title="劝诫书" @click.native="$refs.media.chooseMediaType('pic', 'image_1')">
        <img class="view_img" :src="media.image_1" alt="">
        <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
      </mt-cell> -->
      <ImageBox v-if="media.image_1['length']" title="劝诫书" :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'image_1')"></ImageBox>
      <div v-if="show_reason_1">
        <mt-cell title="未逾期原因"></mt-cell>
        <mt-field placeholder="请输入未逾期原因" type="textarea" rows="4" v-model="reason_1"></mt-field>
      </div>
    </div>
    <mt-cell v-if="Object.keys(params.UrineTestOverdue)['length']" title="逾期未检测">
      <input type="checkbox" v-check v-model="check_2">
    </mt-cell>
    <div v-if="check_2" style="padding: 5px;">
      <mt-field label="上一次尿检日期" disabled v-model="params.UrineTestOverdue.StartTime"></mt-field>
      <mt-field label="当前日期" disabled v-model="params.UrineTestOverdue.NowTime"></mt-field>
      <mt-field label="逾期天数" disabled v-model="params.UrineTestOverdue.UrineTestOverdueDays"></mt-field>

      <mt-cell v-if="show_test_btn">
        <mt-button type="primary" size="small" @click="overdue(2, '确定点击上传按钮，上传劝诫书')" style="margin-right: 10px;">确定逾期</mt-button>
        <mt-button type="default" size="small" @click="notOverdue(2)">未逾期</mt-button>
      </mt-cell>
      <!-- <mt-cell v-if="media.image_2" title="劝诫书" @click.native="$refs.media.chooseMediaType('pic', 'image_2')">
        <img class="view_img" :src="media.image_2" alt="">
        <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
      </mt-cell> -->
      <ImageBox v-if="media.image_2['length']" title="劝诫书" :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'image_2')"></ImageBox>
      <div v-if="show_reason_2">
        <mt-cell title="未逾期原因"></mt-cell>
        <mt-field placeholder="请输入未逾期原因" type="textarea" rows="4" v-model="reason_2"></mt-field>
      </div>
    </div>
    <mt-cell title="活动异常">
      <input type="checkbox" v-check v-model="check_5">
    </mt-cell>
    <div v-if="check_5" style="padding: 5px;">
      <mt-cell title="人员现状" value="请选择状态" @click.native="$refs.picker.openPopup()" is-link>
        <span style="color: #888" v-if="picker.value">{{picker.value}}</span>
      </mt-cell>
      <!-- <mt-cell v-if="picker['value'] === '擅自外出'" title="劝诫书" @click.native="$refs.media.chooseMediaType('pic', 'image_8')">
        <span style="color: #aaa;" v-if="!media.image_8">请选择图片</span>
        <img class="view_img" :src="media.image_8" alt="" v-if="media.image_8">
        <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
      </mt-cell> -->
      <ImageBox v-if="picker['value'] === '擅自外出'" title="劝诫书" :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'image_8')"></ImageBox>
    </div>
    <CustomButton v-if="show_submit" @click.native="submit()">确定</CustomButton>
    <!-- 媒体组件 -->
    <MediaCapture ref="media" :field="media"></MediaCapture>
    <!-- 其他选择Picker -->
    <CustomPicker ref="picker" :field="picker" :slots="slots" :pickerCb="pickerCb"></CustomPicker>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
var _this;

export default {
  name: "SystemWarning",
  data() {
    return {
      params: null,
      check_1: false,
      check_2: false,
      check_5: false,
      reason_1: "",
      reason_2: "",
      show_reason_1: false,
      show_reason_2: false,
      days_1: '',
      days_2: '',
      media: {
        image_1: [],
        image_2: [],
        image_8: []
      },
      picker: {
        value: ''
      },
      IsReportOverdue: '2',
      IsUrineTestOverdue: '2',
      show_report_btn: true,
      show_test_btn: true,
      show_submit: true,
      slots: [{
        flex: 1,
        defaultIndex: 1,
        values: ['在家', '擅自外出', '请假外出'],
        className: "slot1",
        textAlign: "center"
      }],
    };
  },
  components: {},
  created() {
    _this = this;
    _this.params = _this.$route.query;
    if(_this.params.ReportOverdue['ReportOverdue_Label'] === 1) {
      _this.show_report_btn = false;
    }
    if(_this.params.UrineTestOverdue['UrineTestOverdue_Label'] === 1) {
      _this.show_test_btn = false;
    }
    if(_this.show_report_btn || _this.show_test_btn) {

    }else {
      _this.show_submit = false;
    }
  },
  methods: {
    pickerCb() {
                if (_this.picker['value'] === '擅自外出') {
                    MessageBox({
                        title: '提示',
                        message: '请上传劝诫书',
                        confirmButtonText: "上传",
                        showCancelButton: true,
                        closeOnClickModal: false,
                    }).then(action => {
                        if (action === 'cancel') {
                            _this.picker.value = '';
                        }
                        if (action === 'confirm') {
                            _this.$refs.media.chooseMediaType('pic', `image_8`);
                        }
                    });
                }
            },
    submit() {
      //处理图片逻辑
      // var bool_arr = [_this.check_1, _this.check_2];
      var formData = {DrugUserCardId: _this.params.CardId};
      var fileList = {};
      //校验
      if(_this.check_1 && _this.show_report_btn) {
        formData['IsReportOverdue'] = _this.IsReportOverdue;
        if(_this.IsReportOverdue === '1') {
          fileList['ReportOverduePhoto'] = _this.media['image_1'];
        }else if(_this.IsReportOverdue === '0') {
          formData['ReasonReport'] = _this.reason_1;
        }else if(_this.IsReportOverdue === '2') {
          _this.Tool.toaster('请检查提交内容后重试');
          return;
        }
      }
      if(_this.check_2 && _this.show_test_btn) {
        formData['IsUrineTestOverdue'] = _this.IsUrineTestOverdue;
        if(_this.IsUrineTestOverdue === '1') {
          fileList['UrineTestOverduePhoto'] = _this.media['image_2'];
        }else if(_this.IsUrineTestOverdue === '0') {
          formData['ReasonUrineTest'] = _this.reason_2;
        }else if(_this.IsUrineTestOverdue === '2') {
          _this.Tool.toaster('请检查提交内容后重试');
          return;
        }
      }
      // if (_this.check_5) {
      //   formData['Situation'] = _this.picker['value'];
      //   if (_this.picker.value === '擅自外出') {
      //     fileList['Situation_Photo'] = _this.media['image_8'];
      //   }
      // }
      /* 临时 */
      if(_this.check_1 === false && _this.check_2 === false && _this.check_5 === true) {
        _this.Tool.toaster('提交成功');
        _this.$router.push({path: '/Manage/Violate'});
        return;
      }
      /* 临时 */
      if(_this.check_1 === false && _this.check_2 === false) {
        _this.Tool.toaster('请检查提交内容后重试');
        return;
      }
      //提交
      var keys = Object.keys(fileList);
      if(keys.length === 0) {
        //不带图片提交
        var options = {
          url: '/home/data/systemwarningupload',
          method: 'post',
          data: formData,
          success: function(res) {
            _this.Tool.toaster(res['data']);
            _this.$router.push('/Manage/Violate');
          }
        };
        _this.Tool.request(options);
      }else {
        //带图片提交
        var params_myUpload = {
          fileType: 'pic',
          fileList: fileList,
        };
        var params_postForm = {
          url: '/home/data/systemwarningupload',
          data: formData,
          success: function(res) {
            _this.Tool.toaster(res['data']);
            _this.$router.push('/Manage/Violate');
          }
        };
        _this.Wheel.submit(params_myUpload, params_postForm);
      }
    },
    handleMedia(type) {
      _this.$refs.media.chooseMediaType('pic', `image_${type}`);
    },
    overdue(type, msg, title) {
      switch (type) {
        case 1:
          _this.IsReportOverdue = '1';
          _this.show_reason_1 = false;
          break;
        case 2:
          _this.IsUrineTestOverdue = '1';
          _this.show_reason_2 = false;
          break;
      }
      MessageBox({
        title: title || '确定逾期吗？',
        message: msg,
        confirmButtonText: "上传",
        showCancelButton: true,
        closeOnClickModal: (type === 3) ? false : true,
      }).then(action => {
        if(type === 3 && action === 'cancel') {
          _this.picker.value = '';
        }
        if(action === 'confirm') {
          _this.handleMedia(type);
        }
      });
    },
    notOverdue(type) {
      switch (type) {
        case 1:
          _this.IsReportOverdue = '0';
          _this.show_reason_1 = true;
          _this.media['image_1']['length'] && (_this.media['image_1'] = []);
          break;
        case 2:
          _this.IsUrineTestOverdue = '0';
          _this.show_reason_2 = true;
          _this.media['image_2']['length'] && (_this.media['image_2'] = []);
          break;
      }
    }
  }
};
</script>

<style scoped>

</style>
