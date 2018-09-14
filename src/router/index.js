import Vue from 'vue';
import Router from 'vue-router';
//路由页面
/* 通用 */
const Login = () =>
    import ('../view/Login');
const Register = () =>
    import ('../view/Register');
const ForgetPassword = () =>
    import ('../view/ForgetPassword');
const UserInfo = () =>
    import ('../view/UserInfo');
const UserSetting = () =>
    import ('../view/UserSetting');
/* 吸毒 */
const Drug = () =>
    import ('../view/drug/Drug');
//签到
const Container1 = () =>
    import ('../view/drug/components/Container1');
const DrugHistoryList1 = () =>
    import ('../view/drug/components/DrugHistoryList1');
//请假
const Container2 = () =>
    import ('../view/drug/components/Container2');
const DrugHistoryList2 = () =>
    import ('../view/drug/components/DrugHistoryList2');
//外出人员验尿
const Container3 = () =>
    import ('../view/drug/components/Container3');
const DrugHistoryList3 = () =>
    import ('../view/drug/components/DrugHistoryList3');
//变更执行地
const Container4 = () =>
    import ('../view/drug/components/Container4');
const DrugHistoryList4 = () =>
    import ('../view/drug/components/DrugHistoryList4');

/* 管控 */
const Manage = () =>
    import ('../view/manage/Manage');
//变更执行地
const ChangePlace = () =>
    import ('../view/manage/view/ChangePlace/ChangePlace');
const TypeInChangePlace = () =>
    import ('../view/manage/view/ChangePlace/TypeInChangePlace');
const UnapprovedChangePlace = () =>
    import ('../view/manage/view/ChangePlace/UnapprovedChangePlace');
const ChangePlaceHistoryList = () =>
    import ('../view/manage/view/ChangePlace/ChangePlaceHistoryList');
//登记
const CheckIn = () =>
    import ('../view/manage/view/CheckIn/CheckIn');
const Bd = () =>
    import ('../view/manage/view/CheckIn/Bd');
const Info = () =>
    import ('../view/manage/view/CheckIn/Info');
//谈话记录
const EntryMemcon = () =>
    import ('../view/manage/view/Memcon/EntryMemcon');
const Memcon = () =>
    import ('../view/manage/view/Memcon/Memcon');
const MemconHistory = () =>
    import ('../view/manage/view/Memcon/MemconHistory');
//状态变更
const State = () =>
    import ('../view/manage/view/State/State');
const StateDetail = () =>
    import ('../view/manage/view/State/StateDetail');
//综合评估
const EntrySummary = () =>
    import ('../view/manage/view/Summary/EntrySummary');
const Summary = () =>
    import ('../view/manage/view/Summary/Summary');
const SummaryHistory = () =>
    import ('../view/manage/view/Summary/SummaryHistory');
//尿检
const EntryUrineTest = () =>
    import ('../view/manage/view/UrineTest/EntryUrineTest');
const UrineTest = () =>
    import ('../view/manage/view/UrineTest/UrineTest');
const UnapprovedUrineTest = () =>
    import ('../view/manage/view/UrineTest/UnapprovedUrineTest');
const UnapprovedHistoryList = () =>
    import ('../view/manage/view/UrineTest/UnapprovedHistoryList');

//请假
const Vacation = () =>
    import ('../view/manage/view/Vacation/Vacation');
const TypeInVacation = () =>
    import ('../view/manage/view/Vacation/TypeInVacation');
const UnapprovedVacation = () =>
    import ('../view/manage/view/Vacation/UnapprovedVacation');
//人员核实
const Verify = () =>
    import ('../view/manage/view/Verify/Verify');
const Claim = () =>
    import ('../view/manage/view/Verify/Claim');
const Reject = () =>
    import ('../view/manage/view/Verify/Reject');
const VerifyDetail = () =>
    import ('../view/manage/view/Verify/VerifyDetail');
//违反协议
const Violate = () =>
    import ('../view/manage/view/Violate/Violate');
const TypeInViolate = () =>
    import ('../view/manage/view/Violate/TypeInViolate');
const SystemWarning = () =>
    import ('../view/manage/view/Violate/SystemWarning');
const VacationHistoryList = () =>
    import ('../view/manage/view/Vacation/VacationHistoryList');
//签到记录
const SignInRecord = () =>
    import ('../view/manage/view/SignInRecord/SignInRecord');
//救助帮扶
const Help = () =>
    import ('../view/manage/view/Help/Help');
const AddHelp = () =>
    import ('../view/manage/view/Help/AddHelp');
const HelpDetail = () =>
    import ('../view/manage/view/Help/HelpDetail');
const QueryHelp = () =>
    import ('../view/manage/view/Help/QueryHelp');
