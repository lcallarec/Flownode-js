SwitchBoard
===========

Attempt formalize client-server web communication using Javascript and PHP

Why SwitchBoard ?
=================

Behind SwitchBoard, there is a conclusion : currently, there is no way I know to manage client-server->client communication on large web applications using Javascript and PHP.

When using jQuery, we all use `$.ajax()` method to handle asynchronous communication with the server, and handle the response inside the `success` callback function. Dozens of times, the same code will be repeated : a loading message is display on load, an HTML panel is 'blocked' until the server response, and on any errors, we display a message inside the appropriate panel. And so on. I don't even mentionned buisiness treatments once we get the response. 

The only way to get this things working is methodology. And documentation. And functional tests.

*This is not a fully secure way, because the software never help you*

Around use... I see...
============================

... how .NET and J2EE plateforms are managing web applications, where client and server sides know a lot of things about each others. While it is not possible to do this with plain PHP (at least, not without huge performance lost), we can give an impulsion to formalize client->server->client communications and unify the way request / response are handled.

###SwitchBoard objectives

* Help developpers to code better and maintain easier client->server->client communications
* SwitchBoard is just foundation of something more unified (as a client/server UI framework, for exemple)
* SwitchBoard will be kept _simple_ and _generic_

###SwitchBoard technical objectives
* SwitchBoard client will be written in vanilla javascript
* SwitchBoard will be shipped with basic handlers for all major javascript frameworks, but my main objective, right now, remain _jQuery_
* SwitchBoard will be shipped with server-side library for PHP 5.3+ (perhaps 5.4+ in a near futur)

###SwitchBoard will work that way :

* The javascript SwitchBoard is created on page load
* Callback functions, called channel handlers, are registered to the SwitchBoard
* For any reason, a user action fire an event wich trigger a channel registered in the SwitchBoard
* SwitchBoard send data returned from the handlers to the server
* The server-side script awake and assign a handler for each channel registered. Handlers can be anonymous functions, closures or methods
* On server side, a Switchboard controler take the request
* The channels handlers (registered previously) do their jobs and return a response
* The response is sent back to the client
* On the client-side, the SwitchBoard listener take the response
* Handlers registered on step 2 do their jobs

### Fork-me !

### SwitchBoard is actually (2012-11-03) *in early stage of developpement*