<style>
.searchInput {
  width: 200px;
}
.margin-style {
  margin-bottom: 10px;
}
.equipment-num-style {
  color: #409eff;
  cursor: pointer;
}
.equipment-num-style:hover {
  text-decoration: underline;
}
</style>
<template>
  <el-card class="box-card">
    <!-- 标题 -->
    <div class="margin-style">巡检记录</div>
    <!-- 搜索功能 -->
    <div class="margin-style">
      <el-select v-model="optionValue" clear @change="optionChange" placeholder="请选择状态">
        <el-option
          v-for="item in EquipmentTypeOption"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select
        style="margin-left:10px;"
        v-model="pollingData.deviceGroupId"
        clear
        placeholder="请选择巡检对象"
      >
        <el-option v-for="item in pollingList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-input style="width:200px;margin-left:10px;" v-model="searchValue" placeholder="请输入计划名称"></el-input>
      <el-input style="width:200px;margin-left:10px;" v-model="searchNum" placeholder="请输入设备编号"></el-input>
      <el-button
        type="primary"
        style="margin-left:10px;"
        @click="searchData"
        icon="el-icon-search"
      >检索</el-button>
    </div>
    <!-- 功能按钮 -->
    <div class="margin-style">
      <el-button type="primary" @click="operationEquipment(1)" icon="el-icon-plus">新增</el-button>
    </div>
    <!-- 列表数据 -->
    <el-table
      v-loading="loadingType"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      class="margin-style"
      :data="tableData"
      border
      style="width: 100%;"
      height="580"
      :stripe="true"
    >
      <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
      <el-table-column align="center" prop="taskName" label="任务名称"></el-table-column>
      <el-table-column align="center" prop="deviceGroup" label="巡检对象"></el-table-column>
      <el-table-column align="center" prop="deviceNumber" label="设备编号"></el-table-column>
      <el-table-column align="center" prop="patrolStartTime" label="巡检开始时间"></el-table-column>
      <el-table-column align="center" prop="patrolStaffId" label="巡检人员"></el-table-column>
      <el-table-column align="center" prop="patrolTimes" label="巡检次数"></el-table-column>
      <el-table-column align="center" prop="statusName" label="状态"></el-table-column>
      <el-table-column align="center" prop="manipulation" label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button @click="operationEquipment(scope.row)" icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button @click="deleteEquipment(scope.row)" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="text-align: right;"
      :total="allPage"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
    ></el-pagination>
    <!-- 新增或者修改弹框 -->
    <el-dialog
      :title="operationTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div>
        <div style="margin: 20px;"></div>
        <el-form :model="pollingData" :rules="rules" ref="pollingData" label-width="80px">
          <el-form-item label="选择名称" prop="name">
            <el-select v-model="pollingData.name" @change="addOptionChange" placeholder="请选择状态">
              <el-option
                v-for="item in recordNameList"
                :key="item.id"
                :label="item.taskName"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="pollingData.status" placeholder="请选择状态">
              <el-option
                v-for="item in EquipmentTypeOption"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间" prop="date">
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="pollingData.date"
              type="datetime"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="巡检次数" prop="count">
            <el-input-number
              v-model="pollingData.count"
              controls-position="right"
              :min="1"
              :max="100"
            ></el-input-number>
            <span style="margin-left:10px;">次</span>
          </el-form-item>
          <el-form-item label="设备编号" prop="num">
            <el-input v-model="pollingData.num" placeholder="请输入设备编号"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button icon="el-icon-close" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import {
  getRecordList,
  getSchemeList,
  addScheme,
  modificationScheme,
  deletEpatrolRecord,
  getPollingObj,
} from '../../api/polling-record.js';
export default {
  data() {
    return {
      addPersonnelType: false, // 添加巡检人员弹框
      loadingType: false,
      operationTitle: '新增计划', //弹框 title
      dialogVisible: false, // 新增 和编辑等操作弹框状态
      currentPage4: 1,
      pollingData: {
        num: '', // 编号
        id: 0,
        name: '',
        date: '',
        status: '', // 状态
        count: 1,
        deviceGroupId: '',
      }, // 表单
      timecsd:'',
      rules: {
        name: [{ required: true, message: '请选择任务名称', trigger: 'blur' }],
        date: [{ required: true, message: '请选择时间', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态', trigger: 'blur' }],
        count: [{ required: true, message: '请选择次数', trigger: 'blur' }],
        num: [{ required: true, message: '请输入编号', trigger: 'blur' }],
      }, // 验证
      tableData: [], //列表数据
      paramLimit: 10, // 一页的条数
      paramOffset: 0, // 每页的一条
      allPage: 0, //列表总条数
      patrolstaffId: 0, // 设备组id
      itemId: 0, // 列表子项id
      searchValue: '', // 计划名称
      searchNum: '', //搜索编号
      EquipmentTypeOption: [],
      optionValue: '',
      recordNameList: null,
      pollingList: null, // 巡检对象列表
    };
  },
  watch: {
    paramLimit() {
      this.getTableList();
    },
    paramOffset() {
      this.getTableList();
    },
  },
  created() {
    this.getTableList();
    this.getSchemeData();
  },
  computed: {},
  methods: {
    // 获取巡检状态 和 名称 列表 和巡检对象泪飙
    async getSchemeData() {
      let { data } = await getSchemeList();
      let objData = await getPollingObj();
      this.pollingList = objData.data.deviceGroups;
      this.EquipmentTypeOption = data.status;
      this.recordNameList = data.patrolTaskDOS;
    },
    // 状态筛选
    optionChange(val) {
      this.pollingData.taskType = val;
    },
    // 添加的状态
    addOptionChange(val) {
      this.pollingData.id = val.id;
      this.pollingData.name = val.taskName;
    },
    // 搜索
    searchData() {
      this.loadingType = true;
      this.pollingData.name = this.searchValue;
      this.pollingData.num = this.searchNum;
      this.getTableList();
      this.searchValue = '';
      this.searchNum = '';
      this.pollingData.name = '';
      this.pollingData.num = '';
      this.loadingType = false;
      this.pollingData.taskType = '';
      this.optionValue = '';
      this.pollingData.deviceGroupId = '';
    },
    //输入框 重置
    resetInput() {
      this.pollingData = {
        num: '',
        date: '',
        id: '',
        name: '',
        status: '',
        count: '',
        date: '',
      };
      this.patrolstaffId = 0;
    },
    // 获取设备列表
    async getTableList() {
      let { data } = await getRecordList({
        paramLimit: this.paramLimit,
        paramOffset: this.paramOffset,
        taskName: this.pollingData.name,
        status: this.pollingData.taskType,
        deviceNumber: this.pollingData.num,
        deviceGroupId: this.pollingData.deviceGroupId,
      });
      this.tableData = data.rows;
      this.allPage = data.total;
    },
    // 获取 时间
    getTimeValue(item) {
      let startTime = new Date(item.patrolStartTime);
      // 开始时间
      let startYear = startTime.getFullYear();
      let startMonth =
        startTime.getMonth() < 10
          ? '0' + startTime.getMonth()
          : startTime.getMonth();
      let startDate =
        startTime.getDate() < 10
          ? '0' + startTime.getDate()
          : startTime.getDate();
      let startHours =
        startTime.getHours() < 10
          ? '0' + startTime.getHours()
          : startTime.getHours();
      let startMinutes =
        startTime.getMinutes() < 10
          ? '0' + startTime.getMinutes()
          : startTime.getMinutes();
      let startSeconds =
        startTime.getSeconds() < 10
          ? '0' + startTime.getSeconds()
          : startTime.getSeconds();
      let timeArr = `${startYear}-${startMonth}-${startDate} ${startHours}:${startMinutes}:${startSeconds}`;
      return timeArr;
    },
    // 新增 和编辑等操作
    operationEquipment(item) {
      console.log(item)
      this.loadingType = true;
      if (item === 1) {
        this.resetInput();
        this.operationTitle = '新增巡检记录';
        this.pollingData.name = '';
      } else {
        let timearr = this.getTimeValue(item);
        this.operationTitle = '编辑巡检记录';
        this.itemId = item.id;
        this.pollingData = {
          num: item.deviceNumber,
          date: timearr,
          id: item.schemeId,
          name: item.taskName,
          status: item.status,
          count: item.patrolTimes,
        };
      }
      this.loadingType = false;
      this.dialogVisible = true;
    },
    //删除 设备
    deleteEquipment(item) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deletEpatrolRecord(item.id).then(res => {
            if (res.code === 200) {
              if (this.tableData.length === 1) {
                this.paramOffset = this.paramOffset - this.paramLimit;
                this.currentPage4 - 1;
              }
              this.getTableList();
              this.resetInput();
              this.$message({
                type: 'success',
                message: '删除成功!',
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    handleSizeChange(val) {
      this.paramLimit = val;
    },
    handleCurrentChange(val) {
      this.paramOffset = (val - 1) * this.paramLimit;
      this.currentPage4 - val;
    },
    // 新增提交
    submitForm() {
      this.$refs.pollingData.validate(valid => {
        if (valid) {
          if (this.operationTitle === '新增巡检记录') {
            addScheme({
              status: this.pollingData.status,
              patrolStartTime: this.pollingData.date,
              taskName: this.pollingData.name,
              schemeId: this.pollingData.id,
              deviceNumber: this.pollingData.num,
              patrolTimes: this.pollingData.count,
            }).then(res => {
              if (res.code === 200) {
                this.loadingType = true;
                this.pollingData.name = '';
                this.pollingData.num = '';
                this.getTableList();
                this.$message({
                  type: 'success',
                  message: '新增成功',
                });
                this.loadingType = false;
              } else {
                this.$message({
                  type: 'error',
                  message: '新增失败',
                });
              }
            });
          } else {
            modificationScheme(
              {
                status: this.pollingData.status,
                patrolStartTime: this.pollingData.date,
                taskName: this.pollingData.name,
                schemeId: this.pollingData.id,
                deviceNumber: this.pollingData.num,
                patrolTimes: this.pollingData.count,
              },
              this.itemId,
            ).then(res => {
              if (res.code === 200) {
                this.loadingType = true;
                this.pollingData.name = '';
                this.pollingData.num = '';
                this.getTableList();
                this.$message({
                  type: 'success',
                  message: '编辑成功',
                });
                this.resetInput();
                this.loadingType = false;
              } else {
                this.$message({
                  type: 'error',
                  message: '编辑失败',
                });
              }
            });
          }
          this.dialogVisible = false;
        } else {
          this.$message({
            type: 'error',
            message: '操作失败',
          });
          return false;
        }
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
  },
};
</script>
