// ! ------------------------------------------------------------------------------
// ! Everything that follows has been transpiled from the unicode pakage in Golang.
// ! ------------------------------------------------------------------------------

// MaxLatin1 maximum Latin-1 value.
const MaxLatin1 = '\u00FF'.charCodeAt(0);

// linearMax is the maximum size table for linear search for non-Latin1 rune.
// Derived by running 'go test -calibrate'.
const linearMax = 18;

// is16 reports whether r is in the sorted slice of 16-bit ranges.
const is16 = (ranges, r) => {
	if (ranges.length <= linearMax || r <= MaxLatin1) {
        for (var i = 0; i < ranges.length; i++) {
            const range_ = ranges[i];
            if (r < range_.Lo) {
				return false;
            }
            
			if (r <= range_.Hi) {
				return range_.Stride == 1 || (r - range_.Lo) % range_.Stride == 0;
			}
        }
	}

	// binary search over ranges
	var lo = 0;
	var hi = ranges.length;
	for (;lo < hi;) {
		const m = Math.floor(lo + (hi-lo)/2);
        const range_ = ranges[m];

		if (range_.Lo <= r && r <= range_.Hi) {
			return range_.Stride == 1 || (r - range_.Lo) % range_.Stride == 0;
        }
        
		if (r < range_.Lo) {
			hi = m;
		} else {
			lo = m + 1;
		}
    }
    
	return false
}

// is32 reports whether r is in the sorted slice of 32-bit ranges.
const is32 = (ranges, r) => {
	if (ranges.length <= linearMax) {
        for (var i = 0; i < ranges.length; i++) {
            const range_ = ranges[i];
            if (r < range_.Lo) {
                return false;
            }

            if (r <= range_.Hi) {
                return range_.Stride == 1 || (r - range_.Lo) % range_.Stride == 0;
            }
        }
	}

	// binary search over ranges
	var lo = 0;
    var hi = ranges.length;
    for (;lo < hi;) {
        const m = Math.floor(lo + (hi-lo)/2);
        const range_ = ranges[m];

        if (range_.Lo <= r && r <= range_.Hi) {
			return range_.Stride == 1 || (r - range_.Lo) % range_.Stride == 0;
        }
        
		if (r < range_.Lo) {
			hi = m;
		} else {
			lo = m + 1;
		}
    }

	return false;
}

// Is reports whether the rune is in the specified table of ranges.
export const Is = (rangeTab, r) => {
    const r16 = rangeTab.R16;
    if (r16 && r16.length > 0 && r <= r16[r16.length-1].Hi) {
		return is16(r16, r);
    }

    const r32 = rangeTab.R32;
	if (r32 && r32.length > 0 && r >= r32[0].Lo) {
		return is32(r32, r);
	}

    return false;
};

