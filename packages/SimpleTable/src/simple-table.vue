<template>
    <div class="com-simple-table">
        <h4 class="title" v-if="title">{{title}}</h4>
        <el-table :data="tableData" border :span-method="spanMethod">
            <el-table-column
                v-for="(item, index) in columns"
                :key="index"
                :label="item.label"
                :prop="item.prop"
                :align="item.align ? item.align : 'center'"
                :width="getWidth(item)">
                <template slot-scope="scope">
                    <div v-if="item.render" v-html="item.render(scope, item)"></div>
                    <template v-else>
                        <template v-if="item.type !== 'columnOperation'">
                            <!-- 做省略号处理 只对超过字数的进行提示-->
                            <div v-if="!item.contentMaxLen">{{getContent(scope, item)}}</div>
                            <template v-else>
                                <el-tooltip v-if="scope.row[item.prop] && (scope.row[item.prop].length > item.contentMaxLen)" popper-class="slb-tooltip-wrap__max-width" effect="dark" :content="scope.row[item.prop]" placement="top-start">
                                  <div>{{getContent(scope, item)}}</div>
                                </el-tooltip>
                                <div v-else>{{getContent(scope, item)}}</div>
                            </template>
                        </template>
                        <!-- 操作button -->
                        <TableOperation
                            v-if="item.type === 'columnOperation'"
                            :operations="getOperations(scope, item)"
                            :singalButton="item.operations && item.operations.length === 1"
                            :showWrap="item.showWrap"
                            @handleClick="(item) => handleOperation(item, scope.row)" />
                    </template>
                </template>
            </el-table-column>
        </el-table>
		<!-- 分页 -->
		<el-pagination
			v-if="showPagination && total > 0"
			background
			layout="total, sizes, prev, pager, next, jumper"
			:total="total"
			:page-sizes="[5, 10, 50, 100]"
			:page-size="pageSize"
			@current-change="handlePageChange"
			:current-page="currentPage"
			@size-change="handleSizeChange">
        </el-pagination>
    </div>
</template>

<script>
import TableOperation from "./table-operation";

const DefaultList = [
    { type: "", name: "向上", actionType: "UP", disabled: false },
    { type: "", name: "向下", actionType: "DOWN", disabled: false  },
    { type: "primary", name: "编辑", actionType: "EDIT", disabled: false  },
    { type: "danger", name: "删除", actionType: "DELETE", disabled: false  },
]

export default {
    components: {
        TableOperation
    },
    props: {
        // 表格上title
        title: {
            type: String,
            default: ""
        },
        // 表格中的columns 设置
        // type: 默认 不填写 排序： index  button类型： columnOperation
        // label: 姓名 el-table-column 中的label
        // prop: name el-table-column 中的prop
        // width: 宽
        // showWrap: flex 布局 是否换行 针对 type为columnOperation
        // operations: 操作button list  不传默认使用 DefaultList
        // contentMaxLen: 20 展示文本长度限制,超出省略号展示, 设置0不限制， 默认20
        columns: {
            type: Array,
            default() {
                return []
            }
        },
        tableData: {
            type: Array,
            default() {
                return []
            }
        },
        // 操作button
        operations: {
            type: Array,
            default() {
                return DefaultList
            }
        },
        showPagination: {
            type: Boolean,
            default: false
        },
        total: {
            type: Number,
            default: 10
        },
        currentPage: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 10
        },
        spanMethod: {
            type: Function,
            default:()=>{}
        }
    },
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {

    },
    methods: {
        getContent(scope, item) {
            const { type, prop, contentMaxLen = 0 } = item;
            if (type === 'index') {
                return scope.$index + 1
            } else {
                let content = scope.row[prop];
                content = content === 0 ? '0' : content;
                const len = content && content.length || 0;
                // 超出字数限制部分省略号展示
                return !!contentMaxLen
                    && len > contentMaxLen
                        && `${content.slice(0, contentMaxLen)}......`
                            || content
                                || "-";
            }

        },
        // 注意： 对于向上、向下 actionType 定为： UP DOWN
        // 特殊业务场景 处理 向上、向下
        getOperations(scope, item) {
            const {  tableData } = this;
            let columnOperations = item.operations || DefaultList;
            if(columnOperations instanceof Function) {
                columnOperations = columnOperations(scope, item);
            }
            let data = JSON.parse(JSON.stringify(columnOperations));
            const len = tableData.length;
            const index = scope.$index + 1;
            data.map(operation => {
                const { actionType } = operation;
                operation.disabled = (
                        actionType === 'UP'
                        && index === 1
                    ) || (
                        actionType === 'DOWN'
                        && index === len
                    );
            })
            // 特殊情况可以通过 getOperations 利用 对象(object) 是引用类型的特性去操作 data
            this.$emit('getOperations', { operations: data, tableData, scope });
            return data;

        },
        // 设置column的宽度
        getWidth(item) {

            let { type, width } = item;
            if (type === "columnOperation") {
                width = width || 160;
            }
            return width;

        },
        handleOperation(item, row) {
            this.$emit("handleOperation", { operationItem: item, row } );
        },
        getData(params) {
            this.$emit("handleSearch", params);

        },
        handlePageChange(val) {
            const params = {
                currentPage: val,
                pageSize: this.pageSize
            }
            this.getData(params);

        },
        handleSizeChange(val) {
            const params = {
                pageSize: val,
                currentPage: 1,
            }
            this.getData(params);
        }

    }
};
</script>

<style  lang="scss">
.com-simple-table {
    padding: 10px 0;
    .title {
        margin-bottom: 10px;
    }
    .el-pagination {
        padding-top: 20px;
        text-align: center;
    }
}
.el-tooltip__popper {
    max-width: 80%;

}
.slb-tooltip-wrap__max-width{
    width: 60%;
    max-width: 80%;
}

</style>
