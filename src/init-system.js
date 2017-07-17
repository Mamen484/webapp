// @todo read the locale from stored cookie or from the navigator's configuration.
document.locale = 'en';

// Map to the text plugin
if (typeof SystemJS !== 'undefined'){
    SystemJS.config({
        map: {
            text: 'assets/js/systemjs-text-plugin.js'
        }
    });
}
