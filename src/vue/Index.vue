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
      right: 0;
      height: 70px;
      line-height: 70px;
      padding: 0 20px;
      background-color: @headBg;
      color: @headFontColor;
      h1 {
        margin: 0;
        font-size: 24px;
      }
      .user-info {
        padding-right: 10px;
        font-size: 16px;
      }
    }
    .sidebar {
      position: fixed;
      z-index: 499;
      top: 70px;
      bottom: 0;
      left: 0;
      width: 200px;
      background-color: @sidebarBg;
      border-right: 1px solid @borderColor;
      overflow: auto;
    }
    .main-content {
      margin-top: 70px;
      margin-left: 200px;
      padding: 20px 20px 0;
    }
  }
</style>

<template>
  <div id="app" class="wrapper" v-loading.fullscreen="loading.show">
    <div class="header">
      <el-row>
        <el-col :span="12">
          <h1>后台管理系统</h1>
        </el-col>
        <el-col :span="12" class="text-right">
          <span class="user-info">hi, user</span>
          <el-button @click.native="onChange">修改密码</el-button>
          <el-button @click.native="onLogout">退出登录</el-button>
        </el-col>
      </el-row>
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
  import { TipsOption } from './../js/configPublic';

  module.exports = {
    data() {
      return {
        MenuList,
        loading: __GLOBAL__.loading
      }
    },
    computed: {
      defaultActive() {
        var str = '0';
        this.MenuList.forEach((menu, index) => {
          menu.body.forEach((item, iIndex) => {
            if (this.$route.path.indexOf(item.link.path) != -1) {
              str = index + '-' + iIndex;
            }
          });
        });
        return str;
      }
    },
    methods: {
      // 修改密码
      onChange() {
        this.$router.push({
          name: 'UserChangePwd'
        });
      },
      // 退出登录
      onLogout() {
        this.$confirm('是否确定退出登录？', TipsOption.title, TipsOption.warning).then(() => {
          this.showLoading();
          setTimeout(() => {
            this.hideLoading();
            this.$router.push({
              name: 'GoodsList'
            });
          }, 2000);
        }).catch(() => {
          //
        });
      }
    }
  };
</script>
