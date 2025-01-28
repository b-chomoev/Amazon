import { createSlice } from '@reduxjs/toolkit';
import { IProduct, ValidationError } from '../../types';
import { RootState } from '../../app/store';
import { createProduct, getOneProduct, getProducts } from './productsThunk';

interface ProductInterface {
  products: IProduct[];
  product: IProduct | null;
  creatingLoading: boolean;
  createOneProductLoading: boolean;
  creatingError: ValidationError | null;
  error: boolean;
}

const initialState: ProductInterface = {
  products: [],
  product: null,
  createOneProductLoading: false,
  creatingLoading: false,
  creatingError: null,
  error: false,
};

export const selectProducts = (state: RootState) => state.products.products;
export const selectProduct = (state: RootState) => state.products.product;
export const selectAddProductsLoading = (state: RootState) => state.products.creatingLoading;
export const selectCreateError = (state: RootState) => state.products.creatingError;
export const selectCreateOneProductLoading = (state: RootState) => state.products.createOneProductLoading;

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.creatingLoading = true;
        state.error = false;
      })
      .addCase(getProducts.fulfilled, (state, {payload: products}) => {
        state.products = products;
        state.creatingLoading = false;
        state.error = false;
      })
      .addCase(getProducts.rejected, (state) => {
        state.creatingLoading = false;
        state.error = true;
      })

      .addCase(getOneProduct.pending, (state) => {
        state.createOneProductLoading = true;
        state.error = false;
      })
      .addCase(getOneProduct.fulfilled, (state, {payload: product}) => {
        state.product = product;
        state.createOneProductLoading = false;
        state.error = false;
      })
      .addCase(getOneProduct.rejected, (state) => {
        state.createOneProductLoading = false;
        state.error = true;
      })

      .addCase(createProduct.pending, (state) => {
        state.creatingLoading = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.creatingLoading = false;
      })
      .addCase(createProduct.rejected, (state) => {
        state.creatingLoading = false;
      });
  }
});

export const productsReducer = productsSlice.reducer;