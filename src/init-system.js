// @todo read the locale from stored cookie or from the navigator's configuration.
document.locale = 'en';

// Map to the text plugin
SystemJS.config({
    map: {
        text: 'systemjs-text-plugin.js'
    }
});