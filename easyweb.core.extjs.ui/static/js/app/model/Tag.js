/**
 * A tag model.
 */
Ext.define('Easyweb.model.Tag', {
    extend: 'Ext.data.Model',
    requires: ['Easyweb.CommentsProxy'],
    fields: [
        "tagname",
        "score"
    ],
    proxy: {
        type: "comments",
        url: "/tags",
        reader: {
            type: "json",
            root: "data"
        }
    }
});
