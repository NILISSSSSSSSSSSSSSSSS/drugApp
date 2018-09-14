<template>
  <div class="MyApproval">
    <Header title="我的审批" back="/BigManage"></Header>
    <mt-navbar v-model="selected" style="margin-bottom: 10px;">
      <mt-tab-item id="1">
        待审批
        <!-- <mt-badge type="error">{{people_1['length']}}</mt-badge> -->
      </mt-tab-item>
      <mt-tab-item id="2">
        已审批
        <!-- <mt-badge type="error">{{people_2['length']}}</mt-badge> -->
      </mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="box">
          <div class="classify">回退</div>
          <div v-for="(item, index) in data_1" :key="index" class="card" @click="goApproval(item, 1)">
            <p>{{item.Name}}</p>
            <i class="mint-cell-allow-right"></i>
          </div>
          <div v-if="!data_1.length" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
        </div>
        <div class="box">
          <div class="classify">变更执行地</div>
          <div v-for="(item, index) in data_2" :key="index" class="card" @click="goApproval(item, 2)">
            <p>{{item.Name}}</p>
            <i class="mint-cell-allow-right"></i>
          </div>
          <div v-if="!data_2.length" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
        </div>
        <div class="box">
          <div class="classify">请假</div>
          <div v-for="(item, index) in data_3" :key="index" class="card" @click="goApproval(item, 3)">
            <p>{{item.Name}}</p>
            <i class="mint-cell-allow-right"></i>
          </div>
          <div v-if="!data_3.length" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="box">
          <div class="classify">回退</div>
          <div v-for="(item, index) in data_4" :key="index" class="card" @click="goApproval(item, 4)">
            <p>{{item.Name}}</p>
            <i class="mint-cell-allow-right"></i>
          </div>
          <div v-if="!data_4.length" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
        </div>
        <div class="box">
          <div class="classify">变更执行地</div>
          <div v-for="(item, index) in data_5" :key="index" class="card" @click="goApproval(item, 5)">
            <p>{{item.Name}}</p>
            <i class="mint-cell-allow-right"></i>
          </div>
          <div v-if="!data_5.length" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
        </div>
        <div class="box">
          <div class="classify">请假</div>
          <div v-for="(item, index) in data_6" :key="index" class="card" @click="goApproval(item, 6)">
            <p>{{item.LeaveName}}</p>
            <i class="mint-cell-allow-right"></i>
          </div>
          <div v-if="!data_6.length" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>

var _this;

export default {
  name: "MyApproval",
  data() {
    return {
      selected: '1',
      data_1: [],
      data_2: [],
      data_3: [],
      data_4: [],
      data_5: [],
      data_6: []
    };
  },
  components: {},
  created() {
    _this = this;
    _this.getUnApprovalData();
  },
  watch: {
    selected: function(newVal, oldVal) {
      if(newVal === '1') {
        _this.getUnApprovalData();
      }else if(newVal === '2') {
        _this.getApprovaledData();
      }
    }
  },
  methods: {
    getUnApprovalData() {
      _this.getData(1);
      _this.getData(2);
      _this.getData(3);
    },
    getApprovaledData() {
      _this.getData(4);
      _this.getData(5);
      _this.getData(6);
    },
    getData(type) {
      var url;
      switch(type) {
        /* 未审批 */
        //回退
        case 1:
        url = '/backstage/query/queryreturndrug';
        break;
        //变更执行地
        case 2:
        url = '/backstage/query/queryexamineexecutor';
        break;
        //请假
        case 3:
        url = '/backstage/query/queryexamineleave';
        break;
        /* 已审批 */
        //回退
        case 4:
        url = '/backstage/query/queryreturndrugok';
        break;
        //变更执行地
        case 5:
        url = '/backstage/query/queryexamineexecutorok';
        break;
        //请假
        case 6:
        url = '/backstage/query/queryexamineleaveok';
        break;
      }
      var options = {
        url: url,
        method: 'post',
        data: {
          
        },
        success: function(res) {
          _this[`data_${type}`] = res.data['druguser'];
        },
      };
      _this.Tool.request(options);
    },
    goApproval(item, type) {
      item['type'] = type;
      _this.$router.push({path: '/BigManage/MyApproval/ApprovalDetail', query: item});
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
.classify {
  font-size: 20px;
  padding-left: 10px;
  margin-bottom: 5px;
  margin-top: 5px;
}
</style>
