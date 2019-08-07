(function() {
	'use strict';
	const checkbox_field = 'sort';
	const events = [
		'app.record.detail.show',
		'app.record.edit.change.' + checkbox_field
		];
	kintone.events.on(events, function(event) {
		const space_id = 'space';
		const table_field = 'table';

		const array_of_table_rows = event.record[table_field].value;
		const sort_input = event.record.sort.value;
		const employee_roles = {};
		if (sort_input) {
			sort_input.forEach(function(role) {
				if (!(role in employee_roles)) {
					employee_roles[role] = [];
				}
			});
			array_of_table_rows.forEach(function(employee) {
				const role = employee.value.role.value;
				const name = employee.value.name.value;
				if (sort_input.includes(role)) {
					employee_roles[role].push(name); 
				}
			});

			const dict = {
				'é': 'e',
				'á': 'a',
				'ü': 'u'
				// and so on...
			};
			const blank_space = kintone.app.record.getSpaceElement(space_id);
			const list_area = document.createElement('div');
			const ul = document.createElement('ul');
			while (blank_space.firstChild) {
				blank_space.removeChild(blank_space.firstChild);
			}
			for (const role in employee_roles) {
				if (employee_roles.hasOwnProperty(role)) {
					if (sort_input.includes(role)) {
						employee_roles[role].forEach(function(name) {
							const li = document.createElement('li');
							for (let i = 0; i < name.length; i++) {
								if (name.charAt(i) in dict) {
									name = name.substring(0, i) + dict[name.charAt(i)] + name.substring(i + 1);
								}
							}
							li.innerHTML = name;
							ul.appendChild(li);
						});
					}
				}
			}
			list_area.appendChild(ul);
			blank_space.appendChild(list_area);
		}
	});
})(); 