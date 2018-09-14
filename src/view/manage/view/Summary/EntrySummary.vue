<template>
  <div class="EntrySummary">
    <Header title="综合评估人员列表" back="/Manage" :btnParams="btnParams" @getKeyWords="searchByKeyWords"></Header>
    <div v-if="people['length']" class="peopleNum">{{people['length']}}人</div>
    <mt-cell v-for="item in people" v-bind:key="item.Name" :title="item.Name" is-link @click.native="goDetail(item)">
      <span class="newestTime" v-show="item.state">评估结束日期:{{item.ComprehensiveData.ComprehensiveEndTime}}</span>
      <mt-badge type="error" v-show="item.state">{{item.state}}</mt-badge>
    </mt-cell>
    <div v-if="!people.length" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
  </div>
</template>

<script>
  import {searchMixins} from "@/common/mixin"
  import {mapGetters, mapMutations} from 'vuex'
  var _this;

export default {
  name: "EntrySummary",
  mixins:[searchMixins],
  data() {
    return {
      people: [],
      state: '',
    };
  },
  components: {

  },
  created() {
    _this = this;
    _this.getPeople();
  },
  methods: {
    getPeople() {
      var options = {
        url: '/home/query/getcomprehensivelist',
        method: 'post',
        data: {

        },
        success: function(res) {
          _this.people = res['data']['druguser'];
          _this.setdata(res['data']['druguser'])
          _this.people.forEach(item => {
            if(JSON.stringify(item.ComprehensiveData) !== '{}') {
              item.state = '已评估';
            }
          });
        }
      };
      _this.Tool.request(options);
    },
    goDetail(item) {
      _this.$router.push({path: '/Manage/EntrySummary/Summary', query: item});
    },
     ...mapMutations({
      setdata: 'SET_HISTORY_LISTDATA'
    }),
  }
};
</script>

<style scoped>
.newestTime{
  font-size: 14px;
  margin-right: 10px;
}
</style>
