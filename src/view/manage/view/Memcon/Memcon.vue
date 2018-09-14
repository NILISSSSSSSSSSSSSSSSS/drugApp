<template>
  <div class="Memcon">
    <Header title="谈话记录详细" back="/Manage/EntryMemcon"  :btnParams="btnParams"></Header>
    <mt-cell title="谈话时间" value="请选择时间" @click.native="$refs.time.openTimePicker()" is-link>
      <span style="color: #888" v-if="time.value">{{time.value}}</span>
    </mt-cell>
    <mt-cell title="谈话地点" value="请选择地点" @click.native="$refs.region.openPopup('TalkPlace', 'BIG_REGION_DATA')" is-link>
      <span style="color: #888" v-if="region.TalkPlace">{{region.TalkPlace}}</span>
    </mt-cell>
    <mt-cell title="谈话方式" value="请选择方式" @click.native="$refs.picker.openPopup('way')" is-link>
      <span style="color: #888" v-if="picker.way">{{picker.way}}</span>
    </mt-cell>
    <!-- <mt-cell title="谈话内容照片" value="请选择图片" @click.native="$refs.media.chooseMediaType('pic')">
      <span style="color: #aaa;" v-if="!media.value">请选择图片</span>
      <img class="view_img" :src="media.value" alt="" v-if="media.value">
      <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
    </mt-cell> -->
    <ImageBox title="谈话内容照片" :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'value')"></ImageBox>
    <mt-cell title="居住地有无变更" value="请选择" @click.native="$refs.picker.openPopup('change')" is-link>
      <span style="color: #888" v-if="picker.change">{{picker.change}}</span>
    </mt-cell>
    <div v-if="hasChange">
        <mt-cell title="居住地址" value="请选择" @click.native="$refs.region.openPopup('Residence', 'BIG_REGION_DATA')" is-link>
            <span style="color: #888" v-if="region.Residence">{{region.Residence}}</span>
        </mt-cell>
        <mt-cell title="居住地详细地址">
            <mt-field placeholder="请输入详细地址" v-model="DetailAddress"></mt-field>
        </mt-cell>
    </div>
    <CustomButton position="bottom" @click.native="submit()">上报</CustomButton>
    <!-- 时间选择Picker -->
    <TimePicker ref="time" :field="time"></TimePicker>
    <!-- 地区选择Picker -->
    <AddressPicker ref="region" :field="region" merge></AddressPicker>
    <!-- 其他选择Picker -->
    <CustomPicker ref="picker" :field="picker" :slots="slots" :pickerCb="pickerCb"></CustomPicker>
    <!-- 媒体组件 -->
    <MediaCapture ref="media" :field="media"></MediaCapture>
  </div>
</template>

<script>
    var _this;

    export default {
        name: "Memcon",
        data() {
            return {
                hasChange: false,
                btnParams: {
                    url: '/Manage/EntryMemcon/MemconHistory',
                    apiName: 'gettalkhistorylist',
                    txt: "历史记录",
                    canShow: true,
                    icon: '',
                    isSearch: false,
                },
                params: null,
                DetailAddress: '',
                time: {
                    value: ''
                },
                region: {
                    TalkPlace: '',
                    Residence: ''
                },
                picker: {
                    way: '',
                    change: ''
                },
                slots: {
                    way: [{
                        flex: 1,
                        defaultIndex: 1,
                        values: ['面谈', '电话', '视频'],
                        className: "slot1",
                        textAlign: "center"
                    }],
                    change: [{
                        flex: 1,
                        defaultIndex: 1,
                        values: ['有', '无'],
                        className: "slot1",
                        textAlign: "center"
                    }]
                },
                media: {
                    value: []
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
            pickerCb() {
                if(_this.picker['change'] === '有') {
                    _this.hasChange = true;
                }else if(_this.picker['change'] === '无') {
                    _this.hasChange = false;
                }
            },
            submit() {
                var fileList = {
                    TalkPhoto: _this.media['value']
                };
                var formData = {
                    DrugUserCardId: _this.params.Card_Id,
                    TalkPlace: _this.region.TalkPlace,
                    TalkMode: _this.picker.way,
                    TalkTime: _this.time.value,
                };
                /* 选填项 */
                if(_this.picker['change']) {
                    if(_this.picker['change'] === '有') {
                        formData['ResidentialAddress'] = _this.region['Residence'] + '-' + _this.DetailAddress;
                    }
                }else {
                    _this.Tool.toaster('请选择有无变更居住地');
                    return;
                }
                var params_myUpload = {
                    fileType: 'pic',
                    fileList: fileList
                };
                var params_postForm = {
                    url: '/home/data/settalk',
                    data: formData,
                    success: function(res) {
                        _this.Tool.toaster(res['data']);
                        _this.$router.push({
                            path: '/Manage/EntryMemcon'
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