export const Symbol = {
	R16: [
		{Lo: 0x0024, Hi: 0x002b, Stride: 7},
		{Lo: 0x003c, Hi: 0x003e, Stride: 1},
		{Lo: 0x005e, Hi: 0x0060, Stride: 2},
		{Lo: 0x007c, Hi: 0x007e, Stride: 2},
		{Lo: 0x00a2, Hi: 0x00a6, Stride: 1},
		{Lo: 0x00a8, Hi: 0x00a9, Stride: 1},
		{Lo: 0x00ac, Hi: 0x00ae, Stride: 2},
		{Lo: 0x00af, Hi: 0x00b1, Stride: 1},
		{Lo: 0x00b4, Hi: 0x00b8, Stride: 4},
		{Lo: 0x00d7, Hi: 0x00f7, Stride: 32},
		{Lo: 0x02c2, Hi: 0x02c5, Stride: 1},
		{Lo: 0x02d2, Hi: 0x02df, Stride: 1},
		{Lo: 0x02e5, Hi: 0x02eb, Stride: 1},
		{Lo: 0x02ed, Hi: 0x02ef, Stride: 2},
		{Lo: 0x02f0, Hi: 0x02ff, Stride: 1},
		{Lo: 0x0375, Hi: 0x0384, Stride: 15},
		{Lo: 0x0385, Hi: 0x03f6, Stride: 113},
		{Lo: 0x0482, Hi: 0x058d, Stride: 267},
		{Lo: 0x058e, Hi: 0x058f, Stride: 1},
		{Lo: 0x0606, Hi: 0x0608, Stride: 1},
		{Lo: 0x060b, Hi: 0x060e, Stride: 3},
		{Lo: 0x060f, Hi: 0x06de, Stride: 207},
		{Lo: 0x06e9, Hi: 0x06fd, Stride: 20},
		{Lo: 0x06fe, Hi: 0x07f6, Stride: 248},
		{Lo: 0x07fe, Hi: 0x07ff, Stride: 1},
		{Lo: 0x09f2, Hi: 0x09f3, Stride: 1},
		{Lo: 0x09fa, Hi: 0x09fb, Stride: 1},
		{Lo: 0x0af1, Hi: 0x0b70, Stride: 127},
		{Lo: 0x0bf3, Hi: 0x0bfa, Stride: 1},
		{Lo: 0x0c7f, Hi: 0x0d4f, Stride: 208},
		{Lo: 0x0d79, Hi: 0x0e3f, Stride: 198},
		{Lo: 0x0f01, Hi: 0x0f03, Stride: 1},
		{Lo: 0x0f13, Hi: 0x0f15, Stride: 2},
		{Lo: 0x0f16, Hi: 0x0f17, Stride: 1},
		{Lo: 0x0f1a, Hi: 0x0f1f, Stride: 1},
		{Lo: 0x0f34, Hi: 0x0f38, Stride: 2},
		{Lo: 0x0fbe, Hi: 0x0fc5, Stride: 1},
		{Lo: 0x0fc7, Hi: 0x0fcc, Stride: 1},
		{Lo: 0x0fce, Hi: 0x0fcf, Stride: 1},
		{Lo: 0x0fd5, Hi: 0x0fd8, Stride: 1},
		{Lo: 0x109e, Hi: 0x109f, Stride: 1},
		{Lo: 0x1390, Hi: 0x1399, Stride: 1},
		{Lo: 0x17db, Hi: 0x1940, Stride: 357},
		{Lo: 0x19de, Hi: 0x19ff, Stride: 1},
		{Lo: 0x1b61, Hi: 0x1b6a, Stride: 1},
		{Lo: 0x1b74, Hi: 0x1b7c, Stride: 1},
		{Lo: 0x1fbd, Hi: 0x1fbf, Stride: 2},
		{Lo: 0x1fc0, Hi: 0x1fc1, Stride: 1},
		{Lo: 0x1fcd, Hi: 0x1fcf, Stride: 1},
		{Lo: 0x1fdd, Hi: 0x1fdf, Stride: 1},
		{Lo: 0x1fed, Hi: 0x1fef, Stride: 1},
		{Lo: 0x1ffd, Hi: 0x1ffe, Stride: 1},
		{Lo: 0x2044, Hi: 0x2052, Stride: 14},
		{Lo: 0x207a, Hi: 0x207c, Stride: 1},
		{Lo: 0x208a, Hi: 0x208c, Stride: 1},
		{Lo: 0x20a0, Hi: 0x20bf, Stride: 1},
		{Lo: 0x2100, Hi: 0x2101, Stride: 1},
		{Lo: 0x2103, Hi: 0x2106, Stride: 1},
		{Lo: 0x2108, Hi: 0x2109, Stride: 1},
		{Lo: 0x2114, Hi: 0x2116, Stride: 2},
		{Lo: 0x2117, Hi: 0x2118, Stride: 1},
		{Lo: 0x211e, Hi: 0x2123, Stride: 1},
		{Lo: 0x2125, Hi: 0x2129, Stride: 2},
		{Lo: 0x212e, Hi: 0x213a, Stride: 12},
		{Lo: 0x213b, Hi: 0x2140, Stride: 5},
		{Lo: 0x2141, Hi: 0x2144, Stride: 1},
		{Lo: 0x214a, Hi: 0x214d, Stride: 1},
		{Lo: 0x214f, Hi: 0x218a, Stride: 59},
		{Lo: 0x218b, Hi: 0x2190, Stride: 5},
		{Lo: 0x2191, Hi: 0x2307, Stride: 1},
		{Lo: 0x230c, Hi: 0x2328, Stride: 1},
		{Lo: 0x232b, Hi: 0x2426, Stride: 1},
		{Lo: 0x2440, Hi: 0x244a, Stride: 1},
		{Lo: 0x249c, Hi: 0x24e9, Stride: 1},
		{Lo: 0x2500, Hi: 0x2767, Stride: 1},
		{Lo: 0x2794, Hi: 0x27c4, Stride: 1},
		{Lo: 0x27c7, Hi: 0x27e5, Stride: 1},
		{Lo: 0x27f0, Hi: 0x2982, Stride: 1},
		{Lo: 0x2999, Hi: 0x29d7, Stride: 1},
		{Lo: 0x29dc, Hi: 0x29fb, Stride: 1},
		{Lo: 0x29fe, Hi: 0x2b73, Stride: 1},
		{Lo: 0x2b76, Hi: 0x2b95, Stride: 1},
		{Lo: 0x2b98, Hi: 0x2bc8, Stride: 1},
		{Lo: 0x2bca, Hi: 0x2bfe, Stride: 1},
		{Lo: 0x2ce5, Hi: 0x2cea, Stride: 1},
		{Lo: 0x2e80, Hi: 0x2e99, Stride: 1},
		{Lo: 0x2e9b, Hi: 0x2ef3, Stride: 1},
		{Lo: 0x2f00, Hi: 0x2fd5, Stride: 1},
		{Lo: 0x2ff0, Hi: 0x2ffb, Stride: 1},
		{Lo: 0x3004, Hi: 0x3012, Stride: 14},
		{Lo: 0x3013, Hi: 0x3020, Stride: 13},
		{Lo: 0x3036, Hi: 0x3037, Stride: 1},
		{Lo: 0x303e, Hi: 0x303f, Stride: 1},
		{Lo: 0x309b, Hi: 0x309c, Stride: 1},
		{Lo: 0x3190, Hi: 0x3191, Stride: 1},
		{Lo: 0x3196, Hi: 0x319f, Stride: 1},
		{Lo: 0x31c0, Hi: 0x31e3, Stride: 1},
		{Lo: 0x3200, Hi: 0x321e, Stride: 1},
		{Lo: 0x322a, Hi: 0x3247, Stride: 1},
		{Lo: 0x3250, Hi: 0x3260, Stride: 16},
		{Lo: 0x3261, Hi: 0x327f, Stride: 1},
		{Lo: 0x328a, Hi: 0x32b0, Stride: 1},
		{Lo: 0x32c0, Hi: 0x32fe, Stride: 1},
		{Lo: 0x3300, Hi: 0x33ff, Stride: 1},
		{Lo: 0x4dc0, Hi: 0x4dff, Stride: 1},
		{Lo: 0xa490, Hi: 0xa4c6, Stride: 1},
		{Lo: 0xa700, Hi: 0xa716, Stride: 1},
		{Lo: 0xa720, Hi: 0xa721, Stride: 1},
		{Lo: 0xa789, Hi: 0xa78a, Stride: 1},
		{Lo: 0xa828, Hi: 0xa82b, Stride: 1},
		{Lo: 0xa836, Hi: 0xa839, Stride: 1},
		{Lo: 0xaa77, Hi: 0xaa79, Stride: 1},
		{Lo: 0xab5b, Hi: 0xfb29, Stride: 20430},
		{Lo: 0xfbb2, Hi: 0xfbc1, Stride: 1},
		{Lo: 0xfdfc, Hi: 0xfdfd, Stride: 1},
		{Lo: 0xfe62, Hi: 0xfe64, Stride: 2},
		{Lo: 0xfe65, Hi: 0xfe66, Stride: 1},
		{Lo: 0xfe69, Hi: 0xff04, Stride: 155},
		{Lo: 0xff0b, Hi: 0xff1c, Stride: 17},
		{Lo: 0xff1d, Hi: 0xff1e, Stride: 1},
		{Lo: 0xff3e, Hi: 0xff40, Stride: 2},
		{Lo: 0xff5c, Hi: 0xff5e, Stride: 2},
		{Lo: 0xffe0, Hi: 0xffe6, Stride: 1},
		{Lo: 0xffe8, Hi: 0xffee, Stride: 1},
		{Lo: 0xfffc, Hi: 0xfffd, Stride: 1},
    ], 
	R32: [
		{Lo: 0x10137, Hi: 0x1013f, Stride: 1},
		{Lo: 0x10179, Hi: 0x10189, Stride: 1},
		{Lo: 0x1018c, Hi: 0x1018e, Stride: 1},
		{Lo: 0x10190, Hi: 0x1019b, Stride: 1},
		{Lo: 0x101a0, Hi: 0x101d0, Stride: 48},
		{Lo: 0x101d1, Hi: 0x101fc, Stride: 1},
		{Lo: 0x10877, Hi: 0x10878, Stride: 1},
		{Lo: 0x10ac8, Hi: 0x1173f, Stride: 3191},
		{Lo: 0x16b3c, Hi: 0x16b3f, Stride: 1},
		{Lo: 0x16b45, Hi: 0x1bc9c, Stride: 20823},
		{Lo: 0x1d000, Hi: 0x1d0f5, Stride: 1},
		{Lo: 0x1d100, Hi: 0x1d126, Stride: 1},
		{Lo: 0x1d129, Hi: 0x1d164, Stride: 1},
		{Lo: 0x1d16a, Hi: 0x1d16c, Stride: 1},
		{Lo: 0x1d183, Hi: 0x1d184, Stride: 1},
		{Lo: 0x1d18c, Hi: 0x1d1a9, Stride: 1},
		{Lo: 0x1d1ae, Hi: 0x1d1e8, Stride: 1},
		{Lo: 0x1d200, Hi: 0x1d241, Stride: 1},
		{Lo: 0x1d245, Hi: 0x1d300, Stride: 187},
		{Lo: 0x1d301, Hi: 0x1d356, Stride: 1},
		{Lo: 0x1d6c1, Hi: 0x1d6db, Stride: 26},
		{Lo: 0x1d6fb, Hi: 0x1d715, Stride: 26},
		{Lo: 0x1d735, Hi: 0x1d74f, Stride: 26},
		{Lo: 0x1d76f, Hi: 0x1d789, Stride: 26},
		{Lo: 0x1d7a9, Hi: 0x1d7c3, Stride: 26},
		{Lo: 0x1d800, Hi: 0x1d9ff, Stride: 1},
		{Lo: 0x1da37, Hi: 0x1da3a, Stride: 1},
		{Lo: 0x1da6d, Hi: 0x1da74, Stride: 1},
		{Lo: 0x1da76, Hi: 0x1da83, Stride: 1},
		{Lo: 0x1da85, Hi: 0x1da86, Stride: 1},
		{Lo: 0x1ecac, Hi: 0x1ecb0, Stride: 4},
		{Lo: 0x1eef0, Hi: 0x1eef1, Stride: 1},
		{Lo: 0x1f000, Hi: 0x1f02b, Stride: 1},
		{Lo: 0x1f030, Hi: 0x1f093, Stride: 1},
		{Lo: 0x1f0a0, Hi: 0x1f0ae, Stride: 1},
		{Lo: 0x1f0b1, Hi: 0x1f0bf, Stride: 1},
		{Lo: 0x1f0c1, Hi: 0x1f0cf, Stride: 1},
		{Lo: 0x1f0d1, Hi: 0x1f0f5, Stride: 1},
		{Lo: 0x1f110, Hi: 0x1f16b, Stride: 1},
		{Lo: 0x1f170, Hi: 0x1f1ac, Stride: 1},
		{Lo: 0x1f1e6, Hi: 0x1f202, Stride: 1},
		{Lo: 0x1f210, Hi: 0x1f23b, Stride: 1},
		{Lo: 0x1f240, Hi: 0x1f248, Stride: 1},
		{Lo: 0x1f250, Hi: 0x1f251, Stride: 1},
		{Lo: 0x1f260, Hi: 0x1f265, Stride: 1},
		{Lo: 0x1f300, Hi: 0x1f6d4, Stride: 1},
		{Lo: 0x1f6e0, Hi: 0x1f6ec, Stride: 1},
		{Lo: 0x1f6f0, Hi: 0x1f6f9, Stride: 1},
		{Lo: 0x1f700, Hi: 0x1f773, Stride: 1},
		{Lo: 0x1f780, Hi: 0x1f7d8, Stride: 1},
		{Lo: 0x1f800, Hi: 0x1f80b, Stride: 1},
		{Lo: 0x1f810, Hi: 0x1f847, Stride: 1},
		{Lo: 0x1f850, Hi: 0x1f859, Stride: 1},
		{Lo: 0x1f860, Hi: 0x1f887, Stride: 1},
		{Lo: 0x1f890, Hi: 0x1f8ad, Stride: 1},
		{Lo: 0x1f900, Hi: 0x1f90b, Stride: 1},
		{Lo: 0x1f910, Hi: 0x1f93e, Stride: 1},
		{Lo: 0x1f940, Hi: 0x1f970, Stride: 1},
		{Lo: 0x1f973, Hi: 0x1f976, Stride: 1},
		{Lo: 0x1f97a, Hi: 0x1f97c, Stride: 2},
		{Lo: 0x1f97d, Hi: 0x1f9a2, Stride: 1},
		{Lo: 0x1f9b0, Hi: 0x1f9b9, Stride: 1},
		{Lo: 0x1f9c0, Hi: 0x1f9c2, Stride: 1},
		{Lo: 0x1f9d0, Hi: 0x1f9ff, Stride: 1},
		{Lo: 0x1fa60, Hi: 0x1fa6d, Stride: 1},
    ],
	LatinOffset: 10,
};

