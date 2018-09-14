<template>
  <div class="CheckSummary">
    <Header title="吸毒人员列表" :back="Wheel.checkReturns('CheckSummary')"></Header>
    <div v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance="0" :infinite-scroll-immediate-check="true">
      <div v-for="(item, index) in people" :key="index" class="card">
        <span v-if="obj.name !== '变更执行地'" style="font-size: 16px;margin-bottom: 5px;">{{item.Name}}</span>
        <span v-if="obj.name === '变更执行地'" style="font-size: 16px;margin-bottom: 5px;">{{item._id['Name']}}</span>
        <template v-if="obj.name === '人员核实'">
          <mt-badge type="error">{{item.AuthState ? '已核实' : '未核实'}}</mt-badge>
        </template>
        <template v-else-if="obj.name === '报到/登记'">
          <mt-badge type="error">{{item.DrugUserInfo['detailedOk'] ? '已报到登记' : '未报到登记'}}</mt-badge>
        </template>
        <template v-else-if="obj.name === '签到查看' && item.Signlog['length']">
          <span>签到时间:{{item.Signlog[0]['createTime'] | formatTime}}</span>
        </template>
        <template v-else-if="obj.name === '谈话记录' && item.Talklog['length']">
          <p>谈话方式:{{item.Talklog[0]['TalkMode']}}</p>
          <p>谈话地点:{{item.Talklog[0]['TalkPlace']}}</p>
          <p>谈话时间:{{item.Talklog[0]['TalkTime'] | formatTime}}</p>
        </template>
        <template v-else-if="obj.name === '尿检' && item.Urinelog['length']">
          <p>尿检地点:{{item.Urinelog[0]['UrineTestAddress']}}</p>
          <p>尿检结果:{{item.Urinelog[0]['UrineTestResults']}}</p>
          <p>尿检时间:{{item.Urinelog[0]['UrineTestTime'] | formatTime}}</p>
        </template>
        <template v-else-if="obj.name === '请假业务' && item.leavelog['length']">
          <p>请假地点:{{item.leavelog[0]['Address']}}</p>
          <p>开始时间:{{item.leavelog[0]['StartTime'] | formatTime}}</p>
          <p>结束时间:{{item.leavelog[0]['EndTime'] | formatTime}}</p>
          <p>请假事由:{{item.leavelog[0]['Reason']}}</p>
        </template>
        <template v-else-if="obj.name === '变更执行地'">
          <mt-badge type="error">已变更</mt-badge>
        </template>
        <template v-else-if="obj.name === '综合评估' && item.Comprehensivelog['length']">
          <p>评估开始时间:{{item.Comprehensivelog[0]['ComprehensiveStartTime'] | formatTime}}</p>
          <p>评估结束时间:{{item.Comprehensivelog[0]['ComprehensiveEndTime'] | formatTime}}</p>
        </template>
        <!-- <template v-else-if="obj.name === '违反协议'">
          <mt-badge type="error">{{item.DrugUserInfo['detailedOk'] ? '已报到登记' : '未报到登记'}}</mt-badge>
        </template> -->
        <template v-else-if="obj.name === '状态变更' && item.PersonnelStatelog['length']">
          <mt-badge type="error">{{item.PersonnelStatelog[0] | badgeShow}}</mt-badge>
        </template>
      </div>
      <div v-if="obj.name === '救助帮扶'" v-for="(each, i) in people" :key="i" class="helpCard">
        <p>帮扶时间: {{each.PushTime | formatTime}}</p>
        <p>帮扶人: {{each.HelpPeaple}}</p>
        <p>被帮扶人: {{each.HelpObject}}</p>
        <p>帮扶内容: {{each.Discrible}}</p>
      </div>
    </div>
    <div v-if="!people['length']" id="nodata" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
  </div>
</template>

<script>
import {searchMixins} from "@/common/mixin"
var _this;

export default {
  name: "CheckSummary",
  mixins:[searchMixins],
  data() {
    return {
      obj: null,
      curnum: 0,
      limit: 20,
      loading: false
    };
  },
  components: {},
  created() {
    _this = this;
    _this.obj = _this.Wheel.querySummary(_this.Global['AdminParams']['queryType']);
    _this.getData(0, _this.limit, false);
  },
  filters: {
    formatTime: function(UTC_time) {
      var date = new Date(UTC_time);
      return date.toLocaleDateString();
    },
    badgeShow: function(obj) {
      if(obj.OverDrug['OverDrug']) {
        return '已终止';
      }else if(obj.StopDrug['StopDrug']) {
        return '已中止';
      }else if(obj.RelieveDrug['RelieveDrug']) {
        return '已解除';
      }
    }
  },
  methods: {
    loadMore() {
      _this.loading = true;
      _this.curnum += 20;
      _this.getData(_this.curnum, _this.limit, true);
    },
    getData(curnum, limit, isGetPagedata) {
      var options;
      if(_this.obj['name'] === '救助帮扶') {
        options = {
          url: '/backstage/help/helpgetlist',
          method: 'get',
          params: {
            county: _this.Global['SelectedCounty'] || _this.Global['AdminParams']['county'],
            station: _this.Global['SelectedStation'] || _this.Global['AdminParams']['station'],
            villages: _this.Global['SelectedVillages'] || _this.Global['AdminParams']['villages'],
            curnum: curnum
          },
          success: function(res) {
            if(typeof res.data === 'object') {
              if(isGetPagedata) {
                if(res.data['pagedata']['length']) {
                  _this.people = _this.people.concat(res.data['pagedata']);
                }else {
                  _this.curnum -= 20;
                }
                _this.loading = false;
              }else {
                _this.people = res.data['pagedata'];
              }
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
            station: _this.Global['SelectedStation'] || _this.Global['AdminParams']['station'],
            villages: _this.Global['SelectedVillages'] || _this.Global['AdminParams']['villages'],
            curnum: curnum + '',
            limit: limit + ''
          },
          success: function(res) {
            if(typeof res.data === 'object') {
              if(isGetPagedata) {
                if(res.data['druguser']['length']) {
                  _this.people = _this.people.concat(res.data['druguser']);
                }else {
                  _this.curnum -= 10;
                }
                _this.loading = false;
              }else {
                _this.people = res.data['druguser'];
              }
              _this.setdata(_this.people);
            }
          }
        };
      }
      if(isGetPagedata) {
        _this.Tool.request(options, false, true);
      }else {
        _this.Tool.request(options);
      }
    }
  }
};
</script>

<style scoped>
.helpCard {
  font-size: 14px;
  width: 95%;
  min-height: 100px;
  border: 1px solid #ddd;
  margin: 10px auto;
  border-radius: 5px;
  background-color: #fff;
  position: relative;
  padding: 20px;
}
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
