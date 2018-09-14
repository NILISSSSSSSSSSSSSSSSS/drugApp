<template>
  <div class="register">
    <Header title="注册" back="/"></Header>
    <mt-field label="姓名" placeholder="请填写姓名" v-model="name"></mt-field>
    <mt-field label="身份证号码" placeholder="请填写证件号码" v-model="id"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="pwd"></mt-field>
    <mt-field label="确认密码" placeholder="请确认密码" type="password" v-model="confirm_pwd"></mt-field>
    <mt-field label="手机号码" placeholder="请填写手机号码" type="tel" v-model="phone"></mt-field>
    <mt-field id="left" v-model="captcha" placeholder="验证码">
      <mt-button type="primary" @click="getCode()">获取验证码</mt-button>
    </mt-field>
    <CustomButton @click="register()" position="bottom">注册</CustomButton>
  </div>
</template>

<script>
var _this;

export default {
  name: "Register",
  data() {
    return {
      name: '',
      id: '',
      pwd: '',
      confirm_pwd: '',
      phone: '',
      captcha: ''
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
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        success: function(res) {
          _this.Tool.toaster(res['data']);
        },
        // error: function(res) {
        //   _this.Tool.toaster(res['errmsg']);
        // }
      };
      _this.Tool.request(options, true);
    },
    register() {
      if(_this.pwd !== _this.confirm_pwd) {
        _this.Tool.toaster('两次输入密码不一致');
        return;
      }
      if(!_this.phone) {
        _this.Tool.toaster('请输入正确的手机号码');
        return;
      }
      if(!_this.id) {
        _this.Tool.toaster('请输入正确的身份证号码');
        return;
      }
      if(!_this.captcha) {
        _this.Tool.toaster('请输入验证码');
        return;
      }
      var options = {
        method: 'post',
        url: '/home/index/register',
        data: {
          Name: _this.name,
          CardId: _this.id,
          PassWord: _this.Tool.encode(_this.pwd),
          PhoneNumber: _this.phone,
          Code: _this.captcha
        },
        success: function(res) {
          _this.Tool.toaster('注册成功');
          _this.$router.push({path: '/'});
        }
      };
      _this.Tool.request(options, true);
    }
  }
};
</script>

<style scoped>

</style>
