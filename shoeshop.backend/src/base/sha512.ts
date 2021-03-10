class Sha512 {
  static Long: any;
  public hash(msg: string, options?: any) {
    const defaults = { msgFormat: 'string', outFormat: 'hex' };
    const opt = Object.assign(defaults, options);
    switch (opt.msgFormat) {
      default:
      case 'string':
        msg = utf8Encode(msg);
        break;
    }

    const K = [
      '428a2f98d728ae22',
      '7137449123ef65cd',
      'b5c0fbcfec4d3b2f',
      'e9b5dba58189dbbc',
      '3956c25bf348b538',
      '59f111f1b605d019',
      '923f82a4af194f9b',
      'ab1c5ed5da6d8118',
      'd807aa98a3030242',
      '12835b0145706fbe',
      '243185be4ee4b28c',
      '550c7dc3d5ffb4e2',
      '72be5d74f27b896f',
      '80deb1fe3b1696b1',
      '9bdc06a725c71235',
      'c19bf174cf692694',
      'e49b69c19ef14ad2',
      'efbe4786384f25e3',
      '0fc19dc68b8cd5b5',
      '240ca1cc77ac9c65',
      '2de92c6f592b0275',
      '4a7484aa6ea6e483',
      '5cb0a9dcbd41fbd4',
      '76f988da831153b5',
      '983e5152ee66dfab',
      'a831c66d2db43210',
      'b00327c898fb213f',
      'bf597fc7beef0ee4',
      'c6e00bf33da88fc2',
      'd5a79147930aa725',
      '06ca6351e003826f',
      '142929670a0e6e70',
      '27b70a8546d22ffc',
      '2e1b21385c26c926',
      '4d2c6dfc5ac42aed',
      '53380d139d95b3df',
      '650a73548baf63de',
      '766a0abb3c77b2a8',
      '81c2c92e47edaee6',
      '92722c851482353b',
      'a2bfe8a14cf10364',
      'a81a664bbc423001',
      'c24b8b70d0f89791',
      'c76c51a30654be30',
      'd192e819d6ef5218',
      'd69906245565a910',
      'f40e35855771202a',
      '106aa07032bbd1b8',
      '19a4c116b8d2d0c8',
      '1e376c085141ab53',
      '2748774cdf8eeb99',
      '34b0bcb5e19b48a8',
      '391c0cb3c5c95a63',
      '4ed8aa4ae3418acb',
      '5b9cca4f7763e373',
      '682e6ff3d6b2b8a3',
      '748f82ee5defb2fc',
      '78a5636f43172f60',
      '84c87814a1f0ab72',
      '8cc702081a6439ec',
      '90befffa23631e28',
      'a4506cebde82bde9',
      'bef9a3f7b2c67915',
      'c67178f2e372532b',
      'ca273eceea26619c',
      'd186b8c721c0c207',
      'eada7dd6cde0eb1e',
      'f57d4f7fee6ed178',
      '06f067aa72176fba',
      '0a637dc5a2c898a6',
      '113f9804bef90dae',
      '1b710b35131c471b',
      '28db77f523047d84',
      '32caab7b40c72493',
      '3c9ebe0a15c9bebc',
      '431d67c49c100d4c',
      '4cc5d4becb3e42b6',
      '597f299cfc657e2a',
      '5fcb6fab3ad6faec',
      '6c44198c4a475817',
    ].map((k) => Sha512.Long.fromString(k));

    const H = [
      '6a09e667f3bcc908',
      'bb67ae8584caa73b',
      '3c6ef372fe94f82b',
      'a54ff53a5f1d36f1',
      '510e527fade682d1',
      '9b05688c2b3e6c1f',
      '1f83d9abfb41bd6b',
      '5be0cd19137e2179',
    ].map((h) => Sha512.Long.fromString(h));

    // sample: KD-a8ds46hw7lbYf41zMUnjVtFZATzjs
    msg += String.fromCharCode(0x80);
    const l = msg.length / 8 + 2;
    const N = Math.ceil(l / 16);
    const M = new Array(N);
    M[0] = new Array(16);
    for (let j = 0; j < 16; j++) {
      const hi =
        (msg.charCodeAt(j * 8 + 0) << 24) |
        (msg.charCodeAt(j * 8 + 1) << 16) |
        (msg.charCodeAt(j * 8 + 2) << 8) |
        (msg.charCodeAt(j * 8 + 3) << 0);

      const lo =
        (msg.charCodeAt(j * 8 + 4) << 24) |
        (msg.charCodeAt(j * 8 + 5) << 16) |
        (msg.charCodeAt(j * 8 + 6) << 8) |
        (msg.charCodeAt(j * 8 + 7) << 0);

      M[0][j] = new Sha512.Long(hi, lo);
    }

    M[N - 1][14] = new Sha512.Long(0, 0);

    const lenHi = ((msg.length - 1) * 8) / Math.pow(2, 32);
    const lenLo = ((msg.length - 1) * 8) >>> 0;
    M[N - 1][15] = new Sha512.Long(Math.floor(lenHi), lenLo);
    const W = new Array(80);
    for (let t = 0; t < 16; t++) W[t] = M[0][t];

    for (let t = 16; t < 80; t++) {
      W[t] = Sha512.σ1(W[t - 2])
        .add(W[t - 7])
        .add(Sha512.σ0(W[t - 15]))
        .add(W[t - 16]);
    }

    let a = H[0],
      b = H[1],
      c = H[2],
      d = H[3],
      e = H[4],
      f = H[5],
      g = H[6],
      h = H[7];
    // 3 - main loop (note 'addition modulo 2^64')
    for (let t = 0; t < 80; t++) {
      const T1 = h.add(Sha512.Σ1(e)).add(Sha512.Ch(e, f, g)).add(K[t]).add(W[t]);
      const T2 = Sha512.Σ0(a).add(Sha512.Maj(a, b, c));
      h = g;
      g = f;
      f = e;
      e = d.add(T1);
      d = c;
      c = b;
      b = a;
      a = T1.add(T2);
    }
    H[0] = H[0].add(a);
    H[1] = H[1].add(b);
    H[2] = H[2].add(c);
    H[3] = H[3].add(d);
    H[4] = H[4].add(e);
    H[5] = H[5].add(f);
    H[6] = H[6].add(g);
    H[7] = H[7].add(h);

    // convert H0...H7 to hex strings (with leading zeros)
    for (let h = 0; h < H.length; h++) H[h] = H[h].toString();
    return H.join('');

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
    function utf8Encode(str: string) {
      return new TextEncoder()
        .encode(str)
        .reduce((prev, curr) => prev + String.fromCharCode(curr), '');
    }
  }

  static ROTR(x: any, n: any) {
    // emulates (x >>> n) | (x << (64-n))
    if (n == 0) return x;
    if (n == 32) return new Sha512.Long(x.lo, x.hi);
    let hi = x.hi,
      lo = x.lo;
    if (n > 32) {
      [lo, hi] = [hi, lo]; // swap hi/lo
      n -= 32;
    }
    const hi1 = (hi >>> n) | (lo << (32 - n));
    const lo1 = (lo >>> n) | (hi << (32 - n));
    return new Sha512.Long(hi1, lo1);
  }

  static Σ0(x: any) {
    return Sha512.ROTR(x, 28).xor(Sha512.ROTR(x, 34)).xor(Sha512.ROTR(x, 39));
  }
  static Σ1(x: any) {
    return Sha512.ROTR(x, 14).xor(Sha512.ROTR(x, 18)).xor(Sha512.ROTR(x, 41));
  }
  static σ0(x: any) {
    return Sha512.ROTR(x, 1).xor(Sha512.ROTR(x, 8)).xor(x.shr(7));
  }
  static σ1(x: any) {
    return Sha512.ROTR(x, 19).xor(Sha512.ROTR(x, 61)).xor(x.shr(6));
  }
  static Ch(x: any, y: any, z: any) {
    return x.and(y).xor(x.not().and(z));
  } // 'choice'
  static Maj(x: any, y: any, z: any) {
    return x.and(y).xor(x.and(z)).xor(y.and(z));
  } // 'majority'
}

