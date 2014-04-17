/**
 * The Welcome page of docs app.
 */
Ext.define('Easyweb.view.welcome.Index', {
    extend: 'Ext.container.Container',
    alias: 'widget.welcomeindex',
    mixins: ['Easyweb.view.Scrolling'],
    requires: [
        'Easyweb.ContentGrabber'
    ],
    cls: 'welcome iScroll',

    initComponent: function() {
        this.html = Easyweb.ContentGrabber.get('welcome-content');
        this.hasContent = !!this.html;

        this.callParent(arguments);
    },

    /**
     * Returns tab config for the welcome page.
     * @return {Object}
     */
    getTab: function() {
        return this.hasContent ? {cls: 'index', href: '#', tooltip: 'Home'} : false;
    }
});
