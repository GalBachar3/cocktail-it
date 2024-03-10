import { Box, AppBar as MuiAppBar, Typography } from '@mui/material';
import { Row } from '../../../../Layout';
import { useUser } from '../../../../Providers/UserProvider';
import UserMenu from './UserMenu';
import logo from '../../../../Assets/logo.png'

const AppBar = () => {
    const { user } = useUser();

    return (
        <MuiAppBar position="static" sx={{backgroundColor:'secondary.main' ,zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Row sx={{ width: 1, padding: 1, alignItems: 'center' }}>
                <img src={logo} alt='logo' height='50px' width='150px' style={{alignSelf: 'center'}}></img>
                <Box sx={{ flex: 1 }}/>
                <Typography variant='h6' >Hello, {user?.name}</Typography>
                <UserMenu />
            </Row>
        </MuiAppBar>
    );
};

export default AppBar;