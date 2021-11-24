import React from "react";
import {Navbar} from "react-bootstrap";
import {Container} from "react-bootstrap";
import {Nav} from "react-bootstrap";

const Menu = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#">Test1</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#">Test2</Nav.Link>
                        <Nav.Link href="#">Test3</Nav.Link>
                        <Nav.Link href="#">Test4</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )

}
export default Menu;


