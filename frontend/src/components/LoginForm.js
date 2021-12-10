import React from 'react'
import {Form} from "react-bootstrap";
import {Button} from "react-bootstrap";

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: '',
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.get_token(this.state.login, this.state.password)
        console.log(this.state.login + ' ' + this.state.password)
        event.preventDefault()
    }

    render() {
        return (

<Form onSubmit={(event) => this.handleSubmit(event)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address (login)</Form.Label>
                    <Form.Control type="text" name="login" placeholder="login" value={this.state.login}
                       onChange={(event) => this.handleChange(event)}/>
                    <Form.Text className="text-muted">
                        Не используйте свой логин (email) где-то ещё.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="password" value={this.state.password}
                       onChange={(event) => this.handleChange(event)}/>
                </Form.Group>
                <Button type="submit" value="Login">
                    Submit
                </Button>
            </Form>


    )
        ;
    }
}

export default LoginForm