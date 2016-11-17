+function ($) {
    'use strict';

    var options = [];

    $('.dropdown-menu label').on('click', function (event) {
        var $target = $(event.currentTarget),
            val = $target.attr('data-value'),
            $inp = $target.find('input'),
            idx = options.indexOf(val);

        var timeoutCallback = function (f) {
            return function () {
                $inp.prop('checked', f);
            };
        };

        if (-1 < idx) {
            options.splice(idx, 1);
            setTimeout(timeoutCallback(false), 0);
        } else {
            options.push(val);
            setTimeout(timeoutCallback(true), 0);
        }

        $(event.target).blur();
        return false;
    });
}(jQuery);
