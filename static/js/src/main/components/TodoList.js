// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   TodoList.js                                        :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: kcheung <kcheung@42.fr>                    +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2018/01/15 11:03:35 by kcheung           #+#    #+#             //
//   Updated: 2018/01/15 11:06:29 by kcheung          ###   ########.fr       //
//                                                                            //
// ************************************************************************** //


import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

const TodoList = ({ todos, onTodoClick }) => (
	<ul>
	{todos.map(todo => (
		<Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
	))}
	</ul>
)

TodoList.propTypes = {
	todos: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			completed: PropTypes.bool.isRequired,
			text: PropTypes.string.isRequired
		}).isRequired
	).isRequired,
	onTodoClick: PropTypes.func.isRequired
}

export default TodoList
