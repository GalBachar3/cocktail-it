import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, TextField, Button, Grid, Input, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import getAxiosClient from '../../../../axios'; 
import { useUser } from '../../contexts/UserContext';

const CocktailForm = ({ cocktail, onSubmit }) => {
  const {user} = useUser();
  const { register, handleSubmit, setValue, reset } = useForm();

  const onSubmitHandler = async(data) => {
    await getAxiosClient().post(`api/cocktails`,{...data,username: user.username, userId: user._id,comments:[]});
    reset(); // Reset the form after submission
  };

  // Set initial form values when cocktail prop changes
  React.useEffect(() => {
    if (cocktail) {
      Object.entries(cocktail).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [cocktail, setValue]);

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', height: '100%', boxShadow: 4 }}>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          {cocktail ? 'Update Cocktail' : 'Create Cocktail'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                {...register('name')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Category"
                {...register('category')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ingredients"
                {...register('ingredients')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Instructions"
                {...register('instructions')}
                required
              />
            </Grid>
            {/* <Grid item xs={12}>
              <label htmlFor="image">Image</label>
              <Input
                type="file"
                id="image"
                {...register('image')}
                fullWidth
                required
              />
            </Grid> */}
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={cocktail ? <UpdateIcon /> : <AddIcon />}
                sx={{ width: '80%', mt: 2, mb: 2, mx: 'auto' }}
              >
                {cocktail ? 'Update' : 'Insert'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default CocktailForm;
