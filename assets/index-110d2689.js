function ib(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const i in r)
        if (i !== "default" && !(i in e)) {
          const a = Object.getOwnPropertyDescriptor(r, i);
          a &&
            Object.defineProperty(
              e,
              i,
              a.get ? a : { enumerable: !0, get: () => r[i] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" })
  );
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const a of i)
      if (a.type === "childList")
        for (const o of a.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
    const a = {};
    return (
      i.integrity && (a.integrity = i.integrity),
      i.referrerPolicy && (a.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (a.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (a.credentials = "omit")
        : (a.credentials = "same-origin"),
      a
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const a = n(i);
    fetch(i.href, a);
  }
})();
var mA =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof globalThis < "u"
    ? globalThis
    : typeof self < "u"
    ? self
    : {};
function Rl(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
function W1(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      return this instanceof r
        ? Reflect.construct(t, arguments, this.constructor)
        : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else n = {};
  return (
    Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.keys(e).forEach(function (r) {
      var i = Object.getOwnPropertyDescriptor(e, r);
      Object.defineProperty(
        n,
        r,
        i.get
          ? i
          : {
              enumerable: !0,
              get: function () {
                return e[r];
              },
            }
      );
    }),
    n
  );
}
var H1 = {},
  Bl = {};
Bl.byteLength = sb;
Bl.toByteArray = ub;
Bl.fromByteArray = db;
var hn = [],
  Ut = [],
  ab = typeof Uint8Array < "u" ? Uint8Array : Array,
  Wu = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var Jr = 0, ob = Wu.length; Jr < ob; ++Jr)
  (hn[Jr] = Wu[Jr]), (Ut[Wu.charCodeAt(Jr)] = Jr);
Ut["-".charCodeAt(0)] = 62;
Ut["_".charCodeAt(0)] = 63;
function q1(e) {
  var t = e.length;
  if (t % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var n = e.indexOf("=");
  n === -1 && (n = t);
  var r = n === t ? 0 : 4 - (n % 4);
  return [n, r];
}
function sb(e) {
  var t = q1(e),
    n = t[0],
    r = t[1];
  return ((n + r) * 3) / 4 - r;
}
function lb(e, t, n) {
  return ((t + n) * 3) / 4 - n;
}
function ub(e) {
  var t,
    n = q1(e),
    r = n[0],
    i = n[1],
    a = new ab(lb(e, r, i)),
    o = 0,
    s = i > 0 ? r - 4 : r,
    l;
  for (l = 0; l < s; l += 4)
    (t =
      (Ut[e.charCodeAt(l)] << 18) |
      (Ut[e.charCodeAt(l + 1)] << 12) |
      (Ut[e.charCodeAt(l + 2)] << 6) |
      Ut[e.charCodeAt(l + 3)]),
      (a[o++] = (t >> 16) & 255),
      (a[o++] = (t >> 8) & 255),
      (a[o++] = t & 255);
  return (
    i === 2 &&
      ((t = (Ut[e.charCodeAt(l)] << 2) | (Ut[e.charCodeAt(l + 1)] >> 4)),
      (a[o++] = t & 255)),
    i === 1 &&
      ((t =
        (Ut[e.charCodeAt(l)] << 10) |
        (Ut[e.charCodeAt(l + 1)] << 4) |
        (Ut[e.charCodeAt(l + 2)] >> 2)),
      (a[o++] = (t >> 8) & 255),
      (a[o++] = t & 255)),
    a
  );
}
function cb(e) {
  return (
    hn[(e >> 18) & 63] + hn[(e >> 12) & 63] + hn[(e >> 6) & 63] + hn[e & 63]
  );
}
function fb(e, t, n) {
  for (var r, i = [], a = t; a < n; a += 3)
    (r =
      ((e[a] << 16) & 16711680) + ((e[a + 1] << 8) & 65280) + (e[a + 2] & 255)),
      i.push(cb(r));
  return i.join("");
}
function db(e) {
  for (
    var t, n = e.length, r = n % 3, i = [], a = 16383, o = 0, s = n - r;
    o < s;
    o += a
  )
    i.push(fb(e, o, o + a > s ? s : o + a));
  return (
    r === 1
      ? ((t = e[n - 1]), i.push(hn[t >> 2] + hn[(t << 4) & 63] + "=="))
      : r === 2 &&
        ((t = (e[n - 2] << 8) + e[n - 1]),
        i.push(hn[t >> 10] + hn[(t >> 4) & 63] + hn[(t << 2) & 63] + "=")),
    i.join("")
  );
}
var Ud = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ Ud.read =
  function (e, t, n, r, i) {
    var a,
      o,
      s = i * 8 - r - 1,
      l = (1 << s) - 1,
      u = l >> 1,
      c = -7,
      d = n ? i - 1 : 0,
      m = n ? -1 : 1,
      v = e[t + d];
    for (
      d += m, a = v & ((1 << -c) - 1), v >>= -c, c += s;
      c > 0;
      a = a * 256 + e[t + d], d += m, c -= 8
    );
    for (
      o = a & ((1 << -c) - 1), a >>= -c, c += r;
      c > 0;
      o = o * 256 + e[t + d], d += m, c -= 8
    );
    if (a === 0) a = 1 - u;
    else {
      if (a === l) return o ? NaN : (v ? -1 : 1) * (1 / 0);
      (o = o + Math.pow(2, r)), (a = a - u);
    }
    return (v ? -1 : 1) * o * Math.pow(2, a - r);
  };
Ud.write = function (e, t, n, r, i, a) {
  var o,
    s,
    l,
    u = a * 8 - i - 1,
    c = (1 << u) - 1,
    d = c >> 1,
    m = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
    v = r ? 0 : a - 1,
    b = r ? 1 : -1,
    _ = t < 0 || (t === 0 && 1 / t < 0) ? 1 : 0;
  for (
    t = Math.abs(t),
      isNaN(t) || t === 1 / 0
        ? ((s = isNaN(t) ? 1 : 0), (o = c))
        : ((o = Math.floor(Math.log(t) / Math.LN2)),
          t * (l = Math.pow(2, -o)) < 1 && (o--, (l *= 2)),
          o + d >= 1 ? (t += m / l) : (t += m * Math.pow(2, 1 - d)),
          t * l >= 2 && (o++, (l /= 2)),
          o + d >= c
            ? ((s = 0), (o = c))
            : o + d >= 1
            ? ((s = (t * l - 1) * Math.pow(2, i)), (o = o + d))
            : ((s = t * Math.pow(2, d - 1) * Math.pow(2, i)), (o = 0)));
    i >= 8;
    e[n + v] = s & 255, v += b, s /= 256, i -= 8
  );
  for (
    o = (o << i) | s, u += i;
    u > 0;
    e[n + v] = o & 255, v += b, o /= 256, u -= 8
  );
  e[n + v - b] |= _ * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ (function (e) {
  const t = Bl,
    n = Ud,
    r =
      typeof Symbol == "function" && typeof Symbol.for == "function"
        ? Symbol.for("nodejs.util.inspect.custom")
        : null;
  (e.Buffer = s), (e.SlowBuffer = g), (e.INSPECT_MAX_BYTES = 50);
  const i = 2147483647;
  (e.kMaxLength = i),
    (s.TYPED_ARRAY_SUPPORT = a()),
    !s.TYPED_ARRAY_SUPPORT &&
      typeof console < "u" &&
      typeof console.error == "function" &&
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
  function a() {
    try {
      const S = new Uint8Array(1),
        h = {
          foo: function () {
            return 42;
          },
        };
      return (
        Object.setPrototypeOf(h, Uint8Array.prototype),
        Object.setPrototypeOf(S, h),
        S.foo() === 42
      );
    } catch {
      return !1;
    }
  }
  Object.defineProperty(s.prototype, "parent", {
    enumerable: !0,
    get: function () {
      if (s.isBuffer(this)) return this.buffer;
    },
  }),
    Object.defineProperty(s.prototype, "offset", {
      enumerable: !0,
      get: function () {
        if (s.isBuffer(this)) return this.byteOffset;
      },
    });
  function o(S) {
    if (S > i)
      throw new RangeError(
        'The value "' + S + '" is invalid for option "size"'
      );
    const h = new Uint8Array(S);
    return Object.setPrototypeOf(h, s.prototype), h;
  }
  function s(S, h, p) {
    if (typeof S == "number") {
      if (typeof h == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return d(S);
    }
    return l(S, h, p);
  }
  s.poolSize = 8192;
  function l(S, h, p) {
    if (typeof S == "string") return m(S, h);
    if (ArrayBuffer.isView(S)) return b(S);
    if (S == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
          typeof S
      );
    if (
      be(S, ArrayBuffer) ||
      (S && be(S.buffer, ArrayBuffer)) ||
      (typeof SharedArrayBuffer < "u" &&
        (be(S, SharedArrayBuffer) || (S && be(S.buffer, SharedArrayBuffer))))
    )
      return _(S, h, p);
    if (typeof S == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    const P = S.valueOf && S.valueOf();
    if (P != null && P !== S) return s.from(P, h, p);
    const A = C(S);
    if (A) return A;
    if (
      typeof Symbol < "u" &&
      Symbol.toPrimitive != null &&
      typeof S[Symbol.toPrimitive] == "function"
    )
      return s.from(S[Symbol.toPrimitive]("string"), h, p);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
        typeof S
    );
  }
  (s.from = function (S, h, p) {
    return l(S, h, p);
  }),
    Object.setPrototypeOf(s.prototype, Uint8Array.prototype),
    Object.setPrototypeOf(s, Uint8Array);
  function u(S) {
    if (typeof S != "number")
      throw new TypeError('"size" argument must be of type number');
    if (S < 0)
      throw new RangeError(
        'The value "' + S + '" is invalid for option "size"'
      );
  }
  function c(S, h, p) {
    return (
      u(S),
      S <= 0
        ? o(S)
        : h !== void 0
        ? typeof p == "string"
          ? o(S).fill(h, p)
          : o(S).fill(h)
        : o(S)
    );
  }
  s.alloc = function (S, h, p) {
    return c(S, h, p);
  };
  function d(S) {
    return u(S), o(S < 0 ? 0 : x(S) | 0);
  }
  (s.allocUnsafe = function (S) {
    return d(S);
  }),
    (s.allocUnsafeSlow = function (S) {
      return d(S);
    });
  function m(S, h) {
    if (((typeof h != "string" || h === "") && (h = "utf8"), !s.isEncoding(h)))
      throw new TypeError("Unknown encoding: " + h);
    const p = w(S, h) | 0;
    let P = o(p);
    const A = P.write(S, h);
    return A !== p && (P = P.slice(0, A)), P;
  }
  function v(S) {
    const h = S.length < 0 ? 0 : x(S.length) | 0,
      p = o(h);
    for (let P = 0; P < h; P += 1) p[P] = S[P] & 255;
    return p;
  }
  function b(S) {
    if (be(S, Uint8Array)) {
      const h = new Uint8Array(S);
      return _(h.buffer, h.byteOffset, h.byteLength);
    }
    return v(S);
  }
  function _(S, h, p) {
    if (h < 0 || S.byteLength < h)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (S.byteLength < h + (p || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let P;
    return (
      h === void 0 && p === void 0
        ? (P = new Uint8Array(S))
        : p === void 0
        ? (P = new Uint8Array(S, h))
        : (P = new Uint8Array(S, h, p)),
      Object.setPrototypeOf(P, s.prototype),
      P
    );
  }
  function C(S) {
    if (s.isBuffer(S)) {
      const h = x(S.length) | 0,
        p = o(h);
      return p.length === 0 || S.copy(p, 0, 0, h), p;
    }
    if (S.length !== void 0)
      return typeof S.length != "number" || He(S.length) ? o(0) : v(S);
    if (S.type === "Buffer" && Array.isArray(S.data)) return v(S.data);
  }
  function x(S) {
    if (S >= i)
      throw new RangeError(
        "Attempt to allocate Buffer larger than maximum size: 0x" +
          i.toString(16) +
          " bytes"
      );
    return S | 0;
  }
  function g(S) {
    return +S != S && (S = 0), s.alloc(+S);
  }
  (s.isBuffer = function (h) {
    return h != null && h._isBuffer === !0 && h !== s.prototype;
  }),
    (s.compare = function (h, p) {
      if (
        (be(h, Uint8Array) && (h = s.from(h, h.offset, h.byteLength)),
        be(p, Uint8Array) && (p = s.from(p, p.offset, p.byteLength)),
        !s.isBuffer(h) || !s.isBuffer(p))
      )
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      if (h === p) return 0;
      let P = h.length,
        A = p.length;
      for (let T = 0, j = Math.min(P, A); T < j; ++T)
        if (h[T] !== p[T]) {
          (P = h[T]), (A = p[T]);
          break;
        }
      return P < A ? -1 : A < P ? 1 : 0;
    }),
    (s.isEncoding = function (h) {
      switch (String(h).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }),
    (s.concat = function (h, p) {
      if (!Array.isArray(h))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (h.length === 0) return s.alloc(0);
      let P;
      if (p === void 0) for (p = 0, P = 0; P < h.length; ++P) p += h[P].length;
      const A = s.allocUnsafe(p);
      let T = 0;
      for (P = 0; P < h.length; ++P) {
        let j = h[P];
        if (be(j, Uint8Array))
          T + j.length > A.length
            ? (s.isBuffer(j) || (j = s.from(j)), j.copy(A, T))
            : Uint8Array.prototype.set.call(A, j, T);
        else if (s.isBuffer(j)) j.copy(A, T);
        else throw new TypeError('"list" argument must be an Array of Buffers');
        T += j.length;
      }
      return A;
    });
  function w(S, h) {
    if (s.isBuffer(S)) return S.length;
    if (ArrayBuffer.isView(S) || be(S, ArrayBuffer)) return S.byteLength;
    if (typeof S != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
          typeof S
      );
    const p = S.length,
      P = arguments.length > 2 && arguments[2] === !0;
    if (!P && p === 0) return 0;
    let A = !1;
    for (;;)
      switch (h) {
        case "ascii":
        case "latin1":
        case "binary":
          return p;
        case "utf8":
        case "utf-8":
          return Mn(S).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return p * 2;
        case "hex":
          return p >>> 1;
        case "base64":
          return Ve(S).length;
        default:
          if (A) return P ? -1 : Mn(S).length;
          (h = ("" + h).toLowerCase()), (A = !0);
      }
  }
  s.byteLength = w;
  function E(S, h, p) {
    let P = !1;
    if (
      ((h === void 0 || h < 0) && (h = 0),
      h > this.length ||
        ((p === void 0 || p > this.length) && (p = this.length), p <= 0) ||
        ((p >>>= 0), (h >>>= 0), p <= h))
    )
      return "";
    for (S || (S = "utf8"); ; )
      switch (S) {
        case "hex":
          return z(this, h, p);
        case "utf8":
        case "utf-8":
          return te(this, h, p);
        case "ascii":
          return B(this, h, p);
        case "latin1":
        case "binary":
          return L(this, h, p);
        case "base64":
          return X(this, h, p);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return G(this, h, p);
        default:
          if (P) throw new TypeError("Unknown encoding: " + S);
          (S = (S + "").toLowerCase()), (P = !0);
      }
  }
  s.prototype._isBuffer = !0;
  function N(S, h, p) {
    const P = S[h];
    (S[h] = S[p]), (S[p] = P);
  }
  (s.prototype.swap16 = function () {
    const h = this.length;
    if (h % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let p = 0; p < h; p += 2) N(this, p, p + 1);
    return this;
  }),
    (s.prototype.swap32 = function () {
      const h = this.length;
      if (h % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let p = 0; p < h; p += 4) N(this, p, p + 3), N(this, p + 1, p + 2);
      return this;
    }),
    (s.prototype.swap64 = function () {
      const h = this.length;
      if (h % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let p = 0; p < h; p += 8)
        N(this, p, p + 7),
          N(this, p + 1, p + 6),
          N(this, p + 2, p + 5),
          N(this, p + 3, p + 4);
      return this;
    }),
    (s.prototype.toString = function () {
      const h = this.length;
      return h === 0
        ? ""
        : arguments.length === 0
        ? te(this, 0, h)
        : E.apply(this, arguments);
    }),
    (s.prototype.toLocaleString = s.prototype.toString),
    (s.prototype.equals = function (h) {
      if (!s.isBuffer(h)) throw new TypeError("Argument must be a Buffer");
      return this === h ? !0 : s.compare(this, h) === 0;
    }),
    (s.prototype.inspect = function () {
      let h = "";
      const p = e.INSPECT_MAX_BYTES;
      return (
        (h = this.toString("hex", 0, p)
          .replace(/(.{2})/g, "$1 ")
          .trim()),
        this.length > p && (h += " ... "),
        "<Buffer " + h + ">"
      );
    }),
    r && (s.prototype[r] = s.prototype.inspect),
    (s.prototype.compare = function (h, p, P, A, T) {
      if (
        (be(h, Uint8Array) && (h = s.from(h, h.offset, h.byteLength)),
        !s.isBuffer(h))
      )
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
            typeof h
        );
      if (
        (p === void 0 && (p = 0),
        P === void 0 && (P = h ? h.length : 0),
        A === void 0 && (A = 0),
        T === void 0 && (T = this.length),
        p < 0 || P > h.length || A < 0 || T > this.length)
      )
        throw new RangeError("out of range index");
      if (A >= T && p >= P) return 0;
      if (A >= T) return -1;
      if (p >= P) return 1;
      if (((p >>>= 0), (P >>>= 0), (A >>>= 0), (T >>>= 0), this === h))
        return 0;
      let j = T - A,
        Y = P - p;
      const se = Math.min(j, Y),
        Pe = this.slice(A, T),
        Le = h.slice(p, P);
      for (let xe = 0; xe < se; ++xe)
        if (Pe[xe] !== Le[xe]) {
          (j = Pe[xe]), (Y = Le[xe]);
          break;
        }
      return j < Y ? -1 : Y < j ? 1 : 0;
    });
  function D(S, h, p, P, A) {
    if (S.length === 0) return -1;
    if (
      (typeof p == "string"
        ? ((P = p), (p = 0))
        : p > 2147483647
        ? (p = 2147483647)
        : p < -2147483648 && (p = -2147483648),
      (p = +p),
      He(p) && (p = A ? 0 : S.length - 1),
      p < 0 && (p = S.length + p),
      p >= S.length)
    ) {
      if (A) return -1;
      p = S.length - 1;
    } else if (p < 0)
      if (A) p = 0;
      else return -1;
    if ((typeof h == "string" && (h = s.from(h, P)), s.isBuffer(h)))
      return h.length === 0 ? -1 : f(S, h, p, P, A);
    if (typeof h == "number")
      return (
        (h = h & 255),
        typeof Uint8Array.prototype.indexOf == "function"
          ? A
            ? Uint8Array.prototype.indexOf.call(S, h, p)
            : Uint8Array.prototype.lastIndexOf.call(S, h, p)
          : f(S, [h], p, P, A)
      );
    throw new TypeError("val must be string, number or Buffer");
  }
  function f(S, h, p, P, A) {
    let T = 1,
      j = S.length,
      Y = h.length;
    if (
      P !== void 0 &&
      ((P = String(P).toLowerCase()),
      P === "ucs2" || P === "ucs-2" || P === "utf16le" || P === "utf-16le")
    ) {
      if (S.length < 2 || h.length < 2) return -1;
      (T = 2), (j /= 2), (Y /= 2), (p /= 2);
    }
    function se(Le, xe) {
      return T === 1 ? Le[xe] : Le.readUInt16BE(xe * T);
    }
    let Pe;
    if (A) {
      let Le = -1;
      for (Pe = p; Pe < j; Pe++)
        if (se(S, Pe) === se(h, Le === -1 ? 0 : Pe - Le)) {
          if ((Le === -1 && (Le = Pe), Pe - Le + 1 === Y)) return Le * T;
        } else Le !== -1 && (Pe -= Pe - Le), (Le = -1);
    } else
      for (p + Y > j && (p = j - Y), Pe = p; Pe >= 0; Pe--) {
        let Le = !0;
        for (let xe = 0; xe < Y; xe++)
          if (se(S, Pe + xe) !== se(h, xe)) {
            Le = !1;
            break;
          }
        if (Le) return Pe;
      }
    return -1;
  }
  (s.prototype.includes = function (h, p, P) {
    return this.indexOf(h, p, P) !== -1;
  }),
    (s.prototype.indexOf = function (h, p, P) {
      return D(this, h, p, P, !0);
    }),
    (s.prototype.lastIndexOf = function (h, p, P) {
      return D(this, h, p, P, !1);
    });
  function k(S, h, p, P) {
    p = Number(p) || 0;
    const A = S.length - p;
    P ? ((P = Number(P)), P > A && (P = A)) : (P = A);
    const T = h.length;
    P > T / 2 && (P = T / 2);
    let j;
    for (j = 0; j < P; ++j) {
      const Y = parseInt(h.substr(j * 2, 2), 16);
      if (He(Y)) return j;
      S[p + j] = Y;
    }
    return j;
  }
  function O(S, h, p, P) {
    return Re(Mn(h, S.length - p), S, p, P);
  }
  function I(S, h, p, P) {
    return Re(la(h), S, p, P);
  }
  function H(S, h, p, P) {
    return Re(Ve(h), S, p, P);
  }
  function Z(S, h, p, P) {
    return Re(qo(h, S.length - p), S, p, P);
  }
  (s.prototype.write = function (h, p, P, A) {
    if (p === void 0) (A = "utf8"), (P = this.length), (p = 0);
    else if (P === void 0 && typeof p == "string")
      (A = p), (P = this.length), (p = 0);
    else if (isFinite(p))
      (p = p >>> 0),
        isFinite(P)
          ? ((P = P >>> 0), A === void 0 && (A = "utf8"))
          : ((A = P), (P = void 0));
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    const T = this.length - p;
    if (
      ((P === void 0 || P > T) && (P = T),
      (h.length > 0 && (P < 0 || p < 0)) || p > this.length)
    )
      throw new RangeError("Attempt to write outside buffer bounds");
    A || (A = "utf8");
    let j = !1;
    for (;;)
      switch (A) {
        case "hex":
          return k(this, h, p, P);
        case "utf8":
        case "utf-8":
          return O(this, h, p, P);
        case "ascii":
        case "latin1":
        case "binary":
          return I(this, h, p, P);
        case "base64":
          return H(this, h, p, P);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Z(this, h, p, P);
        default:
          if (j) throw new TypeError("Unknown encoding: " + A);
          (A = ("" + A).toLowerCase()), (j = !0);
      }
  }),
    (s.prototype.toJSON = function () {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0),
      };
    });
  function X(S, h, p) {
    return h === 0 && p === S.length
      ? t.fromByteArray(S)
      : t.fromByteArray(S.slice(h, p));
  }
  function te(S, h, p) {
    p = Math.min(S.length, p);
    const P = [];
    let A = h;
    for (; A < p; ) {
      const T = S[A];
      let j = null,
        Y = T > 239 ? 4 : T > 223 ? 3 : T > 191 ? 2 : 1;
      if (A + Y <= p) {
        let se, Pe, Le, xe;
        switch (Y) {
          case 1:
            T < 128 && (j = T);
            break;
          case 2:
            (se = S[A + 1]),
              (se & 192) === 128 &&
                ((xe = ((T & 31) << 6) | (se & 63)), xe > 127 && (j = xe));
            break;
          case 3:
            (se = S[A + 1]),
              (Pe = S[A + 2]),
              (se & 192) === 128 &&
                (Pe & 192) === 128 &&
                ((xe = ((T & 15) << 12) | ((se & 63) << 6) | (Pe & 63)),
                xe > 2047 && (xe < 55296 || xe > 57343) && (j = xe));
            break;
          case 4:
            (se = S[A + 1]),
              (Pe = S[A + 2]),
              (Le = S[A + 3]),
              (se & 192) === 128 &&
                (Pe & 192) === 128 &&
                (Le & 192) === 128 &&
                ((xe =
                  ((T & 15) << 18) |
                  ((se & 63) << 12) |
                  ((Pe & 63) << 6) |
                  (Le & 63)),
                xe > 65535 && xe < 1114112 && (j = xe));
        }
      }
      j === null
        ? ((j = 65533), (Y = 1))
        : j > 65535 &&
          ((j -= 65536),
          P.push(((j >>> 10) & 1023) | 55296),
          (j = 56320 | (j & 1023))),
        P.push(j),
        (A += Y);
    }
    return ee(P);
  }
  const ne = 4096;
  function ee(S) {
    const h = S.length;
    if (h <= ne) return String.fromCharCode.apply(String, S);
    let p = "",
      P = 0;
    for (; P < h; )
      p += String.fromCharCode.apply(String, S.slice(P, (P += ne)));
    return p;
  }
  function B(S, h, p) {
    let P = "";
    p = Math.min(S.length, p);
    for (let A = h; A < p; ++A) P += String.fromCharCode(S[A] & 127);
    return P;
  }
  function L(S, h, p) {
    let P = "";
    p = Math.min(S.length, p);
    for (let A = h; A < p; ++A) P += String.fromCharCode(S[A]);
    return P;
  }
  function z(S, h, p) {
    const P = S.length;
    (!h || h < 0) && (h = 0), (!p || p < 0 || p > P) && (p = P);
    let A = "";
    for (let T = h; T < p; ++T) A += Ze[S[T]];
    return A;
  }
  function G(S, h, p) {
    const P = S.slice(h, p);
    let A = "";
    for (let T = 0; T < P.length - 1; T += 2)
      A += String.fromCharCode(P[T] + P[T + 1] * 256);
    return A;
  }
  s.prototype.slice = function (h, p) {
    const P = this.length;
    (h = ~~h),
      (p = p === void 0 ? P : ~~p),
      h < 0 ? ((h += P), h < 0 && (h = 0)) : h > P && (h = P),
      p < 0 ? ((p += P), p < 0 && (p = 0)) : p > P && (p = P),
      p < h && (p = h);
    const A = this.subarray(h, p);
    return Object.setPrototypeOf(A, s.prototype), A;
  };
  function V(S, h, p) {
    if (S % 1 !== 0 || S < 0) throw new RangeError("offset is not uint");
    if (S + h > p)
      throw new RangeError("Trying to access beyond buffer length");
  }
  (s.prototype.readUintLE = s.prototype.readUIntLE =
    function (h, p, P) {
      (h = h >>> 0), (p = p >>> 0), P || V(h, p, this.length);
      let A = this[h],
        T = 1,
        j = 0;
      for (; ++j < p && (T *= 256); ) A += this[h + j] * T;
      return A;
    }),
    (s.prototype.readUintBE = s.prototype.readUIntBE =
      function (h, p, P) {
        (h = h >>> 0), (p = p >>> 0), P || V(h, p, this.length);
        let A = this[h + --p],
          T = 1;
        for (; p > 0 && (T *= 256); ) A += this[h + --p] * T;
        return A;
      }),
    (s.prototype.readUint8 = s.prototype.readUInt8 =
      function (h, p) {
        return (h = h >>> 0), p || V(h, 1, this.length), this[h];
      }),
    (s.prototype.readUint16LE = s.prototype.readUInt16LE =
      function (h, p) {
        return (
          (h = h >>> 0), p || V(h, 2, this.length), this[h] | (this[h + 1] << 8)
        );
      }),
    (s.prototype.readUint16BE = s.prototype.readUInt16BE =
      function (h, p) {
        return (
          (h = h >>> 0), p || V(h, 2, this.length), (this[h] << 8) | this[h + 1]
        );
      }),
    (s.prototype.readUint32LE = s.prototype.readUInt32LE =
      function (h, p) {
        return (
          (h = h >>> 0),
          p || V(h, 4, this.length),
          (this[h] | (this[h + 1] << 8) | (this[h + 2] << 16)) +
            this[h + 3] * 16777216
        );
      }),
    (s.prototype.readUint32BE = s.prototype.readUInt32BE =
      function (h, p) {
        return (
          (h = h >>> 0),
          p || V(h, 4, this.length),
          this[h] * 16777216 +
            ((this[h + 1] << 16) | (this[h + 2] << 8) | this[h + 3])
        );
      }),
    (s.prototype.readBigUInt64LE = Ce(function (h) {
      (h = h >>> 0), pe(h, "offset");
      const p = this[h],
        P = this[h + 7];
      (p === void 0 || P === void 0) && kt(h, this.length - 8);
      const A =
          p + this[++h] * 2 ** 8 + this[++h] * 2 ** 16 + this[++h] * 2 ** 24,
        T = this[++h] + this[++h] * 2 ** 8 + this[++h] * 2 ** 16 + P * 2 ** 24;
      return BigInt(A) + (BigInt(T) << BigInt(32));
    })),
    (s.prototype.readBigUInt64BE = Ce(function (h) {
      (h = h >>> 0), pe(h, "offset");
      const p = this[h],
        P = this[h + 7];
      (p === void 0 || P === void 0) && kt(h, this.length - 8);
      const A =
          p * 2 ** 24 + this[++h] * 2 ** 16 + this[++h] * 2 ** 8 + this[++h],
        T = this[++h] * 2 ** 24 + this[++h] * 2 ** 16 + this[++h] * 2 ** 8 + P;
      return (BigInt(A) << BigInt(32)) + BigInt(T);
    })),
    (s.prototype.readIntLE = function (h, p, P) {
      (h = h >>> 0), (p = p >>> 0), P || V(h, p, this.length);
      let A = this[h],
        T = 1,
        j = 0;
      for (; ++j < p && (T *= 256); ) A += this[h + j] * T;
      return (T *= 128), A >= T && (A -= Math.pow(2, 8 * p)), A;
    }),
    (s.prototype.readIntBE = function (h, p, P) {
      (h = h >>> 0), (p = p >>> 0), P || V(h, p, this.length);
      let A = p,
        T = 1,
        j = this[h + --A];
      for (; A > 0 && (T *= 256); ) j += this[h + --A] * T;
      return (T *= 128), j >= T && (j -= Math.pow(2, 8 * p)), j;
    }),
    (s.prototype.readInt8 = function (h, p) {
      return (
        (h = h >>> 0),
        p || V(h, 1, this.length),
        this[h] & 128 ? (255 - this[h] + 1) * -1 : this[h]
      );
    }),
    (s.prototype.readInt16LE = function (h, p) {
      (h = h >>> 0), p || V(h, 2, this.length);
      const P = this[h] | (this[h + 1] << 8);
      return P & 32768 ? P | 4294901760 : P;
    }),
    (s.prototype.readInt16BE = function (h, p) {
      (h = h >>> 0), p || V(h, 2, this.length);
      const P = this[h + 1] | (this[h] << 8);
      return P & 32768 ? P | 4294901760 : P;
    }),
    (s.prototype.readInt32LE = function (h, p) {
      return (
        (h = h >>> 0),
        p || V(h, 4, this.length),
        this[h] | (this[h + 1] << 8) | (this[h + 2] << 16) | (this[h + 3] << 24)
      );
    }),
    (s.prototype.readInt32BE = function (h, p) {
      return (
        (h = h >>> 0),
        p || V(h, 4, this.length),
        (this[h] << 24) | (this[h + 1] << 16) | (this[h + 2] << 8) | this[h + 3]
      );
    }),
    (s.prototype.readBigInt64LE = Ce(function (h) {
      (h = h >>> 0), pe(h, "offset");
      const p = this[h],
        P = this[h + 7];
      (p === void 0 || P === void 0) && kt(h, this.length - 8);
      const A =
        this[h + 4] + this[h + 5] * 2 ** 8 + this[h + 6] * 2 ** 16 + (P << 24);
      return (
        (BigInt(A) << BigInt(32)) +
        BigInt(
          p + this[++h] * 2 ** 8 + this[++h] * 2 ** 16 + this[++h] * 2 ** 24
        )
      );
    })),
    (s.prototype.readBigInt64BE = Ce(function (h) {
      (h = h >>> 0), pe(h, "offset");
      const p = this[h],
        P = this[h + 7];
      (p === void 0 || P === void 0) && kt(h, this.length - 8);
      const A =
        (p << 24) + this[++h] * 2 ** 16 + this[++h] * 2 ** 8 + this[++h];
      return (
        (BigInt(A) << BigInt(32)) +
        BigInt(
          this[++h] * 2 ** 24 + this[++h] * 2 ** 16 + this[++h] * 2 ** 8 + P
        )
      );
    })),
    (s.prototype.readFloatLE = function (h, p) {
      return (
        (h = h >>> 0), p || V(h, 4, this.length), n.read(this, h, !0, 23, 4)
      );
    }),
    (s.prototype.readFloatBE = function (h, p) {
      return (
        (h = h >>> 0), p || V(h, 4, this.length), n.read(this, h, !1, 23, 4)
      );
    }),
    (s.prototype.readDoubleLE = function (h, p) {
      return (
        (h = h >>> 0), p || V(h, 8, this.length), n.read(this, h, !0, 52, 8)
      );
    }),
    (s.prototype.readDoubleBE = function (h, p) {
      return (
        (h = h >>> 0), p || V(h, 8, this.length), n.read(this, h, !1, 52, 8)
      );
    });
  function K(S, h, p, P, A, T) {
    if (!s.isBuffer(S))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (h > A || h < T)
      throw new RangeError('"value" argument is out of bounds');
    if (p + P > S.length) throw new RangeError("Index out of range");
  }
  (s.prototype.writeUintLE = s.prototype.writeUIntLE =
    function (h, p, P, A) {
      if (((h = +h), (p = p >>> 0), (P = P >>> 0), !A)) {
        const Y = Math.pow(2, 8 * P) - 1;
        K(this, h, p, P, Y, 0);
      }
      let T = 1,
        j = 0;
      for (this[p] = h & 255; ++j < P && (T *= 256); )
        this[p + j] = (h / T) & 255;
      return p + P;
    }),
    (s.prototype.writeUintBE = s.prototype.writeUIntBE =
      function (h, p, P, A) {
        if (((h = +h), (p = p >>> 0), (P = P >>> 0), !A)) {
          const Y = Math.pow(2, 8 * P) - 1;
          K(this, h, p, P, Y, 0);
        }
        let T = P - 1,
          j = 1;
        for (this[p + T] = h & 255; --T >= 0 && (j *= 256); )
          this[p + T] = (h / j) & 255;
        return p + P;
      }),
    (s.prototype.writeUint8 = s.prototype.writeUInt8 =
      function (h, p, P) {
        return (
          (h = +h),
          (p = p >>> 0),
          P || K(this, h, p, 1, 255, 0),
          (this[p] = h & 255),
          p + 1
        );
      }),
    (s.prototype.writeUint16LE = s.prototype.writeUInt16LE =
      function (h, p, P) {
        return (
          (h = +h),
          (p = p >>> 0),
          P || K(this, h, p, 2, 65535, 0),
          (this[p] = h & 255),
          (this[p + 1] = h >>> 8),
          p + 2
        );
      }),
    (s.prototype.writeUint16BE = s.prototype.writeUInt16BE =
      function (h, p, P) {
        return (
          (h = +h),
          (p = p >>> 0),
          P || K(this, h, p, 2, 65535, 0),
          (this[p] = h >>> 8),
          (this[p + 1] = h & 255),
          p + 2
        );
      }),
    (s.prototype.writeUint32LE = s.prototype.writeUInt32LE =
      function (h, p, P) {
        return (
          (h = +h),
          (p = p >>> 0),
          P || K(this, h, p, 4, 4294967295, 0),
          (this[p + 3] = h >>> 24),
          (this[p + 2] = h >>> 16),
          (this[p + 1] = h >>> 8),
          (this[p] = h & 255),
          p + 4
        );
      }),
    (s.prototype.writeUint32BE = s.prototype.writeUInt32BE =
      function (h, p, P) {
        return (
          (h = +h),
          (p = p >>> 0),
          P || K(this, h, p, 4, 4294967295, 0),
          (this[p] = h >>> 24),
          (this[p + 1] = h >>> 16),
          (this[p + 2] = h >>> 8),
          (this[p + 3] = h & 255),
          p + 4
        );
      });
  function $(S, h, p, P, A) {
    we(h, P, A, S, p, 7);
    let T = Number(h & BigInt(4294967295));
    (S[p++] = T),
      (T = T >> 8),
      (S[p++] = T),
      (T = T >> 8),
      (S[p++] = T),
      (T = T >> 8),
      (S[p++] = T);
    let j = Number((h >> BigInt(32)) & BigInt(4294967295));
    return (
      (S[p++] = j),
      (j = j >> 8),
      (S[p++] = j),
      (j = j >> 8),
      (S[p++] = j),
      (j = j >> 8),
      (S[p++] = j),
      p
    );
  }
  function J(S, h, p, P, A) {
    we(h, P, A, S, p, 7);
    let T = Number(h & BigInt(4294967295));
    (S[p + 7] = T),
      (T = T >> 8),
      (S[p + 6] = T),
      (T = T >> 8),
      (S[p + 5] = T),
      (T = T >> 8),
      (S[p + 4] = T);
    let j = Number((h >> BigInt(32)) & BigInt(4294967295));
    return (
      (S[p + 3] = j),
      (j = j >> 8),
      (S[p + 2] = j),
      (j = j >> 8),
      (S[p + 1] = j),
      (j = j >> 8),
      (S[p] = j),
      p + 8
    );
  }
  (s.prototype.writeBigUInt64LE = Ce(function (h, p = 0) {
    return $(this, h, p, BigInt(0), BigInt("0xffffffffffffffff"));
  })),
    (s.prototype.writeBigUInt64BE = Ce(function (h, p = 0) {
      return J(this, h, p, BigInt(0), BigInt("0xffffffffffffffff"));
    })),
    (s.prototype.writeIntLE = function (h, p, P, A) {
      if (((h = +h), (p = p >>> 0), !A)) {
        const se = Math.pow(2, 8 * P - 1);
        K(this, h, p, P, se - 1, -se);
      }
      let T = 0,
        j = 1,
        Y = 0;
      for (this[p] = h & 255; ++T < P && (j *= 256); )
        h < 0 && Y === 0 && this[p + T - 1] !== 0 && (Y = 1),
          (this[p + T] = (((h / j) >> 0) - Y) & 255);
      return p + P;
    }),
    (s.prototype.writeIntBE = function (h, p, P, A) {
      if (((h = +h), (p = p >>> 0), !A)) {
        const se = Math.pow(2, 8 * P - 1);
        K(this, h, p, P, se - 1, -se);
      }
      let T = P - 1,
        j = 1,
        Y = 0;
      for (this[p + T] = h & 255; --T >= 0 && (j *= 256); )
        h < 0 && Y === 0 && this[p + T + 1] !== 0 && (Y = 1),
          (this[p + T] = (((h / j) >> 0) - Y) & 255);
      return p + P;
    }),
    (s.prototype.writeInt8 = function (h, p, P) {
      return (
        (h = +h),
        (p = p >>> 0),
        P || K(this, h, p, 1, 127, -128),
        h < 0 && (h = 255 + h + 1),
        (this[p] = h & 255),
        p + 1
      );
    }),
    (s.prototype.writeInt16LE = function (h, p, P) {
      return (
        (h = +h),
        (p = p >>> 0),
        P || K(this, h, p, 2, 32767, -32768),
        (this[p] = h & 255),
        (this[p + 1] = h >>> 8),
        p + 2
      );
    }),
    (s.prototype.writeInt16BE = function (h, p, P) {
      return (
        (h = +h),
        (p = p >>> 0),
        P || K(this, h, p, 2, 32767, -32768),
        (this[p] = h >>> 8),
        (this[p + 1] = h & 255),
        p + 2
      );
    }),
    (s.prototype.writeInt32LE = function (h, p, P) {
      return (
        (h = +h),
        (p = p >>> 0),
        P || K(this, h, p, 4, 2147483647, -2147483648),
        (this[p] = h & 255),
        (this[p + 1] = h >>> 8),
        (this[p + 2] = h >>> 16),
        (this[p + 3] = h >>> 24),
        p + 4
      );
    }),
    (s.prototype.writeInt32BE = function (h, p, P) {
      return (
        (h = +h),
        (p = p >>> 0),
        P || K(this, h, p, 4, 2147483647, -2147483648),
        h < 0 && (h = 4294967295 + h + 1),
        (this[p] = h >>> 24),
        (this[p + 1] = h >>> 16),
        (this[p + 2] = h >>> 8),
        (this[p + 3] = h & 255),
        p + 4
      );
    }),
    (s.prototype.writeBigInt64LE = Ce(function (h, p = 0) {
      return $(
        this,
        h,
        p,
        -BigInt("0x8000000000000000"),
        BigInt("0x7fffffffffffffff")
      );
    })),
    (s.prototype.writeBigInt64BE = Ce(function (h, p = 0) {
      return J(
        this,
        h,
        p,
        -BigInt("0x8000000000000000"),
        BigInt("0x7fffffffffffffff")
      );
    }));
  function ae(S, h, p, P, A, T) {
    if (p + P > S.length) throw new RangeError("Index out of range");
    if (p < 0) throw new RangeError("Index out of range");
  }
  function re(S, h, p, P, A) {
    return (
      (h = +h),
      (p = p >>> 0),
      A || ae(S, h, p, 4),
      n.write(S, h, p, P, 23, 4),
      p + 4
    );
  }
  (s.prototype.writeFloatLE = function (h, p, P) {
    return re(this, h, p, !0, P);
  }),
    (s.prototype.writeFloatBE = function (h, p, P) {
      return re(this, h, p, !1, P);
    });
  function le(S, h, p, P, A) {
    return (
      (h = +h),
      (p = p >>> 0),
      A || ae(S, h, p, 8),
      n.write(S, h, p, P, 52, 8),
      p + 8
    );
  }
  (s.prototype.writeDoubleLE = function (h, p, P) {
    return le(this, h, p, !0, P);
  }),
    (s.prototype.writeDoubleBE = function (h, p, P) {
      return le(this, h, p, !1, P);
    }),
    (s.prototype.copy = function (h, p, P, A) {
      if (!s.isBuffer(h)) throw new TypeError("argument should be a Buffer");
      if (
        (P || (P = 0),
        !A && A !== 0 && (A = this.length),
        p >= h.length && (p = h.length),
        p || (p = 0),
        A > 0 && A < P && (A = P),
        A === P || h.length === 0 || this.length === 0)
      )
        return 0;
      if (p < 0) throw new RangeError("targetStart out of bounds");
      if (P < 0 || P >= this.length) throw new RangeError("Index out of range");
      if (A < 0) throw new RangeError("sourceEnd out of bounds");
      A > this.length && (A = this.length),
        h.length - p < A - P && (A = h.length - p + P);
      const T = A - P;
      return (
        this === h && typeof Uint8Array.prototype.copyWithin == "function"
          ? this.copyWithin(p, P, A)
          : Uint8Array.prototype.set.call(h, this.subarray(P, A), p),
        T
      );
    }),
    (s.prototype.fill = function (h, p, P, A) {
      if (typeof h == "string") {
        if (
          (typeof p == "string"
            ? ((A = p), (p = 0), (P = this.length))
            : typeof P == "string" && ((A = P), (P = this.length)),
          A !== void 0 && typeof A != "string")
        )
          throw new TypeError("encoding must be a string");
        if (typeof A == "string" && !s.isEncoding(A))
          throw new TypeError("Unknown encoding: " + A);
        if (h.length === 1) {
          const j = h.charCodeAt(0);
          ((A === "utf8" && j < 128) || A === "latin1") && (h = j);
        }
      } else
        typeof h == "number"
          ? (h = h & 255)
          : typeof h == "boolean" && (h = Number(h));
      if (p < 0 || this.length < p || this.length < P)
        throw new RangeError("Out of range index");
      if (P <= p) return this;
      (p = p >>> 0), (P = P === void 0 ? this.length : P >>> 0), h || (h = 0);
      let T;
      if (typeof h == "number") for (T = p; T < P; ++T) this[T] = h;
      else {
        const j = s.isBuffer(h) ? h : s.from(h, A),
          Y = j.length;
        if (Y === 0)
          throw new TypeError(
            'The value "' + h + '" is invalid for argument "value"'
          );
        for (T = 0; T < P - p; ++T) this[T + p] = j[T % Y];
      }
      return this;
    });
  const ce = {};
  function he(S, h, p) {
    ce[S] = class extends p {
      constructor() {
        super(),
          Object.defineProperty(this, "message", {
            value: h.apply(this, arguments),
            writable: !0,
            configurable: !0,
          }),
          (this.name = `${this.name} [${S}]`),
          this.stack,
          delete this.name;
      }
      get code() {
        return S;
      }
      set code(A) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: A,
          writable: !0,
        });
      }
      toString() {
        return `${this.name} [${S}]: ${this.message}`;
      }
    };
  }
  he(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function (S) {
      return S
        ? `${S} is outside of buffer bounds`
        : "Attempt to access memory outside buffer bounds";
    },
    RangeError
  ),
    he(
      "ERR_INVALID_ARG_TYPE",
      function (S, h) {
        return `The "${S}" argument must be of type number. Received type ${typeof h}`;
      },
      TypeError
    ),
    he(
      "ERR_OUT_OF_RANGE",
      function (S, h, p) {
        let P = `The value of "${S}" is out of range.`,
          A = p;
        return (
          Number.isInteger(p) && Math.abs(p) > 2 ** 32
            ? (A = me(String(p)))
            : typeof p == "bigint" &&
              ((A = String(p)),
              (p > BigInt(2) ** BigInt(32) || p < -(BigInt(2) ** BigInt(32))) &&
                (A = me(A)),
              (A += "n")),
          (P += ` It must be ${h}. Received ${A}`),
          P
        );
      },
      RangeError
    );
  function me(S) {
    let h = "",
      p = S.length;
    const P = S[0] === "-" ? 1 : 0;
    for (; p >= P + 4; p -= 3) h = `_${S.slice(p - 3, p)}${h}`;
    return `${S.slice(0, p)}${h}`;
  }
  function ve(S, h, p) {
    pe(h, "offset"),
      (S[h] === void 0 || S[h + p] === void 0) && kt(h, S.length - (p + 1));
  }
  function we(S, h, p, P, A, T) {
    if (S > p || S < h) {
      const j = typeof h == "bigint" ? "n" : "";
      let Y;
      throw (
        (T > 3
          ? h === 0 || h === BigInt(0)
            ? (Y = `>= 0${j} and < 2${j} ** ${(T + 1) * 8}${j}`)
            : (Y = `>= -(2${j} ** ${(T + 1) * 8 - 1}${j}) and < 2 ** ${
                (T + 1) * 8 - 1
              }${j}`)
          : (Y = `>= ${h}${j} and <= ${p}${j}`),
        new ce.ERR_OUT_OF_RANGE("value", Y, S))
      );
    }
    ve(P, A, T);
  }
  function pe(S, h) {
    if (typeof S != "number") throw new ce.ERR_INVALID_ARG_TYPE(h, "number", S);
  }
  function kt(S, h, p) {
    throw Math.floor(S) !== S
      ? (pe(S, p), new ce.ERR_OUT_OF_RANGE(p || "offset", "an integer", S))
      : h < 0
      ? new ce.ERR_BUFFER_OUT_OF_BOUNDS()
      : new ce.ERR_OUT_OF_RANGE(
          p || "offset",
          `>= ${p ? 1 : 0} and <= ${h}`,
          S
        );
  }
  const Un = /[^+/0-9A-Za-z-_]/g;
  function Er(S) {
    if (((S = S.split("=")[0]), (S = S.trim().replace(Un, "")), S.length < 2))
      return "";
    for (; S.length % 4 !== 0; ) S = S + "=";
    return S;
  }
  function Mn(S, h) {
    h = h || 1 / 0;
    let p;
    const P = S.length;
    let A = null;
    const T = [];
    for (let j = 0; j < P; ++j) {
      if (((p = S.charCodeAt(j)), p > 55295 && p < 57344)) {
        if (!A) {
          if (p > 56319) {
            (h -= 3) > -1 && T.push(239, 191, 189);
            continue;
          } else if (j + 1 === P) {
            (h -= 3) > -1 && T.push(239, 191, 189);
            continue;
          }
          A = p;
          continue;
        }
        if (p < 56320) {
          (h -= 3) > -1 && T.push(239, 191, 189), (A = p);
          continue;
        }
        p = (((A - 55296) << 10) | (p - 56320)) + 65536;
      } else A && (h -= 3) > -1 && T.push(239, 191, 189);
      if (((A = null), p < 128)) {
        if ((h -= 1) < 0) break;
        T.push(p);
      } else if (p < 2048) {
        if ((h -= 2) < 0) break;
        T.push((p >> 6) | 192, (p & 63) | 128);
      } else if (p < 65536) {
        if ((h -= 3) < 0) break;
        T.push((p >> 12) | 224, ((p >> 6) & 63) | 128, (p & 63) | 128);
      } else if (p < 1114112) {
        if ((h -= 4) < 0) break;
        T.push(
          (p >> 18) | 240,
          ((p >> 12) & 63) | 128,
          ((p >> 6) & 63) | 128,
          (p & 63) | 128
        );
      } else throw new Error("Invalid code point");
    }
    return T;
  }
  function la(S) {
    const h = [];
    for (let p = 0; p < S.length; ++p) h.push(S.charCodeAt(p) & 255);
    return h;
  }
  function qo(S, h) {
    let p, P, A;
    const T = [];
    for (let j = 0; j < S.length && !((h -= 2) < 0); ++j)
      (p = S.charCodeAt(j)), (P = p >> 8), (A = p % 256), T.push(A), T.push(P);
    return T;
  }
  function Ve(S) {
    return t.toByteArray(Er(S));
  }
  function Re(S, h, p, P) {
    let A;
    for (A = 0; A < P && !(A + p >= h.length || A >= S.length); ++A)
      h[A + p] = S[A];
    return A;
  }
  function be(S, h) {
    return (
      S instanceof h ||
      (S != null &&
        S.constructor != null &&
        S.constructor.name != null &&
        S.constructor.name === h.name)
    );
  }
  function He(S) {
    return S !== S;
  }
  const Ze = (function () {
    const S = "0123456789abcdef",
      h = new Array(256);
    for (let p = 0; p < 16; ++p) {
      const P = p * 16;
      for (let A = 0; A < 16; ++A) h[P + A] = S[p] + S[A];
    }
    return h;
  })();
  function Ce(S) {
    return typeof BigInt > "u" ? Xe : S;
  }
  function Xe() {
    throw new Error("BigInt not supported");
  }
})(H1);
var V1 = { exports: {} },
  We = (V1.exports = {}),
  fn,
  dn;
function Wc() {
  throw new Error("setTimeout has not been defined");
}
function Hc() {
  throw new Error("clearTimeout has not been defined");
}
(function () {
  try {
    typeof setTimeout == "function" ? (fn = setTimeout) : (fn = Wc);
  } catch {
    fn = Wc;
  }
  try {
    typeof clearTimeout == "function" ? (dn = clearTimeout) : (dn = Hc);
  } catch {
    dn = Hc;
  }
})();
function G1(e) {
  if (fn === setTimeout) return setTimeout(e, 0);
  if ((fn === Wc || !fn) && setTimeout)
    return (fn = setTimeout), setTimeout(e, 0);
  try {
    return fn(e, 0);
  } catch {
    try {
      return fn.call(null, e, 0);
    } catch {
      return fn.call(this, e, 0);
    }
  }
}
function hb(e) {
  if (dn === clearTimeout) return clearTimeout(e);
  if ((dn === Hc || !dn) && clearTimeout)
    return (dn = clearTimeout), clearTimeout(e);
  try {
    return dn(e);
  } catch {
    try {
      return dn.call(null, e);
    } catch {
      return dn.call(this, e);
    }
  }
}
var xn = [],
  xi = !1,
  Dr,
  Ss = -1;
function pb() {
  !xi ||
    !Dr ||
    ((xi = !1),
    Dr.length ? (xn = Dr.concat(xn)) : (Ss = -1),
    xn.length && Q1());
}
function Q1() {
  if (!xi) {
    var e = G1(pb);
    xi = !0;
    for (var t = xn.length; t; ) {
      for (Dr = xn, xn = []; ++Ss < t; ) Dr && Dr[Ss].run();
      (Ss = -1), (t = xn.length);
    }
    (Dr = null), (xi = !1), hb(e);
  }
}
We.nextTick = function (e) {
  var t = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
  xn.push(new K1(e, t)), xn.length === 1 && !xi && G1(Q1);
};
function K1(e, t) {
  (this.fun = e), (this.array = t);
}
K1.prototype.run = function () {
  this.fun.apply(null, this.array);
};
We.title = "browser";
We.browser = !0;
We.env = {};
We.argv = [];
We.version = "";
We.versions = {};
function jn() {}
We.on = jn;
We.addListener = jn;
We.once = jn;
We.off = jn;
We.removeListener = jn;
We.removeAllListeners = jn;
We.emit = jn;
We.prependListener = jn;
We.prependOnceListener = jn;
We.listeners = function (e) {
  return [];
};
We.binding = function (e) {
  throw new Error("process.binding is not supported");
};
We.cwd = function () {
  return "/";
};
We.chdir = function (e) {
  throw new Error("process.chdir is not supported");
};
We.umask = function () {
  return 0;
};
var mb = V1.exports;
const gb = Rl(mb);
window.global = window;
window.process = gb;
window.Buffer = H1.Buffer;
var Y1 = { exports: {} },
  $l = {},
  Z1 = { exports: {} },
  fe = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var _o = Symbol.for("react.element"),
  yb = Symbol.for("react.portal"),
  vb = Symbol.for("react.fragment"),
  wb = Symbol.for("react.strict_mode"),
  bb = Symbol.for("react.profiler"),
  xb = Symbol.for("react.provider"),
  Eb = Symbol.for("react.context"),
  Sb = Symbol.for("react.forward_ref"),
  Cb = Symbol.for("react.suspense"),
  _b = Symbol.for("react.memo"),
  kb = Symbol.for("react.lazy"),
  $0 = Symbol.iterator;
function Nb(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = ($0 && e[$0]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var X1 = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  J1 = Object.assign,
  eg = {};
function Qi(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = eg),
    (this.updater = n || X1);
}
Qi.prototype.isReactComponent = {};
Qi.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Qi.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function tg() {}
tg.prototype = Qi.prototype;
function Md(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = eg),
    (this.updater = n || X1);
}
var Rd = (Md.prototype = new tg());
Rd.constructor = Md;
J1(Rd, Qi.prototype);
Rd.isPureReactComponent = !0;
var z0 = Array.isArray,
  ng = Object.prototype.hasOwnProperty,
  Bd = { current: null },
  rg = { key: !0, ref: !0, __self: !0, __source: !0 };
function ig(e, t, n) {
  var r,
    i = {},
    a = null,
    o = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (o = t.ref),
    t.key !== void 0 && (a = "" + t.key),
    t))
      ng.call(t, r) && !rg.hasOwnProperty(r) && (i[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) i.children = n;
  else if (1 < s) {
    for (var l = Array(s), u = 0; u < s; u++) l[u] = arguments[u + 2];
    i.children = l;
  }
  if (e && e.defaultProps)
    for (r in ((s = e.defaultProps), s)) i[r] === void 0 && (i[r] = s[r]);
  return {
    $$typeof: _o,
    type: e,
    key: a,
    ref: o,
    props: i,
    _owner: Bd.current,
  };
}
function Db(e, t) {
  return {
    $$typeof: _o,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function $d(e) {
  return typeof e == "object" && e !== null && e.$$typeof === _o;
}
function Pb(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var W0 = /\/+/g;
function Hu(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? Pb("" + e.key)
    : t.toString(36);
}
function Cs(e, t, n, r, i) {
  var a = typeof e;
  (a === "undefined" || a === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else
    switch (a) {
      case "string":
      case "number":
        o = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case _o:
          case yb:
            o = !0;
        }
    }
  if (o)
    return (
      (o = e),
      (i = i(o)),
      (e = r === "" ? "." + Hu(o, 0) : r),
      z0(i)
        ? ((n = ""),
          e != null && (n = e.replace(W0, "$&/") + "/"),
          Cs(i, t, n, "", function (u) {
            return u;
          }))
        : i != null &&
          ($d(i) &&
            (i = Db(
              i,
              n +
                (!i.key || (o && o.key === i.key)
                  ? ""
                  : ("" + i.key).replace(W0, "$&/") + "/") +
                e
            )),
          t.push(i)),
      1
    );
  if (((o = 0), (r = r === "" ? "." : r + ":"), z0(e)))
    for (var s = 0; s < e.length; s++) {
      a = e[s];
      var l = r + Hu(a, s);
      o += Cs(a, t, n, l, i);
    }
  else if (((l = Nb(e)), typeof l == "function"))
    for (e = l.call(e), s = 0; !(a = e.next()).done; )
      (a = a.value), (l = r + Hu(a, s++)), (o += Cs(a, t, n, l, i));
  else if (a === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return o;
}
function Vo(e, t, n) {
  if (e == null) return e;
  var r = [],
    i = 0;
  return (
    Cs(e, r, "", "", function (a) {
      return t.call(n, a, i++);
    }),
    r
  );
}
function Ab(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var gt = { current: null },
  _s = { transition: null },
  Tb = {
    ReactCurrentDispatcher: gt,
    ReactCurrentBatchConfig: _s,
    ReactCurrentOwner: Bd,
  };
fe.Children = {
  map: Vo,
  forEach: function (e, t, n) {
    Vo(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      Vo(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Vo(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!$d(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
fe.Component = Qi;
fe.Fragment = vb;
fe.Profiler = bb;
fe.PureComponent = Md;
fe.StrictMode = wb;
fe.Suspense = Cb;
fe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Tb;
fe.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = J1({}, e.props),
    i = e.key,
    a = e.ref,
    o = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((a = t.ref), (o = Bd.current)),
      t.key !== void 0 && (i = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var s = e.type.defaultProps;
    for (l in t)
      ng.call(t, l) &&
        !rg.hasOwnProperty(l) &&
        (r[l] = t[l] === void 0 && s !== void 0 ? s[l] : t[l]);
  }
  var l = arguments.length - 2;
  if (l === 1) r.children = n;
  else if (1 < l) {
    s = Array(l);
    for (var u = 0; u < l; u++) s[u] = arguments[u + 2];
    r.children = s;
  }
  return { $$typeof: _o, type: e.type, key: i, ref: a, props: r, _owner: o };
};
fe.createContext = function (e) {
  return (
    (e = {
      $$typeof: Eb,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: xb, _context: e }),
    (e.Consumer = e)
  );
};
fe.createElement = ig;
fe.createFactory = function (e) {
  var t = ig.bind(null, e);
  return (t.type = e), t;
};
fe.createRef = function () {
  return { current: null };
};
fe.forwardRef = function (e) {
  return { $$typeof: Sb, render: e };
};
fe.isValidElement = $d;
fe.lazy = function (e) {
  return { $$typeof: kb, _payload: { _status: -1, _result: e }, _init: Ab };
};
fe.memo = function (e, t) {
  return { $$typeof: _b, type: e, compare: t === void 0 ? null : t };
};
fe.startTransition = function (e) {
  var t = _s.transition;
  _s.transition = {};
  try {
    e();
  } finally {
    _s.transition = t;
  }
};
fe.unstable_act = function () {
  throw Error("act(...) is not supported in production builds of React.");
};
fe.useCallback = function (e, t) {
  return gt.current.useCallback(e, t);
};
fe.useContext = function (e) {
  return gt.current.useContext(e);
};
fe.useDebugValue = function () {};
fe.useDeferredValue = function (e) {
  return gt.current.useDeferredValue(e);
};
fe.useEffect = function (e, t) {
  return gt.current.useEffect(e, t);
};
fe.useId = function () {
  return gt.current.useId();
};
fe.useImperativeHandle = function (e, t, n) {
  return gt.current.useImperativeHandle(e, t, n);
};
fe.useInsertionEffect = function (e, t) {
  return gt.current.useInsertionEffect(e, t);
};
fe.useLayoutEffect = function (e, t) {
  return gt.current.useLayoutEffect(e, t);
};
fe.useMemo = function (e, t) {
  return gt.current.useMemo(e, t);
};
fe.useReducer = function (e, t, n) {
  return gt.current.useReducer(e, t, n);
};
fe.useRef = function (e) {
  return gt.current.useRef(e);
};
fe.useState = function (e) {
  return gt.current.useState(e);
};
fe.useSyncExternalStore = function (e, t, n) {
  return gt.current.useSyncExternalStore(e, t, n);
};
fe.useTransition = function () {
  return gt.current.useTransition();
};
fe.version = "18.2.0";
Z1.exports = fe;
var F = Z1.exports;
const Ha = Rl(F),
  Ob = ib({ __proto__: null, default: Ha }, [F]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var jb = F,
  Ib = Symbol.for("react.element"),
  Lb = Symbol.for("react.fragment"),
  Fb = Object.prototype.hasOwnProperty,
  Ub = jb.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Mb = { key: !0, ref: !0, __self: !0, __source: !0 };
function ag(e, t, n) {
  var r,
    i = {},
    a = null,
    o = null;
  n !== void 0 && (a = "" + n),
    t.key !== void 0 && (a = "" + t.key),
    t.ref !== void 0 && (o = t.ref);
  for (r in t) Fb.call(t, r) && !Mb.hasOwnProperty(r) && (i[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
  return {
    $$typeof: Ib,
    type: e,
    key: a,
    ref: o,
    props: i,
    _owner: Ub.current,
  };
}
$l.Fragment = Lb;
$l.jsx = ag;
$l.jsxs = ag;
Y1.exports = $l;
var y = Y1.exports,
  og = { exports: {} },
  It = {},
  sg = { exports: {} },
  lg = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(L, z) {
    var G = L.length;
    L.push(z);
    e: for (; 0 < G; ) {
      var V = (G - 1) >>> 1,
        K = L[V];
      if (0 < i(K, z)) (L[V] = z), (L[G] = K), (G = V);
      else break e;
    }
  }
  function n(L) {
    return L.length === 0 ? null : L[0];
  }
  function r(L) {
    if (L.length === 0) return null;
    var z = L[0],
      G = L.pop();
    if (G !== z) {
      L[0] = G;
      e: for (var V = 0, K = L.length, $ = K >>> 1; V < $; ) {
        var J = 2 * (V + 1) - 1,
          ae = L[J],
          re = J + 1,
          le = L[re];
        if (0 > i(ae, G))
          re < K && 0 > i(le, ae)
            ? ((L[V] = le), (L[re] = G), (V = re))
            : ((L[V] = ae), (L[J] = G), (V = J));
        else if (re < K && 0 > i(le, G)) (L[V] = le), (L[re] = G), (V = re);
        else break e;
      }
    }
    return z;
  }
  function i(L, z) {
    var G = L.sortIndex - z.sortIndex;
    return G !== 0 ? G : L.id - z.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var a = performance;
    e.unstable_now = function () {
      return a.now();
    };
  } else {
    var o = Date,
      s = o.now();
    e.unstable_now = function () {
      return o.now() - s;
    };
  }
  var l = [],
    u = [],
    c = 1,
    d = null,
    m = 3,
    v = !1,
    b = !1,
    _ = !1,
    C = typeof setTimeout == "function" ? setTimeout : null,
    x = typeof clearTimeout == "function" ? clearTimeout : null,
    g = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function w(L) {
    for (var z = n(u); z !== null; ) {
      if (z.callback === null) r(u);
      else if (z.startTime <= L)
        r(u), (z.sortIndex = z.expirationTime), t(l, z);
      else break;
      z = n(u);
    }
  }
  function E(L) {
    if (((_ = !1), w(L), !b))
      if (n(l) !== null) (b = !0), ee(N);
      else {
        var z = n(u);
        z !== null && B(E, z.startTime - L);
      }
  }
  function N(L, z) {
    (b = !1), _ && ((_ = !1), x(k), (k = -1)), (v = !0);
    var G = m;
    try {
      for (
        w(z), d = n(l);
        d !== null && (!(d.expirationTime > z) || (L && !H()));

      ) {
        var V = d.callback;
        if (typeof V == "function") {
          (d.callback = null), (m = d.priorityLevel);
          var K = V(d.expirationTime <= z);
          (z = e.unstable_now()),
            typeof K == "function" ? (d.callback = K) : d === n(l) && r(l),
            w(z);
        } else r(l);
        d = n(l);
      }
      if (d !== null) var $ = !0;
      else {
        var J = n(u);
        J !== null && B(E, J.startTime - z), ($ = !1);
      }
      return $;
    } finally {
      (d = null), (m = G), (v = !1);
    }
  }
  var D = !1,
    f = null,
    k = -1,
    O = 5,
    I = -1;
  function H() {
    return !(e.unstable_now() - I < O);
  }
  function Z() {
    if (f !== null) {
      var L = e.unstable_now();
      I = L;
      var z = !0;
      try {
        z = f(!0, L);
      } finally {
        z ? X() : ((D = !1), (f = null));
      }
    } else D = !1;
  }
  var X;
  if (typeof g == "function")
    X = function () {
      g(Z);
    };
  else if (typeof MessageChannel < "u") {
    var te = new MessageChannel(),
      ne = te.port2;
    (te.port1.onmessage = Z),
      (X = function () {
        ne.postMessage(null);
      });
  } else
    X = function () {
      C(Z, 0);
    };
  function ee(L) {
    (f = L), D || ((D = !0), X());
  }
  function B(L, z) {
    k = C(function () {
      L(e.unstable_now());
    }, z);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (L) {
      L.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      b || v || ((b = !0), ee(N));
    }),
    (e.unstable_forceFrameRate = function (L) {
      0 > L || 125 < L
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (O = 0 < L ? Math.floor(1e3 / L) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return m;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(l);
    }),
    (e.unstable_next = function (L) {
      switch (m) {
        case 1:
        case 2:
        case 3:
          var z = 3;
          break;
        default:
          z = m;
      }
      var G = m;
      m = z;
      try {
        return L();
      } finally {
        m = G;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (L, z) {
      switch (L) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          L = 3;
      }
      var G = m;
      m = L;
      try {
        return z();
      } finally {
        m = G;
      }
    }),
    (e.unstable_scheduleCallback = function (L, z, G) {
      var V = e.unstable_now();
      switch (
        (typeof G == "object" && G !== null
          ? ((G = G.delay), (G = typeof G == "number" && 0 < G ? V + G : V))
          : (G = V),
        L)
      ) {
        case 1:
          var K = -1;
          break;
        case 2:
          K = 250;
          break;
        case 5:
          K = 1073741823;
          break;
        case 4:
          K = 1e4;
          break;
        default:
          K = 5e3;
      }
      return (
        (K = G + K),
        (L = {
          id: c++,
          callback: z,
          priorityLevel: L,
          startTime: G,
          expirationTime: K,
          sortIndex: -1,
        }),
        G > V
          ? ((L.sortIndex = G),
            t(u, L),
            n(l) === null &&
              L === n(u) &&
              (_ ? (x(k), (k = -1)) : (_ = !0), B(E, G - V)))
          : ((L.sortIndex = K), t(l, L), b || v || ((b = !0), ee(N))),
        L
      );
    }),
    (e.unstable_shouldYield = H),
    (e.unstable_wrapCallback = function (L) {
      var z = m;
      return function () {
        var G = m;
        m = z;
        try {
          return L.apply(this, arguments);
        } finally {
          m = G;
        }
      };
    });
})(lg);
sg.exports = lg;
var Rb = sg.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ug = F,
  jt = Rb;
function U(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var cg = new Set(),
  qa = {};
function Qr(e, t) {
  Oi(e, t), Oi(e + "Capture", t);
}
function Oi(e, t) {
  for (qa[e] = t, e = 0; e < t.length; e++) cg.add(t[e]);
}
var _n = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  qc = Object.prototype.hasOwnProperty,
  Bb =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  H0 = {},
  q0 = {};
function $b(e) {
  return qc.call(q0, e)
    ? !0
    : qc.call(H0, e)
    ? !1
    : Bb.test(e)
    ? (q0[e] = !0)
    : ((H0[e] = !0), !1);
}
function zb(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Wb(e, t, n, r) {
  if (t === null || typeof t > "u" || zb(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function yt(e, t, n, r, i, a, o) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = i),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = a),
    (this.removeEmptyString = o);
}
var it = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    it[e] = new yt(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  it[t] = new yt(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  it[e] = new yt(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  it[e] = new yt(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    it[e] = new yt(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  it[e] = new yt(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  it[e] = new yt(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  it[e] = new yt(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  it[e] = new yt(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var zd = /[\-:]([a-z])/g;
function Wd(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(zd, Wd);
    it[t] = new yt(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(zd, Wd);
    it[t] = new yt(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(zd, Wd);
  it[t] = new yt(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  it[e] = new yt(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
it.xlinkHref = new yt(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  it[e] = new yt(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Hd(e, t, n, r) {
  var i = it.hasOwnProperty(t) ? it[t] : null;
  (i !== null
    ? i.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Wb(t, n, i, r) && (n = null),
    r || i === null
      ? $b(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : i.mustUseProperty
      ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : "") : n)
      : ((t = i.attributeName),
        (r = i.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((i = i.type),
            (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var In = ug.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Go = Symbol.for("react.element"),
  oi = Symbol.for("react.portal"),
  si = Symbol.for("react.fragment"),
  qd = Symbol.for("react.strict_mode"),
  Vc = Symbol.for("react.profiler"),
  fg = Symbol.for("react.provider"),
  dg = Symbol.for("react.context"),
  Vd = Symbol.for("react.forward_ref"),
  Gc = Symbol.for("react.suspense"),
  Qc = Symbol.for("react.suspense_list"),
  Gd = Symbol.for("react.memo"),
  $n = Symbol.for("react.lazy"),
  hg = Symbol.for("react.offscreen"),
  V0 = Symbol.iterator;
function ua(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (V0 && e[V0]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Ie = Object.assign,
  qu;
function xa(e) {
  if (qu === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      qu = (t && t[1]) || "";
    }
  return (
    `
` +
    qu +
    e
  );
}
var Vu = !1;
function Gu(e, t) {
  if (!e || Vu) return "";
  Vu = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (
        var i = u.stack.split(`
`),
          a = r.stack.split(`
`),
          o = i.length - 1,
          s = a.length - 1;
        1 <= o && 0 <= s && i[o] !== a[s];

      )
        s--;
      for (; 1 <= o && 0 <= s; o--, s--)
        if (i[o] !== a[s]) {
          if (o !== 1 || s !== 1)
            do
              if ((o--, s--, 0 > s || i[o] !== a[s])) {
                var l =
                  `
` + i[o].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    l.includes("<anonymous>") &&
                    (l = l.replace("<anonymous>", e.displayName)),
                  l
                );
              }
            while (1 <= o && 0 <= s);
          break;
        }
    }
  } finally {
    (Vu = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? xa(e) : "";
}
function Hb(e) {
  switch (e.tag) {
    case 5:
      return xa(e.type);
    case 16:
      return xa("Lazy");
    case 13:
      return xa("Suspense");
    case 19:
      return xa("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = Gu(e.type, !1)), e;
    case 11:
      return (e = Gu(e.type.render, !1)), e;
    case 1:
      return (e = Gu(e.type, !0)), e;
    default:
      return "";
  }
}
function Kc(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case si:
      return "Fragment";
    case oi:
      return "Portal";
    case Vc:
      return "Profiler";
    case qd:
      return "StrictMode";
    case Gc:
      return "Suspense";
    case Qc:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case dg:
        return (e.displayName || "Context") + ".Consumer";
      case fg:
        return (e._context.displayName || "Context") + ".Provider";
      case Vd:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Gd:
        return (
          (t = e.displayName || null), t !== null ? t : Kc(e.type) || "Memo"
        );
      case $n:
        (t = e._payload), (e = e._init);
        try {
          return Kc(e(t));
        } catch {}
    }
  return null;
}
function qb(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Kc(t);
    case 8:
      return t === qd ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function sr(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function pg(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function Vb(e) {
  var t = pg(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var i = n.get,
      a = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return i.call(this);
        },
        set: function (o) {
          (r = "" + o), a.call(this, o);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (o) {
          r = "" + o;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function Qo(e) {
  e._valueTracker || (e._valueTracker = Vb(e));
}
function mg(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = pg(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function zs(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Yc(e, t) {
  var n = t.checked;
  return Ie({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function G0(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = sr(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function gg(e, t) {
  (t = t.checked), t != null && Hd(e, "checked", t, !1);
}
function Zc(e, t) {
  gg(e, t);
  var n = sr(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? Xc(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Xc(e, t.type, sr(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function Q0(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function Xc(e, t, n) {
  (t !== "number" || zs(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Ea = Array.isArray;
function Ei(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
    for (n = 0; n < e.length; n++)
      (i = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== i && (e[n].selected = i),
        i && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + sr(n), t = null, i = 0; i < e.length; i++) {
      if (e[i].value === n) {
        (e[i].selected = !0), r && (e[i].defaultSelected = !0);
        return;
      }
      t !== null || e[i].disabled || (t = e[i]);
    }
    t !== null && (t.selected = !0);
  }
}
function Jc(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(U(91));
  return Ie({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function K0(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(U(92));
      if (Ea(n)) {
        if (1 < n.length) throw Error(U(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: sr(n) };
}
function yg(e, t) {
  var n = sr(t.value),
    r = sr(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function Y0(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function vg(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function ef(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? vg(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var Ko,
  wg = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, i) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, i);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        Ko = Ko || document.createElement("div"),
          Ko.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Ko.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Va(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Aa = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Gb = ["Webkit", "ms", "Moz", "O"];
Object.keys(Aa).forEach(function (e) {
  Gb.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Aa[t] = Aa[e]);
  });
});
function bg(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Aa.hasOwnProperty(e) && Aa[e])
    ? ("" + t).trim()
    : t + "px";
}
function xg(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        i = bg(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : (e[n] = i);
    }
}
var Qb = Ie(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function tf(e, t) {
  if (t) {
    if (Qb[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(U(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(U(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(U(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(U(62));
  }
}
function nf(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var rf = null;
function Qd(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var af = null,
  Si = null,
  Ci = null;
function Z0(e) {
  if ((e = Do(e))) {
    if (typeof af != "function") throw Error(U(280));
    var t = e.stateNode;
    t && ((t = Vl(t)), af(e.stateNode, e.type, t));
  }
}
function Eg(e) {
  Si ? (Ci ? Ci.push(e) : (Ci = [e])) : (Si = e);
}
function Sg() {
  if (Si) {
    var e = Si,
      t = Ci;
    if (((Ci = Si = null), Z0(e), t)) for (e = 0; e < t.length; e++) Z0(t[e]);
  }
}
function Cg(e, t) {
  return e(t);
}
function _g() {}
var Qu = !1;
function kg(e, t, n) {
  if (Qu) return e(t, n);
  Qu = !0;
  try {
    return Cg(e, t, n);
  } finally {
    (Qu = !1), (Si !== null || Ci !== null) && (_g(), Sg());
  }
}
function Ga(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Vl(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(U(231, t, typeof n));
  return n;
}
var of = !1;
if (_n)
  try {
    var ca = {};
    Object.defineProperty(ca, "passive", {
      get: function () {
        of = !0;
      },
    }),
      window.addEventListener("test", ca, ca),
      window.removeEventListener("test", ca, ca);
  } catch {
    of = !1;
  }
function Kb(e, t, n, r, i, a, o, s, l) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (c) {
    this.onError(c);
  }
}
var Ta = !1,
  Ws = null,
  Hs = !1,
  sf = null,
  Yb = {
    onError: function (e) {
      (Ta = !0), (Ws = e);
    },
  };
function Zb(e, t, n, r, i, a, o, s, l) {
  (Ta = !1), (Ws = null), Kb.apply(Yb, arguments);
}
function Xb(e, t, n, r, i, a, o, s, l) {
  if ((Zb.apply(this, arguments), Ta)) {
    if (Ta) {
      var u = Ws;
      (Ta = !1), (Ws = null);
    } else throw Error(U(198));
    Hs || ((Hs = !0), (sf = u));
  }
}
function Kr(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Ng(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function X0(e) {
  if (Kr(e) !== e) throw Error(U(188));
}
function Jb(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Kr(e)), t === null)) throw Error(U(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var i = n.return;
    if (i === null) break;
    var a = i.alternate;
    if (a === null) {
      if (((r = i.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (i.child === a.child) {
      for (a = i.child; a; ) {
        if (a === n) return X0(i), e;
        if (a === r) return X0(i), t;
        a = a.sibling;
      }
      throw Error(U(188));
    }
    if (n.return !== r.return) (n = i), (r = a);
    else {
      for (var o = !1, s = i.child; s; ) {
        if (s === n) {
          (o = !0), (n = i), (r = a);
          break;
        }
        if (s === r) {
          (o = !0), (r = i), (n = a);
          break;
        }
        s = s.sibling;
      }
      if (!o) {
        for (s = a.child; s; ) {
          if (s === n) {
            (o = !0), (n = a), (r = i);
            break;
          }
          if (s === r) {
            (o = !0), (r = a), (n = i);
            break;
          }
          s = s.sibling;
        }
        if (!o) throw Error(U(189));
      }
    }
    if (n.alternate !== r) throw Error(U(190));
  }
  if (n.tag !== 3) throw Error(U(188));
  return n.stateNode.current === n ? e : t;
}
function Dg(e) {
  return (e = Jb(e)), e !== null ? Pg(e) : null;
}
function Pg(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Pg(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Ag = jt.unstable_scheduleCallback,
  J0 = jt.unstable_cancelCallback,
  e3 = jt.unstable_shouldYield,
  t3 = jt.unstable_requestPaint,
  Be = jt.unstable_now,
  n3 = jt.unstable_getCurrentPriorityLevel,
  Kd = jt.unstable_ImmediatePriority,
  Tg = jt.unstable_UserBlockingPriority,
  qs = jt.unstable_NormalPriority,
  r3 = jt.unstable_LowPriority,
  Og = jt.unstable_IdlePriority,
  zl = null,
  gn = null;
function i3(e) {
  if (gn && typeof gn.onCommitFiberRoot == "function")
    try {
      gn.onCommitFiberRoot(zl, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Jt = Math.clz32 ? Math.clz32 : s3,
  a3 = Math.log,
  o3 = Math.LN2;
function s3(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((a3(e) / o3) | 0)) | 0;
}
var Yo = 64,
  Zo = 4194304;
function Sa(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Vs(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    i = e.suspendedLanes,
    a = e.pingedLanes,
    o = n & 268435455;
  if (o !== 0) {
    var s = o & ~i;
    s !== 0 ? (r = Sa(s)) : ((a &= o), a !== 0 && (r = Sa(a)));
  } else (o = n & ~i), o !== 0 ? (r = Sa(o)) : a !== 0 && (r = Sa(a));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & i) &&
    ((i = r & -r), (a = t & -t), i >= a || (i === 16 && (a & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - Jt(t)), (i = 1 << n), (r |= e[n]), (t &= ~i);
  return r;
}
function l3(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function u3(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      i = e.expirationTimes,
      a = e.pendingLanes;
    0 < a;

  ) {
    var o = 31 - Jt(a),
      s = 1 << o,
      l = i[o];
    l === -1
      ? (!(s & n) || s & r) && (i[o] = l3(s, t))
      : l <= t && (e.expiredLanes |= s),
      (a &= ~s);
  }
}
function lf(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function jg() {
  var e = Yo;
  return (Yo <<= 1), !(Yo & 4194240) && (Yo = 64), e;
}
function Ku(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function ko(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Jt(t)),
    (e[t] = n);
}
function c3(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var i = 31 - Jt(n),
      a = 1 << i;
    (t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~a);
  }
}
function Yd(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Jt(n),
      i = 1 << r;
    (i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i);
  }
}
var ye = 0;
function Ig(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var Lg,
  Zd,
  Fg,
  Ug,
  Mg,
  uf = !1,
  Xo = [],
  Zn = null,
  Xn = null,
  Jn = null,
  Qa = new Map(),
  Ka = new Map(),
  Hn = [],
  f3 =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function ep(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Zn = null;
      break;
    case "dragenter":
    case "dragleave":
      Xn = null;
      break;
    case "mouseover":
    case "mouseout":
      Jn = null;
      break;
    case "pointerover":
    case "pointerout":
      Qa.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Ka.delete(t.pointerId);
  }
}
function fa(e, t, n, r, i, a) {
  return e === null || e.nativeEvent !== a
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: a,
        targetContainers: [i],
      }),
      t !== null && ((t = Do(t)), t !== null && Zd(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      i !== null && t.indexOf(i) === -1 && t.push(i),
      e);
}
function d3(e, t, n, r, i) {
  switch (t) {
    case "focusin":
      return (Zn = fa(Zn, e, t, n, r, i)), !0;
    case "dragenter":
      return (Xn = fa(Xn, e, t, n, r, i)), !0;
    case "mouseover":
      return (Jn = fa(Jn, e, t, n, r, i)), !0;
    case "pointerover":
      var a = i.pointerId;
      return Qa.set(a, fa(Qa.get(a) || null, e, t, n, r, i)), !0;
    case "gotpointercapture":
      return (
        (a = i.pointerId), Ka.set(a, fa(Ka.get(a) || null, e, t, n, r, i)), !0
      );
  }
  return !1;
}
function Rg(e) {
  var t = Pr(e.target);
  if (t !== null) {
    var n = Kr(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Ng(n)), t !== null)) {
          (e.blockedOn = t),
            Mg(e.priority, function () {
              Fg(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function ks(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = cf(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (rf = r), n.target.dispatchEvent(r), (rf = null);
    } else return (t = Do(n)), t !== null && Zd(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function tp(e, t, n) {
  ks(e) && n.delete(t);
}
function h3() {
  (uf = !1),
    Zn !== null && ks(Zn) && (Zn = null),
    Xn !== null && ks(Xn) && (Xn = null),
    Jn !== null && ks(Jn) && (Jn = null),
    Qa.forEach(tp),
    Ka.forEach(tp);
}
function da(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    uf ||
      ((uf = !0),
      jt.unstable_scheduleCallback(jt.unstable_NormalPriority, h3)));
}
function Ya(e) {
  function t(i) {
    return da(i, e);
  }
  if (0 < Xo.length) {
    da(Xo[0], e);
    for (var n = 1; n < Xo.length; n++) {
      var r = Xo[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Zn !== null && da(Zn, e),
      Xn !== null && da(Xn, e),
      Jn !== null && da(Jn, e),
      Qa.forEach(t),
      Ka.forEach(t),
      n = 0;
    n < Hn.length;
    n++
  )
    (r = Hn[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Hn.length && ((n = Hn[0]), n.blockedOn === null); )
    Rg(n), n.blockedOn === null && Hn.shift();
}
var _i = In.ReactCurrentBatchConfig,
  Gs = !0;
function p3(e, t, n, r) {
  var i = ye,
    a = _i.transition;
  _i.transition = null;
  try {
    (ye = 1), Xd(e, t, n, r);
  } finally {
    (ye = i), (_i.transition = a);
  }
}
function m3(e, t, n, r) {
  var i = ye,
    a = _i.transition;
  _i.transition = null;
  try {
    (ye = 4), Xd(e, t, n, r);
  } finally {
    (ye = i), (_i.transition = a);
  }
}
function Xd(e, t, n, r) {
  if (Gs) {
    var i = cf(e, t, n, r);
    if (i === null) ac(e, t, r, Qs, n), ep(e, r);
    else if (d3(i, e, t, n, r)) r.stopPropagation();
    else if ((ep(e, r), t & 4 && -1 < f3.indexOf(e))) {
      for (; i !== null; ) {
        var a = Do(i);
        if (
          (a !== null && Lg(a),
          (a = cf(e, t, n, r)),
          a === null && ac(e, t, r, Qs, n),
          a === i)
        )
          break;
        i = a;
      }
      i !== null && r.stopPropagation();
    } else ac(e, t, r, null, n);
  }
}
var Qs = null;
function cf(e, t, n, r) {
  if (((Qs = null), (e = Qd(r)), (e = Pr(e)), e !== null))
    if (((t = Kr(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Ng(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (Qs = e), null;
}
function Bg(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (n3()) {
        case Kd:
          return 1;
        case Tg:
          return 4;
        case qs:
        case r3:
          return 16;
        case Og:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Gn = null,
  Jd = null,
  Ns = null;
function $g() {
  if (Ns) return Ns;
  var e,
    t = Jd,
    n = t.length,
    r,
    i = "value" in Gn ? Gn.value : Gn.textContent,
    a = i.length;
  for (e = 0; e < n && t[e] === i[e]; e++);
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
  return (Ns = i.slice(e, 1 < r ? 1 - r : void 0));
}
function Ds(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Jo() {
  return !0;
}
function np() {
  return !1;
}
function Lt(e) {
  function t(n, r, i, a, o) {
    (this._reactName = n),
      (this._targetInst = i),
      (this.type = r),
      (this.nativeEvent = a),
      (this.target = o),
      (this.currentTarget = null);
    for (var s in e)
      e.hasOwnProperty(s) && ((n = e[s]), (this[s] = n ? n(a) : a[s]));
    return (
      (this.isDefaultPrevented = (
        a.defaultPrevented != null ? a.defaultPrevented : a.returnValue === !1
      )
        ? Jo
        : np),
      (this.isPropagationStopped = np),
      this
    );
  }
  return (
    Ie(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Jo));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Jo));
      },
      persist: function () {},
      isPersistent: Jo,
    }),
    t
  );
}
var Ki = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  eh = Lt(Ki),
  No = Ie({}, Ki, { view: 0, detail: 0 }),
  g3 = Lt(No),
  Yu,
  Zu,
  ha,
  Wl = Ie({}, No, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: th,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== ha &&
            (ha && e.type === "mousemove"
              ? ((Yu = e.screenX - ha.screenX), (Zu = e.screenY - ha.screenY))
              : (Zu = Yu = 0),
            (ha = e)),
          Yu);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Zu;
    },
  }),
  rp = Lt(Wl),
  y3 = Ie({}, Wl, { dataTransfer: 0 }),
  v3 = Lt(y3),
  w3 = Ie({}, No, { relatedTarget: 0 }),
  Xu = Lt(w3),
  b3 = Ie({}, Ki, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  x3 = Lt(b3),
  E3 = Ie({}, Ki, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  S3 = Lt(E3),
  C3 = Ie({}, Ki, { data: 0 }),
  ip = Lt(C3),
  _3 = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  k3 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  N3 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function D3(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = N3[e]) ? !!t[e] : !1;
}
function th() {
  return D3;
}
var P3 = Ie({}, No, {
    key: function (e) {
      if (e.key) {
        var t = _3[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Ds(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? k3[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: th,
    charCode: function (e) {
      return e.type === "keypress" ? Ds(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Ds(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  A3 = Lt(P3),
  T3 = Ie({}, Wl, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  ap = Lt(T3),
  O3 = Ie({}, No, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: th,
  }),
  j3 = Lt(O3),
  I3 = Ie({}, Ki, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  L3 = Lt(I3),
  F3 = Ie({}, Wl, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  U3 = Lt(F3),
  M3 = [9, 13, 27, 32],
  nh = _n && "CompositionEvent" in window,
  Oa = null;
_n && "documentMode" in document && (Oa = document.documentMode);
var R3 = _n && "TextEvent" in window && !Oa,
  zg = _n && (!nh || (Oa && 8 < Oa && 11 >= Oa)),
  op = String.fromCharCode(32),
  sp = !1;
function Wg(e, t) {
  switch (e) {
    case "keyup":
      return M3.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Hg(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var li = !1;
function B3(e, t) {
  switch (e) {
    case "compositionend":
      return Hg(t);
    case "keypress":
      return t.which !== 32 ? null : ((sp = !0), op);
    case "textInput":
      return (e = t.data), e === op && sp ? null : e;
    default:
      return null;
  }
}
function $3(e, t) {
  if (li)
    return e === "compositionend" || (!nh && Wg(e, t))
      ? ((e = $g()), (Ns = Jd = Gn = null), (li = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return zg && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var z3 = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function lp(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!z3[e.type] : t === "textarea";
}
function qg(e, t, n, r) {
  Eg(r),
    (t = Ks(t, "onChange")),
    0 < t.length &&
      ((n = new eh("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var ja = null,
  Za = null;
function W3(e) {
  ny(e, 0);
}
function Hl(e) {
  var t = fi(e);
  if (mg(t)) return e;
}
function H3(e, t) {
  if (e === "change") return t;
}
var Vg = !1;
if (_n) {
  var Ju;
  if (_n) {
    var ec = "oninput" in document;
    if (!ec) {
      var up = document.createElement("div");
      up.setAttribute("oninput", "return;"),
        (ec = typeof up.oninput == "function");
    }
    Ju = ec;
  } else Ju = !1;
  Vg = Ju && (!document.documentMode || 9 < document.documentMode);
}
function cp() {
  ja && (ja.detachEvent("onpropertychange", Gg), (Za = ja = null));
}
function Gg(e) {
  if (e.propertyName === "value" && Hl(Za)) {
    var t = [];
    qg(t, Za, e, Qd(e)), kg(W3, t);
  }
}
function q3(e, t, n) {
  e === "focusin"
    ? (cp(), (ja = t), (Za = n), ja.attachEvent("onpropertychange", Gg))
    : e === "focusout" && cp();
}
function V3(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Hl(Za);
}
function G3(e, t) {
  if (e === "click") return Hl(t);
}
function Q3(e, t) {
  if (e === "input" || e === "change") return Hl(t);
}
function K3(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var nn = typeof Object.is == "function" ? Object.is : K3;
function Xa(e, t) {
  if (nn(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var i = n[r];
    if (!qc.call(t, i) || !nn(e[i], t[i])) return !1;
  }
  return !0;
}
function fp(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function dp(e, t) {
  var n = fp(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = fp(n);
  }
}
function Qg(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? Qg(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function Kg() {
  for (var e = window, t = zs(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = zs(e.document);
  }
  return t;
}
function rh(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function Y3(e) {
  var t = Kg(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Qg(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && rh(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var i = n.textContent.length,
          a = Math.min(r.start, i);
        (r = r.end === void 0 ? a : Math.min(r.end, i)),
          !e.extend && a > r && ((i = r), (r = a), (a = i)),
          (i = dp(n, a));
        var o = dp(n, r);
        i &&
          o &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== i.node ||
            e.anchorOffset !== i.offset ||
            e.focusNode !== o.node ||
            e.focusOffset !== o.offset) &&
          ((t = t.createRange()),
          t.setStart(i.node, i.offset),
          e.removeAllRanges(),
          a > r
            ? (e.addRange(t), e.extend(o.node, o.offset))
            : (t.setEnd(o.node, o.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var Z3 = _n && "documentMode" in document && 11 >= document.documentMode,
  ui = null,
  ff = null,
  Ia = null,
  df = !1;
function hp(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  df ||
    ui == null ||
    ui !== zs(r) ||
    ((r = ui),
    "selectionStart" in r && rh(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Ia && Xa(Ia, r)) ||
      ((Ia = r),
      (r = Ks(ff, "onSelect")),
      0 < r.length &&
        ((t = new eh("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = ui))));
}
function es(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var ci = {
    animationend: es("Animation", "AnimationEnd"),
    animationiteration: es("Animation", "AnimationIteration"),
    animationstart: es("Animation", "AnimationStart"),
    transitionend: es("Transition", "TransitionEnd"),
  },
  tc = {},
  Yg = {};
_n &&
  ((Yg = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete ci.animationend.animation,
    delete ci.animationiteration.animation,
    delete ci.animationstart.animation),
  "TransitionEvent" in window || delete ci.transitionend.transition);
function ql(e) {
  if (tc[e]) return tc[e];
  if (!ci[e]) return e;
  var t = ci[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Yg) return (tc[e] = t[n]);
  return e;
}
var Zg = ql("animationend"),
  Xg = ql("animationiteration"),
  Jg = ql("animationstart"),
  ey = ql("transitionend"),
  ty = new Map(),
  pp =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function pr(e, t) {
  ty.set(e, t), Qr(t, [e]);
}
for (var nc = 0; nc < pp.length; nc++) {
  var rc = pp[nc],
    X3 = rc.toLowerCase(),
    J3 = rc[0].toUpperCase() + rc.slice(1);
  pr(X3, "on" + J3);
}
pr(Zg, "onAnimationEnd");
pr(Xg, "onAnimationIteration");
pr(Jg, "onAnimationStart");
pr("dblclick", "onDoubleClick");
pr("focusin", "onFocus");
pr("focusout", "onBlur");
pr(ey, "onTransitionEnd");
Oi("onMouseEnter", ["mouseout", "mouseover"]);
Oi("onMouseLeave", ["mouseout", "mouseover"]);
Oi("onPointerEnter", ["pointerout", "pointerover"]);
Oi("onPointerLeave", ["pointerout", "pointerover"]);
Qr(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
Qr(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
Qr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Qr(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
Qr(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
Qr(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Ca =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  ex = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ca));
function mp(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), Xb(r, t, void 0, e), (e.currentTarget = null);
}
function ny(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      i = r.event;
    r = r.listeners;
    e: {
      var a = void 0;
      if (t)
        for (var o = r.length - 1; 0 <= o; o--) {
          var s = r[o],
            l = s.instance,
            u = s.currentTarget;
          if (((s = s.listener), l !== a && i.isPropagationStopped())) break e;
          mp(i, s, u), (a = l);
        }
      else
        for (o = 0; o < r.length; o++) {
          if (
            ((s = r[o]),
            (l = s.instance),
            (u = s.currentTarget),
            (s = s.listener),
            l !== a && i.isPropagationStopped())
          )
            break e;
          mp(i, s, u), (a = l);
        }
    }
  }
  if (Hs) throw ((e = sf), (Hs = !1), (sf = null), e);
}
function _e(e, t) {
  var n = t[yf];
  n === void 0 && (n = t[yf] = new Set());
  var r = e + "__bubble";
  n.has(r) || (ry(t, e, 2, !1), n.add(r));
}
function ic(e, t, n) {
  var r = 0;
  t && (r |= 4), ry(n, e, r, t);
}
var ts = "_reactListening" + Math.random().toString(36).slice(2);
function Ja(e) {
  if (!e[ts]) {
    (e[ts] = !0),
      cg.forEach(function (n) {
        n !== "selectionchange" && (ex.has(n) || ic(n, !1, e), ic(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[ts] || ((t[ts] = !0), ic("selectionchange", !1, t));
  }
}
function ry(e, t, n, r) {
  switch (Bg(t)) {
    case 1:
      var i = p3;
      break;
    case 4:
      i = m3;
      break;
    default:
      i = Xd;
  }
  (n = i.bind(null, t, n, e)),
    (i = void 0),
    !of ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (i = !0),
    r
      ? i !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: i })
        : e.addEventListener(t, n, !0)
      : i !== void 0
      ? e.addEventListener(t, n, { passive: i })
      : e.addEventListener(t, n, !1);
}
function ac(e, t, n, r, i) {
  var a = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var o = r.tag;
      if (o === 3 || o === 4) {
        var s = r.stateNode.containerInfo;
        if (s === i || (s.nodeType === 8 && s.parentNode === i)) break;
        if (o === 4)
          for (o = r.return; o !== null; ) {
            var l = o.tag;
            if (
              (l === 3 || l === 4) &&
              ((l = o.stateNode.containerInfo),
              l === i || (l.nodeType === 8 && l.parentNode === i))
            )
              return;
            o = o.return;
          }
        for (; s !== null; ) {
          if (((o = Pr(s)), o === null)) return;
          if (((l = o.tag), l === 5 || l === 6)) {
            r = a = o;
            continue e;
          }
          s = s.parentNode;
        }
      }
      r = r.return;
    }
  kg(function () {
    var u = a,
      c = Qd(n),
      d = [];
    e: {
      var m = ty.get(e);
      if (m !== void 0) {
        var v = eh,
          b = e;
        switch (e) {
          case "keypress":
            if (Ds(n) === 0) break e;
          case "keydown":
          case "keyup":
            v = A3;
            break;
          case "focusin":
            (b = "focus"), (v = Xu);
            break;
          case "focusout":
            (b = "blur"), (v = Xu);
            break;
          case "beforeblur":
          case "afterblur":
            v = Xu;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = rp;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = v3;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = j3;
            break;
          case Zg:
          case Xg:
          case Jg:
            v = x3;
            break;
          case ey:
            v = L3;
            break;
          case "scroll":
            v = g3;
            break;
          case "wheel":
            v = U3;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = S3;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = ap;
        }
        var _ = (t & 4) !== 0,
          C = !_ && e === "scroll",
          x = _ ? (m !== null ? m + "Capture" : null) : m;
        _ = [];
        for (var g = u, w; g !== null; ) {
          w = g;
          var E = w.stateNode;
          if (
            (w.tag === 5 &&
              E !== null &&
              ((w = E),
              x !== null && ((E = Ga(g, x)), E != null && _.push(eo(g, E, w)))),
            C)
          )
            break;
          g = g.return;
        }
        0 < _.length &&
          ((m = new v(m, b, null, n, c)), d.push({ event: m, listeners: _ }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((m = e === "mouseover" || e === "pointerover"),
          (v = e === "mouseout" || e === "pointerout"),
          m &&
            n !== rf &&
            (b = n.relatedTarget || n.fromElement) &&
            (Pr(b) || b[kn]))
        )
          break e;
        if (
          (v || m) &&
          ((m =
            c.window === c
              ? c
              : (m = c.ownerDocument)
              ? m.defaultView || m.parentWindow
              : window),
          v
            ? ((b = n.relatedTarget || n.toElement),
              (v = u),
              (b = b ? Pr(b) : null),
              b !== null &&
                ((C = Kr(b)), b !== C || (b.tag !== 5 && b.tag !== 6)) &&
                (b = null))
            : ((v = null), (b = u)),
          v !== b)
        ) {
          if (
            ((_ = rp),
            (E = "onMouseLeave"),
            (x = "onMouseEnter"),
            (g = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((_ = ap),
              (E = "onPointerLeave"),
              (x = "onPointerEnter"),
              (g = "pointer")),
            (C = v == null ? m : fi(v)),
            (w = b == null ? m : fi(b)),
            (m = new _(E, g + "leave", v, n, c)),
            (m.target = C),
            (m.relatedTarget = w),
            (E = null),
            Pr(c) === u &&
              ((_ = new _(x, g + "enter", b, n, c)),
              (_.target = w),
              (_.relatedTarget = C),
              (E = _)),
            (C = E),
            v && b)
          )
            t: {
              for (_ = v, x = b, g = 0, w = _; w; w = ei(w)) g++;
              for (w = 0, E = x; E; E = ei(E)) w++;
              for (; 0 < g - w; ) (_ = ei(_)), g--;
              for (; 0 < w - g; ) (x = ei(x)), w--;
              for (; g--; ) {
                if (_ === x || (x !== null && _ === x.alternate)) break t;
                (_ = ei(_)), (x = ei(x));
              }
              _ = null;
            }
          else _ = null;
          v !== null && gp(d, m, v, _, !1),
            b !== null && C !== null && gp(d, C, b, _, !0);
        }
      }
      e: {
        if (
          ((m = u ? fi(u) : window),
          (v = m.nodeName && m.nodeName.toLowerCase()),
          v === "select" || (v === "input" && m.type === "file"))
        )
          var N = H3;
        else if (lp(m))
          if (Vg) N = Q3;
          else {
            N = V3;
            var D = q3;
          }
        else
          (v = m.nodeName) &&
            v.toLowerCase() === "input" &&
            (m.type === "checkbox" || m.type === "radio") &&
            (N = G3);
        if (N && (N = N(e, u))) {
          qg(d, N, n, c);
          break e;
        }
        D && D(e, m, u),
          e === "focusout" &&
            (D = m._wrapperState) &&
            D.controlled &&
            m.type === "number" &&
            Xc(m, "number", m.value);
      }
      switch (((D = u ? fi(u) : window), e)) {
        case "focusin":
          (lp(D) || D.contentEditable === "true") &&
            ((ui = D), (ff = u), (Ia = null));
          break;
        case "focusout":
          Ia = ff = ui = null;
          break;
        case "mousedown":
          df = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (df = !1), hp(d, n, c);
          break;
        case "selectionchange":
          if (Z3) break;
        case "keydown":
        case "keyup":
          hp(d, n, c);
      }
      var f;
      if (nh)
        e: {
          switch (e) {
            case "compositionstart":
              var k = "onCompositionStart";
              break e;
            case "compositionend":
              k = "onCompositionEnd";
              break e;
            case "compositionupdate":
              k = "onCompositionUpdate";
              break e;
          }
          k = void 0;
        }
      else
        li
          ? Wg(e, n) && (k = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (k = "onCompositionStart");
      k &&
        (zg &&
          n.locale !== "ko" &&
          (li || k !== "onCompositionStart"
            ? k === "onCompositionEnd" && li && (f = $g())
            : ((Gn = c),
              (Jd = "value" in Gn ? Gn.value : Gn.textContent),
              (li = !0))),
        (D = Ks(u, k)),
        0 < D.length &&
          ((k = new ip(k, e, null, n, c)),
          d.push({ event: k, listeners: D }),
          f ? (k.data = f) : ((f = Hg(n)), f !== null && (k.data = f)))),
        (f = R3 ? B3(e, n) : $3(e, n)) &&
          ((u = Ks(u, "onBeforeInput")),
          0 < u.length &&
            ((c = new ip("onBeforeInput", "beforeinput", null, n, c)),
            d.push({ event: c, listeners: u }),
            (c.data = f)));
    }
    ny(d, t);
  });
}
function eo(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Ks(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var i = e,
      a = i.stateNode;
    i.tag === 5 &&
      a !== null &&
      ((i = a),
      (a = Ga(e, n)),
      a != null && r.unshift(eo(e, a, i)),
      (a = Ga(e, t)),
      a != null && r.push(eo(e, a, i))),
      (e = e.return);
  }
  return r;
}
function ei(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function gp(e, t, n, r, i) {
  for (var a = t._reactName, o = []; n !== null && n !== r; ) {
    var s = n,
      l = s.alternate,
      u = s.stateNode;
    if (l !== null && l === r) break;
    s.tag === 5 &&
      u !== null &&
      ((s = u),
      i
        ? ((l = Ga(n, a)), l != null && o.unshift(eo(n, l, s)))
        : i || ((l = Ga(n, a)), l != null && o.push(eo(n, l, s)))),
      (n = n.return);
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var tx = /\r\n?/g,
  nx = /\u0000|\uFFFD/g;
function yp(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      tx,
      `
`
    )
    .replace(nx, "");
}
function ns(e, t, n) {
  if (((t = yp(t)), yp(e) !== t && n)) throw Error(U(425));
}
function Ys() {}
var hf = null,
  pf = null;
function mf(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var gf = typeof setTimeout == "function" ? setTimeout : void 0,
  rx = typeof clearTimeout == "function" ? clearTimeout : void 0,
  vp = typeof Promise == "function" ? Promise : void 0,
  ix =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof vp < "u"
      ? function (e) {
          return vp.resolve(null).then(e).catch(ax);
        }
      : gf;
function ax(e) {
  setTimeout(function () {
    throw e;
  });
}
function oc(e, t) {
  var n = t,
    r = 0;
  do {
    var i = n.nextSibling;
    if ((e.removeChild(n), i && i.nodeType === 8))
      if (((n = i.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(i), Ya(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = i;
  } while (n);
  Ya(t);
}
function er(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function wp(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Yi = Math.random().toString(36).slice(2),
  pn = "__reactFiber$" + Yi,
  to = "__reactProps$" + Yi,
  kn = "__reactContainer$" + Yi,
  yf = "__reactEvents$" + Yi,
  ox = "__reactListeners$" + Yi,
  sx = "__reactHandles$" + Yi;
function Pr(e) {
  var t = e[pn];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[kn] || n[pn])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = wp(e); e !== null; ) {
          if ((n = e[pn])) return n;
          e = wp(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function Do(e) {
  return (
    (e = e[pn] || e[kn]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function fi(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(U(33));
}
function Vl(e) {
  return e[to] || null;
}
var vf = [],
  di = -1;
function mr(e) {
  return { current: e };
}
function Ne(e) {
  0 > di || ((e.current = vf[di]), (vf[di] = null), di--);
}
function Se(e, t) {
  di++, (vf[di] = e.current), (e.current = t);
}
var lr = {},
  ct = mr(lr),
  bt = mr(!1),
  Br = lr;
function ji(e, t) {
  var n = e.type.contextTypes;
  if (!n) return lr;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i = {},
    a;
  for (a in n) i[a] = t[a];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    i
  );
}
function xt(e) {
  return (e = e.childContextTypes), e != null;
}
function Zs() {
  Ne(bt), Ne(ct);
}
function bp(e, t, n) {
  if (ct.current !== lr) throw Error(U(168));
  Se(ct, t), Se(bt, n);
}
function iy(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var i in r) if (!(i in t)) throw Error(U(108, qb(e) || "Unknown", i));
  return Ie({}, n, r);
}
function Xs(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || lr),
    (Br = ct.current),
    Se(ct, e),
    Se(bt, bt.current),
    !0
  );
}
function xp(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(U(169));
  n
    ? ((e = iy(e, t, Br)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      Ne(bt),
      Ne(ct),
      Se(ct, e))
    : Ne(bt),
    Se(bt, n);
}
var wn = null,
  Gl = !1,
  sc = !1;
function ay(e) {
  wn === null ? (wn = [e]) : wn.push(e);
}
function lx(e) {
  (Gl = !0), ay(e);
}
function gr() {
  if (!sc && wn !== null) {
    sc = !0;
    var e = 0,
      t = ye;
    try {
      var n = wn;
      for (ye = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (wn = null), (Gl = !1);
    } catch (i) {
      throw (wn !== null && (wn = wn.slice(e + 1)), Ag(Kd, gr), i);
    } finally {
      (ye = t), (sc = !1);
    }
  }
  return null;
}
var hi = [],
  pi = 0,
  Js = null,
  el = 0,
  Mt = [],
  Rt = 0,
  $r = null,
  En = 1,
  Sn = "";
function _r(e, t) {
  (hi[pi++] = el), (hi[pi++] = Js), (Js = e), (el = t);
}
function oy(e, t, n) {
  (Mt[Rt++] = En), (Mt[Rt++] = Sn), (Mt[Rt++] = $r), ($r = e);
  var r = En;
  e = Sn;
  var i = 32 - Jt(r) - 1;
  (r &= ~(1 << i)), (n += 1);
  var a = 32 - Jt(t) + i;
  if (30 < a) {
    var o = i - (i % 5);
    (a = (r & ((1 << o) - 1)).toString(32)),
      (r >>= o),
      (i -= o),
      (En = (1 << (32 - Jt(t) + i)) | (n << i) | r),
      (Sn = a + e);
  } else (En = (1 << a) | (n << i) | r), (Sn = e);
}
function ih(e) {
  e.return !== null && (_r(e, 1), oy(e, 1, 0));
}
function ah(e) {
  for (; e === Js; )
    (Js = hi[--pi]), (hi[pi] = null), (el = hi[--pi]), (hi[pi] = null);
  for (; e === $r; )
    ($r = Mt[--Rt]),
      (Mt[Rt] = null),
      (Sn = Mt[--Rt]),
      (Mt[Rt] = null),
      (En = Mt[--Rt]),
      (Mt[Rt] = null);
}
var Tt = null,
  Dt = null,
  Ae = !1,
  Kt = null;
function sy(e, t) {
  var n = Bt(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function Ep(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Tt = e), (Dt = er(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Tt = e), (Dt = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = $r !== null ? { id: En, overflow: Sn } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Bt(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Tt = e),
            (Dt = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function wf(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function bf(e) {
  if (Ae) {
    var t = Dt;
    if (t) {
      var n = t;
      if (!Ep(e, t)) {
        if (wf(e)) throw Error(U(418));
        t = er(n.nextSibling);
        var r = Tt;
        t && Ep(e, t)
          ? sy(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (Ae = !1), (Tt = e));
      }
    } else {
      if (wf(e)) throw Error(U(418));
      (e.flags = (e.flags & -4097) | 2), (Ae = !1), (Tt = e);
    }
  }
}
function Sp(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Tt = e;
}
function rs(e) {
  if (e !== Tt) return !1;
  if (!Ae) return Sp(e), (Ae = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !mf(e.type, e.memoizedProps))),
    t && (t = Dt))
  ) {
    if (wf(e)) throw (ly(), Error(U(418)));
    for (; t; ) sy(e, t), (t = er(t.nextSibling));
  }
  if ((Sp(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(U(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Dt = er(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Dt = null;
    }
  } else Dt = Tt ? er(e.stateNode.nextSibling) : null;
  return !0;
}
function ly() {
  for (var e = Dt; e; ) e = er(e.nextSibling);
}
function Ii() {
  (Dt = Tt = null), (Ae = !1);
}
function oh(e) {
  Kt === null ? (Kt = [e]) : Kt.push(e);
}
var ux = In.ReactCurrentBatchConfig;
function Vt(e, t) {
  if (e && e.defaultProps) {
    (t = Ie({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
var tl = mr(null),
  nl = null,
  mi = null,
  sh = null;
function lh() {
  sh = mi = nl = null;
}
function uh(e) {
  var t = tl.current;
  Ne(tl), (e._currentValue = t);
}
function xf(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function ki(e, t) {
  (nl = e),
    (sh = mi = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (wt = !0), (e.firstContext = null));
}
function zt(e) {
  var t = e._currentValue;
  if (sh !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), mi === null)) {
      if (nl === null) throw Error(U(308));
      (mi = e), (nl.dependencies = { lanes: 0, firstContext: e });
    } else mi = mi.next = e;
  return t;
}
var Ar = null;
function ch(e) {
  Ar === null ? (Ar = [e]) : Ar.push(e);
}
function uy(e, t, n, r) {
  var i = t.interleaved;
  return (
    i === null ? ((n.next = n), ch(t)) : ((n.next = i.next), (i.next = n)),
    (t.interleaved = n),
    Nn(e, r)
  );
}
function Nn(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var zn = !1;
function fh(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function cy(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function Cn(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function tr(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), de & 2)) {
    var i = r.pending;
    return (
      i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
      (r.pending = t),
      Nn(e, n)
    );
  }
  return (
    (i = r.interleaved),
    i === null ? ((t.next = t), ch(r)) : ((t.next = i.next), (i.next = t)),
    (r.interleaved = t),
    Nn(e, n)
  );
}
function Ps(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Yd(e, n);
  }
}
function Cp(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var i = null,
      a = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var o = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        a === null ? (i = a = o) : (a = a.next = o), (n = n.next);
      } while (n !== null);
      a === null ? (i = a = t) : (a = a.next = t);
    } else i = a = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: a,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function rl(e, t, n, r) {
  var i = e.updateQueue;
  zn = !1;
  var a = i.firstBaseUpdate,
    o = i.lastBaseUpdate,
    s = i.shared.pending;
  if (s !== null) {
    i.shared.pending = null;
    var l = s,
      u = l.next;
    (l.next = null), o === null ? (a = u) : (o.next = u), (o = l);
    var c = e.alternate;
    c !== null &&
      ((c = c.updateQueue),
      (s = c.lastBaseUpdate),
      s !== o &&
        (s === null ? (c.firstBaseUpdate = u) : (s.next = u),
        (c.lastBaseUpdate = l)));
  }
  if (a !== null) {
    var d = i.baseState;
    (o = 0), (c = u = l = null), (s = a);
    do {
      var m = s.lane,
        v = s.eventTime;
      if ((r & m) === m) {
        c !== null &&
          (c = c.next =
            {
              eventTime: v,
              lane: 0,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null,
            });
        e: {
          var b = e,
            _ = s;
          switch (((m = t), (v = n), _.tag)) {
            case 1:
              if (((b = _.payload), typeof b == "function")) {
                d = b.call(v, d, m);
                break e;
              }
              d = b;
              break e;
            case 3:
              b.flags = (b.flags & -65537) | 128;
            case 0:
              if (
                ((b = _.payload),
                (m = typeof b == "function" ? b.call(v, d, m) : b),
                m == null)
              )
                break e;
              d = Ie({}, d, m);
              break e;
            case 2:
              zn = !0;
          }
        }
        s.callback !== null &&
          s.lane !== 0 &&
          ((e.flags |= 64),
          (m = i.effects),
          m === null ? (i.effects = [s]) : m.push(s));
      } else
        (v = {
          eventTime: v,
          lane: m,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null,
        }),
          c === null ? ((u = c = v), (l = d)) : (c = c.next = v),
          (o |= m);
      if (((s = s.next), s === null)) {
        if (((s = i.shared.pending), s === null)) break;
        (m = s),
          (s = m.next),
          (m.next = null),
          (i.lastBaseUpdate = m),
          (i.shared.pending = null);
      }
    } while (1);
    if (
      (c === null && (l = d),
      (i.baseState = l),
      (i.firstBaseUpdate = u),
      (i.lastBaseUpdate = c),
      (t = i.shared.interleaved),
      t !== null)
    ) {
      i = t;
      do (o |= i.lane), (i = i.next);
      while (i !== t);
    } else a === null && (i.shared.lanes = 0);
    (Wr |= o), (e.lanes = o), (e.memoizedState = d);
  }
}
function _p(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        i = r.callback;
      if (i !== null) {
        if (((r.callback = null), (r = n), typeof i != "function"))
          throw Error(U(191, i));
        i.call(r);
      }
    }
}
var fy = new ug.Component().refs;
function Ef(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : Ie({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Ql = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Kr(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = pt(),
      i = rr(e),
      a = Cn(r, i);
    (a.payload = t),
      n != null && (a.callback = n),
      (t = tr(e, a, i)),
      t !== null && (en(t, e, i, r), Ps(t, e, i));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = pt(),
      i = rr(e),
      a = Cn(r, i);
    (a.tag = 1),
      (a.payload = t),
      n != null && (a.callback = n),
      (t = tr(e, a, i)),
      t !== null && (en(t, e, i, r), Ps(t, e, i));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = pt(),
      r = rr(e),
      i = Cn(n, r);
    (i.tag = 2),
      t != null && (i.callback = t),
      (t = tr(e, i, r)),
      t !== null && (en(t, e, r, n), Ps(t, e, r));
  },
};
function kp(e, t, n, r, i, a, o) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, a, o)
      : t.prototype && t.prototype.isPureReactComponent
      ? !Xa(n, r) || !Xa(i, a)
      : !0
  );
}
function dy(e, t, n) {
  var r = !1,
    i = lr,
    a = t.contextType;
  return (
    typeof a == "object" && a !== null
      ? (a = zt(a))
      : ((i = xt(t) ? Br : ct.current),
        (r = t.contextTypes),
        (a = (r = r != null) ? ji(e, i) : lr)),
    (t = new t(n, a)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Ql),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = a)),
    t
  );
}
function Np(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Ql.enqueueReplaceState(t, t.state, null);
}
function Sf(e, t, n, r) {
  var i = e.stateNode;
  (i.props = n), (i.state = e.memoizedState), (i.refs = fy), fh(e);
  var a = t.contextType;
  typeof a == "object" && a !== null
    ? (i.context = zt(a))
    : ((a = xt(t) ? Br : ct.current), (i.context = ji(e, a))),
    (i.state = e.memoizedState),
    (a = t.getDerivedStateFromProps),
    typeof a == "function" && (Ef(e, t, a, n), (i.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function" ||
      (typeof i.UNSAFE_componentWillMount != "function" &&
        typeof i.componentWillMount != "function") ||
      ((t = i.state),
      typeof i.componentWillMount == "function" && i.componentWillMount(),
      typeof i.UNSAFE_componentWillMount == "function" &&
        i.UNSAFE_componentWillMount(),
      t !== i.state && Ql.enqueueReplaceState(i, i.state, null),
      rl(e, n, i, r),
      (i.state = e.memoizedState)),
    typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
function pa(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(U(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(U(147, e));
      var i = r,
        a = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === a
        ? t.ref
        : ((t = function (o) {
            var s = i.refs;
            s === fy && (s = i.refs = {}),
              o === null ? delete s[a] : (s[a] = o);
          }),
          (t._stringRef = a),
          t);
    }
    if (typeof e != "string") throw Error(U(284));
    if (!n._owner) throw Error(U(290, e));
  }
  return e;
}
function is(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      U(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function Dp(e) {
  var t = e._init;
  return t(e._payload);
}
function hy(e) {
  function t(x, g) {
    if (e) {
      var w = x.deletions;
      w === null ? ((x.deletions = [g]), (x.flags |= 16)) : w.push(g);
    }
  }
  function n(x, g) {
    if (!e) return null;
    for (; g !== null; ) t(x, g), (g = g.sibling);
    return null;
  }
  function r(x, g) {
    for (x = new Map(); g !== null; )
      g.key !== null ? x.set(g.key, g) : x.set(g.index, g), (g = g.sibling);
    return x;
  }
  function i(x, g) {
    return (x = ir(x, g)), (x.index = 0), (x.sibling = null), x;
  }
  function a(x, g, w) {
    return (
      (x.index = w),
      e
        ? ((w = x.alternate),
          w !== null
            ? ((w = w.index), w < g ? ((x.flags |= 2), g) : w)
            : ((x.flags |= 2), g))
        : ((x.flags |= 1048576), g)
    );
  }
  function o(x) {
    return e && x.alternate === null && (x.flags |= 2), x;
  }
  function s(x, g, w, E) {
    return g === null || g.tag !== 6
      ? ((g = pc(w, x.mode, E)), (g.return = x), g)
      : ((g = i(g, w)), (g.return = x), g);
  }
  function l(x, g, w, E) {
    var N = w.type;
    return N === si
      ? c(x, g, w.props.children, E, w.key)
      : g !== null &&
        (g.elementType === N ||
          (typeof N == "object" &&
            N !== null &&
            N.$$typeof === $n &&
            Dp(N) === g.type))
      ? ((E = i(g, w.props)), (E.ref = pa(x, g, w)), (E.return = x), E)
      : ((E = Ls(w.type, w.key, w.props, null, x.mode, E)),
        (E.ref = pa(x, g, w)),
        (E.return = x),
        E);
  }
  function u(x, g, w, E) {
    return g === null ||
      g.tag !== 4 ||
      g.stateNode.containerInfo !== w.containerInfo ||
      g.stateNode.implementation !== w.implementation
      ? ((g = mc(w, x.mode, E)), (g.return = x), g)
      : ((g = i(g, w.children || [])), (g.return = x), g);
  }
  function c(x, g, w, E, N) {
    return g === null || g.tag !== 7
      ? ((g = Ur(w, x.mode, E, N)), (g.return = x), g)
      : ((g = i(g, w)), (g.return = x), g);
  }
  function d(x, g, w) {
    if ((typeof g == "string" && g !== "") || typeof g == "number")
      return (g = pc("" + g, x.mode, w)), (g.return = x), g;
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case Go:
          return (
            (w = Ls(g.type, g.key, g.props, null, x.mode, w)),
            (w.ref = pa(x, null, g)),
            (w.return = x),
            w
          );
        case oi:
          return (g = mc(g, x.mode, w)), (g.return = x), g;
        case $n:
          var E = g._init;
          return d(x, E(g._payload), w);
      }
      if (Ea(g) || ua(g))
        return (g = Ur(g, x.mode, w, null)), (g.return = x), g;
      is(x, g);
    }
    return null;
  }
  function m(x, g, w, E) {
    var N = g !== null ? g.key : null;
    if ((typeof w == "string" && w !== "") || typeof w == "number")
      return N !== null ? null : s(x, g, "" + w, E);
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case Go:
          return w.key === N ? l(x, g, w, E) : null;
        case oi:
          return w.key === N ? u(x, g, w, E) : null;
        case $n:
          return (N = w._init), m(x, g, N(w._payload), E);
      }
      if (Ea(w) || ua(w)) return N !== null ? null : c(x, g, w, E, null);
      is(x, w);
    }
    return null;
  }
  function v(x, g, w, E, N) {
    if ((typeof E == "string" && E !== "") || typeof E == "number")
      return (x = x.get(w) || null), s(g, x, "" + E, N);
    if (typeof E == "object" && E !== null) {
      switch (E.$$typeof) {
        case Go:
          return (x = x.get(E.key === null ? w : E.key) || null), l(g, x, E, N);
        case oi:
          return (x = x.get(E.key === null ? w : E.key) || null), u(g, x, E, N);
        case $n:
          var D = E._init;
          return v(x, g, w, D(E._payload), N);
      }
      if (Ea(E) || ua(E)) return (x = x.get(w) || null), c(g, x, E, N, null);
      is(g, E);
    }
    return null;
  }
  function b(x, g, w, E) {
    for (
      var N = null, D = null, f = g, k = (g = 0), O = null;
      f !== null && k < w.length;
      k++
    ) {
      f.index > k ? ((O = f), (f = null)) : (O = f.sibling);
      var I = m(x, f, w[k], E);
      if (I === null) {
        f === null && (f = O);
        break;
      }
      e && f && I.alternate === null && t(x, f),
        (g = a(I, g, k)),
        D === null ? (N = I) : (D.sibling = I),
        (D = I),
        (f = O);
    }
    if (k === w.length) return n(x, f), Ae && _r(x, k), N;
    if (f === null) {
      for (; k < w.length; k++)
        (f = d(x, w[k], E)),
          f !== null &&
            ((g = a(f, g, k)), D === null ? (N = f) : (D.sibling = f), (D = f));
      return Ae && _r(x, k), N;
    }
    for (f = r(x, f); k < w.length; k++)
      (O = v(f, x, k, w[k], E)),
        O !== null &&
          (e && O.alternate !== null && f.delete(O.key === null ? k : O.key),
          (g = a(O, g, k)),
          D === null ? (N = O) : (D.sibling = O),
          (D = O));
    return (
      e &&
        f.forEach(function (H) {
          return t(x, H);
        }),
      Ae && _r(x, k),
      N
    );
  }
  function _(x, g, w, E) {
    var N = ua(w);
    if (typeof N != "function") throw Error(U(150));
    if (((w = N.call(w)), w == null)) throw Error(U(151));
    for (
      var D = (N = null), f = g, k = (g = 0), O = null, I = w.next();
      f !== null && !I.done;
      k++, I = w.next()
    ) {
      f.index > k ? ((O = f), (f = null)) : (O = f.sibling);
      var H = m(x, f, I.value, E);
      if (H === null) {
        f === null && (f = O);
        break;
      }
      e && f && H.alternate === null && t(x, f),
        (g = a(H, g, k)),
        D === null ? (N = H) : (D.sibling = H),
        (D = H),
        (f = O);
    }
    if (I.done) return n(x, f), Ae && _r(x, k), N;
    if (f === null) {
      for (; !I.done; k++, I = w.next())
        (I = d(x, I.value, E)),
          I !== null &&
            ((g = a(I, g, k)), D === null ? (N = I) : (D.sibling = I), (D = I));
      return Ae && _r(x, k), N;
    }
    for (f = r(x, f); !I.done; k++, I = w.next())
      (I = v(f, x, k, I.value, E)),
        I !== null &&
          (e && I.alternate !== null && f.delete(I.key === null ? k : I.key),
          (g = a(I, g, k)),
          D === null ? (N = I) : (D.sibling = I),
          (D = I));
    return (
      e &&
        f.forEach(function (Z) {
          return t(x, Z);
        }),
      Ae && _r(x, k),
      N
    );
  }
  function C(x, g, w, E) {
    if (
      (typeof w == "object" &&
        w !== null &&
        w.type === si &&
        w.key === null &&
        (w = w.props.children),
      typeof w == "object" && w !== null)
    ) {
      switch (w.$$typeof) {
        case Go:
          e: {
            for (var N = w.key, D = g; D !== null; ) {
              if (D.key === N) {
                if (((N = w.type), N === si)) {
                  if (D.tag === 7) {
                    n(x, D.sibling),
                      (g = i(D, w.props.children)),
                      (g.return = x),
                      (x = g);
                    break e;
                  }
                } else if (
                  D.elementType === N ||
                  (typeof N == "object" &&
                    N !== null &&
                    N.$$typeof === $n &&
                    Dp(N) === D.type)
                ) {
                  n(x, D.sibling),
                    (g = i(D, w.props)),
                    (g.ref = pa(x, D, w)),
                    (g.return = x),
                    (x = g);
                  break e;
                }
                n(x, D);
                break;
              } else t(x, D);
              D = D.sibling;
            }
            w.type === si
              ? ((g = Ur(w.props.children, x.mode, E, w.key)),
                (g.return = x),
                (x = g))
              : ((E = Ls(w.type, w.key, w.props, null, x.mode, E)),
                (E.ref = pa(x, g, w)),
                (E.return = x),
                (x = E));
          }
          return o(x);
        case oi:
          e: {
            for (D = w.key; g !== null; ) {
              if (g.key === D)
                if (
                  g.tag === 4 &&
                  g.stateNode.containerInfo === w.containerInfo &&
                  g.stateNode.implementation === w.implementation
                ) {
                  n(x, g.sibling),
                    (g = i(g, w.children || [])),
                    (g.return = x),
                    (x = g);
                  break e;
                } else {
                  n(x, g);
                  break;
                }
              else t(x, g);
              g = g.sibling;
            }
            (g = mc(w, x.mode, E)), (g.return = x), (x = g);
          }
          return o(x);
        case $n:
          return (D = w._init), C(x, g, D(w._payload), E);
      }
      if (Ea(w)) return b(x, g, w, E);
      if (ua(w)) return _(x, g, w, E);
      is(x, w);
    }
    return (typeof w == "string" && w !== "") || typeof w == "number"
      ? ((w = "" + w),
        g !== null && g.tag === 6
          ? (n(x, g.sibling), (g = i(g, w)), (g.return = x), (x = g))
          : (n(x, g), (g = pc(w, x.mode, E)), (g.return = x), (x = g)),
        o(x))
      : n(x, g);
  }
  return C;
}
var Li = hy(!0),
  py = hy(!1),
  Po = {},
  yn = mr(Po),
  no = mr(Po),
  ro = mr(Po);
function Tr(e) {
  if (e === Po) throw Error(U(174));
  return e;
}
function dh(e, t) {
  switch ((Se(ro, t), Se(no, e), Se(yn, Po), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : ef(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = ef(t, e));
  }
  Ne(yn), Se(yn, t);
}
function Fi() {
  Ne(yn), Ne(no), Ne(ro);
}
function my(e) {
  Tr(ro.current);
  var t = Tr(yn.current),
    n = ef(t, e.type);
  t !== n && (Se(no, e), Se(yn, n));
}
function hh(e) {
  no.current === e && (Ne(yn), Ne(no));
}
var Te = mr(0);
function il(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var lc = [];
function ph() {
  for (var e = 0; e < lc.length; e++)
    lc[e]._workInProgressVersionPrimary = null;
  lc.length = 0;
}
var As = In.ReactCurrentDispatcher,
  uc = In.ReactCurrentBatchConfig,
  zr = 0,
  je = null,
  Qe = null,
  et = null,
  al = !1,
  La = !1,
  io = 0,
  cx = 0;
function ot() {
  throw Error(U(321));
}
function mh(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!nn(e[n], t[n])) return !1;
  return !0;
}
function gh(e, t, n, r, i, a) {
  if (
    ((zr = a),
    (je = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (As.current = e === null || e.memoizedState === null ? px : mx),
    (e = n(r, i)),
    La)
  ) {
    a = 0;
    do {
      if (((La = !1), (io = 0), 25 <= a)) throw Error(U(301));
      (a += 1),
        (et = Qe = null),
        (t.updateQueue = null),
        (As.current = gx),
        (e = n(r, i));
    } while (La);
  }
  if (
    ((As.current = ol),
    (t = Qe !== null && Qe.next !== null),
    (zr = 0),
    (et = Qe = je = null),
    (al = !1),
    t)
  )
    throw Error(U(300));
  return e;
}
function yh() {
  var e = io !== 0;
  return (io = 0), e;
}
function cn() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return et === null ? (je.memoizedState = et = e) : (et = et.next = e), et;
}
function Wt() {
  if (Qe === null) {
    var e = je.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Qe.next;
  var t = et === null ? je.memoizedState : et.next;
  if (t !== null) (et = t), (Qe = e);
  else {
    if (e === null) throw Error(U(310));
    (Qe = e),
      (e = {
        memoizedState: Qe.memoizedState,
        baseState: Qe.baseState,
        baseQueue: Qe.baseQueue,
        queue: Qe.queue,
        next: null,
      }),
      et === null ? (je.memoizedState = et = e) : (et = et.next = e);
  }
  return et;
}
function ao(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function cc(e) {
  var t = Wt(),
    n = t.queue;
  if (n === null) throw Error(U(311));
  n.lastRenderedReducer = e;
  var r = Qe,
    i = r.baseQueue,
    a = n.pending;
  if (a !== null) {
    if (i !== null) {
      var o = i.next;
      (i.next = a.next), (a.next = o);
    }
    (r.baseQueue = i = a), (n.pending = null);
  }
  if (i !== null) {
    (a = i.next), (r = r.baseState);
    var s = (o = null),
      l = null,
      u = a;
    do {
      var c = u.lane;
      if ((zr & c) === c)
        l !== null &&
          (l = l.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action));
      else {
        var d = {
          lane: c,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        l === null ? ((s = l = d), (o = r)) : (l = l.next = d),
          (je.lanes |= c),
          (Wr |= c);
      }
      u = u.next;
    } while (u !== null && u !== a);
    l === null ? (o = r) : (l.next = s),
      nn(r, t.memoizedState) || (wt = !0),
      (t.memoizedState = r),
      (t.baseState = o),
      (t.baseQueue = l),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    i = e;
    do (a = i.lane), (je.lanes |= a), (Wr |= a), (i = i.next);
    while (i !== e);
  } else i === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function fc(e) {
  var t = Wt(),
    n = t.queue;
  if (n === null) throw Error(U(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    i = n.pending,
    a = t.memoizedState;
  if (i !== null) {
    n.pending = null;
    var o = (i = i.next);
    do (a = e(a, o.action)), (o = o.next);
    while (o !== i);
    nn(a, t.memoizedState) || (wt = !0),
      (t.memoizedState = a),
      t.baseQueue === null && (t.baseState = a),
      (n.lastRenderedState = a);
  }
  return [a, r];
}
function gy() {}
function yy(e, t) {
  var n = je,
    r = Wt(),
    i = t(),
    a = !nn(r.memoizedState, i);
  if (
    (a && ((r.memoizedState = i), (wt = !0)),
    (r = r.queue),
    vh(by.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || a || (et !== null && et.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      oo(9, wy.bind(null, n, r, i, t), void 0, null),
      tt === null)
    )
      throw Error(U(349));
    zr & 30 || vy(n, t, i);
  }
  return i;
}
function vy(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = je.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (je.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function wy(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), xy(t) && Ey(e);
}
function by(e, t, n) {
  return n(function () {
    xy(t) && Ey(e);
  });
}
function xy(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !nn(e, n);
  } catch {
    return !0;
  }
}
function Ey(e) {
  var t = Nn(e, 1);
  t !== null && en(t, e, 1, -1);
}
function Pp(e) {
  var t = cn();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ao,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = hx.bind(null, je, e)),
    [t.memoizedState, e]
  );
}
function oo(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = je.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (je.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function Sy() {
  return Wt().memoizedState;
}
function Ts(e, t, n, r) {
  var i = cn();
  (je.flags |= e),
    (i.memoizedState = oo(1 | t, n, void 0, r === void 0 ? null : r));
}
function Kl(e, t, n, r) {
  var i = Wt();
  r = r === void 0 ? null : r;
  var a = void 0;
  if (Qe !== null) {
    var o = Qe.memoizedState;
    if (((a = o.destroy), r !== null && mh(r, o.deps))) {
      i.memoizedState = oo(t, n, a, r);
      return;
    }
  }
  (je.flags |= e), (i.memoizedState = oo(1 | t, n, a, r));
}
function Ap(e, t) {
  return Ts(8390656, 8, e, t);
}
function vh(e, t) {
  return Kl(2048, 8, e, t);
}
function Cy(e, t) {
  return Kl(4, 2, e, t);
}
function _y(e, t) {
  return Kl(4, 4, e, t);
}
function ky(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Ny(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), Kl(4, 4, ky.bind(null, t, e), n)
  );
}
function wh() {}
function Dy(e, t) {
  var n = Wt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && mh(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function Py(e, t) {
  var n = Wt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && mh(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Ay(e, t, n) {
  return zr & 21
    ? (nn(n, t) || ((n = jg()), (je.lanes |= n), (Wr |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (wt = !0)), (e.memoizedState = n));
}
function fx(e, t) {
  var n = ye;
  (ye = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = uc.transition;
  uc.transition = {};
  try {
    e(!1), t();
  } finally {
    (ye = n), (uc.transition = r);
  }
}
function Ty() {
  return Wt().memoizedState;
}
function dx(e, t, n) {
  var r = rr(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Oy(e))
  )
    jy(t, n);
  else if (((n = uy(e, t, n, r)), n !== null)) {
    var i = pt();
    en(n, e, r, i), Iy(n, t, r);
  }
}
function hx(e, t, n) {
  var r = rr(e),
    i = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Oy(e)) jy(t, i);
  else {
    var a = e.alternate;
    if (
      e.lanes === 0 &&
      (a === null || a.lanes === 0) &&
      ((a = t.lastRenderedReducer), a !== null)
    )
      try {
        var o = t.lastRenderedState,
          s = a(o, n);
        if (((i.hasEagerState = !0), (i.eagerState = s), nn(s, o))) {
          var l = t.interleaved;
          l === null
            ? ((i.next = i), ch(t))
            : ((i.next = l.next), (l.next = i)),
            (t.interleaved = i);
          return;
        }
      } catch {
      } finally {
      }
    (n = uy(e, t, i, r)),
      n !== null && ((i = pt()), en(n, e, r, i), Iy(n, t, r));
  }
}
function Oy(e) {
  var t = e.alternate;
  return e === je || (t !== null && t === je);
}
function jy(e, t) {
  La = al = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function Iy(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Yd(e, n);
  }
}
var ol = {
    readContext: zt,
    useCallback: ot,
    useContext: ot,
    useEffect: ot,
    useImperativeHandle: ot,
    useInsertionEffect: ot,
    useLayoutEffect: ot,
    useMemo: ot,
    useReducer: ot,
    useRef: ot,
    useState: ot,
    useDebugValue: ot,
    useDeferredValue: ot,
    useTransition: ot,
    useMutableSource: ot,
    useSyncExternalStore: ot,
    useId: ot,
    unstable_isNewReconciler: !1,
  },
  px = {
    readContext: zt,
    useCallback: function (e, t) {
      return (cn().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: zt,
    useEffect: Ap,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Ts(4194308, 4, ky.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Ts(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Ts(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = cn();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = cn();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = dx.bind(null, je, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = cn();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: Pp,
    useDebugValue: wh,
    useDeferredValue: function (e) {
      return (cn().memoizedState = e);
    },
    useTransition: function () {
      var e = Pp(!1),
        t = e[0];
      return (e = fx.bind(null, e[1])), (cn().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = je,
        i = cn();
      if (Ae) {
        if (n === void 0) throw Error(U(407));
        n = n();
      } else {
        if (((n = t()), tt === null)) throw Error(U(349));
        zr & 30 || vy(r, t, n);
      }
      i.memoizedState = n;
      var a = { value: n, getSnapshot: t };
      return (
        (i.queue = a),
        Ap(by.bind(null, r, a, e), [e]),
        (r.flags |= 2048),
        oo(9, wy.bind(null, r, a, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = cn(),
        t = tt.identifierPrefix;
      if (Ae) {
        var n = Sn,
          r = En;
        (n = (r & ~(1 << (32 - Jt(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = io++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = cx++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  mx = {
    readContext: zt,
    useCallback: Dy,
    useContext: zt,
    useEffect: vh,
    useImperativeHandle: Ny,
    useInsertionEffect: Cy,
    useLayoutEffect: _y,
    useMemo: Py,
    useReducer: cc,
    useRef: Sy,
    useState: function () {
      return cc(ao);
    },
    useDebugValue: wh,
    useDeferredValue: function (e) {
      var t = Wt();
      return Ay(t, Qe.memoizedState, e);
    },
    useTransition: function () {
      var e = cc(ao)[0],
        t = Wt().memoizedState;
      return [e, t];
    },
    useMutableSource: gy,
    useSyncExternalStore: yy,
    useId: Ty,
    unstable_isNewReconciler: !1,
  },
  gx = {
    readContext: zt,
    useCallback: Dy,
    useContext: zt,
    useEffect: vh,
    useImperativeHandle: Ny,
    useInsertionEffect: Cy,
    useLayoutEffect: _y,
    useMemo: Py,
    useReducer: fc,
    useRef: Sy,
    useState: function () {
      return fc(ao);
    },
    useDebugValue: wh,
    useDeferredValue: function (e) {
      var t = Wt();
      return Qe === null ? (t.memoizedState = e) : Ay(t, Qe.memoizedState, e);
    },
    useTransition: function () {
      var e = fc(ao)[0],
        t = Wt().memoizedState;
      return [e, t];
    },
    useMutableSource: gy,
    useSyncExternalStore: yy,
    useId: Ty,
    unstable_isNewReconciler: !1,
  };
function Ui(e, t) {
  try {
    var n = "",
      r = t;
    do (n += Hb(r)), (r = r.return);
    while (r);
    var i = n;
  } catch (a) {
    i =
      `
Error generating stack: ` +
      a.message +
      `
` +
      a.stack;
  }
  return { value: e, source: t, stack: i, digest: null };
}
function dc(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Cf(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var yx = typeof WeakMap == "function" ? WeakMap : Map;
function Ly(e, t, n) {
  (n = Cn(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      ll || ((ll = !0), (If = r)), Cf(e, t);
    }),
    n
  );
}
function Fy(e, t, n) {
  (n = Cn(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = t.value;
    (n.payload = function () {
      return r(i);
    }),
      (n.callback = function () {
        Cf(e, t);
      });
  }
  var a = e.stateNode;
  return (
    a !== null &&
      typeof a.componentDidCatch == "function" &&
      (n.callback = function () {
        Cf(e, t),
          typeof r != "function" &&
            (nr === null ? (nr = new Set([this])) : nr.add(this));
        var o = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: o !== null ? o : "",
        });
      }),
    n
  );
}
function Tp(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new yx();
    var i = new Set();
    r.set(t, i);
  } else (i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i));
  i.has(n) || (i.add(n), (e = Tx.bind(null, e, t, n)), t.then(e, e));
}
function Op(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function jp(e, t, n, r, i) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = i), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Cn(-1, 1)), (t.tag = 2), tr(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var vx = In.ReactCurrentOwner,
  wt = !1;
function dt(e, t, n, r) {
  t.child = e === null ? py(t, null, n, r) : Li(t, e.child, n, r);
}
function Ip(e, t, n, r, i) {
  n = n.render;
  var a = t.ref;
  return (
    ki(t, i),
    (r = gh(e, t, n, r, a, i)),
    (n = yh()),
    e !== null && !wt
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        Dn(e, t, i))
      : (Ae && n && ih(t), (t.flags |= 1), dt(e, t, r, i), t.child)
  );
}
function Lp(e, t, n, r, i) {
  if (e === null) {
    var a = n.type;
    return typeof a == "function" &&
      !Nh(a) &&
      a.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = a), Uy(e, t, a, r, i))
      : ((e = Ls(n.type, null, r, t, t.mode, i)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((a = e.child), !(e.lanes & i))) {
    var o = a.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Xa), n(o, r) && e.ref === t.ref)
    )
      return Dn(e, t, i);
  }
  return (
    (t.flags |= 1),
    (e = ir(a, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function Uy(e, t, n, r, i) {
  if (e !== null) {
    var a = e.memoizedProps;
    if (Xa(a, r) && e.ref === t.ref)
      if (((wt = !1), (t.pendingProps = r = a), (e.lanes & i) !== 0))
        e.flags & 131072 && (wt = !0);
      else return (t.lanes = e.lanes), Dn(e, t, i);
  }
  return _f(e, t, n, r, i);
}
function My(e, t, n) {
  var r = t.pendingProps,
    i = r.children,
    a = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        Se(yi, Nt),
        (Nt |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = a !== null ? a.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          Se(yi, Nt),
          (Nt |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = a !== null ? a.baseLanes : n),
        Se(yi, Nt),
        (Nt |= r);
    }
  else
    a !== null ? ((r = a.baseLanes | n), (t.memoizedState = null)) : (r = n),
      Se(yi, Nt),
      (Nt |= r);
  return dt(e, t, i, n), t.child;
}
function Ry(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function _f(e, t, n, r, i) {
  var a = xt(n) ? Br : ct.current;
  return (
    (a = ji(t, a)),
    ki(t, i),
    (n = gh(e, t, n, r, a, i)),
    (r = yh()),
    e !== null && !wt
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~i),
        Dn(e, t, i))
      : (Ae && r && ih(t), (t.flags |= 1), dt(e, t, n, i), t.child)
  );
}
function Fp(e, t, n, r, i) {
  if (xt(n)) {
    var a = !0;
    Xs(t);
  } else a = !1;
  if ((ki(t, i), t.stateNode === null))
    Os(e, t), dy(t, n, r), Sf(t, n, r, i), (r = !0);
  else if (e === null) {
    var o = t.stateNode,
      s = t.memoizedProps;
    o.props = s;
    var l = o.context,
      u = n.contextType;
    typeof u == "object" && u !== null
      ? (u = zt(u))
      : ((u = xt(n) ? Br : ct.current), (u = ji(t, u)));
    var c = n.getDerivedStateFromProps,
      d =
        typeof c == "function" ||
        typeof o.getSnapshotBeforeUpdate == "function";
    d ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((s !== r || l !== u) && Np(t, o, r, u)),
      (zn = !1);
    var m = t.memoizedState;
    (o.state = m),
      rl(t, r, o, i),
      (l = t.memoizedState),
      s !== r || m !== l || bt.current || zn
        ? (typeof c == "function" && (Ef(t, n, c, r), (l = t.memoizedState)),
          (s = zn || kp(t, n, s, r, m, l, u))
            ? (d ||
                (typeof o.UNSAFE_componentWillMount != "function" &&
                  typeof o.componentWillMount != "function") ||
                (typeof o.componentWillMount == "function" &&
                  o.componentWillMount(),
                typeof o.UNSAFE_componentWillMount == "function" &&
                  o.UNSAFE_componentWillMount()),
              typeof o.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = l)),
          (o.props = r),
          (o.state = l),
          (o.context = u),
          (r = s))
        : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (o = t.stateNode),
      cy(e, t),
      (s = t.memoizedProps),
      (u = t.type === t.elementType ? s : Vt(t.type, s)),
      (o.props = u),
      (d = t.pendingProps),
      (m = o.context),
      (l = n.contextType),
      typeof l == "object" && l !== null
        ? (l = zt(l))
        : ((l = xt(n) ? Br : ct.current), (l = ji(t, l)));
    var v = n.getDerivedStateFromProps;
    (c =
      typeof v == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function") ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((s !== d || m !== l) && Np(t, o, r, l)),
      (zn = !1),
      (m = t.memoizedState),
      (o.state = m),
      rl(t, r, o, i);
    var b = t.memoizedState;
    s !== d || m !== b || bt.current || zn
      ? (typeof v == "function" && (Ef(t, n, v, r), (b = t.memoizedState)),
        (u = zn || kp(t, n, u, r, m, b, l) || !1)
          ? (c ||
              (typeof o.UNSAFE_componentWillUpdate != "function" &&
                typeof o.componentWillUpdate != "function") ||
              (typeof o.componentWillUpdate == "function" &&
                o.componentWillUpdate(r, b, l),
              typeof o.UNSAFE_componentWillUpdate == "function" &&
                o.UNSAFE_componentWillUpdate(r, b, l)),
            typeof o.componentDidUpdate == "function" && (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof o.componentDidUpdate != "function" ||
              (s === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate != "function" ||
              (s === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = b)),
        (o.props = r),
        (o.state = b),
        (o.context = l),
        (r = u))
      : (typeof o.componentDidUpdate != "function" ||
          (s === e.memoizedProps && m === e.memoizedState) ||
          (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate != "function" ||
          (s === e.memoizedProps && m === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return kf(e, t, n, r, a, i);
}
function kf(e, t, n, r, i, a) {
  Ry(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return i && xp(t, n, !1), Dn(e, t, a);
  (r = t.stateNode), (vx.current = t);
  var s =
    o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && o
      ? ((t.child = Li(t, e.child, null, a)), (t.child = Li(t, null, s, a)))
      : dt(e, t, s, a),
    (t.memoizedState = r.state),
    i && xp(t, n, !0),
    t.child
  );
}
function By(e) {
  var t = e.stateNode;
  t.pendingContext
    ? bp(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && bp(e, t.context, !1),
    dh(e, t.containerInfo);
}
function Up(e, t, n, r, i) {
  return Ii(), oh(i), (t.flags |= 256), dt(e, t, n, r), t.child;
}
var Nf = { dehydrated: null, treeContext: null, retryLane: 0 };
function Df(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function $y(e, t, n) {
  var r = t.pendingProps,
    i = Te.current,
    a = !1,
    o = (t.flags & 128) !== 0,
    s;
  if (
    ((s = o) ||
      (s = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    s
      ? ((a = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (i |= 1),
    Se(Te, i & 1),
    e === null)
  )
    return (
      bf(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((o = r.children),
          (e = r.fallback),
          a
            ? ((r = t.mode),
              (a = t.child),
              (o = { mode: "hidden", children: o }),
              !(r & 1) && a !== null
                ? ((a.childLanes = 0), (a.pendingProps = o))
                : (a = Xl(o, r, 0, null)),
              (e = Ur(e, r, n, null)),
              (a.return = t),
              (e.return = t),
              (a.sibling = e),
              (t.child = a),
              (t.child.memoizedState = Df(n)),
              (t.memoizedState = Nf),
              e)
            : bh(t, o))
    );
  if (((i = e.memoizedState), i !== null && ((s = i.dehydrated), s !== null)))
    return wx(e, t, o, r, s, i, n);
  if (a) {
    (a = r.fallback), (o = t.mode), (i = e.child), (s = i.sibling);
    var l = { mode: "hidden", children: r.children };
    return (
      !(o & 1) && t.child !== i
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = l),
          (t.deletions = null))
        : ((r = ir(i, l)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
      s !== null ? (a = ir(s, a)) : ((a = Ur(a, o, n, null)), (a.flags |= 2)),
      (a.return = t),
      (r.return = t),
      (r.sibling = a),
      (t.child = r),
      (r = a),
      (a = t.child),
      (o = e.child.memoizedState),
      (o =
        o === null
          ? Df(n)
          : {
              baseLanes: o.baseLanes | n,
              cachePool: null,
              transitions: o.transitions,
            }),
      (a.memoizedState = o),
      (a.childLanes = e.childLanes & ~n),
      (t.memoizedState = Nf),
      r
    );
  }
  return (
    (a = e.child),
    (e = a.sibling),
    (r = ir(a, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function bh(e, t) {
  return (
    (t = Xl({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function as(e, t, n, r) {
  return (
    r !== null && oh(r),
    Li(t, e.child, null, n),
    (e = bh(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function wx(e, t, n, r, i, a, o) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = dc(Error(U(422)))), as(e, t, o, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((a = r.fallback),
        (i = t.mode),
        (r = Xl({ mode: "visible", children: r.children }, i, 0, null)),
        (a = Ur(a, i, o, null)),
        (a.flags |= 2),
        (r.return = t),
        (a.return = t),
        (r.sibling = a),
        (t.child = r),
        t.mode & 1 && Li(t, e.child, null, o),
        (t.child.memoizedState = Df(o)),
        (t.memoizedState = Nf),
        a);
  if (!(t.mode & 1)) return as(e, t, o, null);
  if (i.data === "$!") {
    if (((r = i.nextSibling && i.nextSibling.dataset), r)) var s = r.dgst;
    return (r = s), (a = Error(U(419))), (r = dc(a, r, void 0)), as(e, t, o, r);
  }
  if (((s = (o & e.childLanes) !== 0), wt || s)) {
    if (((r = tt), r !== null)) {
      switch (o & -o) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      (i = i & (r.suspendedLanes | o) ? 0 : i),
        i !== 0 &&
          i !== a.retryLane &&
          ((a.retryLane = i), Nn(e, i), en(r, e, i, -1));
    }
    return kh(), (r = dc(Error(U(421)))), as(e, t, o, r);
  }
  return i.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = Ox.bind(null, e)),
      (i._reactRetry = t),
      null)
    : ((e = a.treeContext),
      (Dt = er(i.nextSibling)),
      (Tt = t),
      (Ae = !0),
      (Kt = null),
      e !== null &&
        ((Mt[Rt++] = En),
        (Mt[Rt++] = Sn),
        (Mt[Rt++] = $r),
        (En = e.id),
        (Sn = e.overflow),
        ($r = t)),
      (t = bh(t, r.children)),
      (t.flags |= 4096),
      t);
}
function Mp(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), xf(e.return, t, n);
}
function hc(e, t, n, r, i) {
  var a = e.memoizedState;
  a === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i,
      })
    : ((a.isBackwards = t),
      (a.rendering = null),
      (a.renderingStartTime = 0),
      (a.last = r),
      (a.tail = n),
      (a.tailMode = i));
}
function zy(e, t, n) {
  var r = t.pendingProps,
    i = r.revealOrder,
    a = r.tail;
  if ((dt(e, t, r.children, n), (r = Te.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Mp(e, n, t);
        else if (e.tag === 19) Mp(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((Se(Te, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; )
          (e = n.alternate),
            e !== null && il(e) === null && (i = n),
            (n = n.sibling);
        (n = i),
          n === null
            ? ((i = t.child), (t.child = null))
            : ((i = n.sibling), (n.sibling = null)),
          hc(t, !1, i, n, a);
        break;
      case "backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && il(e) === null)) {
            t.child = i;
            break;
          }
          (e = i.sibling), (i.sibling = n), (n = i), (i = e);
        }
        hc(t, !0, n, null, a);
        break;
      case "together":
        hc(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Os(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Dn(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Wr |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(U(153));
  if (t.child !== null) {
    for (
      e = t.child, n = ir(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = ir(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function bx(e, t, n) {
  switch (t.tag) {
    case 3:
      By(t), Ii();
      break;
    case 5:
      my(t);
      break;
    case 1:
      xt(t.type) && Xs(t);
      break;
    case 4:
      dh(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        i = t.memoizedProps.value;
      Se(tl, r._currentValue), (r._currentValue = i);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (Se(Te, Te.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? $y(e, t, n)
          : (Se(Te, Te.current & 1),
            (e = Dn(e, t, n)),
            e !== null ? e.sibling : null);
      Se(Te, Te.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return zy(e, t, n);
        t.flags |= 128;
      }
      if (
        ((i = t.memoizedState),
        i !== null &&
          ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        Se(Te, Te.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), My(e, t, n);
  }
  return Dn(e, t, n);
}
var Wy, Pf, Hy, qy;
Wy = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
Pf = function () {};
Hy = function (e, t, n, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    (e = t.stateNode), Tr(yn.current);
    var a = null;
    switch (n) {
      case "input":
        (i = Yc(e, i)), (r = Yc(e, r)), (a = []);
        break;
      case "select":
        (i = Ie({}, i, { value: void 0 })),
          (r = Ie({}, r, { value: void 0 })),
          (a = []);
        break;
      case "textarea":
        (i = Jc(e, i)), (r = Jc(e, r)), (a = []);
        break;
      default:
        typeof i.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = Ys);
    }
    tf(n, r);
    var o;
    n = null;
    for (u in i)
      if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
        if (u === "style") {
          var s = i[u];
          for (o in s) s.hasOwnProperty(o) && (n || (n = {}), (n[o] = ""));
        } else
          u !== "dangerouslySetInnerHTML" &&
            u !== "children" &&
            u !== "suppressContentEditableWarning" &&
            u !== "suppressHydrationWarning" &&
            u !== "autoFocus" &&
            (qa.hasOwnProperty(u)
              ? a || (a = [])
              : (a = a || []).push(u, null));
    for (u in r) {
      var l = r[u];
      if (
        ((s = i != null ? i[u] : void 0),
        r.hasOwnProperty(u) && l !== s && (l != null || s != null))
      )
        if (u === "style")
          if (s) {
            for (o in s)
              !s.hasOwnProperty(o) ||
                (l && l.hasOwnProperty(o)) ||
                (n || (n = {}), (n[o] = ""));
            for (o in l)
              l.hasOwnProperty(o) &&
                s[o] !== l[o] &&
                (n || (n = {}), (n[o] = l[o]));
          } else n || (a || (a = []), a.push(u, n)), (n = l);
        else
          u === "dangerouslySetInnerHTML"
            ? ((l = l ? l.__html : void 0),
              (s = s ? s.__html : void 0),
              l != null && s !== l && (a = a || []).push(u, l))
            : u === "children"
            ? (typeof l != "string" && typeof l != "number") ||
              (a = a || []).push(u, "" + l)
            : u !== "suppressContentEditableWarning" &&
              u !== "suppressHydrationWarning" &&
              (qa.hasOwnProperty(u)
                ? (l != null && u === "onScroll" && _e("scroll", e),
                  a || s === l || (a = []))
                : (a = a || []).push(u, l));
    }
    n && (a = a || []).push("style", n);
    var u = a;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
qy = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function ma(e, t) {
  if (!Ae)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function st(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags & 14680064),
        (r |= i.flags & 14680064),
        (i.return = e),
        (i = i.sibling);
  else
    for (i = e.child; i !== null; )
      (n |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags),
        (r |= i.flags),
        (i.return = e),
        (i = i.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function xx(e, t, n) {
  var r = t.pendingProps;
  switch ((ah(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return st(t), null;
    case 1:
      return xt(t.type) && Zs(), st(t), null;
    case 3:
      return (
        (r = t.stateNode),
        Fi(),
        Ne(bt),
        Ne(ct),
        ph(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (rs(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Kt !== null && (Uf(Kt), (Kt = null)))),
        Pf(e, t),
        st(t),
        null
      );
    case 5:
      hh(t);
      var i = Tr(ro.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        Hy(e, t, n, r, i),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(U(166));
          return st(t), null;
        }
        if (((e = Tr(yn.current)), rs(t))) {
          (r = t.stateNode), (n = t.type);
          var a = t.memoizedProps;
          switch (((r[pn] = t), (r[to] = a), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              _e("cancel", r), _e("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              _e("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < Ca.length; i++) _e(Ca[i], r);
              break;
            case "source":
              _e("error", r);
              break;
            case "img":
            case "image":
            case "link":
              _e("error", r), _e("load", r);
              break;
            case "details":
              _e("toggle", r);
              break;
            case "input":
              G0(r, a), _e("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!a.multiple }),
                _e("invalid", r);
              break;
            case "textarea":
              K0(r, a), _e("invalid", r);
          }
          tf(n, a), (i = null);
          for (var o in a)
            if (a.hasOwnProperty(o)) {
              var s = a[o];
              o === "children"
                ? typeof s == "string"
                  ? r.textContent !== s &&
                    (a.suppressHydrationWarning !== !0 &&
                      ns(r.textContent, s, e),
                    (i = ["children", s]))
                  : typeof s == "number" &&
                    r.textContent !== "" + s &&
                    (a.suppressHydrationWarning !== !0 &&
                      ns(r.textContent, s, e),
                    (i = ["children", "" + s]))
                : qa.hasOwnProperty(o) &&
                  s != null &&
                  o === "onScroll" &&
                  _e("scroll", r);
            }
          switch (n) {
            case "input":
              Qo(r), Q0(r, a, !0);
              break;
            case "textarea":
              Qo(r), Y0(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof a.onClick == "function" && (r.onclick = Ys);
          }
          (r = i), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (o = i.nodeType === 9 ? i : i.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = vg(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = o.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = o.createElement(n, { is: r.is }))
                : ((e = o.createElement(n)),
                  n === "select" &&
                    ((o = e),
                    r.multiple
                      ? (o.multiple = !0)
                      : r.size && (o.size = r.size)))
              : (e = o.createElementNS(e, n)),
            (e[pn] = t),
            (e[to] = r),
            Wy(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((o = nf(n, r)), n)) {
              case "dialog":
                _e("cancel", e), _e("close", e), (i = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                _e("load", e), (i = r);
                break;
              case "video":
              case "audio":
                for (i = 0; i < Ca.length; i++) _e(Ca[i], e);
                i = r;
                break;
              case "source":
                _e("error", e), (i = r);
                break;
              case "img":
              case "image":
              case "link":
                _e("error", e), _e("load", e), (i = r);
                break;
              case "details":
                _e("toggle", e), (i = r);
                break;
              case "input":
                G0(e, r), (i = Yc(e, r)), _e("invalid", e);
                break;
              case "option":
                i = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (i = Ie({}, r, { value: void 0 })),
                  _e("invalid", e);
                break;
              case "textarea":
                K0(e, r), (i = Jc(e, r)), _e("invalid", e);
                break;
              default:
                i = r;
            }
            tf(n, i), (s = i);
            for (a in s)
              if (s.hasOwnProperty(a)) {
                var l = s[a];
                a === "style"
                  ? xg(e, l)
                  : a === "dangerouslySetInnerHTML"
                  ? ((l = l ? l.__html : void 0), l != null && wg(e, l))
                  : a === "children"
                  ? typeof l == "string"
                    ? (n !== "textarea" || l !== "") && Va(e, l)
                    : typeof l == "number" && Va(e, "" + l)
                  : a !== "suppressContentEditableWarning" &&
                    a !== "suppressHydrationWarning" &&
                    a !== "autoFocus" &&
                    (qa.hasOwnProperty(a)
                      ? l != null && a === "onScroll" && _e("scroll", e)
                      : l != null && Hd(e, a, l, o));
              }
            switch (n) {
              case "input":
                Qo(e), Q0(e, r, !1);
                break;
              case "textarea":
                Qo(e), Y0(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + sr(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (a = r.value),
                  a != null
                    ? Ei(e, !!r.multiple, a, !1)
                    : r.defaultValue != null &&
                      Ei(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = Ys);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return st(t), null;
    case 6:
      if (e && t.stateNode != null) qy(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(U(166));
        if (((n = Tr(ro.current)), Tr(yn.current), rs(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[pn] = t),
            (a = r.nodeValue !== n) && ((e = Tt), e !== null))
          )
            switch (e.tag) {
              case 3:
                ns(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  ns(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          a && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[pn] = t),
            (t.stateNode = r);
      }
      return st(t), null;
    case 13:
      if (
        (Ne(Te),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (Ae && Dt !== null && t.mode & 1 && !(t.flags & 128))
          ly(), Ii(), (t.flags |= 98560), (a = !1);
        else if (((a = rs(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!a) throw Error(U(318));
            if (
              ((a = t.memoizedState),
              (a = a !== null ? a.dehydrated : null),
              !a)
            )
              throw Error(U(317));
            a[pn] = t;
          } else
            Ii(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          st(t), (a = !1);
        } else Kt !== null && (Uf(Kt), (Kt = null)), (a = !0);
        if (!a) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || Te.current & 1 ? Ke === 0 && (Ke = 3) : kh())),
          t.updateQueue !== null && (t.flags |= 4),
          st(t),
          null);
    case 4:
      return (
        Fi(), Pf(e, t), e === null && Ja(t.stateNode.containerInfo), st(t), null
      );
    case 10:
      return uh(t.type._context), st(t), null;
    case 17:
      return xt(t.type) && Zs(), st(t), null;
    case 19:
      if ((Ne(Te), (a = t.memoizedState), a === null)) return st(t), null;
      if (((r = (t.flags & 128) !== 0), (o = a.rendering), o === null))
        if (r) ma(a, !1);
        else {
          if (Ke !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((o = il(e)), o !== null)) {
                for (
                  t.flags |= 128,
                    ma(a, !1),
                    r = o.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (a = n),
                    (e = r),
                    (a.flags &= 14680066),
                    (o = a.alternate),
                    o === null
                      ? ((a.childLanes = 0),
                        (a.lanes = e),
                        (a.child = null),
                        (a.subtreeFlags = 0),
                        (a.memoizedProps = null),
                        (a.memoizedState = null),
                        (a.updateQueue = null),
                        (a.dependencies = null),
                        (a.stateNode = null))
                      : ((a.childLanes = o.childLanes),
                        (a.lanes = o.lanes),
                        (a.child = o.child),
                        (a.subtreeFlags = 0),
                        (a.deletions = null),
                        (a.memoizedProps = o.memoizedProps),
                        (a.memoizedState = o.memoizedState),
                        (a.updateQueue = o.updateQueue),
                        (a.type = o.type),
                        (e = o.dependencies),
                        (a.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return Se(Te, (Te.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          a.tail !== null &&
            Be() > Mi &&
            ((t.flags |= 128), (r = !0), ma(a, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = il(o)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              ma(a, !0),
              a.tail === null && a.tailMode === "hidden" && !o.alternate && !Ae)
            )
              return st(t), null;
          } else
            2 * Be() - a.renderingStartTime > Mi &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), ma(a, !1), (t.lanes = 4194304));
        a.isBackwards
          ? ((o.sibling = t.child), (t.child = o))
          : ((n = a.last),
            n !== null ? (n.sibling = o) : (t.child = o),
            (a.last = o));
      }
      return a.tail !== null
        ? ((t = a.tail),
          (a.rendering = t),
          (a.tail = t.sibling),
          (a.renderingStartTime = Be()),
          (t.sibling = null),
          (n = Te.current),
          Se(Te, r ? (n & 1) | 2 : n & 1),
          t)
        : (st(t), null);
    case 22:
    case 23:
      return (
        _h(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Nt & 1073741824 && (st(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : st(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(U(156, t.tag));
}
function Ex(e, t) {
  switch ((ah(t), t.tag)) {
    case 1:
      return (
        xt(t.type) && Zs(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Fi(),
        Ne(bt),
        Ne(ct),
        ph(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return hh(t), null;
    case 13:
      if (
        (Ne(Te), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(U(340));
        Ii();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return Ne(Te), null;
    case 4:
      return Fi(), null;
    case 10:
      return uh(t.type._context), null;
    case 22:
    case 23:
      return _h(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var os = !1,
  ut = !1,
  Sx = typeof WeakSet == "function" ? WeakSet : Set,
  q = null;
function gi(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        Fe(e, t, r);
      }
    else n.current = null;
}
function Af(e, t, n) {
  try {
    n();
  } catch (r) {
    Fe(e, t, r);
  }
}
var Rp = !1;
function Cx(e, t) {
  if (((hf = Gs), (e = Kg()), rh(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var i = r.anchorOffset,
            a = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, a.nodeType;
          } catch {
            n = null;
            break e;
          }
          var o = 0,
            s = -1,
            l = -1,
            u = 0,
            c = 0,
            d = e,
            m = null;
          t: for (;;) {
            for (
              var v;
              d !== n || (i !== 0 && d.nodeType !== 3) || (s = o + i),
                d !== a || (r !== 0 && d.nodeType !== 3) || (l = o + r),
                d.nodeType === 3 && (o += d.nodeValue.length),
                (v = d.firstChild) !== null;

            )
              (m = d), (d = v);
            for (;;) {
              if (d === e) break t;
              if (
                (m === n && ++u === i && (s = o),
                m === a && ++c === r && (l = o),
                (v = d.nextSibling) !== null)
              )
                break;
              (d = m), (m = d.parentNode);
            }
            d = v;
          }
          n = s === -1 || l === -1 ? null : { start: s, end: l };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (pf = { focusedElem: e, selectionRange: n }, Gs = !1, q = t; q !== null; )
    if (((t = q), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (q = e);
    else
      for (; q !== null; ) {
        t = q;
        try {
          var b = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (b !== null) {
                  var _ = b.memoizedProps,
                    C = b.memoizedState,
                    x = t.stateNode,
                    g = x.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? _ : Vt(t.type, _),
                      C
                    );
                  x.__reactInternalSnapshotBeforeUpdate = g;
                }
                break;
              case 3:
                var w = t.stateNode.containerInfo;
                w.nodeType === 1
                  ? (w.textContent = "")
                  : w.nodeType === 9 &&
                    w.documentElement &&
                    w.removeChild(w.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(U(163));
            }
        } catch (E) {
          Fe(t, t.return, E);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (q = e);
          break;
        }
        q = t.return;
      }
  return (b = Rp), (Rp = !1), b;
}
function Fa(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var i = (r = r.next);
    do {
      if ((i.tag & e) === e) {
        var a = i.destroy;
        (i.destroy = void 0), a !== void 0 && Af(t, n, a);
      }
      i = i.next;
    } while (i !== r);
  }
}
function Yl(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Tf(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function Vy(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), Vy(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[pn], delete t[to], delete t[yf], delete t[ox], delete t[sx])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function Gy(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Bp(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Gy(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Of(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = Ys));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Of(e, t, n), e = e.sibling; e !== null; ) Of(e, t, n), (e = e.sibling);
}
function jf(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (jf(e, t, n), e = e.sibling; e !== null; ) jf(e, t, n), (e = e.sibling);
}
var nt = null,
  Qt = !1;
function Rn(e, t, n) {
  for (n = n.child; n !== null; ) Qy(e, t, n), (n = n.sibling);
}
function Qy(e, t, n) {
  if (gn && typeof gn.onCommitFiberUnmount == "function")
    try {
      gn.onCommitFiberUnmount(zl, n);
    } catch {}
  switch (n.tag) {
    case 5:
      ut || gi(n, t);
    case 6:
      var r = nt,
        i = Qt;
      (nt = null),
        Rn(e, t, n),
        (nt = r),
        (Qt = i),
        nt !== null &&
          (Qt
            ? ((e = nt),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : nt.removeChild(n.stateNode));
      break;
    case 18:
      nt !== null &&
        (Qt
          ? ((e = nt),
            (n = n.stateNode),
            e.nodeType === 8
              ? oc(e.parentNode, n)
              : e.nodeType === 1 && oc(e, n),
            Ya(e))
          : oc(nt, n.stateNode));
      break;
    case 4:
      (r = nt),
        (i = Qt),
        (nt = n.stateNode.containerInfo),
        (Qt = !0),
        Rn(e, t, n),
        (nt = r),
        (Qt = i);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !ut &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        i = r = r.next;
        do {
          var a = i,
            o = a.destroy;
          (a = a.tag),
            o !== void 0 && (a & 2 || a & 4) && Af(n, t, o),
            (i = i.next);
        } while (i !== r);
      }
      Rn(e, t, n);
      break;
    case 1:
      if (
        !ut &&
        (gi(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (s) {
          Fe(n, t, s);
        }
      Rn(e, t, n);
      break;
    case 21:
      Rn(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((ut = (r = ut) || n.memoizedState !== null), Rn(e, t, n), (ut = r))
        : Rn(e, t, n);
      break;
    default:
      Rn(e, t, n);
  }
}
function $p(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Sx()),
      t.forEach(function (r) {
        var i = jx.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(i, i));
      });
  }
}
function qt(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      try {
        var a = e,
          o = t,
          s = o;
        e: for (; s !== null; ) {
          switch (s.tag) {
            case 5:
              (nt = s.stateNode), (Qt = !1);
              break e;
            case 3:
              (nt = s.stateNode.containerInfo), (Qt = !0);
              break e;
            case 4:
              (nt = s.stateNode.containerInfo), (Qt = !0);
              break e;
          }
          s = s.return;
        }
        if (nt === null) throw Error(U(160));
        Qy(a, o, i), (nt = null), (Qt = !1);
        var l = i.alternate;
        l !== null && (l.return = null), (i.return = null);
      } catch (u) {
        Fe(i, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) Ky(t, e), (t = t.sibling);
}
function Ky(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((qt(t, e), sn(e), r & 4)) {
        try {
          Fa(3, e, e.return), Yl(3, e);
        } catch (_) {
          Fe(e, e.return, _);
        }
        try {
          Fa(5, e, e.return);
        } catch (_) {
          Fe(e, e.return, _);
        }
      }
      break;
    case 1:
      qt(t, e), sn(e), r & 512 && n !== null && gi(n, n.return);
      break;
    case 5:
      if (
        (qt(t, e),
        sn(e),
        r & 512 && n !== null && gi(n, n.return),
        e.flags & 32)
      ) {
        var i = e.stateNode;
        try {
          Va(i, "");
        } catch (_) {
          Fe(e, e.return, _);
        }
      }
      if (r & 4 && ((i = e.stateNode), i != null)) {
        var a = e.memoizedProps,
          o = n !== null ? n.memoizedProps : a,
          s = e.type,
          l = e.updateQueue;
        if (((e.updateQueue = null), l !== null))
          try {
            s === "input" && a.type === "radio" && a.name != null && gg(i, a),
              nf(s, o);
            var u = nf(s, a);
            for (o = 0; o < l.length; o += 2) {
              var c = l[o],
                d = l[o + 1];
              c === "style"
                ? xg(i, d)
                : c === "dangerouslySetInnerHTML"
                ? wg(i, d)
                : c === "children"
                ? Va(i, d)
                : Hd(i, c, d, u);
            }
            switch (s) {
              case "input":
                Zc(i, a);
                break;
              case "textarea":
                yg(i, a);
                break;
              case "select":
                var m = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!a.multiple;
                var v = a.value;
                v != null
                  ? Ei(i, !!a.multiple, v, !1)
                  : m !== !!a.multiple &&
                    (a.defaultValue != null
                      ? Ei(i, !!a.multiple, a.defaultValue, !0)
                      : Ei(i, !!a.multiple, a.multiple ? [] : "", !1));
            }
            i[to] = a;
          } catch (_) {
            Fe(e, e.return, _);
          }
      }
      break;
    case 6:
      if ((qt(t, e), sn(e), r & 4)) {
        if (e.stateNode === null) throw Error(U(162));
        (i = e.stateNode), (a = e.memoizedProps);
        try {
          i.nodeValue = a;
        } catch (_) {
          Fe(e, e.return, _);
        }
      }
      break;
    case 3:
      if (
        (qt(t, e), sn(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          Ya(t.containerInfo);
        } catch (_) {
          Fe(e, e.return, _);
        }
      break;
    case 4:
      qt(t, e), sn(e);
      break;
    case 13:
      qt(t, e),
        sn(e),
        (i = e.child),
        i.flags & 8192 &&
          ((a = i.memoizedState !== null),
          (i.stateNode.isHidden = a),
          !a ||
            (i.alternate !== null && i.alternate.memoizedState !== null) ||
            (Sh = Be())),
        r & 4 && $p(e);
      break;
    case 22:
      if (
        ((c = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((ut = (u = ut) || c), qt(t, e), (ut = u)) : qt(t, e),
        sn(e),
        r & 8192)
      ) {
        if (
          ((u = e.memoizedState !== null),
          (e.stateNode.isHidden = u) && !c && e.mode & 1)
        )
          for (q = e, c = e.child; c !== null; ) {
            for (d = q = c; q !== null; ) {
              switch (((m = q), (v = m.child), m.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Fa(4, m, m.return);
                  break;
                case 1:
                  gi(m, m.return);
                  var b = m.stateNode;
                  if (typeof b.componentWillUnmount == "function") {
                    (r = m), (n = m.return);
                    try {
                      (t = r),
                        (b.props = t.memoizedProps),
                        (b.state = t.memoizedState),
                        b.componentWillUnmount();
                    } catch (_) {
                      Fe(r, n, _);
                    }
                  }
                  break;
                case 5:
                  gi(m, m.return);
                  break;
                case 22:
                  if (m.memoizedState !== null) {
                    Wp(d);
                    continue;
                  }
              }
              v !== null ? ((v.return = m), (q = v)) : Wp(d);
            }
            c = c.sibling;
          }
        e: for (c = null, d = e; ; ) {
          if (d.tag === 5) {
            if (c === null) {
              c = d;
              try {
                (i = d.stateNode),
                  u
                    ? ((a = i.style),
                      typeof a.setProperty == "function"
                        ? a.setProperty("display", "none", "important")
                        : (a.display = "none"))
                    : ((s = d.stateNode),
                      (l = d.memoizedProps.style),
                      (o =
                        l != null && l.hasOwnProperty("display")
                          ? l.display
                          : null),
                      (s.style.display = bg("display", o)));
              } catch (_) {
                Fe(e, e.return, _);
              }
            }
          } else if (d.tag === 6) {
            if (c === null)
              try {
                d.stateNode.nodeValue = u ? "" : d.memoizedProps;
              } catch (_) {
                Fe(e, e.return, _);
              }
          } else if (
            ((d.tag !== 22 && d.tag !== 23) ||
              d.memoizedState === null ||
              d === e) &&
            d.child !== null
          ) {
            (d.child.return = d), (d = d.child);
            continue;
          }
          if (d === e) break e;
          for (; d.sibling === null; ) {
            if (d.return === null || d.return === e) break e;
            c === d && (c = null), (d = d.return);
          }
          c === d && (c = null), (d.sibling.return = d.return), (d = d.sibling);
        }
      }
      break;
    case 19:
      qt(t, e), sn(e), r & 4 && $p(e);
      break;
    case 21:
      break;
    default:
      qt(t, e), sn(e);
  }
}
function sn(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Gy(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(U(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (Va(i, ""), (r.flags &= -33));
          var a = Bp(e);
          jf(e, a, i);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo,
            s = Bp(e);
          Of(e, s, o);
          break;
        default:
          throw Error(U(161));
      }
    } catch (l) {
      Fe(e, e.return, l);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function _x(e, t, n) {
  (q = e), Yy(e);
}
function Yy(e, t, n) {
  for (var r = (e.mode & 1) !== 0; q !== null; ) {
    var i = q,
      a = i.child;
    if (i.tag === 22 && r) {
      var o = i.memoizedState !== null || os;
      if (!o) {
        var s = i.alternate,
          l = (s !== null && s.memoizedState !== null) || ut;
        s = os;
        var u = ut;
        if (((os = o), (ut = l) && !u))
          for (q = i; q !== null; )
            (o = q),
              (l = o.child),
              o.tag === 22 && o.memoizedState !== null
                ? Hp(i)
                : l !== null
                ? ((l.return = o), (q = l))
                : Hp(i);
        for (; a !== null; ) (q = a), Yy(a), (a = a.sibling);
        (q = i), (os = s), (ut = u);
      }
      zp(e);
    } else
      i.subtreeFlags & 8772 && a !== null ? ((a.return = i), (q = a)) : zp(e);
  }
}
function zp(e) {
  for (; q !== null; ) {
    var t = q;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ut || Yl(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !ut)
                if (n === null) r.componentDidMount();
                else {
                  var i =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : Vt(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    i,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var a = t.updateQueue;
              a !== null && _p(t, a, r);
              break;
            case 3:
              var o = t.updateQueue;
              if (o !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                _p(t, o, n);
              }
              break;
            case 5:
              var s = t.stateNode;
              if (n === null && t.flags & 4) {
                n = s;
                var l = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    l.autoFocus && n.focus();
                    break;
                  case "img":
                    l.src && (n.src = l.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var c = u.memoizedState;
                  if (c !== null) {
                    var d = c.dehydrated;
                    d !== null && Ya(d);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(U(163));
          }
        ut || (t.flags & 512 && Tf(t));
      } catch (m) {
        Fe(t, t.return, m);
      }
    }
    if (t === e) {
      q = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (q = n);
      break;
    }
    q = t.return;
  }
}
function Wp(e) {
  for (; q !== null; ) {
    var t = q;
    if (t === e) {
      q = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (q = n);
      break;
    }
    q = t.return;
  }
}
function Hp(e) {
  for (; q !== null; ) {
    var t = q;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Yl(4, t);
          } catch (l) {
            Fe(t, n, l);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = t.return;
            try {
              r.componentDidMount();
            } catch (l) {
              Fe(t, i, l);
            }
          }
          var a = t.return;
          try {
            Tf(t);
          } catch (l) {
            Fe(t, a, l);
          }
          break;
        case 5:
          var o = t.return;
          try {
            Tf(t);
          } catch (l) {
            Fe(t, o, l);
          }
      }
    } catch (l) {
      Fe(t, t.return, l);
    }
    if (t === e) {
      q = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      (s.return = t.return), (q = s);
      break;
    }
    q = t.return;
  }
}
var kx = Math.ceil,
  sl = In.ReactCurrentDispatcher,
  xh = In.ReactCurrentOwner,
  $t = In.ReactCurrentBatchConfig,
  de = 0,
  tt = null,
  qe = null,
  rt = 0,
  Nt = 0,
  yi = mr(0),
  Ke = 0,
  so = null,
  Wr = 0,
  Zl = 0,
  Eh = 0,
  Ua = null,
  vt = null,
  Sh = 0,
  Mi = 1 / 0,
  vn = null,
  ll = !1,
  If = null,
  nr = null,
  ss = !1,
  Qn = null,
  ul = 0,
  Ma = 0,
  Lf = null,
  js = -1,
  Is = 0;
function pt() {
  return de & 6 ? Be() : js !== -1 ? js : (js = Be());
}
function rr(e) {
  return e.mode & 1
    ? de & 2 && rt !== 0
      ? rt & -rt
      : ux.transition !== null
      ? (Is === 0 && (Is = jg()), Is)
      : ((e = ye),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Bg(e.type))),
        e)
    : 1;
}
function en(e, t, n, r) {
  if (50 < Ma) throw ((Ma = 0), (Lf = null), Error(U(185)));
  ko(e, n, r),
    (!(de & 2) || e !== tt) &&
      (e === tt && (!(de & 2) && (Zl |= n), Ke === 4 && qn(e, rt)),
      Et(e, r),
      n === 1 && de === 0 && !(t.mode & 1) && ((Mi = Be() + 500), Gl && gr()));
}
function Et(e, t) {
  var n = e.callbackNode;
  u3(e, t);
  var r = Vs(e, e === tt ? rt : 0);
  if (r === 0)
    n !== null && J0(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && J0(n), t === 1))
      e.tag === 0 ? lx(qp.bind(null, e)) : ay(qp.bind(null, e)),
        ix(function () {
          !(de & 6) && gr();
        }),
        (n = null);
    else {
      switch (Ig(r)) {
        case 1:
          n = Kd;
          break;
        case 4:
          n = Tg;
          break;
        case 16:
          n = qs;
          break;
        case 536870912:
          n = Og;
          break;
        default:
          n = qs;
      }
      n = iv(n, Zy.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function Zy(e, t) {
  if (((js = -1), (Is = 0), de & 6)) throw Error(U(327));
  var n = e.callbackNode;
  if (Ni() && e.callbackNode !== n) return null;
  var r = Vs(e, e === tt ? rt : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = cl(e, r);
  else {
    t = r;
    var i = de;
    de |= 2;
    var a = Jy();
    (tt !== e || rt !== t) && ((vn = null), (Mi = Be() + 500), Fr(e, t));
    do
      try {
        Px();
        break;
      } catch (s) {
        Xy(e, s);
      }
    while (1);
    lh(),
      (sl.current = a),
      (de = i),
      qe !== null ? (t = 0) : ((tt = null), (rt = 0), (t = Ke));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((i = lf(e)), i !== 0 && ((r = i), (t = Ff(e, i)))), t === 1)
    )
      throw ((n = so), Fr(e, 0), qn(e, r), Et(e, Be()), n);
    if (t === 6) qn(e, r);
    else {
      if (
        ((i = e.current.alternate),
        !(r & 30) &&
          !Nx(i) &&
          ((t = cl(e, r)),
          t === 2 && ((a = lf(e)), a !== 0 && ((r = a), (t = Ff(e, a)))),
          t === 1))
      )
        throw ((n = so), Fr(e, 0), qn(e, r), Et(e, Be()), n);
      switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(U(345));
        case 2:
          kr(e, vt, vn);
          break;
        case 3:
          if (
            (qn(e, r), (r & 130023424) === r && ((t = Sh + 500 - Be()), 10 < t))
          ) {
            if (Vs(e, 0) !== 0) break;
            if (((i = e.suspendedLanes), (i & r) !== r)) {
              pt(), (e.pingedLanes |= e.suspendedLanes & i);
              break;
            }
            e.timeoutHandle = gf(kr.bind(null, e, vt, vn), t);
            break;
          }
          kr(e, vt, vn);
          break;
        case 4:
          if ((qn(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, i = -1; 0 < r; ) {
            var o = 31 - Jt(r);
            (a = 1 << o), (o = t[o]), o > i && (i = o), (r &= ~a);
          }
          if (
            ((r = i),
            (r = Be() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * kx(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = gf(kr.bind(null, e, vt, vn), r);
            break;
          }
          kr(e, vt, vn);
          break;
        case 5:
          kr(e, vt, vn);
          break;
        default:
          throw Error(U(329));
      }
    }
  }
  return Et(e, Be()), e.callbackNode === n ? Zy.bind(null, e) : null;
}
function Ff(e, t) {
  var n = Ua;
  return (
    e.current.memoizedState.isDehydrated && (Fr(e, t).flags |= 256),
    (e = cl(e, t)),
    e !== 2 && ((t = vt), (vt = n), t !== null && Uf(t)),
    e
  );
}
function Uf(e) {
  vt === null ? (vt = e) : vt.push.apply(vt, e);
}
function Nx(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var i = n[r],
            a = i.getSnapshot;
          i = i.value;
          try {
            if (!nn(a(), i)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function qn(e, t) {
  for (
    t &= ~Eh,
      t &= ~Zl,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - Jt(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function qp(e) {
  if (de & 6) throw Error(U(327));
  Ni();
  var t = Vs(e, 0);
  if (!(t & 1)) return Et(e, Be()), null;
  var n = cl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = lf(e);
    r !== 0 && ((t = r), (n = Ff(e, r)));
  }
  if (n === 1) throw ((n = so), Fr(e, 0), qn(e, t), Et(e, Be()), n);
  if (n === 6) throw Error(U(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    kr(e, vt, vn),
    Et(e, Be()),
    null
  );
}
function Ch(e, t) {
  var n = de;
  de |= 1;
  try {
    return e(t);
  } finally {
    (de = n), de === 0 && ((Mi = Be() + 500), Gl && gr());
  }
}
function Hr(e) {
  Qn !== null && Qn.tag === 0 && !(de & 6) && Ni();
  var t = de;
  de |= 1;
  var n = $t.transition,
    r = ye;
  try {
    if ((($t.transition = null), (ye = 1), e)) return e();
  } finally {
    (ye = r), ($t.transition = n), (de = t), !(de & 6) && gr();
  }
}
function _h() {
  (Nt = yi.current), Ne(yi);
}
function Fr(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), rx(n)), qe !== null))
    for (n = qe.return; n !== null; ) {
      var r = n;
      switch ((ah(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && Zs();
          break;
        case 3:
          Fi(), Ne(bt), Ne(ct), ph();
          break;
        case 5:
          hh(r);
          break;
        case 4:
          Fi();
          break;
        case 13:
          Ne(Te);
          break;
        case 19:
          Ne(Te);
          break;
        case 10:
          uh(r.type._context);
          break;
        case 22:
        case 23:
          _h();
      }
      n = n.return;
    }
  if (
    ((tt = e),
    (qe = e = ir(e.current, null)),
    (rt = Nt = t),
    (Ke = 0),
    (so = null),
    (Eh = Zl = Wr = 0),
    (vt = Ua = null),
    Ar !== null)
  ) {
    for (t = 0; t < Ar.length; t++)
      if (((n = Ar[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var i = r.next,
          a = n.pending;
        if (a !== null) {
          var o = a.next;
          (a.next = i), (r.next = o);
        }
        n.pending = r;
      }
    Ar = null;
  }
  return e;
}
function Xy(e, t) {
  do {
    var n = qe;
    try {
      if ((lh(), (As.current = ol), al)) {
        for (var r = je.memoizedState; r !== null; ) {
          var i = r.queue;
          i !== null && (i.pending = null), (r = r.next);
        }
        al = !1;
      }
      if (
        ((zr = 0),
        (et = Qe = je = null),
        (La = !1),
        (io = 0),
        (xh.current = null),
        n === null || n.return === null)
      ) {
        (Ke = 1), (so = t), (qe = null);
        break;
      }
      e: {
        var a = e,
          o = n.return,
          s = n,
          l = t;
        if (
          ((t = rt),
          (s.flags |= 32768),
          l !== null && typeof l == "object" && typeof l.then == "function")
        ) {
          var u = l,
            c = s,
            d = c.tag;
          if (!(c.mode & 1) && (d === 0 || d === 11 || d === 15)) {
            var m = c.alternate;
            m
              ? ((c.updateQueue = m.updateQueue),
                (c.memoizedState = m.memoizedState),
                (c.lanes = m.lanes))
              : ((c.updateQueue = null), (c.memoizedState = null));
          }
          var v = Op(o);
          if (v !== null) {
            (v.flags &= -257),
              jp(v, o, s, a, t),
              v.mode & 1 && Tp(a, u, t),
              (t = v),
              (l = u);
            var b = t.updateQueue;
            if (b === null) {
              var _ = new Set();
              _.add(l), (t.updateQueue = _);
            } else b.add(l);
            break e;
          } else {
            if (!(t & 1)) {
              Tp(a, u, t), kh();
              break e;
            }
            l = Error(U(426));
          }
        } else if (Ae && s.mode & 1) {
          var C = Op(o);
          if (C !== null) {
            !(C.flags & 65536) && (C.flags |= 256),
              jp(C, o, s, a, t),
              oh(Ui(l, s));
            break e;
          }
        }
        (a = l = Ui(l, s)),
          Ke !== 4 && (Ke = 2),
          Ua === null ? (Ua = [a]) : Ua.push(a),
          (a = o);
        do {
          switch (a.tag) {
            case 3:
              (a.flags |= 65536), (t &= -t), (a.lanes |= t);
              var x = Ly(a, l, t);
              Cp(a, x);
              break e;
            case 1:
              s = l;
              var g = a.type,
                w = a.stateNode;
              if (
                !(a.flags & 128) &&
                (typeof g.getDerivedStateFromError == "function" ||
                  (w !== null &&
                    typeof w.componentDidCatch == "function" &&
                    (nr === null || !nr.has(w))))
              ) {
                (a.flags |= 65536), (t &= -t), (a.lanes |= t);
                var E = Fy(a, s, t);
                Cp(a, E);
                break e;
              }
          }
          a = a.return;
        } while (a !== null);
      }
      tv(n);
    } catch (N) {
      (t = N), qe === n && n !== null && (qe = n = n.return);
      continue;
    }
    break;
  } while (1);
}
function Jy() {
  var e = sl.current;
  return (sl.current = ol), e === null ? ol : e;
}
function kh() {
  (Ke === 0 || Ke === 3 || Ke === 2) && (Ke = 4),
    tt === null || (!(Wr & 268435455) && !(Zl & 268435455)) || qn(tt, rt);
}
function cl(e, t) {
  var n = de;
  de |= 2;
  var r = Jy();
  (tt !== e || rt !== t) && ((vn = null), Fr(e, t));
  do
    try {
      Dx();
      break;
    } catch (i) {
      Xy(e, i);
    }
  while (1);
  if ((lh(), (de = n), (sl.current = r), qe !== null)) throw Error(U(261));
  return (tt = null), (rt = 0), Ke;
}
function Dx() {
  for (; qe !== null; ) ev(qe);
}
function Px() {
  for (; qe !== null && !e3(); ) ev(qe);
}
function ev(e) {
  var t = rv(e.alternate, e, Nt);
  (e.memoizedProps = e.pendingProps),
    t === null ? tv(e) : (qe = t),
    (xh.current = null);
}
function tv(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = Ex(n, t)), n !== null)) {
        (n.flags &= 32767), (qe = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (Ke = 6), (qe = null);
        return;
      }
    } else if (((n = xx(n, t, Nt)), n !== null)) {
      qe = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      qe = t;
      return;
    }
    qe = t = e;
  } while (t !== null);
  Ke === 0 && (Ke = 5);
}
function kr(e, t, n) {
  var r = ye,
    i = $t.transition;
  try {
    ($t.transition = null), (ye = 1), Ax(e, t, n, r);
  } finally {
    ($t.transition = i), (ye = r);
  }
  return null;
}
function Ax(e, t, n, r) {
  do Ni();
  while (Qn !== null);
  if (de & 6) throw Error(U(327));
  n = e.finishedWork;
  var i = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(U(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var a = n.lanes | n.childLanes;
  if (
    (c3(e, a),
    e === tt && ((qe = tt = null), (rt = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      ss ||
      ((ss = !0),
      iv(qs, function () {
        return Ni(), null;
      })),
    (a = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || a)
  ) {
    (a = $t.transition), ($t.transition = null);
    var o = ye;
    ye = 1;
    var s = de;
    (de |= 4),
      (xh.current = null),
      Cx(e, n),
      Ky(n, e),
      Y3(pf),
      (Gs = !!hf),
      (pf = hf = null),
      (e.current = n),
      _x(n),
      t3(),
      (de = s),
      (ye = o),
      ($t.transition = a);
  } else e.current = n;
  if (
    (ss && ((ss = !1), (Qn = e), (ul = i)),
    (a = e.pendingLanes),
    a === 0 && (nr = null),
    i3(n.stateNode),
    Et(e, Be()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (i = t[n]), r(i.value, { componentStack: i.stack, digest: i.digest });
  if (ll) throw ((ll = !1), (e = If), (If = null), e);
  return (
    ul & 1 && e.tag !== 0 && Ni(),
    (a = e.pendingLanes),
    a & 1 ? (e === Lf ? Ma++ : ((Ma = 0), (Lf = e))) : (Ma = 0),
    gr(),
    null
  );
}
function Ni() {
  if (Qn !== null) {
    var e = Ig(ul),
      t = $t.transition,
      n = ye;
    try {
      if ((($t.transition = null), (ye = 16 > e ? 16 : e), Qn === null))
        var r = !1;
      else {
        if (((e = Qn), (Qn = null), (ul = 0), de & 6)) throw Error(U(331));
        var i = de;
        for (de |= 4, q = e.current; q !== null; ) {
          var a = q,
            o = a.child;
          if (q.flags & 16) {
            var s = a.deletions;
            if (s !== null) {
              for (var l = 0; l < s.length; l++) {
                var u = s[l];
                for (q = u; q !== null; ) {
                  var c = q;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Fa(8, c, a);
                  }
                  var d = c.child;
                  if (d !== null) (d.return = c), (q = d);
                  else
                    for (; q !== null; ) {
                      c = q;
                      var m = c.sibling,
                        v = c.return;
                      if ((Vy(c), c === u)) {
                        q = null;
                        break;
                      }
                      if (m !== null) {
                        (m.return = v), (q = m);
                        break;
                      }
                      q = v;
                    }
                }
              }
              var b = a.alternate;
              if (b !== null) {
                var _ = b.child;
                if (_ !== null) {
                  b.child = null;
                  do {
                    var C = _.sibling;
                    (_.sibling = null), (_ = C);
                  } while (_ !== null);
                }
              }
              q = a;
            }
          }
          if (a.subtreeFlags & 2064 && o !== null) (o.return = a), (q = o);
          else
            e: for (; q !== null; ) {
              if (((a = q), a.flags & 2048))
                switch (a.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Fa(9, a, a.return);
                }
              var x = a.sibling;
              if (x !== null) {
                (x.return = a.return), (q = x);
                break e;
              }
              q = a.return;
            }
        }
        var g = e.current;
        for (q = g; q !== null; ) {
          o = q;
          var w = o.child;
          if (o.subtreeFlags & 2064 && w !== null) (w.return = o), (q = w);
          else
            e: for (o = g; q !== null; ) {
              if (((s = q), s.flags & 2048))
                try {
                  switch (s.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Yl(9, s);
                  }
                } catch (N) {
                  Fe(s, s.return, N);
                }
              if (s === o) {
                q = null;
                break e;
              }
              var E = s.sibling;
              if (E !== null) {
                (E.return = s.return), (q = E);
                break e;
              }
              q = s.return;
            }
        }
        if (
          ((de = i), gr(), gn && typeof gn.onPostCommitFiberRoot == "function")
        )
          try {
            gn.onPostCommitFiberRoot(zl, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (ye = n), ($t.transition = t);
    }
  }
  return !1;
}
function Vp(e, t, n) {
  (t = Ui(n, t)),
    (t = Ly(e, t, 1)),
    (e = tr(e, t, 1)),
    (t = pt()),
    e !== null && (ko(e, 1, t), Et(e, t));
}
function Fe(e, t, n) {
  if (e.tag === 3) Vp(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Vp(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (nr === null || !nr.has(r)))
        ) {
          (e = Ui(n, e)),
            (e = Fy(t, e, 1)),
            (t = tr(t, e, 1)),
            (e = pt()),
            t !== null && (ko(t, 1, e), Et(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function Tx(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = pt()),
    (e.pingedLanes |= e.suspendedLanes & n),
    tt === e &&
      (rt & n) === n &&
      (Ke === 4 || (Ke === 3 && (rt & 130023424) === rt && 500 > Be() - Sh)
        ? Fr(e, 0)
        : (Eh |= n)),
    Et(e, t);
}
function nv(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Zo), (Zo <<= 1), !(Zo & 130023424) && (Zo = 4194304))
      : (t = 1));
  var n = pt();
  (e = Nn(e, t)), e !== null && (ko(e, t, n), Et(e, n));
}
function Ox(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), nv(e, n);
}
function jx(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        i = e.memoizedState;
      i !== null && (n = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(U(314));
  }
  r !== null && r.delete(t), nv(e, n);
}
var rv;
rv = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || bt.current) wt = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (wt = !1), bx(e, t, n);
      wt = !!(e.flags & 131072);
    }
  else (wt = !1), Ae && t.flags & 1048576 && oy(t, el, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      Os(e, t), (e = t.pendingProps);
      var i = ji(t, ct.current);
      ki(t, n), (i = gh(null, t, r, e, i, n));
      var a = yh();
      return (
        (t.flags |= 1),
        typeof i == "object" &&
        i !== null &&
        typeof i.render == "function" &&
        i.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            xt(r) ? ((a = !0), Xs(t)) : (a = !1),
            (t.memoizedState =
              i.state !== null && i.state !== void 0 ? i.state : null),
            fh(t),
            (i.updater = Ql),
            (t.stateNode = i),
            (i._reactInternals = t),
            Sf(t, r, e, n),
            (t = kf(null, t, r, !0, a, n)))
          : ((t.tag = 0), Ae && a && ih(t), dt(null, t, i, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Os(e, t),
          (e = t.pendingProps),
          (i = r._init),
          (r = i(r._payload)),
          (t.type = r),
          (i = t.tag = Lx(r)),
          (e = Vt(r, e)),
          i)
        ) {
          case 0:
            t = _f(null, t, r, e, n);
            break e;
          case 1:
            t = Fp(null, t, r, e, n);
            break e;
          case 11:
            t = Ip(null, t, r, e, n);
            break e;
          case 14:
            t = Lp(null, t, r, Vt(r.type, e), n);
            break e;
        }
        throw Error(U(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Vt(r, i)),
        _f(e, t, r, i, n)
      );
    case 1:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Vt(r, i)),
        Fp(e, t, r, i, n)
      );
    case 3:
      e: {
        if ((By(t), e === null)) throw Error(U(387));
        (r = t.pendingProps),
          (a = t.memoizedState),
          (i = a.element),
          cy(e, t),
          rl(t, r, null, n);
        var o = t.memoizedState;
        if (((r = o.element), a.isDehydrated))
          if (
            ((a = {
              element: r,
              isDehydrated: !1,
              cache: o.cache,
              pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
              transitions: o.transitions,
            }),
            (t.updateQueue.baseState = a),
            (t.memoizedState = a),
            t.flags & 256)
          ) {
            (i = Ui(Error(U(423)), t)), (t = Up(e, t, r, n, i));
            break e;
          } else if (r !== i) {
            (i = Ui(Error(U(424)), t)), (t = Up(e, t, r, n, i));
            break e;
          } else
            for (
              Dt = er(t.stateNode.containerInfo.firstChild),
                Tt = t,
                Ae = !0,
                Kt = null,
                n = py(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((Ii(), r === i)) {
            t = Dn(e, t, n);
            break e;
          }
          dt(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        my(t),
        e === null && bf(t),
        (r = t.type),
        (i = t.pendingProps),
        (a = e !== null ? e.memoizedProps : null),
        (o = i.children),
        mf(r, i) ? (o = null) : a !== null && mf(r, a) && (t.flags |= 32),
        Ry(e, t),
        dt(e, t, o, n),
        t.child
      );
    case 6:
      return e === null && bf(t), null;
    case 13:
      return $y(e, t, n);
    case 4:
      return (
        dh(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = Li(t, null, r, n)) : dt(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Vt(r, i)),
        Ip(e, t, r, i, n)
      );
    case 7:
      return dt(e, t, t.pendingProps, n), t.child;
    case 8:
      return dt(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return dt(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (i = t.pendingProps),
          (a = t.memoizedProps),
          (o = i.value),
          Se(tl, r._currentValue),
          (r._currentValue = o),
          a !== null)
        )
          if (nn(a.value, o)) {
            if (a.children === i.children && !bt.current) {
              t = Dn(e, t, n);
              break e;
            }
          } else
            for (a = t.child, a !== null && (a.return = t); a !== null; ) {
              var s = a.dependencies;
              if (s !== null) {
                o = a.child;
                for (var l = s.firstContext; l !== null; ) {
                  if (l.context === r) {
                    if (a.tag === 1) {
                      (l = Cn(-1, n & -n)), (l.tag = 2);
                      var u = a.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var c = u.pending;
                        c === null
                          ? (l.next = l)
                          : ((l.next = c.next), (c.next = l)),
                          (u.pending = l);
                      }
                    }
                    (a.lanes |= n),
                      (l = a.alternate),
                      l !== null && (l.lanes |= n),
                      xf(a.return, n, t),
                      (s.lanes |= n);
                    break;
                  }
                  l = l.next;
                }
              } else if (a.tag === 10) o = a.type === t.type ? null : a.child;
              else if (a.tag === 18) {
                if (((o = a.return), o === null)) throw Error(U(341));
                (o.lanes |= n),
                  (s = o.alternate),
                  s !== null && (s.lanes |= n),
                  xf(o, n, t),
                  (o = a.sibling);
              } else o = a.child;
              if (o !== null) o.return = a;
              else
                for (o = a; o !== null; ) {
                  if (o === t) {
                    o = null;
                    break;
                  }
                  if (((a = o.sibling), a !== null)) {
                    (a.return = o.return), (o = a);
                    break;
                  }
                  o = o.return;
                }
              a = o;
            }
        dt(e, t, i.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (i = t.type),
        (r = t.pendingProps.children),
        ki(t, n),
        (i = zt(i)),
        (r = r(i)),
        (t.flags |= 1),
        dt(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (i = Vt(r, t.pendingProps)),
        (i = Vt(r.type, i)),
        Lp(e, t, r, i, n)
      );
    case 15:
      return Uy(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (i = t.pendingProps),
        (i = t.elementType === r ? i : Vt(r, i)),
        Os(e, t),
        (t.tag = 1),
        xt(r) ? ((e = !0), Xs(t)) : (e = !1),
        ki(t, n),
        dy(t, r, i),
        Sf(t, r, i, n),
        kf(null, t, r, !0, e, n)
      );
    case 19:
      return zy(e, t, n);
    case 22:
      return My(e, t, n);
  }
  throw Error(U(156, t.tag));
};
function iv(e, t) {
  return Ag(e, t);
}
function Ix(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function Bt(e, t, n, r) {
  return new Ix(e, t, n, r);
}
function Nh(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function Lx(e) {
  if (typeof e == "function") return Nh(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Vd)) return 11;
    if (e === Gd) return 14;
  }
  return 2;
}
function ir(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Bt(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Ls(e, t, n, r, i, a) {
  var o = 2;
  if (((r = e), typeof e == "function")) Nh(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else
    e: switch (e) {
      case si:
        return Ur(n.children, i, a, t);
      case qd:
        (o = 8), (i |= 8);
        break;
      case Vc:
        return (
          (e = Bt(12, n, t, i | 2)), (e.elementType = Vc), (e.lanes = a), e
        );
      case Gc:
        return (e = Bt(13, n, t, i)), (e.elementType = Gc), (e.lanes = a), e;
      case Qc:
        return (e = Bt(19, n, t, i)), (e.elementType = Qc), (e.lanes = a), e;
      case hg:
        return Xl(n, i, a, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case fg:
              o = 10;
              break e;
            case dg:
              o = 9;
              break e;
            case Vd:
              o = 11;
              break e;
            case Gd:
              o = 14;
              break e;
            case $n:
              (o = 16), (r = null);
              break e;
          }
        throw Error(U(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = Bt(o, n, t, i)), (t.elementType = e), (t.type = r), (t.lanes = a), t
  );
}
function Ur(e, t, n, r) {
  return (e = Bt(7, e, r, t)), (e.lanes = n), e;
}
function Xl(e, t, n, r) {
  return (
    (e = Bt(22, e, r, t)),
    (e.elementType = hg),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function pc(e, t, n) {
  return (e = Bt(6, e, null, t)), (e.lanes = n), e;
}
function mc(e, t, n) {
  return (
    (t = Bt(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Fx(e, t, n, r, i) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Ku(0)),
    (this.expirationTimes = Ku(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Ku(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null);
}
function Dh(e, t, n, r, i, a, o, s, l) {
  return (
    (e = new Fx(e, t, n, s, l)),
    t === 1 ? ((t = 1), a === !0 && (t |= 8)) : (t = 0),
    (a = Bt(3, null, null, t)),
    (e.current = a),
    (a.stateNode = e),
    (a.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    fh(a),
    e
  );
}
function Ux(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: oi,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function av(e) {
  if (!e) return lr;
  e = e._reactInternals;
  e: {
    if (Kr(e) !== e || e.tag !== 1) throw Error(U(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (xt(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(U(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (xt(n)) return iy(e, n, t);
  }
  return t;
}
function ov(e, t, n, r, i, a, o, s, l) {
  return (
    (e = Dh(n, r, !0, e, i, a, o, s, l)),
    (e.context = av(null)),
    (n = e.current),
    (r = pt()),
    (i = rr(n)),
    (a = Cn(r, i)),
    (a.callback = t ?? null),
    tr(n, a, i),
    (e.current.lanes = i),
    ko(e, i, r),
    Et(e, r),
    e
  );
}
function Jl(e, t, n, r) {
  var i = t.current,
    a = pt(),
    o = rr(i);
  return (
    (n = av(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Cn(a, o)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = tr(i, t, o)),
    e !== null && (en(e, i, o, a), Ps(e, i, o)),
    o
  );
}
function fl(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Gp(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Ph(e, t) {
  Gp(e, t), (e = e.alternate) && Gp(e, t);
}
function Mx() {
  return null;
}
var sv =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Ah(e) {
  this._internalRoot = e;
}
eu.prototype.render = Ah.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(U(409));
  Jl(e, t, null, null);
};
eu.prototype.unmount = Ah.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Hr(function () {
      Jl(null, e, null, null);
    }),
      (t[kn] = null);
  }
};
function eu(e) {
  this._internalRoot = e;
}
eu.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Ug();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Hn.length && t !== 0 && t < Hn[n].priority; n++);
    Hn.splice(n, 0, e), n === 0 && Rg(e);
  }
};
function Th(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function tu(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Qp() {}
function Rx(e, t, n, r, i) {
  if (i) {
    if (typeof r == "function") {
      var a = r;
      r = function () {
        var u = fl(o);
        a.call(u);
      };
    }
    var o = ov(t, r, e, 0, null, !1, !1, "", Qp);
    return (
      (e._reactRootContainer = o),
      (e[kn] = o.current),
      Ja(e.nodeType === 8 ? e.parentNode : e),
      Hr(),
      o
    );
  }
  for (; (i = e.lastChild); ) e.removeChild(i);
  if (typeof r == "function") {
    var s = r;
    r = function () {
      var u = fl(l);
      s.call(u);
    };
  }
  var l = Dh(e, 0, !1, null, null, !1, !1, "", Qp);
  return (
    (e._reactRootContainer = l),
    (e[kn] = l.current),
    Ja(e.nodeType === 8 ? e.parentNode : e),
    Hr(function () {
      Jl(t, l, n, r);
    }),
    l
  );
}
function nu(e, t, n, r, i) {
  var a = n._reactRootContainer;
  if (a) {
    var o = a;
    if (typeof i == "function") {
      var s = i;
      i = function () {
        var l = fl(o);
        s.call(l);
      };
    }
    Jl(t, o, e, i);
  } else o = Rx(n, t, e, i, r);
  return fl(o);
}
Lg = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Sa(t.pendingLanes);
        n !== 0 &&
          (Yd(t, n | 1), Et(t, Be()), !(de & 6) && ((Mi = Be() + 500), gr()));
      }
      break;
    case 13:
      Hr(function () {
        var r = Nn(e, 1);
        if (r !== null) {
          var i = pt();
          en(r, e, 1, i);
        }
      }),
        Ph(e, 1);
  }
};
Zd = function (e) {
  if (e.tag === 13) {
    var t = Nn(e, 134217728);
    if (t !== null) {
      var n = pt();
      en(t, e, 134217728, n);
    }
    Ph(e, 134217728);
  }
};
Fg = function (e) {
  if (e.tag === 13) {
    var t = rr(e),
      n = Nn(e, t);
    if (n !== null) {
      var r = pt();
      en(n, e, t, r);
    }
    Ph(e, t);
  }
};
Ug = function () {
  return ye;
};
Mg = function (e, t) {
  var n = ye;
  try {
    return (ye = e), t();
  } finally {
    ye = n;
  }
};
af = function (e, t, n) {
  switch (t) {
    case "input":
      if ((Zc(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var i = Vl(r);
            if (!i) throw Error(U(90));
            mg(r), Zc(r, i);
          }
        }
      }
      break;
    case "textarea":
      yg(e, n);
      break;
    case "select":
      (t = n.value), t != null && Ei(e, !!n.multiple, t, !1);
  }
};
Cg = Ch;
_g = Hr;
var Bx = { usingClientEntryPoint: !1, Events: [Do, fi, Vl, Eg, Sg, Ch] },
  ga = {
    findFiberByHostInstance: Pr,
    bundleType: 0,
    version: "18.2.0",
    rendererPackageName: "react-dom",
  },
  $x = {
    bundleType: ga.bundleType,
    version: ga.version,
    rendererPackageName: ga.rendererPackageName,
    rendererConfig: ga.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: In.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = Dg(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: ga.findFiberByHostInstance || Mx,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.2.0-next-9e3b772b8-20220608",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var ls = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!ls.isDisabled && ls.supportsFiber)
    try {
      (zl = ls.inject($x)), (gn = ls);
    } catch {}
}
It.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Bx;
It.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Th(t)) throw Error(U(200));
  return Ux(e, t, null, n);
};
It.createRoot = function (e, t) {
  if (!Th(e)) throw Error(U(299));
  var n = !1,
    r = "",
    i = sv;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    (t = Dh(e, 1, !1, null, null, n, !1, r, i)),
    (e[kn] = t.current),
    Ja(e.nodeType === 8 ? e.parentNode : e),
    new Ah(t)
  );
};
It.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(U(188))
      : ((e = Object.keys(e).join(",")), Error(U(268, e)));
  return (e = Dg(t)), (e = e === null ? null : e.stateNode), e;
};
It.flushSync = function (e) {
  return Hr(e);
};
It.hydrate = function (e, t, n) {
  if (!tu(t)) throw Error(U(200));
  return nu(null, e, t, !0, n);
};
It.hydrateRoot = function (e, t, n) {
  if (!Th(e)) throw Error(U(405));
  var r = (n != null && n.hydratedSources) || null,
    i = !1,
    a = "",
    o = sv;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (i = !0),
      n.identifierPrefix !== void 0 && (a = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
    (t = ov(t, null, e, 1, n ?? null, i, !1, a, o)),
    (e[kn] = t.current),
    Ja(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (i = n._getVersion),
        (i = i(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, i])
          : t.mutableSourceEagerHydrationData.push(n, i);
  return new eu(t);
};
It.render = function (e, t, n) {
  if (!tu(t)) throw Error(U(200));
  return nu(null, e, t, !1, n);
};
It.unmountComponentAtNode = function (e) {
  if (!tu(e)) throw Error(U(40));
  return e._reactRootContainer
    ? (Hr(function () {
        nu(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[kn] = null);
        });
      }),
      !0)
    : !1;
};
It.unstable_batchedUpdates = Ch;
It.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!tu(n)) throw Error(U(200));
  if (e == null || e._reactInternals === void 0) throw Error(U(38));
  return nu(e, t, n, !1, r);
};
It.version = "18.2.0-next-9e3b772b8-20220608";
function lv() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(lv);
    } catch (e) {
      console.error(e);
    }
}
lv(), (og.exports = It);
var zx = og.exports,
  uv,
  Kp = zx;
(uv = Kp.createRoot), Kp.hydrateRoot;
function Wx({
  storage: e,
  key: t = "REACT_QUERY_OFFLINE_CACHE",
  throttleTime: n = 1e3,
  serialize: r = JSON.stringify,
  deserialize: i = JSON.parse,
  retry: a,
}) {
  if (e) {
    const o = (s) => {
      try {
        e.setItem(t, r(s));
        return;
      } catch (l) {
        return l;
      }
    };
    return {
      persistClient: Hx((s) => {
        let l = s,
          u = o(l),
          c = 0;
        for (; u && l; )
          c++,
            (l =
              a == null
                ? void 0
                : a({ persistedClient: l, error: u, errorCount: c })),
            l && (u = o(l));
      }, n),
      restoreClient: () => {
        const s = e.getItem(t);
        if (s) return i(s);
      },
      removeClient: () => {
        e.removeItem(t);
      },
    };
  }
  return { persistClient: Yp, restoreClient: () => {}, removeClient: Yp };
}
function Hx(e, t = 100) {
  let n = null,
    r;
  return function (...i) {
    (r = i),
      n === null &&
        (n = setTimeout(() => {
          e(...r), (n = null);
        }, t));
  };
}
function Yp() {}
class ru {
  constructor() {
    (this.listeners = new Set()), (this.subscribe = this.subscribe.bind(this));
  }
  subscribe(t) {
    const n = { listener: t };
    return (
      this.listeners.add(n),
      this.onSubscribe(),
      () => {
        this.listeners.delete(n), this.onUnsubscribe();
      }
    );
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {}
  onUnsubscribe() {}
}
const Oh = typeof window > "u" || "Deno" in window;
function Gt() {}
function qx(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Vx(e) {
  return typeof e == "number" && e >= 0 && e !== 1 / 0;
}
function Gx(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function us(e, t, n) {
  return iu(e)
    ? typeof t == "function"
      ? { ...n, queryKey: e, queryFn: t }
      : { ...t, queryKey: e }
    : e;
}
function Wn(e, t, n) {
  return iu(e) ? [{ ...t, queryKey: e }, n] : [e || {}, t];
}
function Zp(e, t) {
  const {
    type: n = "all",
    exact: r,
    fetchStatus: i,
    predicate: a,
    queryKey: o,
    stale: s,
  } = e;
  if (iu(o)) {
    if (r) {
      if (t.queryHash !== jh(o, t.options)) return !1;
    } else if (!dl(t.queryKey, o)) return !1;
  }
  if (n !== "all") {
    const l = t.isActive();
    if ((n === "active" && !l) || (n === "inactive" && l)) return !1;
  }
  return !(
    (typeof s == "boolean" && t.isStale() !== s) ||
    (typeof i < "u" && i !== t.state.fetchStatus) ||
    (a && !a(t))
  );
}
function Xp(e, t) {
  const { exact: n, fetching: r, predicate: i, mutationKey: a } = e;
  if (iu(a)) {
    if (!t.options.mutationKey) return !1;
    if (n) {
      if (Or(t.options.mutationKey) !== Or(a)) return !1;
    } else if (!dl(t.options.mutationKey, a)) return !1;
  }
  return !(
    (typeof r == "boolean" && (t.state.status === "loading") !== r) ||
    (i && !i(t))
  );
}
function jh(e, t) {
  return ((t == null ? void 0 : t.queryKeyHashFn) || Or)(e);
}
function Or(e) {
  return JSON.stringify(e, (t, n) =>
    Mf(n)
      ? Object.keys(n)
          .sort()
          .reduce((r, i) => ((r[i] = n[i]), r), {})
      : n
  );
}
function dl(e, t) {
  return cv(e, t);
}
function cv(e, t) {
  return e === t
    ? !0
    : typeof e != typeof t
    ? !1
    : e && t && typeof e == "object" && typeof t == "object"
    ? !Object.keys(t).some((n) => !cv(e[n], t[n]))
    : !1;
}
function fv(e, t) {
  if (e === t) return e;
  const n = Jp(e) && Jp(t);
  if (n || (Mf(e) && Mf(t))) {
    const r = n ? e.length : Object.keys(e).length,
      i = n ? t : Object.keys(t),
      a = i.length,
      o = n ? [] : {};
    let s = 0;
    for (let l = 0; l < a; l++) {
      const u = n ? l : i[l];
      (o[u] = fv(e[u], t[u])), o[u] === e[u] && s++;
    }
    return r === a && s === r ? e : o;
  }
  return t;
}
function Jp(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function Mf(e) {
  if (!em(e)) return !1;
  const t = e.constructor;
  if (typeof t > "u") return !0;
  const n = t.prototype;
  return !(!em(n) || !n.hasOwnProperty("isPrototypeOf"));
}
function em(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function iu(e) {
  return Array.isArray(e);
}
function dv(e) {
  return new Promise((t) => {
    setTimeout(t, e);
  });
}
function tm(e) {
  dv(0).then(e);
}
function Qx() {
  if (typeof AbortController == "function") return new AbortController();
}
function Kx(e, t, n) {
  return n.isDataEqual != null && n.isDataEqual(e, t)
    ? e
    : typeof n.structuralSharing == "function"
    ? n.structuralSharing(e, t)
    : n.structuralSharing !== !1
    ? fv(e, t)
    : t;
}
class Yx extends ru {
  constructor() {
    super(),
      (this.setup = (t) => {
        if (!Oh && window.addEventListener) {
          const n = () => t();
          return (
            window.addEventListener("visibilitychange", n, !1),
            window.addEventListener("focus", n, !1),
            () => {
              window.removeEventListener("visibilitychange", n),
                window.removeEventListener("focus", n);
            }
          );
        }
      });
  }
  onSubscribe() {
    this.cleanup || this.setEventListener(this.setup);
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      var t;
      (t = this.cleanup) == null || t.call(this), (this.cleanup = void 0);
    }
  }
  setEventListener(t) {
    var n;
    (this.setup = t),
      (n = this.cleanup) == null || n.call(this),
      (this.cleanup = t((r) => {
        typeof r == "boolean" ? this.setFocused(r) : this.onFocus();
      }));
  }
  setFocused(t) {
    this.focused !== t && ((this.focused = t), this.onFocus());
  }
  onFocus() {
    this.listeners.forEach(({ listener: t }) => {
      t();
    });
  }
  isFocused() {
    return typeof this.focused == "boolean"
      ? this.focused
      : typeof document > "u"
      ? !0
      : [void 0, "visible", "prerender"].includes(document.visibilityState);
  }
}
const Rf = new Yx(),
  nm = ["online", "offline"];
class Zx extends ru {
  constructor() {
    super(),
      (this.setup = (t) => {
        if (!Oh && window.addEventListener) {
          const n = () => t();
          return (
            nm.forEach((r) => {
              window.addEventListener(r, n, !1);
            }),
            () => {
              nm.forEach((r) => {
                window.removeEventListener(r, n);
              });
            }
          );
        }
      });
  }
  onSubscribe() {
    this.cleanup || this.setEventListener(this.setup);
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      var t;
      (t = this.cleanup) == null || t.call(this), (this.cleanup = void 0);
    }
  }
  setEventListener(t) {
    var n;
    (this.setup = t),
      (n = this.cleanup) == null || n.call(this),
      (this.cleanup = t((r) => {
        typeof r == "boolean" ? this.setOnline(r) : this.onOnline();
      }));
  }
  setOnline(t) {
    this.online !== t && ((this.online = t), this.onOnline());
  }
  onOnline() {
    this.listeners.forEach(({ listener: t }) => {
      t();
    });
  }
  isOnline() {
    return typeof this.online == "boolean"
      ? this.online
      : typeof navigator > "u" || typeof navigator.onLine > "u"
      ? !0
      : navigator.onLine;
  }
}
const hl = new Zx();
function Xx(e) {
  return Math.min(1e3 * 2 ** e, 3e4);
}
function Ih(e) {
  return (e ?? "online") === "online" ? hl.isOnline() : !0;
}
class hv {
  constructor(t) {
    (this.revert = t == null ? void 0 : t.revert),
      (this.silent = t == null ? void 0 : t.silent);
  }
}
function gc(e) {
  return e instanceof hv;
}
function pv(e) {
  let t = !1,
    n = 0,
    r = !1,
    i,
    a,
    o;
  const s = new Promise((C, x) => {
      (a = C), (o = x);
    }),
    l = (C) => {
      r || (v(new hv(C)), e.abort == null || e.abort());
    },
    u = () => {
      t = !0;
    },
    c = () => {
      t = !1;
    },
    d = () => !Rf.isFocused() || (e.networkMode !== "always" && !hl.isOnline()),
    m = (C) => {
      r ||
        ((r = !0),
        e.onSuccess == null || e.onSuccess(C),
        i == null || i(),
        a(C));
    },
    v = (C) => {
      r ||
        ((r = !0), e.onError == null || e.onError(C), i == null || i(), o(C));
    },
    b = () =>
      new Promise((C) => {
        (i = (x) => {
          const g = r || !d();
          return g && C(x), g;
        }),
          e.onPause == null || e.onPause();
      }).then(() => {
        (i = void 0), r || e.onContinue == null || e.onContinue();
      }),
    _ = () => {
      if (r) return;
      let C;
      try {
        C = e.fn();
      } catch (x) {
        C = Promise.reject(x);
      }
      Promise.resolve(C)
        .then(m)
        .catch((x) => {
          var g, w;
          if (r) return;
          const E = (g = e.retry) != null ? g : 3,
            N = (w = e.retryDelay) != null ? w : Xx,
            D = typeof N == "function" ? N(n, x) : N,
            f =
              E === !0 ||
              (typeof E == "number" && n < E) ||
              (typeof E == "function" && E(n, x));
          if (t || !f) {
            v(x);
            return;
          }
          n++,
            e.onFail == null || e.onFail(n, x),
            dv(D)
              .then(() => {
                if (d()) return b();
              })
              .then(() => {
                t ? v(x) : _();
              });
        });
    };
  return (
    Ih(e.networkMode) ? _() : b().then(_),
    {
      promise: s,
      cancel: l,
      continue: () => ((i == null ? void 0 : i()) ? s : Promise.resolve()),
      cancelRetry: u,
      continueRetry: c,
    }
  );
}
const Lh = console;
function Jx() {
  let e = [],
    t = 0,
    n = (c) => {
      c();
    },
    r = (c) => {
      c();
    };
  const i = (c) => {
      let d;
      t++;
      try {
        d = c();
      } finally {
        t--, t || s();
      }
      return d;
    },
    a = (c) => {
      t
        ? e.push(c)
        : tm(() => {
            n(c);
          });
    },
    o =
      (c) =>
      (...d) => {
        a(() => {
          c(...d);
        });
      },
    s = () => {
      const c = e;
      (e = []),
        c.length &&
          tm(() => {
            r(() => {
              c.forEach((d) => {
                n(d);
              });
            });
          });
    };
  return {
    batch: i,
    batchCalls: o,
    schedule: a,
    setNotifyFunction: (c) => {
      n = c;
    },
    setBatchNotifyFunction: (c) => {
      r = c;
    },
  };
}
const ht = Jx();
class mv {
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout(),
      Vx(this.cacheTime) &&
        (this.gcTimeout = setTimeout(() => {
          this.optionalRemove();
        }, this.cacheTime));
  }
  updateCacheTime(t) {
    this.cacheTime = Math.max(
      this.cacheTime || 0,
      t ?? (Oh ? 1 / 0 : 5 * 60 * 1e3)
    );
  }
  clearGcTimeout() {
    this.gcTimeout && (clearTimeout(this.gcTimeout), (this.gcTimeout = void 0));
  }
}
class e6 extends mv {
  constructor(t) {
    super(),
      (this.abortSignalConsumed = !1),
      (this.defaultOptions = t.defaultOptions),
      this.setOptions(t.options),
      (this.observers = []),
      (this.cache = t.cache),
      (this.logger = t.logger || Lh),
      (this.queryKey = t.queryKey),
      (this.queryHash = t.queryHash),
      (this.initialState = t.state || t6(this.options)),
      (this.state = this.initialState),
      this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  setOptions(t) {
    (this.options = { ...this.defaultOptions, ...t }),
      this.updateCacheTime(this.options.cacheTime);
  }
  optionalRemove() {
    !this.observers.length &&
      this.state.fetchStatus === "idle" &&
      this.cache.remove(this);
  }
  setData(t, n) {
    const r = Kx(this.state.data, t, this.options);
    return (
      this.dispatch({
        data: r,
        type: "success",
        dataUpdatedAt: n == null ? void 0 : n.updatedAt,
        manual: n == null ? void 0 : n.manual,
      }),
      r
    );
  }
  setState(t, n) {
    this.dispatch({ type: "setState", state: t, setStateOptions: n });
  }
  cancel(t) {
    var n;
    const r = this.promise;
    return (
      (n = this.retryer) == null || n.cancel(t),
      r ? r.then(Gt).catch(Gt) : Promise.resolve()
    );
  }
  destroy() {
    super.destroy(), this.cancel({ silent: !0 });
  }
  reset() {
    this.destroy(), this.setState(this.initialState);
  }
  isActive() {
    return this.observers.some((t) => t.options.enabled !== !1);
  }
  isDisabled() {
    return this.getObserversCount() > 0 && !this.isActive();
  }
  isStale() {
    return (
      this.state.isInvalidated ||
      !this.state.dataUpdatedAt ||
      this.observers.some((t) => t.getCurrentResult().isStale)
    );
  }
  isStaleByTime(t = 0) {
    return (
      this.state.isInvalidated ||
      !this.state.dataUpdatedAt ||
      !Gx(this.state.dataUpdatedAt, t)
    );
  }
  onFocus() {
    var t;
    const n = this.observers.find((r) => r.shouldFetchOnWindowFocus());
    n && n.refetch({ cancelRefetch: !1 }),
      (t = this.retryer) == null || t.continue();
  }
  onOnline() {
    var t;
    const n = this.observers.find((r) => r.shouldFetchOnReconnect());
    n && n.refetch({ cancelRefetch: !1 }),
      (t = this.retryer) == null || t.continue();
  }
  addObserver(t) {
    this.observers.includes(t) ||
      (this.observers.push(t),
      this.clearGcTimeout(),
      this.cache.notify({ type: "observerAdded", query: this, observer: t }));
  }
  removeObserver(t) {
    this.observers.includes(t) &&
      ((this.observers = this.observers.filter((n) => n !== t)),
      this.observers.length ||
        (this.retryer &&
          (this.abortSignalConsumed
            ? this.retryer.cancel({ revert: !0 })
            : this.retryer.cancelRetry()),
        this.scheduleGc()),
      this.cache.notify({ type: "observerRemoved", query: this, observer: t }));
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    this.state.isInvalidated || this.dispatch({ type: "invalidate" });
  }
  fetch(t, n) {
    var r, i;
    if (this.state.fetchStatus !== "idle") {
      if (this.state.dataUpdatedAt && n != null && n.cancelRefetch)
        this.cancel({ silent: !0 });
      else if (this.promise) {
        var a;
        return (a = this.retryer) == null || a.continueRetry(), this.promise;
      }
    }
    if ((t && this.setOptions(t), !this.options.queryFn)) {
      const v = this.observers.find((b) => b.options.queryFn);
      v && this.setOptions(v.options);
    }
    const o = Qx(),
      s = { queryKey: this.queryKey, pageParam: void 0, meta: this.meta },
      l = (v) => {
        Object.defineProperty(v, "signal", {
          enumerable: !0,
          get: () => {
            if (o) return (this.abortSignalConsumed = !0), o.signal;
          },
        });
      };
    l(s);
    const u = () =>
        this.options.queryFn
          ? ((this.abortSignalConsumed = !1), this.options.queryFn(s))
          : Promise.reject(
              "Missing queryFn for queryKey '" + this.options.queryHash + "'"
            ),
      c = {
        fetchOptions: n,
        options: this.options,
        queryKey: this.queryKey,
        state: this.state,
        fetchFn: u,
      };
    if (
      (l(c),
      (r = this.options.behavior) == null || r.onFetch(c),
      (this.revertState = this.state),
      this.state.fetchStatus === "idle" ||
        this.state.fetchMeta !==
          ((i = c.fetchOptions) == null ? void 0 : i.meta))
    ) {
      var d;
      this.dispatch({
        type: "fetch",
        meta: (d = c.fetchOptions) == null ? void 0 : d.meta,
      });
    }
    const m = (v) => {
      if (
        ((gc(v) && v.silent) || this.dispatch({ type: "error", error: v }),
        !gc(v))
      ) {
        var b, _, C, x;
        (b = (_ = this.cache.config).onError) == null || b.call(_, v, this),
          (C = (x = this.cache.config).onSettled) == null ||
            C.call(x, this.state.data, v, this);
      }
      this.isFetchingOptimistic || this.scheduleGc(),
        (this.isFetchingOptimistic = !1);
    };
    return (
      (this.retryer = pv({
        fn: c.fetchFn,
        abort: o == null ? void 0 : o.abort.bind(o),
        onSuccess: (v) => {
          var b, _, C, x;
          if (typeof v > "u") {
            m(new Error(this.queryHash + " data is undefined"));
            return;
          }
          this.setData(v),
            (b = (_ = this.cache.config).onSuccess) == null ||
              b.call(_, v, this),
            (C = (x = this.cache.config).onSettled) == null ||
              C.call(x, v, this.state.error, this),
            this.isFetchingOptimistic || this.scheduleGc(),
            (this.isFetchingOptimistic = !1);
        },
        onError: m,
        onFail: (v, b) => {
          this.dispatch({ type: "failed", failureCount: v, error: b });
        },
        onPause: () => {
          this.dispatch({ type: "pause" });
        },
        onContinue: () => {
          this.dispatch({ type: "continue" });
        },
        retry: c.options.retry,
        retryDelay: c.options.retryDelay,
        networkMode: c.options.networkMode,
      })),
      (this.promise = this.retryer.promise),
      this.promise
    );
  }
  dispatch(t) {
    const n = (r) => {
      var i, a;
      switch (t.type) {
        case "failed":
          return {
            ...r,
            fetchFailureCount: t.failureCount,
            fetchFailureReason: t.error,
          };
        case "pause":
          return { ...r, fetchStatus: "paused" };
        case "continue":
          return { ...r, fetchStatus: "fetching" };
        case "fetch":
          return {
            ...r,
            fetchFailureCount: 0,
            fetchFailureReason: null,
            fetchMeta: (i = t.meta) != null ? i : null,
            fetchStatus: Ih(this.options.networkMode) ? "fetching" : "paused",
            ...(!r.dataUpdatedAt && { error: null, status: "loading" }),
          };
        case "success":
          return {
            ...r,
            data: t.data,
            dataUpdateCount: r.dataUpdateCount + 1,
            dataUpdatedAt: (a = t.dataUpdatedAt) != null ? a : Date.now(),
            error: null,
            isInvalidated: !1,
            status: "success",
            ...(!t.manual && {
              fetchStatus: "idle",
              fetchFailureCount: 0,
              fetchFailureReason: null,
            }),
          };
        case "error":
          const o = t.error;
          return gc(o) && o.revert && this.revertState
            ? { ...this.revertState, fetchStatus: "idle" }
            : {
                ...r,
                error: o,
                errorUpdateCount: r.errorUpdateCount + 1,
                errorUpdatedAt: Date.now(),
                fetchFailureCount: r.fetchFailureCount + 1,
                fetchFailureReason: o,
                fetchStatus: "idle",
                status: "error",
              };
        case "invalidate":
          return { ...r, isInvalidated: !0 };
        case "setState":
          return { ...r, ...t.state };
      }
    };
    (this.state = n(this.state)),
      ht.batch(() => {
        this.observers.forEach((r) => {
          r.onQueryUpdate(t);
        }),
          this.cache.notify({ query: this, type: "updated", action: t });
      });
  }
}
function t6(e) {
  const t =
      typeof e.initialData == "function" ? e.initialData() : e.initialData,
    n = typeof t < "u",
    r = n
      ? typeof e.initialDataUpdatedAt == "function"
        ? e.initialDataUpdatedAt()
        : e.initialDataUpdatedAt
      : 0;
  return {
    data: t,
    dataUpdateCount: 0,
    dataUpdatedAt: n ? r ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: n ? "success" : "loading",
    fetchStatus: "idle",
  };
}
class n6 extends ru {
  constructor(t) {
    super(),
      (this.config = t || {}),
      (this.queries = []),
      (this.queriesMap = {});
  }
  build(t, n, r) {
    var i;
    const a = n.queryKey,
      o = (i = n.queryHash) != null ? i : jh(a, n);
    let s = this.get(o);
    return (
      s ||
        ((s = new e6({
          cache: this,
          logger: t.getLogger(),
          queryKey: a,
          queryHash: o,
          options: t.defaultQueryOptions(n),
          state: r,
          defaultOptions: t.getQueryDefaults(a),
        })),
        this.add(s)),
      s
    );
  }
  add(t) {
    this.queriesMap[t.queryHash] ||
      ((this.queriesMap[t.queryHash] = t),
      this.queries.push(t),
      this.notify({ type: "added", query: t }));
  }
  remove(t) {
    const n = this.queriesMap[t.queryHash];
    n &&
      (t.destroy(),
      (this.queries = this.queries.filter((r) => r !== t)),
      n === t && delete this.queriesMap[t.queryHash],
      this.notify({ type: "removed", query: t }));
  }
  clear() {
    ht.batch(() => {
      this.queries.forEach((t) => {
        this.remove(t);
      });
    });
  }
  get(t) {
    return this.queriesMap[t];
  }
  getAll() {
    return this.queries;
  }
  find(t, n) {
    const [r] = Wn(t, n);
    return (
      typeof r.exact > "u" && (r.exact = !0), this.queries.find((i) => Zp(r, i))
    );
  }
  findAll(t, n) {
    const [r] = Wn(t, n);
    return Object.keys(r).length > 0
      ? this.queries.filter((i) => Zp(r, i))
      : this.queries;
  }
  notify(t) {
    ht.batch(() => {
      this.listeners.forEach(({ listener: n }) => {
        n(t);
      });
    });
  }
  onFocus() {
    ht.batch(() => {
      this.queries.forEach((t) => {
        t.onFocus();
      });
    });
  }
  onOnline() {
    ht.batch(() => {
      this.queries.forEach((t) => {
        t.onOnline();
      });
    });
  }
}
class r6 extends mv {
  constructor(t) {
    super(),
      (this.defaultOptions = t.defaultOptions),
      (this.mutationId = t.mutationId),
      (this.mutationCache = t.mutationCache),
      (this.logger = t.logger || Lh),
      (this.observers = []),
      (this.state = t.state || i6()),
      this.setOptions(t.options),
      this.scheduleGc();
  }
  setOptions(t) {
    (this.options = { ...this.defaultOptions, ...t }),
      this.updateCacheTime(this.options.cacheTime);
  }
  get meta() {
    return this.options.meta;
  }
  setState(t) {
    this.dispatch({ type: "setState", state: t });
  }
  addObserver(t) {
    this.observers.includes(t) ||
      (this.observers.push(t),
      this.clearGcTimeout(),
      this.mutationCache.notify({
        type: "observerAdded",
        mutation: this,
        observer: t,
      }));
  }
  removeObserver(t) {
    (this.observers = this.observers.filter((n) => n !== t)),
      this.scheduleGc(),
      this.mutationCache.notify({
        type: "observerRemoved",
        mutation: this,
        observer: t,
      });
  }
  optionalRemove() {
    this.observers.length ||
      (this.state.status === "loading"
        ? this.scheduleGc()
        : this.mutationCache.remove(this));
  }
  continue() {
    var t, n;
    return (t = (n = this.retryer) == null ? void 0 : n.continue()) != null
      ? t
      : this.execute();
  }
  async execute() {
    const t = () => {
        var f;
        return (
          (this.retryer = pv({
            fn: () =>
              this.options.mutationFn
                ? this.options.mutationFn(this.state.variables)
                : Promise.reject("No mutationFn found"),
            onFail: (k, O) => {
              this.dispatch({ type: "failed", failureCount: k, error: O });
            },
            onPause: () => {
              this.dispatch({ type: "pause" });
            },
            onContinue: () => {
              this.dispatch({ type: "continue" });
            },
            retry: (f = this.options.retry) != null ? f : 0,
            retryDelay: this.options.retryDelay,
            networkMode: this.options.networkMode,
          })),
          this.retryer.promise
        );
      },
      n = this.state.status === "loading";
    try {
      var r, i, a, o, s, l, u, c;
      if (!n) {
        var d, m, v, b;
        this.dispatch({ type: "loading", variables: this.options.variables }),
          await ((d = (m = this.mutationCache.config).onMutate) == null
            ? void 0
            : d.call(m, this.state.variables, this));
        const k = await ((v = (b = this.options).onMutate) == null
          ? void 0
          : v.call(b, this.state.variables));
        k !== this.state.context &&
          this.dispatch({
            type: "loading",
            context: k,
            variables: this.state.variables,
          });
      }
      const f = await t();
      return (
        await ((r = (i = this.mutationCache.config).onSuccess) == null
          ? void 0
          : r.call(i, f, this.state.variables, this.state.context, this)),
        await ((a = (o = this.options).onSuccess) == null
          ? void 0
          : a.call(o, f, this.state.variables, this.state.context)),
        await ((s = (l = this.mutationCache.config).onSettled) == null
          ? void 0
          : s.call(l, f, null, this.state.variables, this.state.context, this)),
        await ((u = (c = this.options).onSettled) == null
          ? void 0
          : u.call(c, f, null, this.state.variables, this.state.context)),
        this.dispatch({ type: "success", data: f }),
        f
      );
    } catch (f) {
      try {
        var _, C, x, g, w, E, N, D;
        throw (
          (await ((_ = (C = this.mutationCache.config).onError) == null
            ? void 0
            : _.call(C, f, this.state.variables, this.state.context, this)),
          await ((x = (g = this.options).onError) == null
            ? void 0
            : x.call(g, f, this.state.variables, this.state.context)),
          await ((w = (E = this.mutationCache.config).onSettled) == null
            ? void 0
            : w.call(
                E,
                void 0,
                f,
                this.state.variables,
                this.state.context,
                this
              )),
          await ((N = (D = this.options).onSettled) == null
            ? void 0
            : N.call(D, void 0, f, this.state.variables, this.state.context)),
          f)
        );
      } finally {
        this.dispatch({ type: "error", error: f });
      }
    }
  }
  dispatch(t) {
    const n = (r) => {
      switch (t.type) {
        case "failed":
          return { ...r, failureCount: t.failureCount, failureReason: t.error };
        case "pause":
          return { ...r, isPaused: !0 };
        case "continue":
          return { ...r, isPaused: !1 };
        case "loading":
          return {
            ...r,
            context: t.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: !Ih(this.options.networkMode),
            status: "loading",
            variables: t.variables,
          };
        case "success":
          return {
            ...r,
            data: t.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: !1,
          };
        case "error":
          return {
            ...r,
            data: void 0,
            error: t.error,
            failureCount: r.failureCount + 1,
            failureReason: t.error,
            isPaused: !1,
            status: "error",
          };
        case "setState":
          return { ...r, ...t.state };
      }
    };
    (this.state = n(this.state)),
      ht.batch(() => {
        this.observers.forEach((r) => {
          r.onMutationUpdate(t);
        }),
          this.mutationCache.notify({
            mutation: this,
            type: "updated",
            action: t,
          });
      });
  }
}
function i6() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
  };
}
class a6 extends ru {
  constructor(t) {
    super(),
      (this.config = t || {}),
      (this.mutations = []),
      (this.mutationId = 0);
  }
  build(t, n, r) {
    const i = new r6({
      mutationCache: this,
      logger: t.getLogger(),
      mutationId: ++this.mutationId,
      options: t.defaultMutationOptions(n),
      state: r,
      defaultOptions: n.mutationKey
        ? t.getMutationDefaults(n.mutationKey)
        : void 0,
    });
    return this.add(i), i;
  }
  add(t) {
    this.mutations.push(t), this.notify({ type: "added", mutation: t });
  }
  remove(t) {
    (this.mutations = this.mutations.filter((n) => n !== t)),
      this.notify({ type: "removed", mutation: t });
  }
  clear() {
    ht.batch(() => {
      this.mutations.forEach((t) => {
        this.remove(t);
      });
    });
  }
  getAll() {
    return this.mutations;
  }
  find(t) {
    return (
      typeof t.exact > "u" && (t.exact = !0),
      this.mutations.find((n) => Xp(t, n))
    );
  }
  findAll(t) {
    return this.mutations.filter((n) => Xp(t, n));
  }
  notify(t) {
    ht.batch(() => {
      this.listeners.forEach(({ listener: n }) => {
        n(t);
      });
    });
  }
  resumePausedMutations() {
    var t;
    return (
      (this.resuming = ((t = this.resuming) != null ? t : Promise.resolve())
        .then(() => {
          const n = this.mutations.filter((r) => r.state.isPaused);
          return ht.batch(() =>
            n.reduce(
              (r, i) => r.then(() => i.continue().catch(Gt)),
              Promise.resolve()
            )
          );
        })
        .then(() => {
          this.resuming = void 0;
        })),
      this.resuming
    );
  }
}
function o6() {
  return {
    onFetch: (e) => {
      e.fetchFn = () => {
        var t, n, r, i, a, o;
        const s =
            (t = e.fetchOptions) == null || (n = t.meta) == null
              ? void 0
              : n.refetchPage,
          l =
            (r = e.fetchOptions) == null || (i = r.meta) == null
              ? void 0
              : i.fetchMore,
          u = l == null ? void 0 : l.pageParam,
          c = (l == null ? void 0 : l.direction) === "forward",
          d = (l == null ? void 0 : l.direction) === "backward",
          m = ((a = e.state.data) == null ? void 0 : a.pages) || [],
          v = ((o = e.state.data) == null ? void 0 : o.pageParams) || [];
        let b = v,
          _ = !1;
        const C = (D) => {
            Object.defineProperty(D, "signal", {
              enumerable: !0,
              get: () => {
                var f;
                if ((f = e.signal) != null && f.aborted) _ = !0;
                else {
                  var k;
                  (k = e.signal) == null ||
                    k.addEventListener("abort", () => {
                      _ = !0;
                    });
                }
                return e.signal;
              },
            });
          },
          x =
            e.options.queryFn ||
            (() =>
              Promise.reject(
                "Missing queryFn for queryKey '" + e.options.queryHash + "'"
              )),
          g = (D, f, k, O) => (
            (b = O ? [f, ...b] : [...b, f]), O ? [k, ...D] : [...D, k]
          ),
          w = (D, f, k, O) => {
            if (_) return Promise.reject("Cancelled");
            if (typeof k > "u" && !f && D.length) return Promise.resolve(D);
            const I = {
              queryKey: e.queryKey,
              pageParam: k,
              meta: e.options.meta,
            };
            C(I);
            const H = x(I);
            return Promise.resolve(H).then((X) => g(D, k, X, O));
          };
        let E;
        if (!m.length) E = w([]);
        else if (c) {
          const D = typeof u < "u",
            f = D ? u : rm(e.options, m);
          E = w(m, D, f);
        } else if (d) {
          const D = typeof u < "u",
            f = D ? u : s6(e.options, m);
          E = w(m, D, f, !0);
        } else {
          b = [];
          const D = typeof e.options.getNextPageParam > "u";
          E = (s && m[0] ? s(m[0], 0, m) : !0)
            ? w([], D, v[0])
            : Promise.resolve(g([], v[0], m[0]));
          for (let k = 1; k < m.length; k++)
            E = E.then((O) => {
              if (s && m[k] ? s(m[k], k, m) : !0) {
                const H = D ? v[k] : rm(e.options, O);
                return w(O, D, H);
              }
              return Promise.resolve(g(O, v[k], m[k]));
            });
        }
        return E.then((D) => ({ pages: D, pageParams: b }));
      };
    },
  };
}
function rm(e, t) {
  return e.getNextPageParam == null
    ? void 0
    : e.getNextPageParam(t[t.length - 1], t);
}
function s6(e, t) {
  return e.getPreviousPageParam == null
    ? void 0
    : e.getPreviousPageParam(t[0], t);
}
class l6 {
  constructor(t = {}) {
    (this.queryCache = t.queryCache || new n6()),
      (this.mutationCache = t.mutationCache || new a6()),
      (this.logger = t.logger || Lh),
      (this.defaultOptions = t.defaultOptions || {}),
      (this.queryDefaults = []),
      (this.mutationDefaults = []),
      (this.mountCount = 0);
  }
  mount() {
    this.mountCount++,
      this.mountCount === 1 &&
        ((this.unsubscribeFocus = Rf.subscribe(() => {
          Rf.isFocused() &&
            (this.resumePausedMutations(), this.queryCache.onFocus());
        })),
        (this.unsubscribeOnline = hl.subscribe(() => {
          hl.isOnline() &&
            (this.resumePausedMutations(), this.queryCache.onOnline());
        })));
  }
  unmount() {
    var t, n;
    this.mountCount--,
      this.mountCount === 0 &&
        ((t = this.unsubscribeFocus) == null || t.call(this),
        (this.unsubscribeFocus = void 0),
        (n = this.unsubscribeOnline) == null || n.call(this),
        (this.unsubscribeOnline = void 0));
  }
  isFetching(t, n) {
    const [r] = Wn(t, n);
    return (r.fetchStatus = "fetching"), this.queryCache.findAll(r).length;
  }
  isMutating(t) {
    return this.mutationCache.findAll({ ...t, fetching: !0 }).length;
  }
  getQueryData(t, n) {
    var r;
    return (r = this.queryCache.find(t, n)) == null ? void 0 : r.state.data;
  }
  ensureQueryData(t, n, r) {
    const i = us(t, n, r),
      a = this.getQueryData(i.queryKey);
    return a ? Promise.resolve(a) : this.fetchQuery(i);
  }
  getQueriesData(t) {
    return this.getQueryCache()
      .findAll(t)
      .map(({ queryKey: n, state: r }) => {
        const i = r.data;
        return [n, i];
      });
  }
  setQueryData(t, n, r) {
    const i = this.queryCache.find(t),
      a = i == null ? void 0 : i.state.data,
      o = qx(n, a);
    if (typeof o > "u") return;
    const s = us(t),
      l = this.defaultQueryOptions(s);
    return this.queryCache.build(this, l).setData(o, { ...r, manual: !0 });
  }
  setQueriesData(t, n, r) {
    return ht.batch(() =>
      this.getQueryCache()
        .findAll(t)
        .map(({ queryKey: i }) => [i, this.setQueryData(i, n, r)])
    );
  }
  getQueryState(t, n) {
    var r;
    return (r = this.queryCache.find(t, n)) == null ? void 0 : r.state;
  }
  removeQueries(t, n) {
    const [r] = Wn(t, n),
      i = this.queryCache;
    ht.batch(() => {
      i.findAll(r).forEach((a) => {
        i.remove(a);
      });
    });
  }
  resetQueries(t, n, r) {
    const [i, a] = Wn(t, n, r),
      o = this.queryCache,
      s = { type: "active", ...i };
    return ht.batch(
      () => (
        o.findAll(i).forEach((l) => {
          l.reset();
        }),
        this.refetchQueries(s, a)
      )
    );
  }
  cancelQueries(t, n, r) {
    const [i, a = {}] = Wn(t, n, r);
    typeof a.revert > "u" && (a.revert = !0);
    const o = ht.batch(() =>
      this.queryCache.findAll(i).map((s) => s.cancel(a))
    );
    return Promise.all(o).then(Gt).catch(Gt);
  }
  invalidateQueries(t, n, r) {
    const [i, a] = Wn(t, n, r);
    return ht.batch(() => {
      var o, s;
      if (
        (this.queryCache.findAll(i).forEach((u) => {
          u.invalidate();
        }),
        i.refetchType === "none")
      )
        return Promise.resolve();
      const l = {
        ...i,
        type:
          (o = (s = i.refetchType) != null ? s : i.type) != null ? o : "active",
      };
      return this.refetchQueries(l, a);
    });
  }
  refetchQueries(t, n, r) {
    const [i, a] = Wn(t, n, r),
      o = ht.batch(() =>
        this.queryCache
          .findAll(i)
          .filter((l) => !l.isDisabled())
          .map((l) => {
            var u;
            return l.fetch(void 0, {
              ...a,
              cancelRefetch:
                (u = a == null ? void 0 : a.cancelRefetch) != null ? u : !0,
              meta: { refetchPage: i.refetchPage },
            });
          })
      );
    let s = Promise.all(o).then(Gt);
    return (a != null && a.throwOnError) || (s = s.catch(Gt)), s;
  }
  fetchQuery(t, n, r) {
    const i = us(t, n, r),
      a = this.defaultQueryOptions(i);
    typeof a.retry > "u" && (a.retry = !1);
    const o = this.queryCache.build(this, a);
    return o.isStaleByTime(a.staleTime)
      ? o.fetch(a)
      : Promise.resolve(o.state.data);
  }
  prefetchQuery(t, n, r) {
    return this.fetchQuery(t, n, r).then(Gt).catch(Gt);
  }
  fetchInfiniteQuery(t, n, r) {
    const i = us(t, n, r);
    return (i.behavior = o6()), this.fetchQuery(i);
  }
  prefetchInfiniteQuery(t, n, r) {
    return this.fetchInfiniteQuery(t, n, r).then(Gt).catch(Gt);
  }
  resumePausedMutations() {
    return this.mutationCache.resumePausedMutations();
  }
  getQueryCache() {
    return this.queryCache;
  }
  getMutationCache() {
    return this.mutationCache;
  }
  getLogger() {
    return this.logger;
  }
  getDefaultOptions() {
    return this.defaultOptions;
  }
  setDefaultOptions(t) {
    this.defaultOptions = t;
  }
  setQueryDefaults(t, n) {
    const r = this.queryDefaults.find((i) => Or(t) === Or(i.queryKey));
    r
      ? (r.defaultOptions = n)
      : this.queryDefaults.push({ queryKey: t, defaultOptions: n });
  }
  getQueryDefaults(t) {
    if (!t) return;
    const n = this.queryDefaults.find((r) => dl(t, r.queryKey));
    return n == null ? void 0 : n.defaultOptions;
  }
  setMutationDefaults(t, n) {
    const r = this.mutationDefaults.find((i) => Or(t) === Or(i.mutationKey));
    r
      ? (r.defaultOptions = n)
      : this.mutationDefaults.push({ mutationKey: t, defaultOptions: n });
  }
  getMutationDefaults(t) {
    if (!t) return;
    const n = this.mutationDefaults.find((r) => dl(t, r.mutationKey));
    return n == null ? void 0 : n.defaultOptions;
  }
  defaultQueryOptions(t) {
    if (t != null && t._defaulted) return t;
    const n = {
      ...this.defaultOptions.queries,
      ...this.getQueryDefaults(t == null ? void 0 : t.queryKey),
      ...t,
      _defaulted: !0,
    };
    return (
      !n.queryHash && n.queryKey && (n.queryHash = jh(n.queryKey, n)),
      typeof n.refetchOnReconnect > "u" &&
        (n.refetchOnReconnect = n.networkMode !== "always"),
      typeof n.useErrorBoundary > "u" && (n.useErrorBoundary = !!n.suspense),
      n
    );
  }
  defaultMutationOptions(t) {
    return t != null && t._defaulted
      ? t
      : {
          ...this.defaultOptions.mutations,
          ...this.getMutationDefaults(t == null ? void 0 : t.mutationKey),
          ...t,
          _defaulted: !0,
        };
  }
  clear() {
    this.queryCache.clear(), this.mutationCache.clear();
  }
}
function u6(e) {
  return { mutationKey: e.options.mutationKey, state: e.state };
}
function c6(e) {
  return { state: e.state, queryKey: e.queryKey, queryHash: e.queryHash };
}
function f6(e) {
  return e.state.isPaused;
}
function d6(e) {
  return e.state.status === "success";
}
function h6(e, t = {}) {
  const n = [],
    r = [];
  if (t.dehydrateMutations !== !1) {
    const i = t.shouldDehydrateMutation || f6;
    e.getMutationCache()
      .getAll()
      .forEach((a) => {
        i(a) && n.push(u6(a));
      });
  }
  if (t.dehydrateQueries !== !1) {
    const i = t.shouldDehydrateQuery || d6;
    e.getQueryCache()
      .getAll()
      .forEach((a) => {
        i(a) && r.push(c6(a));
      });
  }
  return { mutations: n, queries: r };
}
function p6(e, t, n) {
  if (typeof t != "object" || t === null) return;
  const r = e.getMutationCache(),
    i = e.getQueryCache(),
    a = t.mutations || [],
    o = t.queries || [];
  a.forEach((s) => {
    var l;
    r.build(
      e,
      {
        ...(n == null || (l = n.defaultOptions) == null ? void 0 : l.mutations),
        mutationKey: s.mutationKey,
      },
      s.state
    );
  }),
    o.forEach(({ queryKey: s, state: l, queryHash: u }) => {
      var c;
      const d = i.get(u);
      if (d) {
        if (d.state.dataUpdatedAt < l.dataUpdatedAt) {
          const { fetchStatus: m, ...v } = l;
          d.setState(v);
        }
        return;
      }
      i.build(
        e,
        {
          ...(n == null || (c = n.defaultOptions) == null ? void 0 : c.queries),
          queryKey: s,
          queryHash: u,
        },
        { ...l, fetchStatus: "idle" }
      );
    });
}
var gv = { exports: {} },
  yv = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ri = F;
function m6(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var g6 = typeof Object.is == "function" ? Object.is : m6,
  y6 = Ri.useState,
  v6 = Ri.useEffect,
  w6 = Ri.useLayoutEffect,
  b6 = Ri.useDebugValue;
function x6(e, t) {
  var n = t(),
    r = y6({ inst: { value: n, getSnapshot: t } }),
    i = r[0].inst,
    a = r[1];
  return (
    w6(
      function () {
        (i.value = n), (i.getSnapshot = t), yc(i) && a({ inst: i });
      },
      [e, n, t]
    ),
    v6(
      function () {
        return (
          yc(i) && a({ inst: i }),
          e(function () {
            yc(i) && a({ inst: i });
          })
        );
      },
      [e]
    ),
    b6(n),
    n
  );
}
function yc(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !g6(e, n);
  } catch {
    return !0;
  }
}
function E6(e, t) {
  return t();
}
var S6 =
  typeof window > "u" ||
  typeof window.document > "u" ||
  typeof window.document.createElement > "u"
    ? E6
    : x6;
yv.useSyncExternalStore =
  Ri.useSyncExternalStore !== void 0 ? Ri.useSyncExternalStore : S6;
gv.exports = yv;
var C6 = gv.exports;
const im = F.createContext(void 0),
  _6 = F.createContext(!1);
function k6(e, t) {
  return (
    e ||
    (t && typeof window < "u"
      ? (window.ReactQueryClientContext ||
          (window.ReactQueryClientContext = im),
        window.ReactQueryClientContext)
      : im)
  );
}
const N6 = ({ client: e, children: t, context: n, contextSharing: r = !1 }) => {
    F.useEffect(
      () => (
        e.mount(),
        () => {
          e.unmount();
        }
      ),
      [e]
    );
    const i = k6(n, r);
    return F.createElement(
      _6.Provider,
      { value: !n && r },
      F.createElement(i.Provider, { value: e }, t)
    );
  },
  D6 = ["added", "removed", "updated"];
function am(e) {
  return D6.includes(e);
}
async function P6({
  queryClient: e,
  persister: t,
  maxAge: n = 1e3 * 60 * 60 * 24,
  buster: r = "",
  hydrateOptions: i,
}) {
  try {
    const a = await t.restoreClient();
    if (a)
      if (a.timestamp) {
        const o = Date.now() - a.timestamp > n,
          s = a.buster !== r;
        o || s ? t.removeClient() : p6(e, a.clientState, i);
      } else t.removeClient();
  } catch {
    t.removeClient();
  }
}
async function om({
  queryClient: e,
  persister: t,
  buster: n = "",
  dehydrateOptions: r,
}) {
  const i = { buster: n, timestamp: Date.now(), clientState: h6(e, r) };
  await t.persistClient(i);
}
function A6(e) {
  const t = e.queryClient.getQueryCache().subscribe((r) => {
      am(r.type) && om(e);
    }),
    n = e.queryClient.getMutationCache().subscribe((r) => {
      am(r.type) && om(e);
    });
  return () => {
    t(), n();
  };
}
function T6(e) {
  let t = !1,
    n;
  const r = () => {
      (t = !0), n == null || n();
    },
    i = P6(e).then(() => {
      t || (n = A6(e));
    });
  return [r, i];
}
var O6 = {
    id: 5,
    network: "goerli",
    name: "Goerli",
    nativeCurrency: { name: "Goerli Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: {
      alchemy: {
        http: ["https://eth-goerli.g.alchemy.com/v2"],
        webSocket: ["wss://eth-goerli.g.alchemy.com/v2"],
      },
      infura: {
        http: ["https://goerli.infura.io/v3"],
        webSocket: ["wss://goerli.infura.io/ws/v3"],
      },
      default: { http: ["https://rpc.ankr.com/eth_goerli"] },
      public: { http: ["https://rpc.ankr.com/eth_goerli"] },
    },
    blockExplorers: {
      etherscan: { name: "Etherscan", url: "https://goerli.etherscan.io" },
      default: { name: "Etherscan", url: "https://goerli.etherscan.io" },
    },
    contracts: {
      ensRegistry: { address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e" },
      ensUniversalResolver: {
        address: "0xA292E2E58d4ddEb29C33c63173d0E8B7a2A4c62e",
        blockCreated: 8610406,
      },
      multicall3: {
        address: "0xca11bde05977b3631167028862be2a173976ca11",
        blockCreated: 6507670,
      },
    },
    testnet: !0,
  },
  j6 = {
    id: 1,
    network: "homestead",
    name: "Ethereum",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: {
      alchemy: {
        http: ["https://eth-mainnet.g.alchemy.com/v2"],
        webSocket: ["wss://eth-mainnet.g.alchemy.com/v2"],
      },
      infura: {
        http: ["https://mainnet.infura.io/v3"],
        webSocket: ["wss://mainnet.infura.io/ws/v3"],
      },
      default: { http: ["https://cloudflare-eth.com"] },
      public: { http: ["https://cloudflare-eth.com"] },
    },
    blockExplorers: {
      etherscan: { name: "Etherscan", url: "https://etherscan.io" },
      default: { name: "Etherscan", url: "https://etherscan.io" },
    },
    contracts: {
      ensRegistry: { address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e" },
      ensUniversalResolver: {
        address: "0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da",
        blockCreated: 16773775,
      },
      multicall3: {
        address: "0xca11bde05977b3631167028862be2a173976ca11",
        blockCreated: 14353601,
      },
    },
  };
const I6 = "0.3.50",
  L6 = (e) => e,
  au = (e) => e,
  F6 = () => `viem@${I6}`;
var vv =
    (globalThis && globalThis.__classPrivateFieldGet) ||
    function (e, t, n, r) {
      if (n === "a" && !r)
        throw new TypeError("Private accessor was defined without a getter");
      if (typeof t == "function" ? e !== t || !r : !t.has(e))
        throw new TypeError(
          "Cannot read private member from an object whose class did not declare it"
        );
      return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
    },
  pl,
  wv;
class R extends Error {
  constructor(t, n = {}) {
    var a;
    super(),
      pl.add(this),
      Object.defineProperty(this, "details", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "docsPath", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "metaMessages", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "shortMessage", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ViemError",
      }),
      Object.defineProperty(this, "version", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: F6(),
      });
    const r =
        n.cause instanceof R
          ? n.cause.details
          : (a = n.cause) != null && a.message
          ? n.cause.message
          : n.details,
      i = (n.cause instanceof R && n.cause.docsPath) || n.docsPath;
    (this.message = [
      t || "An error occurred.",
      "",
      ...(n.metaMessages ? [...n.metaMessages, ""] : []),
      ...(i
        ? [
            `Docs: https://viem.sh${i}.html${
              n.docsSlug ? `#${n.docsSlug}` : ""
            }`,
          ]
        : []),
      ...(r ? [`Details: ${r}`] : []),
      `Version: ${this.version}`,
    ].join(`
`)),
      n.cause && (this.cause = n.cause),
      (this.details = r),
      (this.docsPath = i),
      (this.metaMessages = n.metaMessages),
      (this.shortMessage = t);
  }
  walk(t) {
    return vv(this, pl, "m", wv).call(this, this, t);
  }
}
(pl = new WeakSet()),
  (wv = function e(t, n) {
    return n != null && n(t)
      ? t
      : t.cause
      ? vv(this, pl, "m", e).call(this, t.cause, n)
      : t;
  });
class Bf extends R {
  constructor({ blockNumber: t, chain: n, contract: r }) {
    super(`Chain "${n.name}" does not support contract "${r.name}".`, {
      metaMessages: [
        "This could be due to any of the following:",
        ...(t && r.blockCreated && r.blockCreated > t
          ? [
              `- The contract "${r.name}" was not deployed until block ${r.blockCreated} (current block ${t}).`,
            ]
          : [`- The chain does not have the contract "${r.name}" configured.`]),
      ],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ChainDoesNotSupportContract",
      });
  }
}
class U6 extends R {
  constructor({ chain: t, currentChainId: n }) {
    super(
      `The current chain of the wallet (id: ${n}) does not match the target chain for the transaction (id: ${t.id} – ${t.name}).`,
      {
        metaMessages: [
          `Current Chain ID:  ${n}`,
          `Expected Chain ID: ${t.id} – ${t.name}`,
        ],
      }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ChainMismatchError",
      });
  }
}
class M6 extends R {
  constructor() {
    super(
      [
        "No chain was provided to the request.",
        "Please provide a chain with the `chain` argument on the Action, or by supplying a `chain` to WalletClient.",
      ].join(`
`)
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ChainNotFoundError",
      });
  }
}
class bv extends R {
  constructor() {
    super("No chain was provided to the Client."),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ClientChainNotConfiguredError",
      });
  }
}
function R6({ chain: e, currentChainId: t }) {
  if (!e) throw new M6();
  if (t !== e.id) throw new U6({ chain: e, currentChainId: t });
}
function Zi({ blockNumber: e, chain: t, contract: n }) {
  var i;
  const r = (i = t == null ? void 0 : t.contracts) == null ? void 0 : i[n];
  if (!r) throw new Bf({ chain: t, contract: { name: n } });
  if (e && r.blockCreated && r.blockCreated > e)
    throw new Bf({
      blockNumber: e,
      chain: t,
      contract: { name: n, blockCreated: r.blockCreated },
    });
  return r.address;
}
function Xi(e, { formatter: t }) {
  return t(e);
}
class B6 extends R {
  constructor({ max: t, min: n, signed: r, size: i, value: a }) {
    super(
      `Number "${a}" is not in safe ${
        i ? `${i * 8}-bit ${r ? "signed" : "unsigned"} ` : ""
      }integer range ${t ? `(${n} to ${t})` : `(above ${n})`}`
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "IntegerOutOfRangeError",
      });
  }
}
class $6 extends R {
  constructor(t) {
    super(
      `Hex value "${t}" is not a valid boolean. The hex value must be "0x0" (false) or "0x1" (true).`
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidHexBooleanError",
      });
  }
}
class z6 extends R {
  constructor({ givenSize: t, maxSize: n }) {
    super(`Size cannot exceed ${n} bytes. Given size: ${t} bytes.`),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "SizeOverflowError",
      });
  }
}
function ur(e, { strict: t = !0 } = {}) {
  return !e || typeof e != "string"
    ? !1
    : t
    ? /^0x[0-9a-fA-F]*$/.test(e)
    : e.startsWith("0x");
}
function ze(e) {
  return ur(e, { strict: !1 }) ? Math.ceil((e.length - 2) / 2) : e.length;
}
function Di(e, { dir: t = "left" } = {}) {
  let n = typeof e == "string" ? e.replace("0x", "") : e,
    r = 0;
  for (
    let i = 0;
    i < n.length - 1 &&
    n[t === "left" ? i : n.length - i - 1].toString() === "0";
    i++
  )
    r++;
  return (
    (n = t === "left" ? n.slice(r) : n.slice(0, n.length - r)),
    typeof e == "string"
      ? (n.length === 1 && t === "right" && (n = `${n}0`),
        `0x${n.length % 2 === 1 ? `0${n}` : n}`)
      : n
  );
}
class xv extends R {
  constructor({ offset: t, position: n, size: r }) {
    super(
      `Slice ${
        n === "start" ? "starting" : "ending"
      } at offset "${t}" is out-of-bounds (size: ${r}).`
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "SliceOffsetOutOfBoundsError",
      });
  }
}
class Ev extends R {
  constructor({ size: t, targetSize: n, type: r }) {
    super(
      `${r.charAt(0).toUpperCase()}${r
        .slice(1)
        .toLowerCase()} size (${t}) exceeds padding size (${n}).`
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "SizeExceedsPaddingSizeError",
      });
  }
}
function Ji(e, { dir: t, size: n = 32 } = {}) {
  return typeof e == "string"
    ? ar(e, { dir: t, size: n })
    : W6(e, { dir: t, size: n });
}
function ar(e, { dir: t, size: n = 32 } = {}) {
  if (n === null) return e;
  const r = e.replace("0x", "");
  if (r.length > n * 2)
    throw new Ev({ size: Math.ceil(r.length / 2), targetSize: n, type: "hex" });
  return `0x${r[t === "right" ? "padEnd" : "padStart"](n * 2, "0")}`;
}
function W6(e, { dir: t, size: n = 32 } = {}) {
  if (n === null) return e;
  if (e.length > n)
    throw new Ev({ size: e.length, targetSize: n, type: "bytes" });
  const r = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    const a = t === "right";
    r[a ? i : n - i - 1] = e[a ? i : e.length - i - 1];
  }
  return r;
}
const H6 = Array.from({ length: 256 }, (e, t) =>
  t.toString(16).padStart(2, "0")
);
function Ln(e, t = {}) {
  return typeof e == "number" || typeof e == "bigint"
    ? oe(e, t)
    : typeof e == "string"
    ? Fh(e, t)
    : typeof e == "boolean"
    ? Sv(e, t)
    : ml(e, t);
}
function Sv(e, t = {}) {
  const n = `0x${Number(e)}`;
  return typeof t.size == "number"
    ? (yr(n, { size: t.size }), Ji(n, { size: t.size }))
    : n;
}
function ml(e, t = {}) {
  let n = "";
  for (let i = 0; i < e.length; i++) n += H6[e[i]];
  const r = `0x${n}`;
  return typeof t.size == "number"
    ? (yr(r, { size: t.size }), Ji(r, { dir: "right", size: t.size }))
    : r;
}
function oe(e, t = {}) {
  const { signed: n, size: r } = t,
    i = BigInt(e);
  let a;
  r
    ? n
      ? (a = (1n << (BigInt(r) * 8n - 1n)) - 1n)
      : (a = 2n ** (BigInt(r) * 8n) - 1n)
    : typeof e == "number" && (a = BigInt(Number.MAX_SAFE_INTEGER));
  const o = typeof a == "bigint" && n ? -a - 1n : 0;
  if ((a && i > a) || i < o) {
    const l = typeof e == "bigint" ? "n" : "";
    throw new B6({
      max: a ? `${a}${l}` : void 0,
      min: `${o}${l}`,
      signed: n,
      size: r,
      value: `${e}${l}`,
    });
  }
  const s = `0x${(n && i < 0 ? (1n << BigInt(r * 8)) + BigInt(i) : i).toString(
    16
  )}`;
  return r ? Ji(s, { size: r }) : s;
}
const q6 = new TextEncoder();
function Fh(e, t = {}) {
  const n = q6.encode(e);
  return ml(n, t);
}
const V6 = new TextEncoder();
function Bi(e, t = {}) {
  return typeof e == "number" || typeof e == "bigint"
    ? Q6(e, t)
    : typeof e == "boolean"
    ? G6(e, t)
    : ur(e)
    ? Uh(e, t)
    : qr(e, t);
}
function G6(e, t = {}) {
  const n = new Uint8Array(1);
  return (
    (n[0] = Number(e)),
    typeof t.size == "number"
      ? (yr(n, { size: t.size }), Ji(n, { size: t.size }))
      : n
  );
}
function Uh(e, t = {}) {
  let n = e;
  t.size &&
    (yr(n, { size: t.size }), (n = Ji(n, { dir: "right", size: t.size })));
  let r = n.slice(2);
  r.length % 2 && (r = `0${r}`);
  const i = new Uint8Array(r.length / 2);
  for (let a = 0; a < i.length; a++) {
    const o = a * 2,
      s = r.slice(o, o + 2),
      l = Number.parseInt(s, 16);
    if (Number.isNaN(l) || l < 0)
      throw new R(`Invalid byte sequence ("${s}" in "${r}").`);
    i[a] = l;
  }
  return i;
}
function Q6(e, t) {
  const n = oe(e, t);
  return Uh(n);
}
function qr(e, t = {}) {
  const n = V6.encode(e);
  return typeof t.size == "number"
    ? (yr(n, { size: t.size }), Ji(n, { dir: "right", size: t.size }))
    : n;
}
function yr(e, { size: t }) {
  if (ze(e) > t) throw new z6({ givenSize: ze(e), maxSize: t });
}
function Mh(e, t = {}) {
  const { signed: n } = t;
  t.size && yr(e, { size: t.size });
  const r = BigInt(e);
  if (!n) return r;
  const i = (e.length - 2) / 2,
    a = (1n << (BigInt(i) * 8n - 1n)) - 1n;
  return r <= a ? r : r - BigInt(`0x${"f".padStart(i * 2, "f")}`) - 1n;
}
function K6(e, t = {}) {
  let n = e;
  if ((t.size && (yr(n, { size: t.size }), (n = Di(n))), Di(n) === "0x00"))
    return !1;
  if (Di(n) === "0x01") return !0;
  throw new $6(n);
}
function mt(e, t = {}) {
  return Number(Mh(e, t));
}
function Y6(e, t = {}) {
  let n = Uh(e);
  return (
    t.size && (yr(n, { size: t.size }), (n = Di(n, { dir: "right" }))),
    new TextDecoder().decode(n)
  );
}
const Cv = { "0x0": "legacy", "0x1": "eip2930", "0x2": "eip1559" };
function _v(e) {
  const t = {
    ...e,
    blockHash: e.blockHash ? e.blockHash : null,
    blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
    chainId: e.chainId ? mt(e.chainId) : void 0,
    gas: e.gas ? BigInt(e.gas) : void 0,
    gasPrice: e.gasPrice ? BigInt(e.gasPrice) : void 0,
    maxFeePerGas: e.maxFeePerGas ? BigInt(e.maxFeePerGas) : void 0,
    maxPriorityFeePerGas: e.maxPriorityFeePerGas
      ? BigInt(e.maxPriorityFeePerGas)
      : void 0,
    nonce: e.nonce ? mt(e.nonce) : void 0,
    to: e.to ? e.to : null,
    transactionIndex: e.transactionIndex ? Number(e.transactionIndex) : null,
    type: e.type ? Cv[e.type] : void 0,
    value: e.value ? BigInt(e.value) : void 0,
    v: e.v ? BigInt(e.v) : void 0,
  };
  return (
    t.type === "legacy" &&
      (delete t.accessList,
      delete t.maxFeePerGas,
      delete t.maxPriorityFeePerGas),
    t.type === "eip2930" &&
      (delete t.maxFeePerGas, delete t.maxPriorityFeePerGas),
    t
  );
}
function Z6(e) {
  var n;
  const t =
    (n = e.transactions) == null
      ? void 0
      : n.map((r) => (typeof r == "string" ? r : _v(r)));
  return {
    ...e,
    baseFeePerGas: e.baseFeePerGas ? BigInt(e.baseFeePerGas) : null,
    difficulty: e.difficulty ? BigInt(e.difficulty) : void 0,
    gasLimit: e.gasLimit ? BigInt(e.gasLimit) : void 0,
    gasUsed: e.gasUsed ? BigInt(e.gasUsed) : void 0,
    hash: e.hash ? e.hash : null,
    logsBloom: e.logsBloom ? e.logsBloom : null,
    nonce: e.nonce ? e.nonce : null,
    number: e.number ? BigInt(e.number) : null,
    size: e.size ? BigInt(e.size) : void 0,
    timestamp: e.timestamp ? BigInt(e.timestamp) : void 0,
    transactions: t,
    totalDifficulty: e.totalDifficulty ? BigInt(e.totalDifficulty) : null,
  };
}
function ou(e, { args: t, eventName: n } = {}) {
  return {
    ...e,
    blockHash: e.blockHash ? e.blockHash : null,
    blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
    logIndex: e.logIndex ? BigInt(e.logIndex) : null,
    transactionHash: e.transactionHash ? e.transactionHash : null,
    transactionIndex: e.transactionIndex ? BigInt(e.transactionIndex) : null,
    ...(n ? { args: t, eventName: n } : {}),
  };
}
const X6 = { "0x0": "reverted", "0x1": "success" };
function J6(e) {
  return {
    ...e,
    blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
    contractAddress: e.contractAddress ? e.contractAddress : null,
    cumulativeGasUsed: e.cumulativeGasUsed ? BigInt(e.cumulativeGasUsed) : null,
    effectiveGasPrice: e.effectiveGasPrice ? BigInt(e.effectiveGasPrice) : null,
    gasUsed: e.gasUsed ? BigInt(e.gasUsed) : null,
    logs: e.logs ? e.logs.map((t) => ou(t)) : null,
    to: e.to ? e.to : null,
    transactionIndex: e.transactionIndex ? mt(e.transactionIndex) : null,
    status: e.status ? X6[e.status] : null,
    type: e.type ? Cv[e.type] : null,
  };
}
function Rh(e) {
  return {
    ...e,
    gas: typeof e.gas < "u" ? oe(e.gas) : void 0,
    gasPrice: typeof e.gasPrice < "u" ? oe(e.gasPrice) : void 0,
    maxFeePerGas: typeof e.maxFeePerGas < "u" ? oe(e.maxFeePerGas) : void 0,
    maxPriorityFeePerGas:
      typeof e.maxPriorityFeePerGas < "u" ? oe(e.maxPriorityFeePerGas) : void 0,
    nonce: typeof e.nonce < "u" ? oe(e.nonce) : void 0,
    value: typeof e.value < "u" ? oe(e.value) : void 0,
  };
}
const e5 = O6,
  kv = j6,
  t5 = "modulepreload",
  n5 = function (e) {
    return "/" + e;
  },
  sm = {},
  su = function (t, n, r) {
    if (!n || n.length === 0) return t();
    const i = document.getElementsByTagName("link");
    return Promise.all(
      n.map((a) => {
        if (((a = n5(a)), a in sm)) return;
        sm[a] = !0;
        const o = a.endsWith(".css"),
          s = o ? '[rel="stylesheet"]' : "";
        if (!!r)
          for (let c = i.length - 1; c >= 0; c--) {
            const d = i[c];
            if (d.href === a && (!o || d.rel === "stylesheet")) return;
          }
        else if (document.querySelector(`link[href="${a}"]${s}`)) return;
        const u = document.createElement("link");
        if (
          ((u.rel = o ? "stylesheet" : t5),
          o || ((u.as = "script"), (u.crossOrigin = "")),
          (u.href = a),
          document.head.appendChild(u),
          o)
        )
          return new Promise((c, d) => {
            u.addEventListener("load", c),
              u.addEventListener("error", () =>
                d(new Error(`Unable to preload CSS for ${a}`))
              );
          });
      })
    )
      .then(() => t())
      .catch((a) => {
        const o = new Event("vite:preloadError", { cancelable: !0 });
        if (((o.payload = a), window.dispatchEvent(o), !o.defaultPrevented))
          throw a;
      });
  };
var Nv = class extends Error {
    constructor({ chainId: e, connectorId: t }) {
      super(`Chain "${e}" not configured for connector "${t}".`),
        (this.name = "ChainNotConfiguredForConnectorError");
    }
  },
  Nr = class extends Error {
    constructor() {
      super(...arguments),
        (this.name = "ConnectorNotFoundError"),
        (this.message = "Connector not found");
    }
  };
function gl(e) {
  return typeof e == "string"
    ? Number.parseInt(e, e.trim().substring(0, 2) === "0x" ? 16 : 10)
    : typeof e == "bigint"
    ? Number(e)
    : e;
}
var Dv = { exports: {} };
(function (e) {
  var t = Object.prototype.hasOwnProperty,
    n = "~";
  function r() {}
  Object.create &&
    ((r.prototype = Object.create(null)), new r().__proto__ || (n = !1));
  function i(l, u, c) {
    (this.fn = l), (this.context = u), (this.once = c || !1);
  }
  function a(l, u, c, d, m) {
    if (typeof c != "function")
      throw new TypeError("The listener must be a function");
    var v = new i(c, d || l, m),
      b = n ? n + u : u;
    return (
      l._events[b]
        ? l._events[b].fn
          ? (l._events[b] = [l._events[b], v])
          : l._events[b].push(v)
        : ((l._events[b] = v), l._eventsCount++),
      l
    );
  }
  function o(l, u) {
    --l._eventsCount === 0 ? (l._events = new r()) : delete l._events[u];
  }
  function s() {
    (this._events = new r()), (this._eventsCount = 0);
  }
  (s.prototype.eventNames = function () {
    var u = [],
      c,
      d;
    if (this._eventsCount === 0) return u;
    for (d in (c = this._events)) t.call(c, d) && u.push(n ? d.slice(1) : d);
    return Object.getOwnPropertySymbols
      ? u.concat(Object.getOwnPropertySymbols(c))
      : u;
  }),
    (s.prototype.listeners = function (u) {
      var c = n ? n + u : u,
        d = this._events[c];
      if (!d) return [];
      if (d.fn) return [d.fn];
      for (var m = 0, v = d.length, b = new Array(v); m < v; m++)
        b[m] = d[m].fn;
      return b;
    }),
    (s.prototype.listenerCount = function (u) {
      var c = n ? n + u : u,
        d = this._events[c];
      return d ? (d.fn ? 1 : d.length) : 0;
    }),
    (s.prototype.emit = function (u, c, d, m, v, b) {
      var _ = n ? n + u : u;
      if (!this._events[_]) return !1;
      var C = this._events[_],
        x = arguments.length,
        g,
        w;
      if (C.fn) {
        switch ((C.once && this.removeListener(u, C.fn, void 0, !0), x)) {
          case 1:
            return C.fn.call(C.context), !0;
          case 2:
            return C.fn.call(C.context, c), !0;
          case 3:
            return C.fn.call(C.context, c, d), !0;
          case 4:
            return C.fn.call(C.context, c, d, m), !0;
          case 5:
            return C.fn.call(C.context, c, d, m, v), !0;
          case 6:
            return C.fn.call(C.context, c, d, m, v, b), !0;
        }
        for (w = 1, g = new Array(x - 1); w < x; w++) g[w - 1] = arguments[w];
        C.fn.apply(C.context, g);
      } else {
        var E = C.length,
          N;
        for (w = 0; w < E; w++)
          switch (
            (C[w].once && this.removeListener(u, C[w].fn, void 0, !0), x)
          ) {
            case 1:
              C[w].fn.call(C[w].context);
              break;
            case 2:
              C[w].fn.call(C[w].context, c);
              break;
            case 3:
              C[w].fn.call(C[w].context, c, d);
              break;
            case 4:
              C[w].fn.call(C[w].context, c, d, m);
              break;
            default:
              if (!g)
                for (N = 1, g = new Array(x - 1); N < x; N++)
                  g[N - 1] = arguments[N];
              C[w].fn.apply(C[w].context, g);
          }
      }
      return !0;
    }),
    (s.prototype.on = function (u, c, d) {
      return a(this, u, c, d, !1);
    }),
    (s.prototype.once = function (u, c, d) {
      return a(this, u, c, d, !0);
    }),
    (s.prototype.removeListener = function (u, c, d, m) {
      var v = n ? n + u : u;
      if (!this._events[v]) return this;
      if (!c) return o(this, v), this;
      var b = this._events[v];
      if (b.fn)
        b.fn === c && (!m || b.once) && (!d || b.context === d) && o(this, v);
      else {
        for (var _ = 0, C = [], x = b.length; _ < x; _++)
          (b[_].fn !== c || (m && !b[_].once) || (d && b[_].context !== d)) &&
            C.push(b[_]);
        C.length ? (this._events[v] = C.length === 1 ? C[0] : C) : o(this, v);
      }
      return this;
    }),
    (s.prototype.removeAllListeners = function (u) {
      var c;
      return (
        u
          ? ((c = n ? n + u : u), this._events[c] && o(this, c))
          : ((this._events = new r()), (this._eventsCount = 0)),
        this
      );
    }),
    (s.prototype.off = s.prototype.removeListener),
    (s.prototype.addListener = s.prototype.on),
    (s.prefixed = n),
    (s.EventEmitter = s),
    (e.exports = s);
})(Dv);
var r5 = Dv.exports;
const i5 = Rl(r5);
var Bh = (e, t, n) => {
    if (!t.has(e)) throw TypeError("Cannot " + n);
  },
  ge = (e, t, n) => (
    Bh(e, t, "read from private field"), n ? n.call(e) : t.get(e)
  ),
  ft = (e, t, n) => {
    if (t.has(e))
      throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, n);
  },
  $i = (e, t, n, r) => (
    Bh(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n
  ),
  Je = (e, t, n) => (Bh(e, t, "access private method"), n),
  $h = class extends i5 {
    constructor({ chains: e = [kv, e5], options: t }) {
      super(), (this.chains = e), (this.options = t);
    }
    getBlockExplorerUrls(e) {
      const { default: t, ...n } = e.blockExplorers ?? {};
      if (t) return [t.url, ...Object.values(n).map((r) => r.url)];
    }
    isChainUnsupported(e) {
      return !this.chains.some((t) => t.id === e);
    }
    setStorage(e) {
      this.storage = e;
    }
  };
function Yr(e, { includeName: t = !1 } = {}) {
  if (e.type !== "function" && e.type !== "event" && e.type !== "error")
    throw new b5(e.type);
  return `${e.name}(${lu(e.inputs, { includeName: t })})`;
}
function lu(e, { includeName: t = !1 } = {}) {
  return e ? e.map((n) => a5(n, { includeName: t })).join(t ? ", " : ",") : "";
}
function a5(e, { includeName: t }) {
  return e.type.startsWith("tuple")
    ? `(${lu(e.components, { includeName: t })})${e.type.slice(5)}`
    : e.type + (t && e.name ? ` ${e.name}` : "");
}
class o5 extends R {
  constructor({ docsPath: t }) {
    super(
      [
        "A constructor was not found on the ABI.",
        "Make sure you are using the correct ABI and that the constructor exists on it.",
      ].join(`
`),
      { docsPath: t }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiConstructorNotFoundError",
      });
  }
}
class lm extends R {
  constructor({ docsPath: t }) {
    super(
      [
        "Constructor arguments were provided (`args`), but a constructor parameters (`inputs`) were not found on the ABI.",
        "Make sure you are using the correct ABI, and that the `inputs` attribute on the constructor exists.",
      ].join(`
`),
      { docsPath: t }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiConstructorParamsNotFoundError",
      });
  }
}
class zh extends R {
  constructor({ data: t, params: n, size: r }) {
    super(
      [`Data size of ${r} bytes is too small for given parameters.`].join(`
`),
      {
        metaMessages: [
          `Params: (${lu(n, { includeName: !0 })})`,
          `Data:   ${t} (${r} bytes)`,
        ],
      }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiDecodingDataSizeTooSmallError",
      }),
      Object.defineProperty(this, "data", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "params", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "size", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.data = t),
      (this.params = n),
      (this.size = r);
  }
}
class uu extends R {
  constructor() {
    super('Cannot decode zero data ("0x") with ABI parameters.'),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiDecodingZeroDataError",
      });
  }
}
class s5 extends R {
  constructor({ expectedLength: t, givenLength: n, type: r }) {
    super(
      [
        `ABI encoding array length mismatch for type ${r}.`,
        `Expected length: ${t}`,
        `Given length: ${n}`,
      ].join(`
`)
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiEncodingArrayLengthMismatchError",
      });
  }
}
class l5 extends R {
  constructor({ expectedSize: t, value: n }) {
    super(
      `Size of bytes "${n}" (bytes${ze(
        n
      )}) does not match expected size (bytes${t}).`
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiEncodingBytesSizeMismatchError",
      });
  }
}
class u5 extends R {
  constructor({ expectedLength: t, givenLength: n }) {
    super(
      [
        "ABI encoding params/values length mismatch.",
        `Expected length (params): ${t}`,
        `Given length (values): ${n}`,
      ].join(`
`)
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiEncodingLengthMismatchError",
      });
  }
}
class c5 extends R {
  constructor(t, { docsPath: n }) {
    super(
      [
        `Encoded error signature "${t}" not found on ABI.`,
        "Make sure you are using the correct ABI and that the error exists on it.",
        `You can look up the signature here: https://openchain.xyz/signatures?query=${t}.`,
      ].join(`
`),
      { docsPath: n }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiErrorSignatureNotFoundError",
      });
  }
}
class f5 extends R {
  constructor({ docsPath: t }) {
    super("Cannot extract event signature from empty topics.", { docsPath: t }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiEventSignatureEmptyTopicsError",
      });
  }
}
class d5 extends R {
  constructor(t, { docsPath: n }) {
    super(
      [
        `Encoded event signature "${t}" not found on ABI.`,
        "Make sure you are using the correct ABI and that the event exists on it.",
        `You can look up the signature here: https://openchain.xyz/signatures?query=${t}.`,
      ].join(`
`),
      { docsPath: n }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiEventSignatureNotFoundError",
      });
  }
}
class um extends R {
  constructor(t, { docsPath: n } = {}) {
    super(
      [
        `Event ${t ? `"${t}" ` : ""}not found on ABI.`,
        "Make sure you are using the correct ABI and that the event exists on it.",
      ].join(`
`),
      { docsPath: n }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiEventNotFoundError",
      });
  }
}
class yl extends R {
  constructor(t, { docsPath: n } = {}) {
    super(
      [
        `Function ${t ? `"${t}" ` : ""}not found on ABI.`,
        "Make sure you are using the correct ABI and that the function exists on it.",
      ].join(`
`),
      { docsPath: n }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiFunctionNotFoundError",
      });
  }
}
class h5 extends R {
  constructor(t, { docsPath: n }) {
    super(
      [
        `Function "${t}" does not contain any \`outputs\` on ABI.`,
        "Cannot decode function result without knowing what the parameter types are.",
        "Make sure you are using the correct ABI and that the function exists on it.",
      ].join(`
`),
      { docsPath: n }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiFunctionOutputsNotFoundError",
      });
  }
}
class p5 extends R {
  constructor({ expectedSize: t, givenSize: n }) {
    super(`Expected bytes${t}, got bytes${n}.`),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "BytesSizeMismatchError",
      });
  }
}
class m5 extends R {
  constructor({ data: t, params: n, size: r }) {
    super(
      [`Data size of ${r} bytes is too small for non-indexed event parameters.`]
        .join(`
`),
      {
        metaMessages: [
          `Params: (${lu(n, { includeName: !0 })})`,
          `Data:   ${t} (${r} bytes)`,
        ],
      }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "DecodeLogDataMismatch",
      }),
      Object.defineProperty(this, "data", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "params", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "size", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.data = t),
      (this.params = n),
      (this.size = r);
  }
}
class g5 extends R {
  constructor({ abiItem: t, param: n }) {
    super(
      [
        `Expected a topic for indexed event parameter${
          n.name ? ` "${n.name}"` : ""
        } on event "${Yr(t, { includeName: !0 })}".`,
      ].join(`
`)
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "DecodeLogTopicsMismatch",
      });
  }
}
class y5 extends R {
  constructor(t, { docsPath: n }) {
    super(
      [
        `Type "${t}" is not a valid encoding type.`,
        "Please provide a valid ABI type.",
      ].join(`
`),
      { docsPath: n }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidAbiEncodingType",
      });
  }
}
class v5 extends R {
  constructor(t, { docsPath: n }) {
    super(
      [
        `Type "${t}" is not a valid decoding type.`,
        "Please provide a valid ABI type.",
      ].join(`
`),
      { docsPath: n }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidAbiDecodingType",
      });
  }
}
class w5 extends R {
  constructor(t) {
    super(
      [`Value "${t}" is not a valid array.`].join(`
`)
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidArrayError",
      });
  }
}
class b5 extends R {
  constructor(t) {
    super(
      [
        `"${t}" is not a valid definition type.`,
        'Valid types: "function", "event", "error"',
      ].join(`
`)
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidDefinitionTypeError",
      });
  }
}
class x5 extends R {
  constructor(t) {
    super(`Filter type "${t}" is not supported.`),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "FilterTypeNotSupportedError",
      });
  }
}
const E5 = /((function|event)\s)?(.*)(\((.*)\))/;
function Pv(e) {
  const t = e.match(E5),
    n = (t == null ? void 0 : t[2]) || void 0,
    r = t == null ? void 0 : t[3],
    i = (t == null ? void 0 : t[5]) || void 0;
  return { type: n, name: r, params: i };
}
function S5(e) {
  return Pv(e).name;
}
function C5(e) {
  const t = Pv(e).params,
    n = t == null ? void 0 : t.split(",").map((r) => r.trim().split(" "));
  return n == null
    ? void 0
    : n.map((r) => ({
        type: r[0],
        name: r[1] === "indexed" ? r[2] : r[1],
        ...(r[1] === "indexed" ? { indexed: !0 } : {}),
      }));
}
function $f(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function _5(e) {
  if (typeof e != "boolean") throw new Error(`Expected boolean, not ${e}`);
}
function Av(e, ...t) {
  if (!(e instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new TypeError(
      `Expected Uint8Array of length ${t}, not of length=${e.length}`
    );
}
function k5(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  $f(e.outputLen), $f(e.blockLen);
}
function N5(e, t = !0) {
  if (e.destroyed) throw new Error("Hash instance has been destroyed");
  if (t && e.finished) throw new Error("Hash#digest() has already been called");
}
function D5(e, t) {
  Av(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(
      `digestInto() expects output buffer of length at least ${n}`
    );
}
const ti = {
    number: $f,
    bool: _5,
    bytes: Av,
    hash: k5,
    exists: N5,
    output: D5,
  },
  cs = BigInt(2 ** 32 - 1),
  zf = BigInt(32);
function Tv(e, t = !1) {
  return t
    ? { h: Number(e & cs), l: Number((e >> zf) & cs) }
    : { h: Number((e >> zf) & cs) | 0, l: Number(e & cs) | 0 };
}
function P5(e, t = !1) {
  let n = new Uint32Array(e.length),
    r = new Uint32Array(e.length);
  for (let i = 0; i < e.length; i++) {
    const { h: a, l: o } = Tv(e[i], t);
    [n[i], r[i]] = [a, o];
  }
  return [n, r];
}
const A5 = (e, t) => (BigInt(e >>> 0) << zf) | BigInt(t >>> 0),
  T5 = (e, t, n) => e >>> n,
  O5 = (e, t, n) => (e << (32 - n)) | (t >>> n),
  j5 = (e, t, n) => (e >>> n) | (t << (32 - n)),
  I5 = (e, t, n) => (e << (32 - n)) | (t >>> n),
  L5 = (e, t, n) => (e << (64 - n)) | (t >>> (n - 32)),
  F5 = (e, t, n) => (e >>> (n - 32)) | (t << (64 - n)),
  U5 = (e, t) => t,
  M5 = (e, t) => e,
  R5 = (e, t, n) => (e << n) | (t >>> (32 - n)),
  B5 = (e, t, n) => (t << n) | (e >>> (32 - n)),
  $5 = (e, t, n) => (t << (n - 32)) | (e >>> (64 - n)),
  z5 = (e, t, n) => (e << (n - 32)) | (t >>> (64 - n));
function W5(e, t, n, r) {
  const i = (t >>> 0) + (r >>> 0);
  return { h: (e + n + ((i / 2 ** 32) | 0)) | 0, l: i | 0 };
}
const H5 = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0),
  q5 = (e, t, n, r) => (t + n + r + ((e / 2 ** 32) | 0)) | 0,
  V5 = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0),
  G5 = (e, t, n, r, i) => (t + n + r + i + ((e / 2 ** 32) | 0)) | 0,
  Q5 = (e, t, n, r, i) =>
    (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (i >>> 0),
  K5 = (e, t, n, r, i, a) => (t + n + r + i + a + ((e / 2 ** 32) | 0)) | 0,
  lo = {
    fromBig: Tv,
    split: P5,
    toBig: A5,
    shrSH: T5,
    shrSL: O5,
    rotrSH: j5,
    rotrSL: I5,
    rotrBH: L5,
    rotrBL: F5,
    rotr32H: U5,
    rotr32L: M5,
    rotlSH: R5,
    rotlSL: B5,
    rotlBH: $5,
    rotlBL: z5,
    add: W5,
    add3L: H5,
    add3H: q5,
    add4L: V5,
    add4H: G5,
    add5H: K5,
    add5L: Q5,
  };
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const Y5 =
    (e) =>
      new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)),
  Z5 = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!Z5) throw new Error("Non little-endian hardware is not supported");
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function X5(e) {
  if (typeof e != "string")
    throw new TypeError(`utf8ToBytes expected string, got ${typeof e}`);
  return new TextEncoder().encode(e);
}
function Wh(e) {
  if ((typeof e == "string" && (e = X5(e)), !(e instanceof Uint8Array)))
    throw new TypeError(`Expected input type is Uint8Array (got ${typeof e})`);
  return e;
}
class J5 {
  clone() {
    return this._cloneInto();
  }
}
function e4(e) {
  const t = (r) => e().update(Wh(r)).digest(),
    n = e();
  return (
    (t.outputLen = n.outputLen),
    (t.blockLen = n.blockLen),
    (t.create = () => e()),
    t
  );
}
function t4(e) {
  const t = (r, i) => e(i).update(Wh(r)).digest(),
    n = e({});
  return (
    (t.outputLen = n.outputLen),
    (t.blockLen = n.blockLen),
    (t.create = (r) => e(r)),
    t
  );
}
const [Ov, jv, Iv] = [[], [], []],
  n4 = BigInt(0),
  ya = BigInt(1),
  r4 = BigInt(2),
  i4 = BigInt(7),
  a4 = BigInt(256),
  o4 = BigInt(113);
for (let e = 0, t = ya, n = 1, r = 0; e < 24; e++) {
  ([n, r] = [r, (2 * n + 3 * r) % 5]),
    Ov.push(2 * (5 * r + n)),
    jv.push((((e + 1) * (e + 2)) / 2) % 64);
  let i = n4;
  for (let a = 0; a < 7; a++)
    (t = ((t << ya) ^ ((t >> i4) * o4)) % a4),
      t & r4 && (i ^= ya << ((ya << BigInt(a)) - ya));
  Iv.push(i);
}
const [s4, l4] = lo.split(Iv, !0),
  cm = (e, t, n) => (n > 32 ? lo.rotlBH(e, t, n) : lo.rotlSH(e, t, n)),
  fm = (e, t, n) => (n > 32 ? lo.rotlBL(e, t, n) : lo.rotlSL(e, t, n));
function u4(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = e[o] ^ e[o + 10] ^ e[o + 20] ^ e[o + 30] ^ e[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const s = (o + 8) % 10,
        l = (o + 2) % 10,
        u = n[l],
        c = n[l + 1],
        d = cm(u, c, 1) ^ n[s],
        m = fm(u, c, 1) ^ n[s + 1];
      for (let v = 0; v < 50; v += 10) (e[o + v] ^= d), (e[o + v + 1] ^= m);
    }
    let i = e[2],
      a = e[3];
    for (let o = 0; o < 24; o++) {
      const s = jv[o],
        l = cm(i, a, s),
        u = fm(i, a, s),
        c = Ov[o];
      (i = e[c]), (a = e[c + 1]), (e[c] = l), (e[c + 1] = u);
    }
    for (let o = 0; o < 50; o += 10) {
      for (let s = 0; s < 10; s++) n[s] = e[o + s];
      for (let s = 0; s < 10; s++)
        e[o + s] ^= ~n[(s + 2) % 10] & n[(s + 4) % 10];
    }
    (e[0] ^= s4[r]), (e[1] ^= l4[r]);
  }
  n.fill(0);
}
class cu extends J5 {
  constructor(t, n, r, i = !1, a = 24) {
    if (
      (super(),
      (this.blockLen = t),
      (this.suffix = n),
      (this.outputLen = r),
      (this.enableXOF = i),
      (this.rounds = a),
      (this.pos = 0),
      (this.posOut = 0),
      (this.finished = !1),
      (this.destroyed = !1),
      ti.number(r),
      0 >= this.blockLen || this.blockLen >= 200)
    )
      throw new Error("Sha3 supports only keccak-f1600 function");
    (this.state = new Uint8Array(200)), (this.state32 = Y5(this.state));
  }
  keccak() {
    u4(this.state32, this.rounds), (this.posOut = 0), (this.pos = 0);
  }
  update(t) {
    ti.exists(this);
    const { blockLen: n, state: r } = this;
    t = Wh(t);
    const i = t.length;
    for (let a = 0; a < i; ) {
      const o = Math.min(n - this.pos, i - a);
      for (let s = 0; s < o; s++) r[this.pos++] ^= t[a++];
      this.pos === n && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished) return;
    this.finished = !0;
    const { state: t, suffix: n, pos: r, blockLen: i } = this;
    (t[r] ^= n),
      n & 128 && r === i - 1 && this.keccak(),
      (t[i - 1] ^= 128),
      this.keccak();
  }
  writeInto(t) {
    ti.exists(this, !1), ti.bytes(t), this.finish();
    const n = this.state,
      { blockLen: r } = this;
    for (let i = 0, a = t.length; i < a; ) {
      this.posOut >= r && this.keccak();
      const o = Math.min(r - this.posOut, a - i);
      t.set(n.subarray(this.posOut, this.posOut + o), i),
        (this.posOut += o),
        (i += o);
    }
    return t;
  }
  xofInto(t) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(t);
  }
  xof(t) {
    return ti.number(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if ((ti.output(t, this), this.finished))
      throw new Error("digest() was already called");
    return this.writeInto(t), this.destroy(), t;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    (this.destroyed = !0), this.state.fill(0);
  }
  _cloneInto(t) {
    const {
      blockLen: n,
      suffix: r,
      outputLen: i,
      rounds: a,
      enableXOF: o,
    } = this;
    return (
      t || (t = new cu(n, r, i, o, a)),
      t.state32.set(this.state32),
      (t.pos = this.pos),
      (t.posOut = this.posOut),
      (t.finished = this.finished),
      (t.rounds = a),
      (t.suffix = r),
      (t.outputLen = i),
      (t.enableXOF = o),
      (t.destroyed = this.destroyed),
      t
    );
  }
}
const vr = (e, t, n) => e4(() => new cu(t, e, n));
vr(6, 144, 224 / 8);
vr(6, 136, 256 / 8);
vr(6, 104, 384 / 8);
vr(6, 72, 512 / 8);
vr(1, 144, 224 / 8);
const c4 = vr(1, 136, 256 / 8);
vr(1, 104, 384 / 8);
vr(1, 72, 512 / 8);
const Lv = (e, t, n) =>
  t4((r = {}) => new cu(t, e, r.dkLen === void 0 ? n : r.dkLen, !0));
Lv(31, 168, 128 / 8);
Lv(31, 136, 256 / 8);
function Pt(e, t) {
  const n = t || "hex",
    r = c4(ur(e, { strict: !1 }) ? Bi(e) : e);
  return n === "bytes" ? r : Ln(r);
}
const f4 = (e) => Pt(Bi(e));
function Fv(e) {
  const t = S5(e),
    n = C5(e) || [];
  return f4(`${t}(${n.map(({ type: r }) => r).join(",")})`);
}
const Uv = (e) => Fv(e);
class uo extends R {
  constructor({ address: t }) {
    super(`Address "${t}" is invalid.`),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidAddressError",
      });
  }
}
const d4 = /^0x[a-fA-F0-9]{40}$/;
function zi(e) {
  return d4.test(e);
}
function Pn(e) {
  return typeof e[0] == "string" ? Hh(e) : h4(e);
}
function h4(e) {
  let t = 0;
  for (const i of e) t += i.length;
  const n = new Uint8Array(t);
  let r = 0;
  for (const i of e) n.set(i, r), (r += i.length);
  return n;
}
function Hh(e) {
  return `0x${e.reduce((t, n) => t + n.replace("0x", ""), "")}`;
}
function $e(e, t, n, { strict: r } = {}) {
  return ur(e, { strict: !1 })
    ? m4(e, t, n, { strict: r })
    : p4(e, t, n, { strict: r });
}
function Mv(e, t) {
  if (typeof t == "number" && t > 0 && t > ze(e) - 1)
    throw new xv({ offset: t, position: "start", size: ze(e) });
}
function Rv(e, t, n) {
  if (typeof t == "number" && typeof n == "number" && ze(e) !== n - t)
    throw new xv({ offset: n, position: "end", size: ze(e) });
}
function p4(e, t, n, { strict: r } = {}) {
  Mv(e, t);
  const i = e.slice(t, n);
  return r && Rv(i, t, n), i;
}
function m4(e, t, n, { strict: r } = {}) {
  Mv(e, t);
  const i = `0x${e.replace("0x", "").slice((t ?? 0) * 2, (n ?? e.length) * 2)}`;
  return r && Rv(i, t, n), i;
}
function Ao(e, t) {
  if (e.length !== t.length)
    throw new u5({ expectedLength: e.length, givenLength: t.length });
  const n = g4({ params: e, values: t }),
    r = Vh(n);
  return r.length === 0 ? "0x" : r;
}
function g4({ params: e, values: t }) {
  const n = [];
  for (let r = 0; r < e.length; r++) n.push(qh({ param: e[r], value: t[r] }));
  return n;
}
function qh({ param: e, value: t }) {
  const n = fu(e.type);
  if (n) {
    const [r, i] = n;
    return v4(t, { length: r, param: { ...e, type: i } });
  }
  if (e.type === "tuple") return S4(t, { param: e });
  if (e.type === "address") return y4(t);
  if (e.type === "bool") return b4(t);
  if (e.type.startsWith("uint") || e.type.startsWith("int")) {
    const r = e.type.startsWith("int");
    return x4(t, { signed: r });
  }
  if (e.type.startsWith("bytes")) return w4(t, { param: e });
  if (e.type === "string") return E4(t);
  throw new y5(e.type, { docsPath: "/docs/contract/encodeAbiParameters" });
}
function Vh(e) {
  let t = 0;
  for (let a = 0; a < e.length; a++) {
    const { dynamic: o, encoded: s } = e[a];
    o ? (t += 32) : (t += ze(s));
  }
  const n = [],
    r = [];
  let i = 0;
  for (let a = 0; a < e.length; a++) {
    const { dynamic: o, encoded: s } = e[a];
    o ? (n.push(oe(t + i, { size: 32 })), r.push(s), (i += ze(s))) : n.push(s);
  }
  return Pn([...n, ...r]);
}
function y4(e) {
  if (!zi(e)) throw new uo({ address: e });
  return { dynamic: !1, encoded: ar(e.toLowerCase()) };
}
function v4(e, { length: t, param: n }) {
  const r = t === null;
  if (!Array.isArray(e)) throw new w5(e);
  if (!r && e.length !== t)
    throw new s5({
      expectedLength: t,
      givenLength: e.length,
      type: `${n.type}[${t}]`,
    });
  let i = !1;
  const a = [];
  for (let o = 0; o < e.length; o++) {
    const s = qh({ param: n, value: e[o] });
    s.dynamic && (i = !0), a.push(s);
  }
  if (r || i) {
    const o = Vh(a);
    if (r) {
      const s = oe(a.length, { size: 32 });
      return { dynamic: !0, encoded: a.length > 0 ? Pn([s, o]) : s };
    }
    if (i) return { dynamic: !0, encoded: o };
  }
  return { dynamic: !1, encoded: Pn(a.map(({ encoded: o }) => o)) };
}
function w4(e, { param: t }) {
  const [n, r] = t.type.split("bytes");
  if (!r) {
    const i = Math.ceil(ze(e) / 32),
      a = [];
    for (let o = 0; o < i; o++)
      a.push(ar($e(e, o * 32, (o + 1) * 32), { dir: "right" }));
    return { dynamic: !0, encoded: Pn([ar(oe(ze(e), { size: 32 })), ...a]) };
  }
  if (ze(e) !== parseInt(r))
    throw new l5({ expectedSize: parseInt(r), value: e });
  return { dynamic: !1, encoded: ar(e, { dir: "right" }) };
}
function b4(e) {
  return { dynamic: !1, encoded: ar(Sv(e)) };
}
function x4(e, { signed: t }) {
  return { dynamic: !1, encoded: oe(e, { size: 32, signed: t }) };
}
function E4(e) {
  const t = Fh(e),
    n = Math.ceil(ze(t) / 32),
    r = [];
  for (let i = 0; i < n; i++)
    r.push(ar($e(t, i * 32, (i + 1) * 32), { dir: "right" }));
  return { dynamic: !0, encoded: Pn([ar(oe(ze(t), { size: 32 })), ...r]) };
}
function S4(e, { param: t }) {
  let n = !1;
  const r = [];
  for (let i = 0; i < t.components.length; i++) {
    const a = t.components[i],
      o = Array.isArray(e) ? i : a.name,
      s = qh({ param: a, value: e[o] });
    r.push(s), s.dynamic && (n = !0);
  }
  return { dynamic: n, encoded: n ? Vh(r) : Pn(r.map(({ encoded: i }) => i)) };
}
function fu(e) {
  const t = e.match(/^(.*)\[(\d+)?\]$/);
  return t ? [t[2] ? Number(t[2]) : null, t[1]] : void 0;
}
function To({ abi: e, args: t = [], name: n }) {
  const r = e.filter((i) => "name" in i && i.name === n);
  if (r.length !== 0) {
    if (r.length === 1) return r[0];
    for (const i of r) {
      if (!("inputs" in i)) continue;
      if (!t || t.length === 0) {
        if (!i.inputs || i.inputs.length === 0) return i;
        continue;
      }
      if (!i.inputs || i.inputs.length === 0) continue;
      if (
        t.every((o, s) => {
          const l = "inputs" in i && i.inputs[s];
          return l ? Wf(o, l) : !1;
        })
      )
        return i;
    }
    return r[0];
  }
}
function Wf(e, t) {
  const n = typeof e,
    r = t.type;
  switch (r) {
    case "address":
      return zi(e);
    case "bool":
      return n === "boolean";
    case "function":
      return n === "string";
    case "string":
      return n === "string";
    default:
      return r === "tuple" && "components" in t
        ? Object.values(t.components).every((i, a) =>
            Wf(Object.values(e)[a], i)
          )
        : /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(
            r
          )
        ? n === "number" || n === "bigint"
        : /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(r)
        ? n === "string" || e instanceof Uint8Array
        : /[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(r)
        ? Array.isArray(e) &&
          e.every((i) =>
            Wf(i, { ...t, type: r.replace(/(\[[0-9]{0,}\])$/, "") })
          )
        : !1;
  }
}
function Gh({ abi: e, eventName: t, args: n }) {
  var s;
  let r = e[0];
  if (t && ((r = To({ abi: e, args: n, name: t })), !r))
    throw new um(t, { docsPath: "/docs/contract/encodeEventTopics" });
  if (r.type !== "event")
    throw new um(void 0, { docsPath: "/docs/contract/encodeEventTopics" });
  const i = Yr(r),
    a = Uv(i);
  let o = [];
  if (n && "inputs" in r) {
    const l =
        (s = r.inputs) == null
          ? void 0
          : s.filter((c) => "indexed" in c && c.indexed),
      u = Array.isArray(n)
        ? n
        : (l == null ? void 0 : l.map((c) => n[c.name])) ?? [];
    o =
      (l == null
        ? void 0
        : l.map((c, d) =>
            Array.isArray(u[d])
              ? u[d].map((m, v) => dm({ param: c, value: u[d][v] }))
              : u[d]
              ? dm({ param: c, value: u[d] })
              : null
          )) ?? [];
  }
  return [a, ...o];
}
function dm({ param: e, value: t }) {
  if (e.type === "string" || e.type === "bytes") return Pt(Bi(t));
  if (e.type === "tuple" || e.type.match(/^(.*)\[(\d+)?\]$/))
    throw new x5(e.type);
  return Ao([e], [t]);
}
function du(e, { method: t }) {
  var r, i;
  const n = {};
  return (
    e.transport.type === "fallback" &&
      ((i = (r = e.transport).onResponse) == null ||
        i.call(r, ({ method: a, response: o, status: s, transport: l }) => {
          s === "success" && t === a && (n[o] = l.request);
        })),
    (a) => n[a] || e.request
  );
}
async function Bv(
  e,
  { address: t, abi: n, args: r, eventName: i, fromBlock: a, toBlock: o }
) {
  const s = du(e, { method: "eth_newFilter" }),
    l = i ? Gh({ abi: n, args: r, eventName: i }) : void 0,
    u = await e.request({
      method: "eth_newFilter",
      params: [
        {
          address: t,
          fromBlock: typeof a == "bigint" ? oe(a) : a,
          toBlock: typeof o == "bigint" ? oe(o) : o,
          topics: l,
        },
      ],
    });
  return { abi: n, args: r, eventName: i, id: u, request: s(u), type: "event" };
}
function an(e) {
  return typeof e == "string" ? { address: e, type: "json-rpc" } : e;
}
const $v = (e) => $e(Fv(e), 0, 4);
function wr({ abi: e, args: t, functionName: n }) {
  let r = e[0];
  if (n && ((r = To({ abi: e, args: t, name: n })), !r))
    throw new yl(n, { docsPath: "/docs/contract/encodeFunctionData" });
  if (r.type !== "function")
    throw new yl(void 0, { docsPath: "/docs/contract/encodeFunctionData" });
  const i = Yr(r),
    a = $v(i),
    o = "inputs" in r && r.inputs ? Ao(r.inputs, t ?? []) : void 0;
  return Hh([a, o ?? "0x"]);
}
const zv = {
    1: "An `assert` condition failed.",
    17: "Arithmic operation resulted in underflow or overflow.",
    18: "Division or modulo by zero (e.g. `5 / 0` or `23 % 0`).",
    33: "Attempted to convert to an invalid type.",
    34: "Attempted to access a storage byte array that is incorrectly encoded.",
    49: "Performed `.pop()` on an empty array",
    50: "Array index is out of bounds.",
    65: "Allocated too much memory or created an array which is too large.",
    81: "Attempted to call a zero-initialized variable of internal function type.",
  },
  C4 = {
    inputs: [{ name: "message", type: "string" }],
    name: "Error",
    type: "error",
  },
  _4 = {
    inputs: [{ name: "reason", type: "uint256" }],
    name: "Panic",
    type: "error",
  };
function Qh(e, t) {
  const n = t ? `${t}${e.toLowerCase()}` : e.substring(2).toLowerCase(),
    r = Pt(qr(n), "bytes"),
    i = (t ? n.substring(`${t}0x`.length) : n).split("");
  for (let a = 0; a < 40; a += 2)
    r[a >> 1] >> 4 >= 8 && i[a] && (i[a] = i[a].toUpperCase()),
      (r[a >> 1] & 15) >= 8 && i[a + 1] && (i[a + 1] = i[a + 1].toUpperCase());
  return `0x${i.join("")}`;
}
function tn(e, t) {
  if (!zi(e)) throw new uo({ address: e });
  return Qh(e, t);
}
function hu(e, t) {
  if (t === "0x" && e.length > 0) throw new uu();
  if (ze(t) && ze(t) < 32) throw new zh({ data: t, params: e, size: ze(t) });
  return k4({ data: t, params: e });
}
function k4({ data: e, params: t }) {
  const n = [];
  let r = 0;
  for (let i = 0; i < t.length; i++) {
    if (r >= ze(e)) throw new zh({ data: e, params: t, size: ze(e) });
    const a = t[i],
      { consumed: o, value: s } = Pi({ data: e, param: a, position: r });
    n.push(s), (r += o);
  }
  return n;
}
function Pi({ data: e, param: t, position: n }) {
  const r = fu(t.type);
  if (r) {
    const [a, o] = r;
    return D4(e, { length: a, param: { ...t, type: o }, position: n });
  }
  if (t.type === "tuple") return j4(e, { param: t, position: n });
  if (t.type === "string") return O4(e, { position: n });
  if (t.type.startsWith("bytes")) return A4(e, { param: t, position: n });
  const i = $e(e, n, n + 32, { strict: !0 });
  if (t.type.startsWith("uint") || t.type.startsWith("int"))
    return T4(i, { param: t });
  if (t.type === "address") return N4(i);
  if (t.type === "bool") return P4(i);
  throw new v5(t.type, { docsPath: "/docs/contract/decodeAbiParameters" });
}
function N4(e) {
  return { consumed: 32, value: Qh($e(e, -20)) };
}
function D4(e, { param: t, length: n, position: r }) {
  if (!n) {
    const o = mt($e(e, r, r + 32, { strict: !0 })),
      s = mt($e(e, o, o + 32, { strict: !0 }));
    let l = 0;
    const u = [];
    for (let c = 0; c < s; ++c) {
      const d = Pi({ data: $e(e, o + 32), param: t, position: l });
      (l += d.consumed), u.push(d.value);
    }
    return { value: u, consumed: 32 };
  }
  if (vl(t)) {
    const o = fu(t.type),
      s = !(o != null && o[0]);
    let l = 0;
    const u = [];
    for (let c = 0; c < n; ++c) {
      const d = mt($e(e, r, r + 32, { strict: !0 })),
        m = Pi({ data: $e(e, d), param: t, position: s ? l : c * 32 });
      (l += m.consumed), u.push(m.value);
    }
    return { value: u, consumed: 32 };
  }
  let i = 0;
  const a = [];
  for (let o = 0; o < n; ++o) {
    const s = Pi({ data: e, param: t, position: r + i });
    (i += s.consumed), a.push(s.value);
  }
  return { value: a, consumed: i };
}
function P4(e) {
  return { consumed: 32, value: K6(e) };
}
function A4(e, { param: t, position: n }) {
  const [r, i] = t.type.split("bytes");
  if (!i) {
    const o = mt($e(e, n, n + 32, { strict: !0 })),
      s = mt($e(e, o, o + 32, { strict: !0 }));
    return s === 0
      ? { consumed: 32, value: "0x" }
      : { consumed: 32, value: $e(e, o + 32, o + 32 + s, { strict: !0 }) };
  }
  return { consumed: 32, value: $e(e, n, n + parseInt(i), { strict: !0 }) };
}
function T4(e, { param: t }) {
  const n = t.type.startsWith("int");
  return {
    consumed: 32,
    value:
      parseInt(t.type.split("int")[1] || "256") > 48
        ? Mh(e, { signed: n })
        : mt(e, { signed: n }),
  };
}
function O4(e, { position: t }) {
  const n = mt($e(e, t, t + 32, { strict: !0 })),
    r = mt($e(e, n, n + 32, { strict: !0 }));
  return r === 0
    ? { consumed: 32, value: "" }
    : {
        consumed: 32,
        value: Y6(Di($e(e, n + 32, n + 32 + r, { strict: !0 }))),
      };
}
function j4(e, { param: t, position: n }) {
  const r = t.components.length === 0 || t.components.some(({ name: o }) => !o),
    i = r ? [] : {};
  let a = 0;
  if (vl(t)) {
    const o = mt($e(e, n, n + 32, { strict: !0 }));
    for (let s = 0; s < t.components.length; ++s) {
      const l = t.components[s],
        u = Pi({ data: $e(e, o), param: l, position: a });
      (a += u.consumed), (i[r ? s : l == null ? void 0 : l.name] = u.value);
    }
    return { consumed: 32, value: i };
  }
  for (let o = 0; o < t.components.length; ++o) {
    const s = t.components[o],
      l = Pi({ data: e, param: s, position: n + a });
    (a += l.consumed), (i[r ? o : s == null ? void 0 : s.name] = l.value);
  }
  return { consumed: a, value: i };
}
function vl(e) {
  var r;
  const { type: t } = e;
  if (t === "string" || t === "bytes" || t.endsWith("[]")) return !0;
  if (t === "tuple") return (r = e.components) == null ? void 0 : r.some(vl);
  const n = fu(e.type);
  return !!(n && vl({ ...e, type: n[1] }));
}
function I4({ abi: e, data: t }) {
  const n = $e(t, 0, 4);
  if (n === "0x") throw new uu();
  const i = [...(e || []), C4, _4].find(
    (a) => a.type === "error" && n === $v(Yr(a))
  );
  if (!i) throw new c5(n, { docsPath: "/docs/contract/decodeErrorResult" });
  return {
    abiItem: i,
    args:
      "inputs" in i && i.inputs && i.inputs.length > 0
        ? hu(i.inputs, $e(t, 4))
        : void 0,
    errorName: i.name,
  };
}
const Ct = (e, t, n) =>
  JSON.stringify(
    e,
    (r, i) => {
      const a = typeof i == "bigint" ? i.toString() : i;
      return typeof t == "function" ? t(r, a) : a;
    },
    n
  );
function Wv({
  abiItem: e,
  args: t,
  includeFunctionName: n = !0,
  includeName: r = !1,
}) {
  if ("name" in e && "inputs" in e && e.inputs)
    return `${n ? e.name : ""}(${e.inputs
      .map(
        (i, a) =>
          `${r && i.name ? `${i.name}: ` : ""}${
            typeof t[a] == "object" ? Ct(t[a]) : t[a]
          }`
      )
      .join(", ")})`;
}
const L4 = { gwei: 9, wei: 18 },
  F4 = { ether: -9, wei: 9 };
function Hv(e, t) {
  let n = e.toString();
  const r = n.startsWith("-");
  r && (n = n.slice(1)), (n = n.padStart(t, "0"));
  let [i, a] = [n.slice(0, n.length - t), n.slice(n.length - t)];
  return (
    (a = a.replace(/(0+)$/, "")),
    `${r ? "-" : ""}${i || "0"}${a ? `.${a}` : ""}`
  );
}
function Kh(e, t = "wei") {
  return Hv(e, L4[t]);
}
function Ot(e, t = "wei") {
  return Hv(e, F4[t]);
}
function pu(e) {
  const t = Object.entries(e)
      .map(([r, i]) => (i === void 0 || i === !1 ? null : [r, i]))
      .filter(Boolean),
    n = t.reduce((r, [i]) => Math.max(r, i.length), 0);
  return t.map(([r, i]) => `  ${`${r}:`.padEnd(n + 1)}  ${i}`).join(`
`);
}
class U4 extends R {
  constructor() {
    super(
      [
        "Cannot specify both a `gasPrice` and a `maxFeePerGas`/`maxPriorityFeePerGas`.",
        "Use `maxFeePerGas`/`maxPriorityFeePerGas` for EIP-1559 compatible networks, and `gasPrice` for others.",
      ].join(`
`)
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "FeeConflictError",
      });
  }
}
class M4 extends R {
  constructor(
    t,
    {
      account: n,
      docsPath: r,
      chain: i,
      data: a,
      gas: o,
      gasPrice: s,
      maxFeePerGas: l,
      maxPriorityFeePerGas: u,
      nonce: c,
      to: d,
      value: m,
    }
  ) {
    const v = pu({
      chain:
        i &&
        `${i == null ? void 0 : i.name} (id: ${i == null ? void 0 : i.id})`,
      from: n == null ? void 0 : n.address,
      to: d,
      value:
        typeof m < "u" &&
        `${Kh(m)} ${(i == null ? void 0 : i.nativeCurrency.symbol) || "ETH"}`,
      data: a,
      gas: o,
      gasPrice: typeof s < "u" && `${Ot(s)} gwei`,
      maxFeePerGas: typeof l < "u" && `${Ot(l)} gwei`,
      maxPriorityFeePerGas: typeof u < "u" && `${Ot(u)} gwei`,
      nonce: c,
    });
    super(t.shortMessage, {
      cause: t,
      docsPath: r,
      metaMessages: [
        ...(t.metaMessages ? [...t.metaMessages, " "] : []),
        "Request Arguments:",
        v,
      ].filter(Boolean),
    }),
      Object.defineProperty(this, "cause", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "TransactionExecutionError",
      }),
      (this.cause = t);
  }
}
class qv extends R {
  constructor({
    blockHash: t,
    blockNumber: n,
    blockTag: r,
    hash: i,
    index: a,
  }) {
    let o = "Transaction";
    r &&
      a !== void 0 &&
      (o = `Transaction at block time "${r}" at index "${a}"`),
      t &&
        a !== void 0 &&
        (o = `Transaction at block hash "${t}" at index "${a}"`),
      n &&
        a !== void 0 &&
        (o = `Transaction at block number "${n}" at index "${a}"`),
      i && (o = `Transaction with hash "${i}"`),
      super(`${o} could not be found.`),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "TransactionNotFoundError",
      });
  }
}
class Vv extends R {
  constructor({ hash: t }) {
    super(
      `Transaction receipt with hash "${t}" could not be found. The Transaction may not be processed on a block yet.`
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "TransactionReceiptNotFoundError",
      });
  }
}
class R4 extends R {
  constructor({ hash: t }) {
    super(
      `Timed out while waiting for transaction with hash "${t}" to be confirmed.`
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "WaitForTransactionReceiptTimeoutError",
      });
  }
}
class Gv extends R {
  constructor(
    t,
    {
      account: n,
      docsPath: r,
      chain: i,
      data: a,
      gas: o,
      gasPrice: s,
      maxFeePerGas: l,
      maxPriorityFeePerGas: u,
      nonce: c,
      to: d,
      value: m,
    }
  ) {
    const v = n ? an(n) : void 0,
      b = pu({
        from: v == null ? void 0 : v.address,
        to: d,
        value:
          typeof m < "u" &&
          `${Kh(m)} ${(i == null ? void 0 : i.nativeCurrency.symbol) || "ETH"}`,
        data: a,
        gas: o,
        gasPrice: typeof s < "u" && `${Ot(s)} gwei`,
        maxFeePerGas: typeof l < "u" && `${Ot(l)} gwei`,
        maxPriorityFeePerGas: typeof u < "u" && `${Ot(u)} gwei`,
        nonce: c,
      });
    super(t.shortMessage, {
      cause: t,
      docsPath: r,
      metaMessages: [
        ...(t.metaMessages ? [...t.metaMessages, " "] : []),
        "Raw Call Arguments:",
        b,
      ].filter(Boolean),
    }),
      Object.defineProperty(this, "cause", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "CallExecutionError",
      }),
      (this.cause = t);
  }
}
class Qv extends R {
  constructor(
    t,
    {
      abi: n,
      args: r,
      contractAddress: i,
      docsPath: a,
      functionName: o,
      sender: s,
    }
  ) {
    const l = To({ abi: n, args: r, name: o }),
      u = l
        ? Wv({ abiItem: l, args: r, includeFunctionName: !1, includeName: !1 })
        : void 0,
      c = l ? Yr(l, { includeName: !0 }) : void 0,
      d = pu({
        address: i && L6(i),
        function: c,
        args:
          u &&
          u !== "()" &&
          `${[...Array((o == null ? void 0 : o.length) ?? 0).keys()]
            .map(() => " ")
            .join("")}${u}`,
        sender: s,
      });
    super(
      t.shortMessage ||
        `An unknown error occurred while executing the contract function "${o}".`,
      {
        cause: t,
        docsPath: a,
        metaMessages: [
          ...(t.metaMessages ? [...t.metaMessages, " "] : []),
          "Contract Call:",
          d,
        ].filter(Boolean),
      }
    ),
      Object.defineProperty(this, "abi", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "args", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "cause", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "contractAddress", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "formattedArgs", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "functionName", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "sender", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ContractFunctionExecutionError",
      }),
      (this.abi = n),
      (this.args = r),
      (this.cause = t),
      (this.contractAddress = i),
      (this.functionName = o),
      (this.sender = s);
  }
}
class B4 extends R {
  constructor({ abi: t, data: n, functionName: r, message: i }) {
    let a, o, s;
    if (n && n !== "0x") {
      a = I4({ abi: t, data: n });
      const { abiItem: l, errorName: u, args: c } = a;
      if (u === "Error") s = c[0];
      else if (u === "Panic") {
        const [d] = c;
        s = zv[d];
      } else {
        const d = l ? Yr(l, { includeName: !0 }) : void 0,
          m =
            l && c
              ? Wv({
                  abiItem: l,
                  args: c,
                  includeFunctionName: !1,
                  includeName: !1,
                })
              : void 0;
        o = [
          d ? `Error: ${d}` : "",
          m && m !== "()"
            ? `       ${[...Array((u == null ? void 0 : u.length) ?? 0).keys()]
                .map(() => " ")
                .join("")}${m}`
            : "",
        ];
      }
    } else i && (s = i);
    super(
      s && s !== "execution reverted"
        ? [
            `The contract function "${r}" reverted with the following reason:`,
            s,
          ].join(`
`)
        : `The contract function "${r}" reverted.`,
      { metaMessages: o }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ContractFunctionRevertedError",
      }),
      Object.defineProperty(this, "data", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "reason", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.reason = s),
      (this.data = a);
  }
}
class $4 extends R {
  constructor({ functionName: t }) {
    super(`The contract function "${t}" returned no data ("0x").`, {
      metaMessages: [
        "This could be due to any of the following:",
        `  - The contract does not have the function "${t}",`,
        "  - The parameters passed to the contract function may be invalid, or",
        "  - The address is not a contract.",
      ],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ContractFunctionZeroDataError",
      });
  }
}
class Yh extends R {
  constructor({ data: t, message: n }) {
    super(n || ""),
      Object.defineProperty(this, "code", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 3,
      }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "RawContractError",
      }),
      Object.defineProperty(this, "data", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.data = t);
  }
}
const z4 = 3;
function co(
  e,
  { abi: t, address: n, args: r, docsPath: i, functionName: a, sender: o }
) {
  const {
    code: s,
    data: l,
    message: u,
    shortMessage: c,
  } = e instanceof Yh ? e : e instanceof R ? e.walk((m) => "data" in m) : {};
  let d = e;
  return (
    e instanceof uu
      ? (d = new $4({ functionName: a }))
      : s === z4 &&
        (l || u || c) &&
        (d = new B4({
          abi: t,
          data: typeof l == "object" ? l.data : l,
          functionName: a,
          message: c ?? u,
        })),
    new Qv(d, {
      abi: t,
      args: r,
      contractAddress: n,
      docsPath: i,
      functionName: a,
      sender: o,
    })
  );
}
class Oo extends R {
  constructor({ docsPath: t } = {}) {
    super(
      [
        "Could not find an Account to execute with this Action.",
        "Please provide an Account with the `account` argument on the Action, or by supplying an `account` to the WalletClient.",
      ].join(`
`),
      { docsPath: t, docsSlug: "account" }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AccountNotFoundError",
      });
  }
}
class W4 extends R {
  constructor(
    t,
    {
      account: n,
      docsPath: r,
      chain: i,
      data: a,
      gas: o,
      gasPrice: s,
      maxFeePerGas: l,
      maxPriorityFeePerGas: u,
      nonce: c,
      to: d,
      value: m,
    }
  ) {
    const v = pu({
      from: n == null ? void 0 : n.address,
      to: d,
      value:
        typeof m < "u" &&
        `${Kh(m)} ${(i == null ? void 0 : i.nativeCurrency.symbol) || "ETH"}`,
      data: a,
      gas: o,
      gasPrice: typeof s < "u" && `${Ot(s)} gwei`,
      maxFeePerGas: typeof l < "u" && `${Ot(l)} gwei`,
      maxPriorityFeePerGas: typeof u < "u" && `${Ot(u)} gwei`,
      nonce: c,
    });
    super(t.shortMessage, {
      cause: t,
      docsPath: r,
      metaMessages: [
        ...(t.metaMessages ? [...t.metaMessages, " "] : []),
        "Estimate Gas Arguments:",
        v,
      ].filter(Boolean),
    }),
      Object.defineProperty(this, "cause", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "EstimateGasExecutionError",
      }),
      (this.cause = t);
  }
}
class Ai extends R {
  constructor({ cause: t, message: n } = {}) {
    var i;
    const r =
      (i = n == null ? void 0 : n.replace("execution reverted: ", "")) == null
        ? void 0
        : i.replace("execution reverted", "");
    super(
      `Execution reverted ${
        r ? `with reason: ${r}` : "for an unknown reason"
      }.`,
      { cause: t }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ExecutionRevertedError",
      });
  }
}
Object.defineProperty(Ai, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 3,
});
Object.defineProperty(Ai, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /execution reverted/,
});
class wl extends R {
  constructor({ cause: t, maxFeePerGas: n } = {}) {
    super(
      `The fee cap (\`maxFeePerGas\`${
        n ? ` = ${Ot(n)} gwei` : ""
      }) cannot be higher than the maximum allowed value (2^256-1).`,
      { cause: t }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "FeeCapTooHigh",
      });
  }
}
Object.defineProperty(wl, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/,
});
class Hf extends R {
  constructor({ cause: t, maxFeePerGas: n } = {}) {
    super(
      `The fee cap (\`maxFeePerGas\`${
        n ? ` = ${Ot(n)}` : ""
      } gwei) cannot be lower than the block base fee.`,
      { cause: t }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "FeeCapTooLow",
      });
  }
}
Object.defineProperty(Hf, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value:
    /max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/,
});
class qf extends R {
  constructor({ cause: t, nonce: n } = {}) {
    super(
      `Nonce provided for the transaction ${
        n ? `(${n}) ` : ""
      }is higher than the next one expected.`,
      { cause: t }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "NonceTooHighError",
      });
  }
}
Object.defineProperty(qf, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /nonce too high/,
});
class Vf extends R {
  constructor({ cause: t, nonce: n } = {}) {
    super(
      [
        `Nonce provided for the transaction ${
          n ? `(${n}) ` : ""
        }is lower than the current nonce of the account.`,
        "Try increasing the nonce or find the latest nonce with `getTransactionCount`.",
      ].join(`
`),
      { cause: t }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "NonceTooLowError",
      });
  }
}
Object.defineProperty(Vf, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /nonce too low|transaction already imported/,
});
class Gf extends R {
  constructor({ cause: t, nonce: n } = {}) {
    super(
      `Nonce provided for the transaction ${
        n ? `(${n}) ` : ""
      }exceeds the maximum allowed nonce.`,
      { cause: t }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "NonceMaxValueError",
      });
  }
}
Object.defineProperty(Gf, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /nonce has max value/,
});
class Qf extends R {
  constructor({ cause: t } = {}) {
    super(
      [
        "The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account.",
      ].join(`
`),
      {
        cause: t,
        metaMessages: [
          "This error could arise when the account does not have enough funds to:",
          " - pay for the total gas fee,",
          " - pay for the value to send.",
          " ",
          "The cost of the transaction is calculated as `gas * gas fee + value`, where:",
          " - `gas` is the amount of gas needed for transaction to execute,",
          " - `gas fee` is the gas fee,",
          " - `value` is the amount of ether to send to the recipient.",
        ],
      }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InsufficientFundsError",
      });
  }
}
Object.defineProperty(Qf, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /insufficient funds/,
});
class Kf extends R {
  constructor({ cause: t, gas: n } = {}) {
    super(
      `The amount of gas ${
        n ? `(${n}) ` : ""
      }provided for the transaction exceeds the limit allowed for the block.`,
      { cause: t }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "IntrinsicGasTooHighError",
      });
  }
}
Object.defineProperty(Kf, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /intrinsic gas too high|gas limit reached/,
});
class Yf extends R {
  constructor({ cause: t, gas: n } = {}) {
    super(
      `The amount of gas ${
        n ? `(${n}) ` : ""
      }provided for the transaction is too low.`,
      { cause: t }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "IntrinsicGasTooLowError",
      });
  }
}
Object.defineProperty(Yf, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /intrinsic gas too low/,
});
class Zf extends R {
  constructor({ cause: t }) {
    super("The transaction type is not supported for this chain.", {
      cause: t,
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "TransactionTypeNotSupportedError",
      });
  }
}
Object.defineProperty(Zf, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /transaction type not valid/,
});
class bl extends R {
  constructor({ cause: t, maxPriorityFeePerGas: n, maxFeePerGas: r } = {}) {
    super(
      [
        `The provided tip (\`maxPriorityFeePerGas\`${
          n ? ` = ${Ot(n)} gwei` : ""
        }) cannot be higher than the fee cap (\`maxFeePerGas\`${
          r ? ` = ${Ot(r)} gwei` : ""
        }).`,
      ].join(`
`),
      { cause: t }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "TipAboveFeeCapError",
      });
  }
}
Object.defineProperty(bl, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value:
    /max priority fee per gas higher than max fee per gas|tip higher than fee cap/,
});
class H4 extends R {
  constructor({ cause: t }) {
    super(
      `An error occurred while executing: ${t == null ? void 0 : t.message}`,
      { cause: t }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "UnknownNodeError",
      });
  }
}
class Ra extends R {
  constructor({ body: t, details: n, headers: r, status: i, url: a }) {
    super("HTTP request failed.", {
      details: n,
      metaMessages: [
        i && `Status: ${i}`,
        `URL: ${au(a)}`,
        t && `Request body: ${Ct(t)}`,
      ].filter(Boolean),
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "HttpRequestError",
      }),
      Object.defineProperty(this, "body", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "headers", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "status", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "url", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.body = t),
      (this.headers = r),
      (this.status = i),
      (this.url = a);
  }
}
class q4 extends R {
  constructor({ body: t, details: n, url: r }) {
    super("WebSocket request failed.", {
      details: n,
      metaMessages: [`URL: ${au(r)}`, `Request body: ${Ct(t)}`],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "WebSocketRequestError",
      });
  }
}
class fo extends R {
  constructor({ body: t, error: n, url: r }) {
    super("RPC Request failed.", {
      cause: n,
      details: n.message,
      metaMessages: [`URL: ${au(r)}`, `Request body: ${Ct(t)}`],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "RpcRequestError",
      }),
      Object.defineProperty(this, "code", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.code = n.code);
  }
}
class Xf extends R {
  constructor({ body: t, url: n }) {
    super("The request took too long to respond.", {
      details: "The request timed out.",
      metaMessages: [`URL: ${au(n)}`, `Request body: ${Ct(t)}`],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "TimeoutError",
      });
  }
}
const V4 = -1;
class _t extends R {
  constructor(t, { code: n, docsPath: r, metaMessages: i, shortMessage: a }) {
    super(a, {
      cause: t,
      docsPath: r,
      metaMessages: i || (t == null ? void 0 : t.metaMessages),
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "RpcError",
      }),
      Object.defineProperty(this, "code", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.name = t.name),
      (this.code = t instanceof fo ? t.code : n ?? V4);
  }
}
class ea extends _t {
  constructor(t, n) {
    super(t, n),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ProviderRpcError",
      }),
      Object.defineProperty(this, "data", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.data = n.data);
  }
}
class G4 extends _t {
  constructor(t) {
    super(t, {
      code: -32700,
      shortMessage:
        "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.",
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ParseRpcError",
      });
  }
}
class Q4 extends _t {
  constructor(t) {
    super(t, {
      code: -32600,
      shortMessage: "JSON is not a valid request object.",
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidRequestRpcError",
      });
  }
}
class K4 extends _t {
  constructor(t) {
    super(t, {
      code: -32601,
      shortMessage: "The method does not exist / is not available.",
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "MethodNotFoundRpcError",
      });
  }
}
class Y4 extends _t {
  constructor(t) {
    super(t, {
      code: -32602,
      shortMessage: [
        "Invalid parameters were provided to the RPC method.",
        "Double check you have provided the correct parameters.",
      ].join(`
`),
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidParamsRpcError",
      });
  }
}
class Z4 extends _t {
  constructor(t) {
    super(t, { code: -32603, shortMessage: "An internal error was received." }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InternalRpcError",
      });
  }
}
class Kv extends _t {
  constructor(t) {
    super(t, {
      code: -32e3,
      shortMessage: [
        "Missing or invalid parameters.",
        "Double check you have provided the correct parameters.",
      ].join(`
`),
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidInputRpcError",
      });
  }
}
class X4 extends _t {
  constructor(t) {
    super(t, { code: -32001, shortMessage: "Requested resource not found." }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ResourceNotFoundRpcError",
      });
  }
}
class xl extends _t {
  constructor(t) {
    super(t, {
      code: -32002,
      shortMessage: "Requested resource not available.",
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ResourceUnavailableRpcError",
      });
  }
}
class Yv extends _t {
  constructor(t) {
    super(t, { code: -32003, shortMessage: "Transaction creation failed." }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "TransactionRejectedRpcError",
      });
  }
}
class hm extends _t {
  constructor(t) {
    super(t, { code: -32004, shortMessage: "Method is not implemented." }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "MethodNotSupportedRpcError",
      });
  }
}
class J4 extends _t {
  constructor(t) {
    super(t, { code: -32005, shortMessage: "Request exceeds defined limit." }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "LimitExceededRpcError",
      });
  }
}
class e8 extends _t {
  constructor(t) {
    super(t, {
      code: -32006,
      shortMessage: "Version of JSON-RPC protocol is not supported.",
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "JsonRpcVersionUnsupportedError",
      });
  }
}
class Yt extends ea {
  constructor(t) {
    super(t, { code: 4001, shortMessage: "User rejected the request." }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "UserRejectedRequestError",
      });
  }
}
class t8 extends ea {
  constructor(t) {
    super(t, {
      code: 4100,
      shortMessage:
        "The requested method and/or account has not been authorized by the user.",
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "UnauthorizedProviderError",
      });
  }
}
class n8 extends ea {
  constructor(t) {
    super(t, {
      code: 4200,
      shortMessage: "The Provider does not support the requested method.",
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "UnsupportedProviderMethodError",
      });
  }
}
class r8 extends ea {
  constructor(t) {
    super(t, {
      code: 4900,
      shortMessage: "The Provider is disconnected from all chains.",
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ProviderDisconnectedError",
      });
  }
}
class i8 extends ea {
  constructor(t) {
    super(t, {
      code: 4901,
      shortMessage: "The Provider is not connected to the requested chain.",
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ChainDisconnectedError",
      });
  }
}
class ho extends ea {
  constructor(t) {
    super(t, {
      code: 4902,
      shortMessage: "An error occurred when attempting to switch chain.",
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "SwitchChainError",
      });
  }
}
class a8 extends _t {
  constructor(t) {
    super(t, { shortMessage: "An unknown RPC error occurred." }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "UnknownRpcError",
      });
  }
}
function Zh(e) {
  return (
    e instanceof Yv ||
    e instanceof Kv ||
    (e instanceof fo && e.code === Ai.code)
  );
}
function Xh(e, t) {
  var r;
  const n = e.details.toLowerCase();
  return wl.nodeMessage.test(n)
    ? new wl({ cause: e, maxFeePerGas: t == null ? void 0 : t.maxFeePerGas })
    : Hf.nodeMessage.test(n)
    ? new Hf({ cause: e, maxFeePerGas: t == null ? void 0 : t.maxFeePerGas })
    : qf.nodeMessage.test(n)
    ? new qf({ cause: e, nonce: t == null ? void 0 : t.nonce })
    : Vf.nodeMessage.test(n)
    ? new Vf({ cause: e, nonce: t == null ? void 0 : t.nonce })
    : Gf.nodeMessage.test(n)
    ? new Gf({ cause: e, nonce: t == null ? void 0 : t.nonce })
    : Qf.nodeMessage.test(n)
    ? new Qf({ cause: e })
    : Kf.nodeMessage.test(n)
    ? new Kf({ cause: e, gas: t == null ? void 0 : t.gas })
    : Yf.nodeMessage.test(n)
    ? new Yf({ cause: e, gas: t == null ? void 0 : t.gas })
    : Zf.nodeMessage.test(n)
    ? new Zf({ cause: e })
    : bl.nodeMessage.test(n)
    ? new bl({
        cause: e,
        maxFeePerGas: t == null ? void 0 : t.maxFeePerGas,
        maxPriorityFeePerGas: t == null ? void 0 : t.maxPriorityFeePerGas,
      })
    : n.match(Ai.nodeMessage) ||
      ("code" in e.cause &&
        ((r = e.cause) == null ? void 0 : r.code) === Ai.code)
    ? new Ai({ cause: e, message: e.cause.details || e.details })
    : new H4({ cause: e.cause.cause });
}
function o8(e, { docsPath: t, ...n }) {
  let r = e;
  return Zh(e) && (r = Xh(e, n)), new W4(r, { docsPath: t, ...n });
}
function Jh(e, { formatter: t }) {
  return t
    ? Object.keys(t({})).reduce(
        (r, i) => (e != null && e.hasOwnProperty(i) && (r[i] = e[i]), r),
        {}
      )
    : {};
}
function mu(e) {
  const {
      account: t,
      gasPrice: n,
      maxFeePerGas: r,
      maxPriorityFeePerGas: i,
      to: a,
    } = e,
    o = t ? an(t) : void 0;
  if (o && !zi(o.address)) throw new uo({ address: o.address });
  if (a && !zi(a)) throw new uo({ address: a });
  if (typeof n < "u" && (typeof r < "u" || typeof i < "u")) throw new U4();
  if (r && r > 2n ** 256n - 1n) throw new wl({ maxFeePerGas: r });
  if (i && r && i > r)
    throw new bl({ maxFeePerGas: r, maxPriorityFeePerGas: i });
}
class s8 extends R {
  constructor({ blockHash: t, blockNumber: n }) {
    let r = "Block";
    t && (r = `Block at hash "${t}"`),
      n && (r = `Block at number "${n}"`),
      super(`${r} could not be found.`),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "BlockNotFoundError",
      });
  }
}
async function po(
  e,
  {
    blockHash: t,
    blockNumber: n,
    blockTag: r = "latest",
    includeTransactions: i = !1,
  } = {}
) {
  var s, l;
  const a = n !== void 0 ? oe(n) : void 0;
  let o = null;
  if (
    (t
      ? (o = await e.request({ method: "eth_getBlockByHash", params: [t, i] }))
      : (o = await e.request({
          method: "eth_getBlockByNumber",
          params: [a || r, i],
        })),
    !o)
  )
    throw new s8({ blockHash: t, blockNumber: n });
  return Xi(o, {
    formatter:
      ((l = (s = e.chain) == null ? void 0 : s.formatters) == null
        ? void 0
        : l.block) || Z6,
  });
}
async function Zv(e) {
  const t = await e.request({ method: "eth_gasPrice" });
  return BigInt(t);
}
async function Xv(e, { address: t, blockTag: n = "latest", blockNumber: r }) {
  const i = await e.request({
    method: "eth_getTransactionCount",
    params: [t, r ? oe(r) : n],
  });
  return mt(i);
}
const vc = 1500000000n;
async function Jv(e, t) {
  const {
    account: n,
    gas: r,
    gasPrice: i,
    maxFeePerGas: a,
    maxPriorityFeePerGas: o,
    nonce: s,
  } = t;
  if (!n) throw new Oo();
  const l = an(n),
    u = await po(e, { blockTag: "latest" }),
    c = { ...t, from: l.address };
  if (
    (typeof s > "u" &&
      (c.nonce = await Xv(e, { address: l.address, blockTag: "pending" })),
    u.baseFeePerGas)
  ) {
    if (typeof i < "u")
      throw new R("Chain does not support legacy `gasPrice`.");
    if (typeof a > "u")
      (c.maxPriorityFeePerGas = o ?? vc),
        (c.maxFeePerGas =
          (u.baseFeePerGas * 120n) / 100n + c.maxPriorityFeePerGas);
    else {
      if (typeof o > "u" && a < vc)
        throw new R(
          "`maxFeePerGas` cannot be less than the default `maxPriorityFeePerGas` (1.5 gwei)."
        );
      (c.maxFeePerGas = a), (c.maxPriorityFeePerGas = o ?? vc);
    }
  } else {
    if (typeof a < "u" || typeof o < "u")
      throw new R("Chain does not support EIP-1559 fees.");
    typeof i > "u" && (c.gasPrice = ((await Zv(e)) * 120n) / 100n);
  }
  return (
    typeof r > "u" &&
      (c.gas = await e0(e, {
        ...c,
        account: { address: l.address, type: "json-rpc" },
      })),
    mu(c),
    c
  );
}
async function e0(e, t) {
  var i, a;
  const n = t.account ?? e.account;
  if (!n) throw new Oo({ docsPath: "/docs/actions/public/estimateGas" });
  const r = an(n);
  try {
    const {
        accessList: o,
        blockNumber: s,
        blockTag: l,
        data: u,
        gas: c,
        gasPrice: d,
        maxFeePerGas: m,
        maxPriorityFeePerGas: v,
        nonce: b,
        to: _,
        value: C,
        ...x
      } = r.type === "local" ? await Jv(e, t) : t,
      w = (s ? oe(s) : void 0) || l;
    mu(t);
    const E =
        (a = (i = e.chain) == null ? void 0 : i.formatters) == null
          ? void 0
          : a.transactionRequest,
      N = Xi(
        {
          from: r.address,
          accessList: o,
          data: u,
          gas: c,
          gasPrice: d,
          maxFeePerGas: m,
          maxPriorityFeePerGas: v,
          nonce: b,
          to: _,
          value: C,
          ...Jh(x, { formatter: E }),
        },
        { formatter: E || Rh }
      ),
      D = await e.request({
        method: "eth_estimateGas",
        params: w ? [N, w] : [N],
      });
    return BigInt(D);
  } catch (o) {
    throw o8(o, { ...t, account: r, chain: e.chain });
  }
}
async function l8(e, { abi: t, address: n, args: r, functionName: i, ...a }) {
  const o = wr({ abi: t, args: r, functionName: i });
  try {
    return await e0(e, { data: o, to: n, ...a });
  } catch (s) {
    const l = a.account ? an(a.account) : void 0;
    throw co(s, {
      abi: t,
      address: n,
      args: r,
      docsPath: "/docs/contract/simulateContract",
      functionName: i,
      sender: l == null ? void 0 : l.address,
    });
  }
}
const wc = "/docs/contract/decodeFunctionResult";
function ta({ abi: e, args: t, functionName: n, data: r }) {
  let i = e[0];
  if (n && ((i = To({ abi: e, args: t, name: n })), !i))
    throw new yl(n, { docsPath: wc });
  if (i.type !== "function") throw new yl(void 0, { docsPath: wc });
  if (!i.outputs) throw new h5(i.name, { docsPath: wc });
  const a = hu(i.outputs, r);
  if (a && a.length > 1) return a;
  if (a && a.length === 1) return a[0];
}
const Jf = [
    {
      inputs: [
        {
          components: [
            { name: "target", type: "address" },
            { name: "allowFailure", type: "bool" },
            { name: "callData", type: "bytes" },
          ],
          name: "calls",
          type: "tuple[]",
        },
      ],
      name: "aggregate3",
      outputs: [
        {
          components: [
            { name: "success", type: "bool" },
            { name: "returnData", type: "bytes" },
          ],
          name: "returnData",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  e2 = [
    {
      name: "resolve",
      type: "function",
      stateMutability: "view",
      inputs: [
        { name: "name", type: "bytes" },
        { name: "data", type: "bytes" },
      ],
      outputs: [
        { name: "", type: "bytes" },
        { name: "address", type: "address" },
      ],
    },
  ],
  pm = [
    {
      name: "text",
      type: "function",
      stateMutability: "view",
      inputs: [
        { name: "name", type: "bytes32" },
        { name: "key", type: "string" },
      ],
      outputs: [{ name: "", type: "string" }],
    },
  ],
  mm = [
    {
      name: "addr",
      type: "function",
      stateMutability: "view",
      inputs: [{ name: "name", type: "bytes32" }],
      outputs: [{ name: "", type: "address" }],
    },
  ],
  u8 = [
    {
      inputs: [
        { internalType: "address", name: "_signer", type: "address" },
        { internalType: "bytes32", name: "_hash", type: "bytes32" },
        { internalType: "bytes", name: "_signature", type: "bytes" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
  ],
  c8 = "0x82ad56cb";
function f8(e, { docsPath: t, ...n }) {
  let r = e;
  return Zh(e) && (r = Xh(e, n)), new Gv(r, { docsPath: t, ...n });
}
const bc = new Map();
function t2({ fn: e, id: t, shouldSplitBatch: n, wait: r = 0 }) {
  const i = async () => {
      const u = s();
      a();
      const c = u.map(({ args: d }) => d);
      c.length !== 0 &&
        e(c)
          .then((d) => {
            u.forEach(({ pendingPromise: m }, v) => {
              var b;
              return (b = m.resolve) == null ? void 0 : b.call(m, [d[v], d]);
            });
          })
          .catch((d) => {
            u.forEach(({ pendingPromise: m }) => {
              var v;
              return (v = m.reject) == null ? void 0 : v.call(m, d);
            });
          });
    },
    a = () => bc.delete(t),
    o = () => s().map(({ args: u }) => u),
    s = () => bc.get(t) || [],
    l = (u) => bc.set(t, [...s(), u]);
  return {
    flush: a,
    async schedule(u) {
      const c = {},
        d = new Promise((b, _) => {
          (c.resolve = b), (c.reject = _);
        });
      return (
        (n == null ? void 0 : n([...o(), u])) && i(),
        s().length > 0
          ? (l({ args: u, pendingPromise: c }), d)
          : (l({ args: u, pendingPromise: c }), setTimeout(i, r), d)
      );
    },
  };
}
async function gu(e, t) {
  var x, g, w;
  const {
      account: n,
      batch: r = !!((x = e.batch) != null && x.multicall),
      blockNumber: i,
      blockTag: a = "latest",
      accessList: o,
      data: s,
      gas: l,
      gasPrice: u,
      maxFeePerGas: c,
      maxPriorityFeePerGas: d,
      nonce: m,
      to: v,
      value: b,
      ..._
    } = t,
    C = n ? an(n) : void 0;
  try {
    mu(t);
    const N = (i ? oe(i) : void 0) || a,
      D =
        (w = (g = e.chain) == null ? void 0 : g.formatters) == null
          ? void 0
          : w.transactionRequest,
      f = Xi(
        {
          from: C == null ? void 0 : C.address,
          accessList: o,
          data: s,
          gas: l,
          gasPrice: u,
          maxFeePerGas: c,
          maxPriorityFeePerGas: d,
          nonce: m,
          to: v,
          value: b,
          ...Jh(_, { formatter: D }),
        },
        { formatter: D || Rh }
      );
    if (r && d8({ request: f }))
      try {
        return await h8(e, { ...f, blockNumber: i, blockTag: a });
      } catch (O) {
        if (!(O instanceof bv) && !(O instanceof Bf)) throw O;
      }
    const k = await e.request({ method: "eth_call", params: N ? [f, N] : [f] });
    return k === "0x" ? { data: void 0 } : { data: k };
  } catch (E) {
    const N = p8(E),
      { offchainLookup: D, offchainLookupSignature: f } = await su(
        () => import("./ccip-7c5585da.js"),
        []
      );
    if ((N == null ? void 0 : N.slice(0, 10)) === f && v)
      return { data: await D(e, { data: N, to: v }) };
    throw f8(E, { ...t, account: C, chain: e.chain });
  }
}
function d8({ request: e }) {
  const { data: t, to: n, ...r } = e;
  return !(
    !t ||
    t.startsWith(c8) ||
    !n ||
    Object.values(r).filter((i) => typeof i < "u").length > 0
  );
}
async function h8(e, t) {
  var _, C;
  const { batchSize: n = 1024, wait: r = 0 } =
      typeof ((_ = e.batch) == null ? void 0 : _.multicall) == "object"
        ? (C = e.batch) == null
          ? void 0
          : C.multicall
        : {},
    {
      blockNumber: i,
      blockTag: a = "latest",
      data: o,
      multicallAddress: s,
      to: l,
    } = t;
  let u = s;
  if (!u) {
    if (!e.chain) throw new bv();
    u = Zi({ blockNumber: i, chain: e.chain, contract: "multicall3" });
  }
  const d = (i ? oe(i) : void 0) || a,
    { schedule: m } = t2({
      id: `${e.uid}.${d}`,
      wait: r,
      shouldSplitBatch(x) {
        return x.reduce((w, { data: E }) => w + (E.length - 2), 0) > n * 2;
      },
      fn: async (x) => {
        const g = x.map((N) => ({
            allowFailure: !0,
            callData: N.data,
            target: N.to,
          })),
          w = wr({ abi: Jf, args: [g], functionName: "aggregate3" }),
          E = await e.request({
            method: "eth_call",
            params: [{ data: w, to: u }, d],
          });
        return ta({
          abi: Jf,
          args: [g],
          functionName: "aggregate3",
          data: E || "0x",
        });
      },
    }),
    [{ returnData: v, success: b }] = await m({ data: o, to: l });
  if (!b) throw new Yh({ data: v });
  return v === "0x" ? { data: void 0 } : { data: v };
}
function p8(e) {
  if (!(e instanceof R)) return;
  const t = e.walk();
  return typeof t.data == "object" ? t.data.data : t.data;
}
async function cr(e, { abi: t, address: n, args: r, functionName: i, ...a }) {
  const o = wr({ abi: t, args: r, functionName: i });
  try {
    const { data: s } = await gu(e, { data: o, to: n, ...a });
    return ta({ abi: t, args: r, functionName: i, data: s || "0x" });
  } catch (s) {
    throw co(s, {
      abi: t,
      address: n,
      args: r,
      docsPath: "/docs/contract/readContract",
      functionName: i,
    });
  }
}
async function m8(
  e,
  { abi: t, address: n, args: r, dataSuffix: i, functionName: a, ...o }
) {
  const s = o.account ? an(o.account) : void 0,
    l = wr({ abi: t, args: r, functionName: a });
  try {
    const { data: u } = await gu(e, {
      batch: !1,
      data: `${l}${i ? i.replace("0x", "") : ""}`,
      to: n,
      ...o,
    });
    return {
      result: ta({ abi: t, args: r, functionName: a, data: u || "0x" }),
      request: { abi: t, address: n, args: r, functionName: a, ...o },
    };
  } catch (u) {
    throw co(u, {
      abi: t,
      address: n,
      args: r,
      docsPath: "/docs/contract/simulateContract",
      functionName: a,
      sender: s == null ? void 0 : s.address,
    });
  }
}
const xc = new Map(),
  gm = new Map();
let g8 = 0;
function na(e, t, n) {
  const r = ++g8,
    i = () => xc.get(e) || [],
    a = () => {
      const c = i();
      xc.set(
        e,
        c.filter((d) => d.id !== r)
      );
    },
    o = () => {
      const c = gm.get(e);
      i().length === 1 && c && c(), a();
    },
    s = i();
  if ((xc.set(e, [...s, { id: r, fns: t }]), s && s.length > 0)) return o;
  const l = {};
  for (const c in t)
    l[c] = (...d) => {
      const m = i();
      m.length !== 0 &&
        m.forEach((v) => {
          var b, _;
          return (_ = (b = v.fns)[c]) == null ? void 0 : _.call(b, ...d);
        });
    };
  const u = n(l);
  return typeof u == "function" && gm.set(e, u), o;
}
async function El(e) {
  return new Promise((t) => setTimeout(t, e));
}
function jo(e, { emitOnBegin: t, initialWaitTime: n, interval: r }) {
  let i = !0;
  const a = () => (i = !1);
  return (
    (async () => {
      let s;
      t && (s = await e({ unpoll: a }));
      const l = (await (n == null ? void 0 : n(s))) ?? r;
      await El(l);
      const u = async () => {
        i && (await e({ unpoll: a }), await El(r), u());
      };
      u();
    })(),
    a
  );
}
const y8 = new Map(),
  v8 = new Map();
function w8(e) {
  const t = (i, a) => ({
      clear: () => a.delete(i),
      get: () => a.get(i),
      set: (o) => a.set(i, o),
    }),
    n = t(e, y8),
    r = t(e, v8);
  return {
    clear: () => {
      n.clear(), r.clear();
    },
    promise: n,
    response: r,
  };
}
async function b8(e, { cacheKey: t, maxAge: n = 1 / 0 }) {
  const r = w8(t),
    i = r.response.get();
  if (i && n > 0 && new Date().getTime() - i.created.getTime() < n)
    return i.data;
  let a = r.promise.get();
  a || ((a = e()), r.promise.set(a));
  try {
    const o = await a;
    return r.response.set({ created: new Date(), data: o }), o;
  } finally {
    r.promise.clear();
  }
}
const x8 = (e) => `blockNumber.${e}`;
async function Io(e, { maxAge: t = e.pollingInterval } = {}) {
  const n = await b8(() => e.request({ method: "eth_blockNumber" }), {
    cacheKey: x8(e.uid),
    maxAge: t,
  });
  return BigInt(n);
}
const ym = "/docs/contract/decodeEventLog";
function t0({ abi: e, data: t, topics: n }) {
  const [r, ...i] = n;
  if (!r) throw new f5({ docsPath: ym });
  const a = e.find((m) => m.type === "event" && r === Uv(Yr(m)));
  if (!(a && "name" in a)) throw new d5(r, { docsPath: ym });
  const { name: o, inputs: s } = a,
    l = s == null ? void 0 : s.some((m) => !("name" in m && m.name));
  let u = l ? [] : {};
  const c = s.filter((m) => "indexed" in m && m.indexed);
  if (i.length > 0)
    for (let m = 0; m < c.length; m++) {
      const v = c[m],
        b = i[m];
      if (!b) throw new g5({ abiItem: a, param: v });
      u[v.name || m] = E8({ param: v, value: b });
    }
  const d = s.filter((m) => !("indexed" in m && m.indexed));
  if (t && t !== "0x")
    try {
      const m = hu(d, t);
      if (m)
        if (l) u = [...u, ...m];
        else for (let v = 0; v < d.length; v++) u[d[v].name] = m[v];
    } catch (m) {
      throw m instanceof zh
        ? new m5({ data: m.data, params: m.params, size: m.size })
        : m;
    }
  return { eventName: o, args: Object.values(u).length > 0 ? u : void 0 };
}
function E8({ param: e, value: t }) {
  return e.type === "string" ||
    e.type === "bytes" ||
    e.type === "tuple" ||
    e.type.match(/^(.*)\[(\d+)?\]$/)
    ? t
    : (hu([e], t) || [])[0];
}
async function yu(e, { filter: t }) {
  return (await t.request({ method: "eth_getFilterChanges", params: [t.id] }))
    .map((r) => {
      if (typeof r == "string") return r;
      try {
        const { eventName: i, args: a } =
          "abi" in t && t.abi
            ? t0({ abi: t.abi, data: r.data, topics: r.topics })
            : { eventName: void 0, args: void 0 };
        return ou(r, { args: a, eventName: i });
      } catch {
        return;
      }
    })
    .filter(Boolean);
}
async function n0(
  e,
  { address: t, blockHash: n, fromBlock: r, toBlock: i, event: a, args: o } = {}
) {
  let s = [];
  a && (s = Gh({ abi: [a], eventName: a.name, args: o }));
  let l;
  return (
    n
      ? (l = await e.request({
          method: "eth_getLogs",
          params: [{ address: t, topics: s, blockHash: n }],
        }))
      : (l = await e.request({
          method: "eth_getLogs",
          params: [
            {
              address: t,
              topics: s,
              fromBlock: typeof r == "bigint" ? oe(r) : r,
              toBlock: typeof i == "bigint" ? oe(i) : i,
            },
          ],
        })),
    l
      .map((u) => {
        try {
          const { eventName: c, args: d } = a
            ? t0({ abi: [a], data: u.data, topics: u.topics })
            : { eventName: void 0, args: void 0 };
          return ou(u, { args: d, eventName: c });
        } catch {
          return;
        }
      })
      .filter(Boolean)
  );
}
async function vu(e, { filter: t }) {
  return t.request({ method: "eth_uninstallFilter", params: [t.id] });
}
function S8(
  e,
  {
    abi: t,
    address: n,
    args: r,
    batch: i = !0,
    eventName: a,
    onError: o,
    onLogs: s,
    pollingInterval: l = e.pollingInterval,
  }
) {
  const u = Ct(["watchContractEvent", n, r, i, e.uid, a, l]);
  return na(u, { onLogs: s, onError: o }, (c) => {
    let d,
      m,
      v = !1;
    const b = jo(
      async () => {
        var _;
        if (!v) {
          try {
            m = await Bv(e, { abi: t, address: n, args: r, eventName: a });
          } catch {}
          v = !0;
          return;
        }
        try {
          let C;
          if (m) C = await yu(e, { filter: m });
          else {
            const x = await Io(e);
            d && d !== x
              ? (C = await n0(e, {
                  address: n,
                  args: r,
                  fromBlock: d + 1n,
                  toBlock: x,
                  event: To({ abi: t, name: a }),
                }))
              : (C = []),
              (d = x);
          }
          if (C.length === 0) return;
          i ? c.onLogs(C) : C.forEach((x) => c.onLogs([x]));
        } catch (C) {
          (_ = c.onError) == null || _.call(c, C);
        }
      },
      { emitOnBegin: !0, interval: l }
    );
    return async () => {
      m && (await vu(e, { filter: m })), b();
    };
  });
}
function C8(e, { docsPath: t, ...n }) {
  let r = e;
  return Zh(e) && (r = Xh(e, n)), new M4(r, { docsPath: t, ...n });
}
async function Sl(e) {
  const t = await e.request({ method: "eth_chainId" });
  return mt(t);
}
async function r0(e, t) {
  var _;
  const {
    account: n = e.account,
    chain: r = e.chain,
    accessList: i,
    data: a,
    gas: o,
    gasPrice: s,
    maxFeePerGas: l,
    maxPriorityFeePerGas: u,
    nonce: c,
    to: d,
    value: m,
    ...v
  } = t;
  if (!n) throw new Oo({ docsPath: "/docs/actions/wallet/sendTransaction" });
  const b = an(n);
  try {
    mu(t);
    let C;
    if (
      (r !== null && ((C = await Sl(e)), R6({ currentChainId: C, chain: r })),
      b.type === "local")
    ) {
      const w = await Jv(e, {
        account: b,
        accessList: i,
        chain: r,
        data: a,
        gas: o,
        gasPrice: s,
        maxFeePerGas: l,
        maxPriorityFeePerGas: u,
        nonce: c,
        to: d,
        value: m,
        ...v,
      });
      C || (C = await Sl(e));
      const E = await b.signTransaction({ chainId: C, ...w });
      return await e.request({ method: "eth_sendRawTransaction", params: [E] });
    }
    const x =
        (_ = r == null ? void 0 : r.formatters) == null
          ? void 0
          : _.transactionRequest,
      g = Xi(
        {
          accessList: i,
          data: a,
          from: b.address,
          gas: o,
          gasPrice: s,
          maxFeePerGas: l,
          maxPriorityFeePerGas: u,
          nonce: c,
          to: d,
          value: m,
          ...Jh(v, { formatter: x }),
        },
        { formatter: x || Rh }
      );
    return await e.request({ method: "eth_sendTransaction", params: [g] });
  } catch (C) {
    throw C8(C, { ...t, account: b, chain: t.chain || void 0 });
  }
}
async function _8(
  e,
  { abi: t, address: n, args: r, dataSuffix: i, functionName: a, ...o }
) {
  const s = wr({ abi: t, args: r, functionName: a });
  return await r0(e, {
    data: `${s}${i ? i.replace("0x", "") : ""}`,
    to: n,
    ...o,
  });
}
async function n2(
  e,
  { address: t, args: n, event: r, fromBlock: i, toBlock: a } = {}
) {
  const o = du(e, { method: "eth_newFilter" });
  let s = [];
  r && (s = Gh({ abi: [r], eventName: r.name, args: n }));
  const l = await e.request({
    method: "eth_newFilter",
    params: [
      {
        address: t,
        fromBlock: typeof i == "bigint" ? oe(i) : i,
        toBlock: typeof a == "bigint" ? oe(a) : a,
        ...(s.length ? { topics: s } : {}),
      },
    ],
  });
  return {
    abi: r ? [r] : void 0,
    args: n,
    eventName: r ? r.name : void 0,
    id: l,
    request: o(l),
    type: "event",
  };
}
const Ec = "/docs/contract/encodeDeployData";
function r2({ abi: e, args: t, bytecode: n }) {
  if (!t || t.length === 0) return n;
  const r = e.find((a) => "type" in a && a.type === "constructor");
  if (!r) throw new o5({ docsPath: Ec });
  if (!("inputs" in r)) throw new lm({ docsPath: Ec });
  if (!r.inputs || r.inputs.length === 0) throw new lm({ docsPath: Ec });
  const i = Ao(r.inputs, t);
  return Hh([n, i]);
}
function k8(e, { abi: t, args: n, bytecode: r, ...i }) {
  const a = r2({ abi: t, args: n, bytecode: r });
  return r0(e, { ...i, data: a });
}
async function N8(e, { address: t, blockNumber: n, blockTag: r = "latest" }) {
  const i = n ? oe(n) : void 0,
    a = await e.request({ method: "eth_getBalance", params: [t, i || r] });
  return BigInt(a);
}
async function D8(
  e,
  { blockHash: t, blockNumber: n, blockTag: r = "latest" } = {}
) {
  const i = n !== void 0 ? oe(n) : void 0;
  let a = null;
  return (
    t
      ? (a = await e.request({
          method: "eth_getBlockTransactionCountByHash",
          params: [t],
        }))
      : (a = await e.request({
          method: "eth_getBlockTransactionCountByNumber",
          params: [i || r],
        })),
    mt(a)
  );
}
async function P8(e, { address: t, blockNumber: n, blockTag: r = "latest" }) {
  const i = n !== void 0 ? oe(n) : void 0,
    a = await e.request({ method: "eth_getCode", params: [t, i || r] });
  if (a !== "0x") return a;
}
function i2(e) {
  let t = new Uint8Array(32).fill(0);
  if (!e) return ml(t);
  const n = e.split(".");
  for (let r = n.length - 1; r >= 0; r -= 1) {
    const i = Pt(qr(n[r]), "bytes");
    t = Pt(Pn([t, i]), "bytes");
  }
  return ml(t);
}
function wu(e) {
  function t(o) {
    return o === "." || o === ".."
      ? 1
      : qr(o.replace(/^\.|\.$/gm, "")).length + 2;
  }
  const n = new Uint8Array(t(e)),
    r = e.replace(/^\.|\.$/gm, "");
  if (!r.length) return n;
  let i = 0;
  const a = r.split(".");
  for (let o = 0; o < a.length; o++) {
    const s = qr(a[o]);
    (n[i] = s.length), n.set(s, i + 1), (i += s.length + 1);
  }
  return n;
}
async function A8(
  e,
  { blockNumber: t, blockTag: n, name: r, universalResolverAddress: i }
) {
  let a = i;
  if (!a) {
    if (!e.chain)
      throw new Error(
        "client chain not configured. universalResolverAddress is required."
      );
    a = Zi({
      blockNumber: t,
      chain: e.chain,
      contract: "ensUniversalResolver",
    });
  }
  const o = await cr(e, {
    address: a,
    abi: e2,
    functionName: "resolve",
    args: [Ln(wu(r)), wr({ abi: mm, functionName: "addr", args: [i2(r)] })],
    blockNumber: t,
    blockTag: n,
  });
  if (o[0] === "0x") return null;
  const s = ta({ abi: mm, functionName: "addr", data: o[0] });
  return Di(s) === "0x00" ? null : s;
}
async function T8(
  e,
  { address: t, blockNumber: n, blockTag: r, universalResolverAddress: i }
) {
  let a = i;
  if (!a) {
    if (!e.chain)
      throw new Error(
        "client chain not configured. universalResolverAddress is required."
      );
    a = Zi({
      blockNumber: n,
      chain: e.chain,
      contract: "ensUniversalResolver",
    });
  }
  const o = `${t.toLowerCase().substring(2)}.addr.reverse`;
  try {
    return (
      await cr(e, {
        address: a,
        abi: [
          {
            name: "reverse",
            type: "function",
            stateMutability: "view",
            inputs: [{ type: "bytes", name: "reverseName" }],
            outputs: [
              { type: "string", name: "resolvedName" },
              { type: "address", name: "resolvedAddress" },
              { type: "address", name: "reverseResolver" },
              { type: "address", name: "resolver" },
            ],
          },
        ],
        functionName: "reverse",
        args: [Ln(wu(o))],
        blockNumber: n,
        blockTag: r,
      })
    )[0];
  } catch (s) {
    if (s instanceof Qv && s.cause.reason === zv[50]) return null;
    throw s;
  }
}
async function O8(
  e,
  { blockNumber: t, blockTag: n, name: r, universalResolverAddress: i }
) {
  let a = i;
  if (!a) {
    if (!e.chain)
      throw new Error(
        "client chain not configured. universalResolverAddress is required."
      );
    a = Zi({
      blockNumber: t,
      chain: e.chain,
      contract: "ensUniversalResolver",
    });
  }
  const [o] = await cr(e, {
    address: a,
    abi: [
      {
        inputs: [{ type: "bytes" }],
        name: "findResolver",
        outputs: [{ type: "address" }, { type: "bytes32" }],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "findResolver",
    args: [Ln(wu(r))],
    blockNumber: t,
    blockTag: n,
  });
  return o;
}
function j8(e) {
  var t;
  return {
    baseFeePerGas: e.baseFeePerGas.map((n) => BigInt(n)),
    gasUsedRatio: e.gasUsedRatio,
    oldestBlock: BigInt(e.oldestBlock),
    reward:
      (t = e.reward) == null ? void 0 : t.map((n) => n.map((r) => BigInt(r))),
  };
}
async function I8(
  e,
  {
    blockCount: t,
    blockNumber: n,
    blockTag: r = "latest",
    rewardPercentiles: i,
  }
) {
  const a = n ? oe(n) : void 0,
    o = await e.request({
      method: "eth_feeHistory",
      params: [oe(t), a || r, i],
    });
  return j8(o);
}
async function L8(e, { filter: t }) {
  return (await t.request({ method: "eth_getFilterLogs", params: [t.id] }))
    .map((r) => {
      try {
        const { eventName: i, args: a } =
          "abi" in t && t.abi
            ? t0({ abi: t.abi, data: r.data, topics: r.topics })
            : { eventName: void 0, args: void 0 };
        return ou(r, { args: a, eventName: i });
      } catch {
        return;
      }
    })
    .filter(Boolean);
}
async function F8(
  e,
  { address: t, blockNumber: n, blockTag: r = "latest", slot: i }
) {
  const a = n !== void 0 ? oe(n) : void 0;
  return await e.request({
    method: "eth_getStorageAt",
    params: [t, i, a || r],
  });
}
async function i0(
  e,
  { blockHash: t, blockNumber: n, blockTag: r = "latest", hash: i, index: a }
) {
  var l, u;
  const o = n !== void 0 ? oe(n) : void 0;
  let s = null;
  if (
    (i
      ? (s = await e.request({
          method: "eth_getTransactionByHash",
          params: [i],
        }))
      : t
      ? (s = await e.request({
          method: "eth_getTransactionByBlockHashAndIndex",
          params: [t, oe(a)],
        }))
      : (o || r) &&
        (s = await e.request({
          method: "eth_getTransactionByBlockNumberAndIndex",
          params: [o || r, oe(a)],
        })),
    !s)
  )
    throw new qv({
      blockHash: t,
      blockNumber: n,
      blockTag: r,
      hash: i,
      index: a,
    });
  return Xi(s, {
    formatter:
      ((u = (l = e.chain) == null ? void 0 : l.formatters) == null
        ? void 0
        : u.transaction) || _v,
  });
}
async function U8(e, { hash: t, transactionReceipt: n }) {
  const [r, i] = await Promise.all([Io(e), t ? i0(e, { hash: t }) : void 0]),
    a =
      (n == null ? void 0 : n.blockNumber) ||
      (i == null ? void 0 : i.blockNumber);
  return a ? r - a + 1n : 0n;
}
async function ed(e, { hash: t }) {
  var r, i;
  const n = await e.request({
    method: "eth_getTransactionReceipt",
    params: [t],
  });
  if (!n) throw new Vv({ hash: t });
  return Xi(n, {
    formatter:
      ((i = (r = e.chain) == null ? void 0 : r.formatters) == null
        ? void 0
        : i.transactionReceipt) || J6,
  });
}
async function M8(e, t) {
  var _;
  const {
      allowFailure: n = !0,
      batchSize: r,
      blockNumber: i,
      blockTag: a,
      contracts: o,
      multicallAddress: s,
    } = t,
    l =
      r ??
      ((typeof ((_ = e.batch) == null ? void 0 : _.multicall) == "object" &&
        e.batch.multicall.batchSize) ||
        1024),
    u = o;
  let c = s;
  if (!c) {
    if (!e.chain)
      throw new Error(
        "client chain not configured. multicallAddress is required."
      );
    c = Zi({ blockNumber: i, chain: e.chain, contract: "multicall3" });
  }
  const d = [[]];
  let m = 0,
    v = 0;
  for (let C = 0; C < u.length; C++) {
    const { abi: x, address: g, args: w, functionName: E } = u[C];
    try {
      const N = wr({ abi: x, args: w, functionName: E });
      (v += N.length),
        l > 0 && v > l && (m++, (v = (N.length - 2) / 2), (d[m] = [])),
        (d[m] = [...d[m], { allowFailure: !0, callData: N, target: g }]);
    } catch (N) {
      const D = co(N, {
        abi: x,
        address: g,
        args: w,
        docsPath: "/docs/contract/multicall",
        functionName: E,
      });
      if (!n) throw D;
      d[m] = [...d[m], { allowFailure: !0, callData: "0x", target: g }];
    }
  }
  return (
    await Promise.all(
      d.map((C) =>
        cr(e, {
          abi: Jf,
          address: c,
          args: [C],
          blockNumber: i,
          blockTag: a,
          functionName: "aggregate3",
        })
      )
    )
  )
    .flat()
    .map(({ returnData: C, success: x }, g) => {
      const w = d.flat(),
        { callData: E } = w[g],
        { abi: N, address: D, functionName: f, args: k } = u[g];
      try {
        if (E === "0x") throw new uu();
        if (!x) throw new Yh({ data: C });
        const O = ta({ abi: N, data: C, functionName: f });
        return n ? { result: O, status: "success" } : O;
      } catch (O) {
        const I = co(O, {
          abi: N,
          address: D,
          args: k,
          docsPath: "/docs/contract/multicall",
          functionName: f,
        });
        if (!n) throw I;
        return { error: I, result: void 0, status: "failure" };
      }
    });
}
function R8(
  e,
  {
    blockTag: t = "latest",
    emitMissed: n = !1,
    emitOnBegin: r = !1,
    onBlock: i,
    onError: a,
    includeTransactions: o = !1,
    poll: s,
    pollingInterval: l = e.pollingInterval,
  }
) {
  const u = typeof s < "u" ? s : e.transport.type !== "webSocket";
  let c;
  return u
    ? (() => {
        const v = Ct(["watchBlocks", e.uid, n, r, o, l]);
        return na(v, { onBlock: i, onError: a }, (b) =>
          jo(
            async () => {
              var _;
              try {
                const C = await po(e, { blockTag: t, includeTransactions: o });
                if (C.number && c != null && c.number) {
                  if (C.number === c.number) return;
                  if (C.number - c.number > 1 && n)
                    for (
                      let x = (c == null ? void 0 : c.number) + 1n;
                      x < C.number;
                      x++
                    ) {
                      const g = await po(e, {
                        blockNumber: x,
                        includeTransactions: o,
                      });
                      b.onBlock(g, c), (c = g);
                    }
                }
                (!(c != null && c.number) ||
                  (t === "pending" && !(C != null && C.number)) ||
                  (C.number && C.number > c.number)) &&
                  (b.onBlock(C, c), (c = C));
              } catch (C) {
                (_ = b.onError) == null || _.call(b, C);
              }
            },
            { emitOnBegin: r, interval: l }
          )
        );
      })()
    : (() => {
        let v = !0,
          b = () => (v = !1);
        return (
          (async () => {
            try {
              const { unsubscribe: _ } = await e.transport.subscribe({
                params: ["newHeads"],
                onData(C) {
                  if (!v) return;
                  const x = C.result;
                  i(x, c), (c = x);
                },
                onError(C) {
                  a == null || a(C);
                },
              });
              (b = _), v || b();
            } catch (_) {
              a == null || a(_);
            }
          })(),
          b
        );
      })();
}
function a2(
  e,
  {
    emitOnBegin: t = !1,
    emitMissed: n = !1,
    onBlockNumber: r,
    onError: i,
    poll: a,
    pollingInterval: o = e.pollingInterval,
  }
) {
  const s = typeof a < "u" ? a : e.transport.type !== "webSocket";
  let l;
  return s
    ? (() => {
        const d = Ct(["watchBlockNumber", e.uid, t, n, o]);
        return na(d, { onBlockNumber: r, onError: i }, (m) =>
          jo(
            async () => {
              var v;
              try {
                const b = await Io(e, { maxAge: 0 });
                if (l) {
                  if (b === l) return;
                  if (b - l > 1 && n)
                    for (let _ = l + 1n; _ < b; _++)
                      m.onBlockNumber(_, l), (l = _);
                }
                (!l || b > l) && (m.onBlockNumber(b, l), (l = b));
              } catch (b) {
                (v = m.onError) == null || v.call(m, b);
              }
            },
            { emitOnBegin: t, interval: o }
          )
        );
      })()
    : (() => {
        let d = !0,
          m = () => (d = !1);
        return (
          (async () => {
            try {
              const { unsubscribe: v } = await e.transport.subscribe({
                params: ["newHeads"],
                onData(b) {
                  var C;
                  if (!d) return;
                  const _ = Mh((C = b.result) == null ? void 0 : C.number);
                  r(_, l), (l = _);
                },
                onError(b) {
                  i == null || i(b);
                },
              });
              (m = v), d || m();
            } catch (v) {
              i == null || i(v);
            }
          })(),
          m
        );
      })();
}
function B8(
  e,
  {
    address: t,
    args: n,
    batch: r = !0,
    event: i,
    onError: a,
    onLogs: o,
    pollingInterval: s = e.pollingInterval,
  }
) {
  const l = Ct(["watchEvent", t, n, r, e.uid, i, s]);
  return na(l, { onLogs: o, onError: a }, (u) => {
    let c,
      d,
      m = !1;
    const v = jo(
      async () => {
        var b;
        if (!m) {
          try {
            d = await n2(e, { address: t, args: n, event: i });
          } catch {}
          m = !0;
          return;
        }
        try {
          let _;
          if (d) _ = await yu(e, { filter: d });
          else {
            const C = await Io(e);
            c && c !== C
              ? (_ = await n0(e, {
                  address: t,
                  args: n,
                  fromBlock: c + 1n,
                  toBlock: C,
                  event: i,
                }))
              : (_ = []),
              (c = C);
          }
          if (_.length === 0) return;
          r ? u.onLogs(_) : _.forEach((C) => u.onLogs([C]));
        } catch (_) {
          (b = u.onError) == null || b.call(u, _);
        }
      },
      { emitOnBegin: !0, interval: s }
    );
    return async () => {
      d && (await vu(e, { filter: d })), v();
    };
  });
}
async function o2(e) {
  const t = du(e, { method: "eth_newPendingTransactionFilter" }),
    n = await e.request({ method: "eth_newPendingTransactionFilter" });
  return { id: n, request: t(n), type: "transaction" };
}
function $8(
  e,
  {
    batch: t = !0,
    onError: n,
    onTransactions: r,
    poll: i,
    pollingInterval: a = e.pollingInterval,
  }
) {
  return (typeof i < "u" ? i : e.transport.type !== "webSocket")
    ? (() => {
        const u = Ct(["watchPendingTransactions", e.uid, t, a]);
        return na(u, { onTransactions: r, onError: n }, (c) => {
          let d;
          const m = jo(
            async () => {
              var v;
              try {
                if (!d)
                  try {
                    d = await o2(e);
                    return;
                  } catch (_) {
                    throw (m(), _);
                  }
                const b = await yu(e, { filter: d });
                if (b.length === 0) return;
                t
                  ? c.onTransactions(b)
                  : b.forEach((_) => c.onTransactions([_]));
              } catch (b) {
                (v = c.onError) == null || v.call(c, b);
              }
            },
            { emitOnBegin: !0, interval: a }
          );
          return async () => {
            d && (await vu(e, { filter: d })), m();
          };
        });
      })()
    : (() => {
        let u = !0,
          c = () => (u = !1);
        return (
          (async () => {
            try {
              const { unsubscribe: d } = await e.transport.subscribe({
                params: ["newPendingTransactions"],
                onData(m) {
                  if (!u) return;
                  const v = m.result;
                  r([v]);
                },
                onError(m) {
                  n == null || n(m);
                },
              });
              (c = d), u || c();
            } catch (d) {
              n == null || n(d);
            }
          })(),
          c
        );
      })();
}
function s2(
  e,
  { delay: t = 100, retryCount: n = 2, shouldRetry: r = () => !0 } = {}
) {
  return new Promise((i, a) => {
    const o = async ({ count: s = 0 } = {}) => {
      const l = async ({ error: u }) => {
        const c = typeof t == "function" ? t({ count: s, error: u }) : t;
        c && (await El(c)), o({ count: s + 1 });
      };
      try {
        const u = await e();
        i(u);
      } catch (u) {
        if (s < n && (await r({ count: s, error: u }))) return l({ error: u });
        a(u);
      }
    };
    o();
  });
}
async function z8(
  e,
  {
    confirmations: t = 1,
    hash: n,
    onReplaced: r,
    pollingInterval: i = e.pollingInterval,
    timeout: a,
  }
) {
  const o = Ct(["waitForTransactionReceipt", e.uid, n]);
  let s,
    l,
    u,
    c = !1;
  return new Promise((d, m) => {
    a && setTimeout(() => m(new R4({ hash: n })), a);
    const v = na(o, { onReplaced: r, resolve: d, reject: m }, (b) => {
      const _ = a2(e, {
        emitMissed: !0,
        emitOnBegin: !0,
        poll: !0,
        pollingInterval: i,
        async onBlockNumber(C) {
          if (c) return;
          let x = C;
          const g = async (w) => {
            _(), w(), v();
          };
          try {
            if (u) {
              if (x - u.blockNumber + 1n < t) return;
              g(() => b.resolve(u));
              return;
            }
            if (
              (s ||
                ((c = !0),
                await s2(
                  async () => {
                    (s = await i0(e, { hash: n })),
                      s.blockNumber && (x = s.blockNumber);
                  },
                  { delay: ({ count: w }) => ~~(1 << w) * 200, retryCount: 6 }
                ),
                (c = !1)),
              (u = await ed(e, { hash: n })),
              t > 0 && x - u.blockNumber + 1n < t)
            )
              return;
            g(() => b.resolve(u));
          } catch (w) {
            if (s && (w instanceof qv || w instanceof Vv)) {
              l = s;
              const N = (
                await po(e, { blockNumber: x, includeTransactions: !0 })
              ).transactions.find(
                ({ from: f, nonce: k }) => f === l.from && k === l.nonce
              );
              if (
                !N ||
                ((u = await ed(e, { hash: N.hash })),
                x - u.blockNumber + 1n < t)
              )
                return;
              let D = "replaced";
              N.to === l.to && N.value === l.value
                ? (D = "repriced")
                : N.from === N.to && N.value === 0n && (D = "cancelled"),
                g(() => {
                  var f;
                  (f = b.onReplaced) == null ||
                    f.call(b, {
                      reason: D,
                      replacedTransaction: l,
                      transaction: N,
                      transactionReceipt: u,
                    }),
                    b.resolve(u);
                });
            } else g(() => b.reject(w));
          }
        },
      });
      return _;
    });
  });
}
async function W8(e, t) {
  return e.request({ method: "wallet_requestPermissions", params: [t] });
}
async function H8(e, { account: t = e.account, message: n }) {
  if (!t) throw new Oo({ docsPath: "/docs/actions/wallet/signMessage" });
  const r = an(t);
  if (r.type === "local") return r.signMessage({ message: n });
  const i = (() =>
    typeof n == "string"
      ? Fh(n)
      : n.raw instanceof Uint8Array
      ? Ln(n.raw)
      : n.raw)();
  return e.request({ method: "personal_sign", params: [i, r.address] });
}
const q8 = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/,
  V8 =
    /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
function l2({ domain: e, message: t, primaryType: n, types: r }) {
  const i = r,
    a = (o, s) => {
      for (const l of o) {
        const { name: u, type: c } = l,
          d = c,
          m = s[u],
          v = d.match(V8);
        if (v && (typeof m == "number" || typeof m == "bigint")) {
          const [C, x, g] = v;
          oe(m, { signed: x === "int", size: parseInt(g) / 8 });
        }
        if (d === "address" && typeof m == "string" && !zi(m))
          throw new uo({ address: m });
        const b = d.match(q8);
        if (b) {
          const [C, x] = b;
          if (x && ze(m) !== parseInt(x))
            throw new p5({ expectedSize: parseInt(x), givenSize: ze(m) });
        }
        const _ = i[d];
        _ && a(_, m);
      }
    };
  if ((i.EIP712Domain && e && a(i.EIP712Domain, e), n !== "EIP712Domain")) {
    const o = i[n];
    a(o, t);
  }
}
async function G8(
  e,
  { account: t = e.account, domain: n, message: r, primaryType: i, types: a }
) {
  if (!t) throw new Oo({ docsPath: "/docs/actions/wallet/signTypedData" });
  const o = an(t),
    s = {
      EIP712Domain: [
        (n == null ? void 0 : n.name) && { name: "name", type: "string" },
        (n == null ? void 0 : n.version) && { name: "version", type: "string" },
        (n == null ? void 0 : n.chainId) && {
          name: "chainId",
          type: "uint256",
        },
        (n == null ? void 0 : n.verifyingContract) && {
          name: "verifyingContract",
          type: "address",
        },
        (n == null ? void 0 : n.salt) && { name: "salt", type: "bytes32" },
      ].filter(Boolean),
      ...a,
    };
  if (
    (l2({ domain: n, message: r, primaryType: i, types: s }),
    o.type === "local")
  )
    return o.signTypedData({ domain: n, primaryType: i, types: s, message: r });
  const l = Ct(
    { domain: n ?? {}, primaryType: i, types: s, message: r },
    (u, c) => (ur(c) ? c.toLowerCase() : c)
  );
  return e.request({ method: "eth_signTypedData_v4", params: [o.address, l] });
}
async function Q8(e, t) {
  return await e.request({ method: "wallet_watchAsset", params: t });
}
const td = 256;
let fs = td,
  ds;
function K8(e = 11) {
  if (!ds || fs + e > td * 2) {
    (ds = ""), (fs = 0);
    for (let t = 0; t < td; t++)
      ds += ((256 + Math.random() * 256) | 0).toString(16).substring(1);
  }
  return ds.substring(fs, fs++ + e);
}
function u2({
  chain: e,
  key: t = "base",
  name: n = "Base Client",
  pollingInterval: r = 4e3,
  transport: i,
  type: a = "base",
}) {
  const {
    config: o,
    request: s,
    value: l,
  } = i({ chain: e, pollingInterval: r });
  return {
    chain: e,
    key: t,
    name: n,
    pollingInterval: r,
    request: s,
    transport: { ...o, ...l },
    type: a,
    uid: K8(),
  };
}
const c2 = (e) =>
  "code" in e
    ? e.code !== -1 &&
      e.code !== -32004 &&
      e.code !== -32005 &&
      e.code !== -32042 &&
      e.code !== -32603
    : e instanceof Ra && e.status
    ? e.status !== 403 &&
      e.status !== 408 &&
      e.status !== 413 &&
      e.status !== 429 &&
      e.status !== 500 &&
      e.status !== 502 &&
      e.status !== 503 &&
      e.status !== 504
    : !1;
function Y8(e, { retryDelay: t = 150, retryCount: n = 3 } = {}) {
  return async (r) =>
    s2(
      async () => {
        try {
          return await e(r);
        } catch (i) {
          const a = i;
          throw a.code === -32700
            ? new G4(a)
            : a.code === -32600
            ? new Q4(a)
            : a.code === -32601
            ? new K4(a)
            : a.code === -32602
            ? new Y4(a)
            : a.code === -32603
            ? new Z4(a)
            : a.code === -32e3
            ? new Kv(a)
            : a.code === -32001
            ? new X4(a)
            : a.code === -32002
            ? new xl(a)
            : a.code === -32003
            ? new Yv(a)
            : a.code === -32004
            ? new hm(a)
            : a.code === -32005
            ? new J4(a)
            : a.code === -32006
            ? new e8(a)
            : a.code === -32042
            ? new hm(a)
            : a.code === 4001
            ? new Yt(a)
            : a.code === 4100
            ? new t8(a)
            : a.code === 4200
            ? new n8(a)
            : a.code === 4900
            ? new r8(a)
            : a.code === 4901
            ? new i8(a)
            : a.code === 4902
            ? new ho(a)
            : i instanceof R
            ? i
            : new a8(a);
        }
      },
      {
        delay: ({ count: i, error: a }) => {
          var o;
          if (a && a instanceof Ra) {
            const s =
              (o = a == null ? void 0 : a.headers) == null
                ? void 0
                : o.get("Retry-After");
            if (s != null && s.match(/\d/)) return parseInt(s) * 1e3;
          }
          return ~~(1 << i) * t;
        },
        retryCount: n,
        shouldRetry: ({ error: i }) => !c2(i),
      }
    );
}
function bu(
  {
    key: e,
    name: t,
    request: n,
    retryCount: r = 3,
    retryDelay: i = 150,
    timeout: a,
    type: o,
  },
  s
) {
  return {
    config: {
      key: e,
      name: t,
      request: n,
      retryCount: r,
      retryDelay: i,
      timeout: a,
      type: o,
    },
    request: Y8(n, { retryCount: r, retryDelay: i }),
    value: s,
  };
}
function a0(e, t = {}) {
  const { key: n = "custom", name: r = "Custom Provider", retryDelay: i } = t;
  return ({ retryCount: a }) =>
    bu({
      key: n,
      name: r,
      request: e.request.bind(e),
      retryCount: t.retryCount ?? a,
      retryDelay: i,
      type: "custom",
    });
}
function vm(e, t = {}) {
  const {
    key: n = "fallback",
    name: r = "Fallback",
    rank: i = !1,
    retryCount: a,
    retryDelay: o,
  } = t;
  return ({ chain: s, pollingInterval: l = 4e3, timeout: u }) => {
    let c = e,
      d = () => {};
    const m = bu(
      {
        key: n,
        name: r,
        async request({ method: v, params: b }) {
          const _ = async (C = 0) => {
            const x = c[C]({ chain: s, retryCount: 0, timeout: u });
            try {
              const g = await x.request({ method: v, params: b });
              return (
                d({
                  method: v,
                  params: b,
                  response: g,
                  transport: x,
                  status: "success",
                }),
                g
              );
            } catch (g) {
              if (
                (d({
                  error: g,
                  method: v,
                  params: b,
                  transport: x,
                  status: "error",
                }),
                c2(g) || C === c.length - 1)
              )
                throw g;
              return _(C + 1);
            }
          };
          return _();
        },
        retryCount: a,
        retryDelay: o,
        type: "fallback",
      },
      {
        onResponse: (v) => (d = v),
        transports: c.map((v) => v({ chain: s, retryCount: 0 })),
      }
    );
    if (i) {
      const v = typeof i == "object" ? i : {};
      Z8({
        chain: s,
        interval: v.interval ?? l,
        onTransports: (b) => (c = b),
        sampleCount: v.sampleCount,
        timeout: v.timeout,
        transports: c,
        weights: v.weights,
      });
    }
    return m;
  };
}
function Z8({
  chain: e,
  interval: t = 4e3,
  onTransports: n,
  sampleCount: r = 10,
  timeout: i = 1e3,
  transports: a,
  weights: o = {},
}) {
  const { stability: s = 0.7, latency: l = 0.3 } = o,
    u = [],
    c = async () => {
      const d = await Promise.all(
        a.map(async (b) => {
          const _ = b({ chain: e, retryCount: 0, timeout: i }),
            C = Date.now();
          let x, g;
          try {
            await _.request({ method: "net_listening" }), (g = 1);
          } catch {
            g = 0;
          } finally {
            x = Date.now();
          }
          return { latency: x - C, success: g };
        })
      );
      u.push(d), u.length > r && u.shift();
      const m = Math.max(
          ...u.map((b) => Math.max(...b.map(({ latency: _ }) => _)))
        ),
        v = a
          .map((b, _) => {
            const C = u.map((N) => N[_].latency),
              g = 1 - C.reduce((N, D) => N + D, 0) / C.length / m,
              w = u.map((N) => N[_].success),
              E = w.reduce((N, D) => N + D, 0) / w.length;
            return E === 0 ? [0, _] : [l * g + s * E, _];
          })
          .sort((b, _) => _[0] - b[0]);
      n(v.map(([, b]) => a[b])), await El(t), c();
    };
  c();
}
class f2 extends R {
  constructor() {
    super(
      "No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.",
      { docsPath: "/docs/clients/intro" }
    );
  }
}
function d2(e, { errorInstance: t, timeout: n, signal: r }) {
  return new Promise((i, a) => {
    (async () => {
      let o;
      try {
        const s = new AbortController();
        n > 0 &&
          (o = setTimeout(() => {
            r ? s.abort() : a(t);
          }, n)),
          i(await e({ signal: s == null ? void 0 : s.signal }));
      } catch (s) {
        s.name === "AbortError" && a(t), a(s);
      } finally {
        clearTimeout(o);
      }
    })();
  });
}
let h2 = 0;
async function X8(e, { body: t, fetchOptions: n = {}, timeout: r = 1e4 }) {
  var s;
  const { headers: i, method: a, signal: o } = n;
  try {
    const l = await d2(
      async ({ signal: c }) =>
        await fetch(e, {
          ...n,
          body: Ct({ jsonrpc: "2.0", id: h2++, ...t }),
          headers: { ...i, "Content-Type": "application/json" },
          method: a || "POST",
          signal: o || (r > 0 ? c : void 0),
        }),
      { errorInstance: new Xf({ body: t, url: e }), timeout: r, signal: !0 }
    );
    let u;
    if (
      ((s = l.headers.get("Content-Type")) != null &&
      s.startsWith("application/json")
        ? (u = await l.json())
        : (u = await l.text()),
      !l.ok)
    )
      throw new Ra({
        body: t,
        details: Ct(u.error) || l.statusText,
        headers: l.headers,
        status: l.status,
        url: e,
      });
    if (u.error) throw new fo({ body: t, error: u.error, url: e });
    return u;
  } catch (l) {
    throw l instanceof Ra || l instanceof fo || l instanceof Xf
      ? l
      : new Ra({ body: t, details: l.message, url: e });
  }
}
const Sc = new Map();
async function Cc(e) {
  const t = new URL(e),
    n = t.toString();
  let r = Sc.get(n);
  if (r) return r;
  const { schedule: i } = t2({
      id: n,
      fn: async () => {
        var v;
        let s = await su(() => import("./browser-6fd07e20.js"), []);
        (v = s.default) != null && v.constructor
          ? (s = s.default)
          : (s = s.WebSocket);
        const l = new s(t),
          u = new Map(),
          c = new Map(),
          d = ({ data: b }) => {
            const _ = JSON.parse(b),
              C = _.method === "eth_subscription",
              x = C ? _.params.subscription : _.id,
              g = C ? c : u,
              w = g.get(x);
            w && w({ data: b }), C || g.delete(x);
          },
          m = () => {
            Sc.delete(n),
              l.removeEventListener("close", m),
              l.removeEventListener("message", d);
          };
        return (
          l.addEventListener("close", m),
          l.addEventListener("message", d),
          l.readyState === s.CONNECTING &&
            (await new Promise((b, _) => {
              l && ((l.onopen = b), (l.onerror = _));
            })),
          (r = Object.assign(l, { requests: u, subscriptions: c })),
          Sc.set(n, r),
          [r]
        );
      },
    }),
    [a, [o]] = await i();
  return o;
}
function J8(e, { body: t, onData: n, onError: r }) {
  if (e.readyState === e.CLOSED || e.readyState === e.CLOSING)
    throw new q4({ body: t, url: e.url, details: "Socket is closed." });
  const i = h2++,
    a = ({ data: o }) => {
      var l;
      const s = JSON.parse(o);
      (typeof s.id == "number" && i !== s.id) ||
        (s.error
          ? r == null || r(new fo({ body: t, error: s.error, url: e.url }))
          : n == null || n(s),
        t.method === "eth_subscribe" &&
          typeof s.result == "string" &&
          e.subscriptions.set(s.result, a),
        t.method === "eth_unsubscribe" &&
          e.subscriptions.delete((l = t.params) == null ? void 0 : l[0]));
    };
  return (
    e.requests.set(i, a),
    e.send(JSON.stringify({ jsonrpc: "2.0", ...t, id: i })),
    e
  );
}
async function eE(e, { body: t, timeout: n = 1e4 }) {
  return d2(
    () =>
      new Promise((r, i) =>
        Ba.webSocket(e, { body: t, onData: r, onError: i })
      ),
    { errorInstance: new Xf({ body: t, url: e.url }), timeout: n }
  );
}
const Ba = { http: X8, webSocket: J8, webSocketAsync: eE };
function tE(e, t = {}) {
  const {
    fetchOptions: n,
    key: r = "http",
    name: i = "HTTP JSON-RPC",
    retryDelay: a,
  } = t;
  return ({ chain: o, retryCount: s, timeout: l }) => {
    const u = t.retryCount ?? s,
      c = l ?? t.timeout ?? 1e4,
      d = e || (o == null ? void 0 : o.rpcUrls.default.http[0]);
    if (!d) throw new f2();
    return bu(
      {
        key: r,
        name: i,
        async request({ method: m, params: v }) {
          const { result: b } = await Ba.http(d, {
            body: { method: m, params: v },
            fetchOptions: n,
            timeout: c,
          });
          return b;
        },
        retryCount: u,
        retryDelay: a,
        timeout: c,
        type: "http",
      },
      { url: e }
    );
  };
}
class nE extends R {
  constructor({ data: t }) {
    super(
      "Unable to extract image from metadata. The metadata may be malformed or invalid.",
      {
        metaMessages: [
          "- Metadata must be a JSON object with at least an `image`, `image_url` or `image_data` property.",
          "",
          `Provided data: ${JSON.stringify(t)}`,
        ],
      }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "EnsAvatarInvalidMetadataError",
      });
  }
}
class va extends R {
  constructor({ reason: t }) {
    super(`ENS NFT avatar URI is invalid. ${t}`),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "EnsAvatarInvalidNftUriError",
      });
  }
}
class o0 extends R {
  constructor({ uri: t }) {
    super(
      `Unable to resolve ENS avatar URI "${t}". The URI may be malformed, invalid, or does not respond with a valid image.`
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "EnsAvatarUriResolutionError",
      });
  }
}
class rE extends R {
  constructor({ namespace: t }) {
    super(
      `ENS NFT avatar namespace "${t}" is not supported. Must be "erc721" or "erc1155".`
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "EnsAvatarUnsupportedNamespaceError",
      });
  }
}
const iE =
    /(?<protocol>https?:\/\/[^\/]*|ipfs:\/|ipns:\/|ar:\/)?(?<root>\/)?(?<subpath>ipfs\/|ipns\/)?(?<target>[\w\-.]+)(?<subtarget>\/.*)?/,
  aE =
    /^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})(\/(?<target>[\w\-.]+))?(?<subtarget>\/.*)?$/,
  oE = /^data:([a-zA-Z\-/+]*);base64,([^"].*)/,
  sE = /^data:([a-zA-Z\-/+]*)?(;[a-zA-Z0-9].*?)?(,)/;
async function lE(e) {
  try {
    const t = await fetch(e, { method: "HEAD" });
    if (t.status === 200) {
      const n = t.headers.get("content-type");
      return n == null ? void 0 : n.startsWith("image/");
    }
    return !1;
  } catch (t) {
    return (typeof t == "object" && typeof t.response < "u") ||
      !globalThis.hasOwnProperty("Image")
      ? !1
      : new Promise((n) => {
          const r = new Image();
          (r.onload = () => {
            n(!0);
          }),
            (r.onerror = () => {
              n(!1);
            }),
            (r.src = e);
        });
  }
}
function wm(e, t) {
  return e ? (e.endsWith("/") ? e.slice(0, -1) : e) : t;
}
function p2({ uri: e, gatewayUrls: t }) {
  const n = oE.test(e);
  if (n) return { uri: e, isOnChain: !0, isEncoded: n };
  const r = wm(t == null ? void 0 : t.ipfs, "https://ipfs.io"),
    i = wm(t == null ? void 0 : t.arweave, "https://arweave.net"),
    a = e.match(iE),
    {
      protocol: o,
      subpath: s,
      target: l,
      subtarget: u = "",
    } = (a == null ? void 0 : a.groups) || {},
    c = o === "ipns:/" || s === "ipns/",
    d = o === "ipfs:/" || s === "ipfs/" || aE.test(e);
  if (e.startsWith("http") && !c && !d) {
    let v = e;
    return (
      t != null &&
        t.arweave &&
        (v = e.replace(
          /https:\/\/arweave.net/g,
          t == null ? void 0 : t.arweave
        )),
      { uri: v, isOnChain: !1, isEncoded: !1 }
    );
  }
  if ((c || d) && l)
    return {
      uri: `${r}/${c ? "ipns" : "ipfs"}/${l}${u}`,
      isOnChain: !1,
      isEncoded: !1,
    };
  if (o === "ar:/" && l)
    return { uri: `${i}/${l}${u || ""}`, isOnChain: !1, isEncoded: !1 };
  let m = e.replace(sE, "");
  if (
    (m.startsWith("<svg") && (m = `data:image/svg+xml;base64,${btoa(m)}`),
    m.startsWith("data:") || m.startsWith("{"))
  )
    return { uri: m, isOnChain: !0, isEncoded: !1 };
  throw new o0({ uri: e });
}
function m2(e) {
  if (
    typeof e != "object" ||
    (!("image" in e) && !("image_url" in e) && !("image_data" in e))
  )
    throw new nE({ data: e });
  return e.image || e.image_url || e.image_data;
}
async function uE({ gatewayUrls: e, uri: t }) {
  try {
    const n = await fetch(t).then((i) => i.json());
    return await s0({ gatewayUrls: e, uri: m2(n) });
  } catch {
    throw new o0({ uri: t });
  }
}
async function s0({ gatewayUrls: e, uri: t }) {
  const { uri: n, isOnChain: r } = p2({ uri: t, gatewayUrls: e });
  if (r || (await lE(n))) return n;
  throw new o0({ uri: t });
}
function cE(e) {
  e.startsWith("did:nft:") &&
    (e = e.replace("did:nft:", "").replace(/_/g, "/"));
  const [t, n, r] = e.split("/"),
    [i, a] = t.split(":"),
    [o, s] = n.split(":");
  if (!i || i.toLowerCase() !== "eip155")
    throw new va({ reason: "Only EIP-155 supported" });
  if (!a) throw new va({ reason: "Chain ID not found" });
  if (!s) throw new va({ reason: "Contract address not found" });
  if (!r) throw new va({ reason: "Token ID not found" });
  if (!o) throw new va({ reason: "ERC namespace not found" });
  return {
    chainID: parseInt(a),
    namespace: o.toLowerCase(),
    contractAddress: s,
    tokenID: r,
  };
}
async function fE(e, { nft: t }) {
  if (t.namespace === "erc721")
    return cr(e, {
      address: t.contractAddress,
      abi: [
        {
          name: "tokenURI",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "tokenId", type: "uint256" }],
          outputs: [{ name: "", type: "string" }],
        },
      ],
      functionName: "tokenURI",
      args: [BigInt(t.tokenID)],
    });
  if (t.namespace === "erc1155")
    return cr(e, {
      address: t.contractAddress,
      abi: [
        {
          name: "uri",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "_id", type: "uint256" }],
          outputs: [{ name: "", type: "string" }],
        },
      ],
      functionName: "uri",
      args: [BigInt(t.tokenID)],
    });
  throw new rE({ namespace: t.namespace });
}
async function dE(e, { gatewayUrls: t, record: n }) {
  return /eip155:/i.test(n)
    ? hE(e, { gatewayUrls: t, record: n })
    : s0({ uri: n, gatewayUrls: t });
}
async function hE(e, { gatewayUrls: t, record: n }) {
  const r = cE(n),
    i = await fE(e, { nft: r }),
    { uri: a, isOnChain: o, isEncoded: s } = p2({ uri: i, gatewayUrls: t });
  if (o && (a.includes("data:application/json;base64,") || a.startsWith("{"))) {
    const u = s ? atob(a.replace("data:application/json;base64,", "")) : a,
      c = JSON.parse(u);
    return s0({ uri: m2(c), gatewayUrls: t });
  }
  let l = r.tokenID;
  return (
    r.namespace === "erc1155" && (l = l.replace("0x", "").padStart(64, "0")),
    uE({ gatewayUrls: t, uri: a.replace(/(?:0x)?{id}/, l) })
  );
}
async function g2(
  e,
  { blockNumber: t, blockTag: n, name: r, key: i, universalResolverAddress: a }
) {
  let o = a;
  if (!o) {
    if (!e.chain)
      throw new Error(
        "client chain not configured. universalResolverAddress is required."
      );
    o = Zi({
      blockNumber: t,
      chain: e.chain,
      contract: "ensUniversalResolver",
    });
  }
  const s = await cr(e, {
    address: o,
    abi: e2,
    functionName: "resolve",
    args: [Ln(wu(r)), wr({ abi: pm, functionName: "text", args: [i2(r), i] })],
    blockNumber: t,
    blockTag: n,
  });
  if (s[0] === "0x") return null;
  const l = ta({ abi: pm, functionName: "text", data: s[0] });
  return l === "" ? null : l;
}
async function pE(
  e,
  {
    blockNumber: t,
    blockTag: n,
    gatewayUrls: r,
    name: i,
    universalResolverAddress: a,
  }
) {
  const o = await g2(e, {
    blockNumber: t,
    blockTag: n,
    key: "avatar",
    name: i,
    universalResolverAddress: a,
  });
  if (!o) return null;
  try {
    return await dE(e, { record: o, gatewayUrls: r });
  } catch {
    return null;
  }
}
async function mE(e) {
  const t = du(e, { method: "eth_newBlockFilter" }),
    n = await e.request({ method: "eth_newBlockFilter" });
  return { id: n, request: t(n), type: "block" };
}
function gE({ domain: e, message: t, primaryType: n, types: r }) {
  const i = typeof e > "u" ? {} : e,
    a = {
      EIP712Domain: [
        (i == null ? void 0 : i.name) && { name: "name", type: "string" },
        (i == null ? void 0 : i.version) && { name: "version", type: "string" },
        (i == null ? void 0 : i.chainId) && {
          name: "chainId",
          type: "uint256",
        },
        (i == null ? void 0 : i.verifyingContract) && {
          name: "verifyingContract",
          type: "address",
        },
        (i == null ? void 0 : i.salt) && { name: "salt", type: "bytes32" },
      ].filter(Boolean),
      ...r,
    };
  l2({ domain: i, message: t, primaryType: n, types: a });
  const o = ["0x1901"];
  return (
    i && o.push(yE({ domain: i, types: a })),
    n !== "EIP712Domain" && o.push(y2({ data: t, primaryType: n, types: a })),
    Pt(Pn(o))
  );
}
function yE({ domain: e, types: t }) {
  return y2({ data: e, primaryType: "EIP712Domain", types: t });
}
function y2({ data: e, primaryType: t, types: n }) {
  const r = v2({ data: e, primaryType: t, types: n });
  return Pt(r);
}
function v2({ data: e, primaryType: t, types: n }) {
  const r = [{ type: "bytes32" }],
    i = [vE({ primaryType: t, types: n })];
  for (const a of n[t]) {
    const [o, s] = b2({
      types: n,
      name: a.name,
      type: a.type,
      value: e[a.name],
    });
    r.push(o), i.push(s);
  }
  return Ao(r, i);
}
function vE({ primaryType: e, types: t }) {
  const n = Ln(wE({ primaryType: e, types: t }));
  return Pt(n);
}
function wE({ primaryType: e, types: t }) {
  let n = "";
  const r = w2({ primaryType: e, types: t });
  r.delete(e);
  const i = [e, ...Array.from(r).sort()];
  for (const a of i)
    n += `${a}(${t[a].map(({ name: o, type: s }) => `${s} ${o}`).join(",")})`;
  return n;
}
function w2({ primaryType: e, types: t }, n = new Set()) {
  const r = e.match(/^\w*/u),
    i = r == null ? void 0 : r[0];
  if (n.has(i) || t[i] === void 0) return n;
  n.add(i);
  for (const a of t[i]) w2({ primaryType: a.type, types: t }, n);
  return n;
}
function b2({ types: e, name: t, type: n, value: r }) {
  if (e[n] !== void 0)
    return [{ type: "bytes32" }, Pt(v2({ data: r, primaryType: n, types: e }))];
  if (n === "bytes")
    return (
      (r = `0x${(r.length % 2 ? "0" : "") + r.slice(2)}`),
      [{ type: "bytes32" }, Pt(r)]
    );
  if (n === "string") return [{ type: "bytes32" }, Pt(Ln(r))];
  if (n.lastIndexOf("]") === n.length - 1) {
    const i = n.slice(0, n.lastIndexOf("[")),
      a = r.map((o) => b2({ name: t, type: i, types: e, value: o }));
    return [
      { type: "bytes32" },
      Pt(
        Ao(
          a.map(([o]) => o),
          a.map(([, o]) => o)
        )
      ),
    ];
  }
  return [{ type: n }, r];
}
function bE(e, t) {
  const n = (() =>
      typeof e == "string"
        ? qr(e)
        : e.raw instanceof Uint8Array
        ? e.raw
        : Bi(e.raw))(),
    r = qr(`Ethereum Signed Message:
${n.length}`);
  return Pt(Pn([r, n]), t);
}
const xE =
  "0x60806040523480156200001157600080fd5b50604051620007003803806200070083398101604081905262000034916200056f565b6000620000438484846200004f565b9050806000526001601ff35b600080846001600160a01b0316803b806020016040519081016040528181526000908060200190933c90507f6492649264926492649264926492649264926492649264926492649264926492620000a68462000451565b036200021f57600060608085806020019051810190620000c79190620005ce565b8651929550909350915060000362000192576000836001600160a01b031683604051620000f5919062000643565b6000604051808303816000865af19150503d806000811462000134576040519150601f19603f3d011682016040523d82523d6000602084013e62000139565b606091505b5050905080620001905760405162461bcd60e51b815260206004820152601e60248201527f5369676e617475726556616c696461746f723a206465706c6f796d656e74000060448201526064015b60405180910390fd5b505b604051630b135d3f60e11b808252906001600160a01b038a1690631626ba7e90620001c4908b90869060040162000661565b602060405180830381865afa158015620001e2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200020891906200069d565b6001600160e01b031916149450505050506200044a565b805115620002b157604051630b135d3f60e11b808252906001600160a01b03871690631626ba7e9062000259908890889060040162000661565b602060405180830381865afa15801562000277573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200029d91906200069d565b6001600160e01b031916149150506200044a565b8251604114620003195760405162461bcd60e51b815260206004820152603a6024820152600080516020620006e083398151915260448201527f3a20696e76616c6964207369676e6174757265206c656e677468000000000000606482015260840162000187565b620003236200046b565b506020830151604080850151855186939260009185919081106200034b576200034b620006c9565b016020015160f81c9050601b81148015906200036b57508060ff16601c14155b15620003cf5760405162461bcd60e51b815260206004820152603b6024820152600080516020620006e083398151915260448201527f3a20696e76616c6964207369676e617475726520762076616c75650000000000606482015260840162000187565b6040805160008152602081018083528a905260ff83169181019190915260608101849052608081018390526001600160a01b038a169060019060a0016020604051602081039080840390855afa1580156200042e573d6000803e3d6000fd5b505050602060405103516001600160a01b031614955050505050505b9392505050565b60006020825110156200046357600080fd5b508051015190565b60405180606001604052806003906020820280368337509192915050565b6001600160a01b03811681146200049f57600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b60005b83811015620004d5578181015183820152602001620004bb565b50506000910152565b600082601f830112620004f057600080fd5b81516001600160401b03808211156200050d576200050d620004a2565b604051601f8301601f19908116603f01168101908282118183101715620005385762000538620004a2565b816040528381528660208588010111156200055257600080fd5b62000565846020830160208901620004b8565b9695505050505050565b6000806000606084860312156200058557600080fd5b8351620005928162000489565b6020850151604086015191945092506001600160401b03811115620005b657600080fd5b620005c486828701620004de565b9150509250925092565b600080600060608486031215620005e457600080fd5b8351620005f18162000489565b60208501519093506001600160401b03808211156200060f57600080fd5b6200061d87838801620004de565b935060408601519150808211156200063457600080fd5b50620005c486828701620004de565b6000825162000657818460208701620004b8565b9190910192915050565b828152604060208201526000825180604084015262000688816060850160208701620004b8565b601f01601f1916919091016060019392505050565b600060208284031215620006b057600080fd5b81516001600160e01b0319811681146200044a57600080fd5b634e487b7160e01b600052603260045260246000fdfe5369676e617475726556616c696461746f72237265636f7665725369676e6572";
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ BigInt(
  0
);
BigInt(1);
BigInt(2);
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function EE(e, t) {
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
  return !0;
}
function SE(e, t) {
  const n = ur(e) ? Bi(e) : e,
    r = ur(t) ? Bi(t) : t;
  return EE(n, r);
}
async function x2(e, { address: t, hash: n, signature: r, ...i }) {
  const a = ur(r) ? r : Ln(r);
  try {
    const { data: o } = await gu(e, {
      data: r2({ abi: u8, args: [t, n, a], bytecode: xE }),
      ...i,
    });
    return SE(o ?? "0x0", "0x1");
  } catch (o) {
    if (o instanceof Gv) return !1;
    throw o;
  }
}
async function CE(e, { address: t, message: n, signature: r, ...i }) {
  const a = bE(n);
  return x2(e, { address: t, hash: a, signature: r, ...i });
}
async function _E(
  e,
  {
    address: t,
    signature: n,
    message: r,
    primaryType: i,
    types: a,
    domain: o,
    ...s
  }
) {
  const l = gE({ message: r, primaryType: i, types: a, domain: o });
  return x2(e, { address: t, hash: l, signature: n, ...s });
}
const kE = (e) => ({
  call: (t) => gu(e, t),
  createBlockFilter: () => mE(e),
  createContractEventFilter: (t) => Bv(e, t),
  createEventFilter: (t) => n2(e, t),
  createPendingTransactionFilter: () => o2(e),
  estimateContractGas: (t) => l8(e, t),
  estimateGas: (t) => e0(e, t),
  getBalance: (t) => N8(e, t),
  getBlock: (t) => po(e, t),
  getBlockNumber: (t) => Io(e, t),
  getBlockTransactionCount: (t) => D8(e, t),
  getBytecode: (t) => P8(e, t),
  getChainId: () => Sl(e),
  getEnsAddress: (t) => A8(e, t),
  getEnsAvatar: (t) => pE(e, t),
  getEnsName: (t) => T8(e, t),
  getEnsResolver: (t) => O8(e, t),
  getEnsText: (t) => g2(e, t),
  getFeeHistory: (t) => I8(e, t),
  getFilterChanges: (t) => yu(e, t),
  getFilterLogs: (t) => L8(e, t),
  getGasPrice: () => Zv(e),
  getLogs: (t) => n0(e, t),
  getStorageAt: (t) => F8(e, t),
  getTransaction: (t) => i0(e, t),
  getTransactionConfirmations: (t) => U8(e, t),
  getTransactionCount: (t) => Xv(e, t),
  getTransactionReceipt: (t) => ed(e, t),
  multicall: (t) => M8(e, t),
  readContract: (t) => cr(e, t),
  simulateContract: (t) => m8(e, t),
  verifyMessage: (t) => CE(e, t),
  verifyTypedData: (t) => _E(e, t),
  uninstallFilter: (t) => vu(e, t),
  waitForTransactionReceipt: (t) => z8(e, t),
  watchBlocks: (t) => R8(e, t),
  watchBlockNumber: (t) => a2(e, t),
  watchContractEvent: (t) => S8(e, t),
  watchEvent: (t) => B8(e, t),
  watchPendingTransactions: (t) => $8(e, t),
});
function bm({
  batch: e,
  chain: t,
  key: n = "public",
  name: r = "Public Client",
  transport: i,
  pollingInterval: a,
}) {
  const o = {
    batch: e,
    ...u2({
      chain: t,
      key: n,
      name: r,
      pollingInterval: a,
      transport: i,
      type: "publicClient",
    }),
  };
  return { ...o, ...kE(o) };
}
async function NE(e, { chain: t }) {
  const {
    id: n,
    name: r,
    nativeCurrency: i,
    rpcUrls: a,
    blockExplorers: o,
  } = t;
  await e.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: oe(n),
        chainName: r,
        nativeCurrency: i,
        rpcUrls: a.default.http,
        blockExplorerUrls: o ? Object.values(o).map(({ url: s }) => s) : void 0,
      },
    ],
  });
}
async function DE(e) {
  return (await e.request({ method: "eth_accounts" })).map((n) => Qh(n));
}
async function PE(e) {
  return await e.request({ method: "wallet_getPermissions" });
}
async function AE(e) {
  return (await e.request({ method: "eth_requestAccounts" })).map((n) => tn(n));
}
async function TE(e, { id: t }) {
  await e.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: oe(t) }],
  });
}
const OE = (e) => ({
  addChain: (t) => NE(e, t),
  deployContract: (t) => k8(e, t),
  getAddresses: () => DE(e),
  getChainId: () => Sl(e),
  getPermissions: () => PE(e),
  requestAddresses: () => AE(e),
  requestPermissions: (t) => W8(e, t),
  sendTransaction: (t) => r0(e, t),
  signMessage: (t) => H8(e, t),
  signTypedData: (t) => G8(e, t),
  switchChain: (t) => TE(e, t),
  watchAsset: (t) => Q8(e, t),
  writeContract: (t) => _8(e, t),
});
function l0({
  account: e,
  chain: t,
  transport: n,
  key: r = "wallet",
  name: i = "Wallet Client",
  pollingInterval: a,
}) {
  const o = {
    ...u2({
      chain: t,
      key: r,
      name: i,
      pollingInterval: a,
      transport: (s) => n({ ...s, retryCount: 0 }),
      type: "walletClient",
    }),
    account: e ? an(e) : void 0,
  };
  return { ...o, ...OE(o) };
}
function jE(e, t = {}) {
  const {
    key: n = "webSocket",
    name: r = "WebSocket JSON-RPC",
    retryDelay: i,
  } = t;
  return ({ chain: a, retryCount: o, timeout: s }) => {
    var d;
    const l = t.retryCount ?? o,
      u = s ?? t.timeout ?? 1e4,
      c =
        e ||
        ((d = a == null ? void 0 : a.rpcUrls.default.webSocket) == null
          ? void 0
          : d[0]);
    if (!c) throw new f2();
    return bu(
      {
        key: n,
        name: r,
        async request({ method: m, params: v }) {
          const b = await Cc(c),
            { result: _ } = await Ba.webSocketAsync(b, {
              body: { method: m, params: v },
              timeout: u,
            });
          return _;
        },
        retryCount: l,
        retryDelay: i,
        timeout: u,
        type: "webSocket",
      },
      {
        getSocket() {
          return Cc(c);
        },
        async subscribe({ params: m, onData: v, onError: b }) {
          const _ = await Cc(c),
            { result: C } = await new Promise((x, g) =>
              Ba.webSocket(_, {
                body: { method: "eth_subscribe", params: m },
                onData: (w) => {
                  if (typeof w.id == "number") {
                    x(w);
                    return;
                  }
                  w.method === "eth_subscription" && v(w.params);
                },
                onError: (w) => {
                  g(w), b == null || b(w);
                },
              })
            );
          return {
            subscriptionId: C,
            async unsubscribe() {
              return new Promise((x, g) =>
                Ba.webSocket(_, {
                  body: { method: "eth_unsubscribe", params: [C] },
                  onData: x,
                  onError: g,
                })
              );
            },
          };
        },
      }
    );
  };
}
function IE(e) {
  var n;
  if (!e) return "Injected";
  const t = (r) => {
    if (r.isApexWallet) return "Apex Wallet";
    if (r.isAvalanche) return "Core Wallet";
    if (r.isBackpack) return "Backpack";
    if (r.isBifrost) return "Bifrost Wallet";
    if (r.isBitKeep) return "BitKeep";
    if (r.isBitski) return "Bitski";
    if (r.isBlockWallet) return "BlockWallet";
    if (r.isBraveWallet) return "Brave Wallet";
    if (r.isCoin98) return "Coin98 Wallet";
    if (r.isCoinbaseWallet) return "Coinbase Wallet";
    if (r.isDawn) return "Dawn Wallet";
    if (r.isDefiant) return "Defiant";
    if (r.isDesig) return "Desig Wallet";
    if (r.isEnkrypt) return "Enkrypt";
    if (r.isExodus) return "Exodus";
    if (r.isFordefi) return "Fordefi";
    if (r.isFrame) return "Frame";
    if (r.isFrontier) return "Frontier Wallet";
    if (r.isGamestop) return "GameStop Wallet";
    if (r.isHaqqWallet) return "HAQQ Wallet";
    if (r.isHyperPay) return "HyperPay Wallet";
    if (r.isImToken) return "ImToken";
    if (r.isHaloWallet) return "Halo Wallet";
    if (r.isKuCoinWallet) return "KuCoin Wallet";
    if (r.isMathWallet) return "MathWallet";
    if (r.isNovaWallet) return "Nova Wallet";
    if (r.isOkxWallet || r.isOKExWallet) return "OKX Wallet";
    if (r.isOktoWallet) return "Okto Wallet";
    if (r.isOneInchIOSWallet || r.isOneInchAndroidWallet) return "1inch Wallet";
    if (r.isOneKey) return "OneKey Wallet";
    if (r.isOpera) return "Opera";
    if (r.isPhantom) return "Phantom";
    if (r.isPortal) return "Ripio Portal";
    if (r.isRabby) return "Rabby Wallet";
    if (r.isRainbow) return "Rainbow";
    if (r.isSafePal) return "SafePal Wallet";
    if (r.isStatus) return "Status";
    if (r.isSubWallet) return "SubWallet";
    if (r.isTalisman) return "Talisman";
    if (r.isTally) return "Taho";
    if (r.isTokenPocket) return "TokenPocket";
    if (r.isTokenary) return "Tokenary";
    if (r.isTrust || r.isTrustWallet) return "Trust Wallet";
    if (r.isTTWallet) return "TTWallet";
    if (r.isXDEFI) return "XDEFI Wallet";
    if (r.isZeal) return "Zeal";
    if (r.isZerion) return "Zerion";
    if (r.isMetaMask) return "MetaMask";
  };
  if ((n = e.providers) != null && n.length) {
    const r = new Set();
    let i = 1;
    for (const o of e.providers) {
      let s = t(o);
      s || ((s = `Unknown Wallet #${i}`), (i += 1)), r.add(s);
    }
    const a = [...r];
    return a.length ? a : a[0] ?? "Injected";
  }
  return t(e) ?? "Injected";
}
var Fs,
  E2 = class extends $h {
    constructor({ chains: e, options: t } = {}) {
      const n = {
        shimDisconnect: !0,
        getProvider() {
          if (typeof window > "u") return;
          const i = window.ethereum;
          return i != null && i.providers && i.providers.length > 0
            ? i.providers[0]
            : i;
        },
        ...t,
      };
      super({ chains: e, options: n }),
        (this.id = "injected"),
        ft(this, Fs, void 0),
        (this.shimDisconnectKey = `${this.id}.shimDisconnect`),
        (this.onAccountsChanged = (i) => {
          i.length === 0
            ? this.emit("disconnect")
            : this.emit("change", { account: tn(i[0]) });
        }),
        (this.onChainChanged = (i) => {
          const a = gl(i),
            o = this.isChainUnsupported(a);
          this.emit("change", { chain: { id: a, unsupported: o } });
        }),
        (this.onDisconnect = async (i) => {
          var a;
          (i.code === 1013 &&
            (await this.getProvider()) &&
            (await this.getAccount())) ||
            (this.emit("disconnect"),
            this.options.shimDisconnect &&
              ((a = this.storage) == null ||
                a.removeItem(this.shimDisconnectKey)));
        });
      const r = n.getProvider();
      if (typeof n.name == "string") this.name = n.name;
      else if (r) {
        const i = IE(r);
        n.name
          ? (this.name = n.name(i))
          : typeof i == "string"
          ? (this.name = i)
          : (this.name = i[0]);
      } else this.name = "Injected";
      this.ready = !!r;
    }
    async connect({ chainId: e } = {}) {
      var t;
      try {
        const n = await this.getProvider();
        if (!n) throw new Nr();
        n.on &&
          (n.on("accountsChanged", this.onAccountsChanged),
          n.on("chainChanged", this.onChainChanged),
          n.on("disconnect", this.onDisconnect)),
          this.emit("message", { type: "connecting" });
        const r = await n.request({ method: "eth_requestAccounts" }),
          i = tn(r[0]);
        let a = await this.getChainId(),
          o = this.isChainUnsupported(a);
        return (
          e &&
            a !== e &&
            ((a = (await this.switchChain(e)).id),
            (o = this.isChainUnsupported(a))),
          this.options.shimDisconnect &&
            ((t = this.storage) == null ||
              t.setItem(this.shimDisconnectKey, !0)),
          { account: i, chain: { id: a, unsupported: o } }
        );
      } catch (n) {
        throw this.isUserRejectedRequestError(n)
          ? new Yt(n)
          : n.code === -32002
          ? new xl(n)
          : n;
      }
    }
    async disconnect() {
      var t;
      const e = await this.getProvider();
      e != null &&
        e.removeListener &&
        (e.removeListener("accountsChanged", this.onAccountsChanged),
        e.removeListener("chainChanged", this.onChainChanged),
        e.removeListener("disconnect", this.onDisconnect),
        this.options.shimDisconnect &&
          ((t = this.storage) == null || t.removeItem(this.shimDisconnectKey)));
    }
    async getAccount() {
      const e = await this.getProvider();
      if (!e) throw new Nr();
      const t = await e.request({ method: "eth_accounts" });
      return tn(t[0]);
    }
    async getChainId() {
      const e = await this.getProvider();
      if (!e) throw new Nr();
      return e.request({ method: "eth_chainId" }).then(gl);
    }
    async getProvider() {
      const e = this.options.getProvider();
      return e && $i(this, Fs, e), ge(this, Fs);
    }
    async getWalletClient({ chainId: e } = {}) {
      const [t, n] = await Promise.all([this.getProvider(), this.getAccount()]),
        r = this.chains.find((i) => i.id === e);
      if (!t) throw new Error("provider is required.");
      return l0({ account: n, chain: r, transport: a0(t) });
    }
    async isAuthorized() {
      var e;
      try {
        if (
          this.options.shimDisconnect &&
          !((e = this.storage) != null && e.getItem(this.shimDisconnectKey))
        )
          return !1;
        if (!(await this.getProvider())) throw new Nr();
        return !!(await this.getAccount());
      } catch {
        return !1;
      }
    }
    async switchChain(e) {
      var r, i, a;
      const t = await this.getProvider();
      if (!t) throw new Nr();
      const n = oe(e);
      try {
        return (
          await Promise.all([
            t.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: n }],
            }),
            new Promise((o) =>
              this.on("change", ({ chain: s }) => {
                (s == null ? void 0 : s.id) === e && o();
              })
            ),
          ]),
          this.chains.find((o) => o.id === e) ?? {
            id: e,
            name: `Chain ${n}`,
            network: `${n}`,
            nativeCurrency: { name: "Ether", decimals: 18, symbol: "ETH" },
            rpcUrls: { default: { http: [""] }, public: { http: [""] } },
          }
        );
      } catch (o) {
        const s = this.chains.find((l) => l.id === e);
        if (!s) throw new Nv({ chainId: e, connectorId: this.id });
        if (
          o.code === 4902 ||
          ((i =
            (r = o == null ? void 0 : o.data) == null
              ? void 0
              : r.originalError) == null
            ? void 0
            : i.code) === 4902
        )
          try {
            if (
              (await t.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: n,
                    chainName: s.name,
                    nativeCurrency: s.nativeCurrency,
                    rpcUrls: [
                      ((a = s.rpcUrls.public) == null ? void 0 : a.http[0]) ??
                        "",
                    ],
                    blockExplorerUrls: this.getBlockExplorerUrls(s),
                  },
                ],
              }),
              (await this.getChainId()) !== e)
            )
              throw new Yt(
                new Error("User rejected switch after adding network.")
              );
            return s;
          } catch (l) {
            throw new Yt(l);
          }
        throw this.isUserRejectedRequestError(o) ? new Yt(o) : new ho(o);
      }
    }
    async watchAsset({ address: e, decimals: t = 18, image: n, symbol: r }) {
      const i = await this.getProvider();
      if (!i) throw new Nr();
      return i.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: { address: e, decimals: t, image: n, symbol: r },
        },
      });
    }
    isUserRejectedRequestError(e) {
      return e.code === 4001;
    }
  };
Fs = new WeakMap();
var u0 = (e, t, n) => {
    if (!t.has(e)) throw TypeError("Cannot " + n);
  },
  _c = (e, t, n) => (
    u0(e, t, "read from private field"), n ? n.call(e) : t.get(e)
  ),
  kc = (e, t, n) => {
    if (t.has(e))
      throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, n);
  },
  hs = (e, t, n, r) => (
    u0(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n
  ),
  LE = (e, t, n) => (u0(e, t, "access private method"), n);
const FE = (e) => (t, n, r) => {
    const i = r.subscribe;
    return (
      (r.subscribe = (o, s, l) => {
        let u = o;
        if (s) {
          const c = (l == null ? void 0 : l.equalityFn) || Object.is;
          let d = o(r.getState());
          (u = (m) => {
            const v = o(m);
            if (!c(d, v)) {
              const b = d;
              s((d = v), b);
            }
          }),
            l != null && l.fireImmediately && s(d, d);
        }
        return i(u);
      }),
      e(t, n, r)
    );
  },
  UE = FE;
function ME(e, t) {
  let n;
  try {
    n = e();
  } catch {
    return;
  }
  return {
    getItem: (i) => {
      var a;
      const o = (l) =>
          l === null ? null : JSON.parse(l, t == null ? void 0 : t.reviver),
        s = (a = n.getItem(i)) != null ? a : null;
      return s instanceof Promise ? s.then(o) : o(s);
    },
    setItem: (i, a) =>
      n.setItem(i, JSON.stringify(a, t == null ? void 0 : t.replacer)),
    removeItem: (i) => n.removeItem(i),
  };
}
const mo = (e) => (t) => {
    try {
      const n = e(t);
      return n instanceof Promise
        ? n
        : {
            then(r) {
              return mo(r)(n);
            },
            catch(r) {
              return this;
            },
          };
    } catch (n) {
      return {
        then(r) {
          return this;
        },
        catch(r) {
          return mo(r)(n);
        },
      };
    }
  },
  RE = (e, t) => (n, r, i) => {
    let a = {
        getStorage: () => localStorage,
        serialize: JSON.stringify,
        deserialize: JSON.parse,
        partialize: (C) => C,
        version: 0,
        merge: (C, x) => ({ ...x, ...C }),
        ...t,
      },
      o = !1;
    const s = new Set(),
      l = new Set();
    let u;
    try {
      u = a.getStorage();
    } catch {}
    if (!u)
      return e(
        (...C) => {
          console.warn(
            `[zustand persist middleware] Unable to update item '${a.name}', the given storage is currently unavailable.`
          ),
            n(...C);
        },
        r,
        i
      );
    const c = mo(a.serialize),
      d = () => {
        const C = a.partialize({ ...r() });
        let x;
        const g = c({ state: C, version: a.version })
          .then((w) => u.setItem(a.name, w))
          .catch((w) => {
            x = w;
          });
        if (x) throw x;
        return g;
      },
      m = i.setState;
    i.setState = (C, x) => {
      m(C, x), d();
    };
    const v = e(
      (...C) => {
        n(...C), d();
      },
      r,
      i
    );
    let b;
    const _ = () => {
      var C;
      if (!u) return;
      (o = !1), s.forEach((g) => g(r()));
      const x =
        ((C = a.onRehydrateStorage) == null ? void 0 : C.call(a, r())) ||
        void 0;
      return mo(u.getItem.bind(u))(a.name)
        .then((g) => {
          if (g) return a.deserialize(g);
        })
        .then((g) => {
          if (g)
            if (typeof g.version == "number" && g.version !== a.version) {
              if (a.migrate) return a.migrate(g.state, g.version);
              console.error(
                "State loaded from storage couldn't be migrated since no migrate function was provided"
              );
            } else return g.state;
        })
        .then((g) => {
          var w;
          return (b = a.merge(g, (w = r()) != null ? w : v)), n(b, !0), d();
        })
        .then(() => {
          x == null || x(b, void 0), (o = !0), l.forEach((g) => g(b));
        })
        .catch((g) => {
          x == null || x(void 0, g);
        });
    };
    return (
      (i.persist = {
        setOptions: (C) => {
          (a = { ...a, ...C }), C.getStorage && (u = C.getStorage());
        },
        clearStorage: () => {
          u == null || u.removeItem(a.name);
        },
        getOptions: () => a,
        rehydrate: () => _(),
        hasHydrated: () => o,
        onHydrate: (C) => (
          s.add(C),
          () => {
            s.delete(C);
          }
        ),
        onFinishHydration: (C) => (
          l.add(C),
          () => {
            l.delete(C);
          }
        ),
      }),
      _(),
      b || v
    );
  },
  BE = (e, t) => (n, r, i) => {
    let a = {
        storage: ME(() => localStorage),
        partialize: (_) => _,
        version: 0,
        merge: (_, C) => ({ ...C, ..._ }),
        ...t,
      },
      o = !1;
    const s = new Set(),
      l = new Set();
    let u = a.storage;
    if (!u)
      return e(
        (..._) => {
          console.warn(
            `[zustand persist middleware] Unable to update item '${a.name}', the given storage is currently unavailable.`
          ),
            n(..._);
        },
        r,
        i
      );
    const c = () => {
        const _ = a.partialize({ ...r() });
        return u.setItem(a.name, { state: _, version: a.version });
      },
      d = i.setState;
    i.setState = (_, C) => {
      d(_, C), c();
    };
    const m = e(
      (..._) => {
        n(..._), c();
      },
      r,
      i
    );
    i.getInitialState = () => m;
    let v;
    const b = () => {
      var _, C;
      if (!u) return;
      (o = !1),
        s.forEach((g) => {
          var w;
          return g((w = r()) != null ? w : m);
        });
      const x =
        ((C = a.onRehydrateStorage) == null
          ? void 0
          : C.call(a, (_ = r()) != null ? _ : m)) || void 0;
      return mo(u.getItem.bind(u))(a.name)
        .then((g) => {
          if (g)
            if (typeof g.version == "number" && g.version !== a.version) {
              if (a.migrate) return a.migrate(g.state, g.version);
              console.error(
                "State loaded from storage couldn't be migrated since no migrate function was provided"
              );
            } else return g.state;
        })
        .then((g) => {
          var w;
          return (v = a.merge(g, (w = r()) != null ? w : m)), n(v, !0), c();
        })
        .then(() => {
          x == null || x(v, void 0),
            (v = r()),
            (o = !0),
            l.forEach((g) => g(v));
        })
        .catch((g) => {
          x == null || x(void 0, g);
        });
    };
    return (
      (i.persist = {
        setOptions: (_) => {
          (a = { ...a, ..._ }), _.storage && (u = _.storage);
        },
        clearStorage: () => {
          u == null || u.removeItem(a.name);
        },
        getOptions: () => a,
        rehydrate: () => b(),
        hasHydrated: () => o,
        onHydrate: (_) => (
          s.add(_),
          () => {
            s.delete(_);
          }
        ),
        onFinishHydration: (_) => (
          l.add(_),
          () => {
            l.delete(_);
          }
        ),
      }),
      a.skipHydration || b(),
      v || m
    );
  },
  $E = (e, t) =>
    "getStorage" in t || "serialize" in t || "deserialize" in t
      ? RE(e, t)
      : BE(e, t),
  zE = $E,
  xm = (e) => {
    let t;
    const n = new Set(),
      r = (c, d) => {
        const m = typeof c == "function" ? c(t) : c;
        if (!Object.is(m, t)) {
          const v = t;
          (t =
            d ?? (typeof m != "object" || m === null)
              ? m
              : Object.assign({}, t, m)),
            n.forEach((b) => b(t, v));
        }
      },
      i = () => t,
      l = {
        setState: r,
        getState: i,
        getInitialState: () => u,
        subscribe: (c) => (n.add(c), () => n.delete(c)),
        destroy: () => {
          n.clear();
        },
      },
      u = (t = e(r, i, l));
    return l;
  },
  WE = (e) => (e ? xm(e) : xm);
function HE(
  e,
  t,
  {
    batch: n = { multicall: { wait: 32 } },
    pollingInterval: r = 4e3,
    rank: i,
    retryCount: a,
    retryDelay: o,
    stallTimeout: s,
  } = {}
) {
  if (!e.length) throw new Error("must have at least one chain");
  let l = [];
  const u = {},
    c = {};
  for (const d of e) {
    let m = !1;
    for (const v of t) {
      const b = v(d);
      b &&
        ((m = !0),
        l.some(({ id: _ }) => _ === d.id) || (l = [...l, b.chain]),
        (u[d.id] = [...(u[d.id] || []), ...b.rpcUrls.http]),
        b.rpcUrls.webSocket &&
          (c[d.id] = [...(c[d.id] || []), ...b.rpcUrls.webSocket]));
    }
    if (!m)
      throw new Error(
        [
          `Could not find valid provider configuration for chain "${d.name}".
`,
          "You may need to add `jsonRpcProvider` to `configureChains` with the chain's RPC URLs.",
          "Read more: https://wagmi.sh/core/providers/jsonRpc",
        ].join(`
`)
      );
  }
  return {
    chains: l,
    publicClient: ({ chainId: d }) => {
      const m = l.find((_) => _.id === d) ?? e[0],
        v = u[m.id];
      if (!v || !v[0])
        throw new Error(`No providers configured for chain "${m.id}"`);
      const b = bm({
        batch: n,
        chain: m,
        transport: vm(
          v.map((_) => tE(_, { timeout: s })),
          { rank: i, retryCount: a, retryDelay: o }
        ),
        pollingInterval: r,
      });
      return Object.assign(b, { chains: l });
    },
    webSocketPublicClient: ({ chainId: d }) => {
      const m = l.find((_) => _.id === d) ?? e[0],
        v = c[m.id];
      if (!v || !v[0]) return;
      const b = bm({
        batch: n,
        chain: m,
        transport: vm(
          v.map((_) => jE(_, { timeout: s })),
          { rank: i, retryCount: a, retryDelay: o }
        ),
        pollingInterval: r,
      });
      return Object.assign(b, { chains: l });
    },
  };
}
var nd = (e, { find: t, replace: n }) =>
  e && t(e)
    ? n(e)
    : typeof e != "object"
    ? e
    : Array.isArray(e)
    ? e.map((r) => nd(r, { find: t, replace: n }))
    : e instanceof Object
    ? Object.entries(e).reduce(
        (r, [i, a]) => ({ ...r, [i]: nd(a, { find: t, replace: n }) }),
        {}
      )
    : e;
function qE(e) {
  const t = JSON.parse(e);
  return nd(t, {
    find: (r) => typeof r == "string" && r.startsWith("#bigint."),
    replace: (r) => BigInt(r.replace("#bigint.", "")),
  });
}
function Em(e, t) {
  return e.slice(0, t).join(".") || ".";
}
function Sm(e, t) {
  const { length: n } = e;
  for (let r = 0; r < n; ++r) if (e[r] === t) return r + 1;
  return 0;
}
function VE(e, t) {
  const n = typeof e == "function",
    r = typeof t == "function",
    i = [],
    a = [];
  return function (s, l) {
    if (typeof l == "object")
      if (i.length) {
        const u = Sm(i, this);
        u === 0 ? (i[i.length] = this) : (i.splice(u), a.splice(u)),
          (a[a.length] = s);
        const c = Sm(i, l);
        if (c !== 0)
          return r ? t.call(this, s, l, Em(a, c)) : `[ref=${Em(a, c)}]`;
      } else (i[0] = l), (a[0] = s);
    return n ? e.call(this, s, l) : l;
  };
}
function GE(e, t, n, r) {
  return JSON.stringify(
    e,
    VE((i, a) => {
      const o = typeof a == "bigint" ? `#bigint.${a.toString()}` : a;
      return (t == null ? void 0 : t(i, o)) || o;
    }, r),
    n ?? void 0
  );
}
var S2 = {
  getItem: (e) => "",
  setItem: (e, t) => null,
  removeItem: (e) => null,
};
function C2({
  deserialize: e = qE,
  key: t = "wagmi",
  serialize: n = GE,
  storage: r,
}) {
  return {
    ...r,
    getItem: (i, a = null) => {
      const o = r.getItem(`${t}.${i}`);
      try {
        return o ? e(o) : a;
      } catch (s) {
        return console.warn(s), a;
      }
    },
    setItem: (i, a) => {
      if (a === null) r.removeItem(`${t}.${i}`);
      else
        try {
          r.setItem(`${t}.${i}`, n(a));
        } catch (o) {
          console.error(o);
        }
    },
    removeItem: (i) => r.removeItem(`${t}.${i}`),
  };
}
var Cm = "store",
  ri,
  _a,
  rd,
  _2,
  QE = class {
    constructor({
      autoConnect: e = !1,
      connectors: t = [new E2()],
      publicClient: n,
      storage: r = C2({
        storage: typeof window < "u" ? window.localStorage : S2,
      }),
      logger: i = { warn: console.warn },
      webSocketPublicClient: a,
    }) {
      var u, c;
      kc(this, rd),
        (this.publicClients = new Map()),
        (this.webSocketPublicClients = new Map()),
        kc(this, ri, void 0),
        kc(this, _a, void 0),
        (this.args = {
          autoConnect: e,
          connectors: t,
          logger: i,
          publicClient: n,
          storage: r,
          webSocketPublicClient: a,
        });
      let o = "disconnected",
        s;
      if (e)
        try {
          const d = r.getItem(Cm),
            m = (u = d == null ? void 0 : d.state) == null ? void 0 : u.data;
          (o = m != null && m.account ? "reconnecting" : "connecting"),
            (s = (c = m == null ? void 0 : m.chain) == null ? void 0 : c.id);
        } catch {}
      const l = typeof t == "function" ? t() : t;
      l.forEach((d) => d.setStorage(r)),
        (this.store = WE(
          UE(
            zE(
              () => ({
                connectors: l,
                publicClient: this.getPublicClient({ chainId: s }),
                status: o,
                webSocketPublicClient: this.getWebSocketPublicClient({
                  chainId: s,
                }),
              }),
              {
                name: Cm,
                storage: r,
                partialize: (d) => {
                  var m, v;
                  return {
                    ...(e && {
                      data: {
                        account:
                          (m = d == null ? void 0 : d.data) == null
                            ? void 0
                            : m.account,
                        chain:
                          (v = d == null ? void 0 : d.data) == null
                            ? void 0
                            : v.chain,
                      },
                    }),
                    chains: d == null ? void 0 : d.chains,
                  };
                },
                version: 2,
              }
            )
          )
        )),
        (this.storage = r),
        hs(this, _a, r == null ? void 0 : r.getItem("wallet")),
        LE(this, rd, _2).call(this),
        e &&
          typeof window < "u" &&
          setTimeout(async () => await this.autoConnect(), 0);
    }
    get chains() {
      return this.store.getState().chains;
    }
    get connectors() {
      return this.store.getState().connectors;
    }
    get connector() {
      return this.store.getState().connector;
    }
    get data() {
      return this.store.getState().data;
    }
    get error() {
      return this.store.getState().error;
    }
    get lastUsedChainId() {
      var e, t;
      return (t = (e = this.data) == null ? void 0 : e.chain) == null
        ? void 0
        : t.id;
    }
    get publicClient() {
      return this.store.getState().publicClient;
    }
    get status() {
      return this.store.getState().status;
    }
    get subscribe() {
      return this.store.subscribe;
    }
    get webSocketPublicClient() {
      return this.store.getState().webSocketPublicClient;
    }
    setState(e) {
      const t = typeof e == "function" ? e(this.store.getState()) : e;
      this.store.setState(t, !0);
    }
    clearState() {
      this.setState((e) => ({
        ...e,
        chains: void 0,
        connector: void 0,
        data: void 0,
        error: void 0,
        status: "disconnected",
      }));
    }
    async destroy() {
      var e, t;
      this.connector &&
        (await ((t = (e = this.connector).disconnect) == null
          ? void 0
          : t.call(e))),
        hs(this, ri, !1),
        this.clearState(),
        this.store.destroy();
    }
    async autoConnect() {
      if (_c(this, ri)) return;
      hs(this, ri, !0),
        this.setState((n) => {
          var r;
          return {
            ...n,
            status:
              (r = n.data) != null && r.account ? "reconnecting" : "connecting",
          };
        });
      const e = _c(this, _a)
        ? [...this.connectors].sort((n) => (n.id === _c(this, _a) ? -1 : 1))
        : this.connectors;
      let t = !1;
      for (const n of e) {
        if (!n.ready || !n.isAuthorized || !(await n.isAuthorized())) continue;
        const i = await n.connect();
        this.setState((a) => ({
          ...a,
          connector: n,
          chains: n == null ? void 0 : n.chains,
          data: i,
          status: "connected",
        })),
          (t = !0);
        break;
      }
      return (
        t ||
          this.setState((n) => ({
            ...n,
            data: void 0,
            status: "disconnected",
          })),
        hs(this, ri, !1),
        this.data
      );
    }
    setConnectors(e) {
      this.args = { ...this.args, connectors: e };
      const t = typeof e == "function" ? e() : e;
      t.forEach((n) => n.setStorage(this.args.storage)),
        this.setState((n) => ({ ...n, connectors: t }));
    }
    getPublicClient({ chainId: e } = {}) {
      let t = this.publicClients.get(-1);
      if (
        (t && (t == null ? void 0 : t.chain.id) === e) ||
        ((t = this.publicClients.get(e ?? -1)), t)
      )
        return t;
      const { publicClient: n } = this.args;
      return (
        (t = typeof n == "function" ? n({ chainId: e }) : n),
        this.publicClients.set(e ?? -1, t),
        t
      );
    }
    setPublicClient(e) {
      var n, r;
      const t =
        (r = (n = this.data) == null ? void 0 : n.chain) == null
          ? void 0
          : r.id;
      (this.args = { ...this.args, publicClient: e }),
        this.publicClients.clear(),
        this.setState((i) => ({
          ...i,
          publicClient: this.getPublicClient({ chainId: t }),
        }));
    }
    getWebSocketPublicClient({ chainId: e } = {}) {
      let t = this.webSocketPublicClients.get(-1);
      if (
        (t && (t == null ? void 0 : t.chain.id) === e) ||
        ((t = this.webSocketPublicClients.get(e ?? -1)), t)
      )
        return t;
      const { webSocketPublicClient: n } = this.args;
      return (
        (t = typeof n == "function" ? n({ chainId: e }) : n),
        t && this.webSocketPublicClients.set(e ?? -1, t),
        t
      );
    }
    setWebSocketPublicClient(e) {
      var n, r;
      const t =
        (r = (n = this.data) == null ? void 0 : n.chain) == null
          ? void 0
          : r.id;
      (this.args = { ...this.args, webSocketPublicClient: e }),
        this.webSocketPublicClients.clear(),
        this.setState((i) => ({
          ...i,
          webSocketPublicClient: this.getWebSocketPublicClient({ chainId: t }),
        }));
    }
    setLastUsedConnector(e = null) {
      var t;
      (t = this.storage) == null || t.setItem("wallet", e);
    }
  };
ri = new WeakMap();
_a = new WeakMap();
rd = new WeakSet();
_2 = function () {
  const e = (s) => {
      this.setState((l) => ({ ...l, data: { ...l.data, ...s } }));
    },
    t = () => {
      this.clearState();
    },
    n = (s) => {
      this.setState((l) => ({ ...l, error: s }));
    };
  this.store.subscribe(
    ({ connector: s }) => s,
    (s, l) => {
      var u, c, d, m, v, b;
      (u = l == null ? void 0 : l.off) == null || u.call(l, "change", e),
        (c = l == null ? void 0 : l.off) == null || c.call(l, "disconnect", t),
        (d = l == null ? void 0 : l.off) == null || d.call(l, "error", n),
        s &&
          ((m = s.on) == null || m.call(s, "change", e),
          (v = s.on) == null || v.call(s, "disconnect", t),
          (b = s.on) == null || b.call(s, "error", n));
    }
  );
  const { publicClient: r, webSocketPublicClient: i } = this.args;
  (typeof r == "function" || typeof i == "function") &&
    this.store.subscribe(
      ({ data: s }) => {
        var l;
        return (l = s == null ? void 0 : s.chain) == null ? void 0 : l.id;
      },
      (s) => {
        this.setState((l) => ({
          ...l,
          publicClient: this.getPublicClient({ chainId: s }),
          webSocketPublicClient: this.getWebSocketPublicClient({ chainId: s }),
        }));
      }
    );
};
function KE(e) {
  return new QE(e);
}
var YE = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var xu = F,
  ZE = C6;
function XE(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var JE = typeof Object.is == "function" ? Object.is : XE,
  eS = ZE.useSyncExternalStore,
  tS = xu.useRef,
  nS = xu.useEffect,
  rS = xu.useMemo,
  iS = xu.useDebugValue;
YE.useSyncExternalStoreWithSelector = function (e, t, n, r, i) {
  var a = tS(null);
  if (a.current === null) {
    var o = { hasValue: !1, value: null };
    a.current = o;
  } else o = a.current;
  a = rS(
    function () {
      function l(v) {
        if (!u) {
          if (((u = !0), (c = v), (v = r(v)), i !== void 0 && o.hasValue)) {
            var b = o.value;
            if (i(b, v)) return (d = b);
          }
          return (d = v);
        }
        if (((b = d), JE(c, v))) return b;
        var _ = r(v);
        return i !== void 0 && i(b, _) ? b : ((c = v), (d = _));
      }
      var u = !1,
        c,
        d,
        m = n === void 0 ? null : n;
      return [
        function () {
          return l(t());
        },
        m === null
          ? void 0
          : function () {
              return l(m());
            },
      ];
    },
    [t, n, r, i]
  );
  var s = eS(e, a[0], a[1]);
  return (
    nS(
      function () {
        (o.hasValue = !0), (o.value = s);
      },
      [s]
    ),
    iS(s),
    s
  );
};
function aS({
  queryClient: e = new l6({
    defaultOptions: {
      queries: {
        cacheTime: 1e3 * 60 * 60 * 24,
        networkMode: "offlineFirst",
        refetchOnWindowFocus: !1,
        retry: 0,
      },
      mutations: { networkMode: "offlineFirst" },
    },
  }),
  storage: t = C2({
    storage:
      typeof window < "u" && window.localStorage ? window.localStorage : S2,
  }),
  persister: n = typeof window < "u"
    ? Wx({
        key: "cache",
        storage: t,
        serialize: (i) => i,
        deserialize: (i) => i,
      })
    : void 0,
  ...r
}) {
  const i = KE({ ...r, storage: t });
  return (
    n &&
      T6({
        queryClient: e,
        persister: n,
        dehydrateOptions: {
          shouldDehydrateQuery: (a) =>
            a.cacheTime !== 0 && a.queryKey[0].persist !== !1,
        },
      }),
    Object.assign(i, { queryClient: e })
  );
}
var oS = F.createContext(void 0),
  sS = F.createContext(void 0);
function lS({ children: e, config: t }) {
  return F.createElement(oS.Provider, {
    children: F.createElement(N6, {
      children: e,
      client: t.queryClient,
      context: sS,
    }),
    value: t,
  });
}
/**
 * @remix-run/router v1.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function go() {
  return (
    (go = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    go.apply(this, arguments)
  );
}
var Kn;
(function (e) {
  (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(Kn || (Kn = {}));
const _m = "popstate";
function uS(e) {
  e === void 0 && (e = {});
  function t(r, i) {
    let { pathname: a, search: o, hash: s } = r.location;
    return id(
      "",
      { pathname: a, search: o, hash: s },
      (i.state && i.state.usr) || null,
      (i.state && i.state.key) || "default"
    );
  }
  function n(r, i) {
    return typeof i == "string" ? i : Cl(i);
  }
  return fS(t, n, null, e);
}
function Me(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function c0(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function cS() {
  return Math.random().toString(36).substr(2, 8);
}
function km(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function id(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    go(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? ra(t) : t,
      { state: n, key: (t && t.key) || r || cS() }
    )
  );
}
function Cl(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
  );
}
function ra(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf("?");
    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e);
  }
  return t;
}
function fS(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: i = document.defaultView, v5Compat: a = !1 } = r,
    o = i.history,
    s = Kn.Pop,
    l = null,
    u = c();
  u == null && ((u = 0), o.replaceState(go({}, o.state, { idx: u }), ""));
  function c() {
    return (o.state || { idx: null }).idx;
  }
  function d() {
    s = Kn.Pop;
    let C = c(),
      x = C == null ? null : C - u;
    (u = C), l && l({ action: s, location: _.location, delta: x });
  }
  function m(C, x) {
    s = Kn.Push;
    let g = id(_.location, C, x);
    n && n(g, C), (u = c() + 1);
    let w = km(g, u),
      E = _.createHref(g);
    try {
      o.pushState(w, "", E);
    } catch (N) {
      if (N instanceof DOMException && N.name === "DataCloneError") throw N;
      i.location.assign(E);
    }
    a && l && l({ action: s, location: _.location, delta: 1 });
  }
  function v(C, x) {
    s = Kn.Replace;
    let g = id(_.location, C, x);
    n && n(g, C), (u = c());
    let w = km(g, u),
      E = _.createHref(g);
    o.replaceState(w, "", E),
      a && l && l({ action: s, location: _.location, delta: 0 });
  }
  function b(C) {
    let x = i.location.origin !== "null" ? i.location.origin : i.location.href,
      g = typeof C == "string" ? C : Cl(C);
    return (
      Me(
        x,
        "No window.location.(origin|href) available to create URL for href: " +
          g
      ),
      new URL(g, x)
    );
  }
  let _ = {
    get action() {
      return s;
    },
    get location() {
      return e(i, o);
    },
    listen(C) {
      if (l) throw new Error("A history only accepts one active listener");
      return (
        i.addEventListener(_m, d),
        (l = C),
        () => {
          i.removeEventListener(_m, d), (l = null);
        }
      );
    },
    createHref(C) {
      return t(i, C);
    },
    createURL: b,
    encodeLocation(C) {
      let x = b(C);
      return { pathname: x.pathname, search: x.search, hash: x.hash };
    },
    push: m,
    replace: v,
    go(C) {
      return o.go(C);
    },
  };
  return _;
}
var Nm;
(function (e) {
  (e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error");
})(Nm || (Nm = {}));
function dS(e, t, n) {
  n === void 0 && (n = "/");
  let r = typeof t == "string" ? ra(t) : t,
    i = Wi(r.pathname || "/", n);
  if (i == null) return null;
  let a = k2(e);
  hS(a);
  let o = null;
  for (let s = 0; o == null && s < a.length; ++s) o = ES(a[s], CS(i));
  return o;
}
function k2(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = "");
  let i = (a, o, s) => {
    let l = {
      relativePath: s === void 0 ? a.path || "" : s,
      caseSensitive: a.caseSensitive === !0,
      childrenIndex: o,
      route: a,
    };
    l.relativePath.startsWith("/") &&
      (Me(
        l.relativePath.startsWith(r),
        'Absolute route path "' +
          l.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes."
      ),
      (l.relativePath = l.relativePath.slice(r.length)));
    let u = or([r, l.relativePath]),
      c = n.concat(l);
    a.children &&
      a.children.length > 0 &&
      (Me(
        a.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + u + '".')
      ),
      k2(a.children, t, c, u)),
      !(a.path == null && !a.index) &&
        t.push({ path: u, score: bS(u, a.index), routesMeta: c });
  };
  return (
    e.forEach((a, o) => {
      var s;
      if (a.path === "" || !((s = a.path) != null && s.includes("?"))) i(a, o);
      else for (let l of N2(a.path)) i(a, o, l);
    }),
    t
  );
}
function N2(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    i = n.endsWith("?"),
    a = n.replace(/\?$/, "");
  if (r.length === 0) return i ? [a, ""] : [a];
  let o = N2(r.join("/")),
    s = [];
  return (
    s.push(...o.map((l) => (l === "" ? a : [a, l].join("/")))),
    i && s.push(...o),
    s.map((l) => (e.startsWith("/") && l === "" ? "/" : l))
  );
}
function hS(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : xS(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
const pS = /^:[\w-]+$/,
  mS = 3,
  gS = 2,
  yS = 1,
  vS = 10,
  wS = -2,
  Dm = (e) => e === "*";
function bS(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(Dm) && (r += wS),
    t && (r += gS),
    n
      .filter((i) => !Dm(i))
      .reduce((i, a) => i + (pS.test(a) ? mS : a === "" ? yS : vS), r)
  );
}
function xS(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, i) => r === t[i])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function ES(e, t) {
  let { routesMeta: n } = e,
    r = {},
    i = "/",
    a = [];
  for (let o = 0; o < n.length; ++o) {
    let s = n[o],
      l = o === n.length - 1,
      u = i === "/" ? t : t.slice(i.length) || "/",
      c = ad(
        { path: s.relativePath, caseSensitive: s.caseSensitive, end: l },
        u
      );
    if (!c) return null;
    Object.assign(r, c.params);
    let d = s.route;
    a.push({
      params: r,
      pathname: or([i, c.pathname]),
      pathnameBase: PS(or([i, c.pathnameBase])),
      route: d,
    }),
      c.pathnameBase !== "/" && (i = or([i, c.pathnameBase]));
  }
  return a;
}
function ad(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = SS(e.path, e.caseSensitive, e.end),
    i = t.match(n);
  if (!i) return null;
  let a = i[0],
    o = a.replace(/(.)\/+$/, "$1"),
    s = i.slice(1);
  return {
    params: r.reduce((u, c, d) => {
      let { paramName: m, isOptional: v } = c;
      if (m === "*") {
        let _ = s[d] || "";
        o = a.slice(0, a.length - _.length).replace(/(.)\/+$/, "$1");
      }
      const b = s[d];
      return v && !b ? (u[m] = void 0) : (u[m] = _S(b || "", m)), u;
    }, {}),
    pathname: a,
    pathnameBase: o,
    pattern: e,
  };
}
function SS(e, t, n) {
  t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    c0(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".')
    );
  let r = [],
    i =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (o, s, l) => (
            r.push({ paramName: s, isOptional: l != null }),
            l ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (i += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
      ? (i += "\\/*$")
      : e !== "" && e !== "/" && (i += "(?:(?=\\/|$))"),
    [new RegExp(i, t ? void 0 : "i"), r]
  );
}
function CS(e) {
  try {
    return decodeURI(e);
  } catch (t) {
    return (
      c0(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ").")
      ),
      e
    );
  }
}
function _S(e, t) {
  try {
    return decodeURIComponent(e);
  } catch (n) {
    return (
      c0(
        !1,
        'The value for the URL param "' +
          t +
          '" will not be decoded because' +
          (' the string "' +
            e +
            '" is a malformed URL segment. This is probably') +
          (" due to a bad percent encoding (" + n + ").")
      ),
      e
    );
  }
}
function Wi(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function kS(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: r = "",
    hash: i = "",
  } = typeof e == "string" ? ra(e) : e;
  return {
    pathname: n ? (n.startsWith("/") ? n : NS(n, t)) : t,
    search: AS(r),
    hash: TS(i),
  };
}
function NS(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((i) => {
      i === ".." ? n.length > 1 && n.pop() : i !== "." && n.push(i);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function Nc(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      t +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the ") +
    ("`to." + n + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function DS(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0)
  );
}
function D2(e, t) {
  let n = DS(e);
  return t
    ? n.map((r, i) => (i === e.length - 1 ? r.pathname : r.pathnameBase))
    : n.map((r) => r.pathnameBase);
}
function P2(e, t, n, r) {
  r === void 0 && (r = !1);
  let i;
  typeof e == "string"
    ? (i = ra(e))
    : ((i = go({}, e)),
      Me(
        !i.pathname || !i.pathname.includes("?"),
        Nc("?", "pathname", "search", i)
      ),
      Me(
        !i.pathname || !i.pathname.includes("#"),
        Nc("#", "pathname", "hash", i)
      ),
      Me(!i.search || !i.search.includes("#"), Nc("#", "search", "hash", i)));
  let a = e === "" || i.pathname === "",
    o = a ? "/" : i.pathname,
    s;
  if (o == null) s = n;
  else {
    let d = t.length - 1;
    if (!r && o.startsWith("..")) {
      let m = o.split("/");
      for (; m[0] === ".."; ) m.shift(), (d -= 1);
      i.pathname = m.join("/");
    }
    s = d >= 0 ? t[d] : "/";
  }
  let l = kS(i, s),
    u = o && o !== "/" && o.endsWith("/"),
    c = (a || o === ".") && n.endsWith("/");
  return !l.pathname.endsWith("/") && (u || c) && (l.pathname += "/"), l;
}
const or = (e) => e.join("/").replace(/\/\/+/g, "/"),
  PS = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  AS = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  TS = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function OS(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const A2 = ["post", "put", "patch", "delete"];
new Set(A2);
const jS = ["get", ...A2];
new Set(jS);
/**
 * React Router v6.21.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function yo() {
  return (
    (yo = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    yo.apply(this, arguments)
  );
}
const Eu = F.createContext(null),
  T2 = F.createContext(null),
  br = F.createContext(null),
  Su = F.createContext(null),
  Zr = F.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  O2 = F.createContext(null);
function IS(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  Lo() || Me(!1);
  let { basename: r, navigator: i } = F.useContext(br),
    { hash: a, pathname: o, search: s } = Cu(e, { relative: n }),
    l = o;
  return (
    r !== "/" && (l = o === "/" ? r : or([r, o])),
    i.createHref({ pathname: l, search: s, hash: a })
  );
}
function Lo() {
  return F.useContext(Su) != null;
}
function ia() {
  return Lo() || Me(!1), F.useContext(Su).location;
}
function j2(e) {
  F.useContext(br).static || F.useLayoutEffect(e);
}
function LS() {
  let { isDataRoute: e } = F.useContext(Zr);
  return e ? QS() : FS();
}
function FS() {
  Lo() || Me(!1);
  let e = F.useContext(Eu),
    { basename: t, future: n, navigator: r } = F.useContext(br),
    { matches: i } = F.useContext(Zr),
    { pathname: a } = ia(),
    o = JSON.stringify(D2(i, n.v7_relativeSplatPath)),
    s = F.useRef(!1);
  return (
    j2(() => {
      s.current = !0;
    }),
    F.useCallback(
      function (u, c) {
        if ((c === void 0 && (c = {}), !s.current)) return;
        if (typeof u == "number") {
          r.go(u);
          return;
        }
        let d = P2(u, JSON.parse(o), a, c.relative === "path");
        e == null &&
          t !== "/" &&
          (d.pathname = d.pathname === "/" ? t : or([t, d.pathname])),
          (c.replace ? r.replace : r.push)(d, c.state, c);
      },
      [t, r, o, a, e]
    )
  );
}
function Cu(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { future: r } = F.useContext(br),
    { matches: i } = F.useContext(Zr),
    { pathname: a } = ia(),
    o = JSON.stringify(D2(i, r.v7_relativeSplatPath));
  return F.useMemo(() => P2(e, JSON.parse(o), a, n === "path"), [e, o, a, n]);
}
function US(e, t) {
  return MS(e, t);
}
function MS(e, t, n, r) {
  Lo() || Me(!1);
  let { navigator: i } = F.useContext(br),
    { matches: a } = F.useContext(Zr),
    o = a[a.length - 1],
    s = o ? o.params : {};
  o && o.pathname;
  let l = o ? o.pathnameBase : "/";
  o && o.route;
  let u = ia(),
    c;
  if (t) {
    var d;
    let C = typeof t == "string" ? ra(t) : t;
    l === "/" || ((d = C.pathname) != null && d.startsWith(l)) || Me(!1),
      (c = C);
  } else c = u;
  let m = c.pathname || "/",
    v = l === "/" ? m : m.slice(l.length) || "/",
    b = dS(e, { pathname: v }),
    _ = WS(
      b &&
        b.map((C) =>
          Object.assign({}, C, {
            params: Object.assign({}, s, C.params),
            pathname: or([
              l,
              i.encodeLocation
                ? i.encodeLocation(C.pathname).pathname
                : C.pathname,
            ]),
            pathnameBase:
              C.pathnameBase === "/"
                ? l
                : or([
                    l,
                    i.encodeLocation
                      ? i.encodeLocation(C.pathnameBase).pathname
                      : C.pathnameBase,
                  ]),
          })
        ),
      a,
      n,
      r
    );
  return t && _
    ? F.createElement(
        Su.Provider,
        {
          value: {
            location: yo(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              c
            ),
            navigationType: Kn.Pop,
          },
        },
        _
      )
    : _;
}
function RS() {
  let e = GS(),
    t = OS(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
      ? e.message
      : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    i = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" },
    a = null;
  return F.createElement(
    F.Fragment,
    null,
    F.createElement("h2", null, "Unexpected Application Error!"),
    F.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? F.createElement("pre", { style: i }, n) : null,
    a
  );
}
const BS = F.createElement(RS, null);
class $S extends F.Component {
  constructor(t) {
    super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ||
      (n.revalidation !== "idle" && t.revalidation === "idle")
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error !== void 0 ? t.error : n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error(
      "React Router caught the following error during render",
      t,
      n
    );
  }
  render() {
    return this.state.error !== void 0
      ? F.createElement(
          Zr.Provider,
          { value: this.props.routeContext },
          F.createElement(O2.Provider, {
            value: this.state.error,
            children: this.props.component,
          })
        )
      : this.props.children;
  }
}
function zS(e) {
  let { routeContext: t, match: n, children: r } = e,
    i = F.useContext(Eu);
  return (
    i &&
      i.static &&
      i.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (i.staticContext._deepestRenderedBoundaryId = n.route.id),
    F.createElement(Zr.Provider, { value: t }, r)
  );
}
function WS(e, t, n, r) {
  var i;
  if (
    (t === void 0 && (t = []),
    n === void 0 && (n = null),
    r === void 0 && (r = null),
    e == null)
  ) {
    var a;
    if ((a = n) != null && a.errors) e = n.matches;
    else return null;
  }
  let o = e,
    s = (i = n) == null ? void 0 : i.errors;
  if (s != null) {
    let c = o.findIndex(
      (d) => d.route.id && (s == null ? void 0 : s[d.route.id])
    );
    c >= 0 || Me(!1), (o = o.slice(0, Math.min(o.length, c + 1)));
  }
  let l = !1,
    u = -1;
  if (n && r && r.v7_partialHydration)
    for (let c = 0; c < o.length; c++) {
      let d = o[c];
      if (
        ((d.route.HydrateFallback || d.route.hydrateFallbackElement) && (u = c),
        d.route.id)
      ) {
        let { loaderData: m, errors: v } = n,
          b =
            d.route.loader &&
            m[d.route.id] === void 0 &&
            (!v || v[d.route.id] === void 0);
        if (d.route.lazy || b) {
          (l = !0), u >= 0 ? (o = o.slice(0, u + 1)) : (o = [o[0]]);
          break;
        }
      }
    }
  return o.reduceRight((c, d, m) => {
    let v,
      b = !1,
      _ = null,
      C = null;
    n &&
      ((v = s && d.route.id ? s[d.route.id] : void 0),
      (_ = d.route.errorElement || BS),
      l &&
        (u < 0 && m === 0
          ? (KS("route-fallback", !1), (b = !0), (C = null))
          : u === m &&
            ((b = !0), (C = d.route.hydrateFallbackElement || null))));
    let x = t.concat(o.slice(0, m + 1)),
      g = () => {
        let w;
        return (
          v
            ? (w = _)
            : b
            ? (w = C)
            : d.route.Component
            ? (w = F.createElement(d.route.Component, null))
            : d.route.element
            ? (w = d.route.element)
            : (w = c),
          F.createElement(zS, {
            match: d,
            routeContext: { outlet: c, matches: x, isDataRoute: n != null },
            children: w,
          })
        );
      };
    return n && (d.route.ErrorBoundary || d.route.errorElement || m === 0)
      ? F.createElement($S, {
          location: n.location,
          revalidation: n.revalidation,
          component: _,
          error: v,
          children: g(),
          routeContext: { outlet: null, matches: x, isDataRoute: !0 },
        })
      : g();
  }, null);
}
var I2 = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      e
    );
  })(I2 || {}),
  _l = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseLoaderData = "useLoaderData"),
      (e.UseActionData = "useActionData"),
      (e.UseRouteError = "useRouteError"),
      (e.UseNavigation = "useNavigation"),
      (e.UseRouteLoaderData = "useRouteLoaderData"),
      (e.UseMatches = "useMatches"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      (e.UseRouteId = "useRouteId"),
      e
    );
  })(_l || {});
function HS(e) {
  let t = F.useContext(Eu);
  return t || Me(!1), t;
}
function qS(e) {
  let t = F.useContext(T2);
  return t || Me(!1), t;
}
function VS(e) {
  let t = F.useContext(Zr);
  return t || Me(!1), t;
}
function L2(e) {
  let t = VS(),
    n = t.matches[t.matches.length - 1];
  return n.route.id || Me(!1), n.route.id;
}
function GS() {
  var e;
  let t = F.useContext(O2),
    n = qS(_l.UseRouteError),
    r = L2(_l.UseRouteError);
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function QS() {
  let { router: e } = HS(I2.UseNavigateStable),
    t = L2(_l.UseNavigateStable),
    n = F.useRef(!1);
  return (
    j2(() => {
      n.current = !0;
    }),
    F.useCallback(
      function (i, a) {
        a === void 0 && (a = {}),
          n.current &&
            (typeof i == "number"
              ? e.navigate(i)
              : e.navigate(i, yo({ fromRouteId: t }, a)));
      },
      [e, t]
    )
  );
}
const Pm = {};
function KS(e, t, n) {
  !t && !Pm[e] && (Pm[e] = !0);
}
function ka(e) {
  Me(!1);
}
function YS(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: i = Kn.Pop,
    navigator: a,
    static: o = !1,
    future: s,
  } = e;
  Lo() && Me(!1);
  let l = t.replace(/^\/*/, "/"),
    u = F.useMemo(
      () => ({
        basename: l,
        navigator: a,
        static: o,
        future: yo({ v7_relativeSplatPath: !1 }, s),
      }),
      [l, s, a, o]
    );
  typeof r == "string" && (r = ra(r));
  let {
      pathname: c = "/",
      search: d = "",
      hash: m = "",
      state: v = null,
      key: b = "default",
    } = r,
    _ = F.useMemo(() => {
      let C = Wi(c, l);
      return C == null
        ? null
        : {
            location: { pathname: C, search: d, hash: m, state: v, key: b },
            navigationType: i,
          };
    }, [l, c, d, m, v, b, i]);
  return _ == null
    ? null
    : F.createElement(
        br.Provider,
        { value: u },
        F.createElement(Su.Provider, { children: n, value: _ })
      );
}
function ZS(e) {
  let { children: t, location: n } = e;
  return US(od(t), n);
}
new Promise(() => {});
function od(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    F.Children.forEach(e, (r, i) => {
      if (!F.isValidElement(r)) return;
      let a = [...t, i];
      if (r.type === F.Fragment) {
        n.push.apply(n, od(r.props.children, a));
        return;
      }
      r.type !== ka && Me(!1), !r.props.index || !r.props.children || Me(!1);
      let o = {
        id: r.props.id || a.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.ErrorBoundary != null || r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (o.children = od(r.props.children, a)), n.push(o);
    }),
    n
  );
}
/**
 * React Router DOM v6.21.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function kl() {
  return (
    (kl = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    kl.apply(this, arguments)
  );
}
function F2(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++)
    (i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function XS(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function JS(e, t) {
  return e.button === 0 && (!t || t === "_self") && !XS(e);
}
const eC = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "unstable_viewTransition",
  ],
  tC = [
    "aria-current",
    "caseSensitive",
    "className",
    "end",
    "style",
    "to",
    "unstable_viewTransition",
    "children",
  ],
  nC = F.createContext({ isTransitioning: !1 }),
  rC = "startTransition",
  Am = Ob[rC];
function iC(e) {
  let { basename: t, children: n, future: r, window: i } = e,
    a = F.useRef();
  a.current == null && (a.current = uS({ window: i, v5Compat: !0 }));
  let o = a.current,
    [s, l] = F.useState({ action: o.action, location: o.location }),
    { v7_startTransition: u } = r || {},
    c = F.useCallback(
      (d) => {
        u && Am ? Am(() => l(d)) : l(d);
      },
      [l, u]
    );
  return (
    F.useLayoutEffect(() => o.listen(c), [o, c]),
    F.createElement(YS, {
      basename: t,
      children: n,
      location: s.location,
      navigationType: s.action,
      navigator: o,
      future: r,
    })
  );
}
const aC =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  oC = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  sC = F.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: i,
        reloadDocument: a,
        replace: o,
        state: s,
        target: l,
        to: u,
        preventScrollReset: c,
        unstable_viewTransition: d,
      } = t,
      m = F2(t, eC),
      { basename: v } = F.useContext(br),
      b,
      _ = !1;
    if (typeof u == "string" && oC.test(u) && ((b = u), aC))
      try {
        let w = new URL(window.location.href),
          E = u.startsWith("//") ? new URL(w.protocol + u) : new URL(u),
          N = Wi(E.pathname, v);
        E.origin === w.origin && N != null
          ? (u = N + E.search + E.hash)
          : (_ = !0);
      } catch {}
    let C = IS(u, { relative: i }),
      x = uC(u, {
        replace: o,
        state: s,
        target: l,
        preventScrollReset: c,
        relative: i,
        unstable_viewTransition: d,
      });
    function g(w) {
      r && r(w), w.defaultPrevented || x(w);
    }
    return F.createElement(
      "a",
      kl({}, m, { href: b || C, onClick: _ || a ? r : g, ref: n, target: l })
    );
  }),
  ln = F.forwardRef(function (t, n) {
    let {
        "aria-current": r = "page",
        caseSensitive: i = !1,
        className: a = "",
        end: o = !1,
        style: s,
        to: l,
        unstable_viewTransition: u,
        children: c,
      } = t,
      d = F2(t, tC),
      m = Cu(l, { relative: d.relative }),
      v = ia(),
      b = F.useContext(T2),
      { navigator: _, basename: C } = F.useContext(br),
      x = b != null && cC(m) && u === !0,
      g = _.encodeLocation ? _.encodeLocation(m).pathname : m.pathname,
      w = v.pathname,
      E =
        b && b.navigation && b.navigation.location
          ? b.navigation.location.pathname
          : null;
    i ||
      ((w = w.toLowerCase()),
      (E = E ? E.toLowerCase() : null),
      (g = g.toLowerCase())),
      E && C && (E = Wi(E, C) || E);
    const N = g !== "/" && g.endsWith("/") ? g.length - 1 : g.length;
    let D = w === g || (!o && w.startsWith(g) && w.charAt(N) === "/"),
      f =
        E != null &&
        (E === g || (!o && E.startsWith(g) && E.charAt(g.length) === "/")),
      k = { isActive: D, isPending: f, isTransitioning: x },
      O = D ? r : void 0,
      I;
    typeof a == "function"
      ? (I = a(k))
      : (I = [
          a,
          D ? "active" : null,
          f ? "pending" : null,
          x ? "transitioning" : null,
        ]
          .filter(Boolean)
          .join(" "));
    let H = typeof s == "function" ? s(k) : s;
    return F.createElement(
      sC,
      kl({}, d, {
        "aria-current": O,
        className: I,
        ref: n,
        style: H,
        to: l,
        unstable_viewTransition: u,
      }),
      typeof c == "function" ? c(k) : c
    );
  });
var sd;
(function (e) {
  (e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState");
})(sd || (sd = {}));
var Tm;
(function (e) {
  (e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration");
})(Tm || (Tm = {}));
function lC(e) {
  let t = F.useContext(Eu);
  return t || Me(!1), t;
}
function uC(e, t) {
  let {
      target: n,
      replace: r,
      state: i,
      preventScrollReset: a,
      relative: o,
      unstable_viewTransition: s,
    } = t === void 0 ? {} : t,
    l = LS(),
    u = ia(),
    c = Cu(e, { relative: o });
  return F.useCallback(
    (d) => {
      if (JS(d, n)) {
        d.preventDefault();
        let m = r !== void 0 ? r : Cl(u) === Cl(c);
        l(e, {
          replace: m,
          state: i,
          preventScrollReset: a,
          relative: o,
          unstable_viewTransition: s,
        });
      }
    },
    [u, l, c, r, i, n, e, a, o, s]
  );
}
function cC(e, t) {
  t === void 0 && (t = {});
  let n = F.useContext(nC);
  n == null && Me(!1);
  let { basename: r } = lC(sd.useViewTransitionState),
    i = Cu(e, { relative: t.relative });
  if (!n.isTransitioning) return !1;
  let a = Wi(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    o = Wi(n.nextLocation.pathname, r) || n.nextLocation.pathname;
  return ad(i.pathname, o) != null || ad(i.pathname, a) != null;
}
const fC = "/assets/chart-966de909.png",
  U2 = "/assets/cndllogo-94bfb0f4.png",
  dC = () => {
    const e = [
        "Utilizing historical and real-time on-chain data about thousands of actively traded tokens.",
        "Automated pattern trading algorithms can generate profit with little or no supervision.",
        "All made possible with $CATE, leveraging blockchain technology for superior performance.",
      ],
      [t, n] = F.useState(e[0]),
      [r, i] = F.useState(!0);
    return (
      F.useEffect(() => {
        const a = setInterval(() => {
          i(!1),
            setTimeout(() => {
              n((o) => {
                const s = (e.indexOf(o) + 1) % e.length;
                return e[s];
              }),
                i(!0);
            }, 500);
        }, 4200);
        return () => clearInterval(a);
      }, []),
      y.jsxs("div", {
        className: "text-white px-4 fadeInUp font-[titan]",
        children: [
          y.jsx("img", {
            src: fC,
            alt: "Candlestick Chart",
            style: {
              maxWidth: "70%",
              height: "auto",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            },
          }),
          y.jsxs("div", {
            className:
              "flex items-center text-left text-xs font-[titan] px-6 mt-4",
            children: [
              y.jsx("img", {
                src: U2,
                alt: "CNDL Logo",
                className: "opacity-50",
                style: { height: "4.5em", marginRight: "8px" },
              }),
              y.jsx("p", {
                className: r ? "fade-in" : "fade-out",
                children: t,
              }),
            ],
          }),
        ],
      })
    );
  },
  hC =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAy0AAAHzCAMAAAAaZQJCAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAqUExURVBQTYuLiP/////3+//k8sXFxJqal25ua+Pj4qiopkJCPtTU05mZlwAAAPBFBWAAAAAOdFJOU/////////////////8ARcDcyAAAAAlwSFlzAAAOwgAADsIBFShKgAAADJVJREFUeF7t1csOZEdyREFSzZ6HpPn/39XG1wPvGOSFUzTbJy4QXgf127+AjlqgpRZoqQVaaoGWWqClFmipBVpqgZZaoKUWaKkFWmqBllqgpRZoqQVaaoGWWqClFmipBVpqgZZaoKUWaKkFWmqBllqgpRZoqQVaf91afvudGdlk3V+3lt//ixnZZJ1aGJBN1qmFAdlknVoYkE3WqYUB2WSdWhiQTdaphQHZZJ1aGJBN1qmFAdlknVoYkE3WqYUB2WSdWhiQTdaphQHZZJ1aGJBN1qmFAdlknVoYkE3WqYUB2WSdWhiQTdaphQHZZJ1aGJBN1qmFAdlknVoYkE3WqYUB2WSdWhiQTdaphQHZZJ1aGJBN1qmFAdlknVoYkE3WqYUB2WSdWhiQTdaphQHZZJ1aGJBN1qmFAdlknVoYkE3WqYUB2WSdWhiQTdaphQHZZJ1aGJBN1qmFAdlknVoYkE3WqYUB2WSdWhiQTdaphQHZZJ1aGj/+4Ff9yO0q2WSdWhp/5A2/ILer5Mk6tTTUcpDbVfJknVoaajnI7Sp5sk4tDbUc5HaVPFmnloZaDnK7Sp6sU0tDLQe5XSVP1qmloZaD3K6SJ+vU0lDLQW5XyZN1ammo5SC3q+TJOrU01HKQ21XyZJ1aGmo5yO0qebJOLQ21HOR2lTxZp5aGWg5yu0qerFNLQy0HuV0lT9appaGWg9yukifr1NJQy0FuV8mTdWppqOUgt6vkyTq1NNRykNtV8mSdWhpqOcjtKnmyTi0NtRzkdpU8WaeWhloOcrtKnqxTS0MtB7ldJU/WqaWhloPcrpIn69TSUMtBblfJk3VqaajlILer5Mk6tTTUcpDbVfJknVoaajnI7Sp5sk4tDbUc5HaVPFmnloZaDnK7Sp6sU0tDLQe5XSVP1qmloZaD3K6SJ+vU0lDLQW5XyZN1ammo5SC3q/y8+Fs+9B21NNRykNu98zMf+o5aGmo5yO3eUct31PJYbveOWr6jlsdyu3fU8h21PJbbvaOW76jlsdzuHbV8Ry2P5XbvqOU7ankst3tHLd9Ry2O53Ttq+Y5aHsvt3lHLd9TyWG73jlq+o5bHcrt31PIdtTyW272jlu+o5bHc7h21fEctj+V276jlO2p5LLd7Ry3fUctjud07avmOWh7L7d5Ry3fU8lhu945avqOWx3K7d9TyHbU8lttVfr/4ez70HbU01HKQ21XyZJ1aGmo5yO0qebJOLQ21HOR2lTxZp5aGWg5yu0qerFNLQy0HuV0lT9appaGWg9yukifr1NJQy0FuV8mTdWppqOUgt6vkyTq1NNRykNtV8mSdWhpqOcjtKnmyTi0NtRzkdpU8WaeWhloOcrtKnqxTS0MtB7ldJU/WqaWhloPcrpIn69TSUMtBblfJk3VqaajlILer5Mk6tTTUcpDbVfJknVoaajnI7Sp5sk4tDbUc5HaVPFmnloZaDnK7Sp6sU0tDLQe5XSVP1qmloZaD3K6SJ+vU0lDLQW5XyZN1ammo5SC3q+TJOrU01HKQ21XyZJ1aGmo5yO0qebJOLQ21HOR2lTxZp5aGWg5yu0qerFNLQy0HuV0lT9appaGWg9yukifr1NJQy0FuV8mTdWppqOUgt6vkybqxWn7memN+/MGv+pHbVTL/OrUwIPOvUwsDMv86tTAg869TCwMy/zq1MCDzr1MLAzL/OrUwIPOvUwsDMv86tTAg869TCwMy/zq1MCDzr1MLAzL/OrUwIPOvUwsDMv86tTAg869TCwMy/zq1MCDzr1MLAzL/OrUwIPOvUwsDMv86tTAg869TCwMy/zq1MCDzr1MLAzL/OrUwIPOvUwsDMv86tTAg869TCwMy/zq1MCDzr1MLAzL/OrUwIPOvUwsDMv86tTAg869TCwMy/zq1MCDzr1MLAzL/OrUwIPOvUwsDMv86tTAg869TCwMy/zq1MCDzr1MLAzL/OrUwIPOv+xPX8o/f/yP//Mm/97dc6gOZf92fuJafeQMfUQu01AIttUBLLdBSC7TUAi21QEst0FILtNQCLbVASy3QUgu01AIttUBLLdBSC7TUAi21QEst0FILtNQCLbVASy3QUgu01AIttUBLLdBSC7TUAi21QOtZLb/yu79RCx9TC7TUAi21QEst0FILtNQCLbVASy3QUgu01AIttUBLLdBSC7TUAi21QEst0FILtNQCLbVASy3QelbLf/928T8poaEWPvaslptf+UdSCx9TC7TUAi21QEst0FILtNQCLbVASy3QUgu01AIttUBLLdBSC7TUAi21QEst0FILtNQCLbVASy3QUgu01AIttUBLLdBSC7TUAi21QEst0FILtNQCrT9xLf/4/T/yz5/8e/+bS30g86/7E9fC/x+Zf51aGJD516mFAZl/nVoYkPnXqYUBmX+dWhiQ+dephQGZf51aGJD516mFAZl/nVoYkPnXqYUBmX+dWhiQ+dephQGZf51aGJD516mFAZl/nVoYkPnXqYUBmX+dWhiQ+dephQGZf51aGJD516mFAZl/nVoYkPnXqYUBmX+dWhiQ+dephQGZf51aGJD516mFAZl/nVoYkPnXqYUBmX+dWhiQ+dephQGZf51aGJD516mFAZl/nVoYkPnXqYUBmX+dWhiQ+dephQGZf51aGJD516mFAZl/nVoYkPnXqYUBmX+dWhiQ+dephQGZf51aGj/+4Ff9yO0qmX/dWC0f+j1DNf7IG35BblfJk3VqaajlILer5Mk6tTTUcpDbVfJknVoaajnI7Sp5sk4tDbUc5HaVPFmnloZaDnK7Sp6sU0tDLQe5XSVP1qmloZaD3K6SJ+vU0lDLQW5XyZN1ammo5SC3q+TJOrU01HKQ21XyZJ1aGmo5yO0qebJOLQ21HOR2lTxZp5aGWg5yu0qerFNLQy0HuV0lT9appaGWg9yukifr1NJQy0FuV8mTdWppqOUgt6vkyTq1NNRykNtV8mSdWhpqOcjtKnmyTi0NtRzkdpU8WaeWhloOcrtKnqxTS0MtB7ldJU/WqaWhloPcrpIn69TSUMtBblfJk3VqaajlILer5Mk6tTTUcpDbVfJknVoaajnI7Sp5sk4tDbUc5HaVPFmnloZaDnK7Sp6sU0tDLQe5XSVP1qmloZaD3K6SJ+vU0lDLQW5X+f3i7/nQd9TSUMtBbvfOz3zoO2ppqOUgt3tHLd9Ry2O53Ttq+Y5aHsvt3lHLd9TyWG73jlq+o5bHcrt31PIdtTyW272jlu+o5bHc7h21fEctj+V276jlO2p5LLd7Ry3fUctjud07avmOWh7L7d5Ry3fU8lhu945avqOWx3K7d9TyHbU8ltu9o5bvqOWx3O4dtXxHLY/ldu+o5TtqeSy3e0ct31HLY7ndO2r5jloey+3eUct31PJYblf5efG3fOg7ammo5SC3q+TJOrU01HKQ21XyZJ1aGmo5yO0qebJOLQ21HOR2lTxZp5aGWg5yu0qerFNLQy0HuV0lT9appaGWg9yukifr1NJQy0FuV8mTdWppqOUgt6vkyTq1NNRykNtV8mSdWhpqOcjtKnmyTi0NtRzkdpU8WaeWhloOcrtKnqxTS0MtB7ldJU/WqaWhloPcrpIn69TSUMtBblfJk3VqaajlILer5Mk6tTTUcpDbVfJknVoaajnI7Sp5sk4tDbUc5HaVPFmnloZaDnK7Sp6sU0tDLQe5XSVP1qmloZaD3K6SJ+vU0lDLQW5XyZN1ammo5SC3q+TJOrU01HKQ21XyZJ1aGmo5yO0qebJOLQ21HOR2lTxZp5aGWg5yu0qerFNLQy0HuV0lT9appaGWg9yukifr1NJQy0FuV8mTdWpp/PiDX/Ujt6tkk3VqYUA2WacWBmSTdWphQDZZpxYGZJN1amFANlmnFgZkk3VqYUA2WacWBmSTdWphQDZZpxYGZJN1amFANlmnFgZkk3VqYUA2WacWBmSTdWphQDZZpxYGZJN1amFANlmnFgZkk3VqYUA2WacWBmSTdWphQDZZpxYGZJN1amFANlmnFgZkk3VqYUA2WacWBmSTdWphQDZZpxYGZJN1amFANlmnFgZkk3VqYUA2WacWBmSTdWphQDZZpxYGZJN1amFANlmnFgZkk3VqYUA2WacWBmSTdWphQDZZpxYGZJN1amFANlmnFgZkk3VqYUA2WffXreW335mRTdb9dWuBX6UWaKkFWmqBllqgpRZoqQVaaoGWWqClFmipBVpqgZZaoKUWaKkFWmqBllqgpRZoqQVaaoGWWqClFmipBVpqgZZaoKUWaKkFWmqBllqgpRZoqQVaaoGWWqClFuj861//B0cQIeie5sjQAAAAAElFTkSuQmCC",
  pC = "/assets/bookicon-7dedbc4a.png",
  mC = () =>
    y.jsxs("div", {
      className: "text-white fadeInUp font-[titan]",
      children: [
        " ",
        y.jsx("h2", {
          className:
            "md:text-4xl text-3xl text-center md:px-14 px-6 md:mt-0 mt-36 opacity-50",
          children: "Trade in profit.",
        }),
        y.jsxs("h2", {
          className: "md:text-5xl text-4xl text-center md:px-14 px-4 fadeInUp",
          children: [
            "Trade with ",
            y.jsx("span", { className: "text-[#019443]", children: "$CATE" }),
          ],
        }),
        y.jsxs("p", {
          className: "px-6 md:px-44 text-left mt-4 font-[titan] fadeInUp",
          children: [
            "A ",
            y.jsx("span", {
              className: "text-[#019443]",
              children: "functional, modern and automated approach to trading",
            }),
            " on-chain. Millions of data points working for you in a matter of seconds.",
          ],
        }),
        y.jsxs("div", {
          className:
            "flex justify-center mt-6 px-4 text-xs md:text-lg font-[titan]",
          children: [
            y.jsx("a", {
              href: "https://app.cateai.xyz/",
              children: y.jsxs("button", {
                className:
                  "bg-black text-white border-2 border-[#00A651] hover:bg-[#04110F] rounded-lg px-4 py-2 mx-2 fadeInUp",
                children: [
                  y.jsx("img", {
                    src: hC,
                    alt: "Candle Icon",
                    className: "inline mr-2",
                    style: { height: "1em", verticalAlign: "middle" },
                  }),
                  "Get Started",
                ],
              }),
            }),
          ],
        }),
      ],
    });
function Om(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function W(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Om(Object(n), !0).forEach(function (r) {
          Ye(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : Om(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function Nl(e) {
  "@babel/helpers - typeof";
  return (
    (Nl =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Nl(e)
  );
}
function gC(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function jm(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      "value" in r && (r.writable = !0),
      Object.defineProperty(e, r.key, r);
  }
}
function yC(e, t, n) {
  return (
    t && jm(e.prototype, t),
    n && jm(e, n),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function Ye(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function f0(e, t) {
  return wC(e) || xC(e, t) || M2(e, t) || SC();
}
function Fo(e) {
  return vC(e) || bC(e) || M2(e) || EC();
}
function vC(e) {
  if (Array.isArray(e)) return ld(e);
}
function wC(e) {
  if (Array.isArray(e)) return e;
}
function bC(e) {
  if (
    (typeof Symbol < "u" && e[Symbol.iterator] != null) ||
    e["@@iterator"] != null
  )
    return Array.from(e);
}
function xC(e, t) {
  var n =
    e == null
      ? null
      : (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (n != null) {
    var r = [],
      i = !0,
      a = !1,
      o,
      s;
    try {
      for (
        n = n.call(e);
        !(i = (o = n.next()).done) && (r.push(o.value), !(t && r.length === t));
        i = !0
      );
    } catch (l) {
      (a = !0), (s = l);
    } finally {
      try {
        !i && n.return != null && n.return();
      } finally {
        if (a) throw s;
      }
    }
    return r;
  }
}
function M2(e, t) {
  if (e) {
    if (typeof e == "string") return ld(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (n === "Object" && e.constructor && (n = e.constructor.name),
      n === "Map" || n === "Set")
    )
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return ld(e, t);
  }
}
function ld(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function EC() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function SC() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Im = function () {},
  d0 = {},
  R2 = {},
  B2 = null,
  $2 = { mark: Im, measure: Im };
try {
  typeof window < "u" && (d0 = window),
    typeof document < "u" && (R2 = document),
    typeof MutationObserver < "u" && (B2 = MutationObserver),
    typeof performance < "u" && ($2 = performance);
} catch {}
var CC = d0.navigator || {},
  Lm = CC.userAgent,
  Fm = Lm === void 0 ? "" : Lm,
  fr = d0,
  De = R2,
  Um = B2,
  ps = $2;
fr.document;
var Fn =
    !!De.documentElement &&
    !!De.head &&
    typeof De.addEventListener == "function" &&
    typeof De.createElement == "function",
  z2 = ~Fm.indexOf("MSIE") || ~Fm.indexOf("Trident/"),
  ms,
  gs,
  ys,
  vs,
  ws,
  An = "___FONT_AWESOME___",
  ud = 16,
  W2 = "fa",
  H2 = "svg-inline--fa",
  Vr = "data-fa-i2svg",
  cd = "data-fa-pseudo-element",
  _C = "data-fa-pseudo-element-pending",
  h0 = "data-prefix",
  p0 = "data-icon",
  Mm = "fontawesome-i2svg",
  kC = "async",
  NC = ["HTML", "HEAD", "STYLE", "SCRIPT"],
  q2 = (function () {
    try {
      return !0;
    } catch {
      return !1;
    }
  })(),
  ke = "classic",
  Ue = "sharp",
  m0 = [ke, Ue];
function Uo(e) {
  return new Proxy(e, {
    get: function (n, r) {
      return r in n ? n[r] : n[ke];
    },
  });
}
var vo = Uo(
    ((ms = {}),
    Ye(ms, ke, {
      fa: "solid",
      fas: "solid",
      "fa-solid": "solid",
      far: "regular",
      "fa-regular": "regular",
      fal: "light",
      "fa-light": "light",
      fat: "thin",
      "fa-thin": "thin",
      fad: "duotone",
      "fa-duotone": "duotone",
      fab: "brands",
      "fa-brands": "brands",
      fak: "kit",
      fakd: "kit",
      "fa-kit": "kit",
      "fa-kit-duotone": "kit",
    }),
    Ye(ms, Ue, {
      fa: "solid",
      fass: "solid",
      "fa-solid": "solid",
      fasr: "regular",
      "fa-regular": "regular",
      fasl: "light",
      "fa-light": "light",
      fast: "thin",
      "fa-thin": "thin",
    }),
    ms)
  ),
  wo = Uo(
    ((gs = {}),
    Ye(gs, ke, {
      solid: "fas",
      regular: "far",
      light: "fal",
      thin: "fat",
      duotone: "fad",
      brands: "fab",
      kit: "fak",
    }),
    Ye(gs, Ue, { solid: "fass", regular: "fasr", light: "fasl", thin: "fast" }),
    gs)
  ),
  bo = Uo(
    ((ys = {}),
    Ye(ys, ke, {
      fab: "fa-brands",
      fad: "fa-duotone",
      fak: "fa-kit",
      fal: "fa-light",
      far: "fa-regular",
      fas: "fa-solid",
      fat: "fa-thin",
    }),
    Ye(ys, Ue, {
      fass: "fa-solid",
      fasr: "fa-regular",
      fasl: "fa-light",
      fast: "fa-thin",
    }),
    ys)
  ),
  DC = Uo(
    ((vs = {}),
    Ye(vs, ke, {
      "fa-brands": "fab",
      "fa-duotone": "fad",
      "fa-kit": "fak",
      "fa-light": "fal",
      "fa-regular": "far",
      "fa-solid": "fas",
      "fa-thin": "fat",
    }),
    Ye(vs, Ue, {
      "fa-solid": "fass",
      "fa-regular": "fasr",
      "fa-light": "fasl",
      "fa-thin": "fast",
    }),
    vs)
  ),
  PC = /fa(s|r|l|t|d|b|k|ss|sr|sl|st)?[\-\ ]/,
  V2 = "fa-layers-text",
  AC =
    /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,
  TC = Uo(
    ((ws = {}),
    Ye(ws, ke, {
      900: "fas",
      400: "far",
      normal: "far",
      300: "fal",
      100: "fat",
    }),
    Ye(ws, Ue, { 900: "fass", 400: "fasr", 300: "fasl", 100: "fast" }),
    ws)
  ),
  G2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  OC = G2.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
  jC = [
    "class",
    "data-prefix",
    "data-icon",
    "data-fa-transform",
    "data-fa-mask",
  ],
  jr = {
    GROUP: "duotone-group",
    SWAP_OPACITY: "swap-opacity",
    PRIMARY: "primary",
    SECONDARY: "secondary",
  },
  xo = new Set();
Object.keys(wo[ke]).map(xo.add.bind(xo));
Object.keys(wo[Ue]).map(xo.add.bind(xo));
var IC = []
    .concat(m0, Fo(xo), [
      "2xs",
      "xs",
      "sm",
      "lg",
      "xl",
      "2xl",
      "beat",
      "border",
      "fade",
      "beat-fade",
      "bounce",
      "flip-both",
      "flip-horizontal",
      "flip-vertical",
      "flip",
      "fw",
      "inverse",
      "layers-counter",
      "layers-text",
      "layers",
      "li",
      "pull-left",
      "pull-right",
      "pulse",
      "rotate-180",
      "rotate-270",
      "rotate-90",
      "rotate-by",
      "shake",
      "spin-pulse",
      "spin-reverse",
      "spin",
      "stack-1x",
      "stack-2x",
      "stack",
      "ul",
      jr.GROUP,
      jr.SWAP_OPACITY,
      jr.PRIMARY,
      jr.SECONDARY,
    ])
    .concat(
      G2.map(function (e) {
        return "".concat(e, "x");
      })
    )
    .concat(
      OC.map(function (e) {
        return "w-".concat(e);
      })
    ),
  $a = fr.FontAwesomeConfig || {};
function LC(e) {
  var t = De.querySelector("script[" + e + "]");
  if (t) return t.getAttribute(e);
}
function FC(e) {
  return e === "" ? !0 : e === "false" ? !1 : e === "true" ? !0 : e;
}
if (De && typeof De.querySelector == "function") {
  var UC = [
    ["data-family-prefix", "familyPrefix"],
    ["data-css-prefix", "cssPrefix"],
    ["data-family-default", "familyDefault"],
    ["data-style-default", "styleDefault"],
    ["data-replacement-class", "replacementClass"],
    ["data-auto-replace-svg", "autoReplaceSvg"],
    ["data-auto-add-css", "autoAddCss"],
    ["data-auto-a11y", "autoA11y"],
    ["data-search-pseudo-elements", "searchPseudoElements"],
    ["data-observe-mutations", "observeMutations"],
    ["data-mutate-approach", "mutateApproach"],
    ["data-keep-original-source", "keepOriginalSource"],
    ["data-measure-performance", "measurePerformance"],
    ["data-show-missing-icons", "showMissingIcons"],
  ];
  UC.forEach(function (e) {
    var t = f0(e, 2),
      n = t[0],
      r = t[1],
      i = FC(LC(n));
    i != null && ($a[r] = i);
  });
}
var Q2 = {
  styleDefault: "solid",
  familyDefault: "classic",
  cssPrefix: W2,
  replacementClass: H2,
  autoReplaceSvg: !0,
  autoAddCss: !0,
  autoA11y: !0,
  searchPseudoElements: !1,
  observeMutations: !0,
  mutateApproach: "async",
  keepOriginalSource: !0,
  measurePerformance: !1,
  showMissingIcons: !0,
};
$a.familyPrefix && ($a.cssPrefix = $a.familyPrefix);
var Hi = W(W({}, Q2), $a);
Hi.autoReplaceSvg || (Hi.observeMutations = !1);
var Q = {};
Object.keys(Q2).forEach(function (e) {
  Object.defineProperty(Q, e, {
    enumerable: !0,
    set: function (n) {
      (Hi[e] = n),
        za.forEach(function (r) {
          return r(Q);
        });
    },
    get: function () {
      return Hi[e];
    },
  });
});
Object.defineProperty(Q, "familyPrefix", {
  enumerable: !0,
  set: function (t) {
    (Hi.cssPrefix = t),
      za.forEach(function (n) {
        return n(Q);
      });
  },
  get: function () {
    return Hi.cssPrefix;
  },
});
fr.FontAwesomeConfig = Q;
var za = [];
function MC(e) {
  return (
    za.push(e),
    function () {
      za.splice(za.indexOf(e), 1);
    }
  );
}
var Bn = ud,
  mn = { size: 16, x: 0, y: 0, rotate: 0, flipX: !1, flipY: !1 };
function RC(e) {
  if (!(!e || !Fn)) {
    var t = De.createElement("style");
    t.setAttribute("type", "text/css"), (t.innerHTML = e);
    for (var n = De.head.childNodes, r = null, i = n.length - 1; i > -1; i--) {
      var a = n[i],
        o = (a.tagName || "").toUpperCase();
      ["STYLE", "LINK"].indexOf(o) > -1 && (r = a);
    }
    return De.head.insertBefore(t, r), e;
  }
}
var BC = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function Eo() {
  for (var e = 12, t = ""; e-- > 0; ) t += BC[(Math.random() * 62) | 0];
  return t;
}
function aa(e) {
  for (var t = [], n = (e || []).length >>> 0; n--; ) t[n] = e[n];
  return t;
}
function g0(e) {
  return e.classList
    ? aa(e.classList)
    : (e.getAttribute("class") || "").split(" ").filter(function (t) {
        return t;
      });
}
function K2(e) {
  return ""
    .concat(e)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function $C(e) {
  return Object.keys(e || {})
    .reduce(function (t, n) {
      return t + "".concat(n, '="').concat(K2(e[n]), '" ');
    }, "")
    .trim();
}
function _u(e) {
  return Object.keys(e || {}).reduce(function (t, n) {
    return t + "".concat(n, ": ").concat(e[n].trim(), ";");
  }, "");
}
function y0(e) {
  return (
    e.size !== mn.size ||
    e.x !== mn.x ||
    e.y !== mn.y ||
    e.rotate !== mn.rotate ||
    e.flipX ||
    e.flipY
  );
}
function zC(e) {
  var t = e.transform,
    n = e.containerWidth,
    r = e.iconWidth,
    i = { transform: "translate(".concat(n / 2, " 256)") },
    a = "translate(".concat(t.x * 32, ", ").concat(t.y * 32, ") "),
    o = "scale("
      .concat((t.size / 16) * (t.flipX ? -1 : 1), ", ")
      .concat((t.size / 16) * (t.flipY ? -1 : 1), ") "),
    s = "rotate(".concat(t.rotate, " 0 0)"),
    l = { transform: "".concat(a, " ").concat(o, " ").concat(s) },
    u = { transform: "translate(".concat((r / 2) * -1, " -256)") };
  return { outer: i, inner: l, path: u };
}
function WC(e) {
  var t = e.transform,
    n = e.width,
    r = n === void 0 ? ud : n,
    i = e.height,
    a = i === void 0 ? ud : i,
    o = e.startCentered,
    s = o === void 0 ? !1 : o,
    l = "";
  return (
    s && z2
      ? (l += "translate("
          .concat(t.x / Bn - r / 2, "em, ")
          .concat(t.y / Bn - a / 2, "em) "))
      : s
      ? (l += "translate(calc(-50% + "
          .concat(t.x / Bn, "em), calc(-50% + ")
          .concat(t.y / Bn, "em)) "))
      : (l += "translate(".concat(t.x / Bn, "em, ").concat(t.y / Bn, "em) ")),
    (l += "scale("
      .concat((t.size / Bn) * (t.flipX ? -1 : 1), ", ")
      .concat((t.size / Bn) * (t.flipY ? -1 : 1), ") ")),
    (l += "rotate(".concat(t.rotate, "deg) ")),
    l
  );
}
var HC = `:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    -webkit-transition-delay: 0s;
            transition-delay: 0s;
    -webkit-transition-duration: 0s;
            transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, none));
          transform: rotate(var(--fa-rotate-angle, none));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;
function Y2() {
  var e = W2,
    t = H2,
    n = Q.cssPrefix,
    r = Q.replacementClass,
    i = HC;
  if (n !== e || r !== t) {
    var a = new RegExp("\\.".concat(e, "\\-"), "g"),
      o = new RegExp("\\--".concat(e, "\\-"), "g"),
      s = new RegExp("\\.".concat(t), "g");
    i = i
      .replace(a, ".".concat(n, "-"))
      .replace(o, "--".concat(n, "-"))
      .replace(s, ".".concat(r));
  }
  return i;
}
var Rm = !1;
function Dc() {
  Q.autoAddCss && !Rm && (RC(Y2()), (Rm = !0));
}
var qC = {
    mixout: function () {
      return { dom: { css: Y2, insertCss: Dc } };
    },
    hooks: function () {
      return {
        beforeDOMElementCreation: function () {
          Dc();
        },
        beforeI2svg: function () {
          Dc();
        },
      };
    },
  },
  Tn = fr || {};
Tn[An] || (Tn[An] = {});
Tn[An].styles || (Tn[An].styles = {});
Tn[An].hooks || (Tn[An].hooks = {});
Tn[An].shims || (Tn[An].shims = []);
var Zt = Tn[An],
  Z2 = [],
  VC = function e() {
    De.removeEventListener("DOMContentLoaded", e),
      (Dl = 1),
      Z2.map(function (t) {
        return t();
      });
  },
  Dl = !1;
Fn &&
  ((Dl = (De.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(
    De.readyState
  )),
  Dl || De.addEventListener("DOMContentLoaded", VC));
function GC(e) {
  Fn && (Dl ? setTimeout(e, 0) : Z2.push(e));
}
function Mo(e) {
  var t = e.tag,
    n = e.attributes,
    r = n === void 0 ? {} : n,
    i = e.children,
    a = i === void 0 ? [] : i;
  return typeof e == "string"
    ? K2(e)
    : "<"
        .concat(t, " ")
        .concat($C(r), ">")
        .concat(a.map(Mo).join(""), "</")
        .concat(t, ">");
}
function Bm(e, t, n) {
  if (e && e[t] && e[t][n]) return { prefix: t, iconName: n, icon: e[t][n] };
}
var QC = function (t, n) {
    return function (r, i, a, o) {
      return t.call(n, r, i, a, o);
    };
  },
  Pc = function (t, n, r, i) {
    var a = Object.keys(t),
      o = a.length,
      s = i !== void 0 ? QC(n, i) : n,
      l,
      u,
      c;
    for (
      r === void 0 ? ((l = 1), (c = t[a[0]])) : ((l = 0), (c = r));
      l < o;
      l++
    )
      (u = a[l]), (c = s(c, t[u], u, t));
    return c;
  };
function KC(e) {
  for (var t = [], n = 0, r = e.length; n < r; ) {
    var i = e.charCodeAt(n++);
    if (i >= 55296 && i <= 56319 && n < r) {
      var a = e.charCodeAt(n++);
      (a & 64512) == 56320
        ? t.push(((i & 1023) << 10) + (a & 1023) + 65536)
        : (t.push(i), n--);
    } else t.push(i);
  }
  return t;
}
function fd(e) {
  var t = KC(e);
  return t.length === 1 ? t[0].toString(16) : null;
}
function YC(e, t) {
  var n = e.length,
    r = e.charCodeAt(t),
    i;
  return r >= 55296 &&
    r <= 56319 &&
    n > t + 1 &&
    ((i = e.charCodeAt(t + 1)), i >= 56320 && i <= 57343)
    ? (r - 55296) * 1024 + i - 56320 + 65536
    : r;
}
function $m(e) {
  return Object.keys(e).reduce(function (t, n) {
    var r = e[n],
      i = !!r.icon;
    return i ? (t[r.iconName] = r.icon) : (t[n] = r), t;
  }, {});
}
function dd(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
    r = n.skipHooks,
    i = r === void 0 ? !1 : r,
    a = $m(t);
  typeof Zt.hooks.addPack == "function" && !i
    ? Zt.hooks.addPack(e, $m(t))
    : (Zt.styles[e] = W(W({}, Zt.styles[e] || {}), a)),
    e === "fas" && dd("fa", t);
}
var bs,
  xs,
  Es,
  vi = Zt.styles,
  ZC = Zt.shims,
  XC =
    ((bs = {}),
    Ye(bs, ke, Object.values(bo[ke])),
    Ye(bs, Ue, Object.values(bo[Ue])),
    bs),
  v0 = null,
  X2 = {},
  J2 = {},
  ew = {},
  tw = {},
  nw = {},
  JC =
    ((xs = {}),
    Ye(xs, ke, Object.keys(vo[ke])),
    Ye(xs, Ue, Object.keys(vo[Ue])),
    xs);
function e_(e) {
  return ~IC.indexOf(e);
}
function t_(e, t) {
  var n = t.split("-"),
    r = n[0],
    i = n.slice(1).join("-");
  return r === e && i !== "" && !e_(i) ? i : null;
}
var rw = function () {
  var t = function (a) {
    return Pc(
      vi,
      function (o, s, l) {
        return (o[l] = Pc(s, a, {})), o;
      },
      {}
    );
  };
  (X2 = t(function (i, a, o) {
    if ((a[3] && (i[a[3]] = o), a[2])) {
      var s = a[2].filter(function (l) {
        return typeof l == "number";
      });
      s.forEach(function (l) {
        i[l.toString(16)] = o;
      });
    }
    return i;
  })),
    (J2 = t(function (i, a, o) {
      if (((i[o] = o), a[2])) {
        var s = a[2].filter(function (l) {
          return typeof l == "string";
        });
        s.forEach(function (l) {
          i[l] = o;
        });
      }
      return i;
    })),
    (nw = t(function (i, a, o) {
      var s = a[2];
      return (
        (i[o] = o),
        s.forEach(function (l) {
          i[l] = o;
        }),
        i
      );
    }));
  var n = "far" in vi || Q.autoFetchSvg,
    r = Pc(
      ZC,
      function (i, a) {
        var o = a[0],
          s = a[1],
          l = a[2];
        return (
          s === "far" && !n && (s = "fas"),
          typeof o == "string" && (i.names[o] = { prefix: s, iconName: l }),
          typeof o == "number" &&
            (i.unicodes[o.toString(16)] = { prefix: s, iconName: l }),
          i
        );
      },
      { names: {}, unicodes: {} }
    );
  (ew = r.names),
    (tw = r.unicodes),
    (v0 = ku(Q.styleDefault, { family: Q.familyDefault }));
};
MC(function (e) {
  v0 = ku(e.styleDefault, { family: Q.familyDefault });
});
rw();
function w0(e, t) {
  return (X2[e] || {})[t];
}
function n_(e, t) {
  return (J2[e] || {})[t];
}
function Ir(e, t) {
  return (nw[e] || {})[t];
}
function iw(e) {
  return ew[e] || { prefix: null, iconName: null };
}
function r_(e) {
  var t = tw[e],
    n = w0("fas", e);
  return (
    t ||
    (n ? { prefix: "fas", iconName: n } : null) || {
      prefix: null,
      iconName: null,
    }
  );
}
function dr() {
  return v0;
}
var b0 = function () {
  return { prefix: null, iconName: null, rest: [] };
};
function ku(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    n = t.family,
    r = n === void 0 ? ke : n,
    i = vo[r][e],
    a = wo[r][e] || wo[r][i],
    o = e in Zt.styles ? e : null;
  return a || o || null;
}
var zm =
  ((Es = {}),
  Ye(Es, ke, Object.keys(bo[ke])),
  Ye(Es, Ue, Object.keys(bo[Ue])),
  Es);
function Nu(e) {
  var t,
    n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    r = n.skipLookups,
    i = r === void 0 ? !1 : r,
    a =
      ((t = {}),
      Ye(t, ke, "".concat(Q.cssPrefix, "-").concat(ke)),
      Ye(t, Ue, "".concat(Q.cssPrefix, "-").concat(Ue)),
      t),
    o = null,
    s = ke;
  (e.includes(a[ke]) ||
    e.some(function (u) {
      return zm[ke].includes(u);
    })) &&
    (s = ke),
    (e.includes(a[Ue]) ||
      e.some(function (u) {
        return zm[Ue].includes(u);
      })) &&
      (s = Ue);
  var l = e.reduce(function (u, c) {
    var d = t_(Q.cssPrefix, c);
    if (
      (vi[c]
        ? ((c = XC[s].includes(c) ? DC[s][c] : c), (o = c), (u.prefix = c))
        : JC[s].indexOf(c) > -1
        ? ((o = c), (u.prefix = ku(c, { family: s })))
        : d
        ? (u.iconName = d)
        : c !== Q.replacementClass &&
          c !== a[ke] &&
          c !== a[Ue] &&
          u.rest.push(c),
      !i && u.prefix && u.iconName)
    ) {
      var m = o === "fa" ? iw(u.iconName) : {},
        v = Ir(u.prefix, u.iconName);
      m.prefix && (o = null),
        (u.iconName = m.iconName || v || u.iconName),
        (u.prefix = m.prefix || u.prefix),
        u.prefix === "far" &&
          !vi.far &&
          vi.fas &&
          !Q.autoFetchSvg &&
          (u.prefix = "fas");
    }
    return u;
  }, b0());
  return (
    (e.includes("fa-brands") || e.includes("fab")) && (l.prefix = "fab"),
    (e.includes("fa-duotone") || e.includes("fad")) && (l.prefix = "fad"),
    !l.prefix &&
      s === Ue &&
      (vi.fass || Q.autoFetchSvg) &&
      ((l.prefix = "fass"),
      (l.iconName = Ir(l.prefix, l.iconName) || l.iconName)),
    (l.prefix === "fa" || o === "fa") && (l.prefix = dr() || "fas"),
    l
  );
}
var i_ = (function () {
    function e() {
      gC(this, e), (this.definitions = {});
    }
    return (
      yC(e, [
        {
          key: "add",
          value: function () {
            for (
              var n = this, r = arguments.length, i = new Array(r), a = 0;
              a < r;
              a++
            )
              i[a] = arguments[a];
            var o = i.reduce(this._pullDefinitions, {});
            Object.keys(o).forEach(function (s) {
              (n.definitions[s] = W(W({}, n.definitions[s] || {}), o[s])),
                dd(s, o[s]);
              var l = bo[ke][s];
              l && dd(l, o[s]), rw();
            });
          },
        },
        {
          key: "reset",
          value: function () {
            this.definitions = {};
          },
        },
        {
          key: "_pullDefinitions",
          value: function (n, r) {
            var i = r.prefix && r.iconName && r.icon ? { 0: r } : r;
            return (
              Object.keys(i).map(function (a) {
                var o = i[a],
                  s = o.prefix,
                  l = o.iconName,
                  u = o.icon,
                  c = u[2];
                n[s] || (n[s] = {}),
                  c.length > 0 &&
                    c.forEach(function (d) {
                      typeof d == "string" && (n[s][d] = u);
                    }),
                  (n[s][l] = u);
              }),
              n
            );
          },
        },
      ]),
      e
    );
  })(),
  Wm = [],
  wi = {},
  Ti = {},
  a_ = Object.keys(Ti);
function o_(e, t) {
  var n = t.mixoutsTo;
  return (
    (Wm = e),
    (wi = {}),
    Object.keys(Ti).forEach(function (r) {
      a_.indexOf(r) === -1 && delete Ti[r];
    }),
    Wm.forEach(function (r) {
      var i = r.mixout ? r.mixout() : {};
      if (
        (Object.keys(i).forEach(function (o) {
          typeof i[o] == "function" && (n[o] = i[o]),
            Nl(i[o]) === "object" &&
              Object.keys(i[o]).forEach(function (s) {
                n[o] || (n[o] = {}), (n[o][s] = i[o][s]);
              });
        }),
        r.hooks)
      ) {
        var a = r.hooks();
        Object.keys(a).forEach(function (o) {
          wi[o] || (wi[o] = []), wi[o].push(a[o]);
        });
      }
      r.provides && r.provides(Ti);
    }),
    n
  );
}
function hd(e, t) {
  for (
    var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), i = 2;
    i < n;
    i++
  )
    r[i - 2] = arguments[i];
  var a = wi[e] || [];
  return (
    a.forEach(function (o) {
      t = o.apply(null, [t].concat(r));
    }),
    t
  );
}
function Gr(e) {
  for (
    var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
    r < t;
    r++
  )
    n[r - 1] = arguments[r];
  var i = wi[e] || [];
  i.forEach(function (a) {
    a.apply(null, n);
  });
}
function On() {
  var e = arguments[0],
    t = Array.prototype.slice.call(arguments, 1);
  return Ti[e] ? Ti[e].apply(null, t) : void 0;
}
function pd(e) {
  e.prefix === "fa" && (e.prefix = "fas");
  var t = e.iconName,
    n = e.prefix || dr();
  if (t)
    return (t = Ir(n, t) || t), Bm(aw.definitions, n, t) || Bm(Zt.styles, n, t);
}
var aw = new i_(),
  s_ = function () {
    (Q.autoReplaceSvg = !1), (Q.observeMutations = !1), Gr("noAuto");
  },
  l_ = {
    i2svg: function () {
      var t =
        arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return Fn
        ? (Gr("beforeI2svg", t), On("pseudoElements2svg", t), On("i2svg", t))
        : Promise.reject("Operation requires a DOM of some kind.");
    },
    watch: function () {
      var t =
          arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
        n = t.autoReplaceSvgRoot;
      Q.autoReplaceSvg === !1 && (Q.autoReplaceSvg = !0),
        (Q.observeMutations = !0),
        GC(function () {
          c_({ autoReplaceSvgRoot: n }), Gr("watch", t);
        });
    },
  },
  u_ = {
    icon: function (t) {
      if (t === null) return null;
      if (Nl(t) === "object" && t.prefix && t.iconName)
        return {
          prefix: t.prefix,
          iconName: Ir(t.prefix, t.iconName) || t.iconName,
        };
      if (Array.isArray(t) && t.length === 2) {
        var n = t[1].indexOf("fa-") === 0 ? t[1].slice(3) : t[1],
          r = ku(t[0]);
        return { prefix: r, iconName: Ir(r, n) || n };
      }
      if (
        typeof t == "string" &&
        (t.indexOf("".concat(Q.cssPrefix, "-")) > -1 || t.match(PC))
      ) {
        var i = Nu(t.split(" "), { skipLookups: !0 });
        return {
          prefix: i.prefix || dr(),
          iconName: Ir(i.prefix, i.iconName) || i.iconName,
        };
      }
      if (typeof t == "string") {
        var a = dr();
        return { prefix: a, iconName: Ir(a, t) || t };
      }
    },
  },
  Ft = {
    noAuto: s_,
    config: Q,
    dom: l_,
    parse: u_,
    library: aw,
    findIconDefinition: pd,
    toHtml: Mo,
  },
  c_ = function () {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      n = t.autoReplaceSvgRoot,
      r = n === void 0 ? De : n;
    (Object.keys(Zt.styles).length > 0 || Q.autoFetchSvg) &&
      Fn &&
      Q.autoReplaceSvg &&
      Ft.dom.i2svg({ node: r });
  };
function Du(e, t) {
  return (
    Object.defineProperty(e, "abstract", { get: t }),
    Object.defineProperty(e, "html", {
      get: function () {
        return e.abstract.map(function (r) {
          return Mo(r);
        });
      },
    }),
    Object.defineProperty(e, "node", {
      get: function () {
        if (Fn) {
          var r = De.createElement("div");
          return (r.innerHTML = e.html), r.children;
        }
      },
    }),
    e
  );
}
function f_(e) {
  var t = e.children,
    n = e.main,
    r = e.mask,
    i = e.attributes,
    a = e.styles,
    o = e.transform;
  if (y0(o) && n.found && !r.found) {
    var s = n.width,
      l = n.height,
      u = { x: s / l / 2, y: 0.5 };
    i.style = _u(
      W(
        W({}, a),
        {},
        {
          "transform-origin": ""
            .concat(u.x + o.x / 16, "em ")
            .concat(u.y + o.y / 16, "em"),
        }
      )
    );
  }
  return [{ tag: "svg", attributes: i, children: t }];
}
function d_(e) {
  var t = e.prefix,
    n = e.iconName,
    r = e.children,
    i = e.attributes,
    a = e.symbol,
    o = a === !0 ? "".concat(t, "-").concat(Q.cssPrefix, "-").concat(n) : a;
  return [
    {
      tag: "svg",
      attributes: { style: "display: none;" },
      children: [
        { tag: "symbol", attributes: W(W({}, i), {}, { id: o }), children: r },
      ],
    },
  ];
}
function x0(e) {
  var t = e.icons,
    n = t.main,
    r = t.mask,
    i = e.prefix,
    a = e.iconName,
    o = e.transform,
    s = e.symbol,
    l = e.title,
    u = e.maskId,
    c = e.titleId,
    d = e.extra,
    m = e.watchable,
    v = m === void 0 ? !1 : m,
    b = r.found ? r : n,
    _ = b.width,
    C = b.height,
    x = i === "fak",
    g = [Q.replacementClass, a ? "".concat(Q.cssPrefix, "-").concat(a) : ""]
      .filter(function (O) {
        return d.classes.indexOf(O) === -1;
      })
      .filter(function (O) {
        return O !== "" || !!O;
      })
      .concat(d.classes)
      .join(" "),
    w = {
      children: [],
      attributes: W(
        W({}, d.attributes),
        {},
        {
          "data-prefix": i,
          "data-icon": a,
          class: g,
          role: d.attributes.role || "img",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 ".concat(_, " ").concat(C),
        }
      ),
    },
    E =
      x && !~d.classes.indexOf("fa-fw")
        ? { width: "".concat((_ / C) * 16 * 0.0625, "em") }
        : {};
  v && (w.attributes[Vr] = ""),
    l &&
      (w.children.push({
        tag: "title",
        attributes: {
          id: w.attributes["aria-labelledby"] || "title-".concat(c || Eo()),
        },
        children: [l],
      }),
      delete w.attributes.title);
  var N = W(
      W({}, w),
      {},
      {
        prefix: i,
        iconName: a,
        main: n,
        mask: r,
        maskId: u,
        transform: o,
        symbol: s,
        styles: W(W({}, E), d.styles),
      }
    ),
    D =
      r.found && n.found
        ? On("generateAbstractMask", N) || { children: [], attributes: {} }
        : On("generateAbstractIcon", N) || { children: [], attributes: {} },
    f = D.children,
    k = D.attributes;
  return (N.children = f), (N.attributes = k), s ? d_(N) : f_(N);
}
function Hm(e) {
  var t = e.content,
    n = e.width,
    r = e.height,
    i = e.transform,
    a = e.title,
    o = e.extra,
    s = e.watchable,
    l = s === void 0 ? !1 : s,
    u = W(
      W(W({}, o.attributes), a ? { title: a } : {}),
      {},
      { class: o.classes.join(" ") }
    );
  l && (u[Vr] = "");
  var c = W({}, o.styles);
  y0(i) &&
    ((c.transform = WC({
      transform: i,
      startCentered: !0,
      width: n,
      height: r,
    })),
    (c["-webkit-transform"] = c.transform));
  var d = _u(c);
  d.length > 0 && (u.style = d);
  var m = [];
  return (
    m.push({ tag: "span", attributes: u, children: [t] }),
    a &&
      m.push({ tag: "span", attributes: { class: "sr-only" }, children: [a] }),
    m
  );
}
function h_(e) {
  var t = e.content,
    n = e.title,
    r = e.extra,
    i = W(
      W(W({}, r.attributes), n ? { title: n } : {}),
      {},
      { class: r.classes.join(" ") }
    ),
    a = _u(r.styles);
  a.length > 0 && (i.style = a);
  var o = [];
  return (
    o.push({ tag: "span", attributes: i, children: [t] }),
    n &&
      o.push({ tag: "span", attributes: { class: "sr-only" }, children: [n] }),
    o
  );
}
var Ac = Zt.styles;
function md(e) {
  var t = e[0],
    n = e[1],
    r = e.slice(4),
    i = f0(r, 1),
    a = i[0],
    o = null;
  return (
    Array.isArray(a)
      ? (o = {
          tag: "g",
          attributes: { class: "".concat(Q.cssPrefix, "-").concat(jr.GROUP) },
          children: [
            {
              tag: "path",
              attributes: {
                class: "".concat(Q.cssPrefix, "-").concat(jr.SECONDARY),
                fill: "currentColor",
                d: a[0],
              },
            },
            {
              tag: "path",
              attributes: {
                class: "".concat(Q.cssPrefix, "-").concat(jr.PRIMARY),
                fill: "currentColor",
                d: a[1],
              },
            },
          ],
        })
      : (o = { tag: "path", attributes: { fill: "currentColor", d: a } }),
    { found: !0, width: t, height: n, icon: o }
  );
}
var p_ = { found: !1, width: 512, height: 512 };
function m_(e, t) {
  !q2 &&
    !Q.showMissingIcons &&
    e &&
    console.error(
      'Icon with name "'.concat(e, '" and prefix "').concat(t, '" is missing.')
    );
}
function gd(e, t) {
  var n = t;
  return (
    t === "fa" && Q.styleDefault !== null && (t = dr()),
    new Promise(function (r, i) {
      if ((On("missingIconAbstract"), n === "fa")) {
        var a = iw(e) || {};
        (e = a.iconName || e), (t = a.prefix || t);
      }
      if (e && t && Ac[t] && Ac[t][e]) {
        var o = Ac[t][e];
        return r(md(o));
      }
      m_(e, t),
        r(
          W(
            W({}, p_),
            {},
            {
              icon:
                Q.showMissingIcons && e ? On("missingIconAbstract") || {} : {},
            }
          )
        );
    })
  );
}
var qm = function () {},
  yd =
    Q.measurePerformance && ps && ps.mark && ps.measure
      ? ps
      : { mark: qm, measure: qm },
  Na = 'FA "6.5.1"',
  g_ = function (t) {
    return (
      yd.mark("".concat(Na, " ").concat(t, " begins")),
      function () {
        return ow(t);
      }
    );
  },
  ow = function (t) {
    yd.mark("".concat(Na, " ").concat(t, " ends")),
      yd.measure(
        "".concat(Na, " ").concat(t),
        "".concat(Na, " ").concat(t, " begins"),
        "".concat(Na, " ").concat(t, " ends")
      );
  },
  E0 = { begin: g_, end: ow },
  Us = function () {};
function Vm(e) {
  var t = e.getAttribute ? e.getAttribute(Vr) : null;
  return typeof t == "string";
}
function y_(e) {
  var t = e.getAttribute ? e.getAttribute(h0) : null,
    n = e.getAttribute ? e.getAttribute(p0) : null;
  return t && n;
}
function v_(e) {
  return (
    e &&
    e.classList &&
    e.classList.contains &&
    e.classList.contains(Q.replacementClass)
  );
}
function w_() {
  if (Q.autoReplaceSvg === !0) return Ms.replace;
  var e = Ms[Q.autoReplaceSvg];
  return e || Ms.replace;
}
function b_(e) {
  return De.createElementNS("http://www.w3.org/2000/svg", e);
}
function x_(e) {
  return De.createElement(e);
}
function sw(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    n = t.ceFn,
    r = n === void 0 ? (e.tag === "svg" ? b_ : x_) : n;
  if (typeof e == "string") return De.createTextNode(e);
  var i = r(e.tag);
  Object.keys(e.attributes || []).forEach(function (o) {
    i.setAttribute(o, e.attributes[o]);
  });
  var a = e.children || [];
  return (
    a.forEach(function (o) {
      i.appendChild(sw(o, { ceFn: r }));
    }),
    i
  );
}
function E_(e) {
  var t = " ".concat(e.outerHTML, " ");
  return (t = "".concat(t, "Font Awesome fontawesome.com ")), t;
}
var Ms = {
  replace: function (t) {
    var n = t[0];
    if (n.parentNode)
      if (
        (t[1].forEach(function (i) {
          n.parentNode.insertBefore(sw(i), n);
        }),
        n.getAttribute(Vr) === null && Q.keepOriginalSource)
      ) {
        var r = De.createComment(E_(n));
        n.parentNode.replaceChild(r, n);
      } else n.remove();
  },
  nest: function (t) {
    var n = t[0],
      r = t[1];
    if (~g0(n).indexOf(Q.replacementClass)) return Ms.replace(t);
    var i = new RegExp("".concat(Q.cssPrefix, "-.*"));
    if ((delete r[0].attributes.id, r[0].attributes.class)) {
      var a = r[0].attributes.class.split(" ").reduce(
        function (s, l) {
          return (
            l === Q.replacementClass || l.match(i)
              ? s.toSvg.push(l)
              : s.toNode.push(l),
            s
          );
        },
        { toNode: [], toSvg: [] }
      );
      (r[0].attributes.class = a.toSvg.join(" ")),
        a.toNode.length === 0
          ? n.removeAttribute("class")
          : n.setAttribute("class", a.toNode.join(" "));
    }
    var o = r.map(function (s) {
      return Mo(s);
    }).join(`
`);
    n.setAttribute(Vr, ""), (n.innerHTML = o);
  },
};
function Gm(e) {
  e();
}
function lw(e, t) {
  var n = typeof t == "function" ? t : Us;
  if (e.length === 0) n();
  else {
    var r = Gm;
    Q.mutateApproach === kC && (r = fr.requestAnimationFrame || Gm),
      r(function () {
        var i = w_(),
          a = E0.begin("mutate");
        e.map(i), a(), n();
      });
  }
}
var S0 = !1;
function uw() {
  S0 = !0;
}
function vd() {
  S0 = !1;
}
var Pl = null;
function Qm(e) {
  if (Um && Q.observeMutations) {
    var t = e.treeCallback,
      n = t === void 0 ? Us : t,
      r = e.nodeCallback,
      i = r === void 0 ? Us : r,
      a = e.pseudoElementsCallback,
      o = a === void 0 ? Us : a,
      s = e.observeMutationsRoot,
      l = s === void 0 ? De : s;
    (Pl = new Um(function (u) {
      if (!S0) {
        var c = dr();
        aa(u).forEach(function (d) {
          if (
            (d.type === "childList" &&
              d.addedNodes.length > 0 &&
              !Vm(d.addedNodes[0]) &&
              (Q.searchPseudoElements && o(d.target), n(d.target)),
            d.type === "attributes" &&
              d.target.parentNode &&
              Q.searchPseudoElements &&
              o(d.target.parentNode),
            d.type === "attributes" &&
              Vm(d.target) &&
              ~jC.indexOf(d.attributeName))
          )
            if (d.attributeName === "class" && y_(d.target)) {
              var m = Nu(g0(d.target)),
                v = m.prefix,
                b = m.iconName;
              d.target.setAttribute(h0, v || c),
                b && d.target.setAttribute(p0, b);
            } else v_(d.target) && i(d.target);
        });
      }
    })),
      Fn &&
        Pl.observe(l, {
          childList: !0,
          attributes: !0,
          characterData: !0,
          subtree: !0,
        });
  }
}
function S_() {
  Pl && Pl.disconnect();
}
function C_(e) {
  var t = e.getAttribute("style"),
    n = [];
  return (
    t &&
      (n = t.split(";").reduce(function (r, i) {
        var a = i.split(":"),
          o = a[0],
          s = a.slice(1);
        return o && s.length > 0 && (r[o] = s.join(":").trim()), r;
      }, {})),
    n
  );
}
function __(e) {
  var t = e.getAttribute("data-prefix"),
    n = e.getAttribute("data-icon"),
    r = e.innerText !== void 0 ? e.innerText.trim() : "",
    i = Nu(g0(e));
  return (
    i.prefix || (i.prefix = dr()),
    t && n && ((i.prefix = t), (i.iconName = n)),
    (i.iconName && i.prefix) ||
      (i.prefix &&
        r.length > 0 &&
        (i.iconName =
          n_(i.prefix, e.innerText) || w0(i.prefix, fd(e.innerText))),
      !i.iconName &&
        Q.autoFetchSvg &&
        e.firstChild &&
        e.firstChild.nodeType === Node.TEXT_NODE &&
        (i.iconName = e.firstChild.data)),
    i
  );
}
function k_(e) {
  var t = aa(e.attributes).reduce(function (i, a) {
      return (
        i.name !== "class" && i.name !== "style" && (i[a.name] = a.value), i
      );
    }, {}),
    n = e.getAttribute("title"),
    r = e.getAttribute("data-fa-title-id");
  return (
    Q.autoA11y &&
      (n
        ? (t["aria-labelledby"] = ""
            .concat(Q.replacementClass, "-title-")
            .concat(r || Eo()))
        : ((t["aria-hidden"] = "true"), (t.focusable = "false"))),
    t
  );
}
function N_() {
  return {
    iconName: null,
    title: null,
    titleId: null,
    prefix: null,
    transform: mn,
    symbol: !1,
    mask: { iconName: null, prefix: null, rest: [] },
    maskId: null,
    extra: { classes: [], styles: {}, attributes: {} },
  };
}
function Km(e) {
  var t =
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : { styleParser: !0 },
    n = __(e),
    r = n.iconName,
    i = n.prefix,
    a = n.rest,
    o = k_(e),
    s = hd("parseNodeAttributes", {}, e),
    l = t.styleParser ? C_(e) : [];
  return W(
    {
      iconName: r,
      title: e.getAttribute("title"),
      titleId: e.getAttribute("data-fa-title-id"),
      prefix: i,
      transform: mn,
      mask: { iconName: null, prefix: null, rest: [] },
      maskId: null,
      symbol: !1,
      extra: { classes: a, styles: l, attributes: o },
    },
    s
  );
}
var D_ = Zt.styles;
function cw(e) {
  var t = Q.autoReplaceSvg === "nest" ? Km(e, { styleParser: !1 }) : Km(e);
  return ~t.extra.classes.indexOf(V2)
    ? On("generateLayersText", e, t)
    : On("generateSvgReplacementMutation", e, t);
}
var hr = new Set();
m0.map(function (e) {
  hr.add("fa-".concat(e));
});
Object.keys(vo[ke]).map(hr.add.bind(hr));
Object.keys(vo[Ue]).map(hr.add.bind(hr));
hr = Fo(hr);
function Ym(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  if (!Fn) return Promise.resolve();
  var n = De.documentElement.classList,
    r = function (d) {
      return n.add("".concat(Mm, "-").concat(d));
    },
    i = function (d) {
      return n.remove("".concat(Mm, "-").concat(d));
    },
    a = Q.autoFetchSvg
      ? hr
      : m0
          .map(function (c) {
            return "fa-".concat(c);
          })
          .concat(Object.keys(D_));
  a.includes("fa") || a.push("fa");
  var o = [".".concat(V2, ":not([").concat(Vr, "])")]
    .concat(
      a.map(function (c) {
        return ".".concat(c, ":not([").concat(Vr, "])");
      })
    )
    .join(", ");
  if (o.length === 0) return Promise.resolve();
  var s = [];
  try {
    s = aa(e.querySelectorAll(o));
  } catch {}
  if (s.length > 0) r("pending"), i("complete");
  else return Promise.resolve();
  var l = E0.begin("onTree"),
    u = s.reduce(function (c, d) {
      try {
        var m = cw(d);
        m && c.push(m);
      } catch (v) {
        q2 || (v.name === "MissingIcon" && console.error(v));
      }
      return c;
    }, []);
  return new Promise(function (c, d) {
    Promise.all(u)
      .then(function (m) {
        lw(m, function () {
          r("active"),
            r("complete"),
            i("pending"),
            typeof t == "function" && t(),
            l(),
            c();
        });
      })
      .catch(function (m) {
        l(), d(m);
      });
  });
}
function P_(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  cw(e).then(function (n) {
    n && lw([n], t);
  });
}
function A_(e) {
  return function (t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      r = (t || {}).icon ? t : pd(t || {}),
      i = n.mask;
    return (
      i && (i = (i || {}).icon ? i : pd(i || {})),
      e(r, W(W({}, n), {}, { mask: i }))
    );
  };
}
var T_ = function (t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      r = n.transform,
      i = r === void 0 ? mn : r,
      a = n.symbol,
      o = a === void 0 ? !1 : a,
      s = n.mask,
      l = s === void 0 ? null : s,
      u = n.maskId,
      c = u === void 0 ? null : u,
      d = n.title,
      m = d === void 0 ? null : d,
      v = n.titleId,
      b = v === void 0 ? null : v,
      _ = n.classes,
      C = _ === void 0 ? [] : _,
      x = n.attributes,
      g = x === void 0 ? {} : x,
      w = n.styles,
      E = w === void 0 ? {} : w;
    if (t) {
      var N = t.prefix,
        D = t.iconName,
        f = t.icon;
      return Du(W({ type: "icon" }, t), function () {
        return (
          Gr("beforeDOMElementCreation", { iconDefinition: t, params: n }),
          Q.autoA11y &&
            (m
              ? (g["aria-labelledby"] = ""
                  .concat(Q.replacementClass, "-title-")
                  .concat(b || Eo()))
              : ((g["aria-hidden"] = "true"), (g.focusable = "false"))),
          x0({
            icons: {
              main: md(f),
              mask: l
                ? md(l.icon)
                : { found: !1, width: null, height: null, icon: {} },
            },
            prefix: N,
            iconName: D,
            transform: W(W({}, mn), i),
            symbol: o,
            title: m,
            maskId: c,
            titleId: b,
            extra: { attributes: g, styles: E, classes: C },
          })
        );
      });
    }
  },
  O_ = {
    mixout: function () {
      return { icon: A_(T_) };
    },
    hooks: function () {
      return {
        mutationObserverCallbacks: function (n) {
          return (n.treeCallback = Ym), (n.nodeCallback = P_), n;
        },
      };
    },
    provides: function (t) {
      (t.i2svg = function (n) {
        var r = n.node,
          i = r === void 0 ? De : r,
          a = n.callback,
          o = a === void 0 ? function () {} : a;
        return Ym(i, o);
      }),
        (t.generateSvgReplacementMutation = function (n, r) {
          var i = r.iconName,
            a = r.title,
            o = r.titleId,
            s = r.prefix,
            l = r.transform,
            u = r.symbol,
            c = r.mask,
            d = r.maskId,
            m = r.extra;
          return new Promise(function (v, b) {
            Promise.all([
              gd(i, s),
              c.iconName
                ? gd(c.iconName, c.prefix)
                : Promise.resolve({
                    found: !1,
                    width: 512,
                    height: 512,
                    icon: {},
                  }),
            ])
              .then(function (_) {
                var C = f0(_, 2),
                  x = C[0],
                  g = C[1];
                v([
                  n,
                  x0({
                    icons: { main: x, mask: g },
                    prefix: s,
                    iconName: i,
                    transform: l,
                    symbol: u,
                    maskId: d,
                    title: a,
                    titleId: o,
                    extra: m,
                    watchable: !0,
                  }),
                ]);
              })
              .catch(b);
          });
        }),
        (t.generateAbstractIcon = function (n) {
          var r = n.children,
            i = n.attributes,
            a = n.main,
            o = n.transform,
            s = n.styles,
            l = _u(s);
          l.length > 0 && (i.style = l);
          var u;
          return (
            y0(o) &&
              (u = On("generateAbstractTransformGrouping", {
                main: a,
                transform: o,
                containerWidth: a.width,
                iconWidth: a.width,
              })),
            r.push(u || a.icon),
            { children: r, attributes: i }
          );
        });
    },
  },
  j_ = {
    mixout: function () {
      return {
        layer: function (n) {
          var r =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : {},
            i = r.classes,
            a = i === void 0 ? [] : i;
          return Du({ type: "layer" }, function () {
            Gr("beforeDOMElementCreation", { assembler: n, params: r });
            var o = [];
            return (
              n(function (s) {
                Array.isArray(s)
                  ? s.map(function (l) {
                      o = o.concat(l.abstract);
                    })
                  : (o = o.concat(s.abstract));
              }),
              [
                {
                  tag: "span",
                  attributes: {
                    class: ["".concat(Q.cssPrefix, "-layers")]
                      .concat(Fo(a))
                      .join(" "),
                  },
                  children: o,
                },
              ]
            );
          });
        },
      };
    },
  },
  I_ = {
    mixout: function () {
      return {
        counter: function (n) {
          var r =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : {},
            i = r.title,
            a = i === void 0 ? null : i,
            o = r.classes,
            s = o === void 0 ? [] : o,
            l = r.attributes,
            u = l === void 0 ? {} : l,
            c = r.styles,
            d = c === void 0 ? {} : c;
          return Du({ type: "counter", content: n }, function () {
            return (
              Gr("beforeDOMElementCreation", { content: n, params: r }),
              h_({
                content: n.toString(),
                title: a,
                extra: {
                  attributes: u,
                  styles: d,
                  classes: ["".concat(Q.cssPrefix, "-layers-counter")].concat(
                    Fo(s)
                  ),
                },
              })
            );
          });
        },
      };
    },
  },
  L_ = {
    mixout: function () {
      return {
        text: function (n) {
          var r =
              arguments.length > 1 && arguments[1] !== void 0
                ? arguments[1]
                : {},
            i = r.transform,
            a = i === void 0 ? mn : i,
            o = r.title,
            s = o === void 0 ? null : o,
            l = r.classes,
            u = l === void 0 ? [] : l,
            c = r.attributes,
            d = c === void 0 ? {} : c,
            m = r.styles,
            v = m === void 0 ? {} : m;
          return Du({ type: "text", content: n }, function () {
            return (
              Gr("beforeDOMElementCreation", { content: n, params: r }),
              Hm({
                content: n,
                transform: W(W({}, mn), a),
                title: s,
                extra: {
                  attributes: d,
                  styles: v,
                  classes: ["".concat(Q.cssPrefix, "-layers-text")].concat(
                    Fo(u)
                  ),
                },
              })
            );
          });
        },
      };
    },
    provides: function (t) {
      t.generateLayersText = function (n, r) {
        var i = r.title,
          a = r.transform,
          o = r.extra,
          s = null,
          l = null;
        if (z2) {
          var u = parseInt(getComputedStyle(n).fontSize, 10),
            c = n.getBoundingClientRect();
          (s = c.width / u), (l = c.height / u);
        }
        return (
          Q.autoA11y && !i && (o.attributes["aria-hidden"] = "true"),
          Promise.resolve([
            n,
            Hm({
              content: n.innerHTML,
              width: s,
              height: l,
              transform: a,
              title: i,
              extra: o,
              watchable: !0,
            }),
          ])
        );
      };
    },
  },
  F_ = new RegExp('"', "ug"),
  Zm = [1105920, 1112319];
function U_(e) {
  var t = e.replace(F_, ""),
    n = YC(t, 0),
    r = n >= Zm[0] && n <= Zm[1],
    i = t.length === 2 ? t[0] === t[1] : !1;
  return { value: fd(i ? t[0] : t), isSecondary: r || i };
}
function Xm(e, t) {
  var n = "".concat(_C).concat(t.replace(":", "-"));
  return new Promise(function (r, i) {
    if (e.getAttribute(n) !== null) return r();
    var a = aa(e.children),
      o = a.filter(function (f) {
        return f.getAttribute(cd) === t;
      })[0],
      s = fr.getComputedStyle(e, t),
      l = s.getPropertyValue("font-family").match(AC),
      u = s.getPropertyValue("font-weight"),
      c = s.getPropertyValue("content");
    if (o && !l) return e.removeChild(o), r();
    if (l && c !== "none" && c !== "") {
      var d = s.getPropertyValue("content"),
        m = ~["Sharp"].indexOf(l[2]) ? Ue : ke,
        v = ~[
          "Solid",
          "Regular",
          "Light",
          "Thin",
          "Duotone",
          "Brands",
          "Kit",
        ].indexOf(l[2])
          ? wo[m][l[2].toLowerCase()]
          : TC[m][u],
        b = U_(d),
        _ = b.value,
        C = b.isSecondary,
        x = l[0].startsWith("FontAwesome"),
        g = w0(v, _),
        w = g;
      if (x) {
        var E = r_(_);
        E.iconName && E.prefix && ((g = E.iconName), (v = E.prefix));
      }
      if (
        g &&
        !C &&
        (!o || o.getAttribute(h0) !== v || o.getAttribute(p0) !== w)
      ) {
        e.setAttribute(n, w), o && e.removeChild(o);
        var N = N_(),
          D = N.extra;
        (D.attributes[cd] = t),
          gd(g, v)
            .then(function (f) {
              var k = x0(
                  W(
                    W({}, N),
                    {},
                    {
                      icons: { main: f, mask: b0() },
                      prefix: v,
                      iconName: w,
                      extra: D,
                      watchable: !0,
                    }
                  )
                ),
                O = De.createElementNS("http://www.w3.org/2000/svg", "svg");
              t === "::before"
                ? e.insertBefore(O, e.firstChild)
                : e.appendChild(O),
                (O.outerHTML = k.map(function (I) {
                  return Mo(I);
                }).join(`
`)),
                e.removeAttribute(n),
                r();
            })
            .catch(i);
      } else r();
    } else r();
  });
}
function M_(e) {
  return Promise.all([Xm(e, "::before"), Xm(e, "::after")]);
}
function R_(e) {
  return (
    e.parentNode !== document.head &&
    !~NC.indexOf(e.tagName.toUpperCase()) &&
    !e.getAttribute(cd) &&
    (!e.parentNode || e.parentNode.tagName !== "svg")
  );
}
function Jm(e) {
  if (Fn)
    return new Promise(function (t, n) {
      var r = aa(e.querySelectorAll("*")).filter(R_).map(M_),
        i = E0.begin("searchPseudoElements");
      uw(),
        Promise.all(r)
          .then(function () {
            i(), vd(), t();
          })
          .catch(function () {
            i(), vd(), n();
          });
    });
}
var B_ = {
    hooks: function () {
      return {
        mutationObserverCallbacks: function (n) {
          return (n.pseudoElementsCallback = Jm), n;
        },
      };
    },
    provides: function (t) {
      t.pseudoElements2svg = function (n) {
        var r = n.node,
          i = r === void 0 ? De : r;
        Q.searchPseudoElements && Jm(i);
      };
    },
  },
  e1 = !1,
  $_ = {
    mixout: function () {
      return {
        dom: {
          unwatch: function () {
            uw(), (e1 = !0);
          },
        },
      };
    },
    hooks: function () {
      return {
        bootstrap: function () {
          Qm(hd("mutationObserverCallbacks", {}));
        },
        noAuto: function () {
          S_();
        },
        watch: function (n) {
          var r = n.observeMutationsRoot;
          e1
            ? vd()
            : Qm(hd("mutationObserverCallbacks", { observeMutationsRoot: r }));
        },
      };
    },
  },
  t1 = function (t) {
    var n = { size: 16, x: 0, y: 0, flipX: !1, flipY: !1, rotate: 0 };
    return t
      .toLowerCase()
      .split(" ")
      .reduce(function (r, i) {
        var a = i.toLowerCase().split("-"),
          o = a[0],
          s = a.slice(1).join("-");
        if (o && s === "h") return (r.flipX = !0), r;
        if (o && s === "v") return (r.flipY = !0), r;
        if (((s = parseFloat(s)), isNaN(s))) return r;
        switch (o) {
          case "grow":
            r.size = r.size + s;
            break;
          case "shrink":
            r.size = r.size - s;
            break;
          case "left":
            r.x = r.x - s;
            break;
          case "right":
            r.x = r.x + s;
            break;
          case "up":
            r.y = r.y - s;
            break;
          case "down":
            r.y = r.y + s;
            break;
          case "rotate":
            r.rotate = r.rotate + s;
            break;
        }
        return r;
      }, n);
  },
  z_ = {
    mixout: function () {
      return {
        parse: {
          transform: function (n) {
            return t1(n);
          },
        },
      };
    },
    hooks: function () {
      return {
        parseNodeAttributes: function (n, r) {
          var i = r.getAttribute("data-fa-transform");
          return i && (n.transform = t1(i)), n;
        },
      };
    },
    provides: function (t) {
      t.generateAbstractTransformGrouping = function (n) {
        var r = n.main,
          i = n.transform,
          a = n.containerWidth,
          o = n.iconWidth,
          s = { transform: "translate(".concat(a / 2, " 256)") },
          l = "translate(".concat(i.x * 32, ", ").concat(i.y * 32, ") "),
          u = "scale("
            .concat((i.size / 16) * (i.flipX ? -1 : 1), ", ")
            .concat((i.size / 16) * (i.flipY ? -1 : 1), ") "),
          c = "rotate(".concat(i.rotate, " 0 0)"),
          d = { transform: "".concat(l, " ").concat(u, " ").concat(c) },
          m = { transform: "translate(".concat((o / 2) * -1, " -256)") },
          v = { outer: s, inner: d, path: m };
        return {
          tag: "g",
          attributes: W({}, v.outer),
          children: [
            {
              tag: "g",
              attributes: W({}, v.inner),
              children: [
                {
                  tag: r.icon.tag,
                  children: r.icon.children,
                  attributes: W(W({}, r.icon.attributes), v.path),
                },
              ],
            },
          ],
        };
      };
    },
  },
  Tc = { x: 0, y: 0, width: "100%", height: "100%" };
function n1(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return (
    e.attributes && (e.attributes.fill || t) && (e.attributes.fill = "black"), e
  );
}
function W_(e) {
  return e.tag === "g" ? e.children : [e];
}
var H_ = {
    hooks: function () {
      return {
        parseNodeAttributes: function (n, r) {
          var i = r.getAttribute("data-fa-mask"),
            a = i
              ? Nu(
                  i.split(" ").map(function (o) {
                    return o.trim();
                  })
                )
              : b0();
          return (
            a.prefix || (a.prefix = dr()),
            (n.mask = a),
            (n.maskId = r.getAttribute("data-fa-mask-id")),
            n
          );
        },
      };
    },
    provides: function (t) {
      t.generateAbstractMask = function (n) {
        var r = n.children,
          i = n.attributes,
          a = n.main,
          o = n.mask,
          s = n.maskId,
          l = n.transform,
          u = a.width,
          c = a.icon,
          d = o.width,
          m = o.icon,
          v = zC({ transform: l, containerWidth: d, iconWidth: u }),
          b = { tag: "rect", attributes: W(W({}, Tc), {}, { fill: "white" }) },
          _ = c.children ? { children: c.children.map(n1) } : {},
          C = {
            tag: "g",
            attributes: W({}, v.inner),
            children: [
              n1(
                W({ tag: c.tag, attributes: W(W({}, c.attributes), v.path) }, _)
              ),
            ],
          },
          x = { tag: "g", attributes: W({}, v.outer), children: [C] },
          g = "mask-".concat(s || Eo()),
          w = "clip-".concat(s || Eo()),
          E = {
            tag: "mask",
            attributes: W(
              W({}, Tc),
              {},
              {
                id: g,
                maskUnits: "userSpaceOnUse",
                maskContentUnits: "userSpaceOnUse",
              }
            ),
            children: [b, x],
          },
          N = {
            tag: "defs",
            children: [
              { tag: "clipPath", attributes: { id: w }, children: W_(m) },
              E,
            ],
          };
        return (
          r.push(N, {
            tag: "rect",
            attributes: W(
              {
                fill: "currentColor",
                "clip-path": "url(#".concat(w, ")"),
                mask: "url(#".concat(g, ")"),
              },
              Tc
            ),
          }),
          { children: r, attributes: i }
        );
      };
    },
  },
  q_ = {
    provides: function (t) {
      var n = !1;
      fr.matchMedia &&
        (n = fr.matchMedia("(prefers-reduced-motion: reduce)").matches),
        (t.missingIconAbstract = function () {
          var r = [],
            i = { fill: "currentColor" },
            a = { attributeType: "XML", repeatCount: "indefinite", dur: "2s" };
          r.push({
            tag: "path",
            attributes: W(
              W({}, i),
              {},
              {
                d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z",
              }
            ),
          });
          var o = W(W({}, a), {}, { attributeName: "opacity" }),
            s = {
              tag: "circle",
              attributes: W(W({}, i), {}, { cx: "256", cy: "364", r: "28" }),
              children: [],
            };
          return (
            n ||
              s.children.push(
                {
                  tag: "animate",
                  attributes: W(
                    W({}, a),
                    {},
                    { attributeName: "r", values: "28;14;28;28;14;28;" }
                  ),
                },
                {
                  tag: "animate",
                  attributes: W(W({}, o), {}, { values: "1;0;1;1;0;1;" }),
                }
              ),
            r.push(s),
            r.push({
              tag: "path",
              attributes: W(
                W({}, i),
                {},
                {
                  opacity: "1",
                  d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z",
                }
              ),
              children: n
                ? []
                : [
                    {
                      tag: "animate",
                      attributes: W(W({}, o), {}, { values: "1;0;0;0;0;1;" }),
                    },
                  ],
            }),
            n ||
              r.push({
                tag: "path",
                attributes: W(
                  W({}, i),
                  {},
                  {
                    opacity: "0",
                    d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z",
                  }
                ),
                children: [
                  {
                    tag: "animate",
                    attributes: W(W({}, o), {}, { values: "0;0;1;1;0;0;" }),
                  },
                ],
              }),
            { tag: "g", attributes: { class: "missing" }, children: r }
          );
        });
    },
  },
  V_ = {
    hooks: function () {
      return {
        parseNodeAttributes: function (n, r) {
          var i = r.getAttribute("data-fa-symbol"),
            a = i === null ? !1 : i === "" ? !0 : i;
          return (n.symbol = a), n;
        },
      };
    },
  },
  G_ = [qC, O_, j_, I_, L_, B_, $_, z_, H_, q_, V_];
o_(G_, { mixoutsTo: Ft });
Ft.noAuto;
Ft.config;
Ft.library;
Ft.dom;
var wd = Ft.parse;
Ft.findIconDefinition;
Ft.toHtml;
var Q_ = Ft.icon;
Ft.layer;
Ft.text;
Ft.counter;
var fw = { exports: {} },
  K_ = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
  Y_ = K_,
  Z_ = Y_;
function dw() {}
function hw() {}
hw.resetWarningCache = dw;
var X_ = function () {
  function e(r, i, a, o, s, l) {
    if (l !== Z_) {
      var u = new Error(
        "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
      );
      throw ((u.name = "Invariant Violation"), u);
    }
  }
  e.isRequired = e;
  function t() {
    return e;
  }
  var n = {
    array: e,
    bigint: e,
    bool: e,
    func: e,
    number: e,
    object: e,
    string: e,
    symbol: e,
    any: e,
    arrayOf: t,
    element: e,
    elementType: e,
    instanceOf: t,
    node: e,
    objectOf: t,
    oneOf: t,
    oneOfType: t,
    shape: t,
    exact: t,
    checkPropTypes: hw,
    resetWarningCache: dw,
  };
  return (n.PropTypes = n), n;
};
fw.exports = X_();
var J_ = fw.exports;
const ue = Rl(J_);
function r1(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Yn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? r1(Object(n), !0).forEach(function (r) {
          bi(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : r1(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function Al(e) {
  "@babel/helpers - typeof";
  return (
    (Al =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    Al(e)
  );
}
function bi(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function ek(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    i,
    a;
  for (a = 0; a < r.length; a++)
    (i = r[a]), !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function tk(e, t) {
  if (e == null) return {};
  var n = ek(e, t),
    r,
    i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      (r = a[i]),
        !(t.indexOf(r) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, r) &&
          (n[r] = e[r]);
  }
  return n;
}
function bd(e) {
  return nk(e) || rk(e) || ik(e) || ak();
}
function nk(e) {
  if (Array.isArray(e)) return xd(e);
}
function rk(e) {
  if (
    (typeof Symbol < "u" && e[Symbol.iterator] != null) ||
    e["@@iterator"] != null
  )
    return Array.from(e);
}
function ik(e, t) {
  if (e) {
    if (typeof e == "string") return xd(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (n === "Object" && e.constructor && (n = e.constructor.name),
      n === "Map" || n === "Set")
    )
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return xd(e, t);
  }
}
function xd(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function ak() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ok(e) {
  var t,
    n = e.beat,
    r = e.fade,
    i = e.beatFade,
    a = e.bounce,
    o = e.shake,
    s = e.flash,
    l = e.spin,
    u = e.spinPulse,
    c = e.spinReverse,
    d = e.pulse,
    m = e.fixedWidth,
    v = e.inverse,
    b = e.border,
    _ = e.listItem,
    C = e.flip,
    x = e.size,
    g = e.rotation,
    w = e.pull,
    E =
      ((t = {
        "fa-beat": n,
        "fa-fade": r,
        "fa-beat-fade": i,
        "fa-bounce": a,
        "fa-shake": o,
        "fa-flash": s,
        "fa-spin": l,
        "fa-spin-reverse": c,
        "fa-spin-pulse": u,
        "fa-pulse": d,
        "fa-fw": m,
        "fa-inverse": v,
        "fa-border": b,
        "fa-li": _,
        "fa-flip": C === !0,
        "fa-flip-horizontal": C === "horizontal" || C === "both",
        "fa-flip-vertical": C === "vertical" || C === "both",
      }),
      bi(t, "fa-".concat(x), typeof x < "u" && x !== null),
      bi(t, "fa-rotate-".concat(g), typeof g < "u" && g !== null && g !== 0),
      bi(t, "fa-pull-".concat(w), typeof w < "u" && w !== null),
      bi(t, "fa-swap-opacity", e.swapOpacity),
      t);
  return Object.keys(E)
    .map(function (N) {
      return E[N] ? N : null;
    })
    .filter(function (N) {
      return N;
    });
}
function sk(e) {
  return (e = e - 0), e === e;
}
function pw(e) {
  return sk(e)
    ? e
    : ((e = e.replace(/[\-_\s]+(.)?/g, function (t, n) {
        return n ? n.toUpperCase() : "";
      })),
      e.substr(0, 1).toLowerCase() + e.substr(1));
}
var lk = ["style"];
function uk(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function ck(e) {
  return e
    .split(";")
    .map(function (t) {
      return t.trim();
    })
    .filter(function (t) {
      return t;
    })
    .reduce(function (t, n) {
      var r = n.indexOf(":"),
        i = pw(n.slice(0, r)),
        a = n.slice(r + 1).trim();
      return i.startsWith("webkit") ? (t[uk(i)] = a) : (t[i] = a), t;
    }, {});
}
function mw(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (typeof t == "string") return t;
  var r = (t.children || []).map(function (l) {
      return mw(e, l);
    }),
    i = Object.keys(t.attributes || {}).reduce(
      function (l, u) {
        var c = t.attributes[u];
        switch (u) {
          case "class":
            (l.attrs.className = c), delete t.attributes.class;
            break;
          case "style":
            l.attrs.style = ck(c);
            break;
          default:
            u.indexOf("aria-") === 0 || u.indexOf("data-") === 0
              ? (l.attrs[u.toLowerCase()] = c)
              : (l.attrs[pw(u)] = c);
        }
        return l;
      },
      { attrs: {} }
    ),
    a = n.style,
    o = a === void 0 ? {} : a,
    s = tk(n, lk);
  return (
    (i.attrs.style = Yn(Yn({}, i.attrs.style), o)),
    e.apply(void 0, [t.tag, Yn(Yn({}, i.attrs), s)].concat(bd(r)))
  );
}
var gw = !1;
try {
  gw = !0;
} catch {}
function fk() {
  if (!gw && console && typeof console.error == "function") {
    var e;
    (e = console).error.apply(e, arguments);
  }
}
function i1(e) {
  if (e && Al(e) === "object" && e.prefix && e.iconName && e.icon) return e;
  if (wd.icon) return wd.icon(e);
  if (e === null) return null;
  if (e && Al(e) === "object" && e.prefix && e.iconName) return e;
  if (Array.isArray(e) && e.length === 2)
    return { prefix: e[0], iconName: e[1] };
  if (typeof e == "string") return { prefix: "fas", iconName: e };
}
function Oc(e, t) {
  return (Array.isArray(t) && t.length > 0) || (!Array.isArray(t) && t)
    ? bi({}, e, t)
    : {};
}
var M = Ha.forwardRef(function (e, t) {
  var n = e.icon,
    r = e.mask,
    i = e.symbol,
    a = e.className,
    o = e.title,
    s = e.titleId,
    l = e.maskId,
    u = i1(n),
    c = Oc("classes", [].concat(bd(ok(e)), bd(a.split(" ")))),
    d = Oc(
      "transform",
      typeof e.transform == "string" ? wd.transform(e.transform) : e.transform
    ),
    m = Oc("mask", i1(r)),
    v = Q_(
      u,
      Yn(
        Yn(Yn(Yn({}, c), d), m),
        {},
        { symbol: i, title: o, titleId: s, maskId: l }
      )
    );
  if (!v) return fk("Could not find icon", u), null;
  var b = v.abstract,
    _ = { ref: t };
  return (
    Object.keys(e).forEach(function (C) {
      M.defaultProps.hasOwnProperty(C) || (_[C] = e[C]);
    }),
    dk(b[0], _)
  );
});
M.displayName = "FontAwesomeIcon";
M.propTypes = {
  beat: ue.bool,
  border: ue.bool,
  beatFade: ue.bool,
  bounce: ue.bool,
  className: ue.string,
  fade: ue.bool,
  flash: ue.bool,
  mask: ue.oneOfType([ue.object, ue.array, ue.string]),
  maskId: ue.string,
  fixedWidth: ue.bool,
  inverse: ue.bool,
  flip: ue.oneOf([!0, !1, "horizontal", "vertical", "both"]),
  icon: ue.oneOfType([ue.object, ue.array, ue.string]),
  listItem: ue.bool,
  pull: ue.oneOf(["right", "left"]),
  pulse: ue.bool,
  rotation: ue.oneOf([0, 90, 180, 270]),
  shake: ue.bool,
  size: ue.oneOf([
    "2xs",
    "xs",
    "sm",
    "lg",
    "xl",
    "2xl",
    "1x",
    "2x",
    "3x",
    "4x",
    "5x",
    "6x",
    "7x",
    "8x",
    "9x",
    "10x",
  ]),
  spin: ue.bool,
  spinPulse: ue.bool,
  spinReverse: ue.bool,
  symbol: ue.oneOfType([ue.bool, ue.string]),
  title: ue.string,
  titleId: ue.string,
  transform: ue.oneOfType([ue.string, ue.object]),
  swapOpacity: ue.bool,
};
M.defaultProps = {
  border: !1,
  className: "",
  mask: null,
  maskId: null,
  fixedWidth: !1,
  inverse: !1,
  flip: !1,
  icon: null,
  listItem: !1,
  pull: null,
  pulse: !1,
  rotation: null,
  size: null,
  spin: !1,
  spinPulse: !1,
  spinReverse: !1,
  beat: !1,
  fade: !1,
  beatFade: !1,
  bounce: !1,
  shake: !1,
  symbol: !1,
  title: "",
  titleId: null,
  transform: null,
  swapOpacity: !1,
};
var dk = mw.bind(null, Ha.createElement),
  hk = {
    prefix: "fab",
    iconName: "discord",
    icon: [
      640,
      512,
      [],
      "f392",
      "M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z",
    ],
  },
  qi = {
    prefix: "fab",
    iconName: "x-twitter",
    icon: [
      512,
      512,
      [],
      "e61b",
      "M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z",
    ],
  },
  pk = {
    prefix: "fab",
    iconName: "git",
    icon: [
      512,
      512,
      [],
      "f1d3",
      "M216.29 158.39H137C97 147.9 6.51 150.63 6.51 233.18c0 30.09 15 51.23 35 61-25.1 23-37 33.85-37 49.21 0 11 4.47 21.14 17.89 26.81C8.13 383.61 0 393.35 0 411.65c0 32.11 28.05 50.82 101.63 50.82 70.75 0 111.79-26.42 111.79-73.18 0-58.66-45.16-56.5-151.63-63l13.43-21.55c27.27 7.58 118.7 10 118.7-67.89 0-18.7-7.73-31.71-15-41.07l37.41-2.84zm-63.42 241.9c0 32.06-104.89 32.1-104.89 2.43 0-8.14 5.27-15 10.57-21.54 77.71 5.3 94.32 3.37 94.32 19.11zm-50.81-134.58c-52.8 0-50.46-71.16 1.2-71.16 49.54 0 50.82 71.16-1.2 71.16zm133.3 100.51v-32.1c26.75-3.66 27.24-2 27.24-11V203.61c0-8.5-2.05-7.38-27.24-16.26l4.47-32.92H324v168.71c0 6.51.4 7.32 6.51 8.14l20.73 2.84v32.1zm52.45-244.31c-23.17 0-36.59-13.43-36.59-36.61s13.42-35.77 36.59-35.77c23.58 0 37 12.62 37 35.77s-13.42 36.61-37 36.61zM512 350.46c-17.49 8.53-43.1 16.26-66.28 16.26-48.38 0-66.67-19.5-66.67-65.46V194.75c0-5.42 1.05-4.06-31.71-4.06V154.5c35.78-4.07 50-22 54.47-66.27h38.63c0 65.83-1.34 61.81 3.26 61.81H501v40.65h-60.56v97.15c0 6.92-4.92 51.41 60.57 26.84z",
    ],
  },
  mk = {
    prefix: "fab",
    iconName: "github",
    icon: [
      496,
      512,
      [],
      "f09b",
      "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z",
    ],
  },
  C0 = {
    prefix: "fab",
    iconName: "youtube",
    icon: [
      576,
      512,
      [61802],
      "f167",
      "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z",
    ],
  },
  Tl = {
    prefix: "fab",
    iconName: "telegram",
    icon: [
      496,
      512,
      [62462, "telegram-plane"],
      "f2c6",
      "M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z",
    ],
  },
  yw = Tl,
  vw = {
    prefix: "fab",
    iconName: "medium",
    icon: [
      640,
      512,
      [62407, "medium-m"],
      "f23a",
      "M180.5,74.262C80.813,74.262,0,155.633,0,256S80.819,437.738,180.5,437.738,361,356.373,361,256,280.191,74.262,180.5,74.262Zm288.25,10.646c-49.845,0-90.245,76.619-90.245,171.095s40.406,171.1,90.251,171.1,90.251-76.619,90.251-171.1H559C559,161.5,518.6,84.908,468.752,84.908Zm139.506,17.821c-17.526,0-31.735,68.628-31.735,153.274s14.2,153.274,31.735,153.274S640,340.631,640,256C640,171.351,625.785,102.729,608.258,102.729Z",
    ],
  },
  ww = vw;
const gk = "/assets/cndlbanner-9bf6f836.png",
  a1 = "/assets/candlemenu-149df181.png",
  o1 = "/assets/candlemenuopen-a86fd8e1.png",
  yk = ({ onClose: e }) =>
    y.jsx("div", {
      className:
        "fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 px-8",
      children: y.jsxs("div", {
        className:
          "bg-[#000706] border-2 border-[#009E3B] rounded-xl p-6 w-full max-w-md",
        children: [
          y.jsx("h2", {
            className: "text-2xl text-white font-bold mb-4 text-center",
            children: "Under Construction",
          }),
          y.jsx("p", {
            className: "text-white text-center font-[titan]",
            children:
              "This page is being set up and will be soon available. Thanks!",
          }),
          y.jsx("div", {
            className: "flex justify-center mt-4",
            children: y.jsx("button", {
              className:
                "text-white bg-[#00A934] hover:bg-green-700 rounded-lg px-4 py-2",
              onClick: e,
              children: "Exit",
            }),
          }),
        ],
      }),
    }),
  Pu = () => {
    const [e, t] = F.useState(!1),
      [n, r] = F.useState(!1),
      i = ia(),
      a = ({ isActive: l }) =>
        i.pathname === "/" && l
          ? "text-green-500 pointer-events-none"
          : l
          ? "text-white underline decoration-white decoration-2 underline-offset-4"
          : "text-white hover:underline hover:decoration-green-500 hover:decoration-2 hover:underline-offset-4",
      o = (l) => {
        t(!1), l.startsWith("http") ? r(!0) : r(!1);
      },
      s = () => r(!1);
    return y.jsxs(y.Fragment, {
      children: [
        y.jsxs("div", {
          className: "header text-white flex justify-between items-center p-4",
          style: {
            height: "100px",
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)",
            position: "sticky",
            top: "0",
            zIndex: 100,
            width: "100%",
          },
          children: [
            y.jsx("div", {
              className: "logo",
              style: { flex: 1 },
              children: y.jsx("img", {
                src: gk,
                alt: "Logo",
                style: { width: "30%" },
              }),
            }),
            y.jsx("button", {
              className: "md:hidden px-3 py-1 z-120",
              onClick: () => t(!e),
              children: y.jsx("img", {
                src: e ? o1 : a1,
                alt: "Menu",
                style: { height: "50px" },
              }),
            }),
            y.jsxs("div", {
              className: `fixed top-0 ${
                e ? "left-0" : "-left-full"
              } w-full h-full bg-black flex flex-col justify-start items-center z-1000 pt-20 pb-10 transition-all duration-300 ease-in-out`,
              children: [
                y.jsx("button", {
                  className:
                    "absolute top-0 right-0 mt-4 mr-4 md:hidden px-3 py-1 z-120",
                  onClick: () => t(!e),
                  children: y.jsx("img", {
                    src: e ? o1 : a1,
                    alt: "Menu",
                    style: { height: "50px" },
                  }),
                }),
                y.jsxs("div", {
                  className: "flex flex-col space-y-6 pt-16 mt-8",
                  children: [
                    y.jsx(ln, {
                      to: "/",
                      className: a,
                      onClick: () => o("/"),
                      children: "HOME",
                    }),
                    y.jsx(ln, {
                      to: "/about",
                      className: a,
                      onClick: () => o("/about"),
                      children: "CNDL",
                    }),
                    y.jsx("span", {
                      className:
                        "text-white text-lg bg-[#00A651] bg-opacity-100 py-1 px-3 rounded-lg",
                      children: y.jsx(ln, {
                        to: "https://app.cndl.ai",
                        className: a,
                        onClick: () => o("https://app.cateai.xyz/"),
                        children: "LAUNCH DAPP",
                      }),
                    }),
                    y.jsx(ln, {
                      to: "/team",
                      className: a,
                      onClick: () => o("/team"),
                      children: "TEAM",
                    }),
                    y.jsx(ln, {
                      to: "/docs",
                      className: a,
                      onClick: () => o("/docs"),
                      children: "DOCS",
                    }),
                  ],
                }),
                y.jsxs("div", {
                  className: "flex mt-14",
                  children: [
                    y.jsx(M, {
                      icon: qi,
                      className: "text-white mx-2",
                      size: "2x",
                    }),
                    y.jsx(M, {
                      icon: Tl,
                      className: "text-white mx-2",
                      size: "2x",
                    }),
                    y.jsx(M, {
                      icon: vw,
                      className: "text-white mx-2",
                      size: "2x",
                    }),
                  ],
                }),
              ],
            }),
            y.jsxs("div", {
              className:
                "navigation hidden md:flex justify-center items-center flex-grow space-x-9 font-[titan] text-xl",
              children: [
                y.jsx(ln, {
                  to: "/",
                  className: a,
                  onClick: () => o("/"),
                  children: "Home",
                }),
                y.jsx(ln, {
                  to: "/about",
                  className: a,
                  onClick: () => o("/about"),
                  children: "About",
                }),
                y.jsx("span", {
                  className:
                    "text-white text-lg bg-[#04110F] bg-opacity-100 p-1 rounded-lg px-4 border-2 border-[#00A651] hover:border-white",
                  children: y.jsx(ln, {
                    to: "https://app.cndl.ai",
                    className: a,
                    onClick: () => o("https://app.cateai.xyz/"),
                    children: "Launch dApp",
                  }),
                }),
                y.jsx(ln, {
                  to: "/team",
                  className: a,
                  onClick: () => o("/team"),
                  children: "Team",
                }),
                y.jsx(ln, {
                  to: "/docs",
                  className: a,
                  onClick: () => o("/docs"),
                  children: "Docs",
                }),
              ],
            }),
            y.jsxs("div", {
              className: "social-icons hidden md:flex",
              style: { flex: 1, justifyContent: "flex-end" },
              children: [
                y.jsx("a", {
                  href: "https://twitter.com/CATTEFI_AI",
                  className: "text-white hover:text-green-500",
                  children: y.jsx(M, {
                    icon: qi,
                    size: "2x",
                    className: "px-2",
                  }),
                }),
                y.jsx("a", {
                  href: "https://t.me/cate_ai_channel",
                  className: "text-white hover:text-green-500",
                  children: y.jsx(M, {
                    icon: Tl,
                    size: "2x",
                    className: "px-2",
                  }),
                }),
              ],
            }),
          ],
        }),
        n && y.jsx(yk, { onClose: s }),
      ],
    });
  };
var vk = {
    prefix: "fas",
    iconName: "bars",
    icon: [
      448,
      512,
      ["navicon"],
      "f0c9",
      "M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z",
    ],
  },
  bw = {
    prefix: "fas",
    iconName: "people-group",
    icon: [
      640,
      512,
      [],
      "e533",
      "M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3V245.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5V416c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V389.2C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112h32c24 0 46.2 7.5 64.4 20.3zM448 416V394.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176h32c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2V416c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3V261.7c-10 11.3-16 26.1-16 42.3zm144-42.3v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2V448c0 17.7-14.3 32-32 32H288c-17.7 0-32-14.3-32-32V405.2c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112h32c61.9 0 112 50.1 112 112z",
    ],
  },
  wk = {
    prefix: "fas",
    iconName: "square-check",
    icon: [
      448,
      512,
      [9745, 9989, 61510, "check-square"],
      "f14a",
      "M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z",
    ],
  },
  jc = wk,
  bk = {
    prefix: "fas",
    iconName: "lock",
    icon: [
      448,
      512,
      [128274],
      "f023",
      "M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z",
    ],
  },
  xw = {
    prefix: "fas",
    iconName: "user-group",
    icon: [
      640,
      512,
      [128101, "user-friends"],
      "f500",
      "M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z",
    ],
  },
  xk = {
    prefix: "fas",
    iconName: "clipboard",
    icon: [
      384,
      512,
      [128203],
      "f328",
      "M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 192H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z",
    ],
  },
  Ek = {
    prefix: "fas",
    iconName: "circle-check",
    icon: [
      512,
      512,
      [61533, "check-circle"],
      "f058",
      "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z",
    ],
  },
  Ic = Ek,
  s1 = {
    prefix: "fas",
    iconName: "suitcase",
    icon: [
      512,
      512,
      [129523],
      "f0f2",
      "M176 56V96H336V56c0-4.4-3.6-8-8-8H184c-4.4 0-8 3.6-8 8zM128 96V56c0-30.9 25.1-56 56-56H328c30.9 0 56 25.1 56 56V96v32V480H128V128 96zM64 96H96V480H64c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64zM448 480H416V96h32c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64z",
    ],
  },
  Sk = {
    prefix: "fas",
    iconName: "shield-halved",
    icon: [
      512,
      512,
      ["shield-alt"],
      "f3ed",
      "M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8V444.8C394 378 431.1 230.1 432 141.4L256 66.8l0 0z",
    ],
  },
  Ck = Sk,
  Ge = {
    prefix: "fas",
    iconName: "square",
    icon: [
      448,
      512,
      [9632, 9723, 9724, 61590],
      "f0c8",
      "M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z",
    ],
  },
  _k = {
    prefix: "fas",
    iconName: "code",
    icon: [
      640,
      512,
      [],
      "f121",
      "M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z",
    ],
  },
  kk = {
    prefix: "fas",
    iconName: "chart-pie",
    icon: [
      576,
      512,
      ["pie-chart"],
      "f200",
      "M304 240V16.6c0-9 7-16.6 16-16.6C443.7 0 544 100.3 544 224c0 9-7.6 16-16.6 16H304zM32 272C32 150.7 122.1 50.3 239 34.3c9.2-1.3 17 6.1 17 15.4V288L412.5 444.5c6.7 6.7 6.2 17.7-1.5 23.1C371.8 495.6 323.8 512 272 512C139.5 512 32 404.6 32 272zm526.4 16c9.3 0 16.6 7.8 15.4 17c-7.7 55.9-34.6 105.6-73.9 142.3c-6 5.6-15.4 5.2-21.2-.7L320 288H558.4z",
    ],
  },
  Nk = {
    prefix: "fas",
    iconName: "chart-line",
    icon: [
      512,
      512,
      ["line-chart"],
      "f201",
      "M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z",
    ],
  },
  Ro = {
    prefix: "fas",
    iconName: "arrow-right",
    icon: [
      448,
      512,
      [8594],
      "f061",
      "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z",
    ],
  },
  Dk = {
    prefix: "fas",
    iconName: "screwdriver-wrench",
    icon: [
      512,
      512,
      ["tools"],
      "f7d9",
      "M78.6 5C69.1-2.4 55.6-1.5 47 7L7 47c-8.5 8.5-9.4 22-2.1 31.6l80 104c4.5 5.9 11.6 9.4 19 9.4h54.1l109 109c-14.7 29-10 65.4 14.3 89.6l112 112c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-112-112c-24.2-24.2-60.6-29-89.6-14.3l-109-109V104c0-7.5-3.5-14.5-9.4-19L78.6 5zM19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L233.7 374.3c-7.8-20.9-9-43.6-3.6-65.1l-61.7-61.7L19.9 396.1zM512 144c0-10.5-1.1-20.7-3.2-30.5c-2.4-11.2-16.1-14.1-24.2-6l-63.9 63.9c-3 3-7.1 4.7-11.3 4.7H352c-8.8 0-16-7.2-16-16V102.6c0-4.2 1.7-8.3 4.7-11.3l63.9-63.9c8.1-8.1 5.2-21.8-6-24.2C388.7 1.1 378.5 0 368 0C288.5 0 224 64.5 224 144l0 .8 85.3 85.3c36-9.1 75.8 .5 104 28.7L429 274.5c49-23 83-72.8 83-130.5zM56 432a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z",
    ],
  },
  Pk = Dk,
  Ak = {
    prefix: "fas",
    iconName: "hand-holding-dollar",
    icon: [
      576,
      512,
      ["hand-holding-usd"],
      "f4c0",
      "M312 24V34.5c6.4 1.2 12.6 2.7 18.2 4.2c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17c-10.9-2.9-21.1-4.9-30.2-5c-7.3-.1-14.7 1.7-19.4 4.4c-2.1 1.3-3.1 2.4-3.5 3c-.3 .5-.7 1.2-.7 2.8c0 .3 0 .5 0 .6c.2 .2 .9 1.2 3.3 2.6c5.8 3.5 14.4 6.2 27.4 10.1l.9 .3c11.1 3.3 25.9 7.8 37.9 15.3c13.7 8.6 26.1 22.9 26.4 44.9c.3 22.5-11.4 38.9-26.7 48.5c-6.7 4.1-13.9 7-21.3 8.8V232c0 13.3-10.7 24-24 24s-24-10.7-24-24V220.6c-9.5-2.3-18.2-5.3-25.6-7.8c-2.1-.7-4.1-1.4-6-2c-12.6-4.2-19.4-17.8-15.2-30.4s17.8-19.4 30.4-15.2c2.6 .9 5 1.7 7.3 2.5c13.6 4.6 23.4 7.9 33.9 8.3c8 .3 15.1-1.6 19.2-4.1c1.9-1.2 2.8-2.2 3.2-2.9c.4-.6 .9-1.8 .8-4.1l0-.2c0-1 0-2.1-4-4.6c-5.7-3.6-14.3-6.4-27.1-10.3l-1.9-.6c-10.8-3.2-25-7.5-36.4-14.4c-13.5-8.1-26.5-22-26.6-44.1c-.1-22.9 12.9-38.6 27.7-47.4c6.4-3.8 13.3-6.4 20.2-8.2V24c0-13.3 10.7-24 24-24s24 10.7 24 24zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5H192 32c-17.7 0-32-14.3-32-32V416c0-17.7 14.3-32 32-32H68.8l44.9-36c22.7-18.2 50.9-28 80-28H272h16 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H288 272c-8.8 0-16 7.2-16 16s7.2 16 16 16H392.6l119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384l0 0-.9 0c.3 0 .6 0 .9 0z",
    ],
  },
  Ew = Ak,
  Tk = {
    prefix: "fas",
    iconName: "coins",
    icon: [
      512,
      512,
      [],
      "f51e",
      "M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2l0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336V300.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4V304v5.7V336zm32 0V304 278.1c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0 432V396.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z",
    ],
  },
  Ok = {
    prefix: "fas",
    iconName: "network-wired",
    icon: [
      640,
      512,
      [],
      "f6ff",
      "M256 64H384v64H256V64zM240 0c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h48v32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96v32H80c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48H240c26.5 0 48-21.5 48-48V368c0-26.5-21.5-48-48-48H192V288H448v32H400c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48H560c26.5 0 48-21.5 48-48V368c0-26.5-21.5-48-48-48H512V288h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V192h48c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H240zM96 448V384H224v64H96zm320-64H544v64H416V384z",
    ],
  },
  jk = {
    prefix: "fas",
    iconName: "arrow-right-arrow-left",
    icon: [
      448,
      512,
      [8644, "exchange"],
      "f0ec",
      "M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z",
    ],
  },
  Sw = jk,
  Au = {
    prefix: "fas",
    iconName: "arrow-down",
    icon: [
      384,
      512,
      [8595],
      "f063",
      "M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z",
    ],
  },
  Ik = {
    prefix: "fas",
    iconName: "link",
    icon: [
      640,
      512,
      [128279, "chain"],
      "f0c1",
      "M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z",
    ],
  },
  Lk = {
    prefix: "fas",
    iconName: "receipt",
    icon: [
      384,
      512,
      [129534],
      "f543",
      "M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.3-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6s14 12.4 14 21.8V488c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6L304 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L192 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488V24C0 14.6 5.5 6.1 14 2.2zM96 144c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96zM80 352c0 8.8 7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96c-8.8 0-16 7.2-16 16zM96 240c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96z",
    ],
  },
  Fk = {
    prefix: "fas",
    iconName: "xmark",
    icon: [
      384,
      512,
      [
        128473,
        10005,
        10006,
        10060,
        215,
        "close",
        "multiply",
        "remove",
        "times",
      ],
      "f00d",
      "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z",
    ],
  },
  Uk = Fk,
  Mk = {
    prefix: "fas",
    iconName: "rotate",
    icon: [
      512,
      512,
      [128260, "sync-alt"],
      "f2f1",
      "M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z",
    ],
  },
  Rk = Mk,
  l1 = {
    prefix: "fas",
    iconName: "book",
    icon: [
      448,
      512,
      [128212],
      "f02d",
      "M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z",
    ],
  },
  Bk = {
    prefix: "fas",
    iconName: "video",
    icon: [
      576,
      512,
      ["video-camera"],
      "f03d",
      "M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z",
    ],
  };
const $k = "/assets/cndlpattern-cf0399bc.png",
  zk = "/assets/moralis-c7e6096e.png",
  Wk = "/assets/chainstack-2627060e.png",
  Hk = () =>
    y.jsx("div", {
      children: y.jsxs("div", {
        className:
          "flex flex-col md:flex-row justify-center items-center text-white  font-[titan]",
        children: [
          y.jsx("div", {
            className: "md:flex-1 flex justify-center items-center p-4",
            children: y.jsx("img", {
              src: $k,
              alt: "CNDL Pattern",
              className: "opacity-70",
              style: {
                maxWidth: "90%",
                maxHeight: "500px",
                width: "auto",
                height: "auto",
              },
            }),
          }),
          y.jsxs("div", {
            className:
              "md:flex-1 flex flex-col justify-center items-center text-left md:w-full lg:w-3/4 px-5",
            children: [
              y.jsxs("h2", {
                className: "text-4xl mt-4 text-center",
                children: [
                  "Algorithmic trading. ",
                  y.jsx("div", {
                    className: "opacity-50 text-base",
                    children: "Every trade optimized. All in one.",
                  }),
                ],
              }),
              y.jsxs("p", {
                className:
                  "font-[titan] text-xs md:text-sm mt-6 lg:text-base px-4",
                children: [
                  y.jsx("div", {
                    className: "opacity-50 text-xs",
                    children:
                      "A comprehensive solution to the problems of volatile trading.",
                  }),
                  "Analytics combined with real-time on-chain data are used as building blocks to put together unique and powerful trading algorithms. Automated systems fetch and processes vast amounts of information to identify profitable trading opportunities with precision, speed, and certainty.",
                  y.jsx("br", {}),
                  y.jsx("br", {}),
                  y.jsx(M, { icon: Rk, className: "text-[#00A651] mr-2" }),
                  "Our algorithms execute trade strategies that capitalize on market movements before they are reflected in any trading tool or chart. With optimal PnL and portfolio tracking included, ",
                  y.jsx("span", {
                    className: "text-[#019443]",
                    children:
                      "$CATE is the only tool you need to trade in profit.",
                  }),
                ],
              }),
              y.jsxs("div", {
                className: "flex justify-around items-center w-full mt-8",
                children: [
                  y.jsxs("div", {
                    className: "flex flex-col items-center",
                    children: [
                      y.jsx(M, {
                        icon: Ck,
                        size: "2x",
                        className: "text-[#00A651] mb-2",
                      }),
                      y.jsx("p", {
                        className: "text-xs text-center",
                        children: "On-chain Integrity",
                      }),
                    ],
                  }),
                  y.jsxs("div", {
                    className: "flex flex-col items-center",
                    children: [
                      y.jsx(M, {
                        icon: Lk,
                        size: "2x",
                        className: "text-[#00A651] mb-2",
                      }),
                      y.jsx("p", {
                        className: "text-xs text-center",
                        children: "NFT Receipts",
                      }),
                    ],
                  }),
                  y.jsxs("div", {
                    className: "flex flex-col items-center",
                    children: [
                      y.jsx(M, {
                        icon: Ew,
                        size: "2x",
                        className: "text-[#00A651] mb-2",
                      }),
                      y.jsx("p", {
                        className: "text-xs text-center",
                        children: "Transparent Returns",
                      }),
                    ],
                  }),
                ],
              }),
              y.jsx("p", {
                className: "text-lg mt-8 mb-2 px-4 opacity-50",
                children: "powered by",
              }),
              y.jsxs("div", {
                className: "flex justify-center items-center",
                children: [
                  y.jsx("img", {
                    src: zk,
                    alt: "Moralis Logo",
                    className: "md:h-14 h-9 mx-4 opacity-70",
                  }),
                  y.jsx("img", {
                    src: Wk,
                    alt: "Chainstack Logo",
                    className: "md:h-14 h-9 mx-4 opacity-70",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    }),
  qk = "/assets/cndltokens-7cc1e18e.png",
  Vk = () => {
    const e = (t) => {
      navigator.clipboard.writeText(t).then(
        () => {
          alert("Contract address copied to clipboard!");
        },
        (n) => {
          console.error("Could not copy text: ", n);
        }
      );
    };
    return y.jsxs("div", {
      className: "tokenomics text-white p-8 px-6 md:px-24 font-[titan]",
      children: [
        y.jsxs("h2", {
          className: "text-4xl text-center mb-14",
          children: [
            "Tokenomics.",
            y.jsx("div", {
              className: "opacity-50 text-base",
              children: "Foundation of the project.",
            }),
          ],
        }),
        y.jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-center",
          children: [
            y.jsxs("div", {
              className:
                "token-section flex flex-col items-center text-xs md:text-sm px-8 md:px-14",
              children: [
                y.jsx(M, {
                  icon: Tk,
                  size: "3x",
                  className: "text-[#00A651] mb-2",
                }),
                y.jsx("h3", { className: "text-xl mb-2", children: "Supply" }),
                y.jsxs("p", {
                  className: "font-[light]",
                  children: [
                    "The ",
                    y.jsx("b", { children: "$CATE token" }),
                    " supports the foundations of the project with a total supply of 100 million tokens, of which ",
                    y.jsx("b", { children: "90 million" }),
                    " are put into immediate circulation.",
                  ],
                }),
              ],
            }),
            y.jsxs("div", {
              className:
                "token-section flex flex-col items-center text-xs md:text-sm px-8 md:px-14",
              children: [
                y.jsx(M, {
                  icon: kk,
                  size: "3x",
                  className: "text-[#00A651] mb-2",
                }),
                y.jsx("h3", {
                  className: "text-xl mb-2",
                  children: "Allocation",
                }),
                y.jsxs("p", {
                  className: "font-[light]",
                  children: [
                    y.jsx("b", { children: "90% of the supply" }),
                    " is sent out to circulation, while ",
                    y.jsx("b", { children: "8%" }),
                    " of the supply is reserved for CEX liquidity and the remaining ",
                    y.jsx("b", { children: "2%" }),
                    " for staking rewards.",
                  ],
                }),
              ],
            }),
            y.jsxs("div", {
              className:
                "token-section flex flex-col items-center text-xs md:text-sm px-8 md:px-14",
              children: [
                y.jsx(M, {
                  icon: Pk,
                  size: "3x",
                  className: "text-[#00A651] mb-2",
                }),
                y.jsx("h3", { className: "text-xl mb-2", children: "Utility" }),
                y.jsx("p", {
                  className: "font-[light]",
                  children:
                    "Staking, premium access and platform tiers with reduced fees. Earn through a fee-free airdrop system and on-chain staking. Access to exclusive events.",
                }),
              ],
            }),
          ],
        }),
        y.jsxs("div", {
          className: "flex flex-col md:flex-row items-center mt-1",
          children: [
            y.jsxs("div", {
              className: "flex-1 text-left px-4",
              children: [
                y.jsxs("div", {
                  className: "flex justify-center items-center my-4",
                  children: [
                    y.jsx("span", { className: "mr-2", children: "CA:" }),
                    y.jsxs("div", {
                      className:
                        "bg-green-100 text-green-800 px-4 py-2 rounded-l-lg border border-green-600 md:flex md:items-center text-xs md:text-base",
                      children: [
                        y.jsx("span", {
                          className: "hidden md:inline",
                          children: "0x00000000000000000000000000000000000000",
                        }),
                        y.jsx("div", {
                          className: "md:hidden",
                          children: "0x6EFb32bc7893b79360",
                        }),
                        y.jsx("div", {
                          className: "md:hidden",
                          children: "3E39643D86594CE3638157",
                        }),
                      ],
                    }),
                    y.jsx("button", {
                      onClick: () =>
                        e("0x00000000000000000000000000000000000000"),
                      className:
                        "bg-green-600 hover:bg-green-700 text-white md:px-3 md:py-2 px-1 py-3 rounded-r-lg border border-green-600 transition duration-300 ease-in-out",
                      children: y.jsx(M, { icon: xk }),
                    }),
                  ],
                }),
                y.jsxs("p", {
                  className: "font-[light] mt-6 text-xs md:text-sm",
                  children: [
                    "The dynamics of $CATE tokenomics are tailored to ",
                    y.jsx("b", {
                      children:
                        "encourage stable growth and rewards all holders",
                    }),
                    ", those staking and not. The viewpoint of sustainably growing the project is also taken into account, with ",
                    y.jsx("b", {
                      children:
                        "supply reserved for upcoming Tier 1 CEX listings and to kickstart the staking pool",
                    }),
                    ", which will then be filled with regular buybacks.",
                  ],
                }),
                y.jsxs("p", {
                  className: "font-[light] mt-6 text-xs md:text-sm",
                  children: [
                    "The $CATE token ",
                    y.jsx("b", { children: "acts as your key to access all" }),
                    " the trading platform and the wider ecosystem has to offer. Tier access to the platform ensures a zero-fee experience, in other words allowing you to ",
                    y.jsx("b", {
                      children:
                        "use the automated trading systems for no other costs than gas and trading fees.",
                    }),
                  ],
                }),
                y.jsxs("p", {
                  className: "font-[light] mt-6 text-xs md:text-sm",
                  children: [
                    "Our contract is fully open-sourced and audited, built up to ",
                    y.jsx("b", {
                      children:
                        "the highest standard with latest libraries and field-tested",
                    }),
                    " on the testnet. The token can be traded on Uniswap V2 through any DEX or trade tool of your choice, ",
                    y.jsx("b", {
                      children:
                        "while the liquidity for trading is safely and contractually locked for a half a year and beyond.",
                    }),
                  ],
                }),
                y.jsxs("div", {
                  className: "grid grid-cols-2 gap-4 mt-8 mb-8 text-center",
                  children: [
                    y.jsxs("div", {
                      className:
                        "token-section flex flex-col items-center text-xs md:text-sm px-2 md:px-0",
                      children: [
                        y.jsx(M, {
                          icon: Ew,
                          size: "3x",
                          className: "text-[#00A651] mb-2",
                        }),
                        y.jsx("h3", {
                          className: "text-xl mb-2",
                          children: "Buy / Sell Tax 5%",
                        }),
                        y.jsx("p", {
                          className: "font-[light]",
                          children:
                            "A third each for buybacks, development, and reserve liquidity. Transparent usage.",
                        }),
                      ],
                    }),
                    y.jsxs("div", {
                      className:
                        "token-section flex flex-col items-center text-xs md:text-sm px-2 md:px-0",
                      children: [
                        y.jsx(M, {
                          icon: bk,
                          size: "3x",
                          className: "text-[#00A651] mb-2",
                        }),
                        y.jsx("h3", {
                          className: "text-xl mb-2",
                          children: "LP Burnt",
                        }),
                        y.jsx("p", {
                          className: "font-[light]",
                          children:
                            "To ensure trust and security, the LP is burnt securely and will be extended.",
                        }),
                      ],
                    }),
                  ],
                }),
                y.jsxs("div", {
                  className:
                    "grid grid-cols-2 gap-2 md:grid-cols-4 md:justify-center mt-6 px-4 text-xs md:text-lg mb-6",
                  children: [
                    y.jsx("a", {
                      href: "https://www.dextools.io/app/en/ether/pair-explorer/0xbeda23eee41163f686ca875f0974e789362fded5?t=1715101015345",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      children: y.jsxs("button", {
                        className:
                          "bg-black text-white border-2 border-green-600 hover:bg-green-600 rounded-lg px-4 py-2 transition duration-300 ease-in-out w-full",
                        children: [
                          y.jsx(M, {
                            icon: Nk,
                            className: "inline mr-2 align-middle",
                          }),
                          "Chart",
                        ],
                      }),
                    }),
                    y.jsx("a", {
                      href: "https://app.uniswap.org/swap?outputCurrency=0x00000000000000000000000000000000000000&use=V2&chain=ethereum",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      children: y.jsxs("button", {
                        className:
                          "bg-green-600 text-white border-2 border-green-600 hover:border-white hover:bg-black rounded-lg px-4 py-2 transition duration-300 ease-in-out w-full",
                        children: [
                          y.jsx(M, {
                            icon: Sw,
                            className: "inline mr-2 align-middle",
                          }),
                          "Swap",
                        ],
                      }),
                    }),
                    y.jsx("a", {
                      href: "https://etherscan.io/address/0x00000000000000000000000000000000000000",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      children: y.jsx("button", {
                        className:
                          "bg-black text-white border-2 border-green-600 hover:bg-green-600 rounded-lg px-4 py-2 transition duration-300 ease-in-out w-full",
                        children: "Contract",
                      }),
                    }),
                    y.jsx("a", {
                      href: "https://www.team.finance/view-coin/0x00000000000000000000000000000000000000?name=CandleAI&symbol=CNDL&chainid=0x1",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      children: y.jsx("button", {
                        className:
                          "bg-green-600 text-white border-2 border-green-600 hover:border-white hover:bg-black rounded-lg px-4 py-2 transition duration-300 ease-in-out w-full",
                        children: "LP Lock",
                      }),
                    }),
                  ],
                }),
              ],
            }),
            y.jsx("div", {
              className: "flex-1 px-4 mx-auto",
              children: y.jsx("img", {
                src: qk,
                alt: "CNDL Tokens",
                style: {
                  maxWidth: "70%",
                  height: "auto",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                },
              }),
            }),
          ],
        }),
      ],
    });
  },
  Gk = "/assets/cndlroadmap-41e3b59e.png",
  Qk = () =>
    y.jsxs("div", {
      className:
        "roadmap text-white py-10 flex flex-col md:flex-row font-[titan]",
      children: [
        y.jsx("div", {
          className: "flex-1",
          children: y.jsx("img", {
            src: Gk,
            alt: "Candle Roadmap",
            className: "w-full h-auto",
          }),
        }),
        y.jsxs("div", {
          className: "flex-1 flex flex-col justify-center px-14",
          children: [
            y.jsxs("h2", {
              className: "text-center text-4xl mb-6",
              children: [
                "Roadmap.",
                y.jsx("div", {
                  className: "opacity-50 text-base",
                  children: "Planning and execution in consistence.",
                }),
              ],
            }),
            y.jsxs("ul", {
              className: "list-none space-y-6",
              children: [
                y.jsxs("li", {
                  children: [
                    y.jsx("h3", {
                      className: "text-3xl text-[#00A651] ",
                      children: "Q2 2024",
                    }),
                    y.jsxs("p", {
                      className:
                        "font-[titan] text-xs md:text-sm lg:text-base px-4",
                      children: [
                        y.jsx(M, {
                          icon: Ge,
                          className: "inline mr-2 align-middle text-green-500",
                        }),
                        "Open Beta Launch. Reveals of the core team members and advisors. Development Blog, Spaces on X and more launched and kept weekly. Development ongoing. Launch of staking.",
                      ],
                    }),
                  ],
                }),
                y.jsxs("li", {
                  children: [
                    y.jsx("h3", {
                      className: "text-3xl opacity-70",
                      children: "Q3 2025",
                    }),
                    y.jsxs("p", {
                      className:
                        "font-[light] text-xs md:text-sm lg:text-base px-4 opacity-70",
                      children: [
                        y.jsx(M, {
                          icon: Ge,
                          className: "inline mr-2 align-middle text-green-500",
                        }),
                        "Launch of Revenue Share. Expansion of platform capabilities and addition of new features. Scaling up operations. Marketing, conferences, new product launches to form the $CATE ecosystem.",
                      ],
                    }),
                  ],
                }),
                y.jsxs("li", {
                  children: [
                    y.jsx("h3", {
                      className: "text-3xl opacity-70",
                      children: "Q4 2025",
                    }),
                    y.jsxs("p", {
                      className:
                        "font-[light] text-xs md:text-sm lg:text-base px-4 opacity-70",
                      children: [
                        y.jsx(M, {
                          icon: Ge,
                          className: "inline mr-2 align-middle text-green-500",
                        }),
                        "Ecosystem expansion by enhancing user experience with UX and QoL updates, expanding the core developer team and onboarding more high-profile advisors. Global events for holders and conferences. ",
                      ],
                    }),
                  ],
                }),
                y.jsxs("li", {
                  children: [
                    y.jsx("h3", {
                      className: "text-3xl opacity-70",
                      children: "Q1 2025",
                    }),
                    y.jsxs("p", {
                      className:
                        "font-[light] text-xs md:text-sm lg:text-base px-4 opacity-70",
                      children: [
                        y.jsx(M, {
                          icon: Ge,
                          className: "inline mr-2 align-middle text-green-500",
                        }),
                        "To be announced. We will leave some room for dreaming.",
                      ],
                    }),
                  ],
                }),
              ],
            }),
            y.jsx("p", {
              className:
                "text-white font-[titan] text-xs md:text-base mt-14 px-6 mb-2",
              children: "Interested in being part of the journey?",
            }),
            y.jsxs("div", {
              className:
                "grid grid-cols-2 gap-2 md:grid-cols-4 md:justify-center px-4 text-xs md:text-lg mb-6",
              children: [
                y.jsx("button", {
                  className:
                    "bg-black text-white border-2 border-green-600 hover:bg-green-600 rounded-lg px-4 py-2 transition duration-300 ease-in-out",
                  children: y.jsxs("a", {
                    href: "https://cndl.ai/team",
                    children: [
                      y.jsx(M, {
                        className: "inline mr-2 align-middle",
                      }),
                      "Go to App",
                    ],
                  }),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  Kk = () =>
    y.jsxs("div", {
      className: "final-section text-white py-10 text-center font-[titan]",
      children: [
        y.jsx("h2", {
          className: "text-4xl font-bold mb-4",
          children: "Join our Community",
        }),
        y.jsx("p", {
          className: "text-xl mb-8 font-[titan]",
          children:
            "Stay updated with the latest news and participate in our community events.",
        }),
        y.jsxs("div", {
          className:
            "flex flex-col md:flex-row justify-center items-start md:space-x-10",
          children: [
            y.jsxs("div", {
              className: "flex flex-col items-center space-y-4 mb-6 md:mb-0",
              children: [
                y.jsx("a", {
                  href: "https://t.me/cate_ai_channel",
                  target: "_blank",
                  rel: "noreferrer",
                  children: y.jsxs("button", {
                    className:
                      "bg-[#009C47] hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full md:w-64 flex items-center space-x-3",
                    children: [
                      y.jsx(M, { icon: yw, size: "2x", className: "ml-4" }),
                      y.jsx("span", {
                        className: "flex-1 text-left",
                        children: "Telegram",
                      }),
                    ],
                  }),
                }),
                y.jsx("a", {
                  href: "https://twitter.com/CATTEFI_AI",
                  target: "_blank",
                  rel: "noreferrer",
                  children: y.jsxs("button", {
                    className:
                      "bg-black hover:bg-green-800 border-2 border-white rounded text-white font-bold py-2 px-4 w-full md:w-64 flex items-center space-x-3",
                    children: [
                      y.jsx(M, { icon: qi, size: "2x", className: "ml-4" }),
                      y.jsx("span", {
                        className: "flex-1 text-left",
                        children: "X (Twitter)",
                      }),
                    ],
                  }),
                }),
              ],
            }),
            y.jsxs("div", {
              className:
                "flex-1 text-left space-y-4 max-w-md text-xs md:text-base",
              children: [
                y.jsx("p", {
                  className: "font-[titan]",
                  children:
                    "Joining our Telegram channel gives you real-time updates and direct community interactions.",
                }),
                y.jsx("p", {
                  className: "font-[titan]",
                  children:
                    "Following us on X lets you stay on top of the latest news and spaces.",
                }),
                y.jsx("p", {
                  className: "font-[titan]",
                  children:
                    "Reading our blog on Medium will provide you with deep dives into our development journey.",
                }),
                y.jsx("p", {
                  className: "font-[titan]",
                  children:
                    "Watch our tutorial video series on YouTube to understand the project.",
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  Yk = () =>
    y.jsxs("div", {
      className:
        "final-section text-white py-10 px-4 md:px-0 text-center font-[titan]",
      children: [
        y.jsx("h2", {
          className: "text-4xl font-bold mb-4",
          children: "Join our Community",
        }),
        y.jsxs("p", {
          className: "text-xl mb-8 font-[titan] text-xs px-14",
          children: [
            "Stay updated with the latest news and participate in our community events on ",
            y.jsx("b", { children: "Telegram, X and Medium." }),
          ],
        }),
        y.jsx("div", {
          className:
            "flex flex-col md:flex-row justify-center items-center md:items-start md:space-x-10",
          children: y.jsxs("div", {
            className: "flex flex-col items-center space-y-4 mb-6 md:mb-0",
            children: [
              y.jsx("a", {
                href: "https://t.me/cate_ai_channel",
                target: "_blank",
                rel: "noreferrer",
                children: y.jsxs("button", {
                  className:
                    "bg-[#009C47] hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-64 flex items-center space-x-3",
                  children: [
                    y.jsx(M, { icon: yw, size: "2x", className: "ml-4" }),
                    y.jsx("span", {
                      className: "flex-1 text-left",
                      children: "Telegram",
                    }),
                  ],
                }),
              }),
              y.jsx("a", {
                href: "https://twitter.com/CATTEFI_AI",
                target: "_blank",
                rel: "noreferrer",
                children: y.jsxs("button", {
                  className:
                    "bg-black hover:bg-green-800 border-2 border-white rounded text-white font-bold py-2 px-4 w-64 flex items-center space-x-3",
                  children: [
                    y.jsx(M, { icon: qi, size: "2x", className: "ml-4" }),
                    y.jsx("span", {
                      className: "flex-1 text-left",
                      children: "X (Twitter)",
                    }),
                  ],
                }),
              }),
            ],
          }),
        }),
      ],
    }),
  Zk = "/assets/cndlteam-5568b007.png",
  bn = "/assets/cardlogo-0073af81.png",
  Xk = [
    {
      name: "C.",
      role: "Head Developer",
      image: bn,
      bio: "Expert in Ethereum and smart contract development.",
    },
    {
      name: "T.",
      role: "UI/UX Designer",
      image: bn,
      bio: "Focuses on creating seamless user interfaces.",
    },
    {
      name: "J.",
      role: "Blockchain Developer",
      image: bn,
      bio: "Specializes in blockchain integration and solutions.",
    },
    {
      name: "C.",
      role: "Advisor & KOL",
      image: bn,
      bio: "A strategist and innovator for the $CATE project.",
    },
  ],
  Jk = () => {
    const [e, t] = F.useState(Xk);
    return y.jsxs("div", {
      children: [
        y.jsxs("div", {
          className:
            "flex flex-col md:flex-row justify-center items-center text-white font-[titan] font-[titan]",
          children: [
            y.jsxs("div", {
              className:
                "md:flex-1 flex flex-col justify-center items-center text-left md:w-full lg:w-3/4 px-5",
              children: [
                y.jsxs("h2", {
                  className: "md:text-4xl text-3xl p-1 text-center mb-8",
                  children: [
                    "The ",
                    y.jsx("span", {
                      className: "text-[#00A651]",
                      children: "team",
                    }),
                  ],
                }),
                y.jsxs("p", {
                  className:
                    "font-[light] bg-[#010706]text-xs md:text-sm lg:text-base px-8 md:px-24 ",
                  children: [
                    y.jsx(M, { icon: xw, className: "text-[#00A651] mr-2" }),
                    "The developer team is experienced in the ",
                    y.jsx("b", {
                      children:
                        "field of blockchain polling with history and experience working in the largest API providers and on-chain data collection companies",
                    }),
                    ". The core team consists of 3 founders, 5 developers who have combined their experience to bring about CNDL and make it the premier automated trading system on the market.",
                    y.jsx("br", {}),
                    y.jsx("br", {}),
                    y.jsx(M, { icon: s1, className: "text-[#00A651] mr-2" }),
                    "In addition to technical expertese, the $CATE team is equipped with extensive knowledge of ",
                    y.jsx("b", {
                      children:
                        "trading algorithms, decentralized finance, Web3 development and designing user experiences around blockchain data",
                    }),
                    ". Members of the team will be revealed gradually from all parts of the team beginning at launch going all the way up to the founders.",
                  ],
                }),
                y.jsxs("div", {
                  className: "flex justify-around items-center w-full mt-8",
                  children: [
                    y.jsxs("div", {
                      className: "flex flex-col items-center",
                      children: [
                        "3 ",
                        y.jsx(M, {
                          icon: bw,
                          size: "2x",
                          className: "text-[#00A651] mb-2",
                        }),
                        y.jsx("p", {
                          className: "text-xs text-center font-[titan]",
                          children: "Founders",
                        }),
                      ],
                    }),
                    y.jsxs("div", {
                      className: "flex flex-col items-center",
                      children: [
                        "5 ",
                        y.jsx(M, {
                          icon: _k,
                          size: "2x",
                          className: "text-[#00A651] mb-2",
                        }),
                        y.jsx("p", {
                          className: "text-xs text-center font-[titan]",
                          children: "Full-time Developers",
                        }),
                      ],
                    }),
                    y.jsxs("div", {
                      className: "flex flex-col items-center",
                      children: [
                        "many ",
                        y.jsx(M, {
                          icon: s1,
                          size: "2x",
                          className: "text-[#00A651] mb-2",
                        }),
                        y.jsx("p", {
                          className: "text-xs text-center font-[titan]",
                          children: "Advisors & KOLs",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            y.jsx("div", {
              className: "md:flex-1 flex justify-center items-center p-4",
              children: y.jsx("img", {
                src: Zk,
                alt: "CNDL Pattern",
                className: "opacity-70",
                style: {
                  maxWidth: "90%",
                  maxHeight: "500px",
                  width: "auto",
                  height: "auto",
                },
              }),
            }),
          ],
        }),
        y.jsxs("div", {
          className: "flex flex-wrap justify-center items-center",
          children: [
            e.map((n, r) =>
              y.jsxs(
                "div",
                {
                  className:
                    "bg-[#010706] border border-gray-800 m-4 p-4 rounded-lg shadow-lg w-32 h-84 flex flex-col items-center justify-between relative",
                  children: [
                    y.jsx("img", {
                      src: n.image,
                      alt: `${n.name}`,
                      className: "w-32 h-42 rounded-full mt-2",
                    }),
                    y.jsx("h3", {
                      className:
                        "text-xl text-center overflow-hidden text-white",
                      children: n.name,
                    }),
                    y.jsx("p", {
                      className: "text-gray-400 text-center overflow-hidden",
                      children: n.role,
                    }),
                    y.jsx("div", {
                      className:
                        "absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60",
                    }),
                  ],
                },
                r
              )
            ),
          ],
        }),
      ],
    });
  },
  Tu = () =>
    y.jsx("footer", {
      className: "bg-black text-white p-6 md:p-8 font-[titan]",
      children: y.jsxs("div", {
        className:
          "flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0",
        children: [
          y.jsxs("div", {
            className: "flex flex-col items-center md:items-start",
            children: [
              y.jsx("img", {
                src: U2,
                alt: "Candle Logo",
                className: "w-20 h-20 mb-2",
              }),
              y.jsxs("p", {
                className: "text-sm text-center md:text-left",
                children: [
                  "© ",
                  new Date().getFullYear(),
                  " $CATE Development Team.",
                ],
              }),
            ],
          }),
          y.jsxs("div", {
            className: "flex justify-center md:space-x-16 space-x-4 text-m",
            children: [
              y.jsx("a", {
                href: "https://app.cateai.xyz/",
                className: "hover:text-gray-300  md:text-base text-xs",
                children: "Privacy Policy",
              }),
              y.jsx("a", {
                href: "https://app.cateai.xyz/",
                className: "hover:text-gray-300  md:text-base text-xs",
                children: "Terms of Service",
              }),
            ],
          }),
          y.jsxs("div", {
            className:
              "text-xs md:text-sm text-center md:text-right font-[titan]",
            children: [
              y.jsxs("p", {
                children: [
                  "Contact: ",
                  y.jsx("a", {
                    href: "mailto:team@cndl.ai",
                    className: "font-bold",
                    children: "info@cate.ai",
                  }),
                ],
              }),
              y.jsx("p", {
                children:
                  "Do not consider any information as financial advice.",
              }),
            ],
          }),
        ],
      }),
    }),
  Vi = "/assets/bg-e89317e4.png",
  eN = "/assets/bg-e89317e4.png",
  u1 = "/assets/bg-e89317e4.png",
  tN = "/assets/bg4-d595a292.png";
function nN() {
  F.useState(!0), F.useState(!0);
  const [e, t] = F.useState(!1);
  return (
    F.useEffect(() => {
      const n = () => {
        const r = window.scrollY,
          i = window.innerHeight,
          a = document.body.clientHeight;
        r / (a - i) < 0.8 ? t(!0) : t(!1);
      };
      return (
        window.addEventListener("scroll", n),
        () => {
          window.removeEventListener("scroll", n);
        }
      );
    }, []),
    y.jsxs("div", {
      className: "home min-h-screen flex flex-col bg-black",
      children: [
        y.jsx("div", {
          className:
            "text-[#4FA651] text-xs px-14 bg-black text-center py-1 font-[titan]",
        }),
        y.jsx(Pu, {}),
        y.jsxs("div", {
          className: "flex-1 flex flex-col md:flex-row",
          style: {
            backgroundImage: `url(${Vi})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          },
          children: [
            y.jsx("div", {
              className: "flex-1 flex justify-center items-center",
              children: y.jsx(mC, {}),
            }),
            y.jsx("div", {
              className: "flex-1 flex justify-center items-center md:mt-0 mt-4",
              children: y.jsx(dC, {}),
            }),
          ],
        }),
        y.jsx("div", {
          className: "mt-8",
          style: {
            backgroundImage: `url(${eN})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          },
          children: y.jsx(Hk, {}),
        }),
        y.jsx("div", {
          className: "mt-8",
          style: {
            backgroundImage: `url(${u1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          },
          children: y.jsx(Vk, {}),
        }),
        y.jsx("div", {
          style: {
            backgroundImage: `url(${tN})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          },
          children: y.jsx(Qk, {}),
        }),
        y.jsx("div", {
          style: {
            backgroundImage: `url(${u1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          },
          children: y.jsx(Jk, {}),
        }),
        y.jsx("div", { className: "hidden md:block", children: y.jsx(Kk, {}) }),
        y.jsx("div", { className: "block md:hidden", children: y.jsx(Yk, {}) }),
        y.jsx(Tu, {}),
        e &&
          y.jsx("div", {
            className:
              "fixed bottom-4 right-4 text-4xl text-green-700 opacity-30 animate-bounce",
            children: y.jsx(M, { icon: Au }),
          }),
      ],
    })
  );
}
const rN = "/assets/Comp_3-8b97a8b4.gif",
  c1 = "/assets/about-9df2a8ed.png",
  iN = "/assets/onchain-2a03bf95.png",
  aN = () =>
    y.jsxs("div", {
      className: "project p-4 md:flex px-6 md:px-36",
      children: [
        y.jsxs("div", {
          className: "text-content md:w-2/3 text-white",
          children: [
            y.jsx("h2", {
              className:
                "md:text-5xl text-3xl mb-4 mt-24 md:text-left text-center",
              children: "Every trade optimized.",
            }),
            y.jsxs("div", {
              className: "text-left md:w-2/3 py-1 font-[titan]",
              children: [
                y.jsx("div", {
                  className: "opacity-50 text-xs mb-3",
                  children: y.jsx("i", {
                    children:
                      "A functional, modern and automated approach to trading on-chain. Millions of data points working for you in a matter of seconds.",
                  }),
                }),
                y.jsx("span", {
                  className: "text-[#00A945]",
                  children: "$CATE is a decentralized trading platform",
                }),
                " that allows users to trade on multiple blockchains with the a custom and highly advanced algorithm.",
                y.jsx("br", {}),
                y.jsx("br", {}),
                "The main principle is that the user only has to enter the trade with one-click (thus assuming the risk of the trade) and the rest of the trade is handled by the automated algorithm.",
                y.jsx("br", {}),
                y.jsx("br", {}),
                "The potential trades are brought directly to the user to enter into, amounting to semi-automated trading. AI embeddings are used in decision-making parts of the algorithm in trade-oriented decision trees.",
              ],
            }),
            y.jsxs("h2", {
              className:
                "text-xl font-bold mb-4 mt-5 text-[#00A945] font-[titan]",
              children: [
                y.jsx(M, { icon: Sw, className: "text-green-500 mr-2" }),
                "The Candle Trading Algorithm",
              ],
            }),
            y.jsx("p", {
              className: "font-[titan] md:w-3/4",
              children:
                "The $CATE Development Team aspires to come across transparent and build our vision with the community, both investors and traders, heavily involved. Without revealing the puzzles we have cracked to build the algorithm, we aim to be as clear as possible about our goals and vision.",
            }),
            y.jsxs("p", {
              className: "font-[titan]",
              children: [
                y.jsx("br", {}),
                "This is why we are taking it upon us to put out the Candle Trading dApp in steps, which is the interface to utilize the ",
                y.jsx("span", {
                  className: "font-bold text-[#00A945]",
                  children: "Candle Trading Algorithm",
                }),
                ", our unique in-house backend systems software that has been built by veteran Web3 developers with extensive experience in rapid blockchain-interactive systems like data polling and collection, websocket-based behaviours, and chart data algorithmic handling, coupled with AI embeddings for automated decision making.",
              ],
            }),
            y.jsxs("p", {
              className: "font-[titan]",
              children: [
                y.jsx("br", {}),
                "In layman's terms, the dApp is your gateway to having all of your trades optimized and automated to make profit. With $CATE, all of the trades you make are automated and handled by a sophisticated algorithm. The only thing you have to do is to hit 'ENTER'.",
              ],
            }),
            y.jsxs("h3", {
              className: "text-lg font-bold mt-4 mb-2 font-[titan]",
              children: [
                y.jsx(M, { icon: xw, className: "text-green-500 mr-2" }),
                "Our UDP ",
                y.jsx("span", {
                  className: "opacity-40",
                  children: "(User-oriented Development Principles)",
                }),
              ],
            }),
            y.jsxs("ul", {
              className: "list-disc pl-5 space-y-2 font-[titan]",
              children: [
                y.jsxs("div", {
                  children: [
                    y.jsx(M, { icon: Ic, className: "text-green-500 mr-2" }),
                    "The algorithms should adapt to the UX, not the other way around. Experience is of paramount importance.",
                  ],
                }),
                y.jsxs("div", {
                  children: [
                    y.jsx(M, { icon: Ic, className: "text-green-500 mr-2" }),
                    "Allowing customizability based on preferences of users and taking all feedback into account and acting on it.",
                  ],
                }),
                y.jsxs("div", {
                  children: [
                    y.jsx(M, { icon: Ic, className: "text-green-500 mr-2" }),
                    "Demonstrate and explain all features and purpose of their development. Development goals should match user interests just as well as they match the functions of the algorithm.",
                  ],
                }),
              ],
            }),
          ],
        }),
        y.jsxs("div", {
          className: "graphic md:w-1/3 md:mt-24 mt-8 px-8",
          children: [
            y.jsx("img", {
              src: c1,
              alt: "About Candle",
              className: "w-full h-auto",
            }),
            y.jsx("div", {
              style: {
                backgroundImage: `url(${c1})`,
                backgroundSize: "cover",
                transform: "scaleY(-1)",
                opacity: "0.2",
                height: "118px",
                marginTop: "-2px",
                filter: "blur(1px)",
              },
            }),
            y.jsx("img", {
              src: iN,
              alt: "Onchain",
              className: "w-full h-auto",
            }),
          ],
        }),
      ],
    }),
  oN = () =>
    y.jsxs("div", {
      className: "videos px-4 py-14 text-white px-6 md:px-24 font-[titan]",
      children: [
        y.jsxs("h2", {
          className: "text-2xl font-bold text-center mb-6",
          children: [
            y.jsx(M, { icon: Bk, className: "mr-2" }),
            "$CATE Video Series",
          ],
        }),
        y.jsx("div", {
          className: "text-center mb-6 opacity-40 font-[titan]",
          children:
            "Watch our video series to learn more and dive deep into the project. New videos every day.",
        }),
      ],
    }),
  sN = () => {
    const [e, t] = F.useState(!1);
    return (
      F.useEffect(() => {
        const n = () => {
          const r = window.scrollY,
            i = window.innerHeight,
            a = document.body.clientHeight;
          r / (a - i) < 0.8 ? t(!0) : t(!1);
        };
        return (
          window.addEventListener("scroll", n),
          () => {
            window.removeEventListener("scroll", n);
          }
        );
      }, []),
      y.jsxs("div", {
        className: "about min-h-screen flex flex-col bg-black font-[titan]",
        children: [
          y.jsx("div", {
            className:
              "text-[#4FA651] text-xs px-14 bg-black text-center py-1 font-[titan]",
            children: y.jsxs("a", {
              href: "https://twitter.com/cndl_ai/status/1788010864563339688",
              className: "",
              children: [
                y.jsx("b", { children: "$CATE has launched!" }),
                " Explore the announcement and the token here.",
                y.jsx(M, { icon: Ro, className: "ml-2" }),
              ],
            }),
          }),
          y.jsx(Pu, {}),
          y.jsx("div", {
            className: "",
            style: {
              backgroundImage: `url(${Vi})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            },
            children: y.jsx(aN, {}),
          }),
          y.jsx("div", {
            className: "",
            style: {
              backgroundImage: `url(${Vi})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            },
            children: y.jsx(oN, {}),
          }),
          y.jsx(Tu, {}),
          e &&
            y.jsx("div", {
              className:
                "fixed bottom-4 right-4 text-4xl text-green-700 opacity-30 animate-bounce",
              children: y.jsx(M, { icon: Au }),
            }),
        ],
      })
    );
  },
  lN = ({ targetDate: e }) => {
    const t = () => {
        const i = +new Date(e) - +new Date();
        let a = {};
        return (
          i > 0 &&
            (a = {
              days: Math.floor(i / 864e5),
              hours: Math.floor((i / 36e5) % 24),
              minutes: Math.floor((i / 1e3 / 60) % 60),
              seconds: Math.floor((i / 1e3) % 60),
            }),
          a
        );
      },
      [n, r] = Ha.useState(t());
    return (
      Ha.useEffect(() => {
        const i = setInterval(() => {
          r(t());
        }, 1e3);
        return () => clearInterval(i);
      }, [e]),
      y.jsx("div", {
        className: "flex space-x-1 justify-center",
        children: Object.keys(n).map((i) =>
          y.jsxs(
            "div",
            {
              className: "flex flex-col items-center",
              children: [
                y.jsx("div", {
                  className:
                    "w-14 h-14 bg-[#00A651] flex items-center justify-center rounded text-white text-xs",
                  children: n[i] < 10 ? `0${n[i]}` : n[i],
                }),
                y.jsx("div", {
                  className: "text-white text-xs font-[titan] mt-1",
                  children: i.toUpperCase(),
                }),
              ],
            },
            i
          )
        ),
      })
    );
  },
  uN = "/assets/achilles-ec063931.png",
  cN = "/assets/teddyeddy-530daf63.png",
  fN = "/assets/galo-03284615.png",
  dN = [
    {
      name: "C.",
      role: "Head Developer",
      image: bn,
      bio: "Expert in Ethereum and smart contract development.",
    },
    {
      name: "TeddyEddy",
      role: "UI/UX Designer",
      image: cN,
      bio: "Veteran Web3 UX/UI developer and graphic designer, focuses on creating seamless user interfaces.",
      socials: [
        { icon: qi, link: "https://twitter.com/@teddyyeddyy" },
        { icon: Ok, link: "https://teddyeddy.io" },
      ],
    },
    {
      name: "C.",
      role: "Advisor & KOL",
      image: bn,
      bio: "A strategist and innovator for the $CATE project.",
    },
    {
      name: "J.",
      role: "Blockchain Developer",
      image: bn,
      bio: "Specializes in blockchain integration and solutions.",
    },
    {
      name: "V.",
      role: "UX Developer",
      image: bn,
      bio: "Works on scaling the dApp for mobile devices.",
    },
    {
      name: "Galo Ferreira",
      role: "Web3 Developer",
      image: fN,
      bio: "Specializes in blockchain integration and Web3 solutions for gamification. Passion for NFTs, trading and gaming.",
      socials: [
        { icon: mk, link: "https://git.galodev.net/explore/repos" },
        { icon: pk, link: "https://github.com/Galomortal47?tab=repositories" },
        { icon: Ik, link: "https://galodev.net" },
        { icon: hk, link: "https://discord.me/galo_dev" },
      ],
    },
    {
      name: "L.",
      role: "Algorithm Developer",
      image: bn,
      countdown: new Date("2024-06-21T00:00:00"),
      bio: "Develops mathematical models for the trading algorithm and adapts them to decentralized trading.",
    },
    {
      name: "Achilles",
      role: "Marketing Lead",
      bio: "Leads the marketing team and manages the projects social media presence, KOLs, and partnerships.",
      image: uN,
      socials: [
        { icon: qi, link: "https://x.com/Achilles1089" },
        { icon: Tl, link: "https://t.me/Safehavencalls" },
      ],
    },
  ],
  hN = () =>
    y.jsx("div", {
      className:
        "TeamIntros min-h-screen flex flex-col items-center text-white px-4 md:px-24 font-[titan]",
      children: y.jsxs("div", {
        className: "container mx-auto p-5",
        children: [
          y.jsx("h2", {
            className:
              "md:text-5xl text-3xl mb-4 mt-24 md:text-left text-center",
            children: "Developer Team",
          }),
          y.jsxs("div", {
            className: "text-left md:w-2/3 py-1 font-[titan]",
            children: [
              y.jsx("div", {
                className: "opacity-50 text-xs mb-3",
                children: y.jsx("i", {
                  children:
                    "The developer team is experienced in the field of blockchain polling with history and experience working in the largest API providers and on-chain data collection companies. The core team consists of 3 founders and 5 developers who have combined their experience to the project and make it the premier automated trading system on the market. We are constantly enrolling KOLs and other advisors as well.",
                }),
              }),
              y.jsx("span", {
                className: "text-[#00A945]",
                children: "The developer team",
              }),
              " consists exclusively of industry and Web3 veterans who have combined their knowledge and skills to make the project a success. Gradually since launch, we have made a pledge to make information about members of the team public to increase transparency and trust in the project.",
              y.jsx("br", {}),
              y.jsx("br", {}),
              "A team member will be revealed weekly from launch going all the way up to the founders. The team is equipped with extensive knowledge of trading algorithms, decentralized finance, Web3 development and designing user experiences around blockchain data.",
            ],
          }),
        ],
      }),
    }),
  pN = () => {
    const [e, t] = F.useState(!1);
    return (
      F.useEffect(() => {
        const n = () => {
          const r = window.scrollY,
            i = window.innerHeight,
            a = document.body.clientHeight;
          r / (a - i) < 0.8 ? t(!0) : t(!1);
        };
        return (
          window.addEventListener("scroll", n),
          () => {
            window.removeEventListener("scroll", n);
          }
        );
      }, []),
      y.jsxs("div", {
        className: "TeamPage min-h-screen flex flex-col bg-black",
        children: [
          y.jsx("div", {
            className:
              "text-[#4FA651] text-xs px-14 bg-black text-center py-1 font-[titan]",
            children: y.jsxs("a", {
              href: "https://twitter.com/cndl_ai/status/1788010864563339688",
              className: "",
              children: [
                y.jsx("b", { children: "$CATE has launched!" }),
                " Explore the announcement and the token here.",
                y.jsx(M, { icon: Ro, className: "ml-2" }),
              ],
            }),
          }),
          y.jsx(Pu, {}),
          y.jsx("div", {
            className: "",
            style: {
              backgroundImage: `url(${Vi})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            },
            children: y.jsx(hN, {}),
          }),
          y.jsx(Tu, {}),
          e &&
            y.jsx("div", {
              className:
                "fixed bottom-4 right-4 text-4xl text-green-700 opacity-30 animate-bounce",
              children: y.jsx(M, { icon: Au }),
            }),
        ],
      })
    );
  },
  mN = () => {
    const [e, t] = F.useState(!1),
      n = F.useRef(null),
      r = F.useRef(null),
      i = F.useRef(null),
      a = F.useRef(null),
      o = (s) => {
        s && s.current && s.current.scrollIntoView({ behavior: "smooth" });
      };
    return y.jsxs("div", {
      className: "flex relative font-[titan]",
      children: [
        y.jsx("button", {
          className: `fixed z-30 top-20 left-${
            e ? "100px" : "0px"
          } transition-all duration-300 text-white text-2xl p-4 bg-black rounded-s bg-opacity-20`,
          onClick: () => t(!e),
          style: { boxShadow: "0 2px 5px rgba(0,0,0,0.2)" },
          children: y.jsx(M, { className: "text-4xl", icon: e ? Uk : vk }),
        }),
        y.jsxs("div", {
          className: `sidebar fixed top-0 bg-[#04110F] py-85 text-gray-200 w-60 h-full z-20 transition-all duration-300 border-t-2 border-b-2 border-r-2 border-[#4FA645] rounded-r overflow-y-auto
            ${e ? "left-0" : "-left-full"}`,
          children: [
            y.jsx("h2", {
              className: "font-bold text-lg ml-6 mt-36",
              children: "Documentation",
            }),
            y.jsxs("ul", {
              className: "mt-1",
              children: [
                y.jsx("li", {
                  className:
                    "font-[titan] text-green-500 mt-2 ml-5 cursor-pointer",
                  onClick: () => o(n),
                  children: "1. Introduction",
                }),
                y.jsxs("div", {
                  className: "font-[titan] mt-2 ml-7 text-xs cursor-pointer",
                  onClick: () => o(r),
                  children: [
                    y.jsx(M, { icon: jc, className: "mr-1 text-green-500" }),
                    "The Core Concepts",
                  ],
                }),
                y.jsxs("div", {
                  className: "font-[titan] mt-2 ml-7 text-xs cursor-pointer",
                  onClick: () => o(i),
                  children: [
                    y.jsx(M, { icon: jc, className: "mr-1 text-green-500" }),
                    "Candle Trading Algorithm",
                  ],
                }),
                y.jsxs("div", {
                  className: "font-[titan] mt-2 ml-7 text-xs cursor-pointer",
                  onClick: () => o(a),
                  children: [
                    y.jsx(M, { icon: jc, className: "mr-1 text-green-500" }),
                    "Candle Trading dApp",
                  ],
                }),
                y.jsx("li", {
                  className: "font-[titan] mt-2 ml-5 cursor-pointer",
                  children: "2. Premise",
                }),
                y.jsxs("div", {
                  className: "font-[titan] mt-2 ml-7 text-xs cursor-pointer",
                  children: [
                    y.jsx(M, { icon: Ro, className: "mr-1 text-green-500" }),
                    "Automated Trading",
                  ],
                }),
                y.jsxs("div", {
                  className: "font-[titan] mt-2 ml-7 text-xs cursor-pointer",
                  children: [
                    y.jsx(M, { icon: Ge, className: "mr-1" }),
                    "Risk Assumption",
                  ],
                }),
                y.jsx("li", {
                  className: "font-[titan] mt-2 ml-5 cursor-pointer",
                  children: "3. Getting Started",
                }),
                y.jsxs("div", {
                  className: "font-[titan] mt-2 ml-7 text-xs cursor-pointer",
                  children: [
                    y.jsx(M, { icon: Ge, className: "mr-1" }),
                    "Indexing Trades",
                  ],
                }),
                y.jsxs("div", {
                  className: "font-[titan] mt-2 ml-7 text-xs cursor-pointer",
                  children: [
                    y.jsx(M, { icon: Ge, className: "mr-1" }),
                    "Entering Trades",
                  ],
                }),
                y.jsxs("div", {
                  className: "font-[titan] mt-2 ml-7 text-xs cursor-pointer",
                  children: [
                    y.jsx(M, { icon: Ge, className: "mr-1" }),
                    "PnL and Strategies",
                  ],
                }),
                y.jsxs("div", {
                  className: "font-[titan] mt-2 ml-7 text-xs cursor-pointer",
                  children: [
                    y.jsx(M, { icon: Ge, className: "mr-1" }),
                    "Unrealized Profit",
                  ],
                }),
                y.jsx("li", {
                  className: "font-[titan] mt-2 ml-5 cursor-pointer",
                  children: "4. Advanced Topics",
                }),
                y.jsxs("div", {
                  className: "font-[titan] mt-2 ml-7 text-xs cursor-pointer",
                  children: [
                    y.jsx(M, { icon: Ge, className: "mr-1" }),
                    "Blockchain Polling",
                  ],
                }),
                y.jsxs("div", {
                  className: "font-[titan] mt-2 ml-7 text-xs cursor-pointer",
                  children: [
                    y.jsx(M, { icon: Ge, className: "mr-1" }),
                    "Data Harvesting",
                  ],
                }),
                y.jsxs("div", {
                  className: "font-[titan] mt-2 ml-7 text-xs cursor-pointer",
                  children: [
                    y.jsx(M, { icon: Ge, className: "mr-1" }),
                    "Oracles and Actions",
                  ],
                }),
                y.jsx("li", {
                  className: "font-[titan] mt-2 ml-5 cursor-pointer",
                  children: "5. Algorithms",
                }),
                y.jsxs("div", {
                  className: "font-[titan] mt-2 ml-7 text-xs cursor-pointer",
                  children: [
                    y.jsx(M, { icon: Ge, className: "mr-1" }),
                    "Algorithmic Optimization",
                  ],
                }),
                y.jsx("li", {
                  className: "font-[titan] mt-2 ml-5 cursor-pointer",
                  children: "6. Analytics",
                }),
                y.jsxs("div", {
                  className: "font-[titan] mt-2 ml-7 text-xs cursor-pointer",
                  children: [
                    y.jsx(M, { icon: Ge, className: "mr-1" }),
                    "Predictive Analysis",
                  ],
                }),
                y.jsxs("div", {
                  className: "font-[titan] mt-2 ml-7 text-xs cursor-pointer",
                  children: [
                    y.jsx(M, { icon: Ge, className: "mr-1" }),
                    "Embedded Analytics (Factor-weighed Decisions)",
                  ],
                }),
                y.jsx("li", {
                  className: "font-[titan] mt-2 ml-5 cursor-pointer",
                  children: "7. HF Trading",
                }),
                y.jsxs("div", {
                  className: "font-[titan] mt-2 ml-7 text-xs cursor-pointer",
                  children: [
                    y.jsx(M, { icon: Ge, className: "mr-1" }),
                    "Technical Aspects",
                  ],
                }),
                y.jsx("li", {
                  className: "font-[titan] mt-2 ml-5 cursor-pointer",
                  children: "9. Conclusions",
                }),
                y.jsxs("div", {
                  className: "font-[titan] mt-2 ml-7 text-xs cursor-pointer",
                  children: [
                    y.jsx(M, { icon: Ge, className: "mr-1" }),
                    "Service Sustainability",
                  ],
                }),
                y.jsxs("div", {
                  className: "font-[titan] mt-2 ml-7 text-xs cursor-pointer",
                  children: [
                    y.jsx(M, { icon: Ge, className: "mr-1" }),
                    "User-friendly Planning",
                  ],
                }),
                y.jsxs("div", {
                  className: "font-[titan] mt-2 ml-7 text-xs cursor-pointer",
                  children: [
                    y.jsx(M, { icon: Ge, className: "mr-1" }),
                    "Proficiency Levels",
                  ],
                }),
              ],
            }),
          ],
        }),
        y.jsxs("div", {
          className:
            "flex flex-col justify-center items-center text-white w-full",
          children: [
            y.jsxs("div", {
              className: "w-full md:px-64 px-8 ",
              ref: n,
              style: {
                backgroundImage: `url(${Vi})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              },
              children: [
                y.jsx("h1", {
                  className: "md:text-4xl text-3xl text-left font-bold mt-24",
                  children: "$CATE General Documentation",
                }),
                y.jsx("div", {
                  className: "opacity-50 text-xs mb-3 font-[titan] mt-1",
                  children: y.jsx("i", {
                    children:
                      "Epistēmē trophē psychēs esti. lit. 'Knowledge is the food of the soul' - Plato, c. 427 – 348 BC",
                  }),
                }),
                y.jsxs("p", {
                  className: "mt-4 font-[titan] md:w-2/3",
                  children: [
                    y.jsx("span", {
                      className: "text-[#00A945]",
                      children: "The Trading Algorithm and the dApp.",
                    }),
                    " These two are the central components interacting with each other that as a whole form the backbone of the $CATE project.",
                    y.jsxs("div", {
                      className: "mt-4",
                      children: [
                        "The General Documentation presented here is much more than a manual. It is a full thesis, history and presentation of everything related to the project and the $CATE trading platform. We are dedicated to utmost transparency and informativeness and this documentation will be a cornerstone of that promise. This documentation is also based on a fully custom UI in a self-contained Web Application to navigate the limits of platforms such as GitBook. If you have any issues or suggestions, please feel free to reach out to us on ",
                        y.jsx("span", {
                          className: "text-[#00A945]",
                          children: "Telegram.",
                        }),
                      ],
                    }),
                    y.jsxs("div", {
                      className: "opacity-80 flex flex-col mt-5",
                      children: [
                        "Note: Just looking for general information about the project and tokenomics? Head directly to ",
                        y.jsx("span", {
                          className: "text-[#00A945]",
                          children: "cate.ai/about.",
                        }),
                        y.jsx("a", {
                          href: "/about",
                          className:
                            "text-center bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded shadow-lg transition duration-300 ease-in-out w-2/4 md:w-1/5",
                          children: "Take me there",
                        }),
                      ],
                    }),
                  ],
                }),
                y.jsxs("h3", {
                  className: "text-xl font-bold mt-6",
                  ref: r,
                  children: [
                    y.jsx(M, { icon: l1, className: "mr-2 text-green-500" }),
                    "1. Introduction",
                  ],
                }),
                y.jsx("h3", {
                  className: "text-lg mt-4 font-[titan] opacity-70",
                  children: "The Core Concepts",
                }),
                y.jsx("p", {
                  className: "mt-2 font-[titan] mb-8",
                  children:
                    "Candle ($CATE) is a decentralized trading platform that leverages a combination of blockchain technology, data-based decision systems with AI embeddings and mathematical algorithms to provide users with automated trading solutions, where they only need to assume the risk of the trade and the rest will be dealt for them. At the center of this is optimization, where the trading algorithm is constantly evolving and adapting to the market conditions. The dApp is the user interface for the trading platform, where users can interact with the algorithm, set their trading parameters and view real-time analytics.",
                }),
                y.jsx("p", {
                  className: "mt-2 font-[titan] mb-8",
                  children:
                    "The dApp is designed to be user-friendly and intuitive, ensuring that users retain full control over their trading decisions and assets. Next we will explore the Algorithm and how the dApp interacts with it.",
                }),
                y.jsx("h3", {
                  className: "text-lg mt-0 font-[titan] mt-2 opacity-70",
                  ref: i,
                  children: "Candle Trading Algorithm",
                }),
                y.jsx("p", {
                  className: "mt-2 font-[titan] mb-8",
                  children:
                    "Without revealing the puzzles we have cracked to build the algorithm, we aim to be as clear as possible about our goals and vision. This presents a fascinating challenge - to be transparent about the project and its goals, while keeping the core of the project a exclusive to our project.",
                }),
                y.jsx("p", {
                  className: "mt-2 font-[titan] mb-8",
                  children:
                    "On a technical level of understanding, the algorithm is deployed in multiple clustered backends to serve millions of network requests in a day and to scale according to demand. As such it is multipliable, modular and scalable. In programs, complex logical parts that involve either AI-enhanced or decision tree-like decision making with calculated outputs are called algorithms due to their ability to take in factors. Much more complex than a traditional algorithm however and being a mix of many different types of calculations receiving factors that may vary in their type, presentation form or purpose, the Candle Trading Algorithm is best understood as a comprehensive system of algorithms all working together to produce expected outputs at each moments of the trades.",
                }),
                y.jsx("p", {
                  className: "mt-2 font-[titan] mb-8",
                  children:
                    "The performance of the algorithm would remain at either a theoretical level or restricted to limited scripts that utilize the backend deployments that have the ability to provide an interface for interacting with the algorithm. This is where the dApp itself comes in.",
                }),
                y.jsx("h3", {
                  className: "text-lg mt-0 font-[titan] mt-2 opacity-70",
                  ref: a,
                  children: "Candle Trading dApp",
                }),
                y.jsx("p", {
                  className: "mt-2 font-[titan]",
                  children:
                    "The dApp serves as the user interface for interacting with the Candle Trading Algorithm. It provides a user-friendly platform for traders to manage their portfolios, set trading parameters, and view real-time analytics. The dApp ensures that users retain full control over their trading decisions and assets. It utilizes the main principles of decentralized applications - wallets as users, smart contracts as business logic, and decentralized storage protocols to provide a secure and transparent trading experience. All interactions are done with signaturized transactions on the blockchain, and if there are vlaued assets involved it is all based on Ethereum or tokens paired with Ethereum.",
                }),
                y.jsx("p", {
                  className: "mt-2 font-[titan]",
                  children:
                    "To the casual user, the dApp may present itself as the only thing needed to understand to utilize the algorithm. While this is perfectly acceptable, to understand the full scope of the project and the trading platform, it is recommended to understand the relation between the interface and the algorithm. This relationship is best explained as a service relationship between the frontend and the backend. The blockchain component interacting with both the frontend for wallet connectivity and the backend for data polling is not considered to be in this relationship. In essence, the dApp is a standalone application that has functions with rely on interaction with the algorithm, and the algorithm is a standalone service that can be interacted with through the dApp.",
                }),
              ],
            }),
            y.jsxs("div", {
              className: "w-full md:px-64 px-8 ",
              style: {
                backgroundImage: `url(${Vi})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              },
              children: [
                y.jsxs("h3", {
                  className: "text-xl font-bold mt-6 mb-4",
                  children: [
                    y.jsx(M, { icon: l1, className: "mr-2 text-green-500" }),
                    "2. Premise ",
                  ],
                }),
                y.jsx("h3", {
                  className: "text-lg mt-0 font-[titan] mt-4 opacity-70",
                  children: "Automated Trading - is there a need?",
                }),
                y.jsx("p", {
                  className: "mt-2 font-[titan]",
                  children:
                    "In this chapter, we will discuss the reasoning and premise for the development and adoption of the $CATE project, the Algorithm and the dApp, from the perspectives of 1) the developers, 2) the users and investors and 4) the market. We will try to argue for the need of automated trading and the benefits it brings to the current volatile Web3 space and wider market. TBD",
                }),
                y.jsx("h3", {
                  className: "text-xl font-bold mt-6 opacity-0",
                  children: "Risk Assumption",
                }),
              ],
            }),
            y.jsx("div", { className: "w-full bg-green-500 h-0.5 my-4" }),
            y.jsx("p", {
              className: "text-center mt-1 text-lg md:text-2xl font-[titan]",
              children: "That's it for now! Stay tuned for the next chapters.",
            }),
          ],
        }),
      ],
    });
  },
  gN = () => {
    const [e, t] = F.useState(!1);
    return (
      F.useEffect(() => {
        const n = () => {
          const r = window.scrollY,
            i = window.innerHeight,
            a = document.body.clientHeight;
          r / (a - i) < 0.8 ? t(!0) : t(!1);
        };
        return (
          window.addEventListener("scroll", n),
          () => {
            window.removeEventListener("scroll", n);
          }
        );
      }, []),
      y.jsxs("div", {
        className: "docs min-h-screen flex flex-col bg-black",
        children: [
          y.jsx(Pu, {}),
          y.jsx(mN, {}),
          " ",
          y.jsx(Tu, {}),
          e &&
            y.jsx("div", {
              className:
                "fixed bottom-4 right-4 text-4xl text-green-700 opacity-30 animate-bounce",
              children: y.jsx(M, { icon: Au }),
            }),
        ],
      })
    );
  },
  yN = () => {
    const [e, t] = F.useState(!0),
      [n, r] = F.useState(Date.now()),
      [i, a] = F.useState(1);
    return (
      F.useEffect(() => {
        const o = setTimeout(() => {
            a(0);
          }, 1e3),
          s = setTimeout(() => {
            t(!1);
          }, 3100);
        return () => {
          clearTimeout(o), clearTimeout(s);
        };
      }, []),
      F.useEffect(() => {
        r(Date.now());
      }, []),
      y.jsxs(iC, {
        children: [
          y.jsx("div", {
            className: "relative font-[runic]",
            children: y.jsxs(ZS, {
              children: [
                y.jsx(ka, { path: "/", element: y.jsx(nN, {}) }),
                y.jsx(ka, { path: "/about", element: y.jsx(sN, {}) }),
                " ",
                y.jsx(ka, { path: "/team", element: y.jsx(pN, {}) }),
                " ",
                y.jsx(ka, { path: "/docs", element: y.jsx(gN, {}) }),
              ],
            }),
          }),
          e &&
            y.jsx("div", {
              className:
                "fixed inset-0 bg-black flex items-center justify-center z-1000 transition-opacity duration-1000",
              style: { opacity: i },
              children: y.jsx("img", {
                src: `${rN}?${n}`,
                alt: "Loading",
                className: "w-72 z-1000 ",
              }),
            }),
        ],
      })
    );
  };
var Da,
  ii,
  vN = class extends $h {
    constructor({ chains: e, options: t }) {
      super({ chains: e, options: { reloadOnDisconnect: !1, ...t } }),
        (this.id = "coinbaseWallet"),
        (this.name = "Coinbase Wallet"),
        (this.ready = !0),
        ft(this, Da, void 0),
        ft(this, ii, void 0),
        (this.onAccountsChanged = (n) => {
          n.length === 0
            ? this.emit("disconnect")
            : this.emit("change", { account: tn(n[0]) });
        }),
        (this.onChainChanged = (n) => {
          const r = gl(n),
            i = this.isChainUnsupported(r);
          this.emit("change", { chain: { id: r, unsupported: i } });
        }),
        (this.onDisconnect = () => {
          this.emit("disconnect");
        });
    }
    async connect({ chainId: e } = {}) {
      try {
        const t = await this.getProvider();
        t.on("accountsChanged", this.onAccountsChanged),
          t.on("chainChanged", this.onChainChanged),
          t.on("disconnect", this.onDisconnect),
          this.emit("message", { type: "connecting" });
        const n = await t.enable(),
          r = tn(n[0]);
        let i = await this.getChainId(),
          a = this.isChainUnsupported(i);
        return (
          e &&
            i !== e &&
            ((i = (await this.switchChain(e)).id),
            (a = this.isChainUnsupported(i))),
          { account: r, chain: { id: i, unsupported: a } }
        );
      } catch (t) {
        throw /(user closed modal|accounts received is empty)/i.test(t.message)
          ? new Yt(t)
          : t;
      }
    }
    async disconnect() {
      if (!ge(this, ii)) return;
      const e = await this.getProvider();
      e.removeListener("accountsChanged", this.onAccountsChanged),
        e.removeListener("chainChanged", this.onChainChanged),
        e.removeListener("disconnect", this.onDisconnect),
        e.disconnect(),
        e.close();
    }
    async getAccount() {
      const t = await (
        await this.getProvider()
      ).request({ method: "eth_accounts" });
      return tn(t[0]);
    }
    async getChainId() {
      const e = await this.getProvider();
      return gl(e.chainId);
    }
    async getProvider() {
      var e;
      if (!ge(this, ii)) {
        let t = (
          await su(
            () => import("./index-45344766.js").then((o) => o.i),
            ["assets/index-45344766.js", "assets/events-274ffe07.js"]
          )
        ).default;
        typeof t != "function" &&
          typeof t.default == "function" &&
          (t = t.default),
          $i(this, Da, new t(this.options));
        const n =
            (e = ge(this, Da).walletExtension) == null
              ? void 0
              : e.getChainId(),
          r =
            this.chains.find((o) =>
              this.options.chainId ? o.id === this.options.chainId : o.id === n
            ) || this.chains[0],
          i = this.options.chainId || (r == null ? void 0 : r.id),
          a =
            this.options.jsonRpcUrl ||
            (r == null ? void 0 : r.rpcUrls.default.http[0]);
        $i(this, ii, ge(this, Da).makeWeb3Provider(a, i));
      }
      return ge(this, ii);
    }
    async getWalletClient({ chainId: e } = {}) {
      const [t, n] = await Promise.all([this.getProvider(), this.getAccount()]),
        r = this.chains.find((i) => i.id === e);
      if (!t) throw new Error("provider is required.");
      return l0({ account: n, chain: r, transport: a0(t) });
    }
    async isAuthorized() {
      try {
        return !!(await this.getAccount());
      } catch {
        return !1;
      }
    }
    async switchChain(e) {
      var r;
      const t = await this.getProvider(),
        n = oe(e);
      try {
        return (
          await t.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: n }],
          }),
          this.chains.find((i) => i.id === e) ?? {
            id: e,
            name: `Chain ${n}`,
            network: `${n}`,
            nativeCurrency: { name: "Ether", decimals: 18, symbol: "ETH" },
            rpcUrls: { default: { http: [""] }, public: { http: [""] } },
          }
        );
      } catch (i) {
        const a = this.chains.find((o) => o.id === e);
        if (!a) throw new Nv({ chainId: e, connectorId: this.id });
        if (i.code === 4902)
          try {
            return (
              await t.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: n,
                    chainName: a.name,
                    nativeCurrency: a.nativeCurrency,
                    rpcUrls: [
                      ((r = a.rpcUrls.public) == null ? void 0 : r.http[0]) ??
                        "",
                    ],
                    blockExplorerUrls: this.getBlockExplorerUrls(a),
                  },
                ],
              }),
              a
            );
          } catch (o) {
            throw new Yt(o);
          }
        throw new ho(i);
      }
    }
    async watchAsset({ address: e, decimals: t = 18, image: n, symbol: r }) {
      return (await this.getProvider()).request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: { address: e, decimals: t, image: n, symbol: r },
        },
      });
    }
  };
Da = new WeakMap();
ii = new WeakMap();
var Rs,
  wN = class extends E2 {
    constructor({ chains: e, options: t } = {}) {
      const n = {
        name: "MetaMask",
        shimDisconnect: !0,
        getProvider() {
          function r(a) {
            if (
              a != null &&
              a.isMetaMask &&
              !(a.isBraveWallet && !a._events && !a._state) &&
              !a.isApexWallet &&
              !a.isAvalanche &&
              !a.isBitKeep &&
              !a.isBlockWallet &&
              !a.isCoin98 &&
              !a.isFordefi &&
              !a.isMathWallet &&
              !(a.isOkxWallet || a.isOKExWallet) &&
              !(a.isOneInchIOSWallet || a.isOneInchAndroidWallet) &&
              !a.isOpera &&
              !a.isPortal &&
              !a.isRabby &&
              !a.isDefiant &&
              !a.isTokenPocket &&
              !a.isTokenary &&
              !a.isZeal &&
              !a.isZerion
            )
              return a;
          }
          if (typeof window > "u") return;
          const i = window.ethereum;
          return i != null && i.providers ? i.providers.find(r) : r(i);
        },
        ...t,
      };
      super({ chains: e, options: n }),
        (this.id = "metaMask"),
        (this.shimDisconnectKey = `${this.id}.shimDisconnect`),
        ft(this, Rs, void 0),
        $i(this, Rs, n.UNSTABLE_shimOnConnectSelectAccount);
    }
    async connect({ chainId: e } = {}) {
      var t, n, r, i;
      try {
        const a = await this.getProvider();
        if (!a) throw new Nr();
        a.on &&
          (a.on("accountsChanged", this.onAccountsChanged),
          a.on("chainChanged", this.onChainChanged),
          a.on("disconnect", this.onDisconnect)),
          this.emit("message", { type: "connecting" });
        let o = null;
        if (
          ge(this, Rs) &&
          (t = this.options) != null &&
          t.shimDisconnect &&
          !((n = this.storage) != null && n.getItem(this.shimDisconnectKey)) &&
          ((o = await this.getAccount().catch(() => null)), !!o)
        )
          try {
            await a.request({
              method: "wallet_requestPermissions",
              params: [{ eth_accounts: {} }],
            }),
              (o = await this.getAccount());
          } catch (c) {
            if (this.isUserRejectedRequestError(c)) throw new Yt(c);
            if (c.code === new xl(c).code) throw c;
          }
        if (!o) {
          const u = await a.request({ method: "eth_requestAccounts" });
          o = tn(u[0]);
        }
        let s = await this.getChainId(),
          l = this.isChainUnsupported(s);
        return (
          e &&
            s !== e &&
            ((s = (await this.switchChain(e)).id),
            (l = this.isChainUnsupported(s))),
          (r = this.options) != null &&
            r.shimDisconnect &&
            ((i = this.storage) == null ||
              i.setItem(this.shimDisconnectKey, !0)),
          { account: o, chain: { id: s, unsupported: l }, provider: a }
        );
      } catch (a) {
        throw this.isUserRejectedRequestError(a)
          ? new Yt(a)
          : a.code === -32002
          ? new xl(a)
          : a;
      }
    }
  };
Rs = new WeakMap();
var _0 = {},
  Ou = {},
  ie = {},
  Cw = {};
(function (e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  function t(s, l) {
    var u = (s >>> 16) & 65535,
      c = s & 65535,
      d = (l >>> 16) & 65535,
      m = l & 65535;
    return (c * m + (((u * m + c * d) << 16) >>> 0)) | 0;
  }
  e.mul = Math.imul || t;
  function n(s, l) {
    return (s + l) | 0;
  }
  e.add = n;
  function r(s, l) {
    return (s - l) | 0;
  }
  e.sub = r;
  function i(s, l) {
    return (s << l) | (s >>> (32 - l));
  }
  e.rotl = i;
  function a(s, l) {
    return (s << (32 - l)) | (s >>> l);
  }
  e.rotr = a;
  function o(s) {
    return typeof s == "number" && isFinite(s) && Math.floor(s) === s;
  }
  (e.isInteger = Number.isInteger || o),
    (e.MAX_SAFE_INTEGER = 9007199254740991),
    (e.isSafeInteger = function (s) {
      return (
        e.isInteger(s) && s >= -e.MAX_SAFE_INTEGER && s <= e.MAX_SAFE_INTEGER
      );
    });
})(Cw);
Object.defineProperty(ie, "__esModule", { value: !0 });
var _w = Cw;
function bN(e, t) {
  return t === void 0 && (t = 0), (((e[t + 0] << 8) | e[t + 1]) << 16) >> 16;
}
ie.readInt16BE = bN;
function xN(e, t) {
  return t === void 0 && (t = 0), ((e[t + 0] << 8) | e[t + 1]) >>> 0;
}
ie.readUint16BE = xN;
function EN(e, t) {
  return t === void 0 && (t = 0), (((e[t + 1] << 8) | e[t]) << 16) >> 16;
}
ie.readInt16LE = EN;
function SN(e, t) {
  return t === void 0 && (t = 0), ((e[t + 1] << 8) | e[t]) >>> 0;
}
ie.readUint16LE = SN;
function kw(e, t, n) {
  return (
    t === void 0 && (t = new Uint8Array(2)),
    n === void 0 && (n = 0),
    (t[n + 0] = e >>> 8),
    (t[n + 1] = e >>> 0),
    t
  );
}
ie.writeUint16BE = kw;
ie.writeInt16BE = kw;
function Nw(e, t, n) {
  return (
    t === void 0 && (t = new Uint8Array(2)),
    n === void 0 && (n = 0),
    (t[n + 0] = e >>> 0),
    (t[n + 1] = e >>> 8),
    t
  );
}
ie.writeUint16LE = Nw;
ie.writeInt16LE = Nw;
function Ed(e, t) {
  return (
    t === void 0 && (t = 0),
    (e[t] << 24) | (e[t + 1] << 16) | (e[t + 2] << 8) | e[t + 3]
  );
}
ie.readInt32BE = Ed;
function Sd(e, t) {
  return (
    t === void 0 && (t = 0),
    ((e[t] << 24) | (e[t + 1] << 16) | (e[t + 2] << 8) | e[t + 3]) >>> 0
  );
}
ie.readUint32BE = Sd;
function Cd(e, t) {
  return (
    t === void 0 && (t = 0),
    (e[t + 3] << 24) | (e[t + 2] << 16) | (e[t + 1] << 8) | e[t]
  );
}
ie.readInt32LE = Cd;
function _d(e, t) {
  return (
    t === void 0 && (t = 0),
    ((e[t + 3] << 24) | (e[t + 2] << 16) | (e[t + 1] << 8) | e[t]) >>> 0
  );
}
ie.readUint32LE = _d;
function Ol(e, t, n) {
  return (
    t === void 0 && (t = new Uint8Array(4)),
    n === void 0 && (n = 0),
    (t[n + 0] = e >>> 24),
    (t[n + 1] = e >>> 16),
    (t[n + 2] = e >>> 8),
    (t[n + 3] = e >>> 0),
    t
  );
}
ie.writeUint32BE = Ol;
ie.writeInt32BE = Ol;
function jl(e, t, n) {
  return (
    t === void 0 && (t = new Uint8Array(4)),
    n === void 0 && (n = 0),
    (t[n + 0] = e >>> 0),
    (t[n + 1] = e >>> 8),
    (t[n + 2] = e >>> 16),
    (t[n + 3] = e >>> 24),
    t
  );
}
ie.writeUint32LE = jl;
ie.writeInt32LE = jl;
function CN(e, t) {
  t === void 0 && (t = 0);
  var n = Ed(e, t),
    r = Ed(e, t + 4);
  return n * 4294967296 + r - (r >> 31) * 4294967296;
}
ie.readInt64BE = CN;
function _N(e, t) {
  t === void 0 && (t = 0);
  var n = Sd(e, t),
    r = Sd(e, t + 4);
  return n * 4294967296 + r;
}
ie.readUint64BE = _N;
function kN(e, t) {
  t === void 0 && (t = 0);
  var n = Cd(e, t),
    r = Cd(e, t + 4);
  return r * 4294967296 + n - (n >> 31) * 4294967296;
}
ie.readInt64LE = kN;
function NN(e, t) {
  t === void 0 && (t = 0);
  var n = _d(e, t),
    r = _d(e, t + 4);
  return r * 4294967296 + n;
}
ie.readUint64LE = NN;
function Dw(e, t, n) {
  return (
    t === void 0 && (t = new Uint8Array(8)),
    n === void 0 && (n = 0),
    Ol((e / 4294967296) >>> 0, t, n),
    Ol(e >>> 0, t, n + 4),
    t
  );
}
ie.writeUint64BE = Dw;
ie.writeInt64BE = Dw;
function Pw(e, t, n) {
  return (
    t === void 0 && (t = new Uint8Array(8)),
    n === void 0 && (n = 0),
    jl(e >>> 0, t, n),
    jl((e / 4294967296) >>> 0, t, n + 4),
    t
  );
}
ie.writeUint64LE = Pw;
ie.writeInt64LE = Pw;
function DN(e, t, n) {
  if ((n === void 0 && (n = 0), e % 8 !== 0))
    throw new Error("readUintBE supports only bitLengths divisible by 8");
  if (e / 8 > t.length - n)
    throw new Error("readUintBE: array is too short for the given bitLength");
  for (var r = 0, i = 1, a = e / 8 + n - 1; a >= n; a--)
    (r += t[a] * i), (i *= 256);
  return r;
}
ie.readUintBE = DN;
function PN(e, t, n) {
  if ((n === void 0 && (n = 0), e % 8 !== 0))
    throw new Error("readUintLE supports only bitLengths divisible by 8");
  if (e / 8 > t.length - n)
    throw new Error("readUintLE: array is too short for the given bitLength");
  for (var r = 0, i = 1, a = n; a < n + e / 8; a++) (r += t[a] * i), (i *= 256);
  return r;
}
ie.readUintLE = PN;
function AN(e, t, n, r) {
  if (
    (n === void 0 && (n = new Uint8Array(e / 8)),
    r === void 0 && (r = 0),
    e % 8 !== 0)
  )
    throw new Error("writeUintBE supports only bitLengths divisible by 8");
  if (!_w.isSafeInteger(t))
    throw new Error("writeUintBE value must be an integer");
  for (var i = 1, a = e / 8 + r - 1; a >= r; a--)
    (n[a] = (t / i) & 255), (i *= 256);
  return n;
}
ie.writeUintBE = AN;
function TN(e, t, n, r) {
  if (
    (n === void 0 && (n = new Uint8Array(e / 8)),
    r === void 0 && (r = 0),
    e % 8 !== 0)
  )
    throw new Error("writeUintLE supports only bitLengths divisible by 8");
  if (!_w.isSafeInteger(t))
    throw new Error("writeUintLE value must be an integer");
  for (var i = 1, a = r; a < r + e / 8; a++) (n[a] = (t / i) & 255), (i *= 256);
  return n;
}
ie.writeUintLE = TN;
function ON(e, t) {
  t === void 0 && (t = 0);
  var n = new DataView(e.buffer, e.byteOffset, e.byteLength);
  return n.getFloat32(t);
}
ie.readFloat32BE = ON;
function jN(e, t) {
  t === void 0 && (t = 0);
  var n = new DataView(e.buffer, e.byteOffset, e.byteLength);
  return n.getFloat32(t, !0);
}
ie.readFloat32LE = jN;
function IN(e, t) {
  t === void 0 && (t = 0);
  var n = new DataView(e.buffer, e.byteOffset, e.byteLength);
  return n.getFloat64(t);
}
ie.readFloat64BE = IN;
function LN(e, t) {
  t === void 0 && (t = 0);
  var n = new DataView(e.buffer, e.byteOffset, e.byteLength);
  return n.getFloat64(t, !0);
}
ie.readFloat64LE = LN;
function FN(e, t, n) {
  t === void 0 && (t = new Uint8Array(4)), n === void 0 && (n = 0);
  var r = new DataView(t.buffer, t.byteOffset, t.byteLength);
  return r.setFloat32(n, e), t;
}
ie.writeFloat32BE = FN;
function UN(e, t, n) {
  t === void 0 && (t = new Uint8Array(4)), n === void 0 && (n = 0);
  var r = new DataView(t.buffer, t.byteOffset, t.byteLength);
  return r.setFloat32(n, e, !0), t;
}
ie.writeFloat32LE = UN;
function MN(e, t, n) {
  t === void 0 && (t = new Uint8Array(8)), n === void 0 && (n = 0);
  var r = new DataView(t.buffer, t.byteOffset, t.byteLength);
  return r.setFloat64(n, e), t;
}
ie.writeFloat64BE = MN;
function RN(e, t, n) {
  t === void 0 && (t = new Uint8Array(8)), n === void 0 && (n = 0);
  var r = new DataView(t.buffer, t.byteOffset, t.byteLength);
  return r.setFloat64(n, e, !0), t;
}
ie.writeFloat64LE = RN;
var on = {};
Object.defineProperty(on, "__esModule", { value: !0 });
function BN(e) {
  for (var t = 0; t < e.length; t++) e[t] = 0;
  return e;
}
on.wipe = BN;
Object.defineProperty(Ou, "__esModule", { value: !0 });
var lt = ie,
  kd = on,
  $N = 20;
function zN(e, t, n) {
  for (
    var r = 1634760805,
      i = 857760878,
      a = 2036477234,
      o = 1797285236,
      s = (n[3] << 24) | (n[2] << 16) | (n[1] << 8) | n[0],
      l = (n[7] << 24) | (n[6] << 16) | (n[5] << 8) | n[4],
      u = (n[11] << 24) | (n[10] << 16) | (n[9] << 8) | n[8],
      c = (n[15] << 24) | (n[14] << 16) | (n[13] << 8) | n[12],
      d = (n[19] << 24) | (n[18] << 16) | (n[17] << 8) | n[16],
      m = (n[23] << 24) | (n[22] << 16) | (n[21] << 8) | n[20],
      v = (n[27] << 24) | (n[26] << 16) | (n[25] << 8) | n[24],
      b = (n[31] << 24) | (n[30] << 16) | (n[29] << 8) | n[28],
      _ = (t[3] << 24) | (t[2] << 16) | (t[1] << 8) | t[0],
      C = (t[7] << 24) | (t[6] << 16) | (t[5] << 8) | t[4],
      x = (t[11] << 24) | (t[10] << 16) | (t[9] << 8) | t[8],
      g = (t[15] << 24) | (t[14] << 16) | (t[13] << 8) | t[12],
      w = r,
      E = i,
      N = a,
      D = o,
      f = s,
      k = l,
      O = u,
      I = c,
      H = d,
      Z = m,
      X = v,
      te = b,
      ne = _,
      ee = C,
      B = x,
      L = g,
      z = 0;
    z < $N;
    z += 2
  )
    (w = (w + f) | 0),
      (ne ^= w),
      (ne = (ne >>> (32 - 16)) | (ne << 16)),
      (H = (H + ne) | 0),
      (f ^= H),
      (f = (f >>> (32 - 12)) | (f << 12)),
      (E = (E + k) | 0),
      (ee ^= E),
      (ee = (ee >>> (32 - 16)) | (ee << 16)),
      (Z = (Z + ee) | 0),
      (k ^= Z),
      (k = (k >>> (32 - 12)) | (k << 12)),
      (N = (N + O) | 0),
      (B ^= N),
      (B = (B >>> (32 - 16)) | (B << 16)),
      (X = (X + B) | 0),
      (O ^= X),
      (O = (O >>> (32 - 12)) | (O << 12)),
      (D = (D + I) | 0),
      (L ^= D),
      (L = (L >>> (32 - 16)) | (L << 16)),
      (te = (te + L) | 0),
      (I ^= te),
      (I = (I >>> (32 - 12)) | (I << 12)),
      (N = (N + O) | 0),
      (B ^= N),
      (B = (B >>> (32 - 8)) | (B << 8)),
      (X = (X + B) | 0),
      (O ^= X),
      (O = (O >>> (32 - 7)) | (O << 7)),
      (D = (D + I) | 0),
      (L ^= D),
      (L = (L >>> (32 - 8)) | (L << 8)),
      (te = (te + L) | 0),
      (I ^= te),
      (I = (I >>> (32 - 7)) | (I << 7)),
      (E = (E + k) | 0),
      (ee ^= E),
      (ee = (ee >>> (32 - 8)) | (ee << 8)),
      (Z = (Z + ee) | 0),
      (k ^= Z),
      (k = (k >>> (32 - 7)) | (k << 7)),
      (w = (w + f) | 0),
      (ne ^= w),
      (ne = (ne >>> (32 - 8)) | (ne << 8)),
      (H = (H + ne) | 0),
      (f ^= H),
      (f = (f >>> (32 - 7)) | (f << 7)),
      (w = (w + k) | 0),
      (L ^= w),
      (L = (L >>> (32 - 16)) | (L << 16)),
      (X = (X + L) | 0),
      (k ^= X),
      (k = (k >>> (32 - 12)) | (k << 12)),
      (E = (E + O) | 0),
      (ne ^= E),
      (ne = (ne >>> (32 - 16)) | (ne << 16)),
      (te = (te + ne) | 0),
      (O ^= te),
      (O = (O >>> (32 - 12)) | (O << 12)),
      (N = (N + I) | 0),
      (ee ^= N),
      (ee = (ee >>> (32 - 16)) | (ee << 16)),
      (H = (H + ee) | 0),
      (I ^= H),
      (I = (I >>> (32 - 12)) | (I << 12)),
      (D = (D + f) | 0),
      (B ^= D),
      (B = (B >>> (32 - 16)) | (B << 16)),
      (Z = (Z + B) | 0),
      (f ^= Z),
      (f = (f >>> (32 - 12)) | (f << 12)),
      (N = (N + I) | 0),
      (ee ^= N),
      (ee = (ee >>> (32 - 8)) | (ee << 8)),
      (H = (H + ee) | 0),
      (I ^= H),
      (I = (I >>> (32 - 7)) | (I << 7)),
      (D = (D + f) | 0),
      (B ^= D),
      (B = (B >>> (32 - 8)) | (B << 8)),
      (Z = (Z + B) | 0),
      (f ^= Z),
      (f = (f >>> (32 - 7)) | (f << 7)),
      (E = (E + O) | 0),
      (ne ^= E),
      (ne = (ne >>> (32 - 8)) | (ne << 8)),
      (te = (te + ne) | 0),
      (O ^= te),
      (O = (O >>> (32 - 7)) | (O << 7)),
      (w = (w + k) | 0),
      (L ^= w),
      (L = (L >>> (32 - 8)) | (L << 8)),
      (X = (X + L) | 0),
      (k ^= X),
      (k = (k >>> (32 - 7)) | (k << 7));
  lt.writeUint32LE((w + r) | 0, e, 0),
    lt.writeUint32LE((E + i) | 0, e, 4),
    lt.writeUint32LE((N + a) | 0, e, 8),
    lt.writeUint32LE((D + o) | 0, e, 12),
    lt.writeUint32LE((f + s) | 0, e, 16),
    lt.writeUint32LE((k + l) | 0, e, 20),
    lt.writeUint32LE((O + u) | 0, e, 24),
    lt.writeUint32LE((I + c) | 0, e, 28),
    lt.writeUint32LE((H + d) | 0, e, 32),
    lt.writeUint32LE((Z + m) | 0, e, 36),
    lt.writeUint32LE((X + v) | 0, e, 40),
    lt.writeUint32LE((te + b) | 0, e, 44),
    lt.writeUint32LE((ne + _) | 0, e, 48),
    lt.writeUint32LE((ee + C) | 0, e, 52),
    lt.writeUint32LE((B + x) | 0, e, 56),
    lt.writeUint32LE((L + g) | 0, e, 60);
}
function Aw(e, t, n, r, i) {
  if ((i === void 0 && (i = 0), e.length !== 32))
    throw new Error("ChaCha: key size must be 32 bytes");
  if (r.length < n.length)
    throw new Error("ChaCha: destination is shorter than source");
  var a, o;
  if (i === 0) {
    if (t.length !== 8 && t.length !== 12)
      throw new Error("ChaCha nonce must be 8 or 12 bytes");
    (a = new Uint8Array(16)), (o = a.length - t.length), a.set(t, o);
  } else {
    if (t.length !== 16)
      throw new Error("ChaCha nonce with counter must be 16 bytes");
    (a = t), (o = i);
  }
  for (var s = new Uint8Array(64), l = 0; l < n.length; l += 64) {
    zN(s, a, e);
    for (var u = l; u < l + 64 && u < n.length; u++) r[u] = n[u] ^ s[u - l];
    HN(a, 0, o);
  }
  return kd.wipe(s), i === 0 && kd.wipe(a), r;
}
Ou.streamXOR = Aw;
function WN(e, t, n, r) {
  return r === void 0 && (r = 0), kd.wipe(n), Aw(e, t, n, n, r);
}
Ou.stream = WN;
function HN(e, t, n) {
  for (var r = 1; n--; )
    (r = (r + (e[t] & 255)) | 0), (e[t] = r & 255), (r >>>= 8), t++;
  if (r > 0) throw new Error("ChaCha: counter overflow");
}
var Tw = {},
  xr = {};
Object.defineProperty(xr, "__esModule", { value: !0 });
function qN(e, t, n) {
  return (~(e - 1) & t) | ((e - 1) & n);
}
xr.select = qN;
function VN(e, t) {
  return (((e | 0) - (t | 0) - 1) >>> 31) & 1;
}
xr.lessOrEqual = VN;
function Ow(e, t) {
  if (e.length !== t.length) return 0;
  for (var n = 0, r = 0; r < e.length; r++) n |= e[r] ^ t[r];
  return 1 & ((n - 1) >>> 8);
}
xr.compare = Ow;
function GN(e, t) {
  return e.length === 0 || t.length === 0 ? !1 : Ow(e, t) !== 0;
}
xr.equal = GN;
(function (e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  var t = xr,
    n = on;
  e.DIGEST_LENGTH = 16;
  var r = (function () {
    function o(s) {
      (this.digestLength = e.DIGEST_LENGTH),
        (this._buffer = new Uint8Array(16)),
        (this._r = new Uint16Array(10)),
        (this._h = new Uint16Array(10)),
        (this._pad = new Uint16Array(8)),
        (this._leftover = 0),
        (this._fin = 0),
        (this._finished = !1);
      var l = s[0] | (s[1] << 8);
      this._r[0] = l & 8191;
      var u = s[2] | (s[3] << 8);
      this._r[1] = ((l >>> 13) | (u << 3)) & 8191;
      var c = s[4] | (s[5] << 8);
      this._r[2] = ((u >>> 10) | (c << 6)) & 7939;
      var d = s[6] | (s[7] << 8);
      this._r[3] = ((c >>> 7) | (d << 9)) & 8191;
      var m = s[8] | (s[9] << 8);
      (this._r[4] = ((d >>> 4) | (m << 12)) & 255),
        (this._r[5] = (m >>> 1) & 8190);
      var v = s[10] | (s[11] << 8);
      this._r[6] = ((m >>> 14) | (v << 2)) & 8191;
      var b = s[12] | (s[13] << 8);
      this._r[7] = ((v >>> 11) | (b << 5)) & 8065;
      var _ = s[14] | (s[15] << 8);
      (this._r[8] = ((b >>> 8) | (_ << 8)) & 8191),
        (this._r[9] = (_ >>> 5) & 127),
        (this._pad[0] = s[16] | (s[17] << 8)),
        (this._pad[1] = s[18] | (s[19] << 8)),
        (this._pad[2] = s[20] | (s[21] << 8)),
        (this._pad[3] = s[22] | (s[23] << 8)),
        (this._pad[4] = s[24] | (s[25] << 8)),
        (this._pad[5] = s[26] | (s[27] << 8)),
        (this._pad[6] = s[28] | (s[29] << 8)),
        (this._pad[7] = s[30] | (s[31] << 8));
    }
    return (
      (o.prototype._blocks = function (s, l, u) {
        for (
          var c = this._fin ? 0 : 2048,
            d = this._h[0],
            m = this._h[1],
            v = this._h[2],
            b = this._h[3],
            _ = this._h[4],
            C = this._h[5],
            x = this._h[6],
            g = this._h[7],
            w = this._h[8],
            E = this._h[9],
            N = this._r[0],
            D = this._r[1],
            f = this._r[2],
            k = this._r[3],
            O = this._r[4],
            I = this._r[5],
            H = this._r[6],
            Z = this._r[7],
            X = this._r[8],
            te = this._r[9];
          u >= 16;

        ) {
          var ne = s[l + 0] | (s[l + 1] << 8);
          d += ne & 8191;
          var ee = s[l + 2] | (s[l + 3] << 8);
          m += ((ne >>> 13) | (ee << 3)) & 8191;
          var B = s[l + 4] | (s[l + 5] << 8);
          v += ((ee >>> 10) | (B << 6)) & 8191;
          var L = s[l + 6] | (s[l + 7] << 8);
          b += ((B >>> 7) | (L << 9)) & 8191;
          var z = s[l + 8] | (s[l + 9] << 8);
          (_ += ((L >>> 4) | (z << 12)) & 8191), (C += (z >>> 1) & 8191);
          var G = s[l + 10] | (s[l + 11] << 8);
          x += ((z >>> 14) | (G << 2)) & 8191;
          var V = s[l + 12] | (s[l + 13] << 8);
          g += ((G >>> 11) | (V << 5)) & 8191;
          var K = s[l + 14] | (s[l + 15] << 8);
          (w += ((V >>> 8) | (K << 8)) & 8191), (E += (K >>> 5) | c);
          var $ = 0,
            J = $;
          (J += d * N),
            (J += m * (5 * te)),
            (J += v * (5 * X)),
            (J += b * (5 * Z)),
            (J += _ * (5 * H)),
            ($ = J >>> 13),
            (J &= 8191),
            (J += C * (5 * I)),
            (J += x * (5 * O)),
            (J += g * (5 * k)),
            (J += w * (5 * f)),
            (J += E * (5 * D)),
            ($ += J >>> 13),
            (J &= 8191);
          var ae = $;
          (ae += d * D),
            (ae += m * N),
            (ae += v * (5 * te)),
            (ae += b * (5 * X)),
            (ae += _ * (5 * Z)),
            ($ = ae >>> 13),
            (ae &= 8191),
            (ae += C * (5 * H)),
            (ae += x * (5 * I)),
            (ae += g * (5 * O)),
            (ae += w * (5 * k)),
            (ae += E * (5 * f)),
            ($ += ae >>> 13),
            (ae &= 8191);
          var re = $;
          (re += d * f),
            (re += m * D),
            (re += v * N),
            (re += b * (5 * te)),
            (re += _ * (5 * X)),
            ($ = re >>> 13),
            (re &= 8191),
            (re += C * (5 * Z)),
            (re += x * (5 * H)),
            (re += g * (5 * I)),
            (re += w * (5 * O)),
            (re += E * (5 * k)),
            ($ += re >>> 13),
            (re &= 8191);
          var le = $;
          (le += d * k),
            (le += m * f),
            (le += v * D),
            (le += b * N),
            (le += _ * (5 * te)),
            ($ = le >>> 13),
            (le &= 8191),
            (le += C * (5 * X)),
            (le += x * (5 * Z)),
            (le += g * (5 * H)),
            (le += w * (5 * I)),
            (le += E * (5 * O)),
            ($ += le >>> 13),
            (le &= 8191);
          var ce = $;
          (ce += d * O),
            (ce += m * k),
            (ce += v * f),
            (ce += b * D),
            (ce += _ * N),
            ($ = ce >>> 13),
            (ce &= 8191),
            (ce += C * (5 * te)),
            (ce += x * (5 * X)),
            (ce += g * (5 * Z)),
            (ce += w * (5 * H)),
            (ce += E * (5 * I)),
            ($ += ce >>> 13),
            (ce &= 8191);
          var he = $;
          (he += d * I),
            (he += m * O),
            (he += v * k),
            (he += b * f),
            (he += _ * D),
            ($ = he >>> 13),
            (he &= 8191),
            (he += C * N),
            (he += x * (5 * te)),
            (he += g * (5 * X)),
            (he += w * (5 * Z)),
            (he += E * (5 * H)),
            ($ += he >>> 13),
            (he &= 8191);
          var me = $;
          (me += d * H),
            (me += m * I),
            (me += v * O),
            (me += b * k),
            (me += _ * f),
            ($ = me >>> 13),
            (me &= 8191),
            (me += C * D),
            (me += x * N),
            (me += g * (5 * te)),
            (me += w * (5 * X)),
            (me += E * (5 * Z)),
            ($ += me >>> 13),
            (me &= 8191);
          var ve = $;
          (ve += d * Z),
            (ve += m * H),
            (ve += v * I),
            (ve += b * O),
            (ve += _ * k),
            ($ = ve >>> 13),
            (ve &= 8191),
            (ve += C * f),
            (ve += x * D),
            (ve += g * N),
            (ve += w * (5 * te)),
            (ve += E * (5 * X)),
            ($ += ve >>> 13),
            (ve &= 8191);
          var we = $;
          (we += d * X),
            (we += m * Z),
            (we += v * H),
            (we += b * I),
            (we += _ * O),
            ($ = we >>> 13),
            (we &= 8191),
            (we += C * k),
            (we += x * f),
            (we += g * D),
            (we += w * N),
            (we += E * (5 * te)),
            ($ += we >>> 13),
            (we &= 8191);
          var pe = $;
          (pe += d * te),
            (pe += m * X),
            (pe += v * Z),
            (pe += b * H),
            (pe += _ * I),
            ($ = pe >>> 13),
            (pe &= 8191),
            (pe += C * O),
            (pe += x * k),
            (pe += g * f),
            (pe += w * D),
            (pe += E * N),
            ($ += pe >>> 13),
            (pe &= 8191),
            ($ = (($ << 2) + $) | 0),
            ($ = ($ + J) | 0),
            (J = $ & 8191),
            ($ = $ >>> 13),
            (ae += $),
            (d = J),
            (m = ae),
            (v = re),
            (b = le),
            (_ = ce),
            (C = he),
            (x = me),
            (g = ve),
            (w = we),
            (E = pe),
            (l += 16),
            (u -= 16);
        }
        (this._h[0] = d),
          (this._h[1] = m),
          (this._h[2] = v),
          (this._h[3] = b),
          (this._h[4] = _),
          (this._h[5] = C),
          (this._h[6] = x),
          (this._h[7] = g),
          (this._h[8] = w),
          (this._h[9] = E);
      }),
      (o.prototype.finish = function (s, l) {
        l === void 0 && (l = 0);
        var u = new Uint16Array(10),
          c,
          d,
          m,
          v;
        if (this._leftover) {
          for (v = this._leftover, this._buffer[v++] = 1; v < 16; v++)
            this._buffer[v] = 0;
          (this._fin = 1), this._blocks(this._buffer, 0, 16);
        }
        for (c = this._h[1] >>> 13, this._h[1] &= 8191, v = 2; v < 10; v++)
          (this._h[v] += c), (c = this._h[v] >>> 13), (this._h[v] &= 8191);
        for (
          this._h[0] += c * 5,
            c = this._h[0] >>> 13,
            this._h[0] &= 8191,
            this._h[1] += c,
            c = this._h[1] >>> 13,
            this._h[1] &= 8191,
            this._h[2] += c,
            u[0] = this._h[0] + 5,
            c = u[0] >>> 13,
            u[0] &= 8191,
            v = 1;
          v < 10;
          v++
        )
          (u[v] = this._h[v] + c), (c = u[v] >>> 13), (u[v] &= 8191);
        for (u[9] -= 8192, d = (c ^ 1) - 1, v = 0; v < 10; v++) u[v] &= d;
        for (d = ~d, v = 0; v < 10; v++) this._h[v] = (this._h[v] & d) | u[v];
        for (
          this._h[0] = (this._h[0] | (this._h[1] << 13)) & 65535,
            this._h[1] = ((this._h[1] >>> 3) | (this._h[2] << 10)) & 65535,
            this._h[2] = ((this._h[2] >>> 6) | (this._h[3] << 7)) & 65535,
            this._h[3] = ((this._h[3] >>> 9) | (this._h[4] << 4)) & 65535,
            this._h[4] =
              ((this._h[4] >>> 12) | (this._h[5] << 1) | (this._h[6] << 14)) &
              65535,
            this._h[5] = ((this._h[6] >>> 2) | (this._h[7] << 11)) & 65535,
            this._h[6] = ((this._h[7] >>> 5) | (this._h[8] << 8)) & 65535,
            this._h[7] = ((this._h[8] >>> 8) | (this._h[9] << 5)) & 65535,
            m = this._h[0] + this._pad[0],
            this._h[0] = m & 65535,
            v = 1;
          v < 8;
          v++
        )
          (m = (((this._h[v] + this._pad[v]) | 0) + (m >>> 16)) | 0),
            (this._h[v] = m & 65535);
        return (
          (s[l + 0] = this._h[0] >>> 0),
          (s[l + 1] = this._h[0] >>> 8),
          (s[l + 2] = this._h[1] >>> 0),
          (s[l + 3] = this._h[1] >>> 8),
          (s[l + 4] = this._h[2] >>> 0),
          (s[l + 5] = this._h[2] >>> 8),
          (s[l + 6] = this._h[3] >>> 0),
          (s[l + 7] = this._h[3] >>> 8),
          (s[l + 8] = this._h[4] >>> 0),
          (s[l + 9] = this._h[4] >>> 8),
          (s[l + 10] = this._h[5] >>> 0),
          (s[l + 11] = this._h[5] >>> 8),
          (s[l + 12] = this._h[6] >>> 0),
          (s[l + 13] = this._h[6] >>> 8),
          (s[l + 14] = this._h[7] >>> 0),
          (s[l + 15] = this._h[7] >>> 8),
          (this._finished = !0),
          this
        );
      }),
      (o.prototype.update = function (s) {
        var l = 0,
          u = s.length,
          c;
        if (this._leftover) {
          (c = 16 - this._leftover), c > u && (c = u);
          for (var d = 0; d < c; d++)
            this._buffer[this._leftover + d] = s[l + d];
          if (((u -= c), (l += c), (this._leftover += c), this._leftover < 16))
            return this;
          this._blocks(this._buffer, 0, 16), (this._leftover = 0);
        }
        if (
          (u >= 16 &&
            ((c = u - (u % 16)), this._blocks(s, l, c), (l += c), (u -= c)),
          u)
        ) {
          for (var d = 0; d < u; d++)
            this._buffer[this._leftover + d] = s[l + d];
          this._leftover += u;
        }
        return this;
      }),
      (o.prototype.digest = function () {
        if (this._finished) throw new Error("Poly1305 was finished");
        var s = new Uint8Array(16);
        return this.finish(s), s;
      }),
      (o.prototype.clean = function () {
        return (
          n.wipe(this._buffer),
          n.wipe(this._r),
          n.wipe(this._h),
          n.wipe(this._pad),
          (this._leftover = 0),
          (this._fin = 0),
          (this._finished = !0),
          this
        );
      }),
      o
    );
  })();
  e.Poly1305 = r;
  function i(o, s) {
    var l = new r(o);
    l.update(s);
    var u = l.digest();
    return l.clean(), u;
  }
  e.oneTimeAuth = i;
  function a(o, s) {
    return o.length !== e.DIGEST_LENGTH || s.length !== e.DIGEST_LENGTH
      ? !1
      : t.equal(o, s);
  }
  e.equal = a;
})(Tw);
(function (e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  var t = Ou,
    n = Tw,
    r = on,
    i = ie,
    a = xr;
  (e.KEY_LENGTH = 32), (e.NONCE_LENGTH = 12), (e.TAG_LENGTH = 16);
  var o = new Uint8Array(16),
    s = (function () {
      function l(u) {
        if (
          ((this.nonceLength = e.NONCE_LENGTH),
          (this.tagLength = e.TAG_LENGTH),
          u.length !== e.KEY_LENGTH)
        )
          throw new Error("ChaCha20Poly1305 needs 32-byte key");
        this._key = new Uint8Array(u);
      }
      return (
        (l.prototype.seal = function (u, c, d, m) {
          if (u.length > 16)
            throw new Error("ChaCha20Poly1305: incorrect nonce length");
          var v = new Uint8Array(16);
          v.set(u, v.length - u.length);
          var b = new Uint8Array(32);
          t.stream(this._key, v, b, 4);
          var _ = c.length + this.tagLength,
            C;
          if (m) {
            if (m.length !== _)
              throw new Error("ChaCha20Poly1305: incorrect destination length");
            C = m;
          } else C = new Uint8Array(_);
          return (
            t.streamXOR(this._key, v, c, C, 4),
            this._authenticate(
              C.subarray(C.length - this.tagLength, C.length),
              b,
              C.subarray(0, C.length - this.tagLength),
              d
            ),
            r.wipe(v),
            C
          );
        }),
        (l.prototype.open = function (u, c, d, m) {
          if (u.length > 16)
            throw new Error("ChaCha20Poly1305: incorrect nonce length");
          if (c.length < this.tagLength) return null;
          var v = new Uint8Array(16);
          v.set(u, v.length - u.length);
          var b = new Uint8Array(32);
          t.stream(this._key, v, b, 4);
          var _ = new Uint8Array(this.tagLength);
          if (
            (this._authenticate(
              _,
              b,
              c.subarray(0, c.length - this.tagLength),
              d
            ),
            !a.equal(_, c.subarray(c.length - this.tagLength, c.length)))
          )
            return null;
          var C = c.length - this.tagLength,
            x;
          if (m) {
            if (m.length !== C)
              throw new Error("ChaCha20Poly1305: incorrect destination length");
            x = m;
          } else x = new Uint8Array(C);
          return (
            t.streamXOR(
              this._key,
              v,
              c.subarray(0, c.length - this.tagLength),
              x,
              4
            ),
            r.wipe(v),
            x
          );
        }),
        (l.prototype.clean = function () {
          return r.wipe(this._key), this;
        }),
        (l.prototype._authenticate = function (u, c, d, m) {
          var v = new n.Poly1305(c);
          m &&
            (v.update(m),
            m.length % 16 > 0 && v.update(o.subarray(m.length % 16))),
            v.update(d),
            d.length % 16 > 0 && v.update(o.subarray(d.length % 16));
          var b = new Uint8Array(8);
          m && i.writeUint64LE(m.length, b),
            v.update(b),
            i.writeUint64LE(d.length, b),
            v.update(b);
          for (var _ = v.digest(), C = 0; C < _.length; C++) u[C] = _[C];
          v.clean(), r.wipe(_), r.wipe(b);
        }),
        l
      );
    })();
  e.ChaCha20Poly1305 = s;
})(_0);
var jw = {},
  Bo = {},
  k0 = {};
Object.defineProperty(k0, "__esModule", { value: !0 });
function QN(e) {
  return (
    typeof e.saveState < "u" &&
    typeof e.restoreState < "u" &&
    typeof e.cleanSavedState < "u"
  );
}
k0.isSerializableHash = QN;
Object.defineProperty(Bo, "__esModule", { value: !0 });
var un = k0,
  KN = xr,
  YN = on,
  Iw = (function () {
    function e(t, n) {
      (this._finished = !1),
        (this._inner = new t()),
        (this._outer = new t()),
        (this.blockSize = this._outer.blockSize),
        (this.digestLength = this._outer.digestLength);
      var r = new Uint8Array(this.blockSize);
      n.length > this.blockSize
        ? this._inner.update(n).finish(r).clean()
        : r.set(n);
      for (var i = 0; i < r.length; i++) r[i] ^= 54;
      this._inner.update(r);
      for (var i = 0; i < r.length; i++) r[i] ^= 106;
      this._outer.update(r),
        un.isSerializableHash(this._inner) &&
          un.isSerializableHash(this._outer) &&
          ((this._innerKeyedState = this._inner.saveState()),
          (this._outerKeyedState = this._outer.saveState())),
        YN.wipe(r);
    }
    return (
      (e.prototype.reset = function () {
        if (
          !un.isSerializableHash(this._inner) ||
          !un.isSerializableHash(this._outer)
        )
          throw new Error(
            "hmac: can't reset() because hash doesn't implement restoreState()"
          );
        return (
          this._inner.restoreState(this._innerKeyedState),
          this._outer.restoreState(this._outerKeyedState),
          (this._finished = !1),
          this
        );
      }),
      (e.prototype.clean = function () {
        un.isSerializableHash(this._inner) &&
          this._inner.cleanSavedState(this._innerKeyedState),
          un.isSerializableHash(this._outer) &&
            this._outer.cleanSavedState(this._outerKeyedState),
          this._inner.clean(),
          this._outer.clean();
      }),
      (e.prototype.update = function (t) {
        return this._inner.update(t), this;
      }),
      (e.prototype.finish = function (t) {
        return this._finished
          ? (this._outer.finish(t), this)
          : (this._inner.finish(t),
            this._outer.update(t.subarray(0, this.digestLength)).finish(t),
            (this._finished = !0),
            this);
      }),
      (e.prototype.digest = function () {
        var t = new Uint8Array(this.digestLength);
        return this.finish(t), t;
      }),
      (e.prototype.saveState = function () {
        if (!un.isSerializableHash(this._inner))
          throw new Error(
            "hmac: can't saveState() because hash doesn't implement it"
          );
        return this._inner.saveState();
      }),
      (e.prototype.restoreState = function (t) {
        if (
          !un.isSerializableHash(this._inner) ||
          !un.isSerializableHash(this._outer)
        )
          throw new Error(
            "hmac: can't restoreState() because hash doesn't implement it"
          );
        return (
          this._inner.restoreState(t),
          this._outer.restoreState(this._outerKeyedState),
          (this._finished = !1),
          this
        );
      }),
      (e.prototype.cleanSavedState = function (t) {
        if (!un.isSerializableHash(this._inner))
          throw new Error(
            "hmac: can't cleanSavedState() because hash doesn't implement it"
          );
        this._inner.cleanSavedState(t);
      }),
      e
    );
  })();
Bo.HMAC = Iw;
function ZN(e, t, n) {
  var r = new Iw(e, t);
  r.update(n);
  var i = r.digest();
  return r.clean(), i;
}
Bo.hmac = ZN;
Bo.equal = KN.equal;
Object.defineProperty(jw, "__esModule", { value: !0 });
var f1 = Bo,
  d1 = on,
  XN = (function () {
    function e(t, n, r, i) {
      r === void 0 && (r = new Uint8Array(0)),
        (this._counter = new Uint8Array(1)),
        (this._hash = t),
        (this._info = i);
      var a = f1.hmac(this._hash, r, n);
      (this._hmac = new f1.HMAC(t, a)),
        (this._buffer = new Uint8Array(this._hmac.digestLength)),
        (this._bufpos = this._buffer.length);
    }
    return (
      (e.prototype._fillBuffer = function () {
        this._counter[0]++;
        var t = this._counter[0];
        if (t === 0) throw new Error("hkdf: cannot expand more");
        this._hmac.reset(),
          t > 1 && this._hmac.update(this._buffer),
          this._info && this._hmac.update(this._info),
          this._hmac.update(this._counter),
          this._hmac.finish(this._buffer),
          (this._bufpos = 0);
      }),
      (e.prototype.expand = function (t) {
        for (var n = new Uint8Array(t), r = 0; r < n.length; r++)
          this._bufpos === this._buffer.length && this._fillBuffer(),
            (n[r] = this._buffer[this._bufpos++]);
        return n;
      }),
      (e.prototype.clean = function () {
        this._hmac.clean(),
          d1.wipe(this._buffer),
          d1.wipe(this._counter),
          (this._bufpos = 0);
      }),
      e
    );
  })(),
  JN = (jw.HKDF = XN),
  ju = {},
  Iu = {},
  Lu = {};
Object.defineProperty(Lu, "__esModule", { value: !0 });
Lu.BrowserRandomSource = void 0;
const h1 = 65536;
class eD {
  constructor() {
    (this.isAvailable = !1), (this.isInstantiated = !1);
    const t = typeof self < "u" ? self.crypto || self.msCrypto : null;
    t &&
      t.getRandomValues !== void 0 &&
      ((this._crypto = t), (this.isAvailable = !0), (this.isInstantiated = !0));
  }
  randomBytes(t) {
    if (!this.isAvailable || !this._crypto)
      throw new Error("Browser random byte generator is not available.");
    const n = new Uint8Array(t);
    for (let r = 0; r < n.length; r += h1)
      this._crypto.getRandomValues(
        n.subarray(r, r + Math.min(n.length - r, h1))
      );
    return n;
  }
}
Lu.BrowserRandomSource = eD;
function tD(e) {
  throw new Error(
    'Could not dynamically require "' +
      e +
      '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.'
  );
}
var Fu = {};
const nD = {},
  rD = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: nD },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  iD = W1(rD);
Object.defineProperty(Fu, "__esModule", { value: !0 });
Fu.NodeRandomSource = void 0;
const aD = on;
class oD {
  constructor() {
    if (
      ((this.isAvailable = !1), (this.isInstantiated = !1), typeof tD < "u")
    ) {
      const t = iD;
      t &&
        t.randomBytes &&
        ((this._crypto = t),
        (this.isAvailable = !0),
        (this.isInstantiated = !0));
    }
  }
  randomBytes(t) {
    if (!this.isAvailable || !this._crypto)
      throw new Error("Node.js random byte generator is not available.");
    let n = this._crypto.randomBytes(t);
    if (n.length !== t)
      throw new Error("NodeRandomSource: got fewer bytes than requested");
    const r = new Uint8Array(t);
    for (let i = 0; i < r.length; i++) r[i] = n[i];
    return (0, aD.wipe)(n), r;
  }
}
Fu.NodeRandomSource = oD;
Object.defineProperty(Iu, "__esModule", { value: !0 });
Iu.SystemRandomSource = void 0;
const sD = Lu,
  lD = Fu;
class uD {
  constructor() {
    if (
      ((this.isAvailable = !1),
      (this.name = ""),
      (this._source = new sD.BrowserRandomSource()),
      this._source.isAvailable)
    ) {
      (this.isAvailable = !0), (this.name = "Browser");
      return;
    }
    if (
      ((this._source = new lD.NodeRandomSource()), this._source.isAvailable)
    ) {
      (this.isAvailable = !0), (this.name = "Node");
      return;
    }
  }
  randomBytes(t) {
    if (!this.isAvailable)
      throw new Error("System random byte generator is not available.");
    return this._source.randomBytes(t);
  }
}
Iu.SystemRandomSource = uD;
(function (e) {
  Object.defineProperty(e, "__esModule", { value: !0 }),
    (e.randomStringForEntropy =
      e.randomString =
      e.randomUint32 =
      e.randomBytes =
      e.defaultRandomSource =
        void 0);
  const t = Iu,
    n = ie,
    r = on;
  e.defaultRandomSource = new t.SystemRandomSource();
  function i(u, c = e.defaultRandomSource) {
    return c.randomBytes(u);
  }
  e.randomBytes = i;
  function a(u = e.defaultRandomSource) {
    const c = i(4, u),
      d = (0, n.readUint32LE)(c);
    return (0, r.wipe)(c), d;
  }
  e.randomUint32 = a;
  const o = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  function s(u, c = o, d = e.defaultRandomSource) {
    if (c.length < 2) throw new Error("randomString charset is too short");
    if (c.length > 256) throw new Error("randomString charset is too long");
    let m = "";
    const v = c.length,
      b = 256 - (256 % v);
    for (; u > 0; ) {
      const _ = i(Math.ceil((u * 256) / b), d);
      for (let C = 0; C < _.length && u > 0; C++) {
        const x = _[C];
        x < b && ((m += c.charAt(x % v)), u--);
      }
      (0, r.wipe)(_);
    }
    return m;
  }
  e.randomString = s;
  function l(u, c = o, d = e.defaultRandomSource) {
    const m = Math.ceil(u / (Math.log(c.length) / Math.LN2));
    return s(m, c, d);
  }
  e.randomStringForEntropy = l;
})(ju);
var Uu = {};
(function (e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  var t = ie,
    n = on;
  (e.DIGEST_LENGTH = 32), (e.BLOCK_SIZE = 64);
  var r = (function () {
    function s() {
      (this.digestLength = e.DIGEST_LENGTH),
        (this.blockSize = e.BLOCK_SIZE),
        (this._state = new Int32Array(8)),
        (this._temp = new Int32Array(64)),
        (this._buffer = new Uint8Array(128)),
        (this._bufferLength = 0),
        (this._bytesHashed = 0),
        (this._finished = !1),
        this.reset();
    }
    return (
      (s.prototype._initState = function () {
        (this._state[0] = 1779033703),
          (this._state[1] = 3144134277),
          (this._state[2] = 1013904242),
          (this._state[3] = 2773480762),
          (this._state[4] = 1359893119),
          (this._state[5] = 2600822924),
          (this._state[6] = 528734635),
          (this._state[7] = 1541459225);
      }),
      (s.prototype.reset = function () {
        return (
          this._initState(),
          (this._bufferLength = 0),
          (this._bytesHashed = 0),
          (this._finished = !1),
          this
        );
      }),
      (s.prototype.clean = function () {
        n.wipe(this._buffer), n.wipe(this._temp), this.reset();
      }),
      (s.prototype.update = function (l, u) {
        if ((u === void 0 && (u = l.length), this._finished))
          throw new Error("SHA256: can't update because hash was finished.");
        var c = 0;
        if (((this._bytesHashed += u), this._bufferLength > 0)) {
          for (; this._bufferLength < this.blockSize && u > 0; )
            (this._buffer[this._bufferLength++] = l[c++]), u--;
          this._bufferLength === this.blockSize &&
            (a(this._temp, this._state, this._buffer, 0, this.blockSize),
            (this._bufferLength = 0));
        }
        for (
          u >= this.blockSize &&
          ((c = a(this._temp, this._state, l, c, u)), (u %= this.blockSize));
          u > 0;

        )
          (this._buffer[this._bufferLength++] = l[c++]), u--;
        return this;
      }),
      (s.prototype.finish = function (l) {
        if (!this._finished) {
          var u = this._bytesHashed,
            c = this._bufferLength,
            d = (u / 536870912) | 0,
            m = u << 3,
            v = u % 64 < 56 ? 64 : 128;
          this._buffer[c] = 128;
          for (var b = c + 1; b < v - 8; b++) this._buffer[b] = 0;
          t.writeUint32BE(d, this._buffer, v - 8),
            t.writeUint32BE(m, this._buffer, v - 4),
            a(this._temp, this._state, this._buffer, 0, v),
            (this._finished = !0);
        }
        for (var b = 0; b < this.digestLength / 4; b++)
          t.writeUint32BE(this._state[b], l, b * 4);
        return this;
      }),
      (s.prototype.digest = function () {
        var l = new Uint8Array(this.digestLength);
        return this.finish(l), l;
      }),
      (s.prototype.saveState = function () {
        if (this._finished)
          throw new Error("SHA256: cannot save finished state");
        return {
          state: new Int32Array(this._state),
          buffer:
            this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
          bufferLength: this._bufferLength,
          bytesHashed: this._bytesHashed,
        };
      }),
      (s.prototype.restoreState = function (l) {
        return (
          this._state.set(l.state),
          (this._bufferLength = l.bufferLength),
          l.buffer && this._buffer.set(l.buffer),
          (this._bytesHashed = l.bytesHashed),
          (this._finished = !1),
          this
        );
      }),
      (s.prototype.cleanSavedState = function (l) {
        n.wipe(l.state),
          l.buffer && n.wipe(l.buffer),
          (l.bufferLength = 0),
          (l.bytesHashed = 0);
      }),
      s
    );
  })();
  e.SHA256 = r;
  var i = new Int32Array([
    1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
    2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
    1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
    264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
    2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
    113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
    1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
    3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
    430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
    1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
    2428436474, 2756734187, 3204031479, 3329325298,
  ]);
  function a(s, l, u, c, d) {
    for (; d >= 64; ) {
      for (
        var m = l[0],
          v = l[1],
          b = l[2],
          _ = l[3],
          C = l[4],
          x = l[5],
          g = l[6],
          w = l[7],
          E = 0;
        E < 16;
        E++
      ) {
        var N = c + E * 4;
        s[E] = t.readUint32BE(u, N);
      }
      for (var E = 16; E < 64; E++) {
        var D = s[E - 2],
          f =
            ((D >>> 17) | (D << (32 - 17))) ^
            ((D >>> 19) | (D << (32 - 19))) ^
            (D >>> 10);
        D = s[E - 15];
        var k =
          ((D >>> 7) | (D << (32 - 7))) ^
          ((D >>> 18) | (D << (32 - 18))) ^
          (D >>> 3);
        s[E] = ((f + s[E - 7]) | 0) + ((k + s[E - 16]) | 0);
      }
      for (var E = 0; E < 64; E++) {
        var f =
            ((((((C >>> 6) | (C << 26)) ^
              ((C >>> 11) | (C << 21)) ^
              ((C >>> 25) | (C << 7))) +
              ((C & x) ^ (~C & g))) |
              0) +
              ((w + ((i[E] + s[E]) | 0)) | 0)) |
            0,
          k =
            ((((m >>> 2) | (m << (32 - 2))) ^
              ((m >>> 13) | (m << (32 - 13))) ^
              ((m >>> 22) | (m << (32 - 22)))) +
              ((m & v) ^ (m & b) ^ (v & b))) |
            0;
        (w = g),
          (g = x),
          (x = C),
          (C = (_ + f) | 0),
          (_ = b),
          (b = v),
          (v = m),
          (m = (f + k) | 0);
      }
      (l[0] += m),
        (l[1] += v),
        (l[2] += b),
        (l[3] += _),
        (l[4] += C),
        (l[5] += x),
        (l[6] += g),
        (l[7] += w),
        (c += 64),
        (d -= 64);
    }
    return c;
  }
  function o(s) {
    var l = new r();
    l.update(s);
    var u = l.digest();
    return l.clean(), u;
  }
  e.hash = o;
})(Uu);
var N0 = {};
(function (e) {
  Object.defineProperty(e, "__esModule", { value: !0 }),
    (e.sharedKey =
      e.generateKeyPair =
      e.generateKeyPairFromSeed =
      e.scalarMultBase =
      e.scalarMult =
      e.SHARED_KEY_LENGTH =
      e.SECRET_KEY_LENGTH =
      e.PUBLIC_KEY_LENGTH =
        void 0);
  const t = ju,
    n = on;
  (e.PUBLIC_KEY_LENGTH = 32),
    (e.SECRET_KEY_LENGTH = 32),
    (e.SHARED_KEY_LENGTH = 32);
  function r(E) {
    const N = new Float64Array(16);
    if (E) for (let D = 0; D < E.length; D++) N[D] = E[D];
    return N;
  }
  const i = new Uint8Array(32);
  i[0] = 9;
  const a = r([56129, 1]);
  function o(E) {
    let N = 1;
    for (let D = 0; D < 16; D++) {
      let f = E[D] + N + 65535;
      (N = Math.floor(f / 65536)), (E[D] = f - N * 65536);
    }
    E[0] += N - 1 + 37 * (N - 1);
  }
  function s(E, N, D) {
    const f = ~(D - 1);
    for (let k = 0; k < 16; k++) {
      const O = f & (E[k] ^ N[k]);
      (E[k] ^= O), (N[k] ^= O);
    }
  }
  function l(E, N) {
    const D = r(),
      f = r();
    for (let k = 0; k < 16; k++) f[k] = N[k];
    o(f), o(f), o(f);
    for (let k = 0; k < 2; k++) {
      D[0] = f[0] - 65517;
      for (let I = 1; I < 15; I++)
        (D[I] = f[I] - 65535 - ((D[I - 1] >> 16) & 1)), (D[I - 1] &= 65535);
      D[15] = f[15] - 32767 - ((D[14] >> 16) & 1);
      const O = (D[15] >> 16) & 1;
      (D[14] &= 65535), s(f, D, 1 - O);
    }
    for (let k = 0; k < 16; k++)
      (E[2 * k] = f[k] & 255), (E[2 * k + 1] = f[k] >> 8);
  }
  function u(E, N) {
    for (let D = 0; D < 16; D++) E[D] = N[2 * D] + (N[2 * D + 1] << 8);
    E[15] &= 32767;
  }
  function c(E, N, D) {
    for (let f = 0; f < 16; f++) E[f] = N[f] + D[f];
  }
  function d(E, N, D) {
    for (let f = 0; f < 16; f++) E[f] = N[f] - D[f];
  }
  function m(E, N, D) {
    let f,
      k,
      O = 0,
      I = 0,
      H = 0,
      Z = 0,
      X = 0,
      te = 0,
      ne = 0,
      ee = 0,
      B = 0,
      L = 0,
      z = 0,
      G = 0,
      V = 0,
      K = 0,
      $ = 0,
      J = 0,
      ae = 0,
      re = 0,
      le = 0,
      ce = 0,
      he = 0,
      me = 0,
      ve = 0,
      we = 0,
      pe = 0,
      kt = 0,
      Un = 0,
      Er = 0,
      Mn = 0,
      la = 0,
      qo = 0,
      Ve = D[0],
      Re = D[1],
      be = D[2],
      He = D[3],
      Ze = D[4],
      Ce = D[5],
      Xe = D[6],
      S = D[7],
      h = D[8],
      p = D[9],
      P = D[10],
      A = D[11],
      T = D[12],
      j = D[13],
      Y = D[14],
      se = D[15];
    (f = N[0]),
      (O += f * Ve),
      (I += f * Re),
      (H += f * be),
      (Z += f * He),
      (X += f * Ze),
      (te += f * Ce),
      (ne += f * Xe),
      (ee += f * S),
      (B += f * h),
      (L += f * p),
      (z += f * P),
      (G += f * A),
      (V += f * T),
      (K += f * j),
      ($ += f * Y),
      (J += f * se),
      (f = N[1]),
      (I += f * Ve),
      (H += f * Re),
      (Z += f * be),
      (X += f * He),
      (te += f * Ze),
      (ne += f * Ce),
      (ee += f * Xe),
      (B += f * S),
      (L += f * h),
      (z += f * p),
      (G += f * P),
      (V += f * A),
      (K += f * T),
      ($ += f * j),
      (J += f * Y),
      (ae += f * se),
      (f = N[2]),
      (H += f * Ve),
      (Z += f * Re),
      (X += f * be),
      (te += f * He),
      (ne += f * Ze),
      (ee += f * Ce),
      (B += f * Xe),
      (L += f * S),
      (z += f * h),
      (G += f * p),
      (V += f * P),
      (K += f * A),
      ($ += f * T),
      (J += f * j),
      (ae += f * Y),
      (re += f * se),
      (f = N[3]),
      (Z += f * Ve),
      (X += f * Re),
      (te += f * be),
      (ne += f * He),
      (ee += f * Ze),
      (B += f * Ce),
      (L += f * Xe),
      (z += f * S),
      (G += f * h),
      (V += f * p),
      (K += f * P),
      ($ += f * A),
      (J += f * T),
      (ae += f * j),
      (re += f * Y),
      (le += f * se),
      (f = N[4]),
      (X += f * Ve),
      (te += f * Re),
      (ne += f * be),
      (ee += f * He),
      (B += f * Ze),
      (L += f * Ce),
      (z += f * Xe),
      (G += f * S),
      (V += f * h),
      (K += f * p),
      ($ += f * P),
      (J += f * A),
      (ae += f * T),
      (re += f * j),
      (le += f * Y),
      (ce += f * se),
      (f = N[5]),
      (te += f * Ve),
      (ne += f * Re),
      (ee += f * be),
      (B += f * He),
      (L += f * Ze),
      (z += f * Ce),
      (G += f * Xe),
      (V += f * S),
      (K += f * h),
      ($ += f * p),
      (J += f * P),
      (ae += f * A),
      (re += f * T),
      (le += f * j),
      (ce += f * Y),
      (he += f * se),
      (f = N[6]),
      (ne += f * Ve),
      (ee += f * Re),
      (B += f * be),
      (L += f * He),
      (z += f * Ze),
      (G += f * Ce),
      (V += f * Xe),
      (K += f * S),
      ($ += f * h),
      (J += f * p),
      (ae += f * P),
      (re += f * A),
      (le += f * T),
      (ce += f * j),
      (he += f * Y),
      (me += f * se),
      (f = N[7]),
      (ee += f * Ve),
      (B += f * Re),
      (L += f * be),
      (z += f * He),
      (G += f * Ze),
      (V += f * Ce),
      (K += f * Xe),
      ($ += f * S),
      (J += f * h),
      (ae += f * p),
      (re += f * P),
      (le += f * A),
      (ce += f * T),
      (he += f * j),
      (me += f * Y),
      (ve += f * se),
      (f = N[8]),
      (B += f * Ve),
      (L += f * Re),
      (z += f * be),
      (G += f * He),
      (V += f * Ze),
      (K += f * Ce),
      ($ += f * Xe),
      (J += f * S),
      (ae += f * h),
      (re += f * p),
      (le += f * P),
      (ce += f * A),
      (he += f * T),
      (me += f * j),
      (ve += f * Y),
      (we += f * se),
      (f = N[9]),
      (L += f * Ve),
      (z += f * Re),
      (G += f * be),
      (V += f * He),
      (K += f * Ze),
      ($ += f * Ce),
      (J += f * Xe),
      (ae += f * S),
      (re += f * h),
      (le += f * p),
      (ce += f * P),
      (he += f * A),
      (me += f * T),
      (ve += f * j),
      (we += f * Y),
      (pe += f * se),
      (f = N[10]),
      (z += f * Ve),
      (G += f * Re),
      (V += f * be),
      (K += f * He),
      ($ += f * Ze),
      (J += f * Ce),
      (ae += f * Xe),
      (re += f * S),
      (le += f * h),
      (ce += f * p),
      (he += f * P),
      (me += f * A),
      (ve += f * T),
      (we += f * j),
      (pe += f * Y),
      (kt += f * se),
      (f = N[11]),
      (G += f * Ve),
      (V += f * Re),
      (K += f * be),
      ($ += f * He),
      (J += f * Ze),
      (ae += f * Ce),
      (re += f * Xe),
      (le += f * S),
      (ce += f * h),
      (he += f * p),
      (me += f * P),
      (ve += f * A),
      (we += f * T),
      (pe += f * j),
      (kt += f * Y),
      (Un += f * se),
      (f = N[12]),
      (V += f * Ve),
      (K += f * Re),
      ($ += f * be),
      (J += f * He),
      (ae += f * Ze),
      (re += f * Ce),
      (le += f * Xe),
      (ce += f * S),
      (he += f * h),
      (me += f * p),
      (ve += f * P),
      (we += f * A),
      (pe += f * T),
      (kt += f * j),
      (Un += f * Y),
      (Er += f * se),
      (f = N[13]),
      (K += f * Ve),
      ($ += f * Re),
      (J += f * be),
      (ae += f * He),
      (re += f * Ze),
      (le += f * Ce),
      (ce += f * Xe),
      (he += f * S),
      (me += f * h),
      (ve += f * p),
      (we += f * P),
      (pe += f * A),
      (kt += f * T),
      (Un += f * j),
      (Er += f * Y),
      (Mn += f * se),
      (f = N[14]),
      ($ += f * Ve),
      (J += f * Re),
      (ae += f * be),
      (re += f * He),
      (le += f * Ze),
      (ce += f * Ce),
      (he += f * Xe),
      (me += f * S),
      (ve += f * h),
      (we += f * p),
      (pe += f * P),
      (kt += f * A),
      (Un += f * T),
      (Er += f * j),
      (Mn += f * Y),
      (la += f * se),
      (f = N[15]),
      (J += f * Ve),
      (ae += f * Re),
      (re += f * be),
      (le += f * He),
      (ce += f * Ze),
      (he += f * Ce),
      (me += f * Xe),
      (ve += f * S),
      (we += f * h),
      (pe += f * p),
      (kt += f * P),
      (Un += f * A),
      (Er += f * T),
      (Mn += f * j),
      (la += f * Y),
      (qo += f * se),
      (O += 38 * ae),
      (I += 38 * re),
      (H += 38 * le),
      (Z += 38 * ce),
      (X += 38 * he),
      (te += 38 * me),
      (ne += 38 * ve),
      (ee += 38 * we),
      (B += 38 * pe),
      (L += 38 * kt),
      (z += 38 * Un),
      (G += 38 * Er),
      (V += 38 * Mn),
      (K += 38 * la),
      ($ += 38 * qo),
      (k = 1),
      (f = O + k + 65535),
      (k = Math.floor(f / 65536)),
      (O = f - k * 65536),
      (f = I + k + 65535),
      (k = Math.floor(f / 65536)),
      (I = f - k * 65536),
      (f = H + k + 65535),
      (k = Math.floor(f / 65536)),
      (H = f - k * 65536),
      (f = Z + k + 65535),
      (k = Math.floor(f / 65536)),
      (Z = f - k * 65536),
      (f = X + k + 65535),
      (k = Math.floor(f / 65536)),
      (X = f - k * 65536),
      (f = te + k + 65535),
      (k = Math.floor(f / 65536)),
      (te = f - k * 65536),
      (f = ne + k + 65535),
      (k = Math.floor(f / 65536)),
      (ne = f - k * 65536),
      (f = ee + k + 65535),
      (k = Math.floor(f / 65536)),
      (ee = f - k * 65536),
      (f = B + k + 65535),
      (k = Math.floor(f / 65536)),
      (B = f - k * 65536),
      (f = L + k + 65535),
      (k = Math.floor(f / 65536)),
      (L = f - k * 65536),
      (f = z + k + 65535),
      (k = Math.floor(f / 65536)),
      (z = f - k * 65536),
      (f = G + k + 65535),
      (k = Math.floor(f / 65536)),
      (G = f - k * 65536),
      (f = V + k + 65535),
      (k = Math.floor(f / 65536)),
      (V = f - k * 65536),
      (f = K + k + 65535),
      (k = Math.floor(f / 65536)),
      (K = f - k * 65536),
      (f = $ + k + 65535),
      (k = Math.floor(f / 65536)),
      ($ = f - k * 65536),
      (f = J + k + 65535),
      (k = Math.floor(f / 65536)),
      (J = f - k * 65536),
      (O += k - 1 + 37 * (k - 1)),
      (k = 1),
      (f = O + k + 65535),
      (k = Math.floor(f / 65536)),
      (O = f - k * 65536),
      (f = I + k + 65535),
      (k = Math.floor(f / 65536)),
      (I = f - k * 65536),
      (f = H + k + 65535),
      (k = Math.floor(f / 65536)),
      (H = f - k * 65536),
      (f = Z + k + 65535),
      (k = Math.floor(f / 65536)),
      (Z = f - k * 65536),
      (f = X + k + 65535),
      (k = Math.floor(f / 65536)),
      (X = f - k * 65536),
      (f = te + k + 65535),
      (k = Math.floor(f / 65536)),
      (te = f - k * 65536),
      (f = ne + k + 65535),
      (k = Math.floor(f / 65536)),
      (ne = f - k * 65536),
      (f = ee + k + 65535),
      (k = Math.floor(f / 65536)),
      (ee = f - k * 65536),
      (f = B + k + 65535),
      (k = Math.floor(f / 65536)),
      (B = f - k * 65536),
      (f = L + k + 65535),
      (k = Math.floor(f / 65536)),
      (L = f - k * 65536),
      (f = z + k + 65535),
      (k = Math.floor(f / 65536)),
      (z = f - k * 65536),
      (f = G + k + 65535),
      (k = Math.floor(f / 65536)),
      (G = f - k * 65536),
      (f = V + k + 65535),
      (k = Math.floor(f / 65536)),
      (V = f - k * 65536),
      (f = K + k + 65535),
      (k = Math.floor(f / 65536)),
      (K = f - k * 65536),
      (f = $ + k + 65535),
      (k = Math.floor(f / 65536)),
      ($ = f - k * 65536),
      (f = J + k + 65535),
      (k = Math.floor(f / 65536)),
      (J = f - k * 65536),
      (O += k - 1 + 37 * (k - 1)),
      (E[0] = O),
      (E[1] = I),
      (E[2] = H),
      (E[3] = Z),
      (E[4] = X),
      (E[5] = te),
      (E[6] = ne),
      (E[7] = ee),
      (E[8] = B),
      (E[9] = L),
      (E[10] = z),
      (E[11] = G),
      (E[12] = V),
      (E[13] = K),
      (E[14] = $),
      (E[15] = J);
  }
  function v(E, N) {
    m(E, N, N);
  }
  function b(E, N) {
    const D = r();
    for (let f = 0; f < 16; f++) D[f] = N[f];
    for (let f = 253; f >= 0; f--) v(D, D), f !== 2 && f !== 4 && m(D, D, N);
    for (let f = 0; f < 16; f++) E[f] = D[f];
  }
  function _(E, N) {
    const D = new Uint8Array(32),
      f = new Float64Array(80),
      k = r(),
      O = r(),
      I = r(),
      H = r(),
      Z = r(),
      X = r();
    for (let B = 0; B < 31; B++) D[B] = E[B];
    (D[31] = (E[31] & 127) | 64), (D[0] &= 248), u(f, N);
    for (let B = 0; B < 16; B++) O[B] = f[B];
    k[0] = H[0] = 1;
    for (let B = 254; B >= 0; --B) {
      const L = (D[B >>> 3] >>> (B & 7)) & 1;
      s(k, O, L),
        s(I, H, L),
        c(Z, k, I),
        d(k, k, I),
        c(I, O, H),
        d(O, O, H),
        v(H, Z),
        v(X, k),
        m(k, I, k),
        m(I, O, Z),
        c(Z, k, I),
        d(k, k, I),
        v(O, k),
        d(I, H, X),
        m(k, I, a),
        c(k, k, H),
        m(I, I, k),
        m(k, H, X),
        m(H, O, f),
        v(O, Z),
        s(k, O, L),
        s(I, H, L);
    }
    for (let B = 0; B < 16; B++)
      (f[B + 16] = k[B]),
        (f[B + 32] = I[B]),
        (f[B + 48] = O[B]),
        (f[B + 64] = H[B]);
    const te = f.subarray(32),
      ne = f.subarray(16);
    b(te, te), m(ne, ne, te);
    const ee = new Uint8Array(32);
    return l(ee, ne), ee;
  }
  e.scalarMult = _;
  function C(E) {
    return _(E, i);
  }
  e.scalarMultBase = C;
  function x(E) {
    if (E.length !== e.SECRET_KEY_LENGTH)
      throw new Error(`x25519: seed must be ${e.SECRET_KEY_LENGTH} bytes`);
    const N = new Uint8Array(E);
    return { publicKey: C(N), secretKey: N };
  }
  e.generateKeyPairFromSeed = x;
  function g(E) {
    const N = (0, t.randomBytes)(32, E),
      D = x(N);
    return (0, n.wipe)(N), D;
  }
  e.generateKeyPair = g;
  function w(E, N, D = !1) {
    if (E.length !== e.PUBLIC_KEY_LENGTH)
      throw new Error("X25519: incorrect secret key length");
    if (N.length !== e.PUBLIC_KEY_LENGTH)
      throw new Error("X25519: incorrect public key length");
    const f = _(E, N);
    if (D) {
      let k = 0;
      for (let O = 0; O < f.length; O++) k |= f[O];
      if (k === 0) throw new Error("X25519: invalid shared key");
    }
    return f;
  }
  e.sharedKey = w;
})(N0);
function D0(e) {
  return globalThis.Buffer != null
    ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength)
    : e;
}
function Lw(e = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null
    ? D0(globalThis.Buffer.allocUnsafe(e))
    : new Uint8Array(e);
}
function p1(e, t) {
  t || (t = e.reduce((i, a) => i + a.length, 0));
  const n = Lw(t);
  let r = 0;
  for (const i of e) n.set(i, r), (r += i.length);
  return D0(n);
}
function cD(e, t) {
  if (e.length >= 255) throw new TypeError("Alphabet too long");
  for (var n = new Uint8Array(256), r = 0; r < n.length; r++) n[r] = 255;
  for (var i = 0; i < e.length; i++) {
    var a = e.charAt(i),
      o = a.charCodeAt(0);
    if (n[o] !== 255) throw new TypeError(a + " is ambiguous");
    n[o] = i;
  }
  var s = e.length,
    l = e.charAt(0),
    u = Math.log(s) / Math.log(256),
    c = Math.log(256) / Math.log(s);
  function d(b) {
    if (
      (b instanceof Uint8Array ||
        (ArrayBuffer.isView(b)
          ? (b = new Uint8Array(b.buffer, b.byteOffset, b.byteLength))
          : Array.isArray(b) && (b = Uint8Array.from(b))),
      !(b instanceof Uint8Array))
    )
      throw new TypeError("Expected Uint8Array");
    if (b.length === 0) return "";
    for (var _ = 0, C = 0, x = 0, g = b.length; x !== g && b[x] === 0; )
      x++, _++;
    for (var w = ((g - x) * c + 1) >>> 0, E = new Uint8Array(w); x !== g; ) {
      for (
        var N = b[x], D = 0, f = w - 1;
        (N !== 0 || D < C) && f !== -1;
        f--, D++
      )
        (N += (256 * E[f]) >>> 0), (E[f] = N % s >>> 0), (N = (N / s) >>> 0);
      if (N !== 0) throw new Error("Non-zero carry");
      (C = D), x++;
    }
    for (var k = w - C; k !== w && E[k] === 0; ) k++;
    for (var O = l.repeat(_); k < w; ++k) O += e.charAt(E[k]);
    return O;
  }
  function m(b) {
    if (typeof b != "string") throw new TypeError("Expected String");
    if (b.length === 0) return new Uint8Array();
    var _ = 0;
    if (b[_] !== " ") {
      for (var C = 0, x = 0; b[_] === l; ) C++, _++;
      for (
        var g = ((b.length - _) * u + 1) >>> 0, w = new Uint8Array(g);
        b[_];

      ) {
        var E = n[b.charCodeAt(_)];
        if (E === 255) return;
        for (var N = 0, D = g - 1; (E !== 0 || N < x) && D !== -1; D--, N++)
          (E += (s * w[D]) >>> 0),
            (w[D] = E % 256 >>> 0),
            (E = (E / 256) >>> 0);
        if (E !== 0) throw new Error("Non-zero carry");
        (x = N), _++;
      }
      if (b[_] !== " ") {
        for (var f = g - x; f !== g && w[f] === 0; ) f++;
        for (var k = new Uint8Array(C + (g - f)), O = C; f !== g; )
          k[O++] = w[f++];
        return k;
      }
    }
  }
  function v(b) {
    var _ = m(b);
    if (_) return _;
    throw new Error(`Non-${t} character`);
  }
  return { encode: d, decodeUnsafe: m, decode: v };
}
var fD = cD,
  dD = fD;
const hD = (e) => {
    if (e instanceof Uint8Array && e.constructor.name === "Uint8Array")
      return e;
    if (e instanceof ArrayBuffer) return new Uint8Array(e);
    if (ArrayBuffer.isView(e))
      return new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
    throw new Error("Unknown type, must be binary type");
  },
  pD = (e) => new TextEncoder().encode(e),
  mD = (e) => new TextDecoder().decode(e);
class gD {
  constructor(t, n, r) {
    (this.name = t), (this.prefix = n), (this.baseEncode = r);
  }
  encode(t) {
    if (t instanceof Uint8Array) return `${this.prefix}${this.baseEncode(t)}`;
    throw Error("Unknown type, must be binary type");
  }
}
class yD {
  constructor(t, n, r) {
    if (((this.name = t), (this.prefix = n), n.codePointAt(0) === void 0))
      throw new Error("Invalid prefix character");
    (this.prefixCodePoint = n.codePointAt(0)), (this.baseDecode = r);
  }
  decode(t) {
    if (typeof t == "string") {
      if (t.codePointAt(0) !== this.prefixCodePoint)
        throw Error(
          `Unable to decode multibase string ${JSON.stringify(t)}, ${
            this.name
          } decoder only supports inputs prefixed with ${this.prefix}`
        );
      return this.baseDecode(t.slice(this.prefix.length));
    } else throw Error("Can only multibase decode strings");
  }
  or(t) {
    return Fw(this, t);
  }
}
class vD {
  constructor(t) {
    this.decoders = t;
  }
  or(t) {
    return Fw(this, t);
  }
  decode(t) {
    const n = t[0],
      r = this.decoders[n];
    if (r) return r.decode(t);
    throw RangeError(
      `Unable to decode multibase string ${JSON.stringify(
        t
      )}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`
    );
  }
}
const Fw = (e, t) =>
  new vD({
    ...(e.decoders || { [e.prefix]: e }),
    ...(t.decoders || { [t.prefix]: t }),
  });
class wD {
  constructor(t, n, r, i) {
    (this.name = t),
      (this.prefix = n),
      (this.baseEncode = r),
      (this.baseDecode = i),
      (this.encoder = new gD(t, n, r)),
      (this.decoder = new yD(t, n, i));
  }
  encode(t) {
    return this.encoder.encode(t);
  }
  decode(t) {
    return this.decoder.decode(t);
  }
}
const Mu = ({ name: e, prefix: t, encode: n, decode: r }) => new wD(e, t, n, r),
  $o = ({ prefix: e, name: t, alphabet: n }) => {
    const { encode: r, decode: i } = dD(n, t);
    return Mu({ prefix: e, name: t, encode: r, decode: (a) => hD(i(a)) });
  },
  bD = (e, t, n, r) => {
    const i = {};
    for (let c = 0; c < t.length; ++c) i[t[c]] = c;
    let a = e.length;
    for (; e[a - 1] === "="; ) --a;
    const o = new Uint8Array(((a * n) / 8) | 0);
    let s = 0,
      l = 0,
      u = 0;
    for (let c = 0; c < a; ++c) {
      const d = i[e[c]];
      if (d === void 0) throw new SyntaxError(`Non-${r} character`);
      (l = (l << n) | d),
        (s += n),
        s >= 8 && ((s -= 8), (o[u++] = 255 & (l >> s)));
    }
    if (s >= n || 255 & (l << (8 - s)))
      throw new SyntaxError("Unexpected end of data");
    return o;
  },
  xD = (e, t, n) => {
    const r = t[t.length - 1] === "=",
      i = (1 << n) - 1;
    let a = "",
      o = 0,
      s = 0;
    for (let l = 0; l < e.length; ++l)
      for (s = (s << 8) | e[l], o += 8; o > n; )
        (o -= n), (a += t[i & (s >> o)]);
    if ((o && (a += t[i & (s << (n - o))]), r))
      for (; (a.length * n) & 7; ) a += "=";
    return a;
  },
  at = ({ name: e, prefix: t, bitsPerChar: n, alphabet: r }) =>
    Mu({
      prefix: t,
      name: e,
      encode(i) {
        return xD(i, r, n);
      },
      decode(i) {
        return bD(i, r, n, e);
      },
    }),
  ED = Mu({
    prefix: "\0",
    name: "identity",
    encode: (e) => mD(e),
    decode: (e) => pD(e),
  }),
  SD = Object.freeze(
    Object.defineProperty(
      { __proto__: null, identity: ED },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  CD = at({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 }),
  _D = Object.freeze(
    Object.defineProperty({ __proto__: null, base2: CD }, Symbol.toStringTag, {
      value: "Module",
    })
  ),
  kD = at({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 }),
  ND = Object.freeze(
    Object.defineProperty({ __proto__: null, base8: kD }, Symbol.toStringTag, {
      value: "Module",
    })
  ),
  DD = $o({ prefix: "9", name: "base10", alphabet: "0123456789" }),
  PD = Object.freeze(
    Object.defineProperty({ __proto__: null, base10: DD }, Symbol.toStringTag, {
      value: "Module",
    })
  ),
  AD = at({
    prefix: "f",
    name: "base16",
    alphabet: "0123456789abcdef",
    bitsPerChar: 4,
  }),
  TD = at({
    prefix: "F",
    name: "base16upper",
    alphabet: "0123456789ABCDEF",
    bitsPerChar: 4,
  }),
  OD = Object.freeze(
    Object.defineProperty(
      { __proto__: null, base16: AD, base16upper: TD },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  jD = at({
    prefix: "b",
    name: "base32",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567",
    bitsPerChar: 5,
  }),
  ID = at({
    prefix: "B",
    name: "base32upper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    bitsPerChar: 5,
  }),
  LD = at({
    prefix: "c",
    name: "base32pad",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
    bitsPerChar: 5,
  }),
  FD = at({
    prefix: "C",
    name: "base32padupper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
    bitsPerChar: 5,
  }),
  UD = at({
    prefix: "v",
    name: "base32hex",
    alphabet: "0123456789abcdefghijklmnopqrstuv",
    bitsPerChar: 5,
  }),
  MD = at({
    prefix: "V",
    name: "base32hexupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
    bitsPerChar: 5,
  }),
  RD = at({
    prefix: "t",
    name: "base32hexpad",
    alphabet: "0123456789abcdefghijklmnopqrstuv=",
    bitsPerChar: 5,
  }),
  BD = at({
    prefix: "T",
    name: "base32hexpadupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
    bitsPerChar: 5,
  }),
  $D = at({
    prefix: "h",
    name: "base32z",
    alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
    bitsPerChar: 5,
  }),
  zD = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        base32: jD,
        base32hex: UD,
        base32hexpad: RD,
        base32hexpadupper: BD,
        base32hexupper: MD,
        base32pad: LD,
        base32padupper: FD,
        base32upper: ID,
        base32z: $D,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  WD = $o({
    prefix: "k",
    name: "base36",
    alphabet: "0123456789abcdefghijklmnopqrstuvwxyz",
  }),
  HD = $o({
    prefix: "K",
    name: "base36upper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  }),
  qD = Object.freeze(
    Object.defineProperty(
      { __proto__: null, base36: WD, base36upper: HD },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  VD = $o({
    name: "base58btc",
    prefix: "z",
    alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
  }),
  GD = $o({
    name: "base58flickr",
    prefix: "Z",
    alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
  }),
  QD = Object.freeze(
    Object.defineProperty(
      { __proto__: null, base58btc: VD, base58flickr: GD },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  KD = at({
    prefix: "m",
    name: "base64",
    alphabet:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    bitsPerChar: 6,
  }),
  YD = at({
    prefix: "M",
    name: "base64pad",
    alphabet:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    bitsPerChar: 6,
  }),
  ZD = at({
    prefix: "u",
    name: "base64url",
    alphabet:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    bitsPerChar: 6,
  }),
  XD = at({
    prefix: "U",
    name: "base64urlpad",
    alphabet:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
    bitsPerChar: 6,
  }),
  JD = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        base64: KD,
        base64pad: YD,
        base64url: ZD,
        base64urlpad: XD,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Uw = Array.from(
    "🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"
  ),
  e7 = Uw.reduce((e, t, n) => ((e[n] = t), e), []),
  t7 = Uw.reduce((e, t, n) => ((e[t.codePointAt(0)] = n), e), []);
function n7(e) {
  return e.reduce((t, n) => ((t += e7[n]), t), "");
}
function r7(e) {
  const t = [];
  for (const n of e) {
    const r = t7[n.codePointAt(0)];
    if (r === void 0) throw new Error(`Non-base256emoji character: ${n}`);
    t.push(r);
  }
  return new Uint8Array(t);
}
const i7 = Mu({ prefix: "🚀", name: "base256emoji", encode: n7, decode: r7 }),
  a7 = Object.freeze(
    Object.defineProperty(
      { __proto__: null, base256emoji: i7 },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
new TextEncoder();
new TextDecoder();
const m1 = {
  ...SD,
  ..._D,
  ...ND,
  ...PD,
  ...OD,
  ...zD,
  ...qD,
  ...QD,
  ...JD,
  ...a7,
};
function Mw(e, t, n, r) {
  return {
    name: e,
    prefix: t,
    encoder: { name: e, prefix: t, encode: n },
    decoder: { decode: r },
  };
}
const g1 = Mw(
    "utf8",
    "u",
    (e) => "u" + new TextDecoder("utf8").decode(e),
    (e) => new TextEncoder().encode(e.substring(1))
  ),
  Lc = Mw(
    "ascii",
    "a",
    (e) => {
      let t = "a";
      for (let n = 0; n < e.length; n++) t += String.fromCharCode(e[n]);
      return t;
    },
    (e) => {
      e = e.substring(1);
      const t = Lw(e.length);
      for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
      return t;
    }
  ),
  Rw = {
    utf8: g1,
    "utf-8": g1,
    hex: m1.base16,
    latin1: Lc,
    ascii: Lc,
    binary: Lc,
    ...m1,
  };
function Xt(e, t = "utf8") {
  const n = Rw[t];
  if (!n) throw new Error(`Unsupported encoding "${t}"`);
  return (t === "utf8" || t === "utf-8") &&
    globalThis.Buffer != null &&
    globalThis.Buffer.from != null
    ? D0(globalThis.Buffer.from(e, "utf-8"))
    : n.decoder.decode(`${n.prefix}${e}`);
}
function rn(e, t = "utf8") {
  const n = Rw[t];
  if (!n) throw new Error(`Unsupported encoding "${t}"`);
  return (t === "utf8" || t === "utf-8") &&
    globalThis.Buffer != null &&
    globalThis.Buffer.from != null
    ? globalThis.Buffer.from(e.buffer, e.byteOffset, e.byteLength).toString(
        "utf8"
      )
    : n.encoder.encode(e).substring(1);
}
var y1 =
    (globalThis && globalThis.__spreadArray) ||
    function (e, t, n) {
      if (n || arguments.length === 2)
        for (var r = 0, i = t.length, a; r < i; r++)
          (a || !(r in t)) &&
            (a || (a = Array.prototype.slice.call(t, 0, r)), (a[r] = t[r]));
      return e.concat(a || Array.prototype.slice.call(t));
    },
  o7 = (function () {
    function e(t, n, r) {
      (this.name = t),
        (this.version = n),
        (this.os = r),
        (this.type = "browser");
    }
    return e;
  })(),
  s7 = (function () {
    function e(t) {
      (this.version = t),
        (this.type = "node"),
        (this.name = "node"),
        (this.os = process.platform);
    }
    return e;
  })(),
  l7 = (function () {
    function e(t, n, r, i) {
      (this.name = t),
        (this.version = n),
        (this.os = r),
        (this.bot = i),
        (this.type = "bot-device");
    }
    return e;
  })(),
  u7 = (function () {
    function e() {
      (this.type = "bot"),
        (this.bot = !0),
        (this.name = "bot"),
        (this.version = null),
        (this.os = null);
    }
    return e;
  })(),
  c7 = (function () {
    function e() {
      (this.type = "react-native"),
        (this.name = "react-native"),
        (this.version = null),
        (this.os = null);
    }
    return e;
  })(),
  f7 =
    /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/,
  d7 =
    /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/,
  v1 = 3,
  h7 = [
    ["aol", /AOLShield\/([0-9\._]+)/],
    ["edge", /Edge\/([0-9\._]+)/],
    ["edge-ios", /EdgiOS\/([0-9\._]+)/],
    ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
    ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
    ["samsung", /SamsungBrowser\/([0-9\.]+)/],
    ["silk", /\bSilk\/([0-9._-]+)\b/],
    ["miui", /MiuiBrowser\/([0-9\.]+)$/],
    ["beaker", /BeakerBrowser\/([0-9\.]+)/],
    ["edge-chromium", /EdgA?\/([0-9\.]+)/],
    [
      "chromium-webview",
      /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/,
    ],
    ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
    ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
    ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
    ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
    ["fxios", /FxiOS\/([0-9\.]+)/],
    ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
    ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
    ["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
    ["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
    [
      "pie",
      /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/,
    ],
    ["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
    ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
    ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
    ["ie", /MSIE\s(7\.0)/],
    ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
    ["android", /Android\s([0-9\.]+)/],
    ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
    ["safari", /Version\/([0-9\._]+).*Safari/],
    ["facebook", /FB[AS]V\/([0-9\.]+)/],
    ["instagram", /Instagram\s([0-9\.]+)/],
    ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
    ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
    ["curl", /^curl\/([0-9\.]+)$/],
    ["searchbot", f7],
  ],
  w1 = [
    ["iOS", /iP(hone|od|ad)/],
    ["Android OS", /Android/],
    ["BlackBerry OS", /BlackBerry|BB10/],
    ["Windows Mobile", /IEMobile/],
    ["Amazon OS", /Kindle/],
    ["Windows 3.11", /Win16/],
    ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
    ["Windows 98", /(Windows 98)|(Win98)/],
    ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
    ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
    ["Windows Server 2003", /(Windows NT 5.2)/],
    ["Windows Vista", /(Windows NT 6.0)/],
    ["Windows 7", /(Windows NT 6.1)/],
    ["Windows 8", /(Windows NT 6.2)/],
    ["Windows 8.1", /(Windows NT 6.3)/],
    ["Windows 10", /(Windows NT 10.0)/],
    ["Windows ME", /Windows ME/],
    ["Windows CE", /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
    ["Open BSD", /OpenBSD/],
    ["Sun OS", /SunOS/],
    ["Chrome OS", /CrOS/],
    ["Linux", /(Linux)|(X11)/],
    ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
    ["QNX", /QNX/],
    ["BeOS", /BeOS/],
    ["OS/2", /OS\/2/],
  ];
function p7(e) {
  return e
    ? b1(e)
    : typeof document > "u" &&
      typeof navigator < "u" &&
      navigator.product === "ReactNative"
    ? new c7()
    : typeof navigator < "u"
    ? b1(navigator.userAgent)
    : y7();
}
function m7(e) {
  return (
    e !== "" &&
    h7.reduce(function (t, n) {
      var r = n[0],
        i = n[1];
      if (t) return t;
      var a = i.exec(e);
      return !!a && [r, a];
    }, !1)
  );
}
function b1(e) {
  var t = m7(e);
  if (!t) return null;
  var n = t[0],
    r = t[1];
  if (n === "searchbot") return new u7();
  var i = r[1] && r[1].split(".").join("_").split("_").slice(0, 3);
  i
    ? i.length < v1 && (i = y1(y1([], i, !0), v7(v1 - i.length), !0))
    : (i = []);
  var a = i.join("."),
    o = g7(e),
    s = d7.exec(e);
  return s && s[1] ? new l7(n, a, o, s[1]) : new o7(n, a, o);
}
function g7(e) {
  for (var t = 0, n = w1.length; t < n; t++) {
    var r = w1[t],
      i = r[0],
      a = r[1],
      o = a.exec(e);
    if (o) return i;
  }
  return null;
}
function y7() {
  var e = typeof process < "u" && process.version;
  return e ? new s7(process.version.slice(1)) : null;
}
function v7(e) {
  for (var t = [], n = 0; n < e; n++) t.push("0");
  return t;
}
var Mr = {};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var Nd =
  function (e, t) {
    return (
      (Nd =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (n, r) {
            n.__proto__ = r;
          }) ||
        function (n, r) {
          for (var i in r) r.hasOwnProperty(i) && (n[i] = r[i]);
        }),
      Nd(e, t)
    );
  };
function w7(e, t) {
  Nd(e, t);
  function n() {
    this.constructor = e;
  }
  e.prototype =
    t === null ? Object.create(t) : ((n.prototype = t.prototype), new n());
}
var Dd = function () {
  return (
    (Dd =
      Object.assign ||
      function (t) {
        for (var n, r = 1, i = arguments.length; r < i; r++) {
          n = arguments[r];
          for (var a in n)
            Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
        }
        return t;
      }),
    Dd.apply(this, arguments)
  );
};
function b7(e, t) {
  var n = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) &&
      t.indexOf(r) < 0 &&
      (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
        (n[r[i]] = e[r[i]]);
  return n;
}
function x7(e, t, n, r) {
  var i = arguments.length,
    a =
      i < 3 ? t : r === null ? (r = Object.getOwnPropertyDescriptor(t, n)) : r,
    o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    a = Reflect.decorate(e, t, n, r);
  else
    for (var s = e.length - 1; s >= 0; s--)
      (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
  return i > 3 && a && Object.defineProperty(t, n, a), a;
}
function E7(e, t) {
  return function (n, r) {
    t(n, r, e);
  };
}
function S7(e, t) {
  if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
    return Reflect.metadata(e, t);
}
function C7(e, t, n, r) {
  function i(a) {
    return a instanceof n
      ? a
      : new n(function (o) {
          o(a);
        });
  }
  return new (n || (n = Promise))(function (a, o) {
    function s(c) {
      try {
        u(r.next(c));
      } catch (d) {
        o(d);
      }
    }
    function l(c) {
      try {
        u(r.throw(c));
      } catch (d) {
        o(d);
      }
    }
    function u(c) {
      c.done ? a(c.value) : i(c.value).then(s, l);
    }
    u((r = r.apply(e, t || [])).next());
  });
}
function _7(e, t) {
  var n = {
      label: 0,
      sent: function () {
        if (a[0] & 1) throw a[1];
        return a[1];
      },
      trys: [],
      ops: [],
    },
    r,
    i,
    a,
    o;
  return (
    (o = { next: s(0), throw: s(1), return: s(2) }),
    typeof Symbol == "function" &&
      (o[Symbol.iterator] = function () {
        return this;
      }),
    o
  );
  function s(u) {
    return function (c) {
      return l([u, c]);
    };
  }
  function l(u) {
    if (r) throw new TypeError("Generator is already executing.");
    for (; n; )
      try {
        if (
          ((r = 1),
          i &&
            (a =
              u[0] & 2
                ? i.return
                : u[0]
                ? i.throw || ((a = i.return) && a.call(i), 0)
                : i.next) &&
            !(a = a.call(i, u[1])).done)
        )
          return a;
        switch (((i = 0), a && (u = [u[0] & 2, a.value]), u[0])) {
          case 0:
          case 1:
            a = u;
            break;
          case 4:
            return n.label++, { value: u[1], done: !1 };
          case 5:
            n.label++, (i = u[1]), (u = [0]);
            continue;
          case 7:
            (u = n.ops.pop()), n.trys.pop();
            continue;
          default:
            if (
              ((a = n.trys),
              !(a = a.length > 0 && a[a.length - 1]) &&
                (u[0] === 6 || u[0] === 2))
            ) {
              n = 0;
              continue;
            }
            if (u[0] === 3 && (!a || (u[1] > a[0] && u[1] < a[3]))) {
              n.label = u[1];
              break;
            }
            if (u[0] === 6 && n.label < a[1]) {
              (n.label = a[1]), (a = u);
              break;
            }
            if (a && n.label < a[2]) {
              (n.label = a[2]), n.ops.push(u);
              break;
            }
            a[2] && n.ops.pop(), n.trys.pop();
            continue;
        }
        u = t.call(e, n);
      } catch (c) {
        (u = [6, c]), (i = 0);
      } finally {
        r = a = 0;
      }
    if (u[0] & 5) throw u[1];
    return { value: u[0] ? u[1] : void 0, done: !0 };
  }
}
function k7(e, t, n, r) {
  r === void 0 && (r = n), (e[r] = t[n]);
}
function N7(e, t) {
  for (var n in e) n !== "default" && !t.hasOwnProperty(n) && (t[n] = e[n]);
}
function Pd(e) {
  var t = typeof Symbol == "function" && Symbol.iterator,
    n = t && e[t],
    r = 0;
  if (n) return n.call(e);
  if (e && typeof e.length == "number")
    return {
      next: function () {
        return (
          e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }
        );
      },
    };
  throw new TypeError(
    t ? "Object is not iterable." : "Symbol.iterator is not defined."
  );
}
function Bw(e, t) {
  var n = typeof Symbol == "function" && e[Symbol.iterator];
  if (!n) return e;
  var r = n.call(e),
    i,
    a = [],
    o;
  try {
    for (; (t === void 0 || t-- > 0) && !(i = r.next()).done; ) a.push(i.value);
  } catch (s) {
    o = { error: s };
  } finally {
    try {
      i && !i.done && (n = r.return) && n.call(r);
    } finally {
      if (o) throw o.error;
    }
  }
  return a;
}
function D7() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e = e.concat(Bw(arguments[t]));
  return e;
}
function P7() {
  for (var e = 0, t = 0, n = arguments.length; t < n; t++)
    e += arguments[t].length;
  for (var r = Array(e), i = 0, t = 0; t < n; t++)
    for (var a = arguments[t], o = 0, s = a.length; o < s; o++, i++)
      r[i] = a[o];
  return r;
}
function So(e) {
  return this instanceof So ? ((this.v = e), this) : new So(e);
}
function A7(e, t, n) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = n.apply(e, t || []),
    i,
    a = [];
  return (
    (i = {}),
    o("next"),
    o("throw"),
    o("return"),
    (i[Symbol.asyncIterator] = function () {
      return this;
    }),
    i
  );
  function o(m) {
    r[m] &&
      (i[m] = function (v) {
        return new Promise(function (b, _) {
          a.push([m, v, b, _]) > 1 || s(m, v);
        });
      });
  }
  function s(m, v) {
    try {
      l(r[m](v));
    } catch (b) {
      d(a[0][3], b);
    }
  }
  function l(m) {
    m.value instanceof So
      ? Promise.resolve(m.value.v).then(u, c)
      : d(a[0][2], m);
  }
  function u(m) {
    s("next", m);
  }
  function c(m) {
    s("throw", m);
  }
  function d(m, v) {
    m(v), a.shift(), a.length && s(a[0][0], a[0][1]);
  }
}
function T7(e) {
  var t, n;
  return (
    (t = {}),
    r("next"),
    r("throw", function (i) {
      throw i;
    }),
    r("return"),
    (t[Symbol.iterator] = function () {
      return this;
    }),
    t
  );
  function r(i, a) {
    t[i] = e[i]
      ? function (o) {
          return (n = !n)
            ? { value: So(e[i](o)), done: i === "return" }
            : a
            ? a(o)
            : o;
        }
      : a;
  }
}
function O7(e) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator],
    n;
  return t
    ? t.call(e)
    : ((e = typeof Pd == "function" ? Pd(e) : e[Symbol.iterator]()),
      (n = {}),
      r("next"),
      r("throw"),
      r("return"),
      (n[Symbol.asyncIterator] = function () {
        return this;
      }),
      n);
  function r(a) {
    n[a] =
      e[a] &&
      function (o) {
        return new Promise(function (s, l) {
          (o = e[a](o)), i(s, l, o.done, o.value);
        });
      };
  }
  function i(a, o, s, l) {
    Promise.resolve(l).then(function (u) {
      a({ value: u, done: s });
    }, o);
  }
}
function j7(e, t) {
  return (
    Object.defineProperty
      ? Object.defineProperty(e, "raw", { value: t })
      : (e.raw = t),
    e
  );
}
function I7(e) {
  if (e && e.__esModule) return e;
  var t = {};
  if (e != null)
    for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
  return (t.default = e), t;
}
function L7(e) {
  return e && e.__esModule ? e : { default: e };
}
function F7(e, t) {
  if (!t.has(e))
    throw new TypeError("attempted to get private field on non-instance");
  return t.get(e);
}
function U7(e, t, n) {
  if (!t.has(e))
    throw new TypeError("attempted to set private field on non-instance");
  return t.set(e, n), n;
}
const M7 = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        get __assign() {
          return Dd;
        },
        __asyncDelegator: T7,
        __asyncGenerator: A7,
        __asyncValues: O7,
        __await: So,
        __awaiter: C7,
        __classPrivateFieldGet: F7,
        __classPrivateFieldSet: U7,
        __createBinding: k7,
        __decorate: x7,
        __exportStar: N7,
        __extends: w7,
        __generator: _7,
        __importDefault: L7,
        __importStar: I7,
        __makeTemplateObject: j7,
        __metadata: S7,
        __param: E7,
        __read: Bw,
        __rest: b7,
        __spread: D7,
        __spreadArrays: P7,
        __values: Pd,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Ru = W1(M7);
var Fc = {},
  wa = {},
  x1;
function R7() {
  if (x1) return wa;
  (x1 = 1),
    Object.defineProperty(wa, "__esModule", { value: !0 }),
    (wa.delay = void 0);
  function e(t) {
    return new Promise((n) => {
      setTimeout(() => {
        n(!0);
      }, t);
    });
  }
  return (wa.delay = e), wa;
}
var Sr = {},
  Uc = {},
  Cr = {},
  E1;
function B7() {
  return (
    E1 ||
      ((E1 = 1),
      Object.defineProperty(Cr, "__esModule", { value: !0 }),
      (Cr.ONE_THOUSAND = Cr.ONE_HUNDRED = void 0),
      (Cr.ONE_HUNDRED = 100),
      (Cr.ONE_THOUSAND = 1e3)),
    Cr
  );
}
var Mc = {},
  S1;
function $7() {
  return (
    S1 ||
      ((S1 = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.ONE_YEAR =
            e.FOUR_WEEKS =
            e.THREE_WEEKS =
            e.TWO_WEEKS =
            e.ONE_WEEK =
            e.THIRTY_DAYS =
            e.SEVEN_DAYS =
            e.FIVE_DAYS =
            e.THREE_DAYS =
            e.ONE_DAY =
            e.TWENTY_FOUR_HOURS =
            e.TWELVE_HOURS =
            e.SIX_HOURS =
            e.THREE_HOURS =
            e.ONE_HOUR =
            e.SIXTY_MINUTES =
            e.THIRTY_MINUTES =
            e.TEN_MINUTES =
            e.FIVE_MINUTES =
            e.ONE_MINUTE =
            e.SIXTY_SECONDS =
            e.THIRTY_SECONDS =
            e.TEN_SECONDS =
            e.FIVE_SECONDS =
            e.ONE_SECOND =
              void 0),
          (e.ONE_SECOND = 1),
          (e.FIVE_SECONDS = 5),
          (e.TEN_SECONDS = 10),
          (e.THIRTY_SECONDS = 30),
          (e.SIXTY_SECONDS = 60),
          (e.ONE_MINUTE = e.SIXTY_SECONDS),
          (e.FIVE_MINUTES = e.ONE_MINUTE * 5),
          (e.TEN_MINUTES = e.ONE_MINUTE * 10),
          (e.THIRTY_MINUTES = e.ONE_MINUTE * 30),
          (e.SIXTY_MINUTES = e.ONE_MINUTE * 60),
          (e.ONE_HOUR = e.SIXTY_MINUTES),
          (e.THREE_HOURS = e.ONE_HOUR * 3),
          (e.SIX_HOURS = e.ONE_HOUR * 6),
          (e.TWELVE_HOURS = e.ONE_HOUR * 12),
          (e.TWENTY_FOUR_HOURS = e.ONE_HOUR * 24),
          (e.ONE_DAY = e.TWENTY_FOUR_HOURS),
          (e.THREE_DAYS = e.ONE_DAY * 3),
          (e.FIVE_DAYS = e.ONE_DAY * 5),
          (e.SEVEN_DAYS = e.ONE_DAY * 7),
          (e.THIRTY_DAYS = e.ONE_DAY * 30),
          (e.ONE_WEEK = e.SEVEN_DAYS),
          (e.TWO_WEEKS = e.ONE_WEEK * 2),
          (e.THREE_WEEKS = e.ONE_WEEK * 3),
          (e.FOUR_WEEKS = e.ONE_WEEK * 4),
          (e.ONE_YEAR = e.ONE_DAY * 365);
      })(Mc)),
    Mc
  );
}
var C1;
function $w() {
  return (
    C1 ||
      ((C1 = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        const t = Ru;
        t.__exportStar(B7(), e), t.__exportStar($7(), e);
      })(Uc)),
    Uc
  );
}
var _1;
function z7() {
  if (_1) return Sr;
  (_1 = 1),
    Object.defineProperty(Sr, "__esModule", { value: !0 }),
    (Sr.fromMiliseconds = Sr.toMiliseconds = void 0);
  const e = $w();
  function t(r) {
    return r * e.ONE_THOUSAND;
  }
  Sr.toMiliseconds = t;
  function n(r) {
    return Math.floor(r / e.ONE_THOUSAND);
  }
  return (Sr.fromMiliseconds = n), Sr;
}
var k1;
function W7() {
  return (
    k1 ||
      ((k1 = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", { value: !0 });
        const t = Ru;
        t.__exportStar(R7(), e), t.__exportStar(z7(), e);
      })(Fc)),
    Fc
  );
}
var ni = {},
  N1;
function H7() {
  if (N1) return ni;
  (N1 = 1),
    Object.defineProperty(ni, "__esModule", { value: !0 }),
    (ni.Watch = void 0);
  class e {
    constructor() {
      this.timestamps = new Map();
    }
    start(n) {
      if (this.timestamps.has(n))
        throw new Error(`Watch already started for label: ${n}`);
      this.timestamps.set(n, { started: Date.now() });
    }
    stop(n) {
      const r = this.get(n);
      if (typeof r.elapsed < "u")
        throw new Error(`Watch already stopped for label: ${n}`);
      const i = Date.now() - r.started;
      this.timestamps.set(n, { started: r.started, elapsed: i });
    }
    get(n) {
      const r = this.timestamps.get(n);
      if (typeof r > "u") throw new Error(`No timestamp found for label: ${n}`);
      return r;
    }
    elapsed(n) {
      const r = this.get(n);
      return r.elapsed || Date.now() - r.started;
    }
  }
  return (ni.Watch = e), (ni.default = e), ni;
}
var Rc = {},
  ba = {},
  D1;
function q7() {
  if (D1) return ba;
  (D1 = 1),
    Object.defineProperty(ba, "__esModule", { value: !0 }),
    (ba.IWatch = void 0);
  class e {}
  return (ba.IWatch = e), ba;
}
var P1;
function V7() {
  return (
    P1 ||
      ((P1 = 1),
      (function (e) {
        Object.defineProperty(e, "__esModule", { value: !0 }),
          Ru.__exportStar(q7(), e);
      })(Rc)),
    Rc
  );
}
(function (e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  const t = Ru;
  t.__exportStar(W7(), e),
    t.__exportStar(H7(), e),
    t.__exportStar(V7(), e),
    t.__exportStar($w(), e);
})(Mr);
var Ee = {};
Object.defineProperty(Ee, "__esModule", { value: !0 });
Ee.getLocalStorage =
  Ee.getLocalStorageOrThrow =
  Ee.getCrypto =
  Ee.getCryptoOrThrow =
  zw =
  Ee.getLocation =
  Ee.getLocationOrThrow =
  A0 =
  Ee.getNavigator =
  Ee.getNavigatorOrThrow =
  P0 =
  Ee.getDocument =
  Ee.getDocumentOrThrow =
  Ee.getFromWindowOrThrow =
  Ee.getFromWindow =
    void 0;
function Xr(e) {
  let t;
  return typeof window < "u" && typeof window[e] < "u" && (t = window[e]), t;
}
Ee.getFromWindow = Xr;
function oa(e) {
  const t = Xr(e);
  if (!t) throw new Error(`${e} is not defined in Window`);
  return t;
}
Ee.getFromWindowOrThrow = oa;
function G7() {
  return oa("document");
}
Ee.getDocumentOrThrow = G7;
function Q7() {
  return Xr("document");
}
var P0 = (Ee.getDocument = Q7);
function K7() {
  return oa("navigator");
}
Ee.getNavigatorOrThrow = K7;
function Y7() {
  return Xr("navigator");
}
var A0 = (Ee.getNavigator = Y7);
function Z7() {
  return oa("location");
}
Ee.getLocationOrThrow = Z7;
function X7() {
  return Xr("location");
}
var zw = (Ee.getLocation = X7);
function J7() {
  return oa("crypto");
}
Ee.getCryptoOrThrow = J7;
function eP() {
  return Xr("crypto");
}
Ee.getCrypto = eP;
function tP() {
  return oa("localStorage");
}
Ee.getLocalStorageOrThrow = tP;
function nP() {
  return Xr("localStorage");
}
Ee.getLocalStorage = nP;
var T0 = {};
Object.defineProperty(T0, "__esModule", { value: !0 });
var Ww = (T0.getWindowMetadata = void 0);
const A1 = Ee;
function rP() {
  let e, t;
  try {
    (e = A1.getDocumentOrThrow()), (t = A1.getLocationOrThrow());
  } catch {
    return null;
  }
  function n() {
    const d = e.getElementsByTagName("link"),
      m = [];
    for (let v = 0; v < d.length; v++) {
      const b = d[v],
        _ = b.getAttribute("rel");
      if (_ && _.toLowerCase().indexOf("icon") > -1) {
        const C = b.getAttribute("href");
        if (C)
          if (
            C.toLowerCase().indexOf("https:") === -1 &&
            C.toLowerCase().indexOf("http:") === -1 &&
            C.indexOf("//") !== 0
          ) {
            let x = t.protocol + "//" + t.host;
            if (C.indexOf("/") === 0) x += C;
            else {
              const g = t.pathname.split("/");
              g.pop();
              const w = g.join("/");
              x += w + "/" + C;
            }
            m.push(x);
          } else if (C.indexOf("//") === 0) {
            const x = t.protocol + C;
            m.push(x);
          } else m.push(C);
      }
    }
    return m;
  }
  function r(...d) {
    const m = e.getElementsByTagName("meta");
    for (let v = 0; v < m.length; v++) {
      const b = m[v],
        _ = ["itemprop", "property", "name"]
          .map((C) => b.getAttribute(C))
          .filter((C) => (C ? d.includes(C) : !1));
      if (_.length && _) {
        const C = b.getAttribute("content");
        if (C) return C;
      }
    }
    return "";
  }
  function i() {
    let d = r("name", "og:site_name", "og:title", "twitter:title");
    return d || (d = e.title), d;
  }
  function a() {
    return r(
      "description",
      "og:description",
      "twitter:description",
      "keywords"
    );
  }
  const o = i(),
    s = a(),
    l = t.origin,
    u = n();
  return { description: s, url: l, icons: u, name: o };
}
Ww = T0.getWindowMetadata = rP;
var Co = {},
  iP = (e) =>
    encodeURIComponent(e).replace(
      /[!'()*]/g,
      (t) => `%${t.charCodeAt(0).toString(16).toUpperCase()}`
    ),
  Hw = "%[a-f0-9]{2}",
  T1 = new RegExp("(" + Hw + ")|([^%]+?)", "gi"),
  O1 = new RegExp("(" + Hw + ")+", "gi");
function Ad(e, t) {
  try {
    return [decodeURIComponent(e.join(""))];
  } catch {}
  if (e.length === 1) return e;
  t = t || 1;
  var n = e.slice(0, t),
    r = e.slice(t);
  return Array.prototype.concat.call([], Ad(n), Ad(r));
}
function aP(e) {
  try {
    return decodeURIComponent(e);
  } catch {
    for (var t = e.match(T1) || [], n = 1; n < t.length; n++)
      (e = Ad(t, n).join("")), (t = e.match(T1) || []);
    return e;
  }
}
function oP(e) {
  for (var t = { "%FE%FF": "��", "%FF%FE": "��" }, n = O1.exec(e); n; ) {
    try {
      t[n[0]] = decodeURIComponent(n[0]);
    } catch {
      var r = aP(n[0]);
      r !== n[0] && (t[n[0]] = r);
    }
    n = O1.exec(e);
  }
  t["%C2"] = "�";
  for (var i = Object.keys(t), a = 0; a < i.length; a++) {
    var o = i[a];
    e = e.replace(new RegExp(o, "g"), t[o]);
  }
  return e;
}
var sP = function (e) {
    if (typeof e != "string")
      throw new TypeError(
        "Expected `encodedURI` to be of type `string`, got `" + typeof e + "`"
      );
    try {
      return (e = e.replace(/\+/g, " ")), decodeURIComponent(e);
    } catch {
      return oP(e);
    }
  },
  lP = (e, t) => {
    if (!(typeof e == "string" && typeof t == "string"))
      throw new TypeError("Expected the arguments to be of type `string`");
    if (t === "") return [e];
    const n = e.indexOf(t);
    return n === -1 ? [e] : [e.slice(0, n), e.slice(n + t.length)];
  },
  uP = function (e, t) {
    for (
      var n = {}, r = Object.keys(e), i = Array.isArray(t), a = 0;
      a < r.length;
      a++
    ) {
      var o = r[a],
        s = e[o];
      (i ? t.indexOf(o) !== -1 : t(o, s, e)) && (n[o] = s);
    }
    return n;
  };
(function (e) {
  const t = iP,
    n = sP,
    r = lP,
    i = uP,
    a = (g) => g == null,
    o = Symbol("encodeFragmentIdentifier");
  function s(g) {
    switch (g.arrayFormat) {
      case "index":
        return (w) => (E, N) => {
          const D = E.length;
          return N === void 0 ||
            (g.skipNull && N === null) ||
            (g.skipEmptyString && N === "")
            ? E
            : N === null
            ? [...E, [c(w, g), "[", D, "]"].join("")]
            : [...E, [c(w, g), "[", c(D, g), "]=", c(N, g)].join("")];
        };
      case "bracket":
        return (w) => (E, N) =>
          N === void 0 ||
          (g.skipNull && N === null) ||
          (g.skipEmptyString && N === "")
            ? E
            : N === null
            ? [...E, [c(w, g), "[]"].join("")]
            : [...E, [c(w, g), "[]=", c(N, g)].join("")];
      case "colon-list-separator":
        return (w) => (E, N) =>
          N === void 0 ||
          (g.skipNull && N === null) ||
          (g.skipEmptyString && N === "")
            ? E
            : N === null
            ? [...E, [c(w, g), ":list="].join("")]
            : [...E, [c(w, g), ":list=", c(N, g)].join("")];
      case "comma":
      case "separator":
      case "bracket-separator": {
        const w = g.arrayFormat === "bracket-separator" ? "[]=" : "=";
        return (E) => (N, D) =>
          D === void 0 ||
          (g.skipNull && D === null) ||
          (g.skipEmptyString && D === "")
            ? N
            : ((D = D === null ? "" : D),
              N.length === 0
                ? [[c(E, g), w, c(D, g)].join("")]
                : [[N, c(D, g)].join(g.arrayFormatSeparator)]);
      }
      default:
        return (w) => (E, N) =>
          N === void 0 ||
          (g.skipNull && N === null) ||
          (g.skipEmptyString && N === "")
            ? E
            : N === null
            ? [...E, c(w, g)]
            : [...E, [c(w, g), "=", c(N, g)].join("")];
    }
  }
  function l(g) {
    let w;
    switch (g.arrayFormat) {
      case "index":
        return (E, N, D) => {
          if (
            ((w = /\[(\d*)\]$/.exec(E)), (E = E.replace(/\[\d*\]$/, "")), !w)
          ) {
            D[E] = N;
            return;
          }
          D[E] === void 0 && (D[E] = {}), (D[E][w[1]] = N);
        };
      case "bracket":
        return (E, N, D) => {
          if (((w = /(\[\])$/.exec(E)), (E = E.replace(/\[\]$/, "")), !w)) {
            D[E] = N;
            return;
          }
          if (D[E] === void 0) {
            D[E] = [N];
            return;
          }
          D[E] = [].concat(D[E], N);
        };
      case "colon-list-separator":
        return (E, N, D) => {
          if (((w = /(:list)$/.exec(E)), (E = E.replace(/:list$/, "")), !w)) {
            D[E] = N;
            return;
          }
          if (D[E] === void 0) {
            D[E] = [N];
            return;
          }
          D[E] = [].concat(D[E], N);
        };
      case "comma":
      case "separator":
        return (E, N, D) => {
          const f = typeof N == "string" && N.includes(g.arrayFormatSeparator),
            k =
              typeof N == "string" &&
              !f &&
              d(N, g).includes(g.arrayFormatSeparator);
          N = k ? d(N, g) : N;
          const O =
            f || k
              ? N.split(g.arrayFormatSeparator).map((I) => d(I, g))
              : N === null
              ? N
              : d(N, g);
          D[E] = O;
        };
      case "bracket-separator":
        return (E, N, D) => {
          const f = /(\[\])$/.test(E);
          if (((E = E.replace(/\[\]$/, "")), !f)) {
            D[E] = N && d(N, g);
            return;
          }
          const k =
            N === null
              ? []
              : N.split(g.arrayFormatSeparator).map((O) => d(O, g));
          if (D[E] === void 0) {
            D[E] = k;
            return;
          }
          D[E] = [].concat(D[E], k);
        };
      default:
        return (E, N, D) => {
          if (D[E] === void 0) {
            D[E] = N;
            return;
          }
          D[E] = [].concat(D[E], N);
        };
    }
  }
  function u(g) {
    if (typeof g != "string" || g.length !== 1)
      throw new TypeError(
        "arrayFormatSeparator must be single character string"
      );
  }
  function c(g, w) {
    return w.encode ? (w.strict ? t(g) : encodeURIComponent(g)) : g;
  }
  function d(g, w) {
    return w.decode ? n(g) : g;
  }
  function m(g) {
    return Array.isArray(g)
      ? g.sort()
      : typeof g == "object"
      ? m(Object.keys(g))
          .sort((w, E) => Number(w) - Number(E))
          .map((w) => g[w])
      : g;
  }
  function v(g) {
    const w = g.indexOf("#");
    return w !== -1 && (g = g.slice(0, w)), g;
  }
  function b(g) {
    let w = "";
    const E = g.indexOf("#");
    return E !== -1 && (w = g.slice(E)), w;
  }
  function _(g) {
    g = v(g);
    const w = g.indexOf("?");
    return w === -1 ? "" : g.slice(w + 1);
  }
  function C(g, w) {
    return (
      w.parseNumbers &&
      !Number.isNaN(Number(g)) &&
      typeof g == "string" &&
      g.trim() !== ""
        ? (g = Number(g))
        : w.parseBooleans &&
          g !== null &&
          (g.toLowerCase() === "true" || g.toLowerCase() === "false") &&
          (g = g.toLowerCase() === "true"),
      g
    );
  }
  function x(g, w) {
    (w = Object.assign(
      {
        decode: !0,
        sort: !0,
        arrayFormat: "none",
        arrayFormatSeparator: ",",
        parseNumbers: !1,
        parseBooleans: !1,
      },
      w
    )),
      u(w.arrayFormatSeparator);
    const E = l(w),
      N = Object.create(null);
    if (typeof g != "string" || ((g = g.trim().replace(/^[?#&]/, "")), !g))
      return N;
    for (const D of g.split("&")) {
      if (D === "") continue;
      let [f, k] = r(w.decode ? D.replace(/\+/g, " ") : D, "=");
      (k =
        k === void 0
          ? null
          : ["comma", "separator", "bracket-separator"].includes(w.arrayFormat)
          ? k
          : d(k, w)),
        E(d(f, w), k, N);
    }
    for (const D of Object.keys(N)) {
      const f = N[D];
      if (typeof f == "object" && f !== null)
        for (const k of Object.keys(f)) f[k] = C(f[k], w);
      else N[D] = C(f, w);
    }
    return w.sort === !1
      ? N
      : (w.sort === !0
          ? Object.keys(N).sort()
          : Object.keys(N).sort(w.sort)
        ).reduce((D, f) => {
          const k = N[f];
          return (
            k && typeof k == "object" && !Array.isArray(k)
              ? (D[f] = m(k))
              : (D[f] = k),
            D
          );
        }, Object.create(null));
  }
  (e.extract = _),
    (e.parse = x),
    (e.stringify = (g, w) => {
      if (!g) return "";
      (w = Object.assign(
        {
          encode: !0,
          strict: !0,
          arrayFormat: "none",
          arrayFormatSeparator: ",",
        },
        w
      )),
        u(w.arrayFormatSeparator);
      const E = (k) =>
          (w.skipNull && a(g[k])) || (w.skipEmptyString && g[k] === ""),
        N = s(w),
        D = {};
      for (const k of Object.keys(g)) E(k) || (D[k] = g[k]);
      const f = Object.keys(D);
      return (
        w.sort !== !1 && f.sort(w.sort),
        f
          .map((k) => {
            const O = g[k];
            return O === void 0
              ? ""
              : O === null
              ? c(k, w)
              : Array.isArray(O)
              ? O.length === 0 && w.arrayFormat === "bracket-separator"
                ? c(k, w) + "[]"
                : O.reduce(N(k), []).join("&")
              : c(k, w) + "=" + c(O, w);
          })
          .filter((k) => k.length > 0)
          .join("&")
      );
    }),
    (e.parseUrl = (g, w) => {
      w = Object.assign({ decode: !0 }, w);
      const [E, N] = r(g, "#");
      return Object.assign(
        { url: E.split("?")[0] || "", query: x(_(g), w) },
        w && w.parseFragmentIdentifier && N
          ? { fragmentIdentifier: d(N, w) }
          : {}
      );
    }),
    (e.stringifyUrl = (g, w) => {
      w = Object.assign({ encode: !0, strict: !0, [o]: !0 }, w);
      const E = v(g.url).split("?")[0] || "",
        N = e.extract(g.url),
        D = e.parse(N, { sort: !1 }),
        f = Object.assign(D, g.query);
      let k = e.stringify(f, w);
      k && (k = `?${k}`);
      let O = b(g.url);
      return (
        g.fragmentIdentifier &&
          (O = `#${w[o] ? c(g.fragmentIdentifier, w) : g.fragmentIdentifier}`),
        `${E}${k}${O}`
      );
    }),
    (e.pick = (g, w, E) => {
      E = Object.assign({ parseFragmentIdentifier: !0, [o]: !1 }, E);
      const { url: N, query: D, fragmentIdentifier: f } = e.parseUrl(g, E);
      return e.stringifyUrl(
        { url: N, query: i(D, w), fragmentIdentifier: f },
        E
      );
    }),
    (e.exclude = (g, w, E) => {
      const N = Array.isArray(w) ? (D) => !w.includes(D) : (D, f) => !w(D, f);
      return e.pick(g, N, E);
    });
})(Co);
const cP = {
    waku: {
      publish: "waku_publish",
      batchPublish: "waku_batchPublish",
      subscribe: "waku_subscribe",
      batchSubscribe: "waku_batchSubscribe",
      subscription: "waku_subscription",
      unsubscribe: "waku_unsubscribe",
      batchUnsubscribe: "waku_batchUnsubscribe",
    },
    irn: {
      publish: "irn_publish",
      batchPublish: "irn_batchPublish",
      subscribe: "irn_subscribe",
      batchSubscribe: "irn_batchSubscribe",
      subscription: "irn_subscription",
      unsubscribe: "irn_unsubscribe",
      batchUnsubscribe: "irn_batchUnsubscribe",
    },
    iridium: {
      publish: "iridium_publish",
      batchPublish: "iridium_batchPublish",
      subscribe: "iridium_subscribe",
      batchSubscribe: "iridium_batchSubscribe",
      subscription: "iridium_subscription",
      unsubscribe: "iridium_unsubscribe",
      batchUnsubscribe: "iridium_batchUnsubscribe",
    },
  },
  fP = ":";
function yA(e) {
  const [t, n] = e.split(fP);
  return { namespace: t, reference: n };
}
function vA(e, t = []) {
  const n = [];
  return (
    Object.keys(e).forEach((r) => {
      if (t.length && !t.includes(r)) return;
      const i = e[r];
      n.push(...i.accounts);
    }),
    n
  );
}
function qw(e, t) {
  return e.includes(":") ? [e] : t.chains || [];
}
const Vw = "base10",
  St = "base16",
  Td = "base64pad",
  O0 = "utf8",
  Gw = 0,
  zo = 1,
  dP = 0,
  j1 = 1,
  Od = 12,
  j0 = 32;
function wA() {
  const e = N0.generateKeyPair();
  return { privateKey: rn(e.secretKey, St), publicKey: rn(e.publicKey, St) };
}
function bA() {
  const e = ju.randomBytes(j0);
  return rn(e, St);
}
function xA(e, t) {
  const n = N0.sharedKey(Xt(e, St), Xt(t, St), !0),
    r = new JN(Uu.SHA256, n).expand(j0);
  return rn(r, St);
}
function EA(e) {
  const t = Uu.hash(Xt(e, St));
  return rn(t, St);
}
function SA(e) {
  const t = Uu.hash(Xt(e, O0));
  return rn(t, St);
}
function hP(e) {
  return Xt(`${e}`, Vw);
}
function Bu(e) {
  return Number(rn(e, Vw));
}
function CA(e) {
  const t = hP(typeof e.type < "u" ? e.type : Gw);
  if (Bu(t) === zo && typeof e.senderPublicKey > "u")
    throw new Error("Missing sender public key for type 1 envelope");
  const n = typeof e.senderPublicKey < "u" ? Xt(e.senderPublicKey, St) : void 0,
    r = typeof e.iv < "u" ? Xt(e.iv, St) : ju.randomBytes(Od),
    i = new _0.ChaCha20Poly1305(Xt(e.symKey, St)).seal(r, Xt(e.message, O0));
  return pP({ type: t, sealed: i, iv: r, senderPublicKey: n });
}
function _A(e) {
  const t = new _0.ChaCha20Poly1305(Xt(e.symKey, St)),
    { sealed: n, iv: r } = Qw(e.encoded),
    i = t.open(r, n);
  if (i === null) throw new Error("Failed to decrypt");
  return rn(i, O0);
}
function pP(e) {
  if (Bu(e.type) === zo) {
    if (typeof e.senderPublicKey > "u")
      throw new Error("Missing sender public key for type 1 envelope");
    return rn(p1([e.type, e.senderPublicKey, e.iv, e.sealed]), Td);
  }
  return rn(p1([e.type, e.iv, e.sealed]), Td);
}
function Qw(e) {
  const t = Xt(e, Td),
    n = t.slice(dP, j1),
    r = j1;
  if (Bu(n) === zo) {
    const s = r + j0,
      l = s + Od,
      u = t.slice(r, s),
      c = t.slice(s, l),
      d = t.slice(l);
    return { type: n, sealed: d, iv: c, senderPublicKey: u };
  }
  const i = r + Od,
    a = t.slice(r, i),
    o = t.slice(i);
  return { type: n, sealed: o, iv: a };
}
function kA(e, t) {
  const n = Qw(e);
  return mP({
    type: Bu(n.type),
    senderPublicKey:
      typeof n.senderPublicKey < "u" ? rn(n.senderPublicKey, St) : void 0,
    receiverPublicKey: t == null ? void 0 : t.receiverPublicKey,
  });
}
function mP(e) {
  const t = (e == null ? void 0 : e.type) || Gw;
  if (t === zo) {
    if (typeof (e == null ? void 0 : e.senderPublicKey) > "u")
      throw new Error("missing sender public key");
    if (typeof (e == null ? void 0 : e.receiverPublicKey) > "u")
      throw new Error("missing receiver public key");
  }
  return {
    type: t,
    senderPublicKey: e == null ? void 0 : e.senderPublicKey,
    receiverPublicKey: e == null ? void 0 : e.receiverPublicKey,
  };
}
function NA(e) {
  return (
    e.type === zo &&
    typeof e.senderPublicKey == "string" &&
    typeof e.receiverPublicKey == "string"
  );
}
var gP = Object.defineProperty,
  I1 = Object.getOwnPropertySymbols,
  yP = Object.prototype.hasOwnProperty,
  vP = Object.prototype.propertyIsEnumerable,
  L1 = (e, t, n) =>
    t in e
      ? gP(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  F1 = (e, t) => {
    for (var n in t || (t = {})) yP.call(t, n) && L1(e, n, t[n]);
    if (I1) for (var n of I1(t)) vP.call(t, n) && L1(e, n, t[n]);
    return e;
  };
const wP = "ReactNative",
  At = {
    reactNative: "react-native",
    node: "node",
    browser: "browser",
    unknown: "unknown",
  },
  bP = "js";
function Kw() {
  return (
    typeof process < "u" &&
    typeof process.versions < "u" &&
    typeof process.versions.node < "u"
  );
}
function Wo() {
  return !P0() && !!A0() && navigator.product === wP;
}
function $u() {
  return !Kw() && !!A0() && !!P0();
}
function Ho() {
  return Wo()
    ? At.reactNative
    : Kw()
    ? At.node
    : $u()
    ? At.browser
    : At.unknown;
}
function DA() {
  var e;
  try {
    return Wo() &&
      typeof globalThis < "u" &&
      typeof (globalThis == null ? void 0 : globalThis.Application) < "u"
      ? (e = globalThis.Application) == null
        ? void 0
        : e.applicationId
      : void 0;
  } catch {
    return;
  }
}
function xP(e, t) {
  let n = Co.parse(e);
  return (n = F1(F1({}, n), t)), (e = Co.stringify(n)), e;
}
function PA() {
  return Ww() || { name: "", description: "", url: "", icons: [""] };
}
function EP() {
  if (
    Ho() === At.reactNative &&
    typeof globalThis < "u" &&
    typeof (globalThis == null ? void 0 : globalThis.Platform) < "u"
  ) {
    const { OS: n, Version: r } = globalThis.Platform;
    return [n, r].join("-");
  }
  const e = p7();
  if (e === null) return "unknown";
  const t = e.os ? e.os.replace(" ", "").toLowerCase() : "unknown";
  return e.type === "browser"
    ? [t, e.name, e.version].join("-")
    : [t, e.version].join("-");
}
function SP() {
  var e;
  const t = Ho();
  return t === At.browser
    ? [t, ((e = zw()) == null ? void 0 : e.host) || "unknown"].join(":")
    : t;
}
function CP(e, t, n) {
  const r = EP(),
    i = SP();
  return [[e, t].join("-"), [bP, n].join("-"), r, i].join("/");
}
function AA({
  protocol: e,
  version: t,
  relayUrl: n,
  sdkVersion: r,
  auth: i,
  projectId: a,
  useOnCloseEvent: o,
  bundleId: s,
}) {
  const l = n.split("?"),
    u = CP(e, t, r),
    c = {
      auth: i,
      ua: u,
      projectId: a,
      useOnCloseEvent: o || void 0,
      origin: s || void 0,
    },
    d = xP(l[1] || "", c);
  return l[0] + "?" + d;
}
function Lr(e, t) {
  return e.filter((n) => t.includes(n)).length === e.length;
}
function TA(e) {
  return Object.fromEntries(e.entries());
}
function OA(e) {
  return new Map(Object.entries(e));
}
function jA(e = Mr.FIVE_MINUTES, t) {
  const n = Mr.toMiliseconds(e || Mr.FIVE_MINUTES);
  let r, i, a;
  return {
    resolve: (o) => {
      a && r && (clearTimeout(a), r(o));
    },
    reject: (o) => {
      a && i && (clearTimeout(a), i(o));
    },
    done: () =>
      new Promise((o, s) => {
        (a = setTimeout(() => {
          s(new Error(t));
        }, n)),
          (r = o),
          (i = s);
      }),
  };
}
function IA(e, t, n) {
  return new Promise(async (r, i) => {
    const a = setTimeout(() => i(new Error(n)), t);
    try {
      const o = await e;
      r(o);
    } catch (o) {
      i(o);
    }
    clearTimeout(a);
  });
}
function Yw(e, t) {
  if (typeof t == "string" && t.startsWith(`${e}:`)) return t;
  if (e.toLowerCase() === "topic") {
    if (typeof t != "string")
      throw new Error('Value must be "string" for expirer target type: topic');
    return `topic:${t}`;
  } else if (e.toLowerCase() === "id") {
    if (typeof t != "number")
      throw new Error('Value must be "number" for expirer target type: id');
    return `id:${t}`;
  }
  throw new Error(`Unknown expirer target type: ${e}`);
}
function LA(e) {
  return Yw("topic", e);
}
function FA(e) {
  return Yw("id", e);
}
function UA(e) {
  const [t, n] = e.split(":"),
    r = { id: void 0, topic: void 0 };
  if (t === "topic" && typeof n == "string") r.topic = n;
  else if (t === "id" && Number.isInteger(Number(n))) r.id = Number(n);
  else
    throw new Error(
      `Invalid target, expected id:number or topic:string, got ${t}:${n}`
    );
  return r;
}
function MA(e, t) {
  return Mr.fromMiliseconds((t || Date.now()) + Mr.toMiliseconds(e));
}
function RA(e) {
  return Date.now() >= Mr.toMiliseconds(e);
}
function BA(e, t) {
  return `${e}${t ? `:${t}` : ""}`;
}
function Bc(e = [], t = []) {
  return [...new Set([...e, ...t])];
}
async function $A({ id: e, topic: t, wcDeepLink: n }) {
  try {
    if (!n) return;
    const r = typeof n == "string" ? JSON.parse(n) : n;
    let i = r == null ? void 0 : r.href;
    if (typeof i != "string") return;
    i.endsWith("/") && (i = i.slice(0, -1));
    const a = `${i}/wc?requestId=${e}&sessionTopic=${t}`,
      o = Ho();
    o === At.browser
      ? a.startsWith("https://")
        ? window.open(a, "_blank", "noreferrer noopener")
        : window.open(a, "_self", "noreferrer noopener")
      : o === At.reactNative &&
        typeof (globalThis == null ? void 0 : globalThis.Linking) < "u" &&
        (await globalThis.Linking.openURL(a));
  } catch (r) {
    console.error(r);
  }
}
async function zA(e, t) {
  try {
    return (await e.getItem(t)) || ($u() ? localStorage.getItem(t) : void 0);
  } catch (n) {
    console.error(n);
  }
}
const _P = "irn";
function WA(e) {
  return (e == null ? void 0 : e.relay) || { protocol: _P };
}
function HA(e) {
  const t = cP[e];
  if (typeof t > "u") throw new Error(`Relay Protocol not supported: ${e}`);
  return t;
}
var kP = Object.defineProperty,
  U1 = Object.getOwnPropertySymbols,
  NP = Object.prototype.hasOwnProperty,
  DP = Object.prototype.propertyIsEnumerable,
  M1 = (e, t, n) =>
    t in e
      ? kP(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  PP = (e, t) => {
    for (var n in t || (t = {})) NP.call(t, n) && M1(e, n, t[n]);
    if (U1) for (var n of U1(t)) DP.call(t, n) && M1(e, n, t[n]);
    return e;
  };
function AP(e, t = "-") {
  const n = {},
    r = "relay" + t;
  return (
    Object.keys(e).forEach((i) => {
      if (i.startsWith(r)) {
        const a = i.replace(r, ""),
          o = e[i];
        n[a] = o;
      }
    }),
    n
  );
}
function qA(e) {
  (e = e.includes("wc://") ? e.replace("wc://", "") : e),
    (e = e.includes("wc:") ? e.replace("wc:", "") : e);
  const t = e.indexOf(":"),
    n = e.indexOf("?") !== -1 ? e.indexOf("?") : void 0,
    r = e.substring(0, t),
    i = e.substring(t + 1, n).split("@"),
    a = typeof n < "u" ? e.substring(n) : "",
    o = Co.parse(a);
  return {
    protocol: r,
    topic: TP(i[0]),
    version: parseInt(i[1], 10),
    symKey: o.symKey,
    relay: AP(o),
  };
}
function TP(e) {
  return e.startsWith("//") ? e.substring(2) : e;
}
function OP(e, t = "-") {
  const n = "relay",
    r = {};
  return (
    Object.keys(e).forEach((i) => {
      const a = n + t + i;
      e[i] && (r[a] = e[i]);
    }),
    r
  );
}
function VA(e) {
  return (
    `${e.protocol}:${e.topic}@${e.version}?` +
    Co.stringify(PP({ symKey: e.symKey }, OP(e.relay)))
  );
}
var jP = Object.defineProperty,
  IP = Object.defineProperties,
  LP = Object.getOwnPropertyDescriptors,
  R1 = Object.getOwnPropertySymbols,
  FP = Object.prototype.hasOwnProperty,
  UP = Object.prototype.propertyIsEnumerable,
  B1 = (e, t, n) =>
    t in e
      ? jP(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  MP = (e, t) => {
    for (var n in t || (t = {})) FP.call(t, n) && B1(e, n, t[n]);
    if (R1) for (var n of R1(t)) UP.call(t, n) && B1(e, n, t[n]);
    return e;
  },
  RP = (e, t) => IP(e, LP(t));
function sa(e) {
  const t = [];
  return (
    e.forEach((n) => {
      const [r, i] = n.split(":");
      t.push(`${r}:${i}`);
    }),
    t
  );
}
function BP(e) {
  const t = [];
  return (
    Object.values(e).forEach((n) => {
      t.push(...sa(n.accounts));
    }),
    t
  );
}
function $P(e, t) {
  const n = [];
  return (
    Object.values(e).forEach((r) => {
      sa(r.accounts).includes(t) && n.push(...r.methods);
    }),
    n
  );
}
function zP(e, t) {
  const n = [];
  return (
    Object.values(e).forEach((r) => {
      sa(r.accounts).includes(t) && n.push(...r.events);
    }),
    n
  );
}
function GA(e, t) {
  const n = XP(e, t);
  if (n) throw new Error(n.message);
  const r = {};
  for (const [i, a] of Object.entries(e))
    r[i] = {
      methods: a.methods,
      events: a.events,
      chains: a.accounts.map((o) => `${o.split(":")[0]}:${o.split(":")[1]}`),
    };
  return r;
}
function Zw(e) {
  return e.includes(":");
}
function WP(e) {
  return Zw(e) ? e.split(":")[0] : e;
}
function Xw(e) {
  var t, n, r;
  const i = {};
  if (!I0(e)) return i;
  for (const [a, o] of Object.entries(e)) {
    const s = Zw(a) ? [a] : o.chains,
      l = o.methods || [],
      u = o.events || [],
      c = WP(a);
    i[c] = RP(MP({}, i[c]), {
      chains: Bc(s, (t = i[c]) == null ? void 0 : t.chains),
      methods: Bc(l, (n = i[c]) == null ? void 0 : n.methods),
      events: Bc(u, (r = i[c]) == null ? void 0 : r.events),
    });
  }
  return i;
}
const HP = {
    INVALID_METHOD: { message: "Invalid method.", code: 1001 },
    INVALID_EVENT: { message: "Invalid event.", code: 1002 },
    INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 },
    INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 },
    INVALID_SESSION_SETTLE_REQUEST: {
      message: "Invalid session settle request.",
      code: 1005,
    },
    UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 },
    UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 },
    UNAUTHORIZED_UPDATE_REQUEST: {
      message: "Unauthorized update request.",
      code: 3003,
    },
    UNAUTHORIZED_EXTEND_REQUEST: {
      message: "Unauthorized extend request.",
      code: 3004,
    },
    USER_REJECTED: { message: "User rejected.", code: 5e3 },
    USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 },
    USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 },
    USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 },
    UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 },
    UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 },
    UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 },
    UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 },
    UNSUPPORTED_NAMESPACE_KEY: {
      message: "Unsupported namespace key.",
      code: 5104,
    },
    USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 },
    SESSION_SETTLEMENT_FAILED: {
      message: "Session settlement failed.",
      code: 7e3,
    },
    WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 },
  },
  qP = {
    NOT_INITIALIZED: { message: "Not initialized.", code: 1 },
    NO_MATCHING_KEY: { message: "No matching key.", code: 2 },
    RESTORE_WILL_OVERRIDE: { message: "Restore will override.", code: 3 },
    RESUBSCRIBED: { message: "Resubscribed.", code: 4 },
    MISSING_OR_INVALID: { message: "Missing or invalid.", code: 5 },
    EXPIRED: { message: "Expired.", code: 6 },
    UNKNOWN_TYPE: { message: "Unknown type.", code: 7 },
    MISMATCHED_TOPIC: { message: "Mismatched topic.", code: 8 },
    NON_CONFORMING_NAMESPACES: {
      message: "Non conforming namespaces.",
      code: 9,
    },
  };
function Vn(e, t) {
  const { message: n, code: r } = qP[e];
  return { message: t ? `${n} ${t}` : n, code: r };
}
function Gi(e, t) {
  const { message: n, code: r } = HP[e];
  return { message: t ? `${n} ${t}` : n, code: r };
}
function zu(e, t) {
  return Array.isArray(e) ? (typeof t < "u" && e.length ? e.every(t) : !0) : !1;
}
function I0(e) {
  return Object.getPrototypeOf(e) === Object.prototype && Object.keys(e).length;
}
function Rr(e) {
  return typeof e > "u";
}
function Ht(e, t) {
  return t && Rr(e) ? !0 : typeof e == "string" && !!e.trim().length;
}
function L0(e, t) {
  return t && Rr(e) ? !0 : typeof e == "number" && !isNaN(e);
}
function QA(e, t) {
  const { requiredNamespaces: n } = t,
    r = Object.keys(e.namespaces),
    i = Object.keys(n);
  let a = !0;
  return Lr(i, r)
    ? (r.forEach((o) => {
        const { accounts: s, methods: l, events: u } = e.namespaces[o],
          c = sa(s),
          d = n[o];
        (!Lr(qw(o, d), c) || !Lr(d.methods, l) || !Lr(d.events, u)) && (a = !1);
      }),
      a)
    : !1;
}
function Il(e) {
  return Ht(e, !1) && e.includes(":") ? e.split(":").length === 2 : !1;
}
function VP(e) {
  if (Ht(e, !1) && e.includes(":")) {
    const t = e.split(":");
    if (t.length === 3) {
      const n = t[0] + ":" + t[1];
      return !!t[2] && Il(n);
    }
  }
  return !1;
}
function KA(e) {
  if (Ht(e, !1))
    try {
      return typeof new URL(e) < "u";
    } catch {
      return !1;
    }
  return !1;
}
function YA(e) {
  var t;
  return (t = e == null ? void 0 : e.proposer) == null ? void 0 : t.publicKey;
}
function ZA(e) {
  return e == null ? void 0 : e.topic;
}
function XA(e, t) {
  let n = null;
  return (
    Ht(e == null ? void 0 : e.publicKey, !1) ||
      (n = Vn(
        "MISSING_OR_INVALID",
        `${t} controller public key should be a string`
      )),
    n
  );
}
function $1(e) {
  let t = !0;
  return zu(e) ? e.length && (t = e.every((n) => Ht(n, !1))) : (t = !1), t;
}
function GP(e, t, n) {
  let r = null;
  return (
    zu(t) && t.length
      ? t.forEach((i) => {
          r ||
            Il(i) ||
            (r = Gi(
              "UNSUPPORTED_CHAINS",
              `${n}, chain ${i} should be a string and conform to "namespace:chainId" format`
            ));
        })
      : Il(e) ||
        (r = Gi(
          "UNSUPPORTED_CHAINS",
          `${n}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`
        )),
    r
  );
}
function QP(e, t, n) {
  let r = null;
  return (
    Object.entries(e).forEach(([i, a]) => {
      if (r) return;
      const o = GP(i, qw(i, a), `${t} ${n}`);
      o && (r = o);
    }),
    r
  );
}
function KP(e, t) {
  let n = null;
  return (
    zu(e)
      ? e.forEach((r) => {
          n ||
            VP(r) ||
            (n = Gi(
              "UNSUPPORTED_ACCOUNTS",
              `${t}, account ${r} should be a string and conform to "namespace:chainId:address" format`
            ));
        })
      : (n = Gi(
          "UNSUPPORTED_ACCOUNTS",
          `${t}, accounts should be an array of strings conforming to "namespace:chainId:address" format`
        )),
    n
  );
}
function YP(e, t) {
  let n = null;
  return (
    Object.values(e).forEach((r) => {
      if (n) return;
      const i = KP(r == null ? void 0 : r.accounts, `${t} namespace`);
      i && (n = i);
    }),
    n
  );
}
function ZP(e, t) {
  let n = null;
  return (
    $1(e == null ? void 0 : e.methods)
      ? $1(e == null ? void 0 : e.events) ||
        (n = Gi(
          "UNSUPPORTED_EVENTS",
          `${t}, events should be an array of strings or empty array for no events`
        ))
      : (n = Gi(
          "UNSUPPORTED_METHODS",
          `${t}, methods should be an array of strings or empty array for no methods`
        )),
    n
  );
}
function Jw(e, t) {
  let n = null;
  return (
    Object.values(e).forEach((r) => {
      if (n) return;
      const i = ZP(r, `${t}, namespace`);
      i && (n = i);
    }),
    n
  );
}
function JA(e, t, n) {
  let r = null;
  if (e && I0(e)) {
    const i = Jw(e, t);
    i && (r = i);
    const a = QP(e, t, n);
    a && (r = a);
  } else
    r = Vn("MISSING_OR_INVALID", `${t}, ${n} should be an object with data`);
  return r;
}
function XP(e, t) {
  let n = null;
  if (e && I0(e)) {
    const r = Jw(e, t);
    r && (n = r);
    const i = YP(e, t);
    i && (n = i);
  } else
    n = Vn(
      "MISSING_OR_INVALID",
      `${t}, namespaces should be an object with data`
    );
  return n;
}
function JP(e) {
  return Ht(e.protocol, !0);
}
function e9(e, t) {
  let n = !1;
  return (
    t && !e
      ? (n = !0)
      : e &&
        zu(e) &&
        e.length &&
        e.forEach((r) => {
          n = JP(r);
        }),
    n
  );
}
function t9(e) {
  return typeof e == "number";
}
function n9(e) {
  return typeof e < "u" && typeof e !== null;
}
function r9(e) {
  return !(
    !e ||
    typeof e != "object" ||
    !e.code ||
    !L0(e.code, !1) ||
    !e.message ||
    !Ht(e.message, !1)
  );
}
function i9(e) {
  return !(Rr(e) || !Ht(e.method, !1));
}
function a9(e) {
  return !(
    Rr(e) ||
    (Rr(e.result) && Rr(e.error)) ||
    !L0(e.id, !1) ||
    !Ht(e.jsonrpc, !1)
  );
}
function o9(e) {
  return !(Rr(e) || !Ht(e.name, !1));
}
function s9(e, t) {
  return !(!Il(t) || !BP(e).includes(t));
}
function l9(e, t, n) {
  return Ht(n, !1) ? $P(e, t).includes(n) : !1;
}
function u9(e, t, n) {
  return Ht(n, !1) ? zP(e, t).includes(n) : !1;
}
function c9(e, t, n) {
  let r = null;
  const i = eA(e),
    a = tA(t),
    o = Object.keys(i),
    s = Object.keys(a),
    l = z1(Object.keys(e)),
    u = z1(Object.keys(t)),
    c = l.filter((d) => !u.includes(d));
  return (
    c.length &&
      (r = Vn(
        "NON_CONFORMING_NAMESPACES",
        `${n} namespaces keys don't satisfy requiredNamespaces.
      Required: ${c.toString()}
      Received: ${Object.keys(t).toString()}`
      )),
    Lr(o, s) ||
      (r = Vn(
        "NON_CONFORMING_NAMESPACES",
        `${n} namespaces chains don't satisfy required namespaces.
      Required: ${o.toString()}
      Approved: ${s.toString()}`
      )),
    Object.keys(t).forEach((d) => {
      if (!d.includes(":") || r) return;
      const m = sa(t[d].accounts);
      m.includes(d) ||
        (r = Vn(
          "NON_CONFORMING_NAMESPACES",
          `${n} namespaces accounts don't satisfy namespace accounts for ${d}
        Required: ${d}
        Approved: ${m.toString()}`
        ));
    }),
    o.forEach((d) => {
      r ||
        (Lr(i[d].methods, a[d].methods)
          ? Lr(i[d].events, a[d].events) ||
            (r = Vn(
              "NON_CONFORMING_NAMESPACES",
              `${n} namespaces events don't satisfy namespace events for ${d}`
            ))
          : (r = Vn(
              "NON_CONFORMING_NAMESPACES",
              `${n} namespaces methods don't satisfy namespace methods for ${d}`
            )));
    }),
    r
  );
}
function eA(e) {
  const t = {};
  return (
    Object.keys(e).forEach((n) => {
      var r;
      n.includes(":")
        ? (t[n] = e[n])
        : (r = e[n].chains) == null ||
          r.forEach((i) => {
            t[i] = { methods: e[n].methods, events: e[n].events };
          });
    }),
    t
  );
}
function z1(e) {
  return [...new Set(e.map((t) => (t.includes(":") ? t.split(":")[0] : t)))];
}
function tA(e) {
  const t = {};
  return (
    Object.keys(e).forEach((n) => {
      if (n.includes(":")) t[n] = e[n];
      else {
        const r = sa(e[n].accounts);
        r == null ||
          r.forEach((i) => {
            t[i] = {
              accounts: e[n].accounts.filter((a) => a.includes(`${i}:`)),
              methods: e[n].methods,
              events: e[n].events,
            };
          });
      }
    }),
    t
  );
}
function f9(e, t) {
  return L0(e, !1) && e <= t.max && e >= t.min;
}
function d9() {
  const e = Ho();
  return new Promise((t) => {
    switch (e) {
      case At.browser:
        t(nA());
        break;
      case At.reactNative:
        t(rA());
        break;
      case At.node:
        t(iA());
        break;
      default:
        t(!0);
    }
  });
}
function nA() {
  return $u() && (navigator == null ? void 0 : navigator.onLine);
}
async function rA() {
  if (
    Wo() &&
    typeof globalThis < "u" &&
    globalThis != null &&
    globalThis.NetInfo
  ) {
    const e = await (globalThis == null ? void 0 : globalThis.NetInfo.fetch());
    return e == null ? void 0 : e.isConnected;
  }
  return !0;
}
function iA() {
  return !0;
}
function h9(e) {
  switch (Ho()) {
    case At.browser:
      aA(e);
      break;
    case At.reactNative:
      oA(e);
      break;
  }
}
function aA(e) {
  !Wo() &&
    $u() &&
    (window.addEventListener("online", () => e(!0)),
    window.addEventListener("offline", () => e(!1)));
}
function oA(e) {
  Wo() &&
    typeof globalThis < "u" &&
    globalThis != null &&
    globalThis.NetInfo &&
    (globalThis == null ||
      globalThis.NetInfo.addEventListener((t) =>
        e(t == null ? void 0 : t.isConnected)
      ));
}
const $c = {};
class p9 {
  static get(t) {
    return $c[t];
  }
  static set(t, n) {
    $c[t] = n;
  }
  static delete(t) {
    delete $c[t];
  }
}
var eb = "eip155",
  sA = "store",
  tb = "requestedChains",
  jd = "wallet_addEthereumChain",
  Oe,
  Wa,
  Bs,
  Id,
  F0,
  nb,
  $s,
  Ld,
  Fd,
  rb,
  Ll,
  U0,
  ai,
  Pa,
  Fl,
  M0,
  Ul,
  R0,
  Ml,
  B0,
  lA = class extends $h {
    constructor(e) {
      super({ ...e, options: { isNewChainsStale: !0, ...e.options } }),
        ft(this, Bs),
        ft(this, F0),
        ft(this, $s),
        ft(this, Fd),
        ft(this, Ll),
        ft(this, ai),
        ft(this, Fl),
        ft(this, Ul),
        ft(this, Ml),
        (this.id = "walletConnect"),
        (this.name = "WalletConnect"),
        (this.ready = !0),
        ft(this, Oe, void 0),
        ft(this, Wa, void 0),
        (this.onAccountsChanged = (t) => {
          t.length === 0
            ? this.emit("disconnect")
            : this.emit("change", { account: tn(t[0]) });
        }),
        (this.onChainChanged = (t) => {
          const n = Number(t),
            r = this.isChainUnsupported(n);
          this.emit("change", { chain: { id: n, unsupported: r } });
        }),
        (this.onDisconnect = () => {
          Je(this, ai, Pa).call(this, []), this.emit("disconnect");
        }),
        (this.onDisplayUri = (t) => {
          this.emit("message", { type: "display_uri", data: t });
        }),
        (this.onConnect = () => {
          this.emit("connect", {});
        }),
        Je(this, Bs, Id).call(this);
    }
    async connect({ chainId: e, pairingTopic: t } = {}) {
      var n, r, i, a, o;
      try {
        let s = e;
        if (!s) {
          const b = (n = this.storage) == null ? void 0 : n.getItem(sA),
            _ =
              (a =
                (i =
                  (r = b == null ? void 0 : b.state) == null
                    ? void 0
                    : r.data) == null
                  ? void 0
                  : i.chain) == null
                ? void 0
                : a.id;
          _ && !this.isChainUnsupported(_)
            ? (s = _)
            : (s = (o = this.chains[0]) == null ? void 0 : o.id);
        }
        if (!s) throw new Error("No chains found on connector.");
        const l = await this.getProvider();
        Je(this, Fd, rb).call(this);
        const u = Je(this, $s, Ld).call(this);
        if ((l.session && u && (await l.disconnect()), !l.session || u)) {
          const b = this.chains.filter((_) => _.id !== s).map((_) => _.id);
          this.emit("message", { type: "connecting" }),
            await l.connect({ pairingTopic: t, optionalChains: [s, ...b] }),
            Je(this, ai, Pa).call(
              this,
              this.chains.map(({ id: _ }) => _)
            );
        }
        const c = await l.enable(),
          d = tn(c[0]),
          m = await this.getChainId(),
          v = this.isChainUnsupported(m);
        return { account: d, chain: { id: m, unsupported: v } };
      } catch (s) {
        throw /user rejected/i.test(s == null ? void 0 : s.message)
          ? new Yt(s)
          : s;
      }
    }
    async disconnect() {
      const e = await this.getProvider();
      try {
        await e.disconnect();
      } catch (t) {
        if (!/No matching key/i.test(t.message)) throw t;
      } finally {
        Je(this, Ll, U0).call(this), Je(this, ai, Pa).call(this, []);
      }
    }
    async getAccount() {
      const { accounts: e } = await this.getProvider();
      return tn(e[0]);
    }
    async getChainId() {
      const { chainId: e } = await this.getProvider();
      return e;
    }
    async getProvider({ chainId: e } = {}) {
      return (
        ge(this, Oe) || (await Je(this, Bs, Id).call(this)),
        e && (await this.switchChain(e)),
        ge(this, Oe)
      );
    }
    async getWalletClient({ chainId: e } = {}) {
      const [t, n] = await Promise.all([
          this.getProvider({ chainId: e }),
          this.getAccount(),
        ]),
        r = this.chains.find((i) => i.id === e);
      if (!t) throw new Error("provider is required.");
      return l0({ account: n, chain: r, transport: a0(t) });
    }
    async isAuthorized() {
      try {
        const [e, t] = await Promise.all([
            this.getAccount(),
            this.getProvider(),
          ]),
          n = Je(this, $s, Ld).call(this);
        if (!e) return !1;
        if (n && t.session) {
          try {
            await t.disconnect();
          } catch {}
          return !1;
        }
        return !0;
      } catch {
        return !1;
      }
    }
    async switchChain(e) {
      var n, r;
      const t = this.chains.find((i) => i.id === e);
      if (!t) throw new ho(new Error("chain not found on connector."));
      try {
        const i = await this.getProvider(),
          a = Je(this, Ul, R0).call(this),
          o = Je(this, Ml, B0).call(this);
        if (!a.includes(e) && o.includes(jd)) {
          await i.request({
            method: jd,
            params: [
              {
                chainId: oe(t.id),
                blockExplorerUrls: [
                  (r = (n = t.blockExplorers) == null ? void 0 : n.default) ==
                  null
                    ? void 0
                    : r.url,
                ],
                chainName: t.name,
                nativeCurrency: t.nativeCurrency,
                rpcUrls: [...t.rpcUrls.default.http],
              },
            ],
          });
          const l = Je(this, Fl, M0).call(this);
          l.push(e), Je(this, ai, Pa).call(this, l);
        }
        return (
          await i.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: oe(e) }],
          }),
          t
        );
      } catch (i) {
        const a = typeof i == "string" ? i : i == null ? void 0 : i.message;
        throw /user rejected request/i.test(a) ? new Yt(i) : new ho(i);
      }
    }
  };
Oe = new WeakMap();
Wa = new WeakMap();
Bs = new WeakSet();
Id = async function () {
  return (
    !ge(this, Wa) &&
      typeof window < "u" &&
      $i(this, Wa, Je(this, F0, nb).call(this)),
    ge(this, Wa)
  );
};
F0 = new WeakSet();
nb = async function () {
  const { EthereumProvider: e } = await su(
      () => import("./index.es-df71bd49.js"),
      ["assets/index.es-df71bd49.js", "assets/events-274ffe07.js"]
    ),
    t = this.chains.map(({ id: n }) => n);
  if (t.length) {
    const {
      projectId: n,
      showQrModal: r = !0,
      qrModalOptions: i,
      metadata: a,
      relayUrl: o,
    } = this.options;
    $i(
      this,
      Oe,
      await e.init({
        showQrModal: r,
        qrModalOptions: i,
        projectId: n,
        optionalChains: t,
        rpcMap: Object.fromEntries(
          this.chains.map((s) => [s.id, s.rpcUrls.default.http[0]])
        ),
        metadata: a,
        relayUrl: o,
      })
    );
  }
};
$s = new WeakSet();
Ld = function () {
  if (
    Je(this, Ml, B0).call(this).includes(jd) ||
    !this.options.isNewChainsStale
  )
    return !1;
  const t = Je(this, Fl, M0).call(this),
    n = this.chains.map(({ id: i }) => i),
    r = Je(this, Ul, R0).call(this);
  return r.length && !r.some((i) => n.includes(i))
    ? !1
    : !n.every((i) => t.includes(i));
};
Fd = new WeakSet();
rb = function () {
  ge(this, Oe) &&
    (Je(this, Ll, U0).call(this),
    ge(this, Oe).on("accountsChanged", this.onAccountsChanged),
    ge(this, Oe).on("chainChanged", this.onChainChanged),
    ge(this, Oe).on("disconnect", this.onDisconnect),
    ge(this, Oe).on("session_delete", this.onDisconnect),
    ge(this, Oe).on("display_uri", this.onDisplayUri),
    ge(this, Oe).on("connect", this.onConnect));
};
Ll = new WeakSet();
U0 = function () {
  ge(this, Oe) &&
    (ge(this, Oe).removeListener("accountsChanged", this.onAccountsChanged),
    ge(this, Oe).removeListener("chainChanged", this.onChainChanged),
    ge(this, Oe).removeListener("disconnect", this.onDisconnect),
    ge(this, Oe).removeListener("session_delete", this.onDisconnect),
    ge(this, Oe).removeListener("display_uri", this.onDisplayUri),
    ge(this, Oe).removeListener("connect", this.onConnect));
};
ai = new WeakSet();
Pa = function (e) {
  var t;
  (t = this.storage) == null || t.setItem(tb, e);
};
Fl = new WeakSet();
M0 = function () {
  var e;
  return ((e = this.storage) == null ? void 0 : e.getItem(tb)) ?? [];
};
Ul = new WeakSet();
R0 = function () {
  var r, i, a;
  if (!ge(this, Oe)) return [];
  const e = (r = ge(this, Oe).session) == null ? void 0 : r.namespaces;
  return e
    ? ((a = (i = Xw(e)[eb]) == null ? void 0 : i.chains) == null
        ? void 0
        : a.map((o) => parseInt(o.split(":")[1] || ""))) ?? []
    : [];
};
Ml = new WeakSet();
B0 = function () {
  var r, i;
  if (!ge(this, Oe)) return [];
  const e = (r = ge(this, Oe).session) == null ? void 0 : r.namespaces;
  return e ? ((i = Xw(e)[eb]) == null ? void 0 : i.methods) ?? [] : [];
};
function uA({ apiKey: e }) {
  return function (t) {
    var i, a, o;
    const n = (i = t.rpcUrls.infura) == null ? void 0 : i.http[0],
      r =
        (o = (a = t.rpcUrls.infura) == null ? void 0 : a.webSocket) == null
          ? void 0
          : o[0];
    return n
      ? {
          chain: {
            ...t,
            rpcUrls: { ...t.rpcUrls, default: { http: [`${n}/${e}`] } },
          },
          rpcUrls: { http: [`${n}/${e}`], webSocket: [`${r}/${e}`] },
        }
      : null;
  };
}
function cA() {
  return function (e) {
    return e.rpcUrls.public.http[0]
      ? { chain: e, rpcUrls: e.rpcUrls.public }
      : null;
  };
}
const fA = "a098cee768da56ae9b22a64d217029e0",
  {
    chains: zc,
    publicClient: dA,
    webSocketPublicClient: hA,
  } = HE([kv], [uA({ apiKey: "5ad26d3502da4415b245600173e05abc" }), cA()]),
  pA = aS({
    connectors: [
      new wN({ chains: zc }),
      new vN({ chains: zc, options: { appName: "wagmi" } }),
      new lA({ chains: zc, options: { projectId: fA } }),
    ],
    publicClient: dA,
    webSocketPublicClient: hA,
  });
uv(document.getElementById("root")).render(
  y.jsx(F.StrictMode, {
    children: y.jsx(lS, { config: pA, children: y.jsx(yN, {}) }),
  })
);
export {
  Bu as $,
  mP as A,
  BA as B,
  RA as C,
  n9 as D,
  KA as E,
  _A as F,
  Ht as G,
  kA as H,
  VA as I,
  DA as J,
  EA as K,
  UA as L,
  ZA as M,
  Vn as N,
  LA as O,
  FA as P,
  Wo as Q,
  $u as R,
  Kw as S,
  TA as T,
  Gi as U,
  YA as V,
  OA as W,
  AA as X,
  SA as Y,
  WA as Z,
  zo as _,
  Rl as a,
  HA as a0,
  zu as a1,
  PA as a2,
  I0 as a3,
  GA as a4,
  zA as a5,
  $A as a6,
  QA as a7,
  p9 as a8,
  e9 as a9,
  gu as aA,
  Pn as aB,
  Ao as aC,
  Ra as aD,
  ur as aE,
  JA as aa,
  XP as ab,
  c9 as ac,
  r9 as ad,
  JP as ae,
  XA as af,
  s9 as ag,
  i9 as ah,
  l9 as ai,
  f9 as aj,
  a9 as ak,
  o9 as al,
  u9 as am,
  t9 as an,
  WP as ao,
  Zw as ap,
  Bc as aq,
  yA as ar,
  vA as as,
  su as at,
  R as au,
  au as av,
  Ct as aw,
  zi as ax,
  uo as ay,
  I4 as az,
  H1 as b,
  mA as c,
  Mr as d,
  ie as e,
  ju as f,
  W1 as g,
  Xt as h,
  p1 as i,
  Rr as j,
  wA as k,
  bA as l,
  xA as m,
  Qw as n,
  d9 as o,
  St as p,
  NA as q,
  iD as r,
  h9 as s,
  rn as t,
  IA as u,
  MA as v,
  on as w,
  CA as x,
  qA as y,
  jA as z,
};
