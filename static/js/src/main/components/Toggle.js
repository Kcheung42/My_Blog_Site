import React from 'react';
import { Button } from './Button'

var buttonStyle = {
	margin: '10px 10px 10px 0'
}

export class Toggle extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isShowing:true,
		}
	}

	handleClick = () => {
		this.setState({
			isShowing: !this.state.isShowing
		})
	}

	render(){
		return(
				<Button
					label={this.state.isShowing ? 'Test: ON': 'Test: OFF'}
					handleClick={this.handleClick}>
				</Button>
				)
	}
}
