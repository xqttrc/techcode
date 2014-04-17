
Ext.define("easyweb.core.base.HomePanel", {
    extend: "Ext.Panel",
    alias: "widget.dnetHomePanel",
    _TEXT_TITLE: Easyweb.translate("appmenuitem", "home__lbl")
    , _TEXT_STD_MENU: Easyweb.translate("appmenuitem", "appmenus__lbl")
    , _TEXT_USR_MENU: Easyweb.translate("appmenuitem", "bookmark__lbl")


    , _Menu_StdMenuId_: "easyweb-application-view-menu-std-menu"
    , _Menu_UsrMenuId_: "easyweb-application-view-menu-usr-menu"
    , _Menu_AccordeonId_: "easyweb-application-view-menu-accordeon"

    , initComponent: function(config) {
        var tr = easyweb.core.base.TemplateRepository;
        var menuConfig = [];


        for (var k in Easyweb.navigationTreeMenus) {
            menuConfig[menuConfig.length] = Easyweb.navigationTreeMenus[k];
        }
        var navigAccordeonCfg = {
            layout: 'accordion'
            , layoutConfig: {animate: false,
                activeOnTop: true // ,fill: true          
            }

            , id: this._Menu_AccordeonId_
            , region: 'west'
            , width: 350
            , split: true
            , minSize: 200
            , maxSize: 500
            , title: Easyweb.translate("appmenuitem", "navigAccordeonId__lbl")
            , collapsible: true
            , items: []

        }

        for (var i = 0; i < menuConfig.length; i++) {
            navigAccordeonCfg.items[i] = {
                title: menuConfig[i]["title"],
                layout: {type: 'fit'}
                , items: [
                    {
                        xtype: "dnetNavigationTree",
                        id: "easyweb-application-view-menu-" + menuConfig[i]["name"],
                        _menuId_: 1,
                        _menuName_: menuConfig[i]["name"],
                        withStdFilterHeader: true, loader_PreloadChildren: true
//						  
                                //,_data_: menuConfig[i]["children"]	
                        , listeners: {
                            openMenuLink: {scope: this
                                , fn: function(model) {
                                    var bundle = model.raw.bundle;
                                    var frame = model.raw.frame;

                                    var path = Easyweb.buildUiPath(bundle, frame, false);
                                    getApplication().showFrame(frame, {url: path});
                                }
                            }
                        }
                    }
                ]};
        }

        var html = '<div style="width:100%;height:100%;overflow: hidden;" id="div_dnet_dashboard" ><iframe id="iframe_dnet_dashboard" name="iframe_dnet_dashboard"';
        html += ' src="dashboard" ';
        html += '" style="border:0;width:100%;height:100%;overflow: hidden" FRAMEBORDER="no"></iframe></div>';

        var cfg = {
            layout: "border"
            , title: this._TEXT_TITLE
            , items: [
                //{region:"center", frame:true, html:"<div style='text-align:center;width:100%;font-size:16px;font-weight:bold;padding-top:40px;'><span>Welcome to "+Easyweb.name+"</span></div>" }
                // {region:"center", frame:true, tpl:easyweb.core.base.TemplateRepository.APPLICATION_HOME, data:{dnetName: Easyweb.name, dnetVersion:Easyweb.version} }

                {region: "center", frame: true,
                    layout: 'fit',
                    html: html
                }

                , {region: "south", border: false, frame: true, tpl: tr.get(tr.HOMEPANEL_FOOTER)
                    , data: {}, id: "easyweb-application-view-footer"}
                , navigAccordeonCfg
            ]
        }
        Ext.apply(this, cfg);
        this.callParent(arguments);
    }

});

