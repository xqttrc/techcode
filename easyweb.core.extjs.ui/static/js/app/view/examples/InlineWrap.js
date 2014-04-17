/**
 * Wraps simple `<pre>` element and augments it with toolbar.
 * When any button on toolbar is clicked, transforms the `<pre>`
 * into editor or live preview.
 */
Ext.define('Easyweb.view.examples.InlineWrap', {
    requires: [
        'Easyweb.view.examples.Inline',
        'Easyweb.view.examples.InlineToolbar'
    ],

    /**
     * Wraps pre into initial inline example.
     * @param {HTMLElement} pre
     */
    constructor: function(pre) {
        this.pre = pre;

        var options = this.parseOptions(pre.className);

        this.initToolbar();

        if (options.preview) {
            this.replacePre(options);
        }
        else {
            this.tb.on("buttonclick", function(name) {
                // switch to code or preview depending on which button clicked.
                options.preview = (name === "preview");
                this.replacePre(options);
            }, this, {single: true});
        }
    },

    // Parses options from HTML class attribute
    parseOptions: function(text) {
        var options = {};
        Ext.Array.forEach(text.split(/ +/), function(cls) {
            if (cls === "phone" || cls === "miniphone" || cls === "tablet") {
                options.device = cls;
            }
            else if (cls === "ladscape" || cls === "portrait") {
                options.orientation = cls;
            }
            else {
                options[cls] = true;
            }
        });
        return options;
    },

    // adds toolbar above <pre>
    initToolbar: function() {
        var div = document.createElement("div");
        this.pre.parentNode.insertBefore(div, this.pre);

        this.tb = Ext.create("Easyweb.view.examples.InlineToolbar", {
            renderTo: div
        });
    },

    replacePre: function(options) {
        var div = document.createElement("div");
        this.pre.parentNode.replaceChild(div, this.pre);

        Ext.create('Easyweb.view.examples.Inline', {
            height: 200,
            renderTo: div,
            // Grab code from <pre> element.
            // Strip tags and replace HTML entities with their values.
            value: Ext.String.htmlDecode(Ext.util.Format.stripTags(this.pre.innerHTML)),
            options: options,
            toolbar: this.tb
        });
    }


});