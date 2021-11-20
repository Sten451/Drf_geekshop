import React from "react";
import {Table} from "react-bootstrap";

const UserItem = ({user}) =>{
    return (
        <tbody>
        <tr>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
        </tr>
        </tbody>
    )
}

const UserList = ({users}) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
            <th>#</th>
            <th>username</th>
            <th>first_name</th>
            <th>last_name</th>
            <th>email</th>
            </tr>
            </thead>
            {users.map((user) => <UserItem user={user} /> )}
        </Table>
    )

}
export default UserList;