const getGqlString = (doc) => {
    return doc.loc && doc.loc.source.body;
}

export const ExecuteQuery = async (client, q) => {
    const { vars, query, returnFn, errorFn } = q;
    if (!query || !returnFn) {
        return undefined;
    }
    const res = await client.query({
        query: query,
        variables: vars ? vars : {},
    }).catch(error => { errorFn(error); return { data: undefined, error: error } });

    return returnFn(res.data, res.error);
}
export const ExecuteQueryAsync = async (client, q) => {
    const { vars, query, returnFn, errorFn } = q;

    if (!query || !returnFn) {
        return undefined;
    }

    // console.log(getGqlString(query))

    return client.query({
        query: query,
        variables: vars ? vars : {},
    })
        .then(res => { return returnFn(res.data, res.error) })
        .catch(error => { errorFn(error); return returnFn(undefined, error) });
}

const DefaultReturnFn = (data, error) => { return error ? error : data?.result; }
const DefaultErrorFn = (error) => {
    console.log(error.networkError?.result?.errors);
    console.log(error);
    throw error;
}

// PrepareQuery prepares the query to be feed in "Execute..." function 
export const PrepareQuery = (vars, query, returnFn = DefaultReturnFn, errorFn = DefaultErrorFn) => {
    return {
        vars: vars,
        query: query,
        returnFn: returnFn,
        errorFn: errorFn,
    };
}

// PrepareQuery prepares the query with a key to be feed in "Execute..." function 
export const PrepareKeyQuery = (key, vars, query, returnFn = DefaultReturnFn, errorFn = DefaultErrorFn) => {
    let q = PrepareQuery(vars, query, returnFn, errorFn);
    q.key = key;
    return q
}

// ExecuteQueryBatch executes a batch of query identified by keys
// the returned object maps each query result to the provided key
// input: Array<{ key, vars, query, returnFn, errorFn }>
// output: Object{key: result} 
export const ExecuteQueryBatch = async (client, queries) => {
    let results = {};
    (await ExecuteQueries(client, queries)).forEach((r, i) => {
        results[queries[i]["key"]] = r;
    });
    return results;
}

// ExecuteQueries executes a batch of query and returns an array of responses
// input: Array<{ vars, query, returnFn, errorFn }>
// output: Array<result> 
export const ExecuteQueries = async (client, queries) => {
    const promises = queries.map(q => {
        return ExecuteQueryAsync(client, q);
    });
    return await Promise.all(promises);
}