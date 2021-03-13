import { ApolloProvider } from '@apollo/react-hooks';
import client from './graphql/client';

function App() {
  return (
    <ApolloProvider client={client}>
      <div>Hello Apollo</div>
    </ApolloProvider>
  );
}

export default App;
