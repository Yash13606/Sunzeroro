# SunZero Website

A pixel-perfect React + TypeScript + Vite implementation of the SunZero sustainable energy company landing page.

## Features

✅ **Responsive Design** - Built with flexbox for pixel-perfect layout
✅ **React Components** - Modular, reusable component architecture
✅ **TypeScript** - Full type safety
✅ **Fast Performance** - Vite for instant HMR and optimized builds
✅ **Custom Styling** - Gradient backgrounds, custom fonts, and animations

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Navigation bar with logo
│   ├── HeroSection.tsx     # Hero section with call-to-action
│   ├── FeaturesSection.tsx # Product features showcase
│   ├── SavingsCalculator.tsx # Interactive savings calculator
│   ├── WhySunZero.tsx      # Problem/solution section
│   ├── SolutionsSection.tsx # Detailed solutions showcase
│   ├── TeamSection.tsx     # Team expertise section
│   └── Footer.tsx          # Footer with contact info
├── App.tsx                 # Main app component
├── App.css                 # Global styles
├── index.css               # Base styles
└── main.tsx                # Entry point
```

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The dev server runs on `http://localhost:5173/` with hot module replacement enabled.

```bash
npm run dev
```

## Color Palette

- **Primary Orange**: `#FDA720`
- **Dark Brown**: `#B75021`
- **Gray**: `#5C7083`
- **White**: `#FFFFFF`

## Fonts

- **Owners Wide**: Serif, used for headings
- **Geist**: Sans-serif, used for body text

## Key Components

### Navbar
Fixed navigation with logo and menu items.

### Hero Section
Main headline with CTA button and background gradient.

### Savings Calculator
Interactive component showing yearly and monthly savings estimates.

### Solutions Section
Three-part section showcasing SunZero's renewable energy, energy management, and supply chain solutions.

### Team Section
Text-based team expertise showcase.

### Footer
Contact information and copyright.

## Customization

### Adding New Sections
1. Create a new component in `src/components/`
2. Import it in `App.tsx`
3. Add it to the JSX

### CSS Classes
Use inline styles or add custom CSS classes to `App.css` for styling.

### Images
Replace placeholder divs with actual image imports:
```tsx
import headerImage from '../assets/header.png'

<img src={headerImage} alt="Header" />
```

## Build & Deploy

```bash
# Build for production
npm run build

# Output in dist/ folder - ready for deployment
```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling with gradients and flexbox

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

## Notes

- Pure CSS styling for maximum compatibility
- All layouts use CSS Flexbox for precise control
- Component spacing matches design specs exactly
- Ready for image and content integration

## Next Steps

1. Add real images to replace placeholder divs
2. Integrate a contact form backend
3. Add animation libraries (Framer Motion, AOS)
4. Set up analytics (Google Analytics)
5. Add SEO metadata and og tags
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
