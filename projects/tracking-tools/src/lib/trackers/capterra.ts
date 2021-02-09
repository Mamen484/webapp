/* tslint:disable */
export const LOAD_CAPTERRA = () => {
    const capterra_vkey = '19d5f76fb083f5087850c39151126332',
        capterra_vid = '2115053',
        capterra_prefix = (('https:' == document.location.protocol) ? 'https://ct.capterra.com' : 'http://ct.capterra.com');

    (function() {
        const ct = document.createElement('script'); ct.type = 'text/javascript'; ct.async = true;
        ct.src = capterra_prefix + '/capterra_tracker.js?vid=' + capterra_vid + '&vkey=' + capterra_vkey;
        const s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ct, s);
    })();
};