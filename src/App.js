import './App.css';
import { TaskProvider } from './context/TaskContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterControls from './components/FilterControl';


function App(){
  return(
    <div>
      Out site of Provider
      <TaskProvider>
        <div className='App'>
          <header className='app-header'>
            <h1>Task Manager</h1>
            <p>Built with React Context API & useReducer</p>
          </header>
          <main className='app-main'>
            <div className='sidebar'>
              <TaskForm/>
            </div>
            <div className='content'>
              <FilterControls/>
              <TaskList/>
            </div>


          </main>
        </div>

      </TaskProvider>
    </div>
  )

}

export default App;

