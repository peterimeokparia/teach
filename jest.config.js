module.exports = {
    testEnvironment: 'node',
    testPathIgnorePatterns: ["<rootDir>/src/Services/course/cypress"],
    "testRegex": "(/__testss__/.*|(\\.|/)(tesst|sspec))\\.[jt]sx?$"
};


// module.exports = {
//     collectCoverageFrom: ["src/**/*.{js,jsx,mjs}"],
//     testMatch: ["<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}", "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}"],
//     transform: {
//       "^.+\\.(js|jsx|mjs)$": "<rootDir>/config/jest/jest-transformer.js"
//     },
//     transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"]
//   };