<template>
  <div class="Bd">
    <Header title="完善人员信息" back="/Manage/CheckIn" :btnParams="btnParams"></Header>
    <!-- <mt-cell title="近期头像" value="请选择图片" @click.native="$refs.media.chooseMediaType('pic', 'image_1')">
      <span style="color: red;" slot="icon">*</span>
      <span style="color: #aaa;" v-if="!media.image_1">请选择图片</span>
      <img class="view_img" :src="media.image_1" alt="" v-if="media.image_1">
      <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
    </mt-cell> -->
    <ImageBox title="近期头像" required :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'image_1')"></ImageBox>
    <mt-cell title="姓名">
      <span style="color: red;" slot="icon">*</span>
      <mt-field label="" disabled v-model="params.Name">
    </mt-field>
    </mt-cell>
    <mt-cell title="身份证号码">
       <span style="color: red;" slot="icon">*</span>
      <mt-field label="" disabled v-model="params.Card_Id"></mt-field>
    </mt-cell>
    <mt-field label="曾用名" placeholder="请输入曾用名" v-model="OldName"></mt-field>
    <mt-cell title="性别">
      <input type="radio" v-check :checked="sex === 1" name="sex" @change="changeSex(1)" value="男">
      <input type="radio" v-check :checked="sex === 2" name="sex" @change="changeSex(2)" value="女">
      <!-- <p-radio class="p-default p-round p-thick p-smooth" color="success-o" name="sex" @change="changeSex('男')">男</p-radio>
      <p-radio class="p-default p-round p-thick p-smooth" color="success-o" name="sex" @change="changeSex('女')">女</p-radio> -->
    </mt-cell>
    <mt-cell title="民族" value="请选择民族" @click.native="$refs.picker.openPopup('nation')" is-link>
      <span v-if="picker.nation">{{picker.nation}}</span>
    </mt-cell>
    <mt-field label="户籍详细地址" placeholder="请输入地址" v-model="PermanentAddress"></mt-field>
    <mt-cell title="居住地地址" value="请选择" @click.native="$refs.region.openPopup('ResidentialAddress', 'BIG_REGION_DATA')" is-link>
      <!-- <span style="color: red;" slot="icon">*</span> -->
      <span style="color: red;" slot="icon">*</span>
      <span v-if="region.ResidentialAddress" class="fontSize_13">{{region.ResidentialAddress}}</span>
    </mt-cell>
    <mt-cell title="居住地详细地址">
        <span style="color: red;" slot="icon">*</span>
        <mt-field placeholder="请输入详细地址" v-model="DetailAddress"></mt-field>
    </mt-cell>
    <mt-cell title="文化程度" value="请选择" @click.native="$refs.picker.openPopup('education')" is-link>
      <span style="color: red;" slot="icon">*</span>
      <span v-if="picker.education">{{picker.education}}</span>
    </mt-cell>
    <mt-cell title="职业" value="请选择" @click.native="$refs.picker.openPopup('job')" is-link>
      <span style="color: red;" slot="icon">*</span>
      <span v-if="picker.job">{{picker.job}}</span>
    </mt-cell>
    <mt-cell title="联系方式">
       <span style="color: red;" slot="icon">*</span>
        <mt-field label="" placeholder="请输入联系方式" v-model="DrugPhoneNumber">
    </mt-field>
    </mt-cell>
    <mt-cell title="报到日期" value="请选择日期" @click.native="$refs.time.openTimePicker('time_1')" is-link>
      <span style="color: red;" slot="icon">*</span>
      <span style="color: #888" v-if="time.time_1">{{time.time_1 | killTime}}</span>
    </mt-cell>
    <mt-cell :title="`${params.Drugategory}开始日期`" value="请选择日期" @click.native="$refs.time.openTimePicker('time_2')" is-link>
      <span style="color: red;" slot="icon">*</span>
      <span style="color: #888" v-if="time.time_2">{{time.time_2 | killTime}}</span>
    </mt-cell>
    <mt-cell :title="`${params.Drugategory}结束日期`" value="请选择日期" @click.native="$refs.time.openTimePicker('time_3')" is-link>
      <span style="color: red;" slot="icon">*</span>
      <span style="color: #888" v-if="time.time_3">{{time.time_3 | killTime}}</span>
    </mt-cell>
    <!-- <mt-cell title="协议照片" value="请选择图片" @click.native="$refs.media.chooseMediaType('pic', 'image_2')">
      <span style="color: red;" slot="icon">*</span>
      <span style="color: #aaa;" v-if="!media.image_2">请选择图片</span>
      <img class="view_img" :src="media.image_2" alt="" v-if="media.image_2">
      <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
    </mt-cell> -->
    <ImageBox title="协议照片" required :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'image_2')"></ImageBox>
    <!-- 时间选择Picker -->
    <TimePicker ref="time" :field="time" :confirmCallback="confirmCallback"></TimePicker>
    <!-- 媒体组件 -->
    <MediaCapture ref="media" :field="media"></MediaCapture>
    <CustomButton v-if="params.status !== 2" @click.native="submit()">确定</CustomButton>
    <!-- 其他选择Picker -->
    <CustomPicker ref="picker" :field="picker" :slots="slots"></CustomPicker>
    <!-- 地区选择 -->
    <AddressPicker ref="region" :field="region" merge></AddressPicker>
  </div>
</template>

