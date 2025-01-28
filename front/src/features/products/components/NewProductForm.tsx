import React, { ChangeEvent, useState } from 'react';
import Grid from '@mui/material/Grid2';
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import { ProductMutation } from '../../../types';
import FileFormInput from '../../../components/UI/FileForm/FileFormInput';
import ButtonSpinner from '../../../components/UI/ButtonSpinner/ButtonSpinner';
import { categories } from '../../../globalConstants';

export interface Props {
  onSubmit: (post: ProductMutation) => void;
  isLoading: boolean;
}

const NewPostForm: React.FC<Props> = ({onSubmit, isLoading}) => {
  const [state, setState] = useState<ProductMutation>({
    title: '',
    description: '',
    price: 0,
    image: null,
    category: '',
  });

  const [alert, setAlert] = useState<string>('');

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (state.title.trim().length === 0 && state.description.trim().length === 0 && state.price < 0 && !state.image) {
      setAlert('All fields are required');
      return;
    }

    onSubmit({...state});
  };

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    setState(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setState(prevState => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
    <form
      onSubmit={submitFormHandler}
      style={{
        margin: '10px auto',
        padding: '10px 10px 40px 10px',
        width: '70%',
        borderRadius: '5px'
      }}
    >
      <Typography variant="body1" sx={{width: '100%', fontSize: '50px',  color: 'rgba(41,43,42,0.82)', textAlign: 'center'}}>New Product</Typography>
      <Grid container spacing={2} sx={{mx: 'auto', width: '80%'}}>
        {alert && (<Alert severity="error" sx={{width: '100%' }}>{alert}</Alert>)}
        <Grid size={12}>
          <FormControl fullWidth>
            <InputLabel>Select category for the Product</InputLabel>
            <Select
              id="category"
              variant='outlined'
              name="category"
              label='Category'
              value={state.category}
              onChange={inputChangeHandler}
            >
              {categories.map(category => <MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={12}>
          <TextField
            sx={{width: '100%'}}
            variant="outlined"
            label="Title"
            id="title"
            name="title"
            value={state.title}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            multiline
            sx={{width: '100%'}}
            variant="outlined"
            minRows={2}
            label="Description"
            id="description"
            name="description"
            value={state.description}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            multiline
            sx={{width: '100%'}}
            variant="outlined"
            minRows={2}
            label="Price"
            type="number"
            id="price"
            name="price"
            value={state.price}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid size={12}>
          <FileFormInput
            getImage={getImage}
            label="Image"
            name="image"
          />
        </Grid>
        <Grid size={12}>
          <Button
            sx={{width: '100%'}}
            type="submit"
            disabled={isLoading}
            variant="contained"
          >
            Create
            {isLoading && <ButtonSpinner/>}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewPostForm;