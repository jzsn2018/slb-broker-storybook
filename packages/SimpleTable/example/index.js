import Vue from "vue";
import "element-ui/lib/theme-chalk/index.css"
import SimpleTable from "../index.js";

new Vue({
  el: "#app",
  render: (h) =>
    h(SimpleTable, {
      props: {
        title: "Simple Table Example",
        columns: [
          { label: "序号", prop: "index" },
          { label: "时间", prop: "date" },
          { label: "订单号", prop: "orderCode" },
          { label: "描述", prop: "desc" },
        ],
      },
    }),
});
