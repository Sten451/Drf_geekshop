import React from "react";
import {Navbar} from "react-bootstrap";
import {Container} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";


const Menu = ({}) => {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">MAIN</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/todo">TODO</Nav.Link>
                        <Nav.Link href="/project">Project</Nav.Link>

                    <Link className="nav-link" to='/login'>Log in</Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )

}
export default Menu;


