<template>
  <div class="Manage">
    <!-- <div style="position: absolute;top: 10px;left: 10px;color: #666;" @click="goLogin()">返回登录</div>
    <div style="position: absolute;top: 10px;right: 10px;color: #666;">设置</div> -->
    <div class="header-top">
      <div @click="goUserInfo()" class="fl" style="width:10%">
          <img src="../../assets/imgs/user.png" alt="用户" width="70%">
      </div>
      <div class="search fl" style="width:80%">
          <span style="font-size: 16px;color: #fff;" v-if="Global.Environment === '培训版'">{{Global.Environment}}</span>
          <!-- <input type="text" placeholder="请输入查询内容"> -->
      </div>
      <div class="fl" style="width:10%">
          <!-- <img src="../../assets/imgs/set.png" alt="设置" width="70%"> -->
      </div>
  </div>
  <div style="height: 42px;"></div>
  <div class="banner" style="width:100%;height:150px;">
        <mt-swipe :auto="4000">
            <mt-swipe-item>
                    <img src="../../assets/imgs/banner1.png" alt="banner" width="100%">
            </mt-swipe-item>
            <mt-swipe-item>
                    <img src="../../assets/imgs/banner2.png" alt="banner" width="100%">
            </mt-swipe-item>
            <mt-swipe-item>
                    <img src="../../assets/imgs/banner3.jpg" alt="banner" width="100%">
            </mt-swipe-item>
        </mt-swipe>
  </div>
  <div class="userMsg">
    <!-- <img :src="headPic" alt="用户头像"> -->
    <p>欢迎您！{{Global.UserName}}</p>
    <p class="awaitBtn">
      <span class="dot" v-show="totalCount>0"></span>
      <img src="../../assets/imgs/webwxgetmsgimg.jpg" alt="" >
      <router-link to="/Manage/Pending" class="rigtBtn">
        待处理:{{totalCount}}
     </router-link>
    </p>
  </div>
    <div class="rowbox">
      <div v-for="(row, index) in items" v-bind:key="index" class="row">
        <div v-bind:class="{'no_border': !item.name}" @click="go(item.route)" class="item" v-for="(item, id) in row" v-bind:key="id">
          <img v-if="item.name" :src="item.icon" alt="图标">
          {{item.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {
        MessageBox
    } from "mint-ui";
    import {
        mapGetters,
        mapMutations
    } from "vuex";
    var _this;

    export default {
        name: "Manage",
        data() {
            return {
                headPic: "./static/img/police.png",
                items: [
                    [{
                        name: "人员核实",
                        icon: "./static/img/verify.png",
                        route: "Manage/Verify"
                    }, {
                        name: "报到/登记",
                        icon: "./static/img/checkin.png",
                        route: "Manage/CheckIn"
                    }, {
                        name: "签到查看",
                        icon: "./static/img/sign.png",
                        route: "Manage/SignInRecord"
                    }],
                    [{
                        name: "谈话记录",
                        icon: "./static/img/memcon.png",
                        route: "Manage/EntryMemcon"
                    }, {
                        name: "尿检",
                        icon: "./static/img/urinetest.png",
                        route: "Manage/EntryUrineTest"
                    }, {
                        name: "请假业务",
                        icon: "./static/img/vacation.png",
                        route: "Manage/Vacation"
                    }],
                    [{
                        name: "变更执行地",
                        icon: "./static/img/changplace.png",
                        route: "Manage/ChangePlace"
                    }, {
                        name: "综合评估",
                        icon: "./static/img/summary.png",
                        route: "Manage/EntrySummary"
                    }, {
                        name: "违反协议",
                        icon: "./static/img/violate.png",
                        route: "Manage/Violate"
                    }],
                    [{
                        name: "状态变更",
                        icon: "./static/img/state.png",
                        route: "Manage/State"
                    }, {
                        name: "救助帮扶",
                        icon: "./static/img/help.png",
                        route: "Manage/Help"
                    }, {
                        name: "预防教育",
                        icon: "./static/img/education.png",
                        route: "Manage/Education"
                    }]
                ]
            };
        },
        components: {},
        created() {
            _this = this;
            // console.log(_this.Global);
        },
        computed: {
            ...mapGetters(["mesObj", "hasNewMsg"]),
            totalCount() {
                return Object.values(this.mesObj).reduce((total, item) => {
                    return total += item;
                });

            }
        },
        methods: {
            goUserInfo() {
                _this.$router.push({
                    path: "/UserInfo",
                    query: {
                        parent: "/Manage"
                    }
                });
            },
            goLogin() {
                MessageBox.confirm("确定退出?")
                    .then(action => {
                        _this.go("/");
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            go(where) {
                _this.$router.push(where);
            }
        }
    };
</script>

<style scoped>
    .Manage {
        /* background-image: url(../../assets/imgs/bg.png); */
        /* background-size: cover; */
        /* display: flex;
  flex-direction: column;
  box-sizing: border-box; */
        /* padding-top: 10px; */
        /* padding-bottom: 60px; */
        /* 0325 16:58 */
        background: #fff;
    }
    
    .row {
        flex: 1;
        display: flex;
    }
    
    .item {
        margin: 10px;
        margin-bottom: 20px;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 5px;
        flex: 1;
        justify-content: space-around;
        text-align: center;
        color: #fff;
        min-height: 100px;
        /* 0325 16:58 */
        margin: 0;
        margin-bottom: 0;
        padding: 0 10px 20px;
        background: none;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-width: 1px 1px 0 0px;
        border-radius: 0;
        color: #666;
        background-color: #fff;
    }
    
    .rowbox {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    .Manage .row .item:nth-child(3) {
        border-right: none;
    }
    
    .item img {
        padding: 20% 30% 15%;
        /* 0325 16:58 */
        padding: 20% 30% 10%;
        width: 100%;
        box-sizing: border-box;
    }
    
    .userMsg {
        color: #666;
        display: flex;
        justify-content: space-between;
        height: 36px;
        align-items: center;
    }
    
    .awaitBtn {
        position: relative;
    }
    
    .dot {
        width: 0.5rem;
        height: 0.5rem;
        display: inline-block;
        border-radius: 50%;
        background: #f00;
        position: absolute;
        left: 0.7625rem;
        top: 0.11rem;
    }
    
    .awaitBtn img {
        vertical-align: middle;
        margin-bottom: 2px;
    }
    
    .awaitBtn a {
        text-decoration: underline;
        color: #169bd5;
    }
    
    .no_border {
        border-right: 0;
    }
</style>