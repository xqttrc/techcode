/**
 * View for login form at the end of comments.
 */
Ext.define('Easyweb.view.auth.Form', {
    extend: 'Easyweb.view.auth.BaseForm',
    alias: 'widget.authForm',
    componentCls: "auth-form",

    initComponent: function() {
        this.html = [
            '<span class="before-text">Sign in to post a comment:</span>',
            this.createLoginFormHtml()
        ];

        this.callParent(arguments);
    },

    afterRender: function() {
        this.callParent(arguments);

        this.bindFormSubmitEvent();
    }

});
