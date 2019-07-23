<template>
  <div>
    <el-table
      v-loading="loadingType"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      class="margin-style"
      :data="tableData"
      border
      style="width: 100%;"
      height="670"
    >
      <el-table-column
        align="center"
        type="index"
        :index="(index)=> index"
        label="序号"
        width="50"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="设备名称"
        :formatter="customFormtter"
        width="100"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column align="center" label="所属设备组信息" width="300" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>
            设备组编号:{{scope.row.deviceGroup || '暂无'}}
            设备组名称:{{scope.row.deviceGroupName || '暂无'}}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="经纬度" width="250" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>
            经度:{{scope.row.longitude || '暂无'}},
            纬度:{{scope.row.latitude || '暂无'}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="model"
        label="设备型号"
        width="100"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="serialNum"
        label="序列号"
        width="100"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="status"
        label="状态"
        width="80"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <!-- <el-table-column
        align="center"
        prop="typeName"
        label="类型名称"
        width="200"
        :show-overflow-tooltip="true"
      ></el-table-column>-->
      <el-table-column
        align="center"
        prop="vendor"
        label="设备厂商"
        width="100"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column align="center" prop="address" label="地址" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column align="center" prop="desc" label="描述" :show-overflow-tooltip="true"></el-table-column>
    </el-table>
    <el-pagination
      style="text-align: right;"
      :total="tableData.length"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
    ></el-pagination>
  </div>
</template>

<script>
import { getList, putList, deleteList } from '../../api/device-group';
import { getUserList } from '../../api/user-management';
import { EventEntity } from './event';
export default {
  name: 'DeviceList',
  data() {
    return {
      tableData: [],
      currentPage: 1,
      loadingType: false,
    };
  },
  async mounted() {
    this.registerListeners();
  },
  methods: {
    registerListeners() {
      this.$on(`${EventEntity.nextMessage}`, this.onNextMessage);
    },
    onListQuery(param) {
      this.handlerGetList(param);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    onNextMessage(msg) {
      this.tableData.push(msg);
    },
    timeFormatter(row, column) {
      const returnTime = new Date(row.createTime).toLocaleString();
      return returnTime;
    },
    customFormtter(row, column, val) {
      if (!val) {
        return '暂无';
      } else {
        return val;
      }
    },
  },
};
</script>

<style lang='scss' scoped >
.margin-style {
  margin-bottom: 10px;
}
</style>
