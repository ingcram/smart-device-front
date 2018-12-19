import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deviceActions } from "../_actions";

class SmartDeviceControlPage extends React.Component {
  //TODO : AIRBNB-ESLINT
  constructor(props) {
    super(props);

    this.handleChecked = this.handleChecked.bind(this);
  }



  componentDidMount() {
    let deviceId = this.props.match.params.id;
    console.log("dispositivo apagar",deviceId);
   
    this.props.isOn(deviceId);

    setInterval(
      function() {
        this.props.isOn(deviceId);
      }
      .bind(this),
      3000
    );

  }

  handleChecked() {
    console.log(this);
    this.props.turnOnOff(this.props.match.params.id);
  }

  render() {
    const { devices } = this.props;
    return (
      <div>
        <form name="form">
          <div className="col-md-6 col-md-offset-3">
            <h1>Smart Device Control</h1>
            <input
              type="checkbox"
              name="control"
              checked={devices.device.status}
              onChange={this.handleChecked}
            />
            {devices.device.status && <em>On</em>}
            {!devices.device.status && <em>Off</em>}
            {devices.loading && <em>Loading devices...</em>}
            {devices.error && (
              <span className="text-danger">ERROR: {devices.error}</span>
            )}
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { authentication, devices } = state;
  return {
    devices
  };
}

const connectedSmartDeviceControlPage = connect(
  mapStateToProps,
  deviceActions
)(SmartDeviceControlPage);
export { connectedSmartDeviceControlPage as SmartDeviceControlPage };
