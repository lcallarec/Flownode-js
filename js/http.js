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

                for(var suffix in _response[state]) {
                    Flownode.trigger(state + '.' + suffix, _response[state][suffix]);
                }
            }

        }).fail(function(jqXHR, status, error) {
            Flownode.Http.onResponseError(jqXHR, status, error);
        });

        return this.resolve({dones: [], fails: []});

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