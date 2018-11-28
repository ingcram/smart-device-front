import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, deviceActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
        this.props.dispatch(deviceActions.getAll())
    }
    
    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    handleDeleteDevice(id) {
        return (e) => this.props.dispatch(deviceActions.delete(id));
    }

    render() {
        const { user, users } = this.props;
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
                                <Link to={"/smartDevice/"+device.id}>{device.name}</Link>
                                {
                                    device.deleting ? <em> - Deleting...</em>
                                    : device.deleteError ? <span className="text-danger"> - ERROR: {device.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(device.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
                <p>
                    <Link to="/smartDevice">Smart Devices</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication, devices } = state;
    const { user } = authentication;
    return {
        user,
        users,
        devices
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };