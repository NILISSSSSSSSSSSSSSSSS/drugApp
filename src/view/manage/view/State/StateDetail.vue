<template>
  <div class="StateDetail">
    <Header title="状态变更详情" back="/Manage/State"></Header>
    <NameTitle :name="params.Name"></NameTitle>
    <mt-cell :title="`解除${params.Drugategory}`">
      <input type="checkbox" v-check v-model="check_1" @change="check('check_1', check_1)">
    </mt-cell>
    <div v-if="check_1" style="padding: 5px;">
        <mt-cell title="起始日期">
            <span style="color: #888">{{params.StartTime | killTime}}</span>
        </mt-cell>
      <mt-cell title="终止日期" value="请选择时间" @click.native="$refs.time.openTimePicker('time_3')" is-link>
        <span style="color: #888" v-if="time.time_3">{{time.time_3}}</span>
      </mt-cell>
      <!-- <mt-cell title="上传解除审批照片" value="请选择图片" @click.native="$refs.media.chooseMediaType('pic', 'image_1')">
        <span style="color: #aaa;" v-if="!media.image_1">请选择图片</span>
        <img class="view_img" :src="media.image_1" alt="" v-if="media.image_1">
        <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
      </mt-cell> -->
      <ImageBox title="上传解除审批照片" :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'image_1')"></ImageBox>
    </div>
    <mt-cell :title="`终止${params.Drugategory}`">
      <input type="checkbox" v-check v-model="check_2" @change="check('check_2', check_2)">
    </mt-cell>
    <div v-if="check_2" style="padding: 5px;">
        <mt-cell title="起始日期">
            <span style="color: #888">{{params.StartTime | killTime}}</span>
        </mt-cell>
      <mt-cell title="终止日期" value="请选择时间" @click.native="$refs.time.openTimePicker('time_1')" is-link>
        <span style="color: #888" v-if="time.time_1">{{time.time_1}}</span>
      </mt-cell>
      <mt-cell title="终止原因" value="请选择终止原因" @click.native="$refs.picker.openPopup('reason_1')" is-link>
        <span style="color: #888" v-if="picker.reason_1">{{picker.reason_1}}</span>
      </mt-cell>
      <!-- <mt-cell title="上传终止说明照片" value="请选择图片" @click.native="$refs.media.chooseMediaType('pic', 'image_2')">
        <span style="color: #aaa;" v-if="!media.image_2">请选择图片</span>
        <img class="view_img" :src="media.image_2" alt="" v-if="media.image_2">
        <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
      </mt-cell> -->
      <ImageBox title="上传终止说明照片" :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'image_2')"></ImageBox>
    </div>
    <mt-cell :title="`中止${params.Drugategory}`">
      <input type="checkbox" v-check v-model="check_3" @change="check('check_3', check_3)">
    </mt-cell>
    <div v-if="check_3" style="padding: 5px;">
        <mt-cell title="起始日期">
            <span style="color: #888">{{params.StartTime | killTime}}</span>
        </mt-cell>
      <mt-cell title="中止日期" value="请选择时间" @click.native="$refs.time.openTimePicker('time_2')" is-link>
        <span style="color: #888" v-if="time.time_2">{{time.time_2}}</span>
      </mt-cell>
      <mt-cell title="中止原因" value="请选择中止原因" @click.native="$refs.picker.openPopup('reason_2')" is-link>
        <span style="color: #888" v-if="picker.reason_2">{{picker.reason_2}}</span>
      </mt-cell>
      <!-- <mt-cell title="上传中止说明照片" value="请选择图片" @click.native="$refs.media.chooseMediaType('pic', 'image_3')">
        <span style="color: #aaa;" v-if="!media.image_3">请选择图片</span>
        <img class="view_img" :src="media.image_3" alt="" v-if="media.image_3">
        <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
      </mt-cell> -->
      <ImageBox title="上传中止说明照片" :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'image_3')"></ImageBox>
    </div>
    <CustomButton position="bottom" @click.native="submit()">确定</CustomButton>
    <!-- 时间选择Picker -->
    <TimePicker ref="time" :field="time"></TimePicker>
    <!-- 其他选择Picker -->
    <CustomPicker ref="picker" :field="picker" :slots="slots"></CustomPicker>
    <!-- 媒体组件 -->
    <MediaCapture ref="media" :field="media"></MediaCapture>
  </div>
</template>

<script>
    var _this;

    export default {
        name: "StateDetail",
        data() {
            return {
                check_1: false,
                check_2: false,
                check_3: false,
                time: {
                    time_1: '',
                    time_2: '',
                    time_3: ''
                },
                picker: {
                    reason_1: '',
                    reason_2: ''
                },
                media: {
                    image_1: [],
                    image_2: [],
                    image_3: [],
                },
                slots: {
                    reason_1: [{
                        flex: 1,
                        defaultIndex: 1,
                        values: ['强制隔离戒毒', '死亡', '服刑'],
                        className: "slot1",
                        textAlign: "center"
                    }],
                    reason_2: [{
                        flex: 1,
                        defaultIndex: 1,
                        values: ['拘留', '逮捕'],
                        className: "slot1",
                        textAlign: "center"
                    }]
                }
            };
        },
        components: {

        },
        created() {
            _this = this;
            _this.params = _this.$route.query;
        },
        methods: {
            check(key, bool) {
                _this.check_1 = false;
                _this.check_2 = false;
                _this.check_3 = false;
                if (bool) {
                    _this[key] = true;
                }
            },
            submit() {
                var formData = {
                    DrugUserCardId: _this.params.CardId
                };
                var fileList = {};
                //校验
                if (_this.check_1) {
                    formData['RelieveDrug'] = 1;
                    if (_this.time['time_3'] && _this.media['image_1']) {
                        formData['RelieveDrugDate'] = _this.time['time_3'];
                        fileList['ExaminePhotoupload'] = _this.media['image_1'];
                    } else {
                        _this.Tool.toaster('请检查是否填写完整');
                        return;
                    }
                } else {
                    formData['RelieveDrug'] = 0;
                }
                if (_this.check_2) {
                    formData['OverDrug'] = 1;
                    if (_this.time['time_1'] && _this.picker['reason_1'] && _this.media['image_2']) {
                        formData['OverDate'] = _this.time['time_1'];
                        formData['OverReason'] = _this.picker['reason_1'];
                        fileList['OverReasonPhoto'] = _this.media['image_2'];
                    } else {
                        _this.Tool.toaster('请检查是否填写完整');
                        return;
                    }
                } else {
                    formData['OverDrug'] = 0;
                }
                if (_this.check_3) {
                    formData['StopDrug'] = 1;
                    if (_this.time['time_2'] && _this.picker['reason_2'] && _this.media['image_3']) {
                        formData['StopDate'] = _this.time['time_2'];
                        formData['StopReason'] = _this.picker['reason_2'];
                        fileList['StopReasonPhoto'] = _this.media['image_3'];
                    } else {
                        _this.Tool.toaster('请检查是否填写完整');
                        return;
                    }
                } else {
                    formData['StopDrug'] = 0;
                }
                if (_this.check_1 === false && _this.check_2 === false && _this.check_3 === false) {
                    _this.Tool.toaster('请检查是否填写完整');
                    return;
                }
                //带图片提交
                var params_myUpload = {
                    fileType: 'pic',
                    fileList: fileList,
                };
                var params_postForm = {
                    url: '/home/data/personnelstateupload',
                    data: formData,
                    success: function(res) {
                        _this.Tool.toaster(res['data']);
                        _this.$router.push({
                            path: '/Manage/State'
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