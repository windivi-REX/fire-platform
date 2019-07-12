<!--eslint-disable-->
<template>
  <div class="role-container">
    <sys-layout :showBtn="isPlural"
                :isPlural="isPlural"
                @isShow="handleShowBar"
                @saveBtn="handleRoleTree"
                @clearBtn="clearRoleTree">
      <span slot="title">角色列表</span>
      <svg class="icon green pointer"
           aria-hidden="true"
           slot="icon"
           @click="handlerole(0)">
        <use xlink:href="#icon-xinzeng"></use>
      </svg>
      <role-list slot="content"
                 :list="list"
                 @listEdit="handlerole"
                 @listRemove="handleRoleRemove"
                 @listTree="handleTree"></role-list>
      <span slot="big-title">角色与权限</span>
      <div v-scrollBar
           slot="big-content"
           class="big-content">
        <el-tree :data="permissionData"
                 :props="defaultProps"
                 show-checkbox
                 node-key="id"
                 :default-expanded-keys="checkedList"
                 :default-checked-keys="checkedList"
                 empty-text="请点击左侧的角色列表"
                 ref="tree"
                 class="tree"
                 :default-expand-all="true">
          <span class="custom-tree-node"
                slot-scope="{ node }">
            <span>
              <svg class="icon"
                   aria-hidden="true">
                <use xlink:href="'#' + node.icon"></use>
              </svg>
              {{ node.label }}
            </span>
          </span>
        </el-tree>
      </div>
      <span slot="big-title2">角色与用户</span>
      <el-transfer style="text-align: left; display: inline-block"
                   v-model="transformData"
                   filterable
                   :titles="['未选择用户', '已选择用户']"
                   :button-texts="['到左边', '到右边']"
                   filter-placeholder="请输入搜索内容"
                   :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
                   slot="big-content2"
                   @change="handleChange"
                   :props="transformProps"
                   :data="roleData"></el-transfer>
    </sys-layout>
    <!--增加编辑角色-->
    <el-dialog :title="addRoleForm.roleTitle"
               :visible.sync="PdialogFormVisible"
               :before-close="clearRoleSet"
               width="25%"
               :center="true"
               ref="addRoleFormDialog"
               :append-to-body="true">
      <el-form ref="addRoleForm"
               :rules="addRoleFormRules"
               class="custom-dialog-form"
               :model="addRoleForm">
        <el-form-item class="custom-dialog-form-item"
                      label="名称"
                      :label-width="formLabelWidth"
                      size="mini"
                      prop="name">
          <el-input v-model="addRoleForm.name"></el-input>
        </el-form-item>
        <!--<el-form-item label="状态" :label-width="formLabelWidth" size="mini">-->
        <!--<el-select v-model="addRoleForm.status" placeholder="请选择状态">-->
        <!--<el-option label="可用" value="1"></el-option>-->
        <!--<el-option label="禁用" value="0"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item class="custom-dialog-form-item"
                      label="备注"
                      :label-width="formLabelWidth"
                      size="mini"
                      prop="remark">
          <el-input v-model="addRoleForm.remark"
                    type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button class="clear-btn"
                @click="clearRoleSet">取 消</el-button>
        <el-button class="succrss-btn" type="primary"
                @click="handleRoleSet">保 存</el-button>
      </div>
    </el-dialog>
    <!--角色删除-->
    <el-dialog :center="true"
               width="22%"
               top="25vh"
               :visible.sync="dialogVisible"
               :append-to-body="true">
      <span>确定要删除该角色吗</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button class="succrss-btn" type="primary"
                @click="dialogVisible = false">确 定</el-button>
        <el-button class="clear-btn"
                @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleList,
  addRole,
  updataRole,
  delRole,
  getRoleTree,
  saveRoleTree,
  getRoleUser,
  bindingRole,
} from '../../api/role-management';

import sysLayout from '../../components/SysManage/Layout';
import roleList from './list';

import { ROLE_NAME, ROLE_REMARK } from '../../utils/validate';

