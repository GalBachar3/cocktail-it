import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, TextField, Button, Grid, Input, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import getAxiosClient from '../../../../axios'; 
import { useUser } from '../../contexts/UserContext';
import AddEditCocktail from './AddEditCocktail';
import { useLocation } from 'react-router-dom';


const EditCocktail = () => {
  const location = useLocation();
  const onSubmitHandler = async(updatedCocktail) => {
    await getAxiosClient().put(`api/cocktails/${updatedCocktail._id}`, updatedCocktail);
  };

  return (
    <AddEditCocktail cocktail={location.state ? location.state.cocktail : null} onSubmitHandler={onSubmitHandler}></AddEditCocktail>
      );
};

export default EditCocktail;
