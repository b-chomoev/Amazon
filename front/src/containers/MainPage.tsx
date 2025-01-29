import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectGetProductLoading, selectProducts } from '../features/products/productsSlice';
import Products from '../features/products/components/Products/Products';
import { useEffect } from 'react';
import { getProducts } from '../features/products/productsThunk';

const MainPage = () => {
  const loading = useAppSelector(selectGetProductLoading);
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      {loading ?(
        <CircularProgress />
      ) : (
        <Container>
          <Box sx={{ flexGrow: 1 }}>
            {products.length > 0 ? (
              <Products products={products}/>
            ) : (
              <Typography
                variant="body1"
                sx={{
                  width: '100%',
                  fontSize: '80px',
                  color: 'white',
                  marginTop: '15%',
                  textAlign: 'center',
                }}
              >
                No posts yet!
              </Typography>
            )}
          </Box>
        </Container>
      )}
    </>
  );
};

export default MainPage;