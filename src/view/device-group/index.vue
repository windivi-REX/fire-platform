<style>
.searchInput {
  width: 200px;
}
.margin-style {
  margin-bottom: 10px;
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
            <el-button type="primary" @click="dialogVisible = true" icon="el-icon-plus">新增设备组</el-button>
        </div>
        <!-- 列表数据 -->
        <el-table class="margin-style" :data="tableData" border="" style="width: 100%;">
            <el-table-column align="center" prop="date" label="日期" width="180"></el-table-column>
            <el-table-column align="center" prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column align="center" prop="address" label="地址"></el-table-column>
            <el-table-column align="center" prop="manipulation" label="操纵">
                <el-tooltip class="item" effect="dark" content="Top 详情" placement="top-start">
                    <el-button icon="el-icon-tickets"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="Top 编辑" placement="top-start">
                    <el-button icon="el-icon-edit"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="Top 删除" placement="top-start">
                    <el-button icon="el-icon-delete"></el-button>
                </el-tooltip>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            style="text-align: right;"
            :total="200"
            :page-sizes="[100, 200, 300, 400]"
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
        ></el-pagination>
        <!-- 新增或者修改弹框 -->
        <el-dialog
            title="新增设备组"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose"
        >
            <div>
                <div style="margin: 20px;"></div>
                <el-form
                    :model="formLabelAlign"
                    :rules="rules"
                    ref="formLabelAlign"
                    label-width="80px"
                >
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
      dialogVisible: false,
      currentPage4: 4,
      formLabelAlign: {
        name: '',
      },
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
    };
  },
  async created() {},
  computed: {},
  methods: {
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
