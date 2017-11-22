import React, { Component } from 'react';
import marketing from '../assets/images/logo_lg.png';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props){
        super(props);

        this.imgStyles = {
            display: 'block',
            width: '25%',
            margin: '30px auto 30px'
        }
    }

    renderLinks(){
        if(this.props.auth){
            return [
                <h4 key="0" className="center-align">
                    <Link to="/marketing-data" className="blue-grey-text text-lighten-2">View Marketing Data</Link>
                </h4>,
                <h4 key="1" className="center-align">
                    <Link to="/student-list" className="blue-grey-text text-lighten-2">View Student List</Link>
                </h4>
            ]
        }

        return (
            <h4 className="center-align">
                Click <Link to="/sign-in" className="blue-grey-text text-lighten-2">Sign In</Link> to get started
            </h4>
        );
    }
    
    render(){
        return (
            <div >
                <img style={this.imgStyles} src={marketing}/>
                {this.renderLinks()}
            </div>
        );
    }
};

function mapStateToProps(state){
    return {
        auth: state.user.auth
    }
}

export default connect(mapStateToProps)(Home);
