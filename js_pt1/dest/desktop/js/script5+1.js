(function() {
	'use strict';
	kintone.events.on('app.record.create.show', function(event) {
		const actions = [
			'Relentless quest',
			'Mental and physical persistence',
			'Empathy for the ideal',
			'Inspire others',
			'Increase knowledge and skills',
			'Fairness and honesty'
		]
		const rows = [];
		for (let i = 0; i < 6; i++) {
			rows.push(createRow(actions[i]));
		}
		event.record.table.value = rows;
		return event;
	});

	function createRow(action) {
		return {
			'value': {
				'action_5': {
					'type': 'DROP_DOWN',
					'value': action,
				},
				'status': {
					'type': 'CHECK_BOX',
					'value': ['Not reviewed']
				},
				'task': {
					'type': 'MULTI_LINE_TEXT',
					'value': ''
				}
			}
		};
	}
})()