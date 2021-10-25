const Components = require('unplugin-vue-components/webpack')
const AutoImport = require('unplugin-auto-import/webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      Components({
        dts: './src/components.d.ts',
        dirs: ['./src/components',],
      }),
      AutoImport({
        imports: ['vue', 'vuex',],
        dts: './src/auto-imports.d.ts',
      }),
    ],
  },
}
