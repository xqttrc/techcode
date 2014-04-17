/**
 * A custom JsonP proxy that prepends Comments backend specific
 * prefixes to the configured URL.
 *
 * For example when configuring with:
 *
 *     url: "/tags"
 *
 * The actual URL will be something like:
 *
 *     url: "http://projects.sencha.com/auth/ext-js/4/tags"
 *
 */
Ext.define('Easyweb.CommentsProxy', {
    extend: 'Ext.data.proxy.JsonP',
    alias: "proxy.comments",
    requires: [
        "Easyweb.Comments"
    ],

    constructor: function(cfg) {
        cfg.url = Easyweb.Comments.buildRequestUrl(cfg.url);
        this.callParent([cfg]);
    }

});
