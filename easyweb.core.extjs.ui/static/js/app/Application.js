/**
 * Launcher of the Easyweb app.
 *
 * To have greater control of all the dependencies and do some
 * additional setup before launching the actual Ext.app.Application
 * instance we're not using the basic Ext.application().
 */
Ext.define('Easyweb.Application', {
    requires: [
        'Ext.app.Application',
        'Easyweb.History',
        'Easyweb.Comments',
        'Easyweb.Settings',
        'Easyweb.view.Viewport',

        'Easyweb.controller.Auth',
        'Easyweb.controller.Welcome',
        'Easyweb.controller.Failure',
        'Easyweb.controller.Classes',
        'Easyweb.controller.Search',
        'Easyweb.controller.InlineExamples',
        'Easyweb.controller.Examples',
        'Easyweb.controller.Guides',
        'Easyweb.controller.Videos',
        'Easyweb.controller.Tabs',
        'Easyweb.controller.Comments',
        'Easyweb.controller.CommentCounts',
        'Easyweb.controller.Tests'
    ],

    constructor: function() {
        // Initialize the comments system before anything else.
        //
        // This way all the controllers and views can rely on the
        // basic comments data being already loaded and they don't
        // need to set up additional listeners and callback to wait
        // for it being loaded.
        Easyweb.Comments.init(this.createApp, this);
    },

    createApp: function() {
        new Ext.app.Application({
            name: "Easyweb",
            controllers: [
                'Auth',
                'Welcome',
                'Failure',
                'Classes',
                'Search',
                'InlineExamples',
                'Examples',
                'Guides',
                'Videos',
                'Tabs',
                'Comments',
                'CommentCounts',
                'Tests'
            ],
            launch: this.launch
        });
    },

    launch: function() {
        Easyweb.App = this;
        Easyweb.Settings.init();

        Ext.create('Easyweb.view.Viewport');

        Easyweb.History.init();

        // When google analytics event tracking script present on page
        if (Easyweb.initEventTracking) {
            Easyweb.initEventTracking();
        }

        // Remove loading animated gif from background.
        // Keeping it there will degrade performance.
        Ext.get("loading").remove();

        // setInterval(function(){
        //     Ext.DomQuery.select('link')[2].href = "resources/css/viewport.css?" + Math.ceil(Math.random() * 100000000);
        // }, 1000);
    }
});
