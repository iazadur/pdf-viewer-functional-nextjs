/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // For server-side rendering (isServer), exclude the canvas.node file from the bundle
        if (isServer) {
          config.externals.push('canvas');
        }
        
        // Add a loader for .node files if needed
        config.module.rules.push({
          test: /\.node$/,
          use: 'file-loader'
        });
    
        return config;
      }
}

module.exports = nextConfig
