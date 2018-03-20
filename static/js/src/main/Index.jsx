// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   Index.jsx                                          :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: kcheung <kcheung@42.fr>                    +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2018/01/15 11:14:46 by kcheung           #+#    #+#             //
//   Updated: 2018/02/26 19:05:16 by kcheung          ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

import React from 'react';
import reducer from './reducers';
import AppTodo from './containers/AppTodo';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from 'react-dom';

import {Router, Route, Switch, browserHistory} from 'react-router'
import Login from './containers/Login';
import PrivateRoute from './containers/PrivateRoute';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
import configureStore from './store'


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

// const history = createHistory()
// const store = configureStore(history)
const store = createStore(reducer);

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="(:filter)" component={AppTodo}/>
		</Router>
	</Provider>,
	document.getElementById('react-root')
)

// render(
// 	<Provider store={store}>
// 		<ConnectedRouter history={history}>
// 			<Switch>
// 				<Route exact path="/login/" component={Login} />
// 				<PrivateRoute path="/" component={AppTodo}/>
// 			</Switch>
// 		</ConnectedRouter>
// 	</Provider>,
// 	document.getElementById('root')
// );
