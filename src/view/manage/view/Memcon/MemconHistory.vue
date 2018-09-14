<template>
    <div>
      <Header title="谈话历史" back="/Manage/EntryMemcon" :btnParams="btnParams"></Header>
      <div v-for="(item, index) in searchlist" v-bind:key="index" class="itemWrap">
        <mt-cell title="谈话时间">
          <span style="color: #888">{{item.TalkTime | killTime}}</span>
        </mt-cell>
        <mt-cell title="谈话地点">
            <span style="color: #888">{{item.TalkPlace}}</span>
          </mt-cell>
          <mt-cell title="谈话方式">
            <span style="color: #888">{{item.TalkMode}}</span>
          </mt-cell>
          <mt-cell title="谈话内容照片">
            
          </mt-cell>
          <div style="background-color: #fff;padding-left: 6px;">
              <img v-cosauth @click="preview(url)" v-for="(url, i) in item.parseImage" :key="i" :src="url" class="view_img" style="margin-right: 5px;"/>
          </div>
          <!-- <ImageBox title="谈话内容照片" disabled :imageUrls="media" :chooseMediaType="Wheel.chooseMediaType(this, 'pic', `image_${index}`)"></ImageBox> -->
      </div>
      <div class="previewBox" @click="isPreview = false" v-if="isPreview">
          <img :src="preview_url" alt="">
      </div>
      <div v-if="!searchlist.length" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>
    </div>
  </template>

<script>
    var _this;
    export default {
        name: "MemconHistory",
        created() {
            _this = this;
        },
        data() {
            return {
                searchlist: [],
                btnParams: {
                    canShow: false,
                    icon: '',
                    txt: '',
                    isSearch: false
                },
                isPreview: false,
                preview_url: ''
            }
        },
        created() {
            _this = this;
            _this.getSearchData();
        },
        methods: {
            getSearchData() {
                let apiName = _this.$route.query.apiName;
                var options = {
                    url: `/home/query/${apiName}`,
                    method: 'post',
                    data: {
                        DrugUserCardId: this.$route.query.CardId
                    },
                    success: function(res) {
                        _this.searchlist = res.data.druguser;
                        _this.searchlist.forEach((item, index) => {
                            item.parseImage = [];
                            // _this.Tool.parseImage(item.parseImage, item.TalkPhoto);
                            var arr = item.TalkPhoto.split(_this.Global.FILE_URL_DIVIDE);
                            arr.forEach(each => {
                                var replaced_url = each.replace('xcgk20180320-1256236574.cos.ap-chengdu.myqcloud.com', 'xcgk20180320-1256236574.image.myqcloud.com');
                                item.parseImage.push(replaced_url + '!thumbnail');
                            });
                        });
                    }
                };
                _this.Tool.request(options);
            },
            preview(url) {
                _this.isPreview = true;
                _this.preview_url = url.replace('!thumbnail', '');
            }
        }

    }
</script>

<style>
    .itemWrap {
        background-color: #ccc;
        border-radius: 5px;
        margin: 10px;
    }
    .previewBox {
        background-color: #000;
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10;
        line-height: 100%;
    }
    .previewBox img {
        width: 100%;
        height: 100%;
    }
</style>