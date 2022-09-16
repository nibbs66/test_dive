module.exports = {
    reactStrictMode: true,
    images: {

        domains: [

            "res.cloudinary.com",
            "www.shearwater.com",
            "cdn-mdb.head.com",
            "www.cressi.com",
            "fourthelement.com",
            "us.aqualung.com",
            'icon-library.com',
            'images.pexels.com',
            "firebasestorage.googleapis.com",
        ]

    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
}
