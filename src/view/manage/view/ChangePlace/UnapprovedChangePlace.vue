<template>
  <div class="UnapprovedChangePlace">
    <Header title="人员变更执行地审批" back="/Manage/ChangePlace?flag=true" :btnParams="btnParams"></Header>
    <NameTitle :name="params.Name"></NameTitle>
    <mt-cell title="变更执行地">
      <span style="font-size:12px;">{{params.ExamineData.County}}{{params.ExamineData.Station}}{{params.ExamineData.Villages}}</span>
    </mt-cell>
    <mt-cell title="变更原因">
      <span style="font-size:12px;">{{params.ExamineData.Reason}}</span>
    </mt-cell>
    <mt-cell title="变更时间">
      <span style="font-size:12px;">{{params.ExamineData.createTime | killTime}}</span>
    </mt-cell>
    <!-- <mt-cell title="审批照片">
      <img class="view_img" :src="params.ExamineData.Photo" alt="">
    </mt-cell> -->
    <ImageBox title="审批照片" disabled :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'image_1')"></ImageBox>
    <div class="btn_group" v-show="handleShow">
      <mt-button type="primary" size="normal" style="margin-right: 10px;" @click.native="agree">同意</mt-button>
      <mt-button type="default" size="normal" @click.native="disagree">不同意</mt-button>
    </div>
    <div class="btn_group" v-show="!handleShow">
        <mt-button type="primary" size="normal" style="margin-right: 10px;" @click.native="$router.push({path: '/Manage/ChangePlace/TypeInChangePlace', query: params})">新增变更执行地录入</mt-button>
    </div>
  </div>
</template>

<script>
   import {
    MessageBox
  } from 'mint-ui';
   import {historyMixins} from '@/common/mixin'
   import {mapGetters,mapMutations} from 'vuex';
  var _this;
  export default {
    name: "UnapprovedChangePlace",
    mixins:[historyMixins],
    data() {
      return {
        media: {
          image_1: []
        },
        handleShow:true,
        btnParams:{
          url:'/Manage/ChangePlace/ChangePlaceHistoryList'
        }
      };
    },
    components: {
    },
    computed: {
    ...mapGetters(["mesObj"])
  },
    created() {
      _this = this;
      _this.params = _this.$route.query;
      _this.Tool.parseImage(_this.media['image_1'], _this.params.ExamineData.Photo);
      if(_this.params.mess == "同意" || _this.params.mess == '不同意'){
        this.handleShow=false;
      }
      
    },
    methods: {
       //同意
      agree: function() {
        MessageBox.confirm('确定同意吗？').then(action => {
          _this.approval('2');
        });
      },
      //不同意
      disagree: function() {
        MessageBox.confirm('确定不同意吗？').then(action => {
          _this.approval('3');
        });
      },
      approval: function(state) {
        var postdata = {
          DrugUserCardId: _this.params['CardId'],
          ExamineType: state
        }
        console.log('postdata', postdata, _this.params);
        var options = {
          url: '/home/data/examineexecutor',
          method: 'post',
          data: postdata,
          success: function(res) {
            if(_this.mesObj.change > 0) {
              _this.mesObj.change -= 1;
            }else {
              _this.mesObj.change = 0;
            }
            _this.setMesObj(_this.mesObj);
            _this.Tool.toaster('审批成功');
            _this.$router.push({
              path: '/Manage/ChangePlace',
            });
          },
          error: function(err) {
            _this.Tool.toaster('审批失败');
          }
        };
        _this.Tool.request(options);
      },
      ...mapMutations({
        setMesObj:'SET_MESOBJ'
      }),
    }
  };
</script>

<style scoped>
  .btn_group {
    text-align: center;
    margin-top: 50px;
  }
</style>
