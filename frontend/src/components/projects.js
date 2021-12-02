import React from 'react'
import {Table} from "react-bootstrap";



const ProjectItem = ({project}) => {
    return (
        <tbody>
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.url}</td>
            <td>{project.users}</td>
        </tr>
        </tbody>
   )
}

const ProjectList = ({projects}) => {
   return (
       <Table striped bordered hover>
           <thead>
           <tr>
           <th>ID</th>
           <th>Name</th>
           <th>URL</th>
           <th>Users</th>
           </tr>
           </thead>
           {projects.map((project) => <ProjectItem project={project} />)}
       </Table>
   )
}

export default ProjectList