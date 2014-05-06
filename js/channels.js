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
        return _collection[this._nameKeyMap[name]];
    };

    /**
     * Check if channels exists
     * @param {String|Number}	name	Unique name
     * @returns {boolean}
     */
    this.has = function(name) {

        if(typeof _collection[this._nameKeyMap[name]] === 'undefined') {
            return false;
        }

        return true;
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
