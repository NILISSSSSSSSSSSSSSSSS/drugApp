import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const  SET_HISTORY_LISTDATA='SET_HISTORY_LISTDATA';
const  SET_HISTORY_LISTDATA1='SET_HISTORY_LISTDATA1';
const  SET_HISTORY_LISTDATA2='SET_HISTORY_LISTDATA2';
const  SET_MESOBJ='SET_MESOBJ';
const  SET_MSGTAG='SET_MSGTAG';
const  SET_USER_TYPE='SET_USER_TYPE';

// 首先声明一个状态 state
const state = {
  listDdataStore: [],
  mesObj:{
    sign:0,
    leave:0,
    urine:0,
    change:0
  },
  hasNewMsg:false,
  userType:0,
}

// 然后给 actions 注册事件处理函数，当这个函数被触发时，将状态提交到 mutaions中处理
const actions = {
}
// 更新状态
const mutations = {
  [SET_HISTORY_LISTDATA](state,data){
    state.listDdataStore=data
  },
  [SET_HISTORY_LISTDATA1](state,data){
    state.listDdataStore1=data
  },
  [SET_HISTORY_LISTDATA2](state,data){
    state.listDdataStore2=data
  },
  [SET_MESOBJ](state,mesObj){
    state.mesObj=mesObj
  },
  [SET_MSGTAG](state,msgtag){
    state.hasNewMsg=msgtag
  },
  [SET_USER_TYPE](state,userType){
    state.userType=userType
  }

}
// 获取状态信息
const getters = {
  listDdataStore: state => state.listDdataStore,
  listDdataStore1: state => state.listDdataStore1,
  listDdataStore2: state => state.listDdataStore2,  
  mesObj:state=>state.mesObj,
  hasNewMsg:state=>state.hasNewMsg,
  userType:state=>state.userType
}

// 下面这个相当关键了，所有模块，记住是所有，注册才能使用
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
