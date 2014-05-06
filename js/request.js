if(typeof Flownode === 'undefined') {
    Flownode = {};
}

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