Flownode.register('dom.hide', function(response) {
    $(response.selector).hide();
});

Flownode.register('dom.show', function(response) {
	$(response.selector).hide();
});

Flownode.register('dom.text', function(response) {
	$(response.selector).text(response.text);
});

Flownode.register('dom.html', function(response) {
	$(response.selector).html(response.html);
});

Flownode.register('dom.empty', function(response) {
	$(response.selector).remove();
});

Flownode.register('dom.remove', function(response) {
	$(response.selector).remove();
});