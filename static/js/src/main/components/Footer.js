// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   Footer.js                                          :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: kcheung <kcheung@42.fr>                    +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2018/01/15 11:21:04 by kcheung           #+#    #+#             //
//   Updated: 2018/03/19 19:07:35 by kcheung          ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

import React from 'react'
import FilterLink from '../containers/FilterLink'

const Footer = () => (
	<p>
		Show:
		{' '}
		<FilterLink filter="all">
			All
		</FilterLink>
		{', '}
		<FilterLink filter="active">
			Active
		</FilterLink>
		{', '}
		<FilterLink filter="completed">
			Completed
		</FilterLink>
		{', '}
	</p>
)

// const Footer = () => (
// 	<p>
// 		Show:
// 		{' '}
// 		<FilterLink filter="SHOW_ALL">
// 			All
// 		</FilterLink>
// 		{', '}
// 		<FilterLink filter="SHOW_ACTIVE">
// 			Active
// 		</FilterLink>
// 		{', '}
// 		<FilterLink filter="SHOW_COMPLETED">
// 			Completed
// 		</FilterLink>
// 	</p>
// )

export default Footer
