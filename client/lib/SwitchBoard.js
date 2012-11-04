/**
* Core
*
*
**/
SwitchBoard = function() {

	/**
	* Channels are a set of named callback functions
	*
	* @ var Collection channel
	**/
	var _channels = new SwitchBoard.Collection([]);

	/**
	* Register a callback in channels
	*
	* @param string  		name 		Fully qualified (and unique) callback name
	* @param functions  	callback	Callback function executed by exec() method
	**/
	this.register = function(name, callback) {
		_channels.add(name, callback);
	}

	/**
	* Register a callback in channels
	*
	* @param string  		name 		Fully qualified (and unique) callback name
	* @param functions  	callback	Callback function executed by exec() method
	**/
	this.getChannel = function(name) {
		return _channels.getByName(name);
	}

   /**
	*
	*
	**/
	this.fireAll = function(data) {
		$.each(data, function(i, data) {
			$this.run(data.channel, data.command);
		})

	}

   /**
	*
	* @param
	* @param
	**/
	this.fire = function(channel, data) {
		if(typeof data == 'undefined') {
			var data = {};
		}

		var command = this.getChannel(channel);

		if(null != command) {
			command.call(this, data);
		}

	}

	if(typeof SwitchBoard.initialized == "undefined") {
		/**
		*
		* @param string 	type
		* @param string 	url
		* @param Object		data
		* @param Object 	callbacks	{done: {}, fail: {}}
		**/
		SwitchBoard.prototype.testConnect = function(type, url, data, callbacks) {

			var callbacks = $.extend(callbacks, {done: {}, fail: {}});

		/*	var promise = $.ajax(function() {
				type: type,
				url: url,
				dataType: json,
				data: data
			});*/

			// for(done in callbacks.done) {
			// 	promise.done(done);
			// }

			// for(fail in callbacks.fail) {
			// 	promise.fail(fail);
			// }

			var response = {'open.remote.modale' : {'data' : 10}, 'open.remote.modale2' : {'data' : 8}};

            for(key in response) {

                this.fire(key, response[key]);
            }

            return response;
		};

/**
		*
		* @param string 	type
		* @param string 	url
		* @param Object		data
		* @param Object 	callbacks	{done: {}, fail: {}}
		**/
		SwitchBoard.prototype.connect = function(url, data, type, callbacks) {

            var $this = this;

			var cb = $.extend(callbacks, {dones: {}, fails: {}});

			var promise = $.ajax({
				type: type,
				url: url,
				dataType: 'json',
				data: data,
				success: function(response) {
                    for(i in response.channels) {
                        $this.fire(response.channels[i].channel, response.channels[i].data);
                    }
				},
				error: function() {

				}
			}).done(function(){

            });

//			for(done in callbacks.dones) {
//				promise.done(done);
//			}
//
//			for(fail in callbacks.fails) {
//				promise.fail(fail);
//			}

		};

		SwitchBoard.initialized = true;
	}

};

/**
* Manage array like indexed and / or associative
*
* @param Array collection
**/
SwitchBoard.Collection = function(collection) {

   /**
	*
	*
	**/
	var _collection = collection;

   /**
	*
	*
	**/
	this._nameKeyMap = {}

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

	i = 0;
	for(element in _collection) {
		this._nameKeyMap[element.toString()] = i;
		i++;
	}

	/**
	* Add an object to the collection
	*
	* @param string|integer 	name 	Unique key for this object ; may be a string or an integer
	* @param object  			object	object to store in the collection
	**/
	this.add = function(name, object) {

		_collection.push(object);

		/**
		* Used to retrieve easily object in collection by its name

		* @see this.getByName()
		**/
		this._nameKeyMap[name] = _collection.length - 1;
	}

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
	}

	/**
	*
	* Cursor is move to next position
	*
	*/
	this.next = function() {
		return _collection[this._i++];
	}

	/**
	*
	*
	**/
	this.previous = function() {
		return _collection[this._i--];
	}

	/**
	*
	*
	**/
	this.current = function() {
		return _collection[this._i];
	}

	/**
	*
	*
	**/
	this.isEmpty = function() {
		return this.length != 0;
	}

}



