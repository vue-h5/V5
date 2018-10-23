import VuePlugin from 'rollup-plugin-vue'

export default {
    input: './src/index.js',
    output: {
        file: './dist/v5.es6.js',
        format: 'esm'
    },
    plugins: [VuePlugin()]
}