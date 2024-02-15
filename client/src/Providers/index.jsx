import { CssBaseline } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeProvider from './ThemeProvider';
import UserProvider from './UserProvider';

const queryClient = new QueryClient();

export const Providers = ({ children }) => (
    <GoogleOAuthProvider clientId='811462408750-5a7dvfi38i6burms99b3i31lv5ibk5qh.apps.googleusercontent.com'>
        <ThemeProvider>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    {children}
                </UserProvider>
            </QueryClientProvider>
        </ThemeProvider>
    </GoogleOAuthProvider>
);