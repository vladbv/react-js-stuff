import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Person from './Person.js'; //Component
import Header from './components/Header.js';
import Button from './components/Button.js';
import Tasks from './components/Tasks.js';
import AddTask from './components/AddTask.js';
import Footer from './components/Footer.js';
import About from './components/About.js';
import React, {useState, useEffect} from 'react';

function App() {
	const [showAddTask, setShowAddTask] = useState(false)
const [tasks, setTasks] = useState([]);

useEffect( () => {
	const getTasks = async () => {
const tasksFromServer = await fetchTasks()
setTasks(tasksFromServer)
	}

getTasks()
}, [])


const deleteTask = async (id) => {
	await fetch(`http://localhost:5000/tasks/${id}`, {
		method: 'DELETE',

	})
setTasks(tasks.filter((task) => task.id !== id ));
}

// Fetching tasks

const fetchTasks = async () => {
const res = await fetch('http://localhost:5000/tasks')
	const data = await res.json();
return data;
}

// Toggle reminder
const fetchTask = async (id) => {
const res = await fetch(`http://localhost:5000/tasks/${id}` )
	const data = await res.json();
return data;
}

// End of toggle reminder

// ADD TASK

const addTask = async (task) => {

//	const id = Math.floor(Math.random() * 1000) + 1;
//	const newTask = { id, ...task}
//	setTasks([...tasks, newTask]) 
 const res = await fetch('http://localhost:5000/tasks', {
	 method: 'POST',
	 headers: {
'Content-type': 'application/json'
	 },
	 body: JSON.stringify(task),
 })

	 const data = await res.json()
	 setTasks([...tasks, data])

}

// Toggle Reminder

const toggleReminder = async (id) => {
	const taskToToggle = await fetchTask(id)
	const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
const res = await fetch(`http://localhost:5000/tasks/${id}`, {
	method :'PUT',
	headers: {
'Content-type': 'application/json'
	},
	body: JSON.stringify(updTask)
})
const data = await res.json();

	setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder}  : task )
	)
}

return (
	<Router>
<div className="container">
<Header onAdd={() => setShowAddTask(!showAddTask) } showAddTask={showAddTask} title={'Task Tracker'} />

<Route path="/" exact render={(props) => ( 
<>
	{showAddTask && <AddTask onAdd={addTask} /> }
	{tasks.length > 0 ? (	
	<Tasks tasks={tasks} onToggle={toggleReminder} onDelete={deleteTask}  />
	): (
<div class="no-tasks">There are no tasks</div>
	)}
	
		</>
	)} />
	<Route path="/about" component={About} />
	<Footer />
		</div>
</Router>
	)
}

export default App;
