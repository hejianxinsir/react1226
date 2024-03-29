import React from 'react';
import './App.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import 'normalize.css';
import './reset.css';
import * as localStore from './localStore.js';

var AV = require('leancloud-storage');
AV.init({
  appId: "9TdMvtl3M4PWF6DbUURE0Mh5-gzGzoHsz",
	  appKey: "OKdjRpiN2fzHNN9SiMkcdAp1",
		  serverURLs: "https://xxx.example.com"
			});

var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.set('words', 'Hello world!');
testObject.save().then(function (testObject) {
  console.log('保存成功')
	});

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			newTodo: '',
			todoList: localStore.load('todoList') || []
		}
	}

	componentDidUpdate(){
		localStore.save('todoList', this.state.todoList)
	}

	changeTitle(event){
		this.setState({
			newTodo: event.target.value,
			todoList: this.state.todoList
		})
	}

	toggle(e, todo){
		todo.status = todo.status === 'completed' ? '' : 'completed'
		this.setState(this.state)
	}

	delete(event, todo){
		todo.deleted = true
		this.setState(this.state)
	}

	
	render(){
		let todos = this.state.todoList
			.filter((item=> !item.deleted))
			.map((item,index)=>{
			return (
				<li key={index}>
					<TodoItem todo={item}
							onToggle={this.toggle.bind(this)}
							onDelete={this.delete.bind(this)}
					/>
				</li>
			) 
		})

  	return (
  	  <div className="App">
				<h1>我的待办</h1>
				<div className="inputWrapper">
					<TodoInput content={this.state.newTodo}
						onSubmit={this.addTodo.bind(this)}
						onChange={this.changeTitle.bind(this)}
					/>
				</div>
				<ol className="todoList">
					{todos}
				</ol>
  	  </div>
  	);
	}

	addTodo(event){
		this.state.todoList.push({
			id: idMaker(),
			title: event.target.value,
			status: null,
			deleted: false
		})
		this.setState({
			newTodo: '',
			todoList: this.state.todoList
		})
	}
}

export default App;

let id = 0;
function idMaker(){
	id += 1
	return id
}
