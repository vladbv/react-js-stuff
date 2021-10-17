import logo from './logo.svg';
import './App.css';
import Person from './Person.js'; //Component
import Header from './components/Header.js';
import Button from './components/Button.js';
import Tasks from './components/Tasks.js';
import React, {useState} from 'react';

function App() {
const [tasks, setTasks] = useState(
[
	{
		id: 1,
		text: 'Meeting appointment',
		day: 'Wednesday',},

	{
		id: 2,
		text: 'Car purchase',
		day: 'Friday'
	},
]
);	
return (
<div className="container">
<Header title={'Task Tracker'} />
		<Tasks tasks={tasks} />
		</div>

	)
}

export default App;
