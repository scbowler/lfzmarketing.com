import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderInput } from '../helpers';
import { connect } from 'react-redux';
import { signIn } from '../actions';

class SignIn extends Component {

    handleLogin(vals){
        this.props.signIn(vals);
    }

    render(){
        const { handleSubmit, authError, message } = this.props;

        const errorList = authError.map((err, index) => {
            return <li key={index}>{err}</li>;
        });

        return (
            <div className="row">
                <div className="col s12 m6 offset-m3">
                    <div className="card grey lighten-3">
                        <div className="card-content">
                            <span className="card-title center-align">SIGN IN</span>
                            <p className="center-align grey-text">{message}</p>
                            <form onSubmit={handleSubmit(this.handleLogin.bind(this))}>
                                <Field name="email" type="text" label="Email" component={renderInput}/>
                                <Field name="password" type="password" label="Password" component={renderInput}/>
                                <div className="right-align">
                                    <button className="btn blue-grey darken-2">SIGN IN</button>
                                    <ul className="red-text text-lighten-2">{errorList}</ul>
                                </div>
                            </form>
                        </div>    
                    </div>
                </div>
            </div>
        )
    }
}

function validate(vals){
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { email, password } = vals;
    const errors = {};

    if(!email){
        errors.email = 'Please enter an email';
    }

    if(!password){
        errors.password = 'Please enter a password';
    }

    if(email && !emailRegex.test(email) ){
        errors.email = 'Invalid email';
    }

    return errors;
}

SignIn = reduxForm({
    form: 'sign-in',
    validate
})(SignIn);

function mapStateToProps(state){
    return {
        authError: state.user.error,
        message: state.user.message
    }
}

export default connect(mapStateToProps, {signIn})(SignIn);
