import { ProductMutation } from '../types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import NewPostForm from '../features/products/components/NewProductsForm/NewProductForm';
import { selectAddProductsLoading } from '../features/products/productsSlice';
import { createProduct } from '../features/products/productsThunk';
import { selectUser } from '../features/users/usersSlice';

const AddNewPost = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectAddProductsLoading);
  const user = useAppSelector(selectUser);

  const onFormSubmit = async (product: ProductMutation) => {
    if (user !== null) {
      await dispatch(createProduct({product, token: user.token})).unwrap();
      navigate('/');
    }
  };

  return (
    <>
      <NewPostForm isLoading={isCreating} onSubmit={onFormSubmit}/>
    </>
  );
};

export default AddNewPost;