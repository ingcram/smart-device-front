import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
          <a className="navbar-brand" href="#">Smart4U</a>
        </div>
        <div id="navbar" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li className="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
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