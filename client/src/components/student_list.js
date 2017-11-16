import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStudentList } from '../actions';

class StudentList extends Component {
    componentDidMount(){
        this.props.getStudentList();

    }

    renderTable(){
        return this.props.list.map((student, index) => {
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
        return (
            <div>
                <h5>Record Count: <b>{this.props.count}</b></h5>
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
                        {this.renderTable()}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        list: state.students.all,
        count: state.students.count
    }
}

export default connect(mapStateToProps, {getStudentList})(StudentList);
