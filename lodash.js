// database of workers with name, position. use reduce to sort by position and use deburr to localize.
(function() {
	kintone.events.on('app.record.detail.show', function(event) { // should be app.record.edit.submit or app.record.edit.change.<fieldcode>
		console.log(event);
		const array_of_table_rows = event.record.table.value;
		const sort_input = event.record.sort.value;
		if (sort_input) {
			const grouped_roles = _.groupBy(array_of_table_rows, function(employee) {
				const role = employee.value.role.value;
				return role;
			});
			
			const blank_space = kintone.app.record.getSpaceElement('space');
			const role_array = grouped_roles[sort_input];
			const ul = document.createElement('ul');
			for (let person_index in role_array) {
				if (role_array.hasOwnProperty(person_index)) {
					const li = document.createElement('li');
					const name = role_array[person_index].value.name.value;
					li.innerHTML = _.deburr(name);
					ul.appendChild(li);
				}
			}
			blank_space.appendChild(ul);
		}
		
	});
})();