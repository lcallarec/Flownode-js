if(typeof Flownode === 'undefined') {
    Flownode = {};
}

/**
 *
 * @param url
 * @param data
 * @constructor
 */
Flownode.Http = function(url, method) {

    this.method = method !== 'undefined' ? method : 'GET';

    Flownode._Http.call(this, url, this.method);

    this.__send = this.send;

    /**
     * @function
     * @param {Object}	data
     * @param {Object} 	callbacks	({done: {}, fail: {}})
     * @param {String} method       http method
     **/
    this.send = function(data, callbacks) {

        this.promise = this.__send(data, callbacks, method);

        this.promise.done(function(response, status, jqXHR) {

            var _response = Flownode.namespace ? response[Flownode.namespace] : response;

            for(var state in _response) {

                switch(state) {
                    case 'success':
                        Flownode.Http.onAPISuccess(_response, status, jqXHR);
                        break;
                    case 'error':
                        Flownode.Http.onAPIError(_response, status, jqXHR);
                    default:
                        break;
                }

                for(var channel in _response[state]) {

                    if (Flownode.channels.has(state + '.' + channel)) {
                        var _channel = state + '.' + channel;
                    } else if (Flownode.channels.has(channel)){
                        var _channel = channel;
                    } else {
                        continue;
                    }

                    Flownode.trigger(_channel, _response[state][channel]);
                }
            }

            Flownode.Http.onServerSuccess(jqXHR, status, error);

        }).fail(function(jqXHR, status, error) {
            Flownode.Http.onServerError(jqXHR, status, error);
        });

        return this.resolve();

    };

};

/**
 * Base Http function
 * @param {String} url
 * @returns {Flownode}
 * @private
 */
Flownode._Http = function(url) {

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

        this.callbacks = $.extend({onAPISuccess: null, onAPIError: null}, callbacks);

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
     * @returns {Flownode._Xhr}
     */
    this.resolve = function() {

        this.promise.done(this.callbacks.onAPISuccess);

        this.promise.fail(this.callbacks.onAPIError);

        return this;
    };

    return this;
};

/**
 * Functions triggered on every response
 */
/**
 * Whenever the server send a successful http reponse
 * @param _response
 * @param status
 * @param jqXHR
 */
Flownode.Http.onServerSuccess = function(_response, status, jqXHR){};
/**
 * Whenever the server return an error response
 * @param jqXHR
 * @param status
 * @param error
 */
Flownode.Http.onServerError   = function(jqXHR, status, error){};
/**
 * Whenever the API returns a JSON response with a success attribute
 * Is triggered before success channels
 * @param _response
 * @param status
 * @param jqXHR
 */
Flownode.Http.onAPISuccess    = function(_response, status, jqXHR){};
/**
 * Whenever the API returns a JSON response with an error attribute
 * Is triggered before error channels
 * @param _response
 * @param status
 * @param jqXHR
 */
Flownode.Http.onAPIError      = function(_response, status, jqXHR){};