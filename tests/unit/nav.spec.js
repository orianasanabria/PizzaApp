import {
  createLocalVue,
  shallowMount
} from '@vue/test-utils'
import Nav from "@/components/Nav.vue";
import Vuex from "vuex";
import store from '@/store'

describe("Nav Component", () => {
  test("Cart Icon", () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const wrapper = shallowMount(Nav, {
      store,
      localVue
    });
    const icon = wrapper.find(".cart-icon");
    expect(icon.exists()).toBe(true)
  })
})