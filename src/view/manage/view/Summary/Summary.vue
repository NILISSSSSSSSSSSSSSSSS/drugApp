<template>
  <div class="Summary">
    <Header title="综合评估" back="/Manage/EntrySummary" :btnParams="btnParams"></Header>
    <mt-cell title="评估开始时间" value="请选择时间" @click.native="$refs.time.openTimePicker('startTime')" is-link>
      <span style="color: #888" v-if="time.startTime">{{time.startTime}}</span>
    </mt-cell>
    <mt-cell title="评估结束时间" value="请选择时间" @click.native="$refs.time.openTimePicker('endTime')" is-link>
      <span style="color: #888" v-if="time.endTime">{{time.endTime}}</span>
    </mt-cell>
    <!-- <mt-cell title="评估表照片" value="请选择图片" @click.native="$refs.media.chooseMediaType('pic')">
      <span style="color: #aaa;" v-if="!media.value">请选择图片</span>
      <img class="view_img" :src="media.value" alt="" v-if="media.value">
      <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
    </mt-cell> -->
    <ImageBox title="评估表照片" :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'value')"></ImageBox>
    <CustomButton position="bottom" @click.native="submit()">上报</CustomButton>
    <!-- 时间选择Picker -->
    <TimePicker ref="time" :field="time" :confirmCallback="confirmCallback"></TimePicker>
    <!-- 媒体组件 -->
    <MediaCapture ref="media" :field="media"></MediaCapture>
  </div>
</template>

<script>
    var _this;

    export default {
        name: "Summary",
        data() {
            return {
                btnParams: {
                    url: '/Manage/EntrySummary/SummaryHistory',
                    apiName: 'getsummaryhistorylist',
                    txt: "历史记录",
                    canShow: true,
                    icon: '',
                    isSearch: false,
                },
                params: null,
                time: {
                    startTime: '',
                    endTime: ''
                },
                media: {
                    value: []
                },
            };
        },
        components: {

        },
        created() {
            _this = this;
            _this.params = _this.$route.query;
        },
        methods: {
            confirmCallback(date, type, str_date) {
                if(type === 'startTime') {
                    var d = new Date(str_date);
                    d.setFullYear(d.getFullYear() + 1);
                    d.setDate(d.getDate() - 1);
                    _this.time['endTime'] = _this.Tool.handleTime(d, '/');
                }
            },
            submit() {
                var fileList = {
                    ComprehensivePhoto: _this.media['value'],
                };
                var formData = {
                    DrugUserCardId: _this.params['CardId'],
                    ComprehensiveStartTime: _this.time['startTime'],
                    ComprehensiveEndTime: _this.time['endTime'],
                };
                var params_myUpload = {
                    fileType: 'pic',
                    fileList: fileList,
                };
                var params_postForm = {
                    url: '/home/data/comprehensiveupload',
                    data: formData,
                    success: function(res) {
                        _this.Tool.toaster(res['data']);
                        _this.$router.push({
                            path: '/Manage/EntrySummary'
                        });
                    }
                };
                _this.Wheel.submit(params_myUpload, params_postForm);
            }
        }
    };
</script>

<style scoped>

</style>