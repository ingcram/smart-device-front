import { deviceConstants } from '../_constants';

export function devices(state = {}, action) {
  
  switch (action.type) {
    case deviceConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case deviceConstants.GETALL_SUCCESS:
      return {
        items: action.devices
      };
    case deviceConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case deviceConstants.DELETE_REQUEST:
      // add 'deleting:true' property to device being deleted
      return {
        ...state,
        items: state.items.map(device =>
          device.id === action.id
            ? { ...device, deleting: true }
            : device
        )
      };
    case deviceConstants.DELETE_SUCCESS:
      // remove deleted device from state
      return {
        items: state.items.filter(device => device.id !== action.id)
      };
    case deviceConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to device 
      return {
        ...state,
        items: state.items.map(device => {
          if (device.id === action.id) {
            // make copy of device without 'deleting:true' property
            const { deleting, ...deviceCopy } = device;
            // return copy of device with 'deleteError:[error]' property
            return { ...deviceCopy, deleteError: action.error };
          }

          return device;
        })
      };
    case deviceConstants.CREATE_REQUEST:
      return { registering: true };
    case deviceConstants.CREATE_SUCCESS:
      return {};
    case deviceConstants.CREATE_FAILURE:
      return {};
    case deviceConstants.UPDATE_REQUEST:
      return { registering: true };
    case deviceConstants.UPDATE_SUCCESS:
      return {};
    case deviceConstants.UPDATE_FAILURE:
      return {};
    default:
      return state
  }
}