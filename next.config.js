/** @type {import('next').NextConfig} */

const API_URL = process.env.API_URL

const nextConfig = {
    async rewrites(){
        return [
            {
                source: '/auth/signin/:path*',
                destination: `${API_URL}/auth/signin/:path*`
            },
            {
                source: '/auth/signup/:path*',
                destination: `${API_URL}/auth/signup/:path*`
            },
            {
                source: '/auth/check_username/:path*',
                destination: `${API_URL}/auth/check_username/:path*`
            },
            {
                source: '/user/:path*',
                destination: `${API_URL}/user/:path*`
            },
            {
                source: '/collections/:path*',
                destination: `${API_URL}/collections`
            },
            {
                source: '/collection/:path*',
                destination: `${API_URL}/collection`
            },
            {
                source: '/notes/:path*',
                destination: `${API_URL}/notes`
            }
        ]
    }
}

module.exports = nextConfig
