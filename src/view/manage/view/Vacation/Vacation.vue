<template>
    <div class="Vacation">
        <Header title="请假业务" back="/Manage" :btnParams="btnParams" @getKeyWords="searchByKeyWords" ></Header>
        <div v-if="people['length']" class="peopleNum">{{people['length']}}人</div>
        <mt-cell v-for="item in people" v-bind:key="item.Name" :title="item.Name" is-link @click.native="typeIn(item)">
            <mt-badge type="error" v-show="item.showBadge">{{item.mess}}</mt-badge>
        </mt-cell>
        <div v-if="!people.length" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
    </div>
</template>

<script>
    import {
        MessageBox
    } from 'mint-ui';
    import {mapGetters,mapMutations} from 'vuex'
    import {searchMixins}from '@/common/mixin.js'
    var _this;
    var flag = false;
    export default {
      name: "Vacation",
      mixins:[searchMixins],
        data() {
            return {
                selected: '1',
                people: [],
            };
        },
      computed:{
        ...mapGetters(['listDdataStore'])
      },
        created() {
            _this = this;
            _this.$route.query.flag && (_this.selected = '2');
             _this.getPeople();
        },
        methods: {
            typeIn(item) {
                console.log(item.LeaveData)
                if (!item.LeaveData.LeaveApproval) {
                    _this.$router.push({
                        path: '/Manage/Vacation/TypeInVacation',
                        query: item
                    });
                } else {
                    _this.$router.push({
                        path: '/Manage/Vacation/UnapprovedVacation',
                        query: item
                    });
                }
            },
            getPeople(){
              var options = {
                url: '/home/query/getleavelist',
                method: 'post',
                data: {},
                success: function(res) {
                  console.log(res);
                  let druguserArr = res.data.druguser
                  for (var i = 0; i < druguserArr.length; i++) {
                    if (druguserArr[i].LeaveData.StartTime) {
                      druguserArr[i].showBadge = true;
                      switch (druguserArr[i].LeaveData.LeaveApproval) {
                        case 0:
                          druguserArr[i].showBadge = false;
                          break;
                        case 1:
                          druguserArr[i].mess = "请求审批";
                          break;
                        case 2:
                          druguserArr[i].mess = "已同意";
                          break;
                        case 3:
                          druguserArr[i].mess = "不同意";
                          break;
                        default:
                          druguserArr[i].mess = "等待上级审批";
                      }
                    } else {
                      druguserArr[i].showBadge = false;
                    }
                  }
                  _this.people = res['data']['druguser'];
                  _this.setData(res['data']['druguser'])
                }
              };
              _this.Tool.request(options);
          },
          ...mapMutations(
              {
                setData:'SET_HISTORY_LISTDATA'
              }
    
          ),
//          searchByKeyWords(keyWords){
//            if(keyWords){
//              let reg=new RegExp(keyWords);
//              _this.people=_this.people.filter((item)=>reg.test(item.Name))
//            }else {
//              _this.getPeople()
//            }
//          }
        }
    };
</script>

<style scoped>

</style>
