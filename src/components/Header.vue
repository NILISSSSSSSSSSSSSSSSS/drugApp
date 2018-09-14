<template>
  <div class="header">
    <mt-header fixed :title="title + env">
      <router-link v-if="back" :to="back" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button v-if="!back" icon="back" @click="backFn()">返回</mt-button>
      <span v-if="set" @click="go(set)" slot="right">设置</span>
      <mt-button v-if="btnParams" slot="right" :icon="btnParams.icon"  v-show="btnParams.canShow" @click="handleFn()">
      {{btnParams.txt ? btnParams.txt: ''}}
    </mt-button>
    </mt-header>
    <div style="height: 40px;"></div>
    <div class="search-wrap header" v-show="showSearch"><input v-model="value" placeholder="请输入搜索关键词" class="top-search" type="text"></div>
  </div>
</template>

<script>
    var _this;

    export default {
        name: "Header",
        data() {
            return {
                showSearch: false,
                value: "",
                env: ''
            };
        },
        props: {
            title: String,
            back: String,
            backFn: Function,
            set: String,
            // btnParams: {
            //   type: Object,
            //   default: {
            //     isSearch: true,
            //     canShow: false,
            //     icon: "",
            //     txt: "",
            //     url: "",
            //     apiName: ""
            //   }
            // }
            btnParams: Object,
            queryType: String
        },
        components: {},
        created() {
            _this = this;
            if(_this.Global.Environment === '培训版') {
                _this.env = '(培训版)';
            }
            // console.log(_this.btnParams);
        },
        methods: {
            handleFn() {
                if (_this.btnParams.isSearch) {
                    _this.showSearch = !this.showSearch;
                    if (!this.showSearch) {
                        //          _this.$emit("resetData");
                        _this.value = ''
                    }
                } else {
                    let CardId = _this.$route.query.CardId;
                    let apiName = _this.btnParams.apiName;
                    console.log(_this.btnParams)
                    _this.$router.push({
                        path: _this.btnParams.url,
                        query: {
                            CardId,
                            apiName
                        }
                    });
                }
            },
            go(where) {
                _this.$router.push({
                    path: where
                });
            }
        },
        watch: {
            value() {
                _this.$emit("getKeyWords", _this.value, _this.queryType);
            }
        }
    };
</script>

<style scoped>
    .mint-header {
        background-color: #00bfb1;
        font-size: 16px;
    }
    
    .search-wrap {
        position: fixed;
        left: 0;
        top: 5px;
        z-index: 10;
        width: 80%;
        height: 40px;
        margin-left: 10%;
        color: #fff;
    }
    
    .search-wrap.header {
        width: 84%;
        margin-left: 7.5%;
        color: #fff;
    }
    
    .top-search {
        height: 30px;
        padding: 0;
        width: 100%;
        border-radius: 10px;
        border: none;
        background: #4ad2c8 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAYAAACMo1E1AAAElklEQ…Wq6oc6Vqhbk5M+VE5PuBqymcgt24DOoWxrpaWOSKnq/wNPoaNbupgZdgAAAABJRU5ErkJggg==) no-repeat 5px 5px;
        background-size: 20px;
        outline: none;
        padding-left: 40px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0 auto;
        display: block;
        color: #fff;
    }
    
    .search-wrap.header .top-search {
        padding-left: 20px;
    }
</style>