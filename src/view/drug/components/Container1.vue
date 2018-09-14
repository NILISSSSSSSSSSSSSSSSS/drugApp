<template>
  <div class="Container1">
    <Header title="签到" back="/Drug" :btnParams="btnParams"></Header>
    <!-- <mt-cell title="上传实时照片" @click.native="$refs.media.chooseMediaType('pic', 'imageURL')">
      <span style="color: #aaa;" v-if="!media.imageURL">请选择图片</span>
      <img class="view_img" :src="media.imageURL" alt="" v-if="media.imageURL">
      <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
    </mt-cell> -->
    <ImageBox title="上传实时照片" :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'imageURL')"></ImageBox>
    <mt-cell title="上传实时视频" @click.native="$refs.media.chooseMediaType('video', 'videoURL')">
      <span style="color: #aaa;" v-if="!media.videoURL[0]">请选择视频</span>
      <video class="view_img" :src="media.videoURL[0]" preload="auto" v-if="media.videoURL[0]"></video>
      <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
    </mt-cell>
    <CustomButton position="bottom" @click.native="submit()">提交</CustomButton>
    <MediaCapture
      ref="media"
      :field="media">
    </MediaCapture>
  </div>
</template>

<script>
"use strict";
import { historyMixins } from '@/common/mixin.js'

var _this;

export default {
  name: "Container1",
  mixins:[historyMixins],
  data() {
    return {
      media: {
        imageURL: [],
        videoURL: []
      },
      btnParams:{
        url:'/Drug/DrugHistoryList1'
      }
    };
  },
  components: {},
  created() {
    _this = this;

  },
  methods: {
    submit() {
      var fileList = {
        Photo: _this.media['imageURL'],
        Video: _this.media['videoURL']
      };
      if(!fileList['Video']['length']) {
        _this.Tool.toaster('请上传视频');
        return;
      }
      if(fileList['Photo']['length']) {

      }else {
        _this.Tool.toaster('请添加图片');
        return;
      }
      var formData = {
        lattitude: _this.Tool.current_latitude || '未允许定位',
        longtitude: _this.Tool.current_longitude || '未允许定位',
        Address: _this.Tool.address || '未允许定位'
      };
      var params_myUpload = {
        fileType: 'pic&video',
        fileList: fileList
      };
      var params_postForm = {
        url: "/home/data/signupload",
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
.icon-0801zengjia {
  font-size: 20px;
}
</style>
