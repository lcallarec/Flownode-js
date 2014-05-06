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
                        Flownode.Http.onSuccess(_response, status, jqXHR);
                        break;
                    case 'error':
                        Flownode.Http.onError(_response, status, jqXHR);
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

        }).fail(function(jqXHR, status, error) {
            Flownode.Http.onResponseError(jqXHR, status, error);
        });

        return this.resolve();

    };

};

Flownode.Http.onResponseError = function(jqXHR, status, error){};
Flownode.Http.onSuccess = function(_response, status, jqXHR){};
Flownode.Http.onError = function(_response, status, jqXHR){};

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