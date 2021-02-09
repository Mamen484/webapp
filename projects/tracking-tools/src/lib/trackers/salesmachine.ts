declare var window;

export const loadSalesMachine = (callback: () => void) => {
    window.salesmachine = window.salesmachine || [];
    window.salesmachine.Settings = function (e, a) {
        let n = document.createElement('script');
        n.type = 'text/javascript', n.async = !0, n.src = '//app.salesmachine.io/javascripts/salesmachine.min.js';
        n.onload = callback;
        const t = document.getElementsByTagName('script')[0];
        t.parentNode.insertBefore(n, t);
        for (let s = function (e) {
            return function () {
                window.salesmachine.push([e].concat(Array.prototype.slice.call(arguments, 0)))
            }
        }, c = ['init', 'salesmachine', 'pageview', 'account', 'contact', 'track'], i = 0; i < c.length; i++) {
            window.salesmachine[c[i]] = s(c[i]);
        }
        window.salesmachine.init(e, a);
    };
    window.salesmachine.Settings('len6B5YQFgC3W_KjrOx-Mg', {});
}
