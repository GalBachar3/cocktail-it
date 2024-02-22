import * as React from 'react';
import getAxiosClient from '../../../../axios';
import { useQuery } from 'react-query';
import { useUser } from '../../contexts/UserContext';
import Cocktails from './Cocktails';

const MyCocktails = () => {
    const {user} = useUser();
    console.log("sdsssss", user)

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
        {data && <Cocktails cocktails={data.filter(x=>x.userId === user._id)} />}
        </>
    )
  };
  
export default MyCocktails;