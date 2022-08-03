import Link from 'next/link';
import React from 'react';
import ItemStyles from './styles/ItemStyles';
import PriceTagStyles from './styles/PriceTag';
import TitleStyles from './styles/Title';
import formatMoney from '../lib/formatMoney';

export default function Product({ product }) {
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <TitleStyles>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </TitleStyles>
      <PriceTagStyles>{formatMoney(product.price)}</PriceTagStyles>
    </ItemStyles>
  );
}
