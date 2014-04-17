/**
 * Container for all trees.
 */
Ext.define('Easyweb.view.TreeContainer', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.treecontainer',
    requires: [
        'Easyweb.view.cls.Tree',
        'Easyweb.view.GroupTree'
    ],

    cls: 'iScroll',
    layout: 'card',
    resizable: true,
    resizeHandles: 'e',
    collapsible: true,
    hideCollapseTool: true,
    animCollapse: true,

    // For some strange reason the container gets a heading in Ext JS 4.1
    header: false,

    initComponent: function() {
        this.items = [
            {
                // An empty item that's initially activated.
                // We don't want to activate any of the trees when
                // they are hidden, as that will cause the scrollbar
                // to render improperly (or rather, not render at all)
            },
            {
                xtype: 'classtree',
                id: 'classtree',
                data: Easyweb.data.classes
            },
            {
                xtype: 'grouptree',
                id: 'exampletree',
                data: Easyweb.data.examples,
                convert: function(example) {
                    return {
                        leaf: true,
                        text: example.title,
                        url: '#!/example/' + example.name,
                        iconCls: 'icon-example'
                    };
                }
            },
            {
                xtype: 'grouptree',
                id: 'guidetree',
                data: Easyweb.data.guides,
                convert: function(guide) {
                    return {
                        leaf: true,
                        text: guide.title,
                        url: '#!/guide/' + guide.name,
                        iconCls: 'icon-guide'
                    };
                }
            },
            {
                xtype: 'grouptree',
                id: 'videotree',
                data: Easyweb.data.videos,
                convert: function(video) {
                    return {
                        leaf: true,
                        text: video.title,
                        url: '#!/video/' + video.name,
                        iconCls: 'icon-video'
                    };
                }
            }
        ];

        this.callParent();
    },

    /**
     * Shows the particular tree.
     *
     * @param {String} id  The id of the tree.
     */
    showTree: function(id) {
        this.show();
        this.layout.setActiveItem(id);
    }

});
