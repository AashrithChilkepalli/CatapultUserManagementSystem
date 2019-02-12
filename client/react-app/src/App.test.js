import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import expect from "expect";
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Landing from './components/Landing'
import Navbar from './components/Navbar'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});


describe("Auth Components Renders correctly", () => {
  test("Register Component renders", () => {
    const wrapper = shallow(<Register />);
    const abc = wrapper.find('button').length
    expect(wrapper.exists()).toBe(true);
  })

  test("Login Component renders", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.exists()).toBe(true);
  })
})


describe("Landing Components render correctly", () => {

  test("Landing Component renders with the correct text", () => {
    const wrapper = shallow(<Landing />);
    const spanText = wrapper.find('span').text()
    expect(spanText).toEqual("User Registration Portal")
  })

  test("Number of Link nodes in Navbar is one", () => {
    const wrapper = shallow(<Navbar />);
    const linkLength = wrapper.find('Link').length
    expect(linkLength).toEqual(1);

  })

  test("Number of Link nodes in Landing is two", () => {
    const wrapper = shallow(<Landing />);
    const linkLength = wrapper.find('Link').length
    expect(linkLength).toEqual(2);
  })


})
