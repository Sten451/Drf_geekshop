import React from "react";
import {Col, Container, Form, Row} from "react-bootstrap";

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {project: '', user: '', text: ''}
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        this.props.createTodo(this.state.project,this.state.user,this.state.text)
        event.preventDefault()
    }

    render() {
        return (
             <div>
                <Container>
                    <Form onSubmit={(event) => this.handleSubmit(event)}>
                    <Row>
                            <Form.Label column="lg" lg={2}>Создать TODO</Form.Label>

                        </Row>
                        <br/>
                        <Row>
                            <Form.Label column="lg" lg={2}>Текст TODO</Form.Label>
                            <Col>
                                <input className='mt-2' style={{marginLeft: '10px'}} type="text" name="text" value={this.state.text}
                           onChange={(event) => this.handleChange(event)}/>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Form.Label column="lg" lg={2}>Users</Form.Label>
                            <Col>
                                    <select className="form-control" name="user"
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((item) => <option value={item.id}> {item.username}</option>)}
                    </select>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                        <Form.Label column="lg" lg={2}>Проект</Form.Label>
                        <Col>
                    <select className="form-control" name="project" onChange={(event) => this.handleChange(event)}>
                        {this.props.project.map((item) => <option value={item.id}> {item.name}</option>)}
                    </select>
                    </Col>
                        </Row>
                    <br/>
                    <Row>
                <input className="btn-success" type="submit" value="Сохранить"/>
                    </Row>
                    </Form>
                </Container>
            </div>
        )
    }
}
export default TodoForm