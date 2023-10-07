import React from 'react'
import { styled } from '@mui/material/styles'
import { Link, Typography } from '@mui/material/'
import packageJson from '../../package.json'

const PREFIX = 'Footer'

const classes = {
  footer: `${PREFIX}-footer`,
  typography: `${PREFIX}-typography`,
  version: `${PREFIX}-version`
}

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.footer}`]: {
    width: '100vw',
    padding: '1em 0',
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  [`& .${classes.typography}`]: {
    color: 'white',
    fontFamily: 'Russo One'
  },

  [`& .${classes.version}`]: {
    float: 'left',
    marginLeft: '1em'
  }
}))

export default function Footer(): React.JSX.Element {
  return (
    <Root className={classes.footer}>
      <Typography variant="caption" className={`${classes.typography} ${classes.version}`}>
        Version: {packageJson.version}
      </Typography>
      <Link
        href="https://anikamlodzianowski.com"
        style={{ textDecoration: 'none', display: 'grid', marginRight: '1em' }}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Typography variant="caption" className={classes.typography}>
          {new Date().getFullYear()} Anika Mlodzianowski
        </Typography>
      </Link>
    </Root>
  )
}
