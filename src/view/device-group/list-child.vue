<template>
  <div>
    <el-table
      ref="list"
      v-loading="loadingType"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      class="margin-style"
      :data="tableData"
      border
      style="width: 100%;"
      @selection-change="selectionChange"
      height="450"
    >
      <el-table-column align="center" type="selection" width="50"></el-table-column>
      <el-table-column align="center" type="index" :index="(index)=> index" label="序号" width="50"></el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="设备名称"
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
      <el-table-column
        align="center"
        prop="typeName"
        label="类型名称"
        width="200"
        :show-overflow-tooltip="true"
      ></el-table-column>
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
      class="margin-style"
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
import { getChildList } from '../../api/device-group';
import { EventEntity } from './event';
export default {
  props: {
    formMap: {
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      loadingType: false,
      selectedRows: [],
    };
  },
  watch: {
    formMap: {
      handler(newVal, oldVal) {
        this.handlergetChildList({ id: newVal.id });
      },
    },
  },
  async mounted() {
    this.registerListeners();
    await this.handlergetChildList({ id: this.formMap.id });
  },
  methods: {
    registerListeners() {
      this.$on(`${EventEntity.afterEditSuccess}`, this.onAfterEditSuccess);
      this.$on(`${EventEntity.listQuery}`, this.onListQuery);
    },
    onListQuery(param) {
      this.handlergetChildList(param);
    },
    handlergetChildList(params = {}) {
      this.loadingType = true;
      getChildList(params)
        .then(res => {
          this.tableData = res.data;
          this.loadingType = false;
          this.$nextTick(() => {
            this.toggleSelection(this.formMap);
          });
        })
        .catch(err => {
          this.$message({
            message: `${err},获取列表数据失败`,
            type: 'error',
          });
          this.loadingType = false;
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    toggleSelection(form) {
      if (form && form.deviceInfos.length > 0) {
        const { deviceInfos } = form;
        deviceInfos.forEach(info => {
          this.$refs.list.toggleRowSelection(
            this.tableData.filter(row => row.id === info.id)[0],
          );
        });
      } else {
        this.$refs.list.clearSelection();
      }
    },
    selectionChange(selectedRows) {
      this.selectedRows = selectedRows;
      this.$emit(`${EventEntity.childListSelectionChange}`, selectedRows);
    },
  },
};
</script>

<style lang="scss" scoped>
.margin-style {
  margin-bottom: 10px;
}
</style>
