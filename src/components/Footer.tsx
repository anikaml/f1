import { makeStyles } from '@material-ui/core/styles';
import { Link, Typography } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  footer: {
    width: '100vw',
    padding: '1em 0',
    backgroundColor: theme.palette.primary.main
  },
  typography: {
    color: 'white',
    fontFamily: 'Russo One',
  }
}));


export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
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
    </div>
  )
}