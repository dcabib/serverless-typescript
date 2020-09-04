import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'serverless-typescript'
  },

  frameworkVersion: '>=1.72.0',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },

  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    // profile: 'detault',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  
  functions: {
    getCityInfo: {
      handler: 'lambdas/getCityInfo.handler',
      events: [
        {
          http: {
            method: 'get',
            path: 'get-city/{city}',
            cors: true,
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
