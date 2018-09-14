<template>
  <div class="login">
    <div style="font-size: 14px;">{{Global.Environment}}</div>
    <img class="logo" src="../assets/imgs/logo.png">
    <div class="form">
      <div class="input_box">
        <i class="iconfont icon-user_info" style="color: #2c3e50"></i>
        <input type="text" v-model="username" placeholder="请输入用户名">
      </div>
      <div class="input_box">
        <i class="iconfont icon-padlock" style="color: #2c3e50"></i>
        <input type="password" v-model="pwd" placeholder="请输入密码">
      </div>
      <div class="box">
        <div>
          <p-check class="p-default p-round p-thick p-smooth" color="success-o" v-model="check">记住用户名</p-check>
        </div>
        <div>
          <a @click="goForget()" href="javascript:void(0)" style="position: relative;top: -2px;">忘记密码？</a>
        </div>
      </div>
      <div>
        <mt-button type="primary" style="margin-top: 20px;" @click="login()">登录</mt-button>
      </div>
      <div>
        <mt-button type="default" @click="register()" style="margin-top: 20px;background-color: #fff;color: #0ab7a9;border:2px solid #0ab7a9;">注册</mt-button>
      </div>
      <div class="tips">
        忘记密码时，请联系管理员重置密码
      </div>
    </div>
    <div style="position: absolute;font-size: 12px;width: 100%;" class="fixedBottom">
      技术支持：成都深珀数据有限公司
    </div>
  </div>
</template>

