/***********************
*** Helper Functions ***
************************/

import { nanoid } from "nanoid";

function randomNumBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/***********************
***** Color Naming *****
************************/

import DeltaE from "delta-e";
import hexNames from "./hex_names.json";

const getColorName = (hex) => {
	let closestColor = null;
	let smallestDistance = Infinity;

	for (const dbColor in hexNames) {
		const color1 = {
			L: parseInt(hex.slice(1, 3), 16),
			A: parseInt(hex.slice(3, 5), 16),
			B: parseInt(hex.slice(5, 7), 16),
		};

		const color2 = {
			L: parseInt(dbColor.slice(1, 3), 16),
			A: parseInt(dbColor.slice(3, 5), 16),
			B: parseInt(dbColor.slice(5, 7), 16),
		};

		const distance = DeltaE.getDeltaE94(color1, color2);

		if (distance < smallestDistance) {
			smallestDistance = distance;
			closestColor = dbColor;
		}
	}

	return hexNames[closestColor];
};

/***********************
*** Color Conversion ***
************************/

function hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // When saturation is 0%, it's a shade of grey
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function hslToHex(h, s, l) {
    const [r, g, b] = hslToRgb(h / 360, s / 100, l / 100);
    return rgbToHex(r, g, b);
}

export const hexToHSL = (hex) => {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];
    } else if (hex.length === 7) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
    }
    r /= 255;
    g /= 255;
    b /= 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        let delta = max - min;
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
        switch (max) {
            case r:
                h = (g - b) / delta + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / delta + 2;
                break;
            case b:
                h = (r - g) / delta + 4;
                break;
        }
        h /= 6;
    }
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    h = +(h * 360).toFixed(1);
    return [h, s, l];
}

/*********************
*** Event Handlers ***
**********************/

export function copyToClipboard(text) {
  navigator.clipboard.writeText(text).catch(err => {
    console.error('Could not copy text: ', err);
  });
}

/*************************
*** Palette Generation ***
**************************/

export const generatePalette = (seedColor, mode, count) => {
  console.log("Palette generated!");
  if (colorFunctions[mode] === getRandomColors) {
    return getRandomColors(count)
  } else if (colorFunctions[mode]) {
    return colorFunctions[mode](seedColor, count);
  } else {
    console.error(`${mode} is not an accepted color mode!`);
  }
};

export const getRandomColors = (count) => {
  const randomColors = [];
  for (let i = 0; i < count; i++) {
    const randomHue = randomNumBetween(0, 360);
    console.log(randomHue);
    const randomSaturation = Math.min(Math.max(randomNumBetween(0, 100), 20), 80);
    const randomLightness = Math.min(Math.max(randomNumBetween(0, 100), 10), 90);
    const hexValue = hslToHex(randomHue, randomSaturation, randomLightness)
    const randomColor = {
      id: nanoid(),
      hsl: {
        hue: randomHue,
        saturation: randomSaturation,
        lightness: randomLightness,
      },
      hex: hexValue,
      name: getColorName(hexValue),
      isLocked: false,
    };
    randomColors.push(randomColor);
  }
  console.log(randomColors);
  return randomColors
}

export const getVibrantColors = (hsl, count) => {
  const vibrantColors = [];
  for (let i = 0; i < count; i++) {
    const vibrantHue = randomNumBetween(0, 360);
    const vibrantSaturation = randomNumBetween(70, 100); 
    const vibrantLightness = randomNumBetween(40, 60); 
    const hexValue = hslToHex(vibrantHue, vibrantSaturation, vibrantLightness)
    const vibrantColor = {
      id: nanoid(),
      hsl: {
        hue: vibrantHue,
        saturation: vibrantSaturation,
        lightness: vibrantLightness,
      },
      hex: hexValue,
      name: getColorName(hexValue),
      isLocked: false,
    };
    vibrantColors.push(vibrantColor);
  }
  console.log(vibrantColors);
  return vibrantColors
}

export const getPastelColors = (hsl, count) => {
    const pastelColors = [];
    for (let i = 0; i < count; i++) {
        const pastelHue = randomNumBetween(0, 360);
        const pastelSaturation = Math.min(Math.max(randomNumBetween(0, 100), 20), 50);
        const pastelLightness = Math.min(Math.max(randomNumBetween(0, 100), 70), 90);
        const hexValue = hslToHex(pastelHue, pastelSaturation, pastelLightness)    
        const pastelColor = {
      id: nanoid(),
      hsl: {
        hue: pastelHue,
        saturation: pastelSaturation,
        lightness: pastelLightness,
      },
      hex: hexValue,
      name: getColorName(hexValue),
      isLocked: false,
    };
    pastelColors.push(pastelColor);
  }
  console.log(pastelColors);
  return pastelColors
}

