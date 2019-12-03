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
    r((r.s = 3));
})([
  function(e, t, r) {
    'use strict';
    var n = r(4),
      o = r(5),
      i = r(2);
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
            var i = t[n], c = i.obj[i.prop], a = Object.keys(c), u = 0;
            u < a.length;
            ++u
          ) {
            var l = a[u],
              s = c[l];
            'object' == typeof s &&
              null !== s &&
              -1 === r.indexOf(s) &&
              (t.push({ obj: c, prop: l }), r.push(s));
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
          var a = n.charCodeAt(c);
          45 === a ||
          46 === a ||
          95 === a ||
          126 === a ||
          (a >= 48 && a <= 57) ||
          (a >= 65 && a <= 90) ||
          (a >= 97 && a <= 122)
            ? (o += n.charAt(c))
            : a < 128
            ? (o += i[a])
            : a < 2048
            ? (o += i[192 | (a >> 6)] + i[128 | (63 & a)])
            : a < 55296 || a >= 57344
            ? (o +=
                i[224 | (a >> 12)] +
                i[128 | ((a >> 6) & 63)] +
                i[128 | (63 & a)])
            : ((c += 1),
              (a = 65536 + (((1023 & a) << 10) | (1023 & n.charCodeAt(c)))),
              (o +=
                i[240 | (a >> 18)] +
                i[128 | ((a >> 12) & 63)] +
                i[128 | ((a >> 6) & 63)] +
                i[128 | (63 & a)]));
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
        var a = t;
        return (
          o(t) && !o(r) && (a = c(t, i)),
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
              }, a)
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
    e.exports = r(6);
  },
  function(e, t, r) {
    'use strict';
    var n = r(1),
      o = r(2),
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
      a = Array.isArray,
      u = Array.prototype.push,
      l = function(e, t) {
        u.apply(e, a(t) ? t : [t]);
      },
      s = Date.prototype.toISOString,
      f = {
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
          return s.call(e);
        },
        skipNulls: !1,
        strictNullHandling: !1,
      },
      d = function e(t, r, o, i, c, u, s, d, p, y, h, m, b) {
        var g = t;
        if (
          ('function' == typeof s
            ? (g = s(r, g))
            : g instanceof Date
            ? (g = y(g))
            : 'comma' === o && a(g) && (g = g.join(',')),
          null === g)
        ) {
          if (i) return u && !m ? u(r, f.encoder, b) : r;
          g = '';
        }
        if (
          'string' == typeof g ||
          'number' == typeof g ||
          'boolean' == typeof g ||
          n.isBuffer(g)
        )
          return u
            ? [h(m ? r : u(r, f.encoder, b)) + '=' + h(u(g, f.encoder, b))]
            : [h(r) + '=' + h(String(g))];
        var v,
          j = [];
        if (void 0 === g) return j;
        if (a(s)) v = s;
        else {
          var O = Object.keys(g);
          v = d ? O.sort(d) : O;
        }
        for (var w = 0; w < v.length; ++w) {
          var N = v[w];
          (c && null === g[N]) ||
            (a(g)
              ? l(
                  j,
                  e(
                    g[N],
                    'function' == typeof o ? o(r, N) : r,
                    o,
                    i,
                    c,
                    u,
                    s,
                    d,
                    p,
                    y,
                    h,
                    m,
                    b
                  )
                )
              : l(
                  j,
                  e(
                    g[N],
                    r + (p ? '.' + N : '[' + N + ']'),
                    o,
                    i,
                    c,
                    u,
                    s,
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
        u = (function(e) {
          if (!e) return f;
          if (
            null !== e.encoder &&
            void 0 !== e.encoder &&
            'function' != typeof e.encoder
          )
            throw new TypeError('Encoder has to be a function.');
          var t = e.charset || f.charset;
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
            c = f.filter;
          return (
            ('function' == typeof e.filter || a(e.filter)) && (c = e.filter),
            {
              addQueryPrefix:
                'boolean' == typeof e.addQueryPrefix
                  ? e.addQueryPrefix
                  : f.addQueryPrefix,
              allowDots: void 0 === e.allowDots ? f.allowDots : !!e.allowDots,
              charset: t,
              charsetSentinel:
                'boolean' == typeof e.charsetSentinel
                  ? e.charsetSentinel
                  : f.charsetSentinel,
              delimiter: void 0 === e.delimiter ? f.delimiter : e.delimiter,
              encode: 'boolean' == typeof e.encode ? e.encode : f.encode,
              encoder: 'function' == typeof e.encoder ? e.encoder : f.encoder,
              encodeValuesOnly:
                'boolean' == typeof e.encodeValuesOnly
                  ? e.encodeValuesOnly
                  : f.encodeValuesOnly,
              filter: c,
              formatter: n,
              serializeDate:
                'function' == typeof e.serializeDate
                  ? e.serializeDate
                  : f.serializeDate,
              skipNulls:
                'boolean' == typeof e.skipNulls ? e.skipNulls : f.skipNulls,
              sort: 'function' == typeof e.sort ? e.sort : null,
              strictNullHandling:
                'boolean' == typeof e.strictNullHandling
                  ? e.strictNullHandling
                  : f.strictNullHandling,
            }
          );
        })(t);
      'function' == typeof u.filter
        ? (n = (0, u.filter)('', n))
        : a(u.filter) && (r = u.filter);
      var s,
        p = [];
      if ('object' != typeof n || null === n) return '';
      s =
        t && t.arrayFormat in c
          ? t.arrayFormat
          : t && 'indices' in t
          ? t.indices
            ? 'indices'
            : 'repeat'
          : 'indices';
      var y = c[s];
      r || (r = Object.keys(n)), u.sort && r.sort(u.sort);
      for (var h = 0; h < r.length; ++h) {
        var m = r[h];
        (u.skipNulls && null === n[m]) ||
          l(
            p,
            d(
              n[m],
              m,
              y,
              u.strictNullHandling,
              u.skipNulls,
              u.encode ? u.encoder : null,
              u.filter,
              u.sort,
              u.allowDots,
              u.serializeDate,
              u.formatter,
              u.encodeValuesOnly,
              u.charset
            )
          );
      }
      var b = p.join(u.delimiter),
        g = !0 === u.addQueryPrefix ? '?' : '';
      return (
        u.charsetSentinel &&
          ('iso-8859-1' === u.charset
            ? (g += 'utf8=%26%2310003%3B&')
            : (g += 'utf8=%E2%9C%93&')),
        b.length > 0 ? g + b : ''
      );
    };
  },
  function(e, t, r) {
    'use strict';
    var n = r(1),
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
      a = function(e, t, r) {
        if (e) {
          var n = r.allowDots ? e.replace(/\.([^.[]+)/g, '[$1]') : e,
            i = /(\[[^[\]]*])/g,
            c = /(\[[^[\]]*])/.exec(n),
            a = c ? n.slice(0, c.index) : n,
            u = [];
          if (a) {
            if (
              !r.plainObjects &&
              o.call(Object.prototype, a) &&
              !r.allowPrototypes
            )
              return;
            u.push(a);
          }
          for (var l = 0; null !== (c = i.exec(n)) && l < r.depth; ) {
            if (
              ((l += 1),
              !r.plainObjects &&
                o.call(Object.prototype, c[1].slice(1, -1)) &&
                !r.allowPrototypes)
            )
              return;
            u.push(c[1]);
          }
          return (
            c && u.push('[' + n.slice(c.index) + ']'),
            (function(e, t, r) {
              for (var n = t, o = e.length - 1; o >= 0; --o) {
                var i,
                  c = e[o];
                if ('[]' === c && r.parseArrays) i = [].concat(n);
                else {
                  i = r.plainObjects ? Object.create(null) : {};
                  var a =
                      '[' === c.charAt(0) && ']' === c.charAt(c.length - 1)
                        ? c.slice(1, -1)
                        : c,
                    u = parseInt(a, 10);
                  r.parseArrays || '' !== a
                    ? !isNaN(u) &&
                      c !== a &&
                      String(u) === a &&
                      u >= 0 &&
                      r.parseArrays &&
                      u <= r.arrayLimit
                      ? ((i = [])[u] = n)
                      : (i[a] = n)
                    : (i = { 0: n });
                }
                n = i;
              }
              return n;
            })(u, t, r)
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
        var u =
            'string' == typeof e
              ? (function(e, t) {
                  var r,
                    a = {},
                    u = t.ignoreQueryPrefix ? e.replace(/^\?/, '') : e,
                    l = t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit,
                    s = u.split(t.delimiter, l),
                    f = -1,
                    d = t.charset;
                  if (t.charsetSentinel)
                    for (r = 0; r < s.length; ++r)
                      0 === s[r].indexOf('utf8=') &&
                        ('utf8=%E2%9C%93' === s[r]
                          ? (d = 'utf-8')
                          : 'utf8=%26%2310003%3B' === s[r] &&
                            (d = 'iso-8859-1'),
                        (f = r),
                        (r = s.length));
                  for (r = 0; r < s.length; ++r)
                    if (r !== f) {
                      var p,
                        y,
                        h = s[r],
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
                        o.call(a, p) ? (a[p] = n.combine(a[p], y)) : (a[p] = y);
                    }
                  return a;
                })(e, r)
              : e,
          l = r.plainObjects ? Object.create(null) : {},
          s = Object.keys(u),
          f = 0;
        f < s.length;
        ++f
      ) {
        var d = s[f],
          p = a(d, u[d], r);
        l = n.merge(l, p, r);
      }
      return n.compact(l);
    };
  },
  function(e, t, r) {
    'use strict';
    r.r(t);
    var n = function(e) {
        return fetch('localhost/verification/register/', {
          method: 'post',
          body: JSON.stringify(e),
        }).then(function(e) {
          return e.json();
        });
      },
      o = function(e, t) {
        return fetch('localhost/verification/verify/', {
          method: 'post',
          body: JSON.stringify({ sessionKey: e, userId: t }),
        }).then(function(e) {
          return e.json();
        });
      },
      i = function(e, t) {
        return fetch('localhost/verification/login/', {
          method: 'post',
          body: JSON.stringify({ username: e, password: t }),
        }).then(function(e) {
          return e.json();
        });
      },
      c = function(e, t) {
        return fetch('localhost/verification/logout/', {
          method: 'post',
          body: JSON.stringify({ sessionKey: e, userId: t }),
        }).then(function(e) {
          return e.json();
        });
      },
      a = r(0),
      u = function(e) {
        return fetch('localhost/locations/create/', {
          method: 'post',
          body: JSON.stringify(e),
        }).then(function(e) {
          return e.json();
        });
      },
      l = function(e, t) {
        return fetch('localhost/locations/edit/' + e, {
          method: 'post',
          body: JSON.stringify(t),
        }).then(function(e) {
          return e.json();
        });
      },
      s = function(e) {
        return fetch('localhost/locations/get/' + e, { method: 'post' }).then(
          function(e) {
            return e.json();
          }
        );
      },
      f = function(e) {
        var t =
          'localhost/locations/find/' + a.stringify(e, { addQueryPrefix: !0 });
        return fetch(t, { method: 'post' }).then(function(e) {
          return e.json();
        });
      },
      d = function(e) {
        var t =
          'localhost/locations/nearby/' +
          a.stringify(e, { addQueryPrefix: !0 });
        return fetch(t, { method: 'post' }).then(function(e) {
          return e.json();
        });
      },
      p = function(e) {
        return fetch('localhost/products/create/', {
          method: 'post',
          body: JSON.stringify(e),
        }).then(function(e) {
          return e.json();
        });
      },
      y = function(e, t) {
        return fetch('localhost/products/edit/' + e, {
          method: 'post',
          body: JSON.stringify(t),
        }).then(function(e) {
          return e.json();
        });
      },
      h = function(e) {
        return fetch('localhost/products/get/' + e, { method: 'post' }).then(
          function(e) {
            return e.json();
          }
        );
      },
      m = function(e) {
        return fetch('localhost/products/find/' + e, { method: 'post' }).then(
          function(e) {
            return e.json();
          }
        );
      };
    r.d(t, 'registerUser', function() {
      return n;
    }),
      r.d(t, 'verifyUser', function() {
        return o;
      }),
      r.d(t, 'loginUser', function() {
        return i;
      }),
      r.d(t, 'logoutUser', function() {
        return c;
      }),
      r.d(t, 'createLocation', function() {
        return u;
      }),
      r.d(t, 'editLocation', function() {
        return l;
      }),
      r.d(t, 'getLocation', function() {
        return s;
      }),
      r.d(t, 'findLocation', function() {
        return f;
      }),
      r.d(t, 'getNearbyLocation', function() {
        return d;
      }),
      r.d(t, 'createProduct', function() {
        return p;
      }),
      r.d(t, 'editProduct', function() {
        return y;
      }),
      r.d(t, 'getProduct', function() {
        return h;
      }),
      r.d(t, 'findProduct', function() {
        return m;
      });
  },
]);
