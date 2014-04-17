/**
 * Renders search results list.
 */
Ext.define('Easyweb.view.search.Container', {
    extend: 'Ext.container.Container',
    alias: 'widget.searchcontainer',
    requires: 'Easyweb.view.search.Dropdown',

    initComponent: function() {

        if (Easyweb.data.search.length) {

            this.cls = 'search';

            this.items = [
                {
                    xtype: 'triggerfield',
                    triggerCls: 'reset',
                    emptyText: 'Search',
                    width: 170,
                    id: 'search-field',
                    enableKeyEvents: true,
                    hideTrigger: true,
                    onTriggerClick: function() {
                        this.reset();
                        this.focus();
                        this.setHideTrigger(true);
                        Ext.getCmp('search-dropdown').hide();
                    }
                },
                {
                    xtype: 'searchdropdown'
                }
            ];
        }

        this.callParent();
    }
});
