Meteor.publish('teams', () => {
    return Teams.find({});
});