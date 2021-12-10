import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from "react";
import axios from "axios";
import UserList from "./components/User";

import Footer from "./components/Footer";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import ProjectList from './components/projects.js'
import TodoList from './components/todos.js'
import NotFound404 from "./components/404";
import ProjectInfo from "./components/Projectinfo";
import LoginForm from "./components/LoginForm";
import Cookies from "universal-cookie";
import {Container, Nav, Navbar} from "react-bootstrap";


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'todos': [],
            'projects': [],
            'token':'',
            'login': ''

        }
    }

    set_token(token, username) {
        const cookies = new Cookies()
        cookies.set('token', token)
        localStorage.setItem('login', username)
        this.setState({'token': token, 'login': username},() => this.load_data())
    }

    is_authenticated(){
        return !!this.state.token
    }

    logout(){
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        let username = localStorage.getItem('login')
        this.setState({'token': token, 'login': username},() => this.load_data())
    }

    load_data () {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users', {headers})
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => {console.log(error)
            this.setState({users: []})}
            )

        axios.get('http://127.0.0.1:8000/api/project', {headers})
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => {console.log(error)
            this.setState({projects: []})}
            )

        axios.get('http://127.0.0.1:8000/api/todo', {headers})
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => {console.log(error)
            this.setState({todos: []})}
            )
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
        .then(response => {
            this.set_token(response.data['token'], username)
        }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {'Content-Type': 'application/json'}
        if (this.is_authenticated()){
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    componentDidMount(){
        this.get_token_from_storage()
    }

    render()
  {
    return (
        <div>
        <BrowserRouter>
        {/*<Menu />*/}

        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">MAIN</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/todo">TODO</Nav.Link>
                        <Nav.Link href="/project">Project</Nav.Link>
                        {this.is_authenticated() ?
                            <Nav.Link onClick={()=>{this.logout()}}>Log out</Nav.Link> :
                            <Nav.Link href='/login'>Log in</Nav.Link>
                        }
                    </Nav>
                </Container>
            </Navbar>
        </div>

        <div className='mt-3 m-lg-3'>
            <Switch>
          <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
          <Route exact path='/project' component={() => <ProjectList projects={this.state.projects}/>}/>
          <Route exact path='/todo' component={() => <TodoList todos={this.state.todos}/>}/>
          <Route exact path='/login' component={() => <LoginForm get_token={(username,password) => this.get_token(username,password)}/>}/>
          <Route path='/project/:id'>
              <ProjectInfo todos={this.state.todos} projects={this.state.projects}/></Route>
          <Route component={NotFound404}/>
            </Switch>
        </div>
        <Footer />
        </BrowserRouter>
        </div>
    );
  }
}

export default App;

