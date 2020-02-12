import React from 'react'
import ReactTestUtils from 'react-dom/test-utils'
import TodoApp from './TodoApp'
import ReactTestRenderer from 'react-test-renderer/shallow'


describe('todo component tests', () => {
	const component = ReactTestUtils.renderIntoDocument(<TodoApp/>)

    test('todo component must have form tag', () => {
        ReactTestUtils.findRenderedDOMComponentWithTag(component, 'form')
    })

    test('todo component must have 2 childrens', () => {
        const form = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'form')
        expect(form.childElementCount).toBe(2)
    })
})

describe('alternative todo component testing', () => {
    test('init don`t have test', () => {
        const component = new ReactTestRenderer()
        component.render(<TodoApp/>)
        const result = component.getRenderOutput()

        const divUnderForm = result.props.children[1]
        const h6Tag = divUnderForm.props.children

        expect(h6Tag.props.children).toBe('You don\'t have todos yet...')
    })
})