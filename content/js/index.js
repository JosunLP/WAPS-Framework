"use strict";
(function (global, factory) {
    "use strict";
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            };
    }
    else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    "use strict";
    var arr = [];
    var document = window.document;
    var getProto = Object.getPrototypeOf;
    var slice = arr.slice;
    var concat = arr.concat;
    var push = arr.push;
    var indexOf = arr.indexOf;
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var fnToString = hasOwn.toString;
    var ObjectFunctionString = fnToString.call(Object);
    var support = {};
    var isFunction = function isFunction(obj) {
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    };
    var isWindow = function isWindow(obj) {
        return obj != null && obj === obj.window;
    };
    var preservedScriptAttributes = {
        type: true,
        src: true,
        nonce: true,
        noModule: true
    };
    function DOMEval(code, node, doc) {
        doc = doc || document;
        var i, val, script = doc.createElement("script");
        script.text = code;
        if (node) {
            for (i in preservedScriptAttributes) {
                val = node[i] || node.getAttribute && node.getAttribute(i);
                if (val) {
                    script.setAttribute(i, val);
                }
            }
        }
        doc.head.appendChild(script).parentNode.removeChild(script);
    }
    function toType(obj) {
        if (obj == null) {
            return obj + "";
        }
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[toString.call(obj)] || "object" :
            typeof obj;
    }
    var version = "3.4.1", jQuery = function (selector, context) {
        return new jQuery.fn.init(selector, context);
    }, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        length: 0,
        toArray: function () {
            return slice.call(this);
        },
        get: function (num) {
            if (num == null) {
                return slice.call(this);
            }
            return num < 0 ? this[num + this.length] : this[num];
        },
        pushStack: function (elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            ret.prevObject = this;
            return ret;
        },
        each: function (callback) {
            return jQuery.each(this, callback);
        },
        map: function (callback) {
            return this.pushStack(jQuery.map(this, function (elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        slice: function () {
            return this.pushStack(slice.apply(this, arguments));
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        eq: function (i) {
            var len = this.length, j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
        },
        end: function () {
            return this.prevObject || this.constructor();
        },
        push: push,
        sort: arr.sort,
        splice: arr.splice
    };
    jQuery.extend = jQuery.fn.extend = function () {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[i] || {};
            i++;
        }
        if (typeof target !== "object" && !isFunction(target)) {
            target = {};
        }
        if (i === length) {
            target = this;
            i--;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    copy = options[name];
                    if (name === "__proto__" || target === copy) {
                        continue;
                    }
                    if (deep && copy && (jQuery.isPlainObject(copy) ||
                        (copyIsArray = Array.isArray(copy)))) {
                        src = target[name];
                        if (copyIsArray && !Array.isArray(src)) {
                            clone = [];
                        }
                        else if (!copyIsArray && !jQuery.isPlainObject(src)) {
                            clone = {};
                        }
                        else {
                            clone = src;
                        }
                        copyIsArray = false;
                        target[name] = jQuery.extend(deep, clone, copy);
                    }
                    else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };
    jQuery.extend({
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        isReady: true,
        error: function (msg) {
            throw new Error(msg);
        },
        noop: function () { },
        isPlainObject: function (obj) {
            var proto, Ctor;
            if (!obj || toString.call(obj) !== "[object Object]") {
                return false;
            }
            proto = getProto(obj);
            if (!proto) {
                return true;
            }
            Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
            return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
        },
        isEmptyObject: function (obj) {
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        },
        globalEval: function (code, options) {
            DOMEval(code, { nonce: options && options.nonce });
        },
        each: function (obj, callback) {
            var length, i = 0;
            if (isArrayLike(obj)) {
                length = obj.length;
                for (; i < length; i++) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            }
            else {
                for (i in obj) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            }
            return obj;
        },
        trim: function (text) {
            return text == null ?
                "" :
                (text + "").replace(rtrim, "");
        },
        makeArray: function (arr, results) {
            var ret = results || [];
            if (arr != null) {
                if (isArrayLike(Object(arr))) {
                    jQuery.merge(ret, typeof arr === "string" ?
                        [arr] : arr);
                }
                else {
                    push.call(ret, arr);
                }
            }
            return ret;
        },
        inArray: function (elem, arr, i) {
            return arr == null ? -1 : indexOf.call(arr, elem, i);
        },
        merge: function (first, second) {
            var len = +second.length, j = 0, i = first.length;
            for (; j < len; j++) {
                first[i++] = second[j];
            }
            first.length = i;
            return first;
        },
        grep: function (elems, callback, invert) {
            var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
            for (; i < length; i++) {
                callbackInverse = !callback(elems[i], i);
                if (callbackInverse !== callbackExpect) {
                    matches.push(elems[i]);
                }
            }
            return matches;
        },
        map: function (elems, callback, arg) {
            var length, value, i = 0, ret = [];
            if (isArrayLike(elems)) {
                length = elems.length;
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value);
                    }
                }
            }
            else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value);
                    }
                }
            }
            return concat.apply([], ret);
        },
        guid: 1,
        support: support
    });
    if (typeof Symbol === "function") {
        jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
    }
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    function isArrayLike(obj) {
        var length = !!obj && "length" in obj && obj.length, type = toType(obj);
        if (isFunction(obj) || isWindow(obj)) {
            return false;
        }
        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && (length - 1) in obj;
    }
    var Sizzle = (function (window) {
        var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), nonnativeSelectorCache = createCache(), sortOrder = function (a, b) {
            if (a === b) {
                hasDuplicate = true;
            }
            return 0;
        }, hasOwn = ({}).hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = function (list, elem) {
            var i = 0, len = list.length;
            for (; i < len; i++) {
                if (list[i] === elem) {
                    return i;
                }
            }
            return -1;
        }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+", attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
            "*([*^$|!~]?=)" + whitespace +
            "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
            "*\\]", pseudos = ":(" + identifier + ")(?:\\((" +
            "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
            "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
            ".*" +
            ")\\)|)", rwhitespace = new RegExp(whitespace + "+", "g"), rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rdescend = new RegExp(whitespace + "|>"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            "ID": new RegExp("^#(" + identifier + ")"),
            "CLASS": new RegExp("^\\.(" + identifier + ")"),
            "TAG": new RegExp("^(" + identifier + "|[*])"),
            "ATTR": new RegExp("^" + attributes),
            "PSEUDO": new RegExp("^" + pseudos),
            "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
                "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            "bool": new RegExp("^(?:" + booleans + ")$", "i"),
            "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        }, rhtml = /HTML$/i, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function (_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 0x10000;
            return high !== high || escapedWhitespace ?
                escaped :
                high < 0 ?
                    String.fromCharCode(high + 0x10000) :
                    String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
        }, rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, fcssescape = function (ch, asCodePoint) {
            if (asCodePoint) {
                if (ch === "\0") {
                    return "\uFFFD";
                }
                return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
            }
            return "\\" + ch;
        }, unloadHandler = function () {
            setDocument();
        }, inDisabledFieldset = addCombinator(function (elem) {
            return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
        }, { dir: "parentNode", next: "legend" });
        try {
            push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);
            arr[preferredDoc.childNodes.length].nodeType;
        }
        catch (e) {
            push = { apply: arr.length ?
                    function (target, els) {
                        push_native.apply(target, slice.call(els));
                    } :
                    function (target, els) {
                        var j = target.length, i = 0;
                        while ((target[j++] = els[i++])) { }
                        target.length = j - 1;
                    }
            };
        }
        function Sizzle(selector, context, results, seed) {
            var m, i, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument, nodeType = context ? context.nodeType : 9;
            results = results || [];
            if (typeof selector !== "string" || !selector ||
                nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
                return results;
            }
            if (!seed) {
                if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
                    setDocument(context);
                }
                context = context || document;
                if (documentIsHTML) {
                    if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
                        if ((m = match[1])) {
                            if (nodeType === 9) {
                                if ((elem = context.getElementById(m))) {
                                    if (elem.id === m) {
                                        results.push(elem);
                                        return results;
                                    }
                                }
                                else {
                                    return results;
                                }
                            }
                            else {
                                if (newContext && (elem = newContext.getElementById(m)) &&
                                    contains(context, elem) &&
                                    elem.id === m) {
                                    results.push(elem);
                                    return results;
                                }
                            }
                        }
                        else if (match[2]) {
                            push.apply(results, context.getElementsByTagName(selector));
                            return results;
                        }
                        else if ((m = match[3]) && support.getElementsByClassName &&
                            context.getElementsByClassName) {
                            push.apply(results, context.getElementsByClassName(m));
                            return results;
                        }
                    }
                    if (support.qsa &&
                        !nonnativeSelectorCache[selector + " "] &&
                        (!rbuggyQSA || !rbuggyQSA.test(selector)) &&
                        (nodeType !== 1 || context.nodeName.toLowerCase() !== "object")) {
                        newSelector = selector;
                        newContext = context;
                        if (nodeType === 1 && rdescend.test(selector)) {
                            if ((nid = context.getAttribute("id"))) {
                                nid = nid.replace(rcssescape, fcssescape);
                            }
                            else {
                                context.setAttribute("id", (nid = expando));
                            }
                            groups = tokenize(selector);
                            i = groups.length;
                            while (i--) {
                                groups[i] = "#" + nid + " " + toSelector(groups[i]);
                            }
                            newSelector = groups.join(",");
                            newContext = rsibling.test(selector) && testContext(context.parentNode) ||
                                context;
                        }
                        try {
                            push.apply(results, newContext.querySelectorAll(newSelector));
                            return results;
                        }
                        catch (qsaError) {
                            nonnativeSelectorCache(selector, true);
                        }
                        finally {
                            if (nid === expando) {
                                context.removeAttribute("id");
                            }
                        }
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed);
        }
        function createCache() {
            var keys = [];
            function cache(key, value) {
                if (keys.push(key + " ") > Expr.cacheLength) {
                    delete cache[keys.shift()];
                }
                return (cache[key + " "] = value);
            }
            return cache;
        }
        function markFunction(fn) {
            fn[expando] = true;
            return fn;
        }
        function assert(fn) {
            var el = document.createElement("fieldset");
            try {
                return !!fn(el);
            }
            catch (e) {
                return false;
            }
            finally {
                if (el.parentNode) {
                    el.parentNode.removeChild(el);
                }
                el = null;
            }
        }
        function addHandle(attrs, handler) {
            var arr = attrs.split("|"), i = arr.length;
            while (i--) {
                Expr.attrHandle[arr[i]] = handler;
            }
        }
        function siblingCheck(a, b) {
            var cur = b && a, diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
                a.sourceIndex - b.sourceIndex;
            if (diff) {
                return diff;
            }
            if (cur) {
                while ((cur = cur.nextSibling)) {
                    if (cur === b) {
                        return -1;
                    }
                }
            }
            return a ? 1 : -1;
        }
        function createInputPseudo(type) {
            return function (elem) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === type;
            };
        }
        function createButtonPseudo(type) {
            return function (elem) {
                var name = elem.nodeName.toLowerCase();
                return (name === "input" || name === "button") && elem.type === type;
            };
        }
        function createDisabledPseudo(disabled) {
            return function (elem) {
                if ("form" in elem) {
                    if (elem.parentNode && elem.disabled === false) {
                        if ("label" in elem) {
                            if ("label" in elem.parentNode) {
                                return elem.parentNode.disabled === disabled;
                            }
                            else {
                                return elem.disabled === disabled;
                            }
                        }
                        return elem.isDisabled === disabled ||
                            elem.isDisabled !== !disabled &&
                                inDisabledFieldset(elem) === disabled;
                    }
                    return elem.disabled === disabled;
                }
                else if ("label" in elem) {
                    return elem.disabled === disabled;
                }
                return false;
            };
        }
        function createPositionalPseudo(fn) {
            return markFunction(function (argument) {
                argument = +argument;
                return markFunction(function (seed, matches) {
                    var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length;
                    while (i--) {
                        if (seed[(j = matchIndexes[i])]) {
                            seed[j] = !(matches[j] = seed[j]);
                        }
                    }
                });
            });
        }
        function testContext(context) {
            return context && typeof context.getElementsByTagName !== "undefined" && context;
        }
        support = Sizzle.support = {};
        isXML = Sizzle.isXML = function (elem) {
            var namespace = elem.namespaceURI, docElem = (elem.ownerDocument || elem).documentElement;
            return !rhtml.test(namespace || docElem && docElem.nodeName || "HTML");
        };
        setDocument = Sizzle.setDocument = function (node) {
            var hasCompare, subWindow, doc = node ? node.ownerDocument || node : preferredDoc;
            if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                return document;
            }
            document = doc;
            docElem = document.documentElement;
            documentIsHTML = !isXML(document);
            if (preferredDoc !== document &&
                (subWindow = document.defaultView) && subWindow.top !== subWindow) {
                if (subWindow.addEventListener) {
                    subWindow.addEventListener("unload", unloadHandler, false);
                }
                else if (subWindow.attachEvent) {
                    subWindow.attachEvent("onunload", unloadHandler);
                }
            }
            support.attributes = assert(function (el) {
                el.className = "i";
                return !el.getAttribute("className");
            });
            support.getElementsByTagName = assert(function (el) {
                el.appendChild(document.createComment(""));
                return !el.getElementsByTagName("*").length;
            });
            support.getElementsByClassName = rnative.test(document.getElementsByClassName);
            support.getById = assert(function (el) {
                docElem.appendChild(el).id = expando;
                return !document.getElementsByName || !document.getElementsByName(expando).length;
            });
            if (support.getById) {
                Expr.filter["ID"] = function (id) {
                    var attrId = id.replace(runescape, funescape);
                    return function (elem) {
                        return elem.getAttribute("id") === attrId;
                    };
                };
                Expr.find["ID"] = function (id, context) {
                    if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                        var elem = context.getElementById(id);
                        return elem ? [elem] : [];
                    }
                };
            }
            else {
                Expr.filter["ID"] = function (id) {
                    var attrId = id.replace(runescape, funescape);
                    return function (elem) {
                        var node = typeof elem.getAttributeNode !== "undefined" &&
                            elem.getAttributeNode("id");
                        return node && node.value === attrId;
                    };
                };
                Expr.find["ID"] = function (id, context) {
                    if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                        var node, i, elems, elem = context.getElementById(id);
                        if (elem) {
                            node = elem.getAttributeNode("id");
                            if (node && node.value === id) {
                                return [elem];
                            }
                            elems = context.getElementsByName(id);
                            i = 0;
                            while ((elem = elems[i++])) {
                                node = elem.getAttributeNode("id");
                                if (node && node.value === id) {
                                    return [elem];
                                }
                            }
                        }
                        return [];
                    }
                };
            }
            Expr.find["TAG"] = support.getElementsByTagName ?
                function (tag, context) {
                    if (typeof context.getElementsByTagName !== "undefined") {
                        return context.getElementsByTagName(tag);
                    }
                    else if (support.qsa) {
                        return context.querySelectorAll(tag);
                    }
                } :
                function (tag, context) {
                    var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                    if (tag === "*") {
                        while ((elem = results[i++])) {
                            if (elem.nodeType === 1) {
                                tmp.push(elem);
                            }
                        }
                        return tmp;
                    }
                    return results;
                };
            Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
                if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
                    return context.getElementsByClassName(className);
                }
            };
            rbuggyMatches = [];
            rbuggyQSA = [];
            if ((support.qsa = rnative.test(document.querySelectorAll))) {
                assert(function (el) {
                    docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" +
                        "<select id='" + expando + "-\r\\' msallowcapture=''>" +
                        "<option selected=''></option></select>";
                    if (el.querySelectorAll("[msallowcapture^='']").length) {
                        rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
                    }
                    if (!el.querySelectorAll("[selected]").length) {
                        rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                    }
                    if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
                        rbuggyQSA.push("~=");
                    }
                    if (!el.querySelectorAll(":checked").length) {
                        rbuggyQSA.push(":checked");
                    }
                    if (!el.querySelectorAll("a#" + expando + "+*").length) {
                        rbuggyQSA.push(".#.+[+~]");
                    }
                });
                assert(function (el) {
                    el.innerHTML = "<a href='' disabled='disabled'></a>" +
                        "<select disabled='disabled'><option/></select>";
                    var input = document.createElement("input");
                    input.setAttribute("type", "hidden");
                    el.appendChild(input).setAttribute("name", "D");
                    if (el.querySelectorAll("[name=d]").length) {
                        rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
                    }
                    if (el.querySelectorAll(":enabled").length !== 2) {
                        rbuggyQSA.push(":enabled", ":disabled");
                    }
                    docElem.appendChild(el).disabled = true;
                    if (el.querySelectorAll(":disabled").length !== 2) {
                        rbuggyQSA.push(":enabled", ":disabled");
                    }
                    el.querySelectorAll("*,:x");
                    rbuggyQSA.push(",.*:");
                });
            }
            if ((support.matchesSelector = rnative.test((matches = docElem.matches ||
                docElem.webkitMatchesSelector ||
                docElem.mozMatchesSelector ||
                docElem.oMatchesSelector ||
                docElem.msMatchesSelector)))) {
                assert(function (el) {
                    support.disconnectedMatch = matches.call(el, "*");
                    matches.call(el, "[s!='']:x");
                    rbuggyMatches.push("!=", pseudos);
                });
            }
            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
            rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
            hasCompare = rnative.test(docElem.compareDocumentPosition);
            contains = hasCompare || rnative.test(docElem.contains) ?
                function (a, b) {
                    var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
                    return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ?
                        adown.contains(bup) :
                        a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
                } :
                function (a, b) {
                    if (b) {
                        while ((b = b.parentNode)) {
                            if (b === a) {
                                return true;
                            }
                        }
                    }
                    return false;
                };
            sortOrder = hasCompare ?
                function (a, b) {
                    if (a === b) {
                        hasDuplicate = true;
                        return 0;
                    }
                    var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                    if (compare) {
                        return compare;
                    }
                    compare = (a.ownerDocument || a) === (b.ownerDocument || b) ?
                        a.compareDocumentPosition(b) :
                        1;
                    if (compare & 1 ||
                        (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
                        if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                            return -1;
                        }
                        if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                            return 1;
                        }
                        return sortInput ?
                            (indexOf(sortInput, a) - indexOf(sortInput, b)) :
                            0;
                    }
                    return compare & 4 ? -1 : 1;
                } :
                function (a, b) {
                    if (a === b) {
                        hasDuplicate = true;
                        return 0;
                    }
                    var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [a], bp = [b];
                    if (!aup || !bup) {
                        return a === document ? -1 :
                            b === document ? 1 :
                                aup ? -1 :
                                    bup ? 1 :
                                        sortInput ?
                                            (indexOf(sortInput, a) - indexOf(sortInput, b)) :
                                            0;
                    }
                    else if (aup === bup) {
                        return siblingCheck(a, b);
                    }
                    cur = a;
                    while ((cur = cur.parentNode)) {
                        ap.unshift(cur);
                    }
                    cur = b;
                    while ((cur = cur.parentNode)) {
                        bp.unshift(cur);
                    }
                    while (ap[i] === bp[i]) {
                        i++;
                    }
                    return i ?
                        siblingCheck(ap[i], bp[i]) :
                        ap[i] === preferredDoc ? -1 :
                            bp[i] === preferredDoc ? 1 :
                                0;
                };
            return document;
        };
        Sizzle.matches = function (expr, elements) {
            return Sizzle(expr, null, null, elements);
        };
        Sizzle.matchesSelector = function (elem, expr) {
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem);
            }
            if (support.matchesSelector && documentIsHTML &&
                !nonnativeSelectorCache[expr + " "] &&
                (!rbuggyMatches || !rbuggyMatches.test(expr)) &&
                (!rbuggyQSA || !rbuggyQSA.test(expr))) {
                try {
                    var ret = matches.call(elem, expr);
                    if (ret || support.disconnectedMatch ||
                        elem.document && elem.document.nodeType !== 11) {
                        return ret;
                    }
                }
                catch (e) {
                    nonnativeSelectorCache(expr, true);
                }
            }
            return Sizzle(expr, document, null, [elem]).length > 0;
        };
        Sizzle.contains = function (context, elem) {
            if ((context.ownerDocument || context) !== document) {
                setDocument(context);
            }
            return contains(context, elem);
        };
        Sizzle.attr = function (elem, name) {
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem);
            }
            var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ?
                fn(elem, name, !documentIsHTML) :
                undefined;
            return val !== undefined ?
                val :
                support.attributes || !documentIsHTML ?
                    elem.getAttribute(name) :
                    (val = elem.getAttributeNode(name)) && val.specified ?
                        val.value :
                        null;
        };
        Sizzle.escape = function (sel) {
            return (sel + "").replace(rcssescape, fcssescape);
        };
        Sizzle.error = function (msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        };
        Sizzle.uniqueSort = function (results) {
            var elem, duplicates = [], j = 0, i = 0;
            hasDuplicate = !support.detectDuplicates;
            sortInput = !support.sortStable && results.slice(0);
            results.sort(sortOrder);
            if (hasDuplicate) {
                while ((elem = results[i++])) {
                    if (elem === results[i]) {
                        j = duplicates.push(i);
                    }
                }
                while (j--) {
                    results.splice(duplicates[j], 1);
                }
            }
            sortInput = null;
            return results;
        };
        getText = Sizzle.getText = function (elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (!nodeType) {
                while ((node = elem[i++])) {
                    ret += getText(node);
                }
            }
            else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                if (typeof elem.textContent === "string") {
                    return elem.textContent;
                }
                else {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                        ret += getText(elem);
                    }
                }
            }
            else if (nodeType === 3 || nodeType === 4) {
                return elem.nodeValue;
            }
            return ret;
        };
        Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                ">": { dir: "parentNode", first: true },
                " ": { dir: "parentNode" },
                "+": { dir: "previousSibling", first: true },
                "~": { dir: "previousSibling" }
            },
            preFilter: {
                "ATTR": function (match) {
                    match[1] = match[1].replace(runescape, funescape);
                    match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
                    if (match[2] === "~=") {
                        match[3] = " " + match[3] + " ";
                    }
                    return match.slice(0, 4);
                },
                "CHILD": function (match) {
                    match[1] = match[1].toLowerCase();
                    if (match[1].slice(0, 3) === "nth") {
                        if (!match[3]) {
                            Sizzle.error(match[0]);
                        }
                        match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                        match[5] = +((match[7] + match[8]) || match[3] === "odd");
                    }
                    else if (match[3]) {
                        Sizzle.error(match[0]);
                    }
                    return match;
                },
                "PSEUDO": function (match) {
                    var excess, unquoted = !match[6] && match[2];
                    if (matchExpr["CHILD"].test(match[0])) {
                        return null;
                    }
                    if (match[3]) {
                        match[2] = match[4] || match[5] || "";
                    }
                    else if (unquoted && rpseudo.test(unquoted) &&
                        (excess = tokenize(unquoted, true)) &&
                        (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                        match[0] = match[0].slice(0, excess);
                        match[2] = unquoted.slice(0, excess);
                    }
                    return match.slice(0, 3);
                }
            },
            filter: {
                "TAG": function (nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return nodeNameSelector === "*" ?
                        function () { return true; } :
                        function (elem) {
                            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                        };
                },
                "CLASS": function (className) {
                    var pattern = classCache[className + " "];
                    return pattern ||
                        (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) &&
                            classCache(className, function (elem) {
                                return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
                            });
                },
                "ATTR": function (name, operator, check) {
                    return function (elem) {
                        var result = Sizzle.attr(elem, name);
                        if (result == null) {
                            return operator === "!=";
                        }
                        if (!operator) {
                            return true;
                        }
                        result += "";
                        return operator === "=" ? result === check :
                            operator === "!=" ? result !== check :
                                operator === "^=" ? check && result.indexOf(check) === 0 :
                                    operator === "*=" ? check && result.indexOf(check) > -1 :
                                        operator === "$=" ? check && result.slice(-check.length) === check :
                                            operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 :
                                                operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" :
                                                    false;
                    };
                },
                "CHILD": function (type, what, argument, first, last) {
                    var simple = type.slice(0, 3) !== "nth", forward = type.slice(-4) !== "last", ofType = what === "of-type";
                    return first === 1 && last === 0 ?
                        function (elem) {
                            return !!elem.parentNode;
                        } :
                        function (elem, context, xml) {
                            var cache, uniqueCache, outerCache, node, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
                            if (parent) {
                                if (simple) {
                                    while (dir) {
                                        node = elem;
                                        while ((node = node[dir])) {
                                            if (ofType ?
                                                node.nodeName.toLowerCase() === name :
                                                node.nodeType === 1) {
                                                return false;
                                            }
                                        }
                                        start = dir = type === "only" && !start && "nextSibling";
                                    }
                                    return true;
                                }
                                start = [forward ? parent.firstChild : parent.lastChild];
                                if (forward && useCache) {
                                    node = parent;
                                    outerCache = node[expando] || (node[expando] = {});
                                    uniqueCache = outerCache[node.uniqueID] ||
                                        (outerCache[node.uniqueID] = {});
                                    cache = uniqueCache[type] || [];
                                    nodeIndex = cache[0] === dirruns && cache[1];
                                    diff = nodeIndex && cache[2];
                                    node = nodeIndex && parent.childNodes[nodeIndex];
                                    while ((node = ++nodeIndex && node && node[dir] ||
                                        (diff = nodeIndex = 0) || start.pop())) {
                                        if (node.nodeType === 1 && ++diff && node === elem) {
                                            uniqueCache[type] = [dirruns, nodeIndex, diff];
                                            break;
                                        }
                                    }
                                }
                                else {
                                    if (useCache) {
                                        node = elem;
                                        outerCache = node[expando] || (node[expando] = {});
                                        uniqueCache = outerCache[node.uniqueID] ||
                                            (outerCache[node.uniqueID] = {});
                                        cache = uniqueCache[type] || [];
                                        nodeIndex = cache[0] === dirruns && cache[1];
                                        diff = nodeIndex;
                                    }
                                    if (diff === false) {
                                        while ((node = ++nodeIndex && node && node[dir] ||
                                            (diff = nodeIndex = 0) || start.pop())) {
                                            if ((ofType ?
                                                node.nodeName.toLowerCase() === name :
                                                node.nodeType === 1) &&
                                                ++diff) {
                                                if (useCache) {
                                                    outerCache = node[expando] || (node[expando] = {});
                                                    uniqueCache = outerCache[node.uniqueID] ||
                                                        (outerCache[node.uniqueID] = {});
                                                    uniqueCache[type] = [dirruns, diff];
                                                }
                                                if (node === elem) {
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                                diff -= last;
                                return diff === first || (diff % first === 0 && diff / first >= 0);
                            }
                        };
                },
                "PSEUDO": function (pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
                        Sizzle.error("unsupported pseudo: " + pseudo);
                    if (fn[expando]) {
                        return fn(argument);
                    }
                    if (fn.length > 1) {
                        args = [pseudo, pseudo, "", argument];
                        return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
                            markFunction(function (seed, matches) {
                                var idx, matched = fn(seed, argument), i = matched.length;
                                while (i--) {
                                    idx = indexOf(seed, matched[i]);
                                    seed[idx] = !(matches[idx] = matched[i]);
                                }
                            }) :
                            function (elem) {
                                return fn(elem, 0, args);
                            };
                    }
                    return fn;
                }
            },
            pseudos: {
                "not": markFunction(function (selector) {
                    var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ?
                        markFunction(function (seed, matches, context, xml) {
                            var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;
                            while (i--) {
                                if ((elem = unmatched[i])) {
                                    seed[i] = !(matches[i] = elem);
                                }
                            }
                        }) :
                        function (elem, context, xml) {
                            input[0] = elem;
                            matcher(input, null, xml, results);
                            input[0] = null;
                            return !results.pop();
                        };
                }),
                "has": markFunction(function (selector) {
                    return function (elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                "contains": markFunction(function (text) {
                    text = text.replace(runescape, funescape);
                    return function (elem) {
                        return (elem.textContent || getText(elem)).indexOf(text) > -1;
                    };
                }),
                "lang": markFunction(function (lang) {
                    if (!ridentifier.test(lang || "")) {
                        Sizzle.error("unsupported lang: " + lang);
                    }
                    lang = lang.replace(runescape, funescape).toLowerCase();
                    return function (elem) {
                        var elemLang;
                        do {
                            if ((elemLang = documentIsHTML ?
                                elem.lang :
                                elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {
                                elemLang = elemLang.toLowerCase();
                                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                            }
                        } while ((elem = elem.parentNode) && elem.nodeType === 1);
                        return false;
                    };
                }),
                "target": function (elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },
                "root": function (elem) {
                    return elem === docElem;
                },
                "focus": function (elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },
                "enabled": createDisabledPseudo(false),
                "disabled": createDisabledPseudo(true),
                "checked": function (elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                },
                "selected": function (elem) {
                    if (elem.parentNode) {
                        elem.parentNode.selectedIndex;
                    }
                    return elem.selected === true;
                },
                "empty": function (elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                        if (elem.nodeType < 6) {
                            return false;
                        }
                    }
                    return true;
                },
                "parent": function (elem) {
                    return !Expr.pseudos["empty"](elem);
                },
                "header": function (elem) {
                    return rheader.test(elem.nodeName);
                },
                "input": function (elem) {
                    return rinputs.test(elem.nodeName);
                },
                "button": function (elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === "button" || name === "button";
                },
                "text": function (elem) {
                    var attr;
                    return elem.nodeName.toLowerCase() === "input" &&
                        elem.type === "text" &&
                        ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
                },
                "first": createPositionalPseudo(function () {
                    return [0];
                }),
                "last": createPositionalPseudo(function (matchIndexes, length) {
                    return [length - 1];
                }),
                "eq": createPositionalPseudo(function (matchIndexes, length, argument) {
                    return [argument < 0 ? argument + length : argument];
                }),
                "even": createPositionalPseudo(function (matchIndexes, length) {
                    var i = 0;
                    for (; i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                "odd": createPositionalPseudo(function (matchIndexes, length) {
                    var i = 1;
                    for (; i < length; i += 2) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                "lt": createPositionalPseudo(function (matchIndexes, length, argument) {
                    var i = argument < 0 ?
                        argument + length :
                        argument > length ?
                            length :
                            argument;
                    for (; --i >= 0;) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                }),
                "gt": createPositionalPseudo(function (matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (; ++i < length;) {
                        matchIndexes.push(i);
                    }
                    return matchIndexes;
                })
            }
        };
        Expr.pseudos["nth"] = Expr.pseudos["eq"];
        for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
            Expr.pseudos[i] = createInputPseudo(i);
        }
        for (i in { submit: true, reset: true }) {
            Expr.pseudos[i] = createButtonPseudo(i);
        }
        function setFilters() { }
        setFilters.prototype = Expr.filters = Expr.pseudos;
        Expr.setFilters = new setFilters();
        tokenize = Sizzle.tokenize = function (selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) {
                return parseOnly ? 0 : cached.slice(0);
            }
            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;
            while (soFar) {
                if (!matched || (match = rcomma.exec(soFar))) {
                    if (match) {
                        soFar = soFar.slice(match[0].length) || soFar;
                    }
                    groups.push((tokens = []));
                }
                matched = false;
                if ((match = rcombinators.exec(soFar))) {
                    matched = match.shift();
                    tokens.push({
                        value: matched,
                        type: match[0].replace(rtrim, " ")
                    });
                    soFar = soFar.slice(matched.length);
                }
                for (type in Expr.filter) {
                    if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
                        (match = preFilters[type](match)))) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            type: type,
                            matches: match
                        });
                        soFar = soFar.slice(matched.length);
                    }
                }
                if (!matched) {
                    break;
                }
            }
            return parseOnly ?
                soFar.length :
                soFar ?
                    Sizzle.error(selector) :
                    tokenCache(selector, groups).slice(0);
        };
        function toSelector(tokens) {
            var i = 0, len = tokens.length, selector = "";
            for (; i < len; i++) {
                selector += tokens[i].value;
            }
            return selector;
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir, skip = combinator.next, key = skip || dir, checkNonElements = base && key === "parentNode", doneName = done++;
            return combinator.first ?
                function (elem, context, xml) {
                    while ((elem = elem[dir])) {
                        if (elem.nodeType === 1 || checkNonElements) {
                            return matcher(elem, context, xml);
                        }
                    }
                    return false;
                } :
                function (elem, context, xml) {
                    var oldCache, uniqueCache, outerCache, newCache = [dirruns, doneName];
                    if (xml) {
                        while ((elem = elem[dir])) {
                            if (elem.nodeType === 1 || checkNonElements) {
                                if (matcher(elem, context, xml)) {
                                    return true;
                                }
                            }
                        }
                    }
                    else {
                        while ((elem = elem[dir])) {
                            if (elem.nodeType === 1 || checkNonElements) {
                                outerCache = elem[expando] || (elem[expando] = {});
                                uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
                                if (skip && skip === elem.nodeName.toLowerCase()) {
                                    elem = elem[dir] || elem;
                                }
                                else if ((oldCache = uniqueCache[key]) &&
                                    oldCache[0] === dirruns && oldCache[1] === doneName) {
                                    return (newCache[2] = oldCache[2]);
                                }
                                else {
                                    uniqueCache[key] = newCache;
                                    if ((newCache[2] = matcher(elem, context, xml))) {
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                    return false;
                };
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ?
                function (elem, context, xml) {
                    var i = matchers.length;
                    while (i--) {
                        if (!matchers[i](elem, context, xml)) {
                            return false;
                        }
                    }
                    return true;
                } :
                matchers[0];
        }
        function multipleContexts(selector, contexts, results) {
            var i = 0, len = contexts.length;
            for (; i < len; i++) {
                Sizzle(selector, contexts[i], results);
            }
            return results;
        }
        function condense(unmatched, map, filter, context, xml) {
            var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = map != null;
            for (; i < len; i++) {
                if ((elem = unmatched[i])) {
                    if (!filter || filter(elem, context, xml)) {
                        newUnmatched.push(elem);
                        if (mapped) {
                            map.push(i);
                        }
                    }
                }
            }
            return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[expando]) {
                postFilter = setMatcher(postFilter);
            }
            if (postFinder && !postFinder[expando]) {
                postFinder = setMatcher(postFinder, postSelector);
            }
            return markFunction(function (seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []), matcherIn = preFilter && (seed || !selector) ?
                    condense(elems, preMap, preFilter, context, xml) :
                    elems, matcherOut = matcher ?
                    postFinder || (seed ? preFilter : preexisting || postFilter) ?
                        [] :
                        results :
                    matcherIn;
                if (matcher) {
                    matcher(matcherIn, matcherOut, context, xml);
                }
                if (postFilter) {
                    temp = condense(matcherOut, postMap);
                    postFilter(temp, [], context, xml);
                    i = temp.length;
                    while (i--) {
                        if ((elem = temp[i])) {
                            matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                        }
                    }
                }
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            temp = [];
                            i = matcherOut.length;
                            while (i--) {
                                if ((elem = matcherOut[i])) {
                                    temp.push((matcherIn[i] = elem));
                                }
                            }
                            postFinder(null, (matcherOut = []), temp, xml);
                        }
                        i = matcherOut.length;
                        while (i--) {
                            if ((elem = matcherOut[i]) &&
                                (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                                seed[temp] = !(results[temp] = elem);
                            }
                        }
                    }
                }
                else {
                    matcherOut = condense(matcherOut === results ?
                        matcherOut.splice(preexisting, matcherOut.length) :
                        matcherOut);
                    if (postFinder) {
                        postFinder(null, results, matcherOut, xml);
                    }
                    else {
                        push.apply(results, matcherOut);
                    }
                }
            });
        }
        function matcherFromTokens(tokens) {
            var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function (elem) {
                return elem === checkContext;
            }, implicitRelative, true), matchAnyContext = addCombinator(function (elem) {
                return indexOf(checkContext, elem) > -1;
            }, implicitRelative, true), matchers = [function (elem, context, xml) {
                    var ret = (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ?
                        matchContext(elem, context, xml) :
                        matchAnyContext(elem, context, xml));
                    checkContext = null;
                    return ret;
                }];
            for (; i < len; i++) {
                if ((matcher = Expr.relative[tokens[i].type])) {
                    matchers = [addCombinator(elementMatcher(matchers), matcher)];
                }
                else {
                    matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
                    if (matcher[expando]) {
                        j = ++i;
                        for (; j < len; j++) {
                            if (Expr.relative[tokens[j].type]) {
                                break;
                            }
                        }
                        return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens));
                    }
                    matchers.push(matcher);
                }
            }
            return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function (seed, context, xml, results, outermost) {
                var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find["TAG"]("*", outermost), dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1), len = elems.length;
                if (outermost) {
                    outermostContext = context === document || context || outermost;
                }
                for (; i !== len && (elem = elems[i]) != null; i++) {
                    if (byElement && elem) {
                        j = 0;
                        if (!context && elem.ownerDocument !== document) {
                            setDocument(elem);
                            xml = !documentIsHTML;
                        }
                        while ((matcher = elementMatchers[j++])) {
                            if (matcher(elem, context || document, xml)) {
                                results.push(elem);
                                break;
                            }
                        }
                        if (outermost) {
                            dirruns = dirrunsUnique;
                        }
                    }
                    if (bySet) {
                        if ((elem = !matcher && elem)) {
                            matchedCount--;
                        }
                        if (seed) {
                            unmatched.push(elem);
                        }
                    }
                }
                matchedCount += i;
                if (bySet && i !== matchedCount) {
                    j = 0;
                    while ((matcher = setMatchers[j++])) {
                        matcher(unmatched, setMatched, context, xml);
                    }
                    if (seed) {
                        if (matchedCount > 0) {
                            while (i--) {
                                if (!(unmatched[i] || setMatched[i])) {
                                    setMatched[i] = pop.call(results);
                                }
                            }
                        }
                        setMatched = condense(setMatched);
                    }
                    push.apply(results, setMatched);
                    if (outermost && !seed && setMatched.length > 0 &&
                        (matchedCount + setMatchers.length) > 1) {
                        Sizzle.uniqueSort(results);
                    }
                }
                if (outermost) {
                    dirruns = dirrunsUnique;
                    outermostContext = contextBackup;
                }
                return unmatched;
            };
            return bySet ?
                markFunction(superMatcher) :
                superMatcher;
        }
        compile = Sizzle.compile = function (selector, match) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
                if (!match) {
                    match = tokenize(selector);
                }
                i = match.length;
                while (i--) {
                    cached = matcherFromTokens(match[i]);
                    if (cached[expando]) {
                        setMatchers.push(cached);
                    }
                    else {
                        elementMatchers.push(cached);
                    }
                }
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
                cached.selector = selector;
            }
            return cached;
        };
        select = Sizzle.select = function (selector, context, results, seed) {
            var i, tokens, token, type, find, compiled = typeof selector === "function" && selector, match = !seed && tokenize((selector = compiled.selector || selector));
            results = results || [];
            if (match.length === 1) {
                tokens = match[0] = match[0].slice(0);
                if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                    context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                    context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
                    if (!context) {
                        return results;
                    }
                    else if (compiled) {
                        context = context.parentNode;
                    }
                    selector = selector.slice(tokens.shift().value.length);
                }
                i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
                while (i--) {
                    token = tokens[i];
                    if (Expr.relative[(type = token.type)]) {
                        break;
                    }
                    if ((find = Expr.find[type])) {
                        if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                            tokens.splice(i, 1);
                            selector = seed.length && toSelector(tokens);
                            if (!selector) {
                                push.apply(results, seed);
                                return results;
                            }
                            break;
                        }
                    }
                }
            }
            (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
            return results;
        };
        support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
        support.detectDuplicates = !!hasDuplicate;
        setDocument();
        support.sortDetached = assert(function (el) {
            return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
        });
        if (!assert(function (el) {
            el.innerHTML = "<a href='#'></a>";
            return el.firstChild.getAttribute("href") === "#";
        })) {
            addHandle("type|href|height|width", function (elem, name, isXML) {
                if (!isXML) {
                    return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
                }
            });
        }
        if (!support.attributes || !assert(function (el) {
            el.innerHTML = "<input/>";
            el.firstChild.setAttribute("value", "");
            return el.firstChild.getAttribute("value") === "";
        })) {
            addHandle("value", function (elem, name, isXML) {
                if (!isXML && elem.nodeName.toLowerCase() === "input") {
                    return elem.defaultValue;
                }
            });
        }
        if (!assert(function (el) {
            return el.getAttribute("disabled") == null;
        })) {
            addHandle(booleans, function (elem, name, isXML) {
                var val;
                if (!isXML) {
                    return elem[name] === true ? name.toLowerCase() :
                        (val = elem.getAttributeNode(name)) && val.specified ?
                            val.value :
                            null;
                }
            });
        }
        return Sizzle;
    })(window);
    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[":"] = jQuery.expr.pseudos;
    jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
    jQuery.escapeSelector = Sizzle.escape;
    var dir = function (elem, dir, until) {
        var matched = [], truncate = until !== undefined;
        while ((elem = elem[dir]) && elem.nodeType !== 9) {
            if (elem.nodeType === 1) {
                if (truncate && jQuery(elem).is(until)) {
                    break;
                }
                matched.push(elem);
            }
        }
        return matched;
    };
    var siblings = function (n, elem) {
        var matched = [];
        for (; n; n = n.nextSibling) {
            if (n.nodeType === 1 && n !== elem) {
                matched.push(n);
            }
        }
        return matched;
    };
    var rneedsContext = jQuery.expr.match.needsContext;
    function nodeName(elem, name) {
        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    }
    ;
    var rsingleTag = (/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i);
    function winnow(elements, qualifier, not) {
        if (isFunction(qualifier)) {
            return jQuery.grep(elements, function (elem, i) {
                return !!qualifier.call(elem, i, elem) !== not;
            });
        }
        if (qualifier.nodeType) {
            return jQuery.grep(elements, function (elem) {
                return (elem === qualifier) !== not;
            });
        }
        if (typeof qualifier !== "string") {
            return jQuery.grep(elements, function (elem) {
                return (indexOf.call(qualifier, elem) > -1) !== not;
            });
        }
        return jQuery.filter(qualifier, elements, not);
    }
    jQuery.filter = function (expr, elems, not) {
        var elem = elems[0];
        if (not) {
            expr = ":not(" + expr + ")";
        }
        if (elems.length === 1 && elem.nodeType === 1) {
            return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
        }
        return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
            return elem.nodeType === 1;
        }));
    };
    jQuery.fn.extend({
        find: function (selector) {
            var i, ret, len = this.length, self = this;
            if (typeof selector !== "string") {
                return this.pushStack(jQuery(selector).filter(function () {
                    for (i = 0; i < len; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true;
                        }
                    }
                }));
            }
            ret = this.pushStack([]);
            for (i = 0; i < len; i++) {
                jQuery.find(selector, self[i], ret);
            }
            return len > 1 ? jQuery.uniqueSort(ret) : ret;
        },
        filter: function (selector) {
            return this.pushStack(winnow(this, selector || [], false));
        },
        not: function (selector) {
            return this.pushStack(winnow(this, selector || [], true));
        },
        is: function (selector) {
            return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ?
                jQuery(selector) :
                selector || [], false).length;
        }
    });
    var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, init = jQuery.fn.init = function (selector, context, root) {
        var match, elem;
        if (!selector) {
            return this;
        }
        root = root || rootjQuery;
        if (typeof selector === "string") {
            if (selector[0] === "<" &&
                selector[selector.length - 1] === ">" &&
                selector.length >= 3) {
                match = [null, selector, null];
            }
            else {
                match = rquickExpr.exec(selector);
            }
            if (match && (match[1] || !context)) {
                if (match[1]) {
                    context = context instanceof jQuery ? context[0] : context;
                    jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
                    if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                        for (match in context) {
                            if (isFunction(this[match])) {
                                this[match](context[match]);
                            }
                            else {
                                this.attr(match, context[match]);
                            }
                        }
                    }
                    return this;
                }
                else {
                    elem = document.getElementById(match[2]);
                    if (elem) {
                        this[0] = elem;
                        this.length = 1;
                    }
                    return this;
                }
            }
            else if (!context || context.jquery) {
                return (context || root).find(selector);
            }
            else {
                return this.constructor(context).find(selector);
            }
        }
        else if (selector.nodeType) {
            this[0] = selector;
            this.length = 1;
            return this;
        }
        else if (isFunction(selector)) {
            return root.ready !== undefined ?
                root.ready(selector) :
                selector(jQuery);
        }
        return jQuery.makeArray(selector, this);
    };
    init.prototype = jQuery.fn;
    rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
    };
    jQuery.fn.extend({
        has: function (target) {
            var targets = jQuery(target, this), l = targets.length;
            return this.filter(function () {
                var i = 0;
                for (; i < l; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true;
                    }
                }
            });
        },
        closest: function (selectors, context) {
            var cur, i = 0, l = this.length, matched = [], targets = typeof selectors !== "string" && jQuery(selectors);
            if (!rneedsContext.test(selectors)) {
                for (; i < l; i++) {
                    for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                        if (cur.nodeType < 11 && (targets ?
                            targets.index(cur) > -1 :
                            cur.nodeType === 1 &&
                                jQuery.find.matchesSelector(cur, selectors))) {
                            matched.push(cur);
                            break;
                        }
                    }
                }
            }
            return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
        },
        index: function (elem) {
            if (!elem) {
                return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
            }
            if (typeof elem === "string") {
                return indexOf.call(jQuery(elem), this[0]);
            }
            return indexOf.call(this, elem.jquery ? elem[0] : elem);
        },
        add: function (selector, context) {
            return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
        },
        addBack: function (selector) {
            return this.add(selector == null ?
                this.prevObject : this.prevObject.filter(selector));
        }
    });
    function sibling(cur, dir) {
        while ((cur = cur[dir]) && cur.nodeType !== 1) { }
        return cur;
    }
    jQuery.each({
        parent: function (elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function (elem) {
            return dir(elem, "parentNode");
        },
        parentsUntil: function (elem, i, until) {
            return dir(elem, "parentNode", until);
        },
        next: function (elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function (elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function (elem) {
            return dir(elem, "nextSibling");
        },
        prevAll: function (elem) {
            return dir(elem, "previousSibling");
        },
        nextUntil: function (elem, i, until) {
            return dir(elem, "nextSibling", until);
        },
        prevUntil: function (elem, i, until) {
            return dir(elem, "previousSibling", until);
        },
        siblings: function (elem) {
            return siblings((elem.parentNode || {}).firstChild, elem);
        },
        children: function (elem) {
            return siblings(elem.firstChild);
        },
        contents: function (elem) {
            if (typeof elem.contentDocument !== "undefined") {
                return elem.contentDocument;
            }
            if (nodeName(elem, "template")) {
                elem = elem.content || elem;
            }
            return jQuery.merge([], elem.childNodes);
        }
    }, function (name, fn) {
        jQuery.fn[name] = function (until, selector) {
            var matched = jQuery.map(this, fn, until);
            if (name.slice(-5) !== "Until") {
                selector = until;
            }
            if (selector && typeof selector === "string") {
                matched = jQuery.filter(selector, matched);
            }
            if (this.length > 1) {
                if (!guaranteedUnique[name]) {
                    jQuery.uniqueSort(matched);
                }
                if (rparentsprev.test(name)) {
                    matched.reverse();
                }
            }
            return this.pushStack(matched);
        };
    });
    var rnothtmlwhite = (/[^\x20\t\r\n\f]+/g);
    function createOptions(options) {
        var object = {};
        jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
            object[flag] = true;
        });
        return object;
    }
    jQuery.Callbacks = function (options) {
        options = typeof options === "string" ?
            createOptions(options) :
            jQuery.extend({}, options);
        var firing, memory, fired, locked, list = [], queue = [], firingIndex = -1, fire = function () {
            locked = locked || options.once;
            fired = firing = true;
            for (; queue.length; firingIndex = -1) {
                memory = queue.shift();
                while (++firingIndex < list.length) {
                    if (list[firingIndex].apply(memory[0], memory[1]) === false &&
                        options.stopOnFalse) {
                        firingIndex = list.length;
                        memory = false;
                    }
                }
            }
            if (!options.memory) {
                memory = false;
            }
            firing = false;
            if (locked) {
                if (memory) {
                    list = [];
                }
                else {
                    list = "";
                }
            }
        }, self = {
            add: function () {
                if (list) {
                    if (memory && !firing) {
                        firingIndex = list.length - 1;
                        queue.push(memory);
                    }
                    (function add(args) {
                        jQuery.each(args, function (_, arg) {
                            if (isFunction(arg)) {
                                if (!options.unique || !self.has(arg)) {
                                    list.push(arg);
                                }
                            }
                            else if (arg && arg.length && toType(arg) !== "string") {
                                add(arg);
                            }
                        });
                    })(arguments);
                    if (memory && !firing) {
                        fire();
                    }
                }
                return this;
            },
            remove: function () {
                jQuery.each(arguments, function (_, arg) {
                    var index;
                    while ((index = jQuery.inArray(arg, list, index)) > -1) {
                        list.splice(index, 1);
                        if (index <= firingIndex) {
                            firingIndex--;
                        }
                    }
                });
                return this;
            },
            has: function (fn) {
                return fn ?
                    jQuery.inArray(fn, list) > -1 :
                    list.length > 0;
            },
            empty: function () {
                if (list) {
                    list = [];
                }
                return this;
            },
            disable: function () {
                locked = queue = [];
                list = memory = "";
                return this;
            },
            disabled: function () {
                return !list;
            },
            lock: function () {
                locked = queue = [];
                if (!memory && !firing) {
                    list = memory = "";
                }
                return this;
            },
            locked: function () {
                return !!locked;
            },
            fireWith: function (context, args) {
                if (!locked) {
                    args = args || [];
                    args = [context, args.slice ? args.slice() : args];
                    queue.push(args);
                    if (!firing) {
                        fire();
                    }
                }
                return this;
            },
            fire: function () {
                self.fireWith(this, arguments);
                return this;
            },
            fired: function () {
                return !!fired;
            }
        };
        return self;
    };
    function Identity(v) {
        return v;
    }
    function Thrower(ex) {
        throw ex;
    }
    function adoptValue(value, resolve, reject, noValue) {
        var method;
        try {
            if (value && isFunction((method = value.promise))) {
                method.call(value).done(resolve).fail(reject);
            }
            else if (value && isFunction((method = value.then))) {
                method.call(value, resolve, reject);
            }
            else {
                resolve.apply(undefined, [value].slice(noValue));
            }
        }
        catch (value) {
            reject.apply(undefined, [value]);
        }
    }
    jQuery.extend({
        Deferred: function (func) {
            var tuples = [
                ["notify", "progress", jQuery.Callbacks("memory"),
                    jQuery.Callbacks("memory"), 2],
                ["resolve", "done", jQuery.Callbacks("once memory"),
                    jQuery.Callbacks("once memory"), 0, "resolved"],
                ["reject", "fail", jQuery.Callbacks("once memory"),
                    jQuery.Callbacks("once memory"), 1, "rejected"]
            ], state = "pending", promise = {
                state: function () {
                    return state;
                },
                always: function () {
                    deferred.done(arguments).fail(arguments);
                    return this;
                },
                "catch": function (fn) {
                    return promise.then(null, fn);
                },
                pipe: function () {
                    var fns = arguments;
                    return jQuery.Deferred(function (newDefer) {
                        jQuery.each(tuples, function (i, tuple) {
                            var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];
                            deferred[tuple[1]](function () {
                                var returned = fn && fn.apply(this, arguments);
                                if (returned && isFunction(returned.promise)) {
                                    returned.promise()
                                        .progress(newDefer.notify)
                                        .done(newDefer.resolve)
                                        .fail(newDefer.reject);
                                }
                                else {
                                    newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
                                }
                            });
                        });
                        fns = null;
                    }).promise();
                },
                then: function (onFulfilled, onRejected, onProgress) {
                    var maxDepth = 0;
                    function resolve(depth, deferred, handler, special) {
                        return function () {
                            var that = this, args = arguments, mightThrow = function () {
                                var returned, then;
                                if (depth < maxDepth) {
                                    return;
                                }
                                returned = handler.apply(that, args);
                                if (returned === deferred.promise()) {
                                    throw new TypeError("Thenable self-resolution");
                                }
                                then = returned &&
                                    (typeof returned === "object" ||
                                        typeof returned === "function") &&
                                    returned.then;
                                if (isFunction(then)) {
                                    if (special) {
                                        then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special));
                                    }
                                    else {
                                        maxDepth++;
                                        then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
                                    }
                                }
                                else {
                                    if (handler !== Identity) {
                                        that = undefined;
                                        args = [returned];
                                    }
                                    (special || deferred.resolveWith)(that, args);
                                }
                            }, process = special ?
                                mightThrow :
                                function () {
                                    try {
                                        mightThrow();
                                    }
                                    catch (e) {
                                        if (jQuery.Deferred.exceptionHook) {
                                            jQuery.Deferred.exceptionHook(e, process.stackTrace);
                                        }
                                        if (depth + 1 >= maxDepth) {
                                            if (handler !== Thrower) {
                                                that = undefined;
                                                args = [e];
                                            }
                                            deferred.rejectWith(that, args);
                                        }
                                    }
                                };
                            if (depth) {
                                process();
                            }
                            else {
                                if (jQuery.Deferred.getStackHook) {
                                    process.stackTrace = jQuery.Deferred.getStackHook();
                                }
                                window.setTimeout(process);
                            }
                        };
                    }
                    return jQuery.Deferred(function (newDefer) {
                        tuples[0][3].add(resolve(0, newDefer, isFunction(onProgress) ?
                            onProgress :
                            Identity, newDefer.notifyWith));
                        tuples[1][3].add(resolve(0, newDefer, isFunction(onFulfilled) ?
                            onFulfilled :
                            Identity));
                        tuples[2][3].add(resolve(0, newDefer, isFunction(onRejected) ?
                            onRejected :
                            Thrower));
                    }).promise();
                },
                promise: function (obj) {
                    return obj != null ? jQuery.extend(obj, promise) : promise;
                }
            }, deferred = {};
            jQuery.each(tuples, function (i, tuple) {
                var list = tuple[2], stateString = tuple[5];
                promise[tuple[1]] = list.add;
                if (stateString) {
                    list.add(function () {
                        state = stateString;
                    }, tuples[3 - i][2].disable, tuples[3 - i][3].disable, tuples[0][2].lock, tuples[0][3].lock);
                }
                list.add(tuple[3].fire);
                deferred[tuple[0]] = function () {
                    deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
                    return this;
                };
                deferred[tuple[0] + "With"] = list.fireWith;
            });
            promise.promise(deferred);
            if (func) {
                func.call(deferred, deferred);
            }
            return deferred;
        },
        when: function (singleValue) {
            var remaining = arguments.length, i = remaining, resolveContexts = Array(i), resolveValues = slice.call(arguments), master = jQuery.Deferred(), updateFunc = function (i) {
                return function (value) {
                    resolveContexts[i] = this;
                    resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;
                    if (!(--remaining)) {
                        master.resolveWith(resolveContexts, resolveValues);
                    }
                };
            };
            if (remaining <= 1) {
                adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject, !remaining);
                if (master.state() === "pending" ||
                    isFunction(resolveValues[i] && resolveValues[i].then)) {
                    return master.then();
                }
            }
            while (i--) {
                adoptValue(resolveValues[i], updateFunc(i), master.reject);
            }
            return master.promise();
        }
    });
    var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    jQuery.Deferred.exceptionHook = function (error, stack) {
        if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
            window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
        }
    };
    jQuery.readyException = function (error) {
        window.setTimeout(function () {
            throw error;
        });
    };
    var readyList = jQuery.Deferred();
    jQuery.fn.ready = function (fn) {
        readyList
            .then(fn)
            .catch(function (error) {
            jQuery.readyException(error);
        });
        return this;
    };
    jQuery.extend({
        isReady: false,
        readyWait: 1,
        ready: function (wait) {
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                return;
            }
            jQuery.isReady = true;
            if (wait !== true && --jQuery.readyWait > 0) {
                return;
            }
            readyList.resolveWith(document, [jQuery]);
        }
    });
    jQuery.ready.then = readyList.then;
    function completed() {
        document.removeEventListener("DOMContentLoaded", completed);
        window.removeEventListener("load", completed);
        jQuery.ready();
    }
    if (document.readyState === "complete" ||
        (document.readyState !== "loading" && !document.documentElement.doScroll)) {
        window.setTimeout(jQuery.ready);
    }
    else {
        document.addEventListener("DOMContentLoaded", completed);
        window.addEventListener("load", completed);
    }
    var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0, len = elems.length, bulk = key == null;
        if (toType(key) === "object") {
            chainable = true;
            for (i in key) {
                access(elems, fn, i, key[i], true, emptyGet, raw);
            }
        }
        else if (value !== undefined) {
            chainable = true;
            if (!isFunction(value)) {
                raw = true;
            }
            if (bulk) {
                if (raw) {
                    fn.call(elems, value);
                    fn = null;
                }
                else {
                    bulk = fn;
                    fn = function (elem, key, value) {
                        return bulk.call(jQuery(elem), value);
                    };
                }
            }
            if (fn) {
                for (; i < len; i++) {
                    fn(elems[i], key, raw ?
                        value :
                        value.call(elems[i], i, fn(elems[i], key)));
                }
            }
        }
        if (chainable) {
            return elems;
        }
        if (bulk) {
            return fn.call(elems);
        }
        return len ? fn(elems[0], key) : emptyGet;
    };
    var rmsPrefix = /^-ms-/, rdashAlpha = /-([a-z])/g;
    function fcamelCase(all, letter) {
        return letter.toUpperCase();
    }
    function camelCase(string) {
        return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    }
    var acceptData = function (owner) {
        return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType);
    };
    function Data() {
        this.expando = jQuery.expando + Data.uid++;
    }
    Data.uid = 1;
    Data.prototype = {
        cache: function (owner) {
            var value = owner[this.expando];
            if (!value) {
                value = {};
                if (acceptData(owner)) {
                    if (owner.nodeType) {
                        owner[this.expando] = value;
                    }
                    else {
                        Object.defineProperty(owner, this.expando, {
                            value: value,
                            configurable: true
                        });
                    }
                }
            }
            return value;
        },
        set: function (owner, data, value) {
            var prop, cache = this.cache(owner);
            if (typeof data === "string") {
                cache[camelCase(data)] = value;
            }
            else {
                for (prop in data) {
                    cache[camelCase(prop)] = data[prop];
                }
            }
            return cache;
        },
        get: function (owner, key) {
            return key === undefined ?
                this.cache(owner) :
                owner[this.expando] && owner[this.expando][camelCase(key)];
        },
        access: function (owner, key, value) {
            if (key === undefined ||
                ((key && typeof key === "string") && value === undefined)) {
                return this.get(owner, key);
            }
            this.set(owner, key, value);
            return value !== undefined ? value : key;
        },
        remove: function (owner, key) {
            var i, cache = owner[this.expando];
            if (cache === undefined) {
                return;
            }
            if (key !== undefined) {
                if (Array.isArray(key)) {
                    key = key.map(camelCase);
                }
                else {
                    key = camelCase(key);
                    key = key in cache ?
                        [key] :
                        (key.match(rnothtmlwhite) || []);
                }
                i = key.length;
                while (i--) {
                    delete cache[key[i]];
                }
            }
            if (key === undefined || jQuery.isEmptyObject(cache)) {
                if (owner.nodeType) {
                    owner[this.expando] = undefined;
                }
                else {
                    delete owner[this.expando];
                }
            }
        },
        hasData: function (owner) {
            var cache = owner[this.expando];
            return cache !== undefined && !jQuery.isEmptyObject(cache);
        }
    };
    var dataPriv = new Data();
    var dataUser = new Data();
    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /[A-Z]/g;
    function getData(data) {
        if (data === "true") {
            return true;
        }
        if (data === "false") {
            return false;
        }
        if (data === "null") {
            return null;
        }
        if (data === +data + "") {
            return +data;
        }
        if (rbrace.test(data)) {
            return JSON.parse(data);
        }
        return data;
    }
    function dataAttr(elem, key, data) {
        var name;
        if (data === undefined && elem.nodeType === 1) {
            name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
            data = elem.getAttribute(name);
            if (typeof data === "string") {
                try {
                    data = getData(data);
                }
                catch (e) { }
                dataUser.set(elem, key, data);
            }
            else {
                data = undefined;
            }
        }
        return data;
    }
    jQuery.extend({
        hasData: function (elem) {
            return dataUser.hasData(elem) || dataPriv.hasData(elem);
        },
        data: function (elem, name, data) {
            return dataUser.access(elem, name, data);
        },
        removeData: function (elem, name) {
            dataUser.remove(elem, name);
        },
        _data: function (elem, name, data) {
            return dataPriv.access(elem, name, data);
        },
        _removeData: function (elem, name) {
            dataPriv.remove(elem, name);
        }
    });
    jQuery.fn.extend({
        data: function (key, value) {
            var i, name, data, elem = this[0], attrs = elem && elem.attributes;
            if (key === undefined) {
                if (this.length) {
                    data = dataUser.get(elem);
                    if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
                        i = attrs.length;
                        while (i--) {
                            if (attrs[i]) {
                                name = attrs[i].name;
                                if (name.indexOf("data-") === 0) {
                                    name = camelCase(name.slice(5));
                                    dataAttr(elem, name, data[name]);
                                }
                            }
                        }
                        dataPriv.set(elem, "hasDataAttrs", true);
                    }
                }
                return data;
            }
            if (typeof key === "object") {
                return this.each(function () {
                    dataUser.set(this, key);
                });
            }
            return access(this, function (value) {
                var data;
                if (elem && value === undefined) {
                    data = dataUser.get(elem, key);
                    if (data !== undefined) {
                        return data;
                    }
                    data = dataAttr(elem, key);
                    if (data !== undefined) {
                        return data;
                    }
                    return;
                }
                this.each(function () {
                    dataUser.set(this, key, value);
                });
            }, null, value, arguments.length > 1, null, true);
        },
        removeData: function (key) {
            return this.each(function () {
                dataUser.remove(this, key);
            });
        }
    });
    jQuery.extend({
        queue: function (elem, type, data) {
            var queue;
            if (elem) {
                type = (type || "fx") + "queue";
                queue = dataPriv.get(elem, type);
                if (data) {
                    if (!queue || Array.isArray(data)) {
                        queue = dataPriv.access(elem, type, jQuery.makeArray(data));
                    }
                    else {
                        queue.push(data);
                    }
                }
                return queue || [];
            }
        },
        dequeue: function (elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function () {
                jQuery.dequeue(elem, type);
            };
            if (fn === "inprogress") {
                fn = queue.shift();
                startLength--;
            }
            if (fn) {
                if (type === "fx") {
                    queue.unshift("inprogress");
                }
                delete hooks.stop;
                fn.call(elem, next, hooks);
            }
            if (!startLength && hooks) {
                hooks.empty.fire();
            }
        },
        _queueHooks: function (elem, type) {
            var key = type + "queueHooks";
            return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function () {
                    dataPriv.remove(elem, [type + "queue", key]);
                })
            });
        }
    });
    jQuery.fn.extend({
        queue: function (type, data) {
            var setter = 2;
            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--;
            }
            if (arguments.length < setter) {
                return jQuery.queue(this[0], type);
            }
            return data === undefined ?
                this :
                this.each(function () {
                    var queue = jQuery.queue(this, type, data);
                    jQuery._queueHooks(this, type);
                    if (type === "fx" && queue[0] !== "inprogress") {
                        jQuery.dequeue(this, type);
                    }
                });
        },
        dequeue: function (type) {
            return this.each(function () {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function (type) {
            return this.queue(type || "fx", []);
        },
        promise: function (type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function () {
                if (!(--count)) {
                    defer.resolveWith(elements, [elements]);
                }
            };
            if (typeof type !== "string") {
                obj = type;
                type = undefined;
            }
            type = type || "fx";
            while (i--) {
                tmp = dataPriv.get(elements[i], type + "queueHooks");
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve);
                }
            }
            resolve();
            return defer.promise(obj);
        }
    });
    var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
    var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
    var cssExpand = ["Top", "Right", "Bottom", "Left"];
    var documentElement = document.documentElement;
    var isAttached = function (elem) {
        return jQuery.contains(elem.ownerDocument, elem);
    }, composed = { composed: true };
    if (documentElement.getRootNode) {
        isAttached = function (elem) {
            return jQuery.contains(elem.ownerDocument, elem) ||
                elem.getRootNode(composed) === elem.ownerDocument;
        };
    }
    var isHiddenWithinTree = function (elem, el) {
        elem = el || elem;
        return elem.style.display === "none" ||
            elem.style.display === "" &&
                isAttached(elem) &&
                jQuery.css(elem, "display") === "none";
    };
    var swap = function (elem, options, callback, args) {
        var ret, name, old = {};
        for (name in options) {
            old[name] = elem.style[name];
            elem.style[name] = options[name];
        }
        ret = callback.apply(elem, args || []);
        for (name in options) {
            elem.style[name] = old[name];
        }
        return ret;
    };
    function adjustCSS(elem, prop, valueParts, tween) {
        var adjusted, scale, maxIterations = 20, currentValue = tween ?
            function () {
                return tween.cur();
            } :
            function () {
                return jQuery.css(elem, prop, "");
            }, initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"), initialInUnit = elem.nodeType &&
            (jQuery.cssNumber[prop] || unit !== "px" && +initial) &&
            rcssNum.exec(jQuery.css(elem, prop));
        if (initialInUnit && initialInUnit[3] !== unit) {
            initial = initial / 2;
            unit = unit || initialInUnit[3];
            initialInUnit = +initial || 1;
            while (maxIterations--) {
                jQuery.style(elem, prop, initialInUnit + unit);
                if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
                    maxIterations = 0;
                }
                initialInUnit = initialInUnit / scale;
            }
            initialInUnit = initialInUnit * 2;
            jQuery.style(elem, prop, initialInUnit + unit);
            valueParts = valueParts || [];
        }
        if (valueParts) {
            initialInUnit = +initialInUnit || +initial || 0;
            adjusted = valueParts[1] ?
                initialInUnit + (valueParts[1] + 1) * valueParts[2] :
                +valueParts[2];
            if (tween) {
                tween.unit = unit;
                tween.start = initialInUnit;
                tween.end = adjusted;
            }
        }
        return adjusted;
    }
    var defaultDisplayMap = {};
    function getDefaultDisplay(elem) {
        var temp, doc = elem.ownerDocument, nodeName = elem.nodeName, display = defaultDisplayMap[nodeName];
        if (display) {
            return display;
        }
        temp = doc.body.appendChild(doc.createElement(nodeName));
        display = jQuery.css(temp, "display");
        temp.parentNode.removeChild(temp);
        if (display === "none") {
            display = "block";
        }
        defaultDisplayMap[nodeName] = display;
        return display;
    }
    function showHide(elements, show) {
        var display, elem, values = [], index = 0, length = elements.length;
        for (; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }
            display = elem.style.display;
            if (show) {
                if (display === "none") {
                    values[index] = dataPriv.get(elem, "display") || null;
                    if (!values[index]) {
                        elem.style.display = "";
                    }
                }
                if (elem.style.display === "" && isHiddenWithinTree(elem)) {
                    values[index] = getDefaultDisplay(elem);
                }
            }
            else {
                if (display !== "none") {
                    values[index] = "none";
                    dataPriv.set(elem, "display", display);
                }
            }
        }
        for (index = 0; index < length; index++) {
            if (values[index] != null) {
                elements[index].style.display = values[index];
            }
        }
        return elements;
    }
    jQuery.fn.extend({
        show: function () {
            return showHide(this, true);
        },
        hide: function () {
            return showHide(this);
        },
        toggle: function (state) {
            if (typeof state === "boolean") {
                return state ? this.show() : this.hide();
            }
            return this.each(function () {
                if (isHiddenWithinTree(this)) {
                    jQuery(this).show();
                }
                else {
                    jQuery(this).hide();
                }
            });
        }
    });
    var rcheckableType = (/^(?:checkbox|radio)$/i);
    var rtagName = (/<([a-z][^\/\0>\x20\t\r\n\f]*)/i);
    var rscriptType = (/^$|^module$|\/(?:java|ecma)script/i);
    var wrapMap = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    function getAll(context, tag) {
        var ret;
        if (typeof context.getElementsByTagName !== "undefined") {
            ret = context.getElementsByTagName(tag || "*");
        }
        else if (typeof context.querySelectorAll !== "undefined") {
            ret = context.querySelectorAll(tag || "*");
        }
        else {
            ret = [];
        }
        if (tag === undefined || tag && nodeName(context, tag)) {
            return jQuery.merge([context], ret);
        }
        return ret;
    }
    function setGlobalEval(elems, refElements) {
        var i = 0, l = elems.length;
        for (; i < l; i++) {
            dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
        }
    }
    var rhtml = /<|&#?\w+;/;
    function buildFragment(elems, context, scripts, selection, ignored) {
        var elem, tmp, tag, wrap, attached, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length;
        for (; i < l; i++) {
            elem = elems[i];
            if (elem || elem === 0) {
                if (toType(elem) === "object") {
                    jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
                }
                else if (!rhtml.test(elem)) {
                    nodes.push(context.createTextNode(elem));
                }
                else {
                    tmp = tmp || fragment.appendChild(context.createElement("div"));
                    tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                    wrap = wrapMap[tag] || wrapMap._default;
                    tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
                    j = wrap[0];
                    while (j--) {
                        tmp = tmp.lastChild;
                    }
                    jQuery.merge(nodes, tmp.childNodes);
                    tmp = fragment.firstChild;
                    tmp.textContent = "";
                }
            }
        }
        fragment.textContent = "";
        i = 0;
        while ((elem = nodes[i++])) {
            if (selection && jQuery.inArray(elem, selection) > -1) {
                if (ignored) {
                    ignored.push(elem);
                }
                continue;
            }
            attached = isAttached(elem);
            tmp = getAll(fragment.appendChild(elem), "script");
            if (attached) {
                setGlobalEval(tmp);
            }
            if (scripts) {
                j = 0;
                while ((elem = tmp[j++])) {
                    if (rscriptType.test(elem.type || "")) {
                        scripts.push(elem);
                    }
                }
            }
        }
        return fragment;
    }
    (function () {
        var fragment = document.createDocumentFragment(), div = fragment.appendChild(document.createElement("div")), input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("checked", "checked");
        input.setAttribute("name", "t");
        div.appendChild(input);
        support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
    })();
    var rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
    function returnTrue() {
        return true;
    }
    function returnFalse() {
        return false;
    }
    function expectSync(elem, type) {
        return (elem === safeActiveElement()) === (type === "focus");
    }
    function safeActiveElement() {
        try {
            return document.activeElement;
        }
        catch (err) { }
    }
    function on(elem, types, selector, data, fn, one) {
        var origFn, type;
        if (typeof types === "object") {
            if (typeof selector !== "string") {
                data = data || selector;
                selector = undefined;
            }
            for (type in types) {
                on(elem, type, selector, data, types[type], one);
            }
            return elem;
        }
        if (data == null && fn == null) {
            fn = selector;
            data = selector = undefined;
        }
        else if (fn == null) {
            if (typeof selector === "string") {
                fn = data;
                data = undefined;
            }
            else {
                fn = data;
                data = selector;
                selector = undefined;
            }
        }
        if (fn === false) {
            fn = returnFalse;
        }
        else if (!fn) {
            return elem;
        }
        if (one === 1) {
            origFn = fn;
            fn = function (event) {
                jQuery().off(event);
                return origFn.apply(this, arguments);
            };
            fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
        }
        return elem.each(function () {
            jQuery.event.add(this, types, fn, data, selector);
        });
    }
    jQuery.event = {
        global: {},
        add: function (elem, types, handler, data, selector) {
            var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
            if (!elemData) {
                return;
            }
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }
            if (selector) {
                jQuery.find.matchesSelector(documentElement, selector);
            }
            if (!handler.guid) {
                handler.guid = jQuery.guid++;
            }
            if (!(events = elemData.events)) {
                events = elemData.events = {};
            }
            if (!(eventHandle = elemData.handle)) {
                eventHandle = elemData.handle = function (e) {
                    return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
                        jQuery.event.dispatch.apply(elem, arguments) : undefined;
                };
            }
            types = (types || "").match(rnothtmlwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                if (!type) {
                    continue;
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                special = jQuery.event.special[type] || {};
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn);
                if (!(handlers = events[type])) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;
                    if (!special.setup ||
                        special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle);
                        }
                    }
                }
                if (special.add) {
                    special.add.call(elem, handleObj);
                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid;
                    }
                }
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj);
                }
                else {
                    handlers.push(handleObj);
                }
                jQuery.event.global[type] = true;
            }
        },
        remove: function (elem, types, handler, selector, mappedTypes) {
            var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
            if (!elemData || !(events = elemData.events)) {
                return;
            }
            types = (types || "").match(rnothtmlwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[t], handler, selector, true);
                    }
                    continue;
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                handlers = events[type] || [];
                tmp = tmp[2] &&
                    new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
                origCount = j = handlers.length;
                while (j--) {
                    handleObj = handlers[j];
                    if ((mappedTypes || origType === handleObj.origType) &&
                        (!handler || handler.guid === handleObj.guid) &&
                        (!tmp || tmp.test(handleObj.namespace)) &&
                        (!selector || selector === handleObj.selector ||
                            selector === "**" && handleObj.selector)) {
                        handlers.splice(j, 1);
                        if (handleObj.selector) {
                            handlers.delegateCount--;
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj);
                        }
                    }
                }
                if (origCount && !handlers.length) {
                    if (!special.teardown ||
                        special.teardown.call(elem, namespaces, elemData.handle) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle);
                    }
                    delete events[type];
                }
            }
            if (jQuery.isEmptyObject(events)) {
                dataPriv.remove(elem, "handle events");
            }
        },
        dispatch: function (nativeEvent) {
            var event = jQuery.event.fix(nativeEvent);
            var i, j, ret, matched, handleObj, handlerQueue, args = new Array(arguments.length), handlers = (dataPriv.get(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
            args[0] = event;
            for (i = 1; i < arguments.length; i++) {
                args[i] = arguments[i];
            }
            event.delegateTarget = this;
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return;
            }
            handlerQueue = jQuery.event.handlers.call(this, event, handlers);
            i = 0;
            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                event.currentTarget = matched.elem;
                j = 0;
                while ((handleObj = matched.handlers[j++]) &&
                    !event.isImmediatePropagationStopped()) {
                    if (!event.rnamespace || handleObj.namespace === false ||
                        event.rnamespace.test(handleObj.namespace)) {
                        event.handleObj = handleObj;
                        event.data = handleObj.data;
                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle ||
                            handleObj.handler).apply(matched.elem, args);
                        if (ret !== undefined) {
                            if ((event.result = ret) === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }
            if (special.postDispatch) {
                special.postDispatch.call(this, event);
            }
            return event.result;
        },
        handlers: function (event, handlers) {
            var i, handleObj, sel, matchedHandlers, matchedSelectors, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount &&
                cur.nodeType &&
                !(event.type === "click" && event.button >= 1)) {
                for (; cur !== this; cur = cur.parentNode || this) {
                    if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
                        matchedHandlers = [];
                        matchedSelectors = {};
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];
                            sel = handleObj.selector + " ";
                            if (matchedSelectors[sel] === undefined) {
                                matchedSelectors[sel] = handleObj.needsContext ?
                                    jQuery(sel, this).index(cur) > -1 :
                                    jQuery.find(sel, this, null, [cur]).length;
                            }
                            if (matchedSelectors[sel]) {
                                matchedHandlers.push(handleObj);
                            }
                        }
                        if (matchedHandlers.length) {
                            handlerQueue.push({ elem: cur, handlers: matchedHandlers });
                        }
                    }
                }
            }
            cur = this;
            if (delegateCount < handlers.length) {
                handlerQueue.push({ elem: cur, handlers: handlers.slice(delegateCount) });
            }
            return handlerQueue;
        },
        addProp: function (name, hook) {
            Object.defineProperty(jQuery.Event.prototype, name, {
                enumerable: true,
                configurable: true,
                get: isFunction(hook) ?
                    function () {
                        if (this.originalEvent) {
                            return hook(this.originalEvent);
                        }
                    } :
                    function () {
                        if (this.originalEvent) {
                            return this.originalEvent[name];
                        }
                    },
                set: function (value) {
                    Object.defineProperty(this, name, {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: value
                    });
                }
            });
        },
        fix: function (originalEvent) {
            return originalEvent[jQuery.expando] ?
                originalEvent :
                new jQuery.Event(originalEvent);
        },
        special: {
            load: {
                noBubble: true
            },
            click: {
                setup: function (data) {
                    var el = this || data;
                    if (rcheckableType.test(el.type) &&
                        el.click && nodeName(el, "input")) {
                        leverageNative(el, "click", returnTrue);
                    }
                    return false;
                },
                trigger: function (data) {
                    var el = this || data;
                    if (rcheckableType.test(el.type) &&
                        el.click && nodeName(el, "input")) {
                        leverageNative(el, "click");
                    }
                    return true;
                },
                _default: function (event) {
                    var target = event.target;
                    return rcheckableType.test(target.type) &&
                        target.click && nodeName(target, "input") &&
                        dataPriv.get(target, "click") ||
                        nodeName(target, "a");
                }
            },
            beforeunload: {
                postDispatch: function (event) {
                    if (event.result !== undefined && event.originalEvent) {
                        event.originalEvent.returnValue = event.result;
                    }
                }
            }
        }
    };
    function leverageNative(el, type, expectSync) {
        if (!expectSync) {
            if (dataPriv.get(el, type) === undefined) {
                jQuery.event.add(el, type, returnTrue);
            }
            return;
        }
        dataPriv.set(el, type, false);
        jQuery.event.add(el, type, {
            namespace: false,
            handler: function (event) {
                var notAsync, result, saved = dataPriv.get(this, type);
                if ((event.isTrigger & 1) && this[type]) {
                    if (!saved.length) {
                        saved = slice.call(arguments);
                        dataPriv.set(this, type, saved);
                        notAsync = expectSync(this, type);
                        this[type]();
                        result = dataPriv.get(this, type);
                        if (saved !== result || notAsync) {
                            dataPriv.set(this, type, false);
                        }
                        else {
                            result = {};
                        }
                        if (saved !== result) {
                            event.stopImmediatePropagation();
                            event.preventDefault();
                            return result.value;
                        }
                    }
                    else if ((jQuery.event.special[type] || {}).delegateType) {
                        event.stopPropagation();
                    }
                }
                else if (saved.length) {
                    dataPriv.set(this, type, {
                        value: jQuery.event.trigger(jQuery.extend(saved[0], jQuery.Event.prototype), saved.slice(1), this)
                    });
                    event.stopImmediatePropagation();
                }
            }
        });
    }
    jQuery.removeEvent = function (elem, type, handle) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handle);
        }
    };
    jQuery.Event = function (src, props) {
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props);
        }
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = src.defaultPrevented ||
                src.defaultPrevented === undefined &&
                    src.returnValue === false ?
                returnTrue :
                returnFalse;
            this.target = (src.target && src.target.nodeType === 3) ?
                src.target.parentNode :
                src.target;
            this.currentTarget = src.currentTarget;
            this.relatedTarget = src.relatedTarget;
        }
        else {
            this.type = src;
        }
        if (props) {
            jQuery.extend(this, props);
        }
        this.timeStamp = src && src.timeStamp || Date.now();
        this[jQuery.expando] = true;
    };
    jQuery.Event.prototype = {
        constructor: jQuery.Event,
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        isSimulated: false,
        preventDefault: function () {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue;
            if (e && !this.isSimulated) {
                e.preventDefault();
            }
        },
        stopPropagation: function () {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue;
            if (e && !this.isSimulated) {
                e.stopPropagation();
            }
        },
        stopImmediatePropagation: function () {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue;
            if (e && !this.isSimulated) {
                e.stopImmediatePropagation();
            }
            this.stopPropagation();
        }
    };
    jQuery.each({
        altKey: true,
        bubbles: true,
        cancelable: true,
        changedTouches: true,
        ctrlKey: true,
        detail: true,
        eventPhase: true,
        metaKey: true,
        pageX: true,
        pageY: true,
        shiftKey: true,
        view: true,
        "char": true,
        code: true,
        charCode: true,
        key: true,
        keyCode: true,
        button: true,
        buttons: true,
        clientX: true,
        clientY: true,
        offsetX: true,
        offsetY: true,
        pointerId: true,
        pointerType: true,
        screenX: true,
        screenY: true,
        targetTouches: true,
        toElement: true,
        touches: true,
        which: function (event) {
            var button = event.button;
            if (event.which == null && rkeyEvent.test(event.type)) {
                return event.charCode != null ? event.charCode : event.keyCode;
            }
            if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
                if (button & 1) {
                    return 1;
                }
                if (button & 2) {
                    return 3;
                }
                if (button & 4) {
                    return 2;
                }
                return 0;
            }
            return event.which;
        }
    }, jQuery.event.addProp);
    jQuery.each({ focus: "focusin", blur: "focusout" }, function (type, delegateType) {
        jQuery.event.special[type] = {
            setup: function () {
                leverageNative(this, type, expectSync);
                return false;
            },
            trigger: function () {
                leverageNative(this, type);
                return true;
            },
            delegateType: delegateType
        };
    });
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function (event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                if (!related || (related !== target && !jQuery.contains(target, related))) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix;
                }
                return ret;
            }
        };
    });
    jQuery.fn.extend({
        on: function (types, selector, data, fn) {
            return on(this, types, selector, data, fn);
        },
        one: function (types, selector, data, fn) {
            return on(this, types, selector, data, fn, 1);
        },
        off: function (types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(handleObj.namespace ?
                    handleObj.origType + "." + handleObj.namespace :
                    handleObj.origType, handleObj.selector, handleObj.handler);
                return this;
            }
            if (typeof types === "object") {
                for (type in types) {
                    this.off(type, selector, types[type]);
                }
                return this;
            }
            if (selector === false || typeof selector === "function") {
                fn = selector;
                selector = undefined;
            }
            if (fn === false) {
                fn = returnFalse;
            }
            return this.each(function () {
                jQuery.event.remove(this, types, fn, selector);
            });
        }
    });
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi, rnoInnerhtml = /<script|<style|<link/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    function manipulationTarget(elem, content) {
        if (nodeName(elem, "table") &&
            nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
            return jQuery(elem).children("tbody")[0] || elem;
        }
        return elem;
    }
    function disableScript(elem) {
        elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
        return elem;
    }
    function restoreScript(elem) {
        if ((elem.type || "").slice(0, 5) === "true/") {
            elem.type = elem.type.slice(5);
        }
        else {
            elem.removeAttribute("type");
        }
        return elem;
    }
    function cloneCopyEvent(src, dest) {
        var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
        if (dest.nodeType !== 1) {
            return;
        }
        if (dataPriv.hasData(src)) {
            pdataOld = dataPriv.access(src);
            pdataCur = dataPriv.set(dest, pdataOld);
            events = pdataOld.events;
            if (events) {
                delete pdataCur.handle;
                pdataCur.events = {};
                for (type in events) {
                    for (i = 0, l = events[type].length; i < l; i++) {
                        jQuery.event.add(dest, type, events[type][i]);
                    }
                }
            }
        }
        if (dataUser.hasData(src)) {
            udataOld = dataUser.access(src);
            udataCur = jQuery.extend({}, udataOld);
            dataUser.set(dest, udataCur);
        }
    }
    function fixInput(src, dest) {
        var nodeName = dest.nodeName.toLowerCase();
        if (nodeName === "input" && rcheckableType.test(src.type)) {
            dest.checked = src.checked;
        }
        else if (nodeName === "input" || nodeName === "textarea") {
            dest.defaultValue = src.defaultValue;
        }
    }
    function domManip(collection, args, callback, ignored) {
        args = concat.apply([], args);
        var fragment, first, scripts, hasScripts, node, doc, i = 0, l = collection.length, iNoClone = l - 1, value = args[0], valueIsFunction = isFunction(value);
        if (valueIsFunction ||
            (l > 1 && typeof value === "string" &&
                !support.checkClone && rchecked.test(value))) {
            return collection.each(function (index) {
                var self = collection.eq(index);
                if (valueIsFunction) {
                    args[0] = value.call(this, index, self.html());
                }
                domManip(self, args, callback, ignored);
            });
        }
        if (l) {
            fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
            first = fragment.firstChild;
            if (fragment.childNodes.length === 1) {
                fragment = first;
            }
            if (first || ignored) {
                scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                hasScripts = scripts.length;
                for (; i < l; i++) {
                    node = fragment;
                    if (i !== iNoClone) {
                        node = jQuery.clone(node, true, true);
                        if (hasScripts) {
                            jQuery.merge(scripts, getAll(node, "script"));
                        }
                    }
                    callback.call(collection[i], node, i);
                }
                if (hasScripts) {
                    doc = scripts[scripts.length - 1].ownerDocument;
                    jQuery.map(scripts, restoreScript);
                    for (i = 0; i < hasScripts; i++) {
                        node = scripts[i];
                        if (rscriptType.test(node.type || "") &&
                            !dataPriv.access(node, "globalEval") &&
                            jQuery.contains(doc, node)) {
                            if (node.src && (node.type || "").toLowerCase() !== "module") {
                                if (jQuery._evalUrl && !node.noModule) {
                                    jQuery._evalUrl(node.src, {
                                        nonce: node.nonce || node.getAttribute("nonce")
                                    });
                                }
                            }
                            else {
                                DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
                            }
                        }
                    }
                }
            }
        }
        return collection;
    }
    function remove(elem, selector, keepData) {
        var node, nodes = selector ? jQuery.filter(selector, elem) : elem, i = 0;
        for (; (node = nodes[i]) != null; i++) {
            if (!keepData && node.nodeType === 1) {
                jQuery.cleanData(getAll(node));
            }
            if (node.parentNode) {
                if (keepData && isAttached(node)) {
                    setGlobalEval(getAll(node, "script"));
                }
                node.parentNode.removeChild(node);
            }
        }
        return elem;
    }
    jQuery.extend({
        htmlPrefilter: function (html) {
            return html.replace(rxhtmlTag, "<$1></$2>");
        },
        clone: function (elem, dataAndEvents, deepDataAndEvents) {
            var i, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = isAttached(elem);
            if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) &&
                !jQuery.isXMLDoc(elem)) {
                destElements = getAll(clone);
                srcElements = getAll(elem);
                for (i = 0, l = srcElements.length; i < l; i++) {
                    fixInput(srcElements[i], destElements[i]);
                }
            }
            if (dataAndEvents) {
                if (deepDataAndEvents) {
                    srcElements = srcElements || getAll(elem);
                    destElements = destElements || getAll(clone);
                    for (i = 0, l = srcElements.length; i < l; i++) {
                        cloneCopyEvent(srcElements[i], destElements[i]);
                    }
                }
                else {
                    cloneCopyEvent(elem, clone);
                }
            }
            destElements = getAll(clone, "script");
            if (destElements.length > 0) {
                setGlobalEval(destElements, !inPage && getAll(elem, "script"));
            }
            return clone;
        },
        cleanData: function (elems) {
            var data, elem, type, special = jQuery.event.special, i = 0;
            for (; (elem = elems[i]) !== undefined; i++) {
                if (acceptData(elem)) {
                    if ((data = elem[dataPriv.expando])) {
                        if (data.events) {
                            for (type in data.events) {
                                if (special[type]) {
                                    jQuery.event.remove(elem, type);
                                }
                                else {
                                    jQuery.removeEvent(elem, type, data.handle);
                                }
                            }
                        }
                        elem[dataPriv.expando] = undefined;
                    }
                    if (elem[dataUser.expando]) {
                        elem[dataUser.expando] = undefined;
                    }
                }
            }
        }
    });
    jQuery.fn.extend({
        detach: function (selector) {
            return remove(this, selector, true);
        },
        remove: function (selector) {
            return remove(this, selector);
        },
        text: function (value) {
            return access(this, function (value) {
                return value === undefined ?
                    jQuery.text(this) :
                    this.empty().each(function () {
                        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                            this.textContent = value;
                        }
                    });
            }, null, value, arguments.length);
        },
        append: function () {
            return domManip(this, arguments, function (elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },
        prepend: function () {
            return domManip(this, arguments, function (elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },
        before: function () {
            return domManip(this, arguments, function (elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this);
                }
            });
        },
        after: function () {
            return domManip(this, arguments, function (elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this.nextSibling);
                }
            });
        },
        empty: function () {
            var elem, i = 0;
            for (; (elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem, false));
                    elem.textContent = "";
                }
            }
            return this;
        },
        clone: function (dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
            return this.map(function () {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function (value) {
            return access(this, function (value) {
                var elem = this[0] || {}, i = 0, l = this.length;
                if (value === undefined && elem.nodeType === 1) {
                    return elem.innerHTML;
                }
                if (typeof value === "string" && !rnoInnerhtml.test(value) &&
                    !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                    value = jQuery.htmlPrefilter(value);
                    try {
                        for (; i < l; i++) {
                            elem = this[i] || {};
                            if (elem.nodeType === 1) {
                                jQuery.cleanData(getAll(elem, false));
                                elem.innerHTML = value;
                            }
                        }
                        elem = 0;
                    }
                    catch (e) { }
                }
                if (elem) {
                    this.empty().append(value);
                }
            }, null, value, arguments.length);
        },
        replaceWith: function () {
            var ignored = [];
            return domManip(this, arguments, function (elem) {
                var parent = this.parentNode;
                if (jQuery.inArray(this, ignored) < 0) {
                    jQuery.cleanData(getAll(this));
                    if (parent) {
                        parent.replaceChild(elem, this);
                    }
                }
            }, ignored);
        }
    });
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (name, original) {
        jQuery.fn[name] = function (selector) {
            var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0;
            for (; i <= last; i++) {
                elems = i === last ? this : this.clone(true);
                jQuery(insert[i])[original](elems);
                push.apply(ret, elems.get());
            }
            return this.pushStack(ret);
        };
    });
    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
    var getStyles = function (elem) {
        var view = elem.ownerDocument.defaultView;
        if (!view || !view.opener) {
            view = window;
        }
        return view.getComputedStyle(elem);
    };
    var rboxStyle = new RegExp(cssExpand.join("|"), "i");
    (function () {
        function computeStyleTests() {
            if (!div) {
                return;
            }
            container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
                "margin-top:1px;padding:0;border:0";
            div.style.cssText =
                "position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
                    "margin:auto;border:1px;padding:1px;" +
                    "width:60%;top:1%";
            documentElement.appendChild(container).appendChild(div);
            var divStyle = window.getComputedStyle(div);
            pixelPositionVal = divStyle.top !== "1%";
            reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;
            div.style.right = "60%";
            pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;
            boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;
            div.style.position = "absolute";
            scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;
            documentElement.removeChild(container);
            div = null;
        }
        function roundPixelMeasures(measure) {
            return Math.round(parseFloat(measure));
        }
        var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal, reliableMarginLeftVal, container = document.createElement("div"), div = document.createElement("div");
        if (!div.style) {
            return;
        }
        div.style.backgroundClip = "content-box";
        div.cloneNode(true).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";
        jQuery.extend(support, {
            boxSizingReliable: function () {
                computeStyleTests();
                return boxSizingReliableVal;
            },
            pixelBoxStyles: function () {
                computeStyleTests();
                return pixelBoxStylesVal;
            },
            pixelPosition: function () {
                computeStyleTests();
                return pixelPositionVal;
            },
            reliableMarginLeft: function () {
                computeStyleTests();
                return reliableMarginLeftVal;
            },
            scrollboxSize: function () {
                computeStyleTests();
                return scrollboxSizeVal;
            }
        });
    })();
    function curCSS(elem, name, computed) {
        var width, minWidth, maxWidth, ret, style = elem.style;
        computed = computed || getStyles(elem);
        if (computed) {
            ret = computed.getPropertyValue(name) || computed[name];
            if (ret === "" && !isAttached(elem)) {
                ret = jQuery.style(elem, name);
            }
            if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
                width = style.width;
                minWidth = style.minWidth;
                maxWidth = style.maxWidth;
                style.minWidth = style.maxWidth = style.width = ret;
                ret = computed.width;
                style.width = width;
                style.minWidth = minWidth;
                style.maxWidth = maxWidth;
            }
        }
        return ret !== undefined ?
            ret + "" :
            ret;
    }
    function addGetHookIf(conditionFn, hookFn) {
        return {
            get: function () {
                if (conditionFn()) {
                    delete this.get;
                    return;
                }
                return (this.get = hookFn).apply(this, arguments);
            }
        };
    }
    var cssPrefixes = ["Webkit", "Moz", "ms"], emptyStyle = document.createElement("div").style, vendorProps = {};
    function vendorPropName(name) {
        var capName = name[0].toUpperCase() + name.slice(1), i = cssPrefixes.length;
        while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in emptyStyle) {
                return name;
            }
        }
    }
    function finalPropName(name) {
        var final = jQuery.cssProps[name] || vendorProps[name];
        if (final) {
            return final;
        }
        if (name in emptyStyle) {
            return name;
        }
        return vendorProps[name] = vendorPropName(name) || name;
    }
    var rdisplayswap = /^(none|table(?!-c[ea]).+)/, rcustomProp = /^--/, cssShow = { position: "absolute", visibility: "hidden", display: "block" }, cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
    };
    function setPositiveNumber(elem, value, subtract) {
        var matches = rcssNum.exec(value);
        return matches ?
            Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") :
            value;
    }
    function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
        var i = dimension === "width" ? 1 : 0, extra = 0, delta = 0;
        if (box === (isBorderBox ? "border" : "content")) {
            return 0;
        }
        for (; i < 4; i += 2) {
            if (box === "margin") {
                delta += jQuery.css(elem, box + cssExpand[i], true, styles);
            }
            if (!isBorderBox) {
                delta += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                if (box !== "padding") {
                    delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
                else {
                    extra += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            }
            else {
                if (box === "content") {
                    delta -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                }
                if (box !== "margin") {
                    delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            }
        }
        if (!isBorderBox && computedVal >= 0) {
            delta += Math.max(0, Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] -
                computedVal -
                delta -
                extra -
                0.5)) || 0;
        }
        return delta;
    }
    function getWidthOrHeight(elem, dimension, extra) {
        var styles = getStyles(elem), boxSizingNeeded = !support.boxSizingReliable() || extra, isBorderBox = boxSizingNeeded &&
            jQuery.css(elem, "boxSizing", false, styles) === "border-box", valueIsBorderBox = isBorderBox, val = curCSS(elem, dimension, styles), offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1);
        if (rnumnonpx.test(val)) {
            if (!extra) {
                return val;
            }
            val = "auto";
        }
        if ((!support.boxSizingReliable() && isBorderBox ||
            val === "auto" ||
            !parseFloat(val) && jQuery.css(elem, "display", false, styles) === "inline") &&
            elem.getClientRects().length) {
            isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
            valueIsBorderBox = offsetProp in elem;
            if (valueIsBorderBox) {
                val = elem[offsetProp];
            }
        }
        val = parseFloat(val) || 0;
        return (val +
            boxModelAdjustment(elem, dimension, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles, val)) + "px";
    }
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function (elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return ret === "" ? "1" : ret;
                    }
                }
            }
        },
        cssNumber: {
            "animationIterationCount": true,
            "columnCount": true,
            "fillOpacity": true,
            "flexGrow": true,
            "flexShrink": true,
            "fontWeight": true,
            "gridArea": true,
            "gridColumn": true,
            "gridColumnEnd": true,
            "gridColumnStart": true,
            "gridRow": true,
            "gridRowEnd": true,
            "gridRowStart": true,
            "lineHeight": true,
            "opacity": true,
            "order": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
        },
        cssProps: {},
        style: function (elem, name, value, extra) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return;
            }
            var ret, type, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name), style = elem.style;
            if (!isCustomProp) {
                name = finalPropName(origName);
            }
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (value !== undefined) {
                type = typeof value;
                if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
                    value = adjustCSS(elem, name, ret);
                    type = "number";
                }
                if (value == null || value !== value) {
                    return;
                }
                if (type === "number" && !isCustomProp) {
                    value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
                }
                if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                    style[name] = "inherit";
                }
                if (!hooks || !("set" in hooks) ||
                    (value = hooks.set(elem, value, extra)) !== undefined) {
                    if (isCustomProp) {
                        style.setProperty(name, value);
                    }
                    else {
                        style[name] = value;
                    }
                }
            }
            else {
                if (hooks && "get" in hooks &&
                    (ret = hooks.get(elem, false, extra)) !== undefined) {
                    return ret;
                }
                return style[name];
            }
        },
        css: function (elem, name, extra, styles) {
            var val, num, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name);
            if (!isCustomProp) {
                name = finalPropName(origName);
            }
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (hooks && "get" in hooks) {
                val = hooks.get(elem, true, extra);
            }
            if (val === undefined) {
                val = curCSS(elem, name, styles);
            }
            if (val === "normal" && name in cssNormalTransform) {
                val = cssNormalTransform[name];
            }
            if (extra === "" || extra) {
                num = parseFloat(val);
                return extra === true || isFinite(num) ? num || 0 : val;
            }
            return val;
        }
    });
    jQuery.each(["height", "width"], function (i, dimension) {
        jQuery.cssHooks[dimension] = {
            get: function (elem, computed, extra) {
                if (computed) {
                    return rdisplayswap.test(jQuery.css(elem, "display")) &&
                        (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ?
                        swap(elem, cssShow, function () {
                            return getWidthOrHeight(elem, dimension, extra);
                        }) :
                        getWidthOrHeight(elem, dimension, extra);
                }
            },
            set: function (elem, value, extra) {
                var matches, styles = getStyles(elem), scrollboxSizeBuggy = !support.scrollboxSize() &&
                    styles.position === "absolute", boxSizingNeeded = scrollboxSizeBuggy || extra, isBorderBox = boxSizingNeeded &&
                    jQuery.css(elem, "boxSizing", false, styles) === "border-box", subtract = extra ?
                    boxModelAdjustment(elem, dimension, extra, isBorderBox, styles) :
                    0;
                if (isBorderBox && scrollboxSizeBuggy) {
                    subtract -= Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] -
                        parseFloat(styles[dimension]) -
                        boxModelAdjustment(elem, dimension, "border", false, styles) -
                        0.5);
                }
                if (subtract && (matches = rcssNum.exec(value)) &&
                    (matches[3] || "px") !== "px") {
                    elem.style[dimension] = value;
                    value = jQuery.css(elem, dimension);
                }
                return setPositiveNumber(elem, value, subtract);
            }
        };
    });
    jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
        if (computed) {
            return (parseFloat(curCSS(elem, "marginLeft")) ||
                elem.getBoundingClientRect().left -
                    swap(elem, { marginLeft: 0 }, function () {
                        return elem.getBoundingClientRect().left;
                    })) + "px";
        }
    });
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function (prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function (value) {
                var i = 0, expanded = {}, parts = typeof value === "string" ? value.split(" ") : [value];
                for (; i < 4; i++) {
                    expanded[prefix + cssExpand[i] + suffix] =
                        parts[i] || parts[i - 2] || parts[0];
                }
                return expanded;
            }
        };
        if (prefix !== "margin") {
            jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
        }
    });
    jQuery.fn.extend({
        css: function (name, value) {
            return access(this, function (elem, name, value) {
                var styles, len, map = {}, i = 0;
                if (Array.isArray(name)) {
                    styles = getStyles(elem);
                    len = name.length;
                    for (; i < len; i++) {
                        map[name[i]] = jQuery.css(elem, name[i], false, styles);
                    }
                    return map;
                }
                return value !== undefined ?
                    jQuery.style(elem, name, value) :
                    jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        }
    });
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    jQuery.Tween = Tween;
    Tween.prototype = {
        constructor: Tween,
        init: function (elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || jQuery.easing._default;
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function () {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ?
                hooks.get(this) :
                Tween.propHooks._default.get(this);
        },
        run: function (percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            if (this.options.duration) {
                this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
            }
            else {
                this.pos = eased = percent;
            }
            this.now = (this.end - this.start) * eased + this.start;
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
            }
            if (hooks && hooks.set) {
                hooks.set(this);
            }
            else {
                Tween.propHooks._default.set(this);
            }
            return this;
        }
    };
    Tween.prototype.init.prototype = Tween.prototype;
    Tween.propHooks = {
        _default: {
            get: function (tween) {
                var result;
                if (tween.elem.nodeType !== 1 ||
                    tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
                    return tween.elem[tween.prop];
                }
                result = jQuery.css(tween.elem, tween.prop, "");
                return !result || result === "auto" ? 0 : result;
            },
            set: function (tween) {
                if (jQuery.fx.step[tween.prop]) {
                    jQuery.fx.step[tween.prop](tween);
                }
                else if (tween.elem.nodeType === 1 && (jQuery.cssHooks[tween.prop] ||
                    tween.elem.style[finalPropName(tween.prop)] != null)) {
                    jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                }
                else {
                    tween.elem[tween.prop] = tween.now;
                }
            }
        }
    };
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function (tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
                tween.elem[tween.prop] = tween.now;
            }
        }
    };
    jQuery.easing = {
        linear: function (p) {
            return p;
        },
        swing: function (p) {
            return 0.5 - Math.cos(p * Math.PI) / 2;
        },
        _default: "swing"
    };
    jQuery.fx = Tween.prototype.init;
    jQuery.fx.step = {};
    var fxNow, inProgress, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
    function schedule() {
        if (inProgress) {
            if (document.hidden === false && window.requestAnimationFrame) {
                window.requestAnimationFrame(schedule);
            }
            else {
                window.setTimeout(schedule, jQuery.fx.interval);
            }
            jQuery.fx.tick();
        }
    }
    function createFxNow() {
        window.setTimeout(function () {
            fxNow = undefined;
        });
        return (fxNow = Date.now());
    }
    function genFx(type, includeWidth) {
        var which, i = 0, attrs = { height: type };
        includeWidth = includeWidth ? 1 : 0;
        for (; i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type;
        }
        if (includeWidth) {
            attrs.opacity = attrs.width = type;
        }
        return attrs;
    }
    function createTween(value, prop, animation) {
        var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length;
        for (; index < length; index++) {
            if ((tween = collection[index].call(animation, prop, value))) {
                return tween;
            }
        }
    }
    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display, isBox = "width" in props || "height" in props, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHiddenWithinTree(elem), dataShow = dataPriv.get(elem, "fxshow");
        if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function () {
                    if (!hooks.unqueued) {
                        oldfire();
                    }
                };
            }
            hooks.unqueued++;
            anim.always(function () {
                anim.always(function () {
                    hooks.unqueued--;
                    if (!jQuery.queue(elem, "fx").length) {
                        hooks.empty.fire();
                    }
                });
            });
        }
        for (prop in props) {
            value = props[prop];
            if (rfxtypes.test(value)) {
                delete props[prop];
                toggle = toggle || value === "toggle";
                if (value === (hidden ? "hide" : "show")) {
                    if (value === "show" && dataShow && dataShow[prop] !== undefined) {
                        hidden = true;
                    }
                    else {
                        continue;
                    }
                }
                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
            }
        }
        propTween = !jQuery.isEmptyObject(props);
        if (!propTween && jQuery.isEmptyObject(orig)) {
            return;
        }
        if (isBox && elem.nodeType === 1) {
            opts.overflow = [style.overflow, style.overflowX, style.overflowY];
            restoreDisplay = dataShow && dataShow.display;
            if (restoreDisplay == null) {
                restoreDisplay = dataPriv.get(elem, "display");
            }
            display = jQuery.css(elem, "display");
            if (display === "none") {
                if (restoreDisplay) {
                    display = restoreDisplay;
                }
                else {
                    showHide([elem], true);
                    restoreDisplay = elem.style.display || restoreDisplay;
                    display = jQuery.css(elem, "display");
                    showHide([elem]);
                }
            }
            if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
                if (jQuery.css(elem, "float") === "none") {
                    if (!propTween) {
                        anim.done(function () {
                            style.display = restoreDisplay;
                        });
                        if (restoreDisplay == null) {
                            display = style.display;
                            restoreDisplay = display === "none" ? "" : display;
                        }
                    }
                    style.display = "inline-block";
                }
            }
        }
        if (opts.overflow) {
            style.overflow = "hidden";
            anim.always(function () {
                style.overflow = opts.overflow[0];
                style.overflowX = opts.overflow[1];
                style.overflowY = opts.overflow[2];
            });
        }
        propTween = false;
        for (prop in orig) {
            if (!propTween) {
                if (dataShow) {
                    if ("hidden" in dataShow) {
                        hidden = dataShow.hidden;
                    }
                }
                else {
                    dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
                }
                if (toggle) {
                    dataShow.hidden = !hidden;
                }
                if (hidden) {
                    showHide([elem], true);
                }
                anim.done(function () {
                    if (!hidden) {
                        showHide([elem]);
                    }
                    dataPriv.remove(elem, "fxshow");
                    for (prop in orig) {
                        jQuery.style(elem, prop, orig[prop]);
                    }
                });
            }
            propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
            if (!(prop in dataShow)) {
                dataShow[prop] = propTween.start;
                if (hidden) {
                    propTween.end = propTween.start;
                    propTween.start = 0;
                }
            }
        }
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) {
            name = camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (Array.isArray(value)) {
                easing = value[1];
                value = props[index] = value[0];
            }
            if (index !== name) {
                props[name] = value;
                delete props[index];
            }
            hooks = jQuery.cssHooks[name];
            if (hooks && "expand" in hooks) {
                value = hooks.expand(value);
                delete props[name];
                for (index in value) {
                    if (!(index in props)) {
                        props[index] = value[index];
                        specialEasing[index] = easing;
                    }
                }
            }
            else {
                specialEasing[name] = easing;
            }
        }
    }
    function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = Animation.prefilters.length, deferred = jQuery.Deferred().always(function () {
            delete tick.elem;
        }), tick = function () {
            if (stopped) {
                return false;
            }
            var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length;
            for (; index < length; index++) {
                animation.tweens[index].run(percent);
            }
            deferred.notifyWith(elem, [animation, percent, remaining]);
            if (percent < 1 && length) {
                return remaining;
            }
            if (!length) {
                deferred.notifyWith(elem, [animation, 1, 0]);
            }
            deferred.resolveWith(elem, [animation]);
            return false;
        }, animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(true, {
                specialEasing: {},
                easing: jQuery.easing._default
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function (prop, end) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                animation.tweens.push(tween);
                return tween;
            },
            stop: function (gotoEnd) {
                var index = 0, length = gotoEnd ? animation.tweens.length : 0;
                if (stopped) {
                    return this;
                }
                stopped = true;
                for (; index < length; index++) {
                    animation.tweens[index].run(1);
                }
                if (gotoEnd) {
                    deferred.notifyWith(elem, [animation, 1, 0]);
                    deferred.resolveWith(elem, [animation, gotoEnd]);
                }
                else {
                    deferred.rejectWith(elem, [animation, gotoEnd]);
                }
                return this;
            }
        }), props = animation.props;
        propFilter(props, animation.opts.specialEasing);
        for (; index < length; index++) {
            result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
                if (isFunction(result.stop)) {
                    jQuery._queueHooks(animation.elem, animation.opts.queue).stop =
                        result.stop.bind(result);
                }
                return result;
            }
        }
        jQuery.map(props, createTween, animation);
        if (isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation);
        }
        animation
            .progress(animation.opts.progress)
            .done(animation.opts.done, animation.opts.complete)
            .fail(animation.opts.fail)
            .always(animation.opts.always);
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        }));
        return animation;
    }
    jQuery.Animation = jQuery.extend(Animation, {
        tweeners: {
            "*": [function (prop, value) {
                    var tween = this.createTween(prop, value);
                    adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
                    return tween;
                }]
        },
        tweener: function (props, callback) {
            if (isFunction(props)) {
                callback = props;
                props = ["*"];
            }
            else {
                props = props.match(rnothtmlwhite);
            }
            var prop, index = 0, length = props.length;
            for (; index < length; index++) {
                prop = props[index];
                Animation.tweeners[prop] = Animation.tweeners[prop] || [];
                Animation.tweeners[prop].unshift(callback);
            }
        },
        prefilters: [defaultPrefilter],
        prefilter: function (callback, prepend) {
            if (prepend) {
                Animation.prefilters.unshift(callback);
            }
            else {
                Animation.prefilters.push(callback);
            }
        }
    });
    jQuery.speed = function (speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing ||
                isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !isFunction(easing) && easing
        };
        if (jQuery.fx.off) {
            opt.duration = 0;
        }
        else {
            if (typeof opt.duration !== "number") {
                if (opt.duration in jQuery.fx.speeds) {
                    opt.duration = jQuery.fx.speeds[opt.duration];
                }
                else {
                    opt.duration = jQuery.fx.speeds._default;
                }
            }
        }
        if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx";
        }
        opt.old = opt.complete;
        opt.complete = function () {
            if (isFunction(opt.old)) {
                opt.old.call(this);
            }
            if (opt.queue) {
                jQuery.dequeue(this, opt.queue);
            }
        };
        return opt;
    };
    jQuery.fn.extend({
        fadeTo: function (speed, to, easing, callback) {
            return this.filter(isHiddenWithinTree).css("opacity", 0).show()
                .end().animate({ opacity: to }, speed, easing, callback);
        },
        animate: function (prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function () {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                if (empty || dataPriv.get(this, "finish")) {
                    anim.stop(true);
                }
            };
            doAnimation.finish = doAnimation;
            return empty || optall.queue === false ?
                this.each(doAnimation) :
                this.queue(optall.queue, doAnimation);
        },
        stop: function (type, clearQueue, gotoEnd) {
            var stopQueue = function (hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd);
            };
            if (typeof type !== "string") {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if (clearQueue && type !== false) {
                this.queue(type || "fx", []);
            }
            return this.each(function () {
                var dequeue = true, index = type != null && type + "queueHooks", timers = jQuery.timers, data = dataPriv.get(this);
                if (index) {
                    if (data[index] && data[index].stop) {
                        stopQueue(data[index]);
                    }
                }
                else {
                    for (index in data) {
                        if (data[index] && data[index].stop && rrun.test(index)) {
                            stopQueue(data[index]);
                        }
                    }
                }
                for (index = timers.length; index--;) {
                    if (timers[index].elem === this &&
                        (type == null || timers[index].queue === type)) {
                        timers[index].anim.stop(gotoEnd);
                        dequeue = false;
                        timers.splice(index, 1);
                    }
                }
                if (dequeue || !gotoEnd) {
                    jQuery.dequeue(this, type);
                }
            });
        },
        finish: function (type) {
            if (type !== false) {
                type = type || "fx";
            }
            return this.each(function () {
                var index, data = dataPriv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                data.finish = true;
                jQuery.queue(this, type, []);
                if (hooks && hooks.stop) {
                    hooks.stop.call(this, true);
                }
                for (index = timers.length; index--;) {
                    if (timers[index].elem === this && timers[index].queue === type) {
                        timers[index].anim.stop(true);
                        timers.splice(index, 1);
                    }
                }
                for (index = 0; index < length; index++) {
                    if (queue[index] && queue[index].finish) {
                        queue[index].finish.call(this);
                    }
                }
                delete data.finish;
            });
        }
    });
    jQuery.each(["toggle", "show", "hide"], function (i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function (speed, easing, callback) {
            return speed == null || typeof speed === "boolean" ?
                cssFn.apply(this, arguments) :
                this.animate(genFx(name, true), speed, easing, callback);
        };
    });
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" }
    }, function (name, props) {
        jQuery.fn[name] = function (speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    });
    jQuery.timers = [];
    jQuery.fx.tick = function () {
        var timer, i = 0, timers = jQuery.timers;
        fxNow = Date.now();
        for (; i < timers.length; i++) {
            timer = timers[i];
            if (!timer() && timers[i] === timer) {
                timers.splice(i--, 1);
            }
        }
        if (!timers.length) {
            jQuery.fx.stop();
        }
        fxNow = undefined;
    };
    jQuery.fx.timer = function (timer) {
        jQuery.timers.push(timer);
        jQuery.fx.start();
    };
    jQuery.fx.interval = 13;
    jQuery.fx.start = function () {
        if (inProgress) {
            return;
        }
        inProgress = true;
        schedule();
    };
    jQuery.fx.stop = function () {
        inProgress = null;
    };
    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    jQuery.fn.delay = function (time, type) {
        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
        type = type || "fx";
        return this.queue(type, function (next, hooks) {
            var timeout = window.setTimeout(next, time);
            hooks.stop = function () {
                window.clearTimeout(timeout);
            };
        });
    };
    (function () {
        var input = document.createElement("input"), select = document.createElement("select"), opt = select.appendChild(document.createElement("option"));
        input.type = "checkbox";
        support.checkOn = input.value !== "";
        support.optSelected = opt.selected;
        input = document.createElement("input");
        input.value = "t";
        input.type = "radio";
        support.radioValue = input.value === "t";
    })();
    var boolHook, attrHandle = jQuery.expr.attrHandle;
    jQuery.fn.extend({
        attr: function (name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function (name) {
            return this.each(function () {
                jQuery.removeAttr(this, name);
            });
        }
    });
    jQuery.extend({
        attr: function (elem, name, value) {
            var ret, hooks, nType = elem.nodeType;
            if (nType === 3 || nType === 8 || nType === 2) {
                return;
            }
            if (typeof elem.getAttribute === "undefined") {
                return jQuery.prop(elem, name, value);
            }
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                hooks = jQuery.attrHooks[name.toLowerCase()] ||
                    (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
            }
            if (value !== undefined) {
                if (value === null) {
                    jQuery.removeAttr(elem, name);
                    return;
                }
                if (hooks && "set" in hooks &&
                    (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                }
                elem.setAttribute(name, value + "");
                return value;
            }
            if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret;
            }
            ret = jQuery.find.attr(elem, name);
            return ret == null ? undefined : ret;
        },
        attrHooks: {
            type: {
                set: function (elem, value) {
                    if (!support.radioValue && value === "radio" &&
                        nodeName(elem, "input")) {
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            }
        },
        removeAttr: function (elem, value) {
            var name, i = 0, attrNames = value && value.match(rnothtmlwhite);
            if (attrNames && elem.nodeType === 1) {
                while ((name = attrNames[i++])) {
                    elem.removeAttribute(name);
                }
            }
        }
    });
    boolHook = {
        set: function (elem, value, name) {
            if (value === false) {
                jQuery.removeAttr(elem, name);
            }
            else {
                elem.setAttribute(name, name);
            }
            return name;
        }
    };
    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = function (elem, name, isXML) {
            var ret, handle, lowercaseName = name.toLowerCase();
            if (!isXML) {
                handle = attrHandle[lowercaseName];
                attrHandle[lowercaseName] = ret;
                ret = getter(elem, name, isXML) != null ?
                    lowercaseName :
                    null;
                attrHandle[lowercaseName] = handle;
            }
            return ret;
        };
    });
    var rfocusable = /^(?:input|select|textarea|button)$/i, rclickable = /^(?:a|area)$/i;
    jQuery.fn.extend({
        prop: function (name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function (name) {
            return this.each(function () {
                delete this[jQuery.propFix[name] || name];
            });
        }
    });
    jQuery.extend({
        prop: function (elem, name, value) {
            var ret, hooks, nType = elem.nodeType;
            if (nType === 3 || nType === 8 || nType === 2) {
                return;
            }
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name];
            }
            if (value !== undefined) {
                if (hooks && "set" in hooks &&
                    (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                }
                return (elem[name] = value);
            }
            if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret;
            }
            return elem[name];
        },
        propHooks: {
            tabIndex: {
                get: function (elem) {
                    var tabindex = jQuery.find.attr(elem, "tabindex");
                    if (tabindex) {
                        return parseInt(tabindex, 10);
                    }
                    if (rfocusable.test(elem.nodeName) ||
                        rclickable.test(elem.nodeName) &&
                            elem.href) {
                        return 0;
                    }
                    return -1;
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    });
    if (!support.optSelected) {
        jQuery.propHooks.selected = {
            get: function (elem) {
                var parent = elem.parentNode;
                if (parent && parent.parentNode) {
                    parent.parentNode.selectedIndex;
                }
                return null;
            },
            set: function (elem) {
                var parent = elem.parentNode;
                if (parent) {
                    parent.selectedIndex;
                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex;
                    }
                }
            }
        };
    }
    jQuery.each([
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable"
    ], function () {
        jQuery.propFix[this.toLowerCase()] = this;
    });
    function stripAndCollapse(value) {
        var tokens = value.match(rnothtmlwhite) || [];
        return tokens.join(" ");
    }
    function getClass(elem) {
        return elem.getAttribute && elem.getAttribute("class") || "";
    }
    function classesToArray(value) {
        if (Array.isArray(value)) {
            return value;
        }
        if (typeof value === "string") {
            return value.match(rnothtmlwhite) || [];
        }
        return [];
    }
    jQuery.fn.extend({
        addClass: function (value) {
            var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
            if (isFunction(value)) {
                return this.each(function (j) {
                    jQuery(this).addClass(value.call(this, j, getClass(this)));
                });
            }
            classes = classesToArray(value);
            if (classes.length) {
                while ((elem = this[i++])) {
                    curValue = getClass(elem);
                    cur = elem.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");
                    if (cur) {
                        j = 0;
                        while ((clazz = classes[j++])) {
                            if (cur.indexOf(" " + clazz + " ") < 0) {
                                cur += clazz + " ";
                            }
                        }
                        finalValue = stripAndCollapse(cur);
                        if (curValue !== finalValue) {
                            elem.setAttribute("class", finalValue);
                        }
                    }
                }
            }
            return this;
        },
        removeClass: function (value) {
            var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
            if (isFunction(value)) {
                return this.each(function (j) {
                    jQuery(this).removeClass(value.call(this, j, getClass(this)));
                });
            }
            if (!arguments.length) {
                return this.attr("class", "");
            }
            classes = classesToArray(value);
            if (classes.length) {
                while ((elem = this[i++])) {
                    curValue = getClass(elem);
                    cur = elem.nodeType === 1 && (" " + stripAndCollapse(curValue) + " ");
                    if (cur) {
                        j = 0;
                        while ((clazz = classes[j++])) {
                            while (cur.indexOf(" " + clazz + " ") > -1) {
                                cur = cur.replace(" " + clazz + " ", " ");
                            }
                        }
                        finalValue = stripAndCollapse(cur);
                        if (curValue !== finalValue) {
                            elem.setAttribute("class", finalValue);
                        }
                    }
                }
            }
            return this;
        },
        toggleClass: function (value, stateVal) {
            var type = typeof value, isValidValue = type === "string" || Array.isArray(value);
            if (typeof stateVal === "boolean" && isValidValue) {
                return stateVal ? this.addClass(value) : this.removeClass(value);
            }
            if (isFunction(value)) {
                return this.each(function (i) {
                    jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
                });
            }
            return this.each(function () {
                var className, i, self, classNames;
                if (isValidValue) {
                    i = 0;
                    self = jQuery(this);
                    classNames = classesToArray(value);
                    while ((className = classNames[i++])) {
                        if (self.hasClass(className)) {
                            self.removeClass(className);
                        }
                        else {
                            self.addClass(className);
                        }
                    }
                }
                else if (value === undefined || type === "boolean") {
                    className = getClass(this);
                    if (className) {
                        dataPriv.set(this, "__className__", className);
                    }
                    if (this.setAttribute) {
                        this.setAttribute("class", className || value === false ?
                            "" :
                            dataPriv.get(this, "__className__") || "");
                    }
                }
            });
        },
        hasClass: function (selector) {
            var className, elem, i = 0;
            className = " " + selector + " ";
            while ((elem = this[i++])) {
                if (elem.nodeType === 1 &&
                    (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
                    return true;
                }
            }
            return false;
        }
    });
    var rreturn = /\r/g;
    jQuery.fn.extend({
        val: function (value) {
            var hooks, ret, valueIsFunction, elem = this[0];
            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.type] ||
                        jQuery.valHooks[elem.nodeName.toLowerCase()];
                    if (hooks &&
                        "get" in hooks &&
                        (ret = hooks.get(elem, "value")) !== undefined) {
                        return ret;
                    }
                    ret = elem.value;
                    if (typeof ret === "string") {
                        return ret.replace(rreturn, "");
                    }
                    return ret == null ? "" : ret;
                }
                return;
            }
            valueIsFunction = isFunction(value);
            return this.each(function (i) {
                var val;
                if (this.nodeType !== 1) {
                    return;
                }
                if (valueIsFunction) {
                    val = value.call(this, i, jQuery(this).val());
                }
                else {
                    val = value;
                }
                if (val == null) {
                    val = "";
                }
                else if (typeof val === "number") {
                    val += "";
                }
                else if (Array.isArray(val)) {
                    val = jQuery.map(val, function (value) {
                        return value == null ? "" : value + "";
                    });
                }
                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                    this.value = val;
                }
            });
        }
    });
    jQuery.extend({
        valHooks: {
            option: {
                get: function (elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return val != null ?
                        val :
                        stripAndCollapse(jQuery.text(elem));
                }
            },
            select: {
                get: function (elem) {
                    var value, option, i, options = elem.options, index = elem.selectedIndex, one = elem.type === "select-one", values = one ? null : [], max = one ? index + 1 : options.length;
                    if (index < 0) {
                        i = max;
                    }
                    else {
                        i = one ? index : 0;
                    }
                    for (; i < max; i++) {
                        option = options[i];
                        if ((option.selected || i === index) &&
                            !option.disabled &&
                            (!option.parentNode.disabled ||
                                !nodeName(option.parentNode, "optgroup"))) {
                            value = jQuery(option).val();
                            if (one) {
                                return value;
                            }
                            values.push(value);
                        }
                    }
                    return values;
                },
                set: function (elem, value) {
                    var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length;
                    while (i--) {
                        option = options[i];
                        if (option.selected =
                            jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
                            optionSet = true;
                        }
                    }
                    if (!optionSet) {
                        elem.selectedIndex = -1;
                    }
                    return values;
                }
            }
        }
    });
    jQuery.each(["radio", "checkbox"], function () {
        jQuery.valHooks[this] = {
            set: function (elem, value) {
                if (Array.isArray(value)) {
                    return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1);
                }
            }
        };
        if (!support.checkOn) {
            jQuery.valHooks[this].get = function (elem) {
                return elem.getAttribute("value") === null ? "on" : elem.value;
            };
        }
    });
    support.focusin = "onfocusin" in window;
    var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, stopPropagationCallback = function (e) {
        e.stopPropagation();
    };
    jQuery.extend(jQuery.event, {
        trigger: function (event, data, elem, onlyHandlers) {
            var i, cur, tmp, bubbleType, ontype, handle, special, lastElement, eventPath = [elem || document], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            cur = lastElement = tmp = elem = elem || document;
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return;
            }
            if (type.indexOf(".") > -1) {
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;
            event = event[jQuery.expando] ?
                event :
                new jQuery.Event(type, typeof event === "object" && event);
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.rnamespace = event.namespace ?
                new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") :
                null;
            event.result = undefined;
            if (!event.target) {
                event.target = elem;
            }
            data = data == null ?
                [event] :
                jQuery.makeArray(data, [event]);
            special = jQuery.event.special[type] || {};
            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                return;
            }
            if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
                bubbleType = special.delegateType || type;
                if (!rfocusMorph.test(bubbleType + type)) {
                    cur = cur.parentNode;
                }
                for (; cur; cur = cur.parentNode) {
                    eventPath.push(cur);
                    tmp = cur;
                }
                if (tmp === (elem.ownerDocument || document)) {
                    eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
            }
            i = 0;
            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                lastElement = cur;
                event.type = i > 1 ?
                    bubbleType :
                    special.bindType || type;
                handle = (dataPriv.get(cur, "events") || {})[event.type] &&
                    dataPriv.get(cur, "handle");
                if (handle) {
                    handle.apply(cur, data);
                }
                handle = ontype && cur[ontype];
                if (handle && handle.apply && acceptData(cur)) {
                    event.result = handle.apply(cur, data);
                    if (event.result === false) {
                        event.preventDefault();
                    }
                }
            }
            event.type = type;
            if (!onlyHandlers && !event.isDefaultPrevented()) {
                if ((!special._default ||
                    special._default.apply(eventPath.pop(), data) === false) &&
                    acceptData(elem)) {
                    if (ontype && isFunction(elem[type]) && !isWindow(elem)) {
                        tmp = elem[ontype];
                        if (tmp) {
                            elem[ontype] = null;
                        }
                        jQuery.event.triggered = type;
                        if (event.isPropagationStopped()) {
                            lastElement.addEventListener(type, stopPropagationCallback);
                        }
                        elem[type]();
                        if (event.isPropagationStopped()) {
                            lastElement.removeEventListener(type, stopPropagationCallback);
                        }
                        jQuery.event.triggered = undefined;
                        if (tmp) {
                            elem[ontype] = tmp;
                        }
                    }
                }
            }
            return event.result;
        },
        simulate: function (type, elem, event) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: true
            });
            jQuery.event.trigger(e, null, elem);
        }
    });
    jQuery.fn.extend({
        trigger: function (type, data) {
            return this.each(function () {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function (type, data) {
            var elem = this[0];
            if (elem) {
                return jQuery.event.trigger(type, data, elem, true);
            }
        }
    });
    if (!support.focusin) {
        jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {
            var handler = function (event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
            };
            jQuery.event.special[fix] = {
                setup: function () {
                    var doc = this.ownerDocument || this, attaches = dataPriv.access(doc, fix);
                    if (!attaches) {
                        doc.addEventListener(orig, handler, true);
                    }
                    dataPriv.access(doc, fix, (attaches || 0) + 1);
                },
                teardown: function () {
                    var doc = this.ownerDocument || this, attaches = dataPriv.access(doc, fix) - 1;
                    if (!attaches) {
                        doc.removeEventListener(orig, handler, true);
                        dataPriv.remove(doc, fix);
                    }
                    else {
                        dataPriv.access(doc, fix, attaches);
                    }
                }
            };
        });
    }
    var location = window.location;
    var nonce = Date.now();
    var rquery = (/\?/);
    jQuery.parseXML = function (data) {
        var xml;
        if (!data || typeof data !== "string") {
            return null;
        }
        try {
            xml = (new window.DOMParser()).parseFromString(data, "text/xml");
        }
        catch (e) {
            xml = undefined;
        }
        if (!xml || xml.getElementsByTagName("parsererror").length) {
            jQuery.error("Invalid XML: " + data);
        }
        return xml;
    };
    var rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (Array.isArray(obj)) {
            jQuery.each(obj, function (i, v) {
                if (traditional || rbracket.test(prefix)) {
                    add(prefix, v);
                }
                else {
                    buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add);
                }
            });
        }
        else if (!traditional && toType(obj) === "object") {
            for (name in obj) {
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }
        }
        else {
            add(prefix, obj);
        }
    }
    jQuery.param = function (a, traditional) {
        var prefix, s = [], add = function (key, valueOrFunction) {
            var value = isFunction(valueOrFunction) ?
                valueOrFunction() :
                valueOrFunction;
            s[s.length] = encodeURIComponent(key) + "=" +
                encodeURIComponent(value == null ? "" : value);
        };
        if (a == null) {
            return "";
        }
        if (Array.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
            jQuery.each(a, function () {
                add(this.name, this.value);
            });
        }
        else {
            for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }
        return s.join("&");
    };
    jQuery.fn.extend({
        serialize: function () {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function () {
            return this.map(function () {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            })
                .filter(function () {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") &&
                    rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) &&
                    (this.checked || !rcheckableType.test(type));
            })
                .map(function (i, elem) {
                var val = jQuery(this).val();
                if (val == null) {
                    return null;
                }
                if (Array.isArray(val)) {
                    return jQuery.map(val, function (val) {
                        return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
                    });
                }
                return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
            }).get();
        }
    });
    var r20 = /%20/g, rhash = /#.*$/, rantiCache = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, prefilters = {}, transports = {}, allTypes = "*/".concat("*"), originAnchor = document.createElement("a");
    originAnchor.href = location.href;
    function addToPrefiltersOrTransports(structure) {
        return function (dataTypeExpression, func) {
            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
            if (isFunction(func)) {
                while ((dataType = dataTypes[i++])) {
                    if (dataType[0] === "+") {
                        dataType = dataType.slice(1) || "*";
                        (structure[dataType] = structure[dataType] || []).unshift(func);
                    }
                    else {
                        (structure[dataType] = structure[dataType] || []).push(func);
                    }
                }
            }
        };
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        var inspected = {}, seekingTransport = (structure === transports);
        function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                if (typeof dataTypeOrTransport === "string" &&
                    !seekingTransport && !inspected[dataTypeOrTransport]) {
                    options.dataTypes.unshift(dataTypeOrTransport);
                    inspect(dataTypeOrTransport);
                    return false;
                }
                else if (seekingTransport) {
                    return !(selected = dataTypeOrTransport);
                }
            });
            return selected;
        }
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }
    function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) {
            if (src[key] !== undefined) {
                (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep);
        }
        return target;
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
        var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
            }
        }
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break;
                }
            }
        }
        if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0];
        }
        else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) {
                    firstDataType = type;
                }
            }
            finalDataType = finalDataType || firstDataType;
        }
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
        }
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) {
            for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv];
            }
        }
        current = dataTypes.shift();
        while (current) {
            if (s.responseFields[current]) {
                jqXHR[s.responseFields[current]] = response;
            }
            if (!prev && isSuccess && s.dataFilter) {
                response = s.dataFilter(response, s.dataType);
            }
            prev = current;
            current = dataTypes.shift();
            if (current) {
                if (current === "*") {
                    current = prev;
                }
                else if (prev !== "*" && prev !== current) {
                    conv = converters[prev + " " + current] || converters["* " + current];
                    if (!conv) {
                        for (conv2 in converters) {
                            tmp = conv2.split(" ");
                            if (tmp[1] === current) {
                                conv = converters[prev + " " + tmp[0]] ||
                                    converters["* " + tmp[0]];
                                if (conv) {
                                    if (conv === true) {
                                        conv = converters[conv2];
                                    }
                                    else if (converters[conv2] !== true) {
                                        current = tmp[0];
                                        dataTypes.unshift(tmp[1]);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    if (conv !== true) {
                        if (conv && s.throws) {
                            response = conv(response);
                        }
                        else {
                            try {
                                response = conv(response);
                            }
                            catch (e) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                };
                            }
                        }
                    }
                }
            }
        }
        return { state: "success", data: response };
    }
    jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: location.href,
            type: "GET",
            isLocal: rlocalProtocol.test(location.protocol),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": true,
                "text json": JSON.parse,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: true,
                context: true
            }
        },
        ajaxSetup: function (target, settings) {
            return settings ?
                ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :
                ajaxExtend(jQuery.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function (url, options) {
            if (typeof url === "object") {
                options = url;
                url = undefined;
            }
            options = options || {};
            var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, completed, fireGlobals, i, uncached, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context &&
                (callbackContext.nodeType || callbackContext.jquery) ?
                jQuery(callbackContext) :
                jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, strAbort = "canceled", jqXHR = {
                readyState: 0,
                getResponseHeader: function (key) {
                    var match;
                    if (completed) {
                        if (!responseHeaders) {
                            responseHeaders = {};
                            while ((match = rheaders.exec(responseHeadersString))) {
                                responseHeaders[match[1].toLowerCase() + " "] =
                                    (responseHeaders[match[1].toLowerCase() + " "] || [])
                                        .concat(match[2]);
                            }
                        }
                        match = responseHeaders[key.toLowerCase() + " "];
                    }
                    return match == null ? null : match.join(", ");
                },
                getAllResponseHeaders: function () {
                    return completed ? responseHeadersString : null;
                },
                setRequestHeader: function (name, value) {
                    if (completed == null) {
                        name = requestHeadersNames[name.toLowerCase()] =
                            requestHeadersNames[name.toLowerCase()] || name;
                        requestHeaders[name] = value;
                    }
                    return this;
                },
                overrideMimeType: function (type) {
                    if (completed == null) {
                        s.mimeType = type;
                    }
                    return this;
                },
                statusCode: function (map) {
                    var code;
                    if (map) {
                        if (completed) {
                            jqXHR.always(map[jqXHR.status]);
                        }
                        else {
                            for (code in map) {
                                statusCode[code] = [statusCode[code], map[code]];
                            }
                        }
                    }
                    return this;
                },
                abort: function (statusText) {
                    var finalText = statusText || strAbort;
                    if (transport) {
                        transport.abort(finalText);
                    }
                    done(0, finalText);
                    return this;
                }
            };
            deferred.promise(jqXHR);
            s.url = ((url || s.url || location.href) + "")
                .replace(rprotocol, location.protocol + "//");
            s.type = options.method || options.type || s.method || s.type;
            s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];
            if (s.crossDomain == null) {
                urlAnchor = document.createElement("a");
                try {
                    urlAnchor.href = s.url;
                    urlAnchor.href = urlAnchor.href;
                    s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
                        urlAnchor.protocol + "//" + urlAnchor.host;
                }
                catch (e) {
                    s.crossDomain = true;
                }
            }
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional);
            }
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            if (completed) {
                return jqXHR;
            }
            fireGlobals = jQuery.event && s.global;
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart");
            }
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            cacheURL = s.url.replace(rhash, "");
            if (!s.hasContent) {
                uncached = s.url.slice(cacheURL.length);
                if (s.data && (s.processData || typeof s.data === "string")) {
                    cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;
                    delete s.data;
                }
                if (s.cache === false) {
                    cacheURL = cacheURL.replace(rantiCache, "$1");
                    uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + (nonce++) + uncached;
                }
                s.url = cacheURL + uncached;
            }
            else if (s.data && s.processData &&
                (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
                s.data = s.data.replace(r20, "+");
            }
            if (s.ifModified) {
                if (jQuery.lastModified[cacheURL]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
                }
                if (jQuery.etag[cacheURL]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
                }
            }
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType);
            }
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
                s.accepts[s.dataTypes[0]] +
                    (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") :
                s.accepts["*"]);
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i]);
            }
            if (s.beforeSend &&
                (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {
                return jqXHR.abort();
            }
            strAbort = "abort";
            completeDeferred.add(s.complete);
            jqXHR.done(s.success);
            jqXHR.fail(s.error);
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            if (!transport) {
                done(-1, "No Transport");
            }
            else {
                jqXHR.readyState = 1;
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                }
                if (completed) {
                    return jqXHR;
                }
                if (s.async && s.timeout > 0) {
                    timeoutTimer = window.setTimeout(function () {
                        jqXHR.abort("timeout");
                    }, s.timeout);
                }
                try {
                    completed = false;
                    transport.send(requestHeaders, done);
                }
                catch (e) {
                    if (completed) {
                        throw e;
                    }
                    done(-1, e);
                }
            }
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                if (completed) {
                    return;
                }
                completed = true;
                if (timeoutTimer) {
                    window.clearTimeout(timeoutTimer);
                }
                transport = undefined;
                responseHeadersString = headers || "";
                jqXHR.readyState = status > 0 ? 4 : 0;
                isSuccess = status >= 200 && status < 300 || status === 304;
                if (responses) {
                    response = ajaxHandleResponses(s, jqXHR, responses);
                }
                response = ajaxConvert(s, response, jqXHR, isSuccess);
                if (isSuccess) {
                    if (s.ifModified) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if (modified) {
                            jQuery.lastModified[cacheURL] = modified;
                        }
                        modified = jqXHR.getResponseHeader("etag");
                        if (modified) {
                            jQuery.etag[cacheURL] = modified;
                        }
                    }
                    if (status === 204 || s.type === "HEAD") {
                        statusText = "nocontent";
                    }
                    else if (status === 304) {
                        statusText = "notmodified";
                    }
                    else {
                        statusText = response.state;
                        success = response.data;
                        error = response.error;
                        isSuccess = !error;
                    }
                }
                else {
                    error = statusText;
                    if (status || !statusText) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0;
                        }
                    }
                }
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + "";
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                }
                else {
                    deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                }
                jqXHR.statusCode(statusCode);
                statusCode = undefined;
                if (fireGlobals) {
                    globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
                }
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                    if (!(--jQuery.active)) {
                        jQuery.event.trigger("ajaxStop");
                    }
                }
            }
            return jqXHR;
        },
        getJSON: function (url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        getScript: function (url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        }
    });
    jQuery.each(["get", "post"], function (i, method) {
        jQuery[method] = function (url, data, callback, type) {
            if (isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }
            return jQuery.ajax(jQuery.extend({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            }, jQuery.isPlainObject(url) && url));
        };
    });
    jQuery._evalUrl = function (url, options) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            cache: true,
            async: false,
            global: false,
            converters: {
                "text script": function () { }
            },
            dataFilter: function (response) {
                jQuery.globalEval(response, options);
            }
        });
    };
    jQuery.fn.extend({
        wrapAll: function (html) {
            var wrap;
            if (this[0]) {
                if (isFunction(html)) {
                    html = html.call(this[0]);
                }
                wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    wrap.insertBefore(this[0]);
                }
                wrap.map(function () {
                    var elem = this;
                    while (elem.firstElementChild) {
                        elem = elem.firstElementChild;
                    }
                    return elem;
                }).append(this);
            }
            return this;
        },
        wrapInner: function (html) {
            if (isFunction(html)) {
                return this.each(function (i) {
                    jQuery(this).wrapInner(html.call(this, i));
                });
            }
            return this.each(function () {
                var self = jQuery(this), contents = self.contents();
                if (contents.length) {
                    contents.wrapAll(html);
                }
                else {
                    self.append(html);
                }
            });
        },
        wrap: function (html) {
            var htmlIsFunction = isFunction(html);
            return this.each(function (i) {
                jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function (selector) {
            this.parent(selector).not("body").each(function () {
                jQuery(this).replaceWith(this.childNodes);
            });
            return this;
        }
    });
    jQuery.expr.pseudos.hidden = function (elem) {
        return !jQuery.expr.pseudos.visible(elem);
    };
    jQuery.expr.pseudos.visible = function (elem) {
        return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
    };
    jQuery.ajaxSettings.xhr = function () {
        try {
            return new window.XMLHttpRequest();
        }
        catch (e) { }
    };
    var xhrSuccessStatus = {
        0: 200,
        1223: 204
    }, xhrSupported = jQuery.ajaxSettings.xhr();
    support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
    support.ajax = xhrSupported = !!xhrSupported;
    jQuery.ajaxTransport(function (options) {
        var callback, errorCallback;
        if (support.cors || xhrSupported && !options.crossDomain) {
            return {
                send: function (headers, complete) {
                    var i, xhr = options.xhr();
                    xhr.open(options.type, options.url, options.async, options.username, options.password);
                    if (options.xhrFields) {
                        for (i in options.xhrFields) {
                            xhr[i] = options.xhrFields[i];
                        }
                    }
                    if (options.mimeType && xhr.overrideMimeType) {
                        xhr.overrideMimeType(options.mimeType);
                    }
                    if (!options.crossDomain && !headers["X-Requested-With"]) {
                        headers["X-Requested-With"] = "XMLHttpRequest";
                    }
                    for (i in headers) {
                        xhr.setRequestHeader(i, headers[i]);
                    }
                    callback = function (type) {
                        return function () {
                            if (callback) {
                                callback = errorCallback = xhr.onload =
                                    xhr.onerror = xhr.onabort = xhr.ontimeout =
                                        xhr.onreadystatechange = null;
                                if (type === "abort") {
                                    xhr.abort();
                                }
                                else if (type === "error") {
                                    if (typeof xhr.status !== "number") {
                                        complete(0, "error");
                                    }
                                    else {
                                        complete(xhr.status, xhr.statusText);
                                    }
                                }
                                else {
                                    complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, (xhr.responseType || "text") !== "text" ||
                                        typeof xhr.responseText !== "string" ?
                                        { binary: xhr.response } :
                                        { text: xhr.responseText }, xhr.getAllResponseHeaders());
                                }
                            }
                        };
                    };
                    xhr.onload = callback();
                    errorCallback = xhr.onerror = xhr.ontimeout = callback("error");
                    if (xhr.onabort !== undefined) {
                        xhr.onabort = errorCallback;
                    }
                    else {
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4) {
                                window.setTimeout(function () {
                                    if (callback) {
                                        errorCallback();
                                    }
                                });
                            }
                        };
                    }
                    callback = callback("abort");
                    try {
                        xhr.send(options.hasContent && options.data || null);
                    }
                    catch (e) {
                        if (callback) {
                            throw e;
                        }
                    }
                },
                abort: function () {
                    if (callback) {
                        callback();
                    }
                }
            };
        }
    });
    jQuery.ajaxPrefilter(function (s) {
        if (s.crossDomain) {
            s.contents.script = false;
        }
    });
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, " +
                "application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function (text) {
                jQuery.globalEval(text);
                return text;
            }
        }
    });
    jQuery.ajaxPrefilter("script", function (s) {
        if (s.cache === undefined) {
            s.cache = false;
        }
        if (s.crossDomain) {
            s.type = "GET";
        }
    });
    jQuery.ajaxTransport("script", function (s) {
        if (s.crossDomain || s.scriptAttrs) {
            var script, callback;
            return {
                send: function (_, complete) {
                    script = jQuery("<script>")
                        .attr(s.scriptAttrs || {})
                        .prop({ charset: s.scriptCharset, src: s.url })
                        .on("load error", callback = function (evt) {
                        script.remove();
                        callback = null;
                        if (evt) {
                            complete(evt.type === "error" ? 404 : 200, evt.type);
                        }
                    });
                    document.head.appendChild(script[0]);
                },
                abort: function () {
                    if (callback) {
                        callback();
                    }
                }
            };
        }
    });
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
            this[callback] = true;
            return callback;
        }
    });
    jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ?
            "url" :
            typeof s.data === "string" &&
                (s.contentType || "")
                    .indexOf("application/x-www-form-urlencoded") === 0 &&
                rjsonp.test(s.data) && "data");
        if (jsonProp || s.dataTypes[0] === "jsonp") {
            callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ?
                s.jsonpCallback() :
                s.jsonpCallback;
            if (jsonProp) {
                s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
            }
            else if (s.jsonp !== false) {
                s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
            }
            s.converters["script json"] = function () {
                if (!responseContainer) {
                    jQuery.error(callbackName + " was not called");
                }
                return responseContainer[0];
            };
            s.dataTypes[0] = "json";
            overwritten = window[callbackName];
            window[callbackName] = function () {
                responseContainer = arguments;
            };
            jqXHR.always(function () {
                if (overwritten === undefined) {
                    jQuery(window).removeProp(callbackName);
                }
                else {
                    window[callbackName] = overwritten;
                }
                if (s[callbackName]) {
                    s.jsonpCallback = originalSettings.jsonpCallback;
                    oldCallbacks.push(callbackName);
                }
                if (responseContainer && isFunction(overwritten)) {
                    overwritten(responseContainer[0]);
                }
                responseContainer = overwritten = undefined;
            });
            return "script";
        }
    });
    support.createHTMLDocument = (function () {
        var body = document.implementation.createHTMLDocument("").body;
        body.innerHTML = "<form></form><form></form>";
        return body.childNodes.length === 2;
    })();
    jQuery.parseHTML = function (data, context, keepScripts) {
        if (typeof data !== "string") {
            return [];
        }
        if (typeof context === "boolean") {
            keepScripts = context;
            context = false;
        }
        var base, parsed, scripts;
        if (!context) {
            if (support.createHTMLDocument) {
                context = document.implementation.createHTMLDocument("");
                base = context.createElement("base");
                base.href = document.location.href;
                context.head.appendChild(base);
            }
            else {
                context = document;
            }
        }
        parsed = rsingleTag.exec(data);
        scripts = !keepScripts && [];
        if (parsed) {
            return [context.createElement(parsed[1])];
        }
        parsed = buildFragment([data], context, scripts);
        if (scripts && scripts.length) {
            jQuery(scripts).remove();
        }
        return jQuery.merge([], parsed.childNodes);
    };
    jQuery.fn.load = function (url, params, callback) {
        var selector, type, response, self = this, off = url.indexOf(" ");
        if (off > -1) {
            selector = stripAndCollapse(url.slice(off));
            url = url.slice(0, off);
        }
        if (isFunction(params)) {
            callback = params;
            params = undefined;
        }
        else if (params && typeof params === "object") {
            type = "POST";
        }
        if (self.length > 0) {
            jQuery.ajax({
                url: url,
                type: type || "GET",
                dataType: "html",
                data: params
            }).done(function (responseText) {
                response = arguments;
                self.html(selector ?
                    jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :
                    responseText);
            }).always(callback && function (jqXHR, status) {
                self.each(function () {
                    callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
                });
            });
        }
        return this;
    };
    jQuery.each([
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend"
    ], function (i, type) {
        jQuery.fn[type] = function (fn) {
            return this.on(type, fn);
        };
    });
    jQuery.expr.pseudos.animated = function (elem) {
        return jQuery.grep(jQuery.timers, function (fn) {
            return elem === fn.elem;
        }).length;
    };
    jQuery.offset = {
        setOffset: function (elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
            if (position === "static") {
                elem.style.position = "relative";
            }
            curOffset = curElem.offset();
            curCSSTop = jQuery.css(elem, "top");
            curCSSLeft = jQuery.css(elem, "left");
            calculatePosition = (position === "absolute" || position === "fixed") &&
                (curCSSTop + curCSSLeft).indexOf("auto") > -1;
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;
            }
            else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0;
            }
            if (isFunction(options)) {
                options = options.call(elem, i, jQuery.extend({}, curOffset));
            }
            if (options.top != null) {
                props.top = (options.top - curOffset.top) + curTop;
            }
            if (options.left != null) {
                props.left = (options.left - curOffset.left) + curLeft;
            }
            if ("using" in options) {
                options.using.call(elem, props);
            }
            else {
                curElem.css(props);
            }
        }
    };
    jQuery.fn.extend({
        offset: function (options) {
            if (arguments.length) {
                return options === undefined ?
                    this :
                    this.each(function (i) {
                        jQuery.offset.setOffset(this, options, i);
                    });
            }
            var rect, win, elem = this[0];
            if (!elem) {
                return;
            }
            if (!elem.getClientRects().length) {
                return { top: 0, left: 0 };
            }
            rect = elem.getBoundingClientRect();
            win = elem.ownerDocument.defaultView;
            return {
                top: rect.top + win.pageYOffset,
                left: rect.left + win.pageXOffset
            };
        },
        position: function () {
            if (!this[0]) {
                return;
            }
            var offsetParent, offset, doc, elem = this[0], parentOffset = { top: 0, left: 0 };
            if (jQuery.css(elem, "position") === "fixed") {
                offset = elem.getBoundingClientRect();
            }
            else {
                offset = this.offset();
                doc = elem.ownerDocument;
                offsetParent = elem.offsetParent || doc.documentElement;
                while (offsetParent &&
                    (offsetParent === doc.body || offsetParent === doc.documentElement) &&
                    jQuery.css(offsetParent, "position") === "static") {
                    offsetParent = offsetParent.parentNode;
                }
                if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
                    parentOffset = jQuery(offsetParent).offset();
                    parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
                    parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
                }
            }
            return {
                top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
            };
        },
        offsetParent: function () {
            return this.map(function () {
                var offsetParent = this.offsetParent;
                while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent || documentElement;
            });
        }
    });
    jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (method, prop) {
        var top = "pageYOffset" === prop;
        jQuery.fn[method] = function (val) {
            return access(this, function (elem, method, val) {
                var win;
                if (isWindow(elem)) {
                    win = elem;
                }
                else if (elem.nodeType === 9) {
                    win = elem.defaultView;
                }
                if (val === undefined) {
                    return win ? win[prop] : elem[method];
                }
                if (win) {
                    win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
                }
                else {
                    elem[method] = val;
                }
            }, method, val, arguments.length);
        };
    });
    jQuery.each(["top", "left"], function (i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
            if (computed) {
                computed = curCSS(elem, prop);
                return rnumnonpx.test(computed) ?
                    jQuery(elem).position()[prop] + "px" :
                    computed;
            }
        });
    });
    jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
        jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name }, function (defaultExtra, funcName) {
            jQuery.fn[funcName] = function (margin, value) {
                var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"), extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
                return access(this, function (elem, type, value) {
                    var doc;
                    if (isWindow(elem)) {
                        return funcName.indexOf("outer") === 0 ?
                            elem["inner" + name] :
                            elem.document.documentElement["client" + name];
                    }
                    if (elem.nodeType === 9) {
                        doc = elem.documentElement;
                        return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
                    }
                    return value === undefined ?
                        jQuery.css(elem, type, extra) :
                        jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : undefined, chainable);
            };
        });
    });
    jQuery.each(("blur focus focusin focusout resize scroll click dblclick " +
        "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
        "change select submit keydown keypress keyup contextmenu").split(" "), function (i, name) {
        jQuery.fn[name] = function (data, fn) {
            return arguments.length > 0 ?
                this.on(name, null, data, fn) :
                this.trigger(name);
        };
    });
    jQuery.fn.extend({
        hover: function (fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        }
    });
    jQuery.fn.extend({
        bind: function (types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function (types, fn) {
            return this.off(types, null, fn);
        },
        delegate: function (selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function (selector, types, fn) {
            return arguments.length === 1 ?
                this.off(selector, "**") :
                this.off(types, selector || "**", fn);
        }
    });
    jQuery.proxy = function (fn, context) {
        var tmp, args, proxy;
        if (typeof context === "string") {
            tmp = fn[context];
            context = fn;
            fn = tmp;
        }
        if (!isFunction(fn)) {
            return undefined;
        }
        args = slice.call(arguments, 2);
        proxy = function () {
            return fn.apply(context || this, args.concat(slice.call(arguments)));
        };
        proxy.guid = fn.guid = fn.guid || jQuery.guid++;
        return proxy;
    };
    jQuery.holdReady = function (hold) {
        if (hold) {
            jQuery.readyWait++;
        }
        else {
            jQuery.ready(true);
        }
    };
    jQuery.isArray = Array.isArray;
    jQuery.parseJSON = JSON.parse;
    jQuery.nodeName = nodeName;
    jQuery.isFunction = isFunction;
    jQuery.isWindow = isWindow;
    jQuery.camelCase = camelCase;
    jQuery.type = toType;
    jQuery.now = Date.now;
    jQuery.isNumeric = function (obj) {
        var type = jQuery.type(obj);
        return (type === "number" || type === "string") &&
            !isNaN(obj - parseFloat(obj));
    };
    if (typeof define === "function" && define.amd) {
        define("jquery", [], function () {
            return jQuery;
        });
    }
    var _jQuery = window.jQuery, _$ = window.$;
    jQuery.noConflict = function (deep) {
        if (window.$ === jQuery) {
            window.$ = _$;
        }
        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
        }
        return jQuery;
    };
    if (!noGlobal) {
        window.jQuery = window.$ = jQuery;
    }
    return jQuery;
});
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
        typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
            (global = global || self, factory(global.bootstrap = {}, global.jQuery));
}(this, function (exports, $) {
    'use strict';
    $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
            _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
            _defineProperties(Constructor, staticProps);
        return Constructor;
    }
    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        }
        else {
            obj[key] = value;
        }
        return obj;
    }
    function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};
            var ownKeys = Object.keys(source);
            if (typeof Object.getOwnPropertySymbols === 'function') {
                ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
                    return Object.getOwnPropertyDescriptor(source, sym).enumerable;
                }));
            }
            ownKeys.forEach(function (key) {
                _defineProperty(target, key, source[key]);
            });
        }
        return target;
    }
    function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        subClass.__proto__ = superClass;
    }
    var TRANSITION_END = 'transitionend';
    var MAX_UID = 1000000;
    var MILLISECONDS_MULTIPLIER = 1000;
    function toType(obj) {
        return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    }
    function getSpecialTransitionEndEvent() {
        return {
            bindType: TRANSITION_END,
            delegateType: TRANSITION_END,
            handle: function handle(event) {
                if ($(event.target).is(this)) {
                    return event.handleObj.handler.apply(this, arguments);
                }
                return undefined;
            }
        };
    }
    function transitionEndEmulator(duration) {
        var _this = this;
        var called = false;
        $(this).one(Util.TRANSITION_END, function () {
            called = true;
        });
        setTimeout(function () {
            if (!called) {
                Util.triggerTransitionEnd(_this);
            }
        }, duration);
        return this;
    }
    function setTransitionEndSupport() {
        $.fn.emulateTransitionEnd = transitionEndEmulator;
        $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
    var Util = {
        TRANSITION_END: 'bsTransitionEnd',
        getUID: function getUID(prefix) {
            do {
                prefix += ~~(Math.random() * MAX_UID);
            } while (document.getElementById(prefix));
            return prefix;
        },
        getSelectorFromElement: function getSelectorFromElement(element) {
            var selector = element.getAttribute('data-target');
            if (!selector || selector === '#') {
                var hrefAttr = element.getAttribute('href');
                selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
            }
            try {
                return document.querySelector(selector) ? selector : null;
            }
            catch (err) {
                return null;
            }
        },
        getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
            if (!element) {
                return 0;
            }
            var transitionDuration = $(element).css('transition-duration');
            var transitionDelay = $(element).css('transition-delay');
            var floatTransitionDuration = parseFloat(transitionDuration);
            var floatTransitionDelay = parseFloat(transitionDelay);
            if (!floatTransitionDuration && !floatTransitionDelay) {
                return 0;
            }
            transitionDuration = transitionDuration.split(',')[0];
            transitionDelay = transitionDelay.split(',')[0];
            return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
        },
        reflow: function reflow(element) {
            return element.offsetHeight;
        },
        triggerTransitionEnd: function triggerTransitionEnd(element) {
            $(element).trigger(TRANSITION_END);
        },
        supportsTransitionEnd: function supportsTransitionEnd() {
            return Boolean(TRANSITION_END);
        },
        isElement: function isElement(obj) {
            return (obj[0] || obj).nodeType;
        },
        typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
            for (var property in configTypes) {
                if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
                    var expectedTypes = configTypes[property];
                    var value = config[property];
                    var valueType = value && Util.isElement(value) ? 'element' : toType(value);
                    if (!new RegExp(expectedTypes).test(valueType)) {
                        throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
                    }
                }
            }
        },
        findShadowRoot: function findShadowRoot(element) {
            if (!document.documentElement.attachShadow) {
                return null;
            }
            if (typeof element.getRootNode === 'function') {
                var root = element.getRootNode();
                return root instanceof ShadowRoot ? root : null;
            }
            if (element instanceof ShadowRoot) {
                return element;
            }
            if (!element.parentNode) {
                return null;
            }
            return Util.findShadowRoot(element.parentNode);
        }
    };
    setTransitionEndSupport();
    var NAME = 'alert';
    var VERSION = '4.3.1';
    var DATA_KEY = 'bs.alert';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Selector = {
        DISMISS: '[data-dismiss="alert"]'
    };
    var Event = {
        CLOSE: "close" + EVENT_KEY,
        CLOSED: "closed" + EVENT_KEY,
        CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
        ALERT: 'alert',
        FADE: 'fade',
        SHOW: 'show'
    };
    var Alert = function () {
        function Alert(element) {
            this._element = element;
        }
        var _proto = Alert.prototype;
        _proto.close = function close(element) {
            var rootElement = this._element;
            if (element) {
                rootElement = this._getRootElement(element);
            }
            var customEvent = this._triggerCloseEvent(rootElement);
            if (customEvent.isDefaultPrevented()) {
                return;
            }
            this._removeElement(rootElement);
        };
        _proto.dispose = function dispose() {
            $.removeData(this._element, DATA_KEY);
            this._element = null;
        };
        _proto._getRootElement = function _getRootElement(element) {
            var selector = Util.getSelectorFromElement(element);
            var parent = false;
            if (selector) {
                parent = document.querySelector(selector);
            }
            if (!parent) {
                parent = $(element).closest("." + ClassName.ALERT)[0];
            }
            return parent;
        };
        _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
            var closeEvent = $.Event(Event.CLOSE);
            $(element).trigger(closeEvent);
            return closeEvent;
        };
        _proto._removeElement = function _removeElement(element) {
            var _this = this;
            $(element).removeClass(ClassName.SHOW);
            if (!$(element).hasClass(ClassName.FADE)) {
                this._destroyElement(element);
                return;
            }
            var transitionDuration = Util.getTransitionDurationFromElement(element);
            $(element).one(Util.TRANSITION_END, function (event) {
                return _this._destroyElement(element, event);
            }).emulateTransitionEnd(transitionDuration);
        };
        _proto._destroyElement = function _destroyElement(element) {
            $(element).detach().trigger(Event.CLOSED).remove();
        };
        Alert._jQueryInterface = function _jQueryInterface(config) {
            return this.each(function () {
                var $element = $(this);
                var data = $element.data(DATA_KEY);
                if (!data) {
                    data = new Alert(this);
                    $element.data(DATA_KEY, data);
                }
                if (config === 'close') {
                    data[config](this);
                }
            });
        };
        Alert._handleDismiss = function _handleDismiss(alertInstance) {
            return function (event) {
                if (event) {
                    event.preventDefault();
                }
                alertInstance.close(this);
            };
        };
        _createClass(Alert, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION;
                }
            }]);
        return Alert;
    }();
    $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
    $.fn[NAME] = Alert._jQueryInterface;
    $.fn[NAME].Constructor = Alert;
    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Alert._jQueryInterface;
    };
    var NAME$1 = 'button';
    var VERSION$1 = '4.3.1';
    var DATA_KEY$1 = 'bs.button';
    var EVENT_KEY$1 = "." + DATA_KEY$1;
    var DATA_API_KEY$1 = '.data-api';
    var JQUERY_NO_CONFLICT$1 = $.fn[NAME$1];
    var ClassName$1 = {
        ACTIVE: 'active',
        BUTTON: 'btn',
        FOCUS: 'focus'
    };
    var Selector$1 = {
        DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
        DATA_TOGGLE: '[data-toggle="buttons"]',
        INPUT: 'input:not([type="hidden"])',
        ACTIVE: '.active',
        BUTTON: '.btn'
    };
    var Event$1 = {
        CLICK_DATA_API: "click" + EVENT_KEY$1 + DATA_API_KEY$1,
        FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY$1 + DATA_API_KEY$1 + " " + ("blur" + EVENT_KEY$1 + DATA_API_KEY$1)
    };
    var Button = function () {
        function Button(element) {
            this._element = element;
        }
        var _proto = Button.prototype;
        _proto.toggle = function toggle() {
            var triggerChangeEvent = true;
            var addAriaPressed = true;
            var rootElement = $(this._element).closest(Selector$1.DATA_TOGGLE)[0];
            if (rootElement) {
                var input = this._element.querySelector(Selector$1.INPUT);
                if (input) {
                    if (input.type === 'radio') {
                        if (input.checked && this._element.classList.contains(ClassName$1.ACTIVE)) {
                            triggerChangeEvent = false;
                        }
                        else {
                            var activeElement = rootElement.querySelector(Selector$1.ACTIVE);
                            if (activeElement) {
                                $(activeElement).removeClass(ClassName$1.ACTIVE);
                            }
                        }
                    }
                    if (triggerChangeEvent) {
                        if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
                            return;
                        }
                        input.checked = !this._element.classList.contains(ClassName$1.ACTIVE);
                        $(input).trigger('change');
                    }
                    input.focus();
                    addAriaPressed = false;
                }
            }
            if (addAriaPressed) {
                this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName$1.ACTIVE));
            }
            if (triggerChangeEvent) {
                $(this._element).toggleClass(ClassName$1.ACTIVE);
            }
        };
        _proto.dispose = function dispose() {
            $.removeData(this._element, DATA_KEY$1);
            this._element = null;
        };
        Button._jQueryInterface = function _jQueryInterface(config) {
            return this.each(function () {
                var data = $(this).data(DATA_KEY$1);
                if (!data) {
                    data = new Button(this);
                    $(this).data(DATA_KEY$1, data);
                }
                if (config === 'toggle') {
                    data[config]();
                }
            });
        };
        _createClass(Button, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION$1;
                }
            }]);
        return Button;
    }();
    $(document).on(Event$1.CLICK_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
        event.preventDefault();
        var button = event.target;
        if (!$(button).hasClass(ClassName$1.BUTTON)) {
            button = $(button).closest(Selector$1.BUTTON);
        }
        Button._jQueryInterface.call($(button), 'toggle');
    }).on(Event$1.FOCUS_BLUR_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
        var button = $(event.target).closest(Selector$1.BUTTON)[0];
        $(button).toggleClass(ClassName$1.FOCUS, /^focus(in)?$/.test(event.type));
    });
    $.fn[NAME$1] = Button._jQueryInterface;
    $.fn[NAME$1].Constructor = Button;
    $.fn[NAME$1].noConflict = function () {
        $.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
        return Button._jQueryInterface;
    };
    var NAME$2 = 'carousel';
    var VERSION$2 = '4.3.1';
    var DATA_KEY$2 = 'bs.carousel';
    var EVENT_KEY$2 = "." + DATA_KEY$2;
    var DATA_API_KEY$2 = '.data-api';
    var JQUERY_NO_CONFLICT$2 = $.fn[NAME$2];
    var ARROW_LEFT_KEYCODE = 37;
    var ARROW_RIGHT_KEYCODE = 39;
    var TOUCHEVENT_COMPAT_WAIT = 500;
    var SWIPE_THRESHOLD = 40;
    var Default = {
        interval: 5000,
        keyboard: true,
        slide: false,
        pause: 'hover',
        wrap: true,
        touch: true
    };
    var DefaultType = {
        interval: '(number|boolean)',
        keyboard: 'boolean',
        slide: '(boolean|string)',
        pause: '(string|boolean)',
        wrap: 'boolean',
        touch: 'boolean'
    };
    var Direction = {
        NEXT: 'next',
        PREV: 'prev',
        LEFT: 'left',
        RIGHT: 'right'
    };
    var Event$2 = {
        SLIDE: "slide" + EVENT_KEY$2,
        SLID: "slid" + EVENT_KEY$2,
        KEYDOWN: "keydown" + EVENT_KEY$2,
        MOUSEENTER: "mouseenter" + EVENT_KEY$2,
        MOUSELEAVE: "mouseleave" + EVENT_KEY$2,
        TOUCHSTART: "touchstart" + EVENT_KEY$2,
        TOUCHMOVE: "touchmove" + EVENT_KEY$2,
        TOUCHEND: "touchend" + EVENT_KEY$2,
        POINTERDOWN: "pointerdown" + EVENT_KEY$2,
        POINTERUP: "pointerup" + EVENT_KEY$2,
        DRAG_START: "dragstart" + EVENT_KEY$2,
        LOAD_DATA_API: "load" + EVENT_KEY$2 + DATA_API_KEY$2,
        CLICK_DATA_API: "click" + EVENT_KEY$2 + DATA_API_KEY$2
    };
    var ClassName$2 = {
        CAROUSEL: 'carousel',
        ACTIVE: 'active',
        SLIDE: 'slide',
        RIGHT: 'carousel-item-right',
        LEFT: 'carousel-item-left',
        NEXT: 'carousel-item-next',
        PREV: 'carousel-item-prev',
        ITEM: 'carousel-item',
        POINTER_EVENT: 'pointer-event'
    };
    var Selector$2 = {
        ACTIVE: '.active',
        ACTIVE_ITEM: '.active.carousel-item',
        ITEM: '.carousel-item',
        ITEM_IMG: '.carousel-item img',
        NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
        INDICATORS: '.carousel-indicators',
        DATA_SLIDE: '[data-slide], [data-slide-to]',
        DATA_RIDE: '[data-ride="carousel"]'
    };
    var PointerType = {
        TOUCH: 'touch',
        PEN: 'pen'
    };
    var Carousel = function () {
        function Carousel(element, config) {
            this._items = null;
            this._interval = null;
            this._activeElement = null;
            this._isPaused = false;
            this._isSliding = false;
            this.touchTimeout = null;
            this.touchStartX = 0;
            this.touchDeltaX = 0;
            this._config = this._getConfig(config);
            this._element = element;
            this._indicatorsElement = this._element.querySelector(Selector$2.INDICATORS);
            this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
            this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);
            this._addEventListeners();
        }
        var _proto = Carousel.prototype;
        _proto.next = function next() {
            if (!this._isSliding) {
                this._slide(Direction.NEXT);
            }
        };
        _proto.nextWhenVisible = function nextWhenVisible() {
            if (!document.hidden && $(this._element).is(':visible') && $(this._element).css('visibility') !== 'hidden') {
                this.next();
            }
        };
        _proto.prev = function prev() {
            if (!this._isSliding) {
                this._slide(Direction.PREV);
            }
        };
        _proto.pause = function pause(event) {
            if (!event) {
                this._isPaused = true;
            }
            if (this._element.querySelector(Selector$2.NEXT_PREV)) {
                Util.triggerTransitionEnd(this._element);
                this.cycle(true);
            }
            clearInterval(this._interval);
            this._interval = null;
        };
        _proto.cycle = function cycle(event) {
            if (!event) {
                this._isPaused = false;
            }
            if (this._interval) {
                clearInterval(this._interval);
                this._interval = null;
            }
            if (this._config.interval && !this._isPaused) {
                this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
            }
        };
        _proto.to = function to(index) {
            var _this = this;
            this._activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);
            var activeIndex = this._getItemIndex(this._activeElement);
            if (index > this._items.length - 1 || index < 0) {
                return;
            }
            if (this._isSliding) {
                $(this._element).one(Event$2.SLID, function () {
                    return _this.to(index);
                });
                return;
            }
            if (activeIndex === index) {
                this.pause();
                this.cycle();
                return;
            }
            var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;
            this._slide(direction, this._items[index]);
        };
        _proto.dispose = function dispose() {
            $(this._element).off(EVENT_KEY$2);
            $.removeData(this._element, DATA_KEY$2);
            this._items = null;
            this._config = null;
            this._element = null;
            this._interval = null;
            this._isPaused = null;
            this._isSliding = null;
            this._activeElement = null;
            this._indicatorsElement = null;
        };
        _proto._getConfig = function _getConfig(config) {
            config = _objectSpread({}, Default, config);
            Util.typeCheckConfig(NAME$2, config, DefaultType);
            return config;
        };
        _proto._handleSwipe = function _handleSwipe() {
            var absDeltax = Math.abs(this.touchDeltaX);
            if (absDeltax <= SWIPE_THRESHOLD) {
                return;
            }
            var direction = absDeltax / this.touchDeltaX;
            if (direction > 0) {
                this.prev();
            }
            if (direction < 0) {
                this.next();
            }
        };
        _proto._addEventListeners = function _addEventListeners() {
            var _this2 = this;
            if (this._config.keyboard) {
                $(this._element).on(Event$2.KEYDOWN, function (event) {
                    return _this2._keydown(event);
                });
            }
            if (this._config.pause === 'hover') {
                $(this._element).on(Event$2.MOUSEENTER, function (event) {
                    return _this2.pause(event);
                }).on(Event$2.MOUSELEAVE, function (event) {
                    return _this2.cycle(event);
                });
            }
            if (this._config.touch) {
                this._addTouchEventListeners();
            }
        };
        _proto._addTouchEventListeners = function _addTouchEventListeners() {
            var _this3 = this;
            if (!this._touchSupported) {
                return;
            }
            var start = function start(event) {
                if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
                    _this3.touchStartX = event.originalEvent.clientX;
                }
                else if (!_this3._pointerEvent) {
                    _this3.touchStartX = event.originalEvent.touches[0].clientX;
                }
            };
            var move = function move(event) {
                if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
                    _this3.touchDeltaX = 0;
                }
                else {
                    _this3.touchDeltaX = event.originalEvent.touches[0].clientX - _this3.touchStartX;
                }
            };
            var end = function end(event) {
                if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
                    _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
                }
                _this3._handleSwipe();
                if (_this3._config.pause === 'hover') {
                    _this3.pause();
                    if (_this3.touchTimeout) {
                        clearTimeout(_this3.touchTimeout);
                    }
                    _this3.touchTimeout = setTimeout(function (event) {
                        return _this3.cycle(event);
                    }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
                }
            };
            $(this._element.querySelectorAll(Selector$2.ITEM_IMG)).on(Event$2.DRAG_START, function (e) {
                return e.preventDefault();
            });
            if (this._pointerEvent) {
                $(this._element).on(Event$2.POINTERDOWN, function (event) {
                    return start(event);
                });
                $(this._element).on(Event$2.POINTERUP, function (event) {
                    return end(event);
                });
                this._element.classList.add(ClassName$2.POINTER_EVENT);
            }
            else {
                $(this._element).on(Event$2.TOUCHSTART, function (event) {
                    return start(event);
                });
                $(this._element).on(Event$2.TOUCHMOVE, function (event) {
                    return move(event);
                });
                $(this._element).on(Event$2.TOUCHEND, function (event) {
                    return end(event);
                });
            }
        };
        _proto._keydown = function _keydown(event) {
            if (/input|textarea/i.test(event.target.tagName)) {
                return;
            }
            switch (event.which) {
                case ARROW_LEFT_KEYCODE:
                    event.preventDefault();
                    this.prev();
                    break;
                case ARROW_RIGHT_KEYCODE:
                    event.preventDefault();
                    this.next();
                    break;
                default:
            }
        };
        _proto._getItemIndex = function _getItemIndex(element) {
            this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector$2.ITEM)) : [];
            return this._items.indexOf(element);
        };
        _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
            var isNextDirection = direction === Direction.NEXT;
            var isPrevDirection = direction === Direction.PREV;
            var activeIndex = this._getItemIndex(activeElement);
            var lastItemIndex = this._items.length - 1;
            var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;
            if (isGoingToWrap && !this._config.wrap) {
                return activeElement;
            }
            var delta = direction === Direction.PREV ? -1 : 1;
            var itemIndex = (activeIndex + delta) % this._items.length;
            return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
        };
        _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
            var targetIndex = this._getItemIndex(relatedTarget);
            var fromIndex = this._getItemIndex(this._element.querySelector(Selector$2.ACTIVE_ITEM));
            var slideEvent = $.Event(Event$2.SLIDE, {
                relatedTarget: relatedTarget,
                direction: eventDirectionName,
                from: fromIndex,
                to: targetIndex
            });
            $(this._element).trigger(slideEvent);
            return slideEvent;
        };
        _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
            if (this._indicatorsElement) {
                var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector$2.ACTIVE));
                $(indicators).removeClass(ClassName$2.ACTIVE);
                var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];
                if (nextIndicator) {
                    $(nextIndicator).addClass(ClassName$2.ACTIVE);
                }
            }
        };
        _proto._slide = function _slide(direction, element) {
            var _this4 = this;
            var activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);
            var activeElementIndex = this._getItemIndex(activeElement);
            var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);
            var nextElementIndex = this._getItemIndex(nextElement);
            var isCycling = Boolean(this._interval);
            var directionalClassName;
            var orderClassName;
            var eventDirectionName;
            if (direction === Direction.NEXT) {
                directionalClassName = ClassName$2.LEFT;
                orderClassName = ClassName$2.NEXT;
                eventDirectionName = Direction.LEFT;
            }
            else {
                directionalClassName = ClassName$2.RIGHT;
                orderClassName = ClassName$2.PREV;
                eventDirectionName = Direction.RIGHT;
            }
            if (nextElement && $(nextElement).hasClass(ClassName$2.ACTIVE)) {
                this._isSliding = false;
                return;
            }
            var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
            if (slideEvent.isDefaultPrevented()) {
                return;
            }
            if (!activeElement || !nextElement) {
                return;
            }
            this._isSliding = true;
            if (isCycling) {
                this.pause();
            }
            this._setActiveIndicatorElement(nextElement);
            var slidEvent = $.Event(Event$2.SLID, {
                relatedTarget: nextElement,
                direction: eventDirectionName,
                from: activeElementIndex,
                to: nextElementIndex
            });
            if ($(this._element).hasClass(ClassName$2.SLIDE)) {
                $(nextElement).addClass(orderClassName);
                Util.reflow(nextElement);
                $(activeElement).addClass(directionalClassName);
                $(nextElement).addClass(directionalClassName);
                var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);
                if (nextElementInterval) {
                    this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
                    this._config.interval = nextElementInterval;
                }
                else {
                    this._config.interval = this._config.defaultInterval || this._config.interval;
                }
                var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
                $(activeElement).one(Util.TRANSITION_END, function () {
                    $(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName$2.ACTIVE);
                    $(activeElement).removeClass(ClassName$2.ACTIVE + " " + orderClassName + " " + directionalClassName);
                    _this4._isSliding = false;
                    setTimeout(function () {
                        return $(_this4._element).trigger(slidEvent);
                    }, 0);
                }).emulateTransitionEnd(transitionDuration);
            }
            else {
                $(activeElement).removeClass(ClassName$2.ACTIVE);
                $(nextElement).addClass(ClassName$2.ACTIVE);
                this._isSliding = false;
                $(this._element).trigger(slidEvent);
            }
            if (isCycling) {
                this.cycle();
            }
        };
        Carousel._jQueryInterface = function _jQueryInterface(config) {
            return this.each(function () {
                var data = $(this).data(DATA_KEY$2);
                var _config = _objectSpread({}, Default, $(this).data());
                if (typeof config === 'object') {
                    _config = _objectSpread({}, _config, config);
                }
                var action = typeof config === 'string' ? config : _config.slide;
                if (!data) {
                    data = new Carousel(this, _config);
                    $(this).data(DATA_KEY$2, data);
                }
                if (typeof config === 'number') {
                    data.to(config);
                }
                else if (typeof action === 'string') {
                    if (typeof data[action] === 'undefined') {
                        throw new TypeError("No method named \"" + action + "\"");
                    }
                    data[action]();
                }
                else if (_config.interval && _config.ride) {
                    data.pause();
                    data.cycle();
                }
            });
        };
        Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
            var selector = Util.getSelectorFromElement(this);
            if (!selector) {
                return;
            }
            var target = $(selector)[0];
            if (!target || !$(target).hasClass(ClassName$2.CAROUSEL)) {
                return;
            }
            var config = _objectSpread({}, $(target).data(), $(this).data());
            var slideIndex = this.getAttribute('data-slide-to');
            if (slideIndex) {
                config.interval = false;
            }
            Carousel._jQueryInterface.call($(target), config);
            if (slideIndex) {
                $(target).data(DATA_KEY$2).to(slideIndex);
            }
            event.preventDefault();
        };
        _createClass(Carousel, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION$2;
                }
            }, {
                key: "Default",
                get: function get() {
                    return Default;
                }
            }]);
        return Carousel;
    }();
    $(document).on(Event$2.CLICK_DATA_API, Selector$2.DATA_SLIDE, Carousel._dataApiClickHandler);
    $(window).on(Event$2.LOAD_DATA_API, function () {
        var carousels = [].slice.call(document.querySelectorAll(Selector$2.DATA_RIDE));
        for (var i = 0, len = carousels.length; i < len; i++) {
            var $carousel = $(carousels[i]);
            Carousel._jQueryInterface.call($carousel, $carousel.data());
        }
    });
    $.fn[NAME$2] = Carousel._jQueryInterface;
    $.fn[NAME$2].Constructor = Carousel;
    $.fn[NAME$2].noConflict = function () {
        $.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
        return Carousel._jQueryInterface;
    };
    var NAME$3 = 'collapse';
    var VERSION$3 = '4.3.1';
    var DATA_KEY$3 = 'bs.collapse';
    var EVENT_KEY$3 = "." + DATA_KEY$3;
    var DATA_API_KEY$3 = '.data-api';
    var JQUERY_NO_CONFLICT$3 = $.fn[NAME$3];
    var Default$1 = {
        toggle: true,
        parent: ''
    };
    var DefaultType$1 = {
        toggle: 'boolean',
        parent: '(string|element)'
    };
    var Event$3 = {
        SHOW: "show" + EVENT_KEY$3,
        SHOWN: "shown" + EVENT_KEY$3,
        HIDE: "hide" + EVENT_KEY$3,
        HIDDEN: "hidden" + EVENT_KEY$3,
        CLICK_DATA_API: "click" + EVENT_KEY$3 + DATA_API_KEY$3
    };
    var ClassName$3 = {
        SHOW: 'show',
        COLLAPSE: 'collapse',
        COLLAPSING: 'collapsing',
        COLLAPSED: 'collapsed'
    };
    var Dimension = {
        WIDTH: 'width',
        HEIGHT: 'height'
    };
    var Selector$3 = {
        ACTIVES: '.show, .collapsing',
        DATA_TOGGLE: '[data-toggle="collapse"]'
    };
    var Collapse = function () {
        function Collapse(element, config) {
            this._isTransitioning = false;
            this._element = element;
            this._config = this._getConfig(config);
            this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
            var toggleList = [].slice.call(document.querySelectorAll(Selector$3.DATA_TOGGLE));
            for (var i = 0, len = toggleList.length; i < len; i++) {
                var elem = toggleList[i];
                var selector = Util.getSelectorFromElement(elem);
                var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
                    return foundElem === element;
                });
                if (selector !== null && filterElement.length > 0) {
                    this._selector = selector;
                    this._triggerArray.push(elem);
                }
            }
            this._parent = this._config.parent ? this._getParent() : null;
            if (!this._config.parent) {
                this._addAriaAndCollapsedClass(this._element, this._triggerArray);
            }
            if (this._config.toggle) {
                this.toggle();
            }
        }
        var _proto = Collapse.prototype;
        _proto.toggle = function toggle() {
            if ($(this._element).hasClass(ClassName$3.SHOW)) {
                this.hide();
            }
            else {
                this.show();
            }
        };
        _proto.show = function show() {
            var _this = this;
            if (this._isTransitioning || $(this._element).hasClass(ClassName$3.SHOW)) {
                return;
            }
            var actives;
            var activesData;
            if (this._parent) {
                actives = [].slice.call(this._parent.querySelectorAll(Selector$3.ACTIVES)).filter(function (elem) {
                    if (typeof _this._config.parent === 'string') {
                        return elem.getAttribute('data-parent') === _this._config.parent;
                    }
                    return elem.classList.contains(ClassName$3.COLLAPSE);
                });
                if (actives.length === 0) {
                    actives = null;
                }
            }
            if (actives) {
                activesData = $(actives).not(this._selector).data(DATA_KEY$3);
                if (activesData && activesData._isTransitioning) {
                    return;
                }
            }
            var startEvent = $.Event(Event$3.SHOW);
            $(this._element).trigger(startEvent);
            if (startEvent.isDefaultPrevented()) {
                return;
            }
            if (actives) {
                Collapse._jQueryInterface.call($(actives).not(this._selector), 'hide');
                if (!activesData) {
                    $(actives).data(DATA_KEY$3, null);
                }
            }
            var dimension = this._getDimension();
            $(this._element).removeClass(ClassName$3.COLLAPSE).addClass(ClassName$3.COLLAPSING);
            this._element.style[dimension] = 0;
            if (this._triggerArray.length) {
                $(this._triggerArray).removeClass(ClassName$3.COLLAPSED).attr('aria-expanded', true);
            }
            this.setTransitioning(true);
            var complete = function complete() {
                $(_this._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).addClass(ClassName$3.SHOW);
                _this._element.style[dimension] = '';
                _this.setTransitioning(false);
                $(_this._element).trigger(Event$3.SHOWN);
            };
            var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
            var scrollSize = "scroll" + capitalizedDimension;
            var transitionDuration = Util.getTransitionDurationFromElement(this._element);
            $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
            this._element.style[dimension] = this._element[scrollSize] + "px";
        };
        _proto.hide = function hide() {
            var _this2 = this;
            if (this._isTransitioning || !$(this._element).hasClass(ClassName$3.SHOW)) {
                return;
            }
            var startEvent = $.Event(Event$3.HIDE);
            $(this._element).trigger(startEvent);
            if (startEvent.isDefaultPrevented()) {
                return;
            }
            var dimension = this._getDimension();
            this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
            Util.reflow(this._element);
            $(this._element).addClass(ClassName$3.COLLAPSING).removeClass(ClassName$3.COLLAPSE).removeClass(ClassName$3.SHOW);
            var triggerArrayLength = this._triggerArray.length;
            if (triggerArrayLength > 0) {
                for (var i = 0; i < triggerArrayLength; i++) {
                    var trigger = this._triggerArray[i];
                    var selector = Util.getSelectorFromElement(trigger);
                    if (selector !== null) {
                        var $elem = $([].slice.call(document.querySelectorAll(selector)));
                        if (!$elem.hasClass(ClassName$3.SHOW)) {
                            $(trigger).addClass(ClassName$3.COLLAPSED).attr('aria-expanded', false);
                        }
                    }
                }
            }
            this.setTransitioning(true);
            var complete = function complete() {
                _this2.setTransitioning(false);
                $(_this2._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).trigger(Event$3.HIDDEN);
            };
            this._element.style[dimension] = '';
            var transitionDuration = Util.getTransitionDurationFromElement(this._element);
            $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        };
        _proto.setTransitioning = function setTransitioning(isTransitioning) {
            this._isTransitioning = isTransitioning;
        };
        _proto.dispose = function dispose() {
            $.removeData(this._element, DATA_KEY$3);
            this._config = null;
            this._parent = null;
            this._element = null;
            this._triggerArray = null;
            this._isTransitioning = null;
        };
        _proto._getConfig = function _getConfig(config) {
            config = _objectSpread({}, Default$1, config);
            config.toggle = Boolean(config.toggle);
            Util.typeCheckConfig(NAME$3, config, DefaultType$1);
            return config;
        };
        _proto._getDimension = function _getDimension() {
            var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
            return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
        };
        _proto._getParent = function _getParent() {
            var _this3 = this;
            var parent;
            if (Util.isElement(this._config.parent)) {
                parent = this._config.parent;
                if (typeof this._config.parent.jquery !== 'undefined') {
                    parent = this._config.parent[0];
                }
            }
            else {
                parent = document.querySelector(this._config.parent);
            }
            var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
            var children = [].slice.call(parent.querySelectorAll(selector));
            $(children).each(function (i, element) {
                _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
            });
            return parent;
        };
        _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
            var isOpen = $(element).hasClass(ClassName$3.SHOW);
            if (triggerArray.length) {
                $(triggerArray).toggleClass(ClassName$3.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
            }
        };
        Collapse._getTargetFromElement = function _getTargetFromElement(element) {
            var selector = Util.getSelectorFromElement(element);
            return selector ? document.querySelector(selector) : null;
        };
        Collapse._jQueryInterface = function _jQueryInterface(config) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data(DATA_KEY$3);
                var _config = _objectSpread({}, Default$1, $this.data(), typeof config === 'object' && config ? config : {});
                if (!data && _config.toggle && /show|hide/.test(config)) {
                    _config.toggle = false;
                }
                if (!data) {
                    data = new Collapse(this, _config);
                    $this.data(DATA_KEY$3, data);
                }
                if (typeof config === 'string') {
                    if (typeof data[config] === 'undefined') {
                        throw new TypeError("No method named \"" + config + "\"");
                    }
                    data[config]();
                }
            });
        };
        _createClass(Collapse, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION$3;
                }
            }, {
                key: "Default",
                get: function get() {
                    return Default$1;
                }
            }]);
        return Collapse;
    }();
    $(document).on(Event$3.CLICK_DATA_API, Selector$3.DATA_TOGGLE, function (event) {
        if (event.currentTarget.tagName === 'A') {
            event.preventDefault();
        }
        var $trigger = $(this);
        var selector = Util.getSelectorFromElement(this);
        var selectors = [].slice.call(document.querySelectorAll(selector));
        $(selectors).each(function () {
            var $target = $(this);
            var data = $target.data(DATA_KEY$3);
            var config = data ? 'toggle' : $trigger.data();
            Collapse._jQueryInterface.call($target, config);
        });
    });
    $.fn[NAME$3] = Collapse._jQueryInterface;
    $.fn[NAME$3].Constructor = Collapse;
    $.fn[NAME$3].noConflict = function () {
        $.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
        return Collapse._jQueryInterface;
    };
    var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
    var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
    var timeoutDuration = 0;
    for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
        if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
            timeoutDuration = 1;
            break;
        }
    }
    function microtaskDebounce(fn) {
        var called = false;
        return function () {
            if (called) {
                return;
            }
            called = true;
            window.Promise.resolve().then(function () {
                called = false;
                fn();
            });
        };
    }
    function taskDebounce(fn) {
        var scheduled = false;
        return function () {
            if (!scheduled) {
                scheduled = true;
                setTimeout(function () {
                    scheduled = false;
                    fn();
                }, timeoutDuration);
            }
        };
    }
    var supportsMicroTasks = isBrowser && window.Promise;
    var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;
    function isFunction(functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }
    function getStyleComputedProperty(element, property) {
        if (element.nodeType !== 1) {
            return [];
        }
        var window = element.ownerDocument.defaultView;
        var css = window.getComputedStyle(element, null);
        return property ? css[property] : css;
    }
    function getParentNode(element) {
        if (element.nodeName === 'HTML') {
            return element;
        }
        return element.parentNode || element.host;
    }
    function getScrollParent(element) {
        if (!element) {
            return document.body;
        }
        switch (element.nodeName) {
            case 'HTML':
            case 'BODY':
                return element.ownerDocument.body;
            case '#document':
                return element.body;
        }
        var _getStyleComputedProp = getStyleComputedProperty(element), overflow = _getStyleComputedProp.overflow, overflowX = _getStyleComputedProp.overflowX, overflowY = _getStyleComputedProp.overflowY;
        if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
            return element;
        }
        return getScrollParent(getParentNode(element));
    }
    var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
    var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);
    function isIE(version) {
        if (version === 11) {
            return isIE11;
        }
        if (version === 10) {
            return isIE10;
        }
        return isIE11 || isIE10;
    }
    function getOffsetParent(element) {
        if (!element) {
            return document.documentElement;
        }
        var noOffsetParent = isIE(10) ? document.body : null;
        var offsetParent = element.offsetParent || null;
        while (offsetParent === noOffsetParent && element.nextElementSibling) {
            offsetParent = (element = element.nextElementSibling).offsetParent;
        }
        var nodeName = offsetParent && offsetParent.nodeName;
        if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
            return element ? element.ownerDocument.documentElement : document.documentElement;
        }
        if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
            return getOffsetParent(offsetParent);
        }
        return offsetParent;
    }
    function isOffsetContainer(element) {
        var nodeName = element.nodeName;
        if (nodeName === 'BODY') {
            return false;
        }
        return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
    }
    function getRoot(node) {
        if (node.parentNode !== null) {
            return getRoot(node.parentNode);
        }
        return node;
    }
    function findCommonOffsetParent(element1, element2) {
        if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
            return document.documentElement;
        }
        var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
        var start = order ? element1 : element2;
        var end = order ? element2 : element1;
        var range = document.createRange();
        range.setStart(start, 0);
        range.setEnd(end, 0);
        var commonAncestorContainer = range.commonAncestorContainer;
        if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
            if (isOffsetContainer(commonAncestorContainer)) {
                return commonAncestorContainer;
            }
            return getOffsetParent(commonAncestorContainer);
        }
        var element1root = getRoot(element1);
        if (element1root.host) {
            return findCommonOffsetParent(element1root.host, element2);
        }
        else {
            return findCommonOffsetParent(element1, getRoot(element2).host);
        }
    }
    function getScroll(element) {
        var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
        var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
        var nodeName = element.nodeName;
        if (nodeName === 'BODY' || nodeName === 'HTML') {
            var html = element.ownerDocument.documentElement;
            var scrollingElement = element.ownerDocument.scrollingElement || html;
            return scrollingElement[upperSide];
        }
        return element[upperSide];
    }
    function includeScroll(rect, element) {
        var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var scrollTop = getScroll(element, 'top');
        var scrollLeft = getScroll(element, 'left');
        var modifier = subtract ? -1 : 1;
        rect.top += scrollTop * modifier;
        rect.bottom += scrollTop * modifier;
        rect.left += scrollLeft * modifier;
        rect.right += scrollLeft * modifier;
        return rect;
    }
    function getBordersSize(styles, axis) {
        var sideA = axis === 'x' ? 'Left' : 'Top';
        var sideB = sideA === 'Left' ? 'Right' : 'Bottom';
        return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
    }
    function getSize(axis, body, html, computedStyle) {
        return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
    }
    function getWindowSizes(document) {
        var body = document.body;
        var html = document.documentElement;
        var computedStyle = isIE(10) && getComputedStyle(html);
        return {
            height: getSize('Height', body, html, computedStyle),
            width: getSize('Width', body, html, computedStyle)
        };
    }
    var classCallCheck = function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    };
    var createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function (Constructor, protoProps, staticProps) {
            if (protoProps)
                defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
                defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
    var defineProperty = function (obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        }
        else {
            obj[key] = value;
        }
        return obj;
    };
    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    function getClientRect(offsets) {
        return _extends({}, offsets, {
            right: offsets.left + offsets.width,
            bottom: offsets.top + offsets.height
        });
    }
    function getBoundingClientRect(element) {
        var rect = {};
        try {
            if (isIE(10)) {
                rect = element.getBoundingClientRect();
                var scrollTop = getScroll(element, 'top');
                var scrollLeft = getScroll(element, 'left');
                rect.top += scrollTop;
                rect.left += scrollLeft;
                rect.bottom += scrollTop;
                rect.right += scrollLeft;
            }
            else {
                rect = element.getBoundingClientRect();
            }
        }
        catch (e) { }
        var result = {
            left: rect.left,
            top: rect.top,
            width: rect.right - rect.left,
            height: rect.bottom - rect.top
        };
        var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
        var width = sizes.width || element.clientWidth || result.right - result.left;
        var height = sizes.height || element.clientHeight || result.bottom - result.top;
        var horizScrollbar = element.offsetWidth - width;
        var vertScrollbar = element.offsetHeight - height;
        if (horizScrollbar || vertScrollbar) {
            var styles = getStyleComputedProperty(element);
            horizScrollbar -= getBordersSize(styles, 'x');
            vertScrollbar -= getBordersSize(styles, 'y');
            result.width -= horizScrollbar;
            result.height -= vertScrollbar;
        }
        return getClientRect(result);
    }
    function getOffsetRectRelativeToArbitraryNode(children, parent) {
        var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var isIE10 = isIE(10);
        var isHTML = parent.nodeName === 'HTML';
        var childrenRect = getBoundingClientRect(children);
        var parentRect = getBoundingClientRect(parent);
        var scrollParent = getScrollParent(children);
        var styles = getStyleComputedProperty(parent);
        var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
        var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);
        if (fixedPosition && isHTML) {
            parentRect.top = Math.max(parentRect.top, 0);
            parentRect.left = Math.max(parentRect.left, 0);
        }
        var offsets = getClientRect({
            top: childrenRect.top - parentRect.top - borderTopWidth,
            left: childrenRect.left - parentRect.left - borderLeftWidth,
            width: childrenRect.width,
            height: childrenRect.height
        });
        offsets.marginTop = 0;
        offsets.marginLeft = 0;
        if (!isIE10 && isHTML) {
            var marginTop = parseFloat(styles.marginTop, 10);
            var marginLeft = parseFloat(styles.marginLeft, 10);
            offsets.top -= borderTopWidth - marginTop;
            offsets.bottom -= borderTopWidth - marginTop;
            offsets.left -= borderLeftWidth - marginLeft;
            offsets.right -= borderLeftWidth - marginLeft;
            offsets.marginTop = marginTop;
            offsets.marginLeft = marginLeft;
        }
        if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
            offsets = includeScroll(offsets, parent);
        }
        return offsets;
    }
    function getViewportOffsetRectRelativeToArtbitraryNode(element) {
        var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var html = element.ownerDocument.documentElement;
        var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
        var width = Math.max(html.clientWidth, window.innerWidth || 0);
        var height = Math.max(html.clientHeight, window.innerHeight || 0);
        var scrollTop = !excludeScroll ? getScroll(html) : 0;
        var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;
        var offset = {
            top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
            left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
            width: width,
            height: height
        };
        return getClientRect(offset);
    }
    function isFixed(element) {
        var nodeName = element.nodeName;
        if (nodeName === 'BODY' || nodeName === 'HTML') {
            return false;
        }
        if (getStyleComputedProperty(element, 'position') === 'fixed') {
            return true;
        }
        var parentNode = getParentNode(element);
        if (!parentNode) {
            return false;
        }
        return isFixed(parentNode);
    }
    function getFixedPositionOffsetParent(element) {
        if (!element || !element.parentElement || isIE()) {
            return document.documentElement;
        }
        var el = element.parentElement;
        while (el && getStyleComputedProperty(el, 'transform') === 'none') {
            el = el.parentElement;
        }
        return el || document.documentElement;
    }
    function getBoundaries(popper, reference, padding, boundariesElement) {
        var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var boundaries = { top: 0, left: 0 };
        var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
        if (boundariesElement === 'viewport') {
            boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
        }
        else {
            var boundariesNode = void 0;
            if (boundariesElement === 'scrollParent') {
                boundariesNode = getScrollParent(getParentNode(reference));
                if (boundariesNode.nodeName === 'BODY') {
                    boundariesNode = popper.ownerDocument.documentElement;
                }
            }
            else if (boundariesElement === 'window') {
                boundariesNode = popper.ownerDocument.documentElement;
            }
            else {
                boundariesNode = boundariesElement;
            }
            var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);
            if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
                var _getWindowSizes = getWindowSizes(popper.ownerDocument), height = _getWindowSizes.height, width = _getWindowSizes.width;
                boundaries.top += offsets.top - offsets.marginTop;
                boundaries.bottom = height + offsets.top;
                boundaries.left += offsets.left - offsets.marginLeft;
                boundaries.right = width + offsets.left;
            }
            else {
                boundaries = offsets;
            }
        }
        padding = padding || 0;
        var isPaddingNumber = typeof padding === 'number';
        boundaries.left += isPaddingNumber ? padding : padding.left || 0;
        boundaries.top += isPaddingNumber ? padding : padding.top || 0;
        boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
        boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;
        return boundaries;
    }
    function getArea(_ref) {
        var width = _ref.width, height = _ref.height;
        return width * height;
    }
    function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
        var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
        if (placement.indexOf('auto') === -1) {
            return placement;
        }
        var boundaries = getBoundaries(popper, reference, padding, boundariesElement);
        var rects = {
            top: {
                width: boundaries.width,
                height: refRect.top - boundaries.top
            },
            right: {
                width: boundaries.right - refRect.right,
                height: boundaries.height
            },
            bottom: {
                width: boundaries.width,
                height: boundaries.bottom - refRect.bottom
            },
            left: {
                width: refRect.left - boundaries.left,
                height: boundaries.height
            }
        };
        var sortedAreas = Object.keys(rects).map(function (key) {
            return _extends({
                key: key
            }, rects[key], {
                area: getArea(rects[key])
            });
        }).sort(function (a, b) {
            return b.area - a.area;
        });
        var filteredAreas = sortedAreas.filter(function (_ref2) {
            var width = _ref2.width, height = _ref2.height;
            return width >= popper.clientWidth && height >= popper.clientHeight;
        });
        var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;
        var variation = placement.split('-')[1];
        return computedPlacement + (variation ? '-' + variation : '');
    }
    function getReferenceOffsets(state, popper, reference) {
        var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
        return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
    }
    function getOuterSizes(element) {
        var window = element.ownerDocument.defaultView;
        var styles = window.getComputedStyle(element);
        var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
        var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
        var result = {
            width: element.offsetWidth + y,
            height: element.offsetHeight + x
        };
        return result;
    }
    function getOppositePlacement(placement) {
        var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
        return placement.replace(/left|right|bottom|top/g, function (matched) {
            return hash[matched];
        });
    }
    function getPopperOffsets(popper, referenceOffsets, placement) {
        placement = placement.split('-')[0];
        var popperRect = getOuterSizes(popper);
        var popperOffsets = {
            width: popperRect.width,
            height: popperRect.height
        };
        var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
        var mainSide = isHoriz ? 'top' : 'left';
        var secondarySide = isHoriz ? 'left' : 'top';
        var measurement = isHoriz ? 'height' : 'width';
        var secondaryMeasurement = !isHoriz ? 'height' : 'width';
        popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
        if (placement === secondarySide) {
            popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
        }
        else {
            popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
        }
        return popperOffsets;
    }
    function find(arr, check) {
        if (Array.prototype.find) {
            return arr.find(check);
        }
        return arr.filter(check)[0];
    }
    function findIndex(arr, prop, value) {
        if (Array.prototype.findIndex) {
            return arr.findIndex(function (cur) {
                return cur[prop] === value;
            });
        }
        var match = find(arr, function (obj) {
            return obj[prop] === value;
        });
        return arr.indexOf(match);
    }
    function runModifiers(modifiers, data, ends) {
        var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));
        modifiersToRun.forEach(function (modifier) {
            if (modifier['function']) {
                console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
            }
            var fn = modifier['function'] || modifier.fn;
            if (modifier.enabled && isFunction(fn)) {
                data.offsets.popper = getClientRect(data.offsets.popper);
                data.offsets.reference = getClientRect(data.offsets.reference);
                data = fn(data, modifier);
            }
        });
        return data;
    }
    function update() {
        if (this.state.isDestroyed) {
            return;
        }
        var data = {
            instance: this,
            styles: {},
            arrowStyles: {},
            attributes: {},
            flipped: false,
            offsets: {}
        };
        data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);
        data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);
        data.originalPlacement = data.placement;
        data.positionFixed = this.options.positionFixed;
        data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
        data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';
        data = runModifiers(this.modifiers, data);
        if (!this.state.isCreated) {
            this.state.isCreated = true;
            this.options.onCreate(data);
        }
        else {
            this.options.onUpdate(data);
        }
    }
    function isModifierEnabled(modifiers, modifierName) {
        return modifiers.some(function (_ref) {
            var name = _ref.name, enabled = _ref.enabled;
            return enabled && name === modifierName;
        });
    }
    function getSupportedPropertyName(property) {
        var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
        var upperProp = property.charAt(0).toUpperCase() + property.slice(1);
        for (var i = 0; i < prefixes.length; i++) {
            var prefix = prefixes[i];
            var toCheck = prefix ? '' + prefix + upperProp : property;
            if (typeof document.body.style[toCheck] !== 'undefined') {
                return toCheck;
            }
        }
        return null;
    }
    function destroy() {
        this.state.isDestroyed = true;
        if (isModifierEnabled(this.modifiers, 'applyStyle')) {
            this.popper.removeAttribute('x-placement');
            this.popper.style.position = '';
            this.popper.style.top = '';
            this.popper.style.left = '';
            this.popper.style.right = '';
            this.popper.style.bottom = '';
            this.popper.style.willChange = '';
            this.popper.style[getSupportedPropertyName('transform')] = '';
        }
        this.disableEventListeners();
        if (this.options.removeOnDestroy) {
            this.popper.parentNode.removeChild(this.popper);
        }
        return this;
    }
    function getWindow(element) {
        var ownerDocument = element.ownerDocument;
        return ownerDocument ? ownerDocument.defaultView : window;
    }
    function attachToScrollParents(scrollParent, event, callback, scrollParents) {
        var isBody = scrollParent.nodeName === 'BODY';
        var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
        target.addEventListener(event, callback, { passive: true });
        if (!isBody) {
            attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
        }
        scrollParents.push(target);
    }
    function setupEventListeners(reference, options, state, updateBound) {
        state.updateBound = updateBound;
        getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });
        var scrollElement = getScrollParent(reference);
        attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
        state.scrollElement = scrollElement;
        state.eventsEnabled = true;
        return state;
    }
    function enableEventListeners() {
        if (!this.state.eventsEnabled) {
            this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
        }
    }
    function removeEventListeners(reference, state) {
        getWindow(reference).removeEventListener('resize', state.updateBound);
        state.scrollParents.forEach(function (target) {
            target.removeEventListener('scroll', state.updateBound);
        });
        state.updateBound = null;
        state.scrollParents = [];
        state.scrollElement = null;
        state.eventsEnabled = false;
        return state;
    }
    function disableEventListeners() {
        if (this.state.eventsEnabled) {
            cancelAnimationFrame(this.scheduleUpdate);
            this.state = removeEventListeners(this.reference, this.state);
        }
    }
    function isNumeric(n) {
        return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
    }
    function setStyles(element, styles) {
        Object.keys(styles).forEach(function (prop) {
            var unit = '';
            if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
                unit = 'px';
            }
            element.style[prop] = styles[prop] + unit;
        });
    }
    function setAttributes(element, attributes) {
        Object.keys(attributes).forEach(function (prop) {
            var value = attributes[prop];
            if (value !== false) {
                element.setAttribute(prop, attributes[prop]);
            }
            else {
                element.removeAttribute(prop);
            }
        });
    }
    function applyStyle(data) {
        setStyles(data.instance.popper, data.styles);
        setAttributes(data.instance.popper, data.attributes);
        if (data.arrowElement && Object.keys(data.arrowStyles).length) {
            setStyles(data.arrowElement, data.arrowStyles);
        }
        return data;
    }
    function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
        var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);
        var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);
        popper.setAttribute('x-placement', placement);
        setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });
        return options;
    }
    function getRoundedOffsets(data, shouldRound) {
        var _data$offsets = data.offsets, popper = _data$offsets.popper, reference = _data$offsets.reference;
        var round = Math.round, floor = Math.floor;
        var noRound = function noRound(v) {
            return v;
        };
        var referenceWidth = round(reference.width);
        var popperWidth = round(popper.width);
        var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
        var isVariation = data.placement.indexOf('-') !== -1;
        var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
        var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;
        var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
        var verticalToInteger = !shouldRound ? noRound : round;
        return {
            left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
            top: verticalToInteger(popper.top),
            bottom: verticalToInteger(popper.bottom),
            right: horizontalToInteger(popper.right)
        };
    }
    var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);
    function computeStyle(data, options) {
        var x = options.x, y = options.y;
        var popper = data.offsets.popper;
        var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
            return modifier.name === 'applyStyle';
        }).gpuAcceleration;
        if (legacyGpuAccelerationOption !== undefined) {
            console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
        }
        var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;
        var offsetParent = getOffsetParent(data.instance.popper);
        var offsetParentRect = getBoundingClientRect(offsetParent);
        var styles = {
            position: popper.position
        };
        var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);
        var sideA = x === 'bottom' ? 'top' : 'bottom';
        var sideB = y === 'right' ? 'left' : 'right';
        var prefixedProperty = getSupportedPropertyName('transform');
        var left = void 0, top = void 0;
        if (sideA === 'bottom') {
            if (offsetParent.nodeName === 'HTML') {
                top = -offsetParent.clientHeight + offsets.bottom;
            }
            else {
                top = -offsetParentRect.height + offsets.bottom;
            }
        }
        else {
            top = offsets.top;
        }
        if (sideB === 'right') {
            if (offsetParent.nodeName === 'HTML') {
                left = -offsetParent.clientWidth + offsets.right;
            }
            else {
                left = -offsetParentRect.width + offsets.right;
            }
        }
        else {
            left = offsets.left;
        }
        if (gpuAcceleration && prefixedProperty) {
            styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
            styles[sideA] = 0;
            styles[sideB] = 0;
            styles.willChange = 'transform';
        }
        else {
            var invertTop = sideA === 'bottom' ? -1 : 1;
            var invertLeft = sideB === 'right' ? -1 : 1;
            styles[sideA] = top * invertTop;
            styles[sideB] = left * invertLeft;
            styles.willChange = sideA + ', ' + sideB;
        }
        var attributes = {
            'x-placement': data.placement
        };
        data.attributes = _extends({}, attributes, data.attributes);
        data.styles = _extends({}, styles, data.styles);
        data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);
        return data;
    }
    function isModifierRequired(modifiers, requestingName, requestedName) {
        var requesting = find(modifiers, function (_ref) {
            var name = _ref.name;
            return name === requestingName;
        });
        var isRequired = !!requesting && modifiers.some(function (modifier) {
            return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
        });
        if (!isRequired) {
            var _requesting = '`' + requestingName + '`';
            var requested = '`' + requestedName + '`';
            console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
        }
        return isRequired;
    }
    function arrow(data, options) {
        var _data$offsets$arrow;
        if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
            return data;
        }
        var arrowElement = options.element;
        if (typeof arrowElement === 'string') {
            arrowElement = data.instance.popper.querySelector(arrowElement);
            if (!arrowElement) {
                return data;
            }
        }
        else {
            if (!data.instance.popper.contains(arrowElement)) {
                console.warn('WARNING: `arrow.element` must be child of its popper element!');
                return data;
            }
        }
        var placement = data.placement.split('-')[0];
        var _data$offsets = data.offsets, popper = _data$offsets.popper, reference = _data$offsets.reference;
        var isVertical = ['left', 'right'].indexOf(placement) !== -1;
        var len = isVertical ? 'height' : 'width';
        var sideCapitalized = isVertical ? 'Top' : 'Left';
        var side = sideCapitalized.toLowerCase();
        var altSide = isVertical ? 'left' : 'top';
        var opSide = isVertical ? 'bottom' : 'right';
        var arrowElementSize = getOuterSizes(arrowElement)[len];
        if (reference[opSide] - arrowElementSize < popper[side]) {
            data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
        }
        if (reference[side] + arrowElementSize > popper[opSide]) {
            data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
        }
        data.offsets.popper = getClientRect(data.offsets.popper);
        var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;
        var css = getStyleComputedProperty(data.instance.popper);
        var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
        var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
        var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;
        sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);
        data.arrowElement = arrowElement;
        data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);
        return data;
    }
    function getOppositeVariation(variation) {
        if (variation === 'end') {
            return 'start';
        }
        else if (variation === 'start') {
            return 'end';
        }
        return variation;
    }
    var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];
    var validPlacements = placements.slice(3);
    function clockwise(placement) {
        var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var index = validPlacements.indexOf(placement);
        var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
        return counter ? arr.reverse() : arr;
    }
    var BEHAVIORS = {
        FLIP: 'flip',
        CLOCKWISE: 'clockwise',
        COUNTERCLOCKWISE: 'counterclockwise'
    };
    function flip(data, options) {
        if (isModifierEnabled(data.instance.modifiers, 'inner')) {
            return data;
        }
        if (data.flipped && data.placement === data.originalPlacement) {
            return data;
        }
        var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);
        var placement = data.placement.split('-')[0];
        var placementOpposite = getOppositePlacement(placement);
        var variation = data.placement.split('-')[1] || '';
        var flipOrder = [];
        switch (options.behavior) {
            case BEHAVIORS.FLIP:
                flipOrder = [placement, placementOpposite];
                break;
            case BEHAVIORS.CLOCKWISE:
                flipOrder = clockwise(placement);
                break;
            case BEHAVIORS.COUNTERCLOCKWISE:
                flipOrder = clockwise(placement, true);
                break;
            default:
                flipOrder = options.behavior;
        }
        flipOrder.forEach(function (step, index) {
            if (placement !== step || flipOrder.length === index + 1) {
                return data;
            }
            placement = data.placement.split('-')[0];
            placementOpposite = getOppositePlacement(placement);
            var popperOffsets = data.offsets.popper;
            var refOffsets = data.offsets.reference;
            var floor = Math.floor;
            var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);
            var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
            var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
            var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
            var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);
            var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;
            var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
            var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);
            if (overlapsRef || overflowsBoundaries || flippedVariation) {
                data.flipped = true;
                if (overlapsRef || overflowsBoundaries) {
                    placement = flipOrder[index + 1];
                }
                if (flippedVariation) {
                    variation = getOppositeVariation(variation);
                }
                data.placement = placement + (variation ? '-' + variation : '');
                data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));
                data = runModifiers(data.instance.modifiers, data, 'flip');
            }
        });
        return data;
    }
    function keepTogether(data) {
        var _data$offsets = data.offsets, popper = _data$offsets.popper, reference = _data$offsets.reference;
        var placement = data.placement.split('-')[0];
        var floor = Math.floor;
        var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
        var side = isVertical ? 'right' : 'bottom';
        var opSide = isVertical ? 'left' : 'top';
        var measurement = isVertical ? 'width' : 'height';
        if (popper[side] < floor(reference[opSide])) {
            data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
        }
        if (popper[opSide] > floor(reference[side])) {
            data.offsets.popper[opSide] = floor(reference[side]);
        }
        return data;
    }
    function toValue(str, measurement, popperOffsets, referenceOffsets) {
        var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
        var value = +split[1];
        var unit = split[2];
        if (!value) {
            return str;
        }
        if (unit.indexOf('%') === 0) {
            var element = void 0;
            switch (unit) {
                case '%p':
                    element = popperOffsets;
                    break;
                case '%':
                case '%r':
                default:
                    element = referenceOffsets;
            }
            var rect = getClientRect(element);
            return rect[measurement] / 100 * value;
        }
        else if (unit === 'vh' || unit === 'vw') {
            var size = void 0;
            if (unit === 'vh') {
                size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            }
            else {
                size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            }
            return size / 100 * value;
        }
        else {
            return value;
        }
    }
    function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
        var offsets = [0, 0];
        var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;
        var fragments = offset.split(/(\+|\-)/).map(function (frag) {
            return frag.trim();
        });
        var divider = fragments.indexOf(find(fragments, function (frag) {
            return frag.search(/,|\s/) !== -1;
        }));
        if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
            console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
        }
        var splitRegex = /\s*,\s*|\s+/;
        var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];
        ops = ops.map(function (op, index) {
            var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
            var mergeWithPrevious = false;
            return op
                .reduce(function (a, b) {
                if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
                    a[a.length - 1] = b;
                    mergeWithPrevious = true;
                    return a;
                }
                else if (mergeWithPrevious) {
                    a[a.length - 1] += b;
                    mergeWithPrevious = false;
                    return a;
                }
                else {
                    return a.concat(b);
                }
            }, [])
                .map(function (str) {
                return toValue(str, measurement, popperOffsets, referenceOffsets);
            });
        });
        ops.forEach(function (op, index) {
            op.forEach(function (frag, index2) {
                if (isNumeric(frag)) {
                    offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
                }
            });
        });
        return offsets;
    }
    function offset(data, _ref) {
        var offset = _ref.offset;
        var placement = data.placement, _data$offsets = data.offsets, popper = _data$offsets.popper, reference = _data$offsets.reference;
        var basePlacement = placement.split('-')[0];
        var offsets = void 0;
        if (isNumeric(+offset)) {
            offsets = [+offset, 0];
        }
        else {
            offsets = parseOffset(offset, popper, reference, basePlacement);
        }
        if (basePlacement === 'left') {
            popper.top += offsets[0];
            popper.left -= offsets[1];
        }
        else if (basePlacement === 'right') {
            popper.top += offsets[0];
            popper.left += offsets[1];
        }
        else if (basePlacement === 'top') {
            popper.left += offsets[0];
            popper.top -= offsets[1];
        }
        else if (basePlacement === 'bottom') {
            popper.left += offsets[0];
            popper.top += offsets[1];
        }
        data.popper = popper;
        return data;
    }
    function preventOverflow(data, options) {
        var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);
        if (data.instance.reference === boundariesElement) {
            boundariesElement = getOffsetParent(boundariesElement);
        }
        var transformProp = getSupportedPropertyName('transform');
        var popperStyles = data.instance.popper.style;
        var top = popperStyles.top, left = popperStyles.left, transform = popperStyles[transformProp];
        popperStyles.top = '';
        popperStyles.left = '';
        popperStyles[transformProp] = '';
        var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);
        popperStyles.top = top;
        popperStyles.left = left;
        popperStyles[transformProp] = transform;
        options.boundaries = boundaries;
        var order = options.priority;
        var popper = data.offsets.popper;
        var check = {
            primary: function primary(placement) {
                var value = popper[placement];
                if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
                    value = Math.max(popper[placement], boundaries[placement]);
                }
                return defineProperty({}, placement, value);
            },
            secondary: function secondary(placement) {
                var mainSide = placement === 'right' ? 'left' : 'top';
                var value = popper[mainSide];
                if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
                    value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
                }
                return defineProperty({}, mainSide, value);
            }
        };
        order.forEach(function (placement) {
            var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
            popper = _extends({}, popper, check[side](placement));
        });
        data.offsets.popper = popper;
        return data;
    }
    function shift(data) {
        var placement = data.placement;
        var basePlacement = placement.split('-')[0];
        var shiftvariation = placement.split('-')[1];
        if (shiftvariation) {
            var _data$offsets = data.offsets, reference = _data$offsets.reference, popper = _data$offsets.popper;
            var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
            var side = isVertical ? 'left' : 'top';
            var measurement = isVertical ? 'width' : 'height';
            var shiftOffsets = {
                start: defineProperty({}, side, reference[side]),
                end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
            };
            data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
        }
        return data;
    }
    function hide(data) {
        if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
            return data;
        }
        var refRect = data.offsets.reference;
        var bound = find(data.instance.modifiers, function (modifier) {
            return modifier.name === 'preventOverflow';
        }).boundaries;
        if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
            if (data.hide === true) {
                return data;
            }
            data.hide = true;
            data.attributes['x-out-of-boundaries'] = '';
        }
        else {
            if (data.hide === false) {
                return data;
            }
            data.hide = false;
            data.attributes['x-out-of-boundaries'] = false;
        }
        return data;
    }
    function inner(data) {
        var placement = data.placement;
        var basePlacement = placement.split('-')[0];
        var _data$offsets = data.offsets, popper = _data$offsets.popper, reference = _data$offsets.reference;
        var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;
        var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;
        popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);
        data.placement = getOppositePlacement(placement);
        data.offsets.popper = getClientRect(popper);
        return data;
    }
    var modifiers = {
        shift: {
            order: 100,
            enabled: true,
            fn: shift
        },
        offset: {
            order: 200,
            enabled: true,
            fn: offset,
            offset: 0
        },
        preventOverflow: {
            order: 300,
            enabled: true,
            fn: preventOverflow,
            priority: ['left', 'right', 'top', 'bottom'],
            padding: 5,
            boundariesElement: 'scrollParent'
        },
        keepTogether: {
            order: 400,
            enabled: true,
            fn: keepTogether
        },
        arrow: {
            order: 500,
            enabled: true,
            fn: arrow,
            element: '[x-arrow]'
        },
        flip: {
            order: 600,
            enabled: true,
            fn: flip,
            behavior: 'flip',
            padding: 5,
            boundariesElement: 'viewport'
        },
        inner: {
            order: 700,
            enabled: false,
            fn: inner
        },
        hide: {
            order: 800,
            enabled: true,
            fn: hide
        },
        computeStyle: {
            order: 850,
            enabled: true,
            fn: computeStyle,
            gpuAcceleration: true,
            x: 'bottom',
            y: 'right'
        },
        applyStyle: {
            order: 900,
            enabled: true,
            fn: applyStyle,
            onLoad: applyStyleOnLoad,
            gpuAcceleration: undefined
        }
    };
    var Defaults = {
        placement: 'bottom',
        positionFixed: false,
        eventsEnabled: true,
        removeOnDestroy: false,
        onCreate: function onCreate() { },
        onUpdate: function onUpdate() { },
        modifiers: modifiers
    };
    var Popper = function () {
        function Popper(reference, popper) {
            var _this = this;
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            classCallCheck(this, Popper);
            this.scheduleUpdate = function () {
                return requestAnimationFrame(_this.update);
            };
            this.update = debounce(this.update.bind(this));
            this.options = _extends({}, Popper.Defaults, options);
            this.state = {
                isDestroyed: false,
                isCreated: false,
                scrollParents: []
            };
            this.reference = reference && reference.jquery ? reference[0] : reference;
            this.popper = popper && popper.jquery ? popper[0] : popper;
            this.options.modifiers = {};
            Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
                _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
            });
            this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
                return _extends({
                    name: name
                }, _this.options.modifiers[name]);
            })
                .sort(function (a, b) {
                return a.order - b.order;
            });
            this.modifiers.forEach(function (modifierOptions) {
                if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
                    modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
                }
            });
            this.update();
            var eventsEnabled = this.options.eventsEnabled;
            if (eventsEnabled) {
                this.enableEventListeners();
            }
            this.state.eventsEnabled = eventsEnabled;
        }
        createClass(Popper, [{
                key: 'update',
                value: function update$$1() {
                    return update.call(this);
                }
            }, {
                key: 'destroy',
                value: function destroy$$1() {
                    return destroy.call(this);
                }
            }, {
                key: 'enableEventListeners',
                value: function enableEventListeners$$1() {
                    return enableEventListeners.call(this);
                }
            }, {
                key: 'disableEventListeners',
                value: function disableEventListeners$$1() {
                    return disableEventListeners.call(this);
                }
            }]);
        return Popper;
    }();
    Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
    Popper.placements = placements;
    Popper.Defaults = Defaults;
    var NAME$4 = 'dropdown';
    var VERSION$4 = '4.3.1';
    var DATA_KEY$4 = 'bs.dropdown';
    var EVENT_KEY$4 = "." + DATA_KEY$4;
    var DATA_API_KEY$4 = '.data-api';
    var JQUERY_NO_CONFLICT$4 = $.fn[NAME$4];
    var ESCAPE_KEYCODE = 27;
    var SPACE_KEYCODE = 32;
    var TAB_KEYCODE = 9;
    var ARROW_UP_KEYCODE = 38;
    var ARROW_DOWN_KEYCODE = 40;
    var RIGHT_MOUSE_BUTTON_WHICH = 3;
    var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
    var Event$4 = {
        HIDE: "hide" + EVENT_KEY$4,
        HIDDEN: "hidden" + EVENT_KEY$4,
        SHOW: "show" + EVENT_KEY$4,
        SHOWN: "shown" + EVENT_KEY$4,
        CLICK: "click" + EVENT_KEY$4,
        CLICK_DATA_API: "click" + EVENT_KEY$4 + DATA_API_KEY$4,
        KEYDOWN_DATA_API: "keydown" + EVENT_KEY$4 + DATA_API_KEY$4,
        KEYUP_DATA_API: "keyup" + EVENT_KEY$4 + DATA_API_KEY$4
    };
    var ClassName$4 = {
        DISABLED: 'disabled',
        SHOW: 'show',
        DROPUP: 'dropup',
        DROPRIGHT: 'dropright',
        DROPLEFT: 'dropleft',
        MENURIGHT: 'dropdown-menu-right',
        MENULEFT: 'dropdown-menu-left',
        POSITION_STATIC: 'position-static'
    };
    var Selector$4 = {
        DATA_TOGGLE: '[data-toggle="dropdown"]',
        FORM_CHILD: '.dropdown form',
        MENU: '.dropdown-menu',
        NAVBAR_NAV: '.navbar-nav',
        VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
    };
    var AttachmentMap = {
        TOP: 'top-start',
        TOPEND: 'top-end',
        BOTTOM: 'bottom-start',
        BOTTOMEND: 'bottom-end',
        RIGHT: 'right-start',
        RIGHTEND: 'right-end',
        LEFT: 'left-start',
        LEFTEND: 'left-end'
    };
    var Default$2 = {
        offset: 0,
        flip: true,
        boundary: 'scrollParent',
        reference: 'toggle',
        display: 'dynamic'
    };
    var DefaultType$2 = {
        offset: '(number|string|function)',
        flip: 'boolean',
        boundary: '(string|element)',
        reference: '(string|element)',
        display: 'string'
    };
    var Dropdown = function () {
        function Dropdown(element, config) {
            this._element = element;
            this._popper = null;
            this._config = this._getConfig(config);
            this._menu = this._getMenuElement();
            this._inNavbar = this._detectNavbar();
            this._addEventListeners();
        }
        var _proto = Dropdown.prototype;
        _proto.toggle = function toggle() {
            if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED)) {
                return;
            }
            var parent = Dropdown._getParentFromElement(this._element);
            var isActive = $(this._menu).hasClass(ClassName$4.SHOW);
            Dropdown._clearMenus();
            if (isActive) {
                return;
            }
            var relatedTarget = {
                relatedTarget: this._element
            };
            var showEvent = $.Event(Event$4.SHOW, relatedTarget);
            $(parent).trigger(showEvent);
            if (showEvent.isDefaultPrevented()) {
                return;
            }
            if (!this._inNavbar) {
                if (typeof Popper === 'undefined') {
                    throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
                }
                var referenceElement = this._element;
                if (this._config.reference === 'parent') {
                    referenceElement = parent;
                }
                else if (Util.isElement(this._config.reference)) {
                    referenceElement = this._config.reference;
                    if (typeof this._config.reference.jquery !== 'undefined') {
                        referenceElement = this._config.reference[0];
                    }
                }
                if (this._config.boundary !== 'scrollParent') {
                    $(parent).addClass(ClassName$4.POSITION_STATIC);
                }
                this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
            }
            if ('ontouchstart' in document.documentElement && $(parent).closest(Selector$4.NAVBAR_NAV).length === 0) {
                $(document.body).children().on('mouseover', null, $.noop);
            }
            this._element.focus();
            this._element.setAttribute('aria-expanded', true);
            $(this._menu).toggleClass(ClassName$4.SHOW);
            $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN, relatedTarget));
        };
        _proto.show = function show() {
            if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || $(this._menu).hasClass(ClassName$4.SHOW)) {
                return;
            }
            var relatedTarget = {
                relatedTarget: this._element
            };
            var showEvent = $.Event(Event$4.SHOW, relatedTarget);
            var parent = Dropdown._getParentFromElement(this._element);
            $(parent).trigger(showEvent);
            if (showEvent.isDefaultPrevented()) {
                return;
            }
            $(this._menu).toggleClass(ClassName$4.SHOW);
            $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN, relatedTarget));
        };
        _proto.hide = function hide() {
            if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || !$(this._menu).hasClass(ClassName$4.SHOW)) {
                return;
            }
            var relatedTarget = {
                relatedTarget: this._element
            };
            var hideEvent = $.Event(Event$4.HIDE, relatedTarget);
            var parent = Dropdown._getParentFromElement(this._element);
            $(parent).trigger(hideEvent);
            if (hideEvent.isDefaultPrevented()) {
                return;
            }
            $(this._menu).toggleClass(ClassName$4.SHOW);
            $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
        };
        _proto.dispose = function dispose() {
            $.removeData(this._element, DATA_KEY$4);
            $(this._element).off(EVENT_KEY$4);
            this._element = null;
            this._menu = null;
            if (this._popper !== null) {
                this._popper.destroy();
                this._popper = null;
            }
        };
        _proto.update = function update() {
            this._inNavbar = this._detectNavbar();
            if (this._popper !== null) {
                this._popper.scheduleUpdate();
            }
        };
        _proto._addEventListeners = function _addEventListeners() {
            var _this = this;
            $(this._element).on(Event$4.CLICK, function (event) {
                event.preventDefault();
                event.stopPropagation();
                _this.toggle();
            });
        };
        _proto._getConfig = function _getConfig(config) {
            config = _objectSpread({}, this.constructor.Default, $(this._element).data(), config);
            Util.typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
            return config;
        };
        _proto._getMenuElement = function _getMenuElement() {
            if (!this._menu) {
                var parent = Dropdown._getParentFromElement(this._element);
                if (parent) {
                    this._menu = parent.querySelector(Selector$4.MENU);
                }
            }
            return this._menu;
        };
        _proto._getPlacement = function _getPlacement() {
            var $parentDropdown = $(this._element.parentNode);
            var placement = AttachmentMap.BOTTOM;
            if ($parentDropdown.hasClass(ClassName$4.DROPUP)) {
                placement = AttachmentMap.TOP;
                if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
                    placement = AttachmentMap.TOPEND;
                }
            }
            else if ($parentDropdown.hasClass(ClassName$4.DROPRIGHT)) {
                placement = AttachmentMap.RIGHT;
            }
            else if ($parentDropdown.hasClass(ClassName$4.DROPLEFT)) {
                placement = AttachmentMap.LEFT;
            }
            else if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
                placement = AttachmentMap.BOTTOMEND;
            }
            return placement;
        };
        _proto._detectNavbar = function _detectNavbar() {
            return $(this._element).closest('.navbar').length > 0;
        };
        _proto._getOffset = function _getOffset() {
            var _this2 = this;
            var offset = {};
            if (typeof this._config.offset === 'function') {
                offset.fn = function (data) {
                    data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets, _this2._element) || {});
                    return data;
                };
            }
            else {
                offset.offset = this._config.offset;
            }
            return offset;
        };
        _proto._getPopperConfig = function _getPopperConfig() {
            var popperConfig = {
                placement: this._getPlacement(),
                modifiers: {
                    offset: this._getOffset(),
                    flip: {
                        enabled: this._config.flip
                    },
                    preventOverflow: {
                        boundariesElement: this._config.boundary
                    }
                }
            };
            if (this._config.display === 'static') {
                popperConfig.modifiers.applyStyle = {
                    enabled: false
                };
            }
            return popperConfig;
        };
        Dropdown._jQueryInterface = function _jQueryInterface(config) {
            return this.each(function () {
                var data = $(this).data(DATA_KEY$4);
                var _config = typeof config === 'object' ? config : null;
                if (!data) {
                    data = new Dropdown(this, _config);
                    $(this).data(DATA_KEY$4, data);
                }
                if (typeof config === 'string') {
                    if (typeof data[config] === 'undefined') {
                        throw new TypeError("No method named \"" + config + "\"");
                    }
                    data[config]();
                }
            });
        };
        Dropdown._clearMenus = function _clearMenus(event) {
            if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
                return;
            }
            var toggles = [].slice.call(document.querySelectorAll(Selector$4.DATA_TOGGLE));
            for (var i = 0, len = toggles.length; i < len; i++) {
                var parent = Dropdown._getParentFromElement(toggles[i]);
                var context = $(toggles[i]).data(DATA_KEY$4);
                var relatedTarget = {
                    relatedTarget: toggles[i]
                };
                if (event && event.type === 'click') {
                    relatedTarget.clickEvent = event;
                }
                if (!context) {
                    continue;
                }
                var dropdownMenu = context._menu;
                if (!$(parent).hasClass(ClassName$4.SHOW)) {
                    continue;
                }
                if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
                    continue;
                }
                var hideEvent = $.Event(Event$4.HIDE, relatedTarget);
                $(parent).trigger(hideEvent);
                if (hideEvent.isDefaultPrevented()) {
                    continue;
                }
                if ('ontouchstart' in document.documentElement) {
                    $(document.body).children().off('mouseover', null, $.noop);
                }
                toggles[i].setAttribute('aria-expanded', 'false');
                $(dropdownMenu).removeClass(ClassName$4.SHOW);
                $(parent).removeClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
            }
        };
        Dropdown._getParentFromElement = function _getParentFromElement(element) {
            var parent;
            var selector = Util.getSelectorFromElement(element);
            if (selector) {
                parent = document.querySelector(selector);
            }
            return parent || element.parentNode;
        };
        Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
            if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $(event.target).closest(Selector$4.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            if (this.disabled || $(this).hasClass(ClassName$4.DISABLED)) {
                return;
            }
            var parent = Dropdown._getParentFromElement(this);
            var isActive = $(parent).hasClass(ClassName$4.SHOW);
            if (!isActive || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
                if (event.which === ESCAPE_KEYCODE) {
                    var toggle = parent.querySelector(Selector$4.DATA_TOGGLE);
                    $(toggle).trigger('focus');
                }
                $(this).trigger('click');
                return;
            }
            var items = [].slice.call(parent.querySelectorAll(Selector$4.VISIBLE_ITEMS));
            if (items.length === 0) {
                return;
            }
            var index = items.indexOf(event.target);
            if (event.which === ARROW_UP_KEYCODE && index > 0) {
                index--;
            }
            if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
                index++;
            }
            if (index < 0) {
                index = 0;
            }
            items[index].focus();
        };
        _createClass(Dropdown, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION$4;
                }
            }, {
                key: "Default",
                get: function get() {
                    return Default$2;
                }
            }, {
                key: "DefaultType",
                get: function get() {
                    return DefaultType$2;
                }
            }]);
        return Dropdown;
    }();
    $(document).on(Event$4.KEYDOWN_DATA_API, Selector$4.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event$4.KEYDOWN_DATA_API, Selector$4.MENU, Dropdown._dataApiKeydownHandler).on(Event$4.CLICK_DATA_API + " " + Event$4.KEYUP_DATA_API, Dropdown._clearMenus).on(Event$4.CLICK_DATA_API, Selector$4.DATA_TOGGLE, function (event) {
        event.preventDefault();
        event.stopPropagation();
        Dropdown._jQueryInterface.call($(this), 'toggle');
    }).on(Event$4.CLICK_DATA_API, Selector$4.FORM_CHILD, function (e) {
        e.stopPropagation();
    });
    $.fn[NAME$4] = Dropdown._jQueryInterface;
    $.fn[NAME$4].Constructor = Dropdown;
    $.fn[NAME$4].noConflict = function () {
        $.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
        return Dropdown._jQueryInterface;
    };
    var NAME$5 = 'modal';
    var VERSION$5 = '4.3.1';
    var DATA_KEY$5 = 'bs.modal';
    var EVENT_KEY$5 = "." + DATA_KEY$5;
    var DATA_API_KEY$5 = '.data-api';
    var JQUERY_NO_CONFLICT$5 = $.fn[NAME$5];
    var ESCAPE_KEYCODE$1 = 27;
    var Default$3 = {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: true
    };
    var DefaultType$3 = {
        backdrop: '(boolean|string)',
        keyboard: 'boolean',
        focus: 'boolean',
        show: 'boolean'
    };
    var Event$5 = {
        HIDE: "hide" + EVENT_KEY$5,
        HIDDEN: "hidden" + EVENT_KEY$5,
        SHOW: "show" + EVENT_KEY$5,
        SHOWN: "shown" + EVENT_KEY$5,
        FOCUSIN: "focusin" + EVENT_KEY$5,
        RESIZE: "resize" + EVENT_KEY$5,
        CLICK_DISMISS: "click.dismiss" + EVENT_KEY$5,
        KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY$5,
        MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY$5,
        MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY$5,
        CLICK_DATA_API: "click" + EVENT_KEY$5 + DATA_API_KEY$5
    };
    var ClassName$5 = {
        SCROLLABLE: 'modal-dialog-scrollable',
        SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
        BACKDROP: 'modal-backdrop',
        OPEN: 'modal-open',
        FADE: 'fade',
        SHOW: 'show'
    };
    var Selector$5 = {
        DIALOG: '.modal-dialog',
        MODAL_BODY: '.modal-body',
        DATA_TOGGLE: '[data-toggle="modal"]',
        DATA_DISMISS: '[data-dismiss="modal"]',
        FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
        STICKY_CONTENT: '.sticky-top'
    };
    var Modal = function () {
        function Modal(element, config) {
            this._config = this._getConfig(config);
            this._element = element;
            this._dialog = element.querySelector(Selector$5.DIALOG);
            this._backdrop = null;
            this._isShown = false;
            this._isBodyOverflowing = false;
            this._ignoreBackdropClick = false;
            this._isTransitioning = false;
            this._scrollbarWidth = 0;
        }
        var _proto = Modal.prototype;
        _proto.toggle = function toggle(relatedTarget) {
            return this._isShown ? this.hide() : this.show(relatedTarget);
        };
        _proto.show = function show(relatedTarget) {
            var _this = this;
            if (this._isShown || this._isTransitioning) {
                return;
            }
            if ($(this._element).hasClass(ClassName$5.FADE)) {
                this._isTransitioning = true;
            }
            var showEvent = $.Event(Event$5.SHOW, {
                relatedTarget: relatedTarget
            });
            $(this._element).trigger(showEvent);
            if (this._isShown || showEvent.isDefaultPrevented()) {
                return;
            }
            this._isShown = true;
            this._checkScrollbar();
            this._setScrollbar();
            this._adjustDialog();
            this._setEscapeEvent();
            this._setResizeEvent();
            $(this._element).on(Event$5.CLICK_DISMISS, Selector$5.DATA_DISMISS, function (event) {
                return _this.hide(event);
            });
            $(this._dialog).on(Event$5.MOUSEDOWN_DISMISS, function () {
                $(_this._element).one(Event$5.MOUSEUP_DISMISS, function (event) {
                    if ($(event.target).is(_this._element)) {
                        _this._ignoreBackdropClick = true;
                    }
                });
            });
            this._showBackdrop(function () {
                return _this._showElement(relatedTarget);
            });
        };
        _proto.hide = function hide(event) {
            var _this2 = this;
            if (event) {
                event.preventDefault();
            }
            if (!this._isShown || this._isTransitioning) {
                return;
            }
            var hideEvent = $.Event(Event$5.HIDE);
            $(this._element).trigger(hideEvent);
            if (!this._isShown || hideEvent.isDefaultPrevented()) {
                return;
            }
            this._isShown = false;
            var transition = $(this._element).hasClass(ClassName$5.FADE);
            if (transition) {
                this._isTransitioning = true;
            }
            this._setEscapeEvent();
            this._setResizeEvent();
            $(document).off(Event$5.FOCUSIN);
            $(this._element).removeClass(ClassName$5.SHOW);
            $(this._element).off(Event$5.CLICK_DISMISS);
            $(this._dialog).off(Event$5.MOUSEDOWN_DISMISS);
            if (transition) {
                var transitionDuration = Util.getTransitionDurationFromElement(this._element);
                $(this._element).one(Util.TRANSITION_END, function (event) {
                    return _this2._hideModal(event);
                }).emulateTransitionEnd(transitionDuration);
            }
            else {
                this._hideModal();
            }
        };
        _proto.dispose = function dispose() {
            [window, this._element, this._dialog].forEach(function (htmlElement) {
                return $(htmlElement).off(EVENT_KEY$5);
            });
            $(document).off(Event$5.FOCUSIN);
            $.removeData(this._element, DATA_KEY$5);
            this._config = null;
            this._element = null;
            this._dialog = null;
            this._backdrop = null;
            this._isShown = null;
            this._isBodyOverflowing = null;
            this._ignoreBackdropClick = null;
            this._isTransitioning = null;
            this._scrollbarWidth = null;
        };
        _proto.handleUpdate = function handleUpdate() {
            this._adjustDialog();
        };
        _proto._getConfig = function _getConfig(config) {
            config = _objectSpread({}, Default$3, config);
            Util.typeCheckConfig(NAME$5, config, DefaultType$3);
            return config;
        };
        _proto._showElement = function _showElement(relatedTarget) {
            var _this3 = this;
            var transition = $(this._element).hasClass(ClassName$5.FADE);
            if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
                document.body.appendChild(this._element);
            }
            this._element.style.display = 'block';
            this._element.removeAttribute('aria-hidden');
            this._element.setAttribute('aria-modal', true);
            if ($(this._dialog).hasClass(ClassName$5.SCROLLABLE)) {
                this._dialog.querySelector(Selector$5.MODAL_BODY).scrollTop = 0;
            }
            else {
                this._element.scrollTop = 0;
            }
            if (transition) {
                Util.reflow(this._element);
            }
            $(this._element).addClass(ClassName$5.SHOW);
            if (this._config.focus) {
                this._enforceFocus();
            }
            var shownEvent = $.Event(Event$5.SHOWN, {
                relatedTarget: relatedTarget
            });
            var transitionComplete = function transitionComplete() {
                if (_this3._config.focus) {
                    _this3._element.focus();
                }
                _this3._isTransitioning = false;
                $(_this3._element).trigger(shownEvent);
            };
            if (transition) {
                var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
                $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
            }
            else {
                transitionComplete();
            }
        };
        _proto._enforceFocus = function _enforceFocus() {
            var _this4 = this;
            $(document).off(Event$5.FOCUSIN)
                .on(Event$5.FOCUSIN, function (event) {
                if (document !== event.target && _this4._element !== event.target && $(_this4._element).has(event.target).length === 0) {
                    _this4._element.focus();
                }
            });
        };
        _proto._setEscapeEvent = function _setEscapeEvent() {
            var _this5 = this;
            if (this._isShown && this._config.keyboard) {
                $(this._element).on(Event$5.KEYDOWN_DISMISS, function (event) {
                    if (event.which === ESCAPE_KEYCODE$1) {
                        event.preventDefault();
                        _this5.hide();
                    }
                });
            }
            else if (!this._isShown) {
                $(this._element).off(Event$5.KEYDOWN_DISMISS);
            }
        };
        _proto._setResizeEvent = function _setResizeEvent() {
            var _this6 = this;
            if (this._isShown) {
                $(window).on(Event$5.RESIZE, function (event) {
                    return _this6.handleUpdate(event);
                });
            }
            else {
                $(window).off(Event$5.RESIZE);
            }
        };
        _proto._hideModal = function _hideModal() {
            var _this7 = this;
            this._element.style.display = 'none';
            this._element.setAttribute('aria-hidden', true);
            this._element.removeAttribute('aria-modal');
            this._isTransitioning = false;
            this._showBackdrop(function () {
                $(document.body).removeClass(ClassName$5.OPEN);
                _this7._resetAdjustments();
                _this7._resetScrollbar();
                $(_this7._element).trigger(Event$5.HIDDEN);
            });
        };
        _proto._removeBackdrop = function _removeBackdrop() {
            if (this._backdrop) {
                $(this._backdrop).remove();
                this._backdrop = null;
            }
        };
        _proto._showBackdrop = function _showBackdrop(callback) {
            var _this8 = this;
            var animate = $(this._element).hasClass(ClassName$5.FADE) ? ClassName$5.FADE : '';
            if (this._isShown && this._config.backdrop) {
                this._backdrop = document.createElement('div');
                this._backdrop.className = ClassName$5.BACKDROP;
                if (animate) {
                    this._backdrop.classList.add(animate);
                }
                $(this._backdrop).appendTo(document.body);
                $(this._element).on(Event$5.CLICK_DISMISS, function (event) {
                    if (_this8._ignoreBackdropClick) {
                        _this8._ignoreBackdropClick = false;
                        return;
                    }
                    if (event.target !== event.currentTarget) {
                        return;
                    }
                    if (_this8._config.backdrop === 'static') {
                        _this8._element.focus();
                    }
                    else {
                        _this8.hide();
                    }
                });
                if (animate) {
                    Util.reflow(this._backdrop);
                }
                $(this._backdrop).addClass(ClassName$5.SHOW);
                if (!callback) {
                    return;
                }
                if (!animate) {
                    callback();
                    return;
                }
                var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
                $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
            }
            else if (!this._isShown && this._backdrop) {
                $(this._backdrop).removeClass(ClassName$5.SHOW);
                var callbackRemove = function callbackRemove() {
                    _this8._removeBackdrop();
                    if (callback) {
                        callback();
                    }
                };
                if ($(this._element).hasClass(ClassName$5.FADE)) {
                    var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
                    $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
                }
                else {
                    callbackRemove();
                }
            }
            else if (callback) {
                callback();
            }
        };
        _proto._adjustDialog = function _adjustDialog() {
            var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
            if (!this._isBodyOverflowing && isModalOverflowing) {
                this._element.style.paddingLeft = this._scrollbarWidth + "px";
            }
            if (this._isBodyOverflowing && !isModalOverflowing) {
                this._element.style.paddingRight = this._scrollbarWidth + "px";
            }
        };
        _proto._resetAdjustments = function _resetAdjustments() {
            this._element.style.paddingLeft = '';
            this._element.style.paddingRight = '';
        };
        _proto._checkScrollbar = function _checkScrollbar() {
            var rect = document.body.getBoundingClientRect();
            this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
            this._scrollbarWidth = this._getScrollbarWidth();
        };
        _proto._setScrollbar = function _setScrollbar() {
            var _this9 = this;
            if (this._isBodyOverflowing) {
                var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
                var stickyContent = [].slice.call(document.querySelectorAll(Selector$5.STICKY_CONTENT));
                $(fixedContent).each(function (index, element) {
                    var actualPadding = element.style.paddingRight;
                    var calculatedPadding = $(element).css('padding-right');
                    $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
                });
                $(stickyContent).each(function (index, element) {
                    var actualMargin = element.style.marginRight;
                    var calculatedMargin = $(element).css('margin-right');
                    $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
                });
                var actualPadding = document.body.style.paddingRight;
                var calculatedPadding = $(document.body).css('padding-right');
                $(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
            }
            $(document.body).addClass(ClassName$5.OPEN);
        };
        _proto._resetScrollbar = function _resetScrollbar() {
            var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
            $(fixedContent).each(function (index, element) {
                var padding = $(element).data('padding-right');
                $(element).removeData('padding-right');
                element.style.paddingRight = padding ? padding : '';
            });
            var elements = [].slice.call(document.querySelectorAll("" + Selector$5.STICKY_CONTENT));
            $(elements).each(function (index, element) {
                var margin = $(element).data('margin-right');
                if (typeof margin !== 'undefined') {
                    $(element).css('margin-right', margin).removeData('margin-right');
                }
            });
            var padding = $(document.body).data('padding-right');
            $(document.body).removeData('padding-right');
            document.body.style.paddingRight = padding ? padding : '';
        };
        _proto._getScrollbarWidth = function _getScrollbarWidth() {
            var scrollDiv = document.createElement('div');
            scrollDiv.className = ClassName$5.SCROLLBAR_MEASURER;
            document.body.appendChild(scrollDiv);
            var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
            document.body.removeChild(scrollDiv);
            return scrollbarWidth;
        };
        Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
            return this.each(function () {
                var data = $(this).data(DATA_KEY$5);
                var _config = _objectSpread({}, Default$3, $(this).data(), typeof config === 'object' && config ? config : {});
                if (!data) {
                    data = new Modal(this, _config);
                    $(this).data(DATA_KEY$5, data);
                }
                if (typeof config === 'string') {
                    if (typeof data[config] === 'undefined') {
                        throw new TypeError("No method named \"" + config + "\"");
                    }
                    data[config](relatedTarget);
                }
                else if (_config.show) {
                    data.show(relatedTarget);
                }
            });
        };
        _createClass(Modal, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION$5;
                }
            }, {
                key: "Default",
                get: function get() {
                    return Default$3;
                }
            }]);
        return Modal;
    }();
    $(document).on(Event$5.CLICK_DATA_API, Selector$5.DATA_TOGGLE, function (event) {
        var _this10 = this;
        var target;
        var selector = Util.getSelectorFromElement(this);
        if (selector) {
            target = document.querySelector(selector);
        }
        var config = $(target).data(DATA_KEY$5) ? 'toggle' : _objectSpread({}, $(target).data(), $(this).data());
        if (this.tagName === 'A' || this.tagName === 'AREA') {
            event.preventDefault();
        }
        var $target = $(target).one(Event$5.SHOW, function (showEvent) {
            if (showEvent.isDefaultPrevented()) {
                return;
            }
            $target.one(Event$5.HIDDEN, function () {
                if ($(_this10).is(':visible')) {
                    _this10.focus();
                }
            });
        });
        Modal._jQueryInterface.call($(target), config, this);
    });
    $.fn[NAME$5] = Modal._jQueryInterface;
    $.fn[NAME$5].Constructor = Modal;
    $.fn[NAME$5].noConflict = function () {
        $.fn[NAME$5] = JQUERY_NO_CONFLICT$5;
        return Modal._jQueryInterface;
    };
    var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
    var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
    var DefaultWhitelist = {
        '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
        a: ['target', 'href', 'title', 'rel'],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ['src', 'alt', 'title', 'width', 'height'],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: []
    };
    var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
    var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;
    function allowedAttribute(attr, allowedAttributeList) {
        var attrName = attr.nodeName.toLowerCase();
        if (allowedAttributeList.indexOf(attrName) !== -1) {
            if (uriAttrs.indexOf(attrName) !== -1) {
                return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
            }
            return true;
        }
        var regExp = allowedAttributeList.filter(function (attrRegex) {
            return attrRegex instanceof RegExp;
        });
        for (var i = 0, l = regExp.length; i < l; i++) {
            if (attrName.match(regExp[i])) {
                return true;
            }
        }
        return false;
    }
    function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
        if (unsafeHtml.length === 0) {
            return unsafeHtml;
        }
        if (sanitizeFn && typeof sanitizeFn === 'function') {
            return sanitizeFn(unsafeHtml);
        }
        var domParser = new window.DOMParser();
        var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
        var whitelistKeys = Object.keys(whiteList);
        var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));
        var _loop = function _loop(i, len) {
            var el = elements[i];
            var elName = el.nodeName.toLowerCase();
            if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
                el.parentNode.removeChild(el);
                return "continue";
            }
            var attributeList = [].slice.call(el.attributes);
            var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
            attributeList.forEach(function (attr) {
                if (!allowedAttribute(attr, whitelistedAttributes)) {
                    el.removeAttribute(attr.nodeName);
                }
            });
        };
        for (var i = 0, len = elements.length; i < len; i++) {
            var _ret = _loop(i, len);
            if (_ret === "continue")
                continue;
        }
        return createdDocument.body.innerHTML;
    }
    var NAME$6 = 'tooltip';
    var VERSION$6 = '4.3.1';
    var DATA_KEY$6 = 'bs.tooltip';
    var EVENT_KEY$6 = "." + DATA_KEY$6;
    var JQUERY_NO_CONFLICT$6 = $.fn[NAME$6];
    var CLASS_PREFIX = 'bs-tooltip';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
    var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
    var DefaultType$4 = {
        animation: 'boolean',
        template: 'string',
        title: '(string|element|function)',
        trigger: 'string',
        delay: '(number|object)',
        html: 'boolean',
        selector: '(string|boolean)',
        placement: '(string|function)',
        offset: '(number|string|function)',
        container: '(string|element|boolean)',
        fallbackPlacement: '(string|array)',
        boundary: '(string|element)',
        sanitize: 'boolean',
        sanitizeFn: '(null|function)',
        whiteList: 'object'
    };
    var AttachmentMap$1 = {
        AUTO: 'auto',
        TOP: 'top',
        RIGHT: 'right',
        BOTTOM: 'bottom',
        LEFT: 'left'
    };
    var Default$4 = {
        animation: true,
        template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
        trigger: 'hover focus',
        title: '',
        delay: 0,
        html: false,
        selector: false,
        placement: 'top',
        offset: 0,
        container: false,
        fallbackPlacement: 'flip',
        boundary: 'scrollParent',
        sanitize: true,
        sanitizeFn: null,
        whiteList: DefaultWhitelist
    };
    var HoverState = {
        SHOW: 'show',
        OUT: 'out'
    };
    var Event$6 = {
        HIDE: "hide" + EVENT_KEY$6,
        HIDDEN: "hidden" + EVENT_KEY$6,
        SHOW: "show" + EVENT_KEY$6,
        SHOWN: "shown" + EVENT_KEY$6,
        INSERTED: "inserted" + EVENT_KEY$6,
        CLICK: "click" + EVENT_KEY$6,
        FOCUSIN: "focusin" + EVENT_KEY$6,
        FOCUSOUT: "focusout" + EVENT_KEY$6,
        MOUSEENTER: "mouseenter" + EVENT_KEY$6,
        MOUSELEAVE: "mouseleave" + EVENT_KEY$6
    };
    var ClassName$6 = {
        FADE: 'fade',
        SHOW: 'show'
    };
    var Selector$6 = {
        TOOLTIP: '.tooltip',
        TOOLTIP_INNER: '.tooltip-inner',
        ARROW: '.arrow'
    };
    var Trigger = {
        HOVER: 'hover',
        FOCUS: 'focus',
        CLICK: 'click',
        MANUAL: 'manual'
    };
    var Tooltip = function () {
        function Tooltip(element, config) {
            if (typeof Popper === 'undefined') {
                throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)');
            }
            this._isEnabled = true;
            this._timeout = 0;
            this._hoverState = '';
            this._activeTrigger = {};
            this._popper = null;
            this.element = element;
            this.config = this._getConfig(config);
            this.tip = null;
            this._setListeners();
        }
        var _proto = Tooltip.prototype;
        _proto.enable = function enable() {
            this._isEnabled = true;
        };
        _proto.disable = function disable() {
            this._isEnabled = false;
        };
        _proto.toggleEnabled = function toggleEnabled() {
            this._isEnabled = !this._isEnabled;
        };
        _proto.toggle = function toggle(event) {
            if (!this._isEnabled) {
                return;
            }
            if (event) {
                var dataKey = this.constructor.DATA_KEY;
                var context = $(event.currentTarget).data(dataKey);
                if (!context) {
                    context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                    $(event.currentTarget).data(dataKey, context);
                }
                context._activeTrigger.click = !context._activeTrigger.click;
                if (context._isWithActiveTrigger()) {
                    context._enter(null, context);
                }
                else {
                    context._leave(null, context);
                }
            }
            else {
                if ($(this.getTipElement()).hasClass(ClassName$6.SHOW)) {
                    this._leave(null, this);
                    return;
                }
                this._enter(null, this);
            }
        };
        _proto.dispose = function dispose() {
            clearTimeout(this._timeout);
            $.removeData(this.element, this.constructor.DATA_KEY);
            $(this.element).off(this.constructor.EVENT_KEY);
            $(this.element).closest('.modal').off('hide.bs.modal');
            if (this.tip) {
                $(this.tip).remove();
            }
            this._isEnabled = null;
            this._timeout = null;
            this._hoverState = null;
            this._activeTrigger = null;
            if (this._popper !== null) {
                this._popper.destroy();
            }
            this._popper = null;
            this.element = null;
            this.config = null;
            this.tip = null;
        };
        _proto.show = function show() {
            var _this = this;
            if ($(this.element).css('display') === 'none') {
                throw new Error('Please use show on visible elements');
            }
            var showEvent = $.Event(this.constructor.Event.SHOW);
            if (this.isWithContent() && this._isEnabled) {
                $(this.element).trigger(showEvent);
                var shadowRoot = Util.findShadowRoot(this.element);
                var isInTheDom = $.contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);
                if (showEvent.isDefaultPrevented() || !isInTheDom) {
                    return;
                }
                var tip = this.getTipElement();
                var tipId = Util.getUID(this.constructor.NAME);
                tip.setAttribute('id', tipId);
                this.element.setAttribute('aria-describedby', tipId);
                this.setContent();
                if (this.config.animation) {
                    $(tip).addClass(ClassName$6.FADE);
                }
                var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;
                var attachment = this._getAttachment(placement);
                this.addAttachmentClass(attachment);
                var container = this._getContainer();
                $(tip).data(this.constructor.DATA_KEY, this);
                if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
                    $(tip).appendTo(container);
                }
                $(this.element).trigger(this.constructor.Event.INSERTED);
                this._popper = new Popper(this.element, tip, {
                    placement: attachment,
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {
                            behavior: this.config.fallbackPlacement
                        },
                        arrow: {
                            element: Selector$6.ARROW
                        },
                        preventOverflow: {
                            boundariesElement: this.config.boundary
                        }
                    },
                    onCreate: function onCreate(data) {
                        if (data.originalPlacement !== data.placement) {
                            _this._handlePopperPlacementChange(data);
                        }
                    },
                    onUpdate: function onUpdate(data) {
                        return _this._handlePopperPlacementChange(data);
                    }
                });
                $(tip).addClass(ClassName$6.SHOW);
                if ('ontouchstart' in document.documentElement) {
                    $(document.body).children().on('mouseover', null, $.noop);
                }
                var complete = function complete() {
                    if (_this.config.animation) {
                        _this._fixTransition();
                    }
                    var prevHoverState = _this._hoverState;
                    _this._hoverState = null;
                    $(_this.element).trigger(_this.constructor.Event.SHOWN);
                    if (prevHoverState === HoverState.OUT) {
                        _this._leave(null, _this);
                    }
                };
                if ($(this.tip).hasClass(ClassName$6.FADE)) {
                    var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
                    $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
                }
                else {
                    complete();
                }
            }
        };
        _proto.hide = function hide(callback) {
            var _this2 = this;
            var tip = this.getTipElement();
            var hideEvent = $.Event(this.constructor.Event.HIDE);
            var complete = function complete() {
                if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
                    tip.parentNode.removeChild(tip);
                }
                _this2._cleanTipClass();
                _this2.element.removeAttribute('aria-describedby');
                $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);
                if (_this2._popper !== null) {
                    _this2._popper.destroy();
                }
                if (callback) {
                    callback();
                }
            };
            $(this.element).trigger(hideEvent);
            if (hideEvent.isDefaultPrevented()) {
                return;
            }
            $(tip).removeClass(ClassName$6.SHOW);
            if ('ontouchstart' in document.documentElement) {
                $(document.body).children().off('mouseover', null, $.noop);
            }
            this._activeTrigger[Trigger.CLICK] = false;
            this._activeTrigger[Trigger.FOCUS] = false;
            this._activeTrigger[Trigger.HOVER] = false;
            if ($(this.tip).hasClass(ClassName$6.FADE)) {
                var transitionDuration = Util.getTransitionDurationFromElement(tip);
                $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
            }
            else {
                complete();
            }
            this._hoverState = '';
        };
        _proto.update = function update() {
            if (this._popper !== null) {
                this._popper.scheduleUpdate();
            }
        };
        _proto.isWithContent = function isWithContent() {
            return Boolean(this.getTitle());
        };
        _proto.addAttachmentClass = function addAttachmentClass(attachment) {
            $(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
        };
        _proto.getTipElement = function getTipElement() {
            this.tip = this.tip || $(this.config.template)[0];
            return this.tip;
        };
        _proto.setContent = function setContent() {
            var tip = this.getTipElement();
            this.setElementContent($(tip.querySelectorAll(Selector$6.TOOLTIP_INNER)), this.getTitle());
            $(tip).removeClass(ClassName$6.FADE + " " + ClassName$6.SHOW);
        };
        _proto.setElementContent = function setElementContent($element, content) {
            if (typeof content === 'object' && (content.nodeType || content.jquery)) {
                if (this.config.html) {
                    if (!$(content).parent().is($element)) {
                        $element.empty().append(content);
                    }
                }
                else {
                    $element.text($(content).text());
                }
                return;
            }
            if (this.config.html) {
                if (this.config.sanitize) {
                    content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
                }
                $element.html(content);
            }
            else {
                $element.text(content);
            }
        };
        _proto.getTitle = function getTitle() {
            var title = this.element.getAttribute('data-original-title');
            if (!title) {
                title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
            }
            return title;
        };
        _proto._getOffset = function _getOffset() {
            var _this3 = this;
            var offset = {};
            if (typeof this.config.offset === 'function') {
                offset.fn = function (data) {
                    data.offsets = _objectSpread({}, data.offsets, _this3.config.offset(data.offsets, _this3.element) || {});
                    return data;
                };
            }
            else {
                offset.offset = this.config.offset;
            }
            return offset;
        };
        _proto._getContainer = function _getContainer() {
            if (this.config.container === false) {
                return document.body;
            }
            if (Util.isElement(this.config.container)) {
                return $(this.config.container);
            }
            return $(document).find(this.config.container);
        };
        _proto._getAttachment = function _getAttachment(placement) {
            return AttachmentMap$1[placement.toUpperCase()];
        };
        _proto._setListeners = function _setListeners() {
            var _this4 = this;
            var triggers = this.config.trigger.split(' ');
            triggers.forEach(function (trigger) {
                if (trigger === 'click') {
                    $(_this4.element).on(_this4.constructor.Event.CLICK, _this4.config.selector, function (event) {
                        return _this4.toggle(event);
                    });
                }
                else if (trigger !== Trigger.MANUAL) {
                    var eventIn = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSEENTER : _this4.constructor.Event.FOCUSIN;
                    var eventOut = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSELEAVE : _this4.constructor.Event.FOCUSOUT;
                    $(_this4.element).on(eventIn, _this4.config.selector, function (event) {
                        return _this4._enter(event);
                    }).on(eventOut, _this4.config.selector, function (event) {
                        return _this4._leave(event);
                    });
                }
            });
            $(this.element).closest('.modal').on('hide.bs.modal', function () {
                if (_this4.element) {
                    _this4.hide();
                }
            });
            if (this.config.selector) {
                this.config = _objectSpread({}, this.config, {
                    trigger: 'manual',
                    selector: ''
                });
            }
            else {
                this._fixTitle();
            }
        };
        _proto._fixTitle = function _fixTitle() {
            var titleType = typeof this.element.getAttribute('data-original-title');
            if (this.element.getAttribute('title') || titleType !== 'string') {
                this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
                this.element.setAttribute('title', '');
            }
        };
        _proto._enter = function _enter(event, context) {
            var dataKey = this.constructor.DATA_KEY;
            context = context || $(event.currentTarget).data(dataKey);
            if (!context) {
                context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                $(event.currentTarget).data(dataKey, context);
            }
            if (event) {
                context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
            }
            if ($(context.getTipElement()).hasClass(ClassName$6.SHOW) || context._hoverState === HoverState.SHOW) {
                context._hoverState = HoverState.SHOW;
                return;
            }
            clearTimeout(context._timeout);
            context._hoverState = HoverState.SHOW;
            if (!context.config.delay || !context.config.delay.show) {
                context.show();
                return;
            }
            context._timeout = setTimeout(function () {
                if (context._hoverState === HoverState.SHOW) {
                    context.show();
                }
            }, context.config.delay.show);
        };
        _proto._leave = function _leave(event, context) {
            var dataKey = this.constructor.DATA_KEY;
            context = context || $(event.currentTarget).data(dataKey);
            if (!context) {
                context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                $(event.currentTarget).data(dataKey, context);
            }
            if (event) {
                context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
            }
            if (context._isWithActiveTrigger()) {
                return;
            }
            clearTimeout(context._timeout);
            context._hoverState = HoverState.OUT;
            if (!context.config.delay || !context.config.delay.hide) {
                context.hide();
                return;
            }
            context._timeout = setTimeout(function () {
                if (context._hoverState === HoverState.OUT) {
                    context.hide();
                }
            }, context.config.delay.hide);
        };
        _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
            for (var trigger in this._activeTrigger) {
                if (this._activeTrigger[trigger]) {
                    return true;
                }
            }
            return false;
        };
        _proto._getConfig = function _getConfig(config) {
            var dataAttributes = $(this.element).data();
            Object.keys(dataAttributes).forEach(function (dataAttr) {
                if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
                    delete dataAttributes[dataAttr];
                }
            });
            config = _objectSpread({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});
            if (typeof config.delay === 'number') {
                config.delay = {
                    show: config.delay,
                    hide: config.delay
                };
            }
            if (typeof config.title === 'number') {
                config.title = config.title.toString();
            }
            if (typeof config.content === 'number') {
                config.content = config.content.toString();
            }
            Util.typeCheckConfig(NAME$6, config, this.constructor.DefaultType);
            if (config.sanitize) {
                config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
            }
            return config;
        };
        _proto._getDelegateConfig = function _getDelegateConfig() {
            var config = {};
            if (this.config) {
                for (var key in this.config) {
                    if (this.constructor.Default[key] !== this.config[key]) {
                        config[key] = this.config[key];
                    }
                }
            }
            return config;
        };
        _proto._cleanTipClass = function _cleanTipClass() {
            var $tip = $(this.getTipElement());
            var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);
            if (tabClass !== null && tabClass.length) {
                $tip.removeClass(tabClass.join(''));
            }
        };
        _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
            var popperInstance = popperData.instance;
            this.tip = popperInstance.popper;
            this._cleanTipClass();
            this.addAttachmentClass(this._getAttachment(popperData.placement));
        };
        _proto._fixTransition = function _fixTransition() {
            var tip = this.getTipElement();
            var initConfigAnimation = this.config.animation;
            if (tip.getAttribute('x-placement') !== null) {
                return;
            }
            $(tip).removeClass(ClassName$6.FADE);
            this.config.animation = false;
            this.hide();
            this.show();
            this.config.animation = initConfigAnimation;
        };
        Tooltip._jQueryInterface = function _jQueryInterface(config) {
            return this.each(function () {
                var data = $(this).data(DATA_KEY$6);
                var _config = typeof config === 'object' && config;
                if (!data && /dispose|hide/.test(config)) {
                    return;
                }
                if (!data) {
                    data = new Tooltip(this, _config);
                    $(this).data(DATA_KEY$6, data);
                }
                if (typeof config === 'string') {
                    if (typeof data[config] === 'undefined') {
                        throw new TypeError("No method named \"" + config + "\"");
                    }
                    data[config]();
                }
            });
        };
        _createClass(Tooltip, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION$6;
                }
            }, {
                key: "Default",
                get: function get() {
                    return Default$4;
                }
            }, {
                key: "NAME",
                get: function get() {
                    return NAME$6;
                }
            }, {
                key: "DATA_KEY",
                get: function get() {
                    return DATA_KEY$6;
                }
            }, {
                key: "Event",
                get: function get() {
                    return Event$6;
                }
            }, {
                key: "EVENT_KEY",
                get: function get() {
                    return EVENT_KEY$6;
                }
            }, {
                key: "DefaultType",
                get: function get() {
                    return DefaultType$4;
                }
            }]);
        return Tooltip;
    }();
    $.fn[NAME$6] = Tooltip._jQueryInterface;
    $.fn[NAME$6].Constructor = Tooltip;
    $.fn[NAME$6].noConflict = function () {
        $.fn[NAME$6] = JQUERY_NO_CONFLICT$6;
        return Tooltip._jQueryInterface;
    };
    var NAME$7 = 'popover';
    var VERSION$7 = '4.3.1';
    var DATA_KEY$7 = 'bs.popover';
    var EVENT_KEY$7 = "." + DATA_KEY$7;
    var JQUERY_NO_CONFLICT$7 = $.fn[NAME$7];
    var CLASS_PREFIX$1 = 'bs-popover';
    var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');
    var Default$5 = _objectSpread({}, Tooltip.Default, {
        placement: 'right',
        trigger: 'click',
        content: '',
        template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
    });
    var DefaultType$5 = _objectSpread({}, Tooltip.DefaultType, {
        content: '(string|element|function)'
    });
    var ClassName$7 = {
        FADE: 'fade',
        SHOW: 'show'
    };
    var Selector$7 = {
        TITLE: '.popover-header',
        CONTENT: '.popover-body'
    };
    var Event$7 = {
        HIDE: "hide" + EVENT_KEY$7,
        HIDDEN: "hidden" + EVENT_KEY$7,
        SHOW: "show" + EVENT_KEY$7,
        SHOWN: "shown" + EVENT_KEY$7,
        INSERTED: "inserted" + EVENT_KEY$7,
        CLICK: "click" + EVENT_KEY$7,
        FOCUSIN: "focusin" + EVENT_KEY$7,
        FOCUSOUT: "focusout" + EVENT_KEY$7,
        MOUSEENTER: "mouseenter" + EVENT_KEY$7,
        MOUSELEAVE: "mouseleave" + EVENT_KEY$7
    };
    var Popover = function (_Tooltip) {
        _inheritsLoose(Popover, _Tooltip);
        function Popover() {
            return _Tooltip.apply(this, arguments) || this;
        }
        var _proto = Popover.prototype;
        _proto.isWithContent = function isWithContent() {
            return this.getTitle() || this._getContent();
        };
        _proto.addAttachmentClass = function addAttachmentClass(attachment) {
            $(this.getTipElement()).addClass(CLASS_PREFIX$1 + "-" + attachment);
        };
        _proto.getTipElement = function getTipElement() {
            this.tip = this.tip || $(this.config.template)[0];
            return this.tip;
        };
        _proto.setContent = function setContent() {
            var $tip = $(this.getTipElement());
            this.setElementContent($tip.find(Selector$7.TITLE), this.getTitle());
            var content = this._getContent();
            if (typeof content === 'function') {
                content = content.call(this.element);
            }
            this.setElementContent($tip.find(Selector$7.CONTENT), content);
            $tip.removeClass(ClassName$7.FADE + " " + ClassName$7.SHOW);
        };
        _proto._getContent = function _getContent() {
            return this.element.getAttribute('data-content') || this.config.content;
        };
        _proto._cleanTipClass = function _cleanTipClass() {
            var $tip = $(this.getTipElement());
            var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX$1);
            if (tabClass !== null && tabClass.length > 0) {
                $tip.removeClass(tabClass.join(''));
            }
        };
        Popover._jQueryInterface = function _jQueryInterface(config) {
            return this.each(function () {
                var data = $(this).data(DATA_KEY$7);
                var _config = typeof config === 'object' ? config : null;
                if (!data && /dispose|hide/.test(config)) {
                    return;
                }
                if (!data) {
                    data = new Popover(this, _config);
                    $(this).data(DATA_KEY$7, data);
                }
                if (typeof config === 'string') {
                    if (typeof data[config] === 'undefined') {
                        throw new TypeError("No method named \"" + config + "\"");
                    }
                    data[config]();
                }
            });
        };
        _createClass(Popover, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION$7;
                }
            }, {
                key: "Default",
                get: function get() {
                    return Default$5;
                }
            }, {
                key: "NAME",
                get: function get() {
                    return NAME$7;
                }
            }, {
                key: "DATA_KEY",
                get: function get() {
                    return DATA_KEY$7;
                }
            }, {
                key: "Event",
                get: function get() {
                    return Event$7;
                }
            }, {
                key: "EVENT_KEY",
                get: function get() {
                    return EVENT_KEY$7;
                }
            }, {
                key: "DefaultType",
                get: function get() {
                    return DefaultType$5;
                }
            }]);
        return Popover;
    }(Tooltip);
    $.fn[NAME$7] = Popover._jQueryInterface;
    $.fn[NAME$7].Constructor = Popover;
    $.fn[NAME$7].noConflict = function () {
        $.fn[NAME$7] = JQUERY_NO_CONFLICT$7;
        return Popover._jQueryInterface;
    };
    var NAME$8 = 'scrollspy';
    var VERSION$8 = '4.3.1';
    var DATA_KEY$8 = 'bs.scrollspy';
    var EVENT_KEY$8 = "." + DATA_KEY$8;
    var DATA_API_KEY$6 = '.data-api';
    var JQUERY_NO_CONFLICT$8 = $.fn[NAME$8];
    var Default$6 = {
        offset: 10,
        method: 'auto',
        target: ''
    };
    var DefaultType$6 = {
        offset: 'number',
        method: 'string',
        target: '(string|element)'
    };
    var Event$8 = {
        ACTIVATE: "activate" + EVENT_KEY$8,
        SCROLL: "scroll" + EVENT_KEY$8,
        LOAD_DATA_API: "load" + EVENT_KEY$8 + DATA_API_KEY$6
    };
    var ClassName$8 = {
        DROPDOWN_ITEM: 'dropdown-item',
        DROPDOWN_MENU: 'dropdown-menu',
        ACTIVE: 'active'
    };
    var Selector$8 = {
        DATA_SPY: '[data-spy="scroll"]',
        ACTIVE: '.active',
        NAV_LIST_GROUP: '.nav, .list-group',
        NAV_LINKS: '.nav-link',
        NAV_ITEMS: '.nav-item',
        LIST_ITEMS: '.list-group-item',
        DROPDOWN: '.dropdown',
        DROPDOWN_ITEMS: '.dropdown-item',
        DROPDOWN_TOGGLE: '.dropdown-toggle'
    };
    var OffsetMethod = {
        OFFSET: 'offset',
        POSITION: 'position'
    };
    var ScrollSpy = function () {
        function ScrollSpy(element, config) {
            var _this = this;
            this._element = element;
            this._scrollElement = element.tagName === 'BODY' ? window : element;
            this._config = this._getConfig(config);
            this._selector = this._config.target + " " + Selector$8.NAV_LINKS + "," + (this._config.target + " " + Selector$8.LIST_ITEMS + ",") + (this._config.target + " " + Selector$8.DROPDOWN_ITEMS);
            this._offsets = [];
            this._targets = [];
            this._activeTarget = null;
            this._scrollHeight = 0;
            $(this._scrollElement).on(Event$8.SCROLL, function (event) {
                return _this._process(event);
            });
            this.refresh();
            this._process();
        }
        var _proto = ScrollSpy.prototype;
        _proto.refresh = function refresh() {
            var _this2 = this;
            var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
            var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
            var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
            this._offsets = [];
            this._targets = [];
            this._scrollHeight = this._getScrollHeight();
            var targets = [].slice.call(document.querySelectorAll(this._selector));
            targets.map(function (element) {
                var target;
                var targetSelector = Util.getSelectorFromElement(element);
                if (targetSelector) {
                    target = document.querySelector(targetSelector);
                }
                if (target) {
                    var targetBCR = target.getBoundingClientRect();
                    if (targetBCR.width || targetBCR.height) {
                        return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
                    }
                }
                return null;
            }).filter(function (item) {
                return item;
            }).sort(function (a, b) {
                return a[0] - b[0];
            }).forEach(function (item) {
                _this2._offsets.push(item[0]);
                _this2._targets.push(item[1]);
            });
        };
        _proto.dispose = function dispose() {
            $.removeData(this._element, DATA_KEY$8);
            $(this._scrollElement).off(EVENT_KEY$8);
            this._element = null;
            this._scrollElement = null;
            this._config = null;
            this._selector = null;
            this._offsets = null;
            this._targets = null;
            this._activeTarget = null;
            this._scrollHeight = null;
        };
        _proto._getConfig = function _getConfig(config) {
            config = _objectSpread({}, Default$6, typeof config === 'object' && config ? config : {});
            if (typeof config.target !== 'string') {
                var id = $(config.target).attr('id');
                if (!id) {
                    id = Util.getUID(NAME$8);
                    $(config.target).attr('id', id);
                }
                config.target = "#" + id;
            }
            Util.typeCheckConfig(NAME$8, config, DefaultType$6);
            return config;
        };
        _proto._getScrollTop = function _getScrollTop() {
            return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
        };
        _proto._getScrollHeight = function _getScrollHeight() {
            return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        };
        _proto._getOffsetHeight = function _getOffsetHeight() {
            return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
        };
        _proto._process = function _process() {
            var scrollTop = this._getScrollTop() + this._config.offset;
            var scrollHeight = this._getScrollHeight();
            var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();
            if (this._scrollHeight !== scrollHeight) {
                this.refresh();
            }
            if (scrollTop >= maxScroll) {
                var target = this._targets[this._targets.length - 1];
                if (this._activeTarget !== target) {
                    this._activate(target);
                }
                return;
            }
            if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
                this._activeTarget = null;
                this._clear();
                return;
            }
            var offsetLength = this._offsets.length;
            for (var i = offsetLength; i--;) {
                var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);
                if (isActiveTarget) {
                    this._activate(this._targets[i]);
                }
            }
        };
        _proto._activate = function _activate(target) {
            this._activeTarget = target;
            this._clear();
            var queries = this._selector.split(',').map(function (selector) {
                return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
            });
            var $link = $([].slice.call(document.querySelectorAll(queries.join(','))));
            if ($link.hasClass(ClassName$8.DROPDOWN_ITEM)) {
                $link.closest(Selector$8.DROPDOWN).find(Selector$8.DROPDOWN_TOGGLE).addClass(ClassName$8.ACTIVE);
                $link.addClass(ClassName$8.ACTIVE);
            }
            else {
                $link.addClass(ClassName$8.ACTIVE);
                $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_LINKS + ", " + Selector$8.LIST_ITEMS).addClass(ClassName$8.ACTIVE);
                $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_ITEMS).children(Selector$8.NAV_LINKS).addClass(ClassName$8.ACTIVE);
            }
            $(this._scrollElement).trigger(Event$8.ACTIVATE, {
                relatedTarget: target
            });
        };
        _proto._clear = function _clear() {
            [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
                return node.classList.contains(ClassName$8.ACTIVE);
            }).forEach(function (node) {
                return node.classList.remove(ClassName$8.ACTIVE);
            });
        };
        ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
            return this.each(function () {
                var data = $(this).data(DATA_KEY$8);
                var _config = typeof config === 'object' && config;
                if (!data) {
                    data = new ScrollSpy(this, _config);
                    $(this).data(DATA_KEY$8, data);
                }
                if (typeof config === 'string') {
                    if (typeof data[config] === 'undefined') {
                        throw new TypeError("No method named \"" + config + "\"");
                    }
                    data[config]();
                }
            });
        };
        _createClass(ScrollSpy, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION$8;
                }
            }, {
                key: "Default",
                get: function get() {
                    return Default$6;
                }
            }]);
        return ScrollSpy;
    }();
    $(window).on(Event$8.LOAD_DATA_API, function () {
        var scrollSpys = [].slice.call(document.querySelectorAll(Selector$8.DATA_SPY));
        var scrollSpysLength = scrollSpys.length;
        for (var i = scrollSpysLength; i--;) {
            var $spy = $(scrollSpys[i]);
            ScrollSpy._jQueryInterface.call($spy, $spy.data());
        }
    });
    $.fn[NAME$8] = ScrollSpy._jQueryInterface;
    $.fn[NAME$8].Constructor = ScrollSpy;
    $.fn[NAME$8].noConflict = function () {
        $.fn[NAME$8] = JQUERY_NO_CONFLICT$8;
        return ScrollSpy._jQueryInterface;
    };
    var NAME$9 = 'tab';
    var VERSION$9 = '4.3.1';
    var DATA_KEY$9 = 'bs.tab';
    var EVENT_KEY$9 = "." + DATA_KEY$9;
    var DATA_API_KEY$7 = '.data-api';
    var JQUERY_NO_CONFLICT$9 = $.fn[NAME$9];
    var Event$9 = {
        HIDE: "hide" + EVENT_KEY$9,
        HIDDEN: "hidden" + EVENT_KEY$9,
        SHOW: "show" + EVENT_KEY$9,
        SHOWN: "shown" + EVENT_KEY$9,
        CLICK_DATA_API: "click" + EVENT_KEY$9 + DATA_API_KEY$7
    };
    var ClassName$9 = {
        DROPDOWN_MENU: 'dropdown-menu',
        ACTIVE: 'active',
        DISABLED: 'disabled',
        FADE: 'fade',
        SHOW: 'show'
    };
    var Selector$9 = {
        DROPDOWN: '.dropdown',
        NAV_LIST_GROUP: '.nav, .list-group',
        ACTIVE: '.active',
        ACTIVE_UL: '> li > .active',
        DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
        DROPDOWN_TOGGLE: '.dropdown-toggle',
        DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
    };
    var Tab = function () {
        function Tab(element) {
            this._element = element;
        }
        var _proto = Tab.prototype;
        _proto.show = function show() {
            var _this = this;
            if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName$9.ACTIVE) || $(this._element).hasClass(ClassName$9.DISABLED)) {
                return;
            }
            var target;
            var previous;
            var listElement = $(this._element).closest(Selector$9.NAV_LIST_GROUP)[0];
            var selector = Util.getSelectorFromElement(this._element);
            if (listElement) {
                var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? Selector$9.ACTIVE_UL : Selector$9.ACTIVE;
                previous = $.makeArray($(listElement).find(itemSelector));
                previous = previous[previous.length - 1];
            }
            var hideEvent = $.Event(Event$9.HIDE, {
                relatedTarget: this._element
            });
            var showEvent = $.Event(Event$9.SHOW, {
                relatedTarget: previous
            });
            if (previous) {
                $(previous).trigger(hideEvent);
            }
            $(this._element).trigger(showEvent);
            if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
                return;
            }
            if (selector) {
                target = document.querySelector(selector);
            }
            this._activate(this._element, listElement);
            var complete = function complete() {
                var hiddenEvent = $.Event(Event$9.HIDDEN, {
                    relatedTarget: _this._element
                });
                var shownEvent = $.Event(Event$9.SHOWN, {
                    relatedTarget: previous
                });
                $(previous).trigger(hiddenEvent);
                $(_this._element).trigger(shownEvent);
            };
            if (target) {
                this._activate(target, target.parentNode, complete);
            }
            else {
                complete();
            }
        };
        _proto.dispose = function dispose() {
            $.removeData(this._element, DATA_KEY$9);
            this._element = null;
        };
        _proto._activate = function _activate(element, container, callback) {
            var _this2 = this;
            var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $(container).find(Selector$9.ACTIVE_UL) : $(container).children(Selector$9.ACTIVE);
            var active = activeElements[0];
            var isTransitioning = callback && active && $(active).hasClass(ClassName$9.FADE);
            var complete = function complete() {
                return _this2._transitionComplete(element, active, callback);
            };
            if (active && isTransitioning) {
                var transitionDuration = Util.getTransitionDurationFromElement(active);
                $(active).removeClass(ClassName$9.SHOW).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
            }
            else {
                complete();
            }
        };
        _proto._transitionComplete = function _transitionComplete(element, active, callback) {
            if (active) {
                $(active).removeClass(ClassName$9.ACTIVE);
                var dropdownChild = $(active.parentNode).find(Selector$9.DROPDOWN_ACTIVE_CHILD)[0];
                if (dropdownChild) {
                    $(dropdownChild).removeClass(ClassName$9.ACTIVE);
                }
                if (active.getAttribute('role') === 'tab') {
                    active.setAttribute('aria-selected', false);
                }
            }
            $(element).addClass(ClassName$9.ACTIVE);
            if (element.getAttribute('role') === 'tab') {
                element.setAttribute('aria-selected', true);
            }
            Util.reflow(element);
            if (element.classList.contains(ClassName$9.FADE)) {
                element.classList.add(ClassName$9.SHOW);
            }
            if (element.parentNode && $(element.parentNode).hasClass(ClassName$9.DROPDOWN_MENU)) {
                var dropdownElement = $(element).closest(Selector$9.DROPDOWN)[0];
                if (dropdownElement) {
                    var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector$9.DROPDOWN_TOGGLE));
                    $(dropdownToggleList).addClass(ClassName$9.ACTIVE);
                }
                element.setAttribute('aria-expanded', true);
            }
            if (callback) {
                callback();
            }
        };
        Tab._jQueryInterface = function _jQueryInterface(config) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data(DATA_KEY$9);
                if (!data) {
                    data = new Tab(this);
                    $this.data(DATA_KEY$9, data);
                }
                if (typeof config === 'string') {
                    if (typeof data[config] === 'undefined') {
                        throw new TypeError("No method named \"" + config + "\"");
                    }
                    data[config]();
                }
            });
        };
        _createClass(Tab, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION$9;
                }
            }]);
        return Tab;
    }();
    $(document).on(Event$9.CLICK_DATA_API, Selector$9.DATA_TOGGLE, function (event) {
        event.preventDefault();
        Tab._jQueryInterface.call($(this), 'show');
    });
    $.fn[NAME$9] = Tab._jQueryInterface;
    $.fn[NAME$9].Constructor = Tab;
    $.fn[NAME$9].noConflict = function () {
        $.fn[NAME$9] = JQUERY_NO_CONFLICT$9;
        return Tab._jQueryInterface;
    };
    var NAME$a = 'toast';
    var VERSION$a = '4.3.1';
    var DATA_KEY$a = 'bs.toast';
    var EVENT_KEY$a = "." + DATA_KEY$a;
    var JQUERY_NO_CONFLICT$a = $.fn[NAME$a];
    var Event$a = {
        CLICK_DISMISS: "click.dismiss" + EVENT_KEY$a,
        HIDE: "hide" + EVENT_KEY$a,
        HIDDEN: "hidden" + EVENT_KEY$a,
        SHOW: "show" + EVENT_KEY$a,
        SHOWN: "shown" + EVENT_KEY$a
    };
    var ClassName$a = {
        FADE: 'fade',
        HIDE: 'hide',
        SHOW: 'show',
        SHOWING: 'showing'
    };
    var DefaultType$7 = {
        animation: 'boolean',
        autohide: 'boolean',
        delay: 'number'
    };
    var Default$7 = {
        animation: true,
        autohide: true,
        delay: 500
    };
    var Selector$a = {
        DATA_DISMISS: '[data-dismiss="toast"]'
    };
    var Toast = function () {
        function Toast(element, config) {
            this._element = element;
            this._config = this._getConfig(config);
            this._timeout = null;
            this._setListeners();
        }
        var _proto = Toast.prototype;
        _proto.show = function show() {
            var _this = this;
            $(this._element).trigger(Event$a.SHOW);
            if (this._config.animation) {
                this._element.classList.add(ClassName$a.FADE);
            }
            var complete = function complete() {
                _this._element.classList.remove(ClassName$a.SHOWING);
                _this._element.classList.add(ClassName$a.SHOW);
                $(_this._element).trigger(Event$a.SHOWN);
                if (_this._config.autohide) {
                    _this.hide();
                }
            };
            this._element.classList.remove(ClassName$a.HIDE);
            this._element.classList.add(ClassName$a.SHOWING);
            if (this._config.animation) {
                var transitionDuration = Util.getTransitionDurationFromElement(this._element);
                $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
            }
            else {
                complete();
            }
        };
        _proto.hide = function hide(withoutTimeout) {
            var _this2 = this;
            if (!this._element.classList.contains(ClassName$a.SHOW)) {
                return;
            }
            $(this._element).trigger(Event$a.HIDE);
            if (withoutTimeout) {
                this._close();
            }
            else {
                this._timeout = setTimeout(function () {
                    _this2._close();
                }, this._config.delay);
            }
        };
        _proto.dispose = function dispose() {
            clearTimeout(this._timeout);
            this._timeout = null;
            if (this._element.classList.contains(ClassName$a.SHOW)) {
                this._element.classList.remove(ClassName$a.SHOW);
            }
            $(this._element).off(Event$a.CLICK_DISMISS);
            $.removeData(this._element, DATA_KEY$a);
            this._element = null;
            this._config = null;
        };
        _proto._getConfig = function _getConfig(config) {
            config = _objectSpread({}, Default$7, $(this._element).data(), typeof config === 'object' && config ? config : {});
            Util.typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
            return config;
        };
        _proto._setListeners = function _setListeners() {
            var _this3 = this;
            $(this._element).on(Event$a.CLICK_DISMISS, Selector$a.DATA_DISMISS, function () {
                return _this3.hide(true);
            });
        };
        _proto._close = function _close() {
            var _this4 = this;
            var complete = function complete() {
                _this4._element.classList.add(ClassName$a.HIDE);
                $(_this4._element).trigger(Event$a.HIDDEN);
            };
            this._element.classList.remove(ClassName$a.SHOW);
            if (this._config.animation) {
                var transitionDuration = Util.getTransitionDurationFromElement(this._element);
                $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
            }
            else {
                complete();
            }
        };
        Toast._jQueryInterface = function _jQueryInterface(config) {
            return this.each(function () {
                var $element = $(this);
                var data = $element.data(DATA_KEY$a);
                var _config = typeof config === 'object' && config;
                if (!data) {
                    data = new Toast(this, _config);
                    $element.data(DATA_KEY$a, data);
                }
                if (typeof config === 'string') {
                    if (typeof data[config] === 'undefined') {
                        throw new TypeError("No method named \"" + config + "\"");
                    }
                    data[config](this);
                }
            });
        };
        _createClass(Toast, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION$a;
                }
            }, {
                key: "DefaultType",
                get: function get() {
                    return DefaultType$7;
                }
            }, {
                key: "Default",
                get: function get() {
                    return Default$7;
                }
            }]);
        return Toast;
    }();
    $.fn[NAME$a] = Toast._jQueryInterface;
    $.fn[NAME$a].Constructor = Toast;
    $.fn[NAME$a].noConflict = function () {
        $.fn[NAME$a] = JQUERY_NO_CONFLICT$a;
        return Toast._jQueryInterface;
    };
    (function () {
        if (typeof $ === 'undefined') {
            throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
        }
        var version = $.fn.jquery.split(' ')[0].split('.');
        var minMajor = 1;
        var ltMajor = 2;
        var minMinor = 9;
        var minPatch = 1;
        var maxMajor = 4;
        if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
            throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
        }
    })();
    exports.Util = Util;
    exports.Alert = Alert;
    exports.Button = Button;
    exports.Carousel = Carousel;
    exports.Collapse = Collapse;
    exports.Dropdown = Dropdown;
    exports.Modal = Modal;
    exports.Popover = Popover;
    exports.Scrollspy = ScrollSpy;
    exports.Tab = Tab;
    exports.Toast = Toast;
    exports.Tooltip = Tooltip;
    Object.defineProperty(exports, '__esModule', { value: true });
}));
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.Sweetalert2 = factory());
}(this, (function () {
    'use strict';
    function _typeof(obj) {
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            _typeof = function (obj) {
                return typeof obj;
            };
        }
        else {
            _typeof = function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
        }
        return _typeof(obj);
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
            _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
            _defineProperties(Constructor, staticProps);
        return Constructor;
    }
    function _extends() {
        _extends = Object.assign || function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
            return target;
        };
        return _extends.apply(this, arguments);
    }
    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                writable: true,
                configurable: true
            }
        });
        if (superClass)
            _setPrototypeOf(subClass, superClass);
    }
    function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        };
        return _getPrototypeOf(o);
    }
    function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };
        return _setPrototypeOf(o, p);
    }
    function isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
            return false;
        if (Reflect.construct.sham)
            return false;
        if (typeof Proxy === "function")
            return true;
        try {
            Date.prototype.toString.call(Reflect.construct(Date, [], function () { }));
            return true;
        }
        catch (e) {
            return false;
        }
    }
    function _construct(Parent, args, Class) {
        if (isNativeReflectConstruct()) {
            _construct = Reflect.construct;
        }
        else {
            _construct = function _construct(Parent, args, Class) {
                var a = [null];
                a.push.apply(a, args);
                var Constructor = Function.bind.apply(Parent, a);
                var instance = new Constructor();
                if (Class)
                    _setPrototypeOf(instance, Class.prototype);
                return instance;
            };
        }
        return _construct.apply(null, arguments);
    }
    function _assertThisInitialized(self) {
        if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self;
    }
    function _possibleConstructorReturn(self, call) {
        if (call && (typeof call === "object" || typeof call === "function")) {
            return call;
        }
        return _assertThisInitialized(self);
    }
    function _superPropBase(object, property) {
        while (!Object.prototype.hasOwnProperty.call(object, property)) {
            object = _getPrototypeOf(object);
            if (object === null)
                break;
        }
        return object;
    }
    function _get(target, property, receiver) {
        if (typeof Reflect !== "undefined" && Reflect.get) {
            _get = Reflect.get;
        }
        else {
            _get = function _get(target, property, receiver) {
                var base = _superPropBase(target, property);
                if (!base)
                    return;
                var desc = Object.getOwnPropertyDescriptor(base, property);
                if (desc.get) {
                    return desc.get.call(receiver);
                }
                return desc.value;
            };
        }
        return _get(target, property, receiver || target);
    }
    var consolePrefix = 'SweetAlert2:';
    var uniqueArray = function uniqueArray(arr) {
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            if (result.indexOf(arr[i]) === -1) {
                result.push(arr[i]);
            }
        }
        return result;
    };
    var objectValues = function objectValues(obj) {
        return Object.keys(obj).map(function (key) {
            return obj[key];
        });
    };
    var toArray = function toArray(nodeList) {
        return Array.prototype.slice.call(nodeList);
    };
    var warn = function warn(message) {
        console.warn("".concat(consolePrefix, " ").concat(message));
    };
    var error = function error(message) {
        console.error("".concat(consolePrefix, " ").concat(message));
    };
    var previousWarnOnceMessages = [];
    var warnOnce = function warnOnce(message) {
        if (!(previousWarnOnceMessages.indexOf(message) !== -1)) {
            previousWarnOnceMessages.push(message);
            warn(message);
        }
    };
    var warnAboutDepreation = function warnAboutDepreation(deprecatedParam, useInstead) {
        warnOnce("\"".concat(deprecatedParam, "\" is deprecated and will be removed in the next major release. Please use \"").concat(useInstead, "\" instead."));
    };
    var callIfFunction = function callIfFunction(arg) {
        return typeof arg === 'function' ? arg() : arg;
    };
    var isPromise = function isPromise(arg) {
        return arg && Promise.resolve(arg) === arg;
    };
    var DismissReason = Object.freeze({
        cancel: 'cancel',
        backdrop: 'backdrop',
        close: 'close',
        esc: 'esc',
        timer: 'timer'
    });
    var argsToParams = function argsToParams(args) {
        var params = {};
        switch (_typeof(args[0])) {
            case 'object':
                _extends(params, args[0]);
                break;
            default:
                ['title', 'html', 'type'].forEach(function (name, index) {
                    switch (_typeof(args[index])) {
                        case 'string':
                            params[name] = args[index];
                            break;
                        case 'undefined':
                            break;
                        default:
                            error("Unexpected type of ".concat(name, "! Expected \"string\", got ").concat(_typeof(args[index])));
                    }
                });
        }
        return params;
    };
    var swalPrefix = 'swal2-';
    var prefix = function prefix(items) {
        var result = {};
        for (var i in items) {
            result[items[i]] = swalPrefix + items[i];
        }
        return result;
    };
    var swalClasses = prefix(['container', 'shown', 'height-auto', 'iosfix', 'popup', 'modal', 'no-backdrop', 'toast', 'toast-shown', 'toast-column', 'fade', 'show', 'hide', 'noanimation', 'close', 'title', 'header', 'content', 'actions', 'confirm', 'cancel', 'footer', 'icon', 'image', 'input', 'file', 'range', 'select', 'radio', 'checkbox', 'label', 'textarea', 'inputerror', 'validation-message', 'progress-steps', 'active-progress-step', 'progress-step', 'progress-step-line', 'loading', 'styled', 'top', 'top-start', 'top-end', 'top-left', 'top-right', 'center', 'center-start', 'center-end', 'center-left', 'center-right', 'bottom', 'bottom-start', 'bottom-end', 'bottom-left', 'bottom-right', 'grow-row', 'grow-column', 'grow-fullscreen', 'rtl']);
    var iconTypes = prefix(['success', 'warning', 'info', 'question', 'error']);
    var states = {
        previousBodyPadding: null
    };
    var hasClass = function hasClass(elem, className) {
        return elem.classList.contains(className);
    };
    var removeCustomClasses = function removeCustomClasses(elem) {
        toArray(elem.classList).forEach(function (className) {
            if (!(objectValues(swalClasses).indexOf(className) !== -1) && !(objectValues(iconTypes).indexOf(className) !== -1)) {
                elem.classList.remove(className);
            }
        });
    };
    var applyCustomClass = function applyCustomClass(elem, customClass, className) {
        removeCustomClasses(elem);
        if (customClass && customClass[className]) {
            if (typeof customClass[className] !== 'string' && !customClass[className].forEach) {
                return warn("Invalid type of customClass.".concat(className, "! Expected string or iterable object, got \"").concat(_typeof(customClass[className]), "\""));
            }
            addClass(elem, customClass[className]);
        }
    };
    function getInput(content, inputType) {
        if (!inputType) {
            return null;
        }
        switch (inputType) {
            case 'select':
            case 'textarea':
            case 'file':
                return getChildByClass(content, swalClasses[inputType]);
            case 'checkbox':
                return content.querySelector(".".concat(swalClasses.checkbox, " input"));
            case 'radio':
                return content.querySelector(".".concat(swalClasses.radio, " input:checked")) || content.querySelector(".".concat(swalClasses.radio, " input:first-child"));
            case 'range':
                return content.querySelector(".".concat(swalClasses.range, " input"));
            default:
                return getChildByClass(content, swalClasses.input);
        }
    }
    var focusInput = function focusInput(input) {
        input.focus();
        if (input.type !== 'file') {
            var val = input.value;
            input.value = '';
            input.value = val;
        }
    };
    var toggleClass = function toggleClass(target, classList, condition) {
        if (!target || !classList) {
            return;
        }
        if (typeof classList === 'string') {
            classList = classList.split(/\s+/).filter(Boolean);
        }
        classList.forEach(function (className) {
            if (target.forEach) {
                target.forEach(function (elem) {
                    condition ? elem.classList.add(className) : elem.classList.remove(className);
                });
            }
            else {
                condition ? target.classList.add(className) : target.classList.remove(className);
            }
        });
    };
    var addClass = function addClass(target, classList) {
        toggleClass(target, classList, true);
    };
    var removeClass = function removeClass(target, classList) {
        toggleClass(target, classList, false);
    };
    var getChildByClass = function getChildByClass(elem, className) {
        for (var i = 0; i < elem.childNodes.length; i++) {
            if (hasClass(elem.childNodes[i], className)) {
                return elem.childNodes[i];
            }
        }
    };
    var applyNumericalStyle = function applyNumericalStyle(elem, property, value) {
        if (value || parseInt(value) === 0) {
            elem.style[property] = typeof value === 'number' ? value + 'px' : value;
        }
        else {
            elem.style.removeProperty(property);
        }
    };
    var show = function show(elem) {
        var display = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'flex';
        elem.style.opacity = '';
        elem.style.display = display;
    };
    var hide = function hide(elem) {
        elem.style.opacity = '';
        elem.style.display = 'none';
    };
    var toggle = function toggle(elem, condition, display) {
        condition ? show(elem, display) : hide(elem);
    };
    var isVisible = function isVisible(elem) {
        return !!(elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length));
    };
    var isScrollable = function isScrollable(elem) {
        return !!(elem.scrollHeight > elem.clientHeight);
    };
    var hasCssAnimation = function hasCssAnimation(elem) {
        var style = window.getComputedStyle(elem);
        var animDuration = parseFloat(style.getPropertyValue('animation-duration') || '0');
        var transDuration = parseFloat(style.getPropertyValue('transition-duration') || '0');
        return animDuration > 0 || transDuration > 0;
    };
    var contains = function contains(haystack, needle) {
        if (typeof haystack.contains === 'function') {
            return haystack.contains(needle);
        }
    };
    var getContainer = function getContainer() {
        return document.body.querySelector('.' + swalClasses.container);
    };
    var elementBySelector = function elementBySelector(selectorString) {
        var container = getContainer();
        return container ? container.querySelector(selectorString) : null;
    };
    var elementByClass = function elementByClass(className) {
        return elementBySelector('.' + className);
    };
    var getPopup = function getPopup() {
        return elementByClass(swalClasses.popup);
    };
    var getIcons = function getIcons() {
        var popup = getPopup();
        return toArray(popup.querySelectorAll('.' + swalClasses.icon));
    };
    var getIcon = function getIcon() {
        var visibleIcon = getIcons().filter(function (icon) {
            return isVisible(icon);
        });
        return visibleIcon.length ? visibleIcon[0] : null;
    };
    var getTitle = function getTitle() {
        return elementByClass(swalClasses.title);
    };
    var getContent = function getContent() {
        return elementByClass(swalClasses.content);
    };
    var getImage = function getImage() {
        return elementByClass(swalClasses.image);
    };
    var getProgressSteps = function getProgressSteps() {
        return elementByClass(swalClasses['progress-steps']);
    };
    var getValidationMessage = function getValidationMessage() {
        return elementByClass(swalClasses['validation-message']);
    };
    var getConfirmButton = function getConfirmButton() {
        return elementBySelector('.' + swalClasses.actions + ' .' + swalClasses.confirm);
    };
    var getCancelButton = function getCancelButton() {
        return elementBySelector('.' + swalClasses.actions + ' .' + swalClasses.cancel);
    };
    var getActions = function getActions() {
        return elementByClass(swalClasses.actions);
    };
    var getHeader = function getHeader() {
        return elementByClass(swalClasses.header);
    };
    var getFooter = function getFooter() {
        return elementByClass(swalClasses.footer);
    };
    var getCloseButton = function getCloseButton() {
        return elementByClass(swalClasses.close);
    };
    var focusable = "\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex=\"0\"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n";
    var getFocusableElements = function getFocusableElements() {
        var focusableElementsWithTabindex = toArray(getPopup().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'))
            .sort(function (a, b) {
            a = parseInt(a.getAttribute('tabindex'));
            b = parseInt(b.getAttribute('tabindex'));
            if (a > b) {
                return 1;
            }
            else if (a < b) {
                return -1;
            }
            return 0;
        });
        var otherFocusableElements = toArray(getPopup().querySelectorAll(focusable)).filter(function (el) {
            return el.getAttribute('tabindex') !== '-1';
        });
        return uniqueArray(focusableElementsWithTabindex.concat(otherFocusableElements)).filter(function (el) {
            return isVisible(el);
        });
    };
    var isModal = function isModal() {
        return !isToast() && !document.body.classList.contains(swalClasses['no-backdrop']);
    };
    var isToast = function isToast() {
        return document.body.classList.contains(swalClasses['toast-shown']);
    };
    var isLoading = function isLoading() {
        return getPopup().hasAttribute('data-loading');
    };
    var isNodeEnv = function isNodeEnv() {
        return typeof window === 'undefined' || typeof document === 'undefined';
    };
    var sweetHTML = "\n <div aria-labelledby=\"".concat(swalClasses.title, "\" aria-describedby=\"").concat(swalClasses.content, "\" class=\"").concat(swalClasses.popup, "\" tabindex=\"-1\">\n   <div class=\"").concat(swalClasses.header, "\">\n     <ul class=\"").concat(swalClasses['progress-steps'], "\"></ul>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.error, "\">\n       <span class=\"swal2-x-mark\"><span class=\"swal2-x-mark-line-left\"></span><span class=\"swal2-x-mark-line-right\"></span></span>\n     </div>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.question, "\"></div>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.warning, "\"></div>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.info, "\"></div>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.success, "\">\n       <div class=\"swal2-success-circular-line-left\"></div>\n       <span class=\"swal2-success-line-tip\"></span> <span class=\"swal2-success-line-long\"></span>\n       <div class=\"swal2-success-ring\"></div> <div class=\"swal2-success-fix\"></div>\n       <div class=\"swal2-success-circular-line-right\"></div>\n     </div>\n     <img class=\"").concat(swalClasses.image, "\" />\n     <h2 class=\"").concat(swalClasses.title, "\" id=\"").concat(swalClasses.title, "\"></h2>\n     <button type=\"button\" class=\"").concat(swalClasses.close, "\"></button>\n   </div>\n   <div class=\"").concat(swalClasses.content, "\">\n     <div id=\"").concat(swalClasses.content, "\"></div>\n     <input class=\"").concat(swalClasses.input, "\" />\n     <input type=\"file\" class=\"").concat(swalClasses.file, "\" />\n     <div class=\"").concat(swalClasses.range, "\">\n       <input type=\"range\" />\n       <output></output>\n     </div>\n     <select class=\"").concat(swalClasses.select, "\"></select>\n     <div class=\"").concat(swalClasses.radio, "\"></div>\n     <label for=\"").concat(swalClasses.checkbox, "\" class=\"").concat(swalClasses.checkbox, "\">\n       <input type=\"checkbox\" />\n       <span class=\"").concat(swalClasses.label, "\"></span>\n     </label>\n     <textarea class=\"").concat(swalClasses.textarea, "\"></textarea>\n     <div class=\"").concat(swalClasses['validation-message'], "\" id=\"").concat(swalClasses['validation-message'], "\"></div>\n   </div>\n   <div class=\"").concat(swalClasses.actions, "\">\n     <button type=\"button\" class=\"").concat(swalClasses.confirm, "\">OK</button>\n     <button type=\"button\" class=\"").concat(swalClasses.cancel, "\">Cancel</button>\n   </div>\n   <div class=\"").concat(swalClasses.footer, "\">\n   </div>\n </div>\n").replace(/(^|\n)\s*/g, '');
    var resetOldContainer = function resetOldContainer() {
        var oldContainer = getContainer();
        if (!oldContainer) {
            return;
        }
        oldContainer.parentNode.removeChild(oldContainer);
        removeClass([document.documentElement, document.body], [swalClasses['no-backdrop'], swalClasses['toast-shown'], swalClasses['has-column']]);
    };
    var oldInputVal;
    var resetValidationMessage = function resetValidationMessage(e) {
        if (Swal.isVisible() && oldInputVal !== e.target.value) {
            Swal.resetValidationMessage();
        }
        oldInputVal = e.target.value;
    };
    var addInputChangeListeners = function addInputChangeListeners() {
        var content = getContent();
        var input = getChildByClass(content, swalClasses.input);
        var file = getChildByClass(content, swalClasses.file);
        var range = content.querySelector(".".concat(swalClasses.range, " input"));
        var rangeOutput = content.querySelector(".".concat(swalClasses.range, " output"));
        var select = getChildByClass(content, swalClasses.select);
        var checkbox = content.querySelector(".".concat(swalClasses.checkbox, " input"));
        var textarea = getChildByClass(content, swalClasses.textarea);
        input.oninput = resetValidationMessage;
        file.onchange = resetValidationMessage;
        select.onchange = resetValidationMessage;
        checkbox.onchange = resetValidationMessage;
        textarea.oninput = resetValidationMessage;
        range.oninput = function (e) {
            resetValidationMessage(e);
            rangeOutput.value = range.value;
        };
        range.onchange = function (e) {
            resetValidationMessage(e);
            range.nextSibling.value = range.value;
        };
    };
    var getTarget = function getTarget(target) {
        return typeof target === 'string' ? document.querySelector(target) : target;
    };
    var setupAccessibility = function setupAccessibility(params) {
        var popup = getPopup();
        popup.setAttribute('role', params.toast ? 'alert' : 'dialog');
        popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive');
        if (!params.toast) {
            popup.setAttribute('aria-modal', 'true');
        }
    };
    var setupRTL = function setupRTL(targetElement) {
        if (window.getComputedStyle(targetElement).direction === 'rtl') {
            addClass(getContainer(), swalClasses.rtl);
        }
    };
    var init = function init(params) {
        resetOldContainer();
        if (isNodeEnv()) {
            error('SweetAlert2 requires document to initialize');
            return;
        }
        var container = document.createElement('div');
        container.className = swalClasses.container;
        container.innerHTML = sweetHTML;
        var targetElement = getTarget(params.target);
        targetElement.appendChild(container);
        setupAccessibility(params);
        setupRTL(targetElement);
        addInputChangeListeners();
    };
    var parseHtmlToContainer = function parseHtmlToContainer(param, target) {
        if (param instanceof HTMLElement) {
            target.appendChild(param);
        }
        else if (_typeof(param) === 'object') {
            handleJqueryElem(target, param);
        }
        else if (param) {
            target.innerHTML = param;
        }
    };
    var handleJqueryElem = function handleJqueryElem(target, elem) {
        target.innerHTML = '';
        if (0 in elem) {
            for (var i = 0; i in elem; i++) {
                target.appendChild(elem[i].cloneNode(true));
            }
        }
        else {
            target.appendChild(elem.cloneNode(true));
        }
    };
    var animationEndEvent = function () {
        if (isNodeEnv()) {
            return false;
        }
        var testEl = document.createElement('div');
        var transEndEventNames = {
            WebkitAnimation: 'webkitAnimationEnd',
            OAnimation: 'oAnimationEnd oanimationend',
            animation: 'animationend'
        };
        for (var i in transEndEventNames) {
            if (Object.prototype.hasOwnProperty.call(transEndEventNames, i) && typeof testEl.style[i] !== 'undefined') {
                return transEndEventNames[i];
            }
        }
        return false;
    }();
    var measureScrollbar = function measureScrollbar() {
        var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
        if (supportsTouch) {
            return 0;
        }
        var scrollDiv = document.createElement('div');
        scrollDiv.style.width = '50px';
        scrollDiv.style.height = '50px';
        scrollDiv.style.overflow = 'scroll';
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
    };
    var renderActions = function renderActions(instance, params) {
        var actions = getActions();
        var confirmButton = getConfirmButton();
        var cancelButton = getCancelButton();
        if (!params.showConfirmButton && !params.showCancelButton) {
            hide(actions);
        }
        applyCustomClass(actions, params.customClass, 'actions');
        renderButton(confirmButton, 'confirm', params);
        renderButton(cancelButton, 'cancel', params);
        if (params.buttonsStyling) {
            handleButtonsStyling(confirmButton, cancelButton, params);
        }
        else {
            removeClass([confirmButton, cancelButton], swalClasses.styled);
            confirmButton.style.backgroundColor = confirmButton.style.borderLeftColor = confirmButton.style.borderRightColor = '';
            cancelButton.style.backgroundColor = cancelButton.style.borderLeftColor = cancelButton.style.borderRightColor = '';
        }
        if (params.reverseButtons) {
            confirmButton.parentNode.insertBefore(cancelButton, confirmButton);
        }
    };
    function handleButtonsStyling(confirmButton, cancelButton, params) {
        addClass([confirmButton, cancelButton], swalClasses.styled);
        if (params.confirmButtonColor) {
            confirmButton.style.backgroundColor = params.confirmButtonColor;
        }
        if (params.cancelButtonColor) {
            cancelButton.style.backgroundColor = params.cancelButtonColor;
        }
        var confirmButtonBackgroundColor = window.getComputedStyle(confirmButton).getPropertyValue('background-color');
        confirmButton.style.borderLeftColor = confirmButtonBackgroundColor;
        confirmButton.style.borderRightColor = confirmButtonBackgroundColor;
    }
    function renderButton(button, buttonType, params) {
        toggle(button, params['showC' + buttonType.substring(1) + 'Button'], 'inline-block');
        button.innerHTML = params[buttonType + 'ButtonText'];
        button.setAttribute('aria-label', params[buttonType + 'ButtonAriaLabel']);
        button.className = swalClasses[buttonType];
        applyCustomClass(button, params.customClass, buttonType + 'Button');
        addClass(button, params[buttonType + 'ButtonClass']);
    }
    function handleBackdropParam(container, backdrop) {
        if (typeof backdrop === 'string') {
            container.style.background = backdrop;
        }
        else if (!backdrop) {
            addClass([document.documentElement, document.body], swalClasses['no-backdrop']);
        }
    }
    function handlePositionParam(container, position) {
        if (position in swalClasses) {
            addClass(container, swalClasses[position]);
        }
        else {
            warn('The "position" parameter is not valid, defaulting to "center"');
            addClass(container, swalClasses.center);
        }
    }
    function handleGrowParam(container, grow) {
        if (grow && typeof grow === 'string') {
            var growClass = 'grow-' + grow;
            if (growClass in swalClasses) {
                addClass(container, swalClasses[growClass]);
            }
        }
    }
    var renderContainer = function renderContainer(instance, params) {
        var container = getContainer();
        if (!container) {
            return;
        }
        handleBackdropParam(container, params.backdrop);
        if (!params.backdrop && params.allowOutsideClick) {
            warn('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');
        }
        handlePositionParam(container, params.position);
        handleGrowParam(container, params.grow);
        applyCustomClass(container, params.customClass, 'container');
        if (params.customContainerClass) {
            addClass(container, params.customContainerClass);
        }
    };
    var privateProps = {
        promise: new WeakMap(),
        innerParams: new WeakMap(),
        domCache: new WeakMap()
    };
    var inputTypes = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];
    var renderInput = function renderInput(instance, params) {
        var content = getContent();
        var innerParams = privateProps.innerParams.get(instance);
        var rerender = !innerParams || params.input !== innerParams.input;
        inputTypes.forEach(function (inputType) {
            var inputClass = swalClasses[inputType];
            var inputContainer = getChildByClass(content, inputClass);
            setAttributes(inputType, params.inputAttributes);
            inputContainer.className = inputClass;
            if (rerender) {
                hide(inputContainer);
            }
        });
        if (params.input) {
            if (rerender) {
                showInput(params);
            }
            setCustomClass(params);
        }
    };
    var showInput = function showInput(params) {
        if (!renderInputType[params.input]) {
            return error("Unexpected type of input! Expected \"text\", \"email\", \"password\", \"number\", \"tel\", \"select\", \"radio\", \"checkbox\", \"textarea\", \"file\" or \"url\", got \"".concat(params.input, "\""));
        }
        var inputContainer = getInputContainer(params.input);
        var input = renderInputType[params.input](inputContainer, params);
        show(input);
        setTimeout(function () {
            focusInput(input);
        });
    };
    var removeAttributes = function removeAttributes(input) {
        for (var i = 0; i < input.attributes.length; i++) {
            var attrName = input.attributes[i].name;
            if (!(['type', 'value', 'style'].indexOf(attrName) !== -1)) {
                input.removeAttribute(attrName);
            }
        }
    };
    var setAttributes = function setAttributes(inputType, inputAttributes) {
        var input = getInput(getContent(), inputType);
        if (!input) {
            return;
        }
        removeAttributes(input);
        for (var attr in inputAttributes) {
            if (inputType === 'range' && attr === 'placeholder') {
                continue;
            }
            input.setAttribute(attr, inputAttributes[attr]);
        }
    };
    var setCustomClass = function setCustomClass(params) {
        var inputContainer = getInputContainer(params.input);
        if (params.inputClass) {
            addClass(inputContainer, params.inputClass);
        }
        if (params.customClass) {
            addClass(inputContainer, params.customClass.input);
        }
    };
    var setInputPlaceholder = function setInputPlaceholder(input, params) {
        if (!input.placeholder || params.inputPlaceholder) {
            input.placeholder = params.inputPlaceholder;
        }
    };
    var getInputContainer = function getInputContainer(inputType) {
        var inputClass = swalClasses[inputType] ? swalClasses[inputType] : swalClasses.input;
        return getChildByClass(getContent(), inputClass);
    };
    var renderInputType = {};
    renderInputType.text = renderInputType.email = renderInputType.password = renderInputType.number = renderInputType.tel = renderInputType.url = function (input, params) {
        if (typeof params.inputValue === 'string' || typeof params.inputValue === 'number') {
            input.value = params.inputValue;
        }
        else if (!isPromise(params.inputValue)) {
            warn("Unexpected type of inputValue! Expected \"string\", \"number\" or \"Promise\", got \"".concat(_typeof(params.inputValue), "\""));
        }
        setInputPlaceholder(input, params);
        input.type = params.input;
        return input;
    };
    renderInputType.file = function (input, params) {
        setInputPlaceholder(input, params);
        return input;
    };
    renderInputType.range = function (range, params) {
        var rangeInput = range.querySelector('input');
        var rangeOutput = range.querySelector('output');
        rangeInput.value = params.inputValue;
        rangeInput.type = params.input;
        rangeOutput.value = params.inputValue;
        return range;
    };
    renderInputType.select = function (select, params) {
        select.innerHTML = '';
        if (params.inputPlaceholder) {
            var placeholder = document.createElement('option');
            placeholder.innerHTML = params.inputPlaceholder;
            placeholder.value = '';
            placeholder.disabled = true;
            placeholder.selected = true;
            select.appendChild(placeholder);
        }
        return select;
    };
    renderInputType.radio = function (radio) {
        radio.innerHTML = '';
        return radio;
    };
    renderInputType.checkbox = function (checkboxContainer, params) {
        var checkbox = getInput(getContent(), 'checkbox');
        checkbox.value = 1;
        checkbox.id = swalClasses.checkbox;
        checkbox.checked = Boolean(params.inputValue);
        var label = checkboxContainer.querySelector('span');
        label.innerHTML = params.inputPlaceholder;
        return checkboxContainer;
    };
    renderInputType.textarea = function (textarea, params) {
        textarea.value = params.inputValue;
        setInputPlaceholder(textarea, params);
        if ('MutationObserver' in window) {
            var initialPopupWidth = parseInt(window.getComputedStyle(getPopup()).width);
            var popupPadding = parseInt(window.getComputedStyle(getPopup()).paddingLeft) + parseInt(window.getComputedStyle(getPopup()).paddingRight);
            var outputsize = function outputsize() {
                var contentWidth = textarea.offsetWidth + popupPadding;
                if (contentWidth > initialPopupWidth) {
                    getPopup().style.width = contentWidth + 'px';
                }
                else {
                    getPopup().style.width = null;
                }
            };
            new MutationObserver(outputsize).observe(textarea, {
                attributes: true,
                attributeFilter: ['style']
            });
        }
        return textarea;
    };
    var renderContent = function renderContent(instance, params) {
        var content = getContent().querySelector('#' + swalClasses.content);
        if (params.html) {
            parseHtmlToContainer(params.html, content);
            show(content, 'block');
        }
        else if (params.text) {
            content.textContent = params.text;
            show(content, 'block');
        }
        else {
            hide(content);
        }
        renderInput(instance, params);
        applyCustomClass(getContent(), params.customClass, 'content');
    };
    var renderFooter = function renderFooter(instance, params) {
        var footer = getFooter();
        toggle(footer, params.footer);
        if (params.footer) {
            parseHtmlToContainer(params.footer, footer);
        }
        applyCustomClass(footer, params.customClass, 'footer');
    };
    var renderCloseButton = function renderCloseButton(instance, params) {
        var closeButton = getCloseButton();
        closeButton.innerHTML = params.closeButtonHtml;
        applyCustomClass(closeButton, params.customClass, 'closeButton');
        toggle(closeButton, params.showCloseButton);
        closeButton.setAttribute('aria-label', params.closeButtonAriaLabel);
    };
    var renderIcon = function renderIcon(instance, params) {
        var innerParams = privateProps.innerParams.get(instance);
        if (innerParams && params.type === innerParams.type && getIcon()) {
            applyCustomClass(getIcon(), params.customClass, 'icon');
            return;
        }
        hideAllIcons();
        if (!params.type) {
            return;
        }
        adjustSuccessIconBackgoundColor();
        if (Object.keys(iconTypes).indexOf(params.type) !== -1) {
            var icon = elementBySelector(".".concat(swalClasses.icon, ".").concat(iconTypes[params.type]));
            show(icon);
            applyCustomClass(icon, params.customClass, 'icon');
            toggleClass(icon, "swal2-animate-".concat(params.type, "-icon"), params.animation);
        }
        else {
            error("Unknown type! Expected \"success\", \"error\", \"warning\", \"info\" or \"question\", got \"".concat(params.type, "\""));
        }
    };
    var hideAllIcons = function hideAllIcons() {
        var icons = getIcons();
        for (var i = 0; i < icons.length; i++) {
            hide(icons[i]);
        }
    };
    var adjustSuccessIconBackgoundColor = function adjustSuccessIconBackgoundColor() {
        var popup = getPopup();
        var popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue('background-color');
        var successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix');
        for (var i = 0; i < successIconParts.length; i++) {
            successIconParts[i].style.backgroundColor = popupBackgroundColor;
        }
    };
    var renderImage = function renderImage(instance, params) {
        var image = getImage();
        if (!params.imageUrl) {
            return hide(image);
        }
        show(image);
        image.setAttribute('src', params.imageUrl);
        image.setAttribute('alt', params.imageAlt);
        applyNumericalStyle(image, 'width', params.imageWidth);
        applyNumericalStyle(image, 'height', params.imageHeight);
        image.className = swalClasses.image;
        applyCustomClass(image, params.customClass, 'image');
        if (params.imageClass) {
            addClass(image, params.imageClass);
        }
    };
    var createStepElement = function createStepElement(step) {
        var stepEl = document.createElement('li');
        addClass(stepEl, swalClasses['progress-step']);
        stepEl.innerHTML = step;
        return stepEl;
    };
    var createLineElement = function createLineElement(params) {
        var lineEl = document.createElement('li');
        addClass(lineEl, swalClasses['progress-step-line']);
        if (params.progressStepsDistance) {
            lineEl.style.width = params.progressStepsDistance;
        }
        return lineEl;
    };
    var renderProgressSteps = function renderProgressSteps(instance, params) {
        var progressStepsContainer = getProgressSteps();
        if (!params.progressSteps || params.progressSteps.length === 0) {
            return hide(progressStepsContainer);
        }
        show(progressStepsContainer);
        progressStepsContainer.innerHTML = '';
        var currentProgressStep = parseInt(params.currentProgressStep === null ? Swal.getQueueStep() : params.currentProgressStep);
        if (currentProgressStep >= params.progressSteps.length) {
            warn('Invalid currentProgressStep parameter, it should be less than progressSteps.length ' + '(currentProgressStep like JS arrays starts from 0)');
        }
        params.progressSteps.forEach(function (step, index) {
            var stepEl = createStepElement(step);
            progressStepsContainer.appendChild(stepEl);
            if (index === currentProgressStep) {
                addClass(stepEl, swalClasses['active-progress-step']);
            }
            if (index !== params.progressSteps.length - 1) {
                var lineEl = createLineElement(step);
                progressStepsContainer.appendChild(lineEl);
            }
        });
    };
    var renderTitle = function renderTitle(instance, params) {
        var title = getTitle();
        toggle(title, params.title || params.titleText);
        if (params.title) {
            parseHtmlToContainer(params.title, title);
        }
        if (params.titleText) {
            title.innerText = params.titleText;
        }
        applyCustomClass(title, params.customClass, 'title');
    };
    var renderHeader = function renderHeader(instance, params) {
        var header = getHeader();
        applyCustomClass(header, params.customClass, 'header');
        renderProgressSteps(instance, params);
        renderIcon(instance, params);
        renderImage(instance, params);
        renderTitle(instance, params);
        renderCloseButton(instance, params);
    };
    var renderPopup = function renderPopup(instance, params) {
        var popup = getPopup();
        applyNumericalStyle(popup, 'width', params.width);
        applyNumericalStyle(popup, 'padding', params.padding);
        if (params.background) {
            popup.style.background = params.background;
        }
        popup.className = swalClasses.popup;
        if (params.toast) {
            addClass([document.documentElement, document.body], swalClasses['toast-shown']);
            addClass(popup, swalClasses.toast);
        }
        else {
            addClass(popup, swalClasses.modal);
        }
        applyCustomClass(popup, params.customClass, 'popup');
        if (typeof params.customClass === 'string') {
            addClass(popup, params.customClass);
        }
        toggleClass(popup, swalClasses.noanimation, !params.animation);
    };
    var render = function render(instance, params) {
        renderPopup(instance, params);
        renderContainer(instance, params);
        renderHeader(instance, params);
        renderContent(instance, params);
        renderActions(instance, params);
        renderFooter(instance, params);
        if (typeof params.onRender === 'function') {
            params.onRender(getPopup());
        }
    };
    var isVisible$1 = function isVisible$$1() {
        return isVisible(getPopup());
    };
    var clickConfirm = function clickConfirm() {
        return getConfirmButton() && getConfirmButton().click();
    };
    var clickCancel = function clickCancel() {
        return getCancelButton() && getCancelButton().click();
    };
    function fire() {
        var Swal = this;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _construct(Swal, args);
    }
    function mixin(mixinParams) {
        var MixinSwal = function (_this) {
            _inherits(MixinSwal, _this);
            function MixinSwal() {
                _classCallCheck(this, MixinSwal);
                return _possibleConstructorReturn(this, _getPrototypeOf(MixinSwal).apply(this, arguments));
            }
            _createClass(MixinSwal, [{
                    key: "_main",
                    value: function _main(params) {
                        return _get(_getPrototypeOf(MixinSwal.prototype), "_main", this).call(this, _extends({}, mixinParams, params));
                    }
                }]);
            return MixinSwal;
        }(this);
        return MixinSwal;
    }
    var currentSteps = [];
    var queue = function queue(steps) {
        var Swal = this;
        currentSteps = steps;
        var resetAndResolve = function resetAndResolve(resolve, value) {
            currentSteps = [];
            document.body.removeAttribute('data-swal2-queue-step');
            resolve(value);
        };
        var queueResult = [];
        return new Promise(function (resolve) {
            (function step(i, callback) {
                if (i < currentSteps.length) {
                    document.body.setAttribute('data-swal2-queue-step', i);
                    Swal.fire(currentSteps[i]).then(function (result) {
                        if (typeof result.value !== 'undefined') {
                            queueResult.push(result.value);
                            step(i + 1, callback);
                        }
                        else {
                            resetAndResolve(resolve, {
                                dismiss: result.dismiss
                            });
                        }
                    });
                }
                else {
                    resetAndResolve(resolve, {
                        value: queueResult
                    });
                }
            })(0);
        });
    };
    var getQueueStep = function getQueueStep() {
        return document.body.getAttribute('data-swal2-queue-step');
    };
    var insertQueueStep = function insertQueueStep(step, index) {
        if (index && index < currentSteps.length) {
            return currentSteps.splice(index, 0, step);
        }
        return currentSteps.push(step);
    };
    var deleteQueueStep = function deleteQueueStep(index) {
        if (typeof currentSteps[index] !== 'undefined') {
            currentSteps.splice(index, 1);
        }
    };
    var showLoading = function showLoading() {
        var popup = getPopup();
        if (!popup) {
            Swal.fire('');
        }
        popup = getPopup();
        var actions = getActions();
        var confirmButton = getConfirmButton();
        var cancelButton = getCancelButton();
        show(actions);
        show(confirmButton);
        addClass([popup, actions], swalClasses.loading);
        confirmButton.disabled = true;
        cancelButton.disabled = true;
        popup.setAttribute('data-loading', true);
        popup.setAttribute('aria-busy', true);
        popup.focus();
    };
    var RESTORE_FOCUS_TIMEOUT = 100;
    var globalState = {};
    var focusPreviousActiveElement = function focusPreviousActiveElement() {
        if (globalState.previousActiveElement && globalState.previousActiveElement.focus) {
            globalState.previousActiveElement.focus();
            globalState.previousActiveElement = null;
        }
        else if (document.body) {
            document.body.focus();
        }
    };
    var restoreActiveElement = function restoreActiveElement() {
        return new Promise(function (resolve) {
            var x = window.scrollX;
            var y = window.scrollY;
            globalState.restoreFocusTimeout = setTimeout(function () {
                focusPreviousActiveElement();
                resolve();
            }, RESTORE_FOCUS_TIMEOUT);
            if (typeof x !== 'undefined' && typeof y !== 'undefined') {
                window.scrollTo(x, y);
            }
        });
    };
    var getTimerLeft = function getTimerLeft() {
        return globalState.timeout && globalState.timeout.getTimerLeft();
    };
    var stopTimer = function stopTimer() {
        return globalState.timeout && globalState.timeout.stop();
    };
    var resumeTimer = function resumeTimer() {
        return globalState.timeout && globalState.timeout.start();
    };
    var toggleTimer = function toggleTimer() {
        var timer = globalState.timeout;
        return timer && (timer.running ? timer.stop() : timer.start());
    };
    var increaseTimer = function increaseTimer(n) {
        return globalState.timeout && globalState.timeout.increase(n);
    };
    var isTimerRunning = function isTimerRunning() {
        return globalState.timeout && globalState.timeout.isRunning();
    };
    var defaultParams = {
        title: '',
        titleText: '',
        text: '',
        html: '',
        footer: '',
        type: null,
        toast: false,
        customClass: '',
        customContainerClass: '',
        target: 'body',
        backdrop: true,
        animation: true,
        heightAuto: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
        allowEnterKey: true,
        stopKeydownPropagation: true,
        keydownListenerCapture: false,
        showConfirmButton: true,
        showCancelButton: false,
        preConfirm: null,
        confirmButtonText: 'OK',
        confirmButtonAriaLabel: '',
        confirmButtonColor: null,
        confirmButtonClass: '',
        cancelButtonText: 'Cancel',
        cancelButtonAriaLabel: '',
        cancelButtonColor: null,
        cancelButtonClass: '',
        buttonsStyling: true,
        reverseButtons: false,
        focusConfirm: true,
        focusCancel: false,
        showCloseButton: false,
        closeButtonHtml: '&times;',
        closeButtonAriaLabel: 'Close this dialog',
        showLoaderOnConfirm: false,
        imageUrl: null,
        imageWidth: null,
        imageHeight: null,
        imageAlt: '',
        imageClass: '',
        timer: null,
        width: null,
        padding: null,
        background: null,
        input: null,
        inputPlaceholder: '',
        inputValue: '',
        inputOptions: {},
        inputAutoTrim: true,
        inputClass: '',
        inputAttributes: {},
        inputValidator: null,
        validationMessage: null,
        grow: false,
        position: 'center',
        progressSteps: [],
        currentProgressStep: null,
        progressStepsDistance: null,
        onBeforeOpen: null,
        onOpen: null,
        onRender: null,
        onClose: null,
        onAfterClose: null,
        scrollbarPadding: true
    };
    var updatableParams = ['title', 'titleText', 'text', 'html', 'type', 'customClass', 'showConfirmButton', 'showCancelButton', 'confirmButtonText', 'confirmButtonAriaLabel', 'confirmButtonColor', 'confirmButtonClass', 'cancelButtonText', 'cancelButtonAriaLabel', 'cancelButtonColor', 'cancelButtonClass', 'buttonsStyling', 'reverseButtons', 'imageUrl', 'imageWidth', 'imageHeigth', 'imageAlt', 'imageClass', 'progressSteps', 'currentProgressStep'];
    var deprecatedParams = {
        customContainerClass: 'customClass',
        confirmButtonClass: 'customClass',
        cancelButtonClass: 'customClass',
        imageClass: 'customClass',
        inputClass: 'customClass'
    };
    var toastIncompatibleParams = ['allowOutsideClick', 'allowEnterKey', 'backdrop', 'focusConfirm', 'focusCancel', 'heightAuto', 'keydownListenerCapture'];
    var isValidParameter = function isValidParameter(paramName) {
        return Object.prototype.hasOwnProperty.call(defaultParams, paramName);
    };
    var isUpdatableParameter = function isUpdatableParameter(paramName) {
        return updatableParams.indexOf(paramName) !== -1;
    };
    var isDeprecatedParameter = function isDeprecatedParameter(paramName) {
        return deprecatedParams[paramName];
    };
    var checkIfParamIsValid = function checkIfParamIsValid(param) {
        if (!isValidParameter(param)) {
            warn("Unknown parameter \"".concat(param, "\""));
        }
    };
    var checkIfToastParamIsValid = function checkIfToastParamIsValid(param) {
        if (toastIncompatibleParams.indexOf(param) !== -1) {
            warn("The parameter \"".concat(param, "\" is incompatible with toasts"));
        }
    };
    var checkIfParamIsDeprecated = function checkIfParamIsDeprecated(param) {
        if (isDeprecatedParameter(param)) {
            warnAboutDepreation(param, isDeprecatedParameter(param));
        }
    };
    var showWarningsForParams = function showWarningsForParams(params) {
        for (var param in params) {
            checkIfParamIsValid(param);
            if (params.toast) {
                checkIfToastParamIsValid(param);
            }
            checkIfParamIsDeprecated();
        }
    };
    var staticMethods = Object.freeze({
        isValidParameter: isValidParameter,
        isUpdatableParameter: isUpdatableParameter,
        isDeprecatedParameter: isDeprecatedParameter,
        argsToParams: argsToParams,
        isVisible: isVisible$1,
        clickConfirm: clickConfirm,
        clickCancel: clickCancel,
        getContainer: getContainer,
        getPopup: getPopup,
        getTitle: getTitle,
        getContent: getContent,
        getImage: getImage,
        getIcon: getIcon,
        getIcons: getIcons,
        getCloseButton: getCloseButton,
        getActions: getActions,
        getConfirmButton: getConfirmButton,
        getCancelButton: getCancelButton,
        getHeader: getHeader,
        getFooter: getFooter,
        getFocusableElements: getFocusableElements,
        getValidationMessage: getValidationMessage,
        isLoading: isLoading,
        fire: fire,
        mixin: mixin,
        queue: queue,
        getQueueStep: getQueueStep,
        insertQueueStep: insertQueueStep,
        deleteQueueStep: deleteQueueStep,
        showLoading: showLoading,
        enableLoading: showLoading,
        getTimerLeft: getTimerLeft,
        stopTimer: stopTimer,
        resumeTimer: resumeTimer,
        toggleTimer: toggleTimer,
        increaseTimer: increaseTimer,
        isTimerRunning: isTimerRunning
    });
    function hideLoading() {
        var innerParams = privateProps.innerParams.get(this);
        var domCache = privateProps.domCache.get(this);
        if (!innerParams.showConfirmButton) {
            hide(domCache.confirmButton);
            if (!innerParams.showCancelButton) {
                hide(domCache.actions);
            }
        }
        removeClass([domCache.popup, domCache.actions], swalClasses.loading);
        domCache.popup.removeAttribute('aria-busy');
        domCache.popup.removeAttribute('data-loading');
        domCache.confirmButton.disabled = false;
        domCache.cancelButton.disabled = false;
    }
    function getInput$1(instance) {
        var innerParams = privateProps.innerParams.get(instance || this);
        var domCache = privateProps.domCache.get(instance || this);
        if (!domCache) {
            return null;
        }
        return getInput(domCache.content, innerParams.input);
    }
    var fixScrollbar = function fixScrollbar() {
        if (states.previousBodyPadding !== null) {
            return;
        }
        if (document.body.scrollHeight > window.innerHeight) {
            states.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'));
            document.body.style.paddingRight = states.previousBodyPadding + measureScrollbar() + 'px';
        }
    };
    var undoScrollbar = function undoScrollbar() {
        if (states.previousBodyPadding !== null) {
            document.body.style.paddingRight = states.previousBodyPadding + 'px';
            states.previousBodyPadding = null;
        }
    };
    var iOSfix = function iOSfix() {
        var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
            var offset = document.body.scrollTop;
            document.body.style.top = offset * -1 + 'px';
            addClass(document.body, swalClasses.iosfix);
            lockBodyScroll();
        }
    };
    var lockBodyScroll = function lockBodyScroll() {
        var container = getContainer();
        var preventTouchMove;
        container.ontouchstart = function (e) {
            preventTouchMove = e.target === container || !isScrollable(container) && e.target.tagName !== 'INPUT';
        };
        container.ontouchmove = function (e) {
            if (preventTouchMove) {
                e.preventDefault();
                e.stopPropagation();
            }
        };
    };
    var undoIOSfix = function undoIOSfix() {
        if (hasClass(document.body, swalClasses.iosfix)) {
            var offset = parseInt(document.body.style.top, 10);
            removeClass(document.body, swalClasses.iosfix);
            document.body.style.top = '';
            document.body.scrollTop = offset * -1;
        }
    };
    var isIE11 = function isIE11() {
        return !!window.MSInputMethodContext && !!document.documentMode;
    };
    var fixVerticalPositionIE = function fixVerticalPositionIE() {
        var container = getContainer();
        var popup = getPopup();
        container.style.removeProperty('align-items');
        if (popup.offsetTop < 0) {
            container.style.alignItems = 'flex-start';
        }
    };
    var IEfix = function IEfix() {
        if (typeof window !== 'undefined' && isIE11()) {
            fixVerticalPositionIE();
            window.addEventListener('resize', fixVerticalPositionIE);
        }
    };
    var undoIEfix = function undoIEfix() {
        if (typeof window !== 'undefined' && isIE11()) {
            window.removeEventListener('resize', fixVerticalPositionIE);
        }
    };
    var setAriaHidden = function setAriaHidden() {
        var bodyChildren = toArray(document.body.children);
        bodyChildren.forEach(function (el) {
            if (el === getContainer() || contains(el, getContainer())) {
                return;
            }
            if (el.hasAttribute('aria-hidden')) {
                el.setAttribute('data-previous-aria-hidden', el.getAttribute('aria-hidden'));
            }
            el.setAttribute('aria-hidden', 'true');
        });
    };
    var unsetAriaHidden = function unsetAriaHidden() {
        var bodyChildren = toArray(document.body.children);
        bodyChildren.forEach(function (el) {
            if (el.hasAttribute('data-previous-aria-hidden')) {
                el.setAttribute('aria-hidden', el.getAttribute('data-previous-aria-hidden'));
                el.removeAttribute('data-previous-aria-hidden');
            }
            else {
                el.removeAttribute('aria-hidden');
            }
        });
    };
    var privateMethods = {
        swalPromiseResolve: new WeakMap()
    };
    function removePopupAndResetState(instance, container, isToast, onAfterClose) {
        if (isToast) {
            triggerOnAfterCloseAndDispose(instance, onAfterClose);
        }
        else {
            restoreActiveElement().then(function () {
                return triggerOnAfterCloseAndDispose(instance, onAfterClose);
            });
            globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, {
                capture: globalState.keydownListenerCapture
            });
            globalState.keydownHandlerAdded = false;
        }
        if (container.parentNode) {
            container.parentNode.removeChild(container);
        }
        if (isModal()) {
            undoScrollbar();
            undoIOSfix();
            undoIEfix();
            unsetAriaHidden();
        }
        removeBodyClasses();
    }
    function removeBodyClasses() {
        removeClass([document.documentElement, document.body], [swalClasses.shown, swalClasses['height-auto'], swalClasses['no-backdrop'], swalClasses['toast-shown'], swalClasses['toast-column']]);
    }
    function disposeSwal(instance) {
        delete instance.params;
        delete globalState.keydownHandler;
        delete globalState.keydownTarget;
        unsetWeakMaps(privateProps);
        unsetWeakMaps(privateMethods);
    }
    function close(resolveValue) {
        var popup = getPopup();
        if (!popup || hasClass(popup, swalClasses.hide)) {
            return;
        }
        var innerParams = privateProps.innerParams.get(this);
        if (!innerParams) {
            return;
        }
        var swalPromiseResolve = privateMethods.swalPromiseResolve.get(this);
        removeClass(popup, swalClasses.show);
        addClass(popup, swalClasses.hide);
        handlePopupAnimation(this, popup, innerParams);
        swalPromiseResolve(resolveValue || {});
    }
    var handlePopupAnimation = function handlePopupAnimation(instance, popup, innerParams) {
        var container = getContainer();
        var animationIsSupported = animationEndEvent && hasCssAnimation(popup);
        var onClose = innerParams.onClose, onAfterClose = innerParams.onAfterClose;
        if (onClose !== null && typeof onClose === 'function') {
            onClose(popup);
        }
        if (animationIsSupported) {
            animatePopup(instance, popup, container, onAfterClose);
        }
        else {
            removePopupAndResetState(instance, container, isToast(), onAfterClose);
        }
    };
    var animatePopup = function animatePopup(instance, popup, container, onAfterClose) {
        globalState.swalCloseEventFinishedCallback = removePopupAndResetState.bind(null, instance, container, isToast(), onAfterClose);
        popup.addEventListener(animationEndEvent, function (e) {
            if (e.target === popup) {
                globalState.swalCloseEventFinishedCallback();
                delete globalState.swalCloseEventFinishedCallback;
            }
        });
    };
    var unsetWeakMaps = function unsetWeakMaps(obj) {
        for (var i in obj) {
            obj[i] = new WeakMap();
        }
    };
    var triggerOnAfterCloseAndDispose = function triggerOnAfterCloseAndDispose(instance, onAfterClose) {
        setTimeout(function () {
            if (onAfterClose !== null && typeof onAfterClose === 'function') {
                onAfterClose();
            }
            if (!getPopup()) {
                disposeSwal(instance);
            }
        });
    };
    function setButtonsDisabled(instance, buttons, disabled) {
        var domCache = privateProps.domCache.get(instance);
        buttons.forEach(function (button) {
            domCache[button].disabled = disabled;
        });
    }
    function setInputDisabled(input, disabled) {
        if (!input) {
            return false;
        }
        if (input.type === 'radio') {
            var radiosContainer = input.parentNode.parentNode;
            var radios = radiosContainer.querySelectorAll('input');
            for (var i = 0; i < radios.length; i++) {
                radios[i].disabled = disabled;
            }
        }
        else {
            input.disabled = disabled;
        }
    }
    function enableButtons() {
        setButtonsDisabled(this, ['confirmButton', 'cancelButton'], false);
    }
    function disableButtons() {
        setButtonsDisabled(this, ['confirmButton', 'cancelButton'], true);
    }
    function enableConfirmButton() {
        warnAboutDepreation('Swal.enableConfirmButton()', "Swal.getConfirmButton().removeAttribute('disabled')");
        setButtonsDisabled(this, ['confirmButton'], false);
    }
    function disableConfirmButton() {
        warnAboutDepreation('Swal.disableConfirmButton()', "Swal.getConfirmButton().setAttribute('disabled', '')");
        setButtonsDisabled(this, ['confirmButton'], true);
    }
    function enableInput() {
        return setInputDisabled(this.getInput(), false);
    }
    function disableInput() {
        return setInputDisabled(this.getInput(), true);
    }
    function showValidationMessage(error) {
        var domCache = privateProps.domCache.get(this);
        domCache.validationMessage.innerHTML = error;
        var popupComputedStyle = window.getComputedStyle(domCache.popup);
        domCache.validationMessage.style.marginLeft = "-".concat(popupComputedStyle.getPropertyValue('padding-left'));
        domCache.validationMessage.style.marginRight = "-".concat(popupComputedStyle.getPropertyValue('padding-right'));
        show(domCache.validationMessage);
        var input = this.getInput();
        if (input) {
            input.setAttribute('aria-invalid', true);
            input.setAttribute('aria-describedBy', swalClasses['validation-message']);
            focusInput(input);
            addClass(input, swalClasses.inputerror);
        }
    }
    function resetValidationMessage$1() {
        var domCache = privateProps.domCache.get(this);
        if (domCache.validationMessage) {
            hide(domCache.validationMessage);
        }
        var input = this.getInput();
        if (input) {
            input.removeAttribute('aria-invalid');
            input.removeAttribute('aria-describedBy');
            removeClass(input, swalClasses.inputerror);
        }
    }
    function getProgressSteps$1() {
        warnAboutDepreation('Swal.getProgressSteps()', "const swalInstance = Swal.fire({progressSteps: ['1', '2', '3']}); const progressSteps = swalInstance.params.progressSteps");
        var innerParams = privateProps.innerParams.get(this);
        return innerParams.progressSteps;
    }
    function setProgressSteps(progressSteps) {
        warnAboutDepreation('Swal.setProgressSteps()', 'Swal.update()');
        var innerParams = privateProps.innerParams.get(this);
        var updatedParams = _extends({}, innerParams, {
            progressSteps: progressSteps
        });
        renderProgressSteps(this, updatedParams);
        privateProps.innerParams.set(this, updatedParams);
    }
    function showProgressSteps() {
        var domCache = privateProps.domCache.get(this);
        show(domCache.progressSteps);
    }
    function hideProgressSteps() {
        var domCache = privateProps.domCache.get(this);
        hide(domCache.progressSteps);
    }
    var Timer = function () {
        function Timer(callback, delay) {
            _classCallCheck(this, Timer);
            this.callback = callback;
            this.remaining = delay;
            this.running = false;
            this.start();
        }
        _createClass(Timer, [{
                key: "start",
                value: function start() {
                    if (!this.running) {
                        this.running = true;
                        this.started = new Date();
                        this.id = setTimeout(this.callback, this.remaining);
                    }
                    return this.remaining;
                }
            }, {
                key: "stop",
                value: function stop() {
                    if (this.running) {
                        this.running = false;
                        clearTimeout(this.id);
                        this.remaining -= new Date() - this.started;
                    }
                    return this.remaining;
                }
            }, {
                key: "increase",
                value: function increase(n) {
                    var running = this.running;
                    if (running) {
                        this.stop();
                    }
                    this.remaining += n;
                    if (running) {
                        this.start();
                    }
                    return this.remaining;
                }
            }, {
                key: "getTimerLeft",
                value: function getTimerLeft() {
                    if (this.running) {
                        this.stop();
                        this.start();
                    }
                    return this.remaining;
                }
            }, {
                key: "isRunning",
                value: function isRunning() {
                    return this.running;
                }
            }]);
        return Timer;
    }();
    var defaultInputValidators = {
        email: function email(string, validationMessage) {
            return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || 'Invalid email address');
        },
        url: function url(string, validationMessage) {
            return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || 'Invalid URL');
        }
    };
    function setDefaultInputValidators(params) {
        if (!params.inputValidator) {
            Object.keys(defaultInputValidators).forEach(function (key) {
                if (params.input === key) {
                    params.inputValidator = defaultInputValidators[key];
                }
            });
        }
    }
    function validateCustomTargetElement(params) {
        if (!params.target || typeof params.target === 'string' && !document.querySelector(params.target) || typeof params.target !== 'string' && !params.target.appendChild) {
            warn('Target parameter is not valid, defaulting to "body"');
            params.target = 'body';
        }
    }
    function setParameters(params) {
        setDefaultInputValidators(params);
        if (params.showLoaderOnConfirm && !params.preConfirm) {
            warn('showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' + 'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' + 'https://sweetalert2.github.io/#ajax-request');
        }
        params.animation = callIfFunction(params.animation);
        validateCustomTargetElement(params);
        if (typeof params.title === 'string') {
            params.title = params.title.split('\n').join('<br />');
        }
        init(params);
    }
    function swalOpenAnimationFinished(popup, container) {
        popup.removeEventListener(animationEndEvent, swalOpenAnimationFinished);
        container.style.overflowY = 'auto';
    }
    var openPopup = function openPopup(params) {
        var container = getContainer();
        var popup = getPopup();
        if (typeof params.onBeforeOpen === 'function') {
            params.onBeforeOpen(popup);
        }
        addClasses(container, popup, params);
        setScrollingVisibility(container, popup);
        if (isModal()) {
            fixScrollContainer(container, params.scrollbarPadding);
        }
        if (!isToast() && !globalState.previousActiveElement) {
            globalState.previousActiveElement = document.activeElement;
        }
        if (typeof params.onOpen === 'function') {
            setTimeout(function () {
                return params.onOpen(popup);
            });
        }
    };
    var setScrollingVisibility = function setScrollingVisibility(container, popup) {
        if (animationEndEvent && hasCssAnimation(popup)) {
            container.style.overflowY = 'hidden';
            popup.addEventListener(animationEndEvent, swalOpenAnimationFinished.bind(null, popup, container));
        }
        else {
            container.style.overflowY = 'auto';
        }
    };
    var fixScrollContainer = function fixScrollContainer(container, scrollbarPadding) {
        iOSfix();
        IEfix();
        setAriaHidden();
        if (scrollbarPadding) {
            fixScrollbar();
        }
        setTimeout(function () {
            container.scrollTop = 0;
        });
    };
    var addClasses = function addClasses(container, popup, params) {
        if (params.animation) {
            addClass(popup, swalClasses.show);
            addClass(container, swalClasses.fade);
        }
        show(popup);
        addClass([document.documentElement, document.body, container], swalClasses.shown);
        if (params.heightAuto && params.backdrop && !params.toast) {
            addClass([document.documentElement, document.body], swalClasses['height-auto']);
        }
    };
    var handleInputOptionsAndValue = function handleInputOptionsAndValue(instance, params) {
        if (params.input === 'select' || params.input === 'radio') {
            handleInputOptions(instance, params);
        }
        else if (['text', 'email', 'number', 'tel', 'textarea'].indexOf(params.input) !== -1 && isPromise(params.inputValue)) {
            handleInputValue(instance, params);
        }
    };
    var getInputValue = function getInputValue(instance, innerParams) {
        var input = instance.getInput();
        if (!input) {
            return null;
        }
        switch (innerParams.input) {
            case 'checkbox':
                return getCheckboxValue(input);
            case 'radio':
                return getRadioValue(input);
            case 'file':
                return getFileValue(input);
            default:
                return innerParams.inputAutoTrim ? input.value.trim() : input.value;
        }
    };
    var getCheckboxValue = function getCheckboxValue(input) {
        return input.checked ? 1 : 0;
    };
    var getRadioValue = function getRadioValue(input) {
        return input.checked ? input.value : null;
    };
    var getFileValue = function getFileValue(input) {
        return input.files.length ? input.getAttribute('multiple') !== null ? input.files : input.files[0] : null;
    };
    var handleInputOptions = function handleInputOptions(instance, params) {
        var content = getContent();
        var processInputOptions = function processInputOptions(inputOptions) {
            return populateInputOptions[params.input](content, formatInputOptions(inputOptions), params);
        };
        if (isPromise(params.inputOptions)) {
            showLoading();
            params.inputOptions.then(function (inputOptions) {
                instance.hideLoading();
                processInputOptions(inputOptions);
            });
        }
        else if (_typeof(params.inputOptions) === 'object') {
            processInputOptions(params.inputOptions);
        }
        else {
            error("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(_typeof(params.inputOptions)));
        }
    };
    var handleInputValue = function handleInputValue(instance, params) {
        var input = instance.getInput();
        hide(input);
        params.inputValue.then(function (inputValue) {
            input.value = params.input === 'number' ? parseFloat(inputValue) || 0 : inputValue + '';
            show(input);
            input.focus();
            instance.hideLoading();
        })["catch"](function (err) {
            error('Error in inputValue promise: ' + err);
            input.value = '';
            show(input);
            input.focus();
            instance.hideLoading();
        });
    };
    var populateInputOptions = {
        select: function select(content, inputOptions, params) {
            var select = getChildByClass(content, swalClasses.select);
            inputOptions.forEach(function (inputOption) {
                var optionValue = inputOption[0];
                var optionLabel = inputOption[1];
                var option = document.createElement('option');
                option.value = optionValue;
                option.innerHTML = optionLabel;
                if (params.inputValue.toString() === optionValue.toString()) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
            select.focus();
        },
        radio: function radio(content, inputOptions, params) {
            var radio = getChildByClass(content, swalClasses.radio);
            inputOptions.forEach(function (inputOption) {
                var radioValue = inputOption[0];
                var radioLabel = inputOption[1];
                var radioInput = document.createElement('input');
                var radioLabelElement = document.createElement('label');
                radioInput.type = 'radio';
                radioInput.name = swalClasses.radio;
                radioInput.value = radioValue;
                if (params.inputValue.toString() === radioValue.toString()) {
                    radioInput.checked = true;
                }
                var label = document.createElement('span');
                label.innerHTML = radioLabel;
                label.className = swalClasses.label;
                radioLabelElement.appendChild(radioInput);
                radioLabelElement.appendChild(label);
                radio.appendChild(radioLabelElement);
            });
            var radios = radio.querySelectorAll('input');
            if (radios.length) {
                radios[0].focus();
            }
        }
    };
    var formatInputOptions = function formatInputOptions(inputOptions) {
        var result = [];
        if (typeof Map !== 'undefined' && inputOptions instanceof Map) {
            inputOptions.forEach(function (value, key) {
                result.push([key, value]);
            });
        }
        else {
            Object.keys(inputOptions).forEach(function (key) {
                result.push([key, inputOptions[key]]);
            });
        }
        return result;
    };
    var handleConfirmButtonClick = function handleConfirmButtonClick(instance, innerParams) {
        instance.disableButtons();
        if (innerParams.input) {
            handleConfirmWithInput(instance, innerParams);
        }
        else {
            confirm(instance, innerParams, true);
        }
    };
    var handleCancelButtonClick = function handleCancelButtonClick(instance, dismissWith) {
        instance.disableButtons();
        dismissWith(DismissReason.cancel);
    };
    var handleConfirmWithInput = function handleConfirmWithInput(instance, innerParams) {
        var inputValue = getInputValue(instance, innerParams);
        if (innerParams.inputValidator) {
            instance.disableInput();
            var validationPromise = Promise.resolve().then(function () {
                return innerParams.inputValidator(inputValue, innerParams.validationMessage);
            });
            validationPromise.then(function (validationMessage) {
                instance.enableButtons();
                instance.enableInput();
                if (validationMessage) {
                    instance.showValidationMessage(validationMessage);
                }
                else {
                    confirm(instance, innerParams, inputValue);
                }
            });
        }
        else if (!instance.getInput().checkValidity()) {
            instance.enableButtons();
            instance.showValidationMessage(innerParams.validationMessage);
        }
        else {
            confirm(instance, innerParams, inputValue);
        }
    };
    var succeedWith = function succeedWith(instance, value) {
        instance.closePopup({
            value: value
        });
    };
    var confirm = function confirm(instance, innerParams, value) {
        if (innerParams.showLoaderOnConfirm) {
            showLoading();
        }
        if (innerParams.preConfirm) {
            instance.resetValidationMessage();
            var preConfirmPromise = Promise.resolve().then(function () {
                return innerParams.preConfirm(value, innerParams.validationMessage);
            });
            preConfirmPromise.then(function (preConfirmValue) {
                if (isVisible(getValidationMessage()) || preConfirmValue === false) {
                    instance.hideLoading();
                }
                else {
                    succeedWith(instance, typeof preConfirmValue === 'undefined' ? value : preConfirmValue);
                }
            });
        }
        else {
            succeedWith(instance, value);
        }
    };
    var addKeydownHandler = function addKeydownHandler(instance, globalState, innerParams, dismissWith) {
        if (globalState.keydownTarget && globalState.keydownHandlerAdded) {
            globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, {
                capture: globalState.keydownListenerCapture
            });
            globalState.keydownHandlerAdded = false;
        }
        if (!innerParams.toast) {
            globalState.keydownHandler = function (e) {
                return keydownHandler(instance, e, innerParams, dismissWith);
            };
            globalState.keydownTarget = innerParams.keydownListenerCapture ? window : getPopup();
            globalState.keydownListenerCapture = innerParams.keydownListenerCapture;
            globalState.keydownTarget.addEventListener('keydown', globalState.keydownHandler, {
                capture: globalState.keydownListenerCapture
            });
            globalState.keydownHandlerAdded = true;
        }
    };
    var setFocus = function setFocus(innerParams, index, increment) {
        var focusableElements = getFocusableElements();
        for (var i = 0; i < focusableElements.length; i++) {
            index = index + increment;
            if (index === focusableElements.length) {
                index = 0;
            }
            else if (index === -1) {
                index = focusableElements.length - 1;
            }
            return focusableElements[index].focus();
        }
        getPopup().focus();
    };
    var arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Left', 'Right', 'Up', 'Down'
    ];
    var escKeys = ['Escape', 'Esc'
    ];
    var keydownHandler = function keydownHandler(instance, e, innerParams, dismissWith) {
        if (innerParams.stopKeydownPropagation) {
            e.stopPropagation();
        }
        if (e.key === 'Enter') {
            handleEnter(instance, e, innerParams);
        }
        else if (e.key === 'Tab') {
            handleTab(e, innerParams);
        }
        else if (arrowKeys.indexOf(e.key) !== -1) {
            handleArrows();
        }
        else if (escKeys.indexOf(e.key) !== -1) {
            handleEsc(e, innerParams, dismissWith);
        }
    };
    var handleEnter = function handleEnter(instance, e, innerParams) {
        if (e.isComposing) {
            return;
        }
        if (e.target && instance.getInput() && e.target.outerHTML === instance.getInput().outerHTML) {
            if (['textarea', 'file'].indexOf(innerParams.input) !== -1) {
                return;
            }
            clickConfirm();
            e.preventDefault();
        }
    };
    var handleTab = function handleTab(e, innerParams) {
        var targetElement = e.target;
        var focusableElements = getFocusableElements();
        var btnIndex = -1;
        for (var i = 0; i < focusableElements.length; i++) {
            if (targetElement === focusableElements[i]) {
                btnIndex = i;
                break;
            }
        }
        if (!e.shiftKey) {
            setFocus(innerParams, btnIndex, 1);
        }
        else {
            setFocus(innerParams, btnIndex, -1);
        }
        e.stopPropagation();
        e.preventDefault();
    };
    var handleArrows = function handleArrows() {
        var confirmButton = getConfirmButton();
        var cancelButton = getCancelButton();
        if (document.activeElement === confirmButton && isVisible(cancelButton)) {
            cancelButton.focus();
        }
        else if (document.activeElement === cancelButton && isVisible(confirmButton)) {
            confirmButton.focus();
        }
    };
    var handleEsc = function handleEsc(e, innerParams, dismissWith) {
        if (callIfFunction(innerParams.allowEscapeKey)) {
            e.preventDefault();
            dismissWith(DismissReason.esc);
        }
    };
    var handlePopupClick = function handlePopupClick(domCache, innerParams, dismissWith) {
        if (innerParams.toast) {
            handleToastClick(domCache, innerParams, dismissWith);
        }
        else {
            handleModalMousedown(domCache);
            handleContainerMousedown(domCache);
            handleModalClick(domCache, innerParams, dismissWith);
        }
    };
    var handleToastClick = function handleToastClick(domCache, innerParams, dismissWith) {
        domCache.popup.onclick = function () {
            if (innerParams.showConfirmButton || innerParams.showCancelButton || innerParams.showCloseButton || innerParams.input) {
                return;
            }
            dismissWith(DismissReason.close);
        };
    };
    var ignoreOutsideClick = false;
    var handleModalMousedown = function handleModalMousedown(domCache) {
        domCache.popup.onmousedown = function () {
            domCache.container.onmouseup = function (e) {
                domCache.container.onmouseup = undefined;
                if (e.target === domCache.container) {
                    ignoreOutsideClick = true;
                }
            };
        };
    };
    var handleContainerMousedown = function handleContainerMousedown(domCache) {
        domCache.container.onmousedown = function () {
            domCache.popup.onmouseup = function (e) {
                domCache.popup.onmouseup = undefined;
                if (e.target === domCache.popup || domCache.popup.contains(e.target)) {
                    ignoreOutsideClick = true;
                }
            };
        };
    };
    var handleModalClick = function handleModalClick(domCache, innerParams, dismissWith) {
        domCache.container.onclick = function (e) {
            if (ignoreOutsideClick) {
                ignoreOutsideClick = false;
                return;
            }
            if (e.target === domCache.container && callIfFunction(innerParams.allowOutsideClick)) {
                dismissWith(DismissReason.backdrop);
            }
        };
    };
    function _main(userParams) {
        showWarningsForParams(userParams);
        if (getPopup() && globalState.swalCloseEventFinishedCallback) {
            globalState.swalCloseEventFinishedCallback();
            delete globalState.swalCloseEventFinishedCallback;
        }
        if (globalState.deferDisposalTimer) {
            clearTimeout(globalState.deferDisposalTimer);
            delete globalState.deferDisposalTimer;
        }
        var innerParams = _extends({}, defaultParams, userParams);
        setParameters(innerParams);
        Object.freeze(innerParams);
        if (globalState.timeout) {
            globalState.timeout.stop();
            delete globalState.timeout;
        }
        clearTimeout(globalState.restoreFocusTimeout);
        var domCache = populateDomCache(this);
        render(this, innerParams);
        privateProps.innerParams.set(this, innerParams);
        return swalPromise(this, domCache, innerParams);
    }
    var swalPromise = function swalPromise(instance, domCache, innerParams) {
        return new Promise(function (resolve) {
            var dismissWith = function dismissWith(dismiss) {
                instance.closePopup({
                    dismiss: dismiss
                });
            };
            privateMethods.swalPromiseResolve.set(instance, resolve);
            setupTimer(globalState, innerParams, dismissWith);
            domCache.confirmButton.onclick = function () {
                return handleConfirmButtonClick(instance, innerParams);
            };
            domCache.cancelButton.onclick = function () {
                return handleCancelButtonClick(instance, dismissWith);
            };
            domCache.closeButton.onclick = function () {
                return dismissWith(DismissReason.close);
            };
            handlePopupClick(domCache, innerParams, dismissWith);
            addKeydownHandler(instance, globalState, innerParams, dismissWith);
            if (innerParams.toast && (innerParams.input || innerParams.footer || innerParams.showCloseButton)) {
                addClass(document.body, swalClasses['toast-column']);
            }
            else {
                removeClass(document.body, swalClasses['toast-column']);
            }
            handleInputOptionsAndValue(instance, innerParams);
            openPopup(innerParams);
            initFocus(domCache, innerParams);
            domCache.container.scrollTop = 0;
        });
    };
    var populateDomCache = function populateDomCache(instance) {
        var domCache = {
            popup: getPopup(),
            container: getContainer(),
            content: getContent(),
            actions: getActions(),
            confirmButton: getConfirmButton(),
            cancelButton: getCancelButton(),
            closeButton: getCloseButton(),
            validationMessage: getValidationMessage(),
            progressSteps: getProgressSteps()
        };
        privateProps.domCache.set(instance, domCache);
        return domCache;
    };
    var setupTimer = function setupTimer(globalState$$1, innerParams, dismissWith) {
        if (innerParams.timer) {
            globalState$$1.timeout = new Timer(function () {
                dismissWith('timer');
                delete globalState$$1.timeout;
            }, innerParams.timer);
        }
    };
    var initFocus = function initFocus(domCache, innerParams) {
        if (innerParams.toast) {
            return;
        }
        if (!callIfFunction(innerParams.allowEnterKey)) {
            return blurActiveElement();
        }
        if (innerParams.focusCancel && isVisible(domCache.cancelButton)) {
            return domCache.cancelButton.focus();
        }
        if (innerParams.focusConfirm && isVisible(domCache.confirmButton)) {
            return domCache.confirmButton.focus();
        }
        setFocus(innerParams, -1, 1);
    };
    var blurActiveElement = function blurActiveElement() {
        if (document.activeElement && typeof document.activeElement.blur === 'function') {
            document.activeElement.blur();
        }
    };
    function update(params) {
        var popup = getPopup();
        if (!popup || hasClass(popup, swalClasses.hide)) {
            return warn("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");
        }
        var validUpdatableParams = {};
        Object.keys(params).forEach(function (param) {
            if (Swal.isUpdatableParameter(param)) {
                validUpdatableParams[param] = params[param];
            }
            else {
                warn("Invalid parameter to update: \"".concat(param, "\". Updatable params are listed here: https://github.com/sweetalert2/sweetalert2/blob/master/src/utils/params.js"));
            }
        });
        var innerParams = privateProps.innerParams.get(this);
        var updatedParams = _extends({}, innerParams, validUpdatableParams);
        render(this, updatedParams);
        privateProps.innerParams.set(this, updatedParams);
        Object.defineProperties(this, {
            params: {
                value: _extends({}, this.params, params),
                writable: false,
                enumerable: true
            }
        });
    }
    var instanceMethods = Object.freeze({
        hideLoading: hideLoading,
        disableLoading: hideLoading,
        getInput: getInput$1,
        close: close,
        closePopup: close,
        closeModal: close,
        closeToast: close,
        enableButtons: enableButtons,
        disableButtons: disableButtons,
        enableConfirmButton: enableConfirmButton,
        disableConfirmButton: disableConfirmButton,
        enableInput: enableInput,
        disableInput: disableInput,
        showValidationMessage: showValidationMessage,
        resetValidationMessage: resetValidationMessage$1,
        getProgressSteps: getProgressSteps$1,
        setProgressSteps: setProgressSteps,
        showProgressSteps: showProgressSteps,
        hideProgressSteps: hideProgressSteps,
        _main: _main,
        update: update
    });
    var currentInstance;
    function SweetAlert() {
        if (typeof window === 'undefined') {
            return;
        }
        if (typeof Promise === 'undefined') {
            error('This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)');
        }
        currentInstance = this;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        var outerParams = Object.freeze(this.constructor.argsToParams(args));
        Object.defineProperties(this, {
            params: {
                value: outerParams,
                writable: false,
                enumerable: true,
                configurable: true
            }
        });
        var promise = this._main(this.params);
        privateProps.promise.set(this, promise);
    }
    SweetAlert.prototype.then = function (onFulfilled) {
        var promise = privateProps.promise.get(this);
        return promise.then(onFulfilled);
    };
    SweetAlert.prototype["finally"] = function (onFinally) {
        var promise = privateProps.promise.get(this);
        return promise["finally"](onFinally);
    };
    _extends(SweetAlert.prototype, instanceMethods);
    _extends(SweetAlert, staticMethods);
    Object.keys(instanceMethods).forEach(function (key) {
        SweetAlert[key] = function () {
            if (currentInstance) {
                var _currentInstance;
                return (_currentInstance = currentInstance)[key].apply(_currentInstance, arguments);
            }
        };
    });
    SweetAlert.DismissReason = DismissReason;
    SweetAlert.version = '8.18.5';
    var Swal = SweetAlert;
    Swal["default"] = Swal;
    return Swal;
})));
if (typeof this !== 'undefined' && this.Sweetalert2) {
    this.swal = this.sweetAlert = this.Swal = this.SweetAlert = this.Sweetalert2;
}
"undefined" != typeof document && function (e, t) { var n = e.createElement("style"); if (e.getElementsByTagName("head")[0].appendChild(n), n.styleSheet)
    n.styleSheet.disabled || (n.styleSheet.cssText = t);
else
    try {
        n.innerHTML = t;
    }
    catch (e) {
        n.innerText = t;
    } }(document, "@charset \"UTF-8\";.swal2-popup.swal2-toast{flex-direction:row;align-items:center;width:auto;padding:.625em;overflow-y:hidden;box-shadow:0 0 .625em #d9d9d9}.swal2-popup.swal2-toast .swal2-header{flex-direction:row}.swal2-popup.swal2-toast .swal2-title{flex-grow:1;justify-content:flex-start;margin:0 .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{position:static;width:.8em;height:.8em;line-height:.8}.swal2-popup.swal2-toast .swal2-content{justify-content:flex-start;font-size:1em}.swal2-popup.swal2-toast .swal2-icon{width:2em;min-width:2em;height:2em;margin:0}.swal2-popup.swal2-toast .swal2-icon::before{display:flex;align-items:center;font-size:2em;font-weight:700}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-popup.swal2-toast .swal2-icon::before{font-size:.25em}}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{flex-basis:auto!important;width:auto;height:auto;margin:0 .3125em}.swal2-popup.swal2-toast .swal2-styled{margin:0 .3125em;padding:.3125em .625em;font-size:1em}.swal2-popup.swal2-toast .swal2-styled:focus{box-shadow:0 0 0 .0625em #fff,0 0 0 .125em rgba(50,100,150,.4)}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.8em;left:-.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:swal2-toast-show .5s;animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:swal2-toast-hide .1s forwards;animation:swal2-toast-hide .1s forwards}.swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-tip{-webkit-animation:swal2-toast-animate-success-line-tip .75s;animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-long{-webkit-animation:swal2-toast-animate-success-line-long .75s;animation:swal2-toast-animate-success-line-long .75s}.swal2-container{display:flex;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;flex-direction:row;align-items:center;justify-content:center;padding:.625em;overflow-x:hidden;background-color:transparent;-webkit-overflow-scrolling:touch}.swal2-container.swal2-top{align-items:flex-start}.swal2-container.swal2-top-left,.swal2-container.swal2-top-start{align-items:flex-start;justify-content:flex-start}.swal2-container.swal2-top-end,.swal2-container.swal2-top-right{align-items:flex-start;justify-content:flex-end}.swal2-container.swal2-center{align-items:center}.swal2-container.swal2-center-left,.swal2-container.swal2-center-start{align-items:center;justify-content:flex-start}.swal2-container.swal2-center-end,.swal2-container.swal2-center-right{align-items:center;justify-content:flex-end}.swal2-container.swal2-bottom{align-items:flex-end}.swal2-container.swal2-bottom-left,.swal2-container.swal2-bottom-start{align-items:flex-end;justify-content:flex-start}.swal2-container.swal2-bottom-end,.swal2-container.swal2-bottom-right{align-items:flex-end;justify-content:flex-end}.swal2-container.swal2-bottom-end>:first-child,.swal2-container.swal2-bottom-left>:first-child,.swal2-container.swal2-bottom-right>:first-child,.swal2-container.swal2-bottom-start>:first-child,.swal2-container.swal2-bottom>:first-child{margin-top:auto}.swal2-container.swal2-grow-fullscreen>.swal2-modal{display:flex!important;flex:1;align-self:stretch;justify-content:center}.swal2-container.swal2-grow-row>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container.swal2-grow-column{flex:1;flex-direction:column}.swal2-container.swal2-grow-column.swal2-bottom,.swal2-container.swal2-grow-column.swal2-center,.swal2-container.swal2-grow-column.swal2-top{align-items:center}.swal2-container.swal2-grow-column.swal2-bottom-left,.swal2-container.swal2-grow-column.swal2-bottom-start,.swal2-container.swal2-grow-column.swal2-center-left,.swal2-container.swal2-grow-column.swal2-center-start,.swal2-container.swal2-grow-column.swal2-top-left,.swal2-container.swal2-grow-column.swal2-top-start{align-items:flex-start}.swal2-container.swal2-grow-column.swal2-bottom-end,.swal2-container.swal2-grow-column.swal2-bottom-right,.swal2-container.swal2-grow-column.swal2-center-end,.swal2-container.swal2-grow-column.swal2-center-right,.swal2-container.swal2-grow-column.swal2-top-end,.swal2-container.swal2-grow-column.swal2-top-right{align-items:flex-end}.swal2-container.swal2-grow-column>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right):not(.swal2-grow-fullscreen)>.swal2-modal{margin:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-container .swal2-modal{margin:0!important}}.swal2-container.swal2-fade{transition:background-color .1s}.swal2-container.swal2-shown{background-color:rgba(0,0,0,.4)}.swal2-popup{display:none;position:relative;box-sizing:border-box;flex-direction:column;justify-content:center;width:32em;max-width:100%;padding:1.25em;border:none;border-radius:.3125em;background:#fff;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-header{display:flex;flex-direction:column;align-items:center}.swal2-title{position:relative;max-width:100%;margin:0 0 .4em;padding:0;color:#595959;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{display:flex;z-index:1;flex-wrap:wrap;align-items:center;justify-content:center;width:100%;margin:1.25em auto 0}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-actions.swal2-loading .swal2-styled.swal2-confirm{box-sizing:border-box;width:2.5em;height:2.5em;margin:.46875em;padding:0;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border:.25em solid transparent;border-radius:100%;border-color:transparent;background-color:transparent!important;color:transparent;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-actions.swal2-loading .swal2-styled.swal2-cancel{margin-right:30px;margin-left:30px}.swal2-actions.swal2-loading :not(.swal2-styled).swal2-confirm::after{content:\"\";display:inline-block;width:15px;height:15px;margin-left:5px;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border:3px solid #999;border-radius:50%;border-right-color:transparent;box-shadow:1px 1px 1px #fff}.swal2-styled{margin:.3125em;padding:.625em 2em;box-shadow:none;font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#3085d6;color:#fff;font-size:1.0625em}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#aaa;color:#fff;font-size:1.0625em}.swal2-styled:focus{outline:0;box-shadow:0 0 0 2px #fff,0 0 0 4px rgba(50,100,150,.4)}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1.25em 0 0;padding:1em 0 0;border-top:1px solid #eee;color:#545454;font-size:1em}.swal2-image{max-width:100%;margin:1.25em auto}.swal2-close{position:absolute;z-index:2;top:0;right:0;justify-content:center;width:1.2em;height:1.2em;padding:0;overflow:hidden;transition:color .1s ease-out;border:none;border-radius:0;outline:initial;background:0 0;color:#ccc;font-family:serif;font-size:2.5em;line-height:1.2;cursor:pointer}.swal2-close:hover{transform:none;background:0 0;color:#f27474}.swal2-content{z-index:1;justify-content:center;margin:0;padding:0;color:#545454;font-size:1.125em;font-weight:400;line-height:normal;text-align:center;word-wrap:break-word}.swal2-checkbox,.swal2-file,.swal2-input,.swal2-radio,.swal2-select,.swal2-textarea{margin:1em auto}.swal2-file,.swal2-input,.swal2-textarea{box-sizing:border-box;width:100%;transition:border-color .3s,box-shadow .3s;border:1px solid #d9d9d9;border-radius:.1875em;background:inherit;box-shadow:inset 0 1px 1px rgba(0,0,0,.06);color:inherit;font-size:1.125em}.swal2-file.swal2-inputerror,.swal2-input.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:0 0 3px #c4e6f5}.swal2-file::-webkit-input-placeholder,.swal2-input::-webkit-input-placeholder,.swal2-textarea::-webkit-input-placeholder{color:#ccc}.swal2-file::-moz-placeholder,.swal2-input::-moz-placeholder,.swal2-textarea::-moz-placeholder{color:#ccc}.swal2-file:-ms-input-placeholder,.swal2-input:-ms-input-placeholder,.swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-file::-ms-input-placeholder,.swal2-input::-ms-input-placeholder,.swal2-textarea::-ms-input-placeholder{color:#ccc}.swal2-file::placeholder,.swal2-input::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em auto;background:inherit}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-input[type=number]{max-width:10em}.swal2-file{background:inherit;font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:inherit;color:inherit;font-size:1.125em}.swal2-checkbox,.swal2-radio{align-items:center;justify-content:center;background:inherit;color:inherit}.swal2-checkbox label,.swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-checkbox input,.swal2-radio input{margin:0 .4em}.swal2-validation-message{display:none;align-items:center;justify-content:center;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:\"!\";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;zoom:normal;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:1.25em auto 1.875em;zoom:normal;border:.25em solid transparent;border-radius:50%;font-family:inherit;line-height:5em;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-icon::before{display:flex;align-items:center;height:92%;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-warning::before{content:\"!\"}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-info::before{content:\"i\"}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-question::before{content:\"?\"}.swal2-icon.swal2-question.swal2-arabic-question-mark::before{content:\"؟\"}.swal2-icon.swal2-success{border-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-.25em;left:-.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.875em;width:1.5625em;transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}.swal2-progress-steps{align-items:center;margin:0 0 1.25em;padding:0;background:inherit;font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;width:2em;height:2em;border-radius:2em;background:#3085d6;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#3085d6}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;width:2.5em;height:.4em;margin:0 -1px;background:#3085d6}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-show.swal2-noanimation{-webkit-animation:none;animation:none}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-hide.swal2-noanimation{-webkit-animation:none;animation:none}.swal2-rtl .swal2-close{right:auto;left:0}.swal2-animate-success-icon .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-animate-success-icon .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-animate-success-icon .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-animate-error-icon{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-animate-error-icon .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}@supports (-ms-accelerator:true){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@-moz-document url-prefix(){.swal2-close:focus{outline:2px solid rgba(50,100,150,.4)}}@-webkit-keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@-webkit-keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@-webkit-keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.875em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.875em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@-webkit-keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-shown{top:auto;right:auto;bottom:auto;left:auto;max-width:calc(100% - .625em * 2);background-color:transparent}body.swal2-no-backdrop .swal2-shown>.swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}body.swal2-no-backdrop .swal2-shown.swal2-top{top:0;left:50%;transform:translateX(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-top-left,body.swal2-no-backdrop .swal2-shown.swal2-top-start{top:0;left:0}body.swal2-no-backdrop .swal2-shown.swal2-top-end,body.swal2-no-backdrop .swal2-shown.swal2-top-right{top:0;right:0}body.swal2-no-backdrop .swal2-shown.swal2-center{top:50%;left:50%;transform:translate(-50%,-50%)}body.swal2-no-backdrop .swal2-shown.swal2-center-left,body.swal2-no-backdrop .swal2-shown.swal2-center-start{top:50%;left:0;transform:translateY(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-center-end,body.swal2-no-backdrop .swal2-shown.swal2-center-right{top:50%;right:0;transform:translateY(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-bottom{bottom:0;left:50%;transform:translateX(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-bottom-left,body.swal2-no-backdrop .swal2-shown.swal2-bottom-start{bottom:0;left:0}body.swal2-no-backdrop .swal2-shown.swal2-bottom-end,body.swal2-no-backdrop .swal2-shown.swal2-bottom-right{right:0;bottom:0}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static!important}}body.swal2-toast-shown .swal2-container{background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-shown{background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}body.swal2-toast-column .swal2-toast{flex-direction:column;align-items:stretch}body.swal2-toast-column .swal2-toast .swal2-actions{flex:1;align-self:stretch;height:2.2em;margin-top:.3125em}body.swal2-toast-column .swal2-toast .swal2-loading{justify-content:center}body.swal2-toast-column .swal2-toast .swal2-input{height:2em;margin:.3125em auto;font-size:1em}body.swal2-toast-column .swal2-toast .swal2-validation-message{font-size:1em}");
//# sourceMappingURL=index.js.map