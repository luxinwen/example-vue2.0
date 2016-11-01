/*
 * 商品管理-广告设置模块
 */
<template>
  <div class="panel">
    <div class="panel-heading">
      <h4 class="panel-title">广告设置</h4>
    </div>
    <div class="panel-body">
      <div class="panel-content">
        <el-button type="info" @click.native="addAd">新增广告</el-button>
        <span class="help-inline">最多只能添加10个</span>
      </div>
      <div class="panel-content" v-if="AdList.length">
        <ad-cell
          v-for="(item, index) in AdList"
          :ad-cell-data="item"
          :index="index"
          :is-first="index == 0"
          :is-last="index == AdList.length - 1"
          @remove="removeAd(index)"
          @up="upAd(index)"
          @down="downAd(index)">
        </ad-cell>
      </div>
    </div>
    <div class="panel-footer">
      <div class="panel-btns">
        <el-button type="primary" @click.native.prevent="onSubmit" :loading="isLoading.show">保存并发布</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { TipsOption } from './../js/configPublic';
  import AdCell from './GoodsAdCell';

  module.exports = {
    data() {
      return {
        AdList: [],
        AdData: {
          title: '',
          url: '',
          desc: ''
        }
      }
    },
    components: {
      AdCell
    },
    methods: {
      // 新增数据
      addAd() {
        if (this.AdList.length >= 10) {
          this.$alert('最多只能添加10个广告', TipsOption.title, TipsOption.warning);
          return;
        } else {
          let newData = Object.assign({}, this.AdData);
          this.AdList.push(newData);
        }
      },
      // 删除数据
      removeAd(index) {
        if (this.AdList.length <= 1) {
          this.$alert('最少需要保留一个广告模块', TipsOption.title, TipsOption.warning);
          return;
        } else {
          this.$confirm('是否确定删除？', TipsOption.title, TipsOption.warning).then(() => {
            this.AdList.splice(index, 1);
          }).catch(() => {
            // 取消按钮事件
          });
        }
      },
      // 数据排序
      order(current, next) {
        let temp = this.AdList.splice(current, 1)[0];
        this.AdList.splice(next, 0, temp);
      },
      // 上移数据
      upAd(index) {
        if (index == 0) {
          return;
        }
        this.order(index, index - 1);
      },
      // 下移数据
      downAd(index) {
        if (index == this.AdList.length - 1) {
          return;
        }
        this.order(index, index + 1);
      },
      // 保存并发布
      onSubmit() {
        if (!this.AdList.length) {
          this.$alert('请先新增广告', TipsOption.title, TipsOption.warning);
          return false;
        }
        for (let i = 0, l = this.AdList.length; i < l; i++) {
          let item = this.AdList[i];
          if (!item.title.trim()) {
            this.$alert('请先填写广告模块' + (i + 1) + '的标题', TipsOption.title, TipsOption.warning);
            return false;
          }
          if (!item.url.trim()) {
            this.$alert('请先填写广告模块' + (i + 1) + '的链接', TipsOption.title, TipsOption.warning);
            return false;
          }
          if (!item.desc.trim()) {
            this.$alert('请先填写广告模块' + (i + 1) + '的描述', TipsOption.title, TipsOption.warning);
            return false;
          }
        }
        this.$confirm('是否确定保存并发布？', TipsOption.title, TipsOption.warning).then(() => {
          this.showLoading();
          setTimeout(() => {
            this.hideLoading();
            this.$alert('保存并发布成功', TipsOption.title, TipsOption.success).then(() => {
              this.$router.push({
                name: 'GoodsList'
              });
            });
          }, 2000);
        }).catch(() => {
          // 取消按钮事件
        });
      }
    }
  };
</script>
