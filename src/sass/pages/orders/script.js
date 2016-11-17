+function ($) {
    'use strict';

    /*Bootstrap*/
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="dropdown"]').dropdown();
    /*Bootstrap*/

    /*Flags*/
    var flag = $('[data-sf="flag"]');
    flag.on('click', function () {
       $(this).toggleClass("border-input");
    });
    /*Flags*/

    /*Nav accordeon*/
    var sf = $('[data-sf-js="box-export"], [data-sf-js="box-fictive"], [data-sf-js="box-gestion"]');

    (sf).on('click', function() {
        $(this).not().next().addClass('hide');
        $(this).children().toggleClass('reverse');

        $(this).next().toggleClass('show');
    });
    /*Nav accordeon*/

    /*checkbox Tab*/
    var sfCheckboxTab = $('[data-sf="checkbox-tab"]');

     sfCheckboxTab.on('click', function(){
         if($(this).is(':checked')){
             $('[type="checkbox"]').prop('checked', true);
         }
         else (
             $('[type="checkbox"]').prop('checked', false)
         )
     });
    /* Chexkbox Tab*/
}(jQuery);