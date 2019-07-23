<template>
  <div>
    <div class="margin-style">
      <el-input style="width:200px;" v-model="searchMap.name" placeholder="请输入设备组名称"></el-input>
      <el-button
        type="primary"
        style="margin-left:10px;"
        icon="el-icon-search"
        @click="listQuery"
      >检索</el-button>
    </div>
    <div class="margin-style">
      <el-button type="primary" @click="listAddItem" icon="el-icon-plus">新增设备组</el-button>
    </div>
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
