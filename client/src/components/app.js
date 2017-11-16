import 'materialize-css/dist/css/materialize.min.css';
import '../assets/css/app.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import auth from '../hoc/auth';
import Nav from './nav';
import Home from './home';
import MarketingData from './marketing_data';
import StudentList from './student_list';

const App = () => (
    <div className="container">
        <Nav/>
        <h1 className="center-align">LearningFuze Marketing Data</h1>

        <Switch>
            <Route path="/marketing-data" component={auth(MarketingData)}/>
            <Route path="/student-list" component={auth(StudentList)}/>
            <Route path="/*" component={Home}/>
        </Switch>
    </div>
);

export default App;
