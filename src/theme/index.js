import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

// Custom color palette
const colors = {
  brand: {
    50: "#f0f4ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
  },
  accent: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
  },
  success: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
  },
};

// Custom fonts
const fonts = {
  heading:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', Consolas, monospace",
};

// Global styles
const styles = {
  global: (props) => ({
    body: {
      bg: mode("white", "gray.900")(props),
      color: mode("gray.800", "gray.100")(props),
    },
    html: {
      scrollBehavior: "smooth",
    },
  }),
};

// Component customizations
const components = {
  Button: {
    baseStyle: {
      fontWeight: "semibold",
      borderRadius: "lg",
    },
    variants: {
      primary: (props) => ({
        bg: "brand.500",
        color: "white",
        _hover: {
          bg: "brand.600",
          transform: "translateY(-2px)",
          boxShadow: "lg",
        },
        _active: {
          bg: "brand.700",
          transform: "translateY(0)",
        },
        transition: "all 0.2s",
      }),
      secondary: (props) => ({
        bg: mode("white", "gray.800")(props),
        color: mode("gray.800", "white")(props),
        border: "2px solid",
        borderColor: mode("gray.200", "gray.600")(props),
        _hover: {
          borderColor: "brand.500",
          color: "brand.500",
          transform: "translateY(-2px)",
          boxShadow: "lg",
        },
        _active: {
          transform: "translateY(0)",
        },
        transition: "all 0.2s",
      }),
    },
  },
  Card: {
    baseStyle: {
      container: {
        borderRadius: "xl",
        overflow: "hidden",
        transition: "all 0.3s",
        _hover: {
          transform: "translateY(-8px)",
          boxShadow: "xl",
        },
      },
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: "bold",
      lineHeight: "shorter",
    },
  },
  Text: {
    baseStyle: {
      lineHeight: "relaxed",
    },
  },
};

// Breakpoints
const breakpoints = {
  base: "0em",
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
};

// Custom theme config
const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const theme = extendTheme({
  colors,
  fonts,
  styles,
  components,
  breakpoints,
  config,
  space: {
    18: "4.5rem",
    88: "22rem",
  },
  shadows: {
    brand: "0 0 0 3px rgba(99, 102, 241, 0.6)",
  },
});

export default theme;
