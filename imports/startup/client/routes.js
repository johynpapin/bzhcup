import {Meteor} from "meteor/meteor";
import {FlowRouter} from "meteor/kadira:flow-router";
import {BlazeLayout} from "meteor/kadira:blaze-layout";

import "../../ui/layouts/main-layout.js";
import "../../ui/pages/home-page.js";
import "../../ui/pages/about-page.js";
import "../../ui/pages/contact-page.js";
import "../../ui/pages/register-page.js";
import "../../ui/pages/team-view-page.js";
import "../../ui/pages/account-page.js";
import "../../ui/pages/not-found-page.js";

FlowRouter.subscriptions = function () {
    this.register('Participants', Meteor.subscribe('Participants'));
};

FlowRouter.notFound = {
    action: function () {
        BlazeLayout.render("mainLayout", {content: "notFoundPage"});
    }
};

FlowRouter.route('/', {
    subscriptions() {
        this.register('teams', Meteor.subscribe('teams'));
    },
    name: 'homePage',
    action() {
        BlazeLayout.render("mainLayout", {content: "homePage"});
    }
});

FlowRouter.route('/about', {
    name: 'aboutPage',
    action() {
        BlazeLayout.render("mainLayout", {content: "aboutPage"});
    }
});

FlowRouter.route('/contact', {
    name: 'contactPage',
    action() {
        BlazeLayout.render("mainLayout", {content: "contactPage"});
    }
});

var teamsGroup = FlowRouter.group({
    prefix: "/teams"
});

teamsGroup.route('/', {
    subscriptions() {
        this.register('teams', Meteor.subscribe('teams'));
    },
    name: 'registerPage',
    action() {
        BlazeLayout.render("mainLayout", {content: "registerPage"});
    }
});
/*teamsGroup.route('/:teamName', {
    subscriptions() {
        this.register('teams', Meteor.subscribe('teams'));
    },
    name: 'teamViewPage',
    action() {
        BlazeLayout.render("mainLayout", {content: "teamViewPage"});
    }
});*/

FlowRouter.route('/account', {
    name: 'accountPage',
    action() {
        BlazeLayout.render("mainLayout", {content: "accountPage"});
    }
});