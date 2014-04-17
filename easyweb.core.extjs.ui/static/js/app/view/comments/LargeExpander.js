/**
 * The Expander with a h3 heading "Comments".
 */
Ext.define('Easyweb.view.comments.LargeExpander', {
    requires: [
        "Easyweb.Comments",
        "Easyweb.view.comments.Expander"
    ],

    html: [
        '<div class="comments-large-expander">',
            '<h3 class="icon-comment">Comments</h3>',
            '<div></div>',
        '</div>'
    ].join(""),

    /**
     * @cfg {Ext.Element/HTMLElement} el
     * The member element to wrap.
     */

    /**
     * @cfg {String} type
     * One of: "class", "guide", "video".
     */
    type: "class",

    /**
     * @cfg {String} name
     * The name of the current class, guide or video.
     */

    /**
     * @cfg {Function} onCountUpdated
     * A function to call when the count gets updated.
     */

    constructor: function(cfg) {
        Ext.apply(this, cfg);
        this.el = Ext.get(cfg.el);

        // The expander needs to reside inside some element.
        var expanderWrap = Ext.DomHelper.append(this.el, this.html, true).down("div");

        var target = [this.type, this.name, ""];
        this.expander = new Easyweb.view.comments.Expander({
            count: Easyweb.Comments.getCount(target),
            target: target,
            renderTo: expanderWrap,
            onCountUpdated: this.onCountUpdated
        });
    },

    /**
     * Access the embedded Expander element.
     * @return {Easyweb.view.comments.Expander}
     */
    getExpander: function() {
        return this.expander;
    }

});
