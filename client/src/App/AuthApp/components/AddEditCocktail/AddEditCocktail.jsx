import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, TextField, Button, Grid, Input, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { getRandomCocktail } from '../../../../axios/cocktail';
import { useUser } from '../../contexts/UserContext';
import { getClient, uploadRequest } from '../../../../axios';
import axios from 'axios';
import { addEditCocktailFormSchema } from './validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { env } from '../../../../env';


const CocktailForm = ({ cocktail = null, onSubmitHandler }) => {
  const {user} = useUser();
  const { register, handleSubmit, setValue, reset, watch } = useForm({ resolver: zodResolver(addEditCocktailFormSchema) });
  const image = watch('image');
  const [randomImageUrl, setRandomImageUrl] = useState('');

  const handleImageChange = (event) => {
    setValue('image', event.target.files[0]);
    setRandomImageUrl('');
  };

  const getImageSrc = () => {
    if(!!cocktail && image === cocktail.image){
      return cocktail.image;
    }
    if(randomImageUrl !== ''){
      return randomImageUrl;
    }
    if(!!image){
      return URL.createObjectURL(image);
    }
  }

  const onSubmit = async (data) => {
    const imageFormData = new FormData();
    imageFormData.append('image', image);
  
    try {      
      let imageUrl = cocktail? cocktail.image : '';
        if(image && cocktail?.image !== image){
          const response = await uploadRequest(imageFormData);
          
          imageUrl = response.data.imageUrl;
        }

      await onSubmitHandler({
        ...data,
        username: user.username,
        userId: user._id,
        image: imageUrl,
        _id: cocktail?._id
      });
  
      reset();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const generateRandomCocktail = async () => {
    const randomCocktail = await getRandomCocktail();
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setRandomImageUrl(dataUrl);
    };
    reader.readAsDataURL(randomCocktail.image);

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
    <Card sx={{ maxWidth: 400, margin: 'auto', height: '100%', overflow: 'auto',boxShadow: 4 }}>
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
          { image && (
            <img
              src={getImageSrc()}
              alt="Uploaded Image"
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
