import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import _ from 'lodash';

import PublicLayout  from './public';
import PrivateLayout  from './private';

import sessionRoutes from './routes/sessionRoutes';
import publicRoutes from './routes/publicRoutes';
import privateRoutes from './routes/privateRoutes';

import { userActions } from "../_actions";
import {LoginPage} from '../LoginPage';
import NotFound from './public/NotFound';

class Template extends Component {

    constructor(props) {
        super(props);
        console.log("props",props);
     }

    componentWillMount() {
        //this.userActions.verify();
    }

    render() {
        const user = this.props.user;
        console.log("user", user);
        //if (!user.loggingIn) { return(<div>Loading...</div>); }      
        return (
        <BrowserRouter>
            <Switch>
              
                { _.map(publicRoutes, (route, key) => {
                  console.log("publicRoutes",route);
                  const { component, path } = route;
                  return (
                      <Route
                          exact
                          path={path}
                          key={key}
                          render={ (route) => <PublicLayout component={component} route={route} user={user} />}
                      />
                  )
              }) }
          
                 { _.map(privateRoutes, (route, key) => {                   
                    const { component, path } = route;
                   console.log("user.loggedIn", user.loggedIn);
                    return (
                        <Route
                            exact
                            path={path}
                            key={key}
                            render={ (route) =>                                
                                user.loggedIn ? (
                                <PrivateLayout component={component} route={route} user={user}  />
                                ) : (
                                <PublicLayout component={LoginPage} route={route} user={user}/>
                                )
                            }
                        />
                    )
                }) }
          
                { _.map(sessionRoutes, (route, key) => {
                  console.log("sessionRoutes",route);
                    const { component, path } = route;
          
                    return (
                        <Route
                            exact
                            path={path}
                            key={key}
                            render={ (route) =>
                                user.loggingIn ? (
                                    <Redirect to="/"/>
                                ) : (
                                    <PublicLayout component={component} route={route} user={user} />
                                )
                            }
                        />
                    )
                }) }

                <Route component={ NotFound } />
            </Switch>
        </BrowserRouter>
        );
    }
}

function mapStateToProps(state, props) {   
  console.log("state template ", state);
  const { authentication } = state;

    
  return { user: authentication } 
}
function mapDispatchToProps(dispatch) { return { dispatch }; }

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(Template);