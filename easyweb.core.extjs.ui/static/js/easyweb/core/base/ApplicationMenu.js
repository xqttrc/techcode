Ext.ns("easyweb.core.base");

/**
 * Contributed menus
 */
easyweb.core.base.ApplicationMenu$ContributedMenus = [];

/**
 * Themes
 */
easyweb.core.base.ApplicationMenu$Themes = [ {
	text : Easyweb.translate("appmenuitem", "theme_aqua__lbl"),
	handler : function() {
		getApplication().changeCurrentTheme("aqua");
	}
}, {
	text : Easyweb.translate("appmenuitem", "theme_gray__lbl"),
	handler : function() {
		getApplication().changeCurrentTheme("gray");
	}
}, {
	text : Easyweb.translate("appmenuitem", "theme_blue__lbl"),
	handler : function() {
		getApplication().changeCurrentTheme("blue");
	}
} ]

/**
 * Languages
 */
easyweb.core.base.ApplicationMenu$Languages = [ {
	text : "English",
	handler : function() {
		getApplication().changeCurrentLanguage("en");
	}
}, {
	text : "中文",
	handler : function() {
		getApplication().changeCurrentLanguage("zh");
	}
} ]

/**
 * Help items
 */
easyweb.core.base.ApplicationMenu$HelpItems = [ {
	text : Easyweb.translate("appmenuitem", "frameInspector__lbl"),
	handler : function() {
		(new easyweb.core.base.FrameInspector({})).show();
	}
}, "-", {
	text : Easyweb.translate("appmenuitem", "about__lbl"),
	handler : function() {
		(new Ext.Window({
			width : 300,
			height : 250,
			title : Easyweb.translate("dlg", "frameAbout__lbl"),
			tpl : easyweb.core.base.TemplateRepository.APPLICATION_ABOUT_BOX,
			data : {
				dnetName : Easyweb.name,
				dnetVersion : Easyweb.version
			},
			closable : true,
			modal : true,
			resizable : false
		})).show();
	}
} ]

/**
 * User account management
 */
easyweb.core.base.ApplicationMenu$UserAccount = [ {
	text : Easyweb.translate("appmenuitem", "changepswd__lbl"),
	handler : function() {
		(new easyweb.core.base.ChangePasswordWindow({})).show();
	}
}, {
	text : Easyweb.translate("msg", "preferences_wdw"),
	handler : function() {
		(new easyweb.core.base.UserPreferences()).show();
	}
}, {
	text : Easyweb.translate("appmenuitem", "mysettings__lbl"),
	handler : function() {
		var bundle = "easyweb.module.ad.ui.extjs";
		var frame = "com.hongbo.easyweb.module.ad.usr.frame.MyUserSettings_UI";
		var path = Easyweb.buildUiPath(bundle, frame, false);
		getApplication().showFrame(frame, {
			url : path
		});
	}
} ];

/**
 * Session management
 */
easyweb.core.base.ApplicationMenu$SessionControl = [ {
	text : Easyweb.translate("appmenuitem", "authenticate__lbl"),
	handler : function() {
		getApplication().doLockSession();
	}
}, {
	text : Easyweb.translate("appmenuitem", "logout__lbl"),
	handler : function() {
		getApplication().doLogout();
	}
} ];

/**
 * Main application menu items
 */
easyweb.core.base.ApplicationMenu$Items = [ {
	xtype : "splitbutton",
	text : Easyweb.translate("appmenuitem", "myaccount__lbl"),
	menu : new Ext.menu.Menu({
		items : [ {
			text : Easyweb.translate("appmenuitem", "theme__lbl"),
			menu : new Ext.menu.Menu({
				items : easyweb.core.base.ApplicationMenu$Themes
			})
		}, {
			text : Easyweb.translate("appmenuitem", "lang__lbl"),
			menu : new Ext.menu.Menu({
				items : easyweb.core.base.ApplicationMenu$Languages
			})
		}, "-" ].concat(easyweb.core.base.ApplicationMenu$UserAccount)
	})
}, {
	xtype : "splitbutton",
	text : Easyweb.translate("appmenuitem", "session__lbl"),
	menu : new Ext.menu.Menu({
		items : easyweb.core.base.ApplicationMenu$SessionControl
	})
}, "-", {
	xtype : "splitbutton",
	text : Easyweb.translate("appmenuitem", "help__lbl"),
	menu : new Ext.menu.Menu({
		items : easyweb.core.base.ApplicationMenu$HelpItems
	})

} ];

/**
 * Database menus
 */
Ext.define("easyweb.core.base.DBMenu", {
	extend : "Ext.menu.Menu"
});

/**
 * Application header.
 */
