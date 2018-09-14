import {mapGetters, mapMutations} from 'vuex'
export const searchMixins={
   data(){
     return{
       people: [],
       btnParams:{
         canShow:true,
         icon:'search',
         txt:'',
         isSearch:true
       }
     }
   },
  methods:{
    searchByKeyWords(keyWords, queryType){
      if(keyWords){
        let reg=new RegExp(keyWords);
        this.people=this.listDdataStore.filter((item)=>reg.test(item.Name || item[queryType]));
      }else {
        this.people=this.listDdataStore
      }
    },
    ...mapMutations({
      setdata: 'SET_HISTORY_LISTDATA'
    }),
  },
  computed: {
    ...mapGetters(['listDdataStore'])
  }
};
export const historyMixins={
  data(){
    return{
      btnParams:{
        canShow:true,
        icon:'',
        txt:'历史记录',
        isSearch:false
      }
    }
  }
};
export const historyListMixins={
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
  created(){
    this.getSearchData()
  },
  methods:{
    getSearchData() {
      let apiName=this.$route.query.apiName;
      var options = {
        url: `/home/query/${apiName}`,
        method: 'post',
        data: {
          DrugUserCardId:this.$route.query.CardId
        },
        success: function(res) {
          this.searchlist=res.data.druguser;
          console.log(_this.searchlist)
        }
      };
      this.Tool.request(options);
    }
  }

};