export const Punct = {
	R16: [
		{Lo: 0x0021, Hi: 0x0023, Stride: 1},
		{Lo: 0x0025, Hi: 0x002a, Stride: 1},
		{Lo: 0x002c, Hi: 0x002f, Stride: 1},
		{Lo: 0x003a, Hi: 0x003b, Stride: 1},
		{Lo: 0x003f, Hi: 0x0040, Stride: 1},
		{Lo: 0x005b, Hi: 0x005d, Stride: 1},
		{Lo: 0x005f, Hi: 0x007b, Stride: 28},
		{Lo: 0x007d, Hi: 0x00a1, Stride: 36},
		{Lo: 0x00a7, Hi: 0x00ab, Stride: 4},
		{Lo: 0x00b6, Hi: 0x00b7, Stride: 1},
		{Lo: 0x00bb, Hi: 0x00bf, Stride: 4},
		{Lo: 0x037e, Hi: 0x0387, Stride: 9},
		{Lo: 0x055a, Hi: 0x055f, Stride: 1},
		{Lo: 0x0589, Hi: 0x058a, Stride: 1},
		{Lo: 0x05be, Hi: 0x05c0, Stride: 2},
		{Lo: 0x05c3, Hi: 0x05c6, Stride: 3},
		{Lo: 0x05f3, Hi: 0x05f4, Stride: 1},
		{Lo: 0x0609, Hi: 0x060a, Stride: 1},
		{Lo: 0x060c, Hi: 0x060d, Stride: 1},
		{Lo: 0x061b, Hi: 0x061e, Stride: 3},
		{Lo: 0x061f, Hi: 0x066a, Stride: 75},
		{Lo: 0x066b, Hi: 0x066d, Stride: 1},
		{Lo: 0x06d4, Hi: 0x0700, Stride: 44},
		{Lo: 0x0701, Hi: 0x070d, Stride: 1},
		{Lo: 0x07f7, Hi: 0x07f9, Stride: 1},
		{Lo: 0x0830, Hi: 0x083e, Stride: 1},
		{Lo: 0x085e, Hi: 0x0964, Stride: 262},
		{Lo: 0x0965, Hi: 0x0970, Stride: 11},
		{Lo: 0x09fd, Hi: 0x0a76, Stride: 121},
		{Lo: 0x0af0, Hi: 0x0c84, Stride: 404},
		{Lo: 0x0df4, Hi: 0x0e4f, Stride: 91},
		{Lo: 0x0e5a, Hi: 0x0e5b, Stride: 1},
		{Lo: 0x0f04, Hi: 0x0f12, Stride: 1},
		{Lo: 0x0f14, Hi: 0x0f3a, Stride: 38},
		{Lo: 0x0f3b, Hi: 0x0f3d, Stride: 1},
		{Lo: 0x0f85, Hi: 0x0fd0, Stride: 75},
		{Lo: 0x0fd1, Hi: 0x0fd4, Stride: 1},
		{Lo: 0x0fd9, Hi: 0x0fda, Stride: 1},
		{Lo: 0x104a, Hi: 0x104f, Stride: 1},
		{Lo: 0x10fb, Hi: 0x1360, Stride: 613},
		{Lo: 0x1361, Hi: 0x1368, Stride: 1},
		{Lo: 0x1400, Hi: 0x166d, Stride: 621},
		{Lo: 0x166e, Hi: 0x169b, Stride: 45},
		{Lo: 0x169c, Hi: 0x16eb, Stride: 79},
		{Lo: 0x16ec, Hi: 0x16ed, Stride: 1},
		{Lo: 0x1735, Hi: 0x1736, Stride: 1},
		{Lo: 0x17d4, Hi: 0x17d6, Stride: 1},
		{Lo: 0x17d8, Hi: 0x17da, Stride: 1},
		{Lo: 0x1800, Hi: 0x180a, Stride: 1},
		{Lo: 0x1944, Hi: 0x1945, Stride: 1},
		{Lo: 0x1a1e, Hi: 0x1a1f, Stride: 1},
		{Lo: 0x1aa0, Hi: 0x1aa6, Stride: 1},
		{Lo: 0x1aa8, Hi: 0x1aad, Stride: 1},
		{Lo: 0x1b5a, Hi: 0x1b60, Stride: 1},
		{Lo: 0x1bfc, Hi: 0x1bff, Stride: 1},
		{Lo: 0x1c3b, Hi: 0x1c3f, Stride: 1},
		{Lo: 0x1c7e, Hi: 0x1c7f, Stride: 1},
		{Lo: 0x1cc0, Hi: 0x1cc7, Stride: 1},
		{Lo: 0x1cd3, Hi: 0x2010, Stride: 829},
		{Lo: 0x2011, Hi: 0x2027, Stride: 1},
		{Lo: 0x2030, Hi: 0x2043, Stride: 1},
		{Lo: 0x2045, Hi: 0x2051, Stride: 1},
		{Lo: 0x2053, Hi: 0x205e, Stride: 1},
		{Lo: 0x207d, Hi: 0x207e, Stride: 1},
		{Lo: 0x208d, Hi: 0x208e, Stride: 1},
		{Lo: 0x2308, Hi: 0x230b, Stride: 1},
		{Lo: 0x2329, Hi: 0x232a, Stride: 1},
		{Lo: 0x2768, Hi: 0x2775, Stride: 1},
		{Lo: 0x27c5, Hi: 0x27c6, Stride: 1},
		{Lo: 0x27e6, Hi: 0x27ef, Stride: 1},
		{Lo: 0x2983, Hi: 0x2998, Stride: 1},
		{Lo: 0x29d8, Hi: 0x29db, Stride: 1},
		{Lo: 0x29fc, Hi: 0x29fd, Stride: 1},
		{Lo: 0x2cf9, Hi: 0x2cfc, Stride: 1},
		{Lo: 0x2cfe, Hi: 0x2cff, Stride: 1},
		{Lo: 0x2d70, Hi: 0x2e00, Stride: 144},
		{Lo: 0x2e01, Hi: 0x2e2e, Stride: 1},
		{Lo: 0x2e30, Hi: 0x2e4e, Stride: 1},
		{Lo: 0x3001, Hi: 0x3003, Stride: 1},
		{Lo: 0x3008, Hi: 0x3011, Stride: 1},
		{Lo: 0x3014, Hi: 0x301f, Stride: 1},
		{Lo: 0x3030, Hi: 0x303d, Stride: 13},
		{Lo: 0x30a0, Hi: 0x30fb, Stride: 91},
		{Lo: 0xa4fe, Hi: 0xa4ff, Stride: 1},
		{Lo: 0xa60d, Hi: 0xa60f, Stride: 1},
		{Lo: 0xa673, Hi: 0xa67e, Stride: 11},
		{Lo: 0xa6f2, Hi: 0xa6f7, Stride: 1},
		{Lo: 0xa874, Hi: 0xa877, Stride: 1},
		{Lo: 0xa8ce, Hi: 0xa8cf, Stride: 1},
		{Lo: 0xa8f8, Hi: 0xa8fa, Stride: 1},
		{Lo: 0xa8fc, Hi: 0xa92e, Stride: 50},
		{Lo: 0xa92f, Hi: 0xa95f, Stride: 48},
		{Lo: 0xa9c1, Hi: 0xa9cd, Stride: 1},
		{Lo: 0xa9de, Hi: 0xa9df, Stride: 1},
		{Lo: 0xaa5c, Hi: 0xaa5f, Stride: 1},
		{Lo: 0xaade, Hi: 0xaadf, Stride: 1},
		{Lo: 0xaaf0, Hi: 0xaaf1, Stride: 1},
		{Lo: 0xabeb, Hi: 0xfd3e, Stride: 20819},
		{Lo: 0xfd3f, Hi: 0xfe10, Stride: 209},
		{Lo: 0xfe11, Hi: 0xfe19, Stride: 1},
		{Lo: 0xfe30, Hi: 0xfe52, Stride: 1},
		{Lo: 0xfe54, Hi: 0xfe61, Stride: 1},
		{Lo: 0xfe63, Hi: 0xfe68, Stride: 5},
		{Lo: 0xfe6a, Hi: 0xfe6b, Stride: 1},
		{Lo: 0xff01, Hi: 0xff03, Stride: 1},
		{Lo: 0xff05, Hi: 0xff0a, Stride: 1},
		{Lo: 0xff0c, Hi: 0xff0f, Stride: 1},
		{Lo: 0xff1a, Hi: 0xff1b, Stride: 1},
		{Lo: 0xff1f, Hi: 0xff20, Stride: 1},
		{Lo: 0xff3b, Hi: 0xff3d, Stride: 1},
		{Lo: 0xff3f, Hi: 0xff5b, Stride: 28},
		{Lo: 0xff5d, Hi: 0xff5f, Stride: 2},
		{Lo: 0xff60, Hi: 0xff65, Stride: 1},
    ],
	R32: [
		{Lo: 0x10100, Hi: 0x10102, Stride: 1},
		{Lo: 0x1039f, Hi: 0x103d0, Stride: 49},
		{Lo: 0x1056f, Hi: 0x10857, Stride: 744},
		{Lo: 0x1091f, Hi: 0x1093f, Stride: 32},
		{Lo: 0x10a50, Hi: 0x10a58, Stride: 1},
		{Lo: 0x10a7f, Hi: 0x10af0, Stride: 113},
		{Lo: 0x10af1, Hi: 0x10af6, Stride: 1},
		{Lo: 0x10b39, Hi: 0x10b3f, Stride: 1},
		{Lo: 0x10b99, Hi: 0x10b9c, Stride: 1},
		{Lo: 0x10f55, Hi: 0x10f59, Stride: 1},
		{Lo: 0x11047, Hi: 0x1104d, Stride: 1},
		{Lo: 0x110bb, Hi: 0x110bc, Stride: 1},
		{Lo: 0x110be, Hi: 0x110c1, Stride: 1},
		{Lo: 0x11140, Hi: 0x11143, Stride: 1},
		{Lo: 0x11174, Hi: 0x11175, Stride: 1},
		{Lo: 0x111c5, Hi: 0x111c8, Stride: 1},
		{Lo: 0x111cd, Hi: 0x111db, Stride: 14},
		{Lo: 0x111dd, Hi: 0x111df, Stride: 1},
		{Lo: 0x11238, Hi: 0x1123d, Stride: 1},
		{Lo: 0x112a9, Hi: 0x1144b, Stride: 418},
		{Lo: 0x1144c, Hi: 0x1144f, Stride: 1},
		{Lo: 0x1145b, Hi: 0x1145d, Stride: 2},
		{Lo: 0x114c6, Hi: 0x115c1, Stride: 251},
		{Lo: 0x115c2, Hi: 0x115d7, Stride: 1},
		{Lo: 0x11641, Hi: 0x11643, Stride: 1},
		{Lo: 0x11660, Hi: 0x1166c, Stride: 1},
		{Lo: 0x1173c, Hi: 0x1173e, Stride: 1},
		{Lo: 0x1183b, Hi: 0x11a3f, Stride: 516},
		{Lo: 0x11a40, Hi: 0x11a46, Stride: 1},
		{Lo: 0x11a9a, Hi: 0x11a9c, Stride: 1},
		{Lo: 0x11a9e, Hi: 0x11aa2, Stride: 1},
		{Lo: 0x11c41, Hi: 0x11c45, Stride: 1},
		{Lo: 0x11c70, Hi: 0x11c71, Stride: 1},
		{Lo: 0x11ef7, Hi: 0x11ef8, Stride: 1},
		{Lo: 0x12470, Hi: 0x12474, Stride: 1},
		{Lo: 0x16a6e, Hi: 0x16a6f, Stride: 1},
		{Lo: 0x16af5, Hi: 0x16b37, Stride: 66},
		{Lo: 0x16b38, Hi: 0x16b3b, Stride: 1},
		{Lo: 0x16b44, Hi: 0x16e97, Stride: 851},
		{Lo: 0x16e98, Hi: 0x16e9a, Stride: 1},
		{Lo: 0x1bc9f, Hi: 0x1da87, Stride: 7656},
		{Lo: 0x1da88, Hi: 0x1da8b, Stride: 1},
		{Lo: 0x1e95e, Hi: 0x1e95f, Stride: 1},
    ],
	LatinOffset: 11,
}

