<template>
  <div class="QueryHelp">
    <Header title="查询" back="/Manage/Help/AddHelp"></Header>
    <div class="card">
      <input type="text" style="width: 80%;padding: 5px;" placeholder="请输入被帮扶人员姓名" v-model="name">
      <mt-button size="small" type="primary" @click="query">查询</mt-button>
      <div style="margin-top: 5px;" v-if="people_query.name">
        <input type="checkbox" v-check v-model="people_query.check">
        <span>{{people_query.name}}</span>
      </div>
      <div style="text-align: right;" v-if="people_query.name">
        <mt-button size="small" type="primary" @click="add">添加到被帮扶人</mt-button>
      </div>
    </div>
    <div class="card">
      <div>被帮扶人：</div>
      <div class="people_area">
        <span v-for="(item, index) in people_selected" :key="index" class="p">
          {{item}}
          <i @click="deletePeople(index)" class="delete">x</i>
        </span>
      </div>
    </div>
    <CustomButton @click.native="submit">确定</CustomButton>
  </div>
</template>

<script>
var _this;

export default {
  name: "QueryHelp",
  data() {
    return {
      name: '',
      people_query: {
        name: '',
        check: true
      },
      people_selected: []
    };
  },
  components: {},
  created() {
    _this = this;
  },
  methods: {
    query() {
      var options = {
        url: '/backstage/help/helpobjectcheck',
        method: 'post',
        data: {
          token: _this.Global['ToKen'],
          phonenumber: _this.Global['PhoneNumber'],
          Name: _this.name
        },
        success: function(res) {
          _this.people_query.check = true;
          _this.people_query.name = _this.name;
        }
      };
      _this.Tool.request(options, true);
    },
    add() {
      if(_this.people_query['check']) {
        if(_this.people_selected.indexOf(_this.people_query['name']) === -1) {
          _this.people_selected.push(_this.people_query['name']);
        }else {
          _this.Tool.toaster('请勿重复添加');
        }
      }else {
        _this.Tool.toaster('请勾选被帮扶人');
      }
    },
    submit() {
      var people = {
        names: _this.people_selected.join(',')
      };
      _this.$router.push({path: '/Manage/Help/AddHelp', query: people});
    },
    deletePeople(index) {
      _this.people_selected.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.delete {
  position: absolute;
  color: #fff;
  background-color: red;
  top: -3px;
  right: -4px;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  font-size: 12px;
  text-align: center;
  line-height: 10px;
}
.card {
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
.people_area {
  border: 1px solid #aaa;
  min-height: 50px;
  padding: 5px;
}
.p {
  display: inline-block;
  padding: 3px;
  position: relative;
  border-radius: 5px;
  background-color: #ddd;
  margin-right: 6px;
}
</style>