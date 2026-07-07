/*
    -a  controller from component that managers is own local state 
    - integration with our context API to add task globally
    -form validation and user experience features
    -clean sepration of concerns - the form only knows about form things


*/

import {useState } from "react";
import { useTaskContext } from "../context/TaskContext";

function TaskForm(){
    const {addTask} = useTaskContext();

    const [formData,setFormdata]=useState({
       title:'',
       description:"",
       priority:'medium'

    });

    const handleSubmit=(e)=>{
  
        e.preventDefault();
        if(!formData.title.trim()) return;
        addTask(formData);
        setFormdata({title:'',description:'',priority:'medium'});

    }

    const handleChange=(e)=>{
        const{name,value}=e.target;
        setFormdata(prev =>({
            ...prev,
            [name]:value

        }));
    }


    return(
        <form onSubmit={handleSubmit} className="task-form">
            <h2>Add new Task</h2>
            <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input type="text" id="title" name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task title..."
                required
                />
                

            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea  id="description" name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter task description..."
                rows="3"
                />
            </div>

            <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

            </div>

            <button type="submit" disabled={!formData.title.trim()}>Add Task</button>

        </form>
    )
}

export default TaskForm;