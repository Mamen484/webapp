+function ($) {
    'use strict';

    var hoverTooltip = $('[data-sf-tooltip="tooltip-sf"]');

    hoverTooltip.on('focus', function() {
        $('[data-toggle="tooltip"]').tooltip('hide');
    });
}(jQuery);
