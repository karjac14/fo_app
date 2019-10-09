import React from 'react';
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReferPane from "./refer-pane";

Enzyme.configure({ adapter: new Adapter() });

describe("Refer pane", () => {
    test("renders", () => {
        const wrapper = shallow(<ReferPane />);
        expect(wrapper.exists()).toBe(true);
    })
    test("renders", () => {
        const wrapper = shallow(<ReferPane />);
        expect(wrapper.find('#refer-button').length).toBe(1);
    })
})
