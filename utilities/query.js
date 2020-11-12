export const withQuery = async (ctx, queryFn, returnFn) => {
    const { anime_id } = ctx.query;
    const client = ctx.apolloClient;
    const res = await client.query({
        query: queryFn(anime_id.substring(0, 12)),
    });

    return returnFn(res.data);
};