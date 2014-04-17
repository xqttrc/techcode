/**
 * The class documentation page. Consists of the header (class name) and tab panel.
 * TODO: Add framework version
 */
Ext.define('Easyweb.view.cls.Container', {
    extend: 'Ext.container.Container',
    alias: 'widget.classcontainer',
    requires: [
        'Easyweb.view.cls.Header',
        'Easyweb.view.cls.Overview'
    ],

    layout: 'border',

    padding: '5 10 0 10',

    initComponent: function() {
        this.items = [
            Ext.create('Easyweb.view.cls.Header', {
                region: 'north'
            }),
            Ext.create('Easyweb.view.cls.Overview', {
                region: 'center'
            })
        ];
        this.callParent(arguments);
    }
});