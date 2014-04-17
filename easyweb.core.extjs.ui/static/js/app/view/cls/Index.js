/**
 * List of classes, grouped into categories.
 */
Ext.define('Easyweb.view.cls.Index', {
    extend: 'Ext.container.Container',
    alias: 'widget.classindex',
    requires: [
        'Easyweb.ContentGrabber',
        'Easyweb.Comments'
    ],
    mixins: ['Easyweb.view.Scrolling'],
    cls: 'class-categories iScroll',
    margin: '15 10',
    autoScroll: true,

    initComponent: function() {
        this.tpl = new Ext.XTemplate(
            '<h1 class="top" style="padding-bottom: 10px">API Documentation</h1>',
            '<tpl if="notice">',
                '<div class="notice">{notice}</div>',
            '</tpl>',
            '{categories}',
            '{news}'
        );
        this.data = {
            notice: Easyweb.data.message || Easyweb.ContentGrabber.get("notice-text"),
            categories: Easyweb.ContentGrabber.get("categories-content"),
            news: Easyweb.ContentGrabber.get("news-content")
        };

        this.callParent(arguments);
    },

    afterRender: function() {
        this.callParent(arguments);

        if (!Easyweb.Comments.isEnabled()) {
            return;
        }

        this.initComments();
    },

    initComments: function() {
        this.getEl().select("a.docClass").each(function(a) {
            var className = a.getHTML();
            var count = Easyweb.Comments.getClassTotalCount(className);
            if (count) {
                Ext.DomHelper.append(a, Easyweb.Comments.counterHtml(count));
            }
        }, this);
    },

    /**
     * Updates all comment counters.
     */
    updateCommentCounts: function() {
        if (!this.getEl()) {
            return;
        }

        this.getEl().select(".comment-counter-small").remove();
        this.initComments();
    },

    /**
     * Returns tab config for classes page if at least one class.
     * @return {Object}
     */
    getTab: function() {
        var enabled = (Easyweb.data.classes || []).length > 0;
        return enabled ? {cls: 'classes', href: '#!/api', tooltip: 'API Documentation'} : false;
    }
});
