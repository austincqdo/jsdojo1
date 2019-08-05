(function() {
    'use strict';
    const RADIOBUTTON = 'time';
    const TEXTFIELD = 'event';
    const DATEFIELD = 'date';
    const STIME = 'start_time';
    const ETIME = 'end_time';
    const RADIOVALUE = 'Start time - End time';
    const events = ['app.record.detail.show',
                    'app.record.create.show',
                    'app.record.create.change.' + RADIOBUTTON,
                    'app.record.edit.show',
                    'app.record.edit.change.' + RADIOBUTTON];

    // Only show option to input start and end times if 'All day' not selected.
    kintone.events.on(events, function(event) {
        const record = event.record;
        // Hide/unhide fields depending on field choices.
        if (record[RADIOBUTTON].value === RADIOVALUE) {
            kintone.app.record.setFieldShown(STIME, true);
            kintone.app.record.setFieldShown(ETIME, true);
        } else {
            // If 'Start time - End time' is not selected, hide the Start time
            // and End time fields.
            kintone.app.record.setFieldShown(STIME, false);
            kintone.app.record.setFieldShown(ETIME, false);
        }
    });

    // Instantiate FullCalendar instance
    kintone.events.on('app.record.index.show', function(event) {
        if (event.viewType === 'custom') {
            const calendarEl = document.getElementById('calendar');
            const calendar = new FullCalendar.Calendar(calendarEl, {
                plugins: ['dayGrid'],
                displayEventEnd: true
            });
            const records = event.records;
            for (const i in records) {
                if (records[i][RADIOBUTTON].value === RADIOVALUE) {
                    const dateSplit = (records[i][DATEFIELD].value).split('-');
                    const year = parseInt(dateSplit[0]);
                    const month = parseInt(dateSplit[1]) - 1;
                    const day = parseInt(dateSplit[2]);
                    const sHour = parseTime(records[i][STIME].value)[0];
                    const sMinute = parseTime(records[i][STIME].value)[1];
                    const eHour = parseTime(records[i][ETIME].value)[0];
                    const eMinute = parseTime(records[i][ETIME].value)[1];

                    calendar.addEvent({
                        title: records[i][TEXTFIELD].value,
                        start: new Date(year, month, day, sHour, sMinute),
                        end: new Date(year, month, day, eHour, eMinute)
                    });
                } else {
                    calendar.addEvent({
                        title: records[i][TEXTFIELD].value,
                        start: records[i][DATEFIELD].value,
                        allDay: true
                    });
                }
            }
            calendar.render();
        }
    });

    function parseTime(time) {
        const timeSplit = time.split(':');
        const hour = parseInt(timeSplit[0]);
        const minute = parseInt(timeSplit[1]);
        return [hour, minute];
    }
})();