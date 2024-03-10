const lightTheme = {
    palette: {
        mode: 'light',
        primary: {
           
            main: '#a2bae6'
        },
        secondary: {
            main: '#f9f5da'
        },
        background: {
            // default: '#35A29F',
            // paper: '#CBF1F5'
        }
    }
};

const darkTheme = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#03C988'
        },
        secondary: {
            main: '#13005A'
        },
    },
};

export const getTheme = mode => (
    {
        ...(mode === 'light') ? lightTheme : darkTheme,
        typography: {

            button: {
                textTransform: 'none'
            }
        },
        components: {
            MuiListItem: {
                styleOverrides: {
                    root: {
                        padding: '4px 8px 4px 0'
                    }
                }
            },
            MuiCollapse: {
                styleOverrides: {
                    wrapper: { width: '100%' },
                    wrapperInner: { width: '100%' }
                }
            },
        }
    }
);