export const getAnalogousColors = (hsl, count) => {
  const analogicColors = [];
  const variationRange = 10;

  for (let i = 0; i < count; i++) {
    let analogousHue;
    const saturationVariation = randomNumBetween(-variationRange, variationRange)
    const lightnessVariation = randomNumBetween(-variationRange, variationRange)

    switch (i % 5) {
      case 0: // Base color
        analogousHue = hsl.hue + randomNumBetween(-variationRange, variationRange)
        break;
      case 1: // Analogic variation -30
        analogousHue = (hsl.hue - 30 + randomNumBetween(-variationRange, variationRange)) % 360;
        break;
      case 2: // Analogic variation +30
        analogousHue = (hsl.hue + 30 + randomNumBetween(-variationRange, variationRange)) % 360;
        break;
      case 3: // Analogic variation -60
        analogousHue = (hsl.hue - 60 + randomNumBetween(-variationRange, variationRange)) % 360;
        break;
      case 4: // Analogic variation +60
        analogousHue = (hsl.hue + 60 + randomNumBetween(-variationRange, variationRange)) % 360;
        break;
    }

    const analogousSaturation = Math.min(Math.max(hsl.saturation + saturationVariation, 20), 80);
    const analogousLightness = Math.min(Math.max(hsl.lightness + lightnessVariation, 10), 90);

    const hexValue = hslToHex(analogousHue, analogousSaturation, analogousLightness)
    const color = {
      id: nanoid(),
      hsl: {
        hue: analogousHue,
        saturation: analogousSaturation,
        lightness: analogousLightness,
      },
      hex: hexValue,
      name: getColorName(hexValue),
      isLocked: false,
    };

    analogicColors.push(color);
  }

  console.log(analogicColors);
  return analogicColors;
};


export const getAnalogousComplementaryColors = (hsl, count) => {
  const analogicComplementaryColors = [];
  const variationRange = 10;

  for (let i = 0; i < count; i++) {
    let analogousComplementaryHue;
    const saturationVariation = randomNumBetween(-variationRange, variationRange);
    const lightnessVariation = randomNumBetween(-variationRange, variationRange);

    // Maybe add some random variation here rather than just having directly analogic colors to the complementary
    switch (i % 6) {
      case 0: // Base color
        analogousComplementaryHue = hsl.hue + randomNumBetween(-variationRange, variationRange);
        break;
      case 1: // Complementary color
        analogousComplementaryHue = (hsl.hue + 180) % 360;
        break;
      case 2: // Analogic to the complementary (+30)
        analogousComplementaryHue = (hsl.hue + 180 + 30) % 360;
        break;
      case 3: // Analogic to the complementary (-30)
        analogousComplementaryHue = (hsl.hue + 180 - 30) % 360;
        break;
      case 4: // Analogic to the complementary (+60)
        analogousComplementaryHue = (hsl.hue + 180 + 60) % 360;
        break;
      case 5: // Analogic to the complementary (-60)
        analogousComplementaryHue = (hsl.hue + 180 - 60) % 360;
        break;
    }

    const analogousComplementarySaturation = Math.min(Math.max(hsl.saturation + saturationVariation, 20), 80);
    const analogousComplementaryLightness = Math.min(Math.max(hsl.lightness + lightnessVariation, 10), 90);

    const hexValue = hslToHex(analogousComplementaryHue, analogousComplementarySaturation, analogousComplementaryLightness)
    const color = {
      id: nanoid(),
      hsl: {
        hue: analogousComplementaryHue,
        saturation: analogousComplementarySaturation,
        lightness: analogousComplementaryLightness,
      },
      hex: hexValue,
      name: getColorName(hexValue),
      isLocked: false,
    };

    analogicComplementaryColors.push(color);
  }

  console.log(analogicComplementaryColors);
  return analogicComplementaryColors;
};

export const getComplementaryColors = (hsl, count) => {
  const complementaryColors = [];
  const variationRange = 10;

  let previousHue = hsl.hue; // Starting with the initial hue

  for (let i = 0; i < count; i++) {
    const hueVariation = randomNumBetween(-variationRange, variationRange);
    const saturationVariation = randomNumBetween(-variationRange, variationRange);
    const lightnessVariation = randomNumBetween(-variationRange, variationRange);

    const complementaryHue = (previousHue + 180 + hueVariation) % 360; // Find the complementary hue and add random variation
    const complementarySaturation = Math.min(Math.max(hsl.saturation + saturationVariation, 20), 80); // Ensure saturation doesn't get too low or too high
    const complementaryLightness = Math.min(Math.max(hsl.lightness + lightnessVariation, 10), 90);  // Maintain a pleasing range for lightness

    const hexValue = hslToHex(complementaryHue, complementarySaturation, complementaryLightness)
    const complementaryColor = {
      id: nanoid(),
      hsl: {
        hue: complementaryHue,
        saturation: complementarySaturation,
        lightness: complementaryLightness,
      },
      hex: hexValue,
      name: getColorName(hexValue),
      isLocked: false,
    };
    complementaryColors.push(complementaryColor);

    previousHue = complementaryHue; // Set the hue for the next iteration
  }

  console.log(complementaryColors);
  return complementaryColors;
};

