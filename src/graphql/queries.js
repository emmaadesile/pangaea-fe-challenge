import { gql } from '@apollo/client';

export const PRODUCTS = gql`
  query GetProducts {
    products {
      id
      title
      image_url
      # price(currency: $currency)
      price(currency: USD)
      product_options {
        title
        prefix
        suffix
        options {
          id
          value
        }
      }
    }
  }
`;

export const CURRENCY = gql`
  query GetCurrency {
    currency
  }
`;
