import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import TodoApp from './TodoApp'

configure({ adapter: new Adapter() });

describe('todo testing with enzyme', () => {
	test('should be h6 tag on init app', () => {
		const component = shallow(<TodoApp />)
		const h6Tag = component.find('h6')

		expect(h6Tag).toHaveLength(1)
	})
})
