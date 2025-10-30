module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.theposterdb.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.igdb.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    webpack(config) {
    config.resolve.fallback = {

      // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped.
      ...config.resolve.fallback,  

      fs: false, // the solution
    };
    
    return config;
  },
};