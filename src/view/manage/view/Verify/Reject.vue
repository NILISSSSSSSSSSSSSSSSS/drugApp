<template>
  <div class="Reject">
    <Header title="人员回退" back="/Manage/Verify"></Header>
    <mt-cell title="回退原因"></mt-cell>
    <mt-field placeholder="请输入回退原因" type="textarea" rows="4" v-model="reason"></mt-field>
    <mt-cell title="回退地点" value="请选择" @click.native="$refs.region.openPopup('place')" is-link>
      <span v-if="region.place">{{region.place['county'] + '-' + region.place['station'] + '-' + region.place['villages']}}</span>
    </mt-cell>
    <CustomButton position="bottom" @click.native="submit()">确定</CustomButton>
    <!-- 地区选择 -->
    <AddressPicker ref="region" :field="region"></AddressPicker>
  </div>
</template>

<script>
var _this;

export default {
  name: "Reject",
  data() {
    return {
      params: null,
      reason: '',
      region: {
        place: ''
      }
    };
  },
  components: {
    
  },
  created() {
    _this = this;
    _this.params = _this.$route.query;
  },
  methods: {
    submit() {
      var checkObj = {
        formData: {
          Reason: _this.reason,
          county: _this.region['place']['county'],
          station: _this.region['place']['station'],
          villages: _this.region['place']['villages']
        }
      };
      var checkState = _this.Wheel.checkParams(checkObj);
      if(!checkState.check) {
        _this.Tool.toaster('请填写内容');
        return;
      }
      var options = {
        url: '/home/query/returnusers',
        method: 'post',
        data: {
          DrugerName: _this.params.Name,
          DrugerCardId: _this.params.Card_Id,
          Reason: _this.reason,
          county: _this.region['place']['county'],
          station: _this.region['place']['station'],
          villages: _this.region['place']['villages']
        },
        success: function(res) {
          _this.Tool.toaster(res['data']);
          _this.$router.push({path: '/Manage/Verify'});
        }
      };
      _this.Tool.request(options);
    }
  }
};
</script>

<style scoped>

</style>
