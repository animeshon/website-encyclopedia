module.exports = {
    async rewrites() {
        return [
            {
                source: '/:slug-Anime-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/anime/:id/:path*',
            },
            {
                source: '/:slug-Manga-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/manga/:id/:path*',
            },
            {
                source: '/:slug-Doujinshi-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/doujinshi/:id/:path*',
            },
            {
                source: '/:slug-Light_Novel-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/lightnovels/:id/:path*',
            },
            {
                source: '/:slug-Visual_Novel-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/visualnovels/:id/:path*',
            },
            {
                source: '/:slug-Track-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/tracks/:id/:path*',
            },


            
            {
                source: '/:slug-Release-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/releases/:id/:path*',
            },
            {
                source: '/:slug-Volume-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/releases/:id/:path*',
            },
            {
                source: '/:slug-Chapter-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/chapters/:id/:path*',
            },
            {
                source: '/:slug-Episode-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/episodes/:id/:path*',
            },
            {
                source: '/:slug-Soundtrack-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/soundtracks/:id/:path*',
            },



            {
                source: '/:slug-Character-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/characters/:id/:path*',
            },
            {
                source: '/:slug-Organization-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/organizations/:id/:path*',
            },
            {
                source: '/:slug-Person-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/people/:id/:path*',
            },
            {
                source: '/:slug-Magazine-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/magazines/:id/:path*',
            },
            {
                source: '/:slug-Circle-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/circles/:id/:path*',
            },
            {
                source: '/:slug-Convention-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/conventions/:id/:path*',
            },



            {
                source: '/:slug-Universe-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/universes/:id/:path*',
            },
            {
                source: '/:slug-Canonical_Franchise-:id([A-Za-z0-9-_]{12})/:path*',
                destination: '/canonicals/:id/:path*',
            },
        ]
    },
}