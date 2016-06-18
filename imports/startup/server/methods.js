Meteor.methods({
    registerTeam(team) {
        if (Meteor.user() && Meteor.user().profile.tournaments.lol.registered === true && Meteor.user().profile.tournaments.lol.ready === false) {
            Meteor.users.update(Meteor.userId(), {
                $set: {
                    'profile.tournaments.lol.ready': true
                }
            });
            team.lineup = [Meteor.userId()];
            return Teams.insert(team);
        } else {
            if(!Meteor.userId()) {
                throw new Meteor.Error('teams.registerTeam.unauthorized', 'Vous devez être connecté pour créer une équipe.');
            } else if (Meteor.user().profile.tournaments.lol.registered === false) {
                throw new Meteor.Error('teams.registerTeam.unauthorized', 'Vous n’êtes pas inscrit pour le tournoi de League of Legends.');
            } else {
                throw new Meteor.Error('teams.registerTeam.unauthorized', 'Vous êtes déjà dans une équipe, vous devez la quitter avant d’en créer une.');
            }
        }
    },
    leaveTeam() {
        Meteor.users.update(Meteor.userId(), {
            $set: {
                'profile.tournaments.lol.ready': false
            }
        });
        return Teams.update({
            lineup: Meteor.userId()
        }, {
            $pull: {
                lineup: Meteor.userId()
            }
        });
    },
    joinTeam(id, pk) {
        if (Meteor.user() && Meteor.user().profile.tournaments.lol.registered === true && Meteor.user().profile.tournaments.lol.ready === false) {
            var team = Teams.findOne(id);
            if (team.isPrivate) {
                if (team._id === pk) {
                    Meteor.users.update(Meteor.userId(), {
                        $set: {
                            'profile.tournaments.lol.ready': true
                        }
                    });
                    return Teams.update(id, {
                        $addToSet: {
                            lineup: Meteor.userId()
                        }
                    });
                } else {
                    throw new Meteor.Error('teams.joinTeam.unauthorized', 'Votre clé privée n’est pas valide.');
                }
            } else {
                Meteor.users.update(Meteor.userId(), {
                    $set: {
                        'profile.tournaments.lol.ready': true
                    }
                });
                return Teams.update(id, {
                    $addToSet: {
                        lineup: Meteor.userId()
                    }
                });
            }
        } else {
            if(!Meteor.userId()) {
                throw new Meteor.Error('teams.joinTeam.unauthorized', 'Vous devez être connecté pour vous inscrire dans une équipe.');
            } else if (Meteor.user().profile.tournaments.lol.registered === false) {
                throw new Meteor.Error('teams.joinTeam.unauthorized', 'Vous n’êtes pas inscrit pour le tournoi de League of Legends.');
            } else {
                throw new Meteor.Error('teams.joinTeam.unauthorized', 'Vous êtes déjà dans une équipe, vous devez la quitter pour rejoindre celle-ci.');
            }
        }
    },
    removeAccount() {
        if(Meteor.userId())
            return Meteor.users.remove(Meteor.userId());
        else
            throw new Meteor.Error('users.removeAccount', 'Vous devez être connecté afin de supprimer votre compte.');
    }
});