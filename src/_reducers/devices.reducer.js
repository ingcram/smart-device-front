import { deviceConstants } from "../_constants";
const initialState = {
  device: {
    id: "",
    name: "",
    ip: "",
    description: "",
    status: false,
    updatedAt: "",
    createdAt: ""
  }
};

export function devices(state = initialState, action) {
  switch (action.type) {
    case deviceConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case deviceConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.devices,
        loading: false
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
          device.id === action.id ? { ...device, deleting: true } : device
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
    case deviceConstants.GET_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case deviceConstants.GET_SUCCESS:
      return {
        device: action.device,
        loading: false,
        loaded: true
      };
    case deviceConstants.GET_SUCCESS_UNLOAD:
      return {
        ...state,
        loaded: false
      };
    case deviceConstants.GET_FAILURE:
      return {
        error: action.error
      };
    case deviceConstants.TURNONOFF_REQUEST:
      return { ...state, loading: true };
    case deviceConstants.TURNONOFF_SUCCESS:
      console.log('action', action);
      console.log('action.device.status', action.device.status);
      console.log(state);
      let newState = {...state};
      newState.device.status = action.device.status;
      newState.loading = false;
      return newState;
    case deviceConstants.TURNONOFF_REQUEST:
      return { ...state, loading: true };
    case deviceConstants.GETON_REQUEST:
      return { ...state };
    case deviceConstants.GETON_SUCCESS:
      console.log('action', action);
      console.log('action.device.status', action.device.status);
      console.log(state);
      let newStat = {...state};
      newStat.device.status = action.device.status;
      newStat.loading = false;
      return newStat;
    case deviceConstants.GETON_FAILURE:
      return { error: action.error };
    default:
      return state;
  }
}
