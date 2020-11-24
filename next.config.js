const basePath = process.env.NEXT_PUBLIC_BASEPATH || '';
const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || '';

module.exports = {
    basePath: basePath,
    assetPrefix: assetPrefix,

    async rewrites() {
        return [
            // ! TODO: This workaround is unfortunately necessary due to https://github.com/vercel/next.js/discussions/16958.
            // ! NOTE: Path rewrite has been temporarily disabled in the "Cloud Load Balancing" configuration due to this issue.
            {
                source: '/search/:path*',
                destination: '/search/:path*',
            },
            {
                source: '/animeshon/:path*',
                destination: '/animeshon/:path*',
            },
            {
                source: '/',
                destination: '/',
            },

            // Primary <----------
            {
                source: '/:slug-Anime-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/anime/:id/:path*',
                // ! TODO: This is currently not working properly, see https://github.com/vercel/next.js/discussions/16958.
                // ! basePath: false,
            },
            {
                source: '/:slug-Manga-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/manga/:id/:path*',
                // ! TODO: This is currently not working properly, see https://github.com/vercel/next.js/discussions/16958.
                // ! basePath: false,
            },
            {
                source: '/:slug-Doujinshi-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/doujinshi/:id/:path*',
                // ! TODO: This is currently not working properly, see https://github.com/vercel/next.js/discussions/16958.
                // ! basePath: false,
            },
            {
                source: '/:slug-Light_Novel-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/light-novels/:id/:path*',
                // ! TODO: This is currently not working properly, see https://github.com/vercel/next.js/discussions/16958.
                // ! basePath: false,
            },
            {
                source: '/:slug-Visual_Novel-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/visual-novels/:id/:path*',
                // ! TODO: This is currently not working properly, see https://github.com/vercel/next.js/discussions/16958.
                // ! basePath: false,
            },
            {
                source: '/:slug-Track-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/tracks/:id/:path*',
                // ! TODO: This is currently not working properly, see https://github.com/vercel/next.js/discussions/16958.
                // ! basePath: false,
            },

            // Releases <----------
            {
                source: '/:slug-Release-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/releases/:id/:path*',
                // ! TODO: This is currently not working properly, see https://github.com/vercel/next.js/discussions/16958.
                // ! basePath: false,
            },
            {
                source: '/:slug-Volume-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/releases/:id/:path*',
                // ! TODO: This is currently not working properly, see https://github.com/vercel/next.js/discussions/16958.
                // ! basePath: false,
            },
            {
                source: '/:slug-Music_Record-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/releases/:id/:path*',
                // ! TODO: This is currently not working properly, see https://github.com/vercel/next.js/discussions/16958.
                // ! basePath: false,
            },

            // Secondary <----------
            {
                source: '/:slug-Chapter-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/chapters/:id/:path*',
                // ! TODO: This is currently not working properly, see https://github.com/vercel/next.js/discussions/16958.
                // ! basePath: false,
            },
            {
                source: '/:slug-Episode-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/episodes/:id/:path*',
                // ! TODO: This is currently not working properly, see https://github.com/vercel/next.js/discussions/16958.
                // ! basePath: false,
            },

            // Actors & Organizations <----------
            {
                source: '/:slug-Character-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/characters/:id/:path*',
                // ! TODO: This is currently not working properly, see https://github.com/vercel/next.js/discussions/16958.
                // ! basePath: false,
            },
            {
                source: '/:slug-Organization-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/organizations/:id/:path*',
                // ! TODO: This is currently not working properly, see https://github.com/vercel/next.js/discussions/16958.
                // ! basePath: false,
            },
            {
                source: '/:slug-Person-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/people/:id/:path*',
                // ! TODO: This is currently not working properly, see https://github.com/vercel/next.js/discussions/16958.
                // ! basePath: false,
            },
            {
                source: '/:slug-Magazine-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/magazines/:id/:path*',
                // ! TODO: This is currently not working properly, see https://github.com/vercel/next.js/discussions/16958.
                // ! basePath: false,
            },
            {
                source: '/:slug-Circle-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/circles/:id/:path*',
                // ! TODO: This is currently not working properly, see https://github.com/vercel/next.js/discussions/16958.
                // ! basePath: false,
            },
            {
                source: '/:slug-Convention-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/conventions/:id/:path*',
                // ! TODO: This is currently not working properly, see https://github.com/vercel/next.js/discussions/16958.
                // ! basePath: false,
            },

            // Special <----------
            {
                source: '/:slug-Universe-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/universes/:id/:path*',
                // ! TODO: This is currently not working properly, see https://github.com/vercel/next.js/discussions/16958.
                // ! basePath: false,
            },
            {
                source: '/:slug-Canonical_Franchise-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/canonicals/:id/:path*',
                // ! TODO: This is currently not working properly, see https://github.com/vercel/next.js/discussions/16958.
                // ! basePath: false,
            },
        ]
    },
}