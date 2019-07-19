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
    <div class="margin-style">巡检任务</div>
    <!-- 搜索功能 -->
    <div class="margin-style">
      <el-select v-model="optionValue" clear @change="optionChange" placeholder="请选择任务状态">
        <el-option
          v-for="item in EquipmentTypeOption"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input style="width:200px;margin-left:10px;" v-model="searchValue" placeholder="请输入计划名称"></el-input>
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
      <el-button type="primary" icon="el-icon-tickets" disabled>派单</el-button>
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
      <el-table-column align="center" prop="startTime" label="开始时间"></el-table-column>
      <el-table-column align="center" prop="endTime" label="结束时间"></el-table-column>
      <el-table-column align="center" prop="taskType" label="任务类型"></el-table-column>
      <el-table-column align="center" prop="status" label="状态"></el-table-column>
      <el-table-column align="center" prop="patrolStaff" label="巡检人员"></el-table-column>
      <el-table-column align="center" prop="deviceGroup" label="巡检对象"></el-table-column>
      <el-table-column align="center" prop="deviceQuantity" label="设备数量"></el-table-column>
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
          <el-form-item label="计划名称" prop="name">
            <el-input v-model="pollingData.name" placeholder="请输入计划名称"></el-input>
          </el-form-item>
          <el-form-item label="日期" prop="date">
            <el-date-picker
              style="width:100%"
              v-model="pollingData.date"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="任务开始" prop="beginTask">
            <el-input-number
              v-model="pollingData.beginTask"
              controls-position="right"
              :min="1"
              :max="10"
            ></el-input-number>
            <span style="margin-left:10px;">天内按时完成</span>
          </el-form-item>
          <el-form-item label="巡检对象" prop="objData">
            <el-input
              :readonly="true"
              v-model="pollingData.objData"
              style="width:200px;"
              placeholder="请选择设备组"
            ></el-input>
            <el-button style="margin-left:20px;" @click="chooseEquipment" type="primary">请选择设备组</el-button>
          </el-form-item>
          <el-form-item label="巡检人员" prop="personnel">
            <el-input
              :readonly="true"
              v-model="pollingData.personnel"
              style="width:200px;"
              placeholder="请添加巡检人员"
            ></el-input>
            <el-button style="margin-left:20px;" @click="addPersonnel" type="primary">添加巡检人员</el-button>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button icon="el-icon-close" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 穿梭框弹框 -->
    <el-dialog title="设备组关联" :visible.sync="equipmentType" width="30%" :before-close="handleClose2">
      <el-transfer :props="defaultData" filterable v-model="patrolStaffValue" :data="personnelData"></el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="equipmentType = false">取 消</el-button>
        <el-button type="primary" @click="getGroupValue">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加巡检人员弹框 -->
    <el-dialog
      title="编辑巡检人员"
      :visible.sync="addPersonnelType"
      width="50%"
      :before-close="handleClose3"
    >
      <div style="height:500px;overflow-y: scroll;">
        <el-table
          ref="multipleTable"
          :data="pollingList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" align="center" label="序号"></el-table-column>
          <el-table-column align="center" prop="name" label="姓名"></el-table-column>
          <el-table-column align="center" prop="deptName" label="部门"></el-table-column>
          <el-table-column align="center" prop="mobile" label="电话"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPersonnelType = false">取 消</el-button>
        <el-button type="primary" @click="addPolling">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import {
  getPatrolList,
  getPatrolstaff,
  getPatrolStaffList,
  addEquipmentGroup,
  modificationEquipmentGroup,
  deleteEquipmentGroup,
  getEquipmentType,
} from '../../api/patrol-task.js';
export default {
  data() {
    return {
      addPersonnelType: false, // 添加巡检人员弹框
      personnelData: null, // 穿梭框列表
      patrolStaffValue: null, // 穿梭框值
      pollingList: null, // 巡检人员列表
      pollingValue: [], // 巡检人员值
      pollingSaveData: null, // 巡检人员选择的数组
      defaultData: {
        key: 'id',
        label: 'name',
      },
      equipmentType: false, //设备组弹框
      loadingType: false,
      operationTitle: '新增计划', //弹框 title
      dialogVisible: false, // 新增 和编辑等操作弹框状态
      currentPage4: 1,
      pollingData: {
        name: '',
        date: [],
        taskType: '', //任务类型
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        status: '0', // 状态
        objData: '', // 巡检对象
        amount: 0, // 设备数量
        beginTask: 1, //任务开始的天数
        personnel: '', //巡检人员
      }, // 表单
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        date: [{ required: true, message: '请选择时间', trigger: 'blur' }],
        objData: [{ required: true, message: '请选择设备组', trigger: 'blur' }],
        beginTask: [
          { required: true, message: '请选择开始天数', trigger: 'blur' },
        ],
        personnel: [
          { required: true, message: '请添加巡检人员', trigger: 'blur' },
        ],
      }, // 验证
      tableData: [], //列表数据
      paramLimit: 10, // 一页的条数
      paramOffset: 0, // 每页的一条
      allPage: 0, //列表总条数
      patrolstaffId: 0, // 设备组id
      itemId: 0, // 列表子项id
      showList: [],
      searchValue: '',
      EquipmentTypeOption: [],
      optionValue: '',
      propsDefault: {
        value: 'value',
        label: 'name',
      },
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
    this.getPatrolstaffList();
    this.getPatrolStaffTable();
    this.equipmentTypeList();
  },
  computed: {},
  methods: {
    // 状态筛选
    optionChange(val) {
      this.pollingData.taskType = val;
    },
    // 获取任务状态列表
    async equipmentTypeList() {
      let { data } = await getEquipmentType();
      this.EquipmentTypeOption = data;
    },
    // 搜索
    searchData() {
      this.loadingType = true;
      this.pollingData.name = this.searchValue;
      this.getTableList();
      this.searchValue = '';
      this.pollingData.name = '';
      this.loadingType = false;
      this.pollingData.taskType = '';
      this.optionValue = '';
    },
    //输入框 重置
    resetInput() {
      this.pollingData = {
        name: '',
        date: [],
        taskType: '', //任务类型
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        status: '0', // 状态
        objData: '', // 巡检对象
        amount: '0', // 设备数量
        beginTask: 1, //任务开始的天数
        personnel: '', //巡检人员
      };
      this.patrolstaffId = 0;
      this.patrolStaffValue.length = 0;
      this.pollingValue.length = 0;
      this.showList.length = 0;
    },
    // 获取巡检人员列表
    async getPatrolStaffTable() {
      let { data, expand } = await getPatrolStaffList({
        id: this.patrolstaffId,
      });
      this.pollingList = data;
      this.pollingValue = expand.patrolStaffIds;
    },
    // 获取设备组 value
    getGroupValue() {
      this.pollingData.objData = '';
      if (this.personnelData.length) {
        for (let i = 0; i < this.patrolStaffValue.length; i++) {
          for (let j = 0; j < this.personnelData.length; j++) {
            if (i === j) {
              this.pollingData.objData += this.personnelData[j].name + ';';
            }
          }
        }
      }
      this.equipmentType = false;
    },
    // 获取 设备组列表与所选项
    async getPatrolstaffList() {
      let { data, expand } = await getPatrolstaff({ id: this.patrolstaffId });
      this.personnelData = data;
      this.patrolStaffValue = expand.deviceGroupIds;
    },
    // 获取设备列表
    async getTableList() {
      let { data } = await getPatrolList({
        paramLimit: this.paramLimit,
        paramOffset: this.paramOffset,
        taskName: this.pollingData.name,
        taskType: this.pollingData.taskType,
      });
      this.tableData = data.rows;
      this.allPage = data.total;
    },
    // 添加巡检人员弹框
    addPersonnel() {
      if (this.pollingValue.length) {
        this.showList.length = 0;
        for (let i = 0; i < this.pollingValue.length; i++) {
          for (let j = 0; j < this.pollingList.length; j++) {
            if (this.pollingValue[i] == this.pollingList[j].userId) {
              this.showList.push(this.pollingList[j]);
            }
          }
        }
      }
      this.addPersonnelType = true;
      this.$nextTick(() => {
        if (this.showList) {
          this.showList.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        }
      });
    },
    // 选择设备组
    chooseEquipment(item) {
      this.equipmentType = true;
    },
    // 获取 开始和结束事件
    getTime(item) {
      let startTime = new Date(item.startTime);
      let endTime = new Date(item.endTime);
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
      // 结束时间
      let endYear = endTime.getFullYear();
      let endMonth =
        endTime.getMonth() < 10 ? '0' + endTime.getMonth() : endTime.getMonth();
      let endDate =
        endTime.getDate() < 10 ? '0' + endTime.getDate() : endTime.getDate();
      let endHours =
        endTime.getHours() < 10 ? '0' + endTime.getHours() : endTime.getHours();
      let endMinutes =
        endTime.getMinutes() < 10
          ? '0' + endTime.getMinutes()
          : endTime.getMinutes();
      let endSeconds =
        endTime.getSeconds() < 10
          ? '0' + endTime.getSeconds()
          : endTime.getSeconds();
      let timeArr = [
        `${startYear}-${startMonth}-${startDate} ${startHours}:${startMinutes}:${startSeconds}`,
        `${endYear}-${endMonth}-${endDate} ${endHours}:${endMinutes}:${endSeconds}`,
      ];
      return timeArr;
    },
    // 新增 和编辑等操作
    operationEquipment(item) {
      this.loadingType = true;
      if (item === 1) {
        this.resetInput();
        this.operationTitle = '新增设备组';
        this.pollingData.name = '';
      } else {
        let timearr = this.getTime(item);
        this.patrolstaffId = item.id;
        this.getPatrolstaffList();
        this.getPatrolStaffTable();
        this.operationTitle = '编辑设备组';
        this.itemId = item.id;
        this.pollingData = {
          name: item.taskName,
          date: timearr,
          taskType: '', //任务类型
          startTime: item.startTime, // 开始时间
          endTime: item.endTime, // 结束时间
          status: item.status, // 状态
          objData: item.deviceGroup, // 巡检对象
          amount: item.deviceQuantity, // 设备数量
          beginTask: item.taskTime, //任务开始的天数
          personnel: item.patrolStaff, //巡检人员
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
          deleteEquipmentGroup(item.id).then(res => {
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
          if (this.operationTitle === '新增设备组') {
            addEquipmentGroup({
              deviceGroup: this.patrolStaffValue.join(','),
              patrolStaff: this.pollingValue.join(','),
              startTime: this.pollingData.date[0],
              endTime: this.pollingData.date[1],
              taskName: this.pollingData.name,
              status: this.pollingData.status,
              taskTime: this.pollingData.beginTask,
            }).then(res => {
              if (res.code === 200) {
                this.loadingType = true;
                this.pollingData.name = '';
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
            modificationEquipmentGroup(
              {
                deviceGroup: this.patrolStaffValue.join(','),
                patrolStaff: this.pollingValue.join(','),
                startTime: this.pollingData.date[0],
                endTime: this.pollingData.date[1],
                taskName: this.pollingData.name,
                status: this.pollingData.status,
                taskTime: this.pollingData.beginTask,
              },
              this.itemId,
            ).then(res => {
              if (res.code === 200) {
                this.loadingType = true;
                this.pollingData.name = '';
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
    handleClose2() {
      this.equipmentType = false;
    },
    handleClose3() {
      this.addPersonnelType = false;
    },
    handleSelectionChange(val) {
      this.pollingSaveData = val;
    },
    // 添加 巡检人员
    addPolling() {
      this.pollingData.personnel = '';
      this.pollingValue.length = 0;
      if (this.pollingSaveData.length) {
        this.pollingSaveData.forEach(item => {
          this.pollingValue.push(item.userId);
          this.pollingData.personnel += item.name + ';';
        });
      }
      this.addPersonnelType = false;
    },
  },
};
</script>
