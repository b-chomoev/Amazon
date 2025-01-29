import { IProduct } from '../../../../types';
import React from 'react';
import ProductItem from '../ProductItem/ProductItem';

interface Props {
  products: IProduct[];
}

const Products: React.FC<Props> = ({products}) => {
  return (
    <>
      {products.map((product) => (
        <ProductItem key={product._id} product={product}/>
      ))}
    </>
  );
};

export default Products;