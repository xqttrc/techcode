/**
 * Key-value pairs of Docs app settings.
 */
Ext.define('Easyweb.model.Setting', {
    fields: ['id', 'key', 'value'],
    extend: 'Ext.data.Model',
    requires: ['Ext.data.proxy.LocalStorage'],
    proxy: {
        type: window['localStorage'] ? 'localstorage' : 'memory',
        id: Easyweb.data.localStorageDb + '-settings'
    }
});