<script>
    import nationData from "@/assets/data/nationData";
    var _this;

    export default {
        name: "Bd",
        data() {
            return {
                endDate: null,
                btnParams: {
                    canShow: false,
                    icon: '',
                    txt: '',
                    isSearch: false
                },
                params: null,
                region: {
                    ResidentialAddress: ''
                },
                DrugPhoneNumber: "",
                PermanentAddress: "",
                ResidentialAddress: "",
                OldName: "",
                DetailAddress: '',
                time: {
                    time_1: "",
                    time_2: "",
                    time_3: ""
                },
                media: {
                    image_1: [],
                    image_2: []
                },
                sex: 0,
                picker: {
                    nation: "",
                    education: "",
                    job: ""
                },
                slots: {
                    nation: [{
                        flex: 1,
                        defaultIndex: 1,
                        values: nationData,
                        className: "slot1",
                        textAlign: "center"
                    }],
                    education: [{
                        flex: 1,
                        defaultIndex: 1,
                        values: ["文盲或半文盲", "小学教育", "初级中学教育", "普通高级中学教育", "中等职业教育", "大学专科教育", "大学本科教育", "研究生教育", "其他"],
                        className: "slot1",
                        textAlign: "center"
                    }],
                    job: [{
                        flex: 1,
                        defaultIndex: 1,
                        values: ["无业人员", "个体经营者", "自由职业者", "职员", "离（退）休人员", "农民", "学生", "工人", "国家机关事业单位人员", "企事业单位人员", "医生", "护士", "教师", "律师", "其他"],
                        className: "slot1",
                        textAlign: "center"
                    }]
                }
            };
        },
        components: {},
        created() {
            _this = this;
            _this.params = _this.$route.query;
            _this.region['ResidentialAddress'] = _this.Global['Address'];
            if (_this.params.status === 2) {
                _this.initField();
            } else {
                _this.initFirst();
            }
        },
        methods: {
            confirmCallback(date, type, str_date) {
                if(type === 'time_2') {
                    var d = new Date(str_date);
                    d.setFullYear(d.getFullYear() + 3);
                    d.setDate(d.getDate() - 1);
                    // _this.endDate = d;
                    _this.time['time_3'] = _this.Tool.handleTime(d, '/');
                }else {
                    
                }
            },
            // openTimePicker() {
            //     if(_this.time['time_2']) {
            //         _this.$refs.time.openTimePicker('time_3', _this.endDate);
            //     }else {
            //         _this.Tool.MessageBox('提示', `请先选择${_this.params.Drugategory}开始日期`);
            //     }
            // },
            initFirst() {
                _this.PermanentAddress = _this.params['PermanentAddress'];
                _this.sex = _this.params['Sex'];
                _this.picker['nation'] = _this.params['Ethnicity'];
            },
            initField() {
                var addr_arr = _this.params['ResidentialAddress'].split('-');
                var addr_detail = addr_arr.pop();
                // _this.media['image_1'] = _this.params['HeadImageUrl'];
                _this.Tool.parseImage(_this.media['image_1'], _this.params['HeadImageUrl']);
                _this.OldName = _this.params['OldName'];
                _this.sex = _this.params['Sex'];
                _this.picker['nation'] = _this.params['Ethnicity'];
                _this.PermanentAddress = _this.params['PermanentAddress'];
                _this.region['ResidentialAddress'] = addr_arr.join('-');
                _this.picker['education'] = _this.params['Culture'];
                _this.picker['job'] = _this.params['Occupation'];
                _this.DrugPhoneNumber = _this.params['PhoneNumber'];
                _this.time['time_1'] = _this.params['ReportDate'];
                _this.time['time_2'] = _this.params['RehabilitativeStartDate'];
                _this.time['time_3'] = _this.params['RehabilitativeEndDate'];
                // _this.media['image_2'] = _this.params['RrotocolPhoto'];
                _this.Tool.parseImage(_this.media['image_2'], _this.params['RrotocolPhoto']);
                _this.DetailAddress = addr_detail;
            },
            changeSex(sex) {
                _this.sex = sex;
            },
            submit() {
                var fileList = {
                    HeadImageUrl: _this.media.image_1,
                    RrotocolPhoto: _this.media.image_2
                };
                var formData = {
                    DrugUserCardId: _this.params["Card_Id"],
                    DrugPhoneNumber: _this.DrugPhoneNumber,
                    // Ethnicity: _this.picker["nation"],
                    // PermanentAddress: _this.PermanentAddress,
                    ResidentialAddress: _this.region['ResidentialAddress'],
                    Culture: _this.picker["education"],
                    Occupation: _this.picker["job"],
                    // OldName: _this.OldName,
                    ReportDate: _this.time["time_1"],
                    RehabilitativeStartDate: _this.time["time_2"],
                    RehabilitativeEndDate: _this.time["time_3"],
                    // Sex: _this.sex,
                };
                /* 选填项 */
                _this.picker["nation"] && (formData['Ethnicity'] = _this.picker["nation"]);
                _this.PermanentAddress && (formData['PermanentAddress'] = _this.PermanentAddress);
                _this.OldName && (formData['OldName'] = _this.OldName);
                _this.sex && (formData['Sex'] = _this.sex);
                
                var params_myUpload = {
                    fileType: "pic",
                    fileList: fileList
                };
                var params_postForm = {
                    url: "/home/query/perfectinformation",
                    data: formData,
                    success: function(res) {
                        _this.Tool.toaster(res['data']);
                        _this.$router.push({
                            path: '/Manage/CheckIn'
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