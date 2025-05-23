export default {
 testEnvironment: "node",
 transform: {
  "^.+\\.js$": "babel-jest"
 },
 //extensionsToTreatAsEsm: [".js"],
 moduleNameMapper: {
  "^(.*/.*)\\.js$": "$1" // Menangani file dengan ekstensi .js
 },
 testMatch: ["**/__test__/**/*.test.js"],
 verbose: true
}
