import './App.css';
import News from './Components/News';
import React, { Component } from 'react';
import Navbar from './Components/NavBar.js';
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component 
{
	apiKey = process.env.REACT_APP_NEWS_API;
	state = {
		progress: 0
	}

	setProgress = (progress) => {
		this.setState({progress: progress})
	}

	render() 
	{
		return (
			<>
				<Router>
					<Navbar />
					<LoadingBar color='#f11946' height={3} progress={this.state.progress} />
					
					<Routes>
						<Route element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='general' 		category='general'/>} 		path='/'/>
						<Route element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='business' 		category='business'/>} 		path='/business'/>
						<Route element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='entertainment' 	category='entertainment'/>} path='/entertainment'/>
						<Route element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='health' 			category='health'/>} 		path='/health'/>
						<Route element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='science' 		category='science'/>} 		path='/science'/>
						<Route element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='sports' 			category='sports'/>} 		path='/sports'/>
						<Route element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='technology' 		category='technology'/>} 	path='/technology'/>
					</Routes>
				</Router>
			</>
		)
	}
}