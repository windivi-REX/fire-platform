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
    <div class="margin-style">设备组管理</div>
    <!-- 搜索功能 -->
    <div class="margin-style">
      <el-input style="width:200px;" placeholder="请输入计划名称"></el-input>
      <el-button type="primary" style="margin-left:10px;" icon="el-icon-search">检索</el-button>
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
    >
      <el-table-column align="center" prop="num" label="序号" width="80"></el-table-column>
      <el-table-column align="center" prop="name" label="计划名称"></el-table-column>
      <el-table-column align="center" prop="frequency" label="执行频率"></el-table-column>
      <el-table-column align="center" prop="beginTime" label="开始时间"></el-table-column>
      <el-table-column align="center" prop="endTime" label="结束时间"></el-table-column>
      <el-table-column align="center" prop="state" label="状态"></el-table-column>
      <el-table-column align="center" prop="obj" label="巡检对象"></el-table-column>
      <el-table-column align="center" prop="amount" label="设备数量"></el-table-column>
      <el-table-column align="center" prop="personnel" label="巡检人员"></el-table-column>
      <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
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
      :total="20"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
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
        <el-form :model="formLabelAlign" :rules="rules" ref="formLabelAlign" label-width="80px">
          <el-form-item label="计划名称" prop="name">
            <el-input v-model="formLabelAlign.name" placeholder="请输入计划名称"></el-input>
          </el-form-item>
          <el-form-item label="执行频率" prop="frequency">
            <el-input-number
              v-model="formLabelAlign.frequency"
              controls-position="right"
              @change="handleChange"
              :min="1"
              :max="10"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="日期" prop="date">
            <el-date-picker
              style="width:100%"
              v-model="formLabelAlign.date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="任务开始" prop="beginTask">
            <el-input-number
              v-model="formLabelAlign.beginTask"
              controls-position="right"
              @change="handleChange2"
              :min="1"
              :max="10"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="巡检对象" prop="obj">
            <el-input
              readonly="true"
              v-model="formLabelAlign.obj"
              style="width:200px;"
              placeholder="请选择设备组"
            ></el-input>
            <el-button style="margin-left:20px;" @click="chooseEquipment" type="primary">请选择设备组</el-button>
          </el-form-item>
          <el-form-item label="巡检人员" prop="personnel">
            <el-input
              readonly="true"
              v-model="formLabelAlign.personnel"
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
      <el-transfer v-model="value" :data="data"></el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="equipmentType = false">取 消</el-button>
        <el-button type="primary" @click="equipmentType = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加巡检人员弹框 -->
    <el-dialog
      title="编辑巡检人员"
      :visible.sync="addPersonnelType"
      width="50%"
      :before-close="handleClose3"
    >
      <el-table
        ref="multipleTable"
        :data="tableData2"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" width="80"></el-table-column>
        <el-table-column align="center" label="序号">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="姓名"></el-table-column>
        <el-table-column align="center" prop="address" label="部门" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="address" label="电话" show-overflow-tooltip></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPersonnelType = false">取 消</el-button>
        <el-button type="primary" @click="addPersonnelType = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import { getPatrolList } from '../../api/patrolTaskApi.js';
export default {
  data() {
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0,
        });
      }
      return data;
    };
    return {
      addPersonnelType: false, // 添加巡检人员弹框
      data: generateData(),
      value: [1, 4],
      equipmentType: false, //设备组弹框
      loadingType: false,
      operationTitle: '新增计划', //弹框 title
      dialogVisible: false, // 新增 和编辑等操作弹框状态
      currentPage4: 4,
      formLabelAlign: {
        num: 1,
        name: '名称',
        frequency: 1,
        date: '',
        beginTime: '2009',
        endTime: '2019',
        state: '状态',
        obj: '',
        amount: '数量',
        personnel: '',
        createTime: '2018',
        beginTask: 1,
      }, // 表单
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        frequency: [{ required: true, message: '请选择天数', trigger: 'blur' }],
        date: [{ required: true, message: '请选择时间', trigger: 'blur' }],
        obj: [{ required: true, message: '请选择设备组', trigger: 'blur' }],
        personnel: [
          { required: true, message: '请选择设备组', trigger: 'blur' },
        ],
        beginTask: [
          { required: true, message: '请选择开始天数', trigger: 'blur' },
        ],
      }, // 验证
      tableData: [], //列表数据
      tableData2: [],
      paramLimit: 10, // 一页的条数
      paramOffset: 0, // 每页的一条
    };
  },
  created() {
    this.getTableList();
  },
  computed: {},
  methods: {
    // 获取设备列表
    async getTableList() {
      let { data } = await getPatrolList({
        paramLimit: this.paramLimit,
        paramOffset: this.paramOffset,
      });
      this.tableData = data;
    },
    // 添加巡检人员弹框
    addPersonnel() {
      this.addPersonnelType = true;
    },
    // 选择设备组
    chooseEquipment() {
      this.equipmentType = true;
    },
    handleChange2() {
      console.log(value);
    },
    // 切换天数
    handleChange(value) {
      console.log(value);
    },
    // 新增 和编辑等操作
    operationEquipment(item) {
      this.loadingType = true;
      if (item === 1) {
        this.operationTitle = '新增设备组';
        this.formLabelAlign.name = '';
      } else {
        this.operationTitle = '编辑设备组';
        this.formLabelAlign = item.name;
      }
      this.loadingType = false;
      this.dialogVisible = true;
    },
    //删除 设备
    deleteEquipment(item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
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
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 提交
    submitForm() {
      this.$refs.formLabelAlign.validate(valid => {
        if (valid) {
          alert('submit!');
          this.dialogVisible = false;
        } else {
          console.log('error submit!!');
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
  },
};
</script>
