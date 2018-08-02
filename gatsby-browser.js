// https://github.com/scottnonnenberg/blog/blob/master/gatsby-browser.js

let first = true;

function getDuration() {
    const start = window.start || new Date();
    const now = new Date();
    const difference = now.getTime() - start.getTime();

    if (difference === 0) {
        return null;
    }

    return difference;
}

exports.onRouteUpdate = state => {
    window._paq = window._paq || [];

    if (first) {
        first = false;
        window._paq.push(['trackEvent', 'javascript', 'load', 'duration', getDuration()]);
        console.log(
            'Curious how its done? We are using paper.js and gatsby.js.',
            'Some behind the scenes: http://volligohne.de/projekte/timobecker/.',
            'Check out the source code https://github.com/voellig-ohne/timobecker'
        );
    } else {
        window._paq.push(['setCustomUrl', state.pathname]);
        window._paq.push(['setDocumentTitle', state.pathname]);
        window._paq.push(['trackPageView']);
    }
};
