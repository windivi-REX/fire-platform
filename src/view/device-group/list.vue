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
      height="570"
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
        label="设备组名称"
        width="100"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        align="center"
        label="联系人"
        width="100"
        prop="contactPersonName"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        align="center"
        label="创建人"
        width="100"
        prop="createrPersonName"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="patrolPersonName"
        label="巡检人"
        width="100"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column align="center" label="短信提醒" width="80">
        <template slot-scope="scope">
          <el-switch
            :disabled="true"
            v-model="scope.row.shortMessageSwitch"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="deviceCount"
        label="设备数量"
        width="100"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="deviceInfos"
        label="设备信息"
        width="120"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="viewListInfo(scope.row)">查看设备信息</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="创建时间"
        width="200"
        :formatter="timeFormatter"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column align="center" prop="manipulation" label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="left">
            <el-button @click="listEditItem(scope.row)" icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="left">
            <el-button @click="listDeleteItem(scope.row)" icon="el-icon-delete"></el-button>
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
    onListQuery(param) {
      this.handlerGetList(param);
    },
    automatchUserName(tableData) {
      this.loadingType = true;
      if (!tableData.length > 0) {
        return;
      }
      if (!this.userList || (this.userList && this.userList.length <= 0)) {
        getUserList({ paramLimit: 999 })
          .then(userRes => {
            if (!userRes.data.rows.length > 0) return;
            this.userList = userRes.data.rows;
            this.matchUserName(tableData, this.userList);
            this.loadingType = false;
          })
          .catch(err => {
            this.$message({
              message: `获取匹配的用户列表时失败${err}`,
              type: 'error',
            });
            this.loadingType = false;
          });
      } else {
        this.matchUserName(tableData, this.userList);
      }
    },
    matchUserName(tableData, userList) {
      tableData.forEach((deviceGroup, index) => {
        const contactPerson = userList.filter(
          user => user.userId === deviceGroup.contactPersonId,
        );
        const createrPerson = userList.filter(
          user => user.userId === deviceGroup.creater,
        );
        const patrolPerson = userList.filter(
          user => user.userId === deviceGroup.patrolPersonId,
        );
        this.$set(deviceGroup, 'contactPersonName', contactPerson[0].name);
        deviceGroup.createrPersonName = createrPerson[0].name;
        deviceGroup.patrolPersonName = patrolPerson[0].name;
      });
    },
    handlerGetList(params = {}) {
      this.loadingType = true;
      getList(params)
        .then(res => {
          this.tableData = res.rows;
          this.automatchUserName(this.tableData);
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
    handlerDeleteList(ids) {
      deleteList(ids)
        .then(res => {
          this.$message({
            message: '删除成功',
            type: 'success',
          });
          this.handlerGetList();
        })
        .catch(err => {
          this.$message({
            message: '删除失败',
            type: 'error',
          });
        });
    },
    listEditItem(item) {
      this.$emit(`${EventEntity.listEditItem}`, item);
    },
    listDeleteItem(item) {
      this.$msgbox({
        title: '删除确认',
        message: `确认删除${item.name}`,
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
      }).then(action => {
        switch (action) {
          case 'confirm':
            this.handlerDeleteList(item.id);
            break;
          case 'cancel':
            break;
          default:
            break;
        }
      });
      this.$emit(`${EventEntity.listDeleteItem}`, item);
    },
    viewListInfo(row) {
      this.$emit(`${EventEntity.viewListInfo}`, row);
    },
    timeFormatter(row, column) {
      const returnTime = new Date(row.createTime).toLocaleString();
      return returnTime;
    },
  },
};
</script>

<style lang='scss' scoped >
.margin-style {
  margin-bottom: 10px;
}
</style>
