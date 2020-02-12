import React from 'react'


const TodoItem = ({ text, id, completed, switchComplete, removeTodo }) =>
	<li style={{ margin: 0 }}>
		<span
			onClick={() => switchComplete(id)}
			style={{ textDecoration: completed ? 'line-through' : 'none', cursor: 'default', userSelect: 'none' }}>

			{text}
		</span>

		<span
			onClick={() => removeTodo(id)}
			style={{ marginLeft: 20, cursor: 'pointer' }}>

			&times;
		</span>
	</li>

export default TodoItem