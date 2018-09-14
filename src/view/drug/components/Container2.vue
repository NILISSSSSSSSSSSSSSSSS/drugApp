<template>
  <div class="Container2">
    <Header title="请假" back="/Drug" :btnParams="btnParams"></Header>
    <mt-cell title="请假开始时间" value="请选择开始时间" @click.native="$refs.time.openTimePicker('startTime')" is-link>
      <span style="color: #888" v-if="time.startTime">{{time.startTime}}</span>
    </mt-cell>
    <mt-cell title="请假结束时间" value="请选择结束时间" @click.native="openEndTimePicker()" is-link>
      <span style="color: #888" v-if="time.endTime">{{time.endTime}}</span>
    </mt-cell>
    <mt-cell title="请假目的地" value="请选择目的地" @click.native="$refs.region.openPopup('value', 'BIG_REGION_DATA')" is-link>
      <span v-if="region.value">{{region.value}}</span>
    </mt-cell>
    <mt-field label="详细地址" placeholder="请输入详细地址" v-model="detailAddress"></mt-field>
    <mt-cell title="请假事由" value="请选择事由" @click.native="$refs.picker.openPopup()" is-link>
      <span v-if="picker.value">{{picker.value}}</span>
    </mt-cell>
    <!-- <mt-cell title="请假审批表拍照" value="请选择图片" @click.native="$refs.media.chooseMediaType('pic')">
      <span style="color: #aaa;" v-if="!media.value">请选择图片</span>
      <img class="view_img" :src="media.value" alt="" v-if="media.value">
      <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
    </mt-cell> -->
    <ImageBox title="请假审批表拍照" :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'value')"></ImageBox>
    <CustomButton position="bottom" @click.native="submit()">提交</CustomButton>
    <!-- 时间选择Picker -->
    <TimePicker ref="time" :field="time" :confirmCallback="confirmCallback"></TimePicker>
    <!-- 地区选择Picker -->
    <AddressPicker ref="region" :field="region" merge></AddressPicker>
    <!-- 其他选择Picker -->
    <CustomPicker ref="picker" :field="picker" :slots="slots"></CustomPicker>
    <!-- 媒体组件 -->
    <MediaCapture ref="media" :field="media"></MediaCapture>
  </div>
</template>

<script>
import { historyMixins } from '@/common/mixin.js';
import { MessageBox } from 'mint-ui';
var _this;

export default {
  name: "Container2",
  mixins:[historyMixins],
  data() {
    return {
      endDate: null,
      btnParams:{
        url:'/Drug/DrugHistoryList2'
      },
      region: {
        value: ''
      },
      time: {
        startTime: '',
        endTime: ''
      },
      picker: {
        value: ''
      },
      media: {
        value: []
      },
      detailAddress: '',
      slots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: ['务工', '就医', '探亲'],
          className: "slot1",
          textAlign: "center"
        }
      ]
    };
  },

  components: {},
  created() {
    _this = this;
  
  },
  methods: {
    confirmCallback(date, type, str_date) {
      if(type === 'startTime') {
        var d = new Date(str_date);
        d.setMonth(d.getMonth() + 3);
        _this.endDate = d;
      }else {
        
      }
    },
    openEndTimePicker() {
      if(_this.time['startTime']) {
        _this.$refs.time.openTimePicker('endTime', _this.endDate);
      }else {
        MessageBox('提示', '请先选择请假开始时间');
      }
    },
    submit() {
      var fileList = {
        Photo: _this.media['value'],
      };
      var formData = {
        StartTime: _this.time.startTime,
        EndTime: _this.time.endTime,
        Destination: _this.region.value,
        Address: _this.detailAddress,
        Reason: _this.picker.value,
      };
      var params_myUpload = {
        fileType: 'pic',
        fileList: fileList
      };
      var params_postForm = {
        url: "/home/data/leaveupload",
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
#picker .picker-item{
  font-size: 12px!important;
}
</style>
