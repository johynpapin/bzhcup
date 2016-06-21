import {Meteor} from "meteor/meteor";
import {sAlert} from "meteor/juliancwirko:s-alert";
import "./main-layout.html";

Template.mainLayout.rendered = function () {
    Session.set('off', false);
    if (Meteor.user()) {
        sAlert.success('Salut, ' + Meteor.user().profile.firstName + ' ' + Meteor.user().profile.lastName + ' !');
    }
};

Template.mainLayout.events({
    'click #volume'() {
        if(Session.get('off')) {
            $('#video-bg').prop('muted', false);
            Session.set('off', false);
        } else {
            $('#video-bg').prop('muted', true);
            Session.set('off', true);
        }
    }
});

Template.mainLayout.helpers({
    off() {
        return Session.get('off');
    }
});