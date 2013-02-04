Flownode.js
===========

### Flownode-js objectives

* Help developpers to code better and maintain client->server->client communications
* Flownode.SwitchBoard is just a foundation of something more unified (as a client/server UI framework ... )
* Flownode.SwitchBoard will be kept _simple_ and _generic_

#### Exemple of use

```javascript
//Register a callback function
sb = Flownode.SwitchBoard

sb.register('alert', function(data) {
    alert(data.message);
})

response = new Flownode.Switchboard.Request();

response.send('http://www.flownode.git/exemple/index.php', {'name' : 'John Doe'});

//If the server send back a well formatted JSON response like :
//{sucess: {alert : {message: 'Hello John Doe !'}}
//The regsitered callback will be fired to alert() the message
```
