module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    extends: [
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'eslint-config-prettier',
        'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'prettier', '@typescript-eslint'], // Plugins de React y Prettier
    rules: {
        'prettier/prettier': ['error', { endOfLine: 'auto' }], // Muestra errores de Prettier en ESLint
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
    },
};
