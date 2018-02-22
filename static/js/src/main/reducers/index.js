// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   index.js                                           :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: kcheung <kcheung@42.fr>                    +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2018/01/15 13:52:00 by kcheung           #+#    #+#             //
//   Updated: 2018/01/17 21:34:00 by kcheung          ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

import { combineReducers } from 'redux';
import visibilityFilter from './visibilityFilter'
import todos from './todos'
import user from './user'

export const reducers = combineReducers({
	user: user,
	visibilityFilter: visibilityFilter,
	todos: todos
})

// const initialState = {
//visibilityFilter: VisibilityFilters.SHOW_ALL,
//todos: []
// }
// const toDoReducer = (state=initialState, action) => {
// switch(action.type){
//	 case types.SET_VISIBILITY_FILTER:
//		 state = {...state, visibilityFilter:action.payload}
//	 case types.ADD_TODO:
//		 state = {...state,
//			todos: [...state.todos,
//				{
//					 text: action.payload,
//					 completed: false
//				}
//			]
//		}
//		 console.log("!", state)
//	 case types.TOGGLE_TODO: //copy all objects in tdo array except todo at index
//		 state = {...state,
//			 todos: state.todos.map((todo,index) => {
//				 if (index === action.payload){
//					 state = {...todo, completed: !todo.completed }
//				 }
//			 })
//		 }
// }
// return state
// }


