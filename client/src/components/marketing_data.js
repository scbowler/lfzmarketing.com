import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMarketingData } from '../actions';
import Spinner from './spinner';
import ScrollTo from './scroll-to';

class MarketingData extends Component {
    componentDidMount(){
        this.props.getMarketingData();
    }

    renderData(){
        const contentStyle ={
            marginTop: '15px'
        }

        return this.props.data.map( (student, index) => {
            return (
                <div key={index} className="row">
                    <div className="col s12">
                        <div className="card grey lighten-3">
                            <div className="card-content">
                                <h4>{student.confirmed_data.name}</h4>
                                <h5>
                                    {student.confirmed_data.class} - {student.confirmed_data.class_id}
                                </h5>
                                <p><b> Email:</b> {student.email}</p>
                                <div className="row" style={contentStyle}>
                                    {this.renderFormData(student.formData)}
                                    {this.renderTrackingData(student.tracking_data)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
    }

    renderFormData(formData){
        const keys = Object.keys(formData);
        
        const list = keys.map((key, index) => {
            const { form_id, ts } = formData[key];
            return (
                <ul key={index} className="collection with-header">
                    <li className="collection-header blue-grey white-text"><h6>FORM SUBMITTED</h6></li>
                    <li className="collection-item">{form_id}</li>
                    <li className="collection-item"><b>{new Date(ts).toLocaleString()}</b></li>
                </ul>
            )
        });

        return (
            <div className="col s6">
                <h5 className="blue-grey darken-2 white-text" style={{padding: "15px"}}>Forms Completed: <b>{keys.length}</b></h5>
                {list}
            </div>
        )
    }

    renderTrackingData(trackingData){
        if(!trackingData){
            return <div className="col s6"><h5 className="blue-grey darken-2 orange-text" style={{padding: "15px"}}>Tracking Data Unavailable</h5></div>;
        }
        const keys = Object.keys(trackingData);

        const list = keys.map((key, index) => {
            const { REFER, URI, timeStamp } = trackingData[key];
            if(REFER){
                return (
                    <ul key={index} className="collection with-header">
                        <li className="collection-header blue-grey white-text"><h6>REFER TRACKING</h6></li>
                        <li className="collection-item"><b>FROM:</b> {REFER}</li>
                        <li className="collection-item"><b>TO:</b> {URI}</li>
                        <li className="collection-item"><b>{new Date(timeStamp).toLocaleString()}</b></li>
                    </ul>
                )
            }
        });

        return (
            <div className="col s6">
                <h5 className="blue-grey darken-2 white-text" style={{padding: "15px"}}>Number Of Tracked Visits: {keys.length}</h5>
                {list}
            </div>
        )
    }

    renderNotFoundList(){
        return this.props.badData.map((student, index) => {
            return (
                <tr key={index}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.class}</td>
                    <td>{student.class_id}</td>
                </tr>
            )
        });
    }

    render(){
        const { found, notFound, dataError, match: { url } } = this.props;

        if(dataError){
            return (
                <div>
                    <h3>Marketing Data:</h3>
                    <h4>{dataError}</h4>
                </div>
            );
        }

        if(!found && !notFound){
            return <Spinner/>;
        }

        const total = found + notFound;
        return (
            <div>
                <p><b>{Math.round((found/total) * 100)}%</b> of records found</p>
                <p><b>{found}</b> out of <b>{total}</b> <ScrollTo to="not-found" current={url}>View Not Found List</ScrollTo></p>
                { this.renderData() }
                <ScrollTo to="top" current={url}>Return to Top</ScrollTo>
                <h4 id="not-found">List of emails not found in database</h4>
                <table className="striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Class</th>
                            <th>Class ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderNotFoundList()}
                    </tbody>
                </table>
                <ScrollTo to="top" current={url}>Return to Top</ScrollTo>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        data: state.marketing.all,
        badData: state.marketing.badData,
        found: state.marketing.found,
        notFound: state.marketing.notFound,
        dataError: state.marketing.error
    }
}

export default connect(mapStateToProps, {getMarketingData})(MarketingData);
