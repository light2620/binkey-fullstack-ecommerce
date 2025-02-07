module.exports = {
    content: ['./src/**/*.{html,js}'], // Adjust this to match the paths to your project files
    theme: {
      extend: {
        colors : {
            "primary-200" : "#ffbg00",
            "primary-100" : "#ffc929",
            "secondary-200" : "#00b050",
            "secondary-100" : "#0b1a78"
        }
      }, // Extend Tailwind's default theme here
    },
    plugins: [require("@tailwindcss/line-clamp")], // Add plugins here if needed
  };