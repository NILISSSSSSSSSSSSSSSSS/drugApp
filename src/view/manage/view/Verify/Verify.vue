<template>
  <div class="Verify">
    <Header title="人员核实" back="/Manage" :btnParams="btnParams" @getKeyWords="searchByKeyWords"></Header>
    <div class="peopleNum" v-if="people['length']">{{people['length']}}人</div>
    <mt-cell v-for="item in people" v-bind:key="item.name" :title="item.Name" @click.native.capture="goDetail(item)">
      <!-- <span class="fontSize_12">{{item['Sex'] | handleSex}} {{item['Card_Id']}}</span>
      <p class="fontSize_12" style="height: 22px;">性别:{{item['Sex'] | handleSex}}</p>
      <p class="fontSize_12" style="height: 22px;">身份证:{{item['Card_Id']}}</p> -->
      <mt-button type="primary" @click="goClaim(item)" size="small" style="margin-right: 5px;">确定</mt-button>
      <mt-button type="default" @click="goReject(item)" size="small">回退</mt-button>
    </mt-cell>
    <!-- <div class="ls" v-for="(item, index) in people" v-bind:key="index" :title="item.Name" @click.capture="goDetail(item)" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">
      <div class="fl name">{{item.Name}}</div>
      <div class="fl center">
        <p class="fontSize_12">性别:{{item['Sex'] | handleSex}}</p>
        <p class="fontSize_12">身份证:{{item['Card_Id']}}</p>
      </div>
      <div class="fr">
        <mt-button type="primary" @click="goClaim(item)" size="small" style="margin-right: 5px;">确定</mt-button>
        <mt-button type="default" @click="goReject(item)" size="small">回退</mt-button>
      </div>
    </div> -->
    <div v-if="!people.length" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">
      暂无数据
    </div>
  </div>
</template>
<script>
  import {searchMixins} from '@/common/mixin.js'
  var _this;
  export default {
    name: "Verify",
    mixins: [searchMixins],
    data() {
      return {
        people: []
      };
    },
    created() {
      _this = this;
      _this.getPeople();
    },
    methods: {
      getPeople() {
        var options = {
          url: '/home/query/getdruguser',
          method: 'post',
          data: {},
          success: (res) => {
            _this.people = res['data']['users'];
            this.setdata(res['data']['users'])
          }
        };
        _this.Tool.request(options);
      },
      goClaim(item) {
        _this.$router.push({path: '/Manage/Verify/Claim', query: item});
      },
      goReject(item) {
        _this.$router.push({path: '/Manage/Verify/Reject', query: item});
      },
      goDetail(item) {
        _this.$router.push({path: '/Manage/Verify/VerifyDetail', query: item});        
      }
    }
  };
</script>

<style scoped>
.fl {
  float: left;
}
.fr {
  float: right;
}
.name {
  font-size: 16px;
}
.height_24 {
  height: 24px;
  line-height: 24px;
}
.center {
  height: 48px;
  margin-left: 5px;
  text-align: left;
  padding-top: 10px;
}
.center p {
  color: #888;
  height: 15px;
  line-height: 15px;
}
.ls {
  border-bottom: 1px solid #ddd;
  padding-left: 5px;
  padding-right: 5px;
}
</style>
