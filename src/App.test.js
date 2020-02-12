import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TodoApp from './TodoApp';

configure({ adapter: new Adapter() });

describe('todo testing with enzyme', () => {
	const component = shallow(<TodoApp />);
	const h6Tag = component.find('h6');

	test('should be h6 tag on init app', () => {
		expect(h6Tag).toHaveLength(1);
	})

	test('h6 tag must have init text', () => {
		expect(h6Tag.text()).toBe('You don\'t have todos yet...');
	})

	test('addTodo method test', () => {
		component.instance().addTodo('some todo');
		component.instance().addTodo('some todo2');

		component.setState({
			todos: [
				...component.state().todos,
				{ id: Date.now(), text: 'todo3', completed: false }
			]
		});

		expect(component.state().todos).toHaveLength(3);
	})

	describe('full render testing', () => {
		const component = mount(<TodoApp />);

		test('todo form must have addTodo prop', () => {
			expect(component.childAt(0).props().children[0].props.addTodo).toBeDefined();
		});

		test('addTodo method call re-render', () => {
			component.instance().addTodo('todo1');
			component.instance().addTodo('todo2');
			component.instance().addTodo('todo3');

			expect(component.childAt(1).children('div'));

			console.log(component.childAt(1).children('div').find('ul'));
			
			//expect(component.childAt(1).children('div').find('ul').get(0).childElementCount).toEqual(3);
		});
	})
})
