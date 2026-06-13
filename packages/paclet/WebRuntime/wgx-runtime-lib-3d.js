var Kn = {
  LEFT: 0,
  MIDDLE: 1,
  RIGHT: 2,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2
}, jn = {
  ROTATE: 0,
  PAN: 1,
  DOLLY_PAN: 2,
  DOLLY_ROTATE: 3
};
var Gr = 1e3, sn = 1001, Hr = 1002, Tt = 1003, co = 1004, ho = 1005, Pt = 1006, uo = 1007, Kr = 1008, vn = 1009, fo = 1010, po = 1011, pa = 1012, mo = 1013, Rn = 1014, rr = 1015, wn = 1016, ma = 1017, _a = 1018, ga = 1020, _o = 35902, go = 35899, vo = 1021, Mo = 1022, mi = 1023, _i = 1026, va = 1027, So = 1028, Ma = 1029, er = 1030, Sa = 1031, xa = 1033, xo = 33776, Eo = 33777, yo = 33778, To = 33779, bo = 35840, Ao = 35841, Ro = 35842, wo = 35843, Co = 36196, Po = 37492, Lo = 37496, Do = 37488, Io = 37489, Uo = 37490, No = 37491, Oo = 37808, Fo = 37809, Bo = 37810, zo = 37811, Vo = 37812, Go = 37813, Ho = 37814, ko = 37815, Wo = 37816, Xo = 37817, Yo = 37818, qo = 37819, jo = 37820, Ko = 37821, Zo = 36492, $o = 36494, Jo = 36495, Qo = 36283, el = 36284, tl = 36285, nl = 36286, tr = 2300, kr = 2301, lr = 2302, fs = 2303, ps = 2400, ms = 2401, _s = 2402, il = 3200;
var Ht = "srgb", Wr = "srgb-linear", nr = "linear", ir = "srgb", cr = 7680;
var rl = 35044;
var $n = 2e3;
function sl(e) {
  for (let t = e.length - 1; t >= 0; --t) if (e[t] >= 65535) return !0;
  return !1;
}
function al(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function gi(e) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", e);
}
function ol() {
  const e = gi("canvas");
  return e.style.display = "block", e;
}
var gs = {}, Jn = null;
function vs(...e) {
  const t = "THREE." + e.shift();
  Jn ? Jn("log", t, ...e) : console.log(t, ...e);
}
function Ea(e) {
  const t = e[0];
  if (typeof t == "string" && t.startsWith("TSL:")) {
    const n = e[1];
    n && n.isStackTrace ? e[0] += " " + n.getLocation() : e[1] = 'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.';
  }
  return e;
}
function Te(...e) {
  e = Ea(e);
  const t = "THREE." + e.shift();
  if (Jn) Jn("warn", t, ...e);
  else {
    const n = e[0];
    n && n.isStackTrace ? console.warn(n.getError(t)) : console.warn(t, ...e);
  }
}
function Pe(...e) {
  e = Ea(e);
  const t = "THREE." + e.shift();
  if (Jn) Jn("error", t, ...e);
  else {
    const n = e[0];
    n && n.isStackTrace ? console.error(n.getError(t)) : console.error(t, ...e);
  }
}
function Xr(...e) {
  const t = e.join(" ");
  t in gs || (gs[t] = !0, Te(...e));
}
function ll(e, t, n) {
  return new Promise(function(i, r) {
    function s() {
      switch (e.clientWaitSync(t, e.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case e.WAIT_FAILED:
          r();
          break;
        case e.TIMEOUT_EXPIRED:
          setTimeout(s, n);
          break;
        default:
          i();
      }
    }
    setTimeout(s, n);
  });
}
var cl = {
  0: 1,
  2: 6,
  4: 7,
  3: 5,
  1: 0,
  6: 2,
  7: 4,
  5: 3
}, Mn = class {
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t);
  }
  hasEventListener(e, t) {
    const n = this._listeners;
    return n === void 0 ? !1 : n[e] !== void 0 && n[e].indexOf(t) !== -1;
  }
  removeEventListener(e, t) {
    const n = this._listeners;
    if (n === void 0) return;
    const i = n[e];
    if (i !== void 0) {
      const r = i.indexOf(t);
      r !== -1 && i.splice(r, 1);
    }
  }
  dispatchEvent(e) {
    const t = this._listeners;
    if (t === void 0) return;
    const n = t[e.type];
    if (n !== void 0) {
      e.target = this;
      const i = n.slice(0);
      for (let r = 0, s = i.length; r < s; r++) i[r].call(this, e);
      e.target = null;
    }
  }
}, Mt = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "0a",
  "0b",
  "0c",
  "0d",
  "0e",
  "0f",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "1a",
  "1b",
  "1c",
  "1d",
  "1e",
  "1f",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "2a",
  "2b",
  "2c",
  "2d",
  "2e",
  "2f",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "3a",
  "3b",
  "3c",
  "3d",
  "3e",
  "3f",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "4a",
  "4b",
  "4c",
  "4d",
  "4e",
  "4f",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "5a",
  "5b",
  "5c",
  "5d",
  "5e",
  "5f",
  "60",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "67",
  "68",
  "69",
  "6a",
  "6b",
  "6c",
  "6d",
  "6e",
  "6f",
  "70",
  "71",
  "72",
  "73",
  "74",
  "75",
  "76",
  "77",
  "78",
  "79",
  "7a",
  "7b",
  "7c",
  "7d",
  "7e",
  "7f",
  "80",
  "81",
  "82",
  "83",
  "84",
  "85",
  "86",
  "87",
  "88",
  "89",
  "8a",
  "8b",
  "8c",
  "8d",
  "8e",
  "8f",
  "90",
  "91",
  "92",
  "93",
  "94",
  "95",
  "96",
  "97",
  "98",
  "99",
  "9a",
  "9b",
  "9c",
  "9d",
  "9e",
  "9f",
  "a0",
  "a1",
  "a2",
  "a3",
  "a4",
  "a5",
  "a6",
  "a7",
  "a8",
  "a9",
  "aa",
  "ab",
  "ac",
  "ad",
  "ae",
  "af",
  "b0",
  "b1",
  "b2",
  "b3",
  "b4",
  "b5",
  "b6",
  "b7",
  "b8",
  "b9",
  "ba",
  "bb",
  "bc",
  "bd",
  "be",
  "bf",
  "c0",
  "c1",
  "c2",
  "c3",
  "c4",
  "c5",
  "c6",
  "c7",
  "c8",
  "c9",
  "ca",
  "cb",
  "cc",
  "cd",
  "ce",
  "cf",
  "d0",
  "d1",
  "d2",
  "d3",
  "d4",
  "d5",
  "d6",
  "d7",
  "d8",
  "d9",
  "da",
  "db",
  "dc",
  "dd",
  "de",
  "df",
  "e0",
  "e1",
  "e2",
  "e3",
  "e4",
  "e5",
  "e6",
  "e7",
  "e8",
  "e9",
  "ea",
  "eb",
  "ec",
  "ed",
  "ee",
  "ef",
  "f0",
  "f1",
  "f2",
  "f3",
  "f4",
  "f5",
  "f6",
  "f7",
  "f8",
  "f9",
  "fa",
  "fb",
  "fc",
  "fd",
  "fe",
  "ff"
], Ms = 1234567, fi = Math.PI / 180, vi = 180 / Math.PI;
function ni() {
  const e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0, i = Math.random() * 4294967295 | 0;
  return (Mt[e & 255] + Mt[e >> 8 & 255] + Mt[e >> 16 & 255] + Mt[e >> 24 & 255] + "-" + Mt[t & 255] + Mt[t >> 8 & 255] + "-" + Mt[t >> 16 & 15 | 64] + Mt[t >> 24 & 255] + "-" + Mt[n & 63 | 128] + Mt[n >> 8 & 255] + "-" + Mt[n >> 16 & 255] + Mt[n >> 24 & 255] + Mt[i & 255] + Mt[i >> 8 & 255] + Mt[i >> 16 & 255] + Mt[i >> 24 & 255]).toLowerCase();
}
function Be(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function Zr(e, t) {
  return (e % t + t) % t;
}
function hl(e, t, n, i, r) {
  return i + (e - t) * (r - i) / (n - t);
}
function ul(e, t, n) {
  return e !== t ? (n - e) / (t - e) : 0;
}
function pi(e, t, n) {
  return (1 - n) * e + n * t;
}
function dl(e, t, n, i) {
  return pi(e, t, 1 - Math.exp(-n * i));
}
function fl(e, t = 1) {
  return t - Math.abs(Zr(e, t * 2) - t);
}
function pl(e, t, n) {
  return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t), e * e * (3 - 2 * e));
}
function ml(e, t, n) {
  return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t), e * e * e * (e * (e * 6 - 15) + 10));
}
function _l(e, t) {
  return e + Math.floor(Math.random() * (t - e + 1));
}
function gl(e, t) {
  return e + Math.random() * (t - e);
}
function vl(e) {
  return e * (0.5 - Math.random());
}
function Ml(e) {
  e !== void 0 && (Ms = e);
  let t = Ms += 1831565813;
  return t = Math.imul(t ^ t >>> 15, t | 1), t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function Sl(e) {
  return e * fi;
}
function xl(e) {
  return e * vi;
}
function El(e) {
  return (e & e - 1) === 0 && e !== 0;
}
function yl(e) {
  return Math.pow(2, Math.ceil(Math.log(e) / Math.LN2));
}
function Tl(e) {
  return Math.pow(2, Math.floor(Math.log(e) / Math.LN2));
}
function bl(e, t, n, i, r) {
  const s = Math.cos, a = Math.sin, o = s(n / 2), l = a(n / 2), c = s((t + i) / 2), u = a((t + i) / 2), d = s((t - i) / 2), h = a((t - i) / 2), _ = s((i - t) / 2), M = a((i - t) / 2);
  switch (r) {
    case "XYX":
      e.set(o * u, l * d, l * h, o * c);
      break;
    case "YZY":
      e.set(l * h, o * u, l * d, o * c);
      break;
    case "ZXZ":
      e.set(l * d, l * h, o * u, o * c);
      break;
    case "XZX":
      e.set(o * u, l * M, l * _, o * c);
      break;
    case "YXY":
      e.set(l * _, o * u, l * M, o * c);
      break;
    case "ZYZ":
      e.set(l * M, l * _, o * u, o * c);
      break;
    default:
      Te("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + r);
  }
}
function Xn(e, t) {
  switch (t.constructor) {
    case Float32Array:
      return e;
    case Uint32Array:
      return e / 4294967295;
    case Uint16Array:
      return e / 65535;
    case Uint8Array:
      return e / 255;
    case Int32Array:
      return Math.max(e / 2147483647, -1);
    case Int16Array:
      return Math.max(e / 32767, -1);
    case Int8Array:
      return Math.max(e / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function Et(e, t) {
  switch (t.constructor) {
    case Float32Array:
      return e;
    case Uint32Array:
      return Math.round(e * 4294967295);
    case Uint16Array:
      return Math.round(e * 65535);
    case Uint8Array:
      return Math.round(e * 255);
    case Int32Array:
      return Math.round(e * 2147483647);
    case Int16Array:
      return Math.round(e * 32767);
    case Int8Array:
      return Math.round(e * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
var Al = {
  DEG2RAD: fi,
  RAD2DEG: vi,
  generateUUID: ni,
  clamp: Be,
  euclideanModulo: Zr,
  mapLinear: hl,
  inverseLerp: ul,
  lerp: pi,
  damp: dl,
  pingpong: fl,
  smoothstep: pl,
  smootherstep: ml,
  randInt: _l,
  randFloat: gl,
  randFloatSpread: vl,
  seededRandom: Ml,
  degToRad: Sl,
  radToDeg: xl,
  isPowerOfTwo: El,
  ceilPowerOfTwo: yl,
  floorPowerOfTwo: Tl,
  setQuaternionFromProperEuler: bl,
  normalize: Et,
  denormalize: Xn
}, Ne = class ya {
  static {
    ya.prototype.isVector2 = !0;
  }
  constructor(t = 0, n = 0) {
    this.x = t, this.y = n;
  }
  get width() {
    return this.x;
  }
  set width(t) {
    this.x = t;
  }
  get height() {
    return this.y;
  }
  set height(t) {
    this.y = t;
  }
  set(t, n) {
    return this.x = t, this.y = n, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setComponent(t, n) {
    switch (t) {
      case 0:
        this.x = n;
        break;
      case 1:
        this.y = n;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this;
  }
  addVectors(t, n) {
    return this.x = t.x + n.x, this.y = t.y + n.y, this;
  }
  addScaledVector(t, n) {
    return this.x += t.x * n, this.y += t.y * n, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this;
  }
  subVectors(t, n) {
    return this.x = t.x - n.x, this.y = t.y - n.y, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this;
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  applyMatrix3(t) {
    const n = this.x, i = this.y, r = t.elements;
    return this.x = r[0] * n + r[3] * i + r[6], this.y = r[1] * n + r[4] * i + r[7], this;
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this;
  }
  clamp(t, n) {
    return this.x = Be(this.x, t.x, n.x), this.y = Be(this.y, t.y, n.y), this;
  }
  clampScalar(t, n) {
    return this.x = Be(this.x, t, n), this.y = Be(this.y, t, n), this;
  }
  clampLength(t, n) {
    const i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(Be(i, t, n));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y;
  }
  cross(t) {
    return this.x * t.y - this.y * t.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(t) {
    const n = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (n === 0) return Math.PI / 2;
    const i = this.dot(t) / n;
    return Math.acos(Be(i, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const n = this.x - t.x, i = this.y - t.y;
    return n * n + i * i;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, n) {
    return this.x += (t.x - this.x) * n, this.y += (t.y - this.y) * n, this;
  }
  lerpVectors(t, n, i) {
    return this.x = t.x + (n.x - t.x) * i, this.y = t.y + (n.y - t.y) * i, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y;
  }
  fromArray(t, n = 0) {
    return this.x = t[n], this.y = t[n + 1], this;
  }
  toArray(t = [], n = 0) {
    return t[n] = this.x, t[n + 1] = this.y, t;
  }
  fromBufferAttribute(t, n) {
    return this.x = t.getX(n), this.y = t.getY(n), this;
  }
  rotateAround(t, n) {
    const i = Math.cos(n), r = Math.sin(n), s = this.x - t.x, a = this.y - t.y;
    return this.x = s * i - a * r + t.x, this.y = s * r + a * i + t.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}, on = class {
  constructor(e = 0, t = 0, n = 0, i = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = i;
  }
  static slerpFlat(e, t, n, i, r, s, a) {
    let o = n[i + 0], l = n[i + 1], c = n[i + 2], u = n[i + 3], d = r[s + 0], h = r[s + 1], _ = r[s + 2], M = r[s + 3];
    if (u !== M || o !== d || l !== h || c !== _) {
      let S = o * d + l * h + c * _ + u * M;
      S < 0 && (d = -d, h = -h, _ = -_, M = -M, S = -S);
      let p = 1 - a;
      if (S < 0.9995) {
        const f = Math.acos(S), y = Math.sin(f);
        p = Math.sin(p * f) / y, a = Math.sin(a * f) / y, o = o * p + d * a, l = l * p + h * a, c = c * p + _ * a, u = u * p + M * a;
      } else {
        o = o * p + d * a, l = l * p + h * a, c = c * p + _ * a, u = u * p + M * a;
        const f = 1 / Math.sqrt(o * o + l * l + c * c + u * u);
        o *= f, l *= f, c *= f, u *= f;
      }
    }
    e[t] = o, e[t + 1] = l, e[t + 2] = c, e[t + 3] = u;
  }
  static multiplyQuaternionsFlat(e, t, n, i, r, s) {
    const a = n[i], o = n[i + 1], l = n[i + 2], c = n[i + 3], u = r[s], d = r[s + 1], h = r[s + 2], _ = r[s + 3];
    return e[t] = a * _ + c * u + o * h - l * d, e[t + 1] = o * _ + c * d + l * u - a * h, e[t + 2] = l * _ + c * h + a * d - o * u, e[t + 3] = c * _ - a * u - o * d - l * h, e;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e, this._onChangeCallback();
  }
  set(e, t, n, i) {
    return this._x = e, this._y = t, this._z = n, this._w = i, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(e) {
    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
  }
  setFromEuler(e, t = !0) {
    const n = e._x, i = e._y, r = e._z, s = e._order, a = Math.cos, o = Math.sin, l = a(n / 2), c = a(i / 2), u = a(r / 2), d = o(n / 2), h = o(i / 2), _ = o(r / 2);
    switch (s) {
      case "XYZ":
        this._x = d * c * u + l * h * _, this._y = l * h * u - d * c * _, this._z = l * c * _ + d * h * u, this._w = l * c * u - d * h * _;
        break;
      case "YXZ":
        this._x = d * c * u + l * h * _, this._y = l * h * u - d * c * _, this._z = l * c * _ - d * h * u, this._w = l * c * u + d * h * _;
        break;
      case "ZXY":
        this._x = d * c * u - l * h * _, this._y = l * h * u + d * c * _, this._z = l * c * _ + d * h * u, this._w = l * c * u - d * h * _;
        break;
      case "ZYX":
        this._x = d * c * u - l * h * _, this._y = l * h * u + d * c * _, this._z = l * c * _ - d * h * u, this._w = l * c * u + d * h * _;
        break;
      case "YZX":
        this._x = d * c * u + l * h * _, this._y = l * h * u + d * c * _, this._z = l * c * _ - d * h * u, this._w = l * c * u - d * h * _;
        break;
      case "XZY":
        this._x = d * c * u - l * h * _, this._y = l * h * u - d * c * _, this._z = l * c * _ + d * h * u, this._w = l * c * u + d * h * _;
        break;
      default:
        Te("Quaternion: .setFromEuler() encountered an unknown order: " + s);
    }
    return t === !0 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(e, t) {
    const n = t / 2, i = Math.sin(n);
    return this._x = e.x * i, this._y = e.y * i, this._z = e.z * i, this._w = Math.cos(n), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e) {
    const t = e.elements, n = t[0], i = t[4], r = t[8], s = t[1], a = t[5], o = t[9], l = t[2], c = t[6], u = t[10], d = n + a + u;
    if (d > 0) {
      const h = 0.5 / Math.sqrt(d + 1);
      this._w = 0.25 / h, this._x = (c - o) * h, this._y = (r - l) * h, this._z = (s - i) * h;
    } else if (n > a && n > u) {
      const h = 2 * Math.sqrt(1 + n - a - u);
      this._w = (c - o) / h, this._x = 0.25 * h, this._y = (i + s) / h, this._z = (r + l) / h;
    } else if (a > u) {
      const h = 2 * Math.sqrt(1 + a - n - u);
      this._w = (r - l) / h, this._x = (i + s) / h, this._y = 0.25 * h, this._z = (o + c) / h;
    } else {
      const h = 2 * Math.sqrt(1 + u - n - a);
      this._w = (s - i) / h, this._x = (r + l) / h, this._y = (o + c) / h, this._z = 0.25 * h;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(e, t) {
    let n = e.dot(t) + 1;
    return n < 1e-8 ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize();
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(Be(this.dot(e), -1, 1)));
  }
  rotateTowards(e, t) {
    const n = this.angleTo(e);
    if (n === 0) return this;
    const i = Math.min(1, t / n);
    return this.slerp(e, i), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let e = this.length();
    return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this;
  }
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  multiplyQuaternions(e, t) {
    const n = e._x, i = e._y, r = e._z, s = e._w, a = t._x, o = t._y, l = t._z, c = t._w;
    return this._x = n * c + s * a + i * l - r * o, this._y = i * c + s * o + r * a - n * l, this._z = r * c + s * l + n * o - i * a, this._w = s * c - n * a - i * o - r * l, this._onChangeCallback(), this;
  }
  slerp(e, t) {
    let n = e._x, i = e._y, r = e._z, s = e._w, a = this.dot(e);
    a < 0 && (n = -n, i = -i, r = -r, s = -s, a = -a);
    let o = 1 - t;
    if (a < 0.9995) {
      const l = Math.acos(a), c = Math.sin(l);
      o = Math.sin(o * l) / c, t = Math.sin(t * l) / c, this._x = this._x * o + n * t, this._y = this._y * o + i * t, this._z = this._z * o + r * t, this._w = this._w * o + s * t, this._onChangeCallback();
    } else
      this._x = this._x * o + n * t, this._y = this._y * o + i * t, this._z = this._z * o + r * t, this._w = this._w * o + s * t, this.normalize();
    return this;
  }
  slerpQuaternions(e, t, n) {
    return this.copy(e).slerp(t, n);
  }
  random() {
    const e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), n = Math.random(), i = Math.sqrt(1 - n), r = Math.sqrt(n);
    return this.set(i * Math.sin(e), i * Math.cos(e), r * Math.sin(t), r * Math.cos(t));
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  fromArray(e, t = 0) {
    return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
  }
  fromBufferAttribute(e, t) {
    return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}, O = class Ta {
  static {
    Ta.prototype.isVector3 = !0;
  }
  constructor(t = 0, n = 0, i = 0) {
    this.x = t, this.y = n, this.z = i;
  }
  set(t, n, i) {
    return i === void 0 && (i = this.z), this.x = t, this.y = n, this.z = i, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this.z = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setZ(t) {
    return this.z = t, this;
  }
  setComponent(t, n) {
    switch (t) {
      case 0:
        this.x = n;
        break;
      case 1:
        this.y = n;
        break;
      case 2:
        this.z = n;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this.z = t.z, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this.z += t.z, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this.z += t, this;
  }
  addVectors(t, n) {
    return this.x = t.x + n.x, this.y = t.y + n.y, this.z = t.z + n.z, this;
  }
  addScaledVector(t, n) {
    return this.x += t.x * n, this.y += t.y * n, this.z += t.z * n, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this.z -= t.z, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this.z -= t, this;
  }
  subVectors(t, n) {
    return this.x = t.x - n.x, this.y = t.y - n.y, this.z = t.z - n.z, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this.z *= t.z, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this.z *= t, this;
  }
  multiplyVectors(t, n) {
    return this.x = t.x * n.x, this.y = t.y * n.y, this.z = t.z * n.z, this;
  }
  applyEuler(t) {
    return this.applyQuaternion(Ss.setFromEuler(t));
  }
  applyAxisAngle(t, n) {
    return this.applyQuaternion(Ss.setFromAxisAngle(t, n));
  }
  applyMatrix3(t) {
    const n = this.x, i = this.y, r = this.z, s = t.elements;
    return this.x = s[0] * n + s[3] * i + s[6] * r, this.y = s[1] * n + s[4] * i + s[7] * r, this.z = s[2] * n + s[5] * i + s[8] * r, this;
  }
  applyNormalMatrix(t) {
    return this.applyMatrix3(t).normalize();
  }
  applyMatrix4(t) {
    const n = this.x, i = this.y, r = this.z, s = t.elements, a = 1 / (s[3] * n + s[7] * i + s[11] * r + s[15]);
    return this.x = (s[0] * n + s[4] * i + s[8] * r + s[12]) * a, this.y = (s[1] * n + s[5] * i + s[9] * r + s[13]) * a, this.z = (s[2] * n + s[6] * i + s[10] * r + s[14]) * a, this;
  }
  applyQuaternion(t) {
    const n = this.x, i = this.y, r = this.z, s = t.x, a = t.y, o = t.z, l = t.w, c = 2 * (a * r - o * i), u = 2 * (o * n - s * r), d = 2 * (s * i - a * n);
    return this.x = n + l * c + a * d - o * u, this.y = i + l * u + o * c - s * d, this.z = r + l * d + s * u - a * c, this;
  }
  project(t) {
    return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix);
  }
  unproject(t) {
    return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld);
  }
  transformDirection(t) {
    const n = this.x, i = this.y, r = this.z, s = t.elements;
    return this.x = s[0] * n + s[4] * i + s[8] * r, this.y = s[1] * n + s[5] * i + s[9] * r, this.z = s[2] * n + s[6] * i + s[10] * r, this.normalize();
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this.z /= t.z, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this;
  }
  clamp(t, n) {
    return this.x = Be(this.x, t.x, n.x), this.y = Be(this.y, t.y, n.y), this.z = Be(this.z, t.z, n.z), this;
  }
  clampScalar(t, n) {
    return this.x = Be(this.x, t, n), this.y = Be(this.y, t, n), this.z = Be(this.z, t, n), this;
  }
  clampLength(t, n) {
    const i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(Be(i, t, n));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, n) {
    return this.x += (t.x - this.x) * n, this.y += (t.y - this.y) * n, this.z += (t.z - this.z) * n, this;
  }
  lerpVectors(t, n, i) {
    return this.x = t.x + (n.x - t.x) * i, this.y = t.y + (n.y - t.y) * i, this.z = t.z + (n.z - t.z) * i, this;
  }
  cross(t) {
    return this.crossVectors(this, t);
  }
  crossVectors(t, n) {
    const i = t.x, r = t.y, s = t.z, a = n.x, o = n.y, l = n.z;
    return this.x = r * l - s * o, this.y = s * a - i * l, this.z = i * o - r * a, this;
  }
  projectOnVector(t) {
    const n = t.lengthSq();
    if (n === 0) return this.set(0, 0, 0);
    const i = t.dot(this) / n;
    return this.copy(t).multiplyScalar(i);
  }
  projectOnPlane(t) {
    return hr.copy(this).projectOnVector(t), this.sub(hr);
  }
  reflect(t) {
    return this.sub(hr.copy(t).multiplyScalar(2 * this.dot(t)));
  }
  angleTo(t) {
    const n = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (n === 0) return Math.PI / 2;
    const i = this.dot(t) / n;
    return Math.acos(Be(i, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const n = this.x - t.x, i = this.y - t.y, r = this.z - t.z;
    return n * n + i * i + r * r;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z);
  }
  setFromSpherical(t) {
    return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
  }
  setFromSphericalCoords(t, n, i) {
    const r = Math.sin(n) * t;
    return this.x = r * Math.sin(i), this.y = Math.cos(n) * t, this.z = r * Math.cos(i), this;
  }
  setFromCylindrical(t) {
    return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
  }
  setFromCylindricalCoords(t, n, i) {
    return this.x = t * Math.sin(n), this.y = i, this.z = t * Math.cos(n), this;
  }
  setFromMatrixPosition(t) {
    const n = t.elements;
    return this.x = n[12], this.y = n[13], this.z = n[14], this;
  }
  setFromMatrixScale(t) {
    const n = this.setFromMatrixColumn(t, 0).length(), i = this.setFromMatrixColumn(t, 1).length(), r = this.setFromMatrixColumn(t, 2).length();
    return this.x = n, this.y = i, this.z = r, this;
  }
  setFromMatrixColumn(t, n) {
    return this.fromArray(t.elements, n * 4);
  }
  setFromMatrix3Column(t, n) {
    return this.fromArray(t.elements, n * 3);
  }
  setFromEuler(t) {
    return this.x = t._x, this.y = t._y, this.z = t._z, this;
  }
  setFromColor(t) {
    return this.x = t.r, this.y = t.g, this.z = t.b, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z;
  }
  fromArray(t, n = 0) {
    return this.x = t[n], this.y = t[n + 1], this.z = t[n + 2], this;
  }
  toArray(t = [], n = 0) {
    return t[n] = this.x, t[n + 1] = this.y, t[n + 2] = this.z, t;
  }
  fromBufferAttribute(t, n) {
    return this.x = t.getX(n), this.y = t.getY(n), this.z = t.getZ(n), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const t = Math.random() * Math.PI * 2, n = Math.random() * 2 - 1, i = Math.sqrt(1 - n * n);
    return this.x = i * Math.cos(t), this.y = n, this.z = i * Math.sin(t), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}, hr = /* @__PURE__ */ new O(), Ss = /* @__PURE__ */ new on(), Ie = class ba {
  static {
    ba.prototype.isMatrix3 = !0;
  }
  constructor(t, n, i, r, s, a, o, l, c) {
    this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], t !== void 0 && this.set(t, n, i, r, s, a, o, l, c);
  }
  set(t, n, i, r, s, a, o, l, c) {
    const u = this.elements;
    return u[0] = t, u[1] = r, u[2] = o, u[3] = n, u[4] = s, u[5] = l, u[6] = i, u[7] = a, u[8] = c, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
  }
  copy(t) {
    const n = this.elements, i = t.elements;
    return n[0] = i[0], n[1] = i[1], n[2] = i[2], n[3] = i[3], n[4] = i[4], n[5] = i[5], n[6] = i[6], n[7] = i[7], n[8] = i[8], this;
  }
  extractBasis(t, n, i) {
    return t.setFromMatrix3Column(this, 0), n.setFromMatrix3Column(this, 1), i.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(t) {
    const n = t.elements;
    return this.set(n[0], n[4], n[8], n[1], n[5], n[9], n[2], n[6], n[10]), this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, n) {
    const i = t.elements, r = n.elements, s = this.elements, a = i[0], o = i[3], l = i[6], c = i[1], u = i[4], d = i[7], h = i[2], _ = i[5], M = i[8], S = r[0], p = r[3], f = r[6], y = r[1], b = r[4], T = r[7], P = r[2], R = r[5], D = r[8];
    return s[0] = a * S + o * y + l * P, s[3] = a * p + o * b + l * R, s[6] = a * f + o * T + l * D, s[1] = c * S + u * y + d * P, s[4] = c * p + u * b + d * R, s[7] = c * f + u * T + d * D, s[2] = h * S + _ * y + M * P, s[5] = h * p + _ * b + M * R, s[8] = h * f + _ * T + M * D, this;
  }
  multiplyScalar(t) {
    const n = this.elements;
    return n[0] *= t, n[3] *= t, n[6] *= t, n[1] *= t, n[4] *= t, n[7] *= t, n[2] *= t, n[5] *= t, n[8] *= t, this;
  }
  determinant() {
    const t = this.elements, n = t[0], i = t[1], r = t[2], s = t[3], a = t[4], o = t[5], l = t[6], c = t[7], u = t[8];
    return n * a * u - n * o * c - i * s * u + i * o * l + r * s * c - r * a * l;
  }
  invert() {
    const t = this.elements, n = t[0], i = t[1], r = t[2], s = t[3], a = t[4], o = t[5], l = t[6], c = t[7], u = t[8], d = u * a - o * c, h = o * l - u * s, _ = c * s - a * l, M = n * d + i * h + r * _;
    if (M === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const S = 1 / M;
    return t[0] = d * S, t[1] = (r * c - u * i) * S, t[2] = (o * i - r * a) * S, t[3] = h * S, t[4] = (u * n - r * l) * S, t[5] = (r * s - o * n) * S, t[6] = _ * S, t[7] = (i * l - c * n) * S, t[8] = (a * n - i * s) * S, this;
  }
  transpose() {
    let t;
    const n = this.elements;
    return t = n[1], n[1] = n[3], n[3] = t, t = n[2], n[2] = n[6], n[6] = t, t = n[5], n[5] = n[7], n[7] = t, this;
  }
  getNormalMatrix(t) {
    return this.setFromMatrix4(t).invert().transpose();
  }
  transposeIntoArray(t) {
    const n = this.elements;
    return t[0] = n[0], t[1] = n[3], t[2] = n[6], t[3] = n[1], t[4] = n[4], t[5] = n[7], t[6] = n[2], t[7] = n[5], t[8] = n[8], this;
  }
  setUvTransform(t, n, i, r, s, a, o) {
    const l = Math.cos(s), c = Math.sin(s);
    return this.set(i * l, i * c, -i * (l * a + c * o) + a + t, -r * c, r * l, -r * (-c * a + l * o) + o + n, 0, 0, 1), this;
  }
  scale(t, n) {
    return this.premultiply(ur.makeScale(t, n)), this;
  }
  rotate(t) {
    return this.premultiply(ur.makeRotation(-t)), this;
  }
  translate(t, n) {
    return this.premultiply(ur.makeTranslation(t, n)), this;
  }
  makeTranslation(t, n) {
    return t.isVector2 ? this.set(1, 0, t.x, 0, 1, t.y, 0, 0, 1) : this.set(1, 0, t, 0, 1, n, 0, 0, 1), this;
  }
  makeRotation(t) {
    const n = Math.cos(t), i = Math.sin(t);
    return this.set(n, -i, 0, i, n, 0, 0, 0, 1), this;
  }
  makeScale(t, n) {
    return this.set(t, 0, 0, 0, n, 0, 0, 0, 1), this;
  }
  equals(t) {
    const n = this.elements, i = t.elements;
    for (let r = 0; r < 9; r++) if (n[r] !== i[r]) return !1;
    return !0;
  }
  fromArray(t, n = 0) {
    for (let i = 0; i < 9; i++) this.elements[i] = t[i + n];
    return this;
  }
  toArray(t = [], n = 0) {
    const i = this.elements;
    return t[n] = i[0], t[n + 1] = i[1], t[n + 2] = i[2], t[n + 3] = i[3], t[n + 4] = i[4], t[n + 5] = i[5], t[n + 6] = i[6], t[n + 7] = i[7], t[n + 8] = i[8], t;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}, ur = /* @__PURE__ */ new Ie(), xs = /* @__PURE__ */ new Ie().set(0.4123908, 0.3575843, 0.1804808, 0.212639, 0.7151687, 0.0721923, 0.0193308, 0.1191948, 0.9505322), Es = /* @__PURE__ */ new Ie().set(3.2409699, -1.5373832, -0.4986108, -0.9692436, 1.8759675, 0.0415551, 0.0556301, -0.203977, 1.0569715);
function Rl() {
  const e = {
    enabled: !0,
    workingColorSpace: Wr,
    spaces: {},
    convert: function(r, s, a) {
      return this.enabled === !1 || s === a || !s || !a || (this.spaces[s].transfer === "srgb" && (r.r = an(r.r), r.g = an(r.g), r.b = an(r.b)), this.spaces[s].primaries !== this.spaces[a].primaries && (r.applyMatrix3(this.spaces[s].toXYZ), r.applyMatrix3(this.spaces[a].fromXYZ)), this.spaces[a].transfer === "srgb" && (r.r = Zn(r.r), r.g = Zn(r.g), r.b = Zn(r.b))), r;
    },
    workingToColorSpace: function(r, s) {
      return this.convert(r, this.workingColorSpace, s);
    },
    colorSpaceToWorking: function(r, s) {
      return this.convert(r, s, this.workingColorSpace);
    },
    getPrimaries: function(r) {
      return this.spaces[r].primaries;
    },
    getTransfer: function(r) {
      return r === "" ? nr : this.spaces[r].transfer;
    },
    getToneMappingMode: function(r) {
      return this.spaces[r].outputColorSpaceConfig.toneMappingMode || "standard";
    },
    getLuminanceCoefficients: function(r, s = this.workingColorSpace) {
      return r.fromArray(this.spaces[s].luminanceCoefficients);
    },
    define: function(r) {
      Object.assign(this.spaces, r);
    },
    _getMatrix: function(r, s, a) {
      return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ);
    },
    _getDrawingBufferColorSpace: function(r) {
      return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace;
    },
    _getUnpackColorSpace: function(r = this.workingColorSpace) {
      return this.spaces[r].workingColorSpaceConfig.unpackColorSpace;
    },
    fromWorkingColorSpace: function(r, s) {
      return Xr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), e.workingToColorSpace(r, s);
    },
    toWorkingColorSpace: function(r, s) {
      return Xr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), e.colorSpaceToWorking(r, s);
    }
  }, t = [
    0.64,
    0.33,
    0.3,
    0.6,
    0.15,
    0.06
  ], n = [
    0.2126,
    0.7152,
    0.0722
  ], i = [0.3127, 0.329];
  return e.define({
    [Wr]: {
      primaries: t,
      whitePoint: i,
      transfer: nr,
      toXYZ: xs,
      fromXYZ: Es,
      luminanceCoefficients: n,
      workingColorSpaceConfig: { unpackColorSpace: Ht },
      outputColorSpaceConfig: { drawingBufferColorSpace: Ht }
    },
    [Ht]: {
      primaries: t,
      whitePoint: i,
      transfer: ir,
      toXYZ: xs,
      fromXYZ: Es,
      luminanceCoefficients: n,
      outputColorSpaceConfig: { drawingBufferColorSpace: Ht }
    }
  }), e;
}
var We = /* @__PURE__ */ Rl();
function an(e) {
  return e < 0.04045 ? e * 0.0773993808 : Math.pow(e * 0.9478672986 + 0.0521327014, 2.4);
}
function Zn(e) {
  return e < 31308e-7 ? e * 12.92 : 1.055 * Math.pow(e, 0.41666) - 0.055;
}
var Ln, wl = class {
  static getDataURL(e, t = "image/png") {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u") return e.src;
    let n;
    if (e instanceof HTMLCanvasElement) n = e;
    else {
      Ln === void 0 && (Ln = gi("canvas")), Ln.width = e.width, Ln.height = e.height;
      const i = Ln.getContext("2d");
      e instanceof ImageData ? i.putImageData(e, 0, 0) : i.drawImage(e, 0, 0, e.width, e.height), n = Ln;
    }
    return n.toDataURL(t);
  }
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      const t = gi("canvas");
      t.width = e.width, t.height = e.height;
      const n = t.getContext("2d");
      n.drawImage(e, 0, 0, e.width, e.height);
      const i = n.getImageData(0, 0, e.width, e.height), r = i.data;
      for (let s = 0; s < r.length; s++) r[s] = an(r[s] / 255) * 255;
      return n.putImageData(i, 0, 0), t;
    } else if (e.data) {
      const t = e.data.slice(0);
      for (let n = 0; n < t.length; n++) t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[n] = Math.floor(an(t[n] / 255) * 255) : t[n] = an(t[n]);
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    } else
      return Te("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}, Cl = 0, $r = class {
  constructor(e = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: Cl++ }), this.uuid = ni(), this.data = e, this.dataReady = !0, this.version = 0;
  }
  getSize(e) {
    const t = this.data;
    return typeof HTMLVideoElement < "u" && t instanceof HTMLVideoElement ? e.set(t.videoWidth, t.videoHeight, 0) : typeof VideoFrame < "u" && t instanceof VideoFrame ? e.set(t.displayWidth, t.displayHeight, 0) : t !== null ? e.set(t.width, t.height, t.depth || 0) : e.set(0, 0, 0), e;
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.images[this.uuid] !== void 0) return e.images[this.uuid];
    const n = {
      uuid: this.uuid,
      url: ""
    }, i = this.data;
    if (i !== null) {
      let r;
      if (Array.isArray(i)) {
        r = [];
        for (let s = 0, a = i.length; s < a; s++) i[s].isDataTexture ? r.push(dr(i[s].image)) : r.push(dr(i[s]));
      } else r = dr(i);
      n.url = r;
    }
    return t || (e.images[this.uuid] = n), n;
  }
};
function dr(e) {
  return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap ? wl.getDataURL(e) : e.data ? {
    data: Array.from(e.data),
    width: e.width,
    height: e.height,
    type: e.data.constructor.name
  } : (Te("Texture: Unable to serialize Texture."), {});
}
var Pl = 0, fr = /* @__PURE__ */ new O(), Ot = class Zi extends Mn {
  constructor(t = Zi.DEFAULT_IMAGE, n = Zi.DEFAULT_MAPPING, i = sn, r = sn, s = Pt, a = Kr, o = mi, l = vn, c = Zi.DEFAULT_ANISOTROPY, u = "") {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: Pl++ }), this.uuid = ni(), this.name = "", this.source = new $r(t), this.mipmaps = [], this.mapping = n, this.channel = 0, this.wrapS = i, this.wrapT = r, this.magFilter = s, this.minFilter = a, this.anisotropy = c, this.format = o, this.internalFormat = null, this.type = l, this.offset = new Ne(0, 0), this.repeat = new Ne(1, 1), this.center = new Ne(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Ie(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = u, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(t && t.depth && t.depth > 1), this.pmremVersion = 0, this.normalized = !1;
  }
  get width() {
    return this.source.getSize(fr).x;
  }
  get height() {
    return this.source.getSize(fr).y;
  }
  get depth() {
    return this.source.getSize(fr).z;
  }
  get image() {
    return this.source.data;
  }
  set image(t) {
    this.source.data = t;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  addUpdateRange(t, n) {
    this.updateRanges.push({
      start: t,
      count: n
    });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.name = t.name, this.source = t.source, this.mipmaps = t.mipmaps.slice(0), this.mapping = t.mapping, this.channel = t.channel, this.wrapS = t.wrapS, this.wrapT = t.wrapT, this.magFilter = t.magFilter, this.minFilter = t.minFilter, this.anisotropy = t.anisotropy, this.format = t.format, this.internalFormat = t.internalFormat, this.type = t.type, this.normalized = t.normalized, this.offset.copy(t.offset), this.repeat.copy(t.repeat), this.center.copy(t.center), this.rotation = t.rotation, this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrix.copy(t.matrix), this.generateMipmaps = t.generateMipmaps, this.premultiplyAlpha = t.premultiplyAlpha, this.flipY = t.flipY, this.unpackAlignment = t.unpackAlignment, this.colorSpace = t.colorSpace, this.renderTarget = t.renderTarget, this.isRenderTargetTexture = t.isRenderTargetTexture, this.isArrayTexture = t.isArrayTexture, this.userData = JSON.parse(JSON.stringify(t.userData)), this.needsUpdate = !0, this;
  }
  setValues(t) {
    for (const n in t) {
      const i = t[n];
      if (i === void 0) {
        Te(`Texture.setValues(): parameter '${n}' has value of undefined.`);
        continue;
      }
      const r = this[n];
      if (r === void 0) {
        Te(`Texture.setValues(): property '${n}' does not exist.`);
        continue;
      }
      r && i && r.isVector2 && i.isVector2 || r && i && r.isVector3 && i.isVector3 || r && i && r.isMatrix3 && i.isMatrix3 ? r.copy(i) : this[n] = i;
    }
  }
  toJSON(t) {
    const n = t === void 0 || typeof t == "string";
    if (!n && t.textures[this.uuid] !== void 0) return t.textures[this.uuid];
    const i = {
      metadata: {
        version: 4.7,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(t).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      normalized: this.normalized,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (i.userData = this.userData), n || (t.textures[this.uuid] = i), i;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(t) {
    if (this.mapping !== 300) return t;
    if (t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1) switch (this.wrapS) {
      case Gr:
        t.x = t.x - Math.floor(t.x);
        break;
      case sn:
        t.x = t.x < 0 ? 0 : 1;
        break;
      case Hr:
        Math.abs(Math.floor(t.x) % 2) === 1 ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x);
        break;
    }
    if (t.y < 0 || t.y > 1) switch (this.wrapT) {
      case Gr:
        t.y = t.y - Math.floor(t.y);
        break;
      case sn:
        t.y = t.y < 0 ? 0 : 1;
        break;
      case Hr:
        Math.abs(Math.floor(t.y) % 2) === 1 ? t.y = Math.ceil(t.y) - t.y : t.y = t.y - Math.floor(t.y);
        break;
    }
    return this.flipY && (t.y = 1 - t.y), t;
  }
  set needsUpdate(t) {
    t === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  set needsPMREMUpdate(t) {
    t === !0 && this.pmremVersion++;
  }
};
Ot.DEFAULT_IMAGE = null;
Ot.DEFAULT_MAPPING = 300;
Ot.DEFAULT_ANISOTROPY = 1;
var ht = class Aa {
  static {
    Aa.prototype.isVector4 = !0;
  }
  constructor(t = 0, n = 0, i = 0, r = 1) {
    this.x = t, this.y = n, this.z = i, this.w = r;
  }
  get width() {
    return this.z;
  }
  set width(t) {
    this.z = t;
  }
  get height() {
    return this.w;
  }
  set height(t) {
    this.w = t;
  }
  set(t, n, i, r) {
    return this.x = t, this.y = n, this.z = i, this.w = r, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this.z = t, this.w = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setZ(t) {
    return this.z = t, this;
  }
  setW(t) {
    return this.w = t, this;
  }
  setComponent(t, n) {
    switch (t) {
      case 0:
        this.x = n;
        break;
      case 1:
        this.y = n;
        break;
      case 2:
        this.z = n;
        break;
      case 3:
        this.w = n;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this.z = t.z, this.w = t.w !== void 0 ? t.w : 1, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this.z += t, this.w += t, this;
  }
  addVectors(t, n) {
    return this.x = t.x + n.x, this.y = t.y + n.y, this.z = t.z + n.z, this.w = t.w + n.w, this;
  }
  addScaledVector(t, n) {
    return this.x += t.x * n, this.y += t.y * n, this.z += t.z * n, this.w += t.w * n, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this.z -= t, this.w -= t, this;
  }
  subVectors(t, n) {
    return this.x = t.x - n.x, this.y = t.y - n.y, this.z = t.z - n.z, this.w = t.w - n.w, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this.z *= t.z, this.w *= t.w, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this;
  }
  applyMatrix4(t) {
    const n = this.x, i = this.y, r = this.z, s = this.w, a = t.elements;
    return this.x = a[0] * n + a[4] * i + a[8] * r + a[12] * s, this.y = a[1] * n + a[5] * i + a[9] * r + a[13] * s, this.z = a[2] * n + a[6] * i + a[10] * r + a[14] * s, this.w = a[3] * n + a[7] * i + a[11] * r + a[15] * s, this;
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this.z /= t.z, this.w /= t.w, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  setAxisAngleFromQuaternion(t) {
    this.w = 2 * Math.acos(t.w);
    const n = Math.sqrt(1 - t.w * t.w);
    return n < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = t.x / n, this.y = t.y / n, this.z = t.z / n), this;
  }
  setAxisAngleFromRotationMatrix(t) {
    let n, i, r, s;
    const l = t.elements, c = l[0], u = l[4], d = l[8], h = l[1], _ = l[5], M = l[9], S = l[2], p = l[6], f = l[10];
    if (Math.abs(u - h) < 0.01 && Math.abs(d - S) < 0.01 && Math.abs(M - p) < 0.01) {
      if (Math.abs(u + h) < 0.1 && Math.abs(d + S) < 0.1 && Math.abs(M + p) < 0.1 && Math.abs(c + _ + f - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      n = Math.PI;
      const b = (c + 1) / 2, T = (_ + 1) / 2, P = (f + 1) / 2, R = (u + h) / 4, D = (d + S) / 4, v = (M + p) / 4;
      return b > T && b > P ? b < 0.01 ? (i = 0, r = 0.707106781, s = 0.707106781) : (i = Math.sqrt(b), r = R / i, s = D / i) : T > P ? T < 0.01 ? (i = 0.707106781, r = 0, s = 0.707106781) : (r = Math.sqrt(T), i = R / r, s = v / r) : P < 0.01 ? (i = 0.707106781, r = 0.707106781, s = 0) : (s = Math.sqrt(P), i = D / s, r = v / s), this.set(i, r, s, n), this;
    }
    let y = Math.sqrt((p - M) * (p - M) + (d - S) * (d - S) + (h - u) * (h - u));
    return Math.abs(y) < 1e-3 && (y = 1), this.x = (p - M) / y, this.y = (d - S) / y, this.z = (h - u) / y, this.w = Math.acos((c + _ + f - 1) / 2), this;
  }
  setFromMatrixPosition(t) {
    const n = t.elements;
    return this.x = n[12], this.y = n[13], this.z = n[14], this.w = n[15], this;
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this.w = Math.min(this.w, t.w), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this.w = Math.max(this.w, t.w), this;
  }
  clamp(t, n) {
    return this.x = Be(this.x, t.x, n.x), this.y = Be(this.y, t.y, n.y), this.z = Be(this.z, t.z, n.z), this.w = Be(this.w, t.w, n.w), this;
  }
  clampScalar(t, n) {
    return this.x = Be(this.x, t, n), this.y = Be(this.y, t, n), this.z = Be(this.z, t, n), this.w = Be(this.w, t, n), this;
  }
  clampLength(t, n) {
    const i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(Be(i, t, n));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, n) {
    return this.x += (t.x - this.x) * n, this.y += (t.y - this.y) * n, this.z += (t.z - this.z) * n, this.w += (t.w - this.w) * n, this;
  }
  lerpVectors(t, n, i) {
    return this.x = t.x + (n.x - t.x) * i, this.y = t.y + (n.y - t.y) * i, this.z = t.z + (n.z - t.z) * i, this.w = t.w + (n.w - t.w) * i, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w;
  }
  fromArray(t, n = 0) {
    return this.x = t[n], this.y = t[n + 1], this.z = t[n + 2], this.w = t[n + 3], this;
  }
  toArray(t = [], n = 0) {
    return t[n] = this.x, t[n + 1] = this.y, t[n + 2] = this.z, t[n + 3] = this.w, t;
  }
  fromBufferAttribute(t, n) {
    return this.x = t.getX(n), this.y = t.getY(n), this.z = t.getZ(n), this.w = t.getW(n), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}, Ll = class extends Mn {
  constructor(e = 1, t = 1, n = {}) {
    super(), n = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: Pt,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1,
      depth: 1,
      multiview: !1
    }, n), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = n.depth, this.scissor = new ht(0, 0, e, t), this.scissorTest = !1, this.viewport = new ht(0, 0, e, t), this.textures = [];
    const i = new Ot({
      width: e,
      height: t,
      depth: n.depth
    }), r = n.count;
    for (let s = 0; s < r; s++)
      this.textures[s] = i.clone(), this.textures[s].isRenderTargetTexture = !0, this.textures[s].renderTarget = this;
    this._setTextureOptions(n), this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this._depthTexture = null, this.depthTexture = n.depthTexture, this.samples = n.samples, this.multiview = n.multiview;
  }
  _setTextureOptions(e = {}) {
    const t = {
      minFilter: Pt,
      generateMipmaps: !1,
      flipY: !1,
      internalFormat: null
    };
    e.mapping !== void 0 && (t.mapping = e.mapping), e.wrapS !== void 0 && (t.wrapS = e.wrapS), e.wrapT !== void 0 && (t.wrapT = e.wrapT), e.wrapR !== void 0 && (t.wrapR = e.wrapR), e.magFilter !== void 0 && (t.magFilter = e.magFilter), e.minFilter !== void 0 && (t.minFilter = e.minFilter), e.format !== void 0 && (t.format = e.format), e.type !== void 0 && (t.type = e.type), e.anisotropy !== void 0 && (t.anisotropy = e.anisotropy), e.colorSpace !== void 0 && (t.colorSpace = e.colorSpace), e.flipY !== void 0 && (t.flipY = e.flipY), e.generateMipmaps !== void 0 && (t.generateMipmaps = e.generateMipmaps), e.internalFormat !== void 0 && (t.internalFormat = e.internalFormat);
    for (let n = 0; n < this.textures.length; n++) this.textures[n].setValues(t);
  }
  get texture() {
    return this.textures[0];
  }
  set texture(e) {
    this.textures[0] = e;
  }
  set depthTexture(e) {
    this._depthTexture !== null && (this._depthTexture.renderTarget = null), e !== null && (e.renderTarget = this), this._depthTexture = e;
  }
  get depthTexture() {
    return this._depthTexture;
  }
  setSize(e, t, n = 1) {
    if (this.width !== e || this.height !== t || this.depth !== n) {
      this.width = e, this.height = t, this.depth = n;
      for (let i = 0, r = this.textures.length; i < r; i++)
        this.textures[i].image.width = e, this.textures[i].image.height = t, this.textures[i].image.depth = n, this.textures[i].isData3DTexture !== !0 && (this.textures[i].isArrayTexture = this.textures[i].image.depth > 1);
      this.dispose();
    }
    this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
    for (let t = 0, n = e.textures.length; t < n; t++) {
      this.textures[t] = e.textures[t].clone(), this.textures[t].isRenderTargetTexture = !0, this.textures[t].renderTarget = this;
      const i = Object.assign({}, e.textures[t].image);
      this.textures[t].source = new $r(i);
    }
    return this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this.multiview = e.multiview, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}, jt = class extends Ll {
  constructor(e = 1, t = 1, n = {}) {
    super(e, t, n), this.isWebGLRenderTarget = !0;
  }
}, Ra = class extends Ot {
  constructor(e = null, t = 1, n = 1, i = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = {
      data: e,
      width: t,
      height: n,
      depth: i
    }, this.magFilter = Tt, this.minFilter = Tt, this.wrapR = sn, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(e) {
    this.layerUpdates.add(e);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}, Dl = class extends Ot {
  constructor(e = null, t = 1, n = 1, i = 1) {
    super(null), this.isData3DTexture = !0, this.image = {
      data: e,
      width: t,
      height: n,
      depth: i
    }, this.magFilter = Tt, this.minFilter = Tt, this.wrapR = sn, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}, ft = class Yr {
  static {
    Yr.prototype.isMatrix4 = !0;
  }
  constructor(t, n, i, r, s, a, o, l, c, u, d, h, _, M, S, p) {
    this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], t !== void 0 && this.set(t, n, i, r, s, a, o, l, c, u, d, h, _, M, S, p);
  }
  set(t, n, i, r, s, a, o, l, c, u, d, h, _, M, S, p) {
    const f = this.elements;
    return f[0] = t, f[4] = n, f[8] = i, f[12] = r, f[1] = s, f[5] = a, f[9] = o, f[13] = l, f[2] = c, f[6] = u, f[10] = d, f[14] = h, f[3] = _, f[7] = M, f[11] = S, f[15] = p, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  clone() {
    return new Yr().fromArray(this.elements);
  }
  copy(t) {
    const n = this.elements, i = t.elements;
    return n[0] = i[0], n[1] = i[1], n[2] = i[2], n[3] = i[3], n[4] = i[4], n[5] = i[5], n[6] = i[6], n[7] = i[7], n[8] = i[8], n[9] = i[9], n[10] = i[10], n[11] = i[11], n[12] = i[12], n[13] = i[13], n[14] = i[14], n[15] = i[15], this;
  }
  copyPosition(t) {
    const n = this.elements, i = t.elements;
    return n[12] = i[12], n[13] = i[13], n[14] = i[14], this;
  }
  setFromMatrix3(t) {
    const n = t.elements;
    return this.set(n[0], n[3], n[6], 0, n[1], n[4], n[7], 0, n[2], n[5], n[8], 0, 0, 0, 0, 1), this;
  }
  extractBasis(t, n, i) {
    return this.determinant() === 0 ? (t.set(1, 0, 0), n.set(0, 1, 0), i.set(0, 0, 1), this) : (t.setFromMatrixColumn(this, 0), n.setFromMatrixColumn(this, 1), i.setFromMatrixColumn(this, 2), this);
  }
  makeBasis(t, n, i) {
    return this.set(t.x, n.x, i.x, 0, t.y, n.y, i.y, 0, t.z, n.z, i.z, 0, 0, 0, 0, 1), this;
  }
  extractRotation(t) {
    if (t.determinant() === 0) return this.identity();
    const n = this.elements, i = t.elements, r = 1 / Dn.setFromMatrixColumn(t, 0).length(), s = 1 / Dn.setFromMatrixColumn(t, 1).length(), a = 1 / Dn.setFromMatrixColumn(t, 2).length();
    return n[0] = i[0] * r, n[1] = i[1] * r, n[2] = i[2] * r, n[3] = 0, n[4] = i[4] * s, n[5] = i[5] * s, n[6] = i[6] * s, n[7] = 0, n[8] = i[8] * a, n[9] = i[9] * a, n[10] = i[10] * a, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, this;
  }
  makeRotationFromEuler(t) {
    const n = this.elements, i = t.x, r = t.y, s = t.z, a = Math.cos(i), o = Math.sin(i), l = Math.cos(r), c = Math.sin(r), u = Math.cos(s), d = Math.sin(s);
    if (t.order === "XYZ") {
      const h = a * u, _ = a * d, M = o * u, S = o * d;
      n[0] = l * u, n[4] = -l * d, n[8] = c, n[1] = _ + M * c, n[5] = h - S * c, n[9] = -o * l, n[2] = S - h * c, n[6] = M + _ * c, n[10] = a * l;
    } else if (t.order === "YXZ") {
      const h = l * u, _ = l * d, M = c * u, S = c * d;
      n[0] = h + S * o, n[4] = M * o - _, n[8] = a * c, n[1] = a * d, n[5] = a * u, n[9] = -o, n[2] = _ * o - M, n[6] = S + h * o, n[10] = a * l;
    } else if (t.order === "ZXY") {
      const h = l * u, _ = l * d, M = c * u, S = c * d;
      n[0] = h - S * o, n[4] = -a * d, n[8] = M + _ * o, n[1] = _ + M * o, n[5] = a * u, n[9] = S - h * o, n[2] = -a * c, n[6] = o, n[10] = a * l;
    } else if (t.order === "ZYX") {
      const h = a * u, _ = a * d, M = o * u, S = o * d;
      n[0] = l * u, n[4] = M * c - _, n[8] = h * c + S, n[1] = l * d, n[5] = S * c + h, n[9] = _ * c - M, n[2] = -c, n[6] = o * l, n[10] = a * l;
    } else if (t.order === "YZX") {
      const h = a * l, _ = a * c, M = o * l, S = o * c;
      n[0] = l * u, n[4] = S - h * d, n[8] = M * d + _, n[1] = d, n[5] = a * u, n[9] = -o * u, n[2] = -c * u, n[6] = _ * d + M, n[10] = h - S * d;
    } else if (t.order === "XZY") {
      const h = a * l, _ = a * c, M = o * l, S = o * c;
      n[0] = l * u, n[4] = -d, n[8] = c * u, n[1] = h * d + S, n[5] = a * u, n[9] = _ * d - M, n[2] = M * d - _, n[6] = o * u, n[10] = S * d + h;
    }
    return n[3] = 0, n[7] = 0, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, this;
  }
  makeRotationFromQuaternion(t) {
    return this.compose(Il, t, Ul);
  }
  lookAt(t, n, i) {
    const r = this.elements;
    return wt.subVectors(t, n), wt.lengthSq() === 0 && (wt.z = 1), wt.normalize(), hn.crossVectors(i, wt), hn.lengthSq() === 0 && (Math.abs(i.z) === 1 ? wt.x += 1e-4 : wt.z += 1e-4, wt.normalize(), hn.crossVectors(i, wt)), hn.normalize(), Ai.crossVectors(wt, hn), r[0] = hn.x, r[4] = Ai.x, r[8] = wt.x, r[1] = hn.y, r[5] = Ai.y, r[9] = wt.y, r[2] = hn.z, r[6] = Ai.z, r[10] = wt.z, this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, n) {
    const i = t.elements, r = n.elements, s = this.elements, a = i[0], o = i[4], l = i[8], c = i[12], u = i[1], d = i[5], h = i[9], _ = i[13], M = i[2], S = i[6], p = i[10], f = i[14], y = i[3], b = i[7], T = i[11], P = i[15], R = r[0], D = r[4], v = r[8], E = r[12], X = r[1], A = r[5], k = r[9], Y = r[13], B = r[2], G = r[6], H = r[10], z = r[14], J = r[3], te = r[7], re = r[11], ge = r[15];
    return s[0] = a * R + o * X + l * B + c * J, s[4] = a * D + o * A + l * G + c * te, s[8] = a * v + o * k + l * H + c * re, s[12] = a * E + o * Y + l * z + c * ge, s[1] = u * R + d * X + h * B + _ * J, s[5] = u * D + d * A + h * G + _ * te, s[9] = u * v + d * k + h * H + _ * re, s[13] = u * E + d * Y + h * z + _ * ge, s[2] = M * R + S * X + p * B + f * J, s[6] = M * D + S * A + p * G + f * te, s[10] = M * v + S * k + p * H + f * re, s[14] = M * E + S * Y + p * z + f * ge, s[3] = y * R + b * X + T * B + P * J, s[7] = y * D + b * A + T * G + P * te, s[11] = y * v + b * k + T * H + P * re, s[15] = y * E + b * Y + T * z + P * ge, this;
  }
  multiplyScalar(t) {
    const n = this.elements;
    return n[0] *= t, n[4] *= t, n[8] *= t, n[12] *= t, n[1] *= t, n[5] *= t, n[9] *= t, n[13] *= t, n[2] *= t, n[6] *= t, n[10] *= t, n[14] *= t, n[3] *= t, n[7] *= t, n[11] *= t, n[15] *= t, this;
  }
  determinant() {
    const t = this.elements, n = t[0], i = t[4], r = t[8], s = t[12], a = t[1], o = t[5], l = t[9], c = t[13], u = t[2], d = t[6], h = t[10], _ = t[14], M = t[3], S = t[7], p = t[11], f = t[15], y = l * _ - c * h, b = o * _ - c * d, T = o * h - l * d, P = a * _ - c * u, R = a * h - l * u, D = a * d - o * u;
    return n * (S * y - p * b + f * T) - i * (M * y - p * P + f * R) + r * (M * b - S * P + f * D) - s * (M * T - S * R + p * D);
  }
  transpose() {
    const t = this.elements;
    let n;
    return n = t[1], t[1] = t[4], t[4] = n, n = t[2], t[2] = t[8], t[8] = n, n = t[6], t[6] = t[9], t[9] = n, n = t[3], t[3] = t[12], t[12] = n, n = t[7], t[7] = t[13], t[13] = n, n = t[11], t[11] = t[14], t[14] = n, this;
  }
  setPosition(t, n, i) {
    const r = this.elements;
    return t.isVector3 ? (r[12] = t.x, r[13] = t.y, r[14] = t.z) : (r[12] = t, r[13] = n, r[14] = i), this;
  }
  invert() {
    const t = this.elements, n = t[0], i = t[1], r = t[2], s = t[3], a = t[4], o = t[5], l = t[6], c = t[7], u = t[8], d = t[9], h = t[10], _ = t[11], M = t[12], S = t[13], p = t[14], f = t[15], y = n * o - i * a, b = n * l - r * a, T = n * c - s * a, P = i * l - r * o, R = i * c - s * o, D = r * c - s * l, v = u * S - d * M, E = u * p - h * M, X = u * f - _ * M, A = d * p - h * S, k = d * f - _ * S, Y = h * f - _ * p, B = y * Y - b * k + T * A + P * X - R * E + D * v;
    if (B === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const G = 1 / B;
    return t[0] = (o * Y - l * k + c * A) * G, t[1] = (r * k - i * Y - s * A) * G, t[2] = (S * D - p * R + f * P) * G, t[3] = (h * R - d * D - _ * P) * G, t[4] = (l * X - a * Y - c * E) * G, t[5] = (n * Y - r * X + s * E) * G, t[6] = (p * T - M * D - f * b) * G, t[7] = (u * D - h * T + _ * b) * G, t[8] = (a * k - o * X + c * v) * G, t[9] = (i * X - n * k - s * v) * G, t[10] = (M * R - S * T + f * y) * G, t[11] = (d * T - u * R - _ * y) * G, t[12] = (o * E - a * A - l * v) * G, t[13] = (n * A - i * E + r * v) * G, t[14] = (S * b - M * P - p * y) * G, t[15] = (u * P - d * b + h * y) * G, this;
  }
  scale(t) {
    const n = this.elements, i = t.x, r = t.y, s = t.z;
    return n[0] *= i, n[4] *= r, n[8] *= s, n[1] *= i, n[5] *= r, n[9] *= s, n[2] *= i, n[6] *= r, n[10] *= s, n[3] *= i, n[7] *= r, n[11] *= s, this;
  }
  getMaxScaleOnAxis() {
    const t = this.elements, n = t[0] * t[0] + t[1] * t[1] + t[2] * t[2], i = t[4] * t[4] + t[5] * t[5] + t[6] * t[6], r = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
    return Math.sqrt(Math.max(n, i, r));
  }
  makeTranslation(t, n, i) {
    return t.isVector3 ? this.set(1, 0, 0, t.x, 0, 1, 0, t.y, 0, 0, 1, t.z, 0, 0, 0, 1) : this.set(1, 0, 0, t, 0, 1, 0, n, 0, 0, 1, i, 0, 0, 0, 1), this;
  }
  makeRotationX(t) {
    const n = Math.cos(t), i = Math.sin(t);
    return this.set(1, 0, 0, 0, 0, n, -i, 0, 0, i, n, 0, 0, 0, 0, 1), this;
  }
  makeRotationY(t) {
    const n = Math.cos(t), i = Math.sin(t);
    return this.set(n, 0, i, 0, 0, 1, 0, 0, -i, 0, n, 0, 0, 0, 0, 1), this;
  }
  makeRotationZ(t) {
    const n = Math.cos(t), i = Math.sin(t);
    return this.set(n, -i, 0, 0, i, n, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  makeRotationAxis(t, n) {
    const i = Math.cos(n), r = Math.sin(n), s = 1 - i, a = t.x, o = t.y, l = t.z, c = s * a, u = s * o;
    return this.set(c * a + i, c * o - r * l, c * l + r * o, 0, c * o + r * l, u * o + i, u * l - r * a, 0, c * l - r * o, u * l + r * a, s * l * l + i, 0, 0, 0, 0, 1), this;
  }
  makeScale(t, n, i) {
    return this.set(t, 0, 0, 0, 0, n, 0, 0, 0, 0, i, 0, 0, 0, 0, 1), this;
  }
  makeShear(t, n, i, r, s, a) {
    return this.set(1, i, s, 0, t, 1, a, 0, n, r, 1, 0, 0, 0, 0, 1), this;
  }
  compose(t, n, i) {
    const r = this.elements, s = n._x, a = n._y, o = n._z, l = n._w, c = s + s, u = a + a, d = o + o, h = s * c, _ = s * u, M = s * d, S = a * u, p = a * d, f = o * d, y = l * c, b = l * u, T = l * d, P = i.x, R = i.y, D = i.z;
    return r[0] = (1 - (S + f)) * P, r[1] = (_ + T) * P, r[2] = (M - b) * P, r[3] = 0, r[4] = (_ - T) * R, r[5] = (1 - (h + f)) * R, r[6] = (p + y) * R, r[7] = 0, r[8] = (M + b) * D, r[9] = (p - y) * D, r[10] = (1 - (h + S)) * D, r[11] = 0, r[12] = t.x, r[13] = t.y, r[14] = t.z, r[15] = 1, this;
  }
  decompose(t, n, i) {
    const r = this.elements;
    t.x = r[12], t.y = r[13], t.z = r[14];
    const s = this.determinant();
    if (s === 0)
      return i.set(1, 1, 1), n.identity(), this;
    let a = Dn.set(r[0], r[1], r[2]).length();
    const o = Dn.set(r[4], r[5], r[6]).length(), l = Dn.set(r[8], r[9], r[10]).length();
    s < 0 && (a = -a), zt.copy(this);
    const c = 1 / a, u = 1 / o, d = 1 / l;
    return zt.elements[0] *= c, zt.elements[1] *= c, zt.elements[2] *= c, zt.elements[4] *= u, zt.elements[5] *= u, zt.elements[6] *= u, zt.elements[8] *= d, zt.elements[9] *= d, zt.elements[10] *= d, n.setFromRotationMatrix(zt), i.x = a, i.y = o, i.z = l, this;
  }
  makePerspective(t, n, i, r, s, a, o = $n, l = !1) {
    const c = this.elements, u = 2 * s / (n - t), d = 2 * s / (i - r), h = (n + t) / (n - t), _ = (i + r) / (i - r);
    let M, S;
    if (l)
      M = s / (a - s), S = a * s / (a - s);
    else if (o === 2e3)
      M = -(a + s) / (a - s), S = -2 * a * s / (a - s);
    else if (o === 2001)
      M = -a / (a - s), S = -a * s / (a - s);
    else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
    return c[0] = u, c[4] = 0, c[8] = h, c[12] = 0, c[1] = 0, c[5] = d, c[9] = _, c[13] = 0, c[2] = 0, c[6] = 0, c[10] = M, c[14] = S, c[3] = 0, c[7] = 0, c[11] = -1, c[15] = 0, this;
  }
  makeOrthographic(t, n, i, r, s, a, o = $n, l = !1) {
    const c = this.elements, u = 2 / (n - t), d = 2 / (i - r), h = -(n + t) / (n - t), _ = -(i + r) / (i - r);
    let M, S;
    if (l)
      M = 1 / (a - s), S = a / (a - s);
    else if (o === 2e3)
      M = -2 / (a - s), S = -(a + s) / (a - s);
    else if (o === 2001)
      M = -1 / (a - s), S = -s / (a - s);
    else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
    return c[0] = u, c[4] = 0, c[8] = 0, c[12] = h, c[1] = 0, c[5] = d, c[9] = 0, c[13] = _, c[2] = 0, c[6] = 0, c[10] = M, c[14] = S, c[3] = 0, c[7] = 0, c[11] = 0, c[15] = 1, this;
  }
  equals(t) {
    const n = this.elements, i = t.elements;
    for (let r = 0; r < 16; r++) if (n[r] !== i[r]) return !1;
    return !0;
  }
  fromArray(t, n = 0) {
    for (let i = 0; i < 16; i++) this.elements[i] = t[i + n];
    return this;
  }
  toArray(t = [], n = 0) {
    const i = this.elements;
    return t[n] = i[0], t[n + 1] = i[1], t[n + 2] = i[2], t[n + 3] = i[3], t[n + 4] = i[4], t[n + 5] = i[5], t[n + 6] = i[6], t[n + 7] = i[7], t[n + 8] = i[8], t[n + 9] = i[9], t[n + 10] = i[10], t[n + 11] = i[11], t[n + 12] = i[12], t[n + 13] = i[13], t[n + 14] = i[14], t[n + 15] = i[15], t;
  }
}, Dn = /* @__PURE__ */ new O(), zt = /* @__PURE__ */ new ft(), Il = /* @__PURE__ */ new O(0, 0, 0), Ul = /* @__PURE__ */ new O(1, 1, 1), hn = /* @__PURE__ */ new O(), Ai = /* @__PURE__ */ new O(), wt = /* @__PURE__ */ new O(), ys = /* @__PURE__ */ new ft(), Ts = /* @__PURE__ */ new on(), Qn = class wa {
  constructor(t = 0, n = 0, i = 0, r = wa.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = t, this._y = n, this._z = i, this._order = r;
  }
  get x() {
    return this._x;
  }
  set x(t) {
    this._x = t, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(t) {
    this._y = t, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(t) {
    this._z = t, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(t) {
    this._order = t, this._onChangeCallback();
  }
  set(t, n, i, r = this._order) {
    return this._x = t, this._y = n, this._z = i, this._order = r, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(t) {
    return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(t, n = this._order, i = !0) {
    const r = t.elements, s = r[0], a = r[4], o = r[8], l = r[1], c = r[5], u = r[9], d = r[2], h = r[6], _ = r[10];
    switch (n) {
      case "XYZ":
        this._y = Math.asin(Be(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-u, _), this._z = Math.atan2(-a, s)) : (this._x = Math.atan2(h, c), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-Be(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._y = Math.atan2(o, _), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-d, s), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(Be(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(-d, _), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(l, s));
        break;
      case "ZYX":
        this._y = Math.asin(-Be(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._x = Math.atan2(h, _), this._z = Math.atan2(l, s)) : (this._x = 0, this._z = Math.atan2(-a, c));
        break;
      case "YZX":
        this._z = Math.asin(Be(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(-u, c), this._y = Math.atan2(-d, s)) : (this._x = 0, this._y = Math.atan2(o, _));
        break;
      case "XZY":
        this._z = Math.asin(-Be(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(h, c), this._y = Math.atan2(o, s)) : (this._x = Math.atan2(-u, _), this._y = 0);
        break;
      default:
        Te("Euler: .setFromRotationMatrix() encountered an unknown order: " + n);
    }
    return this._order = n, i === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(t, n, i) {
    return ys.makeRotationFromQuaternion(t), this.setFromRotationMatrix(ys, n, i);
  }
  setFromVector3(t, n = this._order) {
    return this.set(t.x, t.y, t.z, n);
  }
  reorder(t) {
    return Ts.setFromEuler(this), this.setFromQuaternion(Ts, t);
  }
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order;
  }
  fromArray(t) {
    return this._x = t[0], this._y = t[1], this._z = t[2], t[3] !== void 0 && (this._order = t[3]), this._onChangeCallback(), this;
  }
  toArray(t = [], n = 0) {
    return t[n] = this._x, t[n + 1] = this._y, t[n + 2] = this._z, t[n + 3] = this._order, t;
  }
  _onChange(t) {
    return this._onChangeCallback = t, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
};
Qn.DEFAULT_ORDER = "XYZ";
var Ca = class {
  constructor() {
    this.mask = 1;
  }
  set(e) {
    this.mask = (1 << e | 0) >>> 0;
  }
  enable(e) {
    this.mask |= 1 << e | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(e) {
    this.mask ^= 1 << e | 0;
  }
  disable(e) {
    this.mask &= ~(1 << e | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  isEnabled(e) {
    return (this.mask & (1 << e | 0)) !== 0;
  }
}, Nl = 0, bs = /* @__PURE__ */ new O(), In = /* @__PURE__ */ new on(), Qt = /* @__PURE__ */ new ft(), Ri = /* @__PURE__ */ new O(), si = /* @__PURE__ */ new O(), Ol = /* @__PURE__ */ new O(), Fl = /* @__PURE__ */ new on(), As = /* @__PURE__ */ new O(1, 0, 0), Rs = /* @__PURE__ */ new O(0, 1, 0), ws = /* @__PURE__ */ new O(0, 0, 1), Cs = { type: "added" }, Bl = { type: "removed" }, Un = {
  type: "childadded",
  child: null
}, pr = {
  type: "childremoved",
  child: null
}, Nt = class $i extends Mn {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Nl++ }), this.uuid = ni(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = $i.DEFAULT_UP.clone();
    const t = new O(), n = new Qn(), i = new on(), r = new O(1, 1, 1);
    function s() {
      i.setFromEuler(n, !1);
    }
    function a() {
      n.setFromQuaternion(i, void 0, !1);
    }
    n._onChange(s), i._onChange(a), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: n
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: i
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: r
      },
      modelViewMatrix: { value: new ft() },
      normalMatrix: { value: new Ie() }
    }), this.matrix = new ft(), this.matrixWorld = new ft(), this.matrixAutoUpdate = $i.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = $i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Ca(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = !1, this.userData = {}, this.pivot = null;
  }
  onBeforeShadow() {
  }
  onAfterShadow() {
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(t) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(t), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(t) {
    return this.quaternion.premultiply(t), this;
  }
  setRotationFromAxisAngle(t, n) {
    this.quaternion.setFromAxisAngle(t, n);
  }
  setRotationFromEuler(t) {
    this.quaternion.setFromEuler(t, !0);
  }
  setRotationFromMatrix(t) {
    this.quaternion.setFromRotationMatrix(t);
  }
  setRotationFromQuaternion(t) {
    this.quaternion.copy(t);
  }
  rotateOnAxis(t, n) {
    return In.setFromAxisAngle(t, n), this.quaternion.multiply(In), this;
  }
  rotateOnWorldAxis(t, n) {
    return In.setFromAxisAngle(t, n), this.quaternion.premultiply(In), this;
  }
  rotateX(t) {
    return this.rotateOnAxis(As, t);
  }
  rotateY(t) {
    return this.rotateOnAxis(Rs, t);
  }
  rotateZ(t) {
    return this.rotateOnAxis(ws, t);
  }
  translateOnAxis(t, n) {
    return bs.copy(t).applyQuaternion(this.quaternion), this.position.add(bs.multiplyScalar(n)), this;
  }
  translateX(t) {
    return this.translateOnAxis(As, t);
  }
  translateY(t) {
    return this.translateOnAxis(Rs, t);
  }
  translateZ(t) {
    return this.translateOnAxis(ws, t);
  }
  localToWorld(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(Qt.copy(this.matrixWorld).invert());
  }
  lookAt(t, n, i) {
    t.isVector3 ? Ri.copy(t) : Ri.set(t, n, i);
    const r = this.parent;
    this.updateWorldMatrix(!0, !1), si.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? Qt.lookAt(si, Ri, this.up) : Qt.lookAt(Ri, si, this.up), this.quaternion.setFromRotationMatrix(Qt), r && (Qt.extractRotation(r.matrixWorld), In.setFromRotationMatrix(Qt), this.quaternion.premultiply(In.invert()));
  }
  add(t) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++) this.add(arguments[n]);
      return this;
    }
    return t === this ? (Pe("Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (t.removeFromParent(), t.parent = this, this.children.push(t), t.dispatchEvent(Cs), Un.child = t, this.dispatchEvent(Un), Un.child = null) : Pe("Object3D.add: object not an instance of THREE.Object3D.", t), this);
  }
  remove(t) {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++) this.remove(arguments[i]);
      return this;
    }
    const n = this.children.indexOf(t);
    return n !== -1 && (t.parent = null, this.children.splice(n, 1), t.dispatchEvent(Bl), pr.child = t, this.dispatchEvent(pr), pr.child = null), this;
  }
  removeFromParent() {
    const t = this.parent;
    return t !== null && t.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(t) {
    return this.updateWorldMatrix(!0, !1), Qt.copy(this.matrixWorld).invert(), t.parent !== null && (t.parent.updateWorldMatrix(!0, !1), Qt.multiply(t.parent.matrixWorld)), t.applyMatrix4(Qt), t.removeFromParent(), t.parent = this, this.children.push(t), t.updateWorldMatrix(!1, !0), t.dispatchEvent(Cs), Un.child = t, this.dispatchEvent(Un), Un.child = null, this;
  }
  getObjectById(t) {
    return this.getObjectByProperty("id", t);
  }
  getObjectByName(t) {
    return this.getObjectByProperty("name", t);
  }
  getObjectByProperty(t, n) {
    if (this[t] === n) return this;
    for (let i = 0, r = this.children.length; i < r; i++) {
      const s = this.children[i].getObjectByProperty(t, n);
      if (s !== void 0) return s;
    }
  }
  getObjectsByProperty(t, n, i = []) {
    this[t] === n && i.push(this);
    const r = this.children;
    for (let s = 0, a = r.length; s < a; s++) r[s].getObjectsByProperty(t, n, i);
    return i;
  }
  getWorldPosition(t) {
    return this.updateWorldMatrix(!0, !1), t.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(si, t, Ol), t;
  }
  getWorldScale(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(si, Fl, t), t;
  }
  getWorldDirection(t) {
    this.updateWorldMatrix(!0, !1);
    const n = this.matrixWorld.elements;
    return t.set(n[8], n[9], n[10]).normalize();
  }
  raycast() {
  }
  traverse(t) {
    t(this);
    const n = this.children;
    for (let i = 0, r = n.length; i < r; i++) n[i].traverse(t);
  }
  traverseVisible(t) {
    if (this.visible === !1) return;
    t(this);
    const n = this.children;
    for (let i = 0, r = n.length; i < r; i++) n[i].traverseVisible(t);
  }
  traverseAncestors(t) {
    const n = this.parent;
    n !== null && (t(n), n.traverseAncestors(t));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    const t = this.pivot;
    if (t !== null) {
      const n = t.x, i = t.y, r = t.z, s = this.matrix.elements;
      s[12] += n - s[0] * n - s[4] * i - s[8] * r, s[13] += i - s[1] * n - s[5] * i - s[9] * r, s[14] += r - s[2] * n - s[6] * i - s[10] * r;
    }
    this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(t) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || t) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, t = !0);
    const n = this.children;
    for (let i = 0, r = n.length; i < r; i++) n[i].updateMatrixWorld(t);
  }
  updateWorldMatrix(t, n) {
    const i = this.parent;
    if (t === !0 && i !== null && i.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), n === !0) {
      const r = this.children;
      for (let s = 0, a = r.length; s < a; s++) r[s].updateWorldMatrix(!1, !0);
    }
  }
  toJSON(t) {
    const n = t === void 0 || typeof t == "string", i = {};
    n && (t = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, i.metadata = {
      version: 4.7,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const r = {};
    r.uuid = this.uuid, r.type = this.type, this.name !== "" && (r.name = this.name), this.castShadow === !0 && (r.castShadow = !0), this.receiveShadow === !0 && (r.receiveShadow = !0), this.visible === !1 && (r.visible = !1), this.frustumCulled === !1 && (r.frustumCulled = !1), this.renderOrder !== 0 && (r.renderOrder = this.renderOrder), this.static !== !1 && (r.static = this.static), Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.pivot !== null && (r.pivot = this.pivot.toArray()), this.matrixAutoUpdate === !1 && (r.matrixAutoUpdate = !1), this.morphTargetDictionary !== void 0 && (r.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)), this.morphTargetInfluences !== void 0 && (r.morphTargetInfluences = this.morphTargetInfluences.slice()), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.geometryInfo = this._geometryInfo.map((o) => ({
      ...o,
      boundingBox: o.boundingBox ? o.boundingBox.toJSON() : void 0,
      boundingSphere: o.boundingSphere ? o.boundingSphere.toJSON() : void 0
    })), r.instanceInfo = this._instanceInfo.map((o) => ({ ...o })), r.availableInstanceIds = this._availableInstanceIds.slice(), r.availableGeometryIds = this._availableGeometryIds.slice(), r.nextIndexStart = this._nextIndexStart, r.nextVertexStart = this._nextVertexStart, r.geometryCount = this._geometryCount, r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.matricesTexture = this._matricesTexture.toJSON(t), r.indirectTexture = this._indirectTexture.toJSON(t), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(t)), this.boundingSphere !== null && (r.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (r.boundingBox = this.boundingBox.toJSON()));
    function s(o, l) {
      return o[l.uuid] === void 0 && (o[l.uuid] = l.toJSON(t)), l.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(t).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(t).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      r.geometry = s(t.geometries, this.geometry);
      const o = this.geometry.parameters;
      if (o !== void 0 && o.shapes !== void 0) {
        const l = o.shapes;
        if (Array.isArray(l)) for (let c = 0, u = l.length; c < u; c++) {
          const d = l[c];
          s(t.shapes, d);
        }
        else s(t.shapes, l);
      }
    }
    if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (s(t.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0) if (Array.isArray(this.material)) {
      const o = [];
      for (let l = 0, c = this.material.length; l < c; l++) o.push(s(t.materials, this.material[l]));
      r.material = o;
    } else r.material = s(t.materials, this.material);
    if (this.children.length > 0) {
      r.children = [];
      for (let o = 0; o < this.children.length; o++) r.children.push(this.children[o].toJSON(t).object);
    }
    if (this.animations.length > 0) {
      r.animations = [];
      for (let o = 0; o < this.animations.length; o++) {
        const l = this.animations[o];
        r.animations.push(s(t.animations, l));
      }
    }
    if (n) {
      const o = a(t.geometries), l = a(t.materials), c = a(t.textures), u = a(t.images), d = a(t.shapes), h = a(t.skeletons), _ = a(t.animations), M = a(t.nodes);
      o.length > 0 && (i.geometries = o), l.length > 0 && (i.materials = l), c.length > 0 && (i.textures = c), u.length > 0 && (i.images = u), d.length > 0 && (i.shapes = d), h.length > 0 && (i.skeletons = h), _.length > 0 && (i.animations = _), M.length > 0 && (i.nodes = M);
    }
    return i.object = r, i;
    function a(o) {
      const l = [];
      for (const c in o) {
        const u = o[c];
        delete u.metadata, l.push(u);
      }
      return l;
    }
  }
  clone(t) {
    return new this.constructor().copy(this, t);
  }
  copy(t, n = !0) {
    if (this.name = t.name, this.up.copy(t.up), this.position.copy(t.position), this.rotation.order = t.rotation.order, this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), this.pivot = t.pivot !== null ? t.pivot.clone() : null, this.matrix.copy(t.matrix), this.matrixWorld.copy(t.matrixWorld), this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate, this.layers.mask = t.layers.mask, this.visible = t.visible, this.castShadow = t.castShadow, this.receiveShadow = t.receiveShadow, this.frustumCulled = t.frustumCulled, this.renderOrder = t.renderOrder, this.static = t.static, this.animations = t.animations.slice(), this.userData = JSON.parse(JSON.stringify(t.userData)), n === !0) for (let i = 0; i < t.children.length; i++) {
      const r = t.children[i];
      this.add(r.clone());
    }
    return this;
  }
};
Nt.DEFAULT_UP = /* @__PURE__ */ new O(0, 1, 0);
Nt.DEFAULT_MATRIX_AUTO_UPDATE = !0;
Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
var wi = class extends Nt {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}, zl = { type: "move" }, mr = class {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new wi(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new wi(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new O(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new O()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new wi(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new O(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new O(), this._grip.eventsEnabled = !1), this._grip;
  }
  dispatchEvent(e) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
  }
  connect(e) {
    if (e && e.hand) {
      const t = this._hand;
      if (t) for (const n of e.hand.values()) this._getHandJoint(t, n);
    }
    return this.dispatchEvent({
      type: "connected",
      data: e
    }), this;
  }
  disconnect(e) {
    return this.dispatchEvent({
      type: "disconnected",
      data: e
    }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  update(e, t, n) {
    let i = null, r = null, s = null;
    const a = this._targetRay, o = this._grip, l = this._hand;
    if (e && t.session.visibilityState !== "visible-blurred") {
      if (l && e.hand) {
        s = !0;
        for (const M of e.hand.values()) {
          const S = t.getJointPose(M, n), p = this._getHandJoint(l, M);
          S !== null && (p.matrix.fromArray(S.transform.matrix), p.matrix.decompose(p.position, p.rotation, p.scale), p.matrixWorldNeedsUpdate = !0, p.jointRadius = S.radius), p.visible = S !== null;
        }
        const c = l.joints["index-finger-tip"], u = l.joints["thumb-tip"], d = c.position.distanceTo(u.position);
        l.inputState.pinching && d > 0.025 ? (l.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !l.inputState.pinching && d <= 0.02 - 5e-3 && (l.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else o !== null && e.gripSpace && (r = t.getPose(e.gripSpace, n), r !== null && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1, o.eventsEnabled && o.dispatchEvent({
        type: "gripUpdated",
        data: e,
        target: this
      })));
      a !== null && (i = t.getPose(e.targetRaySpace, n), i === null && r !== null && (i = r), i !== null && (a.matrix.fromArray(i.transform.matrix), a.matrix.decompose(a.position, a.rotation, a.scale), a.matrixWorldNeedsUpdate = !0, i.linearVelocity ? (a.hasLinearVelocity = !0, a.linearVelocity.copy(i.linearVelocity)) : a.hasLinearVelocity = !1, i.angularVelocity ? (a.hasAngularVelocity = !0, a.angularVelocity.copy(i.angularVelocity)) : a.hasAngularVelocity = !1, this.dispatchEvent(zl)));
    }
    return a !== null && (a.visible = i !== null), o !== null && (o.visible = r !== null), l !== null && (l.visible = s !== null), this;
  }
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === void 0) {
      const n = new wi();
      n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n);
    }
    return e.joints[t.jointName];
  }
}, Pa = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, un = {
  h: 0,
  s: 0,
  l: 0
}, Ci = {
  h: 0,
  s: 0,
  l: 0
};
function _r(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * 6 * (2 / 3 - n) : e;
}
var Xe = class {
  constructor(e, t, n) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, n);
  }
  set(e, t, n) {
    if (t === void 0 && n === void 0) {
      const i = e;
      i && i.isColor ? this.copy(i) : typeof i == "number" ? this.setHex(i) : typeof i == "string" && this.setStyle(i);
    } else this.setRGB(e, t, n);
    return this;
  }
  setScalar(e) {
    return this.r = e, this.g = e, this.b = e, this;
  }
  setHex(e, t = Ht) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, We.colorSpaceToWorking(this, t), this;
  }
  setRGB(e, t, n, i = We.workingColorSpace) {
    return this.r = e, this.g = t, this.b = n, We.colorSpaceToWorking(this, i), this;
  }
  setHSL(e, t, n, i = We.workingColorSpace) {
    if (e = Zr(e, 1), t = Be(t, 0, 1), n = Be(n, 0, 1), t === 0) this.r = this.g = this.b = n;
    else {
      const r = n <= 0.5 ? n * (1 + t) : n + t - n * t, s = 2 * n - r;
      this.r = _r(s, r, e + 1 / 3), this.g = _r(s, r, e), this.b = _r(s, r, e - 1 / 3);
    }
    return We.colorSpaceToWorking(this, i), this;
  }
  setStyle(e, t = Ht) {
    function n(r) {
      r !== void 0 && parseFloat(r) < 1 && Te("Color: Alpha component of " + e + " will be ignored.");
    }
    let i;
    if (i = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let r;
      const s = i[1], a = i[2];
      switch (s) {
        case "rgb":
        case "rgba":
          if (r = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return n(r[4]), this.setRGB(Math.min(255, parseInt(r[1], 10)) / 255, Math.min(255, parseInt(r[2], 10)) / 255, Math.min(255, parseInt(r[3], 10)) / 255, t);
          if (r = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return n(r[4]), this.setRGB(Math.min(100, parseInt(r[1], 10)) / 100, Math.min(100, parseInt(r[2], 10)) / 100, Math.min(100, parseInt(r[3], 10)) / 100, t);
          break;
        case "hsl":
        case "hsla":
          if (r = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return n(r[4]), this.setHSL(parseFloat(r[1]) / 360, parseFloat(r[2]) / 100, parseFloat(r[3]) / 100, t);
          break;
        default:
          Te("Color: Unknown color model " + e);
      }
    } else if (i = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const r = i[1], s = r.length;
      if (s === 3) return this.setRGB(parseInt(r.charAt(0), 16) / 15, parseInt(r.charAt(1), 16) / 15, parseInt(r.charAt(2), 16) / 15, t);
      if (s === 6) return this.setHex(parseInt(r, 16), t);
      Te("Color: Invalid hex color " + e);
    } else if (e && e.length > 0) return this.setColorName(e, t);
    return this;
  }
  setColorName(e, t = Ht) {
    const n = Pa[e.toLowerCase()];
    return n !== void 0 ? this.setHex(n, t) : Te("Color: Unknown color " + e), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  copySRGBToLinear(e) {
    return this.r = an(e.r), this.g = an(e.g), this.b = an(e.b), this;
  }
  copyLinearToSRGB(e) {
    return this.r = Zn(e.r), this.g = Zn(e.g), this.b = Zn(e.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(e = Ht) {
    return We.workingToColorSpace(St.copy(this), e), Math.round(Be(St.r * 255, 0, 255)) * 65536 + Math.round(Be(St.g * 255, 0, 255)) * 256 + Math.round(Be(St.b * 255, 0, 255));
  }
  getHexString(e = Ht) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = We.workingColorSpace) {
    We.workingToColorSpace(St.copy(this), t);
    const n = St.r, i = St.g, r = St.b, s = Math.max(n, i, r), a = Math.min(n, i, r);
    let o, l;
    const c = (a + s) / 2;
    if (a === s)
      o = 0, l = 0;
    else {
      const u = s - a;
      switch (l = c <= 0.5 ? u / (s + a) : u / (2 - s - a), s) {
        case n:
          o = (i - r) / u + (i < r ? 6 : 0);
          break;
        case i:
          o = (r - n) / u + 2;
          break;
        case r:
          o = (n - i) / u + 4;
          break;
      }
      o /= 6;
    }
    return e.h = o, e.s = l, e.l = c, e;
  }
  getRGB(e, t = We.workingColorSpace) {
    return We.workingToColorSpace(St.copy(this), t), e.r = St.r, e.g = St.g, e.b = St.b, e;
  }
  getStyle(e = Ht) {
    We.workingToColorSpace(St.copy(this), e);
    const t = St.r, n = St.g, i = St.b;
    return e !== "srgb" ? `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(i * 255)})`;
  }
  offsetHSL(e, t, n) {
    return this.getHSL(un), this.setHSL(un.h + e, un.s + t, un.l + n);
  }
  add(e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this;
  }
  addColors(e, t) {
    return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
  }
  addScalar(e) {
    return this.r += e, this.g += e, this.b += e, this;
  }
  sub(e) {
    return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
  }
  multiply(e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
  }
  multiplyScalar(e) {
    return this.r *= e, this.g *= e, this.b *= e, this;
  }
  lerp(e, t) {
    return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
  }
  lerpColors(e, t, n) {
    return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this;
  }
  lerpHSL(e, t) {
    this.getHSL(un), e.getHSL(Ci);
    const n = pi(un.h, Ci.h, t), i = pi(un.s, Ci.s, t), r = pi(un.l, Ci.l, t);
    return this.setHSL(n, i, r), this;
  }
  setFromVector3(e) {
    return this.r = e.x, this.g = e.y, this.b = e.z, this;
  }
  applyMatrix3(e) {
    const t = this.r, n = this.g, i = this.b, r = e.elements;
    return this.r = r[0] * t + r[3] * n + r[6] * i, this.g = r[1] * t + r[4] * n + r[7] * i, this.b = r[2] * t + r[5] * n + r[8] * i, this;
  }
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  fromArray(e, t = 0) {
    return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
  }
  fromBufferAttribute(e, t) {
    return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}, St = /* @__PURE__ */ new Xe();
Xe.NAMES = Pa;
var Vl = class extends Nt {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new Qn(), this.environmentIntensity = 1, this.environmentRotation = new Qn(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, t) {
    return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t;
  }
}, Vt = /* @__PURE__ */ new O(), en = /* @__PURE__ */ new O(), gr = /* @__PURE__ */ new O(), tn = /* @__PURE__ */ new O(), Nn = /* @__PURE__ */ new O(), On = /* @__PURE__ */ new O(), Ps = /* @__PURE__ */ new O(), vr = /* @__PURE__ */ new O(), Mr = /* @__PURE__ */ new O(), Sr = /* @__PURE__ */ new O(), xr = /* @__PURE__ */ new ht(), Er = /* @__PURE__ */ new ht(), yr = /* @__PURE__ */ new ht(), ai = class Yn {
  constructor(t = new O(), n = new O(), i = new O()) {
    this.a = t, this.b = n, this.c = i;
  }
  static getNormal(t, n, i, r) {
    r.subVectors(i, n), Vt.subVectors(t, n), r.cross(Vt);
    const s = r.lengthSq();
    return s > 0 ? r.multiplyScalar(1 / Math.sqrt(s)) : r.set(0, 0, 0);
  }
  static getBarycoord(t, n, i, r, s) {
    Vt.subVectors(r, n), en.subVectors(i, n), gr.subVectors(t, n);
    const a = Vt.dot(Vt), o = Vt.dot(en), l = Vt.dot(gr), c = en.dot(en), u = en.dot(gr), d = a * c - o * o;
    if (d === 0)
      return s.set(0, 0, 0), null;
    const h = 1 / d, _ = (c * l - o * u) * h, M = (a * u - o * l) * h;
    return s.set(1 - _ - M, M, _);
  }
  static containsPoint(t, n, i, r) {
    return this.getBarycoord(t, n, i, r, tn) === null ? !1 : tn.x >= 0 && tn.y >= 0 && tn.x + tn.y <= 1;
  }
  static getInterpolation(t, n, i, r, s, a, o, l) {
    return this.getBarycoord(t, n, i, r, tn) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(s, tn.x), l.addScaledVector(a, tn.y), l.addScaledVector(o, tn.z), l);
  }
  static getInterpolatedAttribute(t, n, i, r, s, a) {
    return xr.setScalar(0), Er.setScalar(0), yr.setScalar(0), xr.fromBufferAttribute(t, n), Er.fromBufferAttribute(t, i), yr.fromBufferAttribute(t, r), a.setScalar(0), a.addScaledVector(xr, s.x), a.addScaledVector(Er, s.y), a.addScaledVector(yr, s.z), a;
  }
  static isFrontFacing(t, n, i, r) {
    return Vt.subVectors(i, n), en.subVectors(t, n), Vt.cross(en).dot(r) < 0;
  }
  set(t, n, i) {
    return this.a.copy(t), this.b.copy(n), this.c.copy(i), this;
  }
  setFromPointsAndIndices(t, n, i, r) {
    return this.a.copy(t[n]), this.b.copy(t[i]), this.c.copy(t[r]), this;
  }
  setFromAttributeAndIndices(t, n, i, r) {
    return this.a.fromBufferAttribute(t, n), this.b.fromBufferAttribute(t, i), this.c.fromBufferAttribute(t, r), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this;
  }
  getArea() {
    return Vt.subVectors(this.c, this.b), en.subVectors(this.a, this.b), Vt.cross(en).length() * 0.5;
  }
  getMidpoint(t) {
    return t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(t) {
    return Yn.getNormal(this.a, this.b, this.c, t);
  }
  getPlane(t) {
    return t.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(t, n) {
    return Yn.getBarycoord(t, this.a, this.b, this.c, n);
  }
  getInterpolation(t, n, i, r, s) {
    return Yn.getInterpolation(t, this.a, this.b, this.c, n, i, r, s);
  }
  containsPoint(t) {
    return Yn.containsPoint(t, this.a, this.b, this.c);
  }
  isFrontFacing(t) {
    return Yn.isFrontFacing(this.a, this.b, this.c, t);
  }
  intersectsBox(t) {
    return t.intersectsTriangle(this);
  }
  closestPointToPoint(t, n) {
    const i = this.a, r = this.b, s = this.c;
    let a, o;
    Nn.subVectors(r, i), On.subVectors(s, i), vr.subVectors(t, i);
    const l = Nn.dot(vr), c = On.dot(vr);
    if (l <= 0 && c <= 0) return n.copy(i);
    Mr.subVectors(t, r);
    const u = Nn.dot(Mr), d = On.dot(Mr);
    if (u >= 0 && d <= u) return n.copy(r);
    const h = l * d - u * c;
    if (h <= 0 && l >= 0 && u <= 0)
      return a = l / (l - u), n.copy(i).addScaledVector(Nn, a);
    Sr.subVectors(t, s);
    const _ = Nn.dot(Sr), M = On.dot(Sr);
    if (M >= 0 && _ <= M) return n.copy(s);
    const S = _ * c - l * M;
    if (S <= 0 && c >= 0 && M <= 0)
      return o = c / (c - M), n.copy(i).addScaledVector(On, o);
    const p = u * M - _ * d;
    if (p <= 0 && d - u >= 0 && _ - M >= 0)
      return Ps.subVectors(s, r), o = (d - u) / (d - u + (_ - M)), n.copy(r).addScaledVector(Ps, o);
    const f = 1 / (p + S + h);
    return a = S * f, o = h * f, n.copy(i).addScaledVector(Nn, a).addScaledVector(On, o);
  }
  equals(t) {
    return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
  }
}, Mi = class {
  constructor(e = new O(1 / 0, 1 / 0, 1 / 0), t = new O(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = t;
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t += 3) this.expandByPoint(Gt.fromArray(e, t));
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, n = e.count; t < n; t++) this.expandByPoint(Gt.fromBufferAttribute(e, t));
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t++) this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    const n = Gt.copy(t).multiplyScalar(0.5);
    return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
  }
  setFromObject(e, t = !1) {
    return this.makeEmpty(), this.expandByObject(e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  expandByObject(e, t = !1) {
    e.updateWorldMatrix(!1, !1);
    const n = e.geometry;
    if (n !== void 0) {
      const r = n.getAttribute("position");
      if (t === !0 && r !== void 0 && e.isInstancedMesh !== !0) for (let s = 0, a = r.count; s < a; s++)
        e.isMesh === !0 ? e.getVertexPosition(s, Gt) : Gt.fromBufferAttribute(r, s), Gt.applyMatrix4(e.matrixWorld), this.expandByPoint(Gt);
      else
        e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), Pi.copy(e.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), Pi.copy(n.boundingBox)), Pi.applyMatrix4(e.matrixWorld), this.union(Pi);
    }
    const i = e.children;
    for (let r = 0, s = i.length; r < s; r++) this.expandByObject(i[r], t);
    return this;
  }
  containsPoint(e) {
    return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
  }
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
  }
  getParameter(e, t) {
    return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z));
  }
  intersectsBox(e) {
    return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
  }
  intersectsSphere(e) {
    return this.clampPoint(e.center, Gt), Gt.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  intersectsPlane(e) {
    let t, n;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
  }
  intersectsTriangle(e) {
    if (this.isEmpty()) return !1;
    this.getCenter(oi), Li.subVectors(this.max, oi), Fn.subVectors(e.a, oi), Bn.subVectors(e.b, oi), zn.subVectors(e.c, oi), dn.subVectors(Bn, Fn), fn.subVectors(zn, Bn), En.subVectors(Fn, zn);
    let t = [
      0,
      -dn.z,
      dn.y,
      0,
      -fn.z,
      fn.y,
      0,
      -En.z,
      En.y,
      dn.z,
      0,
      -dn.x,
      fn.z,
      0,
      -fn.x,
      En.z,
      0,
      -En.x,
      -dn.y,
      dn.x,
      0,
      -fn.y,
      fn.x,
      0,
      -En.y,
      En.x,
      0
    ];
    return !Tr(t, Fn, Bn, zn, Li) || (t = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], !Tr(t, Fn, Bn, zn, Li)) ? !1 : (Di.crossVectors(dn, fn), t = [
      Di.x,
      Di.y,
      Di.z
    ], Tr(t, Fn, Bn, zn, Li));
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, Gt).distanceTo(e);
  }
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(Gt).length() * 0.5), e;
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  applyMatrix4(e) {
    return this.isEmpty() ? this : (nn[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), nn[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), nn[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), nn[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), nn[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), nn[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), nn[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), nn[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(nn), this);
  }
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
  toJSON() {
    return {
      min: this.min.toArray(),
      max: this.max.toArray()
    };
  }
  fromJSON(e) {
    return this.min.fromArray(e.min), this.max.fromArray(e.max), this;
  }
}, nn = [
  /* @__PURE__ */ new O(),
  /* @__PURE__ */ new O(),
  /* @__PURE__ */ new O(),
  /* @__PURE__ */ new O(),
  /* @__PURE__ */ new O(),
  /* @__PURE__ */ new O(),
  /* @__PURE__ */ new O(),
  /* @__PURE__ */ new O()
], Gt = /* @__PURE__ */ new O(), Pi = /* @__PURE__ */ new Mi(), Fn = /* @__PURE__ */ new O(), Bn = /* @__PURE__ */ new O(), zn = /* @__PURE__ */ new O(), dn = /* @__PURE__ */ new O(), fn = /* @__PURE__ */ new O(), En = /* @__PURE__ */ new O(), oi = /* @__PURE__ */ new O(), Li = /* @__PURE__ */ new O(), Di = /* @__PURE__ */ new O(), yn = /* @__PURE__ */ new O();
function Tr(e, t, n, i, r) {
  for (let s = 0, a = e.length - 3; s <= a; s += 3) {
    yn.fromArray(e, s);
    const o = r.x * Math.abs(yn.x) + r.y * Math.abs(yn.y) + r.z * Math.abs(yn.z), l = t.dot(yn), c = n.dot(yn), u = i.dot(yn);
    if (Math.max(-Math.max(l, c, u), Math.min(l, c, u)) > o) return !1;
  }
  return !0;
}
var ct = /* @__PURE__ */ new O(), Ii = /* @__PURE__ */ new Ne(), Gl = 0, Kt = class extends Mn {
  constructor(e, t, n = !1) {
    if (super(), Array.isArray(e)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, Object.defineProperty(this, "id", { value: Gl++ }), this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = n, this.usage = rl, this.updateRanges = [], this.gpuType = rr, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  setUsage(e) {
    return this.usage = e, this;
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({
      start: e,
      count: t
    });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
  }
  copyAt(e, t, n) {
    e *= this.itemSize, n *= t.itemSize;
    for (let i = 0, r = this.itemSize; i < r; i++) this.array[e + i] = t.array[n + i];
    return this;
  }
  copyArray(e) {
    return this.array.set(e), this;
  }
  applyMatrix3(e) {
    if (this.itemSize === 2) for (let t = 0, n = this.count; t < n; t++)
      Ii.fromBufferAttribute(this, t), Ii.applyMatrix3(e), this.setXY(t, Ii.x, Ii.y);
    else if (this.itemSize === 3) for (let t = 0, n = this.count; t < n; t++)
      ct.fromBufferAttribute(this, t), ct.applyMatrix3(e), this.setXYZ(t, ct.x, ct.y, ct.z);
    return this;
  }
  applyMatrix4(e) {
    for (let t = 0, n = this.count; t < n; t++)
      ct.fromBufferAttribute(this, t), ct.applyMatrix4(e), this.setXYZ(t, ct.x, ct.y, ct.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, n = this.count; t < n; t++)
      ct.fromBufferAttribute(this, t), ct.applyNormalMatrix(e), this.setXYZ(t, ct.x, ct.y, ct.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, n = this.count; t < n; t++)
      ct.fromBufferAttribute(this, t), ct.transformDirection(e), this.setXYZ(t, ct.x, ct.y, ct.z);
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  getComponent(e, t) {
    let n = this.array[e * this.itemSize + t];
    return this.normalized && (n = Xn(n, this.array)), n;
  }
  setComponent(e, t, n) {
    return this.normalized && (n = Et(n, this.array)), this.array[e * this.itemSize + t] = n, this;
  }
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = Xn(t, this.array)), t;
  }
  setX(e, t) {
    return this.normalized && (t = Et(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = Xn(t, this.array)), t;
  }
  setY(e, t) {
    return this.normalized && (t = Et(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = Xn(t, this.array)), t;
  }
  setZ(e, t) {
    return this.normalized && (t = Et(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = Xn(t, this.array)), t;
  }
  setW(e, t) {
    return this.normalized && (t = Et(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  setXY(e, t, n) {
    return e *= this.itemSize, this.normalized && (t = Et(t, this.array), n = Et(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this;
  }
  setXYZ(e, t, n, i) {
    return e *= this.itemSize, this.normalized && (t = Et(t, this.array), n = Et(n, this.array), i = Et(i, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = i, this;
  }
  setXYZW(e, t, n, i, r) {
    return e *= this.itemSize, this.normalized && (t = Et(t, this.array), n = Et(n, this.array), i = Et(i, this.array), r = Et(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = i, this.array[e + 3] = r, this;
  }
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (e.name = this.name), this.usage !== 35044 && (e.usage = this.usage), e;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}, La = class extends Kt {
  constructor(e, t, n) {
    super(new Uint16Array(e), t, n);
  }
}, Da = class extends Kt {
  constructor(e, t, n) {
    super(new Uint32Array(e), t, n);
  }
}, Lt = class extends Kt {
  constructor(e, t, n) {
    super(new Float32Array(e), t, n);
  }
}, Hl = /* @__PURE__ */ new Mi(), li = /* @__PURE__ */ new O(), br = /* @__PURE__ */ new O(), Jr = class {
  constructor(e = new O(), t = -1) {
    this.isSphere = !0, this.center = e, this.radius = t;
  }
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  setFromPoints(e, t) {
    const n = this.center;
    t !== void 0 ? n.copy(t) : Hl.setFromPoints(e).getCenter(n);
    let i = 0;
    for (let r = 0, s = e.length; r < s; r++) i = Math.max(i, n.distanceToSquared(e[r]));
    return this.radius = Math.sqrt(i), this;
  }
  copy(e) {
    return this.center.copy(e.center), this.radius = e.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(e) {
    const t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(e, t) {
    const n = this.center.distanceToSquared(e);
    return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
  }
  getBoundingBox(e) {
    return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  applyMatrix4(e) {
    return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this;
  }
  translate(e) {
    return this.center.add(e), this;
  }
  expandByPoint(e) {
    if (this.isEmpty())
      return this.center.copy(e), this.radius = 0, this;
    li.subVectors(e, this.center);
    const t = li.lengthSq();
    if (t > this.radius * this.radius) {
      const n = Math.sqrt(t), i = (n - this.radius) * 0.5;
      this.center.addScaledVector(li, i / n), this.radius += i;
    }
    return this;
  }
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (br.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(li.copy(e.center).add(br)), this.expandByPoint(li.copy(e.center).sub(br))), this);
  }
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    return {
      radius: this.radius,
      center: this.center.toArray()
    };
  }
  fromJSON(e) {
    return this.radius = e.radius, this.center.fromArray(e.center), this;
  }
}, kl = 0, It = /* @__PURE__ */ new ft(), Ar = /* @__PURE__ */ new Nt(), Vn = /* @__PURE__ */ new O(), Ct = /* @__PURE__ */ new Mi(), ci = /* @__PURE__ */ new Mi(), _t = /* @__PURE__ */ new O(), Sn = class Ia extends Mn {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: kl++ }), this.uuid = ni(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
      start: 0,
      count: 1 / 0
    }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(t) {
    return Array.isArray(t) ? this.index = new (sl(t) ? Da : La)(t, 1) : this.index = t, this;
  }
  setIndirect(t, n = 0) {
    return this.indirect = t, this.indirectOffset = n, this;
  }
  getIndirect() {
    return this.indirect;
  }
  getAttribute(t) {
    return this.attributes[t];
  }
  setAttribute(t, n) {
    return this.attributes[t] = n, this;
  }
  deleteAttribute(t) {
    return delete this.attributes[t], this;
  }
  hasAttribute(t) {
    return this.attributes[t] !== void 0;
  }
  addGroup(t, n, i = 0) {
    this.groups.push({
      start: t,
      count: n,
      materialIndex: i
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(t, n) {
    this.drawRange.start = t, this.drawRange.count = n;
  }
  applyMatrix4(t) {
    const n = this.attributes.position;
    n !== void 0 && (n.applyMatrix4(t), n.needsUpdate = !0);
    const i = this.attributes.normal;
    if (i !== void 0) {
      const s = new Ie().getNormalMatrix(t);
      i.applyNormalMatrix(s), i.needsUpdate = !0;
    }
    const r = this.attributes.tangent;
    return r !== void 0 && (r.transformDirection(t), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(t) {
    return It.makeRotationFromQuaternion(t), this.applyMatrix4(It), this;
  }
  rotateX(t) {
    return It.makeRotationX(t), this.applyMatrix4(It), this;
  }
  rotateY(t) {
    return It.makeRotationY(t), this.applyMatrix4(It), this;
  }
  rotateZ(t) {
    return It.makeRotationZ(t), this.applyMatrix4(It), this;
  }
  translate(t, n, i) {
    return It.makeTranslation(t, n, i), this.applyMatrix4(It), this;
  }
  scale(t, n, i) {
    return It.makeScale(t, n, i), this.applyMatrix4(It), this;
  }
  lookAt(t) {
    return Ar.lookAt(t), Ar.updateMatrix(), this.applyMatrix4(Ar.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(Vn).negate(), this.translate(Vn.x, Vn.y, Vn.z), this;
  }
  setFromPoints(t) {
    const n = this.getAttribute("position");
    if (n === void 0) {
      const i = [];
      for (let r = 0, s = t.length; r < s; r++) {
        const a = t[r];
        i.push(a.x, a.y, a.z || 0);
      }
      this.setAttribute("position", new Lt(i, 3));
    } else {
      const i = Math.min(t.length, n.count);
      for (let r = 0; r < i; r++) {
        const s = t[r];
        n.setXYZ(r, s.x, s.y, s.z || 0);
      }
      t.length > n.count && Te("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), n.needsUpdate = !0;
    }
    return this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new Mi());
    const t = this.attributes.position, n = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      Pe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new O(-1 / 0, -1 / 0, -1 / 0), new O(1 / 0, 1 / 0, 1 / 0));
      return;
    }
    if (t !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(t), n) for (let i = 0, r = n.length; i < r; i++) {
        const s = n[i];
        Ct.setFromBufferAttribute(s), this.morphTargetsRelative ? (_t.addVectors(this.boundingBox.min, Ct.min), this.boundingBox.expandByPoint(_t), _t.addVectors(this.boundingBox.max, Ct.max), this.boundingBox.expandByPoint(_t)) : (this.boundingBox.expandByPoint(Ct.min), this.boundingBox.expandByPoint(Ct.max));
      }
    } else this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && Pe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Jr());
    const t = this.attributes.position, n = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      Pe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new O(), 1 / 0);
      return;
    }
    if (t) {
      const i = this.boundingSphere.center;
      if (Ct.setFromBufferAttribute(t), n) for (let s = 0, a = n.length; s < a; s++) {
        const o = n[s];
        ci.setFromBufferAttribute(o), this.morphTargetsRelative ? (_t.addVectors(Ct.min, ci.min), Ct.expandByPoint(_t), _t.addVectors(Ct.max, ci.max), Ct.expandByPoint(_t)) : (Ct.expandByPoint(ci.min), Ct.expandByPoint(ci.max));
      }
      Ct.getCenter(i);
      let r = 0;
      for (let s = 0, a = t.count; s < a; s++)
        _t.fromBufferAttribute(t, s), r = Math.max(r, i.distanceToSquared(_t));
      if (n) for (let s = 0, a = n.length; s < a; s++) {
        const o = n[s], l = this.morphTargetsRelative;
        for (let c = 0, u = o.count; c < u; c++)
          _t.fromBufferAttribute(o, c), l && (Vn.fromBufferAttribute(t, c), _t.add(Vn)), r = Math.max(r, i.distanceToSquared(_t));
      }
      this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && Pe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const t = this.index, n = this.attributes;
    if (t === null || n.position === void 0 || n.normal === void 0 || n.uv === void 0) {
      Pe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const i = n.position, r = n.normal, s = n.uv;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Kt(new Float32Array(4 * i.count), 4));
    const a = this.getAttribute("tangent"), o = [], l = [];
    for (let v = 0; v < i.count; v++)
      o[v] = new O(), l[v] = new O();
    const c = new O(), u = new O(), d = new O(), h = new Ne(), _ = new Ne(), M = new Ne(), S = new O(), p = new O();
    function f(v, E, X) {
      c.fromBufferAttribute(i, v), u.fromBufferAttribute(i, E), d.fromBufferAttribute(i, X), h.fromBufferAttribute(s, v), _.fromBufferAttribute(s, E), M.fromBufferAttribute(s, X), u.sub(c), d.sub(c), _.sub(h), M.sub(h);
      const A = 1 / (_.x * M.y - M.x * _.y);
      isFinite(A) && (S.copy(u).multiplyScalar(M.y).addScaledVector(d, -_.y).multiplyScalar(A), p.copy(d).multiplyScalar(_.x).addScaledVector(u, -M.x).multiplyScalar(A), o[v].add(S), o[E].add(S), o[X].add(S), l[v].add(p), l[E].add(p), l[X].add(p));
    }
    let y = this.groups;
    y.length === 0 && (y = [{
      start: 0,
      count: t.count
    }]);
    for (let v = 0, E = y.length; v < E; ++v) {
      const X = y[v], A = X.start, k = X.count;
      for (let Y = A, B = A + k; Y < B; Y += 3) f(t.getX(Y + 0), t.getX(Y + 1), t.getX(Y + 2));
    }
    const b = new O(), T = new O(), P = new O(), R = new O();
    function D(v) {
      P.fromBufferAttribute(r, v), R.copy(P);
      const E = o[v];
      b.copy(E), b.sub(P.multiplyScalar(P.dot(E))).normalize(), T.crossVectors(R, E);
      const X = T.dot(l[v]) < 0 ? -1 : 1;
      a.setXYZW(v, b.x, b.y, b.z, X);
    }
    for (let v = 0, E = y.length; v < E; ++v) {
      const X = y[v], A = X.start, k = X.count;
      for (let Y = A, B = A + k; Y < B; Y += 3)
        D(t.getX(Y + 0)), D(t.getX(Y + 1)), D(t.getX(Y + 2));
    }
  }
  computeVertexNormals() {
    const t = this.index, n = this.getAttribute("position");
    if (n !== void 0) {
      let i = this.getAttribute("normal");
      if (i === void 0)
        i = new Kt(new Float32Array(n.count * 3), 3), this.setAttribute("normal", i);
      else for (let h = 0, _ = i.count; h < _; h++) i.setXYZ(h, 0, 0, 0);
      const r = new O(), s = new O(), a = new O(), o = new O(), l = new O(), c = new O(), u = new O(), d = new O();
      if (t) for (let h = 0, _ = t.count; h < _; h += 3) {
        const M = t.getX(h + 0), S = t.getX(h + 1), p = t.getX(h + 2);
        r.fromBufferAttribute(n, M), s.fromBufferAttribute(n, S), a.fromBufferAttribute(n, p), u.subVectors(a, s), d.subVectors(r, s), u.cross(d), o.fromBufferAttribute(i, M), l.fromBufferAttribute(i, S), c.fromBufferAttribute(i, p), o.add(u), l.add(u), c.add(u), i.setXYZ(M, o.x, o.y, o.z), i.setXYZ(S, l.x, l.y, l.z), i.setXYZ(p, c.x, c.y, c.z);
      }
      else for (let h = 0, _ = n.count; h < _; h += 3)
        r.fromBufferAttribute(n, h + 0), s.fromBufferAttribute(n, h + 1), a.fromBufferAttribute(n, h + 2), u.subVectors(a, s), d.subVectors(r, s), u.cross(d), i.setXYZ(h + 0, u.x, u.y, u.z), i.setXYZ(h + 1, u.x, u.y, u.z), i.setXYZ(h + 2, u.x, u.y, u.z);
      this.normalizeNormals(), i.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const t = this.attributes.normal;
    for (let n = 0, i = t.count; n < i; n++)
      _t.fromBufferAttribute(t, n), _t.normalize(), t.setXYZ(n, _t.x, _t.y, _t.z);
  }
  toNonIndexed() {
    function t(o, l) {
      const c = o.array, u = o.itemSize, d = o.normalized, h = new c.constructor(l.length * u);
      let _ = 0, M = 0;
      for (let S = 0, p = l.length; S < p; S++) {
        o.isInterleavedBufferAttribute ? _ = l[S] * o.data.stride + o.offset : _ = l[S] * u;
        for (let f = 0; f < u; f++) h[M++] = c[_++];
      }
      return new Kt(h, u, d);
    }
    if (this.index === null)
      return Te("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const n = new Ia(), i = this.index.array, r = this.attributes;
    for (const o in r) {
      const l = r[o], c = t(l, i);
      n.setAttribute(o, c);
    }
    const s = this.morphAttributes;
    for (const o in s) {
      const l = [], c = s[o];
      for (let u = 0, d = c.length; u < d; u++) {
        const h = c[u], _ = t(h, i);
        l.push(_);
      }
      n.morphAttributes[o] = l;
    }
    n.morphTargetsRelative = this.morphTargetsRelative;
    const a = this.groups;
    for (let o = 0, l = a.length; o < l; o++) {
      const c = a[o];
      n.addGroup(c.start, c.count, c.materialIndex);
    }
    return n;
  }
  toJSON() {
    const t = { metadata: {
      version: 4.7,
      type: "BufferGeometry",
      generator: "BufferGeometry.toJSON"
    } };
    if (t.uuid = this.uuid, t.type = this.type, this.name !== "" && (t.name = this.name), Object.keys(this.userData).length > 0 && (t.userData = this.userData), this.parameters !== void 0) {
      const l = this.parameters;
      for (const c in l) l[c] !== void 0 && (t[c] = l[c]);
      return t;
    }
    t.data = { attributes: {} };
    const n = this.index;
    n !== null && (t.data.index = {
      type: n.array.constructor.name,
      array: Array.prototype.slice.call(n.array)
    });
    const i = this.attributes;
    for (const l in i) {
      const c = i[l];
      t.data.attributes[l] = c.toJSON(t.data);
    }
    const r = {};
    let s = !1;
    for (const l in this.morphAttributes) {
      const c = this.morphAttributes[l], u = [];
      for (let d = 0, h = c.length; d < h; d++) {
        const _ = c[d];
        u.push(_.toJSON(t.data));
      }
      u.length > 0 && (r[l] = u, s = !0);
    }
    s && (t.data.morphAttributes = r, t.data.morphTargetsRelative = this.morphTargetsRelative);
    const a = this.groups;
    a.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(a)));
    const o = this.boundingSphere;
    return o !== null && (t.data.boundingSphere = o.toJSON()), t;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const n = {};
    this.name = t.name;
    const i = t.index;
    i !== null && this.setIndex(i.clone());
    const r = t.attributes;
    for (const c in r) {
      const u = r[c];
      this.setAttribute(c, u.clone(n));
    }
    const s = t.morphAttributes;
    for (const c in s) {
      const u = [], d = s[c];
      for (let h = 0, _ = d.length; h < _; h++) u.push(d[h].clone(n));
      this.morphAttributes[c] = u;
    }
    this.morphTargetsRelative = t.morphTargetsRelative;
    const a = t.groups;
    for (let c = 0, u = a.length; c < u; c++) {
      const d = a[c];
      this.addGroup(d.start, d.count, d.materialIndex);
    }
    const o = t.boundingBox;
    o !== null && (this.boundingBox = o.clone());
    const l = t.boundingSphere;
    return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = t.drawRange.start, this.drawRange.count = t.drawRange.count, this.userData = t.userData, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}, Wl = 0, Si = class extends Mn {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Wl++ }), this.uuid = ni(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Xe(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = cr, this.stencilZFail = cr, this.stencilZPass = cr, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
  }
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(e) {
    if (e !== void 0)
      for (const t in e) {
        const n = e[t];
        if (n === void 0) {
          Te(`Material: parameter '${t}' has value of undefined.`);
          continue;
        }
        const i = this[t];
        if (i === void 0) {
          Te(`Material: '${t}' is not a property of THREE.${this.type}.`);
          continue;
        }
        i && i.isColor ? i.set(n) : i && i.isVector3 && n && n.isVector3 ? i.copy(n) : this[t] = n;
      }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    t && (e = {
      textures: {},
      images: {}
    });
    const n = { metadata: {
      version: 4.7,
      type: "Material",
      generator: "Material.toJSON"
    } };
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (n.sheenColorMap = this.sheenColorMap.toJSON(e).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (n.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e).uuid), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== 1 && (n.blending = this.blending), this.side !== 0 && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== 204 && (n.blendSrc = this.blendSrc), this.blendDst !== 205 && (n.blendDst = this.blendDst), this.blendEquation !== 100 && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== 3 && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== 519 && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== 7680 && (n.stencilFail = this.stencilFail), this.stencilZFail !== 7680 && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== 7680 && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.allowOverride === !1 && (n.allowOverride = !1), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
    function i(r) {
      const s = [];
      for (const a in r) {
        const o = r[a];
        delete o.metadata, s.push(o);
      }
      return s;
    }
    if (t) {
      const r = i(e.textures), s = i(e.images);
      r.length > 0 && (n.textures = r), s.length > 0 && (n.images = s);
    }
    return n;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
    const t = e.clippingPlanes;
    let n = null;
    if (t !== null) {
      const i = t.length;
      n = new Array(i);
      for (let r = 0; r !== i; ++r) n[r] = t[r].clone();
    }
    return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.allowOverride = e.allowOverride, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
}, rn = /* @__PURE__ */ new O(), Rr = /* @__PURE__ */ new O(), Ui = /* @__PURE__ */ new O(), pn = /* @__PURE__ */ new O(), wr = /* @__PURE__ */ new O(), Ni = /* @__PURE__ */ new O(), Cr = /* @__PURE__ */ new O(), Ua = class {
  constructor(e = new O(), t = new O(0, 0, -1)) {
    this.origin = e, this.direction = t;
  }
  set(e, t) {
    return this.origin.copy(e), this.direction.copy(t), this;
  }
  copy(e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
  }
  at(e, t) {
    return t.copy(this.origin).addScaledVector(this.direction, e);
  }
  lookAt(e) {
    return this.direction.copy(e).sub(this.origin).normalize(), this;
  }
  recast(e) {
    return this.origin.copy(this.at(e, rn)), this;
  }
  closestPointToPoint(e, t) {
    t.subVectors(e, this.origin);
    const n = t.dot(this.direction);
    return n < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, n);
  }
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  distanceSqToPoint(e) {
    const t = rn.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (rn.copy(this.origin).addScaledVector(this.direction, t), rn.distanceToSquared(e));
  }
  distanceSqToSegment(e, t, n, i) {
    Rr.copy(e).add(t).multiplyScalar(0.5), Ui.copy(t).sub(e).normalize(), pn.copy(this.origin).sub(Rr);
    const r = e.distanceTo(t) * 0.5, s = -this.direction.dot(Ui), a = pn.dot(this.direction), o = -pn.dot(Ui), l = pn.lengthSq(), c = Math.abs(1 - s * s);
    let u, d, h, _;
    if (c > 0)
      if (u = s * o - a, d = s * a - o, _ = r * c, u >= 0) if (d >= -_) if (d <= _) {
        const M = 1 / c;
        u *= M, d *= M, h = u * (u + s * d + 2 * a) + d * (s * u + d + 2 * o) + l;
      } else
        d = r, u = Math.max(0, -(s * d + a)), h = -u * u + d * (d + 2 * o) + l;
      else
        d = -r, u = Math.max(0, -(s * d + a)), h = -u * u + d * (d + 2 * o) + l;
      else d <= -_ ? (u = Math.max(0, -(-s * r + a)), d = u > 0 ? -r : Math.min(Math.max(-r, -o), r), h = -u * u + d * (d + 2 * o) + l) : d <= _ ? (u = 0, d = Math.min(Math.max(-r, -o), r), h = d * (d + 2 * o) + l) : (u = Math.max(0, -(s * r + a)), d = u > 0 ? r : Math.min(Math.max(-r, -o), r), h = -u * u + d * (d + 2 * o) + l);
    else
      d = s > 0 ? -r : r, u = Math.max(0, -(s * d + a)), h = -u * u + d * (d + 2 * o) + l;
    return n && n.copy(this.origin).addScaledVector(this.direction, u), i && i.copy(Rr).addScaledVector(Ui, d), h;
  }
  intersectSphere(e, t) {
    rn.subVectors(e.center, this.origin);
    const n = rn.dot(this.direction), i = rn.dot(rn) - n * n, r = e.radius * e.radius;
    if (i > r) return null;
    const s = Math.sqrt(r - i), a = n - s, o = n + s;
    return o < 0 ? null : a < 0 ? this.at(o, t) : this.at(a, t);
  }
  intersectsSphere(e) {
    return e.radius < 0 ? !1 : this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  distanceToPlane(e) {
    const t = e.normal.dot(this.direction);
    if (t === 0)
      return e.distanceToPoint(this.origin) === 0 ? 0 : null;
    const n = -(this.origin.dot(e.normal) + e.constant) / t;
    return n >= 0 ? n : null;
  }
  intersectPlane(e, t) {
    const n = this.distanceToPlane(e);
    return n === null ? null : this.at(n, t);
  }
  intersectsPlane(e) {
    const t = e.distanceToPoint(this.origin);
    return t === 0 || e.normal.dot(this.direction) * t < 0;
  }
  intersectBox(e, t) {
    let n, i, r, s, a, o;
    const l = 1 / this.direction.x, c = 1 / this.direction.y, u = 1 / this.direction.z, d = this.origin;
    return l >= 0 ? (n = (e.min.x - d.x) * l, i = (e.max.x - d.x) * l) : (n = (e.max.x - d.x) * l, i = (e.min.x - d.x) * l), c >= 0 ? (r = (e.min.y - d.y) * c, s = (e.max.y - d.y) * c) : (r = (e.max.y - d.y) * c, s = (e.min.y - d.y) * c), n > s || r > i || ((r > n || isNaN(n)) && (n = r), (s < i || isNaN(i)) && (i = s), u >= 0 ? (a = (e.min.z - d.z) * u, o = (e.max.z - d.z) * u) : (a = (e.max.z - d.z) * u, o = (e.min.z - d.z) * u), n > o || a > i) || ((a > n || n !== n) && (n = a), (o < i || i !== i) && (i = o), i < 0) ? null : this.at(n >= 0 ? n : i, t);
  }
  intersectsBox(e) {
    return this.intersectBox(e, rn) !== null;
  }
  intersectTriangle(e, t, n, i, r) {
    wr.subVectors(t, e), Ni.subVectors(n, e), Cr.crossVectors(wr, Ni);
    let s = this.direction.dot(Cr), a;
    if (s > 0) {
      if (i) return null;
      a = 1;
    } else if (s < 0)
      a = -1, s = -s;
    else return null;
    pn.subVectors(this.origin, e);
    const o = a * this.direction.dot(Ni.crossVectors(pn, Ni));
    if (o < 0) return null;
    const l = a * this.direction.dot(wr.cross(pn));
    if (l < 0 || o + l > s) return null;
    const c = -a * pn.dot(Cr);
    return c < 0 ? null : this.at(c / s, r);
  }
  applyMatrix4(e) {
    return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
  }
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, Na = class extends Si {
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Xe(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Qn(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}, Ls = /* @__PURE__ */ new ft(), Tn = /* @__PURE__ */ new Ua(), Oi = /* @__PURE__ */ new Jr(), Ds = /* @__PURE__ */ new O(), Fi = /* @__PURE__ */ new O(), Bi = /* @__PURE__ */ new O(), zi = /* @__PURE__ */ new O(), Pr = /* @__PURE__ */ new O(), Vi = /* @__PURE__ */ new O(), Is = /* @__PURE__ */ new O(), Gi = /* @__PURE__ */ new O(), Zt = class extends Nt {
  constructor(e = new Sn(), t = new Na()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes, t = Object.keys(e);
    if (t.length > 0) {
      const n = e[t[0]];
      if (n !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let i = 0, r = n.length; i < r; i++) {
          const s = n[i].name || String(i);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[s] = i;
        }
      }
    }
  }
  getVertexPosition(e, t) {
    const n = this.geometry, i = n.attributes.position, r = n.morphAttributes.position, s = n.morphTargetsRelative;
    t.fromBufferAttribute(i, e);
    const a = this.morphTargetInfluences;
    if (r && a) {
      Vi.set(0, 0, 0);
      for (let o = 0, l = r.length; o < l; o++) {
        const c = a[o], u = r[o];
        c !== 0 && (Pr.fromBufferAttribute(u, e), s ? Vi.addScaledVector(Pr, c) : Vi.addScaledVector(Pr.sub(t), c));
      }
      t.add(Vi);
    }
    return t;
  }
  raycast(e, t) {
    const n = this.geometry, i = this.material, r = this.matrixWorld;
    i !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), Oi.copy(n.boundingSphere), Oi.applyMatrix4(r), Tn.copy(e.ray).recast(e.near), !(Oi.containsPoint(Tn.origin) === !1 && (Tn.intersectSphere(Oi, Ds) === null || Tn.origin.distanceToSquared(Ds) > (e.far - e.near) ** 2)) && (Ls.copy(r).invert(), Tn.copy(e.ray).applyMatrix4(Ls), !(n.boundingBox !== null && Tn.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(e, t, Tn)));
  }
  _computeIntersections(e, t, n) {
    let i;
    const r = this.geometry, s = this.material, a = r.index, o = r.attributes.position, l = r.attributes.uv, c = r.attributes.uv1, u = r.attributes.normal, d = r.groups, h = r.drawRange;
    if (a !== null) if (Array.isArray(s)) for (let _ = 0, M = d.length; _ < M; _++) {
      const S = d[_], p = s[S.materialIndex], f = Math.max(S.start, h.start), y = Math.min(a.count, Math.min(S.start + S.count, h.start + h.count));
      for (let b = f, T = y; b < T; b += 3) {
        const P = a.getX(b), R = a.getX(b + 1), D = a.getX(b + 2);
        i = Hi(this, p, e, n, l, c, u, P, R, D), i && (i.faceIndex = Math.floor(b / 3), i.face.materialIndex = S.materialIndex, t.push(i));
      }
    }
    else {
      const _ = Math.max(0, h.start), M = Math.min(a.count, h.start + h.count);
      for (let S = _, p = M; S < p; S += 3) {
        const f = a.getX(S), y = a.getX(S + 1), b = a.getX(S + 2);
        i = Hi(this, s, e, n, l, c, u, f, y, b), i && (i.faceIndex = Math.floor(S / 3), t.push(i));
      }
    }
    else if (o !== void 0) if (Array.isArray(s)) for (let _ = 0, M = d.length; _ < M; _++) {
      const S = d[_], p = s[S.materialIndex], f = Math.max(S.start, h.start), y = Math.min(o.count, Math.min(S.start + S.count, h.start + h.count));
      for (let b = f, T = y; b < T; b += 3) {
        const P = b, R = b + 1, D = b + 2;
        i = Hi(this, p, e, n, l, c, u, P, R, D), i && (i.faceIndex = Math.floor(b / 3), i.face.materialIndex = S.materialIndex, t.push(i));
      }
    }
    else {
      const _ = Math.max(0, h.start), M = Math.min(o.count, h.start + h.count);
      for (let S = _, p = M; S < p; S += 3) {
        const f = S, y = S + 1, b = S + 2;
        i = Hi(this, s, e, n, l, c, u, f, y, b), i && (i.faceIndex = Math.floor(S / 3), t.push(i));
      }
    }
  }
};
function Xl(e, t, n, i, r, s, a, o) {
  let l;
  if (t.side === 1 ? l = i.intersectTriangle(a, s, r, !0, o) : l = i.intersectTriangle(r, s, a, t.side === 0, o), l === null) return null;
  Gi.copy(o), Gi.applyMatrix4(e.matrixWorld);
  const c = n.ray.origin.distanceTo(Gi);
  return c < n.near || c > n.far ? null : {
    distance: c,
    point: Gi.clone(),
    object: e
  };
}
function Hi(e, t, n, i, r, s, a, o, l, c) {
  e.getVertexPosition(o, Fi), e.getVertexPosition(l, Bi), e.getVertexPosition(c, zi);
  const u = Xl(e, t, n, i, Fi, Bi, zi, Is);
  if (u) {
    const d = new O();
    ai.getBarycoord(Is, Fi, Bi, zi, d), r && (u.uv = ai.getInterpolatedAttribute(r, o, l, c, d, new Ne())), s && (u.uv1 = ai.getInterpolatedAttribute(s, o, l, c, d, new Ne())), a && (u.normal = ai.getInterpolatedAttribute(a, o, l, c, d, new O()), u.normal.dot(i.direction) > 0 && u.normal.multiplyScalar(-1));
    const h = {
      a: o,
      b: l,
      c,
      normal: new O(),
      materialIndex: 0
    };
    ai.getNormal(Fi, Bi, zi, h.normal), u.face = h, u.barycoord = d;
  }
  return u;
}
var Yl = class extends Ot {
  constructor(e = null, t = 1, n = 1, i, r, s, a, o, l = Tt, c = Tt, u, d) {
    super(null, s, a, o, l, c, i, r, u, d), this.isDataTexture = !0, this.image = {
      data: e,
      width: t,
      height: n
    }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}, Lr = /* @__PURE__ */ new O(), ql = /* @__PURE__ */ new O(), jl = /* @__PURE__ */ new Ie(), _n = class {
  constructor(e = new O(1, 0, 0), t = 0) {
    this.isPlane = !0, this.normal = e, this.constant = t;
  }
  set(e, t) {
    return this.normal.copy(e), this.constant = t, this;
  }
  setComponents(e, t, n, i) {
    return this.normal.set(e, t, n), this.constant = i, this;
  }
  setFromNormalAndCoplanarPoint(e, t) {
    return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
  }
  setFromCoplanarPoints(e, t, n) {
    const i = Lr.subVectors(n, t).cross(ql.subVectors(e, t)).normalize();
    return this.setFromNormalAndCoplanarPoint(i, e), this;
  }
  copy(e) {
    return this.normal.copy(e.normal), this.constant = e.constant, this;
  }
  normalize() {
    const e = 1 / this.normal.length();
    return this.normal.multiplyScalar(e), this.constant *= e, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  projectPoint(e, t) {
    return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  intersectLine(e, t, n = !0) {
    const i = e.delta(Lr), r = this.normal.dot(i);
    if (r === 0)
      return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
    const s = -(e.start.dot(this.normal) + this.constant) / r;
    return n === !0 && (s < 0 || s > 1) ? null : t.copy(e.start).addScaledVector(i, s);
  }
  intersectsLine(e) {
    const t = this.distanceToPoint(e.start), n = this.distanceToPoint(e.end);
    return t < 0 && n > 0 || n < 0 && t > 0;
  }
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(e, t) {
    const n = t || jl.getNormalMatrix(e), i = this.coplanarPoint(Lr).applyMatrix4(e), r = this.normal.applyMatrix3(n).normalize();
    return this.constant = -i.dot(r), this;
  }
  translate(e) {
    return this.constant -= e.dot(this.normal), this;
  }
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, bn = /* @__PURE__ */ new Jr(), Kl = /* @__PURE__ */ new Ne(0.5, 0.5), ki = /* @__PURE__ */ new O(), Qr = class {
  constructor(e = new _n(), t = new _n(), n = new _n(), i = new _n(), r = new _n(), s = new _n()) {
    this.planes = [
      e,
      t,
      n,
      i,
      r,
      s
    ];
  }
  set(e, t, n, i, r, s) {
    const a = this.planes;
    return a[0].copy(e), a[1].copy(t), a[2].copy(n), a[3].copy(i), a[4].copy(r), a[5].copy(s), this;
  }
  copy(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++) t[n].copy(e.planes[n]);
    return this;
  }
  setFromProjectionMatrix(e, t = $n, n = !1) {
    const i = this.planes, r = e.elements, s = r[0], a = r[1], o = r[2], l = r[3], c = r[4], u = r[5], d = r[6], h = r[7], _ = r[8], M = r[9], S = r[10], p = r[11], f = r[12], y = r[13], b = r[14], T = r[15];
    if (i[0].setComponents(l - s, h - c, p - _, T - f).normalize(), i[1].setComponents(l + s, h + c, p + _, T + f).normalize(), i[2].setComponents(l + a, h + u, p + M, T + y).normalize(), i[3].setComponents(l - a, h - u, p - M, T - y).normalize(), n)
      i[4].setComponents(o, d, S, b).normalize(), i[5].setComponents(l - o, h - d, p - S, T - b).normalize();
    else if (i[4].setComponents(l - o, h - d, p - S, T - b).normalize(), t === 2e3) i[5].setComponents(l + o, h + d, p + S, T + b).normalize();
    else if (t === 2001) i[5].setComponents(o, d, S, b).normalize();
    else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
    return this;
  }
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      e.boundingSphere === null && e.computeBoundingSphere(), bn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const t = e.geometry;
      t.boundingSphere === null && t.computeBoundingSphere(), bn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(bn);
  }
  intersectsSprite(e) {
    return bn.center.set(0, 0, 0), bn.radius = 0.7071067811865476 + Kl.distanceTo(e.center), bn.applyMatrix4(e.matrixWorld), this.intersectsSphere(bn);
  }
  intersectsSphere(e) {
    const t = this.planes, n = e.center, i = -e.radius;
    for (let r = 0; r < 6; r++) if (t[r].distanceToPoint(n) < i) return !1;
    return !0;
  }
  intersectsBox(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++) {
      const i = t[n];
      if (ki.x = i.normal.x > 0 ? e.max.x : e.min.x, ki.y = i.normal.y > 0 ? e.max.y : e.min.y, ki.z = i.normal.z > 0 ? e.max.z : e.min.z, i.distanceToPoint(ki) < 0) return !1;
    }
    return !0;
  }
  containsPoint(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++) if (t[n].distanceToPoint(e) < 0) return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, Oa = class extends Ot {
  constructor(e = [], t = 301, n, i, r, s, a, o, l, c) {
    super(e, t, n, i, r, s, a, o, l, c), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}, ei = class extends Ot {
  constructor(e, t, n = Rn, i, r, s, a = Tt, o = Tt, l, c = _i, u = 1) {
    if (c !== 1026 && c !== 1027) throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    super({
      width: e,
      height: t,
      depth: u
    }, i, r, s, a, o, c, n, l), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.source = new $r(Object.assign({}, e.image)), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t;
  }
}, Zl = class extends ei {
  constructor(e, t = Rn, n = 301, i, r, s = Tt, a = Tt, o, l = _i) {
    const c = {
      width: e,
      height: e,
      depth: 1
    }, u = [
      c,
      c,
      c,
      c,
      c,
      c
    ];
    super(e, e, t, n, i, r, s, a, o, l), this.image = u, this.isCubeDepthTexture = !0, this.isCubeTexture = !0;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}, Fa = class extends Ot {
  constructor(e = null) {
    super(), this.sourceTexture = e, this.isExternalTexture = !0;
  }
  copy(e) {
    return super.copy(e), this.sourceTexture = e.sourceTexture, this;
  }
}, es = class Ba extends Sn {
  constructor(t = 1, n = 1, i = 1, r = 1, s = 1, a = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: t,
      height: n,
      depth: i,
      widthSegments: r,
      heightSegments: s,
      depthSegments: a
    };
    const o = this;
    r = Math.floor(r), s = Math.floor(s), a = Math.floor(a);
    const l = [], c = [], u = [], d = [];
    let h = 0, _ = 0;
    M("z", "y", "x", -1, -1, i, n, t, a, s, 0), M("z", "y", "x", 1, -1, i, n, -t, a, s, 1), M("x", "z", "y", 1, 1, t, i, n, r, a, 2), M("x", "z", "y", 1, -1, t, i, -n, r, a, 3), M("x", "y", "z", 1, -1, t, n, i, r, s, 4), M("x", "y", "z", -1, -1, t, n, -i, r, s, 5), this.setIndex(l), this.setAttribute("position", new Lt(c, 3)), this.setAttribute("normal", new Lt(u, 3)), this.setAttribute("uv", new Lt(d, 2));
    function M(S, p, f, y, b, T, P, R, D, v, E) {
      const X = T / D, A = P / v, k = T / 2, Y = P / 2, B = R / 2, G = D + 1, H = v + 1;
      let z = 0, J = 0;
      const te = new O();
      for (let re = 0; re < H; re++) {
        const ge = re * A - Y;
        for (let xe = 0; xe < G; xe++)
          te[S] = (xe * X - k) * y, te[p] = ge * b, te[f] = B, c.push(te.x, te.y, te.z), te[S] = 0, te[p] = 0, te[f] = R > 0 ? 1 : -1, u.push(te.x, te.y, te.z), d.push(xe / D), d.push(1 - re / v), z += 1;
      }
      for (let re = 0; re < v; re++) for (let ge = 0; ge < D; ge++) {
        const xe = h + ge + G * re, Ke = h + ge + G * (re + 1), Ve = h + (ge + 1) + G * (re + 1), q = h + (ge + 1) + G * re;
        l.push(xe, Ke, q), l.push(Ke, Ve, q), J += 6;
      }
      o.addGroup(_, J, E), _ += J, h += z;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Ba(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
  }
}, za = class Va extends Sn {
  constructor(t = 1, n = 1, i = 1, r = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: t,
      height: n,
      widthSegments: i,
      heightSegments: r
    };
    const s = t / 2, a = n / 2, o = Math.floor(i), l = Math.floor(r), c = o + 1, u = l + 1, d = t / o, h = n / l, _ = [], M = [], S = [], p = [];
    for (let f = 0; f < u; f++) {
      const y = f * h - a;
      for (let b = 0; b < c; b++) {
        const T = b * d - s;
        M.push(T, -y, 0), S.push(0, 0, 1), p.push(b / o), p.push(1 - f / l);
      }
    }
    for (let f = 0; f < l; f++) for (let y = 0; y < o; y++) {
      const b = y + c * f, T = y + c * (f + 1), P = y + 1 + c * (f + 1), R = y + 1 + c * f;
      _.push(b, T, R), _.push(T, P, R);
    }
    this.setIndex(_), this.setAttribute("position", new Lt(M, 3)), this.setAttribute("normal", new Lt(S, 3)), this.setAttribute("uv", new Lt(p, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Va(t.width, t.height, t.widthSegments, t.heightSegments);
  }
};
function ti(e) {
  const t = {};
  for (const n in e) {
    t[n] = {};
    for (const i in e[n]) {
      const r = e[n][i];
      if (Us(r)) r.isRenderTargetTexture ? (Te("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[n][i] = null) : t[n][i] = r.clone();
      else if (Array.isArray(r)) if (Us(r[0])) {
        const s = [];
        for (let a = 0, o = r.length; a < o; a++) s[a] = r[a].clone();
        t[n][i] = s;
      } else t[n][i] = r.slice();
      else t[n][i] = r;
    }
  }
  return t;
}
function yt(e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const i = ti(e[n]);
    for (const r in i) t[r] = i[r];
  }
  return t;
}
function Us(e) {
  return e && (e.isColor || e.isMatrix3 || e.isMatrix4 || e.isVector2 || e.isVector3 || e.isVector4 || e.isTexture || e.isQuaternion);
}
function $l(e) {
  const t = [];
  for (let n = 0; n < e.length; n++) t.push(e[n].clone());
  return t;
}
function Ga(e) {
  const t = e.getRenderTarget();
  return t === null ? e.outputColorSpace : t.isXRRenderTarget === !0 ? t.texture.colorSpace : We.workingColorSpace;
}
var Jl = {
  clone: ti,
  merge: yt
}, Ql = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, ec = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`, $t = class extends Si {
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Ql, this.fragmentShader = ec, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      clipCullDistance: !1,
      multiDraw: !1
    }, this.defaultAttributeValues = {
      color: [
        1,
        1,
        1
      ],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = ti(e.uniforms), this.uniformsGroups = $l(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this.defaultAttributeValues = Object.assign({}, e.defaultAttributeValues), this.index0AttributeName = e.index0AttributeName, this.uniformsNeedUpdate = e.uniformsNeedUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.glslVersion = this.glslVersion, t.uniforms = {};
    for (const i in this.uniforms) {
      const r = this.uniforms[i].value;
      r && r.isTexture ? t.uniforms[i] = {
        type: "t",
        value: r.toJSON(e).uuid
      } : r && r.isColor ? t.uniforms[i] = {
        type: "c",
        value: r.getHex()
      } : r && r.isVector2 ? t.uniforms[i] = {
        type: "v2",
        value: r.toArray()
      } : r && r.isVector3 ? t.uniforms[i] = {
        type: "v3",
        value: r.toArray()
      } : r && r.isVector4 ? t.uniforms[i] = {
        type: "v4",
        value: r.toArray()
      } : r && r.isMatrix3 ? t.uniforms[i] = {
        type: "m3",
        value: r.toArray()
      } : r && r.isMatrix4 ? t.uniforms[i] = {
        type: "m4",
        value: r.toArray()
      } : t.uniforms[i] = { value: r };
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
    const n = {};
    for (const i in this.extensions) this.extensions[i] === !0 && (n[i] = !0);
    return Object.keys(n).length > 0 && (t.extensions = n), t;
  }
}, tc = class extends $t {
  constructor(e) {
    super(e), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
  }
}, nc = class extends Si {
  constructor(e) {
    super(), this.isMeshPhongMaterial = !0, this.type = "MeshPhongMaterial", this.color = new Xe(16777215), this.specular = new Xe(1118481), this.shininess = 30, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Xe(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new Ne(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Qn(), this.combine = 0, this.reflectivity = 1, this.envMapIntensity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.specular.copy(e.specular), this.shininess = e.shininess, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.envMapIntensity = e.envMapIntensity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
  }
}, ic = class extends Si {
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = il, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}, rc = class extends Si {
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
};
function Wi(e, t) {
  return !e || e.constructor === t ? e : typeof t.BYTES_PER_ELEMENT == "number" ? new t(e) : Array.prototype.slice.call(e);
}
var xi = class {
  constructor(e, t, n, i) {
    this.parameterPositions = e, this._cachedIndex = 0, this.resultBuffer = i !== void 0 ? i : new t.constructor(n), this.sampleValues = t, this.valueSize = n, this.settings = null, this.DefaultSettings_ = {};
  }
  evaluate(e) {
    const t = this.parameterPositions;
    let n = this._cachedIndex, i = t[n], r = t[n - 1];
    n: {
      e: {
        let s;
        t: {
          i: if (!(e < i)) {
            for (let a = n + 2; ; ) {
              if (i === void 0) {
                if (e < r) break i;
                return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
              }
              if (n === a) break;
              if (r = i, i = t[++n], e < i) break e;
            }
            s = t.length;
            break t;
          }
          if (!(e >= r)) {
            const a = t[1];
            e < a && (n = 2, r = a);
            for (let o = n - 2; ; ) {
              if (r === void 0)
                return this._cachedIndex = 0, this.copySampleValue_(0);
              if (n === o) break;
              if (i = r, r = t[--n - 1], e >= r) break e;
            }
            s = n, n = 0;
            break t;
          }
          break n;
        }
        for (; n < s; ) {
          const a = n + s >>> 1;
          e < t[a] ? s = a : n = a + 1;
        }
        if (i = t[n], r = t[n - 1], r === void 0)
          return this._cachedIndex = 0, this.copySampleValue_(0);
        if (i === void 0)
          return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
      }
      this._cachedIndex = n, this.intervalChanged_(n, r, i);
    }
    return this.interpolate_(n, r, e, i);
  }
  getSettings_() {
    return this.settings || this.DefaultSettings_;
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, n = this.sampleValues, i = this.valueSize, r = e * i;
    for (let s = 0; s !== i; ++s) t[s] = n[r + s];
    return t;
  }
  interpolate_() {
    throw new Error("call to abstract method");
  }
  intervalChanged_() {
  }
}, sc = class extends xi {
  constructor(e, t, n, i) {
    super(e, t, n, i), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
      endingStart: ps,
      endingEnd: ps
    };
  }
  intervalChanged_(e, t, n) {
    const i = this.parameterPositions;
    let r = e - 2, s = e + 1, a = i[r], o = i[s];
    if (a === void 0) switch (this.getSettings_().endingStart) {
      case ms:
        r = e, a = 2 * t - n;
        break;
      case _s:
        r = i.length - 2, a = t + i[r] - i[r + 1];
        break;
      default:
        r = e, a = n;
    }
    if (o === void 0) switch (this.getSettings_().endingEnd) {
      case ms:
        s = e, o = 2 * n - t;
        break;
      case _s:
        s = 1, o = n + i[1] - i[0];
        break;
      default:
        s = e - 1, o = t;
    }
    const l = (n - t) * 0.5, c = this.valueSize;
    this._weightPrev = l / (t - a), this._weightNext = l / (o - n), this._offsetPrev = r * c, this._offsetNext = s * c;
  }
  interpolate_(e, t, n, i) {
    const r = this.resultBuffer, s = this.sampleValues, a = this.valueSize, o = e * a, l = o - a, c = this._offsetPrev, u = this._offsetNext, d = this._weightPrev, h = this._weightNext, _ = (n - t) / (i - t), M = _ * _, S = M * _, p = -d * S + 2 * d * M - d * _, f = (1 + d) * S + (-1.5 - 2 * d) * M + (-0.5 + d) * _ + 1, y = (-1 - h) * S + (1.5 + h) * M + 0.5 * _, b = h * S - h * M;
    for (let T = 0; T !== a; ++T) r[T] = p * s[c + T] + f * s[l + T] + y * s[o + T] + b * s[u + T];
    return r;
  }
}, ac = class extends xi {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
  interpolate_(e, t, n, i) {
    const r = this.resultBuffer, s = this.sampleValues, a = this.valueSize, o = e * a, l = o - a, c = (n - t) / (i - t), u = 1 - c;
    for (let d = 0; d !== a; ++d) r[d] = s[l + d] * u + s[o + d] * c;
    return r;
  }
}, oc = class extends xi {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
  interpolate_(e) {
    return this.copySampleValue_(e - 1);
  }
}, lc = class extends xi {
  interpolate_(e, t, n, i) {
    const r = this.resultBuffer, s = this.sampleValues, a = this.valueSize, o = e * a, l = o - a, c = this.settings || this.DefaultSettings_, u = c.inTangents, d = c.outTangents;
    if (!u || !d) {
      const M = (n - t) / (i - t), S = 1 - M;
      for (let p = 0; p !== a; ++p) r[p] = s[l + p] * S + s[o + p] * M;
      return r;
    }
    const h = a * 2, _ = e - 1;
    for (let M = 0; M !== a; ++M) {
      const S = s[l + M], p = s[o + M], f = _ * h + M * 2, y = d[f], b = d[f + 1], T = e * h + M * 2, P = u[T], R = u[T + 1];
      let D = (n - t) / (i - t), v, E, X, A, k;
      for (let Y = 0; Y < 8; Y++) {
        v = D * D, E = v * D, X = 1 - D, A = X * X, k = A * X;
        const B = k * t + 3 * A * D * y + 3 * X * v * P + E * i - n;
        if (Math.abs(B) < 1e-10) break;
        const G = 3 * A * (y - t) + 6 * X * D * (P - y) + 3 * v * (i - P);
        if (Math.abs(G) < 1e-10) break;
        D = D - B / G, D = Math.max(0, Math.min(1, D));
      }
      r[M] = k * S + 3 * A * D * b + 3 * X * v * R + E * p;
    }
    return r;
  }
}, Jt = class {
  constructor(e, t, n, i) {
    if (e === void 0) throw new Error("THREE.KeyframeTrack: track name is undefined");
    if (t === void 0 || t.length === 0) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + e);
    this.name = e, this.times = Wi(t, this.TimeBufferType), this.values = Wi(n, this.ValueBufferType), this.setInterpolation(i || this.DefaultInterpolation);
  }
  static toJSON(e) {
    const t = e.constructor;
    let n;
    if (t.toJSON !== this.toJSON) n = t.toJSON(e);
    else {
      n = {
        name: e.name,
        times: Wi(e.times, Array),
        values: Wi(e.values, Array)
      };
      const i = e.getInterpolation();
      i !== e.DefaultInterpolation && (n.interpolation = i);
    }
    return n.type = e.ValueTypeName, n;
  }
  InterpolantFactoryMethodDiscrete(e) {
    return new oc(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodLinear(e) {
    return new ac(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodSmooth(e) {
    return new sc(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodBezier(e) {
    const t = new lc(this.times, this.values, this.getValueSize(), e);
    return this.settings && (t.settings = this.settings), t;
  }
  setInterpolation(e) {
    let t;
    switch (e) {
      case tr:
        t = this.InterpolantFactoryMethodDiscrete;
        break;
      case kr:
        t = this.InterpolantFactoryMethodLinear;
        break;
      case lr:
        t = this.InterpolantFactoryMethodSmooth;
        break;
      case fs:
        t = this.InterpolantFactoryMethodBezier;
        break;
    }
    if (t === void 0) {
      const n = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
      if (this.createInterpolant === void 0) if (e !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);
      else throw new Error(n);
      return Te("KeyframeTrack:", n), this;
    }
    return this.createInterpolant = t, this;
  }
  getInterpolation() {
    switch (this.createInterpolant) {
      case this.InterpolantFactoryMethodDiscrete:
        return tr;
      case this.InterpolantFactoryMethodLinear:
        return kr;
      case this.InterpolantFactoryMethodSmooth:
        return lr;
      case this.InterpolantFactoryMethodBezier:
        return fs;
    }
  }
  getValueSize() {
    return this.values.length / this.times.length;
  }
  shift(e) {
    if (e !== 0) {
      const t = this.times;
      for (let n = 0, i = t.length; n !== i; ++n) t[n] += e;
    }
    return this;
  }
  scale(e) {
    if (e !== 1) {
      const t = this.times;
      for (let n = 0, i = t.length; n !== i; ++n) t[n] *= e;
    }
    return this;
  }
  trim(e, t) {
    const n = this.times, i = n.length;
    let r = 0, s = i - 1;
    for (; r !== i && n[r] < e; ) ++r;
    for (; s !== -1 && n[s] > t; ) --s;
    if (++s, r !== 0 || s !== i) {
      r >= s && (s = Math.max(s, 1), r = s - 1);
      const a = this.getValueSize();
      this.times = n.slice(r, s), this.values = this.values.slice(r * a, s * a);
    }
    return this;
  }
  validate() {
    let e = !0;
    const t = this.getValueSize();
    t - Math.floor(t) !== 0 && (Pe("KeyframeTrack: Invalid value size in track.", this), e = !1);
    const n = this.times, i = this.values, r = n.length;
    r === 0 && (Pe("KeyframeTrack: Track is empty.", this), e = !1);
    let s = null;
    for (let a = 0; a !== r; a++) {
      const o = n[a];
      if (typeof o == "number" && isNaN(o)) {
        Pe("KeyframeTrack: Time is not a valid number.", this, a, o), e = !1;
        break;
      }
      if (s !== null && s > o) {
        Pe("KeyframeTrack: Out of order keys.", this, a, o, s), e = !1;
        break;
      }
      s = o;
    }
    if (i !== void 0 && al(i))
      for (let a = 0, o = i.length; a !== o; ++a) {
        const l = i[a];
        if (isNaN(l)) {
          Pe("KeyframeTrack: Value is not a valid number.", this, a, l), e = !1;
          break;
        }
      }
    return e;
  }
  optimize() {
    const e = this.times.slice(), t = this.values.slice(), n = this.getValueSize(), i = this.getInterpolation() === lr, r = e.length - 1;
    let s = 1;
    for (let a = 1; a < r; ++a) {
      let o = !1;
      const l = e[a];
      if (l !== e[a + 1] && (a !== 1 || l !== e[0])) if (i)
        o = !0;
      else {
        const c = a * n, u = c - n, d = c + n;
        for (let h = 0; h !== n; ++h) {
          const _ = t[c + h];
          if (_ !== t[u + h] || _ !== t[d + h]) {
            o = !0;
            break;
          }
        }
      }
      if (o) {
        if (a !== s) {
          e[s] = e[a];
          const c = a * n, u = s * n;
          for (let d = 0; d !== n; ++d) t[u + d] = t[c + d];
        }
        ++s;
      }
    }
    if (r > 0) {
      e[s] = e[r];
      for (let a = r * n, o = s * n, l = 0; l !== n; ++l) t[o + l] = t[a + l];
      ++s;
    }
    return s !== e.length ? (this.times = e.slice(0, s), this.values = t.slice(0, s * n)) : (this.times = e, this.values = t), this;
  }
  clone() {
    const e = this.times.slice(), t = this.values.slice(), n = this.constructor, i = new n(this.name, e, t);
    return i.createInterpolant = this.createInterpolant, i;
  }
};
Jt.prototype.ValueTypeName = "";
Jt.prototype.TimeBufferType = Float32Array;
Jt.prototype.ValueBufferType = Float32Array;
Jt.prototype.DefaultInterpolation = kr;
var Ei = class extends Jt {
  constructor(e, t, n) {
    super(e, t, n);
  }
};
Ei.prototype.ValueTypeName = "bool";
Ei.prototype.ValueBufferType = Array;
Ei.prototype.DefaultInterpolation = tr;
Ei.prototype.InterpolantFactoryMethodLinear = void 0;
Ei.prototype.InterpolantFactoryMethodSmooth = void 0;
var cc = class extends Jt {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
};
cc.prototype.ValueTypeName = "color";
var hc = class extends Jt {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
};
hc.prototype.ValueTypeName = "number";
var uc = class extends xi {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
  interpolate_(e, t, n, i) {
    const r = this.resultBuffer, s = this.sampleValues, a = this.valueSize, o = (n - t) / (i - t);
    let l = e * a;
    for (let c = l + a; l !== c; l += 4) on.slerpFlat(r, 0, s, l - a, s, l, o);
    return r;
  }
}, Ha = class extends Jt {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
  InterpolantFactoryMethodLinear(e) {
    return new uc(this.times, this.values, this.getValueSize(), e);
  }
};
Ha.prototype.ValueTypeName = "quaternion";
Ha.prototype.InterpolantFactoryMethodSmooth = void 0;
var yi = class extends Jt {
  constructor(e, t, n) {
    super(e, t, n);
  }
};
yi.prototype.ValueTypeName = "string";
yi.prototype.ValueBufferType = Array;
yi.prototype.DefaultInterpolation = tr;
yi.prototype.InterpolantFactoryMethodLinear = void 0;
yi.prototype.InterpolantFactoryMethodSmooth = void 0;
var dc = class extends Jt {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
};
dc.prototype.ValueTypeName = "vector";
var Dr = {
  enabled: !1,
  files: {},
  add: function(e, t) {
    this.enabled !== !1 && (Ns(e) || (this.files[e] = t));
  },
  get: function(e) {
    if (this.enabled !== !1 && !Ns(e))
      return this.files[e];
  },
  remove: function(e) {
    delete this.files[e];
  },
  clear: function() {
    this.files = {};
  }
};
function Ns(e) {
  try {
    const t = e.slice(e.indexOf(":") + 1);
    return new URL(t).protocol === "blob:";
  } catch {
    return !1;
  }
}
var fc = class {
  constructor(e, t, n) {
    const i = this;
    let r = !1, s = 0, a = 0, o;
    const l = [];
    this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = n, this._abortController = null, this.itemStart = function(c) {
      a++, r === !1 && i.onStart !== void 0 && i.onStart(c, s, a), r = !0;
    }, this.itemEnd = function(c) {
      s++, i.onProgress !== void 0 && i.onProgress(c, s, a), s === a && (r = !1, i.onLoad !== void 0 && i.onLoad());
    }, this.itemError = function(c) {
      i.onError !== void 0 && i.onError(c);
    }, this.resolveURL = function(c) {
      return o ? o(c) : c;
    }, this.setURLModifier = function(c) {
      return o = c, this;
    }, this.addHandler = function(c, u) {
      return l.push(c, u), this;
    }, this.removeHandler = function(c) {
      const u = l.indexOf(c);
      return u !== -1 && l.splice(u, 2), this;
    }, this.getHandler = function(c) {
      for (let u = 0, d = l.length; u < d; u += 2) {
        const h = l[u], _ = l[u + 1];
        if (h.global && (h.lastIndex = 0), h.test(c)) return _;
      }
      return null;
    }, this.abort = function() {
      return this.abortController.abort(), this._abortController = null, this;
    };
  }
  get abortController() {
    return this._abortController || (this._abortController = new AbortController()), this._abortController;
  }
}, pc = /* @__PURE__ */ new fc(), ts = class {
  constructor(e) {
    this.manager = e !== void 0 ? e : pc, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {}, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  load() {
  }
  loadAsync(e, t) {
    const n = this;
    return new Promise(function(i, r) {
      n.load(e, i, t, r);
    });
  }
  parse() {
  }
  setCrossOrigin(e) {
    return this.crossOrigin = e, this;
  }
  setWithCredentials(e) {
    return this.withCredentials = e, this;
  }
  setPath(e) {
    return this.path = e, this;
  }
  setResourcePath(e) {
    return this.resourcePath = e, this;
  }
  setRequestHeader(e) {
    return this.requestHeader = e, this;
  }
  abort() {
    return this;
  }
};
ts.DEFAULT_MATERIAL_NAME = "__DEFAULT";
var Gn = /* @__PURE__ */ new WeakMap(), mc = class extends ts {
  constructor(e) {
    super(e);
  }
  load(e, t, n, i) {
    this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
    const r = this, s = Dr.get(`image:${e}`);
    if (s !== void 0) {
      if (s.complete === !0)
        r.manager.itemStart(e), setTimeout(function() {
          t && t(s), r.manager.itemEnd(e);
        }, 0);
      else {
        let u = Gn.get(s);
        u === void 0 && (u = [], Gn.set(s, u)), u.push({
          onLoad: t,
          onError: i
        });
      }
      return s;
    }
    const a = gi("img");
    function o() {
      c(), t && t(this);
      const u = Gn.get(this) || [];
      for (let d = 0; d < u.length; d++) {
        const h = u[d];
        h.onLoad && h.onLoad(this);
      }
      Gn.delete(this), r.manager.itemEnd(e);
    }
    function l(u) {
      c(), i && i(u), Dr.remove(`image:${e}`);
      const d = Gn.get(this) || [];
      for (let h = 0; h < d.length; h++) {
        const _ = d[h];
        _.onError && _.onError(u);
      }
      Gn.delete(this), r.manager.itemError(e), r.manager.itemEnd(e);
    }
    function c() {
      a.removeEventListener("load", o, !1), a.removeEventListener("error", l, !1);
    }
    return a.addEventListener("load", o, !1), a.addEventListener("error", l, !1), e.slice(0, 5) !== "data:" && this.crossOrigin !== void 0 && (a.crossOrigin = this.crossOrigin), Dr.add(`image:${e}`, a), r.manager.itemStart(e), a.src = e, a;
  }
}, _c = class extends ts {
  constructor(e) {
    super(e);
  }
  load(e, t, n, i) {
    const r = new Ot(), s = new mc(this.manager);
    return s.setCrossOrigin(this.crossOrigin), s.setPath(this.path), s.load(e, function(a) {
      r.image = a, r.needsUpdate = !0, t !== void 0 && t(r);
    }, n, i), r;
  }
}, ka = class extends Nt {
  constructor(e, t = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new Xe(e), this.intensity = t;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  copy(e, t) {
    return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, t;
  }
}, Ir = /* @__PURE__ */ new ft(), Os = /* @__PURE__ */ new O(), Fs = /* @__PURE__ */ new O(), gc = class {
  constructor(e) {
    this.camera = e, this.intensity = 1, this.bias = 0, this.biasNode = null, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new Ne(512, 512), this.mapType = vn, this.map = null, this.mapPass = null, this.matrix = new ft(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new Qr(), this._frameExtents = new Ne(1, 1), this._viewportCount = 1, this._viewports = [new ht(0, 0, 1, 1)];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(e) {
    const t = this.camera, n = this.matrix;
    Os.setFromMatrixPosition(e.matrixWorld), t.position.copy(Os), Fs.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(Fs), t.updateMatrixWorld(), Ir.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), this._frustum.setFromProjectionMatrix(Ir, t.coordinateSystem, t.reversedDepth), t.coordinateSystem === 2001 || t.reversedDepth ? n.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 1, 0, 0, 0, 0, 1) : n.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1), n.multiply(Ir);
  }
  getViewport(e) {
    return this._viewports[e];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  copy(e) {
    return this.camera = e.camera.clone(), this.intensity = e.intensity, this.bias = e.bias, this.radius = e.radius, this.autoUpdate = e.autoUpdate, this.needsUpdate = e.needsUpdate, this.normalBias = e.normalBias, this.blurSamples = e.blurSamples, this.mapSize.copy(e.mapSize), this.biasNode = e.biasNode, this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const e = {};
    return this.intensity !== 1 && (e.intensity = this.intensity), this.bias !== 0 && (e.bias = this.bias), this.normalBias !== 0 && (e.normalBias = this.normalBias), this.radius !== 1 && (e.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (e.mapSize = this.mapSize.toArray()), e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e;
  }
}, Xi = /* @__PURE__ */ new O(), Yi = /* @__PURE__ */ new on(), Xt = /* @__PURE__ */ new O(), Wa = class extends Nt {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new ft(), this.projectionMatrix = new ft(), this.projectionMatrixInverse = new ft(), this.coordinateSystem = $n, this._reversedDepth = !1;
  }
  get reversedDepth() {
    return this._reversedDepth;
  }
  copy(e, t) {
    return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
  }
  getWorldDirection(e) {
    return super.getWorldDirection(e).negate();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.matrixWorld.decompose(Xi, Yi, Xt), Xt.x === 1 && Xt.y === 1 && Xt.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(Xi, Yi, Xt.set(1, 1, 1)).invert();
  }
  updateWorldMatrix(e, t) {
    super.updateWorldMatrix(e, t), this.matrixWorld.decompose(Xi, Yi, Xt), Xt.x === 1 && Xt.y === 1 && Xt.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(Xi, Yi, Xt.set(1, 1, 1)).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, mn = /* @__PURE__ */ new O(), Bs = /* @__PURE__ */ new Ne(), zs = /* @__PURE__ */ new Ne(), Ut = class extends Wa {
  constructor(e = 50, t = 1, n = 0.1, i = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = n, this.far = i, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  setFocalLength(e) {
    const t = 0.5 * this.getFilmHeight() / e;
    this.fov = vi * 2 * Math.atan(t), this.updateProjectionMatrix();
  }
  getFocalLength() {
    const e = Math.tan(fi * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  getEffectiveFOV() {
    return vi * 2 * Math.atan(Math.tan(fi * 0.5 * this.fov) / this.zoom);
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  getViewBounds(e, t, n) {
    mn.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), t.set(mn.x, mn.y).multiplyScalar(-e / mn.z), mn.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), n.set(mn.x, mn.y).multiplyScalar(-e / mn.z);
  }
  getViewSize(e, t) {
    return this.getViewBounds(e, Bs, zs), t.subVectors(zs, Bs);
  }
  setViewOffset(e, t, n, i, r, s) {
    this.aspect = e / t, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = i, this.view.width = r, this.view.height = s, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = this.near;
    let t = e * Math.tan(fi * 0.5 * this.fov) / this.zoom, n = 2 * t, i = this.aspect * n, r = -0.5 * i;
    const s = this.view;
    if (this.view !== null && this.view.enabled) {
      const o = s.fullWidth, l = s.fullHeight;
      r += s.offsetX * i / o, t -= s.offsetY * n / l, i *= s.width / o, n *= s.height / l;
    }
    const a = this.filmOffset;
    a !== 0 && (r += e * a / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + i, t, t - n, e, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
  }
}, ns = class extends Wa {
  constructor(e = -1, t = 1, n = 1, i = -1, r = 0.1, s = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = i, this.near = r, this.far = s, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
  }
  setViewOffset(e, t, n, i, r, s) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = i, this.view.width = r, this.view.height = s, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, i = (this.top + this.bottom) / 2;
    let r = n - e, s = n + e, a = i + t, o = i - t;
    if (this.view !== null && this.view.enabled) {
      const l = (this.right - this.left) / this.view.fullWidth / this.zoom, c = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      r += l * this.view.offsetX, s = r + l * this.view.width, a -= c * this.view.offsetY, o = a - c * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(r, s, a, o, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
  }
}, vc = class extends gc {
  constructor() {
    super(new ns(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = !0;
  }
}, Vs = class extends ka {
  constructor(e, t) {
    super(e, t), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(Nt.DEFAULT_UP), this.updateMatrix(), this.target = new Nt(), this.shadow = new vc();
  }
  dispose() {
    super.dispose(), this.shadow.dispose();
  }
  copy(e) {
    return super.copy(e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.shadow = this.shadow.toJSON(), t.object.target = this.target.uuid, t;
  }
}, Mc = class extends ka {
  constructor(e, t) {
    super(e, t), this.isAmbientLight = !0, this.type = "AmbientLight";
  }
}, Hn = -90, kn = 1, Sc = class extends Nt {
  constructor(e, t, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const i = new Ut(Hn, kn, e, t);
    i.layers = this.layers, this.add(i);
    const r = new Ut(Hn, kn, e, t);
    r.layers = this.layers, this.add(r);
    const s = new Ut(Hn, kn, e, t);
    s.layers = this.layers, this.add(s);
    const a = new Ut(Hn, kn, e, t);
    a.layers = this.layers, this.add(a);
    const o = new Ut(Hn, kn, e, t);
    o.layers = this.layers, this.add(o);
    const l = new Ut(Hn, kn, e, t);
    l.layers = this.layers, this.add(l);
  }
  updateCoordinateSystem() {
    const e = this.coordinateSystem, t = this.children.concat(), [n, i, r, s, a, o] = t;
    for (const l of t) this.remove(l);
    if (e === 2e3)
      n.up.set(0, 1, 0), n.lookAt(1, 0, 0), i.up.set(0, 1, 0), i.lookAt(-1, 0, 0), r.up.set(0, 0, -1), r.lookAt(0, 1, 0), s.up.set(0, 0, 1), s.lookAt(0, -1, 0), a.up.set(0, 1, 0), a.lookAt(0, 0, 1), o.up.set(0, 1, 0), o.lookAt(0, 0, -1);
    else if (e === 2001)
      n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), i.up.set(0, -1, 0), i.lookAt(1, 0, 0), r.up.set(0, 0, 1), r.lookAt(0, 1, 0), s.up.set(0, 0, -1), s.lookAt(0, -1, 0), a.up.set(0, -1, 0), a.lookAt(0, 0, 1), o.up.set(0, -1, 0), o.lookAt(0, 0, -1);
    else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
    for (const l of t)
      this.add(l), l.updateMatrixWorld();
  }
  update(e, t) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: i } = this;
    this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
    const [r, s, a, o, l, c] = this.children, u = e.getRenderTarget(), d = e.getActiveCubeFace(), h = e.getActiveMipmapLevel(), _ = e.xr.enabled;
    e.xr.enabled = !1;
    const M = n.texture.generateMipmaps;
    n.texture.generateMipmaps = !1;
    let S = !1;
    e.isWebGLRenderer === !0 ? S = e.state.buffers.depth.getReversed() : S = e.reversedDepthBuffer, e.setRenderTarget(n, 0, i), S && e.autoClear === !1 && e.clearDepth(), e.render(t, r), e.setRenderTarget(n, 1, i), S && e.autoClear === !1 && e.clearDepth(), e.render(t, s), e.setRenderTarget(n, 2, i), S && e.autoClear === !1 && e.clearDepth(), e.render(t, a), e.setRenderTarget(n, 3, i), S && e.autoClear === !1 && e.clearDepth(), e.render(t, o), e.setRenderTarget(n, 4, i), S && e.autoClear === !1 && e.clearDepth(), e.render(t, l), n.texture.generateMipmaps = M, e.setRenderTarget(n, 5, i), S && e.autoClear === !1 && e.clearDepth(), e.render(t, c), e.setRenderTarget(u, d, h), e.xr.enabled = _, n.texture.needsPMREMUpdate = !0;
  }
}, xc = class extends Ut {
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = e;
  }
}, Ec = "\\[\\]\\.:\\/", yc = /* @__PURE__ */ new RegExp("[\\[\\]\\.:\\/]", "g"), is = "[^\\[\\]\\.:\\/]", Tc = "[^" + Ec.replace("\\.", "") + "]", bc = /* @__PURE__ */ /((?:WC+[\/:])*)/.source.replace("WC", is), Ac = /* @__PURE__ */ /(WCOD+)?/.source.replace("WCOD", Tc), Rc = /* @__PURE__ */ /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", is), wc = /* @__PURE__ */ /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", is), Cc = new RegExp("^" + bc + Ac + Rc + wc + "$"), Pc = [
  "material",
  "materials",
  "bones",
  "map"
], Lc = class {
  constructor(e, t, n) {
    const i = n || st.parseTrackName(t);
    this._targetGroup = e, this._bindings = e.subscribe_(t, i);
  }
  getValue(e, t) {
    this.bind();
    const n = this._targetGroup.nCachedObjects_, i = this._bindings[n];
    i !== void 0 && i.getValue(e, t);
  }
  setValue(e, t) {
    const n = this._bindings;
    for (let i = this._targetGroup.nCachedObjects_, r = n.length; i !== r; ++i) n[i].setValue(e, t);
  }
  bind() {
    const e = this._bindings;
    for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].bind();
  }
  unbind() {
    const e = this._bindings;
    for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].unbind();
  }
}, st = class qn {
  constructor(t, n, i) {
    this.path = n, this.parsedPath = i || qn.parseTrackName(n), this.node = qn.findNode(t, this.parsedPath.nodeName), this.rootNode = t, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
  static create(t, n, i) {
    return t && t.isAnimationObjectGroup ? new qn.Composite(t, n, i) : new qn(t, n, i);
  }
  static sanitizeNodeName(t) {
    return t.replace(/\s/g, "_").replace(yc, "");
  }
  static parseTrackName(t) {
    const n = Cc.exec(t);
    if (n === null) throw new Error("PropertyBinding: Cannot parse trackName: " + t);
    const i = {
      nodeName: n[2],
      objectName: n[3],
      objectIndex: n[4],
      propertyName: n[5],
      propertyIndex: n[6]
    }, r = i.nodeName && i.nodeName.lastIndexOf(".");
    if (r !== void 0 && r !== -1) {
      const s = i.nodeName.substring(r + 1);
      Pc.indexOf(s) !== -1 && (i.nodeName = i.nodeName.substring(0, r), i.objectName = s);
    }
    if (i.propertyName === null || i.propertyName.length === 0) throw new Error("PropertyBinding: can not parse propertyName from trackName: " + t);
    return i;
  }
  static findNode(t, n) {
    if (n === void 0 || n === "" || n === "." || n === -1 || n === t.name || n === t.uuid) return t;
    if (t.skeleton) {
      const i = t.skeleton.getBoneByName(n);
      if (i !== void 0) return i;
    }
    if (t.children) {
      const i = function(s) {
        for (let a = 0; a < s.length; a++) {
          const o = s[a];
          if (o.name === n || o.uuid === n) return o;
          const l = i(o.children);
          if (l) return l;
        }
        return null;
      }, r = i(t.children);
      if (r) return r;
    }
    return null;
  }
  _getValue_unavailable() {
  }
  _setValue_unavailable() {
  }
  _getValue_direct(t, n) {
    t[n] = this.targetObject[this.propertyName];
  }
  _getValue_array(t, n) {
    const i = this.resolvedProperty;
    for (let r = 0, s = i.length; r !== s; ++r) t[n++] = i[r];
  }
  _getValue_arrayElement(t, n) {
    t[n] = this.resolvedProperty[this.propertyIndex];
  }
  _getValue_toArray(t, n) {
    this.resolvedProperty.toArray(t, n);
  }
  _setValue_direct(t, n) {
    this.targetObject[this.propertyName] = t[n];
  }
  _setValue_direct_setNeedsUpdate(t, n) {
    this.targetObject[this.propertyName] = t[n], this.targetObject.needsUpdate = !0;
  }
  _setValue_direct_setMatrixWorldNeedsUpdate(t, n) {
    this.targetObject[this.propertyName] = t[n], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_array(t, n) {
    const i = this.resolvedProperty;
    for (let r = 0, s = i.length; r !== s; ++r) i[r] = t[n++];
  }
  _setValue_array_setNeedsUpdate(t, n) {
    const i = this.resolvedProperty;
    for (let r = 0, s = i.length; r !== s; ++r) i[r] = t[n++];
    this.targetObject.needsUpdate = !0;
  }
  _setValue_array_setMatrixWorldNeedsUpdate(t, n) {
    const i = this.resolvedProperty;
    for (let r = 0, s = i.length; r !== s; ++r) i[r] = t[n++];
    this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_arrayElement(t, n) {
    this.resolvedProperty[this.propertyIndex] = t[n];
  }
  _setValue_arrayElement_setNeedsUpdate(t, n) {
    this.resolvedProperty[this.propertyIndex] = t[n], this.targetObject.needsUpdate = !0;
  }
  _setValue_arrayElement_setMatrixWorldNeedsUpdate(t, n) {
    this.resolvedProperty[this.propertyIndex] = t[n], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_fromArray(t, n) {
    this.resolvedProperty.fromArray(t, n);
  }
  _setValue_fromArray_setNeedsUpdate(t, n) {
    this.resolvedProperty.fromArray(t, n), this.targetObject.needsUpdate = !0;
  }
  _setValue_fromArray_setMatrixWorldNeedsUpdate(t, n) {
    this.resolvedProperty.fromArray(t, n), this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _getValue_unbound(t, n) {
    this.bind(), this.getValue(t, n);
  }
  _setValue_unbound(t, n) {
    this.bind(), this.setValue(t, n);
  }
  bind() {
    let t = this.node;
    const n = this.parsedPath, i = n.objectName, r = n.propertyName;
    let s = n.propertyIndex;
    if (t || (t = qn.findNode(this.rootNode, n.nodeName), this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t) {
      Te("PropertyBinding: No target node found for track: " + this.path + ".");
      return;
    }
    if (i) {
      let c = n.objectIndex;
      switch (i) {
        case "materials":
          if (!t.material) {
            Pe("PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!t.material.materials) {
            Pe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
            return;
          }
          t = t.material.materials;
          break;
        case "bones":
          if (!t.skeleton) {
            Pe("PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
            return;
          }
          t = t.skeleton.bones;
          for (let u = 0; u < t.length; u++) if (t[u].name === c) {
            c = u;
            break;
          }
          break;
        case "map":
          if ("map" in t) {
            t = t.map;
            break;
          }
          if (!t.material) {
            Pe("PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!t.material.map) {
            Pe("PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
            return;
          }
          t = t.material.map;
          break;
        default:
          if (t[i] === void 0) {
            Pe("PropertyBinding: Can not bind to objectName of node undefined.", this);
            return;
          }
          t = t[i];
      }
      if (c !== void 0) {
        if (t[c] === void 0) {
          Pe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, t);
          return;
        }
        t = t[c];
      }
    }
    const a = t[r];
    if (a === void 0) {
      const c = n.nodeName;
      Pe("PropertyBinding: Trying to update property for track: " + c + "." + r + " but it wasn't found.", t);
      return;
    }
    let o = this.Versioning.None;
    this.targetObject = t, t.isMaterial === !0 ? o = this.Versioning.NeedsUpdate : t.isObject3D === !0 && (o = this.Versioning.MatrixWorldNeedsUpdate);
    let l = this.BindingType.Direct;
    if (s !== void 0) {
      if (r === "morphTargetInfluences") {
        if (!t.geometry) {
          Pe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
          return;
        }
        if (!t.geometry.morphAttributes) {
          Pe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
          return;
        }
        t.morphTargetDictionary[s] !== void 0 && (s = t.morphTargetDictionary[s]);
      }
      l = this.BindingType.ArrayElement, this.resolvedProperty = a, this.propertyIndex = s;
    } else a.fromArray !== void 0 && a.toArray !== void 0 ? (l = this.BindingType.HasFromToArray, this.resolvedProperty = a) : Array.isArray(a) ? (l = this.BindingType.EntireArray, this.resolvedProperty = a) : this.propertyName = r;
    this.getValue = this.GetterByBindingType[l], this.setValue = this.SetterByBindingTypeAndVersioning[l][o];
  }
  unbind() {
    this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
};
st.Composite = Lc;
st.prototype.BindingType = {
  Direct: 0,
  EntireArray: 1,
  ArrayElement: 2,
  HasFromToArray: 3
};
st.prototype.Versioning = {
  None: 0,
  NeedsUpdate: 1,
  MatrixWorldNeedsUpdate: 2
};
st.prototype.GetterByBindingType = [
  st.prototype._getValue_direct,
  st.prototype._getValue_array,
  st.prototype._getValue_arrayElement,
  st.prototype._getValue_toArray
];
st.prototype.SetterByBindingTypeAndVersioning = [
  [
    st.prototype._setValue_direct,
    st.prototype._setValue_direct_setNeedsUpdate,
    st.prototype._setValue_direct_setMatrixWorldNeedsUpdate
  ],
  [
    st.prototype._setValue_array,
    st.prototype._setValue_array_setNeedsUpdate,
    st.prototype._setValue_array_setMatrixWorldNeedsUpdate
  ],
  [
    st.prototype._setValue_arrayElement,
    st.prototype._setValue_arrayElement_setNeedsUpdate,
    st.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
  ],
  [
    st.prototype._setValue_fromArray,
    st.prototype._setValue_fromArray_setNeedsUpdate,
    st.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
  ]
];
var Gs = class {
  constructor(e = 1, t = 0, n = 0) {
    this.radius = e, this.phi = t, this.theta = n;
  }
  set(e, t, n) {
    return this.radius = e, this.phi = t, this.theta = n, this;
  }
  copy(e) {
    return this.radius = e.radius, this.phi = e.phi, this.theta = e.theta, this;
  }
  makeSafe() {
    return this.phi = Be(this.phi, 1e-6, Math.PI - 1e-6), this;
  }
  setFromVector3(e) {
    return this.setFromCartesianCoords(e.x, e.y, e.z);
  }
  setFromCartesianCoords(e, t, n) {
    return this.radius = Math.sqrt(e * e + t * t + n * n), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(e, n), this.phi = Math.acos(Be(t / this.radius, -1, 1))), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}, cd = class Xa {
  static {
    Xa.prototype.isMatrix2 = !0;
  }
  constructor(t, n, i, r) {
    this.elements = [
      1,
      0,
      0,
      1
    ], t !== void 0 && this.set(t, n, i, r);
  }
  identity() {
    return this.set(1, 0, 0, 1), this;
  }
  fromArray(t, n = 0) {
    for (let i = 0; i < 4; i++) this.elements[i] = t[i + n];
    return this;
  }
  set(t, n, i, r) {
    const s = this.elements;
    return s[0] = t, s[2] = n, s[1] = i, s[3] = r, this;
  }
}, Dc = class extends Mn {
  constructor(e, t = null) {
    super(), this.object = e, this.domElement = t, this.enabled = !0, this.state = -1, this.keys = {}, this.mouseButtons = {
      LEFT: null,
      MIDDLE: null,
      RIGHT: null
    }, this.touches = {
      ONE: null,
      TWO: null
    };
  }
  connect(e) {
    if (e === void 0) {
      Te("Controls: connect() now requires an element.");
      return;
    }
    this.domElement !== null && this.disconnect(), this.domElement = e;
  }
  disconnect() {
  }
  dispose() {
  }
  update() {
  }
};
function Hs(e, t, n, i) {
  const r = Ic(i);
  switch (n) {
    case vo:
      return e * t;
    case So:
      return e * t / r.components * r.byteLength;
    case Ma:
      return e * t / r.components * r.byteLength;
    case er:
      return e * t * 2 / r.components * r.byteLength;
    case Sa:
      return e * t * 2 / r.components * r.byteLength;
    case Mo:
      return e * t * 3 / r.components * r.byteLength;
    case mi:
      return e * t * 4 / r.components * r.byteLength;
    case xa:
      return e * t * 4 / r.components * r.byteLength;
    case xo:
    case Eo:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case yo:
    case To:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Ao:
    case wo:
      return Math.max(e, 16) * Math.max(t, 8) / 4;
    case bo:
    case Ro:
      return Math.max(e, 8) * Math.max(t, 8) / 2;
    case Co:
    case Po:
    case Do:
    case Io:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case Lo:
    case Uo:
    case No:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Oo:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Fo:
      return Math.floor((e + 4) / 5) * Math.floor((t + 3) / 4) * 16;
    case Bo:
      return Math.floor((e + 4) / 5) * Math.floor((t + 4) / 5) * 16;
    case zo:
      return Math.floor((e + 5) / 6) * Math.floor((t + 4) / 5) * 16;
    case Vo:
      return Math.floor((e + 5) / 6) * Math.floor((t + 5) / 6) * 16;
    case Go:
      return Math.floor((e + 7) / 8) * Math.floor((t + 4) / 5) * 16;
    case Ho:
      return Math.floor((e + 7) / 8) * Math.floor((t + 5) / 6) * 16;
    case ko:
      return Math.floor((e + 7) / 8) * Math.floor((t + 7) / 8) * 16;
    case Wo:
      return Math.floor((e + 9) / 10) * Math.floor((t + 4) / 5) * 16;
    case Xo:
      return Math.floor((e + 9) / 10) * Math.floor((t + 5) / 6) * 16;
    case Yo:
      return Math.floor((e + 9) / 10) * Math.floor((t + 7) / 8) * 16;
    case qo:
      return Math.floor((e + 9) / 10) * Math.floor((t + 9) / 10) * 16;
    case jo:
      return Math.floor((e + 11) / 12) * Math.floor((t + 9) / 10) * 16;
    case Ko:
      return Math.floor((e + 11) / 12) * Math.floor((t + 11) / 12) * 16;
    case Zo:
    case $o:
    case Jo:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
    case Qo:
    case el:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 8;
    case tl:
    case nl:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
  }
  throw new Error(`Unable to determine texture byte length for ${n} format.`);
}
function Ic(e) {
  switch (e) {
    case vn:
    case fo:
      return {
        byteLength: 1,
        components: 1
      };
    case pa:
    case po:
    case wn:
      return {
        byteLength: 2,
        components: 1
      };
    case ma:
    case _a:
      return {
        byteLength: 2,
        components: 4
      };
    case Rn:
    case mo:
    case rr:
      return {
        byteLength: 4,
        components: 1
      };
    case _o:
    case go:
      return {
        byteLength: 4,
        components: 3
      };
  }
  throw new Error(`Unknown texture type ${e}.`);
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: "184" } }));
typeof window < "u" && (window.__THREE__ ? Te("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "184");
function Ya() {
  let e = null, t = !1, n = null, i = null;
  function r(s, a) {
    n(s, a), i = e.requestAnimationFrame(r);
  }
  return {
    start: function() {
      t !== !0 && n !== null && e !== null && (i = e.requestAnimationFrame(r), t = !0);
    },
    stop: function() {
      e !== null && e.cancelAnimationFrame(i), t = !1;
    },
    setAnimationLoop: function(s) {
      n = s;
    },
    setContext: function(s) {
      e = s;
    }
  };
}
function Uc(e) {
  const t = /* @__PURE__ */ new WeakMap();
  function n(o, l) {
    const c = o.array, u = o.usage, d = c.byteLength, h = e.createBuffer();
    e.bindBuffer(l, h), e.bufferData(l, c, u), o.onUploadCallback();
    let _;
    if (c instanceof Float32Array) _ = e.FLOAT;
    else if (typeof Float16Array < "u" && c instanceof Float16Array) _ = e.HALF_FLOAT;
    else if (c instanceof Uint16Array) o.isFloat16BufferAttribute ? _ = e.HALF_FLOAT : _ = e.UNSIGNED_SHORT;
    else if (c instanceof Int16Array) _ = e.SHORT;
    else if (c instanceof Uint32Array) _ = e.UNSIGNED_INT;
    else if (c instanceof Int32Array) _ = e.INT;
    else if (c instanceof Int8Array) _ = e.BYTE;
    else if (c instanceof Uint8Array) _ = e.UNSIGNED_BYTE;
    else if (c instanceof Uint8ClampedArray) _ = e.UNSIGNED_BYTE;
    else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + c);
    return {
      buffer: h,
      type: _,
      bytesPerElement: c.BYTES_PER_ELEMENT,
      version: o.version,
      size: d
    };
  }
  function i(o, l, c) {
    const u = l.array, d = l.updateRanges;
    if (e.bindBuffer(c, o), d.length === 0) e.bufferSubData(c, 0, u);
    else {
      d.sort((_, M) => _.start - M.start);
      let h = 0;
      for (let _ = 1; _ < d.length; _++) {
        const M = d[h], S = d[_];
        S.start <= M.start + M.count + 1 ? M.count = Math.max(M.count, S.start + S.count - M.start) : (++h, d[h] = S);
      }
      d.length = h + 1;
      for (let _ = 0, M = d.length; _ < M; _++) {
        const S = d[_];
        e.bufferSubData(c, S.start * u.BYTES_PER_ELEMENT, u, S.start, S.count);
      }
      l.clearUpdateRanges();
    }
    l.onUploadCallback();
  }
  function r(o) {
    return o.isInterleavedBufferAttribute && (o = o.data), t.get(o);
  }
  function s(o) {
    o.isInterleavedBufferAttribute && (o = o.data);
    const l = t.get(o);
    l && (e.deleteBuffer(l.buffer), t.delete(o));
  }
  function a(o, l) {
    if (o.isInterleavedBufferAttribute && (o = o.data), o.isGLBufferAttribute) {
      const u = t.get(o);
      (!u || u.version < o.version) && t.set(o, {
        buffer: o.buffer,
        type: o.type,
        bytesPerElement: o.elementSize,
        version: o.version
      });
      return;
    }
    const c = t.get(o);
    if (c === void 0) t.set(o, n(o, l));
    else if (c.version < o.version) {
      if (c.size !== o.array.byteLength) throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      i(c.buffer, o, l), c.version = o.version;
    }
  }
  return {
    get: r,
    remove: s,
    update: a
  };
}
var Ue = {
  alphahash_fragment: `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,
  alphahash_pars_fragment: `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,
  alphamap_fragment: `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,
  alphamap_pars_fragment: `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
  alphatest_fragment: `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,
  alphatest_pars_fragment: `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,
  aomap_fragment: `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,
  aomap_pars_fragment: `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,
  batching_pars_vertex: `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,
  batching_vertex: `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,
  begin_vertex: `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,
  beginnormal_vertex: `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,
  bsdfs: `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,
  iridescence_fragment: `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,
  bumpmap_pars_fragment: `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,
  clipping_planes_fragment: `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,
  clipping_planes_pars_fragment: `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,
  clipping_planes_pars_vertex: `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,
  clipping_planes_vertex: `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,
  color_fragment: `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,
  color_pars_fragment: `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,
  color_pars_vertex: `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,
  color_vertex: `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,
  common: `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,
  cube_uv_reflection_fragment: `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,
  defaultnormal_vertex: `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,
  displacementmap_pars_vertex: `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,
  displacementmap_vertex: `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,
  emissivemap_fragment: `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,
  emissivemap_pars_fragment: `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,
  colorspace_fragment: "gl_FragColor = linearToOutputTexel( gl_FragColor );",
  colorspace_pars_fragment: `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,
  envmap_fragment: `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,
  envmap_common_pars_fragment: `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,
  envmap_pars_fragment: `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,
  envmap_pars_vertex: `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,
  envmap_physical_pars_fragment: `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,
  envmap_vertex: `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,
  fog_vertex: `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,
  fog_pars_vertex: `#ifdef USE_FOG
	varying float vFogDepth;
#endif`,
  fog_fragment: `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,
  fog_pars_fragment: `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,
  gradientmap_pars_fragment: `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,
  lightmap_pars_fragment: `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,
  lights_lambert_fragment: `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,
  lights_lambert_pars_fragment: `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,
  lights_pars_begin: `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,
  lights_toon_fragment: `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,
  lights_toon_pars_fragment: `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,
  lights_phong_fragment: `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,
  lights_phong_pars_fragment: `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,
  lights_physical_fragment: `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,
  lights_physical_pars_fragment: `uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,
  lights_fragment_begin: `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,
  lights_fragment_maps: `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,
  lights_fragment_end: `#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,
  lightprobes_pars_fragment: `#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,
  logdepthbuf_fragment: `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,
  logdepthbuf_pars_fragment: `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
  logdepthbuf_pars_vertex: `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,
  logdepthbuf_vertex: `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,
  map_fragment: `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,
  map_pars_fragment: `#ifdef USE_MAP
	uniform sampler2D map;
#endif`,
  map_particle_fragment: `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,
  map_particle_pars_fragment: `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,
  metalnessmap_fragment: `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,
  metalnessmap_pars_fragment: `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,
  morphinstance_vertex: `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,
  morphcolor_vertex: `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,
  morphnormal_vertex: `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,
  morphtarget_pars_vertex: `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,
  morphtarget_vertex: `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,
  normal_fragment_begin: `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,
  normal_fragment_maps: `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,
  normal_pars_fragment: `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
  normal_pars_vertex: `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,
  normal_vertex: `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,
  normalmap_pars_fragment: `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,
  clearcoat_normal_fragment_begin: `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,
  clearcoat_normal_fragment_maps: `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,
  clearcoat_pars_fragment: `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,
  iridescence_pars_fragment: `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,
  opaque_fragment: `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,
  packing: `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,
  premultiplied_alpha_fragment: `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,
  project_vertex: `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,
  dithering_fragment: `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,
  dithering_pars_fragment: `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,
  roughnessmap_fragment: `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,
  roughnessmap_pars_fragment: `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,
  shadowmap_pars_fragment: `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,
  shadowmap_pars_vertex: `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,
  shadowmap_vertex: `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,
  shadowmask_pars_fragment: `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,
  skinbase_vertex: `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,
  skinning_pars_vertex: `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,
  skinning_vertex: `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,
  skinnormal_vertex: `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,
  specularmap_fragment: `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,
  specularmap_pars_fragment: `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,
  tonemapping_fragment: `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,
  tonemapping_pars_fragment: `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,
  transmission_fragment: `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,
  transmission_pars_fragment: `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,
  uv_pars_fragment: `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
  uv_pars_vertex: `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,
  uv_vertex: `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,
  worldpos_vertex: `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,
  background_vert: `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,
  background_frag: `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  backgroundCube_vert: `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
  backgroundCube_frag: `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  cube_vert: `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,
  cube_frag: `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  depth_vert: `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,
  depth_frag: `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,
  distance_vert: `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,
  distance_frag: `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,
  equirect_vert: `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,
  equirect_frag: `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,
  linedashed_vert: `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
  linedashed_frag: `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  meshbasic_vert: `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,
  meshbasic_frag: `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  meshlambert_vert: `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  meshlambert_frag: `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  meshmatcap_vert: `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,
  meshmatcap_frag: `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  meshnormal_vert: `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,
  meshnormal_frag: `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,
  meshphong_vert: `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  meshphong_frag: `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  meshphysical_vert: `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,
  meshphysical_frag: `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  meshtoon_vert: `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  meshtoon_frag: `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,
  points_vert: `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,
  points_frag: `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  shadow_vert: `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,
  shadow_frag: `uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,
  sprite_vert: `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,
  sprite_frag: `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`
}, ce = {
  common: {
    diffuse: { value: /* @__PURE__ */ new Xe(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Ie() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Ie() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new Ie() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new Ie() },
    reflectivity: { value: 1 },
    ior: { value: 1.5 },
    refractionRatio: { value: 0.98 },
    dfgLUT: { value: null }
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new Ie() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new Ie() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new Ie() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new Ie() },
    normalScale: { value: /* @__PURE__ */ new Ne(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new Ie() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new Ie() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new Ie() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new Ie() }
  },
  gradientmap: { gradientMap: { value: null } },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new Xe(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    directionalLights: {
      value: [],
      properties: {
        direction: {},
        color: {}
      }
    },
    directionalLightShadows: {
      value: [],
      properties: {
        shadowIntensity: 1,
        shadowBias: {},
        shadowNormalBias: {},
        shadowRadius: {},
        shadowMapSize: {}
      }
    },
    directionalShadowMatrix: { value: [] },
    spotLights: {
      value: [],
      properties: {
        color: {},
        position: {},
        direction: {},
        distance: {},
        coneCos: {},
        penumbraCos: {},
        decay: {}
      }
    },
    spotLightShadows: {
      value: [],
      properties: {
        shadowIntensity: 1,
        shadowBias: {},
        shadowNormalBias: {},
        shadowRadius: {},
        shadowMapSize: {}
      }
    },
    spotLightMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: {
      value: [],
      properties: {
        color: {},
        position: {},
        decay: {},
        distance: {}
      }
    },
    pointLightShadows: {
      value: [],
      properties: {
        shadowIntensity: 1,
        shadowBias: {},
        shadowNormalBias: {},
        shadowRadius: {},
        shadowMapSize: {},
        shadowCameraNear: {},
        shadowCameraFar: {}
      }
    },
    pointShadowMatrix: { value: [] },
    hemisphereLights: {
      value: [],
      properties: {
        direction: {},
        skyColor: {},
        groundColor: {}
      }
    },
    rectAreaLights: {
      value: [],
      properties: {
        color: {},
        position: {},
        width: {},
        height: {}
      }
    },
    ltc_1: { value: null },
    ltc_2: { value: null },
    probesSH: { value: null },
    probesMin: { value: /* @__PURE__ */ new O() },
    probesMax: { value: /* @__PURE__ */ new O() },
    probesResolution: { value: /* @__PURE__ */ new O() }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new Xe(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Ie() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new Ie() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new Xe(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new Ne(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Ie() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Ie() },
    alphaTest: { value: 0 }
  }
}, qt = {
  basic: {
    uniforms: /* @__PURE__ */ yt([
      ce.common,
      ce.specularmap,
      ce.envmap,
      ce.aomap,
      ce.lightmap,
      ce.fog
    ]),
    vertexShader: Ue.meshbasic_vert,
    fragmentShader: Ue.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ yt([
      ce.common,
      ce.specularmap,
      ce.envmap,
      ce.aomap,
      ce.lightmap,
      ce.emissivemap,
      ce.bumpmap,
      ce.normalmap,
      ce.displacementmap,
      ce.fog,
      ce.lights,
      {
        emissive: { value: /* @__PURE__ */ new Xe(0) },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Ue.meshlambert_vert,
    fragmentShader: Ue.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ yt([
      ce.common,
      ce.specularmap,
      ce.envmap,
      ce.aomap,
      ce.lightmap,
      ce.emissivemap,
      ce.bumpmap,
      ce.normalmap,
      ce.displacementmap,
      ce.fog,
      ce.lights,
      {
        emissive: { value: /* @__PURE__ */ new Xe(0) },
        specular: { value: /* @__PURE__ */ new Xe(1118481) },
        shininess: { value: 30 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Ue.meshphong_vert,
    fragmentShader: Ue.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ yt([
      ce.common,
      ce.envmap,
      ce.aomap,
      ce.lightmap,
      ce.emissivemap,
      ce.bumpmap,
      ce.normalmap,
      ce.displacementmap,
      ce.roughnessmap,
      ce.metalnessmap,
      ce.fog,
      ce.lights,
      {
        emissive: { value: /* @__PURE__ */ new Xe(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Ue.meshphysical_vert,
    fragmentShader: Ue.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ yt([
      ce.common,
      ce.aomap,
      ce.lightmap,
      ce.emissivemap,
      ce.bumpmap,
      ce.normalmap,
      ce.displacementmap,
      ce.gradientmap,
      ce.fog,
      ce.lights,
      { emissive: { value: /* @__PURE__ */ new Xe(0) } }
    ]),
    vertexShader: Ue.meshtoon_vert,
    fragmentShader: Ue.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ yt([
      ce.common,
      ce.bumpmap,
      ce.normalmap,
      ce.displacementmap,
      ce.fog,
      { matcap: { value: null } }
    ]),
    vertexShader: Ue.meshmatcap_vert,
    fragmentShader: Ue.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ yt([ce.points, ce.fog]),
    vertexShader: Ue.points_vert,
    fragmentShader: Ue.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ yt([
      ce.common,
      ce.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: Ue.linedashed_vert,
    fragmentShader: Ue.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ yt([ce.common, ce.displacementmap]),
    vertexShader: Ue.depth_vert,
    fragmentShader: Ue.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ yt([
      ce.common,
      ce.bumpmap,
      ce.normalmap,
      ce.displacementmap,
      { opacity: { value: 1 } }
    ]),
    vertexShader: Ue.meshnormal_vert,
    fragmentShader: Ue.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ yt([ce.sprite, ce.fog]),
    vertexShader: Ue.sprite_vert,
    fragmentShader: Ue.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new Ie() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: Ue.background_vert,
    fragmentShader: Ue.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new Ie() }
    },
    vertexShader: Ue.backgroundCube_vert,
    fragmentShader: Ue.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: Ue.cube_vert,
    fragmentShader: Ue.cube_frag
  },
  equirect: {
    uniforms: { tEquirect: { value: null } },
    vertexShader: Ue.equirect_vert,
    fragmentShader: Ue.equirect_frag
  },
  distance: {
    uniforms: /* @__PURE__ */ yt([
      ce.common,
      ce.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new O() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Ue.distance_vert,
    fragmentShader: Ue.distance_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ yt([
      ce.lights,
      ce.fog,
      {
        color: { value: /* @__PURE__ */ new Xe(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Ue.shadow_vert,
    fragmentShader: Ue.shadow_frag
  }
};
qt.physical = {
  uniforms: /* @__PURE__ */ yt([qt.standard.uniforms, {
    clearcoat: { value: 0 },
    clearcoatMap: { value: null },
    clearcoatMapTransform: { value: /* @__PURE__ */ new Ie() },
    clearcoatNormalMap: { value: null },
    clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Ie() },
    clearcoatNormalScale: { value: /* @__PURE__ */ new Ne(1, 1) },
    clearcoatRoughness: { value: 0 },
    clearcoatRoughnessMap: { value: null },
    clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new Ie() },
    dispersion: { value: 0 },
    iridescence: { value: 0 },
    iridescenceMap: { value: null },
    iridescenceMapTransform: { value: /* @__PURE__ */ new Ie() },
    iridescenceIOR: { value: 1.3 },
    iridescenceThicknessMinimum: { value: 100 },
    iridescenceThicknessMaximum: { value: 400 },
    iridescenceThicknessMap: { value: null },
    iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new Ie() },
    sheen: { value: 0 },
    sheenColor: { value: /* @__PURE__ */ new Xe(0) },
    sheenColorMap: { value: null },
    sheenColorMapTransform: { value: /* @__PURE__ */ new Ie() },
    sheenRoughness: { value: 1 },
    sheenRoughnessMap: { value: null },
    sheenRoughnessMapTransform: { value: /* @__PURE__ */ new Ie() },
    transmission: { value: 0 },
    transmissionMap: { value: null },
    transmissionMapTransform: { value: /* @__PURE__ */ new Ie() },
    transmissionSamplerSize: { value: /* @__PURE__ */ new Ne() },
    transmissionSamplerMap: { value: null },
    thickness: { value: 0 },
    thicknessMap: { value: null },
    thicknessMapTransform: { value: /* @__PURE__ */ new Ie() },
    attenuationDistance: { value: 0 },
    attenuationColor: { value: /* @__PURE__ */ new Xe(0) },
    specularColor: { value: /* @__PURE__ */ new Xe(1, 1, 1) },
    specularColorMap: { value: null },
    specularColorMapTransform: { value: /* @__PURE__ */ new Ie() },
    specularIntensity: { value: 1 },
    specularIntensityMap: { value: null },
    specularIntensityMapTransform: { value: /* @__PURE__ */ new Ie() },
    anisotropyVector: { value: /* @__PURE__ */ new Ne() },
    anisotropyMap: { value: null },
    anisotropyMapTransform: { value: /* @__PURE__ */ new Ie() }
  }]),
  vertexShader: Ue.meshphysical_vert,
  fragmentShader: Ue.meshphysical_frag
};
var qi = {
  r: 0,
  b: 0,
  g: 0
}, Nc = /* @__PURE__ */ new ft(), qa = /* @__PURE__ */ new Ie();
qa.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function Oc(e, t, n, i, r, s) {
  const a = new Xe(0);
  let o = r === !0 ? 0 : 1, l, c, u = null, d = 0, h = null;
  function _(y) {
    let b = y.isScene === !0 ? y.background : null;
    if (b && b.isTexture) {
      const T = y.backgroundBlurriness > 0;
      b = t.get(b, T);
    }
    return b;
  }
  function M(y) {
    let b = !1;
    const T = _(y);
    T === null ? p(a, o) : T && T.isColor && (p(T, 1), b = !0);
    const P = e.xr.getEnvironmentBlendMode();
    P === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, s) : P === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, s), (e.autoClear || b) && (n.buffers.depth.setTest(!0), n.buffers.depth.setMask(!0), n.buffers.color.setMask(!0), e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil));
  }
  function S(y, b) {
    const T = _(b);
    T && (T.isCubeTexture || T.mapping === 306) ? (c === void 0 && (c = new Zt(new es(1, 1, 1), new $t({
      name: "BackgroundCubeMaterial",
      uniforms: ti(qt.backgroundCube.uniforms),
      vertexShader: qt.backgroundCube.vertexShader,
      fragmentShader: qt.backgroundCube.fragmentShader,
      side: 1,
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      allowOverride: !1
    })), c.geometry.deleteAttribute("normal"), c.geometry.deleteAttribute("uv"), c.onBeforeRender = function(P, R, D) {
      this.matrixWorld.copyPosition(D.matrixWorld);
    }, Object.defineProperty(c.material, "envMap", { get: function() {
      return this.uniforms.envMap.value;
    } }), i.update(c)), c.material.uniforms.envMap.value = T, c.material.uniforms.backgroundBlurriness.value = b.backgroundBlurriness, c.material.uniforms.backgroundIntensity.value = b.backgroundIntensity, c.material.uniforms.backgroundRotation.value.setFromMatrix4(Nc.makeRotationFromEuler(b.backgroundRotation)).transpose(), T.isCubeTexture && T.isRenderTargetTexture === !1 && c.material.uniforms.backgroundRotation.value.premultiply(qa), c.material.toneMapped = We.getTransfer(T.colorSpace) !== ir, (u !== T || d !== T.version || h !== e.toneMapping) && (c.material.needsUpdate = !0, u = T, d = T.version, h = e.toneMapping), c.layers.enableAll(), y.unshift(c, c.geometry, c.material, 0, 0, null)) : T && T.isTexture && (l === void 0 && (l = new Zt(new za(2, 2), new $t({
      name: "BackgroundMaterial",
      uniforms: ti(qt.background.uniforms),
      vertexShader: qt.background.vertexShader,
      fragmentShader: qt.background.fragmentShader,
      side: 0,
      depthTest: !1,
      depthWrite: !1,
      fog: !1,
      allowOverride: !1
    })), l.geometry.deleteAttribute("normal"), Object.defineProperty(l.material, "map", { get: function() {
      return this.uniforms.t2D.value;
    } }), i.update(l)), l.material.uniforms.t2D.value = T, l.material.uniforms.backgroundIntensity.value = b.backgroundIntensity, l.material.toneMapped = We.getTransfer(T.colorSpace) !== ir, T.matrixAutoUpdate === !0 && T.updateMatrix(), l.material.uniforms.uvTransform.value.copy(T.matrix), (u !== T || d !== T.version || h !== e.toneMapping) && (l.material.needsUpdate = !0, u = T, d = T.version, h = e.toneMapping), l.layers.enableAll(), y.unshift(l, l.geometry, l.material, 0, 0, null));
  }
  function p(y, b) {
    y.getRGB(qi, Ga(e)), n.buffers.color.setClear(qi.r, qi.g, qi.b, b, s);
  }
  function f() {
    c !== void 0 && (c.geometry.dispose(), c.material.dispose(), c = void 0), l !== void 0 && (l.geometry.dispose(), l.material.dispose(), l = void 0);
  }
  return {
    getClearColor: function() {
      return a;
    },
    setClearColor: function(y, b = 1) {
      a.set(y), o = b, p(a, o);
    },
    getClearAlpha: function() {
      return o;
    },
    setClearAlpha: function(y) {
      o = y, p(a, o);
    },
    render: M,
    addToRenderList: S,
    dispose: f
  };
}
function Fc(e, t) {
  const n = e.getParameter(e.MAX_VERTEX_ATTRIBS), i = {}, r = h(null);
  let s = r, a = !1;
  function o(A, k, Y, B, G) {
    let H = !1;
    const z = d(A, B, Y, k);
    s !== z && (s = z, c(s.object)), H = _(A, B, Y, G), H && M(A, B, Y, G), G !== null && t.update(G, e.ELEMENT_ARRAY_BUFFER), (H || a) && (a = !1, T(A, k, Y, B), G !== null && e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t.get(G).buffer));
  }
  function l() {
    return e.createVertexArray();
  }
  function c(A) {
    return e.bindVertexArray(A);
  }
  function u(A) {
    return e.deleteVertexArray(A);
  }
  function d(A, k, Y, B) {
    const G = B.wireframe === !0;
    let H = i[k.id];
    H === void 0 && (H = {}, i[k.id] = H);
    const z = A.isInstancedMesh === !0 ? A.id : 0;
    let J = H[z];
    J === void 0 && (J = {}, H[z] = J);
    let te = J[Y.id];
    te === void 0 && (te = {}, J[Y.id] = te);
    let re = te[G];
    return re === void 0 && (re = h(l()), te[G] = re), re;
  }
  function h(A) {
    const k = [], Y = [], B = [];
    for (let G = 0; G < n; G++)
      k[G] = 0, Y[G] = 0, B[G] = 0;
    return {
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: k,
      enabledAttributes: Y,
      attributeDivisors: B,
      object: A,
      attributes: {},
      index: null
    };
  }
  function _(A, k, Y, B) {
    const G = s.attributes, H = k.attributes;
    let z = 0;
    const J = Y.getAttributes();
    for (const te in J) if (J[te].location >= 0) {
      const re = G[te];
      let ge = H[te];
      if (ge === void 0 && (te === "instanceMatrix" && A.instanceMatrix && (ge = A.instanceMatrix), te === "instanceColor" && A.instanceColor && (ge = A.instanceColor)), re === void 0 || re.attribute !== ge || ge && re.data !== ge.data) return !0;
      z++;
    }
    return s.attributesNum !== z || s.index !== B;
  }
  function M(A, k, Y, B) {
    const G = {}, H = k.attributes;
    let z = 0;
    const J = Y.getAttributes();
    for (const te in J) if (J[te].location >= 0) {
      let re = H[te];
      re === void 0 && (te === "instanceMatrix" && A.instanceMatrix && (re = A.instanceMatrix), te === "instanceColor" && A.instanceColor && (re = A.instanceColor));
      const ge = {};
      ge.attribute = re, re && re.data && (ge.data = re.data), G[te] = ge, z++;
    }
    s.attributes = G, s.attributesNum = z, s.index = B;
  }
  function S() {
    const A = s.newAttributes;
    for (let k = 0, Y = A.length; k < Y; k++) A[k] = 0;
  }
  function p(A) {
    f(A, 0);
  }
  function f(A, k) {
    const Y = s.newAttributes, B = s.enabledAttributes, G = s.attributeDivisors;
    Y[A] = 1, B[A] === 0 && (e.enableVertexAttribArray(A), B[A] = 1), G[A] !== k && (e.vertexAttribDivisor(A, k), G[A] = k);
  }
  function y() {
    const A = s.newAttributes, k = s.enabledAttributes;
    for (let Y = 0, B = k.length; Y < B; Y++) k[Y] !== A[Y] && (e.disableVertexAttribArray(Y), k[Y] = 0);
  }
  function b(A, k, Y, B, G, H, z) {
    z === !0 ? e.vertexAttribIPointer(A, k, Y, G, H) : e.vertexAttribPointer(A, k, Y, B, G, H);
  }
  function T(A, k, Y, B) {
    S();
    const G = B.attributes, H = Y.getAttributes(), z = k.defaultAttributeValues;
    for (const J in H) {
      const te = H[J];
      if (te.location >= 0) {
        let re = G[J];
        if (re === void 0 && (J === "instanceMatrix" && A.instanceMatrix && (re = A.instanceMatrix), J === "instanceColor" && A.instanceColor && (re = A.instanceColor)), re !== void 0) {
          const ge = re.normalized, xe = re.itemSize, Ke = t.get(re);
          if (Ke === void 0) continue;
          const Ve = Ke.buffer, q = Ke.type, ae = Ke.bytesPerElement, ve = q === e.INT || q === e.UNSIGNED_INT || re.gpuType === 1013;
          if (re.isInterleavedBufferAttribute) {
            const de = re.data, be = de.stride, Le = re.offset;
            if (de.isInstancedInterleavedBuffer) {
              for (let Re = 0; Re < te.locationSize; Re++) f(te.location + Re, de.meshPerAttribute);
              A.isInstancedMesh !== !0 && B._maxInstanceCount === void 0 && (B._maxInstanceCount = de.meshPerAttribute * de.count);
            } else for (let Re = 0; Re < te.locationSize; Re++) p(te.location + Re);
            e.bindBuffer(e.ARRAY_BUFFER, Ve);
            for (let Re = 0; Re < te.locationSize; Re++) b(te.location + Re, xe / te.locationSize, q, ge, be * ae, (Le + xe / te.locationSize * Re) * ae, ve);
          } else {
            if (re.isInstancedBufferAttribute) {
              for (let de = 0; de < te.locationSize; de++) f(te.location + de, re.meshPerAttribute);
              A.isInstancedMesh !== !0 && B._maxInstanceCount === void 0 && (B._maxInstanceCount = re.meshPerAttribute * re.count);
            } else for (let de = 0; de < te.locationSize; de++) p(te.location + de);
            e.bindBuffer(e.ARRAY_BUFFER, Ve);
            for (let de = 0; de < te.locationSize; de++) b(te.location + de, xe / te.locationSize, q, ge, xe * ae, xe / te.locationSize * de * ae, ve);
          }
        } else if (z !== void 0) {
          const ge = z[J];
          if (ge !== void 0) switch (ge.length) {
            case 2:
              e.vertexAttrib2fv(te.location, ge);
              break;
            case 3:
              e.vertexAttrib3fv(te.location, ge);
              break;
            case 4:
              e.vertexAttrib4fv(te.location, ge);
              break;
            default:
              e.vertexAttrib1fv(te.location, ge);
          }
        }
      }
    }
    y();
  }
  function P() {
    E();
    for (const A in i) {
      const k = i[A];
      for (const Y in k) {
        const B = k[Y];
        for (const G in B) {
          const H = B[G];
          for (const z in H)
            u(H[z].object), delete H[z];
          delete B[G];
        }
      }
      delete i[A];
    }
  }
  function R(A) {
    if (i[A.id] === void 0) return;
    const k = i[A.id];
    for (const Y in k) {
      const B = k[Y];
      for (const G in B) {
        const H = B[G];
        for (const z in H)
          u(H[z].object), delete H[z];
        delete B[G];
      }
    }
    delete i[A.id];
  }
  function D(A) {
    for (const k in i) {
      const Y = i[k];
      for (const B in Y) {
        const G = Y[B];
        if (G[A.id] === void 0) continue;
        const H = G[A.id];
        for (const z in H)
          u(H[z].object), delete H[z];
        delete G[A.id];
      }
    }
  }
  function v(A) {
    for (const k in i) {
      const Y = i[k], B = A.isInstancedMesh === !0 ? A.id : 0, G = Y[B];
      if (G !== void 0) {
        for (const H in G) {
          const z = G[H];
          for (const J in z)
            u(z[J].object), delete z[J];
          delete G[H];
        }
        delete Y[B], Object.keys(Y).length === 0 && delete i[k];
      }
    }
  }
  function E() {
    X(), a = !0, s !== r && (s = r, c(s.object));
  }
  function X() {
    r.geometry = null, r.program = null, r.wireframe = !1;
  }
  return {
    setup: o,
    reset: E,
    resetDefaultState: X,
    dispose: P,
    releaseStatesOfGeometry: R,
    releaseStatesOfObject: v,
    releaseStatesOfProgram: D,
    initAttributes: S,
    enableAttribute: p,
    disableUnusedAttributes: y
  };
}
function Bc(e, t, n) {
  let i;
  function r(l) {
    i = l;
  }
  function s(l, c) {
    e.drawArrays(i, l, c), n.update(c, i, 1);
  }
  function a(l, c, u) {
    u !== 0 && (e.drawArraysInstanced(i, l, c, u), n.update(c, i, u));
  }
  function o(l, c, u) {
    if (u === 0) return;
    t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i, l, 0, c, 0, u);
    let d = 0;
    for (let h = 0; h < u; h++) d += c[h];
    n.update(d, i, 1);
  }
  this.setMode = r, this.render = s, this.renderInstances = a, this.renderMultiDraw = o;
}
function zc(e, t, n, i) {
  let r;
  function s() {
    if (r !== void 0) return r;
    if (t.has("EXT_texture_filter_anisotropic") === !0) {
      const D = t.get("EXT_texture_filter_anisotropic");
      r = e.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else r = 0;
    return r;
  }
  function a(D) {
    return !(D !== 1023 && i.convert(D) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function o(D) {
    const v = D === 1016 && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
    return !(D !== 1009 && i.convert(D) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE) && D !== 1015 && !v);
  }
  function l(D) {
    if (D === "highp") {
      if (e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision > 0) return "highp";
      D = "mediump";
    }
    return D === "mediump" && e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let c = n.precision !== void 0 ? n.precision : "highp";
  const u = l(c);
  u !== c && (Te("WebGLRenderer:", c, "not supported, using", u, "instead."), c = u);
  const d = n.logarithmicDepthBuffer === !0, h = n.reversedDepthBuffer === !0 && t.has("EXT_clip_control");
  n.reversedDepthBuffer === !0 && h === !1 && Te("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");
  const _ = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS), M = e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS), S = e.getParameter(e.MAX_TEXTURE_SIZE), p = e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE), f = e.getParameter(e.MAX_VERTEX_ATTRIBS), y = e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS), b = e.getParameter(e.MAX_VARYING_VECTORS), T = e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS), P = e.getParameter(e.MAX_SAMPLES), R = e.getParameter(e.SAMPLES);
  return {
    isWebGL2: !0,
    getMaxAnisotropy: s,
    getMaxPrecision: l,
    textureFormatReadable: a,
    textureTypeReadable: o,
    precision: c,
    logarithmicDepthBuffer: d,
    reversedDepthBuffer: h,
    maxTextures: _,
    maxVertexTextures: M,
    maxTextureSize: S,
    maxCubemapSize: p,
    maxAttributes: f,
    maxVertexUniforms: y,
    maxVaryings: b,
    maxFragmentUniforms: T,
    maxSamples: P,
    samples: R
  };
}
function Vc(e) {
  const t = this;
  let n = null, i = 0, r = !1, s = !1;
  const a = new _n(), o = new Ie(), l = {
    value: null,
    needsUpdate: !1
  };
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(d, h) {
    const _ = d.length !== 0 || h || i !== 0 || r;
    return r = h, i = d.length, _;
  }, this.beginShadows = function() {
    s = !0, u(null);
  }, this.endShadows = function() {
    s = !1;
  }, this.setGlobalState = function(d, h) {
    n = u(d, h, 0);
  }, this.setState = function(d, h, _) {
    const M = d.clippingPlanes, S = d.clipIntersection, p = d.clipShadows, f = e.get(d);
    if (!r || M === null || M.length === 0 || s && !p) s ? u(null) : c();
    else {
      const y = s ? 0 : i, b = y * 4;
      let T = f.clippingState || null;
      l.value = T, T = u(M, h, b, _);
      for (let P = 0; P !== b; ++P) T[P] = n[P];
      f.clippingState = T, this.numIntersection = S ? this.numPlanes : 0, this.numPlanes += y;
    }
  };
  function c() {
    l.value !== n && (l.value = n, l.needsUpdate = i > 0), t.numPlanes = i, t.numIntersection = 0;
  }
  function u(d, h, _, M) {
    const S = d !== null ? d.length : 0;
    let p = null;
    if (S !== 0) {
      if (p = l.value, M !== !0 || p === null) {
        const f = _ + S * 4, y = h.matrixWorldInverse;
        o.getNormalMatrix(y), (p === null || p.length < f) && (p = new Float32Array(f));
        for (let b = 0, T = _; b !== S; ++b, T += 4)
          a.copy(d[b]).applyMatrix4(y, o), a.normal.toArray(p, T), p[T + 3] = a.constant;
      }
      l.value = p, l.needsUpdate = !0;
    }
    return t.numPlanes = S, t.numIntersection = 0, p;
  }
}
var gn = 4, ks = [
  0.125,
  0.215,
  0.35,
  0.446,
  0.526,
  0.582
], An = 20, Gc = 256, hi = /* @__PURE__ */ new ns(), Ws = /* @__PURE__ */ new Xe(), Ur = null, Nr = 0, Or = 0, Fr = !1, Hc = /* @__PURE__ */ new O(), Xs = class {
  constructor(e) {
    this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._sizeLods = [], this._sigmas = [], this._lodMeshes = [], this._backgroundBox = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._blurMaterial = null, this._ggxMaterial = null;
  }
  fromScene(e, t = 0, n = 0.1, i = 100, r = {}) {
    const { size: s = 256, position: a = Hc } = r;
    Ur = this._renderer.getRenderTarget(), Nr = this._renderer.getActiveCubeFace(), Or = this._renderer.getActiveMipmapLevel(), Fr = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(s);
    const o = this._allocateTargets();
    return o.depthBuffer = !0, this._sceneToCubeUV(e, n, i, o, a), t > 0 && this._blur(o, 0, 0, t), this._applyPMREM(o), this._cleanup(o), o;
  }
  fromEquirectangular(e, t = null) {
    return this._fromTexture(e, t);
  }
  fromCubemap(e, t = null) {
    return this._fromTexture(e, t);
  }
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = js(), this._compileMaterial(this._cubemapMaterial));
  }
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = qs(), this._compileMaterial(this._equirectMaterial));
  }
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose(), this._backgroundBox !== null && (this._backgroundBox.geometry.dispose(), this._backgroundBox.material.dispose());
  }
  _setSize(e) {
    this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._ggxMaterial !== null && this._ggxMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let e = 0; e < this._lodMeshes.length; e++) this._lodMeshes[e].geometry.dispose();
  }
  _cleanup(e) {
    this._renderer.setRenderTarget(Ur, Nr, Or), this._renderer.xr.enabled = Fr, e.scissorTest = !1, Wn(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === 301 || e.mapping === 302 ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), Ur = this._renderer.getRenderTarget(), Nr = this._renderer.getActiveCubeFace(), Or = this._renderer.getActiveMipmapLevel(), Fr = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const n = t || this._allocateTargets();
    return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, n = {
      magFilter: Pt,
      minFilter: Pt,
      generateMipmaps: !1,
      type: wn,
      format: mi,
      colorSpace: Wr,
      depthBuffer: !1
    }, i = Ys(e, t, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = Ys(e, t, n);
      const { _lodMax: r } = this;
      ({ lodMeshes: this._lodMeshes, sizeLods: this._sizeLods, sigmas: this._sigmas } = kc(r)), this._blurMaterial = Xc(r, e, t), this._ggxMaterial = Wc(r, e, t);
    }
    return i;
  }
  _compileMaterial(e) {
    const t = new Zt(new Sn(), e);
    this._renderer.compile(t, hi);
  }
  _sceneToCubeUV(e, t, n, i, r) {
    const s = new Ut(90, 1, t, n), a = [
      1,
      -1,
      1,
      1,
      1,
      1
    ], o = [
      1,
      1,
      1,
      -1,
      -1,
      -1
    ], l = this._renderer, c = l.autoClear, u = l.toneMapping;
    l.getClearColor(Ws), l.toneMapping = 0, l.autoClear = !1, l.state.buffers.depth.getReversed() && (l.setRenderTarget(i), l.clearDepth(), l.setRenderTarget(null)), this._backgroundBox === null && (this._backgroundBox = new Zt(new es(), new Na({
      name: "PMREM.Background",
      side: 1,
      depthWrite: !1,
      depthTest: !1
    })));
    const d = this._backgroundBox, h = d.material;
    let _ = !1;
    const M = e.background;
    M ? M.isColor && (h.color.copy(M), e.background = null, _ = !0) : (h.color.copy(Ws), _ = !0);
    for (let S = 0; S < 6; S++) {
      const p = S % 3;
      p === 0 ? (s.up.set(0, a[S], 0), s.position.set(r.x, r.y, r.z), s.lookAt(r.x + o[S], r.y, r.z)) : p === 1 ? (s.up.set(0, 0, a[S]), s.position.set(r.x, r.y, r.z), s.lookAt(r.x, r.y + o[S], r.z)) : (s.up.set(0, a[S], 0), s.position.set(r.x, r.y, r.z), s.lookAt(r.x, r.y, r.z + o[S]));
      const f = this._cubeSize;
      Wn(i, p * f, S > 2 ? f : 0, f, f), l.setRenderTarget(i), _ && l.render(d, s), l.render(e, s);
    }
    l.toneMapping = u, l.autoClear = c, e.background = M;
  }
  _textureToCubeUV(e, t) {
    const n = this._renderer, i = e.mapping === 301 || e.mapping === 302;
    i ? (this._cubemapMaterial === null && (this._cubemapMaterial = js()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = qs());
    const r = i ? this._cubemapMaterial : this._equirectMaterial, s = this._lodMeshes[0];
    s.material = r;
    const a = r.uniforms;
    a.envMap.value = e;
    const o = this._cubeSize;
    Wn(t, 0, 0, 3 * o, 2 * o), n.setRenderTarget(t), n.render(s, hi);
  }
  _applyPMREM(e) {
    const t = this._renderer, n = t.autoClear;
    t.autoClear = !1;
    const i = this._lodMeshes.length;
    for (let r = 1; r < i; r++) this._applyGGXFilter(e, r - 1, r);
    t.autoClear = n;
  }
  _applyGGXFilter(e, t, n) {
    const i = this._renderer, r = this._pingPongRenderTarget, s = this._ggxMaterial, a = this._lodMeshes[n];
    a.material = s;
    const o = s.uniforms, l = n / (this._lodMeshes.length - 1), c = t / (this._lodMeshes.length - 1), u = Math.sqrt(l * l - c * c) * (0 + l * 1.25), { _lodMax: d } = this, h = this._sizeLods[n], _ = 3 * h * (n > d - gn ? n - d + gn : 0), M = 4 * (this._cubeSize - h);
    o.envMap.value = e.texture, o.roughness.value = u, o.mipInt.value = d - t, Wn(r, _, M, 3 * h, 2 * h), i.setRenderTarget(r), i.render(a, hi), o.envMap.value = r.texture, o.roughness.value = 0, o.mipInt.value = d - n, Wn(e, _, M, 3 * h, 2 * h), i.setRenderTarget(e), i.render(a, hi);
  }
  _blur(e, t, n, i, r) {
    const s = this._pingPongRenderTarget;
    this._halfBlur(e, s, t, n, i, "latitudinal", r), this._halfBlur(s, e, n, n, i, "longitudinal", r);
  }
  _halfBlur(e, t, n, i, r, s, a) {
    const o = this._renderer, l = this._blurMaterial;
    s !== "latitudinal" && s !== "longitudinal" && Pe("blur direction must be either latitudinal or longitudinal!");
    const c = 3, u = this._lodMeshes[i];
    u.material = l;
    const d = l.uniforms, h = this._sizeLods[n] - 1, _ = isFinite(r) ? Math.PI / (2 * h) : 2 * Math.PI / (2 * An - 1), M = r / _, S = isFinite(r) ? 1 + Math.floor(c * M) : An;
    S > An && Te(`sigmaRadians, ${r}, is too large and will clip, as it requested ${S} samples when the maximum is set to ${An}`);
    const p = [];
    let f = 0;
    for (let T = 0; T < An; ++T) {
      const P = T / M, R = Math.exp(-P * P / 2);
      p.push(R), T === 0 ? f += R : T < S && (f += 2 * R);
    }
    for (let T = 0; T < p.length; T++) p[T] = p[T] / f;
    d.envMap.value = e.texture, d.samples.value = S, d.weights.value = p, d.latitudinal.value = s === "latitudinal", a && (d.poleAxis.value = a);
    const { _lodMax: y } = this;
    d.dTheta.value = _, d.mipInt.value = y - n;
    const b = this._sizeLods[i];
    Wn(t, 3 * b * (i > y - gn ? i - y + gn : 0), 4 * (this._cubeSize - b), 3 * b, 2 * b), o.setRenderTarget(t), o.render(u, hi);
  }
};
function kc(e) {
  const t = [], n = [], i = [];
  let r = e;
  const s = e - gn + 1 + ks.length;
  for (let a = 0; a < s; a++) {
    const o = Math.pow(2, r);
    t.push(o);
    let l = 1 / o;
    a > e - gn ? l = ks[a - e + gn - 1] : a === 0 && (l = 0), n.push(l);
    const c = 1 / (o - 2), u = -c, d = 1 + c, h = [
      u,
      u,
      d,
      u,
      d,
      d,
      u,
      u,
      d,
      d,
      u,
      d
    ], _ = 6, M = 6, S = 3, p = 2, f = 1, y = new Float32Array(S * M * _), b = new Float32Array(p * M * _), T = new Float32Array(f * M * _);
    for (let R = 0; R < _; R++) {
      const D = R % 3 * 2 / 3 - 1, v = R > 2 ? 0 : -1, E = [
        D,
        v,
        0,
        D + 2 / 3,
        v,
        0,
        D + 2 / 3,
        v + 1,
        0,
        D,
        v,
        0,
        D + 2 / 3,
        v + 1,
        0,
        D,
        v + 1,
        0
      ];
      y.set(E, S * M * R), b.set(h, p * M * R);
      const X = [
        R,
        R,
        R,
        R,
        R,
        R
      ];
      T.set(X, f * M * R);
    }
    const P = new Sn();
    P.setAttribute("position", new Kt(y, S)), P.setAttribute("uv", new Kt(b, p)), P.setAttribute("faceIndex", new Kt(T, f)), i.push(new Zt(P, null)), r > gn && r--;
  }
  return {
    lodMeshes: i,
    sizeLods: t,
    sigmas: n
  };
}
function Ys(e, t, n) {
  const i = new jt(e, t, n);
  return i.texture.mapping = 306, i.texture.name = "PMREM.cubeUv", i.scissorTest = !0, i;
}
function Wn(e, t, n, i, r) {
  e.viewport.set(t, n, i, r), e.scissor.set(t, n, i, r);
}
function Wc(e, t, n) {
  return new $t({
    name: "PMREMGGXConvolution",
    defines: {
      GGX_SAMPLES: Gc,
      CUBEUV_TEXEL_WIDTH: 1 / t,
      CUBEUV_TEXEL_HEIGHT: 1 / n,
      CUBEUV_MAX_MIP: `${e}.0`
    },
    uniforms: {
      envMap: { value: null },
      roughness: { value: 0 },
      mipInt: { value: 0 }
    },
    vertexShader: sr(),
    fragmentShader: `

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function Xc(e, t, n) {
  const i = new Float32Array(An), r = new O(0, 1, 0);
  return new $t({
    name: "SphericalGaussianBlur",
    defines: {
      n: An,
      CUBEUV_TEXEL_WIDTH: 1 / t,
      CUBEUV_TEXEL_HEIGHT: 1 / n,
      CUBEUV_MAX_MIP: `${e}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: i },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: r }
    },
    vertexShader: sr(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function qs() {
  return new $t({
    name: "EquirectangularToCubeUV",
    uniforms: { envMap: { value: null } },
    vertexShader: sr(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function js() {
  return new $t({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: sr(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function sr() {
  return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`;
}
var ja = class extends jt {
  constructor(e = 1, t = {}) {
    super(e, e, t), this.isWebGLCubeRenderTarget = !0;
    const n = {
      width: e,
      height: e,
      depth: 1
    }, i = [
      n,
      n,
      n,
      n,
      n,
      n
    ];
    this.texture = new Oa(i), this._setTextureOptions(t), this.texture.isRenderTargetTexture = !0;
  }
  fromEquirectangularTexture(e, t) {
    this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
    const n = {
      uniforms: { tEquirect: { value: null } },
      vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,
      fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
    }, i = new es(5, 5, 5), r = new $t({
      name: "CubemapFromEquirect",
      uniforms: ti(n.uniforms),
      vertexShader: n.vertexShader,
      fragmentShader: n.fragmentShader,
      side: 1,
      blending: 0
    });
    r.uniforms.tEquirect.value = t;
    const s = new Zt(i, r), a = t.minFilter;
    return t.minFilter === 1008 && (t.minFilter = Pt), new Sc(1, 10, this).update(e, s), t.minFilter = a, s.geometry.dispose(), s.material.dispose(), this;
  }
  clear(e, t = !0, n = !0, i = !0) {
    const r = e.getRenderTarget();
    for (let s = 0; s < 6; s++)
      e.setRenderTarget(this, s), e.clear(t, n, i);
    e.setRenderTarget(r);
  }
};
function Yc(e) {
  let t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), i = null;
  function r(h, _ = !1) {
    return h == null ? null : _ ? a(h) : s(h);
  }
  function s(h) {
    if (h && h.isTexture) {
      const _ = h.mapping;
      if (_ === 303 || _ === 304) if (t.has(h)) {
        const M = t.get(h).texture;
        return o(M, h.mapping);
      } else {
        const M = h.image;
        if (M && M.height > 0) {
          const S = new ja(M.height);
          return S.fromEquirectangularTexture(e, h), t.set(h, S), h.addEventListener("dispose", c), o(S.texture, h.mapping);
        } else return null;
      }
    }
    return h;
  }
  function a(h) {
    if (h && h.isTexture) {
      const _ = h.mapping, M = _ === 303 || _ === 304, S = _ === 301 || _ === 302;
      if (M || S) {
        let p = n.get(h);
        const f = p !== void 0 ? p.texture.pmremVersion : 0;
        if (h.isRenderTargetTexture && h.pmremVersion !== f)
          return i === null && (i = new Xs(e)), p = M ? i.fromEquirectangular(h, p) : i.fromCubemap(h, p), p.texture.pmremVersion = h.pmremVersion, n.set(h, p), p.texture;
        if (p !== void 0) return p.texture;
        {
          const y = h.image;
          return M && y && y.height > 0 || S && y && l(y) ? (i === null && (i = new Xs(e)), p = M ? i.fromEquirectangular(h) : i.fromCubemap(h), p.texture.pmremVersion = h.pmremVersion, n.set(h, p), h.addEventListener("dispose", u), p.texture) : null;
        }
      }
    }
    return h;
  }
  function o(h, _) {
    return _ === 303 ? h.mapping = 301 : _ === 304 && (h.mapping = 302), h;
  }
  function l(h) {
    let _ = 0;
    const M = 6;
    for (let S = 0; S < M; S++) h[S] !== void 0 && _++;
    return _ === M;
  }
  function c(h) {
    const _ = h.target;
    _.removeEventListener("dispose", c);
    const M = t.get(_);
    M !== void 0 && (t.delete(_), M.dispose());
  }
  function u(h) {
    const _ = h.target;
    _.removeEventListener("dispose", u);
    const M = n.get(_);
    M !== void 0 && (n.delete(_), M.dispose());
  }
  function d() {
    t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), i !== null && (i.dispose(), i = null);
  }
  return {
    get: r,
    dispose: d
  };
}
function qc(e) {
  const t = {};
  function n(i) {
    if (t[i] !== void 0) return t[i];
    const r = e.getExtension(i);
    return t[i] = r, r;
  }
  return {
    has: function(i) {
      return n(i) !== null;
    },
    init: function() {
      n("EXT_color_buffer_float"), n("WEBGL_clip_cull_distance"), n("OES_texture_float_linear"), n("EXT_color_buffer_half_float"), n("WEBGL_multisampled_render_to_texture"), n("WEBGL_render_shared_exponent");
    },
    get: function(i) {
      const r = n(i);
      return r === null && Xr("WebGLRenderer: " + i + " extension not supported."), r;
    }
  };
}
function jc(e, t, n, i) {
  const r = {}, s = /* @__PURE__ */ new WeakMap();
  function a(d) {
    const h = d.target;
    h.index !== null && t.remove(h.index);
    for (const M in h.attributes) t.remove(h.attributes[M]);
    h.removeEventListener("dispose", a), delete r[h.id];
    const _ = s.get(h);
    _ && (t.remove(_), s.delete(h)), i.releaseStatesOfGeometry(h), h.isInstancedBufferGeometry === !0 && delete h._maxInstanceCount, n.memory.geometries--;
  }
  function o(d, h) {
    return r[h.id] === !0 || (h.addEventListener("dispose", a), r[h.id] = !0, n.memory.geometries++), h;
  }
  function l(d) {
    const h = d.attributes;
    for (const _ in h) t.update(h[_], e.ARRAY_BUFFER);
  }
  function c(d) {
    const h = [], _ = d.index, M = d.attributes.position;
    let S = 0;
    if (M === void 0) return;
    if (_ !== null) {
      const y = _.array;
      S = _.version;
      for (let b = 0, T = y.length; b < T; b += 3) {
        const P = y[b + 0], R = y[b + 1], D = y[b + 2];
        h.push(P, R, R, D, D, P);
      }
    } else {
      const y = M.array;
      S = M.version;
      for (let b = 0, T = y.length / 3 - 1; b < T; b += 3) {
        const P = b + 0, R = b + 1, D = b + 2;
        h.push(P, R, R, D, D, P);
      }
    }
    const p = new (M.count >= 65535 ? Da : La)(h, 1);
    p.version = S;
    const f = s.get(d);
    f && t.remove(f), s.set(d, p);
  }
  function u(d) {
    const h = s.get(d);
    if (h) {
      const _ = d.index;
      _ !== null && h.version < _.version && c(d);
    } else c(d);
    return s.get(d);
  }
  return {
    get: o,
    update: l,
    getWireframeAttribute: u
  };
}
function Kc(e, t, n) {
  let i;
  function r(d) {
    i = d;
  }
  let s, a;
  function o(d) {
    s = d.type, a = d.bytesPerElement;
  }
  function l(d, h) {
    e.drawElements(i, h, s, d * a), n.update(h, i, 1);
  }
  function c(d, h, _) {
    _ !== 0 && (e.drawElementsInstanced(i, h, s, d * a, _), n.update(h, i, _));
  }
  function u(d, h, _) {
    if (_ === 0) return;
    t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i, h, 0, s, d, 0, _);
    let M = 0;
    for (let S = 0; S < _; S++) M += h[S];
    n.update(M, i, 1);
  }
  this.setMode = r, this.setIndex = o, this.render = l, this.renderInstances = c, this.renderMultiDraw = u;
}
function Zc(e) {
  const t = {
    geometries: 0,
    textures: 0
  }, n = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function i(s, a, o) {
    switch (n.calls++, a) {
      case e.TRIANGLES:
        n.triangles += o * (s / 3);
        break;
      case e.LINES:
        n.lines += o * (s / 2);
        break;
      case e.LINE_STRIP:
        n.lines += o * (s - 1);
        break;
      case e.LINE_LOOP:
        n.lines += o * s;
        break;
      case e.POINTS:
        n.points += o * s;
        break;
      default:
        Pe("WebGLInfo: Unknown draw mode:", a);
        break;
    }
  }
  function r() {
    n.calls = 0, n.triangles = 0, n.points = 0, n.lines = 0;
  }
  return {
    memory: t,
    render: n,
    programs: null,
    autoReset: !0,
    reset: r,
    update: i
  };
}
function $c(e, t, n) {
  const i = /* @__PURE__ */ new WeakMap(), r = new ht();
  function s(a, o, l) {
    const c = a.morphTargetInfluences, u = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, d = u !== void 0 ? u.length : 0;
    let h = i.get(o);
    if (h === void 0 || h.count !== d) {
      let E = function() {
        D.dispose(), i.delete(o), o.removeEventListener("dispose", E);
      };
      h !== void 0 && h.texture.dispose();
      const _ = o.morphAttributes.position !== void 0, M = o.morphAttributes.normal !== void 0, S = o.morphAttributes.color !== void 0, p = o.morphAttributes.position || [], f = o.morphAttributes.normal || [], y = o.morphAttributes.color || [];
      let b = 0;
      _ === !0 && (b = 1), M === !0 && (b = 2), S === !0 && (b = 3);
      let T = o.attributes.position.count * b, P = 1;
      T > t.maxTextureSize && (P = Math.ceil(T / t.maxTextureSize), T = t.maxTextureSize);
      const R = new Float32Array(T * P * 4 * d), D = new Ra(R, T, P, d);
      D.type = rr, D.needsUpdate = !0;
      const v = b * 4;
      for (let X = 0; X < d; X++) {
        const A = p[X], k = f[X], Y = y[X], B = T * P * 4 * X;
        for (let G = 0; G < A.count; G++) {
          const H = G * v;
          _ === !0 && (r.fromBufferAttribute(A, G), R[B + H + 0] = r.x, R[B + H + 1] = r.y, R[B + H + 2] = r.z, R[B + H + 3] = 0), M === !0 && (r.fromBufferAttribute(k, G), R[B + H + 4] = r.x, R[B + H + 5] = r.y, R[B + H + 6] = r.z, R[B + H + 7] = 0), S === !0 && (r.fromBufferAttribute(Y, G), R[B + H + 8] = r.x, R[B + H + 9] = r.y, R[B + H + 10] = r.z, R[B + H + 11] = Y.itemSize === 4 ? r.w : 1);
        }
      }
      h = {
        count: d,
        texture: D,
        size: new Ne(T, P)
      }, i.set(o, h), o.addEventListener("dispose", E);
    }
    if (a.isInstancedMesh === !0 && a.morphTexture !== null) l.getUniforms().setValue(e, "morphTexture", a.morphTexture, n);
    else {
      let _ = 0;
      for (let S = 0; S < c.length; S++) _ += c[S];
      const M = o.morphTargetsRelative ? 1 : 1 - _;
      l.getUniforms().setValue(e, "morphTargetBaseInfluence", M), l.getUniforms().setValue(e, "morphTargetInfluences", c);
    }
    l.getUniforms().setValue(e, "morphTargetsTexture", h.texture, n), l.getUniforms().setValue(e, "morphTargetsTextureSize", h.size);
  }
  return { update: s };
}
function Jc(e, t, n, i, r) {
  let s = /* @__PURE__ */ new WeakMap();
  function a(c) {
    const u = r.render.frame, d = c.geometry, h = t.get(c, d);
    if (s.get(h) !== u && (t.update(h), s.set(h, u)), c.isInstancedMesh && (c.hasEventListener("dispose", l) === !1 && c.addEventListener("dispose", l), s.get(c) !== u && (n.update(c.instanceMatrix, e.ARRAY_BUFFER), c.instanceColor !== null && n.update(c.instanceColor, e.ARRAY_BUFFER), s.set(c, u))), c.isSkinnedMesh) {
      const _ = c.skeleton;
      s.get(_) !== u && (_.update(), s.set(_, u));
    }
    return h;
  }
  function o() {
    s = /* @__PURE__ */ new WeakMap();
  }
  function l(c) {
    const u = c.target;
    u.removeEventListener("dispose", l), i.releaseStatesOfObject(u), n.remove(u.instanceMatrix), u.instanceColor !== null && n.remove(u.instanceColor);
  }
  return {
    update: a,
    dispose: o
  };
}
var Qc = {
  1: "LINEAR_TONE_MAPPING",
  2: "REINHARD_TONE_MAPPING",
  3: "CINEON_TONE_MAPPING",
  4: "ACES_FILMIC_TONE_MAPPING",
  6: "AGX_TONE_MAPPING",
  7: "NEUTRAL_TONE_MAPPING",
  5: "CUSTOM_TONE_MAPPING"
};
function eh(e, t, n, i, r) {
  const s = new jt(t, n, {
    type: e,
    depthBuffer: i,
    stencilBuffer: r,
    depthTexture: i ? new ei(t, n) : void 0
  }), a = new jt(t, n, {
    type: wn,
    depthBuffer: !1,
    stencilBuffer: !1
  }), o = new Sn();
  o.setAttribute("position", new Lt([
    -1,
    3,
    0,
    -1,
    -1,
    0,
    3,
    -1,
    0
  ], 3)), o.setAttribute("uv", new Lt([
    0,
    2,
    0,
    0,
    2,
    0
  ], 2));
  const l = new tc({
    uniforms: { tDiffuse: { value: null } },
    vertexShader: `
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,
    fragmentShader: `
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,
    depthTest: !1,
    depthWrite: !1
  }), c = new Zt(o, l), u = new ns(-1, 1, 1, -1, 0, 1);
  let d = null, h = null, _ = !1, M, S = null, p = [], f = !1;
  this.setSize = function(y, b) {
    s.setSize(y, b), a.setSize(y, b);
    for (let T = 0; T < p.length; T++) {
      const P = p[T];
      P.setSize && P.setSize(y, b);
    }
  }, this.setEffects = function(y) {
    p = y, f = p.length > 0 && p[0].isRenderPass === !0;
    const b = s.width, T = s.height;
    for (let P = 0; P < p.length; P++) {
      const R = p[P];
      R.setSize && R.setSize(b, T);
    }
  }, this.begin = function(y, b) {
    if (_ || y.toneMapping === 0 && p.length === 0) return !1;
    if (S = b, b !== null) {
      const T = b.width, P = b.height;
      (s.width !== T || s.height !== P) && this.setSize(T, P);
    }
    return f === !1 && y.setRenderTarget(s), M = y.toneMapping, y.toneMapping = 0, !0;
  }, this.hasRenderPass = function() {
    return f;
  }, this.end = function(y, b) {
    y.toneMapping = M, _ = !0;
    let T = s, P = a;
    for (let R = 0; R < p.length; R++) {
      const D = p[R];
      if (D.enabled !== !1 && (D.render(y, P, T, b), D.needsSwap !== !1)) {
        const v = T;
        T = P, P = v;
      }
    }
    if (d !== y.outputColorSpace || h !== y.toneMapping) {
      d = y.outputColorSpace, h = y.toneMapping, l.defines = {}, We.getTransfer(d) === "srgb" && (l.defines.SRGB_TRANSFER = "");
      const R = Qc[h];
      R && (l.defines[R] = ""), l.needsUpdate = !0;
    }
    l.uniforms.tDiffuse.value = T.texture, y.setRenderTarget(S), y.render(c, u), S = null, _ = !1;
  }, this.isCompositing = function() {
    return _;
  }, this.dispose = function() {
    s.depthTexture && s.depthTexture.dispose(), s.dispose(), a.dispose(), o.dispose(), l.dispose();
  };
}
var Ka = /* @__PURE__ */ new Ot(), qr = /* @__PURE__ */ new ei(1, 1), Za = /* @__PURE__ */ new Ra(), $a = /* @__PURE__ */ new Dl(), Ja = /* @__PURE__ */ new Oa(), Ks = [], Zs = [], $s = new Float32Array(16), Js = new Float32Array(9), Qs = new Float32Array(4);
function ii(e, t, n) {
  const i = e[0];
  if (i <= 0 || i > 0) return e;
  const r = t * n;
  let s = Ks[r];
  if (s === void 0 && (s = new Float32Array(r), Ks[r] = s), t !== 0) {
    i.toArray(s, 0);
    for (let a = 1, o = 0; a !== t; ++a)
      o += n, e[a].toArray(s, o);
  }
  return s;
}
function pt(e, t) {
  if (e.length !== t.length) return !1;
  for (let n = 0, i = e.length; n < i; n++) if (e[n] !== t[n]) return !1;
  return !0;
}
function mt(e, t) {
  for (let n = 0, i = t.length; n < i; n++) e[n] = t[n];
}
function ar(e, t) {
  let n = Zs[t];
  n === void 0 && (n = new Int32Array(t), Zs[t] = n);
  for (let i = 0; i !== t; ++i) n[i] = e.allocateTextureUnit();
  return n;
}
function th(e, t) {
  const n = this.cache;
  n[0] !== t && (e.uniform1f(this.addr, t), n[0] = t);
}
function nh(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y) && (e.uniform2f(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
  else {
    if (pt(n, t)) return;
    e.uniform2fv(this.addr, t), mt(n, t);
  }
}
function ih(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3f(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
  else if (t.r !== void 0)
    (n[0] !== t.r || n[1] !== t.g || n[2] !== t.b) && (e.uniform3f(this.addr, t.r, t.g, t.b), n[0] = t.r, n[1] = t.g, n[2] = t.b);
  else {
    if (pt(n, t)) return;
    e.uniform3fv(this.addr, t), mt(n, t);
  }
}
function rh(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4f(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
  else {
    if (pt(n, t)) return;
    e.uniform4fv(this.addr, t), mt(n, t);
  }
}
function sh(e, t) {
  const n = this.cache, i = t.elements;
  if (i === void 0) {
    if (pt(n, t)) return;
    e.uniformMatrix2fv(this.addr, !1, t), mt(n, t);
  } else {
    if (pt(n, i)) return;
    Qs.set(i), e.uniformMatrix2fv(this.addr, !1, Qs), mt(n, i);
  }
}
function ah(e, t) {
  const n = this.cache, i = t.elements;
  if (i === void 0) {
    if (pt(n, t)) return;
    e.uniformMatrix3fv(this.addr, !1, t), mt(n, t);
  } else {
    if (pt(n, i)) return;
    Js.set(i), e.uniformMatrix3fv(this.addr, !1, Js), mt(n, i);
  }
}
function oh(e, t) {
  const n = this.cache, i = t.elements;
  if (i === void 0) {
    if (pt(n, t)) return;
    e.uniformMatrix4fv(this.addr, !1, t), mt(n, t);
  } else {
    if (pt(n, i)) return;
    $s.set(i), e.uniformMatrix4fv(this.addr, !1, $s), mt(n, i);
  }
}
function lh(e, t) {
  const n = this.cache;
  n[0] !== t && (e.uniform1i(this.addr, t), n[0] = t);
}
function ch(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y) && (e.uniform2i(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
  else {
    if (pt(n, t)) return;
    e.uniform2iv(this.addr, t), mt(n, t);
  }
}
function hh(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3i(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
  else {
    if (pt(n, t)) return;
    e.uniform3iv(this.addr, t), mt(n, t);
  }
}
function uh(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4i(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
  else {
    if (pt(n, t)) return;
    e.uniform4iv(this.addr, t), mt(n, t);
  }
}
function dh(e, t) {
  const n = this.cache;
  n[0] !== t && (e.uniform1ui(this.addr, t), n[0] = t);
}
function fh(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y) && (e.uniform2ui(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
  else {
    if (pt(n, t)) return;
    e.uniform2uiv(this.addr, t), mt(n, t);
  }
}
function ph(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3ui(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
  else {
    if (pt(n, t)) return;
    e.uniform3uiv(this.addr, t), mt(n, t);
  }
}
function mh(e, t) {
  const n = this.cache;
  if (t.x !== void 0)
    (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4ui(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
  else {
    if (pt(n, t)) return;
    e.uniform4uiv(this.addr, t), mt(n, t);
  }
}
function _h(e, t, n) {
  const i = this.cache, r = n.allocateTextureUnit();
  i[0] !== r && (e.uniform1i(this.addr, r), i[0] = r);
  let s;
  this.type === e.SAMPLER_2D_SHADOW ? (qr.compareFunction = n.isReversedDepthBuffer() ? 518 : 515, s = qr) : s = Ka, n.setTexture2D(t || s, r);
}
function gh(e, t, n) {
  const i = this.cache, r = n.allocateTextureUnit();
  i[0] !== r && (e.uniform1i(this.addr, r), i[0] = r), n.setTexture3D(t || $a, r);
}
function vh(e, t, n) {
  const i = this.cache, r = n.allocateTextureUnit();
  i[0] !== r && (e.uniform1i(this.addr, r), i[0] = r), n.setTextureCube(t || Ja, r);
}
function Mh(e, t, n) {
  const i = this.cache, r = n.allocateTextureUnit();
  i[0] !== r && (e.uniform1i(this.addr, r), i[0] = r), n.setTexture2DArray(t || Za, r);
}
function Sh(e) {
  switch (e) {
    case 5126:
      return th;
    case 35664:
      return nh;
    case 35665:
      return ih;
    case 35666:
      return rh;
    case 35674:
      return sh;
    case 35675:
      return ah;
    case 35676:
      return oh;
    case 5124:
    case 35670:
      return lh;
    case 35667:
    case 35671:
      return ch;
    case 35668:
    case 35672:
      return hh;
    case 35669:
    case 35673:
      return uh;
    case 5125:
      return dh;
    case 36294:
      return fh;
    case 36295:
      return ph;
    case 36296:
      return mh;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return _h;
    case 35679:
    case 36299:
    case 36307:
      return gh;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return vh;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return Mh;
  }
}
function xh(e, t) {
  e.uniform1fv(this.addr, t);
}
function Eh(e, t) {
  const n = ii(t, this.size, 2);
  e.uniform2fv(this.addr, n);
}
function yh(e, t) {
  const n = ii(t, this.size, 3);
  e.uniform3fv(this.addr, n);
}
function Th(e, t) {
  const n = ii(t, this.size, 4);
  e.uniform4fv(this.addr, n);
}
function bh(e, t) {
  const n = ii(t, this.size, 4);
  e.uniformMatrix2fv(this.addr, !1, n);
}
function Ah(e, t) {
  const n = ii(t, this.size, 9);
  e.uniformMatrix3fv(this.addr, !1, n);
}
function Rh(e, t) {
  const n = ii(t, this.size, 16);
  e.uniformMatrix4fv(this.addr, !1, n);
}
function wh(e, t) {
  e.uniform1iv(this.addr, t);
}
function Ch(e, t) {
  e.uniform2iv(this.addr, t);
}
function Ph(e, t) {
  e.uniform3iv(this.addr, t);
}
function Lh(e, t) {
  e.uniform4iv(this.addr, t);
}
function Dh(e, t) {
  e.uniform1uiv(this.addr, t);
}
function Ih(e, t) {
  e.uniform2uiv(this.addr, t);
}
function Uh(e, t) {
  e.uniform3uiv(this.addr, t);
}
function Nh(e, t) {
  e.uniform4uiv(this.addr, t);
}
function Oh(e, t, n) {
  const i = this.cache, r = t.length, s = ar(n, r);
  pt(i, s) || (e.uniform1iv(this.addr, s), mt(i, s));
  let a;
  this.type === e.SAMPLER_2D_SHADOW ? a = qr : a = Ka;
  for (let o = 0; o !== r; ++o) n.setTexture2D(t[o] || a, s[o]);
}
function Fh(e, t, n) {
  const i = this.cache, r = t.length, s = ar(n, r);
  pt(i, s) || (e.uniform1iv(this.addr, s), mt(i, s));
  for (let a = 0; a !== r; ++a) n.setTexture3D(t[a] || $a, s[a]);
}
function Bh(e, t, n) {
  const i = this.cache, r = t.length, s = ar(n, r);
  pt(i, s) || (e.uniform1iv(this.addr, s), mt(i, s));
  for (let a = 0; a !== r; ++a) n.setTextureCube(t[a] || Ja, s[a]);
}
function zh(e, t, n) {
  const i = this.cache, r = t.length, s = ar(n, r);
  pt(i, s) || (e.uniform1iv(this.addr, s), mt(i, s));
  for (let a = 0; a !== r; ++a) n.setTexture2DArray(t[a] || Za, s[a]);
}
function Vh(e) {
  switch (e) {
    case 5126:
      return xh;
    case 35664:
      return Eh;
    case 35665:
      return yh;
    case 35666:
      return Th;
    case 35674:
      return bh;
    case 35675:
      return Ah;
    case 35676:
      return Rh;
    case 5124:
    case 35670:
      return wh;
    case 35667:
    case 35671:
      return Ch;
    case 35668:
    case 35672:
      return Ph;
    case 35669:
    case 35673:
      return Lh;
    case 5125:
      return Dh;
    case 36294:
      return Ih;
    case 36295:
      return Uh;
    case 36296:
      return Nh;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return Oh;
    case 35679:
    case 36299:
    case 36307:
      return Fh;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return Bh;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return zh;
  }
}
var Gh = class {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = Sh(t.type);
  }
}, Hh = class {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = Vh(t.type);
  }
}, kh = class {
  constructor(e) {
    this.id = e, this.seq = [], this.map = {};
  }
  setValue(e, t, n) {
    const i = this.seq;
    for (let r = 0, s = i.length; r !== s; ++r) {
      const a = i[r];
      a.setValue(e, t[a.id], n);
    }
  }
}, Br = /(\w+)(\])?(\[|\.)?/g;
function ea(e, t) {
  e.seq.push(t), e.map[t.id] = t;
}
function Wh(e, t, n) {
  const i = e.name, r = i.length;
  for (Br.lastIndex = 0; ; ) {
    const s = Br.exec(i), a = Br.lastIndex;
    let o = s[1];
    const l = s[2] === "]", c = s[3];
    if (l && (o = o | 0), c === void 0 || c === "[" && a + 2 === r) {
      ea(n, c === void 0 ? new Gh(o, e, t) : new Hh(o, e, t));
      break;
    } else {
      let u = n.map[o];
      u === void 0 && (u = new kh(o), ea(n, u)), n = u;
    }
  }
}
var Ji = class {
  constructor(e, t) {
    this.seq = [], this.map = {};
    const n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let s = 0; s < n; ++s) {
      const a = e.getActiveUniform(t, s);
      Wh(a, e.getUniformLocation(t, a.name), this);
    }
    const i = [], r = [];
    for (const s of this.seq) s.type === e.SAMPLER_2D_SHADOW || s.type === e.SAMPLER_CUBE_SHADOW || s.type === e.SAMPLER_2D_ARRAY_SHADOW ? i.push(s) : r.push(s);
    i.length > 0 && (this.seq = i.concat(r));
  }
  setValue(e, t, n, i) {
    const r = this.map[t];
    r !== void 0 && r.setValue(e, n, i);
  }
  setOptional(e, t, n) {
    const i = t[n];
    i !== void 0 && this.setValue(e, n, i);
  }
  static upload(e, t, n, i) {
    for (let r = 0, s = t.length; r !== s; ++r) {
      const a = t[r], o = n[a.id];
      o.needsUpdate !== !1 && a.setValue(e, o.value, i);
    }
  }
  static seqWithValue(e, t) {
    const n = [];
    for (let i = 0, r = e.length; i !== r; ++i) {
      const s = e[i];
      s.id in t && n.push(s);
    }
    return n;
  }
};
function ta(e, t, n) {
  const i = e.createShader(t);
  return e.shaderSource(i, n), e.compileShader(i), i;
}
var Xh = 37297, Yh = 0;
function qh(e, t) {
  const n = e.split(`
`), i = [], r = Math.max(t - 6, 0), s = Math.min(t + 6, n.length);
  for (let a = r; a < s; a++) {
    const o = a + 1;
    i.push(`${o === t ? ">" : " "} ${o}: ${n[a]}`);
  }
  return i.join(`
`);
}
var na = /* @__PURE__ */ new Ie();
function jh(e) {
  We._getMatrix(na, We.workingColorSpace, e);
  const t = `mat3( ${na.elements.map((n) => n.toFixed(4))} )`;
  switch (We.getTransfer(e)) {
    case nr:
      return [t, "LinearTransferOETF"];
    case ir:
      return [t, "sRGBTransferOETF"];
    default:
      return Te("WebGLProgram: Unsupported color space: ", e), [t, "LinearTransferOETF"];
  }
}
function ia(e, t, n) {
  const i = e.getShaderParameter(t, e.COMPILE_STATUS), r = (e.getShaderInfoLog(t) || "").trim();
  if (i && r === "") return "";
  const s = /ERROR: 0:(\d+)/.exec(r);
  if (s) {
    const a = parseInt(s[1]);
    return n.toUpperCase() + `

` + r + `

` + qh(e.getShaderSource(t), a);
  } else return r;
}
function Kh(e, t) {
  const n = jh(t);
  return [
    `vec4 ${e}( vec4 value ) {`,
    `	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,
    "}"
  ].join(`
`);
}
var Zh = {
  1: "Linear",
  2: "Reinhard",
  3: "Cineon",
  4: "ACESFilmic",
  6: "AgX",
  7: "Neutral",
  5: "Custom"
};
function $h(e, t) {
  const n = Zh[t];
  return n === void 0 ? (Te("WebGLProgram: Unsupported toneMapping:", t), "vec3 " + e + "( vec3 color ) { return LinearToneMapping( color ); }") : "vec3 " + e + "( vec3 color ) { return " + n + "ToneMapping( color ); }";
}
var ji = /* @__PURE__ */ new O();
function Jh() {
  return We.getLuminanceCoefficients(ji), [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${ji.x.toFixed(4)}, ${ji.y.toFixed(4)}, ${ji.z.toFixed(4)} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function Qh(e) {
  return [e.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", e.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(di).join(`
`);
}
function eu(e) {
  const t = [];
  for (const n in e) {
    const i = e[n];
    i !== !1 && t.push("#define " + n + " " + i);
  }
  return t.join(`
`);
}
function tu(e, t) {
  const n = {}, i = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES);
  for (let r = 0; r < i; r++) {
    const s = e.getActiveAttrib(t, r), a = s.name;
    let o = 1;
    s.type === e.FLOAT_MAT2 && (o = 2), s.type === e.FLOAT_MAT3 && (o = 3), s.type === e.FLOAT_MAT4 && (o = 4), n[a] = {
      type: s.type,
      location: e.getAttribLocation(t, a),
      locationSize: o
    };
  }
  return n;
}
function di(e) {
  return e !== "";
}
function ra(e, t) {
  const n = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
  return e.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, n).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function sa(e, t) {
  return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
var nu = /^[ \t]*#include +<([\w\d./]+)>/gm;
function jr(e) {
  return e.replace(nu, ru);
}
var iu = /* @__PURE__ */ new Map();
function ru(e, t) {
  let n = Ue[t];
  if (n === void 0) {
    const i = iu.get(t);
    if (i !== void 0)
      n = Ue[i], Te('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', t, i);
    else throw new Error("Can not resolve #include <" + t + ">");
  }
  return jr(n);
}
var su = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function aa(e) {
  return e.replace(su, au);
}
function au(e, t, n, i) {
  let r = "";
  for (let s = parseInt(t); s < parseInt(n); s++) r += i.replace(/\[\s*i\s*\]/g, "[ " + s + " ]").replace(/UNROLLED_LOOP_INDEX/g, s);
  return r;
}
function oa(e) {
  let t = `precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;
  return e.precision === "highp" ? t += `
#define HIGH_PRECISION` : e.precision === "mediump" ? t += `
#define MEDIUM_PRECISION` : e.precision === "lowp" && (t += `
#define LOW_PRECISION`), t;
}
var ou = {
  1: "SHADOWMAP_TYPE_PCF",
  3: "SHADOWMAP_TYPE_VSM"
};
function lu(e) {
  return ou[e.shadowMapType] || "SHADOWMAP_TYPE_BASIC";
}
var cu = {
  301: "ENVMAP_TYPE_CUBE",
  302: "ENVMAP_TYPE_CUBE",
  306: "ENVMAP_TYPE_CUBE_UV"
};
function hu(e) {
  return e.envMap === !1 ? "ENVMAP_TYPE_CUBE" : cu[e.envMapMode] || "ENVMAP_TYPE_CUBE";
}
var uu = { 302: "ENVMAP_MODE_REFRACTION" };
function du(e) {
  return e.envMap === !1 ? "ENVMAP_MODE_REFLECTION" : uu[e.envMapMode] || "ENVMAP_MODE_REFLECTION";
}
var fu = {
  0: "ENVMAP_BLENDING_MULTIPLY",
  1: "ENVMAP_BLENDING_MIX",
  2: "ENVMAP_BLENDING_ADD"
};
function pu(e) {
  return e.envMap === !1 ? "ENVMAP_BLENDING_NONE" : fu[e.combine] || "ENVMAP_BLENDING_NONE";
}
function mu(e) {
  const t = e.envMapCubeUVHeight;
  if (t === null) return null;
  const n = Math.log2(t) - 2, i = 1 / t;
  return {
    texelWidth: 1 / (3 * Math.max(Math.pow(2, n), 112)),
    texelHeight: i,
    maxMip: n
  };
}
function _u(e, t, n, i) {
  const r = e.getContext(), s = n.defines;
  let a = n.vertexShader, o = n.fragmentShader;
  const l = lu(n), c = hu(n), u = du(n), d = pu(n), h = mu(n), _ = Qh(n), M = eu(s), S = r.createProgram();
  let p, f, y = n.glslVersion ? "#version " + n.glslVersion + `
` : "";
  n.isRawShaderMaterial ? (p = [
    "#define SHADER_TYPE " + n.shaderType,
    "#define SHADER_NAME " + n.shaderName,
    M
  ].filter(di).join(`
`), p.length > 0 && (p += `
`), f = [
    "#define SHADER_TYPE " + n.shaderType,
    "#define SHADER_NAME " + n.shaderName,
    M
  ].filter(di).join(`
`), f.length > 0 && (f += `
`)) : (p = [
    oa(n),
    "#define SHADER_TYPE " + n.shaderType,
    "#define SHADER_NAME " + n.shaderName,
    M,
    n.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
    n.batching ? "#define USE_BATCHING" : "",
    n.batchingColor ? "#define USE_BATCHING_COLOR" : "",
    n.instancing ? "#define USE_INSTANCING" : "",
    n.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    n.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
    n.useFog && n.fog ? "#define USE_FOG" : "",
    n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
    n.map ? "#define USE_MAP" : "",
    n.envMap ? "#define USE_ENVMAP" : "",
    n.envMap ? "#define " + u : "",
    n.lightMap ? "#define USE_LIGHTMAP" : "",
    n.aoMap ? "#define USE_AOMAP" : "",
    n.bumpMap ? "#define USE_BUMPMAP" : "",
    n.normalMap ? "#define USE_NORMALMAP" : "",
    n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    n.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    n.anisotropy ? "#define USE_ANISOTROPY" : "",
    n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    n.specularMap ? "#define USE_SPECULARMAP" : "",
    n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    n.metalnessMap ? "#define USE_METALNESSMAP" : "",
    n.alphaMap ? "#define USE_ALPHAMAP" : "",
    n.alphaHash ? "#define USE_ALPHAHASH" : "",
    n.transmission ? "#define USE_TRANSMISSION" : "",
    n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    n.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    n.mapUv ? "#define MAP_UV " + n.mapUv : "",
    n.alphaMapUv ? "#define ALPHAMAP_UV " + n.alphaMapUv : "",
    n.lightMapUv ? "#define LIGHTMAP_UV " + n.lightMapUv : "",
    n.aoMapUv ? "#define AOMAP_UV " + n.aoMapUv : "",
    n.emissiveMapUv ? "#define EMISSIVEMAP_UV " + n.emissiveMapUv : "",
    n.bumpMapUv ? "#define BUMPMAP_UV " + n.bumpMapUv : "",
    n.normalMapUv ? "#define NORMALMAP_UV " + n.normalMapUv : "",
    n.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + n.displacementMapUv : "",
    n.metalnessMapUv ? "#define METALNESSMAP_UV " + n.metalnessMapUv : "",
    n.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + n.roughnessMapUv : "",
    n.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + n.anisotropyMapUv : "",
    n.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + n.clearcoatMapUv : "",
    n.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + n.clearcoatNormalMapUv : "",
    n.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + n.clearcoatRoughnessMapUv : "",
    n.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + n.iridescenceMapUv : "",
    n.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + n.iridescenceThicknessMapUv : "",
    n.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + n.sheenColorMapUv : "",
    n.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + n.sheenRoughnessMapUv : "",
    n.specularMapUv ? "#define SPECULARMAP_UV " + n.specularMapUv : "",
    n.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + n.specularColorMapUv : "",
    n.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + n.specularIntensityMapUv : "",
    n.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + n.transmissionMapUv : "",
    n.thicknessMapUv ? "#define THICKNESSMAP_UV " + n.thicknessMapUv : "",
    n.vertexTangents && n.flatShading === !1 ? "#define USE_TANGENT" : "",
    n.vertexNormals ? "#define HAS_NORMAL" : "",
    n.vertexColors ? "#define USE_COLOR" : "",
    n.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    n.vertexUv1s ? "#define USE_UV1" : "",
    n.vertexUv2s ? "#define USE_UV2" : "",
    n.vertexUv3s ? "#define USE_UV3" : "",
    n.pointsUvs ? "#define USE_POINTS_UV" : "",
    n.flatShading ? "#define FLAT_SHADED" : "",
    n.skinning ? "#define USE_SKINNING" : "",
    n.morphTargets ? "#define USE_MORPHTARGETS" : "",
    n.morphNormals && n.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    n.morphColors ? "#define USE_MORPHCOLORS" : "",
    n.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + n.morphTextureStride : "",
    n.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + n.morphTargetsCount : "",
    n.doubleSided ? "#define DOUBLE_SIDED" : "",
    n.flipSided ? "#define FLIP_SIDED" : "",
    n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    n.shadowMapEnabled ? "#define " + l : "",
    n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    n.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
    n.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
    "uniform mat4 modelMatrix;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "uniform mat4 viewMatrix;",
    "uniform mat3 normalMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    "#ifdef USE_INSTANCING",
    "	attribute mat4 instanceMatrix;",
    "#endif",
    "#ifdef USE_INSTANCING_COLOR",
    "	attribute vec3 instanceColor;",
    "#endif",
    "#ifdef USE_INSTANCING_MORPH",
    "	uniform sampler2D morphTexture;",
    "#endif",
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef USE_UV1",
    "	attribute vec2 uv1;",
    "#endif",
    "#ifdef USE_UV2",
    "	attribute vec2 uv2;",
    "#endif",
    "#ifdef USE_UV3",
    "	attribute vec2 uv3;",
    "#endif",
    "#ifdef USE_TANGENT",
    "	attribute vec4 tangent;",
    "#endif",
    "#if defined( USE_COLOR_ALPHA )",
    "	attribute vec4 color;",
    "#elif defined( USE_COLOR )",
    "	attribute vec3 color;",
    "#endif",
    "#ifdef USE_SKINNING",
    "	attribute vec4 skinIndex;",
    "	attribute vec4 skinWeight;",
    "#endif",
    `
`
  ].filter(di).join(`
`), f = [
    oa(n),
    "#define SHADER_TYPE " + n.shaderType,
    "#define SHADER_NAME " + n.shaderName,
    M,
    n.useFog && n.fog ? "#define USE_FOG" : "",
    n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
    n.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    n.map ? "#define USE_MAP" : "",
    n.matcap ? "#define USE_MATCAP" : "",
    n.envMap ? "#define USE_ENVMAP" : "",
    n.envMap ? "#define " + c : "",
    n.envMap ? "#define " + u : "",
    n.envMap ? "#define " + d : "",
    h ? "#define CUBEUV_TEXEL_WIDTH " + h.texelWidth : "",
    h ? "#define CUBEUV_TEXEL_HEIGHT " + h.texelHeight : "",
    h ? "#define CUBEUV_MAX_MIP " + h.maxMip + ".0" : "",
    n.lightMap ? "#define USE_LIGHTMAP" : "",
    n.aoMap ? "#define USE_AOMAP" : "",
    n.bumpMap ? "#define USE_BUMPMAP" : "",
    n.normalMap ? "#define USE_NORMALMAP" : "",
    n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    n.packedNormalMap ? "#define USE_PACKED_NORMALMAP" : "",
    n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    n.anisotropy ? "#define USE_ANISOTROPY" : "",
    n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    n.clearcoat ? "#define USE_CLEARCOAT" : "",
    n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    n.dispersion ? "#define USE_DISPERSION" : "",
    n.iridescence ? "#define USE_IRIDESCENCE" : "",
    n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    n.specularMap ? "#define USE_SPECULARMAP" : "",
    n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    n.metalnessMap ? "#define USE_METALNESSMAP" : "",
    n.alphaMap ? "#define USE_ALPHAMAP" : "",
    n.alphaTest ? "#define USE_ALPHATEST" : "",
    n.alphaHash ? "#define USE_ALPHAHASH" : "",
    n.sheen ? "#define USE_SHEEN" : "",
    n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    n.transmission ? "#define USE_TRANSMISSION" : "",
    n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    n.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    n.vertexTangents && n.flatShading === !1 ? "#define USE_TANGENT" : "",
    n.vertexColors || n.instancingColor ? "#define USE_COLOR" : "",
    n.vertexAlphas || n.batchingColor ? "#define USE_COLOR_ALPHA" : "",
    n.vertexUv1s ? "#define USE_UV1" : "",
    n.vertexUv2s ? "#define USE_UV2" : "",
    n.vertexUv3s ? "#define USE_UV3" : "",
    n.pointsUvs ? "#define USE_POINTS_UV" : "",
    n.gradientMap ? "#define USE_GRADIENTMAP" : "",
    n.flatShading ? "#define FLAT_SHADED" : "",
    n.doubleSided ? "#define DOUBLE_SIDED" : "",
    n.flipSided ? "#define FLIP_SIDED" : "",
    n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    n.shadowMapEnabled ? "#define " + l : "",
    n.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    n.numLightProbeGrids > 0 ? "#define USE_LIGHT_PROBES_GRID" : "",
    n.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    n.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
    n.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
    n.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    n.toneMapping !== 0 ? "#define TONE_MAPPING" : "",
    n.toneMapping !== 0 ? Ue.tonemapping_pars_fragment : "",
    n.toneMapping !== 0 ? $h("toneMapping", n.toneMapping) : "",
    n.dithering ? "#define DITHERING" : "",
    n.opaque ? "#define OPAQUE" : "",
    Ue.colorspace_pars_fragment,
    Kh("linearToOutputTexel", n.outputColorSpace),
    Jh(),
    n.useDepthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "",
    `
`
  ].filter(di).join(`
`)), a = jr(a), a = ra(a, n), a = sa(a, n), o = jr(o), o = ra(o, n), o = sa(o, n), a = aa(a), o = aa(o), n.isRawShaderMaterial !== !0 && (y = `#version 300 es
`, p = [
    _,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + p, f = [
    "#define varying in",
    n.glslVersion === "300 es" ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    n.glslVersion === "300 es" ? "" : "#define gl_FragColor pc_fragColor",
    "#define gl_FragDepthEXT gl_FragDepth",
    "#define texture2D texture",
    "#define textureCube texture",
    "#define texture2DProj textureProj",
    "#define texture2DLodEXT textureLod",
    "#define texture2DProjLodEXT textureProjLod",
    "#define textureCubeLodEXT textureLod",
    "#define texture2DGradEXT textureGrad",
    "#define texture2DProjGradEXT textureProjGrad",
    "#define textureCubeGradEXT textureGrad"
  ].join(`
`) + `
` + f);
  const b = y + p + a, T = y + f + o, P = ta(r, r.VERTEX_SHADER, b), R = ta(r, r.FRAGMENT_SHADER, T);
  r.attachShader(S, P), r.attachShader(S, R), n.index0AttributeName !== void 0 ? r.bindAttribLocation(S, 0, n.index0AttributeName) : n.morphTargets === !0 && r.bindAttribLocation(S, 0, "position"), r.linkProgram(S);
  function D(A) {
    if (e.debug.checkShaderErrors) {
      const k = r.getProgramInfoLog(S) || "", Y = r.getShaderInfoLog(P) || "", B = r.getShaderInfoLog(R) || "", G = k.trim(), H = Y.trim(), z = B.trim();
      let J = !0, te = !0;
      if (r.getProgramParameter(S, r.LINK_STATUS) === !1)
        if (J = !1, typeof e.debug.onShaderError == "function") e.debug.onShaderError(r, S, P, R);
        else {
          const re = ia(r, P, "vertex"), ge = ia(r, R, "fragment");
          Pe("THREE.WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(S, r.VALIDATE_STATUS) + `

Material Name: ` + A.name + `
Material Type: ` + A.type + `

Program Info Log: ` + G + `
` + re + `
` + ge);
        }
      else G !== "" ? Te("WebGLProgram: Program Info Log:", G) : (H === "" || z === "") && (te = !1);
      te && (A.diagnostics = {
        runnable: J,
        programLog: G,
        vertexShader: {
          log: H,
          prefix: p
        },
        fragmentShader: {
          log: z,
          prefix: f
        }
      });
    }
    r.deleteShader(P), r.deleteShader(R), v = new Ji(r, S), E = tu(r, S);
  }
  let v;
  this.getUniforms = function() {
    return v === void 0 && D(this), v;
  };
  let E;
  this.getAttributes = function() {
    return E === void 0 && D(this), E;
  };
  let X = n.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return X === !1 && (X = r.getProgramParameter(S, Xh)), X;
  }, this.destroy = function() {
    i.releaseStatesOfProgram(this), r.deleteProgram(S), this.program = void 0;
  }, this.type = n.shaderType, this.name = n.shaderName, this.id = Yh++, this.cacheKey = t, this.usedTimes = 1, this.program = S, this.vertexShader = P, this.fragmentShader = R, this;
}
var gu = 0, vu = class {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(e) {
    const t = e.vertexShader, n = e.fragmentShader, i = this._getShaderStage(t), r = this._getShaderStage(n), s = this._getShaderCacheForMaterial(e);
    return s.has(i) === !1 && (s.add(i), i.usedTimes++), s.has(r) === !1 && (s.add(r), r.usedTimes++), this;
  }
  remove(e) {
    const t = this.materialCache.get(e);
    for (const n of t)
      n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code);
    return this.materialCache.delete(e), this;
  }
  getVertexShaderID(e) {
    return this._getShaderStage(e.vertexShader).id;
  }
  getFragmentShaderID(e) {
    return this._getShaderStage(e.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(e) {
    const t = this.materialCache;
    let n = t.get(e);
    return n === void 0 && (n = /* @__PURE__ */ new Set(), t.set(e, n)), n;
  }
  _getShaderStage(e) {
    const t = this.shaderCache;
    let n = t.get(e);
    return n === void 0 && (n = new Mu(e), t.set(e, n)), n;
  }
}, Mu = class {
  constructor(e) {
    this.id = gu++, this.code = e, this.usedTimes = 0;
  }
};
function Su(e) {
  return e === 1030 || e === 37490 || e === 36285;
}
function xu(e, t, n, i, r, s) {
  const a = new Ca(), o = new vu(), l = /* @__PURE__ */ new Set(), c = [], u = /* @__PURE__ */ new Map(), d = i.logarithmicDepthBuffer;
  let h = i.precision;
  const _ = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distance",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function M(v) {
    return l.add(v), v === 0 ? "uv" : `uv${v}`;
  }
  function S(v, E, X, A, k, Y) {
    const B = A.fog, G = k.geometry, H = v.isMeshStandardMaterial || v.isMeshLambertMaterial || v.isMeshPhongMaterial ? A.environment : null, z = v.isMeshStandardMaterial || v.isMeshLambertMaterial && !v.envMap || v.isMeshPhongMaterial && !v.envMap, J = t.get(v.envMap || H, z), te = J && J.mapping === 306 ? J.image.height : null, re = _[v.type];
    v.precision !== null && (h = i.getMaxPrecision(v.precision), h !== v.precision && Te("WebGLProgram.getParameters:", v.precision, "not supported, using", h, "instead."));
    const ge = G.morphAttributes.position || G.morphAttributes.normal || G.morphAttributes.color, xe = ge !== void 0 ? ge.length : 0;
    let Ke = 0;
    G.morphAttributes.position !== void 0 && (Ke = 1), G.morphAttributes.normal !== void 0 && (Ke = 2), G.morphAttributes.color !== void 0 && (Ke = 3);
    let Ve, q, ae, ve;
    if (re) {
      const we = qt[re];
      Ve = we.vertexShader, q = we.fragmentShader;
    } else
      Ve = v.vertexShader, q = v.fragmentShader, o.update(v), ae = o.getVertexShaderID(v), ve = o.getFragmentShaderID(v);
    const de = e.getRenderTarget(), be = e.state.buffers.depth.getReversed(), Le = k.isInstancedMesh === !0, Re = k.isBatchedMesh === !0, Ze = !!v.map, Ge = !!v.matcap, ut = !!J, at = !!v.aoMap, Rt = !!v.lightMap, gt = !!v.bumpMap, lt = !!v.normalMap, C = !!v.displacementMap, xt = !!v.emissiveMap, He = !!v.metalnessMap, Ye = !!v.roughnessMap, he = v.anisotropy > 0, nt = v.clearcoat > 0, Ee = v.dispersion > 0, x = v.iridescence > 0, m = v.sheen > 0, U = v.transmission > 0, j = he && !!v.anisotropyMap, Z = nt && !!v.clearcoatMap, ee = nt && !!v.clearcoatNormalMap, oe = nt && !!v.clearcoatRoughnessMap, L = x && !!v.iridescenceMap, ie = x && !!v.iridescenceThicknessMap, le = m && !!v.sheenColorMap, fe = m && !!v.sheenRoughnessMap, K = !!v.specularMap, Ae = !!v.specularColorMap, De = !!v.specularIntensityMap, ke = U && !!v.transmissionMap, Oe = U && !!v.thicknessMap, w = !!v.gradientMap, W = !!v.alphaMap, Q = v.alphaTest > 0, se = !!v.alphaHash, Me = !!v.extensions;
    let $ = 0;
    v.toneMapped && (de === null || de.isXRRenderTarget === !0) && ($ = e.toneMapping);
    const Se = {
      shaderID: re,
      shaderType: v.type,
      shaderName: v.name,
      vertexShader: Ve,
      fragmentShader: q,
      defines: v.defines,
      customVertexShaderID: ae,
      customFragmentShaderID: ve,
      isRawShaderMaterial: v.isRawShaderMaterial === !0,
      glslVersion: v.glslVersion,
      precision: h,
      batching: Re,
      batchingColor: Re && k._colorsTexture !== null,
      instancing: Le,
      instancingColor: Le && k.instanceColor !== null,
      instancingMorph: Le && k.morphTexture !== null,
      outputColorSpace: de === null ? e.outputColorSpace : de.isXRRenderTarget === !0 ? de.texture.colorSpace : We.workingColorSpace,
      alphaToCoverage: !!v.alphaToCoverage,
      map: Ze,
      matcap: Ge,
      envMap: ut,
      envMapMode: ut && J.mapping,
      envMapCubeUVHeight: te,
      aoMap: at,
      lightMap: Rt,
      bumpMap: gt,
      normalMap: lt,
      displacementMap: C,
      emissiveMap: xt,
      normalMapObjectSpace: lt && v.normalMapType === 1,
      normalMapTangentSpace: lt && v.normalMapType === 0,
      packedNormalMap: lt && v.normalMapType === 0 && Su(v.normalMap.format),
      metalnessMap: He,
      roughnessMap: Ye,
      anisotropy: he,
      anisotropyMap: j,
      clearcoat: nt,
      clearcoatMap: Z,
      clearcoatNormalMap: ee,
      clearcoatRoughnessMap: oe,
      dispersion: Ee,
      iridescence: x,
      iridescenceMap: L,
      iridescenceThicknessMap: ie,
      sheen: m,
      sheenColorMap: le,
      sheenRoughnessMap: fe,
      specularMap: K,
      specularColorMap: Ae,
      specularIntensityMap: De,
      transmission: U,
      transmissionMap: ke,
      thicknessMap: Oe,
      gradientMap: w,
      opaque: v.transparent === !1 && v.blending === 1 && v.alphaToCoverage === !1,
      alphaMap: W,
      alphaTest: Q,
      alphaHash: se,
      combine: v.combine,
      mapUv: Ze && M(v.map.channel),
      aoMapUv: at && M(v.aoMap.channel),
      lightMapUv: Rt && M(v.lightMap.channel),
      bumpMapUv: gt && M(v.bumpMap.channel),
      normalMapUv: lt && M(v.normalMap.channel),
      displacementMapUv: C && M(v.displacementMap.channel),
      emissiveMapUv: xt && M(v.emissiveMap.channel),
      metalnessMapUv: He && M(v.metalnessMap.channel),
      roughnessMapUv: Ye && M(v.roughnessMap.channel),
      anisotropyMapUv: j && M(v.anisotropyMap.channel),
      clearcoatMapUv: Z && M(v.clearcoatMap.channel),
      clearcoatNormalMapUv: ee && M(v.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: oe && M(v.clearcoatRoughnessMap.channel),
      iridescenceMapUv: L && M(v.iridescenceMap.channel),
      iridescenceThicknessMapUv: ie && M(v.iridescenceThicknessMap.channel),
      sheenColorMapUv: le && M(v.sheenColorMap.channel),
      sheenRoughnessMapUv: fe && M(v.sheenRoughnessMap.channel),
      specularMapUv: K && M(v.specularMap.channel),
      specularColorMapUv: Ae && M(v.specularColorMap.channel),
      specularIntensityMapUv: De && M(v.specularIntensityMap.channel),
      transmissionMapUv: ke && M(v.transmissionMap.channel),
      thicknessMapUv: Oe && M(v.thicknessMap.channel),
      alphaMapUv: W && M(v.alphaMap.channel),
      vertexTangents: !!G.attributes.tangent && (lt || he),
      vertexNormals: !!G.attributes.normal,
      vertexColors: v.vertexColors,
      vertexAlphas: v.vertexColors === !0 && !!G.attributes.color && G.attributes.color.itemSize === 4,
      pointsUvs: k.isPoints === !0 && !!G.attributes.uv && (Ze || W),
      fog: !!B,
      useFog: v.fog === !0,
      fogExp2: !!B && B.isFogExp2,
      flatShading: v.wireframe === !1 && (v.flatShading === !0 || G.attributes.normal === void 0 && lt === !1 && (v.isMeshLambertMaterial || v.isMeshPhongMaterial || v.isMeshStandardMaterial || v.isMeshPhysicalMaterial)),
      sizeAttenuation: v.sizeAttenuation === !0,
      logarithmicDepthBuffer: d,
      reversedDepthBuffer: be,
      skinning: k.isSkinnedMesh === !0,
      morphTargets: G.morphAttributes.position !== void 0,
      morphNormals: G.morphAttributes.normal !== void 0,
      morphColors: G.morphAttributes.color !== void 0,
      morphTargetsCount: xe,
      morphTextureStride: Ke,
      numDirLights: E.directional.length,
      numPointLights: E.point.length,
      numSpotLights: E.spot.length,
      numSpotLightMaps: E.spotLightMap.length,
      numRectAreaLights: E.rectArea.length,
      numHemiLights: E.hemi.length,
      numDirLightShadows: E.directionalShadowMap.length,
      numPointLightShadows: E.pointShadowMap.length,
      numSpotLightShadows: E.spotShadowMap.length,
      numSpotLightShadowsWithMaps: E.numSpotLightShadowsWithMaps,
      numLightProbes: E.numLightProbes,
      numLightProbeGrids: Y.length,
      numClippingPlanes: s.numPlanes,
      numClipIntersection: s.numIntersection,
      dithering: v.dithering,
      shadowMapEnabled: e.shadowMap.enabled && X.length > 0,
      shadowMapType: e.shadowMap.type,
      toneMapping: $,
      decodeVideoTexture: Ze && v.map.isVideoTexture === !0 && We.getTransfer(v.map.colorSpace) === "srgb",
      decodeVideoTextureEmissive: xt && v.emissiveMap.isVideoTexture === !0 && We.getTransfer(v.emissiveMap.colorSpace) === "srgb",
      premultipliedAlpha: v.premultipliedAlpha,
      doubleSided: v.side === 2,
      flipSided: v.side === 1,
      useDepthPacking: v.depthPacking >= 0,
      depthPacking: v.depthPacking || 0,
      index0AttributeName: v.index0AttributeName,
      extensionClipCullDistance: Me && v.extensions.clipCullDistance === !0 && n.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (Me && v.extensions.multiDraw === !0 || Re) && n.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: v.customProgramCacheKey()
    };
    return Se.vertexUv1s = l.has(1), Se.vertexUv2s = l.has(2), Se.vertexUv3s = l.has(3), l.clear(), Se;
  }
  function p(v) {
    const E = [];
    if (v.shaderID ? E.push(v.shaderID) : (E.push(v.customVertexShaderID), E.push(v.customFragmentShaderID)), v.defines !== void 0) for (const X in v.defines)
      E.push(X), E.push(v.defines[X]);
    return v.isRawShaderMaterial === !1 && (f(E, v), y(E, v), E.push(e.outputColorSpace)), E.push(v.customProgramCacheKey), E.join();
  }
  function f(v, E) {
    v.push(E.precision), v.push(E.outputColorSpace), v.push(E.envMapMode), v.push(E.envMapCubeUVHeight), v.push(E.mapUv), v.push(E.alphaMapUv), v.push(E.lightMapUv), v.push(E.aoMapUv), v.push(E.bumpMapUv), v.push(E.normalMapUv), v.push(E.displacementMapUv), v.push(E.emissiveMapUv), v.push(E.metalnessMapUv), v.push(E.roughnessMapUv), v.push(E.anisotropyMapUv), v.push(E.clearcoatMapUv), v.push(E.clearcoatNormalMapUv), v.push(E.clearcoatRoughnessMapUv), v.push(E.iridescenceMapUv), v.push(E.iridescenceThicknessMapUv), v.push(E.sheenColorMapUv), v.push(E.sheenRoughnessMapUv), v.push(E.specularMapUv), v.push(E.specularColorMapUv), v.push(E.specularIntensityMapUv), v.push(E.transmissionMapUv), v.push(E.thicknessMapUv), v.push(E.combine), v.push(E.fogExp2), v.push(E.sizeAttenuation), v.push(E.morphTargetsCount), v.push(E.morphAttributeCount), v.push(E.numDirLights), v.push(E.numPointLights), v.push(E.numSpotLights), v.push(E.numSpotLightMaps), v.push(E.numHemiLights), v.push(E.numRectAreaLights), v.push(E.numDirLightShadows), v.push(E.numPointLightShadows), v.push(E.numSpotLightShadows), v.push(E.numSpotLightShadowsWithMaps), v.push(E.numLightProbes), v.push(E.shadowMapType), v.push(E.toneMapping), v.push(E.numClippingPlanes), v.push(E.numClipIntersection), v.push(E.depthPacking);
  }
  function y(v, E) {
    a.disableAll(), E.instancing && a.enable(0), E.instancingColor && a.enable(1), E.instancingMorph && a.enable(2), E.matcap && a.enable(3), E.envMap && a.enable(4), E.normalMapObjectSpace && a.enable(5), E.normalMapTangentSpace && a.enable(6), E.clearcoat && a.enable(7), E.iridescence && a.enable(8), E.alphaTest && a.enable(9), E.vertexColors && a.enable(10), E.vertexAlphas && a.enable(11), E.vertexUv1s && a.enable(12), E.vertexUv2s && a.enable(13), E.vertexUv3s && a.enable(14), E.vertexTangents && a.enable(15), E.anisotropy && a.enable(16), E.alphaHash && a.enable(17), E.batching && a.enable(18), E.dispersion && a.enable(19), E.batchingColor && a.enable(20), E.gradientMap && a.enable(21), E.packedNormalMap && a.enable(22), E.vertexNormals && a.enable(23), v.push(a.mask), a.disableAll(), E.fog && a.enable(0), E.useFog && a.enable(1), E.flatShading && a.enable(2), E.logarithmicDepthBuffer && a.enable(3), E.reversedDepthBuffer && a.enable(4), E.skinning && a.enable(5), E.morphTargets && a.enable(6), E.morphNormals && a.enable(7), E.morphColors && a.enable(8), E.premultipliedAlpha && a.enable(9), E.shadowMapEnabled && a.enable(10), E.doubleSided && a.enable(11), E.flipSided && a.enable(12), E.useDepthPacking && a.enable(13), E.dithering && a.enable(14), E.transmission && a.enable(15), E.sheen && a.enable(16), E.opaque && a.enable(17), E.pointsUvs && a.enable(18), E.decodeVideoTexture && a.enable(19), E.decodeVideoTextureEmissive && a.enable(20), E.alphaToCoverage && a.enable(21), E.numLightProbeGrids > 0 && a.enable(22), v.push(a.mask);
  }
  function b(v) {
    const E = _[v.type];
    let X;
    if (E) {
      const A = qt[E];
      X = Jl.clone(A.uniforms);
    } else X = v.uniforms;
    return X;
  }
  function T(v, E) {
    let X = u.get(E);
    return X !== void 0 ? ++X.usedTimes : (X = new _u(e, E, v, r), c.push(X), u.set(E, X)), X;
  }
  function P(v) {
    if (--v.usedTimes === 0) {
      const E = c.indexOf(v);
      c[E] = c[c.length - 1], c.pop(), u.delete(v.cacheKey), v.destroy();
    }
  }
  function R(v) {
    o.remove(v);
  }
  function D() {
    o.dispose();
  }
  return {
    getParameters: S,
    getProgramCacheKey: p,
    getUniforms: b,
    acquireProgram: T,
    releaseProgram: P,
    releaseShaderCache: R,
    programs: c,
    dispose: D
  };
}
function Eu() {
  let e = /* @__PURE__ */ new WeakMap();
  function t(a) {
    return e.has(a);
  }
  function n(a) {
    let o = e.get(a);
    return o === void 0 && (o = {}, e.set(a, o)), o;
  }
  function i(a) {
    e.delete(a);
  }
  function r(a, o, l) {
    e.get(a)[o] = l;
  }
  function s() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    has: t,
    get: n,
    remove: i,
    update: r,
    dispose: s
  };
}
function yu(e, t) {
  return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.material.id !== t.material.id ? e.material.id - t.material.id : e.materialVariant !== t.materialVariant ? e.materialVariant - t.materialVariant : e.z !== t.z ? e.z - t.z : e.id - t.id;
}
function la(e, t) {
  return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.z !== t.z ? t.z - e.z : e.id - t.id;
}
function ca() {
  const e = [];
  let t = 0;
  const n = [], i = [], r = [];
  function s() {
    t = 0, n.length = 0, i.length = 0, r.length = 0;
  }
  function a(h) {
    let _ = 0;
    return h.isInstancedMesh && (_ += 2), h.isSkinnedMesh && (_ += 1), _;
  }
  function o(h, _, M, S, p, f) {
    let y = e[t];
    return y === void 0 ? (y = {
      id: h.id,
      object: h,
      geometry: _,
      material: M,
      materialVariant: a(h),
      groupOrder: S,
      renderOrder: h.renderOrder,
      z: p,
      group: f
    }, e[t] = y) : (y.id = h.id, y.object = h, y.geometry = _, y.material = M, y.materialVariant = a(h), y.groupOrder = S, y.renderOrder = h.renderOrder, y.z = p, y.group = f), t++, y;
  }
  function l(h, _, M, S, p, f) {
    const y = o(h, _, M, S, p, f);
    M.transmission > 0 ? i.push(y) : M.transparent === !0 ? r.push(y) : n.push(y);
  }
  function c(h, _, M, S, p, f) {
    const y = o(h, _, M, S, p, f);
    M.transmission > 0 ? i.unshift(y) : M.transparent === !0 ? r.unshift(y) : n.unshift(y);
  }
  function u(h, _) {
    n.length > 1 && n.sort(h || yu), i.length > 1 && i.sort(_ || la), r.length > 1 && r.sort(_ || la);
  }
  function d() {
    for (let h = t, _ = e.length; h < _; h++) {
      const M = e[h];
      if (M.id === null) break;
      M.id = null, M.object = null, M.geometry = null, M.material = null, M.group = null;
    }
  }
  return {
    opaque: n,
    transmissive: i,
    transparent: r,
    init: s,
    push: l,
    unshift: c,
    finish: d,
    sort: u
  };
}
function Tu() {
  let e = /* @__PURE__ */ new WeakMap();
  function t(i, r) {
    const s = e.get(i);
    let a;
    return s === void 0 ? (a = new ca(), e.set(i, [a])) : r >= s.length ? (a = new ca(), s.push(a)) : a = s[r], a;
  }
  function n() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: n
  };
}
function bu() {
  const e = {};
  return { get: function(t) {
    if (e[t.id] !== void 0) return e[t.id];
    let n;
    switch (t.type) {
      case "DirectionalLight":
        n = {
          direction: new O(),
          color: new Xe()
        };
        break;
      case "SpotLight":
        n = {
          position: new O(),
          direction: new O(),
          color: new Xe(),
          distance: 0,
          coneCos: 0,
          penumbraCos: 0,
          decay: 0
        };
        break;
      case "PointLight":
        n = {
          position: new O(),
          color: new Xe(),
          distance: 0,
          decay: 0
        };
        break;
      case "HemisphereLight":
        n = {
          direction: new O(),
          skyColor: new Xe(),
          groundColor: new Xe()
        };
        break;
      case "RectAreaLight":
        n = {
          color: new Xe(),
          position: new O(),
          halfWidth: new O(),
          halfHeight: new O()
        };
        break;
    }
    return e[t.id] = n, n;
  } };
}
function Au() {
  const e = {};
  return { get: function(t) {
    if (e[t.id] !== void 0) return e[t.id];
    let n;
    switch (t.type) {
      case "DirectionalLight":
        n = {
          shadowIntensity: 1,
          shadowBias: 0,
          shadowNormalBias: 0,
          shadowRadius: 1,
          shadowMapSize: new Ne()
        };
        break;
      case "SpotLight":
        n = {
          shadowIntensity: 1,
          shadowBias: 0,
          shadowNormalBias: 0,
          shadowRadius: 1,
          shadowMapSize: new Ne()
        };
        break;
      case "PointLight":
        n = {
          shadowIntensity: 1,
          shadowBias: 0,
          shadowNormalBias: 0,
          shadowRadius: 1,
          shadowMapSize: new Ne(),
          shadowCameraNear: 1,
          shadowCameraFar: 1e3
        };
        break;
    }
    return e[t.id] = n, n;
  } };
}
var Ru = 0;
function wu(e, t) {
  return (t.castShadow ? 2 : 0) - (e.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (e.map ? 1 : 0);
}
function Cu(e) {
  const t = new bu(), n = Au(), i = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1,
      numLightProbes: -1
    },
    ambient: [
      0,
      0,
      0
    ],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0,
    numLightProbes: 0
  };
  for (let c = 0; c < 9; c++) i.probe.push(new O());
  const r = new O(), s = new ft(), a = new ft();
  function o(c) {
    let u = 0, d = 0, h = 0;
    for (let E = 0; E < 9; E++) i.probe[E].set(0, 0, 0);
    let _ = 0, M = 0, S = 0, p = 0, f = 0, y = 0, b = 0, T = 0, P = 0, R = 0, D = 0;
    c.sort(wu);
    for (let E = 0, X = c.length; E < X; E++) {
      const A = c[E], k = A.color, Y = A.intensity, B = A.distance;
      let G = null;
      if (A.shadow && A.shadow.map && (A.shadow.map.texture.format === 1030 ? G = A.shadow.map.texture : G = A.shadow.map.depthTexture || A.shadow.map.texture), A.isAmbientLight)
        u += k.r * Y, d += k.g * Y, h += k.b * Y;
      else if (A.isLightProbe) {
        for (let H = 0; H < 9; H++) i.probe[H].addScaledVector(A.sh.coefficients[H], Y);
        D++;
      } else if (A.isDirectionalLight) {
        const H = t.get(A);
        if (H.color.copy(A.color).multiplyScalar(A.intensity), A.castShadow) {
          const z = A.shadow, J = n.get(A);
          J.shadowIntensity = z.intensity, J.shadowBias = z.bias, J.shadowNormalBias = z.normalBias, J.shadowRadius = z.radius, J.shadowMapSize = z.mapSize, i.directionalShadow[_] = J, i.directionalShadowMap[_] = G, i.directionalShadowMatrix[_] = A.shadow.matrix, y++;
        }
        i.directional[_] = H, _++;
      } else if (A.isSpotLight) {
        const H = t.get(A);
        H.position.setFromMatrixPosition(A.matrixWorld), H.color.copy(k).multiplyScalar(Y), H.distance = B, H.coneCos = Math.cos(A.angle), H.penumbraCos = Math.cos(A.angle * (1 - A.penumbra)), H.decay = A.decay, i.spot[S] = H;
        const z = A.shadow;
        if (A.map && (i.spotLightMap[P] = A.map, P++, z.updateMatrices(A), A.castShadow && R++), i.spotLightMatrix[S] = z.matrix, A.castShadow) {
          const J = n.get(A);
          J.shadowIntensity = z.intensity, J.shadowBias = z.bias, J.shadowNormalBias = z.normalBias, J.shadowRadius = z.radius, J.shadowMapSize = z.mapSize, i.spotShadow[S] = J, i.spotShadowMap[S] = G, T++;
        }
        S++;
      } else if (A.isRectAreaLight) {
        const H = t.get(A);
        H.color.copy(k).multiplyScalar(Y), H.halfWidth.set(A.width * 0.5, 0, 0), H.halfHeight.set(0, A.height * 0.5, 0), i.rectArea[p] = H, p++;
      } else if (A.isPointLight) {
        const H = t.get(A);
        if (H.color.copy(A.color).multiplyScalar(A.intensity), H.distance = A.distance, H.decay = A.decay, A.castShadow) {
          const z = A.shadow, J = n.get(A);
          J.shadowIntensity = z.intensity, J.shadowBias = z.bias, J.shadowNormalBias = z.normalBias, J.shadowRadius = z.radius, J.shadowMapSize = z.mapSize, J.shadowCameraNear = z.camera.near, J.shadowCameraFar = z.camera.far, i.pointShadow[M] = J, i.pointShadowMap[M] = G, i.pointShadowMatrix[M] = A.shadow.matrix, b++;
        }
        i.point[M] = H, M++;
      } else if (A.isHemisphereLight) {
        const H = t.get(A);
        H.skyColor.copy(A.color).multiplyScalar(Y), H.groundColor.copy(A.groundColor).multiplyScalar(Y), i.hemi[f] = H, f++;
      }
    }
    p > 0 && (e.has("OES_texture_float_linear") === !0 ? (i.rectAreaLTC1 = ce.LTC_FLOAT_1, i.rectAreaLTC2 = ce.LTC_FLOAT_2) : (i.rectAreaLTC1 = ce.LTC_HALF_1, i.rectAreaLTC2 = ce.LTC_HALF_2)), i.ambient[0] = u, i.ambient[1] = d, i.ambient[2] = h;
    const v = i.hash;
    (v.directionalLength !== _ || v.pointLength !== M || v.spotLength !== S || v.rectAreaLength !== p || v.hemiLength !== f || v.numDirectionalShadows !== y || v.numPointShadows !== b || v.numSpotShadows !== T || v.numSpotMaps !== P || v.numLightProbes !== D) && (i.directional.length = _, i.spot.length = S, i.rectArea.length = p, i.point.length = M, i.hemi.length = f, i.directionalShadow.length = y, i.directionalShadowMap.length = y, i.pointShadow.length = b, i.pointShadowMap.length = b, i.spotShadow.length = T, i.spotShadowMap.length = T, i.directionalShadowMatrix.length = y, i.pointShadowMatrix.length = b, i.spotLightMatrix.length = T + P - R, i.spotLightMap.length = P, i.numSpotLightShadowsWithMaps = R, i.numLightProbes = D, v.directionalLength = _, v.pointLength = M, v.spotLength = S, v.rectAreaLength = p, v.hemiLength = f, v.numDirectionalShadows = y, v.numPointShadows = b, v.numSpotShadows = T, v.numSpotMaps = P, v.numLightProbes = D, i.version = Ru++);
  }
  function l(c, u) {
    let d = 0, h = 0, _ = 0, M = 0, S = 0;
    const p = u.matrixWorldInverse;
    for (let f = 0, y = c.length; f < y; f++) {
      const b = c[f];
      if (b.isDirectionalLight) {
        const T = i.directional[d];
        T.direction.setFromMatrixPosition(b.matrixWorld), r.setFromMatrixPosition(b.target.matrixWorld), T.direction.sub(r), T.direction.transformDirection(p), d++;
      } else if (b.isSpotLight) {
        const T = i.spot[_];
        T.position.setFromMatrixPosition(b.matrixWorld), T.position.applyMatrix4(p), T.direction.setFromMatrixPosition(b.matrixWorld), r.setFromMatrixPosition(b.target.matrixWorld), T.direction.sub(r), T.direction.transformDirection(p), _++;
      } else if (b.isRectAreaLight) {
        const T = i.rectArea[M];
        T.position.setFromMatrixPosition(b.matrixWorld), T.position.applyMatrix4(p), a.identity(), s.copy(b.matrixWorld), s.premultiply(p), a.extractRotation(s), T.halfWidth.set(b.width * 0.5, 0, 0), T.halfHeight.set(0, b.height * 0.5, 0), T.halfWidth.applyMatrix4(a), T.halfHeight.applyMatrix4(a), M++;
      } else if (b.isPointLight) {
        const T = i.point[h];
        T.position.setFromMatrixPosition(b.matrixWorld), T.position.applyMatrix4(p), h++;
      } else if (b.isHemisphereLight) {
        const T = i.hemi[S];
        T.direction.setFromMatrixPosition(b.matrixWorld), T.direction.transformDirection(p), S++;
      }
    }
  }
  return {
    setup: o,
    setupView: l,
    state: i
  };
}
function ha(e) {
  const t = new Cu(e), n = [], i = [], r = [];
  function s(h) {
    d.camera = h, n.length = 0, i.length = 0, r.length = 0;
  }
  function a(h) {
    n.push(h);
  }
  function o(h) {
    i.push(h);
  }
  function l(h) {
    r.push(h);
  }
  function c() {
    t.setup(n);
  }
  function u(h) {
    t.setupView(n, h);
  }
  const d = {
    lightsArray: n,
    shadowsArray: i,
    lightProbeGridArray: r,
    camera: null,
    lights: t,
    transmissionRenderTarget: {},
    textureUnits: 0
  };
  return {
    init: s,
    state: d,
    setupLights: c,
    setupLightsView: u,
    pushLight: a,
    pushShadow: o,
    pushLightProbeGrid: l
  };
}
function Pu(e) {
  let t = /* @__PURE__ */ new WeakMap();
  function n(r, s = 0) {
    const a = t.get(r);
    let o;
    return a === void 0 ? (o = new ha(e), t.set(r, [o])) : s >= a.length ? (o = new ha(e), a.push(o)) : o = a[s], o;
  }
  function i() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: n,
    dispose: i
  };
}
var Lu = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, Du = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`, Iu = [
  /* @__PURE__ */ new O(1, 0, 0),
  /* @__PURE__ */ new O(-1, 0, 0),
  /* @__PURE__ */ new O(0, 1, 0),
  /* @__PURE__ */ new O(0, -1, 0),
  /* @__PURE__ */ new O(0, 0, 1),
  /* @__PURE__ */ new O(0, 0, -1)
], Uu = [
  /* @__PURE__ */ new O(0, -1, 0),
  /* @__PURE__ */ new O(0, -1, 0),
  /* @__PURE__ */ new O(0, 0, 1),
  /* @__PURE__ */ new O(0, 0, -1),
  /* @__PURE__ */ new O(0, -1, 0),
  /* @__PURE__ */ new O(0, -1, 0)
], ua = /* @__PURE__ */ new ft(), ui = /* @__PURE__ */ new O(), zr = /* @__PURE__ */ new O();
function Nu(e, t, n) {
  let i = new Qr();
  const r = new Ne(), s = new Ne(), a = new ht(), o = new ic(), l = new rc(), c = {}, u = n.maxTextureSize, d = {
    0: 1,
    1: 0,
    2: 2
  }, h = new $t({
    defines: { VSM_SAMPLES: 8 },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new Ne() },
      radius: { value: 4 }
    },
    vertexShader: Lu,
    fragmentShader: Du
  }), _ = h.clone();
  _.defines.HORIZONTAL_PASS = 1;
  const M = new Sn();
  M.setAttribute("position", new Kt(new Float32Array([
    -1,
    -1,
    0.5,
    3,
    -1,
    0.5,
    -1,
    3,
    0.5
  ]), 3));
  const S = new Zt(M, h), p = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
  let f = this.type;
  this.render = function(R, D, v) {
    if (p.enabled === !1 || p.autoUpdate === !1 && p.needsUpdate === !1 || R.length === 0) return;
    this.type === 2 && (Te("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."), this.type = 1);
    const E = e.getRenderTarget(), X = e.getActiveCubeFace(), A = e.getActiveMipmapLevel(), k = e.state;
    k.setBlending(0), k.buffers.depth.getReversed() === !0 ? k.buffers.color.setClear(0, 0, 0, 0) : k.buffers.color.setClear(1, 1, 1, 1), k.buffers.depth.setTest(!0), k.setScissorTest(!1);
    const Y = f !== this.type;
    Y && D.traverse(function(B) {
      B.material && (Array.isArray(B.material) ? B.material.forEach((G) => G.needsUpdate = !0) : B.material.needsUpdate = !0);
    });
    for (let B = 0, G = R.length; B < G; B++) {
      const H = R[B], z = H.shadow;
      if (z === void 0) {
        Te("WebGLShadowMap:", H, "has no shadow.");
        continue;
      }
      if (z.autoUpdate === !1 && z.needsUpdate === !1) continue;
      r.copy(z.mapSize);
      const J = z.getFrameExtents();
      r.multiply(J), s.copy(z.mapSize), (r.x > u || r.y > u) && (r.x > u && (s.x = Math.floor(u / J.x), r.x = s.x * J.x, z.mapSize.x = s.x), r.y > u && (s.y = Math.floor(u / J.y), r.y = s.y * J.y, z.mapSize.y = s.y));
      const te = e.state.buffers.depth.getReversed();
      if (z.camera._reversedDepth = te, z.map === null || Y === !0) {
        if (z.map !== null && (z.map.depthTexture !== null && (z.map.depthTexture.dispose(), z.map.depthTexture = null), z.map.dispose()), this.type === 3) {
          if (H.isPointLight) {
            Te("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");
            continue;
          }
          z.map = new jt(r.x, r.y, {
            format: er,
            type: wn,
            minFilter: Pt,
            magFilter: Pt,
            generateMipmaps: !1
          }), z.map.texture.name = H.name + ".shadowMap", z.map.depthTexture = new ei(r.x, r.y, rr), z.map.depthTexture.name = H.name + ".shadowMapDepth", z.map.depthTexture.format = _i, z.map.depthTexture.compareFunction = null, z.map.depthTexture.minFilter = Tt, z.map.depthTexture.magFilter = Tt;
        } else
          H.isPointLight ? (z.map = new ja(r.x), z.map.depthTexture = new Zl(r.x, Rn)) : (z.map = new jt(r.x, r.y), z.map.depthTexture = new ei(r.x, r.y, Rn)), z.map.depthTexture.name = H.name + ".shadowMap", z.map.depthTexture.format = _i, this.type === 1 ? (z.map.depthTexture.compareFunction = te ? 518 : 515, z.map.depthTexture.minFilter = Pt, z.map.depthTexture.magFilter = Pt) : (z.map.depthTexture.compareFunction = null, z.map.depthTexture.minFilter = Tt, z.map.depthTexture.magFilter = Tt);
        z.camera.updateProjectionMatrix();
      }
      const re = z.map.isWebGLCubeRenderTarget ? 6 : 1;
      for (let ge = 0; ge < re; ge++) {
        if (z.map.isWebGLCubeRenderTarget)
          e.setRenderTarget(z.map, ge), e.clear();
        else {
          ge === 0 && (e.setRenderTarget(z.map), e.clear());
          const xe = z.getViewport(ge);
          a.set(s.x * xe.x, s.y * xe.y, s.x * xe.z, s.y * xe.w), k.viewport(a);
        }
        if (H.isPointLight) {
          const xe = z.camera, Ke = z.matrix, Ve = H.distance || xe.far;
          Ve !== xe.far && (xe.far = Ve, xe.updateProjectionMatrix()), ui.setFromMatrixPosition(H.matrixWorld), xe.position.copy(ui), zr.copy(xe.position), zr.add(Iu[ge]), xe.up.copy(Uu[ge]), xe.lookAt(zr), xe.updateMatrixWorld(), Ke.makeTranslation(-ui.x, -ui.y, -ui.z), ua.multiplyMatrices(xe.projectionMatrix, xe.matrixWorldInverse), z._frustum.setFromProjectionMatrix(ua, xe.coordinateSystem, xe.reversedDepth);
        } else z.updateMatrices(H);
        i = z.getFrustum(), T(D, v, z.camera, H, this.type);
      }
      z.isPointLightShadow !== !0 && this.type === 3 && y(z, v), z.needsUpdate = !1;
    }
    f = this.type, p.needsUpdate = !1, e.setRenderTarget(E, X, A);
  };
  function y(R, D) {
    const v = t.update(S);
    h.defines.VSM_SAMPLES !== R.blurSamples && (h.defines.VSM_SAMPLES = R.blurSamples, _.defines.VSM_SAMPLES = R.blurSamples, h.needsUpdate = !0, _.needsUpdate = !0), R.mapPass === null && (R.mapPass = new jt(r.x, r.y, {
      format: er,
      type: wn
    })), h.uniforms.shadow_pass.value = R.map.depthTexture, h.uniforms.resolution.value = R.mapSize, h.uniforms.radius.value = R.radius, e.setRenderTarget(R.mapPass), e.clear(), e.renderBufferDirect(D, null, v, h, S, null), _.uniforms.shadow_pass.value = R.mapPass.texture, _.uniforms.resolution.value = R.mapSize, _.uniforms.radius.value = R.radius, e.setRenderTarget(R.map), e.clear(), e.renderBufferDirect(D, null, v, _, S, null);
  }
  function b(R, D, v, E) {
    let X = null;
    const A = v.isPointLight === !0 ? R.customDistanceMaterial : R.customDepthMaterial;
    if (A !== void 0) X = A;
    else if (X = v.isPointLight === !0 ? l : o, e.localClippingEnabled && D.clipShadows === !0 && Array.isArray(D.clippingPlanes) && D.clippingPlanes.length !== 0 || D.displacementMap && D.displacementScale !== 0 || D.alphaMap && D.alphaTest > 0 || D.map && D.alphaTest > 0 || D.alphaToCoverage === !0) {
      const k = X.uuid, Y = D.uuid;
      let B = c[k];
      B === void 0 && (B = {}, c[k] = B);
      let G = B[Y];
      G === void 0 && (G = X.clone(), B[Y] = G, D.addEventListener("dispose", P)), X = G;
    }
    if (X.visible = D.visible, X.wireframe = D.wireframe, E === 3 ? X.side = D.shadowSide !== null ? D.shadowSide : D.side : X.side = D.shadowSide !== null ? D.shadowSide : d[D.side], X.alphaMap = D.alphaMap, X.alphaTest = D.alphaToCoverage === !0 ? 0.5 : D.alphaTest, X.map = D.map, X.clipShadows = D.clipShadows, X.clippingPlanes = D.clippingPlanes, X.clipIntersection = D.clipIntersection, X.displacementMap = D.displacementMap, X.displacementScale = D.displacementScale, X.displacementBias = D.displacementBias, X.wireframeLinewidth = D.wireframeLinewidth, X.linewidth = D.linewidth, v.isPointLight === !0 && X.isMeshDistanceMaterial === !0) {
      const k = e.properties.get(X);
      k.light = v;
    }
    return X;
  }
  function T(R, D, v, E, X) {
    if (R.visible === !1) return;
    if (R.layers.test(D.layers) && (R.isMesh || R.isLine || R.isPoints) && (R.castShadow || R.receiveShadow && X === 3) && (!R.frustumCulled || i.intersectsObject(R))) {
      R.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse, R.matrixWorld);
      const k = t.update(R), Y = R.material;
      if (Array.isArray(Y)) {
        const B = k.groups;
        for (let G = 0, H = B.length; G < H; G++) {
          const z = B[G], J = Y[z.materialIndex];
          if (J && J.visible) {
            const te = b(R, J, E, X);
            R.onBeforeShadow(e, R, D, v, k, te, z), e.renderBufferDirect(v, null, k, te, R, z), R.onAfterShadow(e, R, D, v, k, te, z);
          }
        }
      } else if (Y.visible) {
        const B = b(R, Y, E, X);
        R.onBeforeShadow(e, R, D, v, k, B, null), e.renderBufferDirect(v, null, k, B, R, null), R.onAfterShadow(e, R, D, v, k, B, null);
      }
    }
    const A = R.children;
    for (let k = 0, Y = A.length; k < Y; k++) T(A[k], D, v, E, X);
  }
  function P(R) {
    R.target.removeEventListener("dispose", P);
    for (const D in c) {
      const v = c[D], E = R.target.uuid;
      E in v && (v[E].dispose(), delete v[E]);
    }
  }
}
function Ou(e, t) {
  function n() {
    let w = !1;
    const W = new ht();
    let Q = null;
    const se = new ht(0, 0, 0, 0);
    return {
      setMask: function(Me) {
        Q !== Me && !w && (e.colorMask(Me, Me, Me, Me), Q = Me);
      },
      setLocked: function(Me) {
        w = Me;
      },
      setClear: function(Me, $, Se, we, bt) {
        bt === !0 && (Me *= we, $ *= we, Se *= we), W.set(Me, $, Se, we), se.equals(W) === !1 && (e.clearColor(Me, $, Se, we), se.copy(W));
      },
      reset: function() {
        w = !1, Q = null, se.set(-1, 0, 0, 0);
      }
    };
  }
  function i() {
    let w = !1, W = !1, Q = null, se = null, Me = null;
    return {
      setReversed: function($) {
        if (W !== $) {
          const Se = t.get("EXT_clip_control");
          $ ? Se.clipControlEXT(Se.LOWER_LEFT_EXT, Se.ZERO_TO_ONE_EXT) : Se.clipControlEXT(Se.LOWER_LEFT_EXT, Se.NEGATIVE_ONE_TO_ONE_EXT), W = $;
          const we = Me;
          Me = null, this.setClear(we);
        }
      },
      getReversed: function() {
        return W;
      },
      setTest: function($) {
        $ ? de(e.DEPTH_TEST) : be(e.DEPTH_TEST);
      },
      setMask: function($) {
        Q !== $ && !w && (e.depthMask($), Q = $);
      },
      setFunc: function($) {
        if (W && ($ = cl[$]), se !== $) {
          switch ($) {
            case 0:
              e.depthFunc(e.NEVER);
              break;
            case 1:
              e.depthFunc(e.ALWAYS);
              break;
            case 2:
              e.depthFunc(e.LESS);
              break;
            case 3:
              e.depthFunc(e.LEQUAL);
              break;
            case 4:
              e.depthFunc(e.EQUAL);
              break;
            case 5:
              e.depthFunc(e.GEQUAL);
              break;
            case 6:
              e.depthFunc(e.GREATER);
              break;
            case 7:
              e.depthFunc(e.NOTEQUAL);
              break;
            default:
              e.depthFunc(e.LEQUAL);
          }
          se = $;
        }
      },
      setLocked: function($) {
        w = $;
      },
      setClear: function($) {
        Me !== $ && (Me = $, W && ($ = 1 - $), e.clearDepth($));
      },
      reset: function() {
        w = !1, Q = null, se = null, Me = null, W = !1;
      }
    };
  }
  function r() {
    let w = !1, W = null, Q = null, se = null, Me = null, $ = null, Se = null, we = null, bt = null;
    return {
      setTest: function(tt) {
        w || (tt ? de(e.STENCIL_TEST) : be(e.STENCIL_TEST));
      },
      setMask: function(tt) {
        W !== tt && !w && (e.stencilMask(tt), W = tt);
      },
      setFunc: function(tt, kt, Ft) {
        (Q !== tt || se !== kt || Me !== Ft) && (e.stencilFunc(tt, kt, Ft), Q = tt, se = kt, Me = Ft);
      },
      setOp: function(tt, kt, Ft) {
        ($ !== tt || Se !== kt || we !== Ft) && (e.stencilOp(tt, kt, Ft), $ = tt, Se = kt, we = Ft);
      },
      setLocked: function(tt) {
        w = tt;
      },
      setClear: function(tt) {
        bt !== tt && (e.clearStencil(tt), bt = tt);
      },
      reset: function() {
        w = !1, W = null, Q = null, se = null, Me = null, $ = null, Se = null, we = null, bt = null;
      }
    };
  }
  const s = new n(), a = new i(), o = new r(), l = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap();
  let u = {}, d = {}, h = {}, _ = /* @__PURE__ */ new WeakMap(), M = [], S = null, p = !1, f = null, y = null, b = null, T = null, P = null, R = null, D = null, v = new Xe(0, 0, 0), E = 0, X = !1, A = null, k = null, Y = null, B = null, G = null;
  const H = e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let z = !1, J = 0;
  const te = e.getParameter(e.VERSION);
  te.indexOf("WebGL") !== -1 ? (J = parseFloat(/^WebGL (\d)/.exec(te)[1]), z = J >= 1) : te.indexOf("OpenGL ES") !== -1 && (J = parseFloat(/^OpenGL ES (\d)/.exec(te)[1]), z = J >= 2);
  let re = null, ge = {};
  const xe = e.getParameter(e.SCISSOR_BOX), Ke = e.getParameter(e.VIEWPORT), Ve = new ht().fromArray(xe), q = new ht().fromArray(Ke);
  function ae(w, W, Q, se) {
    const Me = new Uint8Array(4), $ = e.createTexture();
    e.bindTexture(w, $), e.texParameteri(w, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(w, e.TEXTURE_MAG_FILTER, e.NEAREST);
    for (let Se = 0; Se < Q; Se++) w === e.TEXTURE_3D || w === e.TEXTURE_2D_ARRAY ? e.texImage3D(W, 0, e.RGBA, 1, 1, se, 0, e.RGBA, e.UNSIGNED_BYTE, Me) : e.texImage2D(W + Se, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, Me);
    return $;
  }
  const ve = {};
  ve[e.TEXTURE_2D] = ae(e.TEXTURE_2D, e.TEXTURE_2D, 1), ve[e.TEXTURE_CUBE_MAP] = ae(e.TEXTURE_CUBE_MAP, e.TEXTURE_CUBE_MAP_POSITIVE_X, 6), ve[e.TEXTURE_2D_ARRAY] = ae(e.TEXTURE_2D_ARRAY, e.TEXTURE_2D_ARRAY, 1, 1), ve[e.TEXTURE_3D] = ae(e.TEXTURE_3D, e.TEXTURE_3D, 1, 1), s.setClear(0, 0, 0, 1), a.setClear(1), o.setClear(0), de(e.DEPTH_TEST), a.setFunc(3), gt(!1), lt(1), de(e.CULL_FACE), at(0);
  function de(w) {
    u[w] !== !0 && (e.enable(w), u[w] = !0);
  }
  function be(w) {
    u[w] !== !1 && (e.disable(w), u[w] = !1);
  }
  function Le(w, W) {
    return h[w] !== W ? (e.bindFramebuffer(w, W), h[w] = W, w === e.DRAW_FRAMEBUFFER && (h[e.FRAMEBUFFER] = W), w === e.FRAMEBUFFER && (h[e.DRAW_FRAMEBUFFER] = W), !0) : !1;
  }
  function Re(w, W) {
    let Q = M, se = !1;
    if (w) {
      Q = _.get(W), Q === void 0 && (Q = [], _.set(W, Q));
      const Me = w.textures;
      if (Q.length !== Me.length || Q[0] !== e.COLOR_ATTACHMENT0) {
        for (let $ = 0, Se = Me.length; $ < Se; $++) Q[$] = e.COLOR_ATTACHMENT0 + $;
        Q.length = Me.length, se = !0;
      }
    } else Q[0] !== e.BACK && (Q[0] = e.BACK, se = !0);
    se && e.drawBuffers(Q);
  }
  function Ze(w) {
    return S !== w ? (e.useProgram(w), S = w, !0) : !1;
  }
  const Ge = {
    100: e.FUNC_ADD,
    101: e.FUNC_SUBTRACT,
    102: e.FUNC_REVERSE_SUBTRACT
  };
  Ge[103] = e.MIN, Ge[104] = e.MAX;
  const ut = {
    200: e.ZERO,
    201: e.ONE,
    202: e.SRC_COLOR,
    204: e.SRC_ALPHA,
    210: e.SRC_ALPHA_SATURATE,
    208: e.DST_COLOR,
    206: e.DST_ALPHA,
    203: e.ONE_MINUS_SRC_COLOR,
    205: e.ONE_MINUS_SRC_ALPHA,
    209: e.ONE_MINUS_DST_COLOR,
    207: e.ONE_MINUS_DST_ALPHA,
    211: e.CONSTANT_COLOR,
    212: e.ONE_MINUS_CONSTANT_COLOR,
    213: e.CONSTANT_ALPHA,
    214: e.ONE_MINUS_CONSTANT_ALPHA
  };
  function at(w, W, Q, se, Me, $, Se, we, bt, tt) {
    if (w === 0) {
      p === !0 && (be(e.BLEND), p = !1);
      return;
    }
    if (p === !1 && (de(e.BLEND), p = !0), w !== 5) {
      if (w !== f || tt !== X) {
        if ((y !== 100 || P !== 100) && (e.blendEquation(e.FUNC_ADD), y = 100, P = 100), tt) switch (w) {
          case 1:
            e.blendFuncSeparate(e.ONE, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
            break;
          case 2:
            e.blendFunc(e.ONE, e.ONE);
            break;
          case 3:
            e.blendFuncSeparate(e.ZERO, e.ONE_MINUS_SRC_COLOR, e.ZERO, e.ONE);
            break;
          case 4:
            e.blendFuncSeparate(e.DST_COLOR, e.ONE_MINUS_SRC_ALPHA, e.ZERO, e.ONE);
            break;
          default:
            Pe("WebGLState: Invalid blending: ", w);
            break;
        }
        else switch (w) {
          case 1:
            e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
            break;
          case 2:
            e.blendFuncSeparate(e.SRC_ALPHA, e.ONE, e.ONE, e.ONE);
            break;
          case 3:
            Pe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
            break;
          case 4:
            Pe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
            break;
          default:
            Pe("WebGLState: Invalid blending: ", w);
            break;
        }
        b = null, T = null, R = null, D = null, v.set(0, 0, 0), E = 0, f = w, X = tt;
      }
      return;
    }
    Me = Me || W, $ = $ || Q, Se = Se || se, (W !== y || Me !== P) && (e.blendEquationSeparate(Ge[W], Ge[Me]), y = W, P = Me), (Q !== b || se !== T || $ !== R || Se !== D) && (e.blendFuncSeparate(ut[Q], ut[se], ut[$], ut[Se]), b = Q, T = se, R = $, D = Se), (we.equals(v) === !1 || bt !== E) && (e.blendColor(we.r, we.g, we.b, bt), v.copy(we), E = bt), f = w, X = !1;
  }
  function Rt(w, W) {
    w.side === 2 ? be(e.CULL_FACE) : de(e.CULL_FACE);
    let Q = w.side === 1;
    W && (Q = !Q), gt(Q), w.blending === 1 && w.transparent === !1 ? at(0) : at(w.blending, w.blendEquation, w.blendSrc, w.blendDst, w.blendEquationAlpha, w.blendSrcAlpha, w.blendDstAlpha, w.blendColor, w.blendAlpha, w.premultipliedAlpha), a.setFunc(w.depthFunc), a.setTest(w.depthTest), a.setMask(w.depthWrite), s.setMask(w.colorWrite);
    const se = w.stencilWrite;
    o.setTest(se), se && (o.setMask(w.stencilWriteMask), o.setFunc(w.stencilFunc, w.stencilRef, w.stencilFuncMask), o.setOp(w.stencilFail, w.stencilZFail, w.stencilZPass)), xt(w.polygonOffset, w.polygonOffsetFactor, w.polygonOffsetUnits), w.alphaToCoverage === !0 ? de(e.SAMPLE_ALPHA_TO_COVERAGE) : be(e.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function gt(w) {
    A !== w && (w ? e.frontFace(e.CW) : e.frontFace(e.CCW), A = w);
  }
  function lt(w) {
    w !== 0 ? (de(e.CULL_FACE), w !== k && (w === 1 ? e.cullFace(e.BACK) : w === 2 ? e.cullFace(e.FRONT) : e.cullFace(e.FRONT_AND_BACK))) : be(e.CULL_FACE), k = w;
  }
  function C(w) {
    w !== Y && (z && e.lineWidth(w), Y = w);
  }
  function xt(w, W, Q) {
    w ? (de(e.POLYGON_OFFSET_FILL), (B !== W || G !== Q) && (B = W, G = Q, a.getReversed() && (W = -W), e.polygonOffset(W, Q))) : be(e.POLYGON_OFFSET_FILL);
  }
  function He(w) {
    w ? de(e.SCISSOR_TEST) : be(e.SCISSOR_TEST);
  }
  function Ye(w) {
    w === void 0 && (w = e.TEXTURE0 + H - 1), re !== w && (e.activeTexture(w), re = w);
  }
  function he(w, W, Q) {
    Q === void 0 && (re === null ? Q = e.TEXTURE0 + H - 1 : Q = re);
    let se = ge[Q];
    se === void 0 && (se = {
      type: void 0,
      texture: void 0
    }, ge[Q] = se), (se.type !== w || se.texture !== W) && (re !== Q && (e.activeTexture(Q), re = Q), e.bindTexture(w, W || ve[w]), se.type = w, se.texture = W);
  }
  function nt() {
    const w = ge[re];
    w !== void 0 && w.type !== void 0 && (e.bindTexture(w.type, null), w.type = void 0, w.texture = void 0);
  }
  function Ee() {
    try {
      e.compressedTexImage2D(...arguments);
    } catch (w) {
      Pe("WebGLState:", w);
    }
  }
  function x() {
    try {
      e.compressedTexImage3D(...arguments);
    } catch (w) {
      Pe("WebGLState:", w);
    }
  }
  function m() {
    try {
      e.texSubImage2D(...arguments);
    } catch (w) {
      Pe("WebGLState:", w);
    }
  }
  function U() {
    try {
      e.texSubImage3D(...arguments);
    } catch (w) {
      Pe("WebGLState:", w);
    }
  }
  function j() {
    try {
      e.compressedTexSubImage2D(...arguments);
    } catch (w) {
      Pe("WebGLState:", w);
    }
  }
  function Z() {
    try {
      e.compressedTexSubImage3D(...arguments);
    } catch (w) {
      Pe("WebGLState:", w);
    }
  }
  function ee() {
    try {
      e.texStorage2D(...arguments);
    } catch (w) {
      Pe("WebGLState:", w);
    }
  }
  function oe() {
    try {
      e.texStorage3D(...arguments);
    } catch (w) {
      Pe("WebGLState:", w);
    }
  }
  function L() {
    try {
      e.texImage2D(...arguments);
    } catch (w) {
      Pe("WebGLState:", w);
    }
  }
  function ie() {
    try {
      e.texImage3D(...arguments);
    } catch (w) {
      Pe("WebGLState:", w);
    }
  }
  function le(w) {
    return d[w] !== void 0 ? d[w] : e.getParameter(w);
  }
  function fe(w, W) {
    d[w] !== W && (e.pixelStorei(w, W), d[w] = W);
  }
  function K(w) {
    Ve.equals(w) === !1 && (e.scissor(w.x, w.y, w.z, w.w), Ve.copy(w));
  }
  function Ae(w) {
    q.equals(w) === !1 && (e.viewport(w.x, w.y, w.z, w.w), q.copy(w));
  }
  function De(w, W) {
    let Q = c.get(W);
    Q === void 0 && (Q = /* @__PURE__ */ new WeakMap(), c.set(W, Q));
    let se = Q.get(w);
    se === void 0 && (se = e.getUniformBlockIndex(W, w.name), Q.set(w, se));
  }
  function ke(w, W) {
    const Q = c.get(W).get(w);
    l.get(W) !== Q && (e.uniformBlockBinding(W, Q, w.__bindingPointIndex), l.set(W, Q));
  }
  function Oe() {
    e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.POLYGON_OFFSET_FILL), e.disable(e.SCISSOR_TEST), e.disable(e.STENCIL_TEST), e.disable(e.SAMPLE_ALPHA_TO_COVERAGE), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ONE, e.ZERO), e.blendFuncSeparate(e.ONE, e.ZERO, e.ONE, e.ZERO), e.blendColor(0, 0, 0, 0), e.colorMask(!0, !0, !0, !0), e.clearColor(0, 0, 0, 0), e.depthMask(!0), e.depthFunc(e.LESS), a.setReversed(!1), e.clearDepth(1), e.stencilMask(4294967295), e.stencilFunc(e.ALWAYS, 0, 4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), e.clearStencil(0), e.cullFace(e.BACK), e.frontFace(e.CCW), e.polygonOffset(0, 0), e.activeTexture(e.TEXTURE0), e.bindFramebuffer(e.FRAMEBUFFER, null), e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), e.bindFramebuffer(e.READ_FRAMEBUFFER, null), e.useProgram(null), e.lineWidth(1), e.scissor(0, 0, e.canvas.width, e.canvas.height), e.viewport(0, 0, e.canvas.width, e.canvas.height), e.pixelStorei(e.PACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !1), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, e.BROWSER_DEFAULT_WEBGL), e.pixelStorei(e.PACK_ROW_LENGTH, 0), e.pixelStorei(e.PACK_SKIP_PIXELS, 0), e.pixelStorei(e.PACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_ROW_LENGTH, 0), e.pixelStorei(e.UNPACK_IMAGE_HEIGHT, 0), e.pixelStorei(e.UNPACK_SKIP_PIXELS, 0), e.pixelStorei(e.UNPACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_SKIP_IMAGES, 0), u = {}, d = {}, re = null, ge = {}, h = {}, _ = /* @__PURE__ */ new WeakMap(), M = [], S = null, p = !1, f = null, y = null, b = null, T = null, P = null, R = null, D = null, v = new Xe(0, 0, 0), E = 0, X = !1, A = null, k = null, Y = null, B = null, G = null, Ve.set(0, 0, e.canvas.width, e.canvas.height), q.set(0, 0, e.canvas.width, e.canvas.height), s.reset(), a.reset(), o.reset();
  }
  return {
    buffers: {
      color: s,
      depth: a,
      stencil: o
    },
    enable: de,
    disable: be,
    bindFramebuffer: Le,
    drawBuffers: Re,
    useProgram: Ze,
    setBlending: at,
    setMaterial: Rt,
    setFlipSided: gt,
    setCullFace: lt,
    setLineWidth: C,
    setPolygonOffset: xt,
    setScissorTest: He,
    activeTexture: Ye,
    bindTexture: he,
    unbindTexture: nt,
    compressedTexImage2D: Ee,
    compressedTexImage3D: x,
    texImage2D: L,
    texImage3D: ie,
    pixelStorei: fe,
    getParameter: le,
    updateUBOMapping: De,
    uniformBlockBinding: ke,
    texStorage2D: ee,
    texStorage3D: oe,
    texSubImage2D: m,
    texSubImage3D: U,
    compressedTexSubImage2D: j,
    compressedTexSubImage3D: Z,
    scissor: K,
    viewport: Ae,
    reset: Oe
  };
}
function Fu(e, t, n, i, r, s, a) {
  const o = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null, l = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), c = new Ne(), u = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new Set();
  let h;
  const _ = /* @__PURE__ */ new WeakMap();
  let M = !1;
  try {
    M = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function S(x, m) {
    return M ? new OffscreenCanvas(x, m) : gi("canvas");
  }
  function p(x, m, U) {
    let j = 1;
    const Z = Ee(x);
    if ((Z.width > U || Z.height > U) && (j = U / Math.max(Z.width, Z.height)), j < 1) if (typeof HTMLImageElement < "u" && x instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && x instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && x instanceof ImageBitmap || typeof VideoFrame < "u" && x instanceof VideoFrame) {
      const ee = Math.floor(j * Z.width), oe = Math.floor(j * Z.height);
      h === void 0 && (h = S(ee, oe));
      const L = m ? S(ee, oe) : h;
      return L.width = ee, L.height = oe, L.getContext("2d").drawImage(x, 0, 0, ee, oe), Te("WebGLRenderer: Texture has been resized from (" + Z.width + "x" + Z.height + ") to (" + ee + "x" + oe + ")."), L;
    } else
      return "data" in x && Te("WebGLRenderer: Image in DataTexture is too big (" + Z.width + "x" + Z.height + ")."), x;
    return x;
  }
  function f(x) {
    return x.generateMipmaps;
  }
  function y(x) {
    e.generateMipmap(x);
  }
  function b(x) {
    return x.isWebGLCubeRenderTarget ? e.TEXTURE_CUBE_MAP : x.isWebGL3DRenderTarget ? e.TEXTURE_3D : x.isWebGLArrayRenderTarget || x.isCompressedArrayTexture ? e.TEXTURE_2D_ARRAY : e.TEXTURE_2D;
  }
  function T(x, m, U, j, Z, ee = !1) {
    if (x !== null) {
      if (e[x] !== void 0) return e[x];
      Te("WebGLRenderer: Attempt to use non-existing WebGL internal format '" + x + "'");
    }
    let oe;
    j && (oe = t.get("EXT_texture_norm16"), oe || Te("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));
    let L = m;
    if (m === e.RED && (U === e.FLOAT && (L = e.R32F), U === e.HALF_FLOAT && (L = e.R16F), U === e.UNSIGNED_BYTE && (L = e.R8), U === e.UNSIGNED_SHORT && oe && (L = oe.R16_EXT), U === e.SHORT && oe && (L = oe.R16_SNORM_EXT)), m === e.RED_INTEGER && (U === e.UNSIGNED_BYTE && (L = e.R8UI), U === e.UNSIGNED_SHORT && (L = e.R16UI), U === e.UNSIGNED_INT && (L = e.R32UI), U === e.BYTE && (L = e.R8I), U === e.SHORT && (L = e.R16I), U === e.INT && (L = e.R32I)), m === e.RG && (U === e.FLOAT && (L = e.RG32F), U === e.HALF_FLOAT && (L = e.RG16F), U === e.UNSIGNED_BYTE && (L = e.RG8), U === e.UNSIGNED_SHORT && oe && (L = oe.RG16_EXT), U === e.SHORT && oe && (L = oe.RG16_SNORM_EXT)), m === e.RG_INTEGER && (U === e.UNSIGNED_BYTE && (L = e.RG8UI), U === e.UNSIGNED_SHORT && (L = e.RG16UI), U === e.UNSIGNED_INT && (L = e.RG32UI), U === e.BYTE && (L = e.RG8I), U === e.SHORT && (L = e.RG16I), U === e.INT && (L = e.RG32I)), m === e.RGB_INTEGER && (U === e.UNSIGNED_BYTE && (L = e.RGB8UI), U === e.UNSIGNED_SHORT && (L = e.RGB16UI), U === e.UNSIGNED_INT && (L = e.RGB32UI), U === e.BYTE && (L = e.RGB8I), U === e.SHORT && (L = e.RGB16I), U === e.INT && (L = e.RGB32I)), m === e.RGBA_INTEGER && (U === e.UNSIGNED_BYTE && (L = e.RGBA8UI), U === e.UNSIGNED_SHORT && (L = e.RGBA16UI), U === e.UNSIGNED_INT && (L = e.RGBA32UI), U === e.BYTE && (L = e.RGBA8I), U === e.SHORT && (L = e.RGBA16I), U === e.INT && (L = e.RGBA32I)), m === e.RGB && (U === e.UNSIGNED_SHORT && oe && (L = oe.RGB16_EXT), U === e.SHORT && oe && (L = oe.RGB16_SNORM_EXT), U === e.UNSIGNED_INT_5_9_9_9_REV && (L = e.RGB9_E5), U === e.UNSIGNED_INT_10F_11F_11F_REV && (L = e.R11F_G11F_B10F)), m === e.RGBA) {
      const ie = ee ? nr : We.getTransfer(Z);
      U === e.FLOAT && (L = e.RGBA32F), U === e.HALF_FLOAT && (L = e.RGBA16F), U === e.UNSIGNED_BYTE && (L = ie === "srgb" ? e.SRGB8_ALPHA8 : e.RGBA8), U === e.UNSIGNED_SHORT && oe && (L = oe.RGBA16_EXT), U === e.SHORT && oe && (L = oe.RGBA16_SNORM_EXT), U === e.UNSIGNED_SHORT_4_4_4_4 && (L = e.RGBA4), U === e.UNSIGNED_SHORT_5_5_5_1 && (L = e.RGB5_A1);
    }
    return (L === e.R16F || L === e.R32F || L === e.RG16F || L === e.RG32F || L === e.RGBA16F || L === e.RGBA32F) && t.get("EXT_color_buffer_float"), L;
  }
  function P(x, m) {
    let U;
    return x ? m === null || m === 1014 || m === 1020 ? U = e.DEPTH24_STENCIL8 : m === 1015 ? U = e.DEPTH32F_STENCIL8 : m === 1012 && (U = e.DEPTH24_STENCIL8, Te("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : m === null || m === 1014 || m === 1020 ? U = e.DEPTH_COMPONENT24 : m === 1015 ? U = e.DEPTH_COMPONENT32F : m === 1012 && (U = e.DEPTH_COMPONENT16), U;
  }
  function R(x, m) {
    return f(x) === !0 || x.isFramebufferTexture && x.minFilter !== 1003 && x.minFilter !== 1006 ? Math.log2(Math.max(m.width, m.height)) + 1 : x.mipmaps !== void 0 && x.mipmaps.length > 0 ? x.mipmaps.length : x.isCompressedTexture && Array.isArray(x.image) ? m.mipmaps.length : 1;
  }
  function D(x) {
    const m = x.target;
    m.removeEventListener("dispose", D), E(m), m.isVideoTexture && u.delete(m), m.isHTMLTexture && d.delete(m);
  }
  function v(x) {
    const m = x.target;
    m.removeEventListener("dispose", v), A(m);
  }
  function E(x) {
    const m = i.get(x);
    if (m.__webglInit === void 0) return;
    const U = x.source, j = _.get(U);
    if (j) {
      const Z = j[m.__cacheKey];
      Z.usedTimes--, Z.usedTimes === 0 && X(x), Object.keys(j).length === 0 && _.delete(U);
    }
    i.remove(x);
  }
  function X(x) {
    const m = i.get(x);
    e.deleteTexture(m.__webglTexture);
    const U = x.source, j = _.get(U);
    delete j[m.__cacheKey], a.memory.textures--;
  }
  function A(x) {
    const m = i.get(x);
    if (x.depthTexture && (x.depthTexture.dispose(), i.remove(x.depthTexture)), x.isWebGLCubeRenderTarget) for (let j = 0; j < 6; j++) {
      if (Array.isArray(m.__webglFramebuffer[j])) for (let Z = 0; Z < m.__webglFramebuffer[j].length; Z++) e.deleteFramebuffer(m.__webglFramebuffer[j][Z]);
      else e.deleteFramebuffer(m.__webglFramebuffer[j]);
      m.__webglDepthbuffer && e.deleteRenderbuffer(m.__webglDepthbuffer[j]);
    }
    else {
      if (Array.isArray(m.__webglFramebuffer)) for (let j = 0; j < m.__webglFramebuffer.length; j++) e.deleteFramebuffer(m.__webglFramebuffer[j]);
      else e.deleteFramebuffer(m.__webglFramebuffer);
      if (m.__webglDepthbuffer && e.deleteRenderbuffer(m.__webglDepthbuffer), m.__webglMultisampledFramebuffer && e.deleteFramebuffer(m.__webglMultisampledFramebuffer), m.__webglColorRenderbuffer)
        for (let j = 0; j < m.__webglColorRenderbuffer.length; j++) m.__webglColorRenderbuffer[j] && e.deleteRenderbuffer(m.__webglColorRenderbuffer[j]);
      m.__webglDepthRenderbuffer && e.deleteRenderbuffer(m.__webglDepthRenderbuffer);
    }
    const U = x.textures;
    for (let j = 0, Z = U.length; j < Z; j++) {
      const ee = i.get(U[j]);
      ee.__webglTexture && (e.deleteTexture(ee.__webglTexture), a.memory.textures--), i.remove(U[j]);
    }
    i.remove(x);
  }
  let k = 0;
  function Y() {
    k = 0;
  }
  function B() {
    return k;
  }
  function G(x) {
    k = x;
  }
  function H() {
    const x = k;
    return x >= r.maxTextures && Te("WebGLTextures: Trying to use " + x + " texture units while this GPU supports only " + r.maxTextures), k += 1, x;
  }
  function z(x) {
    const m = [];
    return m.push(x.wrapS), m.push(x.wrapT), m.push(x.wrapR || 0), m.push(x.magFilter), m.push(x.minFilter), m.push(x.anisotropy), m.push(x.internalFormat), m.push(x.format), m.push(x.type), m.push(x.generateMipmaps), m.push(x.premultiplyAlpha), m.push(x.flipY), m.push(x.unpackAlignment), m.push(x.colorSpace), m.join();
  }
  function J(x, m) {
    const U = i.get(x);
    if (x.isVideoTexture && he(x), x.isRenderTargetTexture === !1 && x.isExternalTexture !== !0 && x.version > 0 && U.__version !== x.version) {
      const j = x.image;
      if (j === null) Te("WebGLRenderer: Texture marked for update but no image data found.");
      else if (j.complete === !1) Te("WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        be(U, x, m);
        return;
      }
    } else x.isExternalTexture && (U.__webglTexture = x.sourceTexture ? x.sourceTexture : null);
    n.bindTexture(e.TEXTURE_2D, U.__webglTexture, e.TEXTURE0 + m);
  }
  function te(x, m) {
    const U = i.get(x);
    if (x.isRenderTargetTexture === !1 && x.version > 0 && U.__version !== x.version) {
      be(U, x, m);
      return;
    } else x.isExternalTexture && (U.__webglTexture = x.sourceTexture ? x.sourceTexture : null);
    n.bindTexture(e.TEXTURE_2D_ARRAY, U.__webglTexture, e.TEXTURE0 + m);
  }
  function re(x, m) {
    const U = i.get(x);
    if (x.isRenderTargetTexture === !1 && x.version > 0 && U.__version !== x.version) {
      be(U, x, m);
      return;
    }
    n.bindTexture(e.TEXTURE_3D, U.__webglTexture, e.TEXTURE0 + m);
  }
  function ge(x, m) {
    const U = i.get(x);
    if (x.isCubeDepthTexture !== !0 && x.version > 0 && U.__version !== x.version) {
      Le(U, x, m);
      return;
    }
    n.bindTexture(e.TEXTURE_CUBE_MAP, U.__webglTexture, e.TEXTURE0 + m);
  }
  const xe = {
    [Gr]: e.REPEAT,
    [sn]: e.CLAMP_TO_EDGE,
    [Hr]: e.MIRRORED_REPEAT
  }, Ke = {
    [Tt]: e.NEAREST,
    [co]: e.NEAREST_MIPMAP_NEAREST,
    [ho]: e.NEAREST_MIPMAP_LINEAR,
    [Pt]: e.LINEAR,
    [uo]: e.LINEAR_MIPMAP_NEAREST,
    [Kr]: e.LINEAR_MIPMAP_LINEAR
  }, Ve = {
    512: e.NEVER,
    519: e.ALWAYS,
    513: e.LESS,
    515: e.LEQUAL,
    514: e.EQUAL,
    518: e.GEQUAL,
    516: e.GREATER,
    517: e.NOTEQUAL
  };
  function q(x, m) {
    if (m.type === 1015 && t.has("OES_texture_float_linear") === !1 && (m.magFilter === 1006 || m.magFilter === 1007 || m.magFilter === 1005 || m.magFilter === 1008 || m.minFilter === 1006 || m.minFilter === 1007 || m.minFilter === 1005 || m.minFilter === 1008) && Te("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), e.texParameteri(x, e.TEXTURE_WRAP_S, xe[m.wrapS]), e.texParameteri(x, e.TEXTURE_WRAP_T, xe[m.wrapT]), (x === e.TEXTURE_3D || x === e.TEXTURE_2D_ARRAY) && e.texParameteri(x, e.TEXTURE_WRAP_R, xe[m.wrapR]), e.texParameteri(x, e.TEXTURE_MAG_FILTER, Ke[m.magFilter]), e.texParameteri(x, e.TEXTURE_MIN_FILTER, Ke[m.minFilter]), m.compareFunction && (e.texParameteri(x, e.TEXTURE_COMPARE_MODE, e.COMPARE_REF_TO_TEXTURE), e.texParameteri(x, e.TEXTURE_COMPARE_FUNC, Ve[m.compareFunction])), t.has("EXT_texture_filter_anisotropic") === !0) {
      if (m.magFilter === 1003 || m.minFilter !== 1005 && m.minFilter !== 1008 || m.type === 1015 && t.has("OES_texture_float_linear") === !1) return;
      if (m.anisotropy > 1 || i.get(m).__currentAnisotropy) {
        const U = t.get("EXT_texture_filter_anisotropic");
        e.texParameterf(x, U.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(m.anisotropy, r.getMaxAnisotropy())), i.get(m).__currentAnisotropy = m.anisotropy;
      }
    }
  }
  function ae(x, m) {
    let U = !1;
    x.__webglInit === void 0 && (x.__webglInit = !0, m.addEventListener("dispose", D));
    const j = m.source;
    let Z = _.get(j);
    Z === void 0 && (Z = {}, _.set(j, Z));
    const ee = z(m);
    if (ee !== x.__cacheKey) {
      Z[ee] === void 0 && (Z[ee] = {
        texture: e.createTexture(),
        usedTimes: 0
      }, a.memory.textures++, U = !0), Z[ee].usedTimes++;
      const oe = Z[x.__cacheKey];
      oe !== void 0 && (Z[x.__cacheKey].usedTimes--, oe.usedTimes === 0 && X(m)), x.__cacheKey = ee, x.__webglTexture = Z[ee].texture;
    }
    return U;
  }
  function ve(x, m, U) {
    return Math.floor(Math.floor(x / U) / m);
  }
  function de(x, m, U, j) {
    const ee = x.updateRanges;
    if (ee.length === 0) n.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, m.width, m.height, U, j, m.data);
    else {
      ee.sort((fe, K) => fe.start - K.start);
      let oe = 0;
      for (let fe = 1; fe < ee.length; fe++) {
        const K = ee[oe], Ae = ee[fe], De = K.start + K.count, ke = ve(Ae.start, m.width, 4), Oe = ve(K.start, m.width, 4);
        Ae.start <= De + 1 && ke === Oe && ve(Ae.start + Ae.count - 1, m.width, 4) === ke ? K.count = Math.max(K.count, Ae.start + Ae.count - K.start) : (++oe, ee[oe] = Ae);
      }
      ee.length = oe + 1;
      const L = n.getParameter(e.UNPACK_ROW_LENGTH), ie = n.getParameter(e.UNPACK_SKIP_PIXELS), le = n.getParameter(e.UNPACK_SKIP_ROWS);
      n.pixelStorei(e.UNPACK_ROW_LENGTH, m.width);
      for (let fe = 0, K = ee.length; fe < K; fe++) {
        const Ae = ee[fe], De = Math.floor(Ae.start / 4), ke = Math.ceil(Ae.count / 4), Oe = De % m.width, w = Math.floor(De / m.width), W = ke, Q = 1;
        n.pixelStorei(e.UNPACK_SKIP_PIXELS, Oe), n.pixelStorei(e.UNPACK_SKIP_ROWS, w), n.texSubImage2D(e.TEXTURE_2D, 0, Oe, w, W, Q, U, j, m.data);
      }
      x.clearUpdateRanges(), n.pixelStorei(e.UNPACK_ROW_LENGTH, L), n.pixelStorei(e.UNPACK_SKIP_PIXELS, ie), n.pixelStorei(e.UNPACK_SKIP_ROWS, le);
    }
  }
  function be(x, m, U) {
    let j = e.TEXTURE_2D;
    (m.isDataArrayTexture || m.isCompressedArrayTexture) && (j = e.TEXTURE_2D_ARRAY), m.isData3DTexture && (j = e.TEXTURE_3D);
    const Z = ae(x, m), ee = m.source;
    n.bindTexture(j, x.__webglTexture, e.TEXTURE0 + U);
    const oe = i.get(ee);
    if (ee.version !== oe.__version || Z === !0) {
      if (n.activeTexture(e.TEXTURE0 + U), !(typeof ImageBitmap < "u" && m.image instanceof ImageBitmap)) {
        const W = We.getPrimaries(We.workingColorSpace), Q = m.colorSpace === "" ? null : We.getPrimaries(m.colorSpace), se = m.colorSpace === "" || W === Q ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
        n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, m.flipY), n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, m.premultiplyAlpha), n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, se);
      }
      n.pixelStorei(e.UNPACK_ALIGNMENT, m.unpackAlignment);
      let L = p(m.image, !1, r.maxTextureSize);
      L = nt(m, L);
      const ie = s.convert(m.format, m.colorSpace), le = s.convert(m.type);
      let fe = T(m.internalFormat, ie, le, m.normalized, m.colorSpace, m.isVideoTexture);
      q(j, m);
      let K;
      const Ae = m.mipmaps, De = m.isVideoTexture !== !0, ke = oe.__version === void 0 || Z === !0, Oe = ee.dataReady, w = R(m, L);
      if (m.isDepthTexture)
        fe = P(m.format === va, m.type), ke && (De ? n.texStorage2D(e.TEXTURE_2D, 1, fe, L.width, L.height) : n.texImage2D(e.TEXTURE_2D, 0, fe, L.width, L.height, 0, ie, le, null));
      else if (m.isDataTexture) if (Ae.length > 0) {
        De && ke && n.texStorage2D(e.TEXTURE_2D, w, fe, Ae[0].width, Ae[0].height);
        for (let W = 0, Q = Ae.length; W < Q; W++)
          K = Ae[W], De ? Oe && n.texSubImage2D(e.TEXTURE_2D, W, 0, 0, K.width, K.height, ie, le, K.data) : n.texImage2D(e.TEXTURE_2D, W, fe, K.width, K.height, 0, ie, le, K.data);
        m.generateMipmaps = !1;
      } else De ? (ke && n.texStorage2D(e.TEXTURE_2D, w, fe, L.width, L.height), Oe && de(m, L, ie, le)) : n.texImage2D(e.TEXTURE_2D, 0, fe, L.width, L.height, 0, ie, le, L.data);
      else if (m.isCompressedTexture) if (m.isCompressedArrayTexture) {
        De && ke && n.texStorage3D(e.TEXTURE_2D_ARRAY, w, fe, Ae[0].width, Ae[0].height, L.depth);
        for (let W = 0, Q = Ae.length; W < Q; W++)
          if (K = Ae[W], m.format !== 1023) if (ie !== null) if (De) {
            if (Oe) if (m.layerUpdates.size > 0) {
              const se = Hs(K.width, K.height, m.format, m.type);
              for (const Me of m.layerUpdates) {
                const $ = K.data.subarray(Me * se / K.data.BYTES_PER_ELEMENT, (Me + 1) * se / K.data.BYTES_PER_ELEMENT);
                n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, W, 0, 0, Me, K.width, K.height, 1, ie, $);
              }
              m.clearLayerUpdates();
            } else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, W, 0, 0, 0, K.width, K.height, L.depth, ie, K.data);
          } else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY, W, fe, K.width, K.height, L.depth, 0, K.data, 0, 0);
          else Te("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
          else De ? Oe && n.texSubImage3D(e.TEXTURE_2D_ARRAY, W, 0, 0, 0, K.width, K.height, L.depth, ie, le, K.data) : n.texImage3D(e.TEXTURE_2D_ARRAY, W, fe, K.width, K.height, L.depth, 0, ie, le, K.data);
      } else {
        De && ke && n.texStorage2D(e.TEXTURE_2D, w, fe, Ae[0].width, Ae[0].height);
        for (let W = 0, Q = Ae.length; W < Q; W++)
          K = Ae[W], m.format !== 1023 ? ie !== null ? De ? Oe && n.compressedTexSubImage2D(e.TEXTURE_2D, W, 0, 0, K.width, K.height, ie, K.data) : n.compressedTexImage2D(e.TEXTURE_2D, W, fe, K.width, K.height, 0, K.data) : Te("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : De ? Oe && n.texSubImage2D(e.TEXTURE_2D, W, 0, 0, K.width, K.height, ie, le, K.data) : n.texImage2D(e.TEXTURE_2D, W, fe, K.width, K.height, 0, ie, le, K.data);
      }
      else if (m.isDataArrayTexture) if (De) {
        if (ke && n.texStorage3D(e.TEXTURE_2D_ARRAY, w, fe, L.width, L.height, L.depth), Oe) if (m.layerUpdates.size > 0) {
          const W = Hs(L.width, L.height, m.format, m.type);
          for (const Q of m.layerUpdates) {
            const se = L.data.subarray(Q * W / L.data.BYTES_PER_ELEMENT, (Q + 1) * W / L.data.BYTES_PER_ELEMENT);
            n.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, Q, L.width, L.height, 1, ie, le, se);
          }
          m.clearLayerUpdates();
        } else n.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, 0, L.width, L.height, L.depth, ie, le, L.data);
      } else n.texImage3D(e.TEXTURE_2D_ARRAY, 0, fe, L.width, L.height, L.depth, 0, ie, le, L.data);
      else if (m.isData3DTexture) De ? (ke && n.texStorage3D(e.TEXTURE_3D, w, fe, L.width, L.height, L.depth), Oe && n.texSubImage3D(e.TEXTURE_3D, 0, 0, 0, 0, L.width, L.height, L.depth, ie, le, L.data)) : n.texImage3D(e.TEXTURE_3D, 0, fe, L.width, L.height, L.depth, 0, ie, le, L.data);
      else if (m.isFramebufferTexture) {
        if (ke) if (De) n.texStorage2D(e.TEXTURE_2D, w, fe, L.width, L.height);
        else {
          let W = L.width, Q = L.height;
          for (let se = 0; se < w; se++)
            n.texImage2D(e.TEXTURE_2D, se, fe, W, Q, 0, ie, le, null), W >>= 1, Q >>= 1;
        }
      } else if (m.isHTMLTexture) {
        if ("texElementImage2D" in e) {
          const W = e.canvas;
          if (W.hasAttribute("layoutsubtree") || W.setAttribute("layoutsubtree", "true"), L.parentNode !== W) {
            W.appendChild(L), d.add(m), W.onpaint = (Se) => {
              const we = Se.changedElements;
              for (const bt of d) we.includes(bt.image) && (bt.needsUpdate = !0);
            }, W.requestPaint();
            return;
          }
          const Q = 0, se = e.RGBA, Me = e.RGBA, $ = e.UNSIGNED_BYTE;
          e.texElementImage2D(e.TEXTURE_2D, Q, se, Me, $, L), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
        }
      } else if (Ae.length > 0) {
        if (De && ke) {
          const W = Ee(Ae[0]);
          n.texStorage2D(e.TEXTURE_2D, w, fe, W.width, W.height);
        }
        for (let W = 0, Q = Ae.length; W < Q; W++)
          K = Ae[W], De ? Oe && n.texSubImage2D(e.TEXTURE_2D, W, 0, 0, ie, le, K) : n.texImage2D(e.TEXTURE_2D, W, fe, ie, le, K);
        m.generateMipmaps = !1;
      } else if (De) {
        if (ke) {
          const W = Ee(L);
          n.texStorage2D(e.TEXTURE_2D, w, fe, W.width, W.height);
        }
        Oe && n.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, ie, le, L);
      } else n.texImage2D(e.TEXTURE_2D, 0, fe, ie, le, L);
      f(m) && y(j), oe.__version = ee.version, m.onUpdate && m.onUpdate(m);
    }
    x.__version = m.version;
  }
  function Le(x, m, U) {
    if (m.image.length !== 6) return;
    const j = ae(x, m), Z = m.source;
    n.bindTexture(e.TEXTURE_CUBE_MAP, x.__webglTexture, e.TEXTURE0 + U);
    const ee = i.get(Z);
    if (Z.version !== ee.__version || j === !0) {
      n.activeTexture(e.TEXTURE0 + U);
      const oe = We.getPrimaries(We.workingColorSpace), L = m.colorSpace === "" ? null : We.getPrimaries(m.colorSpace), ie = m.colorSpace === "" || oe === L ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
      n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, m.flipY), n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, m.premultiplyAlpha), n.pixelStorei(e.UNPACK_ALIGNMENT, m.unpackAlignment), n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, ie);
      const le = m.isCompressedTexture || m.image[0].isCompressedTexture, fe = m.image[0] && m.image[0].isDataTexture, K = [];
      for (let $ = 0; $ < 6; $++)
        !le && !fe ? K[$] = p(m.image[$], !0, r.maxCubemapSize) : K[$] = fe ? m.image[$].image : m.image[$], K[$] = nt(m, K[$]);
      const Ae = K[0], De = s.convert(m.format, m.colorSpace), ke = s.convert(m.type), Oe = T(m.internalFormat, De, ke, m.normalized, m.colorSpace), w = m.isVideoTexture !== !0, W = ee.__version === void 0 || j === !0, Q = Z.dataReady;
      let se = R(m, Ae);
      q(e.TEXTURE_CUBE_MAP, m);
      let Me;
      if (le) {
        w && W && n.texStorage2D(e.TEXTURE_CUBE_MAP, se, Oe, Ae.width, Ae.height);
        for (let $ = 0; $ < 6; $++) {
          Me = K[$].mipmaps;
          for (let Se = 0; Se < Me.length; Se++) {
            const we = Me[Se];
            m.format !== 1023 ? De !== null ? w ? Q && n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + $, Se, 0, 0, we.width, we.height, De, we.data) : n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + $, Se, Oe, we.width, we.height, 0, we.data) : Te("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : w ? Q && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + $, Se, 0, 0, we.width, we.height, De, ke, we.data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + $, Se, Oe, we.width, we.height, 0, De, ke, we.data);
          }
        }
      } else {
        if (Me = m.mipmaps, w && W) {
          Me.length > 0 && se++;
          const $ = Ee(K[0]);
          n.texStorage2D(e.TEXTURE_CUBE_MAP, se, Oe, $.width, $.height);
        }
        for (let $ = 0; $ < 6; $++) if (fe) {
          w ? Q && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + $, 0, 0, 0, K[$].width, K[$].height, De, ke, K[$].data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + $, 0, Oe, K[$].width, K[$].height, 0, De, ke, K[$].data);
          for (let Se = 0; Se < Me.length; Se++) {
            const we = Me[Se].image[$].image;
            w ? Q && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + $, Se + 1, 0, 0, we.width, we.height, De, ke, we.data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + $, Se + 1, Oe, we.width, we.height, 0, De, ke, we.data);
          }
        } else {
          w ? Q && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + $, 0, 0, 0, De, ke, K[$]) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + $, 0, Oe, De, ke, K[$]);
          for (let Se = 0; Se < Me.length; Se++) {
            const we = Me[Se];
            w ? Q && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + $, Se + 1, 0, 0, De, ke, we.image[$]) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + $, Se + 1, Oe, De, ke, we.image[$]);
          }
        }
      }
      f(m) && y(e.TEXTURE_CUBE_MAP), ee.__version = Z.version, m.onUpdate && m.onUpdate(m);
    }
    x.__version = m.version;
  }
  function Re(x, m, U, j, Z, ee) {
    const oe = s.convert(U.format, U.colorSpace), L = s.convert(U.type), ie = T(U.internalFormat, oe, L, U.normalized, U.colorSpace), le = i.get(m), fe = i.get(U);
    if (fe.__renderTarget = m, !le.__hasExternalTextures) {
      const K = Math.max(1, m.width >> ee), Ae = Math.max(1, m.height >> ee);
      Z === e.TEXTURE_3D || Z === e.TEXTURE_2D_ARRAY ? n.texImage3D(Z, ee, ie, K, Ae, m.depth, 0, oe, L, null) : n.texImage2D(Z, ee, ie, K, Ae, 0, oe, L, null);
    }
    n.bindFramebuffer(e.FRAMEBUFFER, x), Ye(m) ? o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, j, Z, fe.__webglTexture, 0, He(m)) : (Z === e.TEXTURE_2D || Z >= e.TEXTURE_CUBE_MAP_POSITIVE_X && Z <= e.TEXTURE_CUBE_MAP_NEGATIVE_Z) && e.framebufferTexture2D(e.FRAMEBUFFER, j, Z, fe.__webglTexture, ee), n.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  function Ze(x, m, U) {
    if (e.bindRenderbuffer(e.RENDERBUFFER, x), m.depthBuffer) {
      const j = m.depthTexture, Z = j && j.isDepthTexture ? j.type : null, ee = P(m.stencilBuffer, Z), oe = m.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
      Ye(m) ? o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, He(m), ee, m.width, m.height) : U ? e.renderbufferStorageMultisample(e.RENDERBUFFER, He(m), ee, m.width, m.height) : e.renderbufferStorage(e.RENDERBUFFER, ee, m.width, m.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, oe, e.RENDERBUFFER, x);
    } else {
      const j = m.textures;
      for (let Z = 0; Z < j.length; Z++) {
        const ee = j[Z], oe = s.convert(ee.format, ee.colorSpace), L = s.convert(ee.type), ie = T(ee.internalFormat, oe, L, ee.normalized, ee.colorSpace);
        Ye(m) ? o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, He(m), ie, m.width, m.height) : U ? e.renderbufferStorageMultisample(e.RENDERBUFFER, He(m), ie, m.width, m.height) : e.renderbufferStorage(e.RENDERBUFFER, ie, m.width, m.height);
      }
    }
    e.bindRenderbuffer(e.RENDERBUFFER, null);
  }
  function Ge(x, m, U) {
    const j = m.isWebGLCubeRenderTarget === !0;
    if (n.bindFramebuffer(e.FRAMEBUFFER, x), !(m.depthTexture && m.depthTexture.isDepthTexture)) throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    const Z = i.get(m.depthTexture);
    if (Z.__renderTarget = m, (!Z.__webglTexture || m.depthTexture.image.width !== m.width || m.depthTexture.image.height !== m.height) && (m.depthTexture.image.width = m.width, m.depthTexture.image.height = m.height, m.depthTexture.needsUpdate = !0), j) {
      if (Z.__webglInit === void 0 && (Z.__webglInit = !0, m.depthTexture.addEventListener("dispose", D)), Z.__webglTexture === void 0) {
        Z.__webglTexture = e.createTexture(), n.bindTexture(e.TEXTURE_CUBE_MAP, Z.__webglTexture), q(e.TEXTURE_CUBE_MAP, m.depthTexture);
        const le = s.convert(m.depthTexture.format), fe = s.convert(m.depthTexture.type);
        let K;
        m.depthTexture.format === 1026 ? K = e.DEPTH_COMPONENT24 : m.depthTexture.format === 1027 && (K = e.DEPTH24_STENCIL8);
        for (let Ae = 0; Ae < 6; Ae++) e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + Ae, 0, K, m.width, m.height, 0, le, fe, null);
      }
    } else J(m.depthTexture, 0);
    const ee = Z.__webglTexture, oe = He(m), L = j ? e.TEXTURE_CUBE_MAP_POSITIVE_X + U : e.TEXTURE_2D, ie = m.depthTexture.format === 1027 ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
    if (m.depthTexture.format === 1026) Ye(m) ? o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, ie, L, ee, 0, oe) : e.framebufferTexture2D(e.FRAMEBUFFER, ie, L, ee, 0);
    else if (m.depthTexture.format === 1027) Ye(m) ? o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, ie, L, ee, 0, oe) : e.framebufferTexture2D(e.FRAMEBUFFER, ie, L, ee, 0);
    else throw new Error("Unknown depthTexture format");
  }
  function ut(x) {
    const m = i.get(x), U = x.isWebGLCubeRenderTarget === !0;
    if (m.__boundDepthTexture !== x.depthTexture) {
      const j = x.depthTexture;
      if (m.__depthDisposeCallback && m.__depthDisposeCallback(), j) {
        const Z = () => {
          delete m.__boundDepthTexture, delete m.__depthDisposeCallback, j.removeEventListener("dispose", Z);
        };
        j.addEventListener("dispose", Z), m.__depthDisposeCallback = Z;
      }
      m.__boundDepthTexture = j;
    }
    if (x.depthTexture && !m.__autoAllocateDepthBuffer) if (U) for (let j = 0; j < 6; j++) Ge(m.__webglFramebuffer[j], x, j);
    else {
      const j = x.texture.mipmaps;
      j && j.length > 0 ? Ge(m.__webglFramebuffer[0], x, 0) : Ge(m.__webglFramebuffer, x, 0);
    }
    else if (U) {
      m.__webglDepthbuffer = [];
      for (let j = 0; j < 6; j++)
        if (n.bindFramebuffer(e.FRAMEBUFFER, m.__webglFramebuffer[j]), m.__webglDepthbuffer[j] === void 0)
          m.__webglDepthbuffer[j] = e.createRenderbuffer(), Ze(m.__webglDepthbuffer[j], x, !1);
        else {
          const Z = x.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, ee = m.__webglDepthbuffer[j];
          e.bindRenderbuffer(e.RENDERBUFFER, ee), e.framebufferRenderbuffer(e.FRAMEBUFFER, Z, e.RENDERBUFFER, ee);
        }
    } else {
      const j = x.texture.mipmaps;
      if (j && j.length > 0 ? n.bindFramebuffer(e.FRAMEBUFFER, m.__webglFramebuffer[0]) : n.bindFramebuffer(e.FRAMEBUFFER, m.__webglFramebuffer), m.__webglDepthbuffer === void 0)
        m.__webglDepthbuffer = e.createRenderbuffer(), Ze(m.__webglDepthbuffer, x, !1);
      else {
        const Z = x.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, ee = m.__webglDepthbuffer;
        e.bindRenderbuffer(e.RENDERBUFFER, ee), e.framebufferRenderbuffer(e.FRAMEBUFFER, Z, e.RENDERBUFFER, ee);
      }
    }
    n.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  function at(x, m, U) {
    const j = i.get(x);
    m !== void 0 && Re(j.__webglFramebuffer, x, x.texture, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, 0), U !== void 0 && ut(x);
  }
  function Rt(x) {
    const m = x.texture, U = i.get(x), j = i.get(m);
    x.addEventListener("dispose", v);
    const Z = x.textures, ee = x.isWebGLCubeRenderTarget === !0, oe = Z.length > 1;
    if (oe || (j.__webglTexture === void 0 && (j.__webglTexture = e.createTexture()), j.__version = m.version, a.memory.textures++), ee) {
      U.__webglFramebuffer = [];
      for (let L = 0; L < 6; L++) if (m.mipmaps && m.mipmaps.length > 0) {
        U.__webglFramebuffer[L] = [];
        for (let ie = 0; ie < m.mipmaps.length; ie++) U.__webglFramebuffer[L][ie] = e.createFramebuffer();
      } else U.__webglFramebuffer[L] = e.createFramebuffer();
    } else {
      if (m.mipmaps && m.mipmaps.length > 0) {
        U.__webglFramebuffer = [];
        for (let L = 0; L < m.mipmaps.length; L++) U.__webglFramebuffer[L] = e.createFramebuffer();
      } else U.__webglFramebuffer = e.createFramebuffer();
      if (oe) for (let L = 0, ie = Z.length; L < ie; L++) {
        const le = i.get(Z[L]);
        le.__webglTexture === void 0 && (le.__webglTexture = e.createTexture(), a.memory.textures++);
      }
      if (x.samples > 0 && Ye(x) === !1) {
        U.__webglMultisampledFramebuffer = e.createFramebuffer(), U.__webglColorRenderbuffer = [], n.bindFramebuffer(e.FRAMEBUFFER, U.__webglMultisampledFramebuffer);
        for (let L = 0; L < Z.length; L++) {
          const ie = Z[L];
          U.__webglColorRenderbuffer[L] = e.createRenderbuffer(), e.bindRenderbuffer(e.RENDERBUFFER, U.__webglColorRenderbuffer[L]);
          const le = s.convert(ie.format, ie.colorSpace), fe = s.convert(ie.type), K = T(ie.internalFormat, le, fe, ie.normalized, ie.colorSpace, x.isXRRenderTarget === !0), Ae = He(x);
          e.renderbufferStorageMultisample(e.RENDERBUFFER, Ae, K, x.width, x.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + L, e.RENDERBUFFER, U.__webglColorRenderbuffer[L]);
        }
        e.bindRenderbuffer(e.RENDERBUFFER, null), x.depthBuffer && (U.__webglDepthRenderbuffer = e.createRenderbuffer(), Ze(U.__webglDepthRenderbuffer, x, !0)), n.bindFramebuffer(e.FRAMEBUFFER, null);
      }
    }
    if (ee) {
      n.bindTexture(e.TEXTURE_CUBE_MAP, j.__webglTexture), q(e.TEXTURE_CUBE_MAP, m);
      for (let L = 0; L < 6; L++) if (m.mipmaps && m.mipmaps.length > 0) for (let ie = 0; ie < m.mipmaps.length; ie++) Re(U.__webglFramebuffer[L][ie], x, m, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + L, ie);
      else Re(U.__webglFramebuffer[L], x, m, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + L, 0);
      f(m) && y(e.TEXTURE_CUBE_MAP), n.unbindTexture();
    } else if (oe) {
      for (let L = 0, ie = Z.length; L < ie; L++) {
        const le = Z[L], fe = i.get(le);
        let K = e.TEXTURE_2D;
        (x.isWebGL3DRenderTarget || x.isWebGLArrayRenderTarget) && (K = x.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), n.bindTexture(K, fe.__webglTexture), q(K, le), Re(U.__webglFramebuffer, x, le, e.COLOR_ATTACHMENT0 + L, K, 0), f(le) && y(K);
      }
      n.unbindTexture();
    } else {
      let L = e.TEXTURE_2D;
      if ((x.isWebGL3DRenderTarget || x.isWebGLArrayRenderTarget) && (L = x.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), n.bindTexture(L, j.__webglTexture), q(L, m), m.mipmaps && m.mipmaps.length > 0) for (let ie = 0; ie < m.mipmaps.length; ie++) Re(U.__webglFramebuffer[ie], x, m, e.COLOR_ATTACHMENT0, L, ie);
      else Re(U.__webglFramebuffer, x, m, e.COLOR_ATTACHMENT0, L, 0);
      f(m) && y(L), n.unbindTexture();
    }
    x.depthBuffer && ut(x);
  }
  function gt(x) {
    const m = x.textures;
    for (let U = 0, j = m.length; U < j; U++) {
      const Z = m[U];
      if (f(Z)) {
        const ee = b(x), oe = i.get(Z).__webglTexture;
        n.bindTexture(ee, oe), y(ee), n.unbindTexture();
      }
    }
  }
  const lt = [], C = [];
  function xt(x) {
    if (x.samples > 0) {
      if (Ye(x) === !1) {
        const m = x.textures, U = x.width, j = x.height;
        let Z = e.COLOR_BUFFER_BIT;
        const ee = x.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT, oe = i.get(x), L = m.length > 1;
        if (L) for (let le = 0; le < m.length; le++)
          n.bindFramebuffer(e.FRAMEBUFFER, oe.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + le, e.RENDERBUFFER, null), n.bindFramebuffer(e.FRAMEBUFFER, oe.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + le, e.TEXTURE_2D, null, 0);
        n.bindFramebuffer(e.READ_FRAMEBUFFER, oe.__webglMultisampledFramebuffer);
        const ie = x.texture.mipmaps;
        ie && ie.length > 0 ? n.bindFramebuffer(e.DRAW_FRAMEBUFFER, oe.__webglFramebuffer[0]) : n.bindFramebuffer(e.DRAW_FRAMEBUFFER, oe.__webglFramebuffer);
        for (let le = 0; le < m.length; le++) {
          if (x.resolveDepthBuffer && (x.depthBuffer && (Z |= e.DEPTH_BUFFER_BIT), x.stencilBuffer && x.resolveStencilBuffer && (Z |= e.STENCIL_BUFFER_BIT)), L) {
            e.framebufferRenderbuffer(e.READ_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.RENDERBUFFER, oe.__webglColorRenderbuffer[le]);
            const fe = i.get(m[le]).__webglTexture;
            e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, fe, 0);
          }
          e.blitFramebuffer(0, 0, U, j, 0, 0, U, j, Z, e.NEAREST), l === !0 && (lt.length = 0, C.length = 0, lt.push(e.COLOR_ATTACHMENT0 + le), x.depthBuffer && x.resolveDepthBuffer === !1 && (lt.push(ee), C.push(ee), e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, C)), e.invalidateFramebuffer(e.READ_FRAMEBUFFER, lt));
        }
        if (n.bindFramebuffer(e.READ_FRAMEBUFFER, null), n.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), L) for (let le = 0; le < m.length; le++) {
          n.bindFramebuffer(e.FRAMEBUFFER, oe.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + le, e.RENDERBUFFER, oe.__webglColorRenderbuffer[le]);
          const fe = i.get(m[le]).__webglTexture;
          n.bindFramebuffer(e.FRAMEBUFFER, oe.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + le, e.TEXTURE_2D, fe, 0);
        }
        n.bindFramebuffer(e.DRAW_FRAMEBUFFER, oe.__webglMultisampledFramebuffer);
      } else if (x.depthBuffer && x.resolveDepthBuffer === !1 && l) {
        const m = x.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
        e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, [m]);
      }
    }
  }
  function He(x) {
    return Math.min(r.maxSamples, x.samples);
  }
  function Ye(x) {
    const m = i.get(x);
    return x.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === !0 && m.__useRenderToTexture !== !1;
  }
  function he(x) {
    const m = a.render.frame;
    u.get(x) !== m && (u.set(x, m), x.update());
  }
  function nt(x, m) {
    const U = x.colorSpace, j = x.format, Z = x.type;
    return x.isCompressedTexture === !0 || x.isVideoTexture === !0 || U !== "srgb-linear" && U !== "" && (We.getTransfer(U) === "srgb" ? (j !== 1023 || Z !== 1009) && Te("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : Pe("WebGLTextures: Unsupported texture color space:", U)), m;
  }
  function Ee(x) {
    return typeof HTMLImageElement < "u" && x instanceof HTMLImageElement ? (c.width = x.naturalWidth || x.width, c.height = x.naturalHeight || x.height) : typeof VideoFrame < "u" && x instanceof VideoFrame ? (c.width = x.displayWidth, c.height = x.displayHeight) : (c.width = x.width, c.height = x.height), c;
  }
  this.allocateTextureUnit = H, this.resetTextureUnits = Y, this.getTextureUnits = B, this.setTextureUnits = G, this.setTexture2D = J, this.setTexture2DArray = te, this.setTexture3D = re, this.setTextureCube = ge, this.rebindTextures = at, this.setupRenderTarget = Rt, this.updateRenderTargetMipmap = gt, this.updateMultisampleRenderTarget = xt, this.setupDepthRenderbuffer = ut, this.setupFrameBufferTexture = Re, this.useMultisampledRTT = Ye, this.isReversedDepthBuffer = function() {
    return n.buffers.depth.getReversed();
  };
}
function Bu(e, t) {
  function n(i, r = "") {
    let s;
    const a = We.getTransfer(r);
    if (i === 1009) return e.UNSIGNED_BYTE;
    if (i === 1017) return e.UNSIGNED_SHORT_4_4_4_4;
    if (i === 1018) return e.UNSIGNED_SHORT_5_5_5_1;
    if (i === 35902) return e.UNSIGNED_INT_5_9_9_9_REV;
    if (i === 35899) return e.UNSIGNED_INT_10F_11F_11F_REV;
    if (i === 1010) return e.BYTE;
    if (i === 1011) return e.SHORT;
    if (i === 1012) return e.UNSIGNED_SHORT;
    if (i === 1013) return e.INT;
    if (i === 1014) return e.UNSIGNED_INT;
    if (i === 1015) return e.FLOAT;
    if (i === 1016) return e.HALF_FLOAT;
    if (i === 1021) return e.ALPHA;
    if (i === 1022) return e.RGB;
    if (i === 1023) return e.RGBA;
    if (i === 1026) return e.DEPTH_COMPONENT;
    if (i === 1027) return e.DEPTH_STENCIL;
    if (i === 1028) return e.RED;
    if (i === 1029) return e.RED_INTEGER;
    if (i === 1030) return e.RG;
    if (i === 1031) return e.RG_INTEGER;
    if (i === 1033) return e.RGBA_INTEGER;
    if (i === 33776 || i === 33777 || i === 33778 || i === 33779) if (a === "srgb")
      if (s = t.get("WEBGL_compressed_texture_s3tc_srgb"), s !== null) {
        if (i === 33776) return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;
        if (i === 33777) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
        if (i === 33778) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
        if (i === 33779) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
      } else return null;
    else if (s = t.get("WEBGL_compressed_texture_s3tc"), s !== null) {
      if (i === 33776) return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
      if (i === 33777) return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
      if (i === 33778) return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
      if (i === 33779) return s.COMPRESSED_RGBA_S3TC_DXT5_EXT;
    } else return null;
    if (i === 35840 || i === 35841 || i === 35842 || i === 35843)
      if (s = t.get("WEBGL_compressed_texture_pvrtc"), s !== null) {
        if (i === 35840) return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (i === 35841) return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (i === 35842) return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (i === 35843) return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else return null;
    if (i === 36196 || i === 37492 || i === 37496 || i === 37488 || i === 37489 || i === 37490 || i === 37491)
      if (s = t.get("WEBGL_compressed_texture_etc"), s !== null) {
        if (i === 36196 || i === 37492) return a === "srgb" ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
        if (i === 37496) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : s.COMPRESSED_RGBA8_ETC2_EAC;
        if (i === 37488) return s.COMPRESSED_R11_EAC;
        if (i === 37489) return s.COMPRESSED_SIGNED_R11_EAC;
        if (i === 37490) return s.COMPRESSED_RG11_EAC;
        if (i === 37491) return s.COMPRESSED_SIGNED_RG11_EAC;
      } else return null;
    if (i === 37808 || i === 37809 || i === 37810 || i === 37811 || i === 37812 || i === 37813 || i === 37814 || i === 37815 || i === 37816 || i === 37817 || i === 37818 || i === 37819 || i === 37820 || i === 37821)
      if (s = t.get("WEBGL_compressed_texture_astc"), s !== null) {
        if (i === 37808) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (i === 37809) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (i === 37810) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (i === 37811) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (i === 37812) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (i === 37813) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (i === 37814) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (i === 37815) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (i === 37816) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (i === 37817) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (i === 37818) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (i === 37819) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (i === 37820) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (i === 37821) return a === "srgb" ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : s.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else return null;
    if (i === 36492 || i === 36494 || i === 36495)
      if (s = t.get("EXT_texture_compression_bptc"), s !== null) {
        if (i === 36492) return a === "srgb" ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : s.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (i === 36494) return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (i === 36495) return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else return null;
    if (i === 36283 || i === 36284 || i === 36285 || i === 36286)
      if (s = t.get("EXT_texture_compression_rgtc"), s !== null) {
        if (i === 36283) return s.COMPRESSED_RED_RGTC1_EXT;
        if (i === 36284) return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (i === 36285) return s.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (i === 36286) return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else return null;
    return i === 1020 ? e.UNSIGNED_INT_24_8 : e[i] !== void 0 ? e[i] : null;
  }
  return { convert: n };
}
var zu = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, Vu = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`, Gu = class {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(e, t) {
    if (this.texture === null) {
      const n = new Fa(e.texture);
      (e.depthNear !== t.depthNear || e.depthFar !== t.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = n;
    }
  }
  getMesh(e) {
    if (this.texture !== null && this.mesh === null) {
      const t = e.cameras[0].viewport, n = new $t({
        vertexShader: zu,
        fragmentShader: Vu,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: t.z },
          depthHeight: { value: t.w }
        }
      });
      this.mesh = new Zt(new za(20, 20), n);
    }
    return this.mesh;
  }
  reset() {
    this.texture = null, this.mesh = null;
  }
  getDepthTexture() {
    return this.texture;
  }
}, Hu = class extends Mn {
  constructor(e, t) {
    super();
    const n = this;
    let i = null, r = 1, s = null, a = "local-floor", o = 1, l = null, c = null, u = null, d = null, h = null, _ = null;
    const M = typeof XRWebGLBinding < "u", S = new Gu(), p = {}, f = t.getContextAttributes();
    let y = null, b = null;
    const T = [], P = [], R = new Ne();
    let D = null;
    const v = new Ut();
    v.viewport = new ht();
    const E = new Ut();
    E.viewport = new ht();
    const X = [v, E], A = new xc();
    let k = null, Y = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(q) {
      let ae = T[q];
      return ae === void 0 && (ae = new mr(), T[q] = ae), ae.getTargetRaySpace();
    }, this.getControllerGrip = function(q) {
      let ae = T[q];
      return ae === void 0 && (ae = new mr(), T[q] = ae), ae.getGripSpace();
    }, this.getHand = function(q) {
      let ae = T[q];
      return ae === void 0 && (ae = new mr(), T[q] = ae), ae.getHandSpace();
    };
    function B(q) {
      const ae = P.indexOf(q.inputSource);
      if (ae === -1) return;
      const ve = T[ae];
      ve !== void 0 && (ve.update(q.inputSource, q.frame, l || s), ve.dispatchEvent({
        type: q.type,
        data: q.inputSource
      }));
    }
    function G() {
      i.removeEventListener("select", B), i.removeEventListener("selectstart", B), i.removeEventListener("selectend", B), i.removeEventListener("squeeze", B), i.removeEventListener("squeezestart", B), i.removeEventListener("squeezeend", B), i.removeEventListener("end", G), i.removeEventListener("inputsourceschange", H);
      for (let q = 0; q < T.length; q++) {
        const ae = P[q];
        ae !== null && (P[q] = null, T[q].disconnect(ae));
      }
      k = null, Y = null, S.reset();
      for (const q in p) delete p[q];
      e.setRenderTarget(y), h = null, d = null, u = null, i = null, b = null, Ve.stop(), n.isPresenting = !1, e.setPixelRatio(D), e.setSize(R.width, R.height, !1), n.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(q) {
      r = q, n.isPresenting === !0 && Te("WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(q) {
      a = q, n.isPresenting === !0 && Te("WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return l || s;
    }, this.setReferenceSpace = function(q) {
      l = q;
    }, this.getBaseLayer = function() {
      return d !== null ? d : h;
    }, this.getBinding = function() {
      return u === null && M && (u = new XRWebGLBinding(i, t)), u;
    }, this.getFrame = function() {
      return _;
    }, this.getSession = function() {
      return i;
    }, this.setSession = async function(q) {
      if (i = q, i !== null) {
        if (y = e.getRenderTarget(), i.addEventListener("select", B), i.addEventListener("selectstart", B), i.addEventListener("selectend", B), i.addEventListener("squeeze", B), i.addEventListener("squeezestart", B), i.addEventListener("squeezeend", B), i.addEventListener("end", G), i.addEventListener("inputsourceschange", H), f.xrCompatible !== !0 && await t.makeXRCompatible(), D = e.getPixelRatio(), e.getSize(R), M && "createProjectionLayer" in XRWebGLBinding.prototype) {
          let ae = null, ve = null, de = null;
          f.depth && (de = f.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, ae = f.stencil ? va : _i, ve = f.stencil ? ga : Rn);
          const be = {
            colorFormat: t.RGBA8,
            depthFormat: de,
            scaleFactor: r
          };
          u = this.getBinding(), d = u.createProjectionLayer(be), i.updateRenderState({ layers: [d] }), e.setPixelRatio(1), e.setSize(d.textureWidth, d.textureHeight, !1), b = new jt(d.textureWidth, d.textureHeight, {
            format: mi,
            type: vn,
            depthTexture: new ei(d.textureWidth, d.textureHeight, ve, void 0, void 0, void 0, void 0, void 0, void 0, ae),
            stencilBuffer: f.stencil,
            colorSpace: e.outputColorSpace,
            samples: f.antialias ? 4 : 0,
            resolveDepthBuffer: d.ignoreDepthValues === !1,
            resolveStencilBuffer: d.ignoreDepthValues === !1
          });
        } else {
          const ae = {
            antialias: f.antialias,
            alpha: !0,
            depth: f.depth,
            stencil: f.stencil,
            framebufferScaleFactor: r
          };
          h = new XRWebGLLayer(i, t, ae), i.updateRenderState({ baseLayer: h }), e.setPixelRatio(1), e.setSize(h.framebufferWidth, h.framebufferHeight, !1), b = new jt(h.framebufferWidth, h.framebufferHeight, {
            format: mi,
            type: vn,
            colorSpace: e.outputColorSpace,
            stencilBuffer: f.stencil,
            resolveDepthBuffer: h.ignoreDepthValues === !1,
            resolveStencilBuffer: h.ignoreDepthValues === !1
          });
        }
        b.isXRRenderTarget = !0, this.setFoveation(o), l = null, s = await i.requestReferenceSpace(a), Ve.setContext(i), Ve.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (i !== null) return i.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return S.getDepthTexture();
    };
    function H(q) {
      for (let ae = 0; ae < q.removed.length; ae++) {
        const ve = q.removed[ae], de = P.indexOf(ve);
        de >= 0 && (P[de] = null, T[de].disconnect(ve));
      }
      for (let ae = 0; ae < q.added.length; ae++) {
        const ve = q.added[ae];
        let de = P.indexOf(ve);
        if (de === -1) {
          for (let Le = 0; Le < T.length; Le++) if (Le >= P.length) {
            P.push(ve), de = Le;
            break;
          } else if (P[Le] === null) {
            P[Le] = ve, de = Le;
            break;
          }
          if (de === -1) break;
        }
        const be = T[de];
        be && be.connect(ve);
      }
    }
    const z = new O(), J = new O();
    function te(q, ae, ve) {
      z.setFromMatrixPosition(ae.matrixWorld), J.setFromMatrixPosition(ve.matrixWorld);
      const de = z.distanceTo(J), be = ae.projectionMatrix.elements, Le = ve.projectionMatrix.elements, Re = be[14] / (be[10] - 1), Ze = be[14] / (be[10] + 1), Ge = (be[9] + 1) / be[5], ut = (be[9] - 1) / be[5], at = (be[8] - 1) / be[0], Rt = (Le[8] + 1) / Le[0], gt = Re * at, lt = Re * Rt, C = de / (-at + Rt), xt = C * -at;
      if (ae.matrixWorld.decompose(q.position, q.quaternion, q.scale), q.translateX(xt), q.translateZ(C), q.matrixWorld.compose(q.position, q.quaternion, q.scale), q.matrixWorldInverse.copy(q.matrixWorld).invert(), be[10] === -1)
        q.projectionMatrix.copy(ae.projectionMatrix), q.projectionMatrixInverse.copy(ae.projectionMatrixInverse);
      else {
        const He = Re + C, Ye = Ze + C, he = gt - xt, nt = lt + (de - xt), Ee = Ge * Ze / Ye * He, x = ut * Ze / Ye * He;
        q.projectionMatrix.makePerspective(he, nt, Ee, x, He, Ye), q.projectionMatrixInverse.copy(q.projectionMatrix).invert();
      }
    }
    function re(q, ae) {
      ae === null ? q.matrixWorld.copy(q.matrix) : q.matrixWorld.multiplyMatrices(ae.matrixWorld, q.matrix), q.matrixWorldInverse.copy(q.matrixWorld).invert();
    }
    this.updateCamera = function(q) {
      if (i === null) return;
      let ae = q.near, ve = q.far;
      S.texture !== null && (S.depthNear > 0 && (ae = S.depthNear), S.depthFar > 0 && (ve = S.depthFar)), A.near = E.near = v.near = ae, A.far = E.far = v.far = ve, (k !== A.near || Y !== A.far) && (i.updateRenderState({
        depthNear: A.near,
        depthFar: A.far
      }), k = A.near, Y = A.far), A.layers.mask = q.layers.mask | 6, v.layers.mask = A.layers.mask & -5, E.layers.mask = A.layers.mask & -3;
      const de = q.parent, be = A.cameras;
      re(A, de);
      for (let Le = 0; Le < be.length; Le++) re(be[Le], de);
      be.length === 2 ? te(A, v, E) : A.projectionMatrix.copy(v.projectionMatrix), ge(q, A, de);
    };
    function ge(q, ae, ve) {
      ve === null ? q.matrix.copy(ae.matrixWorld) : (q.matrix.copy(ve.matrixWorld), q.matrix.invert(), q.matrix.multiply(ae.matrixWorld)), q.matrix.decompose(q.position, q.quaternion, q.scale), q.updateMatrixWorld(!0), q.projectionMatrix.copy(ae.projectionMatrix), q.projectionMatrixInverse.copy(ae.projectionMatrixInverse), q.isPerspectiveCamera && (q.fov = vi * 2 * Math.atan(1 / q.projectionMatrix.elements[5]), q.zoom = 1);
    }
    this.getCamera = function() {
      return A;
    }, this.getFoveation = function() {
      if (!(d === null && h === null))
        return o;
    }, this.setFoveation = function(q) {
      o = q, d !== null && (d.fixedFoveation = q), h !== null && h.fixedFoveation !== void 0 && (h.fixedFoveation = q);
    }, this.hasDepthSensing = function() {
      return S.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return S.getMesh(A);
    }, this.getCameraTexture = function(q) {
      return p[q];
    };
    let xe = null;
    function Ke(q, ae) {
      if (c = ae.getViewerPose(l || s), _ = ae, c !== null) {
        const ve = c.views;
        h !== null && (e.setRenderTargetFramebuffer(b, h.framebuffer), e.setRenderTarget(b));
        let de = !1;
        ve.length !== A.cameras.length && (A.cameras.length = 0, de = !0);
        for (let Le = 0; Le < ve.length; Le++) {
          const Re = ve[Le];
          let Ze = null;
          if (h !== null) Ze = h.getViewport(Re);
          else {
            const ut = u.getViewSubImage(d, Re);
            Ze = ut.viewport, Le === 0 && (e.setRenderTargetTextures(b, ut.colorTexture, ut.depthStencilTexture), e.setRenderTarget(b));
          }
          let Ge = X[Le];
          Ge === void 0 && (Ge = new Ut(), Ge.layers.enable(Le), Ge.viewport = new ht(), X[Le] = Ge), Ge.matrix.fromArray(Re.transform.matrix), Ge.matrix.decompose(Ge.position, Ge.quaternion, Ge.scale), Ge.projectionMatrix.fromArray(Re.projectionMatrix), Ge.projectionMatrixInverse.copy(Ge.projectionMatrix).invert(), Ge.viewport.set(Ze.x, Ze.y, Ze.width, Ze.height), Le === 0 && (A.matrix.copy(Ge.matrix), A.matrix.decompose(A.position, A.quaternion, A.scale)), de === !0 && A.cameras.push(Ge);
        }
        const be = i.enabledFeatures;
        if (be && be.includes("depth-sensing") && i.depthUsage == "gpu-optimized" && M) {
          u = n.getBinding();
          const Le = u.getDepthInformation(ve[0]);
          Le && Le.isValid && Le.texture && S.init(Le, i.renderState);
        }
        if (be && be.includes("camera-access") && M) {
          e.state.unbindTexture(), u = n.getBinding();
          for (let Le = 0; Le < ve.length; Le++) {
            const Re = ve[Le].camera;
            if (Re) {
              let Ze = p[Re];
              Ze || (Ze = new Fa(), p[Re] = Ze);
              const Ge = u.getCameraImage(Re);
              Ze.sourceTexture = Ge;
            }
          }
        }
      }
      for (let ve = 0; ve < T.length; ve++) {
        const de = P[ve], be = T[ve];
        de !== null && be !== void 0 && be.update(de, ae, l || s);
      }
      xe && xe(q, ae), ae.detectedPlanes && n.dispatchEvent({
        type: "planesdetected",
        data: ae
      }), _ = null;
    }
    const Ve = new Ya();
    Ve.setAnimationLoop(Ke), this.setAnimationLoop = function(q) {
      xe = q;
    }, this.dispose = function() {
    };
  }
}, ku = /* @__PURE__ */ new ft(), Qa = /* @__PURE__ */ new Ie();
Qa.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function Wu(e, t) {
  function n(p, f) {
    p.matrixAutoUpdate === !0 && p.updateMatrix(), f.value.copy(p.matrix);
  }
  function i(p, f) {
    f.color.getRGB(p.fogColor.value, Ga(e)), f.isFog ? (p.fogNear.value = f.near, p.fogFar.value = f.far) : f.isFogExp2 && (p.fogDensity.value = f.density);
  }
  function r(p, f, y, b, T) {
    f.isNodeMaterial ? f.uniformsNeedUpdate = !1 : f.isMeshBasicMaterial ? s(p, f) : f.isMeshLambertMaterial ? (s(p, f), f.envMap && (p.envMapIntensity.value = f.envMapIntensity)) : f.isMeshToonMaterial ? (s(p, f), d(p, f)) : f.isMeshPhongMaterial ? (s(p, f), u(p, f), f.envMap && (p.envMapIntensity.value = f.envMapIntensity)) : f.isMeshStandardMaterial ? (s(p, f), h(p, f), f.isMeshPhysicalMaterial && _(p, f, T)) : f.isMeshMatcapMaterial ? (s(p, f), M(p, f)) : f.isMeshDepthMaterial ? s(p, f) : f.isMeshDistanceMaterial ? (s(p, f), S(p, f)) : f.isMeshNormalMaterial ? s(p, f) : f.isLineBasicMaterial ? (a(p, f), f.isLineDashedMaterial && o(p, f)) : f.isPointsMaterial ? l(p, f, y, b) : f.isSpriteMaterial ? c(p, f) : f.isShadowMaterial ? (p.color.value.copy(f.color), p.opacity.value = f.opacity) : f.isShaderMaterial && (f.uniformsNeedUpdate = !1);
  }
  function s(p, f) {
    p.opacity.value = f.opacity, f.color && p.diffuse.value.copy(f.color), f.emissive && p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity), f.map && (p.map.value = f.map, n(f.map, p.mapTransform)), f.alphaMap && (p.alphaMap.value = f.alphaMap, n(f.alphaMap, p.alphaMapTransform)), f.bumpMap && (p.bumpMap.value = f.bumpMap, n(f.bumpMap, p.bumpMapTransform), p.bumpScale.value = f.bumpScale, f.side === 1 && (p.bumpScale.value *= -1)), f.normalMap && (p.normalMap.value = f.normalMap, n(f.normalMap, p.normalMapTransform), p.normalScale.value.copy(f.normalScale), f.side === 1 && p.normalScale.value.negate()), f.displacementMap && (p.displacementMap.value = f.displacementMap, n(f.displacementMap, p.displacementMapTransform), p.displacementScale.value = f.displacementScale, p.displacementBias.value = f.displacementBias), f.emissiveMap && (p.emissiveMap.value = f.emissiveMap, n(f.emissiveMap, p.emissiveMapTransform)), f.specularMap && (p.specularMap.value = f.specularMap, n(f.specularMap, p.specularMapTransform)), f.alphaTest > 0 && (p.alphaTest.value = f.alphaTest);
    const y = t.get(f), b = y.envMap, T = y.envMapRotation;
    b && (p.envMap.value = b, p.envMapRotation.value.setFromMatrix4(ku.makeRotationFromEuler(T)).transpose(), b.isCubeTexture && b.isRenderTargetTexture === !1 && p.envMapRotation.value.premultiply(Qa), p.reflectivity.value = f.reflectivity, p.ior.value = f.ior, p.refractionRatio.value = f.refractionRatio), f.lightMap && (p.lightMap.value = f.lightMap, p.lightMapIntensity.value = f.lightMapIntensity, n(f.lightMap, p.lightMapTransform)), f.aoMap && (p.aoMap.value = f.aoMap, p.aoMapIntensity.value = f.aoMapIntensity, n(f.aoMap, p.aoMapTransform));
  }
  function a(p, f) {
    p.diffuse.value.copy(f.color), p.opacity.value = f.opacity, f.map && (p.map.value = f.map, n(f.map, p.mapTransform));
  }
  function o(p, f) {
    p.dashSize.value = f.dashSize, p.totalSize.value = f.dashSize + f.gapSize, p.scale.value = f.scale;
  }
  function l(p, f, y, b) {
    p.diffuse.value.copy(f.color), p.opacity.value = f.opacity, p.size.value = f.size * y, p.scale.value = b * 0.5, f.map && (p.map.value = f.map, n(f.map, p.uvTransform)), f.alphaMap && (p.alphaMap.value = f.alphaMap, n(f.alphaMap, p.alphaMapTransform)), f.alphaTest > 0 && (p.alphaTest.value = f.alphaTest);
  }
  function c(p, f) {
    p.diffuse.value.copy(f.color), p.opacity.value = f.opacity, p.rotation.value = f.rotation, f.map && (p.map.value = f.map, n(f.map, p.mapTransform)), f.alphaMap && (p.alphaMap.value = f.alphaMap, n(f.alphaMap, p.alphaMapTransform)), f.alphaTest > 0 && (p.alphaTest.value = f.alphaTest);
  }
  function u(p, f) {
    p.specular.value.copy(f.specular), p.shininess.value = Math.max(f.shininess, 1e-4);
  }
  function d(p, f) {
    f.gradientMap && (p.gradientMap.value = f.gradientMap);
  }
  function h(p, f) {
    p.metalness.value = f.metalness, f.metalnessMap && (p.metalnessMap.value = f.metalnessMap, n(f.metalnessMap, p.metalnessMapTransform)), p.roughness.value = f.roughness, f.roughnessMap && (p.roughnessMap.value = f.roughnessMap, n(f.roughnessMap, p.roughnessMapTransform)), f.envMap && (p.envMapIntensity.value = f.envMapIntensity);
  }
  function _(p, f, y) {
    p.ior.value = f.ior, f.sheen > 0 && (p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen), p.sheenRoughness.value = f.sheenRoughness, f.sheenColorMap && (p.sheenColorMap.value = f.sheenColorMap, n(f.sheenColorMap, p.sheenColorMapTransform)), f.sheenRoughnessMap && (p.sheenRoughnessMap.value = f.sheenRoughnessMap, n(f.sheenRoughnessMap, p.sheenRoughnessMapTransform))), f.clearcoat > 0 && (p.clearcoat.value = f.clearcoat, p.clearcoatRoughness.value = f.clearcoatRoughness, f.clearcoatMap && (p.clearcoatMap.value = f.clearcoatMap, n(f.clearcoatMap, p.clearcoatMapTransform)), f.clearcoatRoughnessMap && (p.clearcoatRoughnessMap.value = f.clearcoatRoughnessMap, n(f.clearcoatRoughnessMap, p.clearcoatRoughnessMapTransform)), f.clearcoatNormalMap && (p.clearcoatNormalMap.value = f.clearcoatNormalMap, n(f.clearcoatNormalMap, p.clearcoatNormalMapTransform), p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale), f.side === 1 && p.clearcoatNormalScale.value.negate())), f.dispersion > 0 && (p.dispersion.value = f.dispersion), f.iridescence > 0 && (p.iridescence.value = f.iridescence, p.iridescenceIOR.value = f.iridescenceIOR, p.iridescenceThicknessMinimum.value = f.iridescenceThicknessRange[0], p.iridescenceThicknessMaximum.value = f.iridescenceThicknessRange[1], f.iridescenceMap && (p.iridescenceMap.value = f.iridescenceMap, n(f.iridescenceMap, p.iridescenceMapTransform)), f.iridescenceThicknessMap && (p.iridescenceThicknessMap.value = f.iridescenceThicknessMap, n(f.iridescenceThicknessMap, p.iridescenceThicknessMapTransform))), f.transmission > 0 && (p.transmission.value = f.transmission, p.transmissionSamplerMap.value = y.texture, p.transmissionSamplerSize.value.set(y.width, y.height), f.transmissionMap && (p.transmissionMap.value = f.transmissionMap, n(f.transmissionMap, p.transmissionMapTransform)), p.thickness.value = f.thickness, f.thicknessMap && (p.thicknessMap.value = f.thicknessMap, n(f.thicknessMap, p.thicknessMapTransform)), p.attenuationDistance.value = f.attenuationDistance, p.attenuationColor.value.copy(f.attenuationColor)), f.anisotropy > 0 && (p.anisotropyVector.value.set(f.anisotropy * Math.cos(f.anisotropyRotation), f.anisotropy * Math.sin(f.anisotropyRotation)), f.anisotropyMap && (p.anisotropyMap.value = f.anisotropyMap, n(f.anisotropyMap, p.anisotropyMapTransform))), p.specularIntensity.value = f.specularIntensity, p.specularColor.value.copy(f.specularColor), f.specularColorMap && (p.specularColorMap.value = f.specularColorMap, n(f.specularColorMap, p.specularColorMapTransform)), f.specularIntensityMap && (p.specularIntensityMap.value = f.specularIntensityMap, n(f.specularIntensityMap, p.specularIntensityMapTransform));
  }
  function M(p, f) {
    f.matcap && (p.matcap.value = f.matcap);
  }
  function S(p, f) {
    const y = t.get(f).light;
    p.referencePosition.value.setFromMatrixPosition(y.matrixWorld), p.nearDistance.value = y.shadow.camera.near, p.farDistance.value = y.shadow.camera.far;
  }
  return {
    refreshFogUniforms: i,
    refreshMaterialUniforms: r
  };
}
function Xu(e, t, n, i) {
  let r = {}, s = {}, a = [];
  const o = e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);
  function l(y, b) {
    const T = b.program;
    i.uniformBlockBinding(y, T);
  }
  function c(y, b) {
    let T = r[y.id];
    T === void 0 && (M(y), T = u(y), r[y.id] = T, y.addEventListener("dispose", p));
    const P = b.program;
    i.updateUBOMapping(y, P);
    const R = t.render.frame;
    s[y.id] !== R && (h(y), s[y.id] = R);
  }
  function u(y) {
    const b = d();
    y.__bindingPointIndex = b;
    const T = e.createBuffer(), P = y.__size, R = y.usage;
    return e.bindBuffer(e.UNIFORM_BUFFER, T), e.bufferData(e.UNIFORM_BUFFER, P, R), e.bindBuffer(e.UNIFORM_BUFFER, null), e.bindBufferBase(e.UNIFORM_BUFFER, b, T), T;
  }
  function d() {
    for (let y = 0; y < o; y++) if (a.indexOf(y) === -1)
      return a.push(y), y;
    return Pe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function h(y) {
    const b = r[y.id], T = y.uniforms, P = y.__cache;
    e.bindBuffer(e.UNIFORM_BUFFER, b);
    for (let R = 0, D = T.length; R < D; R++) {
      const v = Array.isArray(T[R]) ? T[R] : [T[R]];
      for (let E = 0, X = v.length; E < X; E++) {
        const A = v[E];
        if (_(A, R, E, P) === !0) {
          const k = A.__offset, Y = Array.isArray(A.value) ? A.value : [A.value];
          let B = 0;
          for (let G = 0; G < Y.length; G++) {
            const H = Y[G], z = S(H);
            typeof H == "number" || typeof H == "boolean" ? (A.__data[0] = H, e.bufferSubData(e.UNIFORM_BUFFER, k + B, A.__data)) : H.isMatrix3 ? (A.__data[0] = H.elements[0], A.__data[1] = H.elements[1], A.__data[2] = H.elements[2], A.__data[3] = 0, A.__data[4] = H.elements[3], A.__data[5] = H.elements[4], A.__data[6] = H.elements[5], A.__data[7] = 0, A.__data[8] = H.elements[6], A.__data[9] = H.elements[7], A.__data[10] = H.elements[8], A.__data[11] = 0) : ArrayBuffer.isView(H) ? A.__data.set(new H.constructor(H.buffer, H.byteOffset, A.__data.length)) : (H.toArray(A.__data, B), B += z.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          e.bufferSubData(e.UNIFORM_BUFFER, k, A.__data);
        }
      }
    }
    e.bindBuffer(e.UNIFORM_BUFFER, null);
  }
  function _(y, b, T, P) {
    const R = y.value, D = b + "_" + T;
    if (P[D] === void 0)
      return typeof R == "number" || typeof R == "boolean" ? P[D] = R : ArrayBuffer.isView(R) ? P[D] = R.slice() : P[D] = R.clone(), !0;
    {
      const v = P[D];
      if (typeof R == "number" || typeof R == "boolean") {
        if (v !== R)
          return P[D] = R, !0;
      } else {
        if (ArrayBuffer.isView(R)) return !0;
        if (v.equals(R) === !1)
          return v.copy(R), !0;
      }
    }
    return !1;
  }
  function M(y) {
    const b = y.uniforms;
    let T = 0;
    const P = 16;
    for (let D = 0, v = b.length; D < v; D++) {
      const E = Array.isArray(b[D]) ? b[D] : [b[D]];
      for (let X = 0, A = E.length; X < A; X++) {
        const k = E[X], Y = Array.isArray(k.value) ? k.value : [k.value];
        for (let B = 0, G = Y.length; B < G; B++) {
          const H = Y[B], z = S(H), J = T % P, te = J % z.boundary, re = J + te;
          T += te, re !== 0 && P - re < z.storage && (T += P - re), k.__data = new Float32Array(z.storage / Float32Array.BYTES_PER_ELEMENT), k.__offset = T, T += z.storage;
        }
      }
    }
    const R = T % P;
    return R > 0 && (T += P - R), y.__size = T, y.__cache = {}, this;
  }
  function S(y) {
    const b = {
      boundary: 0,
      storage: 0
    };
    return typeof y == "number" || typeof y == "boolean" ? (b.boundary = 4, b.storage = 4) : y.isVector2 ? (b.boundary = 8, b.storage = 8) : y.isVector3 || y.isColor ? (b.boundary = 16, b.storage = 12) : y.isVector4 ? (b.boundary = 16, b.storage = 16) : y.isMatrix3 ? (b.boundary = 48, b.storage = 48) : y.isMatrix4 ? (b.boundary = 64, b.storage = 64) : y.isTexture ? Te("WebGLRenderer: Texture samplers can not be part of an uniforms group.") : ArrayBuffer.isView(y) ? (b.boundary = 16, b.storage = y.byteLength) : Te("WebGLRenderer: Unsupported uniform value type.", y), b;
  }
  function p(y) {
    const b = y.target;
    b.removeEventListener("dispose", p);
    const T = a.indexOf(b.__bindingPointIndex);
    a.splice(T, 1), e.deleteBuffer(r[b.id]), delete r[b.id], delete s[b.id];
  }
  function f() {
    for (const y in r) e.deleteBuffer(r[y]);
    a = [], r = {}, s = {};
  }
  return {
    bind: l,
    update: c,
    dispose: f
  };
}
var Yu = new Uint16Array([
  12469,
  15057,
  12620,
  14925,
  13266,
  14620,
  13807,
  14376,
  14323,
  13990,
  14545,
  13625,
  14713,
  13328,
  14840,
  12882,
  14931,
  12528,
  14996,
  12233,
  15039,
  11829,
  15066,
  11525,
  15080,
  11295,
  15085,
  10976,
  15082,
  10705,
  15073,
  10495,
  13880,
  14564,
  13898,
  14542,
  13977,
  14430,
  14158,
  14124,
  14393,
  13732,
  14556,
  13410,
  14702,
  12996,
  14814,
  12596,
  14891,
  12291,
  14937,
  11834,
  14957,
  11489,
  14958,
  11194,
  14943,
  10803,
  14921,
  10506,
  14893,
  10278,
  14858,
  9960,
  14484,
  14039,
  14487,
  14025,
  14499,
  13941,
  14524,
  13740,
  14574,
  13468,
  14654,
  13106,
  14743,
  12678,
  14818,
  12344,
  14867,
  11893,
  14889,
  11509,
  14893,
  11180,
  14881,
  10751,
  14852,
  10428,
  14812,
  10128,
  14765,
  9754,
  14712,
  9466,
  14764,
  13480,
  14764,
  13475,
  14766,
  13440,
  14766,
  13347,
  14769,
  13070,
  14786,
  12713,
  14816,
  12387,
  14844,
  11957,
  14860,
  11549,
  14868,
  11215,
  14855,
  10751,
  14825,
  10403,
  14782,
  10044,
  14729,
  9651,
  14666,
  9352,
  14599,
  9029,
  14967,
  12835,
  14966,
  12831,
  14963,
  12804,
  14954,
  12723,
  14936,
  12564,
  14917,
  12347,
  14900,
  11958,
  14886,
  11569,
  14878,
  11247,
  14859,
  10765,
  14828,
  10401,
  14784,
  10011,
  14727,
  9600,
  14660,
  9289,
  14586,
  8893,
  14508,
  8533,
  15111,
  12234,
  15110,
  12234,
  15104,
  12216,
  15092,
  12156,
  15067,
  12010,
  15028,
  11776,
  14981,
  11500,
  14942,
  11205,
  14902,
  10752,
  14861,
  10393,
  14812,
  9991,
  14752,
  9570,
  14682,
  9252,
  14603,
  8808,
  14519,
  8445,
  14431,
  8145,
  15209,
  11449,
  15208,
  11451,
  15202,
  11451,
  15190,
  11438,
  15163,
  11384,
  15117,
  11274,
  15055,
  10979,
  14994,
  10648,
  14932,
  10343,
  14871,
  9936,
  14803,
  9532,
  14729,
  9218,
  14645,
  8742,
  14556,
  8381,
  14461,
  8020,
  14365,
  7603,
  15273,
  10603,
  15272,
  10607,
  15267,
  10619,
  15256,
  10631,
  15231,
  10614,
  15182,
  10535,
  15118,
  10389,
  15042,
  10167,
  14963,
  9787,
  14883,
  9447,
  14800,
  9115,
  14710,
  8665,
  14615,
  8318,
  14514,
  7911,
  14411,
  7507,
  14279,
  7198,
  15314,
  9675,
  15313,
  9683,
  15309,
  9712,
  15298,
  9759,
  15277,
  9797,
  15229,
  9773,
  15166,
  9668,
  15084,
  9487,
  14995,
  9274,
  14898,
  8910,
  14800,
  8539,
  14697,
  8234,
  14590,
  7790,
  14479,
  7409,
  14367,
  7067,
  14178,
  6621,
  15337,
  8619,
  15337,
  8631,
  15333,
  8677,
  15325,
  8769,
  15305,
  8871,
  15264,
  8940,
  15202,
  8909,
  15119,
  8775,
  15022,
  8565,
  14916,
  8328,
  14804,
  8009,
  14688,
  7614,
  14569,
  7287,
  14448,
  6888,
  14321,
  6483,
  14088,
  6171,
  15350,
  7402,
  15350,
  7419,
  15347,
  7480,
  15340,
  7613,
  15322,
  7804,
  15287,
  7973,
  15229,
  8057,
  15148,
  8012,
  15046,
  7846,
  14933,
  7611,
  14810,
  7357,
  14682,
  7069,
  14552,
  6656,
  14421,
  6316,
  14251,
  5948,
  14007,
  5528,
  15356,
  5942,
  15356,
  5977,
  15353,
  6119,
  15348,
  6294,
  15332,
  6551,
  15302,
  6824,
  15249,
  7044,
  15171,
  7122,
  15070,
  7050,
  14949,
  6861,
  14818,
  6611,
  14679,
  6349,
  14538,
  6067,
  14398,
  5651,
  14189,
  5311,
  13935,
  4958,
  15359,
  4123,
  15359,
  4153,
  15356,
  4296,
  15353,
  4646,
  15338,
  5160,
  15311,
  5508,
  15263,
  5829,
  15188,
  6042,
  15088,
  6094,
  14966,
  6001,
  14826,
  5796,
  14678,
  5543,
  14527,
  5287,
  14377,
  4985,
  14133,
  4586,
  13869,
  4257,
  15360,
  1563,
  15360,
  1642,
  15358,
  2076,
  15354,
  2636,
  15341,
  3350,
  15317,
  4019,
  15273,
  4429,
  15203,
  4732,
  15105,
  4911,
  14981,
  4932,
  14836,
  4818,
  14679,
  4621,
  14517,
  4386,
  14359,
  4156,
  14083,
  3795,
  13808,
  3437,
  15360,
  122,
  15360,
  137,
  15358,
  285,
  15355,
  636,
  15344,
  1274,
  15322,
  2177,
  15281,
  2765,
  15215,
  3223,
  15120,
  3451,
  14995,
  3569,
  14846,
  3567,
  14681,
  3466,
  14511,
  3305,
  14344,
  3121,
  14037,
  2800,
  13753,
  2467,
  15360,
  0,
  15360,
  1,
  15359,
  21,
  15355,
  89,
  15346,
  253,
  15325,
  479,
  15287,
  796,
  15225,
  1148,
  15133,
  1492,
  15008,
  1749,
  14856,
  1882,
  14685,
  1886,
  14506,
  1783,
  14324,
  1608,
  13996,
  1398,
  13702,
  1183
]), Yt = null;
function qu() {
  return Yt === null && (Yt = new Yl(Yu, 16, 16, er, wn), Yt.name = "DFG_LUT", Yt.minFilter = Pt, Yt.magFilter = Pt, Yt.wrapS = sn, Yt.wrapT = sn, Yt.generateMipmaps = !1, Yt.needsUpdate = !0), Yt;
}
var ju = class {
  constructor(e = {}) {
    const { canvas: t = ol(), context: n = null, depth: i = !0, stencil: r = !1, alpha: s = !1, antialias: a = !1, premultipliedAlpha: o = !0, preserveDrawingBuffer: l = !1, powerPreference: c = "default", failIfMajorPerformanceCaveat: u = !1, reversedDepthBuffer: d = !1, outputBufferType: h = vn } = e;
    this.isWebGLRenderer = !0;
    let _;
    if (n !== null) {
      if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext) throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      _ = n.getContextAttributes().alpha;
    } else _ = s;
    const M = h, S = /* @__PURE__ */ new Set([
      xa,
      Sa,
      Ma
    ]), p = /* @__PURE__ */ new Set([
      vn,
      Rn,
      pa,
      ga,
      ma,
      _a
    ]), f = new Uint32Array(4), y = new Int32Array(4), b = new O();
    let T = null, P = null;
    const R = [], D = [];
    let v = null;
    this.domElement = t, this.debug = {
      checkShaderErrors: !0,
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = 0, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
    const E = this;
    let X = !1, A = null;
    this._outputColorSpace = Ht;
    let k = 0, Y = 0, B = null, G = -1, H = null;
    const z = new ht(), J = new ht();
    let te = null;
    const re = new Xe(0);
    let ge = 0, xe = t.width, Ke = t.height, Ve = 1, q = null, ae = null;
    const ve = new ht(0, 0, xe, Ke), de = new ht(0, 0, xe, Ke);
    let be = !1;
    const Le = new Qr();
    let Re = !1, Ze = !1;
    const Ge = new ft(), ut = new O(), at = new ht(), Rt = {
      background: null,
      fog: null,
      environment: null,
      overrideMaterial: null,
      isScene: !0
    };
    let gt = !1;
    function lt() {
      return B === null ? Ve : 1;
    }
    let C = n;
    function xt(g, I) {
      return t.getContext(g, I);
    }
    try {
      const g = {
        alpha: !0,
        depth: i,
        stencil: r,
        antialias: a,
        premultipliedAlpha: o,
        preserveDrawingBuffer: l,
        powerPreference: c,
        failIfMajorPerformanceCaveat: u
      };
      if ("setAttribute" in t && t.setAttribute("data-engine", "three.js r184"), t.addEventListener("webglcontextlost", Me, !1), t.addEventListener("webglcontextrestored", $, !1), t.addEventListener("webglcontextcreationerror", Se, !1), C === null) {
        const I = "webgl2";
        if (C = xt(I, g), C === null) throw xt(I) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
    } catch (g) {
      throw Pe("WebGLRenderer: " + g.message), g;
    }
    let He, Ye, he, nt, Ee, x, m, U, j, Z, ee, oe, L, ie, le, fe, K, Ae, De, ke, Oe, w, W;
    function Q() {
      He = new qc(C), He.init(), Oe = new Bu(C, He), Ye = new zc(C, He, e, Oe), he = new Ou(C, He), Ye.reversedDepthBuffer && d && he.buffers.depth.setReversed(!0), nt = new Zc(C), Ee = new Eu(), x = new Fu(C, He, he, Ee, Ye, Oe, nt), m = new Yc(E), U = new Uc(C), w = new Fc(C, U), j = new jc(C, U, nt, w), Z = new Jc(C, j, U, w, nt), Ae = new $c(C, Ye, x), le = new Vc(Ee), ee = new xu(E, m, He, Ye, w, le), oe = new Wu(E, Ee), L = new Tu(), ie = new Pu(He), K = new Oc(E, m, he, Z, _, o), fe = new Nu(E, Z, Ye), W = new Xu(C, nt, Ye, he), De = new Bc(C, He, nt), ke = new Kc(C, He, nt), nt.programs = ee.programs, E.capabilities = Ye, E.extensions = He, E.properties = Ee, E.renderLists = L, E.shadowMap = fe, E.state = he, E.info = nt;
    }
    Q(), M !== 1009 && (v = new eh(M, t.width, t.height, i, r));
    const se = new Hu(E, C);
    this.xr = se, this.getContext = function() {
      return C;
    }, this.getContextAttributes = function() {
      return C.getContextAttributes();
    }, this.forceContextLoss = function() {
      const g = He.get("WEBGL_lose_context");
      g && g.loseContext();
    }, this.forceContextRestore = function() {
      const g = He.get("WEBGL_lose_context");
      g && g.restoreContext();
    }, this.getPixelRatio = function() {
      return Ve;
    }, this.setPixelRatio = function(g) {
      g !== void 0 && (Ve = g, this.setSize(xe, Ke, !1));
    }, this.getSize = function(g) {
      return g.set(xe, Ke);
    }, this.setSize = function(g, I, V = !0) {
      if (se.isPresenting) {
        Te("WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      xe = g, Ke = I, t.width = Math.floor(g * Ve), t.height = Math.floor(I * Ve), V === !0 && (t.style.width = g + "px", t.style.height = I + "px"), v !== null && v.setSize(t.width, t.height), this.setViewport(0, 0, g, I);
    }, this.getDrawingBufferSize = function(g) {
      return g.set(xe * Ve, Ke * Ve).floor();
    }, this.setDrawingBufferSize = function(g, I, V) {
      xe = g, Ke = I, Ve = V, t.width = Math.floor(g * V), t.height = Math.floor(I * V), this.setViewport(0, 0, g, I);
    }, this.setEffects = function(g) {
      if (M === 1009) {
        Pe("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");
        return;
      }
      if (g) {
        for (let I = 0; I < g.length; I++) if (g[I].isOutputPass === !0) {
          Te("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");
          break;
        }
      }
      v.setEffects(g || []);
    }, this.getCurrentViewport = function(g) {
      return g.copy(z);
    }, this.getViewport = function(g) {
      return g.copy(ve);
    }, this.setViewport = function(g, I, V, F) {
      g.isVector4 ? ve.set(g.x, g.y, g.z, g.w) : ve.set(g, I, V, F), he.viewport(z.copy(ve).multiplyScalar(Ve).round());
    }, this.getScissor = function(g) {
      return g.copy(de);
    }, this.setScissor = function(g, I, V, F) {
      g.isVector4 ? de.set(g.x, g.y, g.z, g.w) : de.set(g, I, V, F), he.scissor(J.copy(de).multiplyScalar(Ve).round());
    }, this.getScissorTest = function() {
      return be;
    }, this.setScissorTest = function(g) {
      he.setScissorTest(be = g);
    }, this.setOpaqueSort = function(g) {
      q = g;
    }, this.setTransparentSort = function(g) {
      ae = g;
    }, this.getClearColor = function(g) {
      return g.copy(K.getClearColor());
    }, this.setClearColor = function() {
      K.setClearColor(...arguments);
    }, this.getClearAlpha = function() {
      return K.getClearAlpha();
    }, this.setClearAlpha = function() {
      K.setClearAlpha(...arguments);
    }, this.clear = function(g = !0, I = !0, V = !0) {
      let F = 0;
      if (g) {
        let N = !1;
        if (B !== null) {
          const ne = B.texture.format;
          N = S.has(ne);
        }
        if (N) {
          const ne = B.texture.type, ue = p.has(ne), pe = K.getClearColor(), me = K.getClearAlpha(), Ce = pe.r, Fe = pe.g, ze = pe.b;
          ue ? (f[0] = Ce, f[1] = Fe, f[2] = ze, f[3] = me, C.clearBufferuiv(C.COLOR, 0, f)) : (y[0] = Ce, y[1] = Fe, y[2] = ze, y[3] = me, C.clearBufferiv(C.COLOR, 0, y));
        } else F |= C.COLOR_BUFFER_BIT;
      }
      I && (F |= C.DEPTH_BUFFER_BIT, this.state.buffers.depth.setMask(!0)), V && (F |= C.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), F !== 0 && C.clear(F);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.setNodesHandler = function(g) {
      g.setRenderer(this), A = g;
    }, this.dispose = function() {
      t.removeEventListener("webglcontextlost", Me, !1), t.removeEventListener("webglcontextrestored", $, !1), t.removeEventListener("webglcontextcreationerror", Se, !1), K.dispose(), L.dispose(), ie.dispose(), Ee.dispose(), m.dispose(), Z.dispose(), w.dispose(), W.dispose(), ee.dispose(), se.dispose(), se.removeEventListener("sessionstart", ss), se.removeEventListener("sessionend", as), xn.stop();
    };
    function Me(g) {
      g.preventDefault(), vs("WebGLRenderer: Context Lost."), X = !0;
    }
    function $() {
      vs("WebGLRenderer: Context Restored."), X = !1;
      const g = nt.autoReset, I = fe.enabled, V = fe.autoUpdate, F = fe.needsUpdate, N = fe.type;
      Q(), nt.autoReset = g, fe.enabled = I, fe.autoUpdate = V, fe.needsUpdate = F, fe.type = N;
    }
    function Se(g) {
      Pe("WebGLRenderer: A WebGL context could not be created. Reason: ", g.statusMessage);
    }
    function we(g) {
      const I = g.target;
      I.removeEventListener("dispose", we), bt(I);
    }
    function bt(g) {
      tt(g), Ee.remove(g);
    }
    function tt(g) {
      const I = Ee.get(g).programs;
      I !== void 0 && (I.forEach(function(V) {
        ee.releaseProgram(V);
      }), g.isShaderMaterial && ee.releaseShaderCache(g));
    }
    this.renderBufferDirect = function(g, I, V, F, N, ne) {
      I === null && (I = Rt);
      const ue = N.isMesh && N.matrixWorld.determinant() < 0, pe = io(g, I, V, F, N);
      he.setMaterial(F, ue);
      let me = V.index, Ce = 1;
      if (F.wireframe === !0) {
        if (me = j.getWireframeAttribute(V), me === void 0) return;
        Ce = 2;
      }
      const Fe = V.drawRange, ze = V.attributes.position;
      let ye = Fe.start * Ce, et = (Fe.start + Fe.count) * Ce;
      ne !== null && (ye = Math.max(ye, ne.start * Ce), et = Math.min(et, (ne.start + ne.count) * Ce)), me !== null ? (ye = Math.max(ye, 0), et = Math.min(et, me.count)) : ze != null && (ye = Math.max(ye, 0), et = Math.min(et, ze.count));
      const it = et - ye;
      if (it < 0 || it === 1 / 0) return;
      w.setup(N, F, pe, V, me);
      let rt, qe = De;
      if (me !== null && (rt = U.get(me), qe = ke, qe.setIndex(rt)), N.isMesh) F.wireframe === !0 ? (he.setLineWidth(F.wireframeLinewidth * lt()), qe.setMode(C.LINES)) : qe.setMode(C.TRIANGLES);
      else if (N.isLine) {
        let vt = F.linewidth;
        vt === void 0 && (vt = 1), he.setLineWidth(vt * lt()), N.isLineSegments ? qe.setMode(C.LINES) : N.isLineLoop ? qe.setMode(C.LINE_LOOP) : qe.setMode(C.LINE_STRIP);
      } else N.isPoints ? qe.setMode(C.POINTS) : N.isSprite && qe.setMode(C.TRIANGLES);
      if (N.isBatchedMesh) if (He.get("WEBGL_multi_draw"))
        qe.renderMultiDraw(N._multiDrawStarts, N._multiDrawCounts, N._multiDrawCount);
      else {
        const vt = N._multiDrawStarts, _e = N._multiDrawCounts, Bt = N._multiDrawCount, je = me ? U.get(me).bytesPerElement : 1, Dt = Ee.get(F).currentProgram.getUniforms();
        for (let Wt = 0; Wt < Bt; Wt++)
          Dt.setValue(C, "_gl_DrawID", Wt), qe.render(vt[Wt] / je, _e[Wt]);
      }
      else if (N.isInstancedMesh) qe.renderInstances(ye, it, N.count);
      else if (V.isInstancedBufferGeometry) {
        const vt = V._maxInstanceCount !== void 0 ? V._maxInstanceCount : 1 / 0, _e = Math.min(V.instanceCount, vt);
        qe.renderInstances(ye, it, _e);
      } else qe.render(ye, it);
    };
    function kt(g, I, V) {
      g.transparent === !0 && g.side === 2 && g.forceSinglePass === !1 ? (g.side = 1, g.needsUpdate = !0, bi(g, I, V), g.side = 0, g.needsUpdate = !0, bi(g, I, V), g.side = 2) : bi(g, I, V);
    }
    this.compile = function(g, I, V = null) {
      V === null && (V = g), P = ie.get(V), P.init(I), D.push(P), V.traverseVisible(function(N) {
        N.isLight && N.layers.test(I.layers) && (P.pushLight(N), N.castShadow && P.pushShadow(N));
      }), g !== V && g.traverseVisible(function(N) {
        N.isLight && N.layers.test(I.layers) && (P.pushLight(N), N.castShadow && P.pushShadow(N));
      }), P.setupLights();
      const F = /* @__PURE__ */ new Set();
      return g.traverse(function(N) {
        if (!(N.isMesh || N.isPoints || N.isLine || N.isSprite)) return;
        const ne = N.material;
        if (ne) if (Array.isArray(ne)) for (let ue = 0; ue < ne.length; ue++) {
          const pe = ne[ue];
          kt(pe, V, N), F.add(pe);
        }
        else
          kt(ne, V, N), F.add(ne);
      }), P = D.pop(), F;
    }, this.compileAsync = function(g, I, V = null) {
      const F = this.compile(g, I, V);
      return new Promise((N) => {
        function ne() {
          if (F.forEach(function(ue) {
            Ee.get(ue).currentProgram.isReady() && F.delete(ue);
          }), F.size === 0) {
            N(g);
            return;
          }
          setTimeout(ne, 10);
        }
        He.get("KHR_parallel_shader_compile") !== null ? ne() : setTimeout(ne, 10);
      });
    };
    let Ft = null;
    function to(g) {
      Ft && Ft(g);
    }
    function ss() {
      xn.stop();
    }
    function as() {
      xn.start();
    }
    const xn = new Ya();
    xn.setAnimationLoop(to), typeof self < "u" && xn.setContext(self), this.setAnimationLoop = function(g) {
      Ft = g, se.setAnimationLoop(g), g === null ? xn.stop() : xn.start();
    }, se.addEventListener("sessionstart", ss), se.addEventListener("sessionend", as), this.render = function(g, I) {
      if (I !== void 0 && I.isCamera !== !0) {
        Pe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (X === !0) return;
      A !== null && A.renderStart(g, I);
      const V = se.enabled === !0 && se.isPresenting === !0, F = v !== null && (B === null || V) && v.begin(E, B);
      if (g.matrixWorldAutoUpdate === !0 && g.updateMatrixWorld(), I.parent === null && I.matrixWorldAutoUpdate === !0 && I.updateMatrixWorld(), se.enabled === !0 && se.isPresenting === !0 && (v === null || v.isCompositing() === !1) && (se.cameraAutoUpdate === !0 && se.updateCamera(I), I = se.getCamera()), g.isScene === !0 && g.onBeforeRender(E, g, I, B), P = ie.get(g, D.length), P.init(I), P.state.textureUnits = x.getTextureUnits(), D.push(P), Ge.multiplyMatrices(I.projectionMatrix, I.matrixWorldInverse), Le.setFromProjectionMatrix(Ge, $n, I.reversedDepth), Ze = this.localClippingEnabled, Re = le.init(this.clippingPlanes, Ze), T = L.get(g, R.length), T.init(), R.push(T), se.enabled === !0 && se.isPresenting === !0) {
        const ne = E.xr.getDepthSensingMesh();
        ne !== null && or(ne, I, -1 / 0, E.sortObjects);
      }
      or(g, I, 0, E.sortObjects), T.finish(), E.sortObjects === !0 && T.sort(q, ae), gt = se.enabled === !1 || se.isPresenting === !1 || se.hasDepthSensing() === !1, gt && K.addToRenderList(T, g), this.info.render.frame++, Re === !0 && le.beginShadows();
      const N = P.state.shadowsArray;
      if (fe.render(N, g, I), Re === !0 && le.endShadows(), this.info.autoReset === !0 && this.info.reset(), (F && v.hasRenderPass()) === !1) {
        const ne = T.opaque, ue = T.transmissive;
        if (P.setupLights(), I.isArrayCamera) {
          const pe = I.cameras;
          if (ue.length > 0) for (let me = 0, Ce = pe.length; me < Ce; me++) {
            const Fe = pe[me];
            ls(ne, ue, g, Fe);
          }
          gt && K.render(g);
          for (let me = 0, Ce = pe.length; me < Ce; me++) {
            const Fe = pe[me];
            os(T, g, Fe, Fe.viewport);
          }
        } else
          ue.length > 0 && ls(ne, ue, g, I), gt && K.render(g), os(T, g, I);
      }
      B !== null && Y === 0 && (x.updateMultisampleRenderTarget(B), x.updateRenderTargetMipmap(B)), F && v.end(E), g.isScene === !0 && g.onAfterRender(E, g, I), w.resetDefaultState(), G = -1, H = null, D.pop(), D.length > 0 ? (P = D[D.length - 1], x.setTextureUnits(P.state.textureUnits), Re === !0 && le.setGlobalState(E.clippingPlanes, P.state.camera)) : P = null, R.pop(), R.length > 0 ? T = R[R.length - 1] : T = null, A !== null && A.renderEnd();
    };
    function or(g, I, V, F) {
      if (g.visible === !1) return;
      if (g.layers.test(I.layers)) {
        if (g.isGroup) V = g.renderOrder;
        else if (g.isLOD)
          g.autoUpdate === !0 && g.update(I);
        else if (g.isLightProbeGrid) P.pushLightProbeGrid(g);
        else if (g.isLight)
          P.pushLight(g), g.castShadow && P.pushShadow(g);
        else if (g.isSprite) {
          if (!g.frustumCulled || Le.intersectsSprite(g)) {
            F && at.setFromMatrixPosition(g.matrixWorld).applyMatrix4(Ge);
            const ne = Z.update(g), ue = g.material;
            ue.visible && T.push(g, ne, ue, V, at.z, null);
          }
        } else if ((g.isMesh || g.isLine || g.isPoints) && (!g.frustumCulled || Le.intersectsObject(g))) {
          const ne = Z.update(g), ue = g.material;
          if (F && (g.boundingSphere !== void 0 ? (g.boundingSphere === null && g.computeBoundingSphere(), at.copy(g.boundingSphere.center)) : (ne.boundingSphere === null && ne.computeBoundingSphere(), at.copy(ne.boundingSphere.center)), at.applyMatrix4(g.matrixWorld).applyMatrix4(Ge)), Array.isArray(ue)) {
            const pe = ne.groups;
            for (let me = 0, Ce = pe.length; me < Ce; me++) {
              const Fe = pe[me], ze = ue[Fe.materialIndex];
              ze && ze.visible && T.push(g, ne, ze, V, at.z, Fe);
            }
          } else ue.visible && T.push(g, ne, ue, V, at.z, null);
        }
      }
      const N = g.children;
      for (let ne = 0, ue = N.length; ne < ue; ne++) or(N[ne], I, V, F);
    }
    function os(g, I, V, F) {
      const { opaque: N, transmissive: ne, transparent: ue } = g;
      P.setupLightsView(V), Re === !0 && le.setGlobalState(E.clippingPlanes, V), F && he.viewport(z.copy(F)), N.length > 0 && Ti(N, I, V), ne.length > 0 && Ti(ne, I, V), ue.length > 0 && Ti(ue, I, V), he.buffers.depth.setTest(!0), he.buffers.depth.setMask(!0), he.buffers.color.setMask(!0), he.setPolygonOffset(!1);
    }
    function ls(g, I, V, F) {
      if ((V.isScene === !0 ? V.overrideMaterial : null) !== null) return;
      if (P.state.transmissionRenderTarget[F.id] === void 0) {
        const ze = He.has("EXT_color_buffer_half_float") || He.has("EXT_color_buffer_float");
        P.state.transmissionRenderTarget[F.id] = new jt(1, 1, {
          generateMipmaps: !0,
          type: ze ? wn : vn,
          minFilter: Kr,
          samples: Math.max(4, Ye.samples),
          stencilBuffer: r,
          resolveDepthBuffer: !1,
          resolveStencilBuffer: !1,
          colorSpace: We.workingColorSpace
        });
      }
      const N = P.state.transmissionRenderTarget[F.id], ne = F.viewport || z;
      N.setSize(ne.z * E.transmissionResolutionScale, ne.w * E.transmissionResolutionScale);
      const ue = E.getRenderTarget(), pe = E.getActiveCubeFace(), me = E.getActiveMipmapLevel();
      E.setRenderTarget(N), E.getClearColor(re), ge = E.getClearAlpha(), ge < 1 && E.setClearColor(16777215, 0.5), E.clear(), gt && K.render(V);
      const Ce = E.toneMapping;
      E.toneMapping = 0;
      const Fe = F.viewport;
      if (F.viewport !== void 0 && (F.viewport = void 0), P.setupLightsView(F), Re === !0 && le.setGlobalState(E.clippingPlanes, F), Ti(g, V, F), x.updateMultisampleRenderTarget(N), x.updateRenderTargetMipmap(N), He.has("WEBGL_multisampled_render_to_texture") === !1) {
        let ze = !1;
        for (let ye = 0, et = I.length; ye < et; ye++) {
          const { object: it, geometry: rt, material: qe, group: vt } = I[ye];
          if (qe.side === 2 && it.layers.test(F.layers)) {
            const _e = qe.side;
            qe.side = 1, qe.needsUpdate = !0, cs(it, V, F, rt, qe, vt), qe.side = _e, qe.needsUpdate = !0, ze = !0;
          }
        }
        ze === !0 && (x.updateMultisampleRenderTarget(N), x.updateRenderTargetMipmap(N));
      }
      E.setRenderTarget(ue, pe, me), E.setClearColor(re, ge), Fe !== void 0 && (F.viewport = Fe), E.toneMapping = Ce;
    }
    function Ti(g, I, V) {
      const F = I.isScene === !0 ? I.overrideMaterial : null;
      for (let N = 0, ne = g.length; N < ne; N++) {
        const ue = g[N], { object: pe, geometry: me, group: Ce } = ue;
        let Fe = ue.material;
        Fe.allowOverride === !0 && F !== null && (Fe = F), pe.layers.test(V.layers) && cs(pe, I, V, me, Fe, Ce);
      }
    }
    function cs(g, I, V, F, N, ne) {
      g.onBeforeRender(E, I, V, F, N, ne), g.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse, g.matrixWorld), g.normalMatrix.getNormalMatrix(g.modelViewMatrix), N.onBeforeRender(E, I, V, F, g, ne), N.transparent === !0 && N.side === 2 && N.forceSinglePass === !1 ? (N.side = 1, N.needsUpdate = !0, E.renderBufferDirect(V, I, F, N, g, ne), N.side = 0, N.needsUpdate = !0, E.renderBufferDirect(V, I, F, N, g, ne), N.side = 2) : E.renderBufferDirect(V, I, F, N, g, ne), g.onAfterRender(E, I, V, F, N, ne);
    }
    function bi(g, I, V) {
      I.isScene !== !0 && (I = Rt);
      const F = Ee.get(g), N = P.state.lights, ne = P.state.shadowsArray, ue = N.state.version, pe = ee.getParameters(g, N.state, ne, I, V, P.state.lightProbeGridArray), me = ee.getProgramCacheKey(pe);
      let Ce = F.programs;
      F.environment = g.isMeshStandardMaterial || g.isMeshLambertMaterial || g.isMeshPhongMaterial ? I.environment : null, F.fog = I.fog;
      const Fe = g.isMeshStandardMaterial || g.isMeshLambertMaterial && !g.envMap || g.isMeshPhongMaterial && !g.envMap;
      F.envMap = m.get(g.envMap || F.environment, Fe), F.envMapRotation = F.environment !== null && g.envMap === null ? I.environmentRotation : g.envMapRotation, Ce === void 0 && (g.addEventListener("dispose", we), Ce = /* @__PURE__ */ new Map(), F.programs = Ce);
      let ze = Ce.get(me);
      if (ze !== void 0) {
        if (F.currentProgram === ze && F.lightsStateVersion === ue)
          return us(g, pe), ze;
      } else
        pe.uniforms = ee.getUniforms(g), A !== null && g.isNodeMaterial && A.build(g, V, pe), g.onBeforeCompile(pe, E), ze = ee.acquireProgram(pe, me), Ce.set(me, ze), F.uniforms = pe.uniforms;
      const ye = F.uniforms;
      return (!g.isShaderMaterial && !g.isRawShaderMaterial || g.clipping === !0) && (ye.clippingPlanes = le.uniform), us(g, pe), F.needsLights = so(g), F.lightsStateVersion = ue, F.needsLights && (ye.ambientLightColor.value = N.state.ambient, ye.lightProbe.value = N.state.probe, ye.directionalLights.value = N.state.directional, ye.directionalLightShadows.value = N.state.directionalShadow, ye.spotLights.value = N.state.spot, ye.spotLightShadows.value = N.state.spotShadow, ye.rectAreaLights.value = N.state.rectArea, ye.ltc_1.value = N.state.rectAreaLTC1, ye.ltc_2.value = N.state.rectAreaLTC2, ye.pointLights.value = N.state.point, ye.pointLightShadows.value = N.state.pointShadow, ye.hemisphereLights.value = N.state.hemi, ye.directionalShadowMatrix.value = N.state.directionalShadowMatrix, ye.spotLightMatrix.value = N.state.spotLightMatrix, ye.spotLightMap.value = N.state.spotLightMap, ye.pointShadowMatrix.value = N.state.pointShadowMatrix), F.lightProbeGrid = P.state.lightProbeGridArray.length > 0, F.currentProgram = ze, F.uniformsList = null, ze;
    }
    function hs(g) {
      if (g.uniformsList === null) {
        const I = g.currentProgram.getUniforms();
        g.uniformsList = Ji.seqWithValue(I.seq, g.uniforms);
      }
      return g.uniformsList;
    }
    function us(g, I) {
      const V = Ee.get(g);
      V.outputColorSpace = I.outputColorSpace, V.batching = I.batching, V.batchingColor = I.batchingColor, V.instancing = I.instancing, V.instancingColor = I.instancingColor, V.instancingMorph = I.instancingMorph, V.skinning = I.skinning, V.morphTargets = I.morphTargets, V.morphNormals = I.morphNormals, V.morphColors = I.morphColors, V.morphTargetsCount = I.morphTargetsCount, V.numClippingPlanes = I.numClippingPlanes, V.numIntersection = I.numClipIntersection, V.vertexAlphas = I.vertexAlphas, V.vertexTangents = I.vertexTangents, V.toneMapping = I.toneMapping;
    }
    function no(g, I) {
      if (g.length === 0) return null;
      if (g.length === 1) return g[0].texture !== null ? g[0] : null;
      b.setFromMatrixPosition(I.matrixWorld);
      for (let V = 0, F = g.length; V < F; V++) {
        const N = g[V];
        if (N.texture !== null && N.boundingBox.containsPoint(b)) return N;
      }
      return null;
    }
    function io(g, I, V, F, N) {
      I.isScene !== !0 && (I = Rt), x.resetTextureUnits();
      const ne = I.fog, ue = F.isMeshStandardMaterial || F.isMeshLambertMaterial || F.isMeshPhongMaterial ? I.environment : null, pe = B === null ? E.outputColorSpace : B.isXRRenderTarget === !0 ? B.texture.colorSpace : We.workingColorSpace, me = F.isMeshStandardMaterial || F.isMeshLambertMaterial && !F.envMap || F.isMeshPhongMaterial && !F.envMap, Ce = m.get(F.envMap || ue, me), Fe = F.vertexColors === !0 && !!V.attributes.color && V.attributes.color.itemSize === 4, ze = !!V.attributes.tangent && (!!F.normalMap || F.anisotropy > 0), ye = !!V.morphAttributes.position, et = !!V.morphAttributes.normal, it = !!V.morphAttributes.color;
      let rt = 0;
      F.toneMapped && (B === null || B.isXRRenderTarget === !0) && (rt = E.toneMapping);
      const qe = V.morphAttributes.position || V.morphAttributes.normal || V.morphAttributes.color, vt = qe !== void 0 ? qe.length : 0, _e = Ee.get(F), Bt = P.state.lights;
      if (Re === !0 && (Ze === !0 || g !== H)) {
        const $e = g === H && F.id === G;
        le.setState(F, g, $e);
      }
      let je = !1;
      F.version === _e.__version ? (_e.needsLights && _e.lightsStateVersion !== Bt.state.version || _e.outputColorSpace !== pe || N.isBatchedMesh && _e.batching === !1 || !N.isBatchedMesh && _e.batching === !0 || N.isBatchedMesh && _e.batchingColor === !0 && N.colorTexture === null || N.isBatchedMesh && _e.batchingColor === !1 && N.colorTexture !== null || N.isInstancedMesh && _e.instancing === !1 || !N.isInstancedMesh && _e.instancing === !0 || N.isSkinnedMesh && _e.skinning === !1 || !N.isSkinnedMesh && _e.skinning === !0 || N.isInstancedMesh && _e.instancingColor === !0 && N.instanceColor === null || N.isInstancedMesh && _e.instancingColor === !1 && N.instanceColor !== null || N.isInstancedMesh && _e.instancingMorph === !0 && N.morphTexture === null || N.isInstancedMesh && _e.instancingMorph === !1 && N.morphTexture !== null || _e.envMap !== Ce || F.fog === !0 && _e.fog !== ne || _e.numClippingPlanes !== void 0 && (_e.numClippingPlanes !== le.numPlanes || _e.numIntersection !== le.numIntersection) || _e.vertexAlphas !== Fe || _e.vertexTangents !== ze || _e.morphTargets !== ye || _e.morphNormals !== et || _e.morphColors !== it || _e.toneMapping !== rt || _e.morphTargetsCount !== vt || !!_e.lightProbeGrid != P.state.lightProbeGridArray.length > 0) && (je = !0) : (je = !0, _e.__version = F.version);
      let Dt = _e.currentProgram;
      je === !0 && (Dt = bi(F, I, N), A && F.isNodeMaterial && A.onUpdateProgram(F, Dt, _e));
      let Wt = !1, ln = !1, Cn = !1;
      const Qe = Dt.getUniforms(), ot = _e.uniforms;
      if (he.useProgram(Dt.program) && (Wt = !0, ln = !0, Cn = !0), F.id !== G && (G = F.id, ln = !0), _e.needsLights) {
        const $e = no(P.state.lightProbeGridArray, N);
        _e.lightProbeGrid !== $e && (_e.lightProbeGrid = $e, ln = !0);
      }
      if (Wt || H !== g) {
        he.buffers.depth.getReversed() && g.reversedDepth !== !0 && (g._reversedDepth = !0, g.updateProjectionMatrix()), Qe.setValue(C, "projectionMatrix", g.projectionMatrix), Qe.setValue(C, "viewMatrix", g.matrixWorldInverse);
        const $e = Qe.map.cameraPosition;
        $e !== void 0 && $e.setValue(C, ut.setFromMatrixPosition(g.matrixWorld)), Ye.logarithmicDepthBuffer && Qe.setValue(C, "logDepthBufFC", 2 / (Math.log(g.far + 1) / Math.LN2)), (F.isMeshPhongMaterial || F.isMeshToonMaterial || F.isMeshLambertMaterial || F.isMeshBasicMaterial || F.isMeshStandardMaterial || F.isShaderMaterial) && Qe.setValue(C, "isOrthographic", g.isOrthographicCamera === !0), H !== g && (H = g, ln = !0, Cn = !0);
      }
      if (_e.needsLights && (Bt.state.directionalShadowMap.length > 0 && Qe.setValue(C, "directionalShadowMap", Bt.state.directionalShadowMap, x), Bt.state.spotShadowMap.length > 0 && Qe.setValue(C, "spotShadowMap", Bt.state.spotShadowMap, x), Bt.state.pointShadowMap.length > 0 && Qe.setValue(C, "pointShadowMap", Bt.state.pointShadowMap, x)), N.isSkinnedMesh) {
        Qe.setOptional(C, N, "bindMatrix"), Qe.setOptional(C, N, "bindMatrixInverse");
        const $e = N.skeleton;
        $e && ($e.boneTexture === null && $e.computeBoneTexture(), Qe.setValue(C, "boneTexture", $e.boneTexture, x));
      }
      N.isBatchedMesh && (Qe.setOptional(C, N, "batchingTexture"), Qe.setValue(C, "batchingTexture", N._matricesTexture, x), Qe.setOptional(C, N, "batchingIdTexture"), Qe.setValue(C, "batchingIdTexture", N._indirectTexture, x), Qe.setOptional(C, N, "batchingColorTexture"), N._colorsTexture !== null && Qe.setValue(C, "batchingColorTexture", N._colorsTexture, x));
      const cn = V.morphAttributes;
      if ((cn.position !== void 0 || cn.normal !== void 0 || cn.color !== void 0) && Ae.update(N, V, Dt), (ln || _e.receiveShadow !== N.receiveShadow) && (_e.receiveShadow = N.receiveShadow, Qe.setValue(C, "receiveShadow", N.receiveShadow)), (F.isMeshStandardMaterial || F.isMeshLambertMaterial || F.isMeshPhongMaterial) && F.envMap === null && I.environment !== null && (ot.envMapIntensity.value = I.environmentIntensity), ot.dfgLUT !== void 0 && (ot.dfgLUT.value = qu()), ln) {
        if (Qe.setValue(C, "toneMappingExposure", E.toneMappingExposure), _e.needsLights && ro(ot, Cn), ne && F.fog === !0 && oe.refreshFogUniforms(ot, ne), oe.refreshMaterialUniforms(ot, F, Ve, Ke, P.state.transmissionRenderTarget[g.id]), _e.needsLights && _e.lightProbeGrid) {
          const $e = _e.lightProbeGrid;
          ot.probesSH.value = $e.texture, ot.probesMin.value.copy($e.boundingBox.min), ot.probesMax.value.copy($e.boundingBox.max), ot.probesResolution.value.copy($e.resolution);
        }
        Ji.upload(C, hs(_e), ot, x);
      }
      if (F.isShaderMaterial && F.uniformsNeedUpdate === !0 && (Ji.upload(C, hs(_e), ot, x), F.uniformsNeedUpdate = !1), F.isSpriteMaterial && Qe.setValue(C, "center", N.center), Qe.setValue(C, "modelViewMatrix", N.modelViewMatrix), Qe.setValue(C, "normalMatrix", N.normalMatrix), Qe.setValue(C, "modelMatrix", N.matrixWorld), F.uniformsGroups !== void 0) {
        const $e = F.uniformsGroups;
        for (let ri = 0, Pn = $e.length; ri < Pn; ri++) {
          const ds = $e[ri];
          W.update(ds, Dt), W.bind(ds, Dt);
        }
      }
      return Dt;
    }
    function ro(g, I) {
      g.ambientLightColor.needsUpdate = I, g.lightProbe.needsUpdate = I, g.directionalLights.needsUpdate = I, g.directionalLightShadows.needsUpdate = I, g.pointLights.needsUpdate = I, g.pointLightShadows.needsUpdate = I, g.spotLights.needsUpdate = I, g.spotLightShadows.needsUpdate = I, g.rectAreaLights.needsUpdate = I, g.hemisphereLights.needsUpdate = I;
    }
    function so(g) {
      return g.isMeshLambertMaterial || g.isMeshToonMaterial || g.isMeshPhongMaterial || g.isMeshStandardMaterial || g.isShadowMaterial || g.isShaderMaterial && g.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return k;
    }, this.getActiveMipmapLevel = function() {
      return Y;
    }, this.getRenderTarget = function() {
      return B;
    }, this.setRenderTargetTextures = function(g, I, V) {
      const F = Ee.get(g);
      F.__autoAllocateDepthBuffer = g.resolveDepthBuffer === !1, F.__autoAllocateDepthBuffer === !1 && (F.__useRenderToTexture = !1), Ee.get(g.texture).__webglTexture = I, Ee.get(g.depthTexture).__webglTexture = F.__autoAllocateDepthBuffer ? void 0 : V, F.__hasExternalTextures = !0;
    }, this.setRenderTargetFramebuffer = function(g, I) {
      const V = Ee.get(g);
      V.__webglFramebuffer = I, V.__useDefaultFramebuffer = I === void 0;
    };
    const ao = C.createFramebuffer();
    this.setRenderTarget = function(g, I = 0, V = 0) {
      B = g, k = I, Y = V;
      let F = null, N = !1, ne = !1;
      if (g) {
        const ue = Ee.get(g);
        if (ue.__useDefaultFramebuffer !== void 0) {
          he.bindFramebuffer(C.FRAMEBUFFER, ue.__webglFramebuffer), z.copy(g.viewport), J.copy(g.scissor), te = g.scissorTest, he.viewport(z), he.scissor(J), he.setScissorTest(te), G = -1;
          return;
        } else if (ue.__webglFramebuffer === void 0) x.setupRenderTarget(g);
        else if (ue.__hasExternalTextures) x.rebindTextures(g, Ee.get(g.texture).__webglTexture, Ee.get(g.depthTexture).__webglTexture);
        else if (g.depthBuffer) {
          const Ce = g.depthTexture;
          if (ue.__boundDepthTexture !== Ce) {
            if (Ce !== null && Ee.has(Ce) && (g.width !== Ce.image.width || g.height !== Ce.image.height)) throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
            x.setupDepthRenderbuffer(g);
          }
        }
        const pe = g.texture;
        (pe.isData3DTexture || pe.isDataArrayTexture || pe.isCompressedArrayTexture) && (ne = !0);
        const me = Ee.get(g).__webglFramebuffer;
        g.isWebGLCubeRenderTarget ? (Array.isArray(me[I]) ? F = me[I][V] : F = me[I], N = !0) : g.samples > 0 && x.useMultisampledRTT(g) === !1 ? F = Ee.get(g).__webglMultisampledFramebuffer : Array.isArray(me) ? F = me[V] : F = me, z.copy(g.viewport), J.copy(g.scissor), te = g.scissorTest;
      } else
        z.copy(ve).multiplyScalar(Ve).floor(), J.copy(de).multiplyScalar(Ve).floor(), te = be;
      if (V !== 0 && (F = ao), he.bindFramebuffer(C.FRAMEBUFFER, F) && he.drawBuffers(g, F), he.viewport(z), he.scissor(J), he.setScissorTest(te), N) {
        const ue = Ee.get(g.texture);
        C.framebufferTexture2D(C.FRAMEBUFFER, C.COLOR_ATTACHMENT0, C.TEXTURE_CUBE_MAP_POSITIVE_X + I, ue.__webglTexture, V);
      } else if (ne) {
        const ue = I;
        for (let pe = 0; pe < g.textures.length; pe++) {
          const me = Ee.get(g.textures[pe]);
          C.framebufferTextureLayer(C.FRAMEBUFFER, C.COLOR_ATTACHMENT0 + pe, me.__webglTexture, V, ue);
        }
      } else if (g !== null && V !== 0) {
        const ue = Ee.get(g.texture);
        C.framebufferTexture2D(C.FRAMEBUFFER, C.COLOR_ATTACHMENT0, C.TEXTURE_2D, ue.__webglTexture, V);
      }
      G = -1;
    }, this.readRenderTargetPixels = function(g, I, V, F, N, ne, ue, pe = 0) {
      if (!(g && g.isWebGLRenderTarget)) {
        Pe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let me = Ee.get(g).__webglFramebuffer;
      if (g.isWebGLCubeRenderTarget && ue !== void 0 && (me = me[ue]), me) {
        he.bindFramebuffer(C.FRAMEBUFFER, me);
        try {
          const Ce = g.textures[pe], Fe = Ce.format, ze = Ce.type;
          if (g.textures.length > 1 && C.readBuffer(C.COLOR_ATTACHMENT0 + pe), !Ye.textureFormatReadable(Fe)) {
            Pe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!Ye.textureTypeReadable(ze)) {
            Pe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          I >= 0 && I <= g.width - F && V >= 0 && V <= g.height - N && C.readPixels(I, V, F, N, Oe.convert(Fe), Oe.convert(ze), ne);
        } finally {
          const Ce = B !== null ? Ee.get(B).__webglFramebuffer : null;
          he.bindFramebuffer(C.FRAMEBUFFER, Ce);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(g, I, V, F, N, ne, ue, pe = 0) {
      if (!(g && g.isWebGLRenderTarget)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let me = Ee.get(g).__webglFramebuffer;
      if (g.isWebGLCubeRenderTarget && ue !== void 0 && (me = me[ue]), me) if (I >= 0 && I <= g.width - F && V >= 0 && V <= g.height - N) {
        he.bindFramebuffer(C.FRAMEBUFFER, me);
        const Ce = g.textures[pe], Fe = Ce.format, ze = Ce.type;
        if (g.textures.length > 1 && C.readBuffer(C.COLOR_ATTACHMENT0 + pe), !Ye.textureFormatReadable(Fe)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
        if (!Ye.textureTypeReadable(ze)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
        const ye = C.createBuffer();
        C.bindBuffer(C.PIXEL_PACK_BUFFER, ye), C.bufferData(C.PIXEL_PACK_BUFFER, ne.byteLength, C.STREAM_READ), C.readPixels(I, V, F, N, Oe.convert(Fe), Oe.convert(ze), 0);
        const et = B !== null ? Ee.get(B).__webglFramebuffer : null;
        he.bindFramebuffer(C.FRAMEBUFFER, et);
        const it = C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE, 0);
        return C.flush(), await ll(C, it, 4), C.bindBuffer(C.PIXEL_PACK_BUFFER, ye), C.getBufferSubData(C.PIXEL_PACK_BUFFER, 0, ne), C.deleteBuffer(ye), C.deleteSync(it), ne;
      } else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
    }, this.copyFramebufferToTexture = function(g, I = null, V = 0) {
      const F = Math.pow(2, -V), N = Math.floor(g.image.width * F), ne = Math.floor(g.image.height * F), ue = I !== null ? I.x : 0, pe = I !== null ? I.y : 0;
      x.setTexture2D(g, 0), C.copyTexSubImage2D(C.TEXTURE_2D, V, 0, 0, ue, pe, N, ne), he.unbindTexture();
    };
    const oo = C.createFramebuffer(), lo = C.createFramebuffer();
    this.copyTextureToTexture = function(g, I, V = null, F = null, N = 0, ne = 0) {
      let ue, pe, me, Ce, Fe, ze, ye, et, it;
      const rt = g.isCompressedTexture ? g.mipmaps[ne] : g.image;
      if (V !== null)
        ue = V.max.x - V.min.x, pe = V.max.y - V.min.y, me = V.isBox3 ? V.max.z - V.min.z : 1, Ce = V.min.x, Fe = V.min.y, ze = V.isBox3 ? V.min.z : 0;
      else {
        const ot = Math.pow(2, -N);
        ue = Math.floor(rt.width * ot), pe = Math.floor(rt.height * ot), g.isDataArrayTexture ? me = rt.depth : g.isData3DTexture ? me = Math.floor(rt.depth * ot) : me = 1, Ce = 0, Fe = 0, ze = 0;
      }
      F !== null ? (ye = F.x, et = F.y, it = F.z) : (ye = 0, et = 0, it = 0);
      const qe = Oe.convert(I.format), vt = Oe.convert(I.type);
      let _e;
      I.isData3DTexture ? (x.setTexture3D(I, 0), _e = C.TEXTURE_3D) : I.isDataArrayTexture || I.isCompressedArrayTexture ? (x.setTexture2DArray(I, 0), _e = C.TEXTURE_2D_ARRAY) : (x.setTexture2D(I, 0), _e = C.TEXTURE_2D), he.activeTexture(C.TEXTURE0), he.pixelStorei(C.UNPACK_FLIP_Y_WEBGL, I.flipY), he.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL, I.premultiplyAlpha), he.pixelStorei(C.UNPACK_ALIGNMENT, I.unpackAlignment);
      const Bt = he.getParameter(C.UNPACK_ROW_LENGTH), je = he.getParameter(C.UNPACK_IMAGE_HEIGHT), Dt = he.getParameter(C.UNPACK_SKIP_PIXELS), Wt = he.getParameter(C.UNPACK_SKIP_ROWS), ln = he.getParameter(C.UNPACK_SKIP_IMAGES);
      he.pixelStorei(C.UNPACK_ROW_LENGTH, rt.width), he.pixelStorei(C.UNPACK_IMAGE_HEIGHT, rt.height), he.pixelStorei(C.UNPACK_SKIP_PIXELS, Ce), he.pixelStorei(C.UNPACK_SKIP_ROWS, Fe), he.pixelStorei(C.UNPACK_SKIP_IMAGES, ze);
      const Cn = g.isDataArrayTexture || g.isData3DTexture, Qe = I.isDataArrayTexture || I.isData3DTexture;
      if (g.isDepthTexture) {
        const ot = Ee.get(g), cn = Ee.get(I), $e = Ee.get(ot.__renderTarget), ri = Ee.get(cn.__renderTarget);
        he.bindFramebuffer(C.READ_FRAMEBUFFER, $e.__webglFramebuffer), he.bindFramebuffer(C.DRAW_FRAMEBUFFER, ri.__webglFramebuffer);
        for (let Pn = 0; Pn < me; Pn++)
          Cn && (C.framebufferTextureLayer(C.READ_FRAMEBUFFER, C.COLOR_ATTACHMENT0, Ee.get(g).__webglTexture, N, ze + Pn), C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER, C.COLOR_ATTACHMENT0, Ee.get(I).__webglTexture, ne, it + Pn)), C.blitFramebuffer(Ce, Fe, ue, pe, ye, et, ue, pe, C.DEPTH_BUFFER_BIT, C.NEAREST);
        he.bindFramebuffer(C.READ_FRAMEBUFFER, null), he.bindFramebuffer(C.DRAW_FRAMEBUFFER, null);
      } else if (N !== 0 || g.isRenderTargetTexture || Ee.has(g)) {
        const ot = Ee.get(g), cn = Ee.get(I);
        he.bindFramebuffer(C.READ_FRAMEBUFFER, oo), he.bindFramebuffer(C.DRAW_FRAMEBUFFER, lo);
        for (let $e = 0; $e < me; $e++)
          Cn ? C.framebufferTextureLayer(C.READ_FRAMEBUFFER, C.COLOR_ATTACHMENT0, ot.__webglTexture, N, ze + $e) : C.framebufferTexture2D(C.READ_FRAMEBUFFER, C.COLOR_ATTACHMENT0, C.TEXTURE_2D, ot.__webglTexture, N), Qe ? C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER, C.COLOR_ATTACHMENT0, cn.__webglTexture, ne, it + $e) : C.framebufferTexture2D(C.DRAW_FRAMEBUFFER, C.COLOR_ATTACHMENT0, C.TEXTURE_2D, cn.__webglTexture, ne), N !== 0 ? C.blitFramebuffer(Ce, Fe, ue, pe, ye, et, ue, pe, C.COLOR_BUFFER_BIT, C.NEAREST) : Qe ? C.copyTexSubImage3D(_e, ne, ye, et, it + $e, Ce, Fe, ue, pe) : C.copyTexSubImage2D(_e, ne, ye, et, Ce, Fe, ue, pe);
        he.bindFramebuffer(C.READ_FRAMEBUFFER, null), he.bindFramebuffer(C.DRAW_FRAMEBUFFER, null);
      } else Qe ? g.isDataTexture || g.isData3DTexture ? C.texSubImage3D(_e, ne, ye, et, it, ue, pe, me, qe, vt, rt.data) : I.isCompressedArrayTexture ? C.compressedTexSubImage3D(_e, ne, ye, et, it, ue, pe, me, qe, rt.data) : C.texSubImage3D(_e, ne, ye, et, it, ue, pe, me, qe, vt, rt) : g.isDataTexture ? C.texSubImage2D(C.TEXTURE_2D, ne, ye, et, ue, pe, qe, vt, rt.data) : g.isCompressedTexture ? C.compressedTexSubImage2D(C.TEXTURE_2D, ne, ye, et, rt.width, rt.height, qe, rt.data) : C.texSubImage2D(C.TEXTURE_2D, ne, ye, et, ue, pe, qe, vt, rt);
      he.pixelStorei(C.UNPACK_ROW_LENGTH, Bt), he.pixelStorei(C.UNPACK_IMAGE_HEIGHT, je), he.pixelStorei(C.UNPACK_SKIP_PIXELS, Dt), he.pixelStorei(C.UNPACK_SKIP_ROWS, Wt), he.pixelStorei(C.UNPACK_SKIP_IMAGES, ln), ne === 0 && I.generateMipmaps && C.generateMipmap(_e), he.unbindTexture();
    }, this.initRenderTarget = function(g) {
      Ee.get(g).__webglFramebuffer === void 0 && x.setupRenderTarget(g);
    }, this.initTexture = function(g) {
      g.isCubeTexture ? x.setTextureCube(g, 0) : g.isData3DTexture ? x.setTexture3D(g, 0) : g.isDataArrayTexture || g.isCompressedArrayTexture ? x.setTexture2DArray(g, 0) : x.setTexture2D(g, 0), he.unbindTexture();
    }, this.resetState = function() {
      k = 0, Y = 0, B = null, he.reset(), w.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return $n;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    const t = this.getContext();
    t.drawingBufferColorSpace = We._getDrawingBufferColorSpace(e), t.unpackColorSpace = We._getUnpackColorSpace();
  }
}, da = { type: "change" }, rs = { type: "start" }, eo = { type: "end" }, Ki = new Ua(), fa = new _n(), Ku = Math.cos(70 * Al.DEG2RAD), dt = new O(), At = 2 * Math.PI, Je = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, Vr = 1e-6, Zu = class extends Dc {
  constructor(e, t = null) {
    super(e, t), this.state = Je.NONE, this.target = new O(), this.cursor = new O(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = {
      LEFT: "ArrowLeft",
      UP: "ArrowUp",
      RIGHT: "ArrowRight",
      BOTTOM: "ArrowDown"
    }, this.mouseButtons = {
      LEFT: Kn.ROTATE,
      MIDDLE: Kn.DOLLY,
      RIGHT: Kn.PAN
    }, this.touches = {
      ONE: jn.ROTATE,
      TWO: jn.DOLLY_PAN
    }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._cursorStyle = "auto", this._domElementKeyEvents = null, this._lastPosition = new O(), this._lastQuaternion = new on(), this._lastTargetPosition = new O(), this._quat = new on().setFromUnitVectors(e.up, new O(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new Gs(), this._sphericalDelta = new Gs(), this._scale = 1, this._panOffset = new O(), this._rotateStart = new Ne(), this._rotateEnd = new Ne(), this._rotateDelta = new Ne(), this._panStart = new Ne(), this._panEnd = new Ne(), this._panDelta = new Ne(), this._dollyStart = new Ne(), this._dollyEnd = new Ne(), this._dollyDelta = new Ne(), this._dollyDirection = new O(), this._mouse = new Ne(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = Ju.bind(this), this._onPointerDown = $u.bind(this), this._onPointerUp = Qu.bind(this), this._onContextMenu = ad.bind(this), this._onMouseWheel = nd.bind(this), this._onKeyDown = id.bind(this), this._onTouchStart = rd.bind(this), this._onTouchMove = sd.bind(this), this._onMouseDown = ed.bind(this), this._onMouseMove = td.bind(this), this._interceptControlDown = od.bind(this), this._interceptControlUp = ld.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
  }
  set cursorStyle(e) {
    this._cursorStyle = e, e === "grab" ? this.domElement.style.cursor = "grab" : this.domElement.style.cursor = "auto";
  }
  get cursorStyle() {
    return this._cursorStyle;
  }
  connect(e) {
    super.connect(e), this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointercancel", this._onPointerUp), this.domElement.addEventListener("contextmenu", this._onContextMenu), this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: !1 }), this.domElement.getRootNode().addEventListener("keydown", this._interceptControlDown, {
      passive: !0,
      capture: !0
    }), this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.ownerDocument.removeEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.removeEventListener("pointerup", this._onPointerUp), this.domElement.removeEventListener("pointercancel", this._onPointerUp), this.domElement.removeEventListener("wheel", this._onMouseWheel), this.domElement.removeEventListener("contextmenu", this._onContextMenu), this.stopListenToKeyEvents(), this.domElement.getRootNode().removeEventListener("keydown", this._interceptControlDown, { capture: !0 }), this.domElement.style.touchAction = "";
  }
  dispose() {
    this.disconnect();
  }
  getPolarAngle() {
    return this._spherical.phi;
  }
  getAzimuthalAngle() {
    return this._spherical.theta;
  }
  getDistance() {
    return this.object.position.distanceTo(this.target);
  }
  listenToKeyEvents(e) {
    e.addEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = e;
  }
  stopListenToKeyEvents() {
    this._domElementKeyEvents !== null && (this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = null);
  }
  saveState() {
    this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
  }
  reset() {
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(da), this.update(), this.state = Je.NONE;
  }
  pan(e, t) {
    this._pan(e, t), this.update();
  }
  dollyIn(e) {
    this._dollyIn(e), this.update();
  }
  dollyOut(e) {
    this._dollyOut(e), this.update();
  }
  rotateLeft(e) {
    this._rotateLeft(e), this.update();
  }
  rotateUp(e) {
    this._rotateUp(e), this.update();
  }
  update(e = null) {
    const t = this.object.position;
    dt.copy(t).sub(this.target), dt.applyQuaternion(this._quat), this._spherical.setFromVector3(dt), this.autoRotate && this.state === Je.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let n = this.minAzimuthAngle, i = this.maxAzimuthAngle;
    isFinite(n) && isFinite(i) && (n < -Math.PI ? n += At : n > Math.PI && (n -= At), i < -Math.PI ? i += At : i > Math.PI && (i -= At), n <= i ? this._spherical.theta = Math.max(n, Math.min(i, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (n + i) / 2 ? Math.max(n, this._spherical.theta) : Math.min(i, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let r = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera) this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const s = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), r = s != this._spherical.radius;
    }
    if (dt.setFromSpherical(this._spherical), dt.applyQuaternion(this._quatInverse), t.copy(this.target).add(dt), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let s = null;
      if (this.object.isPerspectiveCamera) {
        const a = dt.length();
        s = this._clampDistance(a * this._scale);
        const o = a - s;
        this.object.position.addScaledVector(this._dollyDirection, o), this.object.updateMatrixWorld(), r = !!o;
      } else if (this.object.isOrthographicCamera) {
        const a = new O(this._mouse.x, this._mouse.y, 0);
        a.unproject(this.object);
        const o = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), r = o !== this.object.zoom;
        const l = new O(this._mouse.x, this._mouse.y, 0);
        l.unproject(this.object), this.object.position.sub(l).add(a), this.object.updateMatrixWorld(), s = dt.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      s !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(s).add(this.object.position) : (Ki.origin.copy(this.object.position), Ki.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(Ki.direction)) < Ku ? this.object.lookAt(this.target) : (fa.setFromNormalAndCoplanarPoint(this.object.up, this.target), Ki.intersectPlane(fa, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const s = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), s !== this.object.zoom && (this.object.updateProjectionMatrix(), r = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, r || this._lastPosition.distanceToSquared(this.object.position) > Vr || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > Vr || this._lastTargetPosition.distanceToSquared(this.target) > Vr ? (this.dispatchEvent(da), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(e) {
    return e !== null ? At / 60 * this.autoRotateSpeed * e : At / 60 / 60 * this.autoRotateSpeed;
  }
  _getZoomScale(e) {
    const t = Math.abs(e * 0.01);
    return Math.pow(0.95, this.zoomSpeed * t);
  }
  _rotateLeft(e) {
    this._sphericalDelta.theta -= e;
  }
  _rotateUp(e) {
    this._sphericalDelta.phi -= e;
  }
  _panLeft(e, t) {
    dt.setFromMatrixColumn(t, 0), dt.multiplyScalar(-e), this._panOffset.add(dt);
  }
  _panUp(e, t) {
    this.screenSpacePanning === !0 ? dt.setFromMatrixColumn(t, 1) : (dt.setFromMatrixColumn(t, 0), dt.crossVectors(this.object.up, dt)), dt.multiplyScalar(e), this._panOffset.add(dt);
  }
  _pan(e, t) {
    const n = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const i = this.object.position;
      dt.copy(i).sub(this.target);
      let r = dt.length();
      r *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * e * r / n.clientHeight, this.object.matrix), this._panUp(2 * t * r / n.clientHeight, this.object.matrix);
    } else this.object.isOrthographicCamera ? (this._panLeft(e * (this.object.right - this.object.left) / this.object.zoom / n.clientWidth, this.object.matrix), this._panUp(t * (this.object.top - this.object.bottom) / this.object.zoom / n.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = !1);
  }
  _dollyOut(e) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale /= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _dollyIn(e) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale *= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _updateZoomParameters(e, t) {
    if (!this.zoomToCursor) return;
    this._performCursorZoom = !0;
    const n = this.domElement.getBoundingClientRect(), i = e - n.left, r = t - n.top, s = n.width, a = n.height;
    this._mouse.x = i / s * 2 - 1, this._mouse.y = -(r / a) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
  }
  _clampDistance(e) {
    return Math.max(this.minDistance, Math.min(this.maxDistance, e));
  }
  _handleMouseDownRotate(e) {
    this._rotateStart.set(e.clientX, e.clientY);
  }
  _handleMouseDownDolly(e) {
    this._updateZoomParameters(e.clientX, e.clientX), this._dollyStart.set(e.clientX, e.clientY);
  }
  _handleMouseDownPan(e) {
    this._panStart.set(e.clientX, e.clientY);
  }
  _handleMouseMoveRotate(e) {
    this._rotateEnd.set(e.clientX, e.clientY), this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(At * this._rotateDelta.x / t.clientHeight), this._rotateUp(At * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
  }
  _handleMouseMoveDolly(e) {
    this._dollyEnd.set(e.clientX, e.clientY), this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart), this._dollyDelta.y > 0 ? this._dollyOut(this._getZoomScale(this._dollyDelta.y)) : this._dollyDelta.y < 0 && this._dollyIn(this._getZoomScale(this._dollyDelta.y)), this._dollyStart.copy(this._dollyEnd), this.update();
  }
  _handleMouseMovePan(e) {
    this._panEnd.set(e.clientX, e.clientY), this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd), this.update();
  }
  _handleMouseWheel(e) {
    this._updateZoomParameters(e.clientX, e.clientY), e.deltaY < 0 ? this._dollyIn(this._getZoomScale(e.deltaY)) : e.deltaY > 0 && this._dollyOut(this._getZoomScale(e.deltaY)), this.update();
  }
  _handleKeyDown(e) {
    let t = !1;
    switch (e.code) {
      case this.keys.UP:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(At * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), t = !0;
        break;
      case this.keys.BOTTOM:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateUp(-At * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), t = !0;
        break;
      case this.keys.LEFT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(At * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), t = !0;
        break;
      case this.keys.RIGHT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this.enableRotate && this._rotateLeft(-At * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), t = !0;
        break;
    }
    t && (e.preventDefault(), this.update());
  }
  _handleTouchStartRotate(e) {
    if (this._pointers.length === 1) this._rotateStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), n = 0.5 * (e.pageX + t.x), i = 0.5 * (e.pageY + t.y);
      this._rotateStart.set(n, i);
    }
  }
  _handleTouchStartPan(e) {
    if (this._pointers.length === 1) this._panStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), n = 0.5 * (e.pageX + t.x), i = 0.5 * (e.pageY + t.y);
      this._panStart.set(n, i);
    }
  }
  _handleTouchStartDolly(e) {
    const t = this._getSecondPointerPosition(e), n = e.pageX - t.x, i = e.pageY - t.y, r = Math.sqrt(n * n + i * i);
    this._dollyStart.set(0, r);
  }
  _handleTouchStartDollyPan(e) {
    this.enableZoom && this._handleTouchStartDolly(e), this.enablePan && this._handleTouchStartPan(e);
  }
  _handleTouchStartDollyRotate(e) {
    this.enableZoom && this._handleTouchStartDolly(e), this.enableRotate && this._handleTouchStartRotate(e);
  }
  _handleTouchMoveRotate(e) {
    if (this._pointers.length == 1) this._rotateEnd.set(e.pageX, e.pageY);
    else {
      const n = this._getSecondPointerPosition(e), i = 0.5 * (e.pageX + n.x), r = 0.5 * (e.pageY + n.y);
      this._rotateEnd.set(i, r);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(At * this._rotateDelta.x / t.clientHeight), this._rotateUp(At * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(e) {
    if (this._pointers.length === 1) this._panEnd.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), n = 0.5 * (e.pageX + t.x), i = 0.5 * (e.pageY + t.y);
      this._panEnd.set(n, i);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(e) {
    const t = this._getSecondPointerPosition(e), n = e.pageX - t.x, i = e.pageY - t.y, r = Math.sqrt(n * n + i * i);
    this._dollyEnd.set(0, r), this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
    const s = (e.pageX + t.x) * 0.5, a = (e.pageY + t.y) * 0.5;
    this._updateZoomParameters(s, a);
  }
  _handleTouchMoveDollyPan(e) {
    this.enableZoom && this._handleTouchMoveDolly(e), this.enablePan && this._handleTouchMovePan(e);
  }
  _handleTouchMoveDollyRotate(e) {
    this.enableZoom && this._handleTouchMoveDolly(e), this.enableRotate && this._handleTouchMoveRotate(e);
  }
  _addPointer(e) {
    this._pointers.push(e.pointerId);
  }
  _removePointer(e) {
    delete this._pointerPositions[e.pointerId];
    for (let t = 0; t < this._pointers.length; t++) if (this._pointers[t] == e.pointerId) {
      this._pointers.splice(t, 1);
      return;
    }
  }
  _isTrackingPointer(e) {
    for (let t = 0; t < this._pointers.length; t++) if (this._pointers[t] == e.pointerId) return !0;
    return !1;
  }
  _trackPointer(e) {
    let t = this._pointerPositions[e.pointerId];
    t === void 0 && (t = new Ne(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
  }
  _getSecondPointerPosition(e) {
    const t = e.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[t];
  }
  _customWheelEvent(e) {
    const t = e.deltaMode, n = {
      clientX: e.clientX,
      clientY: e.clientY,
      deltaY: e.deltaY
    };
    switch (t) {
      case 1:
        n.deltaY *= 16;
        break;
      case 2:
        n.deltaY *= 100;
        break;
    }
    return e.ctrlKey && !this._controlActive && (n.deltaY *= 10), n;
  }
};
function $u(e) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(e.pointerId), this.domElement.ownerDocument.addEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(e) && (this._addPointer(e), e.pointerType === "touch" ? this._onTouchStart(e) : this._onMouseDown(e), this._cursorStyle === "grab" && (this.domElement.style.cursor = "grabbing")));
}
function Ju(e) {
  this.enabled !== !1 && (e.pointerType === "touch" ? this._onTouchMove(e) : this._onMouseMove(e));
}
function Qu(e) {
  switch (this._removePointer(e), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(e.pointerId), this.domElement.ownerDocument.removeEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(eo), this.state = Je.NONE, this._cursorStyle === "grab" && (this.domElement.style.cursor = "grab");
      break;
    case 1:
      const t = this._pointers[0], n = this._pointerPositions[t];
      this._onTouchStart({
        pointerId: t,
        pageX: n.x,
        pageY: n.y
      });
      break;
  }
}
function ed(e) {
  let t;
  switch (e.button) {
    case 0:
      t = this.mouseButtons.LEFT;
      break;
    case 1:
      t = this.mouseButtons.MIDDLE;
      break;
    case 2:
      t = this.mouseButtons.RIGHT;
      break;
    default:
      t = -1;
  }
  switch (t) {
    case Kn.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseDownDolly(e), this.state = Je.DOLLY;
      break;
    case Kn.ROTATE:
      if (e.ctrlKey || e.metaKey || e.shiftKey) {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(e), this.state = Je.PAN;
      } else {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(e), this.state = Je.ROTATE;
      }
      break;
    case Kn.PAN:
      if (e.ctrlKey || e.metaKey || e.shiftKey) {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(e), this.state = Je.ROTATE;
      } else {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(e), this.state = Je.PAN;
      }
      break;
    default:
      this.state = Je.NONE;
  }
  this.state !== Je.NONE && this.dispatchEvent(rs);
}
function td(e) {
  switch (this.state) {
    case Je.ROTATE:
      if (this.enableRotate === !1) return;
      this._handleMouseMoveRotate(e);
      break;
    case Je.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseMoveDolly(e);
      break;
    case Je.PAN:
      if (this.enablePan === !1) return;
      this._handleMouseMovePan(e);
      break;
  }
}
function nd(e) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== Je.NONE || (e.preventDefault(), this.dispatchEvent(rs), this._handleMouseWheel(this._customWheelEvent(e)), this.dispatchEvent(eo));
}
function id(e) {
  this.enabled !== !1 && this._handleKeyDown(e);
}
function rd(e) {
  switch (this._trackPointer(e), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case jn.ROTATE:
          if (this.enableRotate === !1) return;
          this._handleTouchStartRotate(e), this.state = Je.TOUCH_ROTATE;
          break;
        case jn.PAN:
          if (this.enablePan === !1) return;
          this._handleTouchStartPan(e), this.state = Je.TOUCH_PAN;
          break;
        default:
          this.state = Je.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case jn.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          this._handleTouchStartDollyPan(e), this.state = Je.TOUCH_DOLLY_PAN;
          break;
        case jn.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1) return;
          this._handleTouchStartDollyRotate(e), this.state = Je.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = Je.NONE;
      }
      break;
    default:
      this.state = Je.NONE;
  }
  this.state !== Je.NONE && this.dispatchEvent(rs);
}
function sd(e) {
  switch (this._trackPointer(e), this.state) {
    case Je.TOUCH_ROTATE:
      if (this.enableRotate === !1) return;
      this._handleTouchMoveRotate(e), this.update();
      break;
    case Je.TOUCH_PAN:
      if (this.enablePan === !1) return;
      this._handleTouchMovePan(e), this.update();
      break;
    case Je.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1) return;
      this._handleTouchMoveDollyPan(e), this.update();
      break;
    case Je.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1) return;
      this._handleTouchMoveDollyRotate(e), this.update();
      break;
    default:
      this.state = Je.NONE;
  }
}
function ad(e) {
  this.enabled !== !1 && e.preventDefault();
}
function od(e) {
  e.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, {
    passive: !0,
    capture: !0
  }));
}
function ld(e) {
  e.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, {
    passive: !0,
    capture: !0
  }));
}
var hd = class Qi {
  static elements = void 0;
  static configs = void 0;
  constructor() {
    Qi.elements = Array.from(document.querySelectorAll("[id^='wgx3d']")), Qi.configs = Qi.elements.map((t) => {
      const n = t.getAttribute("data-wgx3d-config");
      return n ? JSON.parse(n) : {};
    });
  }
  getSceneBounds(t) {
    return t.bbox ?? [
      -1,
      1,
      -1,
      1,
      -1,
      1
    ];
  }
  getSceneCenter(t) {
    return {
      x: (t[0] + t[1]) / 2,
      y: (t[2] + t[3]) / 2,
      z: (t[4] + t[5]) / 2
    };
  }
  getSceneSize(t) {
    const n = Math.max(t[1] - t[0], t[3] - t[2], t[5] - t[4]);
    return n === 0 ? 1 : n;
  }
  getSceneDimension(t) {
    const n = Number(t);
    return n === 0 || Number.isNaN(n) ? 400 : n;
  }
  getViewPoint(t) {
    return t.vp ?? [
      1.3,
      -2.4,
      2
    ];
  }
  createRenderer(t, n) {
    const i = new ju({
      antialias: !0,
      alpha: !0
    });
    return i.setPixelRatio(window.devicePixelRatio || 1), i.setSize(t, n), i;
  }
  createCamera(t, n, i, r, s) {
    const a = Math.hypot(s[0], s[1], s[2]), o = a === 0 ? 1 : a, l = new Ut(35, t / n, r * 0.01, r * 100);
    return l.up.set(0, 0, 1), l.position.set(i.x + s[0] / o * r * 2.2, i.y + s[1] / o * r * 2.2, i.z + s[2] / o * r * 2.2), l;
  }
  createControls(t, n, i) {
    const r = new Zu(t, n);
    return r.target.set(i.x, i.y, i.z), r.update(), r;
  }
  addSceneLights(t, n, i) {
    t.add(new Mc(16777215, 0.55));
    const r = new Vs(16777215, 0.6);
    r.position.set(n.x + i, n.y - i, n.z + i), t.add(r);
    const s = new Vs(16777215, 0.35);
    s.position.set(n.x - i, n.y + i, n.z + i * 0.5), t.add(s);
  }
  createMeshGeometry(t) {
    const n = new Sn();
    return n.setAttribute("position", new Lt(t.pos, 3)), t.norm && n.setAttribute("normal", new Lt(t.norm, 3)), t.col && n.setAttribute("color", new Lt(t.col, 3)), t.uv && n.setAttribute("uv", new Lt(t.uv, 2)), n.setIndex(t.idx), t.norm || n.computeVertexNormals(), n;
  }
  createMeshMaterial(t) {
    const n = t.tex ? new _c().load(t.tex) : null, i = new nc({
      map: n,
      vertexColors: !!t.col && !n,
      side: 2,
      flatShading: !1,
      shininess: 25
    });
    return n ? i.color = new Xe(1, 1, 1) : t.col || (i.color = new Xe(0.36, 0.5, 0.7)), i;
  }
  addSceneMeshes(t, n) {
    (n ?? []).forEach((i) => {
      const r = this.createMeshGeometry(i), s = this.createMeshMaterial(i);
      t.add(new Zt(r, s));
    });
  }
  startRenderLoop(t, n, i, r) {
    function s() {
      requestAnimationFrame(s), r.update(), t.render(n, i);
    }
    s();
  }
  renderScene(t, n) {
    const i = document.getElementById(t);
    if (!i) return;
    const r = this.getSceneDimension(n.width), s = this.getSceneDimension(n.height), a = this.getSceneBounds(n), o = this.getSceneCenter(a), l = this.getSceneSize(a), c = this.getViewPoint(n), u = this.createRenderer(r, s);
    i.appendChild(u.domElement);
    const d = new Vl(), h = this.createCamera(r, s, o, l, c), _ = this.createControls(h, u.domElement, o);
    this.addSceneLights(d, o, l), this.addSceneMeshes(d, n.meshes), this.startRenderLoop(u, d, h, _);
  }
};
export {
  hd as default
};
