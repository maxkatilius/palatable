import { nanoid } from "nanoid";
import chroma from "chroma-js"

/***********************
*** Helper Functions ***
************************/


function randomNumBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
}


/***********************
***** Color Naming *****
************************/


import hexNames from "./hexNames.json";

const findClosestColorName = (hexValue) => {
    let low = 0,
        high = hexNames.length - 1
    let closestMatch = Number.MAX_SAFE_INTEGER,
        closestName = ""
    while (low <= high) {
        const mid = Math.floor((low + high) / 2)
        const colorDifference = chroma.deltaE(hexValue, hexNames[mid].hex)
        if (colorDifference < closestMatch) {
            closestMatch = colorDifference
            closestName = hexNames[mid].name
        }
        if (colorDifference === 0) {
            break
        }
        if (hexValue > hexNames[mid].hex) {
            low = mid + 1
        } else {
            high = mid - 1
        }
    }
    return closestName
}

// const getColorNameFromLAB = (l, a, b) => {
//   console.log("1")
//   let closestColor = null;
//   let smallestDistance = Infinity;
  
//   for (const dbColor in hexNames) {
//     const labOfDbColor = chroma(dbColor).lab()
//       console.log("2")

    
//     const color1 = { L: l, A: a, B: b };
//     const color2 = { L: labOfDbColor[0], A: labOfDbColor[1], B: labOfDbColor[2] };
    
//     const distance = DeltaE.getDeltaE94(color1, color2);
    
//     if (distance < smallestDistance) {
//       smallestDistance = distance;
//       closestColor = dbColor;
//     }
//   }

//   console.log(closestColor)
  
//   return hexNames[closestColor];
// };

const Chroma = (colorInput) => {
    if (!chroma.valid(colorInput)) {
      console.log("invalid")
        return "Invalid Color";
    }

    const labColor = chroma(colorInput).lab();
    const name = getColorNameFromLAB(labColor[0], labColor[1], labColor[2]);

    return name;
};

export default Chroma;

/***********************
 *** Color Conversion ***
************************/

export function hslToRgb(h, s, l) {
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

export function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

export function hslToHex(h, s, l) {
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

export function getLuminance(h, s, l) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // Achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luminance;
}

export function getContrastingTextColor(h, s, l) {
  const luminance = getLuminance(h / 360, s / 100, l / 100);
  return luminance > 0.5 ? "#030202" : "#F0F0F0";
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

const createColor = (hue, saturation, lightness) => {
  const hexValue = hslToHex(hue, saturation, lightness);
  const textColor = getContrastingTextColor(hue, saturation, lightness);
  return {
    id: nanoid(),
    hsl: { hue, saturation, lightness },
    hex: hexValue,
    name: findClosestColorName(hexValue),
    textColor: textColor,
    isLocked: false
  };
};



export const generateColors = (seedColor, mode, count, filter) => {
  let colors;
    if (colorFunctions[mode]) {
        colors = colorFunctions[mode](seedColor, count);
    } else {
        console.error(`${mode} is not an accepted color mode!`);
        return;
    }
    if (filterFunctions[filter]) {
    colors = colors.map(color => {
        const filteredColor = filterFunctions[filter](color);
        filteredColor.textColor = getContrastingTextColor(
            filteredColor.hsl.hue,
            filteredColor.hsl.saturation,
            filteredColor.hsl.lightness
        );
        return filteredColor;
    });
    } else if (filter !== "None") { // If filter is "None", we won't modify colors
        console.error(`${filter} is not an accepted filter!`);
    }
    return shuffleArray(colors);
};

export const getRandomColors = (hsl, count) => {
  const randomColors = [];
  for (let i = 0; i < count; i++) {
    const randomHue = randomNumBetween(0, 360);
    const randomSaturation = Math.min(Math.max(randomNumBetween(0, 100), 20), 80);
    const randomLightness = Math.min(Math.max(randomNumBetween(0, 100), 10), 90);
    randomColors.push(createColor(randomHue, randomSaturation, randomLightness));
  }
  return randomColors
}

export const getRandomColor = () => {
    const randomHue = randomNumBetween(0, 360);
    const randomSaturation = Math.min(Math.max(randomNumBetween(0, 100), 20), 80);
    const randomLightness = Math.min(Math.max(randomNumBetween(0, 100), 10), 90);
    return createColor(randomHue, randomSaturation, randomLightness)
}

export const getAnalogousColors = (hsl, count) => {
  const analogicColors = [];
  const variationRange = 10;

  for (let i = 0; i < count; i++) {
    const saturationVariation = randomNumBetween(-variationRange, variationRange)
    const lightnessVariation = randomNumBetween(-variationRange, variationRange)
    
    let analogousHue;
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

    analogicColors.push(createColor(analogousHue, analogousSaturation, analogousLightness));
  }
  return analogicColors;
};

export const getAnalogousColor = (hsl) => {
  const variationRange = 10;
    const saturationVariation = randomNumBetween(-variationRange, variationRange)
    const lightnessVariation = randomNumBetween(-variationRange, variationRange)
    
    const analogousHue = hsl.hue + 30 + randomNumBetween(-variationRange, variationRange)
    const analogousSaturation = Math.min(Math.max(hsl.saturation + saturationVariation, 20), 80);
    const analogousLightness = Math.min(Math.max(hsl.lightness + lightnessVariation, 10), 90);

    return createColor(analogousHue, analogousSaturation, analogousLightness)
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
    complementaryColors.push(createColor(complementaryHue, complementarySaturation, complementaryLightness));

    previousHue = complementaryHue; // Set the hue for the next iteration
  }
  return complementaryColors;
};

export const getComplementaryColor = (hsl) => {
  const variationRange = 10;
    const hueVariation = randomNumBetween(-variationRange, variationRange);
    const saturationVariation = randomNumBetween(-variationRange, variationRange);
    const lightnessVariation = randomNumBetween(-variationRange, variationRange);

    const complementaryHue = (hsl.hue + 180 + hueVariation) % 360; // Find the complementary hue and add random variation
    const complementarySaturation = Math.min(Math.max(hsl.saturation + saturationVariation, 20), 80); // Ensure saturation doesn't get too low or too high
    const complementaryLightness = Math.min(Math.max(hsl.lightness + lightnessVariation, 10), 90);  // Maintain a pleasing range for lightness

    return createColor(complementaryHue, complementarySaturation, complementaryLightness)
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

    splitComplementaryColors.push(createColor(splitComplementaryHue, splitComplementarySaturation, splitComplementaryLightness));
  }
  return splitComplementaryColors;
};

