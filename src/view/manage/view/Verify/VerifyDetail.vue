<template>
  <div class="VerifyDetail">
    <Header title="人员核实详情" back="/Manage/Verify"></Header>
    <mt-cell title="姓名">
      <span>{{params.Name}}</span>
    </mt-cell>
    <mt-cell title="性别">
      <span>{{params.Sex | handleSex}}</span>
    </mt-cell>
    <mt-cell title="身份证">
      <span>{{params.Card_Id}}</span>
    </mt-cell>
    <mt-cell title="人员类型">
      <span>{{params.Drugategory}}</span>
    </mt-cell>
    <mt-cell title="民族">
      <span>{{params.Ethnicity}}</span>
    </mt-cell>
    <mt-cell title="户籍地址">
      <span>{{params.PermanentAddress}}</span>
    </mt-cell>
    <mt-cell title="吸食毒品类型">
      <span>{{params.Variety_of_drugString}}</span>
    </mt-cell>
  </div>
</template>
<script>
  import {searchMixins} from '@/common/mixin.js'
  var _this;
  export default {
    name: "VerifyDetail",
    data() {
      return {
        
      };
    },
    created() {
      _this = this;
      _this.params = _this.$route.query;
    },
    methods: {
      
    }
  };
</script>

<style scoped>

</style>