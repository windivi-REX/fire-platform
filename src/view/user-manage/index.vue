<!--eslint-disable-->
<template>
  <el-container class="default-container">
    <el-aside width="20%">
      <div class="header">
        <span class="header-title">部门信息</span>
      </div>
      <dept-tree
        :treeData="treeData"
        @moduleEdit="modifyTreeNode($event,'edit')"
        @moduleRemove="modifyTreeNode($event, 'remove')"
        @moduleAdd="modifyTreeNode($event,'add')"
        @clickTreeNode="onFocusTreeNode"
      ></dept-tree>
    </el-aside>
    <el-container class="right-list-container">
      <el-header>
        <el-row type="flex" align="center" justify="end">
          <el-col :xs="0" :sm="3" :md="12" :lg="13" :span="13" type="flex" align="start" justify="start">
            <span style="font-size:18px;font-weight:600;">用户信息</span>
          </el-col>
          <el-col :xs="12" :sm="12" :md="6" :lg="6" :span="6">
            <el-input
              placeholder="请输入内容"
              v-model="userNameVal"
              @keyup.enter.native="searchListByUserName"
              clearable
              class="input-with-select"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                type="primary"
                @click="searchListByUserName"
              ></el-button>
            </el-input>
          </el-col>
          <el-col :xs="12" :sm="9" :md="6" :lg="5" :span="5">
            <el-button-group>
              <el-button type="primary" icon="el-icon-plus" @click="listAction('add')">新增</el-button>
              <el-button
                type="primary"
                icon="el-icon-delete"
                @click="listAction('remove')"
                :disabled="deleteDisabled"
              >删除</el-button>
            </el-button-group>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table
          height="100%"
          class="user-table"
          :data="tableData"
          tooltip-effect="dark"
          v-loading="listLoding"
          @selection-change="handleSelectionChange"
          :header-cell-style="{background:'#eee',color: '#202020'}"
        >
          <el-table-column type="selection" width="70" show-overflow-tooltip></el-table-column>
          <el-table-column prop="username" label="用户名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="name" label="真实姓名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="deptName" label="所属地区" show-overflow-tooltip></el-table-column>
          <el-table-column prop="mobile" label="电话" show-overflow-tooltip></el-table-column>
          <el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            :filters="[{ text: '启用', value: 1 }, { text: '禁用', value: 0 }]"
            :filter-method="filterStatus"
            filter-placement="bottom-end"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status === 1 ? 'success' : 'danger'"
                disable-transitions
              >{{scope.row.status === 1 ? '启用' : '禁用'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" prop="oprate" label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <svg
                class="icon operate-icon"
                aria-hidden="true"
                @click="listAction('remove',scope.row)"
              >
                <use xlink:href="#icon-shanchu" />
              </svg>
              <svg
                class="icon operate-icon"
                aria-hidden="true"
                @click="listAction('edit', scope.row)"
              >
                <use xlink:href="#icon-xiugai" />
              </svg>
              <svg
                class="icon operate-icon"
                aria-hidden="true"
                @click="listAction('reset',scope.row)"
              >
                <use xlink:href="#icon-zhongzhi" />
              </svg>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="paramLimit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-footer>
    </el-container>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="OdialogFormVisible"
      width="30%"
      :center="true"
      ref="addUserFormDialog"
      :append-to-body="true"
    >
      <el-form
        ref="addUserForm"
        :rules="addUserFormRules"
        class="custom-dialog-form"
        :model="addUserForm"
      >
        <el-form-item
          class="custom-dialog-form-item"
          label="用户名"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="addUserForm.username" @change="checkExist($event)" size="mini"></el-input>
        </el-form-item>
        <el-form-item
          v-if="hasPassword"
          class="custom-dialog-form-item"
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input v-model="addUserForm.password" size="mini" type="password"></el-input>
        </el-form-item>
        <el-form-item
          v-if="hasPassword"
          class="custom-dialog-form-item"
          label="确认密码"
          :label-width="formLabelWidth"
          prop="confirmPassword"
        >
          <el-input v-model="addUserForm.confirmPassword" size="mini" type="password"></el-input>
        </el-form-item>
        <el-form-item
          class="custom-dialog-form-item"
          label="真实姓名"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="addUserForm.name" size="mini"></el-input>
        </el-form-item>
        <el-form-item
          class="custom-dialog-form-item"
          label="所属地区"
          :label-width="formLabelWidth"
          prop="dept"
        >
          <el-select
            style="width:100%"
            v-model="addUserForm.dept"
            placeholder="请选择用户区域"
            size="mini"
          >
            <el-option
              v-for="dept in depts"
              :key="dept.deptId"
              :label="dept.name"
              :value="dept.deptId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          class="custom-dialog-form-item"
          label="电话"
          :label-width="formLabelWidth"
          prop="mobile"
        >
          <el-input v-model.number="addUserForm.mobile" size="mini"></el-input>
        </el-form-item>
        <el-form-item
          class="custom-dialog-form-item"
          label="邮箱"
          :label-width="formLabelWidth"
          prop="email"
        >
          <el-input v-model="addUserForm.email" size="mini"></el-input>
        </el-form-item>
        <el-form-item
          class="custom-dialog-form-item"
          label="角色"
          :label-width="formLabelWidth"
          prop="roleIds"
        >
          <el-select
            style="width:100%;"
            v-model="addUserForm.roleIds"
            multiple
            placeholder="请选择用户角色"
            size="mini"
          >
            <el-option
              v-for="role in roles"
              :key="role.roleId"
              :label="role.roleName"
              :value="role.roleId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          class="custom-dialog-form-item"
          label="状态"
          :label-width="formLabelWidth"
          prop="status"
        >
          <el-select
            style="width:100%"
            v-model="addUserForm.status"
            placeholder="请选择用户状态"
            size="mini"
          >
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="clear-btn" @click="clearUserSet">取消</el-button>
        <el-button class="succrss-btn" type="primary" @click="handleUserSet">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="organizationForm.title"
      :visible.sync="PdialogFormVisible"
      width="25%"
      :center="true"
      ref="organizationFormDialog"
      :append-to-body="true"
    >
      <el-form
        class="custom-dialog-form"
        :model="organizationForm"
        :rules="organizationFormRules"
        ref="organizationForm"
      >
        <el-form-item
          class="custom-dialog-form-item"
          label="上级部门"
          :label-width="formLabelWidth"
          size="mini"
          prop="dept"
        >
          <el-select
            size="mini"
            style="width:100%"
            v-model="organizationForm.dept"
            placeholder="请选择上级部门"
          >
            <el-option label="无" :value="organizationForm.noneArea"></el-option>
            <el-option
              v-for="dept in depts"
              :key="dept.deptId"
              :label="dept.name"
              :value="dept.deptId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          class="custom-dialog-form-item"
          label="地区"
          :label-width="formLabelWidth"
          size="mini"
          prop="name"
        >
          <el-input v-model="organizationForm.name" placeholder="请输入地区名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="clear-btn" @click="clearDeptBox">取 消</el-button>
        <el-button type="primary" class="succrss-btn" @click="handleDeptBox">保 存</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import {
  deptsTree,
  depts,
  addDepts,
  updateDept,
  removeDept,
  getUserList,
  roleList,
  addRole,
  updateUser,
  getSingleUser,
  delUser,
  resetPassword,
} from '../../api/user-management';
import { downloadFileIE } from '../../utils/download';
// import sysLayout from '../../components/SysManage/Layout';
import deptTree from '../sysTree/index';
import {
  DEPT_NAME,
  USER_NAME,
  NAME,
  PHONE,
  E_MAIL,
  PASSWORD,
  CONFIRMPASSWORD,
} from '../../utils/validate';

export default {
  name: 'Index',
  components: {
    // sysLayout,
    deptTree,
  },
  data() {
    return {
      addUserFormRules: {
        username: [
          {
            required: true,
            context: this,
            // message: '请输入用户名',
            validator: USER_NAME,
            trigger: 'blur',
          },
        ],
        name: [
          {
            required: true,
            // message: '请输入名称',
            validator: NAME,
            trigger: 'blur',
          },
        ],
        dept: [
          {
            required: true,
            message: '请输入地区名称',
            trigger: 'blur',
          },
        ],
        mobile: [
          {
            required: true,
            validator: PHONE,
            // message: '请输入电话号',
            trigger: 'blur',
          },
          {
            type: 'number',
            message: '号码必须为数字值',
          },
        ],
        email: [
          {
            required: true,
            // message: '请输入邮件',
            validator: E_MAIL,
            trigger: 'blur',
          },
        ],
        status: [
          {
            required: true,
            message: '请输入状态',
            trigger: 'blur',
          },
        ],
        roleIds: [
          {
            required: true,
            message: '请选择角色',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            // message: '请输入密码',
            validator: PASSWORD,
            trigger: 'blur',
          },
        ],
        confirmPassword: [
          {
            required: true,
            // message: '请输入密码',
            context: this,
            validator: CONFIRMPASSWORD,
            trigger: 'blur',
          },
        ],
      },
      organizationFormRules: {
        name: [
          {
            required: true,
            // message: '请输入地区名称',
            validator: DEPT_NAME,
            trigger: 'blur',
          },
        ],
        dept: [
          {
            required: true,
            message: '请选择上级部门',
            trigger: 'blur',
          },
        ],
      },
      filterText: '',
      treeData: [], // 表格数据
      defaultProps: {
        children: 'children',
        label: 'text',
      },
      tableData: [],
      OdialogFormVisible: false,
      organizationForm: {
        name: '',
        dept: '',
        remark: '',
        title: '',
        noneArea: 0,
        deptId: null,
      },
      addUserForm: {
        // 添加用户的信息
        username: '',
        name: '',
        dept: '',
        mobile: '',
        email: '',
        status: '',
        roleIds: [],
        password: '',
        confirmPassword: '',
      },
      PdialogFormVisible: false,
      formLabelWidth: '20%',
      radio: '1',
      dialogVisible: false,
      isPlural: false,
      dialogTitle: null,
      modifyTreeMode: null,
      depts: [],
      roles: [],
      listModifyMode: null,
      choseUser: null,
      paramLimit: 10,
      page: 1,
      total: null,
      hasPassword: false,
      userNameVal: '',
      listLoding: false,
      multipleSelection: [],
      deleteDisabled: true,
    };
  },
  computed: {
    reGetUserList() {
      return this.treeData;
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    },
  },
  created() {
    this.getDeptsTree();
    this.getDepts();
    this.handleGetUser();
    this.getRoles();
  },
  methods: {
    handleExportFileIE() {
      downloadFileIE({
        url: '/sldz/common/exportUser',
      });
    },
    getDeptsTree() {
      deptsTree()
        .then(res => {
          this.treeData = res.data.children;
        })
        .catch(error => {
          console.log(error);
        });
    },
    filterStatus(value, row) {
      return row.status === value;
    },
    getDepts() {
      depts({
        paramLimit: 999,
      })
        .then(res => {
          this.depts = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 添加/修改部门
    handleDeptBox() {
      this.$refs.organizationForm.validate(valid => {
        if (!valid) {
          return;
        }
        if (this.modifyTreeMode === 'add') {
          addDepts({
            parentId: this.organizationForm.dept,
            name: this.organizationForm.name,
            delFlag: 1, // delFlag =>1,正常；=>0,禁用
          })
            .then(res => {
              this.$message({
                type: 'success',
                message: '地区添加成功',
              });
              this.PdialogFormVisible = false;
              this.getDeptsTree();
              this.getDepts();
              this.organizationForm.dept = '';
              this.organizationForm.name = '';
              this.organizationForm.deptId = '';
              this.organizationForm.remark = '';
            })
            .catch(error => {
              console.log(error);
            });
        } else if (this.modifyTreeMode === 'edit') {
          updateDept({
            parentId: this.organizationForm.dept,
            name: this.organizationForm.name,
            delFlag: 1, // delFlag =>1,正常；=>0,禁用
            deptId: this.organizationForm.deptId,
          })
            .then(res => {
              this.PdialogFormVisible = false;
              this.$message.success('区域修改成功');
              this.getDeptsTree();
              this.getDepts();
              this.organizationForm.dept = '';
              this.organizationForm.name = '';
              this.organizationForm.remark = '';
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    handleAddListItem() {
      this.OdialogFormVisible = true;
      this.dialogTitle = '新增用户';
      this.hasPassword = true;
    },
    handleEditListItem(row) {
      this.OdialogFormVisible = true;
      this.hasPassword = false;
      getSingleUser({ userId: row.userId })
        .then(res => {
          this.choseUser = row;
          this.dialogTitle = '编辑用户';
          this.addUserForm.username = row.username;
          this.addUserForm.name = row.name;
          this.addUserForm.dept = row.deptId;
          this.addUserForm.mobile = Number.parseInt(row.mobile);
          this.addUserForm.email = row.email;
          // this.addUserForm.liveAddress = row.liveAddress
          this.addUserForm.status = row.status.toString();
          this.addUserForm.roleIds = res.data.roleIds;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 新增/编辑用户弹出框
    listAction(mode, row) {
      this.listModifyMode = mode;
      switch (mode) {
        case 'add':
          this.handleAddListItem();
          break;
        case 'remove':
          this.handleRemoveListItem(row);
          break;
        case 'edit':
          this.handleEditListItem(row);
          break;
        case 'reset':
          this.handleResetPassword(row);
          break;
        default:
          break;
      }
    },
    searchListByUserName() {
      getUserList({
        paramLimit: this.paramLimit,
        username: this.userNameVal,
      })
        .then(res => {
          this.tableData = res.data.rows;
          this.total = res.data.total;
        })
        .catch(error => {
          console.log(error);
          this.$message.error('用户列表获取失败');
        });
    },
    // 确认新增/编辑用户
    handleUserSet() {
      this.$refs.addUserForm.validate(valid => {
        if (valid) {
          if (this.listModifyMode === 'add') {
            addRole({
              username: this.addUserForm.username,
              name: this.addUserForm.name,
              password: this.addUserForm.password,
              email: this.addUserForm.email,
              roleIds: this.addUserForm.roleIds,
              deptId: this.addUserForm.dept,
              mobile: this.addUserForm.mobile,
              status: this.addUserForm.status,
              // liveAddress: this.addUserForm.liveAddress
            })
              .then(res => {
                this.$message.success('用户添加成功');
                this.handleGetUser();
                this.clearUserSet();
              })
              .catch(error => {
                console.log(error);
                this.$message.error('用户添加失败');
              });
          } else if (this.listModifyMode === 'edit') {
            updateUser({
              username: this.addUserForm.username,
              name: this.addUserForm.name,
              // password: this.addUserForm.password,
              email: this.addUserForm.email,
              roleIds: this.addUserForm.roleIds,
              deptId: this.addUserForm.dept,
              mobile: this.addUserForm.mobile,
              status: this.addUserForm.status,
              // liveAddress: this.addUserForm.liveAddress,
              userId: this.choseUser.userId,
            })
              .then(res => {
                this.$message.success('用户修改成功');
                this.handleGetUser();
                this.clearUserSet();
              })
              .catch(error => {
                console.log(error);
                this.$message.error('用户修改失败');
              });
          }
        }
      });
    },
    // 关闭新增/编辑用户弹出框
    clearUserSet() {
      this.$refs.addUserForm.resetFields();
      for (const attr in this.addUserForm) {
        if (attr === 'roleIds') {
          this.addUserForm[attr] = [];
        } else {
          this.addUserForm[attr] = '';
        }
      }
      this.OdialogFormVisible = false;
    },
    // 打开添加/修改部门弹出框
    modifyTreeNode(trigger, mode) {
      this.modifyTreeMode = mode;
      switch (mode) {
        case 'add':
          this.handleAddTreeNode(trigger);
          this.PdialogFormVisible = true;
          break;
        case 'edit':
          this.handleEditTreeNode(trigger);
          this.PdialogFormVisible = true;
          break;
        case 'remove':
          this.removeTreeNode(trigger);
          break;
        default:
          this.$notify({
            title: '提示',
            message: '请确认case是否匹配',
            type: 'info',
            duration: 2000,
          });
          break;
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (val.length > 0) {
        this.deleteDisabled = false;
      } else {
        this.deleteDisabled = true;
      }
    },
    handleEditTreeNode(trigger) {
      this.organizationForm.title = '修改区域';
      this.organizationForm.name = trigger.text;
      this.organizationForm.dept = parseInt(trigger.parentId);
      this.organizationForm.deptId = trigger.id;
    },
    handleAddTreeNode(trigger) {
      this.organizationForm.title = '新增区域';
      //   this.organizationForm.dept = parseInt(trigger.id);
      this.organizationForm.dept = '';
    },
    // 删除部门
    removeTreeNode(trigger) {
      this.$confirm(`此操作将删除区域:${trigger.text},是否继续？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          removeDept({ deptId: trigger.id })
            .then(() => {
              this.$message.success('删除成功');
              this.getDeptsTree();
              this.getDepts();
            })
            .catch(error => {
              console.log(error);
              this.$message.error('删除失败');
            });
        })
        .catch(() => {
          this.$message.info('已取消删除');
        });
    },
    checkExist() {},
    // 关闭区域弹出框
    clearDeptBox() {
      this.$refs.organizationForm.resetFields();
      this.PdialogFormVisible = false;
      this.organizationForm.name = '';
      this.organizationForm.dept = '';
      this.organizationForm.deptId = '';
      this.organizationForm.remark = '';
    },
    // 获取用户
    handleGetUser() {
      this.listLoding = true;
      getUserList({
        paramLimit: this.paramLimit,
        paramOffset: (this.page - 1) * this.paramLimit,
      })
        .then(res => {
          this.tableData = res.data.rows;
          this.total = res.data.total;
          this.listLoding = false;
        })
        .catch(error => {
          console.log(error);
          this.$message.error('用户列表获取失败');
          this.listLoding = false;
        });
    },
    // 获取角色
    getRoles() {
      roleList()
        .then(res => {
          this.roles = res.data;
        })
        .catch(error => {
          console.log(error);
          this.$message.error('获取角色列表失败');
        });
    },
    // 删除用户
    formatInfo() {
      const array = [];
      this.multipleSelection.forEach(el => {
        array.push(el.username);
      });
      return JSON.stringify(array.join(','));
    },
    handleRemoveListItem(row) {
      const info = row
        ? `此操作将删除用户${row.name}, 是否继续?`
        : `此操作将批量删除用户${this.formatInfo()}, 是否继续?`;
      this.$confirm(info, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          if (this.multipleSelection.length > 0 && !row) {
            this.multipleSelection.forEach(el => {
              this.removeUser(el);
            });
          } else {
            this.removeUser(row);
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    removeUser(row) {
      delUser(row.userId)
        .then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
          this.handleGetUser();
        })
        .catch(error => {
          console.log(error);
          this.$message({
            type: 'error',
            message: '删除失败!',
          });
        });
    },
    // 重置用户密码
    handleResetPassword(row) {
      this.$prompt('请输入新的密码', '重置密码', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[0-9\\A-Za-z]{6,20}$/,
        inputErrorMessage: '密码由不超过6-20的数字和大小写字母组成',
      })
        .then(({ value }) => {
          resetPassword({
            pwdNew: value,
            userId: row.userId,
          })
            .then(res => {
              this.$message({
                type: 'success',
                message: '密码重置成功',
              });
            })
            .catch(error => {
              console.log(error);
              this.$message({
                type: 'error',
                message: '密码重置失败',
              });
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入',
          });
        });
    },
    // 点击部门切换列表
    onFocusTreeNode(data) {
      this.paramLimit = 10;
      this.page = 1;
      getUserList({
        paramLimit: this.paramLimit,
        paramOffset: (this.page - 1) * this.paramLimit,
        deptId: data.id,
      })
        .then(res => {
          this.tableData = res.data.rows;
          this.total = res.data.total;
        })
        .catch(error => {
          console.log(error);
          this.$message.error('用户列表获取失败');
        });
    },
    // 切换每页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.paramLimit = val;
      this.handleGetUser();
    },
    // 翻页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.handleGetUser();
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
@import '~@/styles/mixin.scss';
$default-bg-color: #fff;
.operate-icon {
  cursor: pointer;
  margin-right: 10px;
}
.default-container {
  border-radius: 4px;
  height: calc(84vh - 36px);
}
.el-col {
  border-radius: 4px;
  &:last-child {
    @include flex(row, flex-end, center);
  }
}

.el-row {
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
}
.is-align-center {
  align-items: center;
}
.el-header,
.el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-header {
  padding-top: 16px;
}
.el-aside {
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: $default-bg-color;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .header {
    padding: 16px 20px 0 20px;
    @include flex(row, flex-start, center);
    width: 100%;
    height: 48px;
    .header-title {
      font-size: 18px;
      font-weight: 600;
    }
  }
}

.el-main {
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.right-list-container {
  margin-left: 16px;
  background: $default-bg-color;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
