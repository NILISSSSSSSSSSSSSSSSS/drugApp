<template>
  <div class="UrineTest">
    <Header title="尿检" back="/Manage/EntryUrineTest" :btnParams="btnParams"></Header>
    <NameTitle :name="params.Name"></NameTitle>
    <mt-cell title="尿检时间" value="请选择时间" @click.native="$refs.time.openTimePicker('njtime')" is-link>
      <span style="color: #888" v-if="time.njtime">{{time.njtime}}</span>
    </mt-cell>
    <mt-cell title="尿检地点" value="请选择地点" @click.native="$refs.region.openPopup('value', 'BIG_REGION_DATA')" is-link>
      <span style="color: #888" v-if="region.value">{{region.value}}</span>
    </mt-cell>
    <mt-cell title="尿检结果" value="请选择" @click.native="$refs.picker.openPopup('result')" is-link>
      <span v-if="picker.result">{{picker.result}}</span>
    </mt-cell>
    <mt-field label="尿检人" placeholder="请输入尿检人" v-model="UrineWorkerName"></mt-field>
    <!-- <mt-cell title="尿检照片" value="请选择图片" @click.native="$refs.media.chooseMediaType('pic', 'image_1')">
      <span style="color: #aaa;" v-if="!media.image_1">请选择图片</span>
      <img class="view_img" :src="media.image_1" alt="" v-if="media.image_1">
      <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
    </mt-cell> -->
    <ImageBox title="尿检照片" :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'image_1')"></ImageBox>
    <!-- <mt-cell title="现场检测报告单照片" value="请选择图片" @click.native="$refs.media.chooseMediaType('pic', 'image_2')">
      <span style="color: #aaa;" v-if="!media.image_2">请选择图片</span>
      <img class="view_img" :src="media.image_2" alt="" v-if="media.image_2">
      <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
    </mt-cell> -->
    <ImageBox title="现场检测报告单照片" :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'image_2')"></ImageBox>


    <CustomButton position="bottom" @click.native="submit()">上报</CustomButton>
    <!-- 媒体组件 -->
    <MediaCapture ref="media" :field="media"></MediaCapture>
    <!-- 时间选择Picker -->
    <TimePicker ref="time" :field="time"></TimePicker>
    <!-- 地区选择Picker -->
    <AddressPicker ref="region" :field="region" merge></AddressPicker>
    <!-- 其他选择Picker -->
    <CustomPicker ref="picker" :field="picker" :slots="slots"></CustomPicker>

  </div>
</template>

<script>
  import {historyMixins}from '@/common/mixin.js'
    var _this;

    export default {
        name: "UrineTest",
        mixins:[historyMixins],
        data() {
            return {
                btnParams:{
                  url:'/Manage/EntryUrineTest/UnapprovedHistoryList',
                  apiName:'geturinehistorylist'
                },
                time: {
                    njtime: ''
                },
                region: {
                    value: ''
                },
                media: {
                    image_1: [],
                    image_2: []
                },
                picker: {
                    result: "",
                },
                slots: {
                    result: [{
                        flex: 1,
                        defaultIndex: 1,
                        values: ['阴性', '阳性'],
                        className: "slot1",
                        textAlign: "center"
                    }]
                },
                UrineWorkerName: '',
            };
        },
        components: {

        },
        created() {
            _this = this;
            _this.params = _this.$route.query;
        },
        methods: {
            submit() {
                var fileList = {
                    UrineTestPhoto: _this.media['image_1'],
                    UrineTestPhotoRP: _this.media['image_2'],
                }
                var formData = {
                    UrineTestAddress: _this.region['value'],
                    UrineTestResults: _this.picker['result'],
                    UrineTestTime: _this.time['njtime'],
                    DrugUserCardId: _this.params['CardId'],
                    UrineWorkerName: _this.UrineWorkerName,
                }

                var params_myUpload = {
                    fileType: 'pic',
                    fileList: fileList,
                };
                var params_postForm = {
                    url: '/home/data/urineupload',
                    data: formData,
                    success: function(res) {
                        _this.Tool.toaster(res['data']);
                        _this.$router.push({path: '/Manage/EntryUrineTest'});
                    }
                };
                _this.Wheel.submit(params_myUpload, params_postForm);

            }
        }
    };
</script>

<style scoped>

</style>
