(function() {
	events = ['app.record.create.submit', 'app.record.edit.submit', 'app.record.index.edit.submit'];
	kintone.events.on(events, function(event) {
		const record = event.record;
		for (let field in record) {
			const input = record[field].value;
			const clean_input = DOMPurify.sanitize(input);
			record[field].value = clean_input;
		}
		return event;
	});
})();