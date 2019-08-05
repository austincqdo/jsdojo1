(function() {
	kintone.events.on('app.record.detail.show', function() {
		// Text area
		const text_area = kintone.app.record.getFieldElement('Text_area');
		const text_pre = document.createElement('pre');
		const text_code = document.createElement('code');
		const children = text_area.children;
		const len_of_children = children.length;
		for (let i = 0; i < len_of_children; i++) {
			text_code.innerHTML += encodeURIComponent(children[i]);
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
		const blank_space = kintone.app.record.getSpaceElement('blank');
		const space_pre = document.createElement('pre');
		const space_code = document.createElement('code');
		space_pre.setAttribute('style', 'margin-left: -200px');
		space_code.innerText = `
			<script type="application/javascript">
  			    function $init() {return true;}
			</script>
			`;
		space_pre.appendChild(space_code);
		blank_space.appendChild(space_pre);
		// The only way we can delay instantiation for highlight.js 
		// is to process each block individually using querySelectorAll().
		document.querySelectorAll('pre code').forEach(function(block) {
			hljs.highlightBlock(block);
		});
	});
})();