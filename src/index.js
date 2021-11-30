import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ProductsProvider } from './context/products_context'
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context'
import { UserProvider } from './context/user_context'
import { Auth0Provider } from '@auth0/auth0-react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

// import "bootstrap/dist/css/bootstrap.min.css";
// dev-3yde9rjq.us.auth0.com
// Hhkz4MSmgvVsfW1YpvfRkWVtnkga6BEY

const client = new ApolloClient({
  uri: 'https://pleasing-drake-25.hasura.app/v1/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  // const {REACT_APP_AUTH_DOMAIN,REACT_APP_AUTH_CLIENT_ID} = process.env,
  <ApolloProvider client={client}>
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    // domain="dev-3yde9rjq.us.auth0.com"
    clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
    // clientId="Hhkz4MSmgvVsfW1YpvfRkWVtnkga6BEY"
    redirectUri={window.location.origin}
    cacheLocation='localstorage'
  >
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </Auth0Provider>
  </ApolloProvider>,

  document.getElementById('root')
)
