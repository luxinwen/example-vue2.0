/*
 * 商品管理-新增商品模块
 */
<template>
  <div class="panel">
    <div class="panel-heading">
      <h4 class="panel-title">新增商品</h4>
    </div>
    <div class="panel-body">
      <div class="panel-content">
        <el-form :model="form" label-width="100px">
          <el-form-item label="活动名称" required>
            <el-input v-model="form.name" :maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="form.region" placeholder="请选择活动区域" clearable>
              <el-option label="北京" value="bj"></el-option>
              <el-option label="上海" value="sh"></el-option>
              <el-option label="广州" value="gz"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date" class="fullWidth"></el-date-picker>
            </el-col>
            <el-col :span="2" class="text-center">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间" v-model="form.time" class="fullWidth"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="是否启动">
            <el-radio-group v-model="form.radio">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动品牌">
            <el-select v-model="form.brand" filterable clearable>
              <el-option
                v-for="item in brandList"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="panel-footer">
      <div class="panel-btns">
        <el-button type="primary" @click.native.prevent="onSubmit" :loading="loading">保存并发布</el-button>
        <el-button type="danger" @click.native="onReset">重置</el-button>
        <el-button type="danger" @click.native="onCancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { TipsOption } from './../js/configParams';

  module.exports = {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date: '',
          time: '',
          radio: '',
          brand: ''
        },
        brandList: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        loading: false
      }
    },
    methods: {
      onSubmit() {
        console.log(this.form);
        if (!this.form.name.trim()) {
          this.$alert('请填写活动名称', TipsOption.title, TipsOption.warning);
          return false;
        }
        if (!this.form.region) {
          this.$alert('请选择活动区域', TipsOption.title, TipsOption.warning);
          return false;
        }
        if (!this.form.date) {
          this.$alert('请填写活动时间', TipsOption.title, TipsOption.warning);
          return false;
        }
        if (!this.form.radio) {
          this.$alert('请选择是否启动', TipsOption.title, TipsOption.warning);
          return false;
        }
        if (!this.form.brand) {
          this.$alert('请选择活动品牌', TipsOption.title, TipsOption.warning);
          return false;
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
        });
      },
      onReset() {
        this.$confirm('是否确定重置？', TipsOption.title, TipsOption.warning).then(() => {
          this.form.name = '';
          this.form.region = '';
          this.form.date = '';
          this.form.time = '';
          this.form.radio = '';
          this.form.brand = '';
        });
      },
      onCancel() {
        this.$confirm('是否确定取消？', TipsOption.title, TipsOption.warning).then(() => {
          this.$router.push({
            name: 'GoodsList'
          });
        });
      }
    }
  };
</script>
