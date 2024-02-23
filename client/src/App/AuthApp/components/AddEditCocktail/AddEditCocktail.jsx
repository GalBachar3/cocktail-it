import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, TextField, Button, Grid, Input, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import getAxiosClient from '../../../../axios'; 
import { getRandomCocktail } from '../../../../axios/cocktail';
import { useUser } from '../../contexts/UserContext';
import axios from 'axios';

const CocktailForm = ({ cocktail = null, onSubmitHandler }) => {
  const {user} = useUser();
  const { register, handleSubmit, setValue, reset, watch } = useForm();
  const image = watch('image');

  const handleImageChange = (event) => {
    setValue('image', event.target.files[0]);
  };

  const onSubmit = async (data) => {
    const imageFormData = new FormData();
    imageFormData.append('image', image);
  
    try {
      // Upload image

      if(true){
        const response = await axios.post('http://localhost:3000/api/upload', imageFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      }
      

      //const imageResponse = await getAxiosClient().post('/upload', imageFormData);
      //const imageData = await imageResponse.data;
  
      // Include image data in the main form data
      const mainFormData = new FormData();
      mainFormData.append('name', data.name);
      mainFormData.append('category', data.category);
      mainFormData.append('ingredients', data.ingredients);
      mainFormData.append('instructions', data.instructions);
      mainFormData.append('image', response.data);  // Use the appropriate property name from the image response
  
      // Handle the main form submission
      await onSubmitHandler({
        ...data,
        username: user.username,
        userId: user._id,
        image: response.data.imageUrl,  // Include the image data in the main form data
      });
  
      reset();  // Reset the form after submission
    } catch (error) {
      console.error('Error:', error);
    }
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


          <Input
            type="file"
            {...register('image')}
            onChange={handleImageChange}
            style={{ marginBottom: '10px' }}
          />
          
          <div style={{ marginTop: '20px' }}>
          {/* {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded Image"
              style={{ maxWidth: '100%', maxHeight: '300px' }}
            />
          )} */}
          {cocktail?.image && (
            <img
              src={cocktail.image}
              style={{ maxWidth: '100%', maxHeight: '300px' }}
            />
          )}
        </div>


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
