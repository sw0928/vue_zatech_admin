<template>
  <div class="collapse">
      <!-- {{item}} -->
    <a-collapse v-model="activeKey">
      
      <a-collapse-panel :header="title" key="1">
        <div id="add">
        
          <modelForm
            :is_null="item.is_null"
            v-model="productData[item.key]"
            :key="item.key"
            :title="item.title"
            :items="item.items"
            :type="item.type"
            :size="item.size"
            v-for="item in collapse_arr"
            :required="item.required"
            class="comDiv"
            :isAutoPlacehoder="false"
          ></modelForm>
        </div>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: "打开App, 浏览更多"
    },
    collapse_arr: {
      // type: Array,
      required: false,
      default: "打开App, 浏览更多"
    }
  },
  data() {
    return {
      activeKey: ["1"],
      productData: {}
    };
  },
  watch: {
    activeKey(key) {
      console.log(key);
    },
      productData: {
      handler: function(value,old) {
          this.$emit("collapseChange", value);
        // }
      },
      deep:true
    },
      collapse_arr: {
      handler: function(value) {
          this.$emit("collapseChange", value);
        // }
      },
    },
      deep:true

    
  },
  created() {
       this.$nextTick(() => {
      this.collapse_arr.forEach((item, index) => {
        this.$set(this.productData, item.key, item.value);
      });
    });
  },
  mounted() {
 
  }
};
</script>
<style lang="scss" scoped>
.collapse {
  padding: 10px;
  // background: red;

  .ant-collapse-item {
    /deep/ .ant-collapse-content {
      // background: red;
      overflow: inherit;
    }
  }
}
/deep/#collapse_form,
#add {
  width: 100% !important;
  display: inline-block;
  .comDiv {
    margin-bottom: 10px;
    display: inline-block !important;
    width: 40% !important;
    /deep/ .modelItem {
      .leftSpan {
        min-width: 105px !important;
      }
    }
  }
}
</style>
