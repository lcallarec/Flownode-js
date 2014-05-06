Flownode-js
===========

# Flownode-js objectives

* Manage JSON client->server->client communications
* Flownode-js will be kept _simple_ and _generic_

# Basic uses

## Register channels

Channels are just callbacks you'll just have to register in the Flownode object.

Channels can be prefixed with _success_ or _error_. In those cases, they will be triggered according to your API response :
```javascript
//Register a callback function
Flownode.register('success.alert', function(data) {
    alert(data.message);
});

Flownode.register('error.log', function(data) {
    alert(data.message);
});
```

## Send the request

The `Http` function need at least an URL as the first argument, the second - the http method - is optional (default to GET).
The `send` function accept one optional argument : an object of parameters to be send.
```javascript
new Flownode
    .Http('http://www.flownode.git/exemple/index.php')
    .send({'name' : 'John Doe'})
;
```

## Server-side JSON response

The JSON response should follow this structure:

```
{
    [OPTIONNAL]
    namespace: {
        [SUCCESS|ERROR]*
        ApiResponse: {
            [CHANNEL NAME]
            channel: {
                [USER DATA]
            }
        }
    }

}
```
For instance:
```javascript
{
    response: {
        success: {
            alert : {
                message: 'Success !'
            },
            log: {
                action: 'delete'
            }
        },
        error: {
            log : {
                message: 'Error'
            }
        }
    }
}
```

Or, without the namespace:
```javascript
{
    success: {
        alert : {
            message: 'Success !'
        },
        log: {
            action: 'delete'
        }
    },
    error: {
        log : {
            message: 'Error'
        }
    }
}
```

In this case, when no namespace is specified, you have to globally declare a null namespace :
```javascript
Flownode.namespace = null;
```

### Client response handle

With the previous JSON response, three channels will be triggered :

* success.alert (a prefixed channel)
* log
* error.log (a prefixed channel)

**Note**: If two channels were registered with the same suffix, *i.e. success.alert and alert*
the prefixed channel will have priority over the un-prefixed one, which will not be triggered. That way, the same channels
can be triggered, whatever the API response they rely on.



