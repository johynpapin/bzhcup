import {CookieConsent} from "meteor/selaias:cookie-consent";

let options = {

    cookieTitle: "Nous utilisons des cookies",
    cookieMessage: "Ce site utilise des cookies pour vous assurer la meilleure expérience de navigation possible",
    showLink: true,
    linkText: "En savoir plus",
    linkRouteName: "/cookiePolicy",
    acceptButtonText: "Accepter et continuer",
    html: false,
    expirationInDays: 7
};

CookieConsent.init(options);
