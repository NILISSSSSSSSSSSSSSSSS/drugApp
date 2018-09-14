<template>
  <div class="Education">
    <Header title="预防教育" :back="back"></Header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="0">法律法规</mt-tab-item>
      <mt-tab-item id="1">警示教育</mt-tab-item>
      <mt-tab-item id="2">微视频</mt-tab-item>
      <mt-tab-item id="3">禁毒宣传</mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="0" class="container">
        <mt-loadmore class="content" bottomPullText="" :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore_0">
          <div @click="goDetail(item)" v-for="(item, index) in content_0" :key="index" class="ls">
            <div class="right">
              <p class="title">{{item.Title}}</p>
              <p class="name">{{item.Name}}</p>
            </div>
          </div>
          <div v-if="!content_0.length" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
        </mt-loadmore>
      </mt-tab-container-item>
      <mt-tab-container-item id="1" class="container">
        <mt-loadmore class="content" bottomPullText="" :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore_1">
          <div @click="goDetail(item)" v-for="(item, index) in content_1" :key="index" class="ls">
            <div class="right">
              <p class="title">{{item.Title}}</p>
              <p class="name">{{item.Name}}</p>
            </div>
          </div>
          <div v-if="!content_1.length" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
        </mt-loadmore>
      </mt-tab-container-item>
      <mt-tab-container-item id="2" class="container">
        <mt-loadmore class="content" bottomPullText="" :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore_2">
          <div @click="goDetail(item)" v-for="(item, index) in content_2" :key="index" class="ls">
            <div class="right">
              <p class="title">{{item.Title}}</p>
              <p class="name">{{item.Name}}</p>
            </div>
          </div>
          <div v-if="!content_2.length" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
        </mt-loadmore>
      </mt-tab-container-item>
      <mt-tab-container-item id="3" class="container">
        <mt-loadmore class="content" bottomPullText="" :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore_3">
          <div @click="goDetail(item)" v-for="(item, index) in content_3" :key="index" class="ls">
            <div class="right">
              <p class="title">{{item.Title}}</p>
              <p class="name">{{item.Name}}</p>
            </div>
          </div>
          <div v-if="!content_3.length" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
        </mt-loadmore>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
var _this;

export default {
  name: "Education",
  data() {
    return {
      selected: '0',
      content_0: [],
      content_1: [],
      content_2: [],
      content_3: [],
      allLoaded: false,
      current_page_0: 0,
      current_page_1: 0,
      current_page_2: 0,
      current_page_3: 0,
      back: ''
    };
  },
  components: {},
  created() {
    _this = this;
    _this.back = _this.Wheel.checkReturnIndex();
    _this.getPageData(0, 0);
  },
  watch: {
    selected: function(newVal, oldVal) {
      _this.getPageData(newVal, 0);
    }
  },
  methods: {
    loadTop() {
      _this.getPageData(_this.selected, 0);
    },
    loadBottom() {
      _this[`current_page_${_this.selected}`] += 10;
      _this.getPageData(_this.selected, _this[`current_page_${_this.selected}`]);
    },
    /**
     * @todo 删除mock
     */
    getPageData(txttype, page) {
      var options = {
        url: '/backstage/preventeducation/edugetfilelist',
        method: 'get',
        params: {
          curnum: page,
          txttype: txttype,
          token: _this.Global['ToKen'],
          phonenumber: _this.Global['PhoneNumber']
        },
        success: function(res) {
          if(page > 0) {
            if(res['data']['pagedata']) {
              _this[`content_${txttype}`] = _this[`content_${txttype}`].concat(res['data']['pagedata']);
            }else {
              _this[`current_page_${txttype}`] && (_this[`current_page_${txttype}`] -= 10);
            }
            _this.$refs[`loadmore_${txttype}`]['onBottomLoaded']();
          }else {
            _this[`content_${txttype}`] = res['data']['pagedata'] || [];
            _this.$refs[`loadmore_${txttype}`]['onTopLoaded']();
          }
        },
      };
      _this.Tool.request(options, true);
    },
    goDetail(item) {
      _this.$router.push({path: '/Manage/Education/EducationDetail', query: item});
    }
  }
};
</script>

<style scoped>
.ls {
  width: 100%;
  height: 48px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  display: flex;
  padding-left: 10px;
  padding-top: 5px;
}
.ls .left {
  flex: 1;
  width: 48px;
  height: 48px;
  border-radius: 5px;
  line-height: 48px;
}
.left img {
  width: 40px;
  height: 40px;
}
.ls .right {
  flex: 4;
}
.container {
  padding-top: 3px;
}
.title {
  font-size: 16px;
}
</style>