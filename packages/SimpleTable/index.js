import Vue from "vue";
import {
  Button,
  Table,
  TableColumn,
  Popconfirm,
} from "element-ui";

Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Popconfirm);
// import "element-ui/lib/theme-chalk/button.css";
// import "element-ui/lib/theme-chalk/table.css";
// import "element-ui/lib/theme-chalk/table-column.css";
// import "element-ui/lib/theme-chalk/popconfirm.css";
import  SimpleTable from "./src/simple-table.vue";
export default SimpleTable;