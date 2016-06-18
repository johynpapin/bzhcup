import {Template} from "meteor/templating";
import {Session} from "meteor/session";
import {sAlert} from "meteor/juliancwirko:s-alert"

import "./login-modal.html";

Template.loginModal.events({
    'input .l-i'(e) {
        let i = $(e.target).attr('id');
        let v = $(e.target).val();
        Session.set(i, !v);
    },
    'click #l-submit'() {
        let login = $("#l-login").val();
        let password = $("#l-password").val();
        let error = false;
        if (!login) {
            Session.set('l-login', true);
            error = true;
        } else
            Session.set('l-login', false);
        if (!password) {
            Session.set('l-password', true);
            error = true;
        } else
            Session.set('l-password', false);
        if (error)
            sAlert.error('Des erreurs ont été détéctées dans votre formulaire de connexion.');
        else
            Meteor.loginWithPassword(login, password, (error) => {
                if (error) {
                    Session.set('l-login', true);
                    Session.set('l-password', true);
                    if (error.reason === "User not found")
                        sAlert.error("Mauvais couple utilisateur/mot de passe.");
                    else
                        sAlert.error(error.reason);
                } else {
                    $("#loginModal").modal('hide');
                    sAlert.success('Salut, ' + Meteor.user().profile.firstName + ' ' + Meteor.user().profile.lastName + ' !');
                }
            });
    }
});

Template.loginModal.helpers({
    loginf() {
        if (Session.get('l-login')) {
            return 'has-danger';
        }
    },
    logini() {
        if (Session.get('l-login')) {
            return 'form-control-danger';
        }
    },
    passwordf() {
        if (Session.get('l-password')) {
            return 'has-danger';
        }
    },
    passwordi() {
        if (Session.get('l-password')) {
            return 'form-control-danger';
        }
    }
});