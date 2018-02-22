// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   AddTodo.js                                         :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: kcheung <kcheung@42.fr>                    +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2018/01/15 11:38:09 by kcheung           #+#    #+#             //
//   Updated: 2018/01/15 12:09:41 by kcheung          ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addToDo } from '../actions'

let AddTodo = ({subscribe, dispatch} ) =>{
	let input

	return(
		<div>
		<form
			onSubmit={e => {
				e.preventDefault()
				if(!input.value.trim()){
					return
				}
				dispatch(addToDo(input.value))
				input.value = ''
			}}
		>
			<input
				ref={node => {
					input = node
				}}
			/>
			<button type="submit">Add Task</button>
		</form>
		</div>
	)
}

AddTodo = connect()(AddTodo)

export default AddTodo
