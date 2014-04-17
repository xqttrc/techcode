/**
 * Retrieving and posting Comments
 */
Ext.define('Easyweb.controller.CommentCounts', {
    extend: 'Ext.app.Controller',

    requires: [
        "Easyweb.Comments"
    ],

    refs: [
        {
            ref: "class",
            selector: "classoverview"
        },
        {
            ref: "classIndex",
            selector: "#classindex"
        },
        {
            ref: 'guide',
            selector: '#guide'
        },
        {
            ref: 'guideIndex',
            selector: '#guideindex'
        },
        {
            ref: 'video',
            selector: '#video'
        },
        {
            ref: 'videoIndex',
            selector: '#videoindex'
        }
    ],

    init: function() {
        Easyweb.Comments.on("countChange", this.updateCounts, this);
    },

    updateCounts: function(target, count) {
        this.getClass().updateCommentCounts();
        this.getClassIndex().updateCommentCounts();

        this.getGuide().updateCommentCounts();
        this.getGuideIndex().updateCommentCounts();

        this.getVideo().updateCommentCounts();
        this.getVideoIndex().updateCommentCounts();
    }

});
