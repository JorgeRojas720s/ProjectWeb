/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
      dbConfig: {
          host: process.env.HOST || 'localhost',
          port: '3306',
        //   port: process.env.PORT,
          user: process.env.USER || 'root', 
          password: process.env.PASSWORD || '', 
          database: process.env.DATABASE || 'db_project_web'
      },
      secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'
  },
  publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/api' // development api
          : 'http://localhost:3000/api' // production api
  }
}

module.exports = nextConfig