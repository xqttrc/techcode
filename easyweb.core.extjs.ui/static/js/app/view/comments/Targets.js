/**
 * View for showing topics (classes, members, guides, ...).
 */
Ext.define('Easyweb.view.comments.Targets', {
    extend: 'Easyweb.view.comments.TopList',
    alias: "widget.commentsTargets",
    requires: ["Easyweb.model.Target"],

    model: "Easyweb.model.Target",
    displayField: "text",
    filterEmptyText: "Filter topics by name..."
});
