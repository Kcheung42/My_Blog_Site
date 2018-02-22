// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   Index.jsx                                          :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: kcheung <kcheung@42.fr>                    +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2018/01/15 11:14:46 by kcheung           #+#    #+#             //
//   Updated: 2018/01/17 13:18:57 by kcheung          ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

import React from 'react';
import { render } from 'react-dom';
import { HelloWorld } from './components/HelloWorld';
import { App1Container } from './containers/App1Container';
// import { changeName, addToDo, toggleToDo } from './actions';
import { reducers } from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// const reducer = function(state, action){
// if (action.type == 'INC'){
//return state + action.payload
// }
// if (action.type == 'DEC'){
//return state - action.payload
// }
// return state;
// }

// const store = createStore(reducer, 0);
// store.dispatch({type: "INC", payload: 1})
// store.dispatch({type: "DEC", payload: 100})

const store = createStore(reducers);

store.subscribe(() => {
	console.log("store changed", store.getState())
})

// Bound ActionCreator
// const boundChangeName = text => dispatch(changeName("Bambi"))
//
// store.dispatch({type: "CHANGE_NAME", payload: 'Bambi'})
// store.dispatch(changeName('Cheung'))
// store.dispatch({type: "CHANGE_AGE", payload: 27})
// store.dispatch({type: "CHANGE_AGE", payload: 21})
// store.dispatch({type: "CHANGE_AGE", payload: 33})
// store.dispatch(addToDo('My First task'))
// store.dispatch(addToDo('My Second task'))
// store.dispatch(addToDo('My Third task'))
// store.dispatch(addToDo('My Fourth task'))
// store.dispatch(toggleToDo(1))
//
render(
	<Provider store={store}>
		<App1Container />
	</Provider>,
	document.getElementById('react-root'))
