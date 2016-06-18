import {Meteor} from "meteor/meteor";
import {sAlert} from "meteor/juliancwirko:s-alert";
import "./main-layout.html";

Template.mainLayout.rendered = function () {
    if (Meteor.user()) {
        sAlert.success('Salut, ' + Meteor.user().profile.firstName + ' ' + Meteor.user().profile.lastName + ' !');
    }
};