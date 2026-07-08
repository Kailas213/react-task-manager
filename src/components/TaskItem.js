import {useState} from 'react';
import { useTaskContext } from '../context/TaskContext';

function TaskItem({task}){
    const{deleteTask, toggleTask, editTask}=useTaskContext();
    const [isEditing , setIsEditing]=useState(false);
    const[editData, setEditData]=useState({
        id:task.id,
        title:task.title,
        description:task.description,
        priority:task.priority
    });

    const handkeEdit=()=>{
        editTask(task.id,editData);
        setIsEditing(false);

    }

    const handleCancel=()=>{
        setEditData({
            id:task.id,
            title:task.title,
        description:task.description,
        priority:task.priority
        })
    }

    const getPriorityColor=(priority)=>{
        switch(priority){
            case 'high':return '#ff4757';
            case 'medium': return '#ffa502';
            case 'low': return '#26de81';
            default:return '#ddd';

        }
    }

    if(isEditing){
        return(
            <div className='task-item-editing'>
                <input value={editData.title}
                onChange={(e)=> setEditData(prev=>({...ProgressEvent,title:e.target.value}))} 
                placeholder='Task title...'
                />

                <textarea value={editData.description}
                onChange={(e)=>setEditData(prev=>({...prev,description:e.target.value}))}
                placeholder='Task Description...' />

                <select value={editData.priority} 
                onChange={(e)=> setEditData(prev=>({...prev , priority:e.target.value}))}>
                    <option value='low'>Low</option>
                    <option value='medium'>Medium</option>
                    <option value='high'>High</option>
                </select>

                <div className='edit-actions'>
                    <button className='btn btn-submit-save' onClick={handkeEdit}>Save</button>
                    <button className='btn btn-cancel' onClick={handleCancel}>Cancel</button>
                </div>

            </div>
        )
    }

    return(
        <div className={`task-item ${task.completed ? 'completed': ''}`}>
            <div className='task-content'>
                <div className='task-header'>
                    <h3>
                        {task.title}
                    </h3>
                    <span className="priority-badge" style={{backgroundColor:getPriorityColor(task.priority)}}>{task.priority}</span>
                </div>
                {task.description && <p>{task.description}</p>}
                <div className='task-meta'>
                    <small>Created:{new Date(task.createdAt).toLocaleDateString()}</small>
                </div>
                <div className='task-actions'>
                    <button onClick={()=>toggleTask(task.id)} className={`btn btn-task toggle-btn ${task.completed? 'completed':''}`}>{task.completed?'completed':'pending'}</button>
                    <button className="btn btn-task"  onClick={()=>setIsEditing(true)}>Edit</button>
                    <button className="btn btn-task"  onClick={()=>deleteTask(task.id)}>Delete</button>


                </div>

            </div>

        </div>
    )


}

export default TaskItem;