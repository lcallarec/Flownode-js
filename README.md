Flownode.js
===========

Why Flownode.js ?
=================

###1. Flownode.Switchboard

Behind the idea of Flownode.Switchboard, there is a fact : currently, there is no way I know to manage client->server->client communications on large web applications using Javascript and PHP.

On such applications, web developpers always do the same things : attach event handlers on DOM elements, send data with $.ajax. On the server-side, something is done and the response is sending back to the client ; without forget to catch exceptions or errors.

With a such approach, where all logic is done without any framework managing both server-side and client-side, we can wonder where to put some treatments. On .NET or J2EE web plateforms, the answer is clear : the most can be done on server-side, because server-side knows a lot of things about the client-side (and vice-versa), so ajax requests are transparent for developpers.

This projects aims to formalize and unify the way request / response are handled with plateforms based on PHP (the same may applies with Python or Ruby...)

###2. Flownode.SwitchBoard objectives

* Help developpers to code better and maintain client->server->client communications
* Flownode.SwitchBoard is just a foundation of something more unified (as a client/server UI framework ... )
* Flownode.SwitchBoard will be kept _simple_ and _generic_

#### Exemple of use
```
//Register a callback function
sb = Flownode.SwitchBoard

sb.register('alert', function(data) {
    alert(data.message);
})

response = new Flownode.SwitchBoard.Request();

response.send('http://www.flownode.git/exemple/index.php', {'name' : 'John Doe'});

//If the server send back a well formatted JSON response like :
//{sucess: {alert : {message: 'Hello John Doe !'}}
//The regsitered callback will be fired
```

###1. Flownode.UI

Flownode.UI is designed to provides shortcuts to handle some jQuery.UI widgets and Twitter Bootstrap components,
to be used with the Flownode.Switchboard.

### Flownode is actually (2013-01-25) *in developpement*