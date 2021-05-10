import {
  createLocalVue,
  shallowMount
} from '@vue/test-utils'
import Home from "@/views/Home.vue";
import Vuex from "vuex";
import store from '@/store'

describe("Home", () => {
  test("Home Cursive Title", () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const wrapper = shallowMount(Home, {
      store,
      localVue
    });
    const h1 = wrapper.find("h1, em");
    const text = "Pizzería";
    expect(h1.text()).toBe(text)
  })
})