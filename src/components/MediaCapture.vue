<template>
  <mt-actionsheet
    :actions="actions"
    v-model="sheetVisible">
  </mt-actionsheet>
</template>

<script>
/**
 * ReamMe
 * @method $refs.example.chooseMediaType(type,fieldType)
 * @param field {object} 关联字段(必传)
 * @param picSuccess {function} 成功拿到图片的回调(可选)
 * @param videoSuccess {function} 成功拿到视频的回调(可选)
 * @param picError {function} 失败拿到图片的回调（可选）
 * @param videoError {function} 失败拿到视频的回调（可选）
 */
import PhotoSwipe from 'photoswipe/dist/photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import { Indicator } from 'mint-ui';
var _this;

export default {
  name: "MediaCapture",
  props: {
    field: Object,
    picSuccess: Function,
    picError: Function,
    videoSuccess: Function,
    videoError: Function
  },
  data() {
    return {
      action_pic: [
        {
          name: "拍照",
          method: function() {
            _this.takePhoto(Camera.PictureSourceType.CAMERA);
          }
        },
        {
          name: "从相册中选择",
          method: function() {
            _this.takePhoto(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        }
      ],
      action_video: [
        {
          name: "录像",
          method: function() {
            _this.recordVideo();
          }
        },
        {
          name: "从文件中选择",
          method: function() {
            _this.takePhoto(
              Camera.PictureSourceType.PHOTOLIBRARY,
              Camera.MediaType.VIDEO
            );
          }
        }
      ],
      actions: [],
      sheetVisible: false,
      _type: null,
      limit: 10,
    };
  },
  components: {},
  created() {
    _this = this;
  },
  methods: {
    defaultMediaError() {
      _this.actions === _this.action_pic
        ? _this.Tool.toaster("拍照失败")
        : _this.Tool.toaster("录像失败");
    },
    chooseMediaType(type, fieldType) {
      type === "pic"
        ? (_this.actions = _this.action_pic)
        : (_this.actions = _this.action_video);
      if(fieldType) {
        _this._type = fieldType;
      }else {
        _this._type = 'value';
      }
      _this.sheetVisible = true;
    },
    //拍照
    takePhoto: function(sourceType, mediaType) {
      var options = _this.setOptions(sourceType, mediaType);
      navigator.camera.getPicture(
        function success(imageURL) {
          if(_this.field[_this._type]['length'] >= 10) {
            _this.Tool.toaster('最多上传10张图片!');
            return;
          }
          console.log("照片");
          var temp;
          if(_this.actions === _this.action_video) {
            // 从文件中取视频
            temp = 'file://' + imageURL;
            if(_this.field[_this._type]['length']) {
              _this.field[_this._type][0] = temp;
            }else {
              _this.field[_this._type].push(temp);
            }
            _this.videoSuccess && _this.videoSuccess(temp, _this._type);
          }else {
            if(sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
              // 从文件中取图片
              temp = imageURL.replace(/[\.jpg | \.png]\?\d+/g, 'g');
            }else {
              // 拍照
              temp = imageURL;
            }
            _this._type ? _this.field[_this._type].push(temp) : _this.field['value'].push(temp);
            _this.picSuccess && _this.picSuccess(temp, _this._type);
            _this.initPreview(_this._type || 'value');
          }
          // _this._type ? _this.field[_this._type].push(temp) : _this.field['value'].push(temp);
          console.log(temp);
        },
        function error(error) {
          _this.picError ? _this.picError(error) : _this.defaultMediaError();
        },
        options
      );
    },
    setOptions: function(sourceType, mediaType) {
      var options = {
        // Some common settings are 20, 50, and 100
        quality: 80,
        targetWidth: 2000,
        targetHeight: 2000,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: sourceType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: mediaType || Camera.MediaType.PICTURE,
        allowEdit: false,
        correctOrientation: true //Corrects Android orientation quirks
      };
      return options;
    },
    //录制视频
    recordVideo() {
      navigator.device.capture.captureVideo(
        function success(video) {
          console.log("视频");
          var videoURL = video[0]["fullPath"];
          if(_this.field[_this._type]['length']) {
            _this.field[_this._type][0] = videoURL;
          }else {
            _this.field[_this._type].push(videoURL);
          }
          _this.videoSuccess && _this.videoSuccess(videoURL, _this._type, video);
          // _this._type ? _this.field[_this._type].push(videoURL) : _this.field['value'].push(videoURL);
          console.log(videoURL);
        },
        function error(error) {
          _this.videoError
            ? _this.videoError(error)
            : _this.defaultMediaError();
        },
        { duration: 10, quality: 0.2 }
      );
    },
    //压缩
    zip(config) {
      Indicator.open({
        text: '提交中...',
        spinnerType: 'fading-circle'
      });
      var source = config.fileList,
        PathToResultZip = cordova.file.externalApplicationStorageDirectory + "source.zip";

      console.log("source    : " + source);
      console.log("PathToResultZip       : " + PathToResultZip);

      console.log("zipping ...");

      Zeep.zipfilelist(
        {
          from: source,
          to: PathToResultZip
        },
        function() {
          console.log("zip success!");
          console.log(PathToResultZip);
          _this.upload(config, PathToResultZip);
        },
        function(e) {
          console.log("zip error: ", e);
        }
      );
    },
    //上传
    upload(config, fileURL) {
      var options = new FileUploadOptions();
      options.fileKey = "file";
      options.fileName = 'source.zip';
      options.mimeType = "text/plain";
      options.httpMethod = config.method.toUpperCase();
      options.params = config.params;

      var ft = new FileTransfer();
      ft.upload(
        fileURL,
        encodeURI(config.url),
        function success(res){
          Indicator.close();
          config.success(res);
        },
        function error(err) {
          Indicator.close();
          config.error(err);
        },
        options
      );
    },
    initPreview(type) {
      var initPhotoSwipeFromDOM = function(gallerySelector) {
        var parseThumbnailElements = function(thumbElements) {
          var items = [],
            el,
            load = 0,
            item;
          item = {};
          for (var i = 0; i < thumbElements.length; i++) {
            el = thumbElements[i];

            // include only element nodes
            if (el.nodeType !== 1) {
              continue;
            }

            if (typeof el.naturalWidth == "undefined") {
              // IE 6/7/8
              var i = new Image();
              i.src = el.src;
              var rw = i.width;
              var rh = i.height;
            } else {
              // HTML5 browsers
              var rw = el.naturalWidth;
              var rh = el.naturalHeight;
            }

            item = {
              title: el.getAttribute("preview-text"),
              el: el,
              src: el.getAttribute("src"),
              w: rw,
              h: rh,
              author: el.getAttribute("data-author"),
              o: {
                src: el.getAttribute("src"),
                w: rw,
                h: rh
              },
              m: {
                src: el.getAttribute("src"),
                w: rw,
                h: rh
              }
            };
            items.push(item);
          }
          return items;
        };

        var onThumbnailsClick = function(e) {
          e = e || window.event;
          e.preventDefault ? e.preventDefault() : (e.returnValue = false);

          var eTarget = e.target || e.srcElement;

          var thumbElements;
          var group = eTarget.getAttribute("preview");
          if (group) {
            thumbElements = document.querySelectorAll(
              'img[preview="' + group + '"]'
            );
          } else {
            thumbElements = document.querySelectorAll("img[preview]");
          }
          var clickedGallery = thumbElements;

          var index;

          for (var i = 0; i < clickedGallery.length; i++) {
            if (clickedGallery[i] === eTarget) {
              index = i;
              break;
            }
          }
          if (index >= 0) {
            openPhotoSwipe(index, clickedGallery);
          }
          return false;
        };

        var photoswipeParseHash = function() {
          var hash = window.location.hash.substring(1),
            params = {};

          if (hash.length < 5) {
            // pid=1
            return params;
          }

          var vars = hash.split("&");
          for (var i = 0; i < vars.length; i++) {
            if (!vars[i]) {
              continue;
            }
            var pair = vars[i].split("=");
            if (pair.length < 2) {
              continue;
            }
            params[pair[0]] = pair[1];
          }

          if (params.gid) {
            params.gid = parseInt(params.gid, 10);
          }

          return params;
        };

        var openPhotoSwipe = function(
          index,
          galleryElement,
          disableAnimation,
          fromURL
        ) {
          var pswpElement = document.querySelectorAll(".pswp")[0],
            gallery,
            options,
            items;

          var items = parseThumbnailElements(galleryElement);
          options = {
            //galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function() {
              var thumbnail = items[index].el,
                pageYScroll =
                  window.pageYOffset || document.documentElement.scrollTop,
                rect = thumbnail.getBoundingClientRect();

              return {
                x: rect.left,
                y: rect.top + pageYScroll,
                w: rect.width
              };
            },

            addCaptionHTMLFn: function(item, captionEl, isFake) {
              if (!item.title) {
                captionEl.children[0].innerText = "";
                return false;
              }
              captionEl.children[0].innerHTML = item.title;
              return true;
            },
            showHideOpacity: true,
            history: false,
            shareEl: true,
            shareButtons: [
              {id:'delete', label:'删除', url:'javascript:void(0);'},
            ],
          };

          if (fromURL) {
            if (options.galleryPIDs) {
              // parse real index when custom PIDs are used
              // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
              for (var j = 0; j < items.length; j++) {
                if (items[j].pid == index) {
                  options.index = j;
                  break;
                }
              }
            } else {
              options.index = parseInt(index, 10) - 1;
            }
          } else {
            options.index = parseInt(index, 10);
          }

          // exit if index not found
          if (isNaN(options.index)) {
            return;
          }
          // options = extend(options, {});

          if (disableAnimation) {
            options.showAnimationDuration = 0;
          }

          // Pass data to PhotoSwipe and initialize it
          gallery = new PhotoSwipe(
            pswpElement,
            PhotoSwipeUI_Default,
            items,
            options
          );

          // see: http://photoswipe.com/documentation/responsive-images.html
          var realViewportWidth,
            useLargeImages = false,
            firstResize = true,
            imageSrcWillChange;

          gallery.listen("beforeResize", function() {
            var dpiRatio = window.devicePixelRatio
              ? window.devicePixelRatio
              : 1;
            dpiRatio = Math.min(dpiRatio, 2.5);
            realViewportWidth = gallery.viewportSize.x * dpiRatio;

            if (
              realViewportWidth >= 1200 ||
              (!gallery.likelyTouchDevice && realViewportWidth > 800) ||
              screen.width > 1200
            ) {
              if (!useLargeImages) {
                useLargeImages = true;
                imageSrcWillChange = true;
              }
            } else {
              if (useLargeImages) {
                useLargeImages = false;
                imageSrcWillChange = true;
              }
            }

            if (imageSrcWillChange && !firstResize) {
              gallery.invalidateCurrItems();
            }

            if (firstResize) {
              firstResize = false;
            }

            imageSrcWillChange = false;
          });

          gallery.listen("gettingData", function(index, item) {
            if (useLargeImages) {
              item.src = item.o.src;
              item.w = item.o.w;
              item.h = item.o.h;
            } else {
              item.src = item.m.src;
              item.w = item.m.w;
              item.h = item.m.h;
            }
          });
          gallery.listen('shareLinkClick', function(e, target) {
            e = e || window.event;
            e.stopPropagation();
            e.preventDefault();
            var index = this.getCurrentIndex();
            _this.field[type].splice(index, 1);
            this.close();
            this.items.splice(index, 1);
            this.invalidateCurrItems();
            this.updateSize(true);
          });
          gallery.init();
        };

        var extend = function(o1, o2) {
          for (var prop in o2) {
            o1[prop] = o2[prop];
          }
          return o1;
        };

        // select all gallery elements
        var galleryElements = document.querySelectorAll(gallerySelector);
        console.log(galleryElements);
        for (var i = 0, l = galleryElements.length; i < l; i++) {
          galleryElements[i].setAttribute("data-pswp-uid", i + 1);
          galleryElements[i].onclick = onThumbnailsClick;
        }

        // Parse URL and open gallery if it contains #&pid=3&gid=1
        var hashData = photoswipeParseHash();

        //禁用历史模式
        //					if(hashData.pid && hashData.gid) {
        //						openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
        //					}
      };
      setTimeout(function() {
        console.log(`img[preview=${type}]`);
        initPhotoSwipeFromDOM(`img[preview=${type}]`);
      });
      
    }
  }
};
</script>

<style scoped>

</style>
