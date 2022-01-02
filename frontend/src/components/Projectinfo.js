import React from 'react'
import { useParams } from 'react-router-dom'
import {Table} from "react-bootstrap"


const ProjectItem = ({project, users, todo}) => {

    return (
        <tbody>
        <tr>
            <td>{todo.id}</td>
            <td>{todo.name}</td>
            <td>{todo.url}</td>
            <td>{todo.users}</td>
        </tr>
        </tbody>
   )
}

const ProjectInfo = ({projects, users, todo}) => {
    let {id} = useParams();
    let filtered_items = projects.filter((project) => project.id == id)
    return (
       <Table striped bordered hover>
          <thead>
           <tr>
           <th>ID TODO</th>
           <th>Name</th>
           <th>URL</th>
           <th>Users</th>
           </tr>
          </thead>
           {filtered_items.map((todo) => <ProjectItem todo={todo} projects={projects}/>)}
       </Table>
   )
}

export default ProjectInfo