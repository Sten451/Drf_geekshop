import React from 'react'
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";



const ProjectItem = ({project}) => {
    return (
        <tbody>
        <tr>
            <td>{project.id}</td>
            <td><Link to={`project/${project.id}`}>{project.name}</Link></td>
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