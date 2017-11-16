import React from 'react';
import { Link } from 'react-router-dom';

const Nav = props => {
    return (
        <nav>
            <div className="nav-wrapper blue-grey">
                <Link to="/" className="brand-logo" style={{ marginLeft: '8px'}}>LF Marketing</Link>
                <ul className="right">
                    <li>
                        <Link to="/student-list">View Student List</Link>
                    </li>
                    <li>
                        <Link to="/marketing-data">View Marketing Data</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;
