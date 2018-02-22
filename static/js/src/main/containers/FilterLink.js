// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   FilterLink.js                                      :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: kcheung <kcheung@42.fr>                    +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2018/01/15 11:06:32 by kcheung           #+#    #+#             //
//   Updated: 2018/01/15 11:08:03 by kcheung          ###   ########.fr       //
//                                                                            //
// ************************************************************************** //
//
// FilterLink gets the current visibility filter and renders a Link.
//		filter: string is the visibility filter it represents.

import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => {
	return {
		active: ownProps.filter === state.visibilityFilter
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: () => {
			dispatch(setVisibilityFilter(ownProps.filter))
		}
	}
}

const FilterLink = connect(
	mapStateToProps,
	mapDispatchToProps
)(Link)

export default FilterLink
