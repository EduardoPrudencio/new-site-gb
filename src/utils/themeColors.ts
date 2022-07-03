const gray = {
  900: "#2B3445", // Main Text
  800: "#373F50", // Paragraph
  700: "#4B566B",
  600: "#7D879C", // Low Priority form Title/Text
  500: "#AEB4BE",
  400: "#DAE1E7", // Border
  300: "#E3E9EF",
  200: "#F3F5F9", // Line Stroke
  100: "#F6F9FC",
  white: "#FFFFFF",
};

const green = {
  900: "#E7F9ED", 
  800: "#E7F9ED", 
  700: "#E7F9ED",
  600: "#E7F9ED", 
  500: "#E7F9ED",
  400: "#42ba96", 
  300: "#E7F9ED",
  200: "#33D067", 
  100: "#E7F9ED",
  white: "#FFFFFF",
};

const red = {
  900: "#ff3333", 
  800: "#ff3333", 
  700: "#ff3333",
  600: "#ff3333", 
  500: "#ff3333",
  400: "#ff3333", 
  300: "#ff3333",
  200: "#ff3333", 
  100: "#ff3333",
  white: "#FFFFFF",
};

const textColor = {
  primary: gray[900],
  secondary: gray[800],
  hint: gray[600],
  muted: gray[600],
  disabled: gray[400],
};

const bodyColor = {
  text: textColor.primary,
  default: gray[100],
  paper: gray["white"],
};

const primaryColor = {
  light: "#FFE1E6",
  main: "#D82803",  
  dark: "#4F4CB6",
  text: "#ffffff",
  100: "#FFECAD",
  200:"#FFE07D",
  300:"#FFD44B",
  400:"#FFECAD",
  500:"#F55B3A",
  600:"#B38700",
  700:"#806100",
  800:"#4E3A00",
  900:"#1D1300",
};

const secondaryColor = {
  light: "rgba(15, 52, 96, 0.2)",
  main: "rgba(15, 52, 96, 1)",
  dark: "#303A47",
  text: "#ffffff",  
  100: "#F3F6F9",
  200: "#BFBFBF",
  300: "#A6A6A6",
  400: "#8C8C8C",
  500: "#737373",
  600: "#595959", 
  700: "#404040",
  800: "#262626",
  900: "#120B0D",
};

const warningColor = {
  main: "#FFCD4E",
  text: textColor.primary,
};
const errorColor = {
  main: "#E94560",
  light: "#FFE1E6",
  text: textColor.primary,
};
const successColor = {
  main: "rgba(51, 208, 103, 1)",
  light: "rgba(51, 208, 103, 0.15)",
  text: textColor.primary,
};
const defaultColor = {
  light: textColor.secondary,
  main: textColor.primary,
  dark: textColor.primary,
  text: textColor.primary,
};

export const colors = {
  default: defaultColor,
  primary: primaryColor,
  secondary: secondaryColor,
  warn: warningColor,
  error: errorColor,
  success: successColor,
  text: textColor,
  body: bodyColor,
  gray,
  green,
  red,
};