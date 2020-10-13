import React from 'react';
import Layout from './components/Layout';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { StoreContextProvider } from './store/store';

import { Auth0Provider } from '@auth0/auth0-react';

import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';

const httpLink = new HttpLink({
  uri: 'https://upright-liger-61.hasura.app/v1/graphql',
});

const wsLink = new WebSocketLink({
  uri: `ws://upright-liger-61.hasura.app/v1/graphql`,
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  // uri: 'https://upright-liger-61.hasura.app/v1/graphql',
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all'
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    },
    mutate: {
      errorPolicy: 'all'
    }
  }
});

function App() {
  return (
    <Auth0Provider
      domain="chap.us.auth0.com"
      clientId="rcYbWZSqLZHNw4LloKsacP2X4IRPOWD9"
      redirectUri={window.location.origin}
    >
      <StoreContextProvider>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <div className="App">
              <Layout />
            </div>
          </ThemeProvider>
        </ApolloProvider>
      </StoreContextProvider>
    </Auth0Provider>
  );
}

export default App;
