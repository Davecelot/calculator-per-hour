// Default values that can be overridden by environment variables
export const config = {
  // Base path for deployment
  basePath: import.meta.env.VITE_BASE_PATH || '/calculator-per-hour/',
  // Default currency
  defaultCurrency: import.meta.env.VITE_DEFAULT_CURRENCY || 'USD',
  // Default region
  defaultRegion: import.meta.env.VITE_DEFAULT_REGION || 'LATAM',
  // Feature flags controlled via environment variables
  features: {
    // Enabled by default; set VITE_ENABLE_THEME_TOGGLE="false" to disable
    enableThemeToggle: import.meta.env.VITE_ENABLE_THEME_TOGGLE !== 'false',
    // Enabled by default; set VITE_ENABLE_EXPORT="false" to disable
    enableExport: import.meta.env.VITE_ENABLE_EXPORT !== 'false',
    // Disabled by default; set VITE_ENABLE_SAVED_PRESETS="true" to enable
    enableSavedPresets: import.meta.env.VITE_ENABLE_SAVED_PRESETS === 'true',
  },
};
