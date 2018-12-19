import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deviceActions } from "../_actions";
//REDUX DEV TOOLS
//REDUX LOGGER

class HomePage extends React.Component {
  //TODO : AIRBNB-ESLINT

  componentDidMount() {
    this.props.getAll();
  }

  handleDeleteDevice(id) {
    return e => this.props.delete(id);
  }

  render() {
    const { user } = this.props;
    const { devices } = this.props;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h3>All registered devices:</h3>
        {devices.loading && <em>Loading devices...</em>}
        {devices.error && (
          <span className="text-danger">ERROR: {devices.error}</span>
        )}
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <td>Nombre</td>
              </tr>
            </thead>
            {devices.items && (
              <tbody>
                {devices.items.map((device, index) => (
                  <tr key={device._sysInfo.deviceId}>
                    <td>
                      {" "}
                      <Link
                        to={"/smart-device/control/" + device._sysInfo.deviceId}
                      >
                        {" "}
                        {device._sysInfo.alias}{" "}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  getAllDevices: PropTypes.func,
  deleteDevice: PropTypes.func
};

function mapStateToProps(state) {
  const { authentication, devices } = state;
  const { user } = authentication;
  return {
    user,
    devices
  };
}

const connectedHomePage = connect(
  mapStateToProps,
  deviceActions
)(HomePage);
export { connectedHomePage as HomePage };
