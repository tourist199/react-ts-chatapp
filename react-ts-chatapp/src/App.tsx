import React from 'react';
import Layout from './components/Layout';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://upright-liger-61.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Layout />
      </div>
    </ApolloProvider>
  );
}

export default App;
