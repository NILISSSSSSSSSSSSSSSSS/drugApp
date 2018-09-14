<template>
  <mt-popup
    showToolbar="true"
    v-model="popupVisible"
    position="bottom" style="width: 100%">
    <div class="picker-toolbar" slot>
      <span class="mint-datetime-action mint-datetime-cancel" @click="closePopup()">取消</span>
      <span class="mint-datetime-action mint-datetime-confirm" @click="handleConfirm()">确定</span>
    </div>
    <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
  </mt-popup>
</template>

<script>
var _this;
/**
 * ReadMe
 * @description 单个字段无需传type，通过在方法调用中传入type来解决多个字段的场景，type为String类型且与传入组件的参数有对应关系
 * @method $refs.example.openPopup()
 * @method $refs.example.openPopup(type)
 * @method $refs.example.openPopup(type,'BIG_REGION') 传入'BIG_REGION'使用省市县级数据
 * @param field {object} 单个结构：{value: ''}，多个结构：{key1: '', key2: ''} 必传
 */
export default {
  name: "AddressPicker",
  data() {
    return {
      _flag: null,
      origin_data: null,
      popupVisible: false,
      slots: null,
      _type: null,
      _field: null,
      region_keys: null,
      big_region_keys: null,
      is_BIG_REGION: false,
      slots_1: [
        {
          flex: 1,
          defaultIndex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          defaultIndex: 0,
          values: [],
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          defaultIndex: 0,
          values: [],
          className: "slot5",
          textAlign: "center"
        }
      ],
      slots_2: [
        {
          flex: 1,
          defaultIndex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          defaultIndex: 0,
          values: [],
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          defaultIndex: 0,
          values: [],
          className: "slot5",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot6"
        },
        {
          flex: 1,
          defaultIndex: 0,
          values: [],
          className: "slot7",
          textAlign: "center"
        }
      ]
    };
  },
  props: {
    field: Object,
    merge: Boolean
  },
  components: {
    
  },
  created() {
    _this = this;
    _this._field = _this.Tool.deepCopy(_this.field);
    _this.region_keys = Object.keys(_this.Global.REGION_DATA);
    _this.big_region_keys = Object.keys(_this.Global.BIG_REGION_DATA);
    _this.slots = _this.slots_1;
  },
  methods: {
    closePopup() {
      _this.popupVisible = false;
    },
    handleConfirm() {
      if(_this._type) {
        if(/凉山彝族自治州/g.test(_this._field[_this._type])) {
          if(_this._flag) {
            var temp_arr = _this._field[_this._type].split('-');
            var village = temp_arr.pop();
            var temp_str;
            for(var i = 0, len = _this.origin_data['length']; i < len; ++i) {
              if(_this.origin_data[i].includes(village)) {
                temp_arr.push(_this.origin_data[i]);
                temp_str = temp_arr.join('-');
                _this.field[_this._type] = temp_str;
                break;
              }
            }
          }else {
            var reg = /-[\u4E00-\u9FA5]+（[\u4E00-\u9FA5]+）[\u4E00-\u9FA5]+\//;
            _this.field[_this._type] = _this._field[_this._type].replace(reg, '-');
          }
        }else {
          _this.field[_this._type] = _this._field[_this._type];
        }
      }else {
        _this.field['value'] = _this._field['value'];
      }
      _this.closePopup();
    },
    openPopup(type, is_BIG_REGION, flag) {
      _this._flag = flag;
      if(is_BIG_REGION) {
        _this.is_BIG_REGION = true;
        _this.slots = _this.slots_2;
        _this.slots[0]['values'] = _this.big_region_keys;
        _this._dataSource = _this.Global.BIG_REGION_DATA;
        _this.$nextTick(() => {
          _this.slots[0].defaultIndex = 22;
        });
      }else {
        _this.is_BIG_REGION = false;
        _this.slots = _this.slots_1;
        _this.slots[0]['values'] = _this.region_keys;
        _this._dataSource = _this.Global.REGION_DATA;
      }
      _this.popupVisible = true;
      if(type) {
        _this._type = type;
      }
    },
    onValuesChange(picker, values) {
      if(!_this._dataSource) {
        return;
      }
      if(_this.is_BIG_REGION) {
        try{
          picker.setSlotValues(1, Object.keys(_this._dataSource[values[0]]));
          // console.log('1: ', Object.keys(_this._dataSource[values[0]])[0]);
          picker.setSlotValues(2, Object.keys(_this._dataSource[values[0]][values[1]]));
          // console.log('2: ', Object.keys(_this._dataSource[values[0]][values[1]])[0]);
          if(values[1] === '凉山彝族自治州') {
            var origin_data = _this._dataSource[values[0]][values[1]][values[2]];
            _this.origin_data = origin_data;
            var filtered_data = [];
            origin_data.forEach(item => {
              filtered_data.push(item.split('/')[1]);
            });
            picker.setSlotValues(3, filtered_data);
          }else {
            picker.setSlotValues(3, _this._dataSource[values[0]][values[1]][values[2]]);
          }
          // console.log('3: ', _this._dataSource[values[0]][values[1]][values[2]][0]);
        }catch(err) {

        }
        
      }else {
        picker.setSlotValues(1, Object.keys(_this._dataSource[values[0]]));
        picker.setSlotValues(2, _this._dataSource[values[0]][values[1]]);
      }
      var temp;
      if(_this.merge) {
        if(_this.is_BIG_REGION) {
          temp = `${values[0]}-${values[1]}-${values[2]}-${values[3]}`;
        }else {
          temp = `${values[0]}-${values[1]}-${values[2]}`;
        }
      }else {
        if(_this.is_BIG_REGION) {
          temp = {
            level_1: values[0],
            level_2: values[1],
            level_3: values[2],
            level_4: values[3],            
          };
        }else {
          temp = {
            county: values[0],
            station: values[1],
            villages: values[2]
          };
        }
      }
      
      if(_this._type) {
        _this._field[_this._type] = temp;
      }else {
        _this._field['value'] = temp;
      }
    }
  }
};
</script>

<style scoped>

</style>
