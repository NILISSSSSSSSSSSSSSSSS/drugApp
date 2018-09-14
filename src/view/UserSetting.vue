<template>
  <div class="UserSetting">
    <Header title="设置" :back="`/UserInfo?parent=${params.parent}`"></Header>
    <mt-cell title="手机号码" is-link>
      <span style="color: green">{{Global.PhoneNumber}}</span>
    </mt-cell>
    <mt-cell title="修改密码" @click.native="modifyPwd()" is-link>
    </mt-cell>
    <mt-cell title="修改头像" value="请选择图片" @click.native="openAvatar" is-link>
      
    </mt-cell>
    <yd-popup v-model="show_modal" position="center" width="90%">
      <div class="UserSetting_box" style="background-color:#fff;">
        <mt-field id="left" v-model="captcha" placeholder="验证码">
          <mt-button type="primary" @click="getCode()" style="background:#0ab7a9;" size="small">获取验证码</mt-button>
        </mt-field>
        <mt-field label="新密码" type="password" v-model="pwd"></mt-field>
        <mt-field label="确定密码" type="password" v-model="confirm_pwd"></mt-field>
        <p style="text-align: center;">
          <mt-button @click.native="show_modal = false" size="small" type="default" style="margin-right: 10px;width: 30%;">取消</mt-button>
          <mt-button @click.native="changePwd()" size="small" type="primary" style="width: 30%;">确定</mt-button>
        </p>
      </div>
    </yd-popup>
    <yd-popup v-model="show_avatar" position="center" width="90%">
      <div class="UserSetting_box" style="background-color:#fff;text-align: center;">
        <p style="margin-bottom: 5px;">点击图片修改头像</p>
        <img v-if="!avatar_src" @click="modifyAvatar" src="../assets/imgs/userImg.png" alt="" style="width: 180px;height:180px;border-radius: 50%;">
        <img v-else @click="modifyAvatar" :src="avatar_src" alt="" style="width: 180px;height:180px;border-radius: 50%;">
        <p style="text-align: center;margin-top: 5px;">
          <mt-button @click.native="show_avatar = false" size="small" type="default" style="margin-right: 10px;width: 30%;">取消</mt-button>
          <mt-button @click.native="submitAvatar()" size="small" type="primary" style="width: 30%;">上传头像</mt-button>
        </p>
      </div>
    </yd-popup>
    <MediaCapture ref="media" :picSuccess="picSuccess" :field="media"></MediaCapture>
  </div>
</template>

<script>
var _this;

export default {
  name: "UserSetting",
  data() {
    return {
      avatar_src_bak: '',
      avatar_src: '',
      show_modal: false,
      show_avatar: false,
      pwd: '',
      confirm_pwd: '',
      captcha: '',
      media: {
        HeadImageUrl: []
      }
    };
  },
  components: {},
  created() {
    _this = this;
    _this.params = _this.$route.query;
    if(_this.Global['AvatarSrc']) {
      _this.avatar_src = _this.Global['AvatarSrc'];
      _this.avatar_src_bak = _this.Global['AvatarSrc'];
    }
  },
  mounted() {},
  methods: {
    picSuccess(url, type) {
      if(_this.media[type]['length']) {
        _this.media[type] = [url];
      }
      _this.avatar_src = url;
    },
    submitAvatar() {
      if(_this.media['HeadImageUrl']['length'] === 0) {
        _this.Tool.toaster('请选择头像后再上传');
        return;
      }
      _this.show_avatar = false;
      var fileList = {
        HeadImageUrl: _this.media['HeadImageUrl'],
      };
      var params_myUpload = {
        fileType: 'pic',
        fileList: fileList,
      };
      var params_postForm = {
        url: '/home/index/headimageupload',
        data: {},
        success: function(res, temp) {
          _this.Tool.toaster(res['data']);
          _this.Global['AvatarSrc'] = temp['HeadImageUrl'];
          _this.avatar_src = _this.Global['AvatarSrc'];
          _this.avatar_src_bak = _this.Global['AvatarSrc'];
        }
      };
      _this.Wheel.submit(params_myUpload, params_postForm);
    },
    openAvatar() {
      _this.show_avatar = true;
      _this.avatar_src = _this.avatar_src_bak;
    },
    modifyAvatar() {
      _this.$refs.media.chooseMediaType('pic', 'HeadImageUrl');
    },
    getCode() {
      var options = {
        method: 'get',
        url: '/home/sms/sms',
        params: {
          PhoneNumber: _this.Global.PhoneNumber
        },
        success: function(res) {
          _this.Tool.toaster(res['data']);
        },
      };
      _this.Tool.request(options, true);
    },
    changePwd() {
      var formData = {
        PassWord: _this.pwd,
        ConfirmPwd: _this.confirm_pwd,
        Code: _this.captcha
      };
      var checkObj = {
        formData: formData
      };
      var checkState = _this.Wheel.checkParams(checkObj);
      if(checkState.check === false) {
        _this.Tool.toaster('请检查提交内容后重试');
        return;
      }
      var options = {
        url: '/home/index/setpwd',
        method: 'post',
        data: {
          PhoneNumber: _this.Global.PhoneNumber,
          PassWord: _this.Tool.encode(_this.pwd),
          Code: _this.captcha
        },
        success: function(res) {
          _this.Tool.toaster(res['data']);
        }
      };
      _this.Tool.request(options, true);
      _this.show_modal = false;
    },
    clearField() {
      _this.captcha = '';
      _this.pwd = '';
      _this.confirm_pwd = '';
    },
    modifyPwd() {
      _this.clearField();
      _this.show_modal = true;
    },
  }
};
</script>

<style>
.UserSetting_box {
  padding: 10px;
  border-radius: 5px;
}
.yd-mask{
  z-index: 1!important;
}
.yd-popup-center{
  z-index: 2!important;
}
</style>