/** @type {import('next').NextConfig} */
require('dotenv').config({
  path: `.env.production`,
});
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig
