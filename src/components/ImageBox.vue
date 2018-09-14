<template>
  <div class="ImageBox">
    <mt-cell :title="title" @click.native="chooseMediaType.handler">
      <span v-if="required !== undefined" style="color: red;" slot="icon">*</span>
      <span v-if="disabled === undefined" style="color: #aaa;">点击添加图片</span>
      <i v-if="disabled === undefined" style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
    </mt-cell>
    <div style="width: 100%;background-color: #fff;" v-show="imageUrls[chooseMediaType.type].length">
      <img v-cosauth class="view_img" v-for="(url, index) in imageUrls[chooseMediaType.type]" :key="index" :preview="chooseMediaType.type" style="margin-right: 2px;margin-left: 2px;" :src="url" alt="图片">
    </div>
  </div>
</template>

<script>
var _this;

export default {
  name: "ImageBox",
  data() {
    return {};
  },
  props: {
    title: String,
    imageUrls: Object,
    chooseMediaType: Object,
    required: null,
    disabled: null,
  },
  components: {},
  created() {
    _this = this;
  },
  methods: {
    chooseType() {
      _this.disabled === undefined && _this.chooseMediaType.handler();
    }
  }
};
</script>

<style scoped>

</style>