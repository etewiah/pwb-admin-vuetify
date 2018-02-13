import { mount } from '@vue/test-utils'
import { shallow } from '@vue/test-utils'
import Hello from '@/components/HelloWorld'
// import Hello from './component'

describe('Hello', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Hello)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('has correct content', () => {
    const wrapper = mount(Hello)
    expect(wrapper.text()).toBe('First, solve the problem. Then, write the code')
  })
})


describe('Hello', () => {
  it('renders a div', () => {
    const wrapper = shallow(Hello, {
      propsData: {
        color: 'red'
      }
    })
    expect(wrapper.hasProp('color', 'red')).toBe(true)
  })
})