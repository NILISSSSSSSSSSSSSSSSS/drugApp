import { Tool } from '../common/common';
var reg_image = /(pic|pic&video)\/.+\.(jpg|png)/;
var reg_nodata = /nodata/;
var reg_thumbnail = /\!thumbnail/;
var reg_sign = /\?.+/;
var _append = function(parent, text) {
  if (typeof text === 'string') {
    var temp = document.createElement('div');
    temp.innerHTML = text;
    // 防止元素太多 进行提速
    var frag = document.createDocumentFragment();
    while (temp.firstChild) {
      frag.appendChild(temp.firstChild);
    }
    parent.appendChild(frag);
  }
  else {
    parent.appendChild(text);
  }
}

export default {
  check: {
    inserted: function(el) {
      var html;
      if(el.type === 'radio') {
        html = `<div class="pretty p-icon p-round">
        
        <div class="state p-success">
            <i class="icon mdi mdi-check"></i>
            <label>${el.value}</label>
        </div>
      </div>`;
      }else {
        html = `
        <div class="pretty p-svg p-curve">
          
          <div class="state p-success">
            <svg class="svg svg-icon" viewBox="0 0 20 20">
                <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style="stroke: white;fill:white;"></path>
            </svg>
            <label></label>
          </div>
        </div>`;
      }
      var parent = el.parentElement;
      _append(parent, html);
      var box = parent.lastChild;
      box.insertBefore(el, box.getElementsByClassName('state')[0]);
    }
  },
  nodata: {
    componentUpdated: function(el, binding) {
      console.log(binding.value)
      if(binding.value === 0) {
        if(reg_nodata.test(el.innerHTML)) {

        }else {
          var html = '<div id="nodata" style="text-align: center;background-color: #fff;min-height: 48px;line-height: 48px;">暂无数据</div>';
          _append(el, html);
        }
      }else {
        if(reg_nodata.test(el.innerHTML)) {
          var nodata = document.getElementById('nodata');
          el.removeChild(nodata);
        }else {

        }
      }
    }
  },
  /**
   * 获取对象存储图片安全优化
   * @example <img v-cosauth src="https://foo/bar/example.jpg" />
   */
  cosauth: {
    bind: function(el) {
      var url = el.src;
      var key = url.match(reg_image)[0];
      console.log(url);
      if(key) {
        var cb = function(signed_url) {
          if(reg_thumbnail.test(url)) {
            el.src = url + signed_url.match(reg_sign)[0];
          }else {
            el.src = signed_url;
          }
        }
        Tool.prototype.getCos(key, cb);
      }
    }
  }
}