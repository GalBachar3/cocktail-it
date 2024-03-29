import * as React from 'react';
import {getClient} from '../../../../axios';
import { useQuery } from 'react-query';
import Cocktails from './Cocktails';
import { NoCocktails } from './NoCocktails';

const AllCocktails = () => {
    const fetchData = async () => {
        const response = await getClient().get(`api/cocktails`);
        return response.data;
      };

      const { data, isLoading, error } = useQuery('cocktails', fetchData);

      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error fetching data: {error.message}</div>;
      }

    return (
        <>
        {<Cocktails cocktails={data} />}
        </>
    )
  };
  
export default AllCocktails;