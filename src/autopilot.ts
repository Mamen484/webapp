declare var window: any;
export const LOAD_AUTOPILOT = (function (o = {'app': true}) {
    var b = 'https://api.autopilothq.com/anywhere/',
        t = '0a7400a84d5c4aa48e9cd84646ced716b73fea953373428380336d3debddeb9c', a = window.AutopilotAnywhere = {
            _runQueue: [], run: function () {
                this._runQueue.push(arguments);
            }
        }, c = encodeURIComponent, s = 'SCRIPT', d = document, l = d.getElementsByTagName(s)[0],
        p = 't=' + c(d.title || '') + '&u=' + c(d.location.href || '') + '&r=' + c(d.referrer || ''),
        j = 'text/javascript', z, y;
    if (!window.Autopilot) window.Autopilot = a;
    if (o.app) p = 'devmode=true&' + p;
    z = function (src, asy) {
        var e = <HTMLScriptElement>d.createElement(s);
        e.src = src;
        e.type = j;
        e.async = asy;
        l.parentNode.insertBefore(e, l);
    };
    y = function () {
        z(b + t + '?' + p, true);
    };
    if (window.attachEvent) {
        window.attachEvent('onload', y);
    } else {
        window.addEventListener('load', y, false);
    }
});
