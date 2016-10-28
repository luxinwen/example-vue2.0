/*
 * 首页
 */
<style lang="less" scoped>
  @import './../css/color.less';
  .wrapper {
    .header {
      position: fixed;
      z-index: 499;
      top: 0;
      left: 0;
      width: 100%;
      height: 70px;
      line-height: 70px;
      background-color: @headBg;
      color: @headFontColor;
      h1 {
        margin: 0;
        padding-left: 20px;
        font-size: 24px;
      }
    }
    .sidebar {
      position: fixed;
      z-index: 499;
      top: 70px;
      bottom: 0;
      left: 0;
      width: 250px;
      background-color: @sidebarBg;
      border-right: 1px solid @borderColor;
      overflow: auto;
    }
    .main-content {
      margin-top: 70px;
      margin-left: 250px;
      padding: 20px 20px 0;
    }
  }
</style>

<template>
  <div id="app" class="wrapper" v-loading.fullscreen="loading.show">
    <div class="header">
      <h1>后台管理系统</h1>
    </div>

    <div class="sidebar">
      <el-menu
        :default-active="defaultActive"
        :unique-opened="true"
        :router="true">
        <el-submenu
          v-for="(menu, index) in MenuList"
          :index="index.toString()">
          <template slot="title">{{ menu.head }}</template>
          <el-menu-item
            v-for="(item, iIndex) in menu.body"
            :index="index + '-' + iIndex"
            :route="item.link">
            {{ item.text }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import { MenuList } from './../js/configRoutes';

  module.exports = {
    data() {
      return {
        MenuList,
        loading: __GLOBAL__.loading
      }
    },
    computed: {
      defaultActive() {
        var str = "0-0";
        this.MenuList.forEach((menu, index) => {
          menu.body.forEach((item, iIndex) => {
            if (this.$route.path.indexOf(item.link.path) != -1) {
              str = index + '-' + iIndex;
            }
          });
        });
        return str;
      }
    }
  };
</script>
