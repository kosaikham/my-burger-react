import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    })

    it('should render 2 <NavigationItem /> if it is not authenticate', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })

    it('should render 3 <NavigationItem /> if it is authenticated', () => {
        // wrapper = shallow(<NavigationItems isAuth />);
        wrapper.setProps({isAuth: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })

    it('should contain Logout <NavigationItem /> if it is authenticated', () => {
        wrapper.setProps({isAuth: true})
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    })
})