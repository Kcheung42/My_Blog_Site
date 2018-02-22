// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   visibilityFilter.js                                :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: kcheung <kcheung@42.fr>                    +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2018/01/15 13:39:59 by kcheung           #+#    #+#             //
//   Updated: 2018/01/15 13:50:31 by kcheung          ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

// import VisibilityFilters from '../actions'
import types from '../actions/actionTypes'

// const { SHOW_ALL } = VisibilityFilters

const visibilityFilter = (state='SHOW_ALL', action ) => {
	switch(action.type){
		case types.SET_VISIBILITY_FILTER:
			return action.payload
		default:
				return state
	}
}

export default visibilityFilter
