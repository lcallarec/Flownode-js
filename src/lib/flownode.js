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

		if(typeof element == 'undefined') {
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
Flownode.SwitchBoard = {

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
	}
};

Flownode.SwitchBoard.Request = function(data, method) {

    var $this = this;
    var sb    = Flownode.SwitchBoard;

    var data   = $.extend(data, {});
    var method = method === 'undefined' ? method : 'GET';

   /**
    *
    * @param string 	type
    * @param string 	url
    * @param Object		data
    * @param Object 	callbacks	{done: {}, fail: {}}
    **/
    this.send = function(url, callbacks) {

        var cb = $.extend(callbacks, {dones: {}, fails: {}});

        var promise = $.ajax({
            type: method,
            url: url,
            dataType: 'json',
            data: data,
            success: function(response, status, jqXHR) {

                for(state in response[sb.namespace]) {

                    switch(state) {
                        case 'success':
                            onGlobalSuccess(response, status, jqXHR);
                         break;
                        case 'failure':
                            onGlobalFailure(response, status, jqXHR);
                         return;
                        default:
                         break;
                    }

                    for(command in response[sb.namespace][state]) {
                        $this.fire(command, response[sb.namespace][state][command]);
                    }

                }

            },
            error: function(jqXHR, status, error) {

                $this.onConnectError(jqXHR, status, error);
            }
        }).done(function(){

        });

        for(done in callbacks.dones) {
          promise.done(done);
        }

        for(fail in callbacks.fails) {
          promise.fail(fail);
        }

        return $this;
    };

  /**
	*
	* @param
	* @param
	**/
	this.fire = function(channel, data) {
		if(typeof data === 'undefined') {
			var data = {};
		}

		var command = sb.getChannel(channel);
		if(null !== command) {
			command.call(this, data);
		}

	};

   /**
	*
	*
	**/
	this.fireAll = function(data) {
		$.each(data, function(i, data) {
			$this.fire(data.channel, data.command);
		});

	};

};

Flownode.SwitchBoard.Request.onGlobalSuccess = function(response, status, jqXHR){};
Flownode.SwitchBoard.Request.onGlobalFailure = function(response, status, jqXHR){};