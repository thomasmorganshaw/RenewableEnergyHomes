import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const logo = 'https://morganshawwebassets.blob.core.windows.net/assets/free-leaves-icon.png'

interface Props {

}

interface State {

}

class Title extends React.Component<Props, State> {
  state = {}

  render() {
    return (
      <Toolbar>
        <img style={{ display: 'block', width: '40px', paddingRight: '10px' }} src={logo} alt="Green Company Logo" />
        <Typography
          component={'h1'}
          variant="subtitle1"
          color="inherit"
          align="left"
          noWrap
          sx={{ flex: 1 }}
        >
          Green Company
        </Typography>
        <Button variant="outlined" size="small">
          Login
        </Button>
      </Toolbar>
    );
  }
}

export default Title;