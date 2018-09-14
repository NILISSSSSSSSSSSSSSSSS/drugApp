<template>
  <div>
    <Header title="待处理消息" :back="backtopage()" :btnParams="btnParams"></Header>
    <div class="itemWrap">
      <mt-cell title="待签到" v-show="SignInRecord>0" @click.native="routerToPage('sign')">
        <a class="pendingTo">{{SignInRecord}}<span class="dot"></span>人</a>
        <!-- <div  class="pendingTo">{{SignInRecord}}<span class="dot"></span>人</div> -->
      </mt-cell>
       <mt-cell title="待请假" v-show="Vacation>0" @click.native="routerToPage('leave')"> 
        <a class="pendingTo">{{Vacation}}<span class="dot"></span>人</a>
      </mt-cell>
       <mt-cell title="待尿检" v-show="EntryUrineTest>0" @click.native="routerToPage('urine')">
        <a class="pendingTo">{{EntryUrineTest}}<span class="dot"></span>人</a>
      </mt-cell>
       <mt-cell title="待变更" v-show="ChangePlace>0" @click.native="routerToPage('change')">
        <a class="pendingTo">{{ChangePlace}}<span class="dot"></span>人</a>
      </mt-cell>
      <div v-if="SignInRecord==0&&Vacation==0&&EntryUrineTest==0&&ChangePlace==0" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
    </div>
  </div>
</template>
<script>
    import {
        mapGetters,
        mapMutations
    } from "vuex";
    export default {
        data() {
            return {
                btnParams: {},
                SignInRecord: 0,
                Vacation: 0,
                EntryUrineTest: 0,
                ChangePlace: 0
            };
        },
        created() {
            this.getPendingData();
            this.setMesTip(false)
        },
        computed: {
            ...mapGetters(["mesObj", "userType"])
        },
        methods: {
            backtopage() {
                return this.userType === 1 ? '/Drug' : '/Manage';
            },
            routerToPage(key){
                if(this.userType === 1){
                    if (key === "sign") {
                        this.$router.push('/Drug/DrugHistoryList1')
                        } else if (key === "leave") {
                        this.$router.push('/Drug/DrugHistoryList2')
                    
                        } else if (key === "urine") {
                        this.$router.push('/Drug/DrugHistoryList3')
                    
                        } else if (key === "change") {
                        this.$router.push('/Drug/DrugHistoryList4')
                        }
                    }else{
                        if (key === "sign") {
                        this.$router.push('/Manage/SignInRecord')
                        } else if (key === "leave") {
                        this.$router.push('/Manage/Vacation')
                        } else if (key === "urine") {
                        this.$router.push('/Manage/EntryUrineTest')
                        } else if (key === "change") {
                        this.$router.push('/Manage/ChangePlace')
                        }
                    }
                
                },
            ...mapMutations({
                setresObj: "SET_MESOBJ",
                setMesTip: "SET_MSGTAG"
            }),
            getPendingData() {
                console.log(this.mesObj)
                Object.entries(this.mesObj).map(([key, val]) => {
                    if (key === "sign") {
                        this.SignInRecord = val
                    } else if (key === "leave") {
                        this.Vacation = val
                            // key='Vacation'
                    } else if (key === "urine") {
                        this.EntryUrineTest = val
                            // key='EntryUrineTest'
                    } else if (key === "change") {
                        this.ChangePlace = val
                            // key='ChangePlace'
                    }
                })

                console.log(this.mesObj)
            }
        }
    };
</script>
<style>
    .pendingTo {
        text-decoration: underline;
        color: #169bd5;
        position: relative;
    }
    
    .dot {
        width: 0.5rem;
        height: 0.5rem;
        display: inline-block;
        border-radius: 50%;
        background: #f00;
        position: absolute;
        right: -0.125rem;
        top: -0.3rem;
    }
</style>