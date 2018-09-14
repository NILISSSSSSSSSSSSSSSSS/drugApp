<template>
    <div class="EntryUrineTest">
        <Header title="尿检人员列表" back="/Manage" :btnParams="btnParams" @getKeyWords="searchByKeyWords"></Header>
        <div v-if="people['length']" class="peopleNum">{{people['length']}}人</div>
        <mt-cell v-for="item in people" v-bind:key="item.Name" :title="item.Name" is-link @click.native="goDetail(item)">
            <mt-badge type="error" v-show="item.showBadge">{{item.mess}}</mt-badge>
        </mt-cell>
        <div v-if="!people.length" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
    </div>
</template>

<script>
    var _this;
    import {searchMixins}from '@/common/mixin.js'
    export default {
        name: "EntryUrineTest",
      mixins:[searchMixins],
        data() {
            return {
                people: [],
                mess: '未审批'
            };
        },
        components: {},
        created() {
            _this = this;
             _this.getPeople();
        },
        methods: {
             getPeople() {
               var options = {
                 url: '/home/query/geturinelist',
                 method: 'post',
                 data: {},
                 success: function(res) {
                   console.log(res);
                   let druguserArr = res.data.druguser;
                   _this.setdata(res['data']['druguser']);
                   for (var i = 0; i < druguserArr.length; i++) {
                     if (druguserArr[i].UrineData.UrineTestAddress) {
                       druguserArr[i].showBadge = true;
                       switch (druguserArr[i].UrineData.UrineApproval) {
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
                     } else {
                       druguserArr[i].showBadge = false;
                     }
                   }
                   _this.people = res['data']['druguser'];
                 }
               };
               _this.Tool.request(options);
             },
            goDetail(item) {
                console.log(item)
                if (item.UrineData.UrineApproval) {
                    _this.$router.push({
                        path: '/Manage/EntryUrineTest/UnapprovedUrineTest',
                        query: item
                    });
                } else {
                    _this.$router.push({
                        path: '/Manage/EntryUrineTest/UrineTest',
                        query: item
                    });
                }
            },
            
        }
    };
</script>

<style scoped>

</style>
