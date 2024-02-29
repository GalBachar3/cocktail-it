import React from 'react';
import {getClient} from '../../../../axios'; 
import AddEditCocktail from './AddEditCocktail';

const AddCocktail = () => {
 
  const onSubmitHandler = async(newCocktail) => {
    await getClient().post(`api/cocktails`,{...newCocktail, comments:[]});
  };

  return (
    <AddEditCocktail onSubmitHandler={onSubmitHandler}></AddEditCocktail>
      );
};

export default AddCocktail;
