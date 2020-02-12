import React, { Component } from 'react'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'


export default class TodoApp extends Component {
	constructor() {
		super()

		this.state = {
			todos: []
		}
	}

	addTodo(val) {
		this.setState({
			todos: [...this.state.todos, {
				id: Date.now(),
				text: val,
				completed: false
			}]
		})
	}

	switchComplete(id) {
		this.setState({
			todos: this.state.todos.map(todo => {
				if (todo.id === id) {
					todo.completed = !todo.completed
				}
				return todo
			})
		})
	}

	removeTodo(id) {
		this.setState({
			todos: this.state.todos.filter(todo => {
				return todo.id !== id
			})
		})
	}

	render() {
		const { todos } = this.state

		return <div style={{ margin: 10 }}>
			<TodoForm addTodo={this.addTodo.bind(this)} />

			<div style={{ marginTop: 50 }}>
				{todos.length ?
					<div>
						<h3>TODOS:</h3>
						<ul>
							{todos.map(todo => {
								return <TodoItem
									key={todo.id} {...todo}
									removeTodo={this.removeTodo.bind(this)}
									switchComplete={this.switchComplete.bind(this)}
								/>
							})}
						</ul>
					</div> : <h6>You don't have todos yet...</h6>}
			</div>
		</div>
	}
}