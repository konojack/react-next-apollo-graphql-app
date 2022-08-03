import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import gql from 'graphql-tag';
import Product from './Product';

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products() {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
  const content = loading ? (
    <div>...LOADING</div>
  ) : (
    <ProductListStyles>
      {data.allProducts.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </ProductListStyles>
  );
  return content;
}
