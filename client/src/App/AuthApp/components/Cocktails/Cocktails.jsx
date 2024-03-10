import * as React from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import Face from '@mui/icons-material/Face';
import CardMedia from '@mui/material/CardMedia';
import { Button } from '@mui/material';
import {getClient} from '../../../../axios';
import { useUser } from '../../contexts/UserContext';
import { Delete, Edit } from '@mui/icons-material';
import { NoCocktails } from './NoCocktails';

const Cocktails = ({cocktails, isDeletable = false}) => {
    const [comment, setComment] = useState('');
    const {user} = useUser();
    const navigate = useNavigate();
    const [cocktailsList, setCocktailsList] = useState(cocktails);

    const postComment =  async (cocktail) => {
      const userComment = {username: user.username, content: comment};
      cocktail.comments.push(userComment);
      await getClient().put(`api/cocktails/${cocktail._id}`, cocktail);
    }

    const handleInputChange = (event) => {
      setComment(event.target.value);
    };
  
    const navigateToCocktailComments = cocktail => {
      navigate(`/${isDeletable? 'cocktails': 'my-cocktails'}/${cocktail._id}/comments`,{state: { comments: cocktail.comments }});   }

  const deleteCocktail = async (cocktail) => {
    try {
      await getClient().delete(`api/cocktails/${cocktail._id}`, cocktail);

      const updatedCocktailsList = cocktailsList.filter((c) => c._id !== cocktail._id);
      setCocktailsList(updatedCocktailsList);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCocktail = (cocktail) => {
    navigate(`/my-cocktails/${cocktail._id}/edit-cocktail`,{state: { cocktail: cocktail }});
  }
    
    return (
      <Box sx={{display:'flex', flexDirection: 'column', alignItems:"center"}}>
        {!cocktailsList?.length ? <NoCocktails /> : cocktailsList.map((cocktail, index) => (
          <Card sx={{ m: 2, width: "500px", backgroundColor:'secondary.main' }} key={index}>
            {
                <>
                  <CardContent sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography variant="h3" fontWeight="bold">
                         {cocktail.name}
                    </Typography>
                  </CardContent>
                  {cocktail.image && 
                  <CardMedia
                  component="img"
                  height="194"
                  src={cocktail.image}
                  sx={{ objectFit: "cover" }}
                />}


      <CardContent sx={{display: 'flex', alignItems: 'center'}}>
          <Avatar
            size="sm"
            src="/static/logo.png"
            sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }}
          />
        <Typography fontWeight="lg">{cocktail.username}</Typography>
      </CardContent>
    
      <CardContent>

        <Typography fontSize="sm">
        <Typography variant="h5" fontWeight="bold">
        Instructions:
      </Typography>
      <Typography variant="body1" style={{ fontSize: '1.2rem' }}>
        {cocktail.instructions}
      </Typography>
        </Typography>

        <Typography fontSize="sm">
        <Typography variant="h5" fontWeight="bold">
        Ingredients:
      </Typography>
      <Typography variant="body1" style={{ fontSize: '1.2rem' }}>
        {cocktail.ingredients}
      </Typography>
        </Typography>
    
      </CardContent>
      <CardContent sx={{display: 'flex'}}>
      <Box>
      {isDeletable && <IconButton onClick={() => deleteCocktail(cocktail)} variant="plain" size="sm">
          <Delete />
        </IconButton>}
        {isDeletable && <IconButton onClick={() => updateCocktail(cocktail)} variant="plain" size="sm">
          <Edit />
        </IconButton>}
        <IconButton onClick={() => navigateToCocktailComments(cocktail)} variant="plain" size="sm">
        <Badge badgeContent={cocktail.comments.length} color="secondary">
          <ModeCommentOutlined />
          </Badge>
        </IconButton>
      </Box>
        <IconButton size="sm" variant="plain">
          <Face />
        </IconButton>
        <Input
        value={comment}
        onChange={handleInputChange}
          variant="plain"
          size="sm"
          placeholder="Add a comment…"
          sx={{ flex: 1, px: 0, '--Input-focusedThickness': '0px' }}
        />
        <Button onClick={()=> postComment(cocktail)} underline="none" role="button">
          Post
        </Button>
      </CardContent>
                </>
            }
          </Card>
        ))}
      </Box>
    );
  };
  
export default Cocktails;