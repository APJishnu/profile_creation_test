module.exports = {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    transform: {
      "^.+\\.(ts|tsx|js|jsx)$": "babel-jest"
    },
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1", // ✅ Ensure absolute imports are mapped
      "\\.(css|scss|sass)$": "<rootDir>/jest-mock.js" // ✅ Fix SCSS Mock
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"]
  };
  