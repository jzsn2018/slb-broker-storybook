import SimpleTable from "./src/simple-table/index.js";

export default {
  title: "公共组件库/SimpleTable",
  component: SimpleTable,
};
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SimpleTable },
  data() {
    return {
    };
  },
  methods: {

  },
  template:
    '<simple-table />',
});

export const 完整参考示例 = Template.bind({});
完整参考示例.args = {

};
