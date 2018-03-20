// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   FilterLink.js                                      :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: kcheung <kcheung@42.fr>                    +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2018/01/15 11:06:32 by kcheung           #+#    #+#             //
//   Updated: 2018/03/19 19:19:15 by kcheung          ###   ########.fr       //
//                                                                            //
// ************************************************************************** //
//
// FilterLink gets the current visibility filter and renders a Link.
//		filter: string is the visibility filter it represents.

import React from 'react'
import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';
import { Link } from 'react-router';

const FilterLink = ({filter, children}) => (
	<Link
		to={filter == 'all' ? '/' : filter}
		activeStyle={{
			textDecoration: 'none',
			color: 'black',
		}}
	>
		{children}
	</Link>
);

// import Link from '../components/Link'
// const mapStateToProps = (state, ownProps) => {
// 	return {
// 		active: ownProps.filter === state.visibilityFilter
// 	}
// }
//
// const mapDispatchToProps = (dispatch, ownProps) => {
// 	return {
// 		onClick: () => {
// 			dispatch(setVisibilityFilter(ownProps.filter))
// 		}
// 	}
// }
//
// const FilterLink = connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(Link)

export default FilterLink
