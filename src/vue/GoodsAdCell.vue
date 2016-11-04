/*
 * 商品管理-广告设置-单元模块
 */
<template>
  <div class="content-main list-complete-item">
    <div class="content-head">
      <h4 class="content-title"><i :class="[isShow ? 'el-icon-arrow-down' : 'el-icon-arrow-right']" @click="toggle"></i> 广告模块{{ index + 1 }}</h4>
      <div class="content-btns">
        <el-button icon="caret-top" @click.native="$emit('up')" :disabled="isFirst">上移</el-button>
        <el-button icon="caret-bottom" @click.native="$emit('down')" :disabled="isLast">下移</el-button>
        <el-button icon="delete" @click.native="$emit('remove')">删除</el-button>
      </div>
    </div>
    <div class="content-body" v-show="isShow">
      <el-form :model="adCellData" label-width="100px">
        <el-form-item label="标题">
          <el-input v-model="adCellData.title" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="adCellData.url" :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="adCellData.desc" :maxlength="200" :autosize="{minRows: 2, maxRows: 6}"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  module.exports = {
    props: {
      adCellData: {
        type: Object,
        default: {
          title: '',
          url: '',
          desc: ''
        }
      },
      index: {
        type: Number,
        default: 0
      },
      isFirst: {
        type: Boolean,
        default: false
      },
      isLast: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: true
      }
    },
    methods: {
      // 切换显示隐藏
      toggle() {
        this.isShow = !this.isShow
      }
    }
  };
</script>
