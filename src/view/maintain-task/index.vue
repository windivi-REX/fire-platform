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
.text-style {
  text-align: right;
  line-height: 0;
}
</style>
<template>
  <el-card class="box-card">
    <!-- 标题 -->
    <div class="margin-style">维修任务</div>
    <!-- 搜索功能 -->
    <div class="margin-style">
      <el-select v-model="equipmentTyle" clear placeholder="请选择设备类型">
        <el-option
          v-for="item in EquipmentTypeOption"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-select style="margin-left:10px;" v-model="maintainWey" clear placeholder="维修方式">
        <el-option
          v-for="item in pollingList"
          :key="item.id"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
      <!-- <el-input style="width:200px;margin-left:10px;" v-model="searchValue" placeholder="请输入计划名称"></el-input>
      <el-input style="width:200px;margin-left:10px;" v-model="searchNum" placeholder="请输入设备编号"></el-input>-->
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
      <el-table-column align="center" prop="maintainObject" label="维修对象"></el-table-column>
      <el-table-column align="center" prop="deviceNumber" label="设备编号"></el-table-column>
      <el-table-column align="center" prop="location" label="安装位置"></el-table-column>
      <el-table-column align="center" prop="patrolDescribe" label="巡检描述"></el-table-column>
      <el-table-column align="center" prop="declareTime" label="申报时间"></el-table-column>
      <el-table-column align="center" prop="maintenanceManner" label="维修方式"></el-table-column>
      <el-table-column align="center" prop="maintenanceManner" label="附件"></el-table-column>
      <el-table-column align="center" prop="maintenanceResult" label="维修结果"></el-table-column>
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
          <el-form-item label="设备对象" prop="equipmentObj">
            <el-select v-model="pollingData.equipmentObj" placeholder="请选择设备对象">
              <el-option
                v-for="item in EquipmentTypeOption"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="维修方式" prop="way">
            <el-select v-model="pollingData.way" placeholder="请选择维修方式">
              <el-option
                v-for="item in pollingList"
                :key="item.id"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申报时间" prop="date">
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="pollingData.date"
              type="datetime"
              placeholder="选择申报时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="维修结果" prop="result">
            <el-input v-model="pollingData.result" placeholder="请输入维修结果"></el-input>
          </el-form-item>
          <el-form-item label="维修描述" prop="describe">
            <el-input
              resize="none"
              :rows="5"
              maxlength="300"
              type="textarea"
              v-model="pollingData.describe"
              placeholder="请输入维修描述"
            ></el-input>
            <p class="text-style">{{pollingData.describe.length}}/300</p>
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
  getMaintainList,
  getMaintainWayList,
  addMaintain,
  modificationMaintain,
  deleteMaintain,
} from '../../api/maintain-task.js';
export default {
  data() {
    return {
      addPersonnelType: false, // 添加巡检人员弹框
      loadingType: false,
      operationTitle: '新增计划', //弹框 title
      dialogVisible: false, // 新增 和编辑等操作弹框状态
      currentPage4: 1,
      pollingData: {
        date: '',
        equipmentObj: '',
        way: '',
        result: '',
        describe: '',
      }, // 表单
      timecsd: '',
      rules: {
        date: [{ required: true, message: '选择日期时间', trigger: 'blur' }],
        equipmentObj: [
          { required: true, message: '请选择设备对象', trigger: 'blur' },
        ],
        way: [{ required: true, message: '请选择维修方式', trigger: 'blur' }],
        result: [
          { required: true, message: '请输入维修结果', trigger: 'blur' },
        ],
        describe: [
          { required: true, message: '请输入维修描述', trigger: 'blur' },
        ],
      }, // 验证
      tableData: [], //列表数据
      paramLimit: 10, // 一页的条数
      paramOffset: 0, // 每页的一条
      allPage: 0, //列表总条数
      itemId: 0, // 列表子项id
      searchValue: '', // 计划名称
      searchNum: '', //搜索编号
      EquipmentTypeOption: [],
      optionValue: '',
      recordNameList: null,
      pollingList: null, // 巡检对象列表
      equipmentTyle: '',
      maintainWey: '',
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
      let { data } = await getMaintainWayList();
      this.pollingList = data.maintenanceManners;
      this.EquipmentTypeOption = data.deviceInfoDOS;
    },
    // 搜索
    searchData() {
      this.pollingData.way = this.maintainWey;
      this.pollingData.equipmentObj = this.equipmentTyle;
      this.loadingType = true;
      this.getTableList();
      this.loadingType = false;
      this.resetInput();
    },
    //输入框 重置
    resetInput() {
      this.pollingData = {
        date: '',
        equipmentObj: '',
        way: '',
        result: '',
        describe: '',
      };
      this.pollingData.way = '';
      this.pollingData.equipmentObj = '';
      this.maintainWey = '';
      this.equipmentTyle = '';
    },
    // 获取设备列表
    async getTableList() {
      let { data } = await getMaintainList({
        paramLimit: this.paramLimit,
        paramOffset: this.paramOffset,
        maintenanceManner: this.pollingData.way,
        deviceId: this.pollingData.equipmentObj,
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
      this.loadingType = true;
      if (item === 1) {
        this.resetInput();
        this.operationTitle = '新增维修任务';
      } else {
        this.operationTitle = '编辑维修任务';
        this.itemId = item.id;
        this.pollingData = {
          equipmentObj: item.maintainObjectId,
          date: item.declareTime,
          describe: item.patrolDescribe,
          result: item.maintenanceResult,
          way: item.maintenanceManner,
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
          deleteMaintain(item.id).then(res => {
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
          if (this.operationTitle === '新增维修任务') {
            addMaintain({
              deviceId: this.pollingData.equipmentObj,
              declareTime: this.pollingData.date,
              patrolDescribe: this.pollingData.describe,
              maintenanceResult: this.pollingData.result,
              maintenanceManner: this.pollingData.way,
            }).then(res => {
              if (res.code === 200) {
                this.loadingType = true;
                this.resetInput();
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
            modificationMaintain(
              {
                deviceId: this.pollingData.equipmentObj,
                declareTime: this.pollingData.date,
                patrolDescribe: this.pollingData.describe,
                maintenanceResult: this.pollingData.result,
                maintenanceManner: this.pollingData.way,
              },
              this.itemId,
            ).then(res => {
              if (res.code === 200) {
                this.loadingType = true;
                this.resetInput();
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
