const basePath = process.env.NEXT_PUBLIC_BASEPATH || '';
const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || '';

module.exports = {
    basePath: basePath,
    assetPrefix: assetPrefix,
    async rewrites() {
        return [
            // Primary <----------
            {
                source: basePath + '/:slug-Anime-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/anime/:id/:path*',
            },
            {
                source: basePath + '/:slug-Manga-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/manga/:id/:path*',
            },
            {
                source: basePath + '/:slug-Doujinshi-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/doujinshi/:id/:path*',
            },
            {
                source: basePath + '/:slug-Light_Novel-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/light-novels/:id/:path*',
            },
            {
                source: basePath + '/:slug-Visual_Novel-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/visual-novels/:id/:path*',
            },
            {
                source: basePath + '/:slug-Track-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/tracks/:id/:path*',
            },

            // Releases <----------
            {
                source: basePath + '/:slug-Release-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/releases/:id/:path*',
            },
            {
                source: basePath + '/:slug-Volume-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/releases/:id/:path*',
            },
            {
                source: basePath + '/:slug-Music_Record-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/releases/:id/:path*',
            },

            // Secondary <----------
            {
                source: basePath + '/:slug-Chapter-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/chapters/:id/:path*',
            },
            {
                source: basePath + '/:slug-Episode-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/episodes/:id/:path*',
            },

            // Actors & Organizations <----------
            {
                source: basePath + '/:slug-Character-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/characters/:id/:path*',
            },
            {
                source: basePath + '/:slug-Organization-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/organizations/:id/:path*',
            },
            {
                source: basePath + '/:slug-Person-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/people/:id/:path*',
            },
            {
                source: basePath + '/:slug-Magazine-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/magazines/:id/:path*',
            },
            {
                source: basePath + '/:slug-Circle-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/circles/:id/:path*',
            },
            {
                source: basePath + '/:slug-Convention-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/conventions/:id/:path*',
            },

            // Special <----------
            {
                source: basePath + '/:slug-Universe-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/universes/:id/:path*',
            },
            {
                source: basePath + '/:slug-Canonical_Franchise-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/canonicals/:id/:path*',
            },
        ]
    },
}