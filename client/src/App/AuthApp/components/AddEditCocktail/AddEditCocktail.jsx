import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, TextField, Button, Grid, Input, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import getAxiosClient from '../../../../axios'; 
import { getRandomCocktail } from '../../../../axios/cocktail';
import { useUser } from '../../contexts/UserContext';

const CocktailForm = ({ cocktail = null, onSubmitHandler }) => {
  const {user} = useUser();
  const { register, handleSubmit, setValue, reset } = useForm();

  const onSubmit = async(data) => {
    await onSubmitHandler({...data,username: user.username, userId: user._id});
    reset();
  };

  const generateRandomCocktail = async () => {
    const randomCocktail = await getRandomCocktail();

    Object.entries(randomCocktail).forEach(([key, value]) => {
      setValue(key, value);
    });
  }

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
        <form onSubmit={handleSubmit(onSubmit)}>
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
            {
              !cocktail && <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShuffleIcon />}
                sx={{ width: '80%', mt: 2, mb: 2, mx: 'auto' }}
                onClick={async () => {await generateRandomCocktail()}}
              >
                Generate random cocktail
              </Button>
            </Grid>
            }
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default CocktailForm;
