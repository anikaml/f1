module.exports = {
  webpack: {
    configure: (config, { env, paths }) => {
      config.module.rules.unshift({
        test: /\.m?jsx?$/,
        resolve: {
          fullySpecified: false,
        },
      });
      return config;
    }
  }
}