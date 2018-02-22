// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   VisibileTodoList.js                                :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: kcheung <kcheung@42.fr>                    +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2018/01/15 11:06:15 by kcheung           #+#    #+#             //
//   Updated: 2018/01/15 12:18:31 by kcheung          ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

// We will also need some container components to connect the presentational
// components to Redux. For example, the presentational TodoList component needs
// a container like VisibleTodoList that subscribes to the Redux store and knows
// how to apply the current visibility filter.
//
// VisibleTodoList filters the todos according to the current visibility filter
// and renders a TodoList.

import { connect } from 'react-redux'
import { toggleToDo } from '../actions'
import TodoList from '../components/TodoList'
import React from 'react';

const getVisibleTodos = (todos, filter) => {
	switch (filter) {
		case 'SHOW_ALL':
			return todos
		case 'SHOW_COMPLETED':
			return todos.filter(t => t.completed)
		case 'SHOW_ACTIVE':
			return todos.filter(t => !t.completed)
	}
}

const mapStateToProps = state => {
	return {
		todos: getVisibleTodos(state.todos, state.visibilityFilter)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onTodoClick: id => {
			dispatch(toggleToDo(id))
		}
	}
}

const VisibleTodoList = connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoList)

export default VisibleTodoList
