<template>
  <div class="TypeInViolate">
    <Header title="人工录入" back="/Manage/Violate?flag=true"></Header>
    <mt-cell title="逃避、拒绝接受检测">
      <div class="num-box"><mt-badge type="warning" size="small">拒检{{num_1}}次</mt-badge></div>
      <input type="checkbox" v-check v-model="check_1">
    </mt-cell>
    <div v-if="check_1" style="padding: 5px;">
      <mt-field label="当前日期" disabled v-model="now"></mt-field>
      <mt-cell title="通知尿检日期" value="请选择时间" @click.native="$refs.time.openTimePicker('time_1')" is-link>
        <span style="color: #888" v-if="time.time_1">{{time.time_1}}</span>
      </mt-cell>
      <!-- <mt-cell title="违法/违规行为报告照片" value="请选择图片" @click.native="$refs.media.chooseMediaType('pic', 'image_1')">
        <span style="color: #aaa;" v-if="!media.image_1">请选择图片</span>
        <img class="view_img" :src="media.image_1" alt="" v-if="media.image_1">
        <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
      </mt-cell>
      <mt-cell :title="title_1" value="请选择图片" @click.native="$refs.media.chooseMediaType('pic', 'image_2')">
        <span style="color: #aaa;" v-if="!media.image_2">请选择图片</span>
        <img class="view_img" :src="media.image_2" alt="" v-if="media.image_2">
        <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
      </mt-cell> -->
      <ImageBox title="违法/违规行为报告照片" :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'image_1')"></ImageBox>
      <ImageBox :title="title_1" :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'image_2')"></ImageBox>
    </div>

    <mt-cell title="擅自离开执行地">
        <div class="num-box"><mt-badge type="warning" size="small">离开{{num_2}}次</mt-badge></div>
      <input type="checkbox" v-check v-model="check_2">
    </mt-cell>
    <div v-if="check_2" style="padding: 5px;">
      <mt-field label="当前日期" disabled v-model="now"></mt-field>
      <mt-cell title="离开日期" value="请选择时间" @click.native="$refs.time.openTimePicker('time_2', endDate)" is-link>
        <span style="color: #888" v-if="time.time_2">{{time.time_2}}</span>
      </mt-cell>
      <mt-field label="离开天数" disabled v-model="leave_days"></mt-field>
      <!-- <mt-cell :title="title_2" value="请选择图片" @click.native="$refs.media.chooseMediaType('pic', 'image_3')">
        <span style="color: #aaa;" v-if="!media.image_3">请选择图片</span>
        <img class="view_img" :src="media.image_3" alt="" v-if="media.image_3">
        <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
      </mt-cell> -->
      <ImageBox :title="title_2" :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'image_3')"></ImageBox>
    </div>

    <mt-cell title="通讯地址/联系电话变更未报到">
      <input type="checkbox" v-check v-model="check_3">
    </mt-cell>
    <div v-if="check_3" style="padding: 5px;">
        <mt-field label="当前日期" disabled v-model="now"></mt-field>
      <mt-cell title="发现日期" value="请选择时间" @click.native="$refs.time.openTimePicker('time_3')" is-link>
        <span style="color: #888" v-if="time.time_3">{{time.time_3}}</span>
      </mt-cell>
      <!-- <mt-cell title="上传证明" value="请选择图片" @click.native="$refs.media.chooseMediaType('pic', 'image_4')">
        <span style="color: #aaa;" v-if="!media.image_4">请选择图片</span>
        <img class="view_img" :src="media.image_4" alt="" v-if="media.image_4">
        <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
      </mt-cell>
      <mt-cell title="严重违反协议通知照片" value="请选择图片" @click.native="$refs.media.chooseMediaType('pic', 'image_5')">
        <span style="color: #aaa;" v-if="!media.image_5">请选择图片</span>
        <img class="view_img" :src="media.image_5" alt="" v-if="media.image_5">
        <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
      </mt-cell> -->
      <ImageBox title="上传证明" :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'image_4')"></ImageBox>
      <ImageBox title="违法/违规行为报告照片" :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'image_5')"></ImageBox>
    </div>
    <mt-cell title="联系电话非本人使用或无法联系">
      <input type="checkbox" v-check v-model="check_4">
    </mt-cell>
    <div v-if="check_4" style="padding: 5px;">
        <mt-field label="当前日期" disabled v-model="now"></mt-field>
      <mt-cell title="发现日期" value="请选择时间" @click.native="$refs.time.openTimePicker('time_4')" is-link>
        <span style="color: #888" v-if="time.time_4">{{time.time_4}}</span>
      </mt-cell>
      <!-- <mt-cell title="上传证明" value="请选择图片" @click.native="$refs.media.chooseMediaType('pic', 'image_6')">
        <span style="color: #aaa;" v-if="!media.image_6">请选择图片</span>
        <img class="view_img" :src="media.image_6" alt="" v-if="media.image_6">
        <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
      </mt-cell>
      <mt-cell title="严重违反协议通知照片" value="请选择图片" @click.native="$refs.media.chooseMediaType('pic', 'image_7')">
        <span style="color: #aaa;" v-if="!media.image_7">请选择图片</span>
        <img class="view_img" :src="media.image_7" alt="" v-if="media.image_7">
        <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
      </mt-cell> -->
      <ImageBox title="上传证明" :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'image_6')"></ImageBox>
      <ImageBox title="违法/违规行为报告照片" :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'image_7')"></ImageBox>
    </div>
    <!-- <mt-cell title="活动异常">
      <input type="checkbox" v-check v-model="check_5">
    </mt-cell> -->
    <div v-if="check_5" style="padding: 5px;">
      <mt-cell title="人员现状" value="请选择状态" @click.native="$refs.picker.openPopup()" is-link>
        <span style="color: #888" v-if="picker.value">{{picker.value}}</span>
      </mt-cell>
      <!-- <mt-cell v-if="picker['value'] === '擅自外出'" title="劝诫书" @click.native="$refs.media.chooseMediaType('pic', 'image_8')">
        <span style="color: #aaa;" v-if="!media.image_8">请选择图片</span>
        <img class="view_img" :src="media.image_8" alt="" v-if="media.image_8">
        <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
      </mt-cell> -->
      <ImageBox v-if="picker['value'] === '擅自外出'" title="劝诫书" :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'image_8')"></ImageBox>
    </div>
    <CustomButton @click.native="submit()">确定</CustomButton>
    <!-- 时间选择Picker -->
    <TimePicker ref="time" :field="time" :confirmCallback="confirmCallback"></TimePicker>
    <!-- 其他选择Picker -->
    <CustomPicker ref="picker" :field="picker" :slots="slots" :pickerCb="pickerCb"></CustomPicker>
    <!-- 媒体组件 -->
    <MediaCapture ref="media" :field="media"></MediaCapture>
  </div>
