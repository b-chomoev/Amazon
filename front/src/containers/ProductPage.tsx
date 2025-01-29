import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectGetOneProductLoading, selectProduct } from '../features/products/productsSlice';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getOneProduct } from '../features/products/productsThunk';
import { Box, CircularProgress, Container, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { mainApiUrl } from '../globalConstants';

const ProductPage = () => {
  const product = useAppSelector(selectProduct);
  const loading = useAppSelector(selectGetOneProductLoading);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getOneProduct(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    product && (
      <Container sx={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '20px', mt: 4 }}>
        <Card sx={{ display: 'flex', flexWrap: 'wrap', boxShadow: 3, borderRadius: '12px', padding: '20px' }}>
          {/* Image Section */}
          <CardMedia
            component="img"
            image={mainApiUrl + '/' + product.image}
            alt={product.title}
            loading="lazy"
            sx={{
              width: { xs: '100%', sm: '400px' },
              height: 'auto',
              borderRadius: '12px',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': { transform: 'scale(1.02)' },
            }}
          />

          {/* Content Section */}
          <CardContent sx={{ flex: '1', ml: { xs: 0, sm: 3 }, mt: { xs: 2, sm: 0 } }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {product.description}
            </Typography>
            <Typography variant="h6" color="primary">
              ${product.price}
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              <strong>Category:</strong> {product.category}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Seller:</strong> {product.seller.displayname}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Phone:</strong> {product.seller.phone}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    )
  );
};

export default ProductPage;
