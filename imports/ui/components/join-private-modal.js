import {Template} from "meteor/templating";
import {Session} from "meteor/session";
import {sAlert} from "meteor/juliancwirko:s-alert"

import "./join-private-modal.html";

Template.joinPrivateModal.events({
    'input #private-key'() {
        Session.set("pk", !$("#private-key").val());
    },
    'click #l-submit'(e, t) {
        let pk = $("#private-key").val();
        if (!pk) {
            Session.set('pk', true);
        } else {
            Session.set('pk', false);
            Meteor.call('joinTeam', t.data._id, pk, (error) => {
                if (error) {
                    Session.set('pk', false);
                        sAlert.error(error.reason);
                } else {
                    $("#joinPrivateModal").modal('hide');
                    sAlert.success('Vous avez bien rejoint cette équipe privée.');
                }
            });
        }
    }
});

Template.joinPrivateModal.helpers({
    pkf() {
        if (Session.get('pk')) {
            return 'has-danger';
        }
    },
    pki() {
        if (Session.get('pk')) {
            return 'form-control-danger';
        }
    }
});