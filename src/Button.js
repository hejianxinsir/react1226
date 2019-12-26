
// 测试文件，忽略即可
import React from 'react';
import './test.css';

class Button extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			name: '你叫什么名字?',
			isOn: false,
			date: new Date()
		}
	}

	tick(){
		this.setState({
			date: new Date()
		});
	}

	x(){
		console.log('我是x函数')
		this.setState({
			isOn: !this.state.isOn
		})
	}

	componentDidMount(){
		this.timerID = setInterval(
			()=>{ this.tick() }
		,1000)
	}

	componentWillUnmount(){
		clearInterval(this.timerID);
	}

	render(){
		return (
			<div>
				<button className="btn1"
								onClick={this.x.bind(this)}
				>{this.state.name}
				</button><br />

				<div>{this.state.isOn ? <span className="myName">
					何建新</span> : ''}
				</div>
				
				<div>现在时间是: {this.state.date.toLocaleTimeString()} </div>
			</div>
		)
	}
}

export default Button;
