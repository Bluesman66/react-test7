import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TodoApp from './TodoApp';
import TodoForm from './TodoForm';

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
})

describe('full render testing', () => {
	const component = mount(<TodoApp />);

	test('todo form must have addTodo prop', () => {
		expect(component.childAt(0).props().children[0].props.addTodo).toBeDefined();
	});

	test('addTodo method calls re-render', () => {
		component.instance().addTodo('todo1');
		component.instance().addTodo('todo2');
		component.instance().addTodo('todo3');

		expect(component.text().indexOf('todo1')).toBeGreaterThan(-1);
		expect(component.text().indexOf('todo2')).toBeGreaterThan(-1);
		expect(component.text().indexOf('todo3')).toBeGreaterThan(-1);
		expect(component.text().indexOf("You don't have todos yet...")).toBe(-1);
	});
})


test('submit method must have preventDefault', () => {
	const component = shallow(<TodoForm />)
	const addTodoFunc = component.instance().addTodo.toString()
	expect(addTodoFunc.indexOf('e.preventDefault()')).toBeGreaterThan(-1)
})

test('test add todo with interactive', () => {
	const component = mount(<TodoApp />)

	const addTodo = (val = '') => {
		component.find('input').instance().value = val;
		component.find('form').simulate('submit');
	}

	addTodo('some todo1');
	addTodo('some todo2');
	addTodo('some todo3');

	expect(component.state().todos).toHaveLength(3);
})