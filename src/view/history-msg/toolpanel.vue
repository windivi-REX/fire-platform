<template>
  <div>
    <div class="margin-style">
      <el-select style="width:200px" v-model="searchMap.status" placeholder="请选择状态">
        <el-option v-for="(item, index) in statusEntity" :key="index" :label="item" :value="item"></el-option>
      </el-select>
      <el-date-picker
        v-model="searchMap.date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button
        type="primary"
        style="margin-left:10px;"
        icon="el-icon-search"
        @click="listQuery"
      >检索</el-button>
    </div>
    <!-- <div class="margin-style">
      <el-button type="primary" @click="listAddItem" icon="el-icon-plus">新增设备组</el-button>
    </div>-->
  </div>
</template>

<script>
import { EventEntity } from './event';
export default {
  data() {
    return {
      statusEntity: ['在线', '离线', '故障', '报警'],
      searchMap: {
        status: '',
        date: '',
      },
    };
  },
  methods: {
    listQuery() {
      debugger;
      this.searchMap.date.forEach((item, index) => {
        this.searchMap.date[index] = new Date(item).getTime();
      });
      this.$emit(`${EventEntity.listQuery}`, this.searchMap);
    },
    listAddItem() {
      this.$emit(`${EventEntity.listAddItem}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.searchInput {
  width: 200px;
}
.margin-style {
  margin-bottom: 10px;
}
</style>
