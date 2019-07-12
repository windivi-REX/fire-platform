<template>
  <div class="sysTree">
    <div class="input-box">
      <el-input v-if="showInput"
                v-model="filterText"
                size="mini"
                style="width:70%;"
                clearable
                prefix-icon="el-icon-search" />
                <el-button type="primary" style="margin-left:5%" icon="el-icon-plus" size="mini" @click="handleAdd"></el-button>
    </div>
    <!--eslint-disable-->
    <el-tree v-scrollBar
             class="sys-tree-content"
             ref="tree2"
             :data="treeData"
             :props="defaultProps"
             :show-checkbox="false"
             node-key="id"
             default-expand-all
             :highlight-current="true"
             :expand-on-click-node="false"
             :render-content="renderContent"
             :filter-node-method="filterNode"
             @node-click="clickTreeNode"></el-tree>
  </div>
</template>

<script>
/* eslint-disable */
let id = 1000;

export default {
  name: 'SysTree',
  props: {
    treeData: {
      type: Array,
      default: [],
    },
    showInput: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      data2: [],
      defaultProps: {
        children: 'children',
        label: 'text',
      },
      newNodeName: null,
      filterText: '',
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    },
  },
  methods: {
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>
            <span>{node.label}</span>
          </span>
          <span class="tree-node-icon">
            <svg
              class="icon right10"
              aria-hidden="true"
              on-click={e => this.remove(store, data)}
            >
              <use xlinkHref="#icon-shanchu2" />
            </svg>
            <svg
              class="icon right10"
              aria-hidden="true"
              on-click={e => this.handleEdit(store, data)}
            >
              <use xlinkHref="#icon-xiugai" />
            </svg>

          </span>
        </span>
      );
      // <svg
            //   class="icon right10"
            //   aria-hidden="true"
            //   on-click={e => this.handleAdd(store, data)}
            // >
            //   <use xlinkHref="#icon-add" />
            // </svg>
    },
    // 修改部门
    handleAdd(store, data) {
      this.$emit('moduleAdd', data);
    },
    handleEdit(store, data) {
      this.$emit('moduleEdit', data);
    },
    // 删除部门
    remove(store, data) {
      this.$emit('moduleRemove', data);
    },
    // 过滤查找相应的部门
    filterNode(value, data) {
      if (!value) return true;
      return data.text.indexOf(value) !== -1;
    },
    // 点击某个节点触发的事件
    clickTreeNode(data) {
      this.$emit('clickTreeNode', data);
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/variables.scss';
@import '~@/styles/mixin.scss';
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.el-tree-node__content {
  height: 40px;
  /*padding-left: 0 !important;*/
  color: #3f3e3e !important;
}
.el-tree-node__content:hover {
  background: #eeeeee;
}
.right10 {
  margin-right: 10px;
}
.right20 {
  margin-right: 20px;
}
.tree-node-icon {
  float: right;
  margin-right: 18px;
  display: none;
}
.el-tree-node__content:hover .tree-node-icon {
  display: inline;
}
.icon:hover {
  color: gray;
}
.input-box {
  width: 100%;
  @include flex(row, center, center);
  padding: 16px 0;
}
</style>

<style scoped>
.input-icon {
  height: 17px;
  width: 17px;
  position: absolute;
  top: 6px;
  left: 2px;
  color: #3f3e3e;
}

.input > .el-input__inner {
  color: red;
}
.search-dept {
  padding-left: 24px;
  width: 80%;
  height: 22px;
  border-radius: 4px;
  border: 1px solid #8d8d8d;
}
.sysTree {
  height: 100%;
  width: 100%;
}
.sys-tree-content {
  width: 100%;
  position: relative;
  height: calc(70vh);
}
</style>
