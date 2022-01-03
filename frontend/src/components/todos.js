import React from 'react'
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";


const TodoItem = ({todo, deleteTodo}) => {
    return (
        <tbody>
        <tr>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>{todo.project}</td>
            <td>{todo.user}</td>
            <td>{todo.is_active===true ? 'yes' : 'no'}</td>
            <td>{todo.created_at}</td>
            <td>{todo.updated_at}</td>
            <td>
                <td><button onClick={()=>deleteTodo(todo.id)} className='btn-danger' type="button">Delete</button></td>
            </td>
        </tr>
        </tbody>
   )
}

const TodoList = ({todos, deleteTodo}) => {
   return (
       <Table striped bordered hover>
       <thead>
           <tr>
           <td>ID</td>
           <th>Text</th>
           <th>Project</th>
           <th>From user</th>
           <th>Active</th>
           <th>Created</th>
           <th>Updated</th>
           </tr>
       </thead>
           {todos.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo}/>)}
       <Link className="btn-info text-decoration-none p-1" to="/todo/create">Создать</Link>
        </Table>

   )
}

export default TodoList