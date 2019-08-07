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
                    'app.record.edit.change.' + RADIOBUTTON,
                    'app.record.index.edit.show'];

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

    // Prevent user from submitting event if start_time is after end_time
    kintone.events.on(['app.record.create.submit', 'app.record.edit.submit'], function(event) {
        if (event.record[STIME].value > event.record[ETIME].value) {
            event.record[RADIOBUTTON].error = 'End time must occur after Start time.';
        }
        return event;
    });

    function parseTime(time) {
        const timeSplit = time.split(':');
        const hour = parseInt(timeSplit[0]);
        const minute = parseInt(timeSplit[1]);
        return [hour, minute];
    }

    // Instantiate FullCalendar instance
    kintone.events.on('app.record.index.show', function(event) {
        const appId = kintone.app.getId();
        if (event.viewName === 'FullCalendar') {
            const calendarEl = document.getElementById('calendar');
            const calendar = new FullCalendar.Calendar(calendarEl, {
                plugins: ['dayGrid'],
                displayEventEnd: true,
                eventClick: function(info) {
                    window.location.href = info.url;
                }
            });
            kintone.api(kintone.api.url('/k/v1/records', true), 'GET', {'app': appId}, function(response) {
                const records = response.records;
                records.forEach(function(record) {
                    const appURL = '/k/' + appId + '/show#record=' + record.$id.value;
                    if (record[RADIOBUTTON].value === RADIOVALUE) {
                        const dateSplit = (record[DATEFIELD].value).split('-');
                        const year = parseInt(dateSplit[0]);
                        const month = parseInt(dateSplit[1]) - 1;
                        const day = parseInt(dateSplit[2]);
                        const sHour = parseTime(record[STIME].value)[0];
                        const sMinute = parseTime(record[STIME].value)[1];
                        const eHour = parseTime(record[ETIME].value)[0];
                        const eMinute = parseTime(record[ETIME].value)[1];
                        calendar.addEvent({
                            title: record[TEXTFIELD].value,
                            start: new Date(year, month, day, sHour, sMinute),
                            end: new Date(year, month, day, eHour, eMinute),
                            url: appURL
                        });
                    } else {
                        calendar.addEvent({
                            title: record[TEXTFIELD].value,
                            start: record[DATEFIELD].value,
                            allDay: true,
                            url: appURL
                        });
                    }
                });
                calendar.render();
            }, function(error) {
                console.log(error);
            });
        }
    });
})();