// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   Todo.js                                            :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: kcheung <kcheung@42.fr>                    +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2018/01/15 11:04:32 by kcheung           #+#    #+#             //
//   Updated: 2018/01/15 11:05:41 by kcheung          ###   ########.fr       //
//                                                                            //
// ************************************************************************** //
//
//Presentaional Component

import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({ text, completed, onClick }) => (
	<li
	onClick={onClick}
	style={{
		textDecoration: completed ? 'line-through' : 'none'
	}}
	>
	{text}
	</li>
)

Todo.propTypes = {
	onClick: PropTypes.func.isRequired,
	completed: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired
}

export default Todo
