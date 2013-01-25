Flownode.js
===========

[![Build Status](https://travis-ci.org/lcallarec/SwitchBoard.png)](https://travis-ci.org/lcallarec/SwitchBoard)

Why Flownode.js ?
=================

###1. Flownode.UI

Flownode.UI is designed to provides shortcuts to handle jQuery.UI widgets and Twitter Bootstrap components (jQuery.UI being only used to manage Dialogs, Bootstrap having only a simple implementation of modals).

###2. Flownode.Switchboard

Behind the idea of Flownode.Switchboard, there is a fact : currently, there is no way I know to manage client->server->client communications on large web applications using Javascript and PHP.

On such applications, web developpers always do the same things : attach event handlers on DOM elements, send data with $.ajax. On the server-side, something is done and the response is sending back to the client ; without forget to catch exceptions or errors.

With a such approach, where all logic is done without any framework managing both server-side and client-side, we can wonder where to put some treatments. On .NET or J2EE web plateforms, the answer is clear : the most can be done on server-side, because server-side knows a lot of things about the client-side (and vice-versa), so ajax requests are transparent for developpers.

This projects aims to formalize and unify the way request / response are handled with plateforms based on PHP (the same may applies with Python or Ruby...)

###Flownode.SwitchBoard objectives

* Help developpers to code better and maintain in an easier way client->server->client communications
* Flownode.SwitchBoard is just a foundation of something more unified (as a client/server UI framework ... )
* Flownode.SwitchBoard will be kept _simple_ and _generic_

###Flownode.SwitchBoard will work that way :

* The javascript Flownode.SwitchBoard is created on page load
* Callback functions, called channel handlers, are registered to the Flownode.SwitchBoard 
* User action fire an event which trigger a channel registered in the Flownode.SwitchBoard 
* Flownode.SwitchBoard send data returned from the handlers to the server

* The server-side script awake and assign a handler for each channel registered. Handlers can be anonymous functions, closures or methods
* On server side, a Flownode.SwitchBoard controler take the request
* The channels handlers (registered previously) do their jobs and return a response
* The response is sent back to the client

* On the client-side, the Flownode.SwitchBoard listener take the response
* Handlers registered on step 2 do their jobs

### Any helps are welcome !

### Flownode.SwitchBoard  is actually (2012-11-24) *in early stage of developpement*