<script>
    import {
        mapGetters,
        mapMutations
    } from "vuex";
    var _this;
    let registrationID;
    let mesObj = {
        sign: 0,
        leave: 0,
        urine: 0,
        change: 0
    };
    export default {
        name: "Login",
        data() {
            return {
                longitude: "",
                latitude: "",
                username: "",
                pwd: "",
                check: true
            };
        },
        components: {},
        created() {
            _this = this;
            _this.username = localStorage.getItem('userName');
            // 极光推送初始化
            // _this.init();
        },
        mounted() {
            document.getElementsByClassName("fixedBottom")[0].style.top =
                document.body.offsetHeight - 29 + "px";
        },
        computed: {
            ...mapGetters(["mesObj", "hasNewMsg"])
        },
        methods: {
            login() {
                var options = {
                    method: "post",
                    url: "/home/index/login",
                    data: {
                        PhoneNumber: _this.username,
                        PassWord: _this.Tool.encode(_this.pwd),
                        lattitude: _this.Tool.current_latitude,
                        longtitude: _this.Tool.current_longitude,
                        Address: _this.Tool.address
                    },
                    // headers: {
                    //   'Content-Type': 'application/json'
                    // },
                    success: function(res) {
                        _this.Tool.toaster("登录成功");
                        _this.Global.PhoneNumber = _this.username;
                        _this.Global.ToKen = res["data"]["ToKen"];
                        _this.Global.UserType = res["data"]["UserType"];
                        _this.Global.UserName = res["data"]["Name"];
                        res['data']['WorkInfo']['HeadImage'] && (_this.Global['AvatarSrc'] = res['data']['WorkInfo']['HeadImage']);
                        if(res['data']['WorkInfo']) {
                            // if(res['data']['WorkInfo']['county'] && res['data']['WorkInfo']['villages']) {
                            //     _this.Global['Address'] = res['data']['WorkInfo']['county'] + '-' + res['data']['WorkInfo']['station'] + '-' + res['data']['WorkInfo']['villages'];
                            // }
                            _this.Global['Address'] = '';
                            if(res['data']['WorkInfo']['county']) {
                                _this.Global['Address'] += res['data']['WorkInfo']['county'];
                            }
                            if(res['data']['WorkInfo']['station']) {
                                _this.Global['Address'] += ('-' + res['data']['WorkInfo']['station']);
                            }
                            if(res['data']['WorkInfo']['villages']) {
                                _this.Global['Address'] += ('-' + res['data']['WorkInfo']['villages']);
                            }
                            if(res['data']['WorkInfo']['Jurisdiction'] === 'ADMIN') {
                                _this.Global['Address'] = '超级管理员';
                            }
                        }
                        let type = res["data"]["UserType"];
                        _this.Tool.newCos(_this.Global.PhoneNumber, _this.Global.ToKen);
                        // 获取推送消息
                        _this.init();
                        try{
                            _this.setAlias();
                            _this.setTag(type);
                        }catch(err) {
                            console.log('用手机推送');
                        }
                        _this.setUserType(type)
                        _this.setMesObj(mesObj);
                        if (_this.check) {
                            localStorage.setItem('userName', _this.username);
                        } else {
                            localStorage.removeItem('userName');
                        }
                        if (type === 1) {
                            _this.Tool.getPositionInfo();
                            _this.$router.push("Drug");
                        } else if (type === 2) {
                            _this.$router.push("Manage");
                        } else if (type === 3) {
                            _this.setAdminParams(res['data']);
                            _this.$router.push('BigManage');
                        }
                    }
                };
                _this.Tool.request(options, true);
            },
            setAdminParams(data) {
                var temp = data['WorkInfo'];
                _this.Global['AdminParams']['auth'] = temp['Jurisdiction'];
                _this.Global['AdminParams']['county'] = temp['county'];
                _this.Global['AdminParams']['station'] = temp['station'];
                _this.Global['AdminParams']['villages'] = temp['villages'];
                _this.Global['AdminParams_bak']['auth'] = temp['Jurisdiction'];
                _this.Global['AdminParams_bak']['county'] = temp['county'];
                _this.Global['AdminParams_bak']['station'] = temp['station'];
                _this.Global['AdminParams_bak']['villages'] = temp['villages'];
            },
            register() {
                _this.$router.push("Register");
            },
            goForget() {
                _this.$router.push("ForgetPassword");
            },
            ...mapMutations({
                setMesObj: "SET_MESOBJ",
                steNewMsg: 'SET_MSGTAG',
                setUserType: 'SET_USER_TYPE'
            }),
            init() {
                // 初始化页面
                document.addEventListener("deviceready", _this.onDeviceReady, false);
                document.addEventListener(
                    "jpush.receiveRegistrationId",
                    function(event) {
                        try {
                            registrationID = event.registrationId;
                        } catch (error) {
                            console.log(error);
                        }
                    },
                    false
                );
                //  document.addEventListener(
                //     "jpush.receiveNotification",
                //     function(event) {
                //         try {
                //             registrationID = event.registrationId;
                //         } catch (error) {
                //             console.log(error);
                //         }
                //     },
                //     false
                // );
            },
            onDeviceReady() {
                // 初始化推送
                // window.plugins.jPushPlugin.init();
                // console.log(
                //     " window.plugins.jPushPlugin=======",
                //     window.plugins.jPushPlugin
                // );
                // console.log(" window.JPush=======", window.JPush);
                // window.JPush.stopPush();
                window.JPush.init();
                window.JPush.getRegistrationID(function(rId) {
                    registrationID = rId;
                    console.log(rId);
                });
                // //点击通知栏的回调，在这里编写特定逻辑
                console.log("******************", window.plugins);
                window.plugins.jPushPlugin.openNotificationInAndroidCallback = function(
                  data
                ) {
                  try {
                    //  location.href = 'index.html';
                    let content = data.alert;
                    let type = data.extras.type;
                    console.log("内容=", content, "类型=", type);
                  } catch (error) {}
                };

                // 接收到推送消息回调
                window.plugins.jPushPlugin.receiveNotificationInAndroidCallback = function(
                    data
                ) {
                    try {
                        console.log('data===========================', data)
                        let msgType = data.extras.type;

                        _this.mesObj = _this.mesObj[msgType]++;
                        _this.setMesObj(_this.mesObj);
                        if (!_this.hasNewMsg) {
                            _this.steNewMsg(true)
                        }
                        console.log(
                            "JPushPlugin:receiveNotificationInAndroidCallback:",
                            data
                        );
                    } catch (exception) {
                        console.log("JPushPlugin:pushCallback ", exception);
                    }
                };
            },
            setAlias() {
                window.JPush.setAlias(
                    // { sequence: 13550007418, alias: "13550007418" }, //账号名
                    {
                        sequence: _this.Global.PhoneNumber,
                        alias: _this.Global.PhoneNumber
                    },
                    function(msg) {
                        console.log("sequence==========", msg);
                    },
                    function(msg) {
                        console.log("sequence====2222======", msg);
                    }
                );
            },
            setTag(type) {
                let resType;
                if (type === 1) {
                    //吸毒
                    resType = "500";
                } else {
                    resType = "600"; //工作人员
                }
                window.JPush.setTags({
                        sequence: parseInt(resType),
                        tags: [resType]
                    }, // 人员类型名
                    function(msg) {
                        console.log("msg===============", msg);
                    },
                    function(msg) {
                        console.log("msg===asasdasd============", msg);
                    }
                );
            }
        }
    };
</script>

<style scoped>
    .form {
        margin-top: 10px;
    }
    
    .form .mint-button {
        width: 300px;
        height: 50px;
        border-radius: 25px;
        background-color: #0ab7a9;
    }
    
    .input_box {
        margin-bottom: 20px;
        box-sizing: border-box;
        display: inline-block;
        width: 300px;
        height: 50px;
        border-radius: 25px;
        background-color: #ffffff;
        text-align: left;
        padding: 10px 25px;
        line-height: 25px;
    }
    
    input::input-placeholder {
        text-align: center;
    }
    
    input::-ms-input-placeholder {
        text-align: center;
    }
    
    input::-webkit-input-placeholder {
        text-align: center;
    }
    
    .input_box input {
        border: none;
        outline: none;
        height: 30px;
        text-indent: 5px;
        font-size: 16px;
    }
    
    .iconfont {
        font-size: 20px;
    }
    
    .login {
        color: #fff;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        text-align: center;
        background-image: url(../assets/imgs/bg.png);
        background-size: cover;
        padding-top: 60px;
        position: relative;
    }
    
    .logo {
        width: 120px;
        height: 120px;
    }
    
    .box {
        color: #fff;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    
    .box a {
        color: #fff;
    }
    
    .tips {
        margin-top: 12px;
    }
</style>