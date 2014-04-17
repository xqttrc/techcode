/**
 * View for showing tags.
 */
Ext.define('Easyweb.view.comments.Tags', {
    extend: 'Easyweb.view.comments.TopList',
    alias: "widget.commentsTags",
    requires: ["Easyweb.model.Tag"],

    model: "Easyweb.model.Tag",
    displayField: "tagname",
    filterEmptyText: "Filter tags by name..."
});
