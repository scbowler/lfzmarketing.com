import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderInput, renderConfirmPassword, emailRegex, passwordRegex } from '../helpers';
import { connect } from 'react-redux';
import { signUp } from '../actions';

class SignUp extends Component {

    handleLogin(vals){

        this.props.signUp(vals);
    }

    render(){
        const { handleSubmit, authError } = this.props;

        const errorList = authError.map((err, index) => {
            return <li key={index}>{err}</li>;
        });

        return (
            <div className="row">
                <div className="col s12 m6 offset-m3">
                    <div className="card grey lighten-3">
                        <div className="card-content">
                            <span className="card-title center-align">REGISTER</span>
                            <form onSubmit={handleSubmit(this.handleLogin.bind(this))}>
                                <Field name="email" type="text" label="Email" component={renderInput}/>
                                <Field name="password" type="password" label="Password" component={renderInput}/>
                                <Field name="confirmPassword" type="password" label="Confirm Password" component={renderConfirmPassword}/>
                                <div className="right-align">
                                    <button className="btn blue-grey darken-2">REGISTER</button>
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
    const { email, password, confirmPassword } = vals;
    let match = true;
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

    if(password && password !== confirmPassword){
        match = false;
        errors.confirmPassword = 'Passwords do no match';
    }

    if(typeof password === 'undefined'){
        errors.confirmPassword = {
            lowercase: true,
            uppercase: true,
            number: true,
            symbol: true,
            toShort: true,
            match: true
        }
    } else {
        if(!passwordRegex.test(password)){
            errors.confirmPassword = {};
    
            if(!/[a-z]/g.test(password)){
                errors.confirmPassword.lowercase = true;
            }
        
            if(!/[A-Z]/g.test(password)){
                errors.confirmPassword.uppercase = true;
            }
        
            if(!/[0-9]/g.test(password)){
                errors.confirmPassword.number = true;
            }
        
            if(!/[!@#$%^&*]/g.test(password)){
                errors.confirmPassword.symbol = true;
            }
    
            if(password.length < 8){
                errors.confirmPassword.toShort = true
            }

            if(password !== confirmPassword){
                errors.confirmPassword.match = true
            }
        }
    }

    // if(password && match && !passwordRegex.test(password)){
    //     errors.password = 'Password must contain lowercase, uppercase, number, symbol, and be at least 8 characters';
    // }

    return errors;
}

SignUp = reduxForm({
    form: 'signup',
    validate
})(SignUp);

function mapStateToProps(state){
    return {
        authError: state.user.error
    }
}

export default connect(mapStateToProps, {signUp})(SignUp);
