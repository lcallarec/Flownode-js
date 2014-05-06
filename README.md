Flownode-js
===========

### Flownode-js objectives

* Help developpers to code better and maintain client->server->client communications
* Flownode-js is just a foundation
* Flownode-js will be kept _simple_ and _generic_

#### Exemple of use

```javascript
//Register a callback function
Flownode.register('success.alert', function(data) {
    alert(data.message);
});

Flownode.register('error.log', function(data) {
    alert(data.message);
});

new Flownode
    .Http('http://www.flownode.git/exemple/index.php')
    .send({'name' : 'John Doe'})
;
```

Return a JSON response like that to trigger the registered callbacks :
```javascript
{
    response: {
        success: {
            alert : {
                message: 'Success !'
            }
        },
        error: {
            log : {
                message: 'Error'
            }
        },
    }
}
```
