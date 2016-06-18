import {sAlert} from "meteor/juliancwirko:s-alert"

sAlert.config({
    effect: 'slide',
    position: 'top-right',
    timeout: 5000,
    html: false,
    onRouteClose: false,
    stack: true,
    offset: 0,
    beep: false,
    onClose: _.noop
});