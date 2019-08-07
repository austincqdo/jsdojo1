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
		const sort_input = event.record[checkbox_field].value;
		if (sort_input) {
			const grouped_roles = _.groupBy(array_of_table_rows, function(employee) {
				const role = employee.value.role.value;
				return role;
			});
			const blank_space = kintone.app.record.getSpaceElement(space_id);
			const list_area = document.createElement('div');
			const ul = document.createElement('ul');
			while (blank_space.firstChild) {
				blank_space.removeChild(blank_space.firstChild);
			}
			for (const role in grouped_roles) {
				if (grouped_roles.hasOwnProperty(role)) {
					if (sort_input.includes(role)) {
						grouped_roles[role].forEach(function(employee) {
							const li = document.createElement('li');
							const name = employee.value.name.value;
							li.innerHTML = _.deburr(name);
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