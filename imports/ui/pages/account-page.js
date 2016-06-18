import {Meteor} from "meteor/meteor";
import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";
import {sAlert} from "meteor/juliancwirko:s-alert"

import "./account-page.html";

Template.accountPage.events({
    'click #logout'() {
        Meteor.logout((error) => {
            if (error)
                sAlert.error(error.reason);
            else {
                FlowRouter.go('homePage');
                sAlert.success('Vous êtes bien déconnecté.');
            }
        });
    },
    'click #removeAccount'() {
        Meteor.call('removeAccount', (error) => {
            if (error)
                sAlert.error(error.reason);
            else {
                FlowRouter.go('homePage');
                sAlert.success('Votre compte a bien été supprimé.');
            }
        });
    }
});

Template.accountPage.helpers({
    fullName() {
        if (Meteor.user())
            return Meteor.user().profile.firstName + ' ' + Meteor.user().profile.lastName;
    },
    registeredForLol() {
        if (Meteor.user())
            return Meteor.user().profile.tournaments.lol.registered;
    },
    inATeam() {
        if (Meteor.user())
            return Meteor.user().profile.tournaments.lol.ready;
    }
});