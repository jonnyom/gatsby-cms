module.exports = {
  important: true,
  // Active dark mode on class basis
  darkMode: 'class',
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US'
  },
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}']
    // These options are passed through directly to PurgeCSS
  },
  theme: {
    extend: {
      colors: {
        primary: '#25adaf',
        secondary: '#296364',
        main: '#718096',
        background: '#fff',
        header: '#1a1417',
        accent: '#2d3748'
      },
      backgroundImage: (theme) => ({
        check: "url('/icons/check.svg')",
        landscape: "url('/images/landscape/2.jpg')"
      })
    }
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
      inset: ['checked'],
      zIndex: ['hover', 'active']
    }
  },
  plugins: [require('@tailwindcss/typography')],
  future: {
    purgeLayersByDefault: true
  }
};
