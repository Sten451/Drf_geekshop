import React from 'react'
import {Table} from "react-bootstrap";


const TodoItem = ({todo}) => {
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
        </tr>
        </tbody>
   )
}

const TodoList = ({todos}) => {
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
           {todos.map((todo) => <TodoItem todo={todo} />)}
       </Table>
   )
}

export default TodoList