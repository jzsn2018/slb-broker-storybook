import Vue from "vue";
import {
  Button,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Cascader,
  DatePicker,
} from "element-ui";

Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Cascader);
Vue.use(DatePicker);

import "element-ui/lib/theme-chalk/index.css";
import  SlbSearchGroup from "src/Search.vue";
export default SlbSearchGroup;