//预防教育
const Education = () =>
    import ('../view/manage/view/Education/Education');
const EducationDetail = () =>
    import ('../view/manage/view/Education/EducationDetail');
//消息待处理
const Pending = () =>
    import ('../view/manage/view/Pending');
/* 管理人员端 */
const BigManage = () =>
    import ('../view/BigManage/BigManage');
const SelectCounty = () =>
    import ('../view/BigManage/SelectCounty');
const SelectStation = () =>
    import ('../view/BigManage/SelectStation');
const SelectVillages = () =>
    import ('../view/BigManage/SelectVillages');
const CheckSummary = () =>
    import ('../view/BigManage/CheckSummary');
const MyApproval = () =>
    import ('../view/BigManage/MyApproval');
const ApprovalDetail = () =>
    import ('../view/BigManage/ApprovalDetail');
Vue.use(Router);

export default new Router({
    routes: [
        //登录页
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        //注册页
        {
            path: '/Register',
            name: 'Register',
            component: Register
        },
        //忘记密码
        {
            path: '/ForgetPassword',
            name: 'ForgetPassword',
            component: ForgetPassword
        },
        //个人信息页
        {
            path: '/UserInfo',
            name: 'UserInfo',
            component: UserInfo
        },
        //个人信息-设置
        {
            path: '/UserInfo/UserSetting',
            name: 'UserSetting',
            component: UserSetting
        },
        //吸毒主页
        {
            path: '/Drug',
            name: 'Drug',
            component: Drug
        },
        //吸毒-签到
        {
            path: '/Drug/Container1',
            name: 'Container1',
            component: Container1
        },
        {
            path: '/Drug/DrugHistoryList1',
            name: 'DrugHistoryList1',
            component: DrugHistoryList1
        },
        //吸毒-请假
        {
            path: '/Drug/Container2',
            name: 'Container2',
            component: Container2
        },
        {
            path: '/Drug/DrugHistoryList2',
            name: 'DrugHistoryList2',
            component: DrugHistoryList2
        },
        //吸毒-外出人员验尿
        {
            path: '/Drug/Container3',
            name: 'Container3',
            component: Container3
        },
        {
            path: '/Drug/DrugHistoryList3',
            name: 'DrugHistoryList3',
            component: DrugHistoryList3
        },
        //吸毒-变更执行地
        {
            path: '/Drug/Container4',
            name: 'Container4',
            component: Container4
        },
        {
            path: '/Drug/DrugHistoryList4',
            name: 'DrugHistoryList4',
            component: DrugHistoryList4
        },
        //管理主页
        {
            path: '/Manage',
            name: 'Manage',
            component: Manage
        },
        //管理-变更执行地父页
        {
            path: '/Manage/ChangePlace',
            name: 'ChangePlace',
            component: ChangePlace
        },
        //管理-变更执行地(已审批)
        {
            path: '/Manage/ChangePlace/TypeInChangePlace',
            name: 'TypeInChangePlace',
            component: TypeInChangePlace
        },
        {
            path: '/Manage/ChangePlace/ChangePlaceHistoryList',
            name: 'ChangePlaceHistoryList',
            component: ChangePlaceHistoryList
        },
        //管理-变更执行地(未审批)
        {
            path: '/Manage/ChangePlace/UnapprovedChangePlace',
            name: 'UnapprovedChangePlace',
            component: UnapprovedChangePlace
        },
        //管理-登记报到-父页
        {
            path: '/Manage/CheckIn',
            name: 'CheckIn',
            component: CheckIn
        },
        //管理-登记报到(废弃)
        {
            path: '/Manage/CheckIn/Bd',
            name: 'Bd',
            component: Bd
        },
        //管理-登记报到(完善人员信息)
        {
            path: '/Manage/CheckIn/Info',
            name: 'Info',
            component: Info
        },
        //管理-谈话记录父页
        {
            path: '/Manage/EntryMemcon',
            name: 'EntryMemcon',
            component: EntryMemcon
        },
        //管理-谈话记录(上传)
        {
            path: '/Manage/EntryMemcon/Memcon',
            name: 'Memcon',
            component: Memcon
        },
        //管理-谈话历史记录
        {
            path: '/Manage/EntryMemcon/MemconHistory',
            name: 'MemconHistory',
            component: MemconHistory
        },
        //管理-状态变更父页
        {
            path: '/Manage/State',
            name: 'State',
            component: State
        },
        //管理-状态变更(详情页)
        {
            path: '/Manage/State/StateDetail',
            name: 'StateDetail',
            component: StateDetail
        },
        //管理-综合评估父页
        {
            path: '/Manage/EntrySummary',
            name: 'EntrySummary',
            component: EntrySummary
        },
        //管理-综合评估(提交页)
        {
            path: '/Manage/EntrySummary/Summary',
            name: 'Summary',
            component: Summary
        },
        //管理-综合评估历史记录
        {
            path: '/Manage/EntrySummary/SummaryHistory',
            name: 'SummaryHistory',
            component: SummaryHistory
        },
        //管理-尿检父页
        {
            path: '/Manage/EntryUrineTest',
            name: 'EntryUrineTest',
            component: EntryUrineTest
        },
        //管理-尿检(已审批)
        {
            path: '/Manage/EntryUrineTest/UrineTest',
            name: 'UrineTest',
            component: UrineTest
        },
        //管理-尿检(未审批)
        {
            path: '/Manage/EntryUrineTest/UnapprovedUrineTest',
            name: 'UnapprovedUrineTest',
            component: UnapprovedUrineTest
        },
        {
            path: '/Manage/EntryUrineTest/UnapprovedHistoryList',
            name: 'UnapprovedHistoryList',
            component: UnapprovedHistoryList
        },
        //管理-请假父页
        {
            path: '/Manage/Vacation',
            name: 'Vacation',
            component: Vacation
        },
        {
            path: '/Manage/Vacation/VacationHistoryList',
            name: 'VacationHistoryList ',
            component: VacationHistoryList
        },
        //管理-请假(已审批)
        {
            path: '/Manage/Vacation/TypeInVacation',
            name: 'TypeInVacation',
            component: TypeInVacation
        },
        //管理-请假(未审批)
        {
            path: '/Manage/Vacation/UnapprovedVacation',
            name: 'UnapprovedVacation',
            component: UnapprovedVacation
        },
        //管理-人员核实父页
        {
            path: '/Manage/Verify',
            name: 'Verify',
            component: Verify
        },
        //管理-人员核实详情页
        {
            path: '/Manage/Verify/VerifyDetail',
            name: 'VerifyDetail',
            component: VerifyDetail
        },
        //管理-人员核实(认领)
        {
            path: '/Manage/Verify/Claim',
            name: 'Claim',
            component: Claim
        },
        //管理-人员核实(回退)
        {
            path: '/Manage/Verify/Reject',
            name: 'Reject',
            component: Reject
        },
        //管理-违反协议父页
        {
            path: '/Manage/Violate',
            name: 'Violate',
            component: Violate
        },
        //管理-违反协议(系统预警)
        {
            path: '/Manage/Violate/SystemWarning',
            name: 'SystemWarning',
            component: SystemWarning
        },
        //管理-违反协议(人工录入)
        {
            path: '/Manage/Violate/TypeInViolate',
            name: 'TypeInViolate',
            component: TypeInViolate
        },
        //管理-签到记录
        {
            path: '/Manage/SignInRecord',
            name: 'SignInRecord',
            component: SignInRecord
        },
        //管理-救助帮扶
        {
            path: '/Manage/Help',
            name: 'Help',
            component: Help
        },
        //救助帮扶 -> 新增帮扶
        {
            path: '/Manage/Help/AddHelp',
            name: 'AddHelp',
            component: AddHelp
        },
        //救助帮扶 -> 查询帮扶人
        {
            path: '/Manage/Help/AddHelp/QueryHelp',
            name: 'QueryHelp',
            component: QueryHelp
        },
        //救助帮扶 -> 帮扶详情
        {
            path: '/Manage/Help/HelpDetail',
            name: 'HelpDetail',
            component: HelpDetail
        },
        //管理-预防教育
        {
            path: '/Manage/Education',
            name: 'Education',
            component: Education
        },
        //预防教育 -> 文章详情
        {
            path: '/Manage/Education/EducationDetail',
            name: 'EducationDetail',
            component: EducationDetail
        },
        //消息待处理
        {
            path: '/Manage/Pending',
            name: 'Pending',
            component: Pending
        },
        /* 管理人员端 */
        {
            path: '/BigManage',
            name: 'BigManage',
            component: BigManage
        },
        {
            path: '/BigManage/SelectCounty',
            name: 'SelectCounty',
            component: SelectCounty
        },
        {
            path: '/BigManage/SelectCounty/SelectStation',
            name: 'SelectStation',
            component: SelectStation
        },
        {
            path: '/BigManage/SelectCounty/SelectStation/SelectVillages',
            name: 'SelectVillages',
            component: SelectVillages
        },
        {
            path: '/BigManage/SelectCounty/SelectStation/SelectVillages/CheckSummary',
            name: 'CheckSummary',
            component: CheckSummary
        },
        {
            path: '/BigManage/MyApproval',
            name: 'MyApproval',
            component: MyApproval
        },
        {
            path: '/BigManage/MyApproval/ApprovalDetail',
            name: 'ApprovalDetail',
            component: ApprovalDetail
        }
    ]
})