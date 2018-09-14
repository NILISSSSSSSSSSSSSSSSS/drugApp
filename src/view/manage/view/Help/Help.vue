<template>
  <div class="Help">
    <mt-header fixed :title="'救助帮扶' + '(' + Global.Environment + ')'">
      <router-link to="/Manage" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <span @click="newHelp()" slot="right">新增</span>
    </mt-header>
    <div style="height: 40px;"></div>
    <mt-loadmore v-nodata="cards.length" class="content" bottomPullText="" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <div v-for="(item, index) in cards" :key="index" class="card" @click="goDetail(item)">
        <p>帮扶时间: {{item.PushTime | formatTime}}</p>
        <p>帮扶内容: {{item.Discrible}}</p>
        <p>帮扶吸毒人员数: {{item.HelpObjectNumber}}</p>
        <i class="mint-cell-allow-right"></i>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
var _this;

export default {
  name: "Help",
  data() {
    return {
      cards: [],
      allLoaded: false,
      current_page: 0
    };
  },
  components: {},
  created() {
    _this = this;
    _this.getHelp(0);
  },
  filters: {
    formatTime: function(UTC_time) {
      var date = new Date(UTC_time);
      return date.toLocaleDateString();
    },
  },
  methods: {
    loadTop() {
      _this.getHelp(0);
    },
    loadBottom() {
      _this.getHelp(++_this.current_page);
    },
    /** @todo
     * 删除mock
     */
    getHelp(page) {
      var options = {
        url: '/backstage/help/helpgetlist',
        method: 'get',
        params: {
          token: _this.Global['ToKen'],
          phonenumber: _this.Global['PhoneNumber'],
          curnum: page
        },
        success: function(res) {
          if(page > 0) {
            if(res['data']['pagedata']['length']) {
              _this.cards = _this.cards.concat(res['data']['pagedata']);
            }else {
              _this.current_page && _this.current_page--;
            }
            _this.$refs.loadmore.onBottomLoaded();
          }else {
            _this.cards = res['data']['pagedata'];
            _this.$refs.loadmore.onTopLoaded();
          }
          console.log(_this.current_page);
        },
        // mock: {
        //   data: {
        //     pagedata: []
        //   }
        // }
      };
      _this.Tool.request(options, true);
    },
    goDetail(item) {
      _this.$router.push({path: '/Manage/Help/HelpDetail', query: item});
    },
    newHelp() {
      _this.$router.push({path: '/Manage/Help/AddHelp'});
    }
  }
};
</script>

<style scoped>
.content p {
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mint-header {
  background-color: #00bfb1;
  font-size: 16px;
}
.content {
  width: 100%;
  height: calc(100% - 40px);
}
.card {
  font-size: 14px;
  width: 95%;
  height: 100px;
  border: 1px solid #ddd;
  margin: 10px auto;
  border-radius: 5px;
  background-color: #fff;
  position: relative;
  padding: 20px;
}
.mint-cell-allow-right::after {
  width: 20px;
  height: 20px;
}
</style>