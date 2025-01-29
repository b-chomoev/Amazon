import { IProduct } from '../../../../types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import noimg from '../../../../../public/no-picture.png';
import { mainApiUrl } from '../../../../globalConstants';
import { AspectRatio, Card, CardContent, CardOverflow } from '@mui/joy';
import { Box, Button, Typography } from '@mui/material';

interface Props {
  product: IProduct;
}

const ProductItem: React.FC<Props> = ({product}) => {
  const navigate = useNavigate();
  let productImage = noimg;

  if (product.image) {
    productImage = mainApiUrl + '/' + product.image;
  }

  return (
    <>
      <Card
        orientation="horizontal"
        variant="outlined"
        sx={{
          width: '80%',
          margin: '20px auto',
          backgroundColor: 'rgba(245,245,245,0.87)',
        }}
      >
        <CardOverflow>
          <AspectRatio ratio="1" sx={{width: '175px'}}>
            <img
              style={{height: '100%'}}
              src={productImage}
              srcSet={productImage}
              loading="lazy"
              alt={product.title}
            />
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Box
            sx={{
              margin: '0',
              display: 'flex',
              alignItems: 'center',
              width: '98%',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="text"
              onClick={() => navigate(`/products/${product._id}`)}
              sx={{
                color: 'green',
                fontSize: '16px',
                display: 'flex',
                justifyContent: 'start',
                wordWrap: 'break-word',
                '&:hover': {color: 'rgb(49,172,239)'},
                marginTop: '10px',
              }}
            >
              {product.title}
            </Button>
            <Typography
              noWrap
              sx={{
                letterSpacing: -0.25,
                color: 'text.secondary',
                fontSize: 18,
                marginLeft: '10px',
              }}
            >
              Price: <b>{product.price}$</b>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductItem;