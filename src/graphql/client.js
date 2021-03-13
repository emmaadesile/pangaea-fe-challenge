import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const queryEndpoint = 'https://pangaea-interviews.now.sh/api/graphql';

const link = new HttpLink({
  uri: queryEndpoint,
});

const client = new ApolloClient({
  cache,
  link
});

export default client;
