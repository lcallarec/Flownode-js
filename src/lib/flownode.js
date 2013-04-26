if(typeof Flownode === 'undefined') {
    Flownode = {};
}

/**
* Manage array like indexed and / or associative
*
* @param Array collection
**/
Flownode.Collection = function(collection) {

    "use strict";

    /**
    *
    *
    **/
    var _collection = collection;

    /**
    *
    *
    **/
    this._nameKeyMap = {};

    /**
	* Internal cursor position
	* By default, it is on last position
	*
	* @var integer _i
	**/
	this._i = 0;

   /**
	* Nomber of elements in the collection
	* @var integer length
	**/
	this.length = _collection.length;

	var i = 0;
	for(element in _collection) {
		this._nameKeyMap[element.toString()] = i;
		i++;
	}

	/**
	* Add an object to the collection
	*
	* @param string|integer name   Unique key for this object ; may be a string or an integer
	* @param object  		 object	object to store in the collection
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
	*
	* Retrieve an object in the collection by its name
	*
	* @param string|integer	name	Unique name
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
	*/
	this.next = function() {
		return _collection[this._i++];
	};

	/**
	*
	**/
	this.previous = function() {
		return _collection[this._i--];
	};

	/**
	*
	**/
	this.current = function() {
		return _collection[this._i];
	};

	/**
	**/
	this.isEmpty = function() {
		return this.length !== 0;
	};

};

/**
* Core
*
*
**/
Flownode.Switchboard = {

    namespace : 'switchboard',

	/**
	* Channels are a set of named callback functions
	*
	* @ var Collection channel
	**/
	channels : new Flownode.Collection([]),

	/**
	* Register a callback in channels
	*
	* @param string  		name 		Fully qualified (and unique) callback name
	* @param functions  	callback	Callback function executed by exec() method
	**/
	register : function(name, callback) {
		this.channels.add(name, callback);
	},

	/**
	* Register a callback in channels
	*
	* @param string  		name 		Fully qualified (and unique) callback name
	* @param functions  	callback	Callback function executed by exec() method
	**/
	getChannel : function(name) {
		return this.channels.getByName(name);
	},
        /**
	*
	* @param
	* @param
	**/
	fire : function(channel, data) {
		if(typeof data === 'undefined') {
			var data = {};
		}

		var command = this.getChannel(channel);
		if(null !== command) {
			command.call(this, data);
		}

	},

   /**
	*
	**/
	fireAll : function(data) {
		$.each(data, function(i, data) {
			this.fire(data.channel, data.command);
		});

	}
};

Flownode.Switchboard.Xhr = function(url, data) {

    var that  = this;

    var sb    = Flownode.Switchboard;

    Flownode.Xhr.call(this, url, data);

    this.__send = this.send;

    /**
    *
    * @param string 	type
    * @param string 	url
    * @param Object		data
    * @param Object 	callbacks	{dones: [], fails: []}
    **/
    this.send = function(data, callbacks, method) {

        this.promise = this.__send(data, callbacks, method);

        this.promise.done(function(response, status, jqXHR){

            for(state in response[sb.namespace]) {

                    switch(state) {
                        case 'success':
                            sb.Xhr.onSuccess(response, status, jqXHR);
                         break;
                        case 'failure':
                            sb.Xhr.onFailure(response, status, jqXHR);
                        default:
                         break;
                    }

                    for(command in response[sb.namespace][state]) {
                        sb.fire(command, response[sb.namespace][state][command]);
                    }

                }

        }).fail(function(jqXHR, status, error) {
            sb.Xhr.onResponseError(jqXHR, status, error);
        });

        return this.resolve({dones: [], fails: []});

    };
};

Flownode.Switchboard.Xhr.onResponseError = function(jqXHR, status, error){

};

Flownode.Switchboard.Xhr.onSuccess = function(response, status, jqXHR){

};
Flownode.Switchboard.Xhr.onFailure = function(response, status, jqXHR){

};

Flownode.Xhr = function(url, data) {

    var url    = url;
    var data   = $.extend(data, {});

   /**
    *
    * @param string 	type
    * @param string 	url
    * @param Object		data
    * @param Object 	callbacks	{done: {}, fail: {}}
    **/
    this.send = function(data, callbacks, method) {

        this.callbacks = $.extend({dones: [], fails: []}, callbacks);
        this.data      = $.extend(data, this.data);
        
        if(method !== 'undefined') {
            this.method = 'GET';
        } else {
            if(typeof data == 'string') {
                this.method = 'GET';
            } else {
                this.method = 'POST';
            }
        }

        this.promise = $.ajax({
            type: this.method,
            url: url,
            data: data
        });

        return this.promise;
    };

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