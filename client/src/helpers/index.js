import React from 'react';

export function renderInput({input, label, type, meta: { error, touched }}){
    return (
        <div>
            <label>{label}</label>
            <input {...input} type={type}/>
            <p className="red-text">{touched && error}</p>
        </div>
    )
}

export function renderConfirmPassword(
    {input, label, type, meta: { error, touched }}
){
    const listStyles = {
        display: 'flex',
        margin: '8px 10px'
    }

    error = (typeof error === 'undefined') ? {} : error;

    const {lowercase, number, symbol, toShort, uppercase, match} = error;

    return (
        <div>
            <label>{label}</label>
            <input {...input} type={type}/>
            
            <p className="grey-text">Password Requirements:</p>
            <ul>
                <li style={listStyles} className={`${lowercase ? 'red' : 'green'}-text text-lighten-2`}>
                    <i className="material-icons">{lowercase ? 'error_outline' : 'done'}</i> Lowercase letter
                </li>
                <li style={listStyles} className={`${uppercase ? 'red' : 'green'}-text text-lighten-2`}>
                    <i className="material-icons">{uppercase ? 'error_outline' : 'done'}</i> Uppercase letter
                </li>
                <li style={listStyles} className={`${number ? 'red' : 'green'}-text text-lighten-2`}>
                    <i className="material-icons">{number ? 'error_outline' : 'done'}</i> Number
                </li>
                <li style={listStyles} className={`${symbol ? 'red' : 'green'}-text text-lighten-2`}>
                    <i className="material-icons">{symbol ? 'error_outline' : 'done'}</i> Special character
                </li>
                <li style={listStyles} className={`${toShort ? 'red' : 'green'}-text text-lighten-2`}>
                    <i className="material-icons">{toShort ? 'error_outline' : 'done'}</i> Minimum 8 characters
                </li>
                <li style={listStyles} className={`${match ? 'red' : 'green'}-text text-lighten-2`}>
                    <i className="material-icons">{match ? 'error_outline' : 'done'}</i> Passwords match
                </li>
            </ul>
        </div>
    )
}

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
