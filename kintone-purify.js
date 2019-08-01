(function() {
    const events = ['app.record.create.submit',
                    'app.record.edit.submit',
                    'app.record.index.edit.submit'];
    const fields_to_clean = ['product'];
    kintone.events.on(events, function(event) {
        const record = event.record;
        Object.keys(record).forEach(function(field) {
            if (fields_to_clean.includes(field)) {
                const input = record[field].value;
                const clean_input = DOMPurify.sanitize(input);
                record[field].value = clean_input;
            }
        });
        return event;
    });
})();