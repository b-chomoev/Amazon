import Layout from './components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import MainPage from './containers/MainPage';
import { Typography } from '@mui/material';
import RegisterPage from './features/users/RegisterPage';
import LoginPage from './features/users/LoginPage';
import AddNewProduct from './containers/AddNewProduct';
import ProductPage from './containers/ProductPage';

const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/products/addNewProduct" element={<AddNewProduct />} />
        <Route path="*" element={<Typography variant="body1" sx={{width: '100%', fontSize: '80px', color: 'white', marginTop: '15%', textAlign: 'center'}}>Page is not found!</Typography>}/>
      </Routes>
    </Layout>
  );
};

export default App;
