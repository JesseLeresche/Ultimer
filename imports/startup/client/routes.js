// set up all routes in the app

//Import to load all of the required templates
import '../../ui/layouts/body/body.js';
import '../../ui/layouts/timer/timer.js';
import '../../ui/layouts/tasks/task.js';
import '../../ui/layouts/shared/404not_found.html';

import '../../ui/stylesheets/main.css';

//Router Configuration
Router.configure({
    layoutTemplate: 'body-wrapper',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading',
    yieldTemplates: {
        nav: {to: 'nav'},
        footer: {to: 'footer'},
    }
});

//Setup Routes

Router.route('/', {
    name: "timer",
    template:"timer",
    data: {
        body_color: "cyan"
    }
});

Router.route('/tasks', {
    name: "manage_tasks",
    template:"manage_tasks",
    data: {
        body_color: "white"
    }

});

Router.plugin('ensureSignedIn', {
    only: ['manage_tasks']
});

AccountsTemplates.configure({
    defaultLayout: 'body-wrapper',
});

//Accounts Template Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');