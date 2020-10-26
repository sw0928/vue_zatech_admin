<template>
  <div id="box">
    <!-- {{columnsData}} -->
    <a-table
      v-if="is_select"
      :rowSelection="rowSelection"
			:rowKey="
			  (record) => record.applyId
			"
      :locale="locale"
      :scroll="{ x: true }"
      class="components-table-demo-size"
      :loading="loading"
      :columns="columns"
      :dataSource="columnsData"
      size="small"
      :pagination="false"
      style="color: #09346E; font-weigth: 600;"
    >
      <template slot="operation" slot-scope="text, record">
        <slot name="operation" :record="record"></slot>
      </template>
      <template slot="other" slot-scope="text, record, index">
        <slot name="other" :record="record" :text="text" :index="index"></slot>
      </template>
      <template
        :slot="openExpand ? 'expandedRowRender' : null"
        slot-scope="record"
      >
        <slot name="expandedRowRender" :record="record"></slot>
      </template>
    </a-table>

    <a-table
      v-else
      :locale="locale"
      :scroll="{ x: true }"
      class="components-table-demo-size"
      :loading="loading"
      :columns="columns"
      :dataSource="columnsData"
      size="small"
      :pagination="false"
      style="color: #09346E; font-weigth: 600;"
    >
      <template slot="operation" slot-scope="text, record, index">
        <slot name="operation" :record="record" :index="index"></slot>
      </template>
      <template slot="other" slot-scope="text, record, index">
        <slot name="other" :record="record" :text="text" :index="index"></slot>
      </template>
			<template slot="others" slot-scope="text, record, index">
			  <slot name="others" :record="record" :text="text" :index="index"></slot>
			</template>
      <template
        :slot="openExpand ? 'expandedRowRender' : null"
        slot-scope="record"
      >
        <slot name="expandedRowRender" :record="record"></slot>
      </template>
    </a-table>
    <div v-if="pageInfo.pageSize" class="pagination">
      <a-pagination
        style="padding-top: 14px; padding-left: 20px;"
        size="small"
        :pageSize.sync="pageInfo.pageSize"
        @showSizeChange="onShowSizeChange"
        v-model="pageInfo.current"
        :showTotal="
          (total, range) => `${range[0]}-${range[1]} 總共 ${total} 條`
        "
        :total="totalNum"
        @change="onChange"
      />
      <!-- <a-pagination
        style="padding-top: 14px; padding-left: 20px;"
        size="small"
        :pageSize.sync="pageInfo.pageSize"
        @showSizeChange="onShowSizeChange"
        v-model="pageInfo.current"
        :showTotal="
          (total, range) => `${range[0]}-${range[1]} 總共 ${total} 條`
        "
        :total="totalNum"
        @change="onChange"
        showSizeChanger
        showQuickJumper
      /> -->
    </div>
  </div>
</template>
<script>
	import Bus from '@/common/bus.js'
export default {
  name: "TableColumn",
  props: {
    columns: {
      type: Array,
      required: true
    },
    innerColumns: {
      type: Array,
      required: false
    },
    columnsData: {
      type: Array,
      required: false
    },
    innerData: {
      type: Array,
      required: false
    },
    tags: {
      type: Array,
      required: false
    },
    totalNum: {
      required: false
    },
    pageInfo: {
      required: false,
      default: function() {
        return {
          pageSize: "",
          current: ""
        };
      }
    },
    openExpand: {
      type: Boolean,
      required: false
    },
    is_select: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      locale: {
        filterConfirm: "确定",
        filterReset: "重置",
        emptyText: "無符合資訊"
      },
      selectedRowKeys: [], //選中
      loading: true,
      btnDatas: ["修改", "删除", "下线"],
      btnObj: {
        在售: ["修改", "下线"],
        停售: ["删除", "下线"]
      }
    };
  },
  watch: {
    columnsData: {
      handler: function(val) {
       // console.log('watch',val )
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 500);
      },
      deep: true,
      immediate: true
    }
  },
	computed: {
    rowSelection() {
			const { selectedRowKeys } = this;
      return {
				selectedRowKeys,
				onChange: this.onSelectChange,
      //   onChange: (selectedRowKeys, selectedRows) => {
      //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
					 // this.$emit("get_list", selectedRows);
      //   },
        getCheckboxProps: record => ({
          props: {
            disabled: record.isChecked == 1, // Column configuration not to be checked
             name: `${record.isChecked}`
          },
        }),
      };
    },
  },
  methods: {
		onSelectChange(selectedRowKeys,selectedRows) {
		  console.log('selectedRowKeys changed: ', selectedRows);
			this.selectedRowKeys = selectedRowKeys;
			this.$emit("get_list", selectedRows);
		},
    onChange(e) {
     // console.log(e, "");
    },
    onShowSizeChange(current, pageSize) {
    //  console.log(current, pageSize);
    },

    expand() {
      // 点击展开行
      this.$emit("expand");
      // value.forEach((item,index) => {
      // 	console.log(index);
      // })
      // console.log(e);

      // this.expandedRowRender();
    }
    // expandedRowRender(columnsData) {
    // 	console.log(columnsData);
    // }
  },
	created() {
		let self = this;
	  Bus.$on('selectedRowKeys', (e) => {
	     self.selectedRowKeys = [];
	  })
	  // this.queryList()
	},
};
</script>
<style lang="scss" scoped>
#box {
  background-color: #ffffff;
  border-radius: 4px;

  #components-table-demo-size {
    .ant-table
      .ant-table-scroll-position-left
      .ant-table-small
      .ant-table-body
      .ant-table-thead
      > tr
      > th {
      color: #09346e !important;
      font-size: 14px !important;
      font-weight: 600 !important;
    }
  }

  .pagination {
    background-color: #fafafa;
    padding-bottom: 14px;
  }
}

.components-table-demo-nested {
  top: -10px;
  color: #757575;
}
</style>
