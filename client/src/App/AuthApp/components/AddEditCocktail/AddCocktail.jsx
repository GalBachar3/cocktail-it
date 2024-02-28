import React from 'react';
import getAxiosClient from '../../../../axios'; 
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