export const getSplitComplementaryColors = (hsl, count) => {
  const splitComplementaryColors = [];
  const variationRange = 10;
  const splitAngle = 30; // the angle of divergence on either side of the direct complement

  for (let i = 0; i < count; i++) {
    const hueVariation = randomNumBetween(-variationRange, variationRange);
    const saturationVariation = randomNumBetween(-variationRange, variationRange);
    const lightnessVariation = randomNumBetween(-variationRange, variationRange);
    let splitComplementaryHue = hsl.hue;

    switch (i % 3) {
      case 0:
        splitComplementaryHue += hueVariation; // Slight variation of the seed color
        break;
      case 1:
        splitComplementaryHue = (hsl.hue + 180 + splitAngle + hueVariation) % 360; // First split-complementary
        break;
      case 2:
        splitComplementaryHue = (hsl.hue + 180 - splitAngle + hueVariation) % 360; // Second split-complementary
        break;
      default:
        break;
    }

    const splitComplementarySaturation = Math.min(Math.max(hsl.saturation + saturationVariation, 20), 80);
    const splitComplementaryLightness = Math.min(Math.max(hsl.lightness + lightnessVariation, 10), 90);

    const hexValue = hslToHex(splitComplementaryHue, splitComplementarySaturation, splitComplementaryLightness)
    const splitComplementaryColor = {
      id: nanoid(),
      hsl: {
        hue: splitComplementaryHue,
        saturation: splitComplementarySaturation,
        lightness: splitComplementaryLightness,
      },
      hex: hexValue,
      name: getColorName(hexValue),
      isLocked: false,
    };
    
    splitComplementaryColors.push(splitComplementaryColor);
  }

  console.log(splitComplementaryColors);
  return splitComplementaryColors;
};


export const getMonochromeColors = (hsl, count) => {
  const monochromeColors = [];
  const variationRange = 20 

  for (let i = 0; i < count; i++) {
    const hueVariation = randomNumBetween(-12, 12); 
    const saturationVariation = randomNumBetween(-variationRange, variationRange);
    const lightnessVariation = randomNumBetween(-variationRange, variationRange);

    const monochromeHue = (hsl.hue + hueVariation) % 360;  // Ensuring hue remains within 0-360 range
    const monochromeSaturation = Math.min(Math.max(hsl.saturation + saturationVariation, 0), 100);  // Clamping between 0 and 100
    const monochromeLightness = Math.min(Math.max(hsl.lightness + lightnessVariation, 0), 100);  // Clamping between 0 and 100

    const hexValue = hslToHex(monochromeHue, monochromeSaturation, monochromeLightness)
    const monochromeColor = {
      id: nanoid(),
      hsl: {
        hue: monochromeHue,
        saturation: monochromeSaturation,
        lightness: monochromeLightness,
      },
      hex: hexValue,
      name: getColorName(hexValue),
      isLocked: false,
    };

    monochromeColors.push(monochromeColor);
  }
  console.log(monochromeColors);
  return monochromeColors
};

export const getDarkMonochromeColors = (hsl, count) => {
  
  const monochromeDarkColors = [];
  const variationRange = 14;

  for (let i = 0; i < count; i++) {
    
    const hueVariation = randomNumBetween(-10, 10);
    const saturationVariation = randomNumBetween(-variationRange, variationRange);
    const lightnessDecrease = Math.random() * 20; // Random value to decrease lightness by up to 20 points.
    const lightnessVariation = randomNumBetween(-variationRange, variationRange) - lightnessDecrease;
    
    const monochromeDarkHue = (hsl.hue + hueVariation) % 360;
    const monochromeDarkSaturation = Math.min(Math.max(hsl.saturation + saturationVariation, 20), 80); // Ensure saturation doesn't get too low or too high
    const monochromeDarkLightness = Math.min(Math.max(hsl.lightness + lightnessVariation, 5), 70);  // Biasing towards darker values

    const hexValue = hslToHex(monochromeDarkHue, monochromeDarkSaturation, monochromeDarkLightness)
    const monochromeDarkColor = {
      id: nanoid(),
      hsl: {
        hue: monochromeDarkHue,
        saturation: monochromeDarkSaturation,
        lightness: monochromeDarkLightness,
      },
      hex: hexValue,
      name: getColorName(hexValue),
      isLocked: false,
    };
    monochromeDarkColors.push(monochromeDarkColor);
  }
  console.log(monochromeDarkColors);
  return monochromeDarkColors
};

