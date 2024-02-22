import { Route, Routes, Navigate } from 'react-router-dom';
import Profile from '../Profile/Profile';
import MyCocktails from "../Cocktails/MyCocktails";
import Comments from '../Comments/Comments';
import AllCocktails from '../Cocktails/AllCocktails';

const AuthenticatedRoutes = () => (
    <Routes>
        <Route path='/'>
            <Route index element={<>hi</>} />
        </Route>
        <Route path='/profile'>
            <Route index element={<Profile/>} />
        </Route>
        <Route path='/cocktails'>
            <Route index element={<AllCocktails/>} />
            <Route path=':cocktailId/comments' index element={<Comments/>} />
        </Route>
        <Route path='/my-cocktails'>
            <Route index element={<MyCocktails/>} />
            <Route path=':cocktailId/comments' index element={<Comments/>} />
        </Route>
        <Route path='*' element={<Navigate to="/" />} />
    </Routes>
);

export default AuthenticatedRoutes;