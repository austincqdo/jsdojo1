(function() {
	kintone.events.on('app.record.detail.show', function(event) {
		// Text area
		const text_area = kintone.app.record.getFieldElement('Text_area');
		const text_pre = document.createElement('pre');
		const children = text_area.children;
		const len_of_children = children.length;
		text_pre.setAttribute('class', 'sh_javascript');
		for (let i = 0; i < len_of_children; i++) {
			text_pre.innerHTML += children[i].textContent;
			linebreak = document.createElement('br');
			text_pre.appendChild(linebreak)
		}
		text_area.appendChild(text_pre);

		// Remove original lines
		for (let i = 0; i < len_of_children; i++) {
			children[0].remove();
		}

		// Blank space
		const space = kintone.app.record.getSpaceElement('blank');
		const pre = document.createElement('pre');
		pre.setAttribute('class', 'sh_javascript');
		pre.innerHTML = `
			int i = 0;
			function foo(bar) {
				console.log("nah");
			}
			console.log(i);`;
		space.appendChild(pre);
		sh_highlightDocument();
	});
})();