<template>
  <div class="UserInfo">
    <Header title="个人信息" :back="params.parent" :set="`/UserInfo/UserSetting?parent=${params.parent}`"></Header>
    <!--头像部分-->
    <div class="personalInfo">
      <div class="info">
        <img v-if="!Global['AvatarSrc']" src="../assets/imgs/userImg.png">
        <img v-else :src="Global['AvatarSrc']" alt="" style="border-radius: 50%;">
        <span>{{userArea}}</span>
        <span>{{userName}}</span>
      </div>
    </div>
    <!--列表部分-->
    <div class="infoList">
      <mt-cell title="手机号码">
        <span class="infoDetail">{{PhoneNumber}}</span>
        <img slot="icon" src="../assets/imgs/userPhone.png" width="16" height="22">
     </mt-cell>
     <mt-cell @click.native="$router.push({path: '/Manage/Pending'})" title="消息通知" is-link>
        <span class="infoDetail">待处理{{totalCount}}条</span>
        <img slot="icon" src="../assets/imgs/userMessage.png" width="16" height="17">
     </mt-cell>
     <mt-cell title="当前版本号">
        <span class="infoDetail">beta-18.5.4</span>
     </mt-cell>
     <!-- <mt-cell title="下载最新版App" @click.native="downloadApp" is-link>
       <span class="infoDetail">点击下载最新版App</span>
     </mt-cell> -->
    </div>
    <!--退出当前帐号-->
    <div class="exit">
      <input type="button" value="检查更新" @click="updateApp">
      <input type="button" value="退出当前帐号" @click="exit">
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  import { mapGetters,mapMutations} from "vuex";
  var _this;
  export default {
    name: "UserInfo",
    data() {
      return {
        userName: "",
        userArea: this.Global['Address'],
        PhoneNumber:"",
      };
    },
    components: {},
    created() {
      _this = this;
      _this.params = _this.$route.query;
      _this.userName = _this.Global.UserName;
      _this.PhoneNumber=_this.Global.PhoneNumber;
    },
    computed: {
    ...mapGetters(["mesObj"]),
    totalCount() {
      return Object.values(this.mesObj).reduce((total, item) => {
        return total += item;
      });
     
    }
  },
    mounted() {},
    methods: {
      //是否退出当前帐号
      exit:function(){
        MessageBox({
        title: '提示',
        message: '确定退出当前帐号吗？',
        showCancelButton: true
      }).then(action => {
        if(action === 'confirm') {
          _this.$router.push({path: '/'});
        }
      });
      },
      updateApp() {
        _this.Tool.updateApp();
      },
      downloadApp() {
        var a = document.createElement('a');
        switch(_this.Global['Environment']) {
          case _this.Global['ENV_TEST']:
            a.href = 'https://xcgk20180320-1256236574.cos.ap-chengdu.myqcloud.com/app/smhtest.apk';
            a.download = 'smhtest';
            break;
          case _this.Global['ENV_PROD']:
            a.href = 'https://xcgk20180320-1256236574.cos.ap-chengdu.myqcloud.com/app/smhprod.apk';
            a.download = 'smhprod';
            break;
        }
        a.click();
      }
    }
  };
</script>

<style scoped>
  .personalInfo {
    width: 100%;
    padding: 20px 0;
    text-align: center;
    background: #00bfb1;
  }
  .personalInfo .info {
    display: inline-block;
    text-align: center;
  }
  .info img {
    width: 90px;
    height: 90px;
    margin-bottom: 10px;
  }
  .info span {
    display: block;
    color: #fff;
    line-height: 24px;
  }

  .infoList{
    margin: 8px;
    background: #fff;
    min-height: 250px;
    border-radius: 3px;
    margin-bottom: 10px;
    padding-top: 6px;
  }
  .infoDetail{
    color: #00bfb1;
  }
  .mint-cell-wrapper{
    font-size: 14px !important;
  }
  .exit{
    margin:0 8px;
  }
  .exit input{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background:#fff;
    color: #ef3c4d;
    text-align: center;
    border: 0;
    border-radius: 3px;
    font-size: 14px;
    outline: none;
  }
</style>