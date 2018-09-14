<template>
  <div>
    <Header title="尿检历史" back="/Manage/EntryUrineTest" :btnParams="btnParams"></Header>
    <div v-for="(item, index) in searchlist" v-bind:key="index" class="itemWrap">
       <img v-show="item.UrineApproval===2 ||item.UrineApproval===3" :src="normorlizeUrl(item.UrineApproval)" alt="" class="itemBg">
      <mt-cell title="名字">
        <span style="color: #888">{{item.Name}}</span>
      </mt-cell>
      <mt-cell title="身份证号码">
        <span style="color: #888">{{item.CardId}}</span>
      </mt-cell>
      <mt-cell title="尿检时间">
        <span style="color: #888">{{item.UrineTestTime | killTime}}</span>
      </mt-cell>
      <mt-cell title="尿检地点">
        <span style="color: #888">{{item.UrineTestAddress}}</span>
      </mt-cell>
      <mt-cell title="尿检结果">
        <span style="color: #888">{{item.UrineTestResults}}</span>
      </mt-cell>
      <mt-cell title="工作人员名字">
        <span style="color: #888">{{item.UrineWorkerName}}</span>
      </mt-cell>
      <mt-cell title="电话号码">
        <span style="color: #888">{{item.PhoneNumber}}</span>
      </mt-cell>
    </div>
    <div v-if="!searchlist.length" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
  </div>
</template>

<script>
    import okimg from '@/assets/imgs/ok.png'
    import noimg from '@/assets/imgs/no.png'
    var _this;
    export default {
        created() {
            _this = this;
        },
        data() {
            return {
                searchlist: [],
                btnParams: {
                    canShow: false,
                    icon: '',
                    txt: '',
                    isSearch: false
                },
            }
        },
        created() {
            _this = this;
            _this.getSearchData()
        },
        methods: {
            normorlizeUrl(LeaveApproval) {
                if (LeaveApproval === 2) {
                    return okimg
                } else if(LeaveApproval===3) {
                    return noimg
                }
            },
            getSearchData() {
                let apiName = _this.$route.query.apiName;
                var options = {
                    url: `/home/query/${apiName}`,
                    method: 'post',
                    data: {
                        DrugUserCardId: this.$route.query.CardId
                    },
                    success: function(res) {
                        _this.searchlist = res.data.druguser;

                    }
                };
                _this.Tool.request(options);
            }
        }
    }
</script>

<style>
    .itemWrap {
        background-color: #ccc;
        border-radius: 5px;
        margin: 10px;
        position: relative;
    }
    
    .itemBg {
        position: absolute;
        right: 0;
        z-index: 1;
        width: 100px;
        bottom: 60px;
    }
</style>