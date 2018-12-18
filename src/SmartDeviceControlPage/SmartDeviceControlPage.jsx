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
    //we obtain the device to show details in the page.
    //this.props.get(this.props.match.params.id);
  }

  handleChecked() {
    console.log(this);
    this.props.turnOnOff(this.props.match.params.id);
    if (true) {
      console.log("true"), this.props.match.params.id;
    } else {
      console.log("isNotChecked");
    }
  }

  render() {
    const { devices } = this.props;
    const { device } = devices;
    
    return (
      <div>
        <form name="form">
          <div className="col-md-6 col-md-offset-3">
            <h1>Smart Device Control</h1>
            <p>
               <label class="switch">
                <input type="checkbox" name="control" onChange={this.handleChecked} />
                <span class="slider"></span>
              </label>
              {device.status && <em>On</em>}
              {!device.status && <em>Off</em>}
            </p>
            <p>Name : {device.name}</p>
            <p>Description : {device.description}</p>
            <p>Ip: {device.ip}</p>            
            
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
  const { devices } = state;  
  const device = devices.items.find( item => item.id === 1 );
  devices.device = device;
  return {
    devices    
  };
}

const connectedSmartDeviceControlPage = connect(
  mapStateToProps,
  deviceActions
)(SmartDeviceControlPage);
export { connectedSmartDeviceControlPage as SmartDeviceControlPage };
