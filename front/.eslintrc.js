module.exports = {
  root: true,
  extends: [
    "@react-native-community",
    "prettier",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["prettier", "@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  rules: {
    "prettier/prettier": "error",
  },
};