export const getSplitComplementaryColor = (hsl) => {Z
  const variationRange = 10;
  const splitAngle = 30; // the angle of divergence on either side of the direct complement

  const hueVariation = randomNumBetween(-variationRange, variationRange);
  const saturationVariation = randomNumBetween(-variationRange, variationRange);
  const lightnessVariation = randomNumBetween(-variationRange, variationRange);
  
  const randomiseSplit = Math.random() < 0.5 ? 1 : -1;
  const splitComplementaryHue = (hsl.hue + 180 + splitAngle + (hueVariation * randomiseSplit)) % 360
  const splitComplementarySaturation = Math.min(Math.max(hsl.saturation + saturationVariation, 20), 80);
  const splitComplementaryLightness = Math.min(Math.max(hsl.lightness + lightnessVariation, 10), 90);

  return createColor(splitComplementaryHue, splitComplementarySaturation, splitComplementaryLightness)
};

export const getMonochromaticColors = (hsl, count) => {
  const monochromaticColors = [];
  const variationRange = 20 

  for (let i = 0; i < count; i++) {
    const hueVariation = randomNumBetween(-8, 8); 
    const saturationVariation = randomNumBetween(-variationRange, variationRange);
    const lightnessVariation = randomNumBetween(-variationRange, variationRange);

    const monochromaticHue = (hsl.hue + hueVariation) % 360;  // Ensuring hue remains within 0-360 range
    const monochromaticSaturation = Math.min(Math.max(hsl.saturation + saturationVariation, 0), 100);  // Clamping between 0 and 100
    const monochromaticLightness = Math.min(Math.max(hsl.lightness + lightnessVariation, 0), 100);  // Clamping between 0 and 100
    monochromaticColors.push(createColor(monochromaticHue, monochromaticSaturation, monochromaticLightness));
  }
  return monochromaticColors
};

export const getTriadicColors = (hsl, count) => {
  const triadicColors = [];
  const variationRange = 10;

  for (let i = 0; i < count; i++) {
    let saturationVariation = randomNumBetween(-variationRange, variationRange);
    let lightnessVariation = randomNumBetween(-variationRange, variationRange);
    
    let triadicHue;
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
    triadicColors.push(createColor(triadicHue, triadicSaturation, triadicLightness))
  };
  return triadicColors
}

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

    tetradicColors.push(createColor(tetradicHue, tetradicSaturation, tetradicLightness));
  }
  return tetradicColors;
};

