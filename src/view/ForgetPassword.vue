<template>
  <div class="ForgetPassword">
    <Header title="忘记密码" back="/"></Header>
    <mt-field label="手机号码" placeholder="请填写手机号码" v-model="phone"></mt-field>
    <mt-field id="left" v-model="captcha" placeholder="验证码">
      <mt-button type="primary" @click="getCode()" style="background:#0ab7a9;" size="small">获取验证码</mt-button>
    </mt-field>
    <mt-field label="密码" type="password" placeholder="请输入密码" v-model="pwd"></mt-field>
    <mt-field label="确认密码" type="password" placeholder="请确认密码" v-model="confirm_pwd"></mt-field>
    <CustomButton @click="changePwd()" position="bottom">修改</CustomButton>
  </div>
</template>

<script>
var _this;

export default {
  name: "ForgetPassword",
  data() {
    return {
      phone: '',
      captcha: '',
      pwd: '',
      confirm_pwd: ''
    };
  },
  created() {
    _this = this;
  },
  methods: {
    getCode() {
      if(!_this.phone) {
        _this.Tool.toaster('请输入正确的手机号码');
        return;
      }
      var options = {
        method: 'get',
        url: '/home/sms/sms',
        params: {
          PhoneNumber: _this.phone
        },
        success: function(res) {
          _this.Tool.toaster(res['data']);
        },
      };
      _this.Tool.request(options, true);
    },
    changePwd() {
      if(_this.pwd !== _this.confirm_pwd) {
        _this.Tool.toaster('两次输入密码不一致');
        return;
      }
      if(!_this.phone) {
        _this.Tool.toaster('请输入正确的手机号码');
        return;
      }
      if(!_this.captcha) {
        _this.Tool.toaster('请输入验证码');
        return;
      }
      var options = {
        url: '/home/index/setpwd',
        method: 'post',
        data: {
          PhoneNumber: _this.phone,
          PassWord: _this.Tool.encode(_this.pwd),
          Code: _this.captcha
        }
      };
      _this.Tool.request(options, true);
    }
  }
};
</script>

<style scoped>

</style>
