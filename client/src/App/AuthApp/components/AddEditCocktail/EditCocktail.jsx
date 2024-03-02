import React from 'react';
import {getClient} from '../../../../axios'; 
import AddEditCocktail from './AddEditCocktail';
import { useLocation } from 'react-router-dom';

const EditCocktail = () => {
  const location = useLocation();
  const onSubmitHandler = async(updatedCocktail) => {
    await getClient().put(`api/cocktails/${updatedCocktail._id}`, updatedCocktail);
  };

  return (
    <AddEditCocktail cocktail={location.state ? location.state.cocktail : null} onSubmitHandler={onSubmitHandler}></AddEditCocktail>
      );
};

export default EditCocktail;
