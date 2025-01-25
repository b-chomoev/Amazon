import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../../types';
import { RootState } from '../../app/store';
import { createProduct, getOneProduct, getProducts } from './productsThunk';

interface ProductInterface {
  products: IProduct[];
  product: IProduct | null;
  loadings: {
    addProductLoading: boolean;
    getProductLoading: boolean;
    getOneProductLoading: boolean;
  },
  error: boolean;
}

const initialState: ProductInterface = {
  products: [],
  product: null,
  loadings: {
    addProductLoading: false,
    getProductLoading: false,
    getOneProductLoading: false,
  },
  error: false,
};

export const selectProducts = (state: RootState) => state.products.products;
export const selectProduct = (state: RootState) => state.products.product;
export const selectGetProductsLoading = (state: RootState) => state.products.loadings.getProductLoading;
export const selectOneGetProductsLoading = (state: RootState) => state.products.loadings.getOneProductLoading;
export const selectAddProductsLoading = (state: RootState) => state.products.loadings.addProductLoading;

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loadings.getProductLoading = true;
        state.error = false;
      })
      .addCase(getProducts.fulfilled, (state, {payload: products}) => {
        state.products = products;
        state.loadings.getProductLoading = false;
        state.error = false;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loadings.getProductLoading = false;
        state.error = true;
      })

      .addCase(getOneProduct.pending, (state) => {
        state.loadings.getOneProductLoading = true;
        state.error = false;
      })
      .addCase(getOneProduct.fulfilled, (state, {payload: product}) => {
        state.product = product;
        state.loadings.getOneProductLoading = false;
        state.error = false;
      })
      .addCase(getOneProduct.rejected, (state) => {
        state.loadings.getOneProductLoading = false;
        state.error = true;
      })

      .addCase(createProduct.pending, (state) => {
        state.loadings.addProductLoading = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loadings.addProductLoading = false;
      })
      .addCase(createProduct.rejected, (state) => {
        state.loadings.addProductLoading = false;
      });
  }
});

export const productsReducer = productsSlice.reducer;