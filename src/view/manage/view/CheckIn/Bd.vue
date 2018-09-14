<template>
  <div class="Bd">
    <Header title="手动录入人员" back="/Manage/CheckIn" :btnParams="btnParams"></Header>
    <!-- <mt-cell title="近期头像" required value="请选择图片" @click.native="$refs.media.chooseMediaType('pic', 'image_1')">
      <span style="color: red;" slot="icon">*</span>
      <span style="color: #aaa;" v-if="!media.image_1">请选择图片</span>
      <img class="view_img" :src="media.image_1" alt="" v-if="media.image_1">
      <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
    </mt-cell> -->
    <ImageBox title="近期头像" required :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'image_1')"></ImageBox>
    <mt-cell title="姓名">
      <span style="color: red;" slot="icon">*</span>
      <mt-field placeholder="请输入姓名" v-model="Name"></mt-field>
    </mt-cell>
    <mt-cell title="身份证号码">
      <span style="color: red;" slot="icon">*</span>
      <mt-field placeholder="请输入身份证号码" v-model="Card_Id"></mt-field>
    </mt-cell>
    <mt-field label="曾用名" placeholder="请输入曾用名" v-model="OldName"></mt-field>
    <mt-cell title="性别">
      <input type="radio" v-check name="sex" @change="changeSex(1)" value="男">
      <input type="radio" v-check name="sex" @change="changeSex(2)" value="女">
      <!-- <p-radio class="p-default p-round p-thick p-smooth" color="success-o" name="sex" @change="changeSex('男')">男</p-radio>
      <p-radio class="p-default p-round p-thick p-smooth" color="success-o" name="sex" @change="changeSex('女')">女</p-radio> -->
    </mt-cell>
    <mt-cell title="民族" value="请选择民族" @click.native="$refs.picker.openPopup('nation')" is-link>
      <span v-if="picker.nation">{{picker.nation}}</span>
    </mt-cell>
    <!-- <mt-field label="户籍详细地址" placeholder="请输入地址" v-model="PermanentAddress"></mt-field> -->
    <mt-cell title="户籍地址" value="请选择" @click.native="$refs.region.openPopup('PermanentAddress_1', 'BIG_REGION_DATA')" is-link>
      <span v-if="region.PermanentAddress_1" class="fontSize_13">{{region.PermanentAddress_1}}</span>
    </mt-cell>
    <mt-field label="户籍详细地址" placeholder="请输入地址" v-model="PermanentAddress_2"></mt-field>
    <!-- <mt-field label="居住地地址" placeholder="请输入地址" v-model="ResidentialAddress"></mt-field> -->
    <mt-cell title="居住地地址" value="请选择" @click.native="$refs.region.openPopup('ResidentialAddress', 'BIG_REGION_DATA')" is-link>
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
      <mt-field placeholder="请输入联系方式" v-model="DrugPhoneNumber"></mt-field>
    </mt-cell>
    <!-- <mt-cell title="决定书照片" value="请选择图片" @click.native="$refs.media.chooseMediaType('pic', 'image_3')">
      <span style="color: red;" slot="icon">*</span>
      <span style="color: #aaa;" v-if="!media.image_3">请选择图片</span>
      <img class="view_img" :src="media.image_3" alt="" v-if="media.image_3">
      <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
    </mt-cell> -->
    <ImageBox title="决定书照片" required :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'image_3')"></ImageBox>
    <mt-cell title="决定单位">
        <span style="color: red;" slot="icon">*</span>
        <mt-field placeholder="请输入决定单位" v-model="DeterminingUnit"></mt-field>
      </mt-cell>
      <mt-cell title="决定日期" value="请选择日期" @click.native="$refs.time.openTimePicker('time_4')" is-link>
        <span style="color: red;" slot="icon">*</span>
        <span style="color: #888" v-if="time.time_4">{{time.time_4}}</span>
      </mt-cell>
      <mt-cell title="人员类别" value="请选择人员类别" @click.native="$refs.picker.openPopup('Drugategory')" is-link>
        <span style="color: red;" slot="icon">*</span>
        <span style="color: #888" v-if="picker.Drugategory">{{picker.Drugategory}}</span>
      </mt-cell>
      <mt-cell title="法律文书编号">
        <span style="color: red;" slot="icon">*</span>
        <mt-field placeholder="请输入编号" v-model="LawBookNumber"></mt-field>
      </mt-cell>
    <mt-cell title="报到日期" value="请选择日期" @click.native="$refs.time.openTimePicker('time_1')" is-link>
      <span style="color: red;" slot="icon">*</span>
      <span style="color: #888" v-if="time.time_1">{{time.time_1}}</span>
    </mt-cell>
    <mt-cell title="社区戒毒开始日期" value="请选择日期" @click.native="$refs.time.openTimePicker('time_2')" is-link>
      <span style="color: red;" slot="icon">*</span>
      <span style="color: #888" v-if="time.time_2">{{time.time_2}}</span>
    </mt-cell>
    <mt-cell title="社区戒毒结束日期" value="请选择日期" @click.native="$refs.time.openTimePicker('time_3')" is-link>
      <span style="color: red;" slot="icon">*</span>
      <span style="color: #888" v-if="time.time_3">{{time.time_3}}</span>
    </mt-cell>
    <!-- <mt-cell title="协议照片" value="请选择图片" @click.native="$refs.media.chooseMediaType('pic', 'image_2')">
      <span style="color: red;" slot="icon">*</span>
      <span style="color: #aaa;" v-if="!media.image_2">请选择图片</span>
      <img class="view_img" :src="media.image_2" alt="" v-if="media.image_2">
      <i style="color: #0ab7a9;" class="iconfont icon-0801zengjia"></i>
    </mt-cell> -->
    <ImageBox title="协议照片" required :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', 'image_2')"></ImageBox>
    
    <!-- 时间选择Picker -->
    <TimePicker ref="time" :field="time"></TimePicker>
    <!-- 媒体组件 -->
    <MediaCapture ref="media" :field="media"></MediaCapture>
    <CustomButton @click.native="submit()">新增</CustomButton>
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
                btnParams: {
                    canShow: false,
                    icon: '',
                    txt: '',
                    isSearch: false
                },
                params: null,
                Name: '',
                Card_Id: '',
                DrugPhoneNumber: "",
                PermanentAddress: "",
                PermanentAddress_2: '',
                DeterminingUnit: '',
                LawBookNumber: '',
                DetailAddress: '',
                //   ResidentialAddress: "",
                region: {
                    ResidentialAddress: '',
                    PermanentAddress_1: ''
                },
                OldName: "",
                time: {
                    time_1: "",
                    time_2: "",
                    time_3: "",
                    time_4: ''
                },
                media: {
                    image_1: [],
                    image_2: [],
                    image_3: []
                },
                sex: 0,
                picker: {
                    nation: "",
                    education: "",
                    job: "",
                    Drugategory: ''
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
                    }],
                    Drugategory: [{
                        flex: 1,
                        defaultIndex: 1,
                        values: ['社区康复', '社区戒毒'],
                        className: "slot1",
                        textAlign: "center"
                    }],
                }
            };
        },
        components: {},
        created() {
            _this = this;
            _this.region['ResidentialAddress'] = _this.Global['Address'];
        },
        methods: {
            changeSex(sex) {
                _this.sex = sex;
            },
            submit() {
                if(_this.DetailAddress) {

                }else {
                    _this.Tool.toaster('请填写详细居住地址');
                    return;
                }
                var fileList = {
                    HeadImageUrl: _this.media.image_1,
                    RrotocolPhoto: _this.media.image_2,
                    DecisionPhoto: _this.media.image_3,

                };
                var formData = {
                    DrugUserCardId: _this["Card_Id"],
                    DrugUserName: _this.Name,
                    DrugPhoneNumber: _this.DrugPhoneNumber,
                    // Ethnicity: _this.picker["nation"],
                    // PermanentAddress: _this.PermanentAddress,
                    ResidentialAddress: _this.region['ResidentialAddress'] + '-' + _this.DetailAddress,
                    Culture: _this.picker["education"],
                    Occupation: _this.picker["job"],
                    // OldName: _this.OldName,
                    ReportDate: _this.time["time_1"],
                    RehabilitativeStartDate: _this.time["time_2"],
                    RehabilitativeEndDate: _this.time["time_3"],
                    // Sex: _this.sex,
                    DeterminingUnit: _this.DeterminingUnit,
                    DeterminingTime: _this.time['time_4'],
                    Drugategory: _this.picker['Drugategory'],
                    LawBookNumber: _this.LawBookNumber
                };
                /* 选填项 */
                _this.picker["nation"] && (formData['Ethnicity'] = _this.picker["nation"]);
                _this.PermanentAddress && (formData['PermanentAddress'] = _this.region['PermanentAddress_1'] + '-' + _this['PermanentAddress_2']);
                _this.OldName && (formData['OldName'] = _this.OldName);
                _this.sex && (formData['Sex'] = _this.sex);
                
                var params_myUpload = {
                    fileType: "pic",
                    fileList: fileList
                };
                var params_postForm = {
                    url: "/home/data/newpersonnelupload",
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