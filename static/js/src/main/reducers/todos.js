// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   todos.js                                           :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: kcheung <kcheung@42.fr>                    +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2018/01/15 13:51:44 by kcheung           #+#    #+#             //
//   Updated: 2018/03/19 16:38:49 by kcheung          ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

import types from '../actions/actionTypes'

//reducer composition below, splitting of state to manage
const todos = (state=[], action) => {
	switch(action.type){
		case types.ADD_TODO:
			return [...state,
				{
					id: action.id,
					text: action.payload,
					completed: false
				}
			]
		case types.TOGGLE_TODO:
			return state.map((todo) =>
				(todo.id === action.payload)
				? {...todo, completed: !todo.completed}
				: todo
			)
		default:
			return state
	}
}

export default todos

// reducers are functions that returns the next state
// by looking at the previous state and an action that
// describes how things should change
