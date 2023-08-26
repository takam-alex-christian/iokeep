/** @type {import('next').NextConfig} */

const API_URL = process.env.API_URL

const nextConfig = {
    async rewrites(){
        return [
            {
                source: '/auth/api/:path*',
				destination: `${API_URL}/auth/:path*`
            },
            {
                source: '/user/api/:path*',
                destination: `${API_URL}/user/:path*`
            }
        ]
    }
}

module.exports = nextConfig
