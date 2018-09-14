<template>
  <div class="Container4">
    <Header title="变更执行地" back="/Drug" :btnParams="btnParams"></Header>
    <mt-cell title="变更区域">
      <input type="radio" v-check :checked="area === 1" name="area" @change="changeArea(1)" value="普通">
      <input type="radio" v-check :checked="area === 2" name="area" @change="changeArea(2)" value="绿色家园">
    </mt-cell>
    <mt-cell v-if="area === 1" title="变更执行地" value="请选择变更地" @click.native="$refs.region.openPopup('value', 'BIG_REGION_DATA', true)" is-link>
      <span class="fontSize_13" v-if="region.value">{{region.value | killStation}}</span>
    </mt-cell>
    <mt-cell v-else title="变更执行地" value="请选择变更地" @click.native="$refs.picker.openPopup('green')" is-link>
      <span style="color: #888" v-if="picker.green">{{picker.green}}</span>
    </mt-cell>
    <mt-cell title="变更原因" value="请选择原因" @click.native="$refs.picker.openPopup('reason')" is-link>
      <span v-if="picker.reason">{{picker.reason}}</span>
    </mt-cell>
    <mt-cell title="变更时间" value="请选择" @click.native="$refs.time.openTimePicker('ChangeTime')" is-link>
      <span v-if="time.ChangeTime">{{time.ChangeTime}}</span>
    </mt-cell>
    <!-- <mt-cell title="审批表拍照" @click.native="$refs.media.chooseMediaType('pic')">
      <span style="color: #aaa;" v-if="!media.value">请选择图片</span>
      <img class="view_img" :src="media.value" alt="" v-if="media.value">
      <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
    </mt-cell> -->
    <ImageBox title="审批表拍照" :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'value')"></ImageBox>
    <CustomButton position="bottom" @click.native="submit()">提交</CustomButton>
    <!-- 时间选择Picker -->
    <TimePicker ref="time" :field="time"></TimePicker>
    <!-- 地区选择Picker -->
    <AddressPicker ref="region" :field="region" merge></AddressPicker>
    <!-- 其他选择Picker -->
    <CustomPicker ref="picker" :field="picker" :slots="slots"></CustomPicker>
    <!-- 媒体组件 -->
    <MediaCapture ref="media" :field="media"></MediaCapture>
  </div>
</template>

<script>
  import { historyMixins } from '@/common/mixin.js'

var _this;

export default {
  name: "Container4",
  mixins:[historyMixins],
  data() {
    return {
      area: 1,
      time: {
        ChangeTime: ''
      },
      btnParams:{
        url:'/Drug/DrugHistoryList4'
      },
      region: {
        value: ''
      },
      picker: {
        reason: '',
        green: ''
      },
      media: {
        value: []
      },
      slots: {
        reason: [{
          flex: 1,
          defaultIndex: 1,
          values: ['居住', '从业'],
          className: "slot1",
          textAlign: "center"
        }],
        green: [{
          flex: 1,
          defaultIndex: 1,
          // values: ['凉山州绿色家园', '西昌市绿色家园', '德昌县绿色家园', '会理县绿色家园', '会东县绿色家园', '宁南县绿色家园', '普格县绿色家园', '布拖县绿色家园', '金阳县绿色家园', '昭觉县绿色家园', '喜德县绿色家园', '冕宁县绿色家园', '越西县绿色家园', '甘洛县绿色家园', '美姑县绿色家园', '雷波县绿色家园'],
          values: ['凉山州绿色家园'],
          className: "slot1",
          textAlign: "center"
        }]
      }
    };
  },
  components: {

  },
  created() {
    _this = this;
  },
  methods: {
    changeArea(type) {
      _this.area = type;
    },
    submit() {
      var temp;
      var fileList = {
        Photo: _this.media['value'],
      };
      var formData = {
        // ExecutorAddress: _this.region['value'],
        Reason: _this.picker['reason'],
        ChangeTime: _this.time['ChangeTime']
      };
      if(_this.area === 1) {
        formData['ExecutorAddress'] = _this.region['value'];
      }else {
        if(_this.picker['green'] === '凉山州绿色家园') {
          temp = `凉山彝族自治州-绿色家园-${_this.picker['green']}-语录塔社区`;
        }else {
          temp = `凉山彝族自治州-绿色家园-${_this.picker['green']}-${_this.picker['green']}`;
        }
        formData['ExecutorAddress'] = temp;
      }
      var params_myUpload = {
        fileType: 'pic',
        fileList: fileList
      };
      var params_postForm = {
        url: "/home/data/changeexecutorupload",
        data: formData,
        success: function(res) {
          _this.Tool.toaster("提交成功");
          _this.$router.push({ path: "/Drug" });
        },
      };
      _this.Wheel.submit(params_myUpload, params_postForm);
    }
  }
};
</script>

<style scoped>

</style>
