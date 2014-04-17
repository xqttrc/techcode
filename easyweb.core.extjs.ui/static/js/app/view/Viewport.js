/**
 * The main viewport, split in to a west and center region.
 */
Ext.define('Easyweb.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Easyweb.view.search.Container',
        'Easyweb.view.Header',
        'Easyweb.view.Tabs',
        'Easyweb.view.TreeContainer',
        'Easyweb.view.welcome.Index',
        'Easyweb.view.auth.HeaderForm',
        'Easyweb.view.comments.Index',
        'Easyweb.view.cls.Index',
        'Easyweb.view.cls.Container',
        'Easyweb.view.guides.Index',
        'Easyweb.view.guides.Container',
        'Easyweb.view.videos.Index',
        'Easyweb.view.videos.Container',
        'Easyweb.view.examples.Index',
        'Easyweb.view.examples.Container',
        'Easyweb.view.examples.TouchContainer',
        'Easyweb.view.tests.Index'
    ],

    id: 'viewport',
    layout: 'border',
    defaults: { xtype: 'container' },

    initComponent: function() {

        this.items = [
            {
                region: 'north',
                id: 'north-region',
                height: 65,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {
                        height: 37,
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'docheader'
                            },
                            {   xtype: 'container', flex: 1, html:'This is a test' },
                            {
                                id: 'loginContainer',
                                xtype: 'authHeaderForm',
                                padding: '10 20 0 0'
                            },
                            {
                                xtype: 'searchcontainer',
                                id: 'search-container',
                                width: 230,
                                margin: '4 0 0 0'
                            },
                            {
                            	xtype: 'toolbar',width   : 500,
                            	margin: '4 10 0 0',
                                items: [
                                        {
                                            // xtype: 'button', // default for Toolbars
                                            text: 'Button'
                                        },
                                        {
                                            xtype: 'splitbutton',
                                            text : 'Split Button'
                                        },
                                        // begin using the right-justified button container
                                        '->', // same as { xtype: 'tbfill' }
                                        {
                                            xtype    : 'textfield',
                                            name     : 'field1',
                                            emptyText: 'enter search term'
                                        },
                                        // add a vertical separator bar between toolbar items
                                        '-', // same as {xtype: 'tbseparator'} to create Ext.toolbar.Separator
                                        'text 1', // same as {xtype: 'tbtext', text: 'text1'} to create Ext.toolbar.TextItem
                                        { xtype: 'tbspacer' },// same as ' ' to create Ext.toolbar.Spacer
                                        'text 2',
                                        { xtype: 'tbspacer', width: 50 }, // add a 50px space
                                        'text 3'
                                    ]
                            }
                        ]
                    },
                    {
                        xtype: 'doctabs'
                    }
                ]
            },
            {
                region: 'center',
                layout: 'border',
                items: [
                    {
                        region: 'west',
                        xtype: 'treecontainer',
                        id: 'treecontainer',
                        border: 1,
                        bodyPadding: '10 9 4 9',
                        width: 240
                    },
                    {
                        region: 'center',
                        id: 'center-container',
                        layout: 'fit',
                        border: false,
                        padding: '5 10',
                        items: {
                            id: 'card-panel',
                            cls: 'card-panel',
                            xtype: 'container',
                            layout: {
                                type: 'card',
                                deferredRender: true
                            },
                            items: [
                                {
                                    autoScroll: true,
                                    xtype: 'welcomeindex',
                                    id: 'welcomeindex'
                                },
                                {
                                    xtype: 'container',
                                    id: 'failure'
                                },
                                {
                                    autoScroll: true,
                                    xtype: 'classindex',
                                    id: 'classindex'
                                },
                                {
                                    xtype: 'classcontainer',
                                    id: 'classcontainer'
                                },
                                {
                                    autoScroll: true,
                                    xtype: 'guideindex',
                                    id: 'guideindex'
                                },
                                {
                                    autoScroll: true,
                                    xtype: 'guidecontainer',
                                    id: 'guide',
                                    cls: 'iScroll'
                                },
                                {
                                    xtype: 'videoindex',
                                    id: 'videoindex'
                                },
                                {
                                    autoScroll: true,
                                    xtype: 'videocontainer',
                                    id: 'video',
                                    cls: 'iScroll'
                                },
                                {
                                    xtype: 'exampleindex',
                                    id: 'exampleindex'
                                },
                                {
                                    xtype: Easyweb.data.touchExamplesUi ? 'touchexamplecontainer' : 'examplecontainer',
                                    id: 'example'
                                },
                                {
                                    xtype: 'testsindex',
                                    id: 'testsindex'
                                },
                                {
                                    xtype: 'commentindex',
                                    id: 'commentindex'
                                }
                            ]
                        }
                    }
                ]
            },
            {
                region: 'south',
                id: 'footer',
                height: 20,
                contentEl: 'footer-content'
            }
        ];

        this.callParent(arguments);
    },

    /**
     * Sets the contents of `<title>` tag.
     * @param {String} text
     */
    setPageTitle: function(text) {
        text = Ext.util.Format.stripTags(text);
        if (!this.origTitle) {
            this.origTitle = document.title;
        }
        document.title = text ? (text + " - " + this.origTitle) : this.origTitle;
    }
});
