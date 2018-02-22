// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   Link.js                                            :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: kcheung <kcheung@42.fr>                    +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2018/01/15 11:11:44 by kcheung           #+#    #+#             //
//   Updated: 2018/01/15 11:11:46 by kcheung          ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

import React from 'react'
import PropTypes from 'prop-types'

const Link = ({ active, children, onClick }) => {
	if (active) {
		return <span>{children}</span>
	}

	return (
		<a
		href="#"
		onClick={e => {
			e.preventDefault()
			onClick()
		}}
		>
		{children}
		</a>
	)
}

Link.propTypes = {
	active: PropTypes.bool.isRequired,
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired
}

export default Link
