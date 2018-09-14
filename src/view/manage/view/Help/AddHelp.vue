<template>
  <div class="AddHelp">
    <Header title="新增帮扶" back="/Manage/Help"></Header>
    <mt-cell title="被帮扶人" value="请选择被帮扶人" @click.native="queryHelp">
      <span>{{helpPeople}}</span>
      <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
    </mt-cell>
    <mt-field label="帮扶人" placeholder="请输入姓名" v-model="helper"></mt-field>
    <mt-cell title="帮扶内容"></mt-cell>
    <mt-field placeholder="请输入帮扶内容" type="textarea" rows="4" v-model="content"></mt-field>
    <mt-cell title="帮扶时间" value="请选择帮扶时间" @click.native="$refs.time.openTimePicker('helpTime')" is-link>
      <span style="color: #888" v-if="time.helpTime">{{time.helpTime}}</span>
    </mt-cell>
    <CustomButton @click.native="submit">新增</CustomButton>
    <!-- 时间选择Picker -->
    <TimePicker ref="time" :field="time"></TimePicker>
  </div>
</template>

<script>
var _this;

export default {
  name: "AddHelp",
  data() {
    return {
      helper: '',
      content: '',
      helpPeople: '请选择帮扶人',
      time: {
        helpTime: ''
      }
    };
  },
  components: {},
  created() {
    _this = this;
    _this.params = _this.$route.query;
    _this.params.names && (_this.helpPeople = _this.params.names);
  },
  methods: {
    queryHelp() {
      _this.$router.push({path: '/Manage/Help/AddHelp/QueryHelp'});
    },
    submit() {
      var checkObj = {
        formData: {
          helpobject: _this.helpPeople === '请选择帮扶人' ? '' : _this.helpPeople,
          helppeaple: _this.helper,
          pushtime: _this.time['helpTime'],
          helpdiscrible: _this.content,
          Name: _this.Global['UserName']
        }
      };
      var checkState = _this.Wheel.checkParams(checkObj);
      if(!checkState.check) {
        _this.Tool.toaster('请填写内容');
        return;
      }
      checkObj.formData['phonenumber'] = _this.Global['PhoneNumber'];
      checkObj.formData['token'] = _this.Global['ToKen'];
      var options = {
        url: '/backstage/help/helpinfopush',
        method: 'post',
        data: checkObj.formData,
        success: function(res) {
          _this.Tool.toaster('新增成功');
          _this.$router.push({path: '/Manage/Help'});
        }
      };
      _this.Tool.request(options, true);
    }
  }
};
</script>

<style scoped>

</style>