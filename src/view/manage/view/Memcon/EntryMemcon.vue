<template>
  <div class="EntryMemcon">
    <Header title="谈话记录人员" back="/Manage" :btnParams="btnParams" @getKeyWords="searchByKeyWords"></Header>
    <div v-if="people['length']" class="peopleNum">{{people['length']}}人</div>
    <mt-cell v-for="item in people" v-bind:key="item.Name" :title="item.Name" is-link @click.native="goDetail(item)" />
    <div v-if="!people.length" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
  </div>
</template>

<script>
    import {
        searchMixins
    } from "@/common/mixin"
    var _this;

    export default {
        name: "EntryMemcon",
        mixins: [searchMixins],
        data() {
            return {
                people: []
            };
        },
        components: {

        },
        created() {
            _this = this;
            _this.getPeople();
        },
        methods: {
            getPeople() {
                var options = {
                    url: '/home/query/getdrugtalklist',
                    method: 'post',
                    data: {},
                    success: function(res) {
                        _this.people = res['data']['druguser'];
                    }
                };
                _this.Tool.request(options);
            },
            goDetail(item) {
                item.CardId = item.Card_Id;
                _this.$router.push({
                    path: '/Manage/EntryMemcon/Memcon',
                    query: item
                });
            }
        }
    };
</script>

<style scoped>

</style>