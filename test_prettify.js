(function() {
	kintone.events.on('app.record.detail.show', function(event) {
		// Text area
		const text_area = kintone.app.record.getFieldElement('Text_area');
		const text_code = document.createElement('code');
		const children = text_area.children;
		const len_of_children = children.length;
		text_code.setAttribute('class', 'prettyprint');
		for (let i = 0; i < len_of_children; i++) {
			text_code.innerHTML += children[i].textContent;
			linebreak = document.createElement('br');
			text_code.appendChild(linebreak)
		}
		text_area.appendChild(text_code);

		// Remove original lines
		for (let i = 0; i < len_of_children; i++) {
			children[0].remove();
		}

		// Blank space
		const blank_space = kintone.app.record.getSpaceElement('blank');
		const space_code = document.createElement('code');
		space_code.setAttribute('class', 'prettyprint');
		space_code.innerHTML = 'int i = 0';
		blank_space.appendChild(space_code);
		PR.prettyPrint();
	});
})();