// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   index.js                                           :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: kcheung <kcheung@42.fr>                    +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2018/01/15 13:51:47 by kcheung           #+#    #+#             //
//   Updated: 2018/01/15 13:51:48 by kcheung          ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

import types from './actionTypes';

export function changeName(payload){
	return {type: types.CHANGE_NAME, payload }
}

export function changeAge(payload){
	return { type: types.CHANGE_AGE, payload }
}

export const VisibilityFilters = {
	SHOW_ALL: 'SHOW_ALL',
	SHOW_COMPLETED: 'SHOW_COMPLETED',
	SHOW_ACTIVE: 'SHOW_ACTIVE',
}

let nextTodoId = 0
export const addToDo = text =>{
	return {
		type: types.ADD_TODO,
		id: nextTodoId++,
		payload: text
	}
}

export const toggleToDo = id =>{
	return {
		type: types.TOGGLE_TODO,
		payload: id
	}
}

export const setVisibilityFilter = filter => {
	return {
		type: types.SET_VISIBILITY_FILTER,
		payload: filter
	}
}
