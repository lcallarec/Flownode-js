sb = new SwitchBoard();

/**
* Il serait possible de definir le register en tant que namespace
*
* De sorte que si dom.hide n'est pas renseigné, on remonte à dom voir si l'entrée existe
*
* S'il existe, cela signifie que tous les channels qu'il prend en charge partagent une même interface
*
* Le callback doit alors prendre un second argument, handled, qui correspond au suffixe non pris en compte
*
*/

sb.register('dom.hide', function(response) {
    $(response.selector).hide();
});

sb.register('dom.show', function(response) {
	$(response.selector).hide();
});

sb.register('dom.text', function(response) {
	$(response.selector).text(response.text);
});

sb.register('dom.html', function(response) {
	$(response.selector).html(response.html);
});

sb.register('dom.empty', function(response) {
	$(response.selector).remove();
});

sb.register('dom.remove', function(response) {
	$(response.selector).remove();
});