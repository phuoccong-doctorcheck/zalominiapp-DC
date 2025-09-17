module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.{js,jsx,ts,tsx,vue}", "./src/**/*.html"],
  },
  theme: {
    extend: {
      aspectRatio: {
        cinema: "21/9",
        card: "4/3",
      },
      colors: {
        primary: "var(--main)",
        secondary: "var(--orange)",
        background: "var(--bg-color)",
        orange: "var(--orange)",
        white: "var(--white)",
        black: "var(--black)",
        main: "var(--blue)",
        green: "var(--green-color)",
        red: "var(--red)",
        pastel: "var(--pastel-blue)",
        blue: "var(--blue-main)",
      },
    },
  },
};
