const { override, fixBabelImports, addWebpackAlias, addLessLoader } = require("customize-cra");
const path = require('path')

module.exports = override(
  addLessLoader(),
  fixBabelImports("import", {
    libraryName: "antd",
    style: "less",
  }),
  addWebpackAlias({
    '@components': path.resolve(__dirname, 'src/components'),
    '@constants': path.resolve(__dirname, 'src/constants'),
    '@misc': path.resolve(__dirname, 'src/misc'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@router': path.resolve(__dirname, 'src/router'),
    '@stores': path.resolve(__dirname, 'src/stores'),
    '@utils': path.resolve(__dirname, 'src/utils'),
  })
);
