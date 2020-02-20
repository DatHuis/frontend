module.exports = {
  presets: [['@babel/preset-env'], '@babel/typescript', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    /**
     * babel-plugin-root-import should be at the end,
     * src/webpack.default.config removes this plugin
     * in favour of an alias because there troubles with this
     * plugin and subdirectories.
     */
    [
      'babel-plugin-root-import',
      {
        rootPathSuffix: './src',
        rootPathPrefix: '~',
      },
    ],
  ],
};
