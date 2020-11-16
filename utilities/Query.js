export const ExecuteQuery = async (ctx, vars, query, returnFn) => {
    if (!query || !returnFn) {
        return undefined;
    }

    const client = ctx.apolloClient;
    const res = await client.query({
        query: query,
        variables: vars ? vars :{},
    });

    return returnFn(res.data, res.error);
}
export const ExecuteQueryAsync = async (ctx, vars, query, returnFn) => {
    if (!query || !returnFn) {
        return undefined;
    }

    const client = ctx.apolloClient;
    return client.query({
        query: query,
        variables: vars ? vars :{},
    }).then(res => returnFn(res.data, res.error));
}