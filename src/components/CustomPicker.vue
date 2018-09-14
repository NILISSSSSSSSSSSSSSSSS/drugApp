<template>
  <mt-popup
    v-model="popupVisible"
    position="bottom" style="width: 100%">
    <div class="picker-toolbar" slot>
      <span class="mint-datetime-action mint-datetime-cancel" @click="closePopup()">取消</span>
      <span class="mint-datetime-action mint-datetime-confirm" @click="handleConfirm()">确定</span>
    </div>
    <mt-picker :slots="_slots" @change="onValuesChange"></mt-picker>
  </mt-popup>
</template>

<script>
/**
 * ReadMe
 * @description 单个字段无需传type，通过在方法调用中传入type来解决多个字段的场景，type为String类型且与传入组件的参数有对应关系
 * @method $refs.example.openPopup()
 * @method $refs.example.openPopup(type)
 * @param {Object|Array} slots 单个结构：[{}]，多个结构：{key1: [{}], key2: [{}]}
 * @param {Object} field 单个结构：{value: ''}，多个结构：{key1: '', key2: ''}
 * @param {Function} pickerCb
 */
var _this;

export default {
  name: "CustomPicker",
  data() {
    return {
      popupVisible: false,
      _type: null,
      _slots: null,
      _field: null
    };
  },
  props: {
    slots: [Array, Object],
    field: Object,
    pickerCb: Function
  },
  components: {
    
  },
  created() {
    _this = this;
    _this._slots = [];
    _this._field = _this.Tool.deepCopy(_this.field);
  },
  methods: {
    closePopup() {
      _this.popupVisible = false;
    },
    handleConfirm() {
      if(_this._type) {
        _this.field[_this._type] = _this._field[_this._type];
      }else {
        _this.field['value'] = _this._field['value'];
      }
      if(_this.pickerCb) {
        _this.pickerCb(_this._type || 'value');
      }
      _this.closePopup();
    },
    openPopup(type) {
      if(type) {
        _this._type = type;
        _this._slots = _this.slots[type];
      }else {
        _this._slots = _this.slots;
      }
      _this.$nextTick(() => {
        setTimeout(() => {
          _this._slots[0].defaultIndex = 0;
        }, 100)
      });
      _this.popupVisible = true;
    },
    onValuesChange(picker, values) {
      if(_this._type) {
        _this._field[_this._type] = values[0];
      }else {
        _this._field['value'] = values[0];
      }
    },
  }
};
</script>

<style scoped>

</style>
