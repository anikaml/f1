import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    useNextVariants: true,
    fontSize: 18,
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    type: "light",
    primary: {
      light: 'rgb(221, 221, 221)',
      main: "#e10700",
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#E2B1AF',
      main: '#1f1f26',
      contrastText: '#FFF',
    },
    text: {
      primary: '#111030',
    },
    error: {
      main: '#ff0033',
    },
    background: {
      default: '#FFF',
    }
  },
  mixins: {
    toolbar: {
      minHeight: 64,
      '@media (min-width:0px) and (orientation: landscape)': {
        minHeight: 64,
      },
      '@media (min-width:600px)': {
        minHeight: 64,
      },
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          height: "100%",
          margin: 0,
          padding: 0,
        },
        body: {
          height: "100%",
        },
      }
    },
    MuiInput: {
      underline: {
        "&&&&:hover:before": {
          borderBottom: "none",
        }
      }
    }
  },
});

theme.typography.body1 = {
  fontSize: '1rem',
  '@media (max-width:360px)': {
    fontSize: '0.85rem',
  }
};

theme.typography.body2 = {
  fontSize: '0.875rem',
  '@media (max-width:350px)': {
    fontSize: '0.7rem',
  }
};

theme.typography.h2 = {
  fontSize: '4.28rem',
  fontWeight: 400,
};

theme.typography.h3 = {
  fontSize: '3.42rem',
  fontWeight: 400,
  '@media (max-width:1140px)': {
    fontSize: '4vw',
  }
};

theme.typography.h6 = {
  fontSize: '1.25rem',
  fontWeight: '500',
  '@media (max-width:360px)': {
    fontSize: '0.9rem',
    fontWeight: '500',
  }
};

theme.typography.caption = {
  fontSize: '0.75rem',
  '@media (max-width:600px)': {
    fontSize: '0.8rem',
  }
};

export default theme;