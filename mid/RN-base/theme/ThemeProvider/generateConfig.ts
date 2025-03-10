import type { HasProperty } from '@/theme/types/common';
import type { FulfilledThemeConfiguration, Variant } from '@/theme/types/config';
import { config } from '@/theme/_config';

function hasProperty<Config, KeyPath extends string>(
  configuration: Config,
  property: KeyPath,
): configuration is HasProperty<Config, KeyPath> & Config {
  const parts = property.split('.');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let currentObj: any = configuration;

  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i];
    if (!(part in currentObj)) {
      return false;
    }

    currentObj = currentObj[part];
  }

  return true;
}

export default (variant: Variant) => {
  const { variants, ...defaultConfig } = config;
  const variantConfig = variant !== 'default' ? variants[variant] : null;

  const fontColors = {
    ...defaultConfig.fonts.colors,
    ...(variantConfig && hasProperty(variantConfig, 'fonts.colors')
      ? variantConfig.fonts.colors
      : {}),
  };
  const backgroundColors = {
    ...defaultConfig.backgrounds,
    ...(variantConfig && hasProperty(variantConfig, 'backgrounds')
      ? variantConfig.backgrounds
      : {}),
  };
  const borderColors = {
    ...defaultConfig.borders.colors,
    ...(variantConfig && hasProperty(variantConfig, 'borders.colors')
      ? variantConfig.borders.colors
      : {}),
  };
  const navigationColors = {
    ...defaultConfig.navigationColors,
    ...(variantConfig && hasProperty(variantConfig, 'navigationColors')
      ? variantConfig.navigationColors
      : {}),
  };
  const colors = {
    ...defaultConfig.colors,
    ...(variantConfig && hasProperty(variantConfig, 'colors')
      ? variantConfig.colors
      : {}),
  };

  return {
    colors,
    fonts: {
      sizes: defaultConfig.fonts.sizes,
      colors: fontColors,
    },
    gutters: defaultConfig.gutters,
    backgrounds: backgroundColors,
    borders: {
      widths: defaultConfig.borders.widths,
      radius: defaultConfig.borders.radius,
      colors: borderColors,
    },
    navigationColors,
  } as const satisfies FulfilledThemeConfiguration;
};
