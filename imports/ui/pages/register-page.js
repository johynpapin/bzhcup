import {Template} from "meteor/templating";
/*
import "../components/register-team-modal.js";
import "../components/register-lol-modal.js";*/
import "./register-page.html";
/*
Template.registerPage.rendered = () => {
    if(Meteor.user()) {
        if (Meteor.user().profile.tournaments.lol.registered === false) {
            $("#registerLolModal").modal('show');
        }
    }
};

Template.registerPage.helpers({
    teams() {
        let cursor = Teams.find({});
        if (cursor.count() === 0)
            return false;
        else
            return cursor;
    }
});*/