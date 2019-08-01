(function() {
    const events = ['app.record.create.submit',
                    'app.record.edit.submit',
                    'app.record.index.edit.submit'];
    const fieldsToClean = ['product'];
    kintone.events.on(events, function(event) {
        const record = event.record;
        Object.keys(record).forEach(function(field) {
            if (fieldsToClean.includes(field)) {
                const input = record[field].value;
                const cleanInput = DOMPurify.sanitize(input);
                record[field].value = cleanInput;
            }
        });
        return event;
    });
})();