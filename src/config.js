// Default values that can be overridden by environment variables
export const config = {
  // Base path for deployment
  basePath: import.meta.env.VITE_BASE_PATH || '/calculator-per-hour/',
  // Default currency
  defaultCurrency: import.meta.env.VITE_DEFAULT_CURRENCY || 'USD',
  // Default region
  defaultRegion: import.meta.env.VITE_DEFAULT_REGION || 'LATAM',
  // Feature flags
  features: {
    enableThemeToggle: import.meta.env.VITE_ENABLE_THEME_TOGGLE === 'true' || true,
    enableExport: import.meta.env.VITE_ENABLE_EXPORT === 'true' || true,
    enableSavedPresets: import.meta.env.VITE_ENABLE_SAVED_PRESETS === 'true' || false,
  },
};