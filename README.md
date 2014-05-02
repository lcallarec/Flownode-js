Flownode-js
===========

### Flownode-js objectives

* Help developpers to code better and maintain client->server->client communications
* Flownode-js is just a foundation
* Flownode-js will be kept _simple_ and _generic_

#### Exemple of use

```javascript
//Register a callback function
Flownode.register('alert', function(data) {
    alert(data.message);
});

new Flownode
    .Xhr('http://www.flownode.git/exemple/index.php')
    .send({'name' : 'John Doe'})
;
```

If the server send back a well formatted JSON response like :
```javascript
{
    response: {
        success: {
            alert : {
                message: 'Hello John Doe !'
            }
        }
    }
}
```

The regsitered callback will be fired to alert() the message