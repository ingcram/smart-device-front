import { deviceConstants } from "../_constants";
import { deviceService } from "../_services";
import { alertActions } from "./";
import { history } from "../_helpers";

//TODO: Cambiar a redux_sagas

export const deviceActions = {
  create,
  update,
  getAll,
  get,
  turnOnOff,
  delete: _delete
};

function deviceUnload() {
  return { type: deviceConstants.GET_SUCCESS_UNLOAD };
}

function turnOnOff(id) {
  console.log("turnOnOff", id);
  return dispatch => {
    dispatch(request({ id }));

    deviceService.turnOnOff(id).then(
      device => {
        console.log('device', device);
        dispatch(success(device));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(id) {
    return { type: deviceConstants.TURNONOFF_REQUEST, id };
  }
  function success(device) {
    return { type: deviceConstants.TURNONOFF_SUCCESS, device };
  }
  function failure(error) {
    return { type: deviceConstants.TURNONOFF_FAILURE, error };
  }
}

function create(device) {
  return dispatch => {
    dispatch(request({ device }));

    deviceService.create(device).then(
      device => {
        dispatch(success(device));
        history.push("/");
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(device) {
    return { type: deviceConstants.CREATE_REQUEST, device };
  }
  function success(device) {
    return { type: deviceConstants.CREATE_SUCCESS, device };
  }
  function failure(error) {
    return { type: deviceConstants.CREATE_FAILURE, error };
  }
}

function update(device) {
  return dispatch => {
    dispatch(request({ device }));

    deviceService.update(device).then(
      device => {
        dispatch(success(device));
        history.push("/");
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(device) {
    return { type: deviceConstants.UPDATE_REQUEST, device };
  }
  function success(device) {
    return { type: deviceConstants.UPDATE_SUCCESS, device };
  }
  function failure(error) {
    return { type: deviceConstants.UPDATE_FAILURE, error };
  }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    deviceService
      .getAll()
      .then(
        devices => dispatch(success(devices)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() {
    return { type: deviceConstants.GETALL_REQUEST };
  }
  function success(devices) {
    return { type: deviceConstants.GETALL_SUCCESS, devices };
  }
  function failure(error) {
    return { type: deviceConstants.GETALL_FAILURE, error };
  }
}

function get(idDevice) {
  console.log("deviceActions " + idDevice);

  return dispatch => {
    dispatch(request());

    deviceService.get(idDevice).then(
      device => {
        dispatch(success(device));
        dispatch(deviceUnload());
      },
      error => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: deviceConstants.GET_REQUEST };
  }
  function success(device) {
    return { type: deviceConstants.GET_SUCCESS, device };
  }
  function failure(error) {
    return { type: deviceConstants.GET_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(request(id));

    userService
      .delete(id)
      .then(
        user => dispatch(success(id)),
        error => dispatch(failure(id, error.toString()))
      );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}
