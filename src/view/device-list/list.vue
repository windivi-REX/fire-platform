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
      height="630"
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
      <el-table-column align="center" prop="manipulation" label="操作" width="80">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="left">
            <el-button @click="listEditItem($event,scope.row)" icon="el-icon-edit"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
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
import { getList, putList } from '../../api/device-list';
import { EventEntity } from './event';
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      loadingType: false,
    };
  },
  async mounted() {
    this.registerListeners();
    await this.handlerGetList();
  },
  methods: {
    registerListeners() {
      this.$on(`${EventEntity.afterEditSuccess}`, this.onAfterEditSuccess);
      this.$on(`${EventEntity.listQuery}`, this.onListQuery);
    },
    onAfterEditSuccess() {
      this.handlerGetList();
    },
    onListQuery() {
      this.handlerGetList(param);
    },
    handlerGetList(params = {}) {
      this.loadingType = true;
      getList(params)
        .then(res => {
          this.tableData = res.rows;
          this.loadingType = false;
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
    listEditItem($event, item) {
      this.$emit(`${EventEntity.listEditItem}`, item);
    },
    previewSetting(photoBase64) {
      return [
        {
          // src:  `${location.host}${process.env.VUE_APP_DEVICE_PROXY}/${photoBase64}`,
          // msrc: `${location.host}${process.env.VUE_APP_DEVICE_PROXY}/${photoBase64}`,
          //   http://192.168.1.145:8889/api/sys/file/718c93f3-124d-4aa8-8aa4-6de12affd1bc1562664992629circle-big.png
          src: `${process.env.VUE_APP_DEVICE_SERVER}${photoBase64}`,
          msrc: `${process.env.VUE_APP_DEVICE_SERVER}${photoBase64}`,
          alt: '111',
          title: '111',
          w: '200px',
          h: '100px',
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
