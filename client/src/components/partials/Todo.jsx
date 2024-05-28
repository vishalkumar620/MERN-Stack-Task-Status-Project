import React from 'react'
import moment from 'moment/moment'
import { ToastContainer, toast } from 'react-toastify'
import { deleteTodoApi } from '../../services/api'
import { markTodoApi } from '../../services/api'



function Todo({todo, setRefreshList}) {

    const handleDelete = async () =>{
        const result = await deleteTodoApi({
            todo_id: todo._id
        })

        console.log('deleted todo', result)
        if(result.data.status ===200){
            setRefreshList(new Date())
            toast('Deleted')
        }else{
            toast('Failed to delete, please try again')
        }
    }

    const handleMarkTodo = async () =>{
        const result = await markTodoApi({
            todo_id: todo._id
        })

        console.log('mark todo', result)
        if(result.data.status ===200){
            setRefreshList(new Date())
            toast(result.data.message)
        }else{
            toast('Failed to Mark, please try again')
        }
    }
    

  return (
    <div className="col-md-3  mx-3 my-2 alert bg-light card ">
        <div className="card-header">
            {todo.isCompleted ? 'Completed': 'Not Completed'}
        </div>
        <div className="card-body">
            <h4 className='card-title text-dark'>{todo.desc}</h4>
            <p className="card-text">{moment(todo.date).fromNow()}</p>


            
        </div>

        <div className="actionButtons" style={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div className="deleteButton">
                    <span className='badge rounded-pill alert-danger ' style={{cursor:'pointer'}} onClick={handleDelete}>Delete</span>
                </div>
                <div className="markTodo">
                    <span className='badge rounded-pill bg-secondary' style={{cursor:'pointer'}} onClick={handleMarkTodo} >{todo.isCompleted? 'Mark Uncomplete': 'Mark Complete'}</span>
                </div>
            </div>
        
    </div>
    
  )
}

export default Todo
