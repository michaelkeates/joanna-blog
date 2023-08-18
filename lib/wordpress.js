import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

let client;

/**
 * getApolloClient
 */

export function getApolloClient() {
  if (!client) {
    client = _createApolloClient();
  }
  return client;
}

/**
 * createApolloClient
 */

export function _createApolloClient() {
  //why doesnt process.env work for muations? have to hardcode it
  const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT;
  //const endpoint = 'https://joanna.michaelkeates.co.uk/graphql';
  //console.log('GraphQL Endpoint:', process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT);
  return new ApolloClient({
    link: new HttpLink({
      uri: endpoint,
      cache: new InMemoryCache(),
    }),
    cache: new InMemoryCache(),
  });
}