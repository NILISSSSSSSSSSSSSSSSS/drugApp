<template>
  <div class="EducationDetail">
    <Header title="文章详情" back="/Manage/Education"></Header>
    <div style="background-color: #fff;padding: 10px;">
      <h2 style="font-size: 20px;text-align: center;margin-bottom: 10px;">{{detailData.title}}</h2>
      <div v-html="detailData.txt">
      </div>
      <video v-if="detailData.VedioDownUrl" style="width: 100%;height: 500px;" :src="detailData.VedioDownUrl" controls></video>
    </div>
  </div>
</template>

<script>
var _this;

export default {
  name: "EducationDetail",
  data() {
    return {
      detailData: {}
    };
  },
  components: {},
  created() {
    _this = this;
    _this.params = _this.$route.query;
    _this.getDetail();
  },
  methods: {
    getDetail() {
      var options = {
        url: '/backstage/preventeducation/edugetfilearticle',
        method: 'get',
        params: {
          token: _this.Global['ToKen'],
          phonenumber: _this.Global['PhoneNumber'],
          artdbid: _this.params['id']
        },
        success: function(res) {
          _this.detailData = res['data'];
        }
      };
      _this.Tool.request(options, true);
    }
  }
};
</script>

<style scoped>

</style>