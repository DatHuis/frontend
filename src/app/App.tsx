/**
 * @author Philipp Beau <philipp@dathuis.nl>
 *
 */

import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Search from './Search';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <Search />
      </div>
    </ApolloProvider>
  );
};

export default App;
