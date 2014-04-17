/**
 * Tree for classes.
 */
Ext.define('Easyweb.view.cls.Tree', {
    extend: 'Easyweb.view.DocTree',
    alias: 'widget.classtree',
    requires: [
        'Easyweb.view.cls.PackageLogic',
        'Easyweb.view.cls.InheritanceLogic',
        'Easyweb.Settings'
    ],

    /**
     * @cfg {Object[]} data (required)
     * An array of classes
     */

    initComponent: function() {
        this.setLogic(Easyweb.Settings.get("classTreeLogic"), Easyweb.Settings.get("showPrivateClasses"));

        this.dockedItems = [
            {
                xtype: 'container',
                dock: 'bottom',
                layout: 'hbox',
                items: [
                    {width: 34},
                    {
                        xtype: 'checkbox',
                        boxLabel: 'Show private classes',
                        cls: 'cls-private-cb',
                        checked: Easyweb.Settings.get("showPrivateClasses"),
                        listeners: {
                            change: function(cb, checked) {
                                this.setLogic(Easyweb.Settings.get("classTreeLogic"), checked);
                            },
                            scope: this
                        }
                    }
                ]
            },
            {
                xtype: 'container',
                dock: 'bottom',
                cls: 'cls-grouping',
                html: [
                    this.makeButtonHtml("PackageLogic", "By Package"),
                    this.makeButtonHtml("InheritanceLogic", "By Inheritance")
                ].join('')
            }
        ];

        this.on("afterrender", this.setupButtonClickHandler, this);

        this.callParent();
    },

    makeButtonHtml: function(logic, text) {
        return Ext.String.format(
            '<button class="{0} {1}">{2}</button>',
            logic,
            Easyweb.Settings.get("classTreeLogic") === logic ? "selected" : "",
            text
        );
    },

    setupButtonClickHandler: function() {
        this.el.addListener('click', function(e, el) {
            var clicked = Ext.get(el),
            selected = Ext.get(Ext.query('.cls-grouping button.selected')[0]);

            if (selected.dom === clicked.dom) {
                return;
            }

            selected.removeCls('selected');
            clicked.addCls('selected');

            if (clicked.hasCls('PackageLogic')) {
                this.setLogic("PackageLogic", Easyweb.Settings.get("showPrivateClasses"));
            } else {
                this.setLogic("InheritanceLogic", Easyweb.Settings.get("showPrivateClasses"));
            }
        }, this, {
            delegate: 'button'
        });
    },

    setLogic: function(logic, showPrivateClasses) {
        Easyweb.Settings.set("classTreeLogic", logic);
        Easyweb.Settings.set("showPrivateClasses", showPrivateClasses);

        var tree = new Easyweb.view.cls[logic]({classes: this.data, showPrivateClasses: showPrivateClasses});
        if (this.root) {
            // remember the current selection
            var selected = this.getSelectionModel().getLastSelected();
            // create new treestructure
            var nodes = tree.create();
            this.expandLonelyNode(nodes.root);
            this.setRootNode(nodes.root);
            this.initNodeLinks();

            // re-establish the previous selection
            selected && this.selectUrl(selected.raw.url);
        }
        else {
            var nodes = tree.create();
            this.root = nodes.root;
            this.expandLonelyNode(this.root);
        }
        // remember hidden nodes
        this.privates = nodes.privates;
    },

    // When only one expandable node at root level, expand it
    expandLonelyNode: function(root) {
        var expandableNodes = Ext.Array.filter(root.children, function(node) {
            return node.children.length > 0;
        });
        if (expandableNodes.length == 1) {
            expandableNodes[0].expanded = true;
        }
    },

    /**
     * Returns node data, looking also from private nodes.
     * @param {String} url
     * @return {Object}
     */
    findRecordByUrl: function(url) {
        return this.callParent([url]) || this.findPrivateRecordByUrl(url);
    },

    findPrivateRecordByUrl: function(url) {
        var ps = this.privates;
        for (var i=0; i<ps.length; i++) {
            if (ps[i].url === url) {
                return ps[i];
            }
        }
        return undefined;
    }
});
