/**
 * Store for keeping search results.
 */
Ext.define('Easyweb.store.Search', {
    extend: 'Ext.data.Store',

    fields: ['name', 'fullName', 'icon', 'url', 'meta', 'sort'],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});