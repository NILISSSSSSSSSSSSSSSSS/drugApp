<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
    <mt-popup
        v-model="popupVisible"
        style="width: 100%;height: 100%;"
        position="right">
       <div>更新中...</div> 
       <mt-progress :value="progress" :bar-height="5"></mt-progress> 
    </mt-popup>
  </div>
</template>

<script>
    var _this;
    export default {
        name: "App",
        data() {
            return {
                transitionName: "slide-left",
                key: '',
                popupVisible: false,
                progress: 0,
            };
        },
        watch: {
            $route(to, from) {
                const toDepth = to.path.split("/").length;
                const fromDepth = from.path.split("/").length;
                this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
            }
        },
        created() {
            _this = this;
            if(_this.Global['Environment'] === _this.Global['ENV_PROD']) {
                _this.key = 'smhprod.apk';
            }else {
                _this.key = 'smhtest.apk';
            }
            _this.Tool.updateApp(_this.createFilePath);
            var path, query, path_arr;
            document.addEventListener("backbutton", function() {
                var handled_path = "";
                console.log("path: ", _this.$route.path);
                path = _this.$route.path;
                query = _this.$route.query;
                switch (path) {
                    case "/":
                        navigator.app.exitApp();
                        break;
                    case "/Drug":
                        navigator.app.exitApp();
                        break;
                    case "/Manage":
                        navigator.app.exitApp();
                        break;
                    case "/BigManage":
                        navigator.app.exitApp();
                        break;
                    case "/ForgetPassword":
                        _this.$router.push({
                            path: "/"
                        });
                        break;
                    case "/Register":
                        _this.$router.push({
                            path: "/"
                        });
                        break;
                    case "/UserInfo":
                        _this.$router.push({
                            path: query.parent
                        });
                        break;
                    case "/Manage/Pending":
                        path = _this.Wheel.checkReturnIndex();
                        _this.$router.push({
                            path: path
                        });
                        break;
                    case '/Manage/Education':
                        path = _this.Wheel.checkReturnIndex();
                        _this.$router.push({
                            path: path
                        });
                        break;
                    case '/BigManage/SelectCounty':
                        path = _this.Wheel.checkReturns('SelectCounty');
                        _this.$router.push({path: path});
                        break;
                    case '/BigManage/SelectCounty/SelectStation':
                        path = _this.Wheel.checkReturns('SelectStation');
                        _this.$router.push({path: path});
                        break;
                    case '/BigManage/SelectCounty/SelectStation/SelectVillages':
                        path = _this.Wheel.checkReturns('SelectVillages');
                        _this.$router.push({path: path});
                        break;
                    case '/BigManage/SelectCounty/SelectStation/SelectVillages/CheckSummary':
                        path = _this.Wheel.checkReturns('CheckSummary');
                        _this.$router.push({path: path});
                        break;
                    default:
                        path_arr = path.split("/");
                        path_arr.pop();
                        for (var i = 0, len = path_arr.length; i < len; ++i) {
                            handled_path += path_arr[i] ? `/${path_arr[i]}` : "";
                        }
                        console.log("handled_path: ", handled_path);
                        _this.$router.push({
                            path: handled_path,
                            query: query
                        });
                        break;
                }
            });

        },
        mounted() {
          _this.Tool.initpermissions();
        },
        methods: {
            createFilePath() {
                _this.popupVisible = true;
                // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
                //     fs.root.getFile(_this.key, { create: true, exclusive: false }, function (fileEntry) {  
                //         console.log(fileEntry);  
                //         //调用fileTransfer插件，下载图片  
                //         _this.downLoadImg(fileEntry.nativeURL);
                //     }, function(err) {  
                //     console.log(err);  
                //     });  
                // }, function(error) {  
                //     console.log(error);  
                // });  
                var fileURL = cordova.file.externalRootDirectory + _this.key;
                _this.downLoadImg(fileURL);
            },
            // fileTransfer plugin
            downLoadImg(fileURL) {
                // 初始化FileTransfer对象  
                var fileTransfer = new FileTransfer();  
                fileTransfer.onprogress = function(progressEvent) {
                    if (progressEvent.lengthComputable) {  
                        console.log("当前进度："+progressEvent.loaded / progressEvent.total);
                        _this.progress = (progressEvent.loaded / progressEvent.total) * 100;
                    }
                }
                // 服务器下载地址
                var uri = encodeURI("https://xcgk20180320-1256236574.cos.ap-chengdu.myqcloud.com/app/" + _this.key);
                // 调用download方法  
                fileTransfer.download(
                    uri,         //uri网络下载路径  
                    fileURL,      //url本地存储路径  
                    function(entry) {
                        console.log('下载成功');
                        console.log(fileURL);
                        cordova.plugins.fileOpener2.open(
                            fileURL, 
                            'application/vnd.android.package-archive'
                        );
                    },  
                    function(error) {
                        console.log("download error source " + error.source);  
                        console.log("download error target " + error.target);  
                        console.log("upload error code" + error.code);  
                    },
                    function(progress) {
                        console.log(progress);
                    }
                );  
            }
        }
    };
