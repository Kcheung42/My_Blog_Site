// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   user.js                                            :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: kcheung <kcheung@42.fr>                    +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2018/01/15 13:53:38 by kcheung           #+#    #+#             //
//   Updated: 2018/01/15 13:55:37 by kcheung          ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

import types from '../actions/actionTypes'

const user = (state={}, action) => {
	switch(action.type){
		case types.CHANGE_NAME:{
			state = {...state, name: action.payload} // object spread operator
			break
		}
		case types.CHANGE_AGE:{
			state = {...state, age: action.payload}
			break
		}
	}
	return state;
};

export default user
