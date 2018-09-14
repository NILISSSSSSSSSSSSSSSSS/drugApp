import regionData from '@/assets/data/message.json';
import bigRegionData from "@/assets/data/regionData.json";

export default {
	/* 静态变量 */
	APP_VERSION: '1.0.0',
	NULL_OBJECT: Object.freeze({}),
	NULL_ARRAY: Object.freeze([]),
	NULL_FUNCTION: Object.freeze(function(){}),
	REGION_DATA: Object.freeze(regionData),
	BIG_REGION_DATA: Object.freeze(bigRegionData),
	FILE_URL_DIVIDE: '$@',
	FIELD_MAP: {
		
	},
	ENV_PROD: '正式版',
	ENV_TEST: '培训版',
	QUERY_TYPE_OBJ: {
		EntryUrineTest: {
			name: '尿检',
			url: '/home/query/workshowurinetest',
            fields: [
                {label: '已尿检', value: 'value1', color: '#4caf50'},
                {label: '未尿检', value: 'value2', color: '#f44336'},
                {label: '总数', value: 'All', color: '#26a2ff'},
            ]
		},
		Help: {
			name: '救助帮扶',
			url: '/backstage/headerpriview/pregethelpstatis',
			fields: [
				{label: '帮扶次数', value: 'helpnum', color: '#4caf50'},
				{label: '帮扶人数', value: 'helprolenum', color: '#f44336'}
			]
		},
		EntryMemcon: {
			name: '谈话记录',
			url: '/home/query/workshowtalklog',
			fields: [
				{label: '已谈话', value: 'value1', color: '#4caf50'},
				{label: '未谈话', value: 'value2', color: '#f44336'},
				{label: '总数', value: 'All', color: '#26a2ff'},
			]
		},
		CheckIn: {
			name: '报到/登记',
			url: '/home/query/workshowreport',
			fields: [
				{label: '已报到', value: 'value1', color: '#4caf50'},
				{label: '未报到', value: 'value2', color: '#f44336'},
				{label: '总数', value: 'All', color: '#26a2ff'},
			]
		},
		Vacation: {
			name: '请假业务',
			url: '/home/query/workshowgetleave',
			fields: [
				{label: '已请假', value: 'value1', color: '#4caf50'},
				{label: '未请假', value: 'value2', color: '#f44336'},
				{label: '总数', value: 'All', color: '#26a2ff'},
			]
		},
		EntrySummary: {
			name: '综合评估',
			url: '/home/query/workshowcomprehensive',
			fields: [
				{label: '已评估', value: 'value1', color: '#4caf50'},
				{label: '未评估', value: 'value2', color: '#f44336'},
				{label: '总数', value: 'All', color: '#26a2ff'},
			]
		},
		State: {
			name: '状态变更',
			url: '/home/query/workshowpersonnelstate',
			fields: [
				{label: '已中止', value: 'value3', color: '#4caf50'},
				{label: '已终止', value: 'value4', color: '#f44336'},
				{label: '已解除', value: 'value5', color: '#5a5a5a'},
				{label: '总数', value: 'All', color: '#26a2ff'},
			]
		},
		ChangePlace: {
			name: '变更执行地',
			url: '/home/query/workshowchangeexecutor',
			fields: [
				{label: '变更人数', value: 'All', color: '#4caf50'}
			]
		},
		Verify: {
			name: '人员核实',
			url: '/home/query/workshowgetdruguser',
			fields: [
				{label: '已核实', value: 'value1', color: '#4caf50'},
				{label: '未核实', value: 'value2', color: '#f44336'},
				{label: '总数', value: 'All', color: '#26a2ff'},
			]
		},
		// Violate: {
		// 	name: '违反协议',
		// 	url: '/home/query/getviolationlist',
		// 	fields: [

		// 	]
		// },
		SignInRecord: {
			name: '签到查看',
			url: '/home/query/workshowgetsign',
			fields: [
				{label: '已签到', value: 'value1', color: '#4caf50'},
				{label: '未签到', value: 'value2', color: '#f44336'},
				{label: '总数', value: 'All', color: '#26a2ff'},
			]
		}
	},
	/* 可变变量 */
	Address: '',
	PhoneNumber: null,
	ToKen: null,
	UserType: null,
	UserName: null,
	Environment: null,
	AvatarSrc: null,
	AdminParams: {
		auth: null,
		county: null,
		station: null,
		villages: null,
		queryType: null
	},
	AdminParams_bak: {
		auth: null,
		county: null,
		station: null,
		villages: null,
		queryType: null
	},
	SelectedCounty: null,
	SelectedStation: null,
	SelectedVillages: null
}