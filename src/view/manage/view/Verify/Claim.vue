<template>
  <div class="Claim">
    <Header title="人员认领" back="/Manage/Verify" :btnParams="btnParams"></Header>
    <!-- <mt-cell title="决定单位" value="请选择单位" @click.native="$refs.picker.openPopup('units')" is-link>
      <span v-if="picker.units">{{picker.units}}</span>
    </mt-cell> -->
    <mt-field label="决定单位" placeholder="请输入决定单位" v-model="picker.units"></mt-field>
    <mt-cell title="决定日期" value="请选择日期" @click.native="$refs.time.openTimePicker('value', new Date())" is-link>
      <span style="color: #888" v-if="time.value">{{time.value}}</span>
    </mt-cell>
    <mt-field label="人员类别" disabled v-model="params.Drugategory"></mt-field>
    <mt-field label="法律文书编号" placeholder="请输入编号" v-model="number"></mt-field>
    <!-- <mt-cell title="决定书照片" value="请选择图片" @click.native="$refs.media.chooseMediaType('pic')">
      <span style="color: #aaa;" v-if="!media.value">请选择图片</span>
      <img class="view_img" :src="media.value" alt="" v-if="media.value">
      <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
    </mt-cell> -->
    <ImageBox title="决定书照片" :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'value')"></ImageBox>
    <CustomButton position="bottom" @click.native="submit()">确定</CustomButton>
    <!-- 媒体组件 -->
    <MediaCapture ref="media" :field="media"></MediaCapture>
    <!-- 时间选择Picker -->
    <TimePicker ref="time" :field="time"></TimePicker>
    <!-- 其他选择Picker -->
    <CustomPicker ref="picker" :field="picker" :slots="slots_picker"></CustomPicker>
  </div>
</template>

<script>
var _this;

export default {
  name: "Claim",
  data() {
    return {
      btnParams:{
        canShow:false,
        icon:'',
        txt:'',
        isSearch:false
      },
      number: '',
      media: {
        value: []
      },
      time: {
        value: ""
      },
      picker: {
        units: "",
        type: ""
      },
      slots_picker: {
        units: [
          {
            flex: 1,
            defaultIndex: 1,
            values: ["单位一", "单位二"],
            className: "slot1",
            textAlign: "center"
          }
        ]
      },
      params: null
    };
  },
  components: {},
  created() {
    _this = this;
    _this.params = _this.$route.query;
  },
  methods: {
    submit() {
      var fileList = {DecisionPhoto: _this.media['value']};
      var formData = {
        DrugerName: _this.params.Name,
        DrugerCardId: _this.params.Card_Id,
        DeterminingUnit: _this.picker.units,
        DeterminingTime: _this.time.value,
        LawBookNumber: _this.number,
      };
      //带图片提交
      var params_myUpload = {
        fileType: 'pic',
        fileList: fileList,
      };
      var params_postForm = {
        url: '/home/query/setdruguser',
        data: formData,
        success: function(res) {
          _this.Tool.toaster(res['data']);
          _this.$router.push('/Manage/Verify');
        }
      };
      _this.Wheel.submit(params_myUpload, params_postForm);
    }
  }
};
</script>

<style scoped>

</style>
