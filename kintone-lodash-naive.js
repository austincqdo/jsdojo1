(function() {
	'use strict';
	kintone.events.on('app.record.detail.show', function(event) {
		const array_of_table_rows = event.record.table.value;
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
			const blank_space = kintone.app.record.getSpaceElement('space');
			const ul = document.createElement('ul');
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
			blank_space.appendChild(ul);
		}
	});
})(); 