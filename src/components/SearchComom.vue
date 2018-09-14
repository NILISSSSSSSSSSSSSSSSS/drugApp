<template>
<div>
  <Header title="历史记录" back="/Manage" :btnParams="btnParams" ></Header>
  <div>
    <slot></slot>
  </div>
  <mt-cell :title="item.Name" value="说明文字" v-for="item in searchlist">
  </mt-cell>
</div>
</template>

<script>
  var _this;
    export default {
      data(){
        return {
          searchlist:[],
          btnParams:{
            canShow:false,
            icon:'',
            txt:'',
            isSearch:false
          },
        }
      },
      props:{
        
      },
      created(){
        _this=this;
        _this.getSearchData()
      },
      methods:{
        getSearchData() {
          var options = {
            url: '/home/query/getleavehistorylist',
            method: 'post',
            data: {
              DrugUserCardId:this.$route.query.CardId
            },
            success: function(res) {
              _this.searchlist=res.data.druguser;
            }
          };
          _this.Tool.request(options);
        }
      }

    }
</script>

<style>

</style>
