if(typeof Flownode === 'undefined') {
    Flownode = {};
}
/**
 * Manage array like indexed and / or associative
 * @param {Array} collection
 * @constructor
 **/
Flownode.Channels = function(collection) {

    "use strict";

    /**
     * @private
     * @type {Array}
     **/
    var _collection = collection;

    /**
     * @private
     * @type {Object}
     **/
    this._nameKeyMap = {};

    /**
     * Internal cursor position
     * By default, it is on last position
     *
     * @type {Number}
     **/
    this._i = 0;

    /**
     * Number of elements in the collection
     * @type {Number} collection length
     **/
    this.length = _collection.length;

    var i = 0;
    for(var element in _collection) {
        this._nameKeyMap[element.toString()] = i;
        i++;
    }

    /**
     * Add an object to the collection
     * @function
     * @param {String|Number} name   Unique key for this object ; may be a string or an integer
     * @param {Object}  	   object Object to store in the collection
     * @returns {void}
     **/
    this.add = function(name, object) {

        _collection.push(object);

        /**
         * Used to retrieve easily object in collection by its name
         * @see this.getByName()
         **/
        this._nameKeyMap[name] = _collection.length - 1;
    };

    /**
     * Retrieve an object in the collection by its name
     * @function
     * @param {String|Number}	name	Unique name
     * @returns {*}
     **/
    this.getByName = function(name) {

        var element = _collection[this._nameKeyMap[name]];

        if(typeof element === 'undefined') {
            return null;
        }

        return _collection[this._nameKeyMap[name]];
    };

    /**
     * Cursor is move to next position
     * @function
     * @returns {*}
     */
    this.next = function() {
        return _collection[this._i++];
    };

    /**
     * @function
     * @returns {*}
     **/
    this.previous = function() {
        return _collection[this._i--];
    };

    /**
     * @function
     * @returns {*}
     */
    this.current = function() {
        return _collection[this._i];
    };

    /**
     * @function
     * @returns {boolean}
     */
    this.isEmpty = function() {
        return this.length !== 0;
    };

};
/**
 * @object
 */
Flownode = {

    /**
     * @type {String} Request / Query / Response namespace
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

    },

    /**
     * Fire all callbacks for all channels
     * @function
     * @param {String}  channel
     * @param {*}       data
     * @returns {void}
     **/
    fireAll : function(data) {
        $.each(data, function(i, data) {
            this.fire(data.channel, data.command);
        });
    }
};

/**
 *
 * @param url
 * @param data
 * @constructor
 */
Flownode.Xhr = function(url, method) {

    this.method = method !== 'undefined' ? method : 'GET';

    Flownode._Xhr.call(this, url, this.method);

    this.__send = this.send;

    /**
     * @function
     * @param {Object}	data
     * @param {Object} 	callbacks	({done: {}, fail: {}})
     * @param {String} method       http method
     **/
    this.send = function(data, callbacks) {

        this.promise = this.__send(data, callbacks, method);

        this.promise.done(function(response, status, jqXHR){

            for(var state in response[Flownode.namespace]) {

                switch(state) {
                    case 'success':
                        Flownode.Xhr.onSuccess(response, status, jqXHR);
                        break;
                    case 'error':
                        Flownode.Xhr.onError(response, status, jqXHR);
                    default:
                        break;
                }

                for(var suffix in response[Flownode.namespace][state]) {
                    Flownode.fire(state + '.' + suffix, response[Flownode.namespace][state][suffix]);
                }
            }

        }).fail(function(jqXHR, status, error) {
            Flownode.Xhr.onResponseError(jqXHR, status, error);
        });

        return this.resolve({dones: [], fails: []});

    };

};

Flownode.Xhr.onResponseError = function(jqXHR, status, error){};
Flownode.Xhr.onSuccess = function(response, status, jqXHR){};
Flownode.Xhr.onError = function(response, status, jqXHR){};

Flownode._Xhr = function(url, data) {

    /**
     * @private
     * @type {String}
     */
    var url    = url;

    /**
     * @function
     * @private
     * @param {Object}	data
     * @param {Object} 	callbacks	({done: {}, fail: {}})
     * @param {String} method       http method
     **/
    this.send = function(data, callbacks, method) {

        this.callbacks = $.extend({dones: [], fails: []}, callbacks);

        this.promise = $.ajax({
            type: method,
            url: url,
            data: data,
            dataType: 'json'
        });

        return this.promise;
    };

    /**
     * Resolve the response
     * @function
     * @private
     * @param {Array} callbacks functions
     * @returns {Flownode._Xhr}
     */
    this.resolve = function(callbacks) {

        this.callbacks = $.extend(callbacks, this.callbacks);

        for(var i in this.callbacks.dones) {
            this.promise.done(this.callbacks.dones[i]);
        }

        for(var i in this.callbacks.fails) {
            this.promise.fail(this.callbacks.fails[i]);
        }

        return this;
    };

    return this;
};