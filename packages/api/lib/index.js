!(function(e) {
  var t = {};
  function r(n) {
    if (t[n]) return t[n].exports;
    var o = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
  }
  (r.m = e),
    (r.c = t),
    (r.d = function(e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (r.r = function(e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (r.t = function(e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (r.r(n),
        Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var o in e)
          r.d(
            n,
            o,
            function(t) {
              return e[t];
            }.bind(null, o)
          );
      return n;
    }),
    (r.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return r.d(t, 'a', t), t;
    }),
    (r.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = ''),
    r((r.s = 4));
})([
  function(e, t, r) {
    'use strict';
    (function(e) {
      r.d(t, 'a', function() {
        return o;
      });
      var n = {
          development: { API_URL: e.env.API_URL || 'localhost' },
          production: { API_URL: e.env.API_URL || 'ordered.online' },
        },
        o = function() {
          return n.production;
        };
    }.call(this, r(5)));
  },
  function(e, t, r) {
    'use strict';
    var n = r(6),
      o = r(7),
      i = r(3);
    e.exports = { formats: i, parse: o, stringify: n };
  },
  function(e, t, r) {
    'use strict';
    var n = Object.prototype.hasOwnProperty,
      o = Array.isArray,
      i = (function() {
        for (var e = [], t = 0; t < 256; ++t)
          e.push('%' + ((t < 16 ? '0' : '') + t.toString(16)).toUpperCase());
        return e;
      })(),
      c = function(e, t) {
        for (
          var r = t && t.plainObjects ? Object.create(null) : {}, n = 0;
          n < e.length;
          ++n
        )
          void 0 !== e[n] && (r[n] = e[n]);
        return r;
      };
    e.exports = {
      arrayToObject: c,
      assign: function(e, t) {
        return Object.keys(t).reduce(function(e, r) {
          return (e[r] = t[r]), e;
        }, e);
      },
      combine: function(e, t) {
        return [].concat(e, t);
      },
      compact: function(e) {
        for (
          var t = [{ obj: { o: e }, prop: 'o' }], r = [], n = 0;
          n < t.length;
          ++n
        )
          for (
            var i = t[n], c = i.obj[i.prop], u = Object.keys(c), a = 0;
            a < u.length;
            ++a
          ) {
            var s = u[a],
              f = c[s];
            'object' == typeof f &&
              null !== f &&
              -1 === r.indexOf(f) &&
              (t.push({ obj: c, prop: s }), r.push(f));
          }
        return (
          (function(e) {
            for (; e.length > 1; ) {
              var t = e.pop(),
                r = t.obj[t.prop];
              if (o(r)) {
                for (var n = [], i = 0; i < r.length; ++i)
                  void 0 !== r[i] && n.push(r[i]);
                t.obj[t.prop] = n;
              }
            }
          })(t),
          e
        );
      },
      decode: function(e, t, r) {
        var n = e.replace(/\+/g, ' ');
        if ('iso-8859-1' === r) return n.replace(/%[0-9a-f]{2}/gi, unescape);
        try {
          return decodeURIComponent(n);
        } catch (e) {
          return n;
        }
      },
      encode: function(e, t, r) {
        if (0 === e.length) return e;
        var n = 'string' == typeof e ? e : String(e);
        if ('iso-8859-1' === r)
          return escape(n).replace(/%u[0-9a-f]{4}/gi, function(e) {
            return '%26%23' + parseInt(e.slice(2), 16) + '%3B';
          });
        for (var o = '', c = 0; c < n.length; ++c) {
          var u = n.charCodeAt(c);
          45 === u ||
          46 === u ||
          95 === u ||
          126 === u ||
          (u >= 48 && u <= 57) ||
          (u >= 65 && u <= 90) ||
          (u >= 97 && u <= 122)
            ? (o += n.charAt(c))
            : u < 128
            ? (o += i[u])
            : u < 2048
            ? (o += i[192 | (u >> 6)] + i[128 | (63 & u)])
            : u < 55296 || u >= 57344
            ? (o +=
                i[224 | (u >> 12)] +
                i[128 | ((u >> 6) & 63)] +
                i[128 | (63 & u)])
            : ((c += 1),
              (u = 65536 + (((1023 & u) << 10) | (1023 & n.charCodeAt(c)))),
              (o +=
                i[240 | (u >> 18)] +
                i[128 | ((u >> 12) & 63)] +
                i[128 | ((u >> 6) & 63)] +
                i[128 | (63 & u)]));
        }
        return o;
      },
      isBuffer: function(e) {
        return (
          !(!e || 'object' != typeof e) &&
          !!(
            e.constructor &&
            e.constructor.isBuffer &&
            e.constructor.isBuffer(e)
          )
        );
      },
      isRegExp: function(e) {
        return '[object RegExp]' === Object.prototype.toString.call(e);
      },
      merge: function e(t, r, i) {
        if (!r) return t;
        if ('object' != typeof r) {
          if (o(t)) t.push(r);
          else {
            if (!t || 'object' != typeof t) return [t, r];
            ((i && (i.plainObjects || i.allowPrototypes)) ||
              !n.call(Object.prototype, r)) &&
              (t[r] = !0);
          }
          return t;
        }
        if (!t || 'object' != typeof t) return [t].concat(r);
        var u = t;
        return (
          o(t) && !o(r) && (u = c(t, i)),
          o(t) && o(r)
            ? (r.forEach(function(r, o) {
                if (n.call(t, o)) {
                  var c = t[o];
                  c && 'object' == typeof c && r && 'object' == typeof r
                    ? (t[o] = e(c, r, i))
                    : t.push(r);
                } else t[o] = r;
              }),
              t)
            : Object.keys(r).reduce(function(t, o) {
                var c = r[o];
                return n.call(t, o) ? (t[o] = e(t[o], c, i)) : (t[o] = c), t;
              }, u)
        );
      },
    };
  },
  function(e, t, r) {
    'use strict';
    var n = String.prototype.replace,
      o = /%20/g;
    e.exports = {
      default: 'RFC3986',
      formatters: {
        RFC1738: function(e) {
          return n.call(e, o, '+');
        },
        RFC3986: function(e) {
          return e;
        },
      },
      RFC1738: 'RFC1738',
      RFC3986: 'RFC3986',
    };
  },
  function(e, t, r) {
    e.exports = r(8);
  },
  function(e, t) {
    var r,
      n,
      o = (e.exports = {});
    function i() {
      throw new Error('setTimeout has not been defined');
    }
    function c() {
      throw new Error('clearTimeout has not been defined');
    }
    function u(e) {
      if (r === setTimeout) return setTimeout(e, 0);
      if ((r === i || !r) && setTimeout)
        return (r = setTimeout), setTimeout(e, 0);
      try {
        return r(e, 0);
      } catch (t) {
        try {
          return r.call(null, e, 0);
        } catch (t) {
          return r.call(this, e, 0);
        }
      }
    }
    !(function() {
      try {
        r = 'function' == typeof setTimeout ? setTimeout : i;
      } catch (e) {
        r = i;
      }
      try {
        n = 'function' == typeof clearTimeout ? clearTimeout : c;
      } catch (e) {
        n = c;
      }
    })();
    var a,
      s = [],
      f = !1,
      l = -1;
    function d() {
      f &&
        a &&
        ((f = !1), a.length ? (s = a.concat(s)) : (l = -1), s.length && p());
    }
    function p() {
      if (!f) {
        var e = u(d);
        f = !0;
        for (var t = s.length; t; ) {
          for (a = s, s = []; ++l < t; ) a && a[l].run();
          (l = -1), (t = s.length);
        }
        (a = null),
          (f = !1),
          (function(e) {
            if (n === clearTimeout) return clearTimeout(e);
            if ((n === c || !n) && clearTimeout)
              return (n = clearTimeout), clearTimeout(e);
            try {
              n(e);
            } catch (t) {
              try {
                return n.call(null, e);
              } catch (t) {
                return n.call(this, e);
              }
            }
          })(e);
      }
    }
    function y(e, t) {
      (this.fun = e), (this.array = t);
    }
    function h() {}
    (o.nextTick = function(e) {
      var t = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
      s.push(new y(e, t)), 1 !== s.length || f || u(p);
    }),
      (y.prototype.run = function() {
        this.fun.apply(null, this.array);
      }),
      (o.title = 'browser'),
      (o.browser = !0),
      (o.env = {}),
      (o.argv = []),
      (o.version = ''),
      (o.versions = {}),
      (o.on = h),
      (o.addListener = h),
      (o.once = h),
      (o.off = h),
      (o.removeListener = h),
      (o.removeAllListeners = h),
      (o.emit = h),
      (o.prependListener = h),
      (o.prependOnceListener = h),
      (o.listeners = function(e) {
        return [];
      }),
      (o.binding = function(e) {
        throw new Error('process.binding is not supported');
      }),
      (o.cwd = function() {
        return '/';
      }),
      (o.chdir = function(e) {
        throw new Error('process.chdir is not supported');
      }),
      (o.umask = function() {
        return 0;
      });
  },
  function(e, t, r) {
    'use strict';
    var n = r(2),
      o = r(3),
      i = Object.prototype.hasOwnProperty,
      c = {
        brackets: function(e) {
          return e + '[]';
        },
        comma: 'comma',
        indices: function(e, t) {
          return e + '[' + t + ']';
        },
        repeat: function(e) {
          return e;
        },
      },
      u = Array.isArray,
      a = Array.prototype.push,
      s = function(e, t) {
        a.apply(e, u(t) ? t : [t]);
      },
      f = Date.prototype.toISOString,
      l = {
        addQueryPrefix: !1,
        allowDots: !1,
        charset: 'utf-8',
        charsetSentinel: !1,
        delimiter: '&',
        encode: !0,
        encoder: n.encode,
        encodeValuesOnly: !1,
        formatter: o.formatters[o.default],
        indices: !1,
        serializeDate: function(e) {
          return f.call(e);
        },
        skipNulls: !1,
        strictNullHandling: !1,
      },
      d = function e(t, r, o, i, c, a, f, d, p, y, h, m, b) {
        var g = t;
        if (
          ('function' == typeof f
            ? (g = f(r, g))
            : g instanceof Date
            ? (g = y(g))
            : 'comma' === o && u(g) && (g = g.join(',')),
          null === g)
        ) {
          if (i) return a && !m ? a(r, l.encoder, b) : r;
          g = '';
        }
        if (
          'string' == typeof g ||
          'number' == typeof g ||
          'boolean' == typeof g ||
          n.isBuffer(g)
        )
          return a
            ? [h(m ? r : a(r, l.encoder, b)) + '=' + h(a(g, l.encoder, b))]
            : [h(r) + '=' + h(String(g))];
        var v,
          j = [];
        if (void 0 === g) return j;
        if (u(f)) v = f;
        else {
          var O = Object.keys(g);
          v = d ? O.sort(d) : O;
        }
        for (var w = 0; w < v.length; ++w) {
          var P = v[w];
          (c && null === g[P]) ||
            (u(g)
              ? s(
                  j,
                  e(
                    g[P],
                    'function' == typeof o ? o(r, P) : r,
                    o,
                    i,
                    c,
                    a,
                    f,
                    d,
                    p,
                    y,
                    h,
                    m,
                    b
                  )
                )
              : s(
                  j,
                  e(
                    g[P],
                    r + (p ? '.' + P : '[' + P + ']'),
                    o,
                    i,
                    c,
                    a,
                    f,
                    d,
                    p,
                    y,
                    h,
                    m,
                    b
                  )
                ));
        }
        return j;
      };
    e.exports = function(e, t) {
      var r,
        n = e,
        a = (function(e) {
          if (!e) return l;
          if (
            null !== e.encoder &&
            void 0 !== e.encoder &&
            'function' != typeof e.encoder
          )
            throw new TypeError('Encoder has to be a function.');
          var t = e.charset || l.charset;
          if (
            void 0 !== e.charset &&
            'utf-8' !== e.charset &&
            'iso-8859-1' !== e.charset
          )
            throw new TypeError(
              'The charset option must be either utf-8, iso-8859-1, or undefined'
            );
          var r = o.default;
          if (void 0 !== e.format) {
            if (!i.call(o.formatters, e.format))
              throw new TypeError('Unknown format option provided.');
            r = e.format;
          }
          var n = o.formatters[r],
            c = l.filter;
          return (
            ('function' == typeof e.filter || u(e.filter)) && (c = e.filter),
            {
              addQueryPrefix:
                'boolean' == typeof e.addQueryPrefix
                  ? e.addQueryPrefix
                  : l.addQueryPrefix,
              allowDots: void 0 === e.allowDots ? l.allowDots : !!e.allowDots,
              charset: t,
              charsetSentinel:
                'boolean' == typeof e.charsetSentinel
                  ? e.charsetSentinel
                  : l.charsetSentinel,
              delimiter: void 0 === e.delimiter ? l.delimiter : e.delimiter,
              encode: 'boolean' == typeof e.encode ? e.encode : l.encode,
              encoder: 'function' == typeof e.encoder ? e.encoder : l.encoder,
              encodeValuesOnly:
                'boolean' == typeof e.encodeValuesOnly
                  ? e.encodeValuesOnly
                  : l.encodeValuesOnly,
              filter: c,
              formatter: n,
              serializeDate:
                'function' == typeof e.serializeDate
                  ? e.serializeDate
                  : l.serializeDate,
              skipNulls:
                'boolean' == typeof e.skipNulls ? e.skipNulls : l.skipNulls,
              sort: 'function' == typeof e.sort ? e.sort : null,
              strictNullHandling:
                'boolean' == typeof e.strictNullHandling
                  ? e.strictNullHandling
                  : l.strictNullHandling,
            }
          );
        })(t);
      'function' == typeof a.filter
        ? (n = (0, a.filter)('', n))
        : u(a.filter) && (r = a.filter);
      var f,
        p = [];
      if ('object' != typeof n || null === n) return '';
      f =
        t && t.arrayFormat in c
          ? t.arrayFormat
          : t && 'indices' in t
          ? t.indices
            ? 'indices'
            : 'repeat'
          : 'indices';
      var y = c[f];
      r || (r = Object.keys(n)), a.sort && r.sort(a.sort);
      for (var h = 0; h < r.length; ++h) {
        var m = r[h];
        (a.skipNulls && null === n[m]) ||
          s(
            p,
            d(
              n[m],
              m,
              y,
              a.strictNullHandling,
              a.skipNulls,
              a.encode ? a.encoder : null,
              a.filter,
              a.sort,
              a.allowDots,
              a.serializeDate,
              a.formatter,
              a.encodeValuesOnly,
              a.charset
            )
          );
      }
      var b = p.join(a.delimiter),
        g = !0 === a.addQueryPrefix ? '?' : '';
      return (
        a.charsetSentinel &&
          ('iso-8859-1' === a.charset
            ? (g += 'utf8=%26%2310003%3B&')
            : (g += 'utf8=%E2%9C%93&')),
        b.length > 0 ? g + b : ''
      );
    };
  },
  function(e, t, r) {
    'use strict';
    var n = r(2),
      o = Object.prototype.hasOwnProperty,
      i = {
        allowDots: !1,
        allowPrototypes: !1,
        arrayLimit: 20,
        charset: 'utf-8',
        charsetSentinel: !1,
        comma: !1,
        decoder: n.decode,
        delimiter: '&',
        depth: 5,
        ignoreQueryPrefix: !1,
        interpretNumericEntities: !1,
        parameterLimit: 1e3,
        parseArrays: !0,
        plainObjects: !1,
        strictNullHandling: !1,
      },
      c = function(e) {
        return e.replace(/&#(\d+);/g, function(e, t) {
          return String.fromCharCode(parseInt(t, 10));
        });
      },
      u = function(e, t, r) {
        if (e) {
          var n = r.allowDots ? e.replace(/\.([^.[]+)/g, '[$1]') : e,
            i = /(\[[^[\]]*])/g,
            c = /(\[[^[\]]*])/.exec(n),
            u = c ? n.slice(0, c.index) : n,
            a = [];
          if (u) {
            if (
              !r.plainObjects &&
              o.call(Object.prototype, u) &&
              !r.allowPrototypes
            )
              return;
            a.push(u);
          }
          for (var s = 0; null !== (c = i.exec(n)) && s < r.depth; ) {
            if (
              ((s += 1),
              !r.plainObjects &&
                o.call(Object.prototype, c[1].slice(1, -1)) &&
                !r.allowPrototypes)
            )
              return;
            a.push(c[1]);
          }
          return (
            c && a.push('[' + n.slice(c.index) + ']'),
            (function(e, t, r) {
              for (var n = t, o = e.length - 1; o >= 0; --o) {
                var i,
                  c = e[o];
                if ('[]' === c && r.parseArrays) i = [].concat(n);
                else {
                  i = r.plainObjects ? Object.create(null) : {};
                  var u =
                      '[' === c.charAt(0) && ']' === c.charAt(c.length - 1)
                        ? c.slice(1, -1)
                        : c,
                    a = parseInt(u, 10);
                  r.parseArrays || '' !== u
                    ? !isNaN(a) &&
                      c !== u &&
                      String(a) === u &&
                      a >= 0 &&
                      r.parseArrays &&
                      a <= r.arrayLimit
                      ? ((i = [])[a] = n)
                      : (i[u] = n)
                    : (i = { 0: n });
                }
                n = i;
              }
              return n;
            })(a, t, r)
          );
        }
      };
    e.exports = function(e, t) {
      var r = (function(e) {
        if (!e) return i;
        if (
          null !== e.decoder &&
          void 0 !== e.decoder &&
          'function' != typeof e.decoder
        )
          throw new TypeError('Decoder has to be a function.');
        if (
          void 0 !== e.charset &&
          'utf-8' !== e.charset &&
          'iso-8859-1' !== e.charset
        )
          throw new Error(
            'The charset option must be either utf-8, iso-8859-1, or undefined'
          );
        var t = void 0 === e.charset ? i.charset : e.charset;
        return {
          allowDots: void 0 === e.allowDots ? i.allowDots : !!e.allowDots,
          allowPrototypes:
            'boolean' == typeof e.allowPrototypes
              ? e.allowPrototypes
              : i.allowPrototypes,
          arrayLimit:
            'number' == typeof e.arrayLimit ? e.arrayLimit : i.arrayLimit,
          charset: t,
          charsetSentinel:
            'boolean' == typeof e.charsetSentinel
              ? e.charsetSentinel
              : i.charsetSentinel,
          comma: 'boolean' == typeof e.comma ? e.comma : i.comma,
          decoder: 'function' == typeof e.decoder ? e.decoder : i.decoder,
          delimiter:
            'string' == typeof e.delimiter || n.isRegExp(e.delimiter)
              ? e.delimiter
              : i.delimiter,
          depth: 'number' == typeof e.depth ? e.depth : i.depth,
          ignoreQueryPrefix: !0 === e.ignoreQueryPrefix,
          interpretNumericEntities:
            'boolean' == typeof e.interpretNumericEntities
              ? e.interpretNumericEntities
              : i.interpretNumericEntities,
          parameterLimit:
            'number' == typeof e.parameterLimit
              ? e.parameterLimit
              : i.parameterLimit,
          parseArrays: !1 !== e.parseArrays,
          plainObjects:
            'boolean' == typeof e.plainObjects
              ? e.plainObjects
              : i.plainObjects,
          strictNullHandling:
            'boolean' == typeof e.strictNullHandling
              ? e.strictNullHandling
              : i.strictNullHandling,
        };
      })(t);
      if ('' === e || null == e)
        return r.plainObjects ? Object.create(null) : {};
      for (
        var a =
            'string' == typeof e
              ? (function(e, t) {
                  var r,
                    u = {},
                    a = t.ignoreQueryPrefix ? e.replace(/^\?/, '') : e,
                    s = t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit,
                    f = a.split(t.delimiter, s),
                    l = -1,
                    d = t.charset;
                  if (t.charsetSentinel)
                    for (r = 0; r < f.length; ++r)
                      0 === f[r].indexOf('utf8=') &&
                        ('utf8=%E2%9C%93' === f[r]
                          ? (d = 'utf-8')
                          : 'utf8=%26%2310003%3B' === f[r] &&
                            (d = 'iso-8859-1'),
                        (l = r),
                        (r = f.length));
                  for (r = 0; r < f.length; ++r)
                    if (r !== l) {
                      var p,
                        y,
                        h = f[r],
                        m = h.indexOf(']='),
                        b = -1 === m ? h.indexOf('=') : m + 1;
                      -1 === b
                        ? ((p = t.decoder(h, i.decoder, d)),
                          (y = t.strictNullHandling ? null : ''))
                        : ((p = t.decoder(h.slice(0, b), i.decoder, d)),
                          (y = t.decoder(h.slice(b + 1), i.decoder, d))),
                        y &&
                          t.interpretNumericEntities &&
                          'iso-8859-1' === d &&
                          (y = c(y)),
                        y &&
                          t.comma &&
                          y.indexOf(',') > -1 &&
                          (y = y.split(',')),
                        o.call(u, p) ? (u[p] = n.combine(u[p], y)) : (u[p] = y);
                    }
                  return u;
                })(e, r)
              : e,
          s = r.plainObjects ? Object.create(null) : {},
          f = Object.keys(a),
          l = 0;
        l < f.length;
        ++l
      ) {
        var d = f[l],
          p = u(d, a[d], r);
        s = n.merge(s, p, r);
      }
      return n.compact(s);
    };
  },
  function(e, t, r) {
    'use strict';
    r.r(t);
    var n = r(0),
      o = Object(n.a)().API_URL,
      i = function(e) {
        return fetch(o + '/verification/register/', {
          method: 'post',
          body: JSON.stringify(e),
        }).then(function(e) {
          return e.json();
        });
      },
      c = function(e, t) {
        return fetch(o + '/verification/verify/', {
          method: 'post',
          body: JSON.stringify({ sessionKey: e, userId: t }),
        }).then(function(e) {
          return e.json();
        });
      },
      u = function(e, t) {
        return fetch(o + '/verification/login/', {
          method: 'post',
          body: JSON.stringify({ username: e, password: t }),
        }).then(function(e) {
          return e.json();
        });
      },
      a = function(e, t) {
        return fetch(o + '/verification/logout/', {
          method: 'post',
          body: JSON.stringify({ sessionKey: e, userId: t }),
        }).then(function(e) {
          return e.json();
        });
      },
      s = r(1),
      f = Object(n.a)().API_URL,
      l = function(e) {
        return fetch(f + '/locations/create/', {
          method: 'post',
          body: JSON.stringify(e),
        }).then(function(e) {
          return e.json();
        });
      },
      d = function(e, t) {
        return fetch(f + '/locations/edit/' + e, {
          method: 'post',
          body: JSON.stringify(t),
        }).then(function(e) {
          return e.json();
        });
      },
      p = function(e) {
        return fetch(f + '/locations/get/' + e, { method: 'post' }).then(
          function(e) {
            return e.json();
          }
        );
      },
      y = function(e) {
        var t = f + '/locations/find/' + s.stringify(e, { addQueryPrefix: !0 });
        return fetch(t, { method: 'post' }).then(function(e) {
          return e.json();
        });
      },
      h = function(e) {
        var t =
          f + '/locations/nearby/' + s.stringify(e, { addQueryPrefix: !0 });
        return fetch(t, { method: 'post' }).then(function(e) {
          return e.json();
        });
      },
      m = Object(n.a)().API_URL,
      b = function(e) {
        return fetch(m + '/products/create/', {
          method: 'post',
          body: JSON.stringify(e),
        }).then(function(e) {
          return e.json();
        });
      },
      g = function(e, t) {
        return fetch(m + '/products/edit/' + e, {
          method: 'post',
          body: JSON.stringify(t),
        }).then(function(e) {
          return e.json();
        });
      },
      v = function(e) {
        return fetch(m + '/products/get/' + e, { method: 'post' }).then(
          function(e) {
            return e.json();
          }
        );
      },
      j = function(e) {
        return fetch(m + '/products/find/' + e, { method: 'post' }).then(
          function(e) {
            return e.json();
          }
        );
      };
    r.d(t, 'registerUser', function() {
      return i;
    }),
      r.d(t, 'verifyUser', function() {
        return c;
      }),
      r.d(t, 'loginUser', function() {
        return u;
      }),
      r.d(t, 'logoutUser', function() {
        return a;
      }),
      r.d(t, 'createLocation', function() {
        return l;
      }),
      r.d(t, 'editLocation', function() {
        return d;
      }),
      r.d(t, 'getLocation', function() {
        return p;
      }),
      r.d(t, 'findLocation', function() {
        return y;
      }),
      r.d(t, 'getNearbyLocation', function() {
        return h;
      }),
      r.d(t, 'createProduct', function() {
        return b;
      }),
      r.d(t, 'editProduct', function() {
        return g;
      }),
      r.d(t, 'getProduct', function() {
        return v;
      }),
      r.d(t, 'findProduct', function() {
        return j;
      });
  },
]);
