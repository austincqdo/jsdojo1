(function() {
	kintone.events.on('app.record.detail.show', function(event) {
		// Text area
		const text_area = kintone.app.record.getFieldElement('Text_area');
		const text_pre = document.createElement('pre');
		const text_code = document.createElement('code');
		const children = text_area.children;
		const len_of_children = children.length;
		for (let i = 0; i < len_of_children; i++) {
			text_code.innerHTML += children[i].textContent;
			linebreak = document.createElement('br');
			text_code.appendChild(linebreak);
		}

		// Remove original lines
		for (let i = 0; i < len_of_children; i++) {
			children[0].remove();
		}

		text_pre.appendChild(text_code);
		text_area.appendChild(text_pre);

		// Blank space
		const space = kintone.app.record.getSpaceElement('blank');
		const pre = document.createElement('pre');
		const code = document.createElement('code');
		code.innerHTML = `
			int i = 0;
			console.log(i);
			function test() {
				console.log("I LOVE KINTONE!!");
			}`;
		pre.appendChild(code);
		space.appendChild(pre);
		// The only way we can delay instantiation for highlight.js 
		// is to process each block individually using querySelectorAll().
		document.querySelectorAll('pre code').forEach(function(block) {
			hljs.highlightBlock(block);
		});
	});
})();