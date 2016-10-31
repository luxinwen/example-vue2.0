## vue2.0 练习案例
使用vue、vue-router、element-ui做一个后台管理系统界面

**安装步骤**

1. 安装node 4.0+
2. 打开命令行工具执行以下步骤

  1. `npm install -g webpack webpack-dev-server`
  2. 进入到工程目录
  3. 执行`npm install`
  4. 执行`npm run dev`开始开发


**一些公共方法的配置及调用中需要注意的地方**

###### 本地跨域联调

修改 /common/js/basic.js 中的`__GLOBAL__.debug`值为`true`，如开发环境IP有变化，则修改`__GLOBAL__.debugServer`值为新的IP地址

###### Ajax方法调用

```javascript
module.exports = {
  methods: {
    getData() {
      this.ajax({
        url: '',                    // 接口地址，必填
        data: {},                   // 接口入参
        hideError: false,           // 是否隐藏RETURN_CODE != S0A00000时的提示框，默认为弹出
        hideLoading: false          // 是否隐藏LOADING效果，默认在接口请求时会出现LOADING遮罩层
      }).done((data) => {
        if (data.RETURN_CODE == 'S0A00000') {
          // ...
        }
      });
      // done回调一般只需要处理'RETURN_CODE'等于'S0A00000'时，如果要处理其它情况，须将hideError设为true以避免出现提示框
      // 另外fail回调会默认弹出提示框，如不需特殊处理，可不填写
    }
  }
}
```