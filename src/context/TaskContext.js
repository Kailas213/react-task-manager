import { createContext, useContext, useReducer} from 'react';

//Initial State- this is our application's starting point

const initialState={
    tasks:[
        {
            id:1,
            title:'Learn React Context',
            description:'Usederstand how Context API works',
            completed:false,
            priority:"high",
            createdAt:new Date().toISOString()
        },
        {
            id:2,
            title:'Master useReducer',
            description:'Lear complex state managment patterns',
            completed:false,
            priority:"high",
            createdAt:new Date().toISOString()
        },
    ],
    filter:'all',
    searchTerms:'',
    isLoading:false,
    history:[]
};

//Action types= using constants prevents typos

export const ACTIONS={
    ADD_TASK:'ADD_TASK',
    DELETE_TASK:'DELETE_TASK',
    TOGGLE_TASK:'TOGGLE_TASK',
    EDIT_TASK:'EDIT_TASK',
    SET_FILTER:'SET_FILTER',
    SET_SEARCH:'SET_SEARCH',
    UNDO_ACTION:'UNDO_ACTION',
    SET_LOADING:'SET_LOADING'
};

const taskReducer=(state,action)=> {
    //alwasys save current state to history before making changes
    const saveToHistory=(currentState)=>({
        ...currentState,
        history:[currentState,...currentState.history.slice(0,9)] //Keep last 10 states

    });

    switch(action.type){
        case ACTIONS.ADD_TASK:
            const newTask={
                id:Date.now(),
                title:action.payload.title,
                description:action.payload.description,
                completed:false,
                priority:action.payload.priority || 'medium',
                createdAt:new Date().toISOString() 
            }

            return saveToHistory({
                ...state,
                tasks:[...state.tasks,newTask ]
            });
         case ACTIONS.DELETE_TASK:
            return saveToHistory({
                 ...state,
                tasks:state.tasks.filter(task=>task.id !== action.payload)
            });
        case ACTIONS.TOGGLE_TASK:
            debugger;
            return saveToHistory({
                ...state,
                tasks:state.tasks.map(task=>
                    task.id===action.payload ? {...task,completed:!task.completed}:task
                )

            })   
            
        case ACTIONS.EDIT_TASK:
              debugger;
            return saveToHistory({
              
                ...state,
                tasks:state.tasks.map(task=>
                    task.id===action.payload.id ?{...task,...action.payload.updates}
                    :task
                )

            });
         
         case ACTIONS.SET_FILTER:
            return{
                ...state,
                filter:action.payload
            }
        case ACTIONS.SET_SEARCH:
            return{
                ...state,
                searchTerms:action.payload
            };
        case ACTIONS.UNDO_ACTION:
            if(state.history.length>0){
                const [previousState,...restHistory]=state.history;
                return{
                    ...previousState,
                    history:restHistory
                };
            } 
            return state;         
            
        case ACTIONS.SET_LOADING:
            return{
                ...state,
                isLoading:action.payload
            };
            default:
                throw new Error(`unhandle action type: ${action.type}`)    
    }

}


//step 1: create the context

const TaskContext=createContext();


// step 2 :custom hook for easier usage
export const useTaskContext=()=>{
    const context =useContext(TaskContext);
    if(!context){
        throw new Error('useTaskContext must be used within TaskProvider');

    }
    return context;
}

//step 3: Provider component
export const TaskProvider=({children})=>{

    const [state,dispatch]=useReducer(taskReducer, initialState);

    const addTask=(taskData)=>{
        dispatch({type:ACTIONS.ADD_TASK,payload:taskData});

    };

     const deleteTask=(taskId)=>{
        dispatch({type:ACTIONS.DELETE_TASK,payload:taskId});

    };

     const toggleTask=(taskId)=>{
        dispatch({type:ACTIONS.TOGGLE_TASK,payload:taskId});

    };

    const editTask=(taskId,updates)=>{
        dispatch({type:ACTIONS.EDIT_TASK,payload:{id:taskId,updates}});

    };

     const setFilter=(filter)=>{
        dispatch({type:ACTIONS.SET_FILTER,payload:filter});

    };

     const setSearch=(searchTerms)=>{
        dispatch({type:ACTIONS.SET_SEARCH,payload:searchTerms});

    };

     const undoAction=()=>{
        dispatch({type:ACTIONS.UNDO_ACTION});

    };

     //Derived state - comuted values based on the current state

     const filteredTasks=state.tasks.filter(task=>{
        const matchesFilter =
        state.filter ==='all' ||
        (state.filter==='completed' && task.completed) ||
        (state.filter==='pending' && !task.completed);

        const matchesSearch =
        state.searchTerms==='' ||
        task.title.toLowerCase().includes(state.searchTerms.toLowerCase())||
        task.description.toLowerCase().includes(state.searchTerms.toLowerCase());

        return matchesFilter && matchesSearch;

     });

     const taskStats={
        total:state.tasks.length,
        completed:state.tasks.filter(task=>task.completed).length,
        pending:state.tasks.filter(task=>!task.completed).length,
     }
     
     

    const value={
        //state 
        tasks:filteredTasks,
        filter:state.filter,
        searchTerms:state.searchTerms,
        isLoading:state.isLoading,
        taskStats,
        canUndo:state.history.length>0,


        //Actions
        addTask,
        deleteTask,
        toggleTask,
        editTask,
        setFilter,
        setSearch,
        undoAction
    };

    return (
        <TaskContext.Provider value={value}>
            {children}
       </TaskContext.Provider>
    )
}
