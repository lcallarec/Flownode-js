if(typeof Flownode === 'undefined') {
    Flownode = {};
}
/**
 * @object
 */
Flownode = {

    /**
     * @type {String|null} Request / Query / Response namespace
     */
    namespace : 'response',

    /**
     * Channels are a set of named callback functions
     *
     * @type {Flownode.Channels} Collection
     **/
    channels : new Flownode.Channels([]),

    /**
     * Register a callback in channels
     * @function
     * @param {String} 		name 		Fully qualified (and unique) callback name
     * @param {Function}  	callback	Callback function executed by fire* methods
     * @returns {void}
     **/
    register : function(name, callback) {
        this.channels.add(name, callback);
    },

    /**
     * Get a register channel callback function
     * @function
     * @param {String}		name 		Fully qualified (and unique) callback name
     * @returns {Function}
     **/
    getCallbackByCommand : function(name) {
        return this.channels.getByName(name);
    },

    /**
     * Fire the specified callback for this command
     * @function
     * @param {String}  command
     * @param {*}       data
     * @returns {void}
     **/
    fire : function(command, data) {
        if(typeof data === 'undefined') {
            data = {};
        }

        var callback = this.getCallbackByCommand(command);
        if(null !== callback) {
            callback.call(this, data);
        }

    }
};