import {Template} from "meteor/templating";
import {Session} from "meteor/session";
import {sAlert} from "meteor/juliancwirko:s-alert"
import {Accounts} from 'meteor/accounts-base';

import "./register-modal.html";

Template.registerModal.events({
    'change #r-lol'() {
        $("#lol-warning").slideToggle('fast');
    },
    'input .r-i'(e) {
        function validateEmail(email) {
            var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return re.test(email);
        }
        let i = $(e.target).attr('id').substring(2);
        let v = $(e.target).val();
        if (i === "password") {
            let v2 = $('#r-password-2').val();
            Session.set(i, !(v !== '' && v2 !== '' && v === v2));
        } else if (i === "password-2") {
            let v2 = $('#r-password').val();
            Session.set("password", !(v !== '' && v2 !== '' && v === v2));
        } else if (i === "email") {
            Session.set("email", !validateEmail(v));
        } else
            Session.set(i, !v);
    },
    'click #r-register'() {
        function validateEmail(email) {
            var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return re.test(email);
        }
        let nickname = $("#r-nickname").val();
        let email = $("#r-email").val();
        let password = $("#r-password").val();
        let password2 = $("#r-password-2").val();
        let name = $("#r-name").val();
        let lastname = $("#r-lastname").val();
        let lol = $("#r-lol").is(":checked");
        let summonername = $("#r-summonername").val();

        let error = false;

        if (!nickname) {
            Session.set('nickname', true);
            error = true;
        } else
            Session.set('nickname', false);
        if (!validateEmail(email)) {
            Session.set('email', true);
            error = true;
        } else
            Session.set('email', false);
        if (password !== '' && password2 !== '' && password === password2)
            Session.set('password', false);
        else {
            Session.set('password', true);
            error = true;
        }
        if (!name) {
            Session.set('name', true);
            error = true;
        } else
            Session.set('name', false);
        if (!lastname) {
            Session.set('lastname', true);
            error = true;
        } else
            Session.set('lastname', false);
        if(lol && !summonername) {
            Session.set('summonername', true);
            error = true;
        } else
            Session.set('summonername', false);
        if (error) {
            sAlert.error('Des erreurs ont été détéctées dans votre formulaire d’inscription.');
        } else {
            let tm = $("#r-tm").is(":checked");
            let fifa = $("#r-fifa").is(":checked");
            let fps = $("#r-fps").is(":checked");
            let kebab = $("#r-kebab").is(":checked");
            let wires = $("#r-wires").is(":checked");
            let fifaC = $("#r-fifa-c").is(":checked");
            Accounts.createUser({
                username: nickname,
                email: email,
                password: password,
                profile: {
                    summonerName: summonername,
                    firstName: name,
                    lastName: lastname,
                    tournaments: {
                        lol: {
                            registered: lol,
                            ready: false
                        },
                        tm: tm,
                        fifa: fifa,
                        fps: fps
                    },
                    kebab: kebab,
                    wires: wires,
                    fifaC: fifaC
                }
            }, (error) => {
                if (error) {
                    sAlert.error('Une erreur est survenue lors de votre inscription...');
                } else {
                    $("#registerModal").modal('hide');
                    sAlert.success('Bienvenue, ' + Meteor.user().profile.firstName + ' ' + Meteor.user().profile.lastName + ' !');
                }
            });
        }
    }
});

Template.registerModal.helpers({
    nicknamef() {
        if (Session.get('nickname')) {
            return 'has-danger';
        }
    },
    nicknamei() {
        if (Session.get('nickname')) {
            return 'form-control-danger';
        }
    },
    emailf() {
        if (Session.get('email')) {
            return 'has-danger';
        }
    },
    emaili() {
        if (Session.get('email')) {
            return 'form-control-danger';
        }
    },
    passwordf() {
        if (Session.get('password')) {
            return 'has-danger';
        }
    },
    passwordi() {
        if (Session.get('password')) {
            return 'form-control-danger';
        }
    },
    namef() {
        if (Session.get('name')) {
            return 'has-danger';
        }
    },
    namei() {
        if (Session.get('name')) {
            return 'form-control-danger';
        }
    },
    lastnamef() {
        if (Session.get('lastname')) {
            return 'has-danger';
        }
    },
    lastnamei() {
        if (Session.get('lastname')) {
            return 'form-control-danger';
        }
    },
    summonernamef() {
        if (Session.get('summonername')) {
            return 'has-danger';
        }
    },
    summonernamei() {
        if (Session.get('summonername')) {
            return 'form-control-danger';
        }
    }
});