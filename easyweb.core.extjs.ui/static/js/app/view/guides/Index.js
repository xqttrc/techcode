/**
 * Container for guides listing.
 */
Ext.define('Easyweb.view.guides.Index', {
    extend: 'Ext.container.Container',
    alias: 'widget.guideindex',
    requires: ['Easyweb.view.ThumbList'],
    mixins: ['Easyweb.view.Scrolling'],

    cls: 'iScroll',
    margin: '10 0 0 0',
    autoScroll: true,

    initComponent: function() {
        this.items = [
            { xtype: 'container', html: '<h1 class="eg">Guides</h1>' },
            Ext.create('Easyweb.view.ThumbList', {
                commentType: "guide",
                itemTpl: [
                    '<dd ext:url="#!/guide/{name}"><div class="thumb"><img src="guides/{name}/icon.png"/></div>',
                        '<div><h4>{title}</h4><p>{description}</p></div>',
                    '</dd>'
                ],
                data: Easyweb.data.guides
            })
        ];

        this.callParent(arguments);
    },

    /**
     * Returns tab config for guides page.
     * @return {Object}
     */
    getTab: function() {
        var enabled = (Easyweb.data.guides|| []).length > 0;
        return enabled ? {cls: 'guides', href: '#!/guide', tooltip: 'Guides'} : false;
    },

    /**
     * Refreshes the comment counters.
     */
    updateCommentCounts: function() {
        this.down("thumblist").updateCommentCounts();
    }
});
