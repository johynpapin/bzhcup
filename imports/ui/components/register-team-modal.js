import {Template} from "meteor/templating";
import {Session} from "meteor/session";
import {sAlert} from "meteor/juliancwirko:s-alert";

import "./register-team-modal.html";

Template.registerTeamModal.events({
    'change #rt-private'() {
        $("#publicTeam").slideToggle('fast');
        $("#privateTeam").slideToggle('fast');
    },
    'input .r-i'(e) {
        function validateEmail(email) {
            var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return re.test(email);
        }

        let i = $(e.target).attr('id').substring(3);
        let v = $(e.target).val();
        if (i === "tname")
            Session.set("tname", !v);
        else if (i === "temail")
            Session.set("temail", !validateEmail(v));
    },
    'click #r-registerTeam'() {
        function validateEmail(email) {
            var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return re.test(email);
        }

        let teamname = $("#rt-tname").val();
        let teamemail = $("#rt-temail").val();
        let isPrivate = $("#rt-private").is(":checked");

        let error = false;

        if (!teamname) {
            Session.set('tname', true);
            error = true;
        } else
            Session.set('tname', false);
        if (!validateEmail(teamemail)) {
            Session.set('temail', true);
            error = true;
        } else
            Session.set('temail', false);
        if (error) {
            sAlert.error('Des erreurs ont été détéctées dans votre formulaire d’inscription.');
        } else if (isPrivate)
            Meteor.call('registerTeam', {
                name: teamname,
                email: teamemail,
                country: 'FR',
                isPrivate: true
            }, (error, result) => {
                if (error) {
                    sAlert.error(error.reason);
                } else {
                    $("#registerTeamModal").modal('hide');
                    $('#inviteModal').modal('show');

                    Session.set('teamKey', result);
                    sAlert.success('Votre équipe a bien été créée !');
                }
            });
        else
            Meteor.call('registerTeam', {
                name: teamname,
                email: teamemail,
                country: 'FR',
                isPrivate: false
            }, (error) => {
                if (error) {
                    sAlert.error(error.reason);
                } else {
                    $("#registerTeamModal").modal('hide');
                    sAlert.success('Votre équipe a bien été créée !');
                }
            });

    }
});

Template.registerTeamModal.helpers({
    teamnamef() {
        if (Session.get('tname')) {
            return 'has-danger';
        }
    },
    teamnamei() {
        if (Session.get('tname')) {
            return 'form-control-danger';
        }
    },
    teamemailf() {
        if (Session.get('temail')) {
            return 'has-danger';
        }
    },
    teamemaili() {
        if (Session.get('temail')) {
            return 'form-control-danger';
        }
    },
    teamKey() {
        return Session.get('teamKey');
    }
});