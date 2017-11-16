import React, { Component } from 'react';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    handleLogin(e){
        e.preventDefault();

        console.log('This will log in');

        this.setState({
            username: '',
            password: ''
        });
    }

    render(){
        const { username, password } = this.state;

        return (
            <div className="row">
                <div className="col s12 m6 offset-m3">
                    <div className="card grey lighten-3">
                        <div className="card-content">
                            <span className="card-title center-align">LOGIN</span>
                            <form onSubmit={this.handleLogin.bind(this)}>
                                <div className="input-field">
                                    <input onChange={ e => this.setState({ username: e.target.value })} value={username} type="text" name="username" className="active" placeholder="Username"/>
                                </div>
                                <div className="input-field">
                                    <input onChange={ e => this.setState({ password: e.target.value })} value={password} type="password" name="password" placeholder="password"/>
                                </div>
                                <div className="right-align">
                                    <button className="btn blue-grey darken-2">Login</button>
                                </div>
                            </form>
                        </div>    
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
