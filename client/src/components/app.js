import 'materialize-css/dist/css/materialize.min.css';
import '../assets/css/app.css';
import React from 'react';
import { Route } from 'react-router-dom';
import Nav from './nav';
import Home from './home';
import MarketingData from './marketing_data';
import StudentList from './student_list';

const App = () => (
    <div className="container">
        <Nav/>
        <h1 className="center-align">LearningFuze Marketing Data</h1>

        <Route exact path="/" component={Home}/>
        <Route path="/marketing-data" component={MarketingData}/>
        <Route path="/student-list" component={StudentList}/>
    </div>
);

export default App;
