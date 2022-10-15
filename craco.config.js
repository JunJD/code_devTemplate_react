const path = require('path');
const resolve = dir => path.resolve(__dirname,dir);
const CracoAntDesignPlugin = require('craco-antd');
module.exports = {
  // ...
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          '@primary-color': 'red', // primary 的颜色
        },
      },
    },
  ],
  webpack:{
    alias:{
      '@src': resolve('src')
    }
  }
};