</template>

<script>
    import {
        MessageBox
    } from "mint-ui";
    var _this;

    export default {
        name: "TypeInViolate",
        data() {
            return {
                endDate: new Date(),
                title_1: '告诫书照片',
                title_2: '告诫书照片',
                num_1: 0,
                num_2: 0,
                check_1: false,
                check_2: false,
                check_3: false,
                check_4: false,
                check_5: false,
                media: {
                    image_1: [],
                    image_2: [],
                    image_3: [],
                    image_4: [],
                    image_5: [],
                    image_6: [],
                    image_7: [],
                    image_8: [],
                },
                time: {
                    time_1: '',
                    time_2: '',
                    time_3: '',
                    time_4: '',
                },
                picker: {
                    value: ''
                },
                slots: [{
                    flex: 1,
                    defaultIndex: 1,
                    values: ['在家', '擅自外出', '请假外出'],
                    className: "slot1",
                    textAlign: "center"
                }],
                now: '',
                leave_days: 0,

            };
        },
        components: {

        },
        created() {
            _this = this;
            _this.now = _this.Tool.handleTime(new Date());
            _this.params = _this.$route.query;
            _this.num_1 = _this.params['Manualentrylog']['RefusalcheckLevel'] || 0;
            _this.num_2 = _this.params['Manualentrylog']['LeaveExecutorLevel'] || 0;
            //测试
            // _this.num_1 = 3;
            // _this.num_2 = 3;
            if (_this.num_1 >= 2) {
                _this.title_1 = '严重违反协议通知照片';
            } else {
                _this.title_1 = '告诫书照片';
            }
            if (_this.num_2 >= 2) {
                _this.title_2 = '违法/违规行为报告照片';
            } else {
                _this.title_2 = '告诫书照片';
            }
        },
        methods: {
            confirmCallback(date, type) {
                if (type === 'time_2') {
                    var now = new Date();
                    var ms = now.getTime() - date.getTime();
                    _this.leave_days = parseInt(ms / (1000 * 60 * 60 * 24));
                    if (_this.leave_days > 30) {
                        _this.title_2 = '严重违反协议通知照片';
                    } else {
                        if (_this.num_2 < 2) {
                            _this.title_2 !== '告诫书照片' && (_this.title_2 = '告诫书照片');
                        }else {
                            _this.title_2 = '违法/违规行为报告照片';
                        }
                    }
                }
            },
            pickerCb() {
                if (_this.picker['value'] === '擅自外出') {
                    MessageBox({
                        title: '提示',
                        message: '请上传劝诫书',
                        confirmButtonText: "上传",
                        showCancelButton: true,
                        closeOnClickModal: false,
                    }).then(action => {
                        if (action === 'cancel') {
                            _this.picker.value = '';
                        }
                        if (action === 'confirm') {
                            _this.$refs.media.chooseMediaType('pic', `image_8`);
                        }
                    });
                }
            },
            submit() {
                //处理图片逻辑
                var formData = {
                    DrugUserCardId: _this.params.Card_Id
                };
                var fileList = {};
                //校验
                if (_this.check_1) {
                    formData['Refusalcheck_UrineTestTime'] = _this.time['time_1'];
                    fileList['Refusalcheck_UrineTestNoticePhoto'] = _this.media['image_1'];
                    fileList['Refusalcheck_OralExhortPhoto'] = _this.media['image_2'];
                }
                if (_this.check_2) {
                    formData['LeaveExecutor_LeaveExecutorData'] = _this.time['time_2'];
                    formData['LeaveExecutor_Days'] = _this.leave_days + '';
                    fileList['LeaveExecutor_SVP'] = _this.media['image_3'];
                }
                if (_this.check_3) {
                    formData['AddressChangeReport_FindDate'] = _this.time['time_3'];
                    fileList['AddressChangeReport_ProofUploadPhoto'] = _this.media['image_4'];
                    fileList['AddressChangeReport_SVP'] = _this.media['image_5'];
                }
                if (_this.check_4) {
                    formData['TelephoneNoContact_FindDate'] = _this.time['time_4'];
                    fileList['TelephoneNoContact_ProofUploadPhoto'] = _this.media['image_6'];
                    fileList['TelephoneNoContact_SVP'] = _this.media['image_7'];
                }
                // if (_this.check_5) {
                //     formData['Situation'] = _this.picker['value'];
                //     if (_this.picker.value === '擅自外出') {
                //         fileList['Situation_Photo'] = _this.media['image_8'];
                //     }
                // }
                if (_this.check_1 === false &&
                    _this.check_2 === false &&
                    _this.check_3 === false &&
                    _this.check_4 === false) {
                    _this.Tool.toaster('请检查提交内容后重试');
                    return;
                }
                //提交
                var keys = Object.keys(fileList);
                if (_this.check_5 && keys.length === 0) {
                    var checkObj = {
                        formData: formData
                    };
                    var checkState = _this.Wheel.checkParams(checkObj);
                    if (!checkState.check) {
                        _this.Tool.toaster('请检查提交内容后重试');
                        return;
                    }
                    //不带图片的提交
                    var options = {
                        url: '/home/data/violationagreement',
                        method: 'post',
                        data: formData,
                        success: function(res) {
                            _this.Tool.toaster(res['data']);
                            _this.$router.push('/Manage/Violate?flag=true');
                        }
                    };
                    _this.Tool.request(options);
                } else {
                    //带图片的提交
                    var params_myUpload = {
                        fileType: 'pic',
                        fileList: fileList,
                    };
                    var params_postForm = {
                        url: '/home/data/violationagreement',
                        data: formData,
                        success: function(res) {
                            _this.Tool.toaster(res['data']);
                            _this.$router.push('/Manage/Violate?flag=true');
                        }
                    };
                    _this.Wheel.submit(params_myUpload, params_postForm);
                }
            }
        }
    };
</script>

<style scoped>
    .num-box {
        margin-right: 10px;
    }
</style>