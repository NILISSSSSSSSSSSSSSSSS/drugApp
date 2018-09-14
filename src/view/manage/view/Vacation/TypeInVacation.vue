<template>
  <div class="Container2">
    <Header title="请假录入" back="/Manage/Vacation?flag=true" :btnParams="btnParams"></Header>
    <mt-cell title="请假开始时间" value="请选择时间" @click.native="$refs.time.openTimePicker('startTime')" is-link>
      <span style="color: #888" v-if="time.startTime">{{time.startTime}}</span>
    </mt-cell>
    <mt-cell title="请假结束时间" value="请选择时间" @click.native="$refs.time.openTimePicker('endTime')" is-link>
      <span style="color: #888" v-if="time.endTime">{{time.endTime}}</span>
    </mt-cell>
    <mt-cell title="请假目的地" @click.native="$refs.region.openPopup('value', 'BIG_REGION_DATA')" is-link>
      <span>{{region.value || '请选择地址'}}</span>
    </mt-cell>
    <mt-field label="详细地址" placeholder="请输入详细地址" v-model="detailAddress"></mt-field>
    <mt-cell title="请假事由" value="请选择事由" @click.native="$refs.picker.openPopup()" is-link>
      <span style="color: #888" v-if="picker.value">{{picker.value}}</span>
    </mt-cell>
    <!-- <mt-cell title="请假审批表拍照" value="请选择图片" @click.native="$refs.media.chooseMediaType('pic')">
      <span style="color: #aaa;" v-if="!media.value">请选择图片</span>
      <img class="view_img" :src="media.value" alt="" v-if="media.value">
      <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
    </mt-cell> -->
    <ImageBox title="请假审批表拍照" :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'value')"></ImageBox>
    <CustomButton position="bottom" @click.native="submit()">提交</CustomButton>
    <!-- 时间选择Picker -->
    <TimePicker ref="time" :field="time"></TimePicker>
    <!-- 其他选择Picker -->
    <CustomPicker ref="picker" :field="picker" :slots="slots"></CustomPicker>
    <!-- 媒体组件 -->
    <MediaCapture ref="media" :field="media"></MediaCapture>
    <!-- 地区选择 -->
    <AddressPicker ref="region" :field="region" merge></AddressPicker>
    <!-- <mt-popup
      v-model="popupVisible_region"
      position="bottom" style="width: 100%">
      <mt-picker :slots="slots_region" @change="onValuesChange_region"></mt-picker>
    </mt-popup> -->
  </div>
</template>

<script>
    import regionData from "@/assets/data/regionData.json";
    var _this;

    export default {
        name: "Container2",
        data() {
            return {
              btnParams:{
                canShow:true,
                icon:'',
                txt:'历史记录',
                isSearch:false,
                url:'/Manage/Vacation/VacationHistoryList'
              },
                time: {
                    startTime: '',
                    endTime: ''
                },
                picker: {
                    value: ''
                },
                media: {
                    value: []
                },
                region: {
                    value: ''
                },
                detailAddress: '',
                // slots_region: [{
                //     flex: 1,
                //     defaultIndex: 1,
                //     values: Object.keys(regionData),
                //     className: "slot1",
                //     textAlign: "center"
                // }, {
                //     divider: true,
                //     content: "-",
                //     className: "slot2"
                // }, {
                //     flex: 1,
                //     values: [],
                //     className: "slot3",
                //     textAlign: "center"
                // }],
                slots: [{
                    flex: 1,
                    defaultIndex: 1,
                    values: ['务工', '就医', '探亲'],
                    className: "slot1",
                    textAlign: "center"
                }]
            };
        },
        components: {},
        created() {
            _this = this;
            _this.params = _this.$route.query;
        },
        methods: {
            // handleConfirm(date) {
            //   _this[_this.timeType] = date;
            // },
            // onValuesChange_region(picker, values) {
            //     picker.setSlotValues(1, regionData[values[0]]);
            //     _this.province = values[0];
            //     _this.city = values[1];
            // },
            // onValuesChange_reson(picker, values) {
            //   _this.reson = values[0];
            // },
            // openPopup(type) {
            //     _this['popupVisible_' + type] = true;
            // },
            // openTimePicker(type) {
            //   _this.timeType = type;
            //   _this.$refs.picker.open();
            // },
            submit() {
                var fileList = {Photo: _this.media['value']};
                var formData = {
                    StartTime: _this.time['startTime'],
                    EndTime: _this.time['endTime'],
                    Destination: _this.region['value'],
                    Address: _this.detailAddress,
                    Reason: _this.picker['value'],
                    DrugUserCardId: _this.params['CardId'],
                }

                var params_myUpload = {
                    fileType: 'pic',
                    fileList: fileList,
                };
                var params_postForm = {
                    url: '/home/data/leaveupload',
                    data: formData,
                    success: function(res) {
                        _this.Tool.toaster(res['data']);
                        _this.$router.push({path: '/Manage/Vacation'});
                    }
                };
                _this.Wheel.submit(params_myUpload, params_postForm);
            }
        }
    };
</script>

<style scoped>

</style>
