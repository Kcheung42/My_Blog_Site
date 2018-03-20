// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   App1Container.jsx                                  :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: kcheung <kcheung@42.fr>                    +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2018/01/15 11:17:45 by kcheung           #+#    #+#             //
//   Updated: 2018/02/26 19:31:59 by kcheung          ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

import React from 'react';
import { HelloWorld } from '../components/HelloWorld'
import { Button } from '../components/Button'
import { Toggle } from '../components/Toggle'
import  VisibleTdoList  from  './VisibileTodoList'
// import  {VisibleTdoList}  from  './VisibileTodoList'
import  Footer  from  '../components/Footer'
import AddTodo from './AddTodo'

const App1Container = () => (
	<div>
		<HelloWorld>Bambi</HelloWorld>
		<Footer />
		<VisibleTdoList />
		<AddTodo />
		<Toggle />
	</div>
);

export default App1Container
//
// const App1Container = ({}) => (
// 	<div>
// 		<HelloWorld>Bambi</HelloWorld>
// 		<Footer />
// 		<VisibleTdoList/>
// 		<AddTodo />
// 		<Toggle />
// 	</div>
// );
//
// export default App1Container
