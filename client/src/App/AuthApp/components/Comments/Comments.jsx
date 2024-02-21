import React from 'react';
import { List, ListItem, ListItemText, Typography, Paper, Avatar, Button } from '@mui/material';
import { useNavigate, useLocation, useParams } from 'react-router-dom';


const CocktailComments = () => {
    //TODO take the comments from the cocktail id that passed in params 
    const {cocktailId} = useParams();
    console.log(cocktailId)
    const navigate = useNavigate();
    const location = useLocation();
    const comments = location.state ? location.state.comments : [];

    const handleBackButtonClick = () => {
        navigate('/cocktails');
      };

  return (
    <>
    <Button onClick={handleBackButtonClick}>Back to Cocktail</Button>
    <Paper elevation={3} style={{ padding: '16px', overflow: 'auto' }}>
      <Typography variant="h5" component="div" mb={2}>
        Cocktail Comments
      </Typography>
      <List>
        {comments.map((comment, index) => (
          <ListItem key={index} alignItems="flex-start">
            <Avatar alt={comment.username} />
            <ListItemText
              primary={comment.username}
              secondary={comment.content}
            />
          </ListItem>
        ))}
      </List>
    </Paper>

    </>
      );
};

export default CocktailComments;
