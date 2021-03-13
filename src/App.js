import { ApolloProvider } from '@apollo/react-hooks';

import client from './graphql/client';
import Products from './pages/Products';
import './styles/tailwindBuild.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="text-4xl">Hello Apollo</div>
      <Products />
    </ApolloProvider>
  );
}

export default App;
