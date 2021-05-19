import SlbSearchGroup from "../src/slb-search-group/index.vue";

import { mount } from "@vue/test-utils";

describe("slb-search-group",()=>{
  test("slb-search-group",()=>{
    const wrapper = mount(SlbSearchGroup);
    expect(wrapper.html()).toContain("筛选");
  })
  // 测试props 
  test("slb-search-group",()=>{
    const wrapper = mount(SlbSearchGroup,{
      // 传入props 
      propsData:{
        type: "password",
        value: "admin"
      }
    });
    expect(wrapper.props('value')).toBe("admin");
  })
  test("slb-search-group-snapshot",()=>{
    const wrapper = mount(SlbSearchGroup,{
      // 传入props 
      propsData:{
        type: "password",
        value: "admin"
      }
    });
    //! 第一次执行，会生成快照文件
    //! 再次执行，会比对新的组件内容和快照之间的对比，相同就 test pass 反之 failed
    expect(wrapper.vm.$el).toMatchSnapshot();
  })
})