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
            },
            {
                source: '/auth/signup/:path*',
                destination: `${API_URL}/auth/signup/:path*`
            },
            {
                source: '/auth/signin/:path*',
                destination: `${API_URL}/auth/signin/:path*`
            },
            {
                source: '/auth/check_username/:path*',
                destination: `${API_URL}/auth/check_username/:path*`
            },
            
        ]
    }
}

module.exports = nextConfig
