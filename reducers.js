// import { combineReducers } from 'redux';
// import {
// 	SET_VISIBILITY_FILTER,
// 	VisibilityFilters,
// 	ADD_TODO,
// 	TOGGLE_TODO,
// 	CHANGE_NAME,
// 	CHANGE_AGE,
// } from './actions'
//

// const initialState = {
//visibilityFilter: VisibilityFilters.SHOW_ALL,
//todos: []
// }
// const toDoReducer = (state=initialState, action) => {
// switch(action.type){
//	 case SET_VISIBILITY_FILTER:
//		 state = {...state, visibilityFilter:action.payload}
//	 case ADD_TODO:
//		 state = {...state,
//			todos: [...state.todos,
//				{
//					 text: action.payload,
//					 completed: false
//				}
//			]
//		}
//		 console.log("!", state)
//	 case TOGGLE_TODO: //copy all objects in tdo array except todo at index
//		 state = {...state,
//			 todos: state.todos.map((todo,index) => {
//				 if (index === action.payload){
//					 state = {...todo, completed: !todo.completed }
//				 }
//			 })
//		 }
// }
// return state
// }

//reducer composition below, splitting of state to manage
// const todos = (state=[], action) => {
// 	switch(action.type){
// 		case ADD_TODO:
// 			return [...state,
// 				{
// 					id: action.id,
// 					text: action.payload,
// 					completed: false
// 				}
// 			]
// 		case TOGGLE_TODO:
// 			return state.map((todo) =>
// 				(todo.id === action.payload)
// 					? {...todo, completed: !todo.completed}
// 					: todo
// 			)
// 		default:
// 			return state
// 	}
// }
//
// const { SHOW_ALL } = VisibilityFilters
//
// const visibilityFilter = (state=SHOW_ALL, action ) => {
// 	switch(action.type){
// 		case SET_VISIBILITY_FILTER:
// 			return action.payload
// 		default:
// 				return state
// 	}
// }
//
// const userReducer = (state={}, action) => {
//
// 	switch(action.type){
// 		case CHANGE_NAME:{
// 			state = {...state, name: action.payload} // object spread operator
// 			break
// 		}
// 		case CHANGE_AGE:{
// 			state = {...state, age: action.payload}
// 			break
// 		}
// 	}
// 	return state;
// };
//
// const tweetsReducer = (state=[], action) => {
// 	return state;
// };
//
// export const reducers = combineReducers({
// 	user: userReducer,
// 	tweets: tweetsReducer,
// 	visibilityFilter: visibilityFilter,
// 	todos: todos
// })
