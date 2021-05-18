<template>
    <div class="com-search">
        <el-form  :rules="searchRules" :model="formData" ref="form" :inline="true" :label-width="labelWidth" :label-position="labelPosition">
            <el-form-item
                :label="item.label"
                :label-width="item.labelWidth || labelWidth || '0px'"
                v-for="(item, index) in searchList"
                :key="index"
                :style="item.style"
                :prop="item.prop" >

                <el-input
                    :class="item.attributes.className || ''"
                    v-if="item.type === 'input'"
                    v-model="formData[item.key]"
                    :clearable="item.attributes.clearable || true"
                    :type="item.attributes.type || 'text'"
                    :placeholder="item.attributes.placeholder || '请输入'"
                    :disabled="item.attributes.disabled || false"
                    size="small">
                </el-input>

                <el-select
                    v-if="item.type === 'select'"
                    v-model="formData[item.key]"
                    :clearable="item.attributes.clearable"
                    :placeholder="item.attributes.placeholder"
                    :disabled="item.attributes.disabled"
                    :filterable="item.attributes.filterable"
                    size="small">
                    <el-option
                        v-for="opItem in item.selectOptions"
                        :key="item.attributes.props && item.attributes.props.value ? opItem[item.attributes.props.value] : opItem['value']"
                        :label="item.attributes.props && item.attributes.props.label ? opItem[item.attributes.props.label] : opItem['label']"
                        :value="item.attributes.props && item.attributes.props.value ? opItem[item.attributes.props.value] : opItem['value']">
                    </el-option>
                </el-select>

                <el-cascader
                    v-if="item.type === 'cascader'"
                    v-model="formData[item.key]"
                    :clearable="item.attributes.clearable || true"
                    :placeholder="item.attributes.placeholder || '请选择'"
                    :options="item.selectOptions"
                    :props="item.attributes.props"
                    :disabled="item.attributes.disabled"
                    size="small">
                </el-cascader>

                <el-date-picker
                    v-if="item.type === 'datepicker'"
                    class="filter-item"
                    v-model="formData[item.key]"
                    :clearable="item.attributes.clearable || true"
                    :disabled="item.attributes.disabled || false"
                    :type="item.attributes.type"
                    :value-format="item.attributes.valueformat"
                    range-separator="~"
                    :placeholder="item.attributes.placeholder || '请选择'"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    :default-time="item.attributes.type === 'datetimerange' ? ['0:00:00', '23:59:59'] : ''"
                    :picker-options="item.attributes.pickeroptions || {}"
                    size="small"
                ></el-date-picker>

            </el-form-item>
            <el-button type="primary" size="small" @click="handleSearch" v-show="searchBtnText">{{searchBtnText}}</el-button>
            <slot></slot>
        </el-form>

    </div>
</template>

<script>
export default {
    props: {
        // seach item配置
        // {
        //     key: "key"                      v-model绑定的formData中的属性名
        //     label： "label"                 el-form-item 对应的label
        //     labelWidth: "0px"               el-form-item label-width
        //     type: "input"                   过滤项UI控件类型： input select cascader datepicker
        //     initValue: "initValue"          初始值
        //     selectOptions： []              筛选项： 针对 select cascader
        //     attributes： {                  其他配置项
        //         placeholder： "请选择"       placeholder
        //         type: 'text'                当前所属UI控件下细化的type类型 如input 中有 text  number 等
        //         clearable： true            是否可清除
        //         disabled： false            禁用
        //         className： []              自定义class 集合
        //         props: {                    select  cascader  配置选项 如： label value 等

        //         }
        //         valueformat: "timestamp"        datepicker 绑定值的格式

        //     }
        // }
        searchList: {
            type: Array,
            default() {
                return []
            },
        },
        // el-form-item 中label宽度
        labelWidth: {
            type: String,
            default: '88px'
        },
        // el-form-item 中表单域标签的位置  right/left/top
        labelPosition: {
            type: String,
            default: 'left'
        },
        searchBtnText: {
            type: String,
            default: "筛选"
        },
        searchForm: {
            type: Object,
            default() {
                return {}
            }
        },
        bindSearchData: {
            type: Object,
            default:() =>({})
        },
        searchRules: {
            type:Object,
            default:() => ({})
        }
    },
    data() {
        return {
            formData: {}

        };
    },
    watch: {
        searchList: {
            handler(val) {
                // 防止后续变更searchList对formData的影响
                if (val && Object.keys(this.formData).length === 0) {
                    val.map(_ => {
                        this.$set(this.formData, _.key, _.initValue || '')
                    })
                }

            },
            deep: true,
            immediate: true
        },
        searchForm: {
            handler(val) {
                if (val) {
                    const params = JSON.parse(JSON.stringify(val));
                    this.formData = {
                        ...this.formData,
                        ...params
                    }
                    this.$emit("update:bindSearchData",this.formData)
                }
            },
            deep: true,
            immediate: true
        }

    },
    created() {

    },
    mounted() {

    },
    methods: {
        handleSearch() {
            this.$refs.form.validate((valid)=>{
                if(valid) {
                    this.$emit("handleSearch", this.formData)
                }
            })
        },
        // 手动触发校验
        validateField(field){
            this.$refs.form.validateField(field,errorMsg=>{
                this.$emit('formValidateField',errorMsg)
            });
        }

    }
};
</script>

<style lang="scss" scoped>

</style>