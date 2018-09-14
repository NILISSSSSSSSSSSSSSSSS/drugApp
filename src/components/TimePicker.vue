<template>
  <div>
    <div v-if="endDate">
      <mt-datetime-picker
        ref="picker"
        type="date"
        v-model="pickerTime"
        v-if="endDate"
        :endDate="endDate"
        @confirm="handleConfirm">
      </mt-datetime-picker>
    </div>
    <div v-else>
      <mt-datetime-picker
        ref="picker"
        type="date"
        v-model="pickerTime"
        @confirm="handleConfirm">
      </mt-datetime-picker>
    </div>
  </div>
</template>

<script>
/**
 * ReadMe
 * @description 单个字段无需传type，通过在方法调用中传入type来解决多个字段的场景，type为String类型且与传入组件的参数有对应关系
 * @method $refs.example.openTimePicker()
 * @method $refs.example.openTimePicker(type)
 * @param field {object} 单个结构：{value: ''}，多个结构：{key1: '', key2: ''}
 */
var _this;

export default {
  name: "TimePicker",
  data() {
    return {
      pickerTime: new Date(),
      _type: null,
      endDate: null,
    };
  },
  props: {
    field: Object,
    confirmCallback: Function
  },
  components: {
    
  },
  created() {
    _this = this;

  },
  methods: {
    handleConfirm(date) {
      var temp = _this.Tool.handleTime(date);
      if(_this._type) {
        _this.field[_this._type] = temp;
        _this.confirmCallback && _this.confirmCallback(date, _this._type, temp);
      }else {
        _this.field['value'] = temp;
        _this.confirmCallback && _this.confirmCallback(date, 'value', temp);
      }
    },
    openTimePicker(type, isEndDate) {
      _this.endDate = null;
      if(isEndDate) {
        _this.endDate = isEndDate;
      }else {

      }
      if(type) {
        _this._type = type;
      }
      _this.$refs.picker.open();
    },
  }
};
</script>

<style scoped>

</style>
