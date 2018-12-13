import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { deviceActions } from "../_actions";

const compareInDataAndState = (props, state) => {
  const { device } = props;
  if (props.loaded) {
    return {
      ...device
    };
  } else {
    return null;
  }
};

class EditSmartDevice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      ip: "",
      description: "",
      status: false,
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    return compareInDataAndState(props, state);
  }

  componentDidMount() {
    console.log("componentDidMount");
    console.log("params " + this.props.match.params.id);
    this.props.get(this.props.match.params.id);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const { name, ip, description, id } = this.state;

    if (name && ip) {
      this.props.update({
        id,
        name,
        ip,
        description
      });
    }
  }

  render() {
    const { registering } = this.props;
    let field = name => this.state[name];
    field = ip => this.state[ip];
    field = description => this.state[description];
    const { submitted } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Editar</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              "form-group" + (submitted && !field("name") ? " has-error" : "")
            }
          >
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={field("name")}
              onChange={this.handleChange}
            />
            {submitted && !field("name") && (
              <div className="help-block">Nombre es requerido</div>
            )}
          </div>
          <div
            className={
              "form-group" + (submitted && !field("ip") ? " has-error" : "")
            }
          >
            <label htmlFor="ip">Ip</label>
            <input
              type="text"
              className="form-control"
              name="ip"
              value={field("ip")}
              onChange={this.handleChange}
            />
            {submitted && !field("ip") && (
              <div className="help-block">Ip es requerido</div>
            )}
          </div>
          <div
            className={
              "form-group" +
              (submitted && !field("description") ? " has-error" : "")
            }
          >
            <label htmlFor="description">descripción</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={field("description")}
              onChange={this.handleChange}
            />
            {submitted && !field("description") && (
              <div className="help-block">descripción es requerido</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Guardar</button>
            {registering && (
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            )}
            <Link to="/" className="btn btn-link">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { devices } = state;
  const { registering, device, loaded } = devices;
  return {
    registering,
    device,
    loaded
  };
}

const connectedEditSmartDevice = connect(
  mapStateToProps,
  deviceActions
)(EditSmartDevice);
export { connectedEditSmartDevice as EditSmartDevice };
