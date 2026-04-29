export const PRODUCT_BASIC_FRAGMENT = `
  fragment ProductBasic on Product {
    id
    name
    slug
    pricing {
      priceRange {
        start {
          net {
            amount
            currency
          }
        }
      }
    }
  }
`;