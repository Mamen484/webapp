+function ($) {
    'use strict';

    var showDate = $('[data-sf-date="datepicker"]');
    var hideDate = $('[data-sf-date="no-datepicker"]');

    showDate.on('click', function() {
        $(this).parent().parent().next().addClass('show');
    });

    hideDate.on('click', function() {
        $(this).parent().parent().next().removeClass('show');
    });
}(jQuery);
