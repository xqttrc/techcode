/**
 * @class Reprezents the client side session object.
 * @type
 */
easyweb.core.base.Session = {
	/**
	 * Logged in user info.
	 * 
	 * @type Object
	 */
	user : {
		id : null,
		code : null,
		name : null
	},
	/**
	 * Client(Tenant) info.
	 * 
	 * @type Object
	 */
	client : {
		id : null,
		code : null,
		systemClient : false
	},
	/**
	 * User roles
	 * 
	 * @type Array
	 */
	roles : [],
	/**
	 * Is the current session locked by user?
	 * 
	 * @type Boolean
	 */
	locked : false,
	/**
	 * System parameters.
	 * 
	 * @type
	 */
	sysParams : {},
	/**
	 * Getter for user.
	 * 
	 * @return {Object}
	 */
	getUser : function() {
		return this.user;
	},
	/**
	 * Getter for client(tenant)
	 * 
	 * @return {}
	 */
	getClient : function() {
		return this.client;
	},
	/**
	 * Shorthand getter for the client id.
	 * 
	 * @return {Integer}
	 */
	getClientId : function() {
		return this.client.id * 1;
	},
	/**
	 * Shorthand getter for the client code.
	 * 
	 * @return {String}
	 */
	getClientCode : function() {
		return this.client.code;
	},
	/**
	 * Is the current session authenticated?
	 * 
	 * @return {Boolean}
	 */
	isAuthenticated : function() {
		return (!Ext.isEmpty(this.user.name));
	},
	hasRole : function(role) {
		for (var i = 0, l = this.roles.length; i < l; i++) {
			if (this.roles[i] == role) {
				return true;
			}
		}
		return false;
	},
	useFocusManager : false,
	rememberViewState : false

};
