import { createAsyncThunk } from '@reduxjs/toolkit';
import { IProduct, ProductMutation } from '../../types';
import axiosApi from '../../axiosApi';

export const getProducts = createAsyncThunk<IProduct[], void>(
  'products/getProducts',
  async () => {
    const response = await axiosApi<IProduct[]>('/products');
    return response.data;
  });

export const getOneProduct = createAsyncThunk<IProduct, string>(
  'products/getOneProduct',
  async (id) => {
    const response = await axiosApi<IProduct>(`/products/${id}`);
    return response.data;
  });

export const createProduct = createAsyncThunk<void, { product: ProductMutation, token: string }>(
  'products/create',
  async ({product, token}) => {
    const formData = new FormData();

    const keys = Object.keys(product) as (keyof ProductMutation)[];

    keys.forEach((key) => {
      let value = product[key];

      if (value !== null) {
        if (typeof value === 'number') {
          value = value.toString();
        }
        formData.append(key, value);
      }
    });
    await axiosApi.post('/products', formData, {headers: {'Authorization': token}});
  }
);

export const deleteProduct = createAsyncThunk<void, { id: string, token: string }>(
  'products/delete',
  async ({id, token}) => {
    await axiosApi.delete(`/products/${id}`, {headers: {'Authorization': token}});
  }
);