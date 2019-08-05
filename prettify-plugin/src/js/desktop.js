jQuery.noConflict();

(function($, PLUGIN_ID) {
    'use strict';

    const config = kintone.plugin.app.getConfig(PLUGIN_ID);
    if (!config) {
        return false;
    }
    kintone.events.on('app.record.detail.show', function() {
        for (const field in config) {
            if (config[field] && config.hasOwnProperty(field)) {
                const text_area = kintone.app.record.getFieldElement(config[field]);
                const text_code = document.createElement('code');
                const children = text_area.children;
                const len_of_children = children.length;
                const bg_color = '#000';

                text_code.setAttribute('class', 'prettyprint');
                for (let i = 0; i < len_of_children; i++) {
                    text_code.innerHTML += children[i].textContent.replace('<', '&lt;').replace('>', '&gt;').replace('/', '&#x2F');
                    const linebreak = document.createElement('br');
                    text_code.appendChild(linebreak);
                }
                text_area.appendChild(text_code);

                // Remove original lines
                for (let i = 0; i < len_of_children; i++) {
                    children[0].remove();
                }

                // Color Text Area background black
                const field_element = kintone.app.record.getFieldElement(config[field]);
                field_element.style.backgroundColor = bg_color;
            }
        }
        PR.prettyPrint();
    });
})(jQuery, kintone.$PLUGIN_ID);