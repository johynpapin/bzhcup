import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

Teams = new Mongo.Collection("teams");

let Team = new SimpleSchema({
    name: {
        type: String,
        optional: false
    },
    email: {
        type: String,
        optional: true
    },
    country: {
        type:String,
        optional: true
    },
    lineup: {
        type: [String],
        optional: true
    },
    isPrivate: {
        type: Boolean,
        optional: true
    },
    'canJoins': {
        type: [String],
        optional: true
    }
});

Teams.attachSchema(Team);