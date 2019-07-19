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
    <div class="margin-style">报废任务</div>
    <!-- 搜索功能 -->
    <div class="margin-style">
      <el-select v-model="equipmentTyle" clear placeholder="请选择设备组">
        <el-option
          v-for="item in EquipmentTypeOption"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
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
      <el-table-column align="center" prop="deviceGroupName" label="设备组名称"></el-table-column>
      <el-table-column align="center" prop="deviceTypeName" label="设备类型"></el-table-column>
      <el-table-column align="center" prop="deviceNumber" label="设备编号"></el-table-column>
      <el-table-column align="center" prop="location" label="图片"></el-table-column>
      <el-table-column align="center" prop="location" label="安装位置"></el-table-column>
      <el-table-column align="center" prop="principalName" label="负责人"></el-table-column>
      <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
      <el-table-column align="center" prop="scrapTime" label="报废日期"></el-table-column>
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
      <div style="height:500px;overflow-y: scroll">
        <div style="margin: 20px;"></div>
        <el-form :model="pollingData" :rules="rules" ref="pollingData" label-width="80px">
          <el-form-item label="设备组">
            <el-select v-model="pollingData.deviceGroupId" placeholder="请选择设备对象">
              <el-option
                v-for="item in EquipmentTypeOption"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备对象">
            <el-select v-model="pollingData.deviceId" placeholder="请选择设备对象">
              <el-option
                v-for="item in pollingList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责人">
            <el-select v-model="pollingData.principalId" placeholder="请选择负责人">
              <el-option
                v-for="item in principalList"
                :key="item.userId"
                :label="item.name"
                :value="item.userId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="报废日期">
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="pollingData.scrapTime"
              type="datetime"
              placeholder="选择申报时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="上传图片">
            <el-upload
              list-type="picture-card"
              :http-request="uploadImg"
              action
              :show-file-list="false"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible2">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
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
import {
  getScrapTaskList,
  getUsersAndDeviceGroups,
  uploadImg,
  addScrapTask,
  modificationScrapTask,
  deleteScrapTask,
} from '../../api/scrap-task.js';
export default {
  data() {
    return {
      // 上传图片
      dialogImageUrl: '',
      dialogVisible2: false,
      disabled: false,

      addPersonnelType: false, // 添加巡检人员弹框
      loadingType: false,
      operationTitle: '新增计划', //弹框 title
      dialogVisible: false, // 新增 和编辑等操作弹框状态
      currentPage4: 1,
      pollingData: {
        // date: '',
        // equipmentObj: '',
        // way: '',
        // result: '',
        // describe: '',

        deviceGroupId: '',
        deviceId: '',
        principalId: '',
        scrapTime: '',
        file: null,
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
      principalList: null,
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
    // 自定义上传图片
    uploadImg(data) {
      const fileObj = data.file;
      const formData = new FormData();
      formData.append('files', fileObj);
      uploadImg({
        formData: formData,
        upload: true,
      }).then(res => {
        console.log(res);
      });
    },
    //上传图片
    handleRemove(data) {
      //   const fileObj = data.file;
      //   const formData = new FormData();
      //   formData.append('files', fileObj);
      //   uploadImg({
      //     formData: formData,
      //     upload: true,
      //   }).then(res => {
      //     console.log(res);
      //   });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },

    // 获取巡检状态 和 名称 列表 和巡检对象泪飙
    async getSchemeData() {
      let { data } = await getUsersAndDeviceGroups();
      this.principalList = data.users;
      this.pollingList = data.deviceInfoDOS;
      this.EquipmentTypeOption = data.deviceGroups;
    },
    // 搜索
    searchData() {
      this.pollingData.deviceId = this.equipmentTyle;
      this.loadingType = true;
      this.getTableList();
      this.loadingType = false;
      this.resetInput();
    },
    //输入框 重置
    resetInput() {
      this.pollingData = {
        deviceGroupId: '',
        deviceId: '',
        principalId: '',
        scrapTime: '',
        file: null,
      };
      this.maintainWey = '';
      this.equipmentTyle = '';
      this.searchNum = '';
    },
    // 获取设备列表
    async getTableList() {
      let { data } = await getScrapTaskList({
        paramLimit: this.paramLimit,
        paramOffset: this.paramOffset,
        deviceNumber: this.searchNum,
        deviceGroupId: this.equipmentTyle,
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
          principalId: item.principalId,
          scrapTime: item.scrapTime,
          deviceId: item.deviceId,
          deviceGroupId: item.deviceGroupId,
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
          deleteScrapTask(item.id).then(res => {
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
            addScrapTask({
              principalId: this.pollingData.principalId,
              scrapTime: this.pollingData.scrapTime,
              deviceId: this.pollingData.deviceId,
              deviceGroupId: this.pollingData.deviceGroupId,
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
            modificationScrapTask(
              {
                principalId: this.pollingData.principalId,
                scrapTime: this.pollingData.scrapTime,
                deviceId: this.pollingData.deviceId,
                deviceGroupId: this.pollingData.deviceGroupId,
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
