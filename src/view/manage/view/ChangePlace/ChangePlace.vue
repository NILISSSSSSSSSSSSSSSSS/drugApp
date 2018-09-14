<template>
  <div class="ChangePlace">
    <Header title="变更执行地" back="/Manage" :btnParams="btnParams" @getKeyWords="searchByKeyWords" ></Header>
    <!-- <mt-navbar v-model="selected" style="margin-bottom: 10px;">
              <mt-tab-item id="1">审批</mt-tab-item>
              <mt-tab-item id="2">录入</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected" swipeable>
              <mt-tab-container-item id="1">
                <mt-cell v-for="item in mock" v-bind:key="item.name" :title="item.name" is-link @click.native="approve(item)" />
              </mt-tab-container-item>
              <mt-tab-container-item id="2">
                <mt-cell v-for="item in mock" v-bind:key="item.name" :title="item.name" is-link @click.native="typeIn(item)" />
              </mt-tab-container-item>
            </mt-tab-container> -->
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
  import {searchMixins} from '@/common/mixin'
  var _this;
  var flag = false;
  export default {
    name: "ChangePlace",
    mixins:[searchMixins],
    data() {
      return {
        people: [],
      };
    },
    components: {},
    created() {
      _this = this;
      // _this.$route.query.flag && (_this.selected = '2');
      // _this.getPeople();
    _this.getPeople()
    },
    methods: {
        getPeople() {
          var options = {
            url: '/home/query/getexecutolist',
            method: 'post',
            data: {},
            success: function(res) {
              console.log(res);
              let druguserArr = res.data.ResultList;
              for (var i = 0; i < druguserArr.length; i++) {
                if (druguserArr[i].ExamineData.County) {
                  druguserArr[i].showBadge = true;
                  switch (druguserArr[i].ExamineData.Examineleave) {
                    case 0:
                      druguserArr[i].showBadge = false;
                      break;
                    case 1:
                      druguserArr[i].mess = "请求审批";
                      break;
                    case 2:
                      druguserArr[i].mess = "同意";
                      break;
                    case 3:
                      druguserArr[i].mess = "不同意";
                      break;
                    default:
                      druguserArr[i].mess = "未审批";
                  }
                }
              }
              _this.people = res['data']['ResultList'];
            }
          };
          _this.Tool.request(options);
       },
      // approve(item) {
      //   MessageBox({
      //     title: '提示',
      //     message: '请选择操作?',
      //     confirmButtonText: '同意',
      //     cancelButtonText: '不同意',
      //     showCancelButton: true
      //   }).then(action => {
      //     console.log(action);
      //   });
      // },
      typeIn(item) {
        // _this.$router.push({path: '/Manage/ChangePlace/TypeInChangePlace', query: item});
        console.log(item.ExamineData);
        if (!item.ExamineData.Examineleave) {
          _this.$router.push({
            path: '/Manage/ChangePlace/TypeInChangePlace',
            query: item
          });
        } else {
          _this.$router.push({
            path: '/Manage/ChangePlace/UnapprovedChangePlace',
            query: item
          });
        }
      }
    },
  };
</script>

<style scoped>

</style>
