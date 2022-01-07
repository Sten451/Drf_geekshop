import React from "react";
import {Col, Container, Form, Row} from "react-bootstrap";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', url: '', users: '',}
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.url, this.state.users)
        event.preventDefault()
    }

    handleUsersChange(event) {
        if (!event.target.selectedOptions) {

            this.setState({
                'users': []
            })
            return;
        }
        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({
            'users': users
        })
    }

    render() {
        return (
            <div>
                <Container>
                 <Form onSubmit={(event) => this.handleSubmit(event)}>
                        <Row>
                            <Form.Label column="lg" lg={2}>Создать проект</Form.Label>

                        </Row>
                        <br/>
                        <Row>
                            <Form.Label column="lg" lg={2}>Название проекта</Form.Label>
                            <Col>
                                <input className='mt-2' style={{marginLeft: '10px'}} type="text" name="name"
                                           value={this.state.name}
                                           onChange={(event) => this.handleChange(event)}/>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Form.Label column="lg" lg={2}>Ссылка</Form.Label>
                            <Col>
                                    <input className='mt-2' style={{marginLeft: '10px'}} type="url" name="url"
                                           value={this.state.url}
                                           onChange={(event) => this.handleChange(event)}/>
                            </Col>
                        </Row>
                        <br/>
                        <Form.Label column="lg" lg={2}>Выбрать пользователей</Form.Label>
                        <Row>
                    <select className="form-control" name="users" multiple
                                            onChange={(event) => this.handleUsersChange(event)}>
                                        {this.props.users.map((item) => <option
                                            value={item.id}>{item.username}</option>)}
                                    </select>
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

export default ProjectForm