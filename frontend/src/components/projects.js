import React from 'react'
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";



const ProjectItem = ({project, deleteProject}) => {
    return (
        <tbody>
        <tr>
            <td>{project.id}</td>
            <td><Link to={`project/${project.id}`}>{project.name}</Link></td>
            <td>{project.url}</td>
            <td>{project.users}</td>
            <td><button onClick={()=>deleteProject(project.id)} className='btn-danger' type='button'>Delete</button></td>
        </tr>
        </tbody>
   )
}

const ProjectList = ({projects, deleteProject}) => {
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
            {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
       <Link className="btn-info text-decoration-none p-1" to="/project/create">Создать</Link>
       </Table>
   )
}

export default ProjectList