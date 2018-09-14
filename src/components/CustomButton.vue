<template>
  <div v-if="Global.UserType !== 3" class="btn_box" v-bind:class="{bottom: position === 'bottom'}" v-bind:style="styleObj">
    <button @click="handleClick" class="btn">
      <slot></slot>
    </button>
  </div>
</template>

<script>
    var _this;

    export default {
        name: "CustomButton",
        data() {
            return {

            };
        },
        props: {
            position: String,
            styleObj: Object
        },
        components: {

        },
        created() {
            _this = this;
        },
        mounted() {
            // document.getElementsByClassName('btn_box')[0].style.top = document.body.offsetHeight - 80 + 'px';
        },
        methods: {
            handleClick(evt) {
                console.log('点击')
                _this.$emit('click', evt);
            }
        }
    };
</script>

<style scoped>
    .btn_box {
        width: 100%;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    
    .btn {
        position: relative;
        overflow: hidden;
        width: 300px;
        height: 50px;
        border-radius: 25px;
        background-color: #0ab7a9;
        padding: 0 12px;
        color: #fff;
        font-size: 18px;
        border: 0;
        outline: none;
        text-align: center;
    }
    
    .btn::after {
        background-color: #000;
        content: " ";
        opacity: 0;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;
    }
    
    .btn:active::after {
        opacity: .2;
    }
    
    /* .bottom {
        position: absolute;
        bottom: 20px;
    } */
</style>