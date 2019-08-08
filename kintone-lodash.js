(function() {
	'use strict';
	kintone.events.on('app.record.detail.show', function(event) { 
		const array_of_table_rows = event.record.table.value;
		const sort_input = event.record.sort.value;
		if (sort_input) {
			const grouped_roles = _.groupBy(array_of_table_rows, function(employee) {
				const role = employee.value.role.value;
				return role;
			});
			const blank_space = kintone.app.record.getSpaceElement('space');
			const ul = document.createElement('ul');
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
			blank_space.appendChild(ul);
		}
	});
})();