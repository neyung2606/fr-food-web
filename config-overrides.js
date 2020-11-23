const { override, addLessLoader } = require("customize-cra");
const path = require("path");

module.exports = override(addLessLoader());
// module.exports = {
//   extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
//   root: path.resolve(__dirname),
//   resolve: {
//     alias: {
//       utils : path.join(__dirname, "src/utils"),
//       "@components": path.resolve(__dirname, "src/components"),
//       "@constants": path.resolve(__dirname, "src/constants"),
//       "@pages": path.resolve(__dirname, "src/pages"),
//       "@router": path.resolve(__dirname, "src/router"),
//       "@stores": path.resolve(__dirname, "src/stores"),
//     },
//   },
// };
