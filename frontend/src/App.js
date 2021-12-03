import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from "react";
import axios from "axios";
import UserList from "./components/User";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import ProjectList from './components/projects.js'
import TodoList from './components/todos.js'
import NotFound404 from "./components/404";
import ProjectInfo from "./components/Projectinfo";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'todos': [],
            'projects': [],

        }
    }
    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/users/').then(
            response => {
                const users = response.data
                this.setState(
            {
                'users': users
                    }
                )
            }
        ).catch(error => console.log(error))


        axios.get('http://127.0.0.1:8000/api/todo')
            .then(response => {
                const todos = response.data.results
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/project')
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))
    }

    render()
  {
    return (
        <div>
        <BrowserRouter>
        <Menu />
        <div className='mt-3 m-lg-3'>
            <Switch>
          <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
          <Route exact path='/project' component={() => <ProjectList projects={this.state.projects}/>}/>
          <Route exact path='/todo' component={() => <TodoList todos={this.state.todos}/>}/>
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
