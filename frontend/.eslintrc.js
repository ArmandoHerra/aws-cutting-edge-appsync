module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: ['plugin:vue/recommended', 'plugin:prettier/recommended'], // required to lint *.vue files
    plugins: ['vue', 'prettier'],
    // add your custom rules here
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: []
            }
        ],
        'vue/html-closing-bracket-newline': [
            'error',
            {
                singleline: 'never',
                multiline: 'never'
            }
        ],
        'vue/component-name-in-template-casing': ['error', 'kebab-case'],
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'never',
                    normal: 'always',
                    component: 'always'
                },
                svg: 'always',
                math: 'always'
            }
        ],
        'vue/max-attributes-per-line': [
            2,
            {
                singleline: 1,
                multiline: {
                    max: 1,
                    allowFirstLine: false
                }
            }
        ],
        indent: ['error', 4]
    }
}