const getWarmColor = () => {
    const MIN_HUE = 0;
    const MAX_HUE = 50;
    const MIN_SATURATION = 60;
    const MAX_SATURATION = 90;
    const MIN_LIGHTNESS = 30;
    const MAX_LIGHTNESS = 70;

    const hue = randomNumBetween(MIN_HUE, MAX_HUE);
    const saturation = randomNumBetween(MIN_SATURATION, MAX_SATURATION);
    const lightness = randomNumBetween(MIN_LIGHTNESS, MAX_LIGHTNESS);

    return createColor(hue, saturation, lightness);
};

const getCoolColor = () => {
    const MIN_HUE = 180;
    const MAX_HUE = 280;
    const MIN_SATURATION = 30;
    const MAX_SATURATION = 90;
    const MIN_LIGHTNESS = 20;
    const MAX_LIGHTNESS = 80;

    const hue = randomNumBetween(MIN_HUE, MAX_HUE);
    const saturation = randomNumBetween(MIN_SATURATION, MAX_SATURATION);
    const lightness = randomNumBetween(MIN_LIGHTNESS, MAX_LIGHTNESS);

    return createColor(hue, saturation, lightness);
};


export const getWarmCoolColors = (hsl, count) => {
    const warmCoolColors = [];
    for (let i = 0; i < count; i++) {
        let color;

        if (i % 2 === 0) {  // Warm Color
            color = getWarmColor();
        } else {  // Cool Color
            color = getCoolColor();
        }

        warmCoolColors.push(color);
    }
    return warmCoolColors;
};

export const getWarmCoolColor = () => {
    const randomChoice = Math.random();

    if (randomChoice < 0.5) {
        return getWarmColor();
    } else {
        return getCoolColor();
    }
};

const colorFunctions = {
    Random: getRandomColors,
		Complementary: getComplementaryColors,
		SplitComplementary: getSplitComplementaryColors,
		Analogous: getAnalogousColors,
		Monochromatic: getMonochromaticColors,
		Triadic: getTriadicColors,
		Tetradic: getTetradicColors,
    WarmCool: getWarmCoolColors,
	};

