/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./node_modules/react-tailwindcss-select/dist/index.esm.js"

  ],
  theme: {
    extend: {
        "height":{
            "1/2screen": "50vh",
            "3/4screen": "75vh",
        },

        fontFamily:{
            nunito:["Nunito", "sans-serif"],
        },
        fontSize:{
            'xxs': '10px'
        },

        animation: {
            'fadeInDown': 'fadeInDown 5s ease-in-out '
        },
        keyframes:{
            fadeInDown: {
                '0%': {
                    opacity: '0',
                    transform: 'translateY(-100vh) translateX(-100vw)',

                },

                '100%': {
                    opacity: '1',
                    transform: 'translateY(0) translateX(0)',

                },

            },
            scroll: {
                "0%": {transform: "translateX(0)"},
            "100%": {transform: "translateX(-50%)"}
            },
            vendorScroll: {
                "0%": {transform: "translateX(-50%)"},
                "100%": {transform: "translateX(0)"}
            },
            FadeInOut: {
               "0%": {
                opacity: "1"
            },
            "45%": {
            opacity: "1"
        },
        "55%": {
        opacity:" 0"
    },
      "100%": {
      opacity: "0"
  }
            }
        },
        transitionDuration: {
            "60sec": "60000ms",
            "5000": "5000ms",
            "3000": "3000ms",
            "1500": "1500ms",
        },
    },

  },
  plugins: [
      require('@tailwindcss/forms'),
  ],
}
