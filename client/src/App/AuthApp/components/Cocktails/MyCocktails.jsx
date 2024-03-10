import * as React from 'react';
import {useState} from 'react';
import {getClient} from '../../../../axios';
import { useQuery } from 'react-query';
import { useUser } from '../../contexts/UserContext';
import Cocktails from './Cocktails';

const MyCocktails = () => {
    const {user} = useUser();
    const [_, toggle] = useState(false);

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
        {<Cocktails isDeletable={true} cocktails={data?.filter(x=>x.userId === user._id)} />}
        </>
    )
  };
  
export default MyCocktails;