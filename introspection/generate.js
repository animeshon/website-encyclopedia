const fetch = require('node-fetch');
const fs = require('fs');

fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || `http://127.0.0.1:4000/graphql`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
}).then(result => result.json())
.then(result => {
  const possibleTypes = {};

  result.data.__schema.types.forEach(supertype => {
    if (supertype.possibleTypes) {
      possibleTypes[supertype.name] =
        supertype.possibleTypes.map(subtype => subtype.name);
    }
  });

  fs.writeFile('./introspection/fragments.generated.json', JSON.stringify(possibleTypes), err => {
    if (err) {
      console.error('Error writing possibleTypes.json', err);
    } else {
      console.log('Fragment types successfully extracted!');
    }
  });
});