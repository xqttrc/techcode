/**
 * Renders the title of the docs app (extracted from "header-content" div).
 *
 * When `Easyweb.otherProducts` is defined, also renders the menu with
 * links to these other products.
 */
Ext.define('Easyweb.view.Header', {
    extend: 'Ext.container.Container',
    alias: 'widget.docheader',

    contentEl: 'header-content',

    initComponent: function() {
        if (Easyweb.otherProducts) {
            this.style = 'cursor: pointer;',
            this.cls = 'dropdown';

            this.menu = Ext.create('Ext.menu.Menu', {
                renderTo: Ext.getBody(),
                plain: true,
                items: Easyweb.otherProducts
            });
        }

        this.callParent();
    },

    listeners: {
        afterrender: function(cmp) {
            if (this.menu) {
                cmp.el.addListener('click', function(cmp, el) {
                    this.menu.showBy(this.el, 'tr-br?');
                }, this);
            }
        }
    }
});
