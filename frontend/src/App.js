import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from "react";
import axios from "axios";
import UserList from "./components/User";
import Menu from "./components/Menu";
import Footer from "./components/Footer";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []

        }
    }
    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/users/').then(
            response => {
                this.setState(
            {
                'users':response.data
                    }
                )
            }
        ).catch(error => console.log(error))
    }

    render()
  {
    return (
        <div>
        <Menu />
        <div className='mt-3 m-lg-3'>
          <UserList users={this.state.users} />
        </div>
        <Footer />
        </div>
    );
  }
}

export default App;