export const Space = {
	R16: [
		{Lo: 0x0020, Hi: 0x00a0, Stride: 128},
		{Lo: 0x1680, Hi: 0x2000, Stride: 2432},
		{Lo: 0x2001, Hi: 0x200a, Stride: 1},
		{Lo: 0x2028, Hi: 0x2029, Stride: 1},
		{Lo: 0x202f, Hi: 0x205f, Stride: 48},
		{Lo: 0x3000, Hi: 0x3000, Stride: 1},
    ],
	LatinOffset: 1,
}

export const Other = {
	R16: [
		{Lo: 0x0000, Hi: 0x001f, Stride: 1},
		{Lo: 0x007f, Hi: 0x009f, Stride: 1},
		{Lo: 0x00ad, Hi: 0x0600, Stride: 1363},
		{Lo: 0x0601, Hi: 0x0605, Stride: 1},
		{Lo: 0x061c, Hi: 0x06dd, Stride: 193},
		{Lo: 0x070f, Hi: 0x08e2, Stride: 467},
		{Lo: 0x180e, Hi: 0x200b, Stride: 2045},
		{Lo: 0x200c, Hi: 0x200f, Stride: 1},
		{Lo: 0x202a, Hi: 0x202e, Stride: 1},
		{Lo: 0x2060, Hi: 0x2064, Stride: 1},
		{Lo: 0x2066, Hi: 0x206f, Stride: 1},
		{Lo: 0xd800, Hi: 0xf8ff, Stride: 1},
		{Lo: 0xfeff, Hi: 0xfff9, Stride: 250},
		{Lo: 0xfffa, Hi: 0xfffb, Stride: 1},
    ],
	R32: [
		{Lo: 0x110bd, Hi: 0x110cd, Stride: 16},
		{Lo: 0x1bca0, Hi: 0x1bca3, Stride: 1},
		{Lo: 0x1d173, Hi: 0x1d17a, Stride: 1},
		{Lo: 0xe0001, Hi: 0xe0020, Stride: 31},
		{Lo: 0xe0021, Hi: 0xe007f, Stride: 1},
		{Lo: 0xf0000, Hi: 0xffffd, Stride: 1},
		{Lo: 0x100000, Hi: 0x10fffd, Stride: 1},
    ],
	LatinOffset: 2,
}
