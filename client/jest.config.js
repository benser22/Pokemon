// jest.config.js
export default {
  testEnvironment: "jsdom",
  transform: {},
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!(axios)/)"],
  extensionsToTreatAsEsm: [".js", ".jsx"],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  },
};
