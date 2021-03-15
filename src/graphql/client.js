import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache();
const queryEndpoint = 'https://pangaea-interviews.now.sh/api/graphql';

const client = new ApolloClient({
  cache,
  uri: queryEndpoint,
});

export default client;
