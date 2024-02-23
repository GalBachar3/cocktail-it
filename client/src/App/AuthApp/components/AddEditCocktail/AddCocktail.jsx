import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, TextField, Button, Grid, Input, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import getAxiosClient from '../../../../axios'; 
import { useUser } from '../../contexts/UserContext';
import AddEditCocktail from './AddEditCocktail';

const AddCocktail = () => {
 
  const onSubmitHandler = async(newCocktail) => {
    await getAxiosClient().post(`api/cocktails`,{...newCocktail, comments:[]});
  };

  return (
    <AddEditCocktail onSubmitHandler={onSubmitHandler}></AddEditCocktail>
      );
};

export default AddCocktail;
