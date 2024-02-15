import { Column, Row } from '../../Layout';
import AppBar from './components/AppBar';
import AuthenticatedRoutes from './components/Routes';

const AuthenticatedApp = () => (
    <Column sx={{ height: 1, width: 1 }}>
        <AppBar />
        <Row sx={{ height: 1, width: 1, padding: 1 }}>
            <Column sx={{ width: 1, height: 1 }}>
                <AuthenticatedRoutes />
            </Column>
        </Row>
    </Column>
);

export default AuthenticatedApp;