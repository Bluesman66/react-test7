import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import TodoApp from './TodoApp';

test('todo component must have form tag', () => {
	const component = ReactTestUtils.renderIntoDocument(<TodoApp />);
	ReactTestUtils.findRenderedDOMComponentWithTag(component, 'form');
})