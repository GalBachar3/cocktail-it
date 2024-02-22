import * as React from 'react';
import getAxiosClient from '../../../../axios';
import { useQuery } from 'react-query';
import Cocktails from './Cocktails';

const AllCocktails = () => {
    const fetchData = async () => {
        const response = await getAxiosClient().get(`api/cocktails`);
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
        {data && <Cocktails cocktails={data} />}
        </>
    )
  };
  
export default AllCocktails;