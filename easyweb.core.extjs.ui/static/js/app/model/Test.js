/**
 * Model for Test items
 */
Ext.define('Easyweb.model.Test', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'name',
        'href',
        'code',
        'options',
        {name: 'status', defaultValue: 'ready'},
        'message'
    ]
});
