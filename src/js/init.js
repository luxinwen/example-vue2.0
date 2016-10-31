import './../css/base.less';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Element from 'element-ui';
import { routes } from './configRoutes';
import { TipsOption } from './configPublic';
import Index from './../vue/Index';

if (!Date.prototype.Format) {
  // 对Date的扩展，将 Date 转化为指定格式的String
  // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
  // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
  Date.prototype.Format = function(fmt) {
    var o = {
      'M+': this.getMonth() + 1,
      'd+': this.getDate(),
      'h+': this.getHours(),
      'm+': this.getMinutes(),
      's+': this.getSeconds(),
      'q+': Math.floor((this.getMonth() + 3) / 3),
      'S': this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return fmt;
  }
}

if (!String.trim) {
  // 对String的扩展，去除字符串首尾空格
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  }
}

// 全局注入对象
window.__GLOBAL__ = {
  evbus: new Vue()
};
__GLOBAL__.debug = false;  // 是否调试状态
__GLOBAL__.debugServer = 'http://10.0.53.11'; // 调试服务器
__GLOBAL__.loading = {
  show: false
};

// openAPI入参格式化
function OpenApiFormat(data) {
  return JSON.stringify({
    "REQUEST": {
      "HRT_ATTRS": {
        "App_Sub_ID": "2002",
        "App_Token": "5bb561d9-1781-4852-b92d-98c353b4d6f4",//必须正确
        "Api_ID": "hrt.crtec.papi.dev.content.getAdContentDetail",//必须正确
        "Api_Version": "0.1.0",
        "Time_Stamp": new Date().Format("yyyy-MM-dd hh:mm:ss:S"),//必须正确
        "Sign_Method": "md5",
        "Sign": "66987CB115214E59E6EC978214934FB8",
        "Format": "xml",
        "Partner_ID": "20000000",
        "Sys_ID": "20000001",
        "App_Pub_ID": "1001"
      },
      "REQUEST_DATA": data || {}
    }
  });
}

Vue.use(VueRouter);
Vue.use(Element);

Vue.mixin({
  computed: {
    // 返回是否正在加载中，方便按钮使用v-loading等
    isLoading() {
      return __GLOBAL__.loading
    }
  },
  methods: {
    // 封装ajax方法
    ajax(options) {
      var defer = $.Deferred();
      var opt = {
        url: options.url,
        type: 'POST',
        data: OpenApiFormat(options.data),
        dataType: 'json',
        contentType: 'application/json'
      };
      if (__GLOBAL__.debug) {
        opt.url = __GLOBAL__.debugServer + options.url;
      }
      if (!options.hideLoading) {
        this.showLoading();
      }
      $.ajax(opt).done((data) => {
        try {
          var data = data.RESPONSE;
          if (data.RETURN_CODE != 'S0A00000') {
            console.log('err::', data.RETURN_DESC);
            if (!options.hideError) {
              this.$alert(data.RETURN_DESC, TipsOption.title, TipsOption.warning);
            }
          }
          defer.resolve(data);  //此句如果写在data.RETURN_CODE='S0A00000'里面，则当!='S0A00000'时，无法执行done、fail、always函数
        } catch (e) {
          throw new Error('err::', e);
        }
      }).fail((xhr, textStatus, error) => {
        this.$alert('服务器错误::' + textStatus + ' ' + error, TipsOption.title, TipsOption.warning);
        defer.reject(arguments);
      }).catch((e) => {
        this.$alert('网络异常，请稍后再试', TipsOption.title, TipsOption.warning);
        defer.reject(arguments);
      }).always(() => {
        if (!options.hideLoading) {
          this.hideLoading();
        }
      });
      return defer.promise();
    },
    // 显示loading
    showLoading() {
      __GLOBAL__.loading.show = true;
    },
    // 隐藏loading
    hideLoading() {
      __GLOBAL__.loading.show = false;
    }
  }
});

const router = new VueRouter({
  routes
});

const app = new Vue({
  router,
  render: h => h(Index)
}).$mount('#app');
