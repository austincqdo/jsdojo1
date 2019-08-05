jQuery.noConflict();

(function($, PLUGIN_ID) {
    'use strict';
    const CONF = kintone.plugin.app.getConfig(PLUGIN_ID);

    const $form = $('.js-submit-settings');
    const $cancelButton = $('.js-cancel-button');
    const $text = [];

    function setDropdown() {
        return KintoneConfigHelper.getFields('MULTI_LINE_TEXT').then(function(resp) {
            for (let i = 0; i < resp.length; i++) {
                $('#dropdowns').append(`
                    <div class="kintoneplugin-row">
                        <label for="select-text-field` + `-` + i + `" class="kintoneplugin-label">
                            Text Area to Highlight
                        </label>
                        <p class="kintoneplugin-desc">Please select a Text Area field</p>
                        <div class="kintoneplugin-select-outer">
                            <div class="kintoneplugin-select">
                                <select id="select-text-field` + `-` + i + `" name="js-select-text-field` + `-` + i + `">
                                    <option value="">-----</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    `);
                $text[i] = $('select[name="js-select-text-field' + '-' + i + '"]');
            }

            resp.forEach(function(respField) {
                const $option = $('<option></option>');
                switch (respField.type) {
                    case 'MULTI_LINE_TEXT':
                        $option.attr('value', respField.code);
                        $option.text(respField.label);
                        $text.forEach(function(field) {
                            field.append($option.clone());
                        });
                        break;
                    default:
                        break;
                }
            });

            // Returning to settings page
            for (let i = 0; i < $text.length; i++) {
                if (CONF['text' + i]) {
                    $text[i].val(CONF['text' + i]);
                }
            }

        }, function(err) {
            return alert('Failed to retrieve fields\' information');
        });
    }

    $(document).ready(function() {
        setDropdown();

        $form.on('submit', function(event) {
            event.preventDefault();
            const config = {};
            for (let i = 0; i < $text.length; i++) {
                config['text' + i] = $text[i].val();
            }

            kintone.plugin.app.setConfig(config, function() {
                alert('The plug-in settings have been saved. Please update the app!');
                window.location.href = '/k/admin/app/flow?app=' + kintone.app.getId();
            });
        });

        $cancelButton.on('click', function() {
            window.location.href = '/k/admin/app/' + kintone.app.getId() + '/plugin/';
        });
    });
})(jQuery, kintone.$PLUGIN_ID);
