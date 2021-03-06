import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearAuthErrors } from '../actions';

export default function(WrappedComponent, to = '/'){
    class Auth extends Component {
        componentWillMount(){
            if(this.props.auth){
                this.props.history.push(to);
            }

            this.props.clearAuthErrors();
        }

        componentWillReceiveProps(nextProps){
            if(nextProps.auth){
                this.props.history.push(to);
            }
        }

        render(){
            if(this.props.auth) return null;

            return <WrappedComponent {...this.props}/>
        }
    }

    function mapStateToProps(state){
        return {
            auth: state.user.auth
        }
    }

    return connect(mapStateToProps, {clearAuthErrors})(Auth);
}
