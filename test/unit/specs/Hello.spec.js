import Vue from 'vue'
import Hello from '@/components/HelloWorld'
// import MainNav from '@/components/MainNav'

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Hello)
    const vm = new Constructor().$mount()
    debugger
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js PWA')
  })
})
