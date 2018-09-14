<template>
  <div class="UnapprovedUrineTest">
    <Header title="外地人员上传尿检审批" back="/Manage/EntryUrineTest"  :btnParams="btnParams"></Header>
    <NameTitle :name="params.Name"></NameTitle>
    <mt-cell title="尿检时间">
      <span style="color: #888">{{params.UrineData.UrineTestTime | killTime}}</span>
    </mt-cell>
    <mt-cell title="尿检地点">
      <span>{{params.UrineData.UrineTestAddress}}</span>
    </mt-cell>
    <!-- <mt-cell title="上传尿检照片">
      <img class="view_img" :src="params.UrineData.UrineTestPhoto">
    </mt-cell> -->
    <ImageBox title="上传尿检照片" disabled :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'image_1')"></ImageBox>
    <!-- <mt-cell title="上传现场检测报告单照片">
      <img class="view_img" :src="params.UrineData.UrineTestPhotoRP">
    </mt-cell> -->
    <ImageBox title="现场检测报告单照片" disabled :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'image_2')"></ImageBox>
    <div class="btn_group" v-show="handleShow">
      <mt-button type="primary" size="normal" style="margin-right: 10px;" @click.native="agree">同意</mt-button>
      <mt-button type="default" size="normal" @click.native="disagree">不同意</mt-button>
    </div>
    <div class="btn_group" v-show="!handleShow">
        <mt-button type="primary" size="normal" style="margin-right: 10px;" @click.native="$router.push({path: '/Manage/EntryUrineTest/UrineTest', query: params})">新增尿检录入</mt-button>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { historyMixins } from "@/common/mixin.js";
import { mapGetters, mapMutations } from "vuex";
var _this;
export default {
  name: "UnapprovedUrineTest",
  mixins: [historyMixins],
  data() {
    return {
      media: {
        image_1: [],
        image_2: []
      },
      handleShow: true,
      btnParams: {
        url: "/Manage/EntryUrineTest/UnapprovedHistoryList",
        apiName: "geturinehistorylist"
      }
    };
  },
  components: {},
  computed: {
    ...mapGetters(["mesObj"])
  },
  created() {
    _this = this;
    _this.params = _this.$route.query;
    _this.Tool.parseImage(
      _this.media["image_1"],
      _this.params.UrineData.UrineTestPhoto
    );
    _this.Tool.parseImage(
      _this.media["image_2"],
      _this.params.UrineData.UrineTestPhotoRP
    );
    if (_this.params.mess == "同意" || _this.params.mess == "不同意") {
      this.handleShow = false;
    }
  },
  methods: {
    //同意
    agree: function() {
      MessageBox.confirm("确定同意吗？").then(action => {
        _this.approval("2");
      });
    },
    //不同意
    disagree: function() {
      MessageBox.confirm("确定不同意吗？").then(action => {
        _this.approval("3");
      });
    },
    approval(state) {
      var postdata = {
        DrugUserCardId: _this.params["CardId"],
        ExamineType: state
      };
      console.log("postdata", postdata, _this.params);
      var options = {
        url: "/home/data/examineurine",
        method: "post",
        data: postdata,
        success: function(res) {
          if (_this.mesObj.urine > 0) {
            _this.mesObj.urine -= 1;
          } else {
            _this.mesObj.urine = 0;
          }
          _this.setMesObj(_this.mesObj);
          _this.Tool.toaster("审批成功");
          _this.$router.push({
            path: "/Manage/EntryUrineTest"
          });
        },
        error: function(err) {
          _this.Tool.toaster("审批失败");
        }
      };
      _this.Tool.request(options);
    },
    ...mapMutations({
      setMesObj: "SET_MESOBJ"
    })
  }
};
</script>

<style scoped>
.btn_group {
  text-align: center;
  margin-top: 50px;
}
</style>
