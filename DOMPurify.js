(function() {
	const events = ['app.record.create.submit', 
					'app.record.edit.submit', 
					'app.record.index.edit.submit'];
	const fields_to_clean = ['product', 'quantity', 'price'];
	kintone.events.on(events, function(event) {
		const record = event.record;
		for (let field in record) {
			if (record.hasOwnProperty(field)) {
				if (field in fields_to_clean) {
					const input = record[field].value;
					const clean_input = DOMPurify.sanitize(input);
					record[field].value = clean_input;
				}
			}
		}
		return event;
	});
})();