</script>

<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        width: 100%;
        height: 100%;
    }
    
    .child-view {
        background-color: #f0eff5;
        position: absolute;
        width: 100%;
        /* padding-bottom: 53px; */
        height: 100%;
        transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
        box-sizing: border-box;
        /* padding-top: 40px; */
    }
    
    .slide-left-enter,
    .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(30px, 0);
        transform: translate(30px, 0);
    }
    
    .slide-left-leave-active,
    .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-30px, 0);
        transform: translate(-30px, 0);
    }
    
    .child-view.tab-bottom {
        padding-bottom: 55px;
    }
    
    .tab-bottom .mint-tab-container,
    .tab-bottom .mint-tab-container-wrap,
    .tab-bottom .mint-tab-container-item,
    .tab-bottom .Container1,
    .tab-bottom .Container2,
    .tab-bottom .Container3,
    .tab-bottom .Container4 {
        height: 100%;
    }
    
    .view_img {
        width: 80px;
        height: 80px;
        border-radius: 5px;
    }
    /* 覆盖全局mint-ui样式 */
    
    .mint-button.mint-button--primary {
        background-color: #0ab7a9 !important;
    }
    
    input.mint-field-core {
        text-align: right;
    }
    
    #left input.mint-field-core {
        text-align: left;
    }
    
    .mint-cell-title {
        min-width: 5em;
    }
    
    .mint-cell img {
        margin: 5px 0;
        border-radius: 5px;
    }
    
    .userMsg {
        color: #666;
        padding: 0 10px 0;
    }
    
    .userMsg img {
        width: 25%;
        border-radius: 50%;
    }
    
    .header-top {
        width: 100%;
        /* height: 100px; */
        background: #00bfb1;
        padding: 5px 10px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        position: fixed;
    }
    
    .header-top .fl {
        float: left;
        box-sizing: border-box;
        text-align: center;
    }
    
    .header-top .fl img {
        width: 26px;
        height: 26px;
        margin-top: 2px;
    }
    
    .header-top .fl input {
        height: 30px;
        padding: 0;
        width: 99%;
        border-radius: 10px;
        border: none;
        background: #4ad2c8 url(./assets/imgs/search.png) no-repeat 5px 5px;
        background-size: 20px;
        outline: none;
        padding-left: 40px;
        box-sizing: border-box;
    }
    
    .header-top .fl input::-webkit-input-placeholder {
        color: #fff;
    }
    
    .fontSize_13 {
        font-size: 13px;
    }
    .fontSize_12 {
        font-size: 12px;
    }
    .mint-tab-item-label {
        font-size: 16px!important;
    }
    
    .mint-navbar .mint-tab-item.is-selected {
        border-bottom: 3px solid #00bfb1!important;
        color: #00bfb1!important;
    }
    
    .mint-badge.is-warning {
        margin: 0 3px;
    }
    .peopleNum {
        text-align: center;
        background-color: #fff;
        color: red;
        width: 100%;
        border-bottom: 1px solid #ddd;
        font-size: 16px;
    }
</style>