module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: "react-app",
	parserOptions: {
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true,
		},
		sourceType: "module",
	},
	plugins: ["react"],
	rules: {
		quotes: ["error", "double"],
		semi: ["error", "never"],
	},
}
