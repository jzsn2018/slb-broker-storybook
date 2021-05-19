import Vue from "vue";
import SlbSearchGroup from "../index.js";

new Vue({
  el: "#app",
  render: (h) =>
    h(SlbSearchGroup, {
      props: {
        searchList: [
          {
            type: "select",
            key: "oddNoCode",
            prop: "oddNoCode",
            labelWidth: "70px",
            label: "下拉框",
            style: {
              marginRight: "25px",
            },
            selectOptions: [
              { dictValueDesc: "人核单", dictValue: 0 },
              { dictValueDesc: "预订单号", dictValue: 1 },
              { dictValueDesc: "订单号", dictValue: 2 },
            ],
            attributes: {
              placeholder: "下拉框示例",
              clearable: true,
              props: {
                label: "dictValueDesc",
                value: "dictValue",
              },
            },
          },
          {
            type: "input",
            key: "oddNo",
            prop: "oddNo",
            label: "输入框",
            labelWidth: "70px",
            style: {
              marginRight: "25px",
            },
            attributes: {
              placeholder: "请输入对应的编号",
              clearable: true,
            },
          },
          {
            type: "cascader",
            key: "userNo",
            prop: "userNo",
            label: "级联选择器",
            labelWidth: "100px",
            style: {
              marginRight: "25px",
            },
            selectOptions:  [{
              value: 1,
              label: '东南',
              children: [{
                value: 2,
                label: '上海',
                children: [
                  { value: 3, label: '普陀' },
                  { value: 4, label: '黄埔' },
                  { value: 5, label: '徐汇' }
                ]
              }, {
                value: 7,
                label: '江苏',
                children: [
                  { value: 8, label: '南京' },
                  { value: 9, label: '苏州' },
                  { value: 10, label: '无锡' }
                ]
              }, {
                value: 12,
                label: '浙江',
                children: [
                  { value: 13, label: '杭州' },
                  { value: 14, label: '宁波' },
                  { value: 15, label: '嘉兴' }
                ]
              }]
            }, {
              value: 17,
              label: '西北',
              children: [{
                value: 18,
                label: '陕西',
                children: [
                  { value: 19, label: '西安' },
                  { value: 20, label: '延安' }
                ]
              }, {
                value: 21,
                label: '新疆维吾尔族自治区',
                children: [
                  { value: 22, label: '乌鲁木齐' },
                  { value: 23, label: '克拉玛依' }
                ]
              }]
            }],
            attributes: {
              placeholder: "请选择地点",
              clearable: true,
            },
          },
          {
            type: "datepicker",
            key: "payEffe",
            prop: "payEffe",
            label: "日期选择器",
            labelWidth: "110px",
            style: {
              marginRight: "25px",
            },
            attributes: {
              clearable: true,
              type: "daterange",
              placeholder: "请选择支付有效期时间",
              valueformat: "yyyy-MM-dd",
              pickeroptions: {},
            },
          },
        ],
      },
    }),
});
