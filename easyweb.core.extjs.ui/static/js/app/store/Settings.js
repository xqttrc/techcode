/**
 * Store for keeping Docs app settings
 */
Ext.define('Easyweb.store.Settings', {
    extend: 'Ext.data.Store',
    requires: ['Easyweb.model.Setting'],
    model: 'Easyweb.model.Setting'
});
