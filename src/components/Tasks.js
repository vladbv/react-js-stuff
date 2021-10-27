import {useState } from 'react';
import Task from './Task.js';


const Tasks = ({tasks, onDelete, onToggle}) => {


return (
<>
	{tasks.map((task) => ( 
		<Task key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
	)) }
</>
)

};

export default Tasks;
