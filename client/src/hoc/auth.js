import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../actions';

export default function(WrappedComponent){
    class Auth extends Component {
        componentWillMount(){
            if(!this.props.auth){
                this.props.history.push('/');
            } else if(this.props.expired){
                this.props.signOut();
                this.props.history.push('/sign-in');
            }
        }

        componentWillReceiveProps(nextProps){
            if(nextProps.expired){
                this.props.history.push('/sign-in');
            } else if(!nextProps.auth){
                this.props.history.push('/');
            }
        }

        render(){
            if(!this.props.auth) return null;

            return <WrappedComponent {...this.props}/>
        }
    }

    function mapStateToProps(state){
        return {
            auth: state.user.auth,
            expired: state.user.expired
        }
    }

    return connect(mapStateToProps, {signOut})(Auth);
}
