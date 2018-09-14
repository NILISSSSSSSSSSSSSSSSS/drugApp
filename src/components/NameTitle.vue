<template>
  <div class="NameTitle">
    <div class="bottom_border">
      <i class="iconfont icon-icon-user"></i>
      <span>{{name}}</span>
    </div>
  </div>
</template>

<script>
var _this;

export default {
  name: "NameTitle",
  data() {
    return {
      
    };
  },
  props: {
    name: String
  },
  components: {
    
  },
  created() {
    _this = this;
  },
  methods: {
    
  }
};
</script>

<style scoped>
.bottom_border{
  border-bottom: 1px solid;
  padding-bottom: 5px;
  margin-bottom: 5px;
  margin-top: 5px;
  text-indent: 5px;
}
</style>
