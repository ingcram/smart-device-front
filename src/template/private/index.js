import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css'

export default class PrivateLayout extends Component {
    render() {
        const Component = this.props.component;
        const route = this.props.route;
        
      return (
         <div>
              
        
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to="/">Smart4U</Link> 
        </div>
        <div id="navbar" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li><Link to="/">Home</Link> </li>
            <li><Link to="/">About</Link> </li>
            <li><Link to="/">Contact</Link> </li>
          </ul>
        </div>
      </div>
    </nav>

    <div className="container">
        

      <div className="starter-template">
        <Component route={route}/>
      </div>

    </div>
              
   </div>
          
        );
    }
}