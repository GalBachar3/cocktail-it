import { Route, Routes, Navigate } from 'react-router-dom';
import Profile from '../Profile/Profile';

const AuthenticatedRoutes = () => (
    <Routes>
        <Route path='/'>
            <Route index element={<>hi</>} />
        </Route>
        <Route path='/profile'>
            <Route index element={<Profile/>} />
        </Route>
        <Route path='*' element={<Navigate to="/" />} />
    </Routes>
);

export default AuthenticatedRoutes;