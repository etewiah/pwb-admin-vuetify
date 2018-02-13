import Vue from 'vue'
import Hello from '@/components/HelloWorld'
// import MainNav from '@/components/MainNav'

import { mount } from '@vue/test-utils'
import { shallow } from '@vue/test-utils'


describe('Hello.vue', () => {

  test('has correct content', () => {
    const wrapper = mount(Hello)
    expect(wrapper.text()).toBe('First, solve the problem. Then, write the code')
  })


  // it('should render correct contents', () => {
  //   const Constructor = Vue.extend(Hello)
  //   const vm = new Constructor().$mount()
  //   debugger
  //   console.log(vm.$el)
  //   expect(vm.$el.querySelector('blockquote').textContent)
  //     .to.equal('Welcome to Your Vue.js PWA')
  // })
})
