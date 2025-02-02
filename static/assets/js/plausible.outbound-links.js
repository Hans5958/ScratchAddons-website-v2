!function(n, i) {
    "use strict";
    var e, o = n.location, s = n.document, t = s.querySelector('[src*="' + i + '"]'), l = t && t.getAttribute("data-domain"), c = n.localStorage.plausible_ignore;
    function p(e) {
        console.warn("Ignoring Event: " + e)
    }
    function a(e, t) {
        if (/^localhost$|^127(?:\.[0-9]+){0,2}\.[0-9]+$|^(?:0*\:)*?:?0*1$/.test(o.hostname) || "file:" === o.protocol)
            return p("localhost");
        if (!(n.phantom || n._phantom || n.__nightmare || n.navigator.webdriver || n.Cypress)) {
            if ("true" == c)
                return p("localStorage flag");
            var a = {};
            a.n = e,
            a.u = o.href,
            a.d = l,
            a.r = s.referrer || null,
            a.w = n.innerWidth,
            t && t.meta && (a.m = JSON.stringify(t.meta)),
            t && t.props && (a.p = JSON.stringify(t.props));
            var r = new XMLHttpRequest;
            r.open("POST", i + "/api/plausibleevent", !0),
            r.setRequestHeader("Content-Type", "text/plain"),
            r.send(JSON.stringify(a)),
            r.onreadystatechange = function() {
                4 == r.readyState && t && t.callback && t.callback()
            }
        }
    }
    function r() {
        e !== o.pathname && (e = o.pathname,
        a("pageview"))
    }
    function u(e) {
        for (var t = e.target, a = "auxclick" == e.type && 2 == e.which, r = "click" == e.type; t && (void 0 === t.tagName || "a" != t.tagName.toLowerCase() || !t.href); )
            t = t.parentNode;
        t && t.href && t.host && t.host !== o.host && ((a || r) && plausible("Outbound Link: Click", {
            props: {
                url: t.href
            }
        }),
        t.target && !t.target.match(/^_(self|parent|top)$/i) || e.ctrlKey || e.metaKey || e.shiftKey || !r || (setTimeout(function() {
            o.href = t.href
        }, 150),
        e.preventDefault()))
    }
    try {
        var h, f = n.history;
        f.pushState && (h = f.pushState,
        f.pushState = function() {
            h.apply(this, arguments),
            r()
        }
        ,
        n.addEventListener("popstate", r)),
        s.addEventListener("click", u),
        s.addEventListener("auxclick", u);
        var d = n.plausible && n.plausible.q || [];
        n.plausible = a;
        for (var g = 0; g < d.length; g++)
            a.apply(this, d[g]);
        "prerender" === s.visibilityState ? s.addEventListener("visibilitychange", function() {
            e || "visible" !== s.visibilityState || r()
        }) : r()
    } catch (e) {
        console.error(e),
        (new Image).src = i + "/api/plausibleerror?message=" + encodeURIComponent(e.message)
    }
}(window, "https://analytics.scratchaddons.com");
