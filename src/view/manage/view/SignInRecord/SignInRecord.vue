<template>
  <div class="SignInRecord">
    <Header title="签到记录" back="/Manage"></Header>
    <div v-if="signRecord['length']" class="peopleNum">{{signRecord['length']}}条记录</div>
    <mt-cell v-for="item in signRecord" v-bind:key="item.Name" :title="item.recordItem">
      <mt-badge type="error" v-show="item.showBadge">{{item.mess}}</mt-badge>
    </mt-cell>
    <div v-if="!signRecord.length" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
  </div>
</template>

<script>
import { mapGetters,mapMutations} from "vuex";
  var _this;
  export default {
    name: "SignInRecord",
    data() {
      return {
        signRecord:[],
        signArr:[]
      };
    },
    components: {
    },
    created() {
      _this = this;
      var postdata = {
        PhoneNumber: _this.Global.PhoneNumber,
        ToKen: _this.Global.ToKen
      }
      var options = {
        url: '/query/getsignlist',
        method: 'post',
        data: postdata,
        success: function(res) {
          this.signArr = res.data.druguser;
          console.log(this.signArr);
          for(var i=0;i<this.signArr.length;i++){
            this.signArr[i].showBadge=true;
            if(this.signArr[i].Signlog.SignTime){
               this.signArr[i].showBadge=false;
               this.signArr[i].recordItem = this.signArr[i].Name +' '+ this.signArr[i].Signlog.SignTime+' 进行了签到';
            }else{
              this.signArr[i].recordItem = this.signArr[i].Name;
              this.signArr[i].mess="未签到";
            }
          }
          _this.signRecord = res['data']['druguser'];
        },
        error: function(err) {
          console.log(err);
          // _this.Tool.toaster('审批失败');
        }
      };
      _this.Tool.request(options);

       _this.mesObj.sign=0
       _this.setMesObj(_this.mesObj)
    
    },
     computed: {
    ...mapGetters(["mesObj"])
  },
    methods: {
      ...mapMutations({
        setMesObj:'SET_MESOBJ'
      })
    }
  };
</script>

<style scoped>

</style>
