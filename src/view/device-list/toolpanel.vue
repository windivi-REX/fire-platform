<template>
  <div class="margin-style">
    <el-input style="width:200px;" v-model="searchMap.name" placeholder="请输入设备名称"></el-input>
    <el-select style="width:200px" v-model="searchMap.status" placeholder="请选择状态">
      <el-option v-for="(item, index) in statusEntity" :key="index" :label="item" :value="item"></el-option>
    </el-select>
    <el-input style="width:200px;" v-model="searchMap.address" placeholder="请输入地址"></el-input>
    <el-button type="primary" style="margin-left:10px;" icon="el-icon-search" @click="listQuery">检索</el-button>
  </div>
</template>

<script>
import { EventEntity } from './event';
export default {
  data() {
    return {
      statusEntity: ['在线', '离线', '故障', '报警'],
      searchMap: {
        name: '',
        status: '',
        address: '',
      },
    };
  },
  methods: {
    listQuery() {
      this.$emit(`${EventEntity.listQuery}`, this.searchMap);
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
