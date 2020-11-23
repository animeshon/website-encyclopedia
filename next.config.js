module.exports = {
    basePath: process.env.NEXT_PUBLIC_BASEPATH || '',
    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || '',
    async rewrites() {
        return [
            // Primary <----------
            {
                source: '/:slug-Anime-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/anime/:id/:path*',
                basePath: false,
            },
            {
                source: '/:slug-Manga-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/manga/:id/:path*',
                basePath: false,
            },
            {
                source: '/:slug-Doujinshi-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/doujinshi/:id/:path*',
                basePath: false,
            },
            {
                source: '/:slug-Light_Novel-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/light-novels/:id/:path*',
                basePath: false,
            },
            {
                source: '/:slug-Visual_Novel-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/visual-novels/:id/:path*',
                basePath: false,
            },
            {
                source: '/:slug-Track-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/tracks/:id/:path*',
                basePath: false,
            },

            // Releases <----------
            {
                source: '/:slug-Release-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/releases/:id/:path*',
                basePath: false,
            },
            {
                source: '/:slug-Volume-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/releases/:id/:path*',
                basePath: false,
            },
            {
                source: '/:slug-Music_Record-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/releases/:id/:path*',
                basePath: false,
            },

            // Secondary <----------
            {
                source: '/:slug-Chapter-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/chapters/:id/:path*',
                basePath: false,
            },
            {
                source: '/:slug-Episode-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/episodes/:id/:path*',
                basePath: false,
            },

            // Actors & Organizations <----------
            {
                source: '/:slug-Character-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/characters/:id/:path*',
                basePath: false,
            },
            {
                source: '/:slug-Organization-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/organizations/:id/:path*',
                basePath: false,
            },
            {
                source: '/:slug-Person-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/people/:id/:path*',
                basePath: false,
            },
            {
                source: '/:slug-Magazine-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/magazines/:id/:path*',
                basePath: false,
            },
            {
                source: '/:slug-Circle-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/circles/:id/:path*',
                basePath: false,
            },
            {
                source: '/:slug-Convention-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/conventions/:id/:path*',
                basePath: false,
            },

            // Special <----------
            {
                source: '/:slug-Universe-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/universes/:id/:path*',
                basePath: false,
            },
            {
                source: '/:slug-Canonical_Franchise-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/canonicals/:id/:path*',
                basePath: false,
            },
        ]
    },
}