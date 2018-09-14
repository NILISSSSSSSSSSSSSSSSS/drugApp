<template>
  <div class="SelectStation">
    <Header title="下属工作站" :back="Wheel.checkReturns('SelectStation')" :btnParams="btnParams" @getKeyWords="searchByKeyWords" queryType="station"></Header>
    <div v-for="(item, index) in people" :key="index" class="card" @click="goVillages(item.station)">
      <p style="font-size: 16px;margin-bottom: 5px;">{{item.station}}</p>
      <span v-for="(each, i) in obj.fields" :key="i" style="margin-right: 5px;">{{each.label}}:&nbsp;<span :style="{color: each.color, fontSize: '15px'}">{{item[each['value']]}}</span></span>
      <i class="mint-cell-allow-right"></i>
    </div>
    <div v-if="!people['length']" id="nodata" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
  </div>
</template>

<script>
import {searchMixins} from "@/common/mixin"
var _this;

export default {
  name: "SelectStation",
  mixins:[searchMixins],
  data() {
    return {
      obj: null
    };
  },
  components: {},
  created() {
    _this = this;
    _this.getData();
  },
  methods: {
    goVillages(item) {
      _this.Global['SelectedStation'] = item;
      _this.$router.push({path: '/BigManage/SelectCounty/SelectStation/SelectVillages'});
    },
    getData() {
      _this.obj = _this.Wheel.querySummary(_this.Global['AdminParams']['queryType']);
      var options;
      if(_this.obj['name'] === '救助帮扶') {
        options = {
          url: _this.obj['url'],
          method: 'get',
          params: {
            county: _this.Global['SelectedCounty'] || _this.Global['AdminParams']['county'],
            station: _this.Global['AdminParams']['station'],
            villages: _this.Global['AdminParams']['villages']
          },
          success: function(res) {
            if(typeof res.data === 'object') {
              _this.people = res.data;
              _this.setdata(_this.people);
            }
          }
        };
      }else {
        options = {
          url: _this.obj['url'],
          method: 'post',
          data: {
            county: _this.Global['SelectedCounty'] || _this.Global['AdminParams']['county'],
            station: _this.Global['AdminParams']['station'],
            villages: _this.Global['AdminParams']['villages'],
            curnum: '0',
            limit: '0'
          },
          success: function(res) {
            if(typeof res.data === 'object') {
              _this.people = res.data['res'];
              _this.setdata(_this.people);
            }
          }
        };
      }
      _this.Tool.request(options);
    }
  }
};
</script>

<style scoped>
.card {
  font-size: 13px;
  width: 100%;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
  position: relative;
  padding: 15px;
}
.mint-cell-allow-right::after {
  width: 15px;
  height: 15px;
}
</style>
