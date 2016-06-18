import {Template} from "meteor/templating";

import "./team-view-page.html";

Template.teamViewPage.helpers({
    team() {
        return Teams.findOne({name: FlowRouter.getParam("teamName")});
    }
});