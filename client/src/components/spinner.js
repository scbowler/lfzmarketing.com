import React from 'react';
import '../assets/css/spinner.css';

export default props => {

    const text = props.text || 'LOADING';

    return (
        <div>
            <div className="center">
                <div className="spinner-container">
                    <div className="dot" id="d01"></div>
                    <div className="dot" id="d02"></div>
                    <div className="dot" id="d03"></div>
                    <div className="dot" id="d04"></div>
                    <div className="dot" id="d05"></div>
                    <div className="dot" id="d06"></div>
                    <div className="dot" id="d07"></div>
                    <div className="dot" id="d08"></div>
                    <div className="dot" id="d09"></div>
                    <div className="dot" id="d10"></div>
                    <div className="dot" id="d11"></div>
                    <div className="dot" id="d12"></div>
                </div>
            </div>
            <h3>{text}</h3>
        </div>
    )
}
