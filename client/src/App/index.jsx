import { isEmpty } from 'lodash';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Center } from '../Layout';
import { useUser } from '../Providers/UserProvider';
import AuthenticatedApp from './AuthApp';
import UnauthenticatedApp from './UnauthApp';

const App = () => {
  const { user } = useUser();

  return (
    <BrowserRouter>
      <Center sx={{ height: 1 }}>
        {!isEmpty(user) ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        <ToastContainer autoClose={1500} position='bottom-right' />
      </Center>
    </BrowserRouter>
  );
};

export default App;