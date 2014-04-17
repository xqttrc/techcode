/**
 * Authentication controller.
 *
 * Here we just bind together the Easyweb.Auth and AuthForm component.
 */
Ext.define('Easyweb.controller.Auth', {
    extend: 'Ext.app.Controller',

    requires: [
        'Easyweb.Auth',
        'Easyweb.Comments'
    ],

    refs: [
        {
            ref: "authHeaderForm",
            selector: "authHeaderForm"
        }
    ],

    init: function() {
        this.control({
            'authHeaderForm, authForm': {
                login: this.login,
                logout: this.logout
            }
        });

        // HACK:
        // Because the initialization of comments involves adding an
        // additional tab, we need to ensure that we do this addition
        // after Tabs controller has been launched.
        var tabs = this.getController("Tabs");
        tabs.onLaunch = Ext.Function.createSequence(tabs.onLaunch, this.afterTabsLaunch, this);
    },

    afterTabsLaunch: function() {
        if (Easyweb.Comments.isEnabled()) {
            if (Easyweb.Auth.isLoggedIn()) {
                this.setLoggedIn();
            }
            else {
                this.setLoggedOut();
            }
        }
    },

    login: function(form, username, password, remember) {
        Easyweb.Auth.login({
            username: username,
            password: password,
            remember: remember,
            success: this.setLoggedIn,
            failure: function(reason) {
                form.showMessage(reason);
            },
            scope: this
        });
    },

    logout: function(form) {
        Easyweb.Auth.logout(this.setLoggedOut, this);
    },

    setLoggedIn: function() {
        Easyweb.Comments.loadSubscriptions(function() {
            this.getAuthHeaderForm().showLoggedIn(Easyweb.Auth.getUser());
            this.eachCmp("commentsListWithForm", function(list) {
                list.showCommentingForm();
            });
            this.eachCmp("commentsList", function(list) {
                list.refresh();
            });
            this.getController("Tabs").showCommentsTab();
        }, this);
    },

    setLoggedOut: function() {
        Easyweb.Comments.clearSubscriptions();

        this.getAuthHeaderForm().showLoggedOut();
        this.eachCmp("commentsListWithForm", function(list) {
            list.showAuthForm();
        });
        this.eachCmp("commentsList", function(list) {
            list.refresh();
        });
        this.getController("Tabs").hideCommentsTab();
    },

    eachCmp: function(selector, callback, scope) {
        Ext.Array.forEach(Ext.ComponentQuery.query(selector), callback, scope);
    }

});
