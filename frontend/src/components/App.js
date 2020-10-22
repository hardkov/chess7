import React from 'react';
import Registration from './Registration.js'
import Login from "./Login.js"
import axios from 'axios'

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      userList: [],
    }
  }

  async componentDidMount(){
    let response
    
    try {
      response = await axios.get(
        'http://localhost:5000/user/list',
      )  
    } catch(err){
      console.log("login error", err)
    }
    
    if(response.status === 200){
      this.setState({
        userList: response.data.userList,
      })
    }
  }

  render(){
    let rows = this.state.userList.map((user, idx) => <tr key={user.id}><td>{user.username}</td></tr>);

    return (
      <div>
        <Registration/>
        <Login/>
        <div>
          <table>
            <tbody>          
              <tr>
                <th> Users </th>
              </tr>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default App;
