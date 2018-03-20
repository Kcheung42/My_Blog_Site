// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   VisibileTodoList.js                                :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: kcheung <kcheung@42.fr>                    +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2018/01/15 11:06:15 by kcheung           #+#    #+#             //
//   Updated: 2018/03/19 19:41:07 by kcheung          ###   ########.fr       //
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
import { withRouter } from 'react-router' //allows us to inject router related props into Connected Components
import TodoList from '../components/TodoList'
import React from 'react';

// const getVisibleTodos = (todos, filter) => {
// 	switch (filter) {
// 		case 'SHOW_ALL':
// 			return todos
// 		case 'SHOW_COMPLETED':
// 			return todos.filter(t => t.completed)
// 		case 'SHOW_ACTIVE':
// 			return todos.filter(t => !t.completed)
// 	}
// }

const getVisibleTodos = (todos, filter) => {
	switch (filter) {
		case 'all':
			return todos
		case 'completed':
			return todos.filter(t => t.completed)
		case 'active':
			return todos.filter(t => !t.completed)
		default:
			throw new Error('unknown filter: ${filter}.')
	}
}

// const mapStateToProps = (state, ownProps) => {
const mapStateToProps = (state, { params }) => { //ES6 deconstruction syntax params
	return {
		todos: getVisibleTodos(
			state.todos,
			params.filter || 'all'
			// ownProps.params.filter || 'all'
		)
	}
}

// const mapDispatchToProps = dispatch => {
// 	return {
// 		onTodoClick: id => {
// 			dispatch(toggleToDo(id))
// 		}
// 	}
// }

const VisibleTodoList = withRouter(connect(
	mapStateToProps,
	{ onTodoClick: toggleToDo }

	//shorthand. Works because id is passed to the callback is passed to the actionCreators
	// mapDispatchToProps

)(TodoList));

export default VisibleTodoList
