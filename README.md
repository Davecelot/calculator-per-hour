# Conversor de Tarifas - React

A React application for calculating hourly rates and project costs for UI/UX professionals. This tool helps freelancers and agencies determine appropriate pricing based on desired income, overhead costs, and project complexity.

## Features

- Regional presets for LATAM, Europe, and North America
- Customizable business assumptions (income goals, overhead, productivity)
- Project scope and hours mix calculation
- Client type and complexity adjusters
- Support for both freelance and retainer engagement models
- Export functionality for saving calculations (JSON and PDF)
- Responsive design for all devices
- Dark/Light theme toggle
- Accessibility improvements with ARIA attributes
- Performance optimizations with debounced inputs

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/valor-hora-react.git

# Navigate to the project directory
cd valor-hora-react

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

### Building for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── DebouncedInput.jsx
│   ├── AccessibleSelect.jsx
│   ├── RegionSelector.jsx
│   ├── ThemeToggle.jsx
├── hooks/
│   ├── useRateCalculation.js
│   ├── useDebounce.js
│   ├── useLocalStorage.js
│   ├── useTheme.js
├── utils/
│   ├── pdfExport.js
├── App.jsx
├── index.css
├── main.jsx
```

## Key Components

### DebouncedInput
A performance-optimized input component that reduces unnecessary calculations by debouncing value changes.

### AccessibleSelect
An accessible dropdown component with proper ARIA attributes for improved accessibility.

### RegionSelector
Handles region and currency selection with predefined options.

### ThemeToggle
Provides a toggle button for switching between dark and light themes.

## Custom Hooks

### useRateCalculation
Centralizes all rate calculation logic, including billable hours, base rates, blended rates, and price adjustments.

### useDebounce
Provides debouncing functionality to optimize performance for input fields.

### useLocalStorage
Enables persistent storage of user preferences and calculations.

### useTheme
Manages theme state and applies theme styles to the document.

## Utilities

### pdfExport
Generates PDF exports of rate calculations for sharing or documentation.

## Deployment

The application is configured for automatic deployment to GitHub Pages using GitHub Actions. When you push to the main branch, the workflow in `.github/workflows/deploy.yml` will:

1. Set up a Node.js environment
2. Install dependencies
3. Build the project
4. Deploy to GitHub Pages

The deployed application will be available at: `https://davecelot.github.io/calculator-per-hour/`

## PWA Support

The application is configured as a Progressive Web App (PWA) using `vite-plugin-pwa`, allowing users to install it on their devices and use it offline.

## Technologies Used

- React 18
- Vite 4
- Tailwind CSS
- PostCSS
- TypeScript (for type definitions)
- GitHub Actions (for CI/CD)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.