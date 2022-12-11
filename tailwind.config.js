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
                primaryRed: '#EB5757',
                darkGray: '#343434',
                lightPurple: '#9575CD',
                lightPurpleTransparent: 'rgba(149,117,205,0.4)',
                lightGreen: '#81C784',
                lightGreenSecond: '#43CDB4',
                lightSilver: '#8C9297',
                lightBlue: '#04AFD4',
                yellow: '#FBCA36',
                white: '#ffffff',
                bgWhite: '#FBFBFB',
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
                xxl: ['34px', '32px'],
            }
        },
    },
    plugins: [],
}
