import { Grid, Paper, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { Center, Column } from '../../../../Layout';
import logo from '../../../../Assets/logo.png'

const UserAdmission = ({ formTitle, to, message, FormContent }) => {
    const { palette: { mode } } = useTheme();

    return (
        <Grid sx={{width: '100%', height:'100%',display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor: '#f9f5da'}}>
        <img src={logo} alt='logo' height='100px' width='400px' style={{alignSelf: 'center'}}></img>
        <br/>
        <Paper elevation={5} sx={{ width: 400, padding: 2 }}>
            <Column sx={{ gap: 2, alignItems: 'center' }}>
                <Typography fontSize={30}>{formTitle}</Typography>
                <FormContent />
                <Center>
                    <Link to={to} style={{ color: mode === 'light' ? 'black' : 'white' }}>
                        <Typography sx={{ fontSize: 14 }}>
                            {message}
                        </Typography>
                    </Link>
                </Center>
            </Column>
        </Paper>
        </Grid>
        
    );
};

export default UserAdmission;