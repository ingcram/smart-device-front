import config from "config";
import { authHeader } from "../_helpers";

export const deviceService = {
  getAll,
  delete: _delete,
  get,
  create,
  turnOnOff,
  update
};

function turnOnOff(id) {
  console.log("roberto", id);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ip: "192.168.15.2" })
  };

  return fetch(`${config.apiUrl}/turnOn`, requestOptions).then(handleResponse);
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/devices`, requestOptions).then(handleResponse);
}

function get(idDevice) {
  console.log("service " + idDevice);
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/devices/` + idDevice, requestOptions).then(
    handleResponse
  );
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/devices/${id}`, requestOptions).then(
    handleResponse
  );
}

function create(device) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(device)
  };

  return fetch(`${config.apiUrl}/devices`, requestOptions).then(handleResponse);
}

function update(device) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(device)
  };

  return fetch(`${config.apiUrl}/devices/${device.id}`, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