Sha512.Long = class {
  hi: any;
  lo: any;
  constructor(hi: any, lo: any) {
    this.hi = hi >>> 0;
    this.lo = lo >>> 0;
  }
  static fromString(str: string) {
    const hi = parseInt(str.slice(0, -8), 16);
    const lo = parseInt(str.slice(-8), 16);
    return new Sha512.Long(hi, lo);
  }
  toString() {
    const hi = ('00000000' + this.hi.toString(16)).slice(-8);
    const lo = ('00000000' + this.lo.toString(16)).slice(-8);
    return hi + lo;
  }
  add(that: any) {
    // addition modulo 2^64
    const lo = this.lo + that.lo;
    const hi = this.hi + that.hi + (lo > 0x100000000 ? 1 : 0); // carry top bit if lo > 2^32
    return new Sha512.Long(hi >>> 0, lo >>> 0);
  }
  and(that: any) {
    // &
    return new Sha512.Long(this.hi & that.hi, this.lo & that.lo);
  }
  xor(that: any) {
    // ^
    return new Sha512.Long(this.hi ^ that.hi, this.lo ^ that.lo);
  }
  not() {
    // ~
    return new Sha512.Long(~this.hi, ~this.lo);
  }
  shr(n: number) {
    // >>>
    if (n == 0) return this;
    if (n == 32) return new Sha512.Long(0, this.hi);
    if (n > 32) return new Sha512.Long(0, this.hi >>> (n - 32));
    /* n < 32 */
    return new Sha512.Long(this.hi >>> n, (this.lo >>> n) | (this.hi << (32 - n)));
  }
};

export default new Sha512();