export default {
  name: 'Index',
  components: {
    sysLayout,
    roleList,
  },
  data() {
    return {
      addRoleFormRules: {
        name: [
          {
            required: true,
            // message: '请输入名称',
            validator: ROLE_NAME,
            trigger: 'blur',
          },
        ],
        remark: [
          {
            required: false,
            // message: '请输入备注',
            validator: ROLE_REMARK,
            trigger: 'blur',
          },
        ],
      },
      transformProps: {
        // 改变穿梭框的props值
        key: 'userId',
        label: 'name',
      },
      list: [], // 角色列表
      checkedList: [], // 被选中和扩展的菜单树
      permissionList: [],
      PdialogFormVisible: false, // 控制角色列表的增加修改弹出框
      addRoleForm: {
        name: '',
        status: '',
        remark: '',
        roleTitle: null,
        choseRoleId: null, // 选中的角色id
      },
      choseRoleId: null, // 选中的角色id
      choseRoleName: null, // 选中角色的name
      isPlural: true,
      formLabelWidth: '20%',
      roleData: [], // 穿梭框的所有数据
      transformData: [], // 穿梭狂右边的数据
      permissionData: [], // 权限列表
      defaultProps: {
        children: 'children',
        label: 'text',
      },
      isEdit: null, // 判断角色列表的确定是编辑还是新增,1=>编辑,0=>新增
      dialogVisible: false, // 控制删除弹出框,
      showBar: 1, // 确认显示的是哪个tab
      choseUserId: [],
    };
  },
  computed: {
    filterPermission() {
      this.permissionData.forEach(item => {
        item.id = item.menuId;
      });
      return this.permissionData;
    },
  },
  created() {
    this.getRoleInfo();
  },
  methods: {
    // 获取角色信息
    getRoleInfo() {
      getRoleList()
        .then(res => {
          this.list = res.data;
        })
        .catch(error => {
          console.log(error);
          this.$message.error('获取角色信息失败');
        });
    },
    // 获取穿梭框被选中的id数组
    handleChange(value, direction, movedKeys) {
      // console.log(value, direction, movedKeys)
      this.choseUserId = value;
    },
    // 控制角色增加修改的弹出框
    handlerole(val) {
      this.PdialogFormVisible = true;
      this.isEdit = val;
      if (val === 0) {
        this.addRoleForm.roleTitle = '新增角色';
      } else {
        this.addRoleForm.choseRoleId = val.roleId;
        this.addRoleForm.roleTitle = '编辑角色';
        this.addRoleForm.name = val.roleName;
        this.addRoleForm.remark = val.remark;
        this.addRoleForm.status = val.typeCode.toString();
      }
    },
    // 删除角色
    handleRoleRemove(item) {
      this.$confirm(`此操作将删除角色${item.roleName}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          delRole({ id: item.roleId })
            .then(res => {
              this.$message({
                type: 'success',
                message: '删除成功!',
              });
              this.getRoleInfo();
            })
            .catch(error => {
              console.log(error);
              this.$message.error('删除失败');
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    // 确认新增货修改角色
    handleRoleSet() {
      this.$refs.addRoleForm.validate(valid => {
        if (!valid) {
          return;
        }
        if (this.isEdit === 0) {
          addRole({
            roleName: this.addRoleForm.name,
            typeCode: 1,
            remark: this.addRoleForm.remark,
          })
            .then(res => {
              this.$message.success('新增角色成功');
              this.clearRoleSet();
              this.getRoleInfo();
            })
            .catch(error => {
              console.log(error);
              this.$message.error('新增角色失败');
            });
        } else {
          updataRole({
            roleId: this.addRoleForm.choseRoleId,
            roleName: this.addRoleForm.name,
            typeCode: 1,
            remark: this.addRoleForm.remark,
          })
            .then(res => {
              this.$message.success('修改角色成功');
              this.clearRoleSet();
              this.getRoleInfo();
            })
            .catch(error => {
              console.log(error);
              this.$message.error('修改角色失败');
            });
        }
      });
    },
    // 取消新增角色
    clearRoleSet() {
      this.$refs.addRoleForm.resetFields();
      for (const attr in this.addRoleForm) {
        this.addRoleForm[attr] = '';
      }
      this.PdialogFormVisible = false;
    },
    handleTree(item) {
      // 切换角色对应权限
      if (this.showBar === 1) {
        getRoleTree(item.roleId)
          .then(res => {
            this.choseRoleId = item.roleId;
            this.choseRoleName = item.roleName;
            this.permissionData = res.data.children;
            // 树组件显示回显,提出被选中的父节点
            var arr = res.expand.listRoleId;
            var array = [];
            function fun(value, data, arr) {
              for (let i = 0; i < data.length; i++) {
                const mod = data[i];
                // eslint-disable-next-line
                if (mod.id == value) {
                  if (mod.children.length === 0) {
                    arr.push(mod.id);
                    return true;
                  }
                  return true;
                } else {
                  mod.children.id;
                  if (mod.children.length !== 0) {
                    fun(value, mod.children, arr);
                  }
                }
              }
              return true;
            }
            for (var i = 0; i < arr.length; i++) {
              fun(arr[i], this.permissionData, array);
            }
            this.checkedList = array;
          })
          .catch(error => {
            console.log(error);
          });
        // 切换角色对应用户
      } else {
        getRoleUser(item.roleId)
          .then(res => {
            this.choseRoleId = item.roleId;
            this.roleData = res.data.listUser;
            this.transformData = res.data.listUserIds;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    // 取消
    clearRoleTree() {
      // 取消编辑角色的权限
      if (this.showBar === 1) {
        getRoleTree(this.choseRoleId)
          .then(res => {
            this.permissionData = res.data.children;
            this.checkedList = res.expand.listRoleId;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        // 取消角色搭配的用户
        getRoleUser(this.choseRoleId)
          .then(res => {
            this.transformData = res.data.listUserIds;
            this.roleData = res.data.listUser;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    // 保存
    handleRoleTree() {
      // 保存角色搭配的权限
      if (this.showBar === 1) {
        var arr = this.$refs.tree.getCheckedKeys();
        var array = [];
        for (let i = 0; i < arr.length; i++) {
          fun(arr[i], this.permissionData, array);
        }
        // eslint-disable-next-line
        function noRepeat(arr, value) {
          // id去重
          for (var i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
              return false;
            }
          }
          return true;
        }
        // eslint-disable-next-line
        function fun(value, data, arr) {
          // 通过查询父节点下是否右子节点 将半选状态的父节点加入数组中
          for (var i = 0; i < data.length; i++) {
            var mod = data[i];
            if (mod.id === value) {
              if (noRepeat(arr, mod.id)) {
                arr.push(mod.id);
              }
              return true;
            } else {
              if (mod.children) {
                var bool = fun(value, mod.children, arr);
                if (bool) {
                  if (noRepeat(arr, mod.id)) {
                    arr.push(mod.id);
                  }
                  return true;
                }
              }
            }
          }
          return false;
        }
        // 保存
        saveRoleTree({
          menuIds: array,
          roleId: this.choseRoleId,
          roleName: this.choseRoleName,
        })
          .then(res => {
            this.$message.success('角色权限修改成功');
            // this.clearRoleTree()
          })
          .catch(error => {
            console.log(error);
            this.$message.error('角色权限修改失败');
          });
      } else {
        // 保存角色搭配的用户
        bindingRole({
          roleId: this.choseRoleId,
          userIds: this.choseUserId,
        })
          .then(res => {
            this.$message.success('修改成功');
          })
          .catch(error => {
            console.log(error);
            this.$message.error('修改失败');
          });
      }
    },
    // 确定右侧的bar是哪个部门,1=>角色与权限,2=>角色与用户
    handleShowBar(val) {
      this.showBar = val;
    },
  },
};
</script>

<style scoped lang="scss">
.button-bar {
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 10px;
}
.tree {
  height: 90%;
}
.big-content {
  position: relative;
  height: 100%;
}
</style>
<style  lang="scss">
.el-transfer-panel {
  border-color: #aaa;
}
.role-list {
  span {
    font-size: 14px;
  }
}
.role-container {
  background-color: #ffffff;
  box-shadow: #ebedee 0px 0px 8px 6px;
  .el-transfer-panel__list {
    height: 90%;
  }
}
</style>
