export const getVibrantColors = (hsl, count) => {
  const vibrantColors = [];
  for (let i = 0; i < count; i++) {
    const vibrantHue = randomNumBetween(0, 360);
    const vibrantSaturation = randomNumBetween(70, 100); 
    const vibrantLightness = randomNumBetween(40, 60); 
    vibrantColors.push(createColor(vibrantHue, vibrantSaturation, vibrantLightness));
  }
  return vibrantColors
}

export const getVibrantColor = () => {
    const vibrantHue = randomNumBetween(0, 360);
    const vibrantSaturation = randomNumBetween(70, 100); 
    const vibrantLightness = randomNumBetween(40, 60); 
    return vibrantColor(vibrantHue, vibrantSaturation, vibrantLightness)
}


// update the distribution of randomness between 20 and 50

export const getPastelColors = (hsl, count) => {
    const pastelColors = [];

    for (let i = 0; i < count; i++) {

        const pastelHue = randomNumBetween(0, 360);
        const pastelSaturation = Math.min(Math.max(randomNumBetween(0, 100), 20), 50);
        const pastelLightness = Math.min(Math.max(randomNumBetween(0, 100), 70), 90);

        pastelColors.push(createColor(pastelHue, pastelSaturation, pastelLightness));
  }
  return pastelColors
}

export const getPastelColor = () => {

  const pastelHue = randomNumBetween(0, 360);
  const pastelSaturation = Math.min(Math.max(randomNumBetween(0, 100), 20), 50);
  const pastelLightness = Math.min(Math.max(randomNumBetween(0, 100), 70), 90);

  return createColor(pastelHue, pastelSaturation, pastelLightness)
}

export const getAnalogousComplementaryColors = (hsl, count) => {
  const analogicComplementaryColors = [];
  const variationRange = 10;

  for (let i = 0; i < count; i++) {
    const saturationVariation = randomNumBetween(-variationRange, variationRange);
    const lightnessVariation = randomNumBetween(-variationRange, variationRange);
    
    // Maybe add some random variation here rather than just having directly analogic colors to the complementary
    let analogousComplementaryHue;
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

    analogicComplementaryColors.push(createColor(analogousComplementaryHue, analogousComplementarySaturation, analogousComplementaryLightness));
  }
  return analogicComplementaryColors;
};

export const getAnalogousComplementaryColor = (hsl) => {
  const variationRange = 10;
  const saturationVariation = randomNumBetween(-variationRange, variationRange);
  const lightnessVariation = randomNumBetween(-variationRange, variationRange);
  
  const analogousComplementaryHue = hsl.hue + 180 + randomNumBetween(-variationRange, variationRange);
  const analogousComplementarySaturation = Math.min(Math.max(hsl.saturation + saturationVariation, 20), 80);
  const analogousComplementaryLightness = Math.min(Math.max(hsl.lightness + lightnessVariation, 10), 90);

  return  createColor(analogousComplementaryHue, analogousComplementarySaturation, analogousComplementaryLightness)
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

    monochromeDarkColors.push(createColor(monochromeDarkHue, monochromeDarkSaturation, monochromeDarkLightness));
  }
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

    monochromeLightColors.push(createColor(monochromeLightHue, monochromeLightSaturation, monochromeLightLightness));
  }
  return monochromeLightColors
};