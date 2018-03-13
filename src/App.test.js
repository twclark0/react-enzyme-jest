import React from 'react'
import ReactDOM from 'react-dom'
import App, { Link } from './App'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

configure({ adapter: new Adapter() })

describe('<App /> shallow rendering', () => {
  it('h1 contains correct text', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('h1').text()).toBe('Welcome to React')
  })
  it('matches the snapshot', () => {
    const tree = shallow(<App />)
    expect(toJson(tree)).toMatchSnapshot()
  })
  it('on button click changes p text', () => {
    const wrapper = shallow(<App />)
    const button = wrapper.find('button')
    expect(wrapper.find('.button-state').text()).toBe('No!')
    button.simulate('click')
    expect(wrapper.find('.button-state').text()).toBe('Yes!')
  })
  it('on input change, title changes text', () => {
    const wrapper = shallow(<App />)
    const input = wrapper.find('input')
    expect(wrapper.find('h2').text()).toBe('')
    input.simulate('change', {currentTarget: {value: 'Tyler'}})
    expect(wrapper.find('h2').text()).toBe('Tyler')
  })
})

describe('<App /> mount rendering', () => {
  it('h1 contains correct text', () => {
    const wrapper = mount(<App />)
    expect(wrapper.find('h1').text()).toBe('Welcome to React')
    wrapper.unmount()
  })
  it('matches the snapshot', () => {
    const tree = mount(<App />)
    expect(toJson(tree)).toMatchSnapshot()
    tree.unmount()
  })
})

describe('<Link />', () => {
  it('link component accepts address prop', () => {
    const wrapper = shallow(<Link address='www.google.com' />)
    expect(wrapper.instance().props.address).toBe('www.google.com')
  })
  it('a tag node renders href correctly', () => {
    const wrapper = shallow(<Link address='www.google.com' />)
    expect(wrapper.props().href).toBe('www.google.com')
  })
  it('returns null with true hide prop', () => {
    const wrapper = shallow(<Link hide={false} />)
    expect(wrapper.find('a').length).toBe(1)
    wrapper.setProps({ hide: true })
    expect(wrapper.get(0)).toBeNull()
  })
})