import { styled } from '@mui/material/styles';
import { Link, Typography } from '@mui/material/';

const PREFIX = 'Footer';

const classes = {
  footer: `${PREFIX}-footer`,
  typography: `${PREFIX}-typography`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.footer}`]: {
    width: '100vw',
    padding: '1em 0',
    backgroundColor: theme.palette.primary.main
  },

  [`& .${classes.typography}`]: {
    color: 'white',
    fontFamily: 'Russo One',
  }
}));


export default function Footer() {


  return (
    <Root className={classes.footer}>
       <Link 
          href="https://anikamlodzianowski.com"
          style={{ textDecoration: 'none'}}
          target="_blank"
          rel="noopener noreferrer"
        >
        <Typography variant="caption" className={classes.typography}>
          {new Date().getFullYear()} Anika Mlodzianowski
        </Typography>
      </Link>
    </Root>
  );
}