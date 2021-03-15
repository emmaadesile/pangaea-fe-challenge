import { gql } from '@apollo/client';

export const PRODUCTS = gql`
  query GetProduct($currency: Currency! = USD) {
    products {
      id
      title
      image_url
      price(currency: $currency)
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
