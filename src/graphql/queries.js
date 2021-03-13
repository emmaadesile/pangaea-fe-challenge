import gql from 'graphql-tag';

export const PRODUCTS = gql`
  query products {
    products {
      id
      title
      image_url
      price(currency: Currency!)
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
  query Currency {
    currency
  }
`;
