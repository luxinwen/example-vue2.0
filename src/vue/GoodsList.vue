/*
 * 商品管理-商品列表模块
 */
<template>
  <div class="panel">
    <div class="panel-heading">
      <h4 class="panel-title">商品列表</h4>
    </div>
    <div class="panel-body">
      <div class="panel-content">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-button type="info" @click.native="addGoods">新增商品</el-button>
          </el-col>
          <el-col :span="20" class="text-right">
            <el-form :inline="true" class="noneMargin">
              <el-form-item>
                <el-input placeholder="审批人"></el-input>
              </el-form-item>
              <el-form-item>
                <el-select placeholder="活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="info" @click="searchGoods">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <div class="panel-content">
        <el-table
          :data="GoodsList"
          @selection-change="selectionChange"
          border
          class="fullWidth">
          <el-table-column
            type="selection"
            width="50">
          </el-table-column>
          <el-table-column
            property="date"
            label="日期"
            width="120">
          </el-table-column>
          <el-table-column
            property="name"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            property="province"
            label="省份"
            width="120">
          </el-table-column>
          <el-table-column
            property="city"
            label="市区"
            width="120">
          </el-table-column>
          <el-table-column
            property="address"
            label="地址">
          </el-table-column>
          <el-table-column
            property="zip"
            label="邮编"
            width="120">
          </el-table-column>
          <el-table-column
            inline-template
            label="操作"
            width="100"
            align="center">
            <div>
              <a class="btn-link" @click="editGoods(row)">编辑</a>
              <a class="btn-link" @click="removeGoods(row, column, $index)">删除</a>
            </div>
          </el-table-column>
        </el-table>
      </div>
      <div class="panel-content text-right">
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="5"
          :page-size="20"
          layout="total, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { GoodsList, AjaxUrl } from './../js/configPublic';

  module.exports = {
    data() {
      return {
        GoodsList: [],
        multipleSelection: []
      }
    },
    methods: {
      // 添加数据
      addGoods() {
        this.$router.push({
          name: 'GoodsEdit'
        });
      },
      // 搜索数据
      searchGoods() {
        console.log('search');
      },
      // 编辑数据
      editGoods(row) {
        this.$router.push({
          name: 'GoodsEdit'
        });
      },
      // 删除数据
      removeGoods(row, column, $index) {
        this.confirm('是否确定删除？').then(() => {
          this.showLoading();
          setTimeout(() => {
            this.hideLoading();
            this.GoodsList.splice($index, 1);
            this.alert('删除成功', 'success');
          }, 2000);
        }).catch(() => {
          // 取消按钮事件
        });
      },
      // 更改每页显示条数
      sizeChange(val) {
        console.log(val);
      },
      // 切换当前页码
      currentChange(val) {
        console.log(val);
      },
      // 多选数据
      selectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection);
      },
      // 获取初始数据
      getData() {
        this.GoodsList = GoodsList;
        return;

        this.ajax({
          url: AjaxUrl.getHomePageInfo
          // hideError: true // 如果需要隐藏RETURN_CODE != 'S0A00000'的提示框，则设置值为true，默认是false
          // hideLoading: true // 如果需要隐藏loading框，则设置值为true，默认是false
        }).done((data) => {
          // 此处一般仅需要对CODE=S0A00000时进行处理
          if (data.RETURN_CODE == 'S0A00000') {
            this.GoodsList = GoodsList;
          }
        });
      }
    },
    created() {
      this.getData();
    }
  };
</script>
