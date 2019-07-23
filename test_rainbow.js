(function() {
	kintone.events.on('app.record.detail.show', function(event) {
		// Text area
		const text_area = kintone.app.record.getFieldElement('Text_area');
		const text_pre = document.createElement('pre');
		const children = text_area.children;
		const len_of_children = children.length;
		for (let i = 0; i < len_of_children; i++) {
			let text_code = document.createElement('code');
			text_code.setAttribute('data-language', 'javascript');
			text_code.innerHTML = children[i].textContent;

			// For some reason Rainbow thinks of EVERYTHING inside <code> tags 
			// as code and processes <br> as part of it. So code must be 
			// highlighted line by line. 
			text_pre.appendChild(text_code);
			linebreak = document.createElement('br');
			text_pre.appendChild(linebreak)
		}
		text_area.appendChild(text_pre);

		// Remove original lines
		for (let i = 0; i < len_of_children; i++) {
			children[0].remove();
		}	

		// Blank space
		const blank_space = kintone.app.record.getSpaceElement('blank');
		const space_pre = document.createElement('pre');
		const space_code = document.createElement('code');
		space_code.setAttribute('data-language', 'javascript');
		space_code.innerHTML = `
			int i = 0;
			console.log(i);
			function test() {
				console.log("YES");
			}`;
		space_pre.appendChild(space_code);
		blank_space.appendChild(space_pre);
		Rainbow.color();
	});
})();