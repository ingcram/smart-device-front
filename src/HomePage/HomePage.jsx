import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {deviceActions}  from '../_actions';
console.log(deviceActions);
//REDUX DEV TOOLS
//REDUX LOGGER

class HomePage extends React.Component {    
    //TODO : AIRBNB-ESLINT    

    componentDidMount() {
        this.props.getAll();
    }   

    handleDeleteDevice(id) {
        return (e) => this.props.delete(id);
    }

    render() {
        const { user } = this.props;
        const { devices } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Smart Devices {user.firstName}!</h1>                                                
                <h3>All registered devices:</h3>
                {devices.loading && <em>Loading devices...</em>}
                {devices.error && <span className="text-danger">ERROR: {devices.error}</span>}
                {devices.items &&
                    <ul>
                        {devices.items.map((device, index) =>
                            <li key={device.id}>
                                <Link to={"/smart-device/edit/"+device.id}>{device.name}</Link>
                                {
                                    device.deleting 
                                    ? <em> - Deleting...</em>
                                    : device.deleteError 
                                        ? <span className="text-danger"> - ERROR: {device.deleteError}</span>
                                        : <span> - <a onClick={this.handleDeleteDevice(device.id)}>Delete</a></span>
                                }
                                <span> - <a onClick={this.handleDeleteDevice(device.id)}>Delete</a></span>
                                <Link to={`/smart-device/control/${device.id}`}>Control</Link>
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
                <p>
                    <Link to="/smart-device">Smart Devices</Link>
                </p>
            </div>
        );
    }
}

HomePage.propTypes = {
    getAllDevices : PropTypes.func,
    deleteDevice : PropTypes.func,
};

function mapStateToProps(state) {
    const { authentication, devices } = state;
    const { user } = authentication;
    return {
        user,        
        devices
    };
}

const connectedHomePage = connect(mapStateToProps, deviceActions)(HomePage);
export { connectedHomePage as HomePage };
