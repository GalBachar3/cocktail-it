import { Route, Routes, Navigate } from 'react-router-dom';
import Profile from '../Profile/Profile';
import Cocktails from '../Cocktails/Cocktails';
import Comments from '../Comments/Comments';

const AuthenticatedRoutes = () => (
    <Routes>
        <Route path='/'>
            <Route index element={<>hi</>} />
        </Route>
        <Route path='/profile'>
            <Route index element={<Profile/>} />
        </Route>
        <Route path='/cocktails'>
            <Route index element={<Cocktails/>} />
            <Route path=':cocktailId/comments' index element={<Comments/>} />
        </Route>
        <Route path='*' element={<Navigate to="/" />} />
    </Routes>
);

export default AuthenticatedRoutes;