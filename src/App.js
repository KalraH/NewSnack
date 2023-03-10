import React, { useState } from 'react'
import News from './Components/News'
import Navbar from './Components/NavBar.js'
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

const App = () => {
	const apiKey = process.env.REACT_APP_NEWS_API;
	const [progress, setProgress] = useState(0);

	return (
		<>
			<Router>
				<Navbar />
				<LoadingBar color='#f11946' height={3} progress={progress}/>
				
				<Routes>
					<Route element={<News setProgress={setProgress} apiKey={apiKey} key='general' 		category='general'/>} 		path='/'/>
					<Route element={<News setProgress={setProgress} apiKey={apiKey} key='business' 		category='business'/>} 		path='/business'/>
					<Route element={<News setProgress={setProgress} apiKey={apiKey} key='entertainment' category='entertainment'/>} path='/entertainment'/>
					<Route element={<News setProgress={setProgress} apiKey={apiKey} key='health' 		category='health'/>} 		path='/health'/>
					<Route element={<News setProgress={setProgress} apiKey={apiKey} key='science' 		category='science'/>} 		path='/science'/>
					<Route element={<News setProgress={setProgress} apiKey={apiKey} key='sports' 		category='sports'/>} 		path='/sports'/>
					<Route element={<News setProgress={setProgress} apiKey={apiKey} key='technology' 	category='technology'/>} 	path='/technology'/>
				</Routes>
			</Router>
		</>
	)
}
export default App 