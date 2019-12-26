
import React from 'react';
import './test.css';

class Time extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			date: new Date()
		}
	}

	tick(){
		this.setState({
			date: new Date()
		})
	}
	
	componentDidMount(){
		this.timerID = setInterval(
			()=>this.tick()
		,1000)
	}

	componentWillUnmount(){
		clearInterval(this.timerID)
	}

	render(){
		return(
			<div className="timeNow">
				现在时间是: {this.state.date.toLocaleTimeString()}
			</div>
		)
	}
}

export default Time;
