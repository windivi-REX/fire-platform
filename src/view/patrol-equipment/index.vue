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
      <el-input style="width:200px;" placeholder="请输入设备组名称"></el-input>
      <el-button type="primary" style="margin-left:10px;" icon="el-icon-search">检索</el-button>
    </div>
    <!-- 功能按钮 -->
    <div class="margin-style">
      <el-button type="primary" @click="operationEquipment(1)" icon="el-icon-plus">新增设备组</el-button>
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
      <el-table-column align="center" prop="date" label="序号" width="100"></el-table-column>
      <el-table-column align="center" prop="name" label="设备组名称" width="420"></el-table-column>
      <el-table-column align="center" label="设备数量" width="420">
        <template slot-scope="scope">
          <span class="equipment-num-style">{{scope.row.num}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="address" label="创建日期" width="420"></el-table-column>
      <el-table-column align="center" prop="manipulation" label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="详情" placement="top">
            <el-button icon="el-icon-tickets"></el-button>
          </el-tooltip>
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
          <el-form-item label="名称" prop="name">
            <el-input v-model="formLabelAlign.name" placeholder="请输入设备组名称"></el-input>
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
export default {
  data() {
    return {
      loadingType: false,
      operationTitle: '', //弹框 title
      dialogVisible: false, // 新增 和编辑等操作弹框状态
      currentPage4: 4,
      formLabelAlign: {
        name: '',
        num:''
      }, // 表单
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
      }, // 验证
      tableData: [
        {
          date: '1',
          name: '王小虎',
          num: 0,
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2',
          name: '王小虎',
          num: 0,
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '3',
          name: '王小虎',
          num: 0,
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '4',
          name: '王小虎',
          num: 0,
          address: '上海市普陀区金沙江路 1516 弄',
        },
        {
          date: '4',
          name: '王小虎',
          num: 0,
          address: '上海市普陀区金沙江路 1516 弄',
        },
        {
          date: '4',
          name: '王小虎',
          num: 0,
          address: '上海市普陀区金沙江路 1516 弄',
        },
        {
          date: '4',
          name: '王小虎',
          num: 0,
          address: '上海市普陀区金沙江路 1516 弄',
        },
        {
          date: '4',
          name: '王小虎',
          num: 0,
          address: '上海市普陀区金沙江路 1516 弄',
        },
        {
          date: '4',
          name: '王小虎',
          num: 0,
          address: '上海市普陀区金沙江路 1516 弄',
        },
        {
          date: '4',
          name: '王小虎',
          num: 0,
          address: '上海市普陀区金沙江路 1516 弄',
        },
        {
          date: '4',
          name: '王小虎',
          num: 0,
          address: '上海市普陀区金沙江路 1516 弄',
        },
        {
          date: '4',
          name: '王小虎',
          num: 0,
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ], //列表数据
    };
  },
  async created() {},
  computed: {},
  methods: {
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
  },
};
</script>
