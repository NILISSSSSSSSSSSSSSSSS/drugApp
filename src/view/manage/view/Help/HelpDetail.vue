<template>
  <div class="HelpDetail">
    <Header title="帮扶详情" back="/Manage/Help"></Header>
    <div class="card">
      <p>帮扶时间: {{param.PushTime | formatTime}}</p>
      <p>帮扶人: {{param.HelpPeaple}}</p>
      <p>被帮扶人: {{param.HelpObject}}</p>
      <p>帮扶内容: {{param.Discrible}}</p>
    </div>
  </div>
</template>

<script>
var _this;

export default {
  name: "HelpDetail",
  data() {
    return {
      param: null
    };
  },
  components: {},
  created() {
    _this = this;
    _this.param = _this.$route.query;
  },
  filters: {
    formatTime: function(UTC_time) {
      var date = new Date(UTC_time);
      return date.toLocaleDateString();
    },
  },
  methods: {}
};
</script>

<style scoped>
.card {
  font-size: 14px;
  width: 95%;
  min-height: 100px;
  border: 1px solid #ddd;
  margin: 10px auto;
  border-radius: 5px;
  background-color: #fff;
  position: relative;
  padding: 20px;
}
</style>