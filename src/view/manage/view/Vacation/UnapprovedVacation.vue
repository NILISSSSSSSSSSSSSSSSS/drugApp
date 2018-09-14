<template>
  <div class="UnapprovedVacation">
    <Header title="人员请假审批" back="/Manage/Vacation?flag=true" :btnParams="btnParams"></Header>
    <NameTitle :name="params.Name"></NameTitle>
    <mt-cell title="请假开始时间">
      <span style="color: #888">{{params.LeaveData.StartTime | killTime}}</span>
    </mt-cell>
    <mt-cell title="请假结束时间">
      <span style="color: #888">{{params.LeaveData.EndTime | killTime}}</span>
    </mt-cell>
    <mt-cell title="请假目的地">
      <span style="color: #888">{{params.LeaveData.Destination}}</span>
    </mt-cell>
    <mt-cell title="详细地址">
      <span style="color: #888">{{params.LeaveData.Address}}</span>
    </mt-cell>
    <mt-cell title="请假事由">
      <span style="color: #888">{{params.LeaveData.Reason}}</span>
    </mt-cell>
    <!-- <mt-cell title="请假条照片">
      <img :src="params.LeaveData.Photo" alt="" class="view_img">
    </mt-cell> -->
    <ImageBox title="请假条照片" disabled :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'image_1')"></ImageBox>
    <div class="btn_group" v-show="handleShow && !isWaiting">
      <mt-button type="primary" size="normal" style="margin-right: 10px;" @click.native="agree">同意</mt-button>
      <mt-button type="default" size="normal" @click.native="disagree">不同意</mt-button>
    </div>
    <div class="btn_group" v-show="!handleShow && !isWaiting">
        <mt-button type="primary" size="normal" style="margin-right: 10px;" @click.native="$router.push({path: '/Manage/Vacation/TypeInVacation', query: params})">新增请假录入</mt-button>
    </div>
  </div>
</template>

<script>
    import {
        MessageBox
    } from 'mint-ui';
    import regionData from "@/assets/data/regionData.json";
    import {mapGetters,mapMutations} from 'vuex';
    var _this;
    export default {
        name: "UnapprovedVacation",

        data() {
            return {
                media: {
                    image_1: []
                },
                btnParams: {
                    canShow: true,
                    icon: '',
                    txt: '历史记录',
                    isSearch: false,
                    url: '/Manage/Vacation/VacationHistoryList'
                },
                /*  vacation:{
                   StartTime:"",
                   EndTime:"",
                   Destination:"",
                   Address:"",
                   Reason:"",
                   Photo:""
                 } */
                handleShow: true,
                isWaiting: false
            }
        },
        components: {},
        computed:{
            ...mapGetters(['mesObj'])
        },
        created() {
            _this = this;
            _this.params = _this.$route.query;
            _this.Tool.parseImage(_this.media['image_1'], _this.params.LeaveData.Photo);
            if (_this.params.mess == "已同意" || _this.params.mess == '不同意') {
                this.handleShow = false;
            }
            if(_this.params.mess === '等待上级审批') {
                _this.isWaiting = true;
            }
        },
        methods: {
            //同意
            agree: function() {
                MessageBox.confirm('确定同意吗？').then(action => {
                    _this.handle('2');
                });
            },
            //不同意
            disagree: function() {
                MessageBox.confirm('确定不同意吗？').then(action => {
                    _this.handle('3');
                });
            },
            handle(type) {
                var options = {
                    url: 'home/data/examineleave',
                    method: 'post',
                    data: {
                        ExamineType: type,
                        DrugUserCardId: _this.params['CardId']
                    },
                    success: function(res) {
                        console.log(res);
                        if(_this.mesObj.leave > 0) {
                            _this.mesObj.leave -= 1;
                        }else {
                            _this.mesObj.leave = 0;
                        }
                        _this.setMesObj(_this.mesObj);
                        _this.Tool.toaster('审批成功');
                        _this.$router.push({
                            path: '/Manage/vacation',
                        });
                    },
                    error: function(err) {
                        _this.Tool.toaster('审批失败');
                    }
                };
                _this.Tool.request(options);
            },
            ...mapMutations(
              {
                setMesObj:'SET_MESOBJ'
              }
            )
        }
    };
</script>

<style scoped>
    .view_img {
        width: 100px;
        height: 100px;
        display: block;
    }
    
    .btn_group {
        text-align: center;
        margin-top: 50px;
    }
</style>