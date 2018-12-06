import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {deviceActions}  from '../_actions';

class SmartDeviceControlPage extends React.Component {    
    //TODO : AIRBNB-ESLINT    

    componentDidMount() {
        
    }   


    render() {
        const { devices } = this.props;
        return (
            <form name="form" onSubmit={this.handleSubmit}>
            <div className="col-md-6 col-md-offset-3">
                <h1>Smart Device Control</h1>                                                
                <input type="checkbox" name="control" value="1"> ON/OFF</input>
                {devices.loading && <em>Loading devices...</em>}
                {devices.error && <span className="text-danger">ERROR: {devices.error}</span>}
            </div>
            </form>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, devices } = state;
    return {      
        devices
    };
}

const connectedSmartDeviceControlPage = connect(mapStateToProps, deviceActions)(SmartDeviceControlPage);
export { connectedSmartDeviceControlPage as SmartDeviceControlPage };
