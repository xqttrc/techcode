/**
 * Container for videos listing.
 */
Ext.define('Easyweb.view.videos.Index', {
    extend: 'Ext.container.Container',
    alias: 'widget.videoindex',
    requires: [
        'Easyweb.view.ThumbList'
    ],
    mixins: ['Easyweb.view.Scrolling'],

    cls: 'iScroll',
    margin: '10 0 0 0',
    autoScroll: true,

    initComponent: function() {
        this.items = [
            { xtype: 'container', html: '<h1 class="eg">Videos</h1>' },
            Ext.create('Easyweb.view.ThumbList', {
                commentType: "video",
                itemTpl: [
                    '<dd ext:url="#!/video/{name}"><div class="thumb"><img src="{thumb}"/></div>',
                        '<div><h4>{title}',
                        '</h4><p>{[values.description.substr(0,80)]}...</p></div>',
                    '</dd>'
                ],
                data: Easyweb.data.videos
            })
        ];

        this.callParent(arguments);
    },

    /**
     * Returns tab config for videos page.
     * @return {Object}
     */
    getTab: function() {
        var enabled = (Easyweb.data.videos || []).length > 0;
        return enabled ? {cls: 'videos', href: '#!/video', tooltip: 'Videos'} : false;
    },

    /**
     * Refreshes the comment counters.
     */
    updateCommentCounts: function() {
        this.down("thumblist").updateCommentCounts();
    }
});
