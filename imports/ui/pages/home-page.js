import {Template} from "meteor/templating";

import "../components/team.js";
import "../components/register-modal.js";
import "../components/login-modal.js";
import "./home-page.html";

Template.homePage.rendered = () => {
    $(".rotate").textrotator({
        animation: "dissolve", // You can pick the way it animates when rotating through words. Options are dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin.
        separator: ",", // If you don't want commas to be the separator, you can define a new separator (|, &, * etc.) by yourself using this field.
        speed: 2000 // How many milliseconds until the next word show.
    });
};

Template.homePage.events({
    'click #open-register-modal'() {
        Session.set('nickname', false);
    }
});