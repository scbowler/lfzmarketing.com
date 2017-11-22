import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../actions';

class Nav extends Component {

    renderLinks(){
        if(this.props.auth){
            return [
                <li key="0">
                    <Link to="/student-list">View Student List</Link>
                </li>,
                <li key="1">
                    <Link to="/marketing-data">View Marketing Data</Link>
                </li>,
                <li key="2">
                    <Link to="/" onClick={this.props.signOut}>Sign Out</Link>
                </li>
            ]
        }

        return [
            <li key="0">
                <Link to="/sign-in">Sign In</Link>
            </li>,
            <li key="1">
                <Link to="/sign-up">Sign Up</Link>
            </li>
        ];
    }

    render(){
        return (
            <nav>
                <div className="nav-wrapper blue-grey">
                    <Link to="/" className="brand-logo" style={{ marginLeft: '8px'}}>LF Marketing</Link>
                    <ul className="right">
                        {this.renderLinks()}
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state){
    return {
        auth: state.user.auth
    }
}

export default connect(mapStateToProps, {signOut})(Nav);
