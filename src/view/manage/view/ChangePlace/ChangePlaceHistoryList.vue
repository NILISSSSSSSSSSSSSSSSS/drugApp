<template>
  <div>
    <Header title="变更执行地历史" back="/Manage/ChangePlace" :btnParams="btnParams"></Header>
    <div v-for="(item, index) in searchlist" v-bind:key="index" class="itemWrap">
      <img v-show="item.executorpproval === 2 || item.executorpproval === 3" :src="normorlizeUrl(item.executorpproval)" alt="" class="itemBg">
      <mt-cell title="名字">
        <span style="color: #888">{{item.Name}}</span>
      </mt-cell>
      <mt-cell title="身份证号码">
        <span style="color: #888">{{item.CardId}}</span>
      </mt-cell>
      <mt-cell title="变更时间">
        <span style="color: #888">{{item.CreateTime | killTime}}</span>
      </mt-cell>
      <mt-cell title="变更地点">
        <span style="color: #888">{{item.Oldcounty}}-{{item.Oldstation}}-{{item.Oldvillages}}</span>
      </mt-cell>
      <mt-cell title="变更内容">
        <span style="color: #888">{{item.Reason}}</span>
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
                console.log(LeaveApproval)
                if (LeaveApproval === 2) {
                    return okimg
                } else if(LeaveApproval === 3){
                    return noimg
                }
            },
            getSearchData() {
                var options = {
                    url: '/home/query/getexecutorhistorylist',
                    method: 'post',
                    data: {
                        DrugUserCardId: this.$route.query.CardId
                    },
                    success: (res) => {
                
                        this.searchlist = res.data.druguser;

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
    
    .list-item {
        padding: 15px 0;
        border-bottom: 1px solid #f5f5f5;
        display: flex;
    }
    
    .main-cont {
        flex: 1;
    }
    
    .m-name {
        width: 60px;
        display: flex;
    }
    
    .m-name span {
        width: 35px;
        height: 35px;
        border-radius: 35px;
        text-align: center;
        line-height: 35px;
        color: #fff;
        background-color: #3297fa;
        font-size: 12px;
        margin-left: 10px;
    }
    
    .m-name span i {
        font-size: 18px
    }
    
    .main-cont .m-title {
        height: 25px;
        padding: 0;
        margin: 0;
        font-size: 16px;
        color: #2F2F2F;
        font-weight: normal;
    }
    
    .item-txt {
        display: flex;
        color: #999;
    }
    
    .m-slide {
        font-size: 12px;
        color: #ccc;
        margin-right: 10px;
    }
</style>