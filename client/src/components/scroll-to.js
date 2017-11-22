import React, { Component } from 'react';
import '../assets/css/scroll-to.css';

class ScrollTo extends Component {
    componentDidMount(){
        const hash = window.location.hash;

        if(hash){
            this.scroll();
        }
    }
    
    scroll(){
        const { to, current } = this.props;

        if(to === 'top'){
            window.scrollTo(0, 0);
            window.history.pushState({}, null, current);
            return;
        }

        document.getElementById(to).scrollIntoView();
        window.history.pushState({}, null, current + '#' + to);
    }
    
    render(){
        const { text } = this.props;

        return <span className="scroll-link" onClick={this.scroll.bind(this)}>{this.props.children}</span>
    }
}

export default ScrollTo;