Ext.define("easyweb.core.base.ApplicationMenu", {
					extend : "Ext.toolbar.Toolbar",
					padding : 0,
					height : 50,
					ui : "main-app-menu",
					systemClientMenu : null,
					systemClientMenuAdded : null,
					dbMenu : null,
					dbMenuAdded : null,
					/**
					 * Set the user name in the corresponding element.
					 */
					setUserText : function(v) {
						try {
							this.items
									.get(
											"com.hongbo.easyweb.core.menu.ApplicationMenu$Item$UserName")
									.setText(v);
						} catch (e) {
						}
					},
					/**
					 * Set the client name in the corresponding element.
					 */
					setClientText : function(v) {
						try {
							this.items
									.get(
											"com.hongbo.easyweb.core.menu.ApplicationMenu$Item$ClientName")
									.setText(v);
						} catch (e) {
						}
					},
					/**
					 * Create the application logo element using the URL set in
					 * Easyweb.logoUrl
					 */
					_createAppLogo_ : function() {
						return {
							xtype : "container",
							height : 48,
							width : 120,
							style : "background: url('"
									+ Easyweb.logoUrl
									+ "') no-repeat ;background-position:center;  "
						}
					},
					/**
					 * Create the application's product info element using the
					 * corresponding Easyweb properties
					 */
					_createAppInfo_ : function() {
						return {
							xtype : "tbtext",
							id : "com.hongbo.easyweb.core.menu.ApplicationMenu$Item$ProductInfo",
							text : "<span>"
									+ Easyweb.name
									+ " </span><br><span>"
									+ Easyweb.translate("appmenuitem",
											"version__lbl") + ": "
									+ Easyweb.version + "</span></span>"
						};
					},
					/**
					 * Create the header's left part
					 */
					_createLeft_ : function() {
						return [ this._createAppLogo_(), {
							xtype : "tbspacer",
							width : 10
						} ];
					},
					/**
					 * Create the header's middle part
					 */
					_createMiddle_ : function() {
						return easyweb.core.base.ApplicationMenu$Items;
					},
					/**
					 * Create the header's right part
					 */
					_createRight_ : function() {
						return [
								"->",
								{
									xtype : "tbtext",
									id : "com.hongbo.easyweb.core.menu.ApplicationMenu$Item$UserLabel",
									text : Easyweb.translate("appmenuitem",
											"user__lbl")
								},
								{
									xtype : "tbtext",
									id : "com.hongbo.easyweb.core.menu.ApplicationMenu$Item$UserName",
									text : "-",
									style : "font-weight:bold;"
								},
								"-",
								{
									xtype : "tbtext",
									id : "com.hongbo.easyweb.core.menu.ApplicationMenu$Item$ClientLabel",
									text : Easyweb.translate("appmenuitem",
											"client__lbl")
								},
								{
									xtype : "tbtext",
									id : "com.hongbo.easyweb.core.menu.ApplicationMenu$Item$ClientName",
									text : "-",
									style : "font-weight:bold;"
								}, {
									xtype : "tbspacer",
									width : 20
								}, this._createAppInfo_() ];
					},
					initComponent : function(config) {

						var _items = [].concat(this._createLeft_(), this
								._createMiddle_(), this._createRight_());

						this.systemClientMenuAdded = false;

						var cfg = {
							border : false,
							frame : false,
							items : _items
						};

						Ext.apply(this, cfg);
						this.callParent(arguments);

						this.on("afterrender",
								function() {
									Ext.Function.defer(this._insertDBMenus_,
											500, this);
								}, this);
					},
					/**
					 * System client menu management. A system client can manage
					 * application clients (tenants). This feature will be moved
					 * in future to a stand-alone system module where a platform
					 * administrator can manage clients as well as other
					 * platform level management tasks.
					 */
					createSystemClientMenu : function() {
						var _items = [
								{
									text : Easyweb.translate("appmenuitem",
											"clientmanagement__lbl"),
									handler : function() {
										var bundle = "easyweb.module.ad.ui.extjs";
										var frame = "com.hongbo.easyweb.module.ad.client.frame.Client_UI";
										var path = Easyweb.buildUiPath(bundle,
												frame, false);
										getApplication().showFrame(frame, {
											url : path
										});
									}
								},
								{
									text : Easyweb.translate("appmenuitem",
											"dbchangelog__lbl"),
									handler : function() {
										var bundle = "easyweb.module.ad.ui.extjs";
										var frame = "com.hongbo.easyweb.module.ad.system.frame.DbChangeLog_UI";
										var path = Easyweb.buildUiPath(bundle,
												frame, false);
										getApplication().showFrame(frame, {
											url : path
										});
									}
								},
								{
									text : Easyweb.translate("appmenuitem",
											"sysparams__lbl"),
									handler : function() {
										var bundle = "easyweb.module.ad.ui.extjs";
										var frame = "com.hongbo.easyweb.module.ad.system.frame.SysParam_UI";
										var path = Easyweb.buildUiPath(bundle,
												frame, false);
										getApplication().showFrame(frame, {
											url : path
										});
									}
								},
								{
									text : Easyweb.translate("appmenuitem",
											"sysds__lbl"),
									handler : function() {
										var bundle = "easyweb.module.ad.ui.extjs";
										var frame = "com.hongbo.easyweb.module.ad.system.frame.SysDataSources_UI";
										var path = Easyweb.buildUiPath(bundle,
												frame, false);
										getApplication().showFrame(frame, {
											url : path
										});
									}
								} ];
						var _menu = {
							xtype : "splitbutton",
							text : Easyweb.translate("appmenuitem",
									"tools__lbl"),
							menu : new Ext.menu.Menu({
								items : _items
							})
						};
						this.systemClientMenu = Ext.create('Ext.button.Split',
								_menu);
					},
					/**
					 * Add the system client menu to the menu bar
					 */
					addSystemClientMenu : function() {
						if (!this.systemClientMenuAdded) {
							this.createSystemClientMenu();
							if (this.dbMenu == null) {
								this.insert(2, this.systemClientMenu);
							} else {
								this.insert(2 + this.dbMenu.length,
										this.systemClientMenu);
							}
							this.systemClientMenuAdded = true;
						}
					},
					/**
					 * Remove the system client menu from the menu bar
					 */
					removeSystemClientMenu : function() {
						if (this.systemClientMenuAdded) {
							this.remove(this.systemClientMenu);
							this.systemClientMenuAdded = false;
							this.systemClientMenu = null;
						}
					},
					/**
					 * Insert menu elements loaded from database.
					 */
					_insertDBMenus_ : function() {
						if (this.rendered && this.dbMenu != null
								&& this.dbMenuAdded !== true) {
							var l = this.dbMenu.length;
							for (var i = 0; i < l; i++) {
								this.insert(2 + i, this.dbMenu[i]);
							}
							this.dbMenuAdded = true;

						}
					},
					/**
					 * Create a menu item which opens a standard application
					 * frame.
					 */
					_createFrameMenuItem_ : function(config) {
						var bundle_ = config.bundle;
						var frame_ = config.frame;
						var title_ = config.title;
						return {
							text : title_,
							handler : function() {
								var bundle = bundle_;
								var frame = frame_;
								var path = Easyweb.buildUiPath(bundle, frame,
										false);
								getApplication().showFrame(frame, {
									url : path
								});
							}
						};
					},
					/**
					 * Create a menu from configuration object
					 */
					_createMenu_ : function(config) {
						return Ext.apply({
							maybeShowMenu : function() {
								if (!this.menu.loader._isLoaded_) {
									if (!this.menu.loader._isLoading_) {
										this.menu.loader.load();
									}
									return false;
								} else {
									var me = this;
									if (me.menu && !me.hasVisibleMenu()
											&& !me.ignoreNextClick) {
										me.showMenu();
									}
								}
							},
							menu : {
								loader : this._createLoader_({
									menuId : config.db_id
								}, true)

							}
						}, config);

					},
					/**
					 * Create a menu-item from configuration object
					 */
					_createMenuMenuItem_ : function(config) {
						return {
							text : config.title,
							deferExpandMenu : function() {
								if (!this.menu.loader._isLoaded_) {
									if (!this.menu.loader._isLoading_) {
										this.menu.loader.load();
									}
									return false;
								} else {
									var me = this;

									if (!me.menu.rendered
											|| !me.menu.isVisible()) {
										me.parentMenu.activeChild = me.menu;
										me.menu.parentItem = me;
										me.menu.parentMenu = me.menu.ownerCt = me.parentMenu;
										me.menu
												.showBy(
														me,
														me.menuAlign,
														((!Ext.isStrict && Ext.isIE) || Ext.isIE6) ? [
																-2, -2 ]
																: undefined);
									}
								}

							},
							menu : {
								loader : this._createLoader_({
									menuItemId : config.db_id
								}, false)
							}
						};
					},
					/**
					 * Create a database menu items loader.
					 */
					_createLoader_ : function(params, autoload) {
						return {
							url : Easyweb.dsAPI("MenuItemDs", "json").read,
							renderer : 'data',
							autoLoad : autoload,
							_isLoaded_ : false,
							_isLoading_ : false,
							listeners : {
								scope : this,
								beforeload : {
									fn : function(loader, options, eopts) {
										loader._isLoaded_ = false;
										loader._isLoading_ = true;
									}
								},
								load : {
									fn : function(loader, response, options,
											eopts) {
										var res = Ext.JSON
												.decode(response.responseText).data;
										var mitems = [];
										for (var i = 0; i < res.length; i++) {
											var e = res[i];
											if (e.frame) {
												mitems
														.push(this
																._createFrameMenuItem_({
																	db_id : e.id,
																	title : e.title,
																	frame : e.frame,
																	bundle : e.bundle
																}));
											} else {
												mitems.push(this
														._createMenuMenuItem_({
															db_id : e.id,
															title : e.title
														}));
											}
										}
										loader.target.add(mitems);
										loader._isLoaded_ = true;
										loader._isLoading_ = false;
									}
								}
							},
							ajaxOptions : {
								method : "POST"

							},
							params : {
								data : Ext.JSON.encode(params),
								orderBy : Ext.JSON.encode([ {
									property : "sequenceNo",
									direction : "ASC"
								} ])
							}

						};
					}

				});