const filterFunctions = {
    Light: (color) => {
        color.hsl.lightness = Math.min(color.hsl.lightness + 30, 90);

        // Reduce saturation as the lightness increases. 
        // This will linearly scale the saturation from its current value to 70% of its value 
        // as the lightness goes from 60 to 90.
        if (color.hsl.lightness > 60) {
            const scaleFactor = 1 - 0.1 * (color.hsl.lightness - 60) / 30;
            color.hsl.saturation *= scaleFactor;
        }

        color.hsl.saturation = Math.min(Math.max(color.hsl.saturation, 10), 90);

        color.hex = hslToHex(color.hsl.hue, color.hsl.saturation, color.hsl.lightness);
        color.name = findClosestColorName(color.hex);
        return color;
    },
    Dark: (color) => {
        color.hsl.lightness = Math.max(color.hsl.lightness - 30, 10);

        // Increase saturation as the lightness decreases. 
        // This will linearly scale the saturation from its current value to 130% of its value 
        // as the lightness goes from 40 down to 10.
        if (color.hsl.lightness < 40) {
            const scaleFactor = 1 + 0.3 * (40 - color.hsl.lightness) / 30;
            color.hsl.saturation *= scaleFactor;
        }

        color.hsl.saturation = Math.min(Math.max(color.hsl.saturation, 10), 90);

        color.hex = hslToHex(color.hsl.hue, color.hsl.saturation, color.hsl.lightness);
        color.name = findClosestColorName(color.hex);
        return color;
    },
    Cool: (color) => {
        const MIN_HUE = 180;
        const MAX_HUE = 280;
        const MIN_SATURATION = 30;
        const MAX_SATURATION = 90;
        const MIN_LIGHTNESS = 20;
        const MAX_LIGHTNESS = 80;

        color.hsl.hue = randomNumBetween(MIN_HUE, MAX_HUE);
        color.hsl.saturation = randomNumBetween(MIN_SATURATION, MAX_SATURATION);
        color.hsl.lightness = randomNumBetween(MIN_LIGHTNESS, MAX_LIGHTNESS);
        
        color.hex = hslToHex(color.hsl.hue, color.hsl.saturation, color.hsl.lightness);
        color.name = findClosestColorName(color.hex);
        return color;
    },
    Warm: (color) => {
        const MIN_HUE = 0;
        const MAX_HUE = 50;
        const MIN_SATURATION = 60;
        const MAX_SATURATION = 90;
        const MIN_LIGHTNESS = 30;
        const MAX_LIGHTNESS = 70;

        color.hsl.hue = randomNumBetween(MIN_HUE, MAX_HUE);
        color.hsl.saturation = randomNumBetween(MIN_SATURATION, MAX_SATURATION);
        color.hsl.lightness = randomNumBetween(MIN_LIGHTNESS, MAX_LIGHTNESS);
        
        color.hex = hslToHex(color.hsl.hue, color.hsl.saturation, color.hsl.lightness);
        color.name = findClosestColorName(color.hex);
        return color;
    },
    Vibrant: (color) => {
        // Adjusting saturation to be more vibrant.
        color.hsl.saturation = Math.min(Math.max(color.hsl.saturation + 20, 70), 100);

        // Adjusting lightness based on its current value:
        // - If it's too dark (less than 20), increase it slightly to make it more visible.
        // - If it's too light (more than 85), decrease it slightly to avoid being too washed out.
        if (color.hsl.lightness < 20) {
            color.hsl.lightness += 10;
        } else if (color.hsl.lightness > 85) {
            color.hsl.lightness -= 5;
        }

        color.hex = hslToHex(color.hsl.hue, color.hsl.saturation, color.hsl.lightness);
        color.name = findClosestColorName(color.hex);
        return color;
    },
    Muted: (color) => {
        // Adjusting saturation non-linearly.
        if (color.hsl.saturation > 80) {
            color.hsl.saturation -= 30; // More reduction for highly saturated colors
        } else {
            color.hsl.saturation = Math.max(color.hsl.saturation - 20, 10);
        }

        // Adjusting lightness:
        // - If it's too bright (more than 80), decrease it slightly.
        // - If it's too dark (less than 20), increase it slightly.
        if (color.hsl.lightness > 80) {
            color.hsl.lightness -= 10;
        } else if (color.hsl.lightness < 20) {
            color.hsl.lightness += 10;
        }

        color.hsl.saturation = Math.min(color.hsl.saturation, 40);

        color.hex = hslToHex(color.hsl.hue, color.hsl.saturation, color.hsl.lightness);
        color.name = findClosestColorName(color.hex);
        return color;
    },
    Neon: (color) => {
        color.hsl.saturation = Math.min(color.hsl.saturation * 1.3, 100);
        color.hsl.lightness = Math.min(color.hsl.lightness * 1.3, 90);
        color.hex = hslToHex(color.hsl.hue, color.hsl.saturation, color.hsl.lightness);
        color.name = findClosestColorName(color.hex);
        return color;
    },
    Pastel: (color) => {
        color.hsl.saturation = Math.min(Math.max(color.hsl.saturation - 30, 20), 50);
        color.hsl.lightness = Math.min(Math.max(color.hsl.lightness + 30, 70), 90);
        color.hex = hslToHex(color.hsl.hue, color.hsl.saturation, color.hsl.lightness);
        color.name = findClosestColorName(color.hex);
        return color;
    },
    Rich: (color) => {
        color.hsl.saturation += 35;
        color.hex = hslToHex(color.hsl.hue, color.hsl.saturation, color.hsl.lightness);
        color.name = findClosestColorName(color.hex);
        return color;
    },
    Metallic: (color) => {
        color.hsl.saturation = Math.max(0, color.hsl.saturation - 30);
        color.hsl.lightness = Math.min(100, color.hsl.lightness + 15);
        color.hex = hslToHex(color.hsl.hue, color.hsl.saturation, color.hsl.lightness);
         color.name = findClosestColorName(color.hex);
        return color;
    },
    Vintage: (color) => {
        color.hsl.saturation = Math.max(color.hsl.saturation - 30, 20);  // desaturate slightly
        color.hsl.hue = (color.hsl.hue + 20) % 360;  // slight shift in hue for a nostalgic touch
        color.hex = hslToHex(color.hsl.hue, color.hsl.saturation, color.hsl.lightness);
        color.name = findClosestColorName(color.hex);
        return color;
    },
};

