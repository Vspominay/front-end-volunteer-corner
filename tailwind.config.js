/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primaryPurple: '#5E35B1',
        primaryGreen: '#71B406',
        darkGray: '#343434',
        lightPurple: '#9575CD',
        lightGreen: '#81C784',
        lightSilver: '#8C9297',
        lightBlue: '#04AFD4',
        yellow: '#FBCA36',
        white: '#ffffff'
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      fontWeight: {
        semiBold: 600,
        medium: 500,
        regular: 400,
        light: 300
      },
      maxWidth: {
        50: '50%',
      },
      fontSize: {
        xs: ['12px', '18px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['20px', '26px'],
        xl: ['24px', '30px'],
      }
    },
  },
  plugins: [],
}
