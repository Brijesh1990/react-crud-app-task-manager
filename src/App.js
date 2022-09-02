import React from 'react';
import './index.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useState, useEffect } from 'react';
import { v4 as uuidv4} from 'uuid';
import Swal from 'sweetalert2';

function App() {
  // All States
  const [loading, setloading] = useState(true); // Pre-loader before page renders
  const [tasks, setTasks] = useState([]); // Task State
  const [showAddTask, setShowAddTask] = useState(false); // To reveal add task form
  // Pre-loader
  useEffect(() => {
      setTimeout(() => {
          setloading(false);
      }, 3500);
  }, [])

  
// display tasks or fetching tasks data
  // Fetching from Local Storage
  const getTasks = JSON.parse(localStorage.getItem("taskAdded"));
  useEffect(() => {
      if (getTasks == null) {
          setTasks([])
      } else {
          setTasks(getTasks);
      }
  }, [])

  // Add Task here
  const addTask = (task) => {
      const id = uuidv4();
      const newTask = { id, ...task }
      setTasks([...tasks, newTask]);
      Swal.fire({
          icon: 'success',
          title: 'Yay...',
          text: 'You have successfully added a new task!'
      })
      localStorage.setItem("taskAdded", JSON.stringify([...tasks, newTask]));
  }

  //delete tasks

  const deleteTask = (id) => {
    const deleteTask=tasks.filter((task) =>task.id !==id)
    setTasks(deleteTask);
    Swal.fire({
        icon: 'success',
        title: 'Oops...',
        text: 'You have successfully deleted  task!'
    })
    localStorage.setItem("taskAdded", JSON.stringify(deleteTask));
}

//  edit tasks
const editTask=(id) => {
  const text=prompt("Task Name :");
  const day=prompt("Task day * time :");

  let data=JSON.parse(localStorage.getItem('taskAdded'));
  const myData=data.map(x=>{
     if(x.id===id)
     {
        return {
            ...x,
            text:text,
            day:day,
            id:uuidv4()
        }
     }
     return x;
  })
  Swal.fire({
    icon: 'success',
    title: 'Yay...',
    text: 'You have successfully Updated existing  task!'
})
localStorage.setItem("taskAdded", JSON.stringify(myData));
window.location.reload();

}

  return (
      <>
          {
           
           loading ? 
           <div className="spinnerContainer">
            <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loding....</span>
            </div>
            <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loding....</span>
            </div>
            <div className="spinner-grow text-info" role="status">
                <span className="visually-hidden">Loding....</span>
            </div>
            <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loding....</span>
            </div>
            <div className="spinner-grow text-success" role="status">
                <span className="visually-hidden">Loding....</span>
            </div>
            <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loding....</span>
            </div>
            <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loding....</span>
            </div>
           </div>
           :
           <div className="container">
            {/* app header that is open app and app name */}
            <Header showForm={() =>setShowAddTask(!showAddTask)} changeTextAndColor={showAddTask} />
            {/* add task from here */}
            { showAddTask && <AddTask onSave={addTask} />}
            {/* task counter */}

            <h3> <button type="button" className="btn btn-danger">Numbers of Task : <span className="badge text-bg-success bg-danger" style={{fontSize:"14px"}}> {tasks.length} </span>
            </button></h3> 
            {/* displaying task */}
             { tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onEdit={editTask} />) : ('No task Foound') 
             } 
            </div>
 
          }
      </>
  )
}
export default App;
