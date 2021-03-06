import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deviceActions } from '../_actions';

class SmartDevicePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            device: {
                name: '',
                ip: '',
                description: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { device } = this.state;
        this.setState({
            device: {
                ...device,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { device } = this.state;
        const { dispatch } = this.props;
        if (device.name && device.ip ) {
            dispatch(deviceActions.create(device));
        }
    }

    render() {
        const { registering  } = this.props;
        const { device, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Registrar</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !device.name ? ' has-error' : '')}>
                        <label htmlFor="name">Nombre</label>
                        <input type="text" className="form-control" name="name" value={device.name} onChange={this.handleChange} />
                        {submitted && !device.name &&
                            <div className="help-block">Nombre es requerido</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !device.ip ? ' has-error' : '')}>
                        <label htmlFor="ip">Ip</label>
                        <input type="text" className="form-control" name="ip" value={device.ip} onChange={this.handleChange} />
                        {submitted && !device.ip &&
                            <div className="help-block">Ip es requerido</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !device.description ? ' has-error' : '')}>
                        <label htmlFor="description">descripción</label>
                        <input type="text" className="form-control" name="description" value={device.description} onChange={this.handleChange} />
                        {submitted && !device.description &&
                            <div className="help-block">descripción es requerido</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Registrar</button>
                        {registering && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedSmartDevicePage = connect(mapStateToProps)(SmartDevicePage);
export { connectedSmartDevicePage as SmartDevicePage };