export const getLightMonochromeColors = (hsl, count) => {
  
  const monochromeLightColors = [];
  const variationRange = 14;

  for (let i = 0; i < count; i++) {
    
    const hueVariation = randomNumBetween(-10, 10);
    const saturationVariation = randomNumBetween(-variationRange, variationRange);
    const lightnessIncrease = Math.random() * 20; // Random value to increase lightness by up to 20 points.
    const lightnessVariation = randomNumBetween(-variationRange, variationRange) + lightnessIncrease;
    
    const monochromeLightHue = (hsl.hue + hueVariation) % 360;
    const monochromeLightSaturation = Math.min(Math.max(hsl.saturation + saturationVariation, 20), 80); // Ensure saturation doesn't get too low or too high
    const monochromeLightLightness = Math.min(Math.max(hsl.lightness + lightnessVariation, 30), 95);  // Biasing towards lighter values

    const hexValue = hslToHex(monochromeLightHue, monochromeLightSaturation, monochromeLightLightness)
    const monochromeLightColor = {
      id: nanoid(),
      hsl: {
        hue: monochromeLightHue,
        saturation: monochromeLightSaturation,
        lightness: monochromeLightLightness,
      },
      hex: hexValue,
      name: getColorName(hexValue),
      isLocked: false,
    };
    monochromeLightColors.push(monochromeLightColor);
  }
  console.log(monochromeLightColors);
  return monochromeLightColors
};

export const getTriadicColors = (hsl, count) => {
  const triadicColors = [];
  const variationRange = 10;

  for (let i = 0; i < count; i++) {
    let TriadicHue;
    let saturationVariation = randomNumBetween(-variationRange, variationRange);
    let lightnessVariation = randomNumBetween(-variationRange, variationRange);

    switch (i % 3) {
      case 0: // Base color
        triadicHue = hsl.hue + randomNumBetween(-variationRange, variationRange);
        break;
      case 1: // Triadic +120°
        triadicHue = (hsl.hue + 120) % 360;
        break;
      case 2: // Triadic +240°
        triadicHue = (hsl.hue + 240) % 360;
        break;
    }

    const triadicSaturation = Math.min(Math.max(hsl.saturation + saturationVariation, 20), 80);
    const triadicLightness = Math.min(Math.max(hsl.lightness + lightnessVariation, 10), 90);

    const hexValue = hslToHex(triadicHue, triadicSaturation, triadicLightness)
    const color = {
      id: nanoid(),
      hsl: {
        hue: triadicHue,
        saturation: triadicSaturation,
        lightness: triadicLightness,
      },
      hex: hexValue,
      name: getColorName(hexValue),
      isLocked: false,
    };

    triadicColors.push(color);
  }

  console.log(triadicColors);
  return triadicColors;
};

export const getTetradicColors = (hsl, count) => {
  const tetradicColors = [];
  const variationRange = 10;

  for (let i = 0; i < count; i++) {
    let tetradicHue;
    let saturationVariation = randomNumBetween(-variationRange, variationRange);
    let lightnessVariation = randomNumBetween(-variationRange, variationRange);

    switch (i % 4) {
      case 0: // Base color
        tetradicHue = hsl.hue + randomNumBetween(-variationRange, variationRange);
        break;
      case 1: // Tetradic +90°
        tetradicHue = (hsl.hue + 90) % 360;
        break;
      case 2: // Tetradic +180°
        tetradicHue = (hsl.hue + 180) % 360;
        break;
      case 3: // Tetradic +270°
        tetradicHue = (hsl.hue + 270) % 360;
        break;
    }

    const tetradicSaturation = Math.min(Math.max(hsl.saturation + saturationVariation, 20), 80);
    const tetradicLightness = Math.min(Math.max(hsl.lightness + lightnessVariation, 10), 90);

    const hexValue = hslToHex(tetradicHue, tetradicSaturation, tetradicLightness)
    const color = {
      id: nanoid(),
      hsl: {
        hue: tetradicHue,
        saturation: tetradicSaturation,
        lightness: tetradicLightness,
      },
      hex: hexValue,
      name: getColorName(hexValue),
      isLocked: false,
    };

    tetradicColors.push(color);
  }

  console.log(tetradicColors);
  return tetradicColors;
};

const colorFunctions = {
    Random: getRandomColors,
    Vibrant: getVibrantColors,
    Pastel: getPastelColors,
		Complementary: getComplementaryColors,
		SplitComplementary: getSplitComplementaryColors,
		Analogous: getAnalogousColors,
		AnalogousComplementary: getAnalogousComplementaryColors,
		Monochrome: getMonochromeColors,
		DarkMonochrome: getDarkMonochromeColors,
		LightMonochrome: getLightMonochromeColors,
		Triadic: getTriadicColors,
		Tetradic: getTetradicColors,
	};


