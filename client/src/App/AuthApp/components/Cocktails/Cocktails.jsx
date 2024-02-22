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
import getAxiosClient from '../../../../axios';
import { useUser } from '../../contexts/UserContext';

const Cocktails = ({cocktails, isDeletable = false}) => {
    const [comment, setComment] = useState('');
    const {user} = useUser();
    const navigate = useNavigate();

    const postComment =  async (cocktail) => {
      const userComment = {username: user.username, content: comment};
      cocktail.comments.push(userComment);
      await getAxiosClient().put(`api/cocktails/${cocktail._id}`, cocktail);
    }

    const handleInputChange = (event) => {
      setComment(event.target.value);
    };
  
    const navigateToCocktailComments = cocktail => {
        navigate(`/${isDeletable? 'cocktails': 'my-cocktails'}/${cocktail.id}/comments`,{state: { comments: cocktail.comments }});
   }
    
    return (
      <Box sx={{height: "100%", overflow: "auto"}}>
        {cocktails && cocktails.map((cocktail, index) => (
          <Card sx={{ m: 2 }} key={index}>
            {
                <>
                  <CardContent sx={{display: 'flex', justifyContent: 'center'}}>
                    <Typography variant="h3" fontWeight="bold">
                         {cocktail.name}
                    </Typography>
                  </CardContent>
                  {cocktail.imageUrl && 
                  <CardMedia
                    component="img"
                    height="194"
                    image={cocktail.imageUrl}
                    alt="Paella dish"
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