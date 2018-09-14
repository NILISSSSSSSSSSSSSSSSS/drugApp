<template>
  <div class="ApprovalDetail">
    <Header title="审批" back="/BigManage/MyApproval"></Header>
    <NameTitle :name="params.Name || params.LeaveName"></NameTitle>
    <template v-if="params.type === 1">
        <mt-cell title="身份证">
            <span>{{params.CardId}}</span>
        </mt-cell>
        <mt-cell title="现在地">
            <span>{{params.NowAddress}}</span>
        </mt-cell>
        <mt-cell title="回退原因">
            <span>{{params.Reason}}</span>
        </mt-cell>
    </template>
    <template v-if="params.type === 2">
        <mt-cell title="身份证">
            <span>{{params.CardId}}</span>
        </mt-cell>
        <mt-cell title="现在地">
            <span>{{params.NowAddress}}</span>
        </mt-cell>
        <mt-cell title="申请变更地点">
            <span>{{params.ExecutorAddress}}</span>
        </mt-cell>
        <mt-cell title="变更状态">
            <span>{{params.Outsider ? '州外' : '州内'}}</span>
        </mt-cell>
    </template>
    <template v-if="params.type === 3">
        <mt-cell title="身份证">
            <span>{{params.CardId}}</span>
        </mt-cell>
        <mt-cell title="现在地">
            <span>{{params.NowAddress}}</span>
        </mt-cell>
        <mt-cell title="请假开始时间">
            <span>{{params.StartTime}}</span>
        </mt-cell>
        <mt-cell title="请假结束时间">
            <span>{{params.EndTime}}</span>
        </mt-cell>
        <mt-cell title="请假目的地">
            <span>{{params.Destination}}</span>
        </mt-cell>
        <mt-cell title="详细地址">
            <span>{{params.Address}}</span>
        </mt-cell>
        <mt-cell title="请假原因">
            <span>{{params.Reason}}</span>
        </mt-cell>
    </template>
    <template v-if="params.type === 4">
        <mt-cell title="身份证">
            <span>{{params.Card_Id}}</span>
        </mt-cell>
        <mt-cell title="地址">
            <span>{{params.PermanentAddress}}</span>
        </mt-cell>
        <mt-cell title="原因">
            <span>{{params.Reason}}</span>
        </mt-cell>
    </template>
    <template v-if="params.type === 5">
        <mt-cell title="身份证">
            <span>{{params.Card_Id}}</span>
        </mt-cell>
    </template>
    <template v-if="params.type === 6">
        <mt-cell title="身份证">
            <span>{{params.Card_Id}}</span>
        </mt-cell>
        <mt-cell title="详细地址">
            <span>{{params.Address}}</span>
        </mt-cell>
        <mt-cell title="请假目的地">
            <span>{{params.Destination}}</span>
        </mt-cell>
        <mt-cell title="请假事由">
            <span>{{params.Reason}}</span>
        </mt-cell>
    </template>
    <div class="btn_group" v-if="params.type <= 3 && is_show_agree">
      <mt-button type="primary" size="normal" style="margin-right: 10px;" @click.native="agree">同意</mt-button>
      <mt-button type="default" size="normal" @click.native="disagree">不同意</mt-button>
    </div>
    <div v-if="params.type <= 3 && !is_show_agree" style="font-size: 20px;text-align: center;margin-top: 10px;">
        <span>{{show_msg}}</span>
    </div>
  </div>
</template>

<script>
    import {
        MessageBox
    } from 'mint-ui';
    // import regionData from "@/assets/data/regionData.json";
    import {mapGetters,mapMutations} from 'vuex';
    var _this;
    export default {
        name: "ApprovalDetail",
        data() {
            return {
                is_show_agree: false,
                show_msg: ''
            }
        },
        components: {},
        computed:{
            ...mapGetters(['mesObj'])
        },
        filters: {
            formatTime: function(UTC_time) {
                var date = new Date(UTC_time);
                return date.toLocaleDateString();
            }
        },
        created() {
            _this = this;
            _this.params = _this.$route.query;
            var state;
            state = _this.params.State;
            if(_this.Global['AdminParams']['auth'] === 'ADMIN') {
                if(_this.params['type'] === 1 || _this.params['type'] > 3) {
                    
                }else {
                    if(state['city']['State'] === '0') {
                        _this.is_show_agree = true;
                    }else if(state['city']['State'] === '1') {
                        _this.show_msg = '等待下级审批';
                    }else if(state['city']['State'] === '2') {
                        _this.show_msg = '已同意';
                    }else if(state['city']['State'] === '3'){
                        _this.show_msg = '不同意';
                    }
                }
            }else if(_this.Global['AdminParams']['auth'] === '1') {
                if(_this.params['type'] === 1 || _this.params['type'] > 3) {
                    
                }else {
                    if(state['county']['State'] === '0') {
                        _this.is_show_agree = true;
                    }else if(state['county']['State'] === '1') {
                        _this.show_msg = '等待下级审批';
                    }else if(state['county']['State'] === '2') {
                        _this.show_msg = '已同意';
                    }else if(state['county']['State'] === '3'){
                        _this.show_msg = '不同意';
                    }
                }
            }else if(_this.Global['AdminParams']['auth'] === '2') {
                if(_this.params['type'] > 3) {

                }else {
                    if(state['station']['State'] === '0') {
                        _this.is_show_agree = true;
                    }else if(state['station']['State'] === '1') {
                        _this.show_msg = '等待下级审批';
                    }else if(state['station']['State'] === '2') {
                        _this.show_msg = '已同意';
                    }else if(state['station']['State'] === '3'){
                        _this.show_msg = '不同意';
                    }
                }
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
                var url;
                switch(_this.params['type']) {
                    case 1:
                    url = '/backstage/index/pcsetreturn';
                    break;
                    case 2:
                    url = '/backstage/index/pcsetexecutor';
                    break;
                    case 3:
                    url = '/backstage/index/pcsetleave';
                    break;
                    default:
                    break;
                };
                var options = {
                    url: url,
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
                            path: '/BigManage/MyApproval',
                        });
                    },
                    error: function(err) {
                        _this.Tool.toaster(err.errmsg || '审批失败');
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