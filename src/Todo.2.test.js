import React from 'react'
import { mount, shallow } from 'enzyme'
import Todo from './Todo'
import TodoForm from './TodoForm'

describe('todo testing with enzyme', () => {
	const component = shallow(<Todo/>)
	const h6Tag = component.find('h6')

	test('should be h6 tag on init app', () => {
		expect(h6Tag).toHaveLength(1)
	})

	test('h6 tag must have init text', () => {
		expect(h6Tag.text()).toBe('You don\'t have todos yet...')
	})

	test('addTodo method test', () => {
		component.instance().addTodo('some todo')
		component.instance().addTodo('some todo2')

		component.setState({
			todos: [
				...component.state().todos,
				{ id: Date.now(), text: 'todo3', completed: false }
			]
		})

		expect(component.state().todos).toHaveLength(3)
	})
})

describe('full render testing', () => {
	const component = mount(<Todo/>)

	test('todo form must have addTodo prop', () => {
		expect(component.childAt(0).props().addTodo).toBeDefined()
	})

	test('addTodo method call re-render', () => {
		component.instance().addTodo('todo1')
		component.instance().addTodo('todo2')
		component.instance().addTodo('todo3')

		expect(component.childAt(1).children().type()).toBe('div')
		expect(component.childAt(1).children().find('ul').get(0).childElementCount).toEqual(3)
	})
})

test('test add todo with interactive', () => {
	const component = mount(<Todo/>)

	const addTodo = (val = '') => {
		component.find('input').get(0).value = val
		component.find('form').simulate('submit')
	}

	addTodo('some todo1')
	addTodo('some todo2')
	addTodo('some todo3')

	expect(component.state().todos).toHaveLength(3)
})

test('submit method must have preventDefault', () => {
	const component = shallow(<TodoForm/>)
	const addTodoFunc = component.instance().addTodo.toString()
	expect(addTodoFunc.indexOf('e.preventDefault()')).toBeGreaterThan(-1)
})