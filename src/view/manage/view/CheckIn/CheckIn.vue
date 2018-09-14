<template>
  <div class="CheckIn">
    <Header title="报到/登记" back="/Manage" :btnParams="btnParams" @getKeyWords="searchByKeyWords"></Header>
    <mt-cell>
      <mt-button type="primary" @click="goBd()" size="small">手动录入人员</mt-button>
    </mt-cell>
    <mt-navbar v-model="selected" style="margin-bottom: 10px;">
      <mt-tab-item id="1">
        待报到
        <!-- <i slot="icon">{{people_1['length']}}</i> -->
        <mt-badge type="error">{{people_1['length']}}</mt-badge>
      </mt-tab-item>
      <mt-tab-item id="2">
        已报到
        <!-- <i slot="icon">{{people_2['length']}}</i> -->
        <mt-badge type="error">{{people_2['length']}}</mt-badge>
      </mt-tab-item>
      <mt-tab-item id="3">
        确认逾期
        <!-- <i slot="icon">{{people_3['length']}}</i> -->
        <mt-badge type="error">{{people_3['length']}}</mt-badge>
      </mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected" swipeable>
      <mt-tab-container-item id="1">
        <mt-cell @click.native="goInfo(item)" v-for="item in people_1" v-bind:key="item.Name" :title="item.Name" is-link>
          <mt-badge type="error" v-if="item.status === 0" style="margin-right: 5px;">待登记</mt-badge>
          <mt-badge type="error" v-if="item.status === 1" style="margin-right: 5px;">逾期未报到</mt-badge>
        </mt-cell>
        <div v-if="!people_1.length" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-cell @click.native="goInfo(item)" v-for="item in people_2" v-bind:key="item.Name" :title="item.Name" is-link>
          <mt-badge type="error" v-if="item.status === 2" style="margin-right: 5px;">已经报到</mt-badge>
          <mt-badge type="error" v-if="item.status === 4" style="margin-right: 5px;">工作人员确定未逾期</mt-badge>
        </mt-cell>
        <div v-if="!people_2.length" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <mt-cell @click.native="goInfo(item)" v-for="item in people_3" v-bind:key="item.Name" :title="item.Name" is-link>
          <mt-badge type="error" v-if="item.status === 3" style="margin-right: 5px;">确认逾期</mt-badge>
        </mt-cell>
        <div v-if="!people_3.length" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
      </mt-tab-container-item>
    </mt-tab-container>

    <!-- <mt-cell @click.native="goInfo(item)" v-for="item in people" v-bind:key="item.Name" :title="item.Name" is-link>
      <mt-badge type="error" v-if="item.status === 0" style="margin-right: 5px;">待登记</mt-badge>
      <mt-badge type="error" v-if="item.status === 1" style="margin-right: 5px;">逾期未报到</mt-badge>
      <mt-badge type="error" v-if="item.status === 2" style="margin-right: 5px;">已经报到</mt-badge>
      <mt-badge type="error" v-if="item.status === 3" style="margin-right: 5px;">确定逾期</mt-badge>
      <mt-badge type="error" v-if="item.status === 4" style="margin-right: 5px;">工作人员确定未逾期</mt-badge>
    </mt-cell>
    <div v-if="!people.length" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div> -->
  </div>
</template>

<script>
  import {searchMixins} from "@/common/mixin"
  import {mapGetters, mapMutations} from 'vuex'
var _this;

export default {
  name: "CheckIn",
  mixins:[searchMixins],
  data() {
    return {
      people: [],
      selected: '1',
      people_1: [],
      people_2: [],
      people_3: []      
    };
  },
  created() {
    _this = this;
    _this.getPeople();
  },
  computed: {
    ...mapGetters(['listDdataStore','listDdataStore1', 'listDdataStore2'])
  },
  methods: {
    getPeople() {
      var options = {
        url: '/home/query/getdruguserreportlist',
        method: 'post',
        data: {

        },
        success: function(res) {
          _this.people = res['data']['druguser'];
          _this.people.forEach(item => {
            if(item.status === 0 || item.status === 1) {
              _this.people_1.push(item);
            }else if(item.status === 2 || item.status === 4) {
              _this.people_2.push(item);
            }else if(item.status === 3){
              _this.people_3.push(item);
            }
          });
          _this.setdata(_this.people_1);
          _this.setdata1(_this.people_2);
          _this.setdata2(_this.people_3);
        }
      };
      _this.Tool.request(options);
    },
    searchByKeyWords(keyWords){
      if(keyWords){
        let reg=new RegExp(keyWords);
        if(_this.selected === '1'){
          this.people_1=this.listDdataStore.filter((item)=>reg.test(item.Name))
        }else if(_this.selected === '2'){
          this.people_2=this.listDdataStore1.filter((item)=>reg.test(item.Name))
        }else {
          this.people_3=this.listDdataStore2.filter((item)=>reg.test(item.Name))          
        }
      }else {
        if(_this.selected === '1'){
          this.people_1=this.listDdataStore
        }else if(_this.selected === '2'){
          this.people_2=this.listDdataStore1
        }else {
          this.people_3=this.listDdataStore2
        }
      }
    },
    goBd(item) {
      _this.$router.push({path: '/Manage/CheckIn/Bd', query: item});
    
    },
    goInfo(item) {
      switch(item.status) {
        case 0:
        //待登记-待报到
        _this.$router.push({path: '/Manage/CheckIn/Info', query: item});
        break;
        case 1:
        //逾期未报到-待报到
        _this.$router.push({path: '/Manage/Violate'});
        break;
        case 2:
        //已经报到-已报到
        _this.$router.push({path: '/Manage/CheckIn/Info', query: item});
        break;
        case 3:
        //确定逾期
        break;
        case 4:
        //工作人员确定未逾期-已报到
        break;
      }
    },
     ...mapMutations({
      setdata: 'SET_HISTORY_LISTDATA',
      setdata1: 'SET_HISTORY_LISTDATA1',
      setdata2: 'SET_HISTORY_LISTDATA2'
    }),
  
  }
};
</script>

<style scoped>

</style>
