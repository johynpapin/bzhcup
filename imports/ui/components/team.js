import {Template} from "meteor/templating";

import "./join-private-modal.js";
import "./team.html";

Template.team.events({
    'click #leaveTeam'() {
        Meteor.call('leaveTeam', (error) => {
            if (error) {
                sAlert.error(error.reason);
            } else {
                sAlert.success('Vous avez bien quitté cette équipe de navets.');
            }
        });
    },
    'click #joinTeam'() {
        Meteor.call('joinTeam', this._id, (error) => {
            if (error) {
                sAlert.error(error.reason);
            } else {
                sAlert.success('Vous avez bien rejoint cette équipe.');
            }
        });
    }
});

Template.team.helpers({
    players() {
        if(this.lineup) {
            if(this.lineup.indexOf(Meteor.userId()) !== -1) {
                return "Vous êtes dans cette équipe.";
            } else {
                switch (this.lineup.length) {
                    case 0:
                        return "Cette équipe est vide.";
                        break;
                    case 1:
                        return "Un joueur est dans l’équipe.";
                        break;
                    case 2:
                        return "Deux joueurs sont dans l’équipe.";
                        break;
                    case 3:
                        return "Trois joueurs sont dans l’équipe.";
                        break;
                    case 4:
                        return "Quatre joueurs sont dans l’équipe.";
                        break;
                    case 5:
                        return "Cinq joueurs sont dans l’équipe.";
                        break;
                    default:
                        return "Erreur !";
                        break;
                }
            }
        } else {
            return "Cette équipe est vide.";
        }
    },
    joined() {
        return (this.lineup.indexOf(Meteor.userId()) !== -1);
    },
    full() {
        return this.lineup.length === 5;
    },
    canJoin() {
        return this.canJoins.indexOf(Meteor.user().profile.summonerName) !== -1;
    }
});