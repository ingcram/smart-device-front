import React, { Component } from 'react';

export default class PublicLayout extends Component {
    render() {
        const Component = this.props.component;
        const route = this.props.route;
        return (
            <div>
              <div>                                    
                  <Component route={route}/>
              </div>
            <div>
                <p>
                    <a href="http://www.uag.mx/" target="_top">Universidad autonoma de guadalajara</a>
                </p>
                <p>
                    <a href="mailto:ingcram@gmail.com" target="_top">Staff - Roberto Alvarez - ingcram@gmail.com </a>
                </p>
            </div>
          </div>
        );
    }
}