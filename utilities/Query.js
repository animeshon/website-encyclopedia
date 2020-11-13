export const withQuery = async (ctx, id, queryFn, returnFn) => {
    if (!id || !queryFn || !returnFn) {
        return undefined;
    }

    const client = ctx.apolloClient;
    const res = await client.query({
        query: queryFn(id.substring(0, 12)),
    });

    return returnFn(res.data);
};