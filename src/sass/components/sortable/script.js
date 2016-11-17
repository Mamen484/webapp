+function ($) {
    'use strict';

    /*drag and drop*/
    Sortable.create(listWithHandle, {
        animation: 150
    });
    /*drag and drop*/

    /* Pellet drag and drop */
    var sfCheck = $('input[data-sf = "checkbox"]');

    sfCheck.on('click', function() {
        if(!$(this).is(':checked')) {

            $(this).parents('[data-sf="target"]').css("background-color", "#fff");
            $(this).parents('.body').children('.badge').addClass('badge-empty not-checked').removeClass('compte');
        }else {

            $(this).parents('[data-sf="target"]').css("background-color", "#D4EFF9");
            $(this).parents('.body').children('.badge').removeClass('badge-empty not-checked').addClass('compte');
        }
    });
    /* Pellet drag and drop */
}(jQuery);