import React from 'react';
import axios from 'axios'

class Login extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
        const {username, password} = this.state

        axios.post(
            'http://localhost:5000/user/login',
            {
                username: username,
                password: password
            }
        )
        .then((response) => {
            if(response.status === 201){
                console.log(response)
                // this.props.handleSuccessfulAuth(response.data)
            }
        })
        .catch(error => {
            console.log('login error', error)
        })

        event.preventDefault();
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="username"
                        name="username"
                        placeholder="Username"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />
                
                <button type="submit"> Login</button>
                
                </form>
            </div>
        )
    }
}

export default Login