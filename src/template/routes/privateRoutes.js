import {HomePage} from '../../HomePage';
import {SmartDeviceControlPage} from '../../SmartDeviceControlPage';

export default {
    HomePage: {
        component: HomePage,
        path: '/'
    },
    SmartDeviceControlPage: {
        component: SmartDeviceControlPage,
        path: '/smart-device/control/:id'
    }
};