<template>
    <div :class="['com-table-operation', showWrap && 'show-wrap',singalButton && 'singal-button']">
        <div 
            class="operation-button-item"
            v-for="(item, index) in operations"
            :key="index">
            <el-popconfirm
                v-if="item.actionType === 'DELETE'"
                :title="item.tipMessage || '确定要删除吗'"
                @onConfirm="handleClick(item)">
                <el-button 
                    type="danger"
                    :disabled="item.disabled"
                    :size="buttonSize"
                    slot="reference">删除</el-button>
            </el-popconfirm>
            <el-button
                v-else
                :type="item.type"
                :disabled="item.disabled"
                :plain="item.plain"
                @click="handleClick(item)"
                :size="item.type === 'text' ? 'medium' : buttonSize">{{item.name}}</el-button>
        </div>
        <slot></slot>
    </div>
</template>

<script>
const DefaultList = [
    { type: "", name: "向上", actionType: "UP", disabled: false },
    { type: "", name: "向下", actionType: "DOWN", disabled: false  },
    { type: "primary", name: "编辑", actionType: "EDIT", disabled: false  },
    { type: "danger", name: "删除", actionType: "DELETE", disabled: false  },
]
export default {
    props: {
        operations: {
            type: Array,
            default() {
                return DefaultList;
            }
        },
        // 按钮size
        buttonSize: {
            type: String,
            default: "mini"
        },
        // flex 布局
        showWrap: {
            type: Boolean,
            default: false
        },
        singalButton: {
            type: Boolean,
            default: false
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
        handleClick(item) {
            this.$emit("handleClick", item);
        }

    }
};
</script>

<style scoped lang="scss">
.com-table-operation {
    display: flex;
    justify-content: flex-start;
    .el-button {
        margin: 0 5px;
    }
    &.show-wrap {
        flex-wrap: wrap;
        justify-content: flex-start;
        .el-button {
            margin: 5px;
        }
    }
    &.singal-button {
        flex-wrap: wrap;
        justify-content: center;
    }
}

</style>
