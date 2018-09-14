<template>
  <div class="Violate">
    <Header title="违反协议" back="/Manage" :btnParams="btnParams" @getKeyWords="searchByKeyWords"></Header>
    <mt-navbar v-model="selected" style="margin-bottom: 10px;">
      <mt-tab-item id="1">
          系统预警
          <mt-badge type="error">{{people['length']}}</mt-badge>
      </mt-tab-item>
      <mt-tab-item id="2">
          人工录入
          <mt-badge type="error">{{people_2['length']}}</mt-badge>
      </mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected" swipeable>
      <mt-tab-container-item id="1">
        <mt-cell v-for="item in people" v-bind:key="item.Name" :title="item.Name" is-link @click.native="warning(item)">
            <mt-badge type="error" v-for="(state, index) in item.states" v-bind:key="index">{{state}}</mt-badge>
        </mt-cell>
        <!-- <mt-cell v-for="item in people" v-bind:key="item.Name" :title="item.Name" is-link @click.native="warning(item)">
            <mt-badge type="error" v-for="(state, index) in item.states" v-bind:key="index">{{state}}</mt-badge>
        </mt-cell> -->
        <div v-if="!people.length" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-cell v-for="item in people_2" v-bind:key="item.Name" :title="item.Name" is-link @click.native="typeIn(item)">
            <mt-badge type="warning" size="small" v-for="(state, index) in item.states" v-bind:key="index">{{state}}</mt-badge>
        </mt-cell>
        <div v-if="!people_2.length" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
    import {
        MessageBox
    } from 'mint-ui';
    var _this;
    var flag = false;

    export default {
        name: "Violate",
        data() {
            return {
                selected: '1',
                people: [],
                people_2: [],
                btnParams:{
                  canShow:true,
                  icon:'search',
                  txt:'',
                  isSearch:true
              }
            };
        },
        components: {

        },
        created() {
            _this = this;
            _this.$route.query.flag && (_this.selected = '2');
            _this.getPeople();
            _this.getPeople_2();
        },
        methods: {
            getPeople() {
                var options = {
                    url: '/home/query/getviolationlist',
                    method: 'post',
                    data: {

                    },
                    success: function(res) {
                        _this.people = res['data']['druguser'];
                        _this.setdata(res['data']['druguser']);
                        _this.people.forEach(item => {
                            item.states = [];
                            if(_this.Wheel.checkState(item.ReportOverdue)) {
                                item.ReportOverdue['ReportOverdue_Label'] ? (item.states.push('确定报到逾期')) : (item.states.push('逾期未报到'));
                            }
                            if(_this.Wheel.checkState(item.UrineTestOverdue)) {
                                item.UrineTestOverdue['UrineTestOverdue_Label'] ? (item.states.push('确定尿检逾期')) : (item.states.push('逾期未尿检'));
                            }
                            // _this.Wheel.checkState(item.ReportOverdue) && (item.states.push('逾期未报到'));
                            // _this.Wheel.checkState(item.UrineTestOverdue) && (item.states.push('逾期未检测'));
                        });
                    }
                };
                _this.Tool.request(options);
            },
            searchByKeyWords(keyWords){
                if(keyWords){
                    let reg=new RegExp(keyWords);
                    if(_this.selected===1){
                        this.people=this.listDdataStore.filter((item)=>reg.test(item.Name))
                    }else{
                         this.people_2=this.listDdataStore1.filter((item)=>reg.test(item.Name))
                         console.log(this.listDdataStore1)
                    }
                
                }else {
                    if(_this.selected===1){
                         this.people=this.listDdataStore
                    }else{
                         this.people_2=this.listDdataStore1
                    }
                   
                }
                },
            getPeople_2() {
                var options = {
                    url: '/home/query/getmanualentrylist',
                    method: 'post',
                    data: {

                    },
                    success: function(res) {
                        _this.people_2 = res['data']['druguser'];
                        _this.setdata1(res['data']['druguser']);
                        _this.people_2.forEach(item => {
                            item.states = [];
                            item.Manualentrylog['Refusalcheck_Label'] && (item.states.push('拒检'));
                            item.Manualentrylog['LeaveExecutor_Label'] && (item.states.push('离开'));
                            item.Manualentrylog['AddressChangeReport_Label'] && (item.states.push('未报到'));
                            item.Manualentrylog['TelephoneNoContact_Label'] && (item.states.push('无法联系'));
                            item.Manualentrylog['Abnormal_Label'] && (item.states.push('活动异常'));
                            // 1 && (item.states.push('拒检'));
                            // 1 && (item.states.push('离开'));
                            // 1 && (item.states.push('未报到'));
                            // 1 && (item.states.push('无法联系'));
                            // 1 && (item.states.push('活动异常'));
                        });
                    }
                };
                _this.Tool.request(options);
            },
            warning(item) {
                _this.$router.push({
                    path: '/Manage/Violate/SystemWarning',
                    query: item
                });
            },
            typeIn(item) {
                _this.$router.push({
                    path: '/Manage/Violate/TypeInViolate',
                    query: item
                });
            },
        //   searchByKeyWords(keyWords){
        //       if(_this.selected===1){
        //         if(keyWords){
        //           this.people=  _this.setdata.filter((item)=>reg.test(item.Name))
        //         }else {
        //           this.people=_this.setdata
        //         }
        //       }else {
        //         if(keyWords){
        //           this.people_2=_this.setdata1.filter((item)=>reg.test(item.Name))
        //         }else {
        //           this.people_2=_this.setdata1
        //         }
        //       }
        //   },
          ...mapMutations({
            setdata: 'SET_HISTORY_LISTDATA',
            setdata1: 'SET_HISTORY_LISTDATA1'
          }),
        },
        computed: {
          ...mapGetters(['listDdataStore','listDdataStore1'])
        }

    };
</script>

<style scoped>
    .mint-tab-item-label {
        font-size: 16px;
    }
</style>
