<template>
  <div class="State">
    <Header title="状态变更" back="/Manage" :btnParams="btnParams" @getKeyWords="searchByKeyWords"></Header>
    <div v-if="people['length']" class="peopleNum">{{people['length']}}人</div>
    <mt-cell v-for="item in people" v-bind:key="item.Name" :title="item.Name" is-link @click.native="goDetail(item)">
      <mt-badge type="error" v-show="item.state">{{item.state}}</mt-badge>
    </mt-cell>
    <div v-if="!people.length" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
  </div>
</template>

<script>
  import {searchMixins} from "@/common/mixin"
var _this;

export default {
  name: "State",
  mixins:[searchMixins],
  data() {
    return {
      people: [],
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
        url: '/home/query/getpersonnelstatelist',
        method: 'post',
        data: {

        },
        success: function(res) {
          _this.people = res['data']['druguser'];
          _this.people.forEach(item => {
            item.PersonnelStateData['RelieveDrug'] && (item.state = '解除');
            item.PersonnelStateData['OverDrug'] && (item.state = '终止');
            item.PersonnelStateData['StopDrug'] && (item.state = '中止');
          });
        }
      };
      _this.Tool.request(options);
    },
    goDetail(item) {
      _this.$router.push({path: '/Manage/State/StateDetail', query: item});
    }
  }
};
</script>

<style scoped>

</style>
