import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import Face from '@mui/icons-material/Face';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import CardMedia from '@mui/material/CardMedia';
import { height, margin } from '@mui/system';
import { Button, TextField, List, ListItem, ListItemText } from '@mui/material';


const Cocktails = () => {
    const cocktails = [{name: "aaa", username:"qqqw", instructions: "put absfbas akbsfblkjsabkf jakbbsfsbasfs", ingredients: "a jksd,sddss,dsdssd,sdsdds,sdsd"},{name: "aaa", username:"qqqw", instructions: "put absfbas akbsfblkjsabkf jakbbsfsbasfs", ingredients: "a jksd,sddss,dsdssd,sdsdds,sdsd"},{name: "aaa", username:"qqqw", instructions: "put absfbas akbsfblkjsabkf jakbbsfsbasfs", ingredients: "a jksd,sddss,dsdssd,sdsdds,sdsd"},{name: "aaa", username:"qqqw", instructions: "put absfbas akbsfblkjsabkf jakbbsfsbasfs", ingredients: "a jksd,sddss,dsdssd,sdsdds,sdsd"},{name: "aaa", username:"qqqw", instructions: "put absfbas akbsfblkjsabkf jakbbsfsbasfs", ingredients: "a jksd,sddss,dsdssd,sdsdds,sdsd"},{name: "aaa", username:"qqqw", instructions: "put absfbas akbsfblkjsabkf jakbbsfsbasfs", ingredients: "a jksd,sddss,dsdssd,sdsdds,sdsd"},{name: "aaa", username:"qqqw", instructions: "put absfbas akbsfblkjsabkf jakbbsfsbasfs", ingredients: "a jksd,sddss,dsdssd,sdsdds,sdsd"},{name: "aaa", username:"qqqw", instructions: "put absfbas akbsfblkjsabkf jakbbsfsbasfs", ingredients: "a jksd,sddss,dsdssd,sdsdds,sdsd"}];
  
    return (
      <Box sx={{height: "100%", overflow: "auto"}}>
        {cocktails.map((cocktail, index) => (
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
        
        <IconButton variant="plain" size="sm">
          <ModeCommentOutlined />
        </IconButton>
        
      </Box>
        <IconButton size="sm" variant="plain">
          <Face />
        </IconButton>
        <Input
          variant="plain"
          size="sm"
          placeholder="Add a comment…"
          sx={{ flex: 1, px: 0, '--Input-focusedThickness': '0px' }}
        />
        <Button underline="none" role="button">
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



















/*const Cocktails = () => {
    const cocktails = [{name: "aaa", username:"qqqw", instructions: "put absfbas akbsfblkjsabkf jakbbsfsbasfs", ingredients: ["a","b"], comments:['sdds','sdds']},{name: "aaa", username:"qqqw", instructions: "put absfbas akbsfblkjsabkf jakbbsfsbasfs", ingredients: ["a jksd,sddss,dsdssd,sdsdds,sdsd"], comments:[]}];
  
    return (
      <Box sx={{height: "100%"}}>
        {cocktails.map((cocktail, index) => (
           <Card>
           <CardMedia
             component="img"
             alt={cocktail.name}
             height="200"
             src={cocktail.imageUrl}
           />
           <CardContent>
             <Typography variant="h5" component="div">
               {cocktail.name}
             </Typography>
             <Typography variant="body1" color="text.secondary">
               {cocktail.instructions}
             </Typography>
             <Typography variant="h6" component="div" mt={2}>
               Ingredients:
             </Typography>
             <List>
               {cocktail.ingredients.map((ingredient, index) => (
                 <ListItem key={index}>
                   <ListItemText primary={ingredient} />
                 </ListItem>
               ))}
             </List>
             <TextField
               label="Add a comment"
               variant="outlined"
               fullWidth
               margin="normal"
             />
             <Button variant="contained" color="primary" fullWidth>
               Add Comment
             </Button>
             <Typography variant="h6" component="div" mt={2}>
               Existing Comments:
             </Typography>
             <List>
               {cocktail.comments.map((comment, index) => (
                 <ListItem key={index}>
                   <ListItemText primary={comment} />
                 </ListItem>
               ))}
             </List>
           </CardContent>
         </Card>
        ))}
      </Box>
    );
  };
  
export default Cocktails;*/