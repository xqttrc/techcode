/**
 * The guide page.
 *
 * Renders the guide and print button.
 */
Ext.define('Easyweb.view.guides.Container', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.guidecontainer',
    componentCls: 'guide-container',
    mixins: ['Easyweb.view.Scrolling'],
    requires: [
        "Easyweb.Comments",
        "Easyweb.view.comments.LargeExpander"
    ],

    initComponent: function() {
        this.addEvents(
            /**
             * @event
             * Fired after guide loaded.
             */
            'afterload'
        );

        this.callParent(arguments);
    },

    /**
     * Scrolls the specified element into view
     *
     * @param {String} id  The element to scroll to.
     * Either ID of the element of anchor name.
     */
    scrollToEl: function(id) {
        var el = Ext.get(id);

        if (!el) {
            el = Ext.get(Ext.query("a[name='"+id+"']")[0]);
        }

        this.scrollToView(el, {
            highlight: true,
            offset: -100
        });
    },

    /**
     * Loads guide into the page.
     * @param {Object} guide
     */
    load: function(guide) {
        this.guide = guide;

        this.tpl = this.tpl || new Ext.XTemplate(
            Easyweb.data.showPrintButton ? '<a class="print guide" href="?print=/guide/{name}" target="_blank">Print</a>' : '',
            '{content}'
        );

        this.update(this.tpl.apply(guide));
        Easyweb.Syntax.highlight(this.getEl());

        if (Easyweb.Comments.isEnabled()) {
            this.initComments();
        }

        this.fireEvent('afterload');
    },

    initComments: function() {
        this.expander = new Easyweb.view.comments.LargeExpander({
            type: "guide",
            name: this.guide.name,
            el: this.getEl().down(".x-panel-body")
        });
    },

    /**
     * Updates the comments counter.
     */
    updateCommentCounts: function() {
        if (!this.expander) {
            return;
        }
        this.expander.getExpander().setCount(Easyweb.Comments.getCount(["guide", this.guide.name, ""]));
    }
});
