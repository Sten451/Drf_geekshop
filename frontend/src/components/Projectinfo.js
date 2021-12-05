import React from 'react'
import { useParams } from 'react-router-dom'
import {Table} from "react-bootstrap"


const TodoItem = ({todo, projects}) => {
    return (
        <tr>
            <td>{todo.text}</td>
            <td>{todo.is_active===true ? 'yes' : 'no'}</td>
            <td>{todo.user}</td>
            <td>{todo.created_at}</td>
            <td>{todo.updated_at}</td>
            <td>
                {todo.project.map((projectID) => {let project = projects.find((project) => project.id === projectID)
                    if(project){return project.name}})}
            </td>
        </tr>
   )
}

const ProjectInfo = ({todos, projects}) => {
    let {id} = useParams();
    let filtered_items = todos.filter((todo => todo.project.includes(parseInt(id))))
    return (
       <Table striped bordered hover>
          <thead>
           <tr>
           <th>TODO</th>
           <th>Active</th>
           <th>From user</th>
           <th>Created</th>
           <th>Updated</th>
           <th>Project</th>
           </tr>
          </thead>
           {filtered_items.map((todo) => <TodoItem todo={todo} projects={projects}/>)}
       </Table>
   )
}

export default ProjectInfo