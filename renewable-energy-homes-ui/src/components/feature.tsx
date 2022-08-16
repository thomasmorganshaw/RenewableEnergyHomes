import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const featureBanner = 'https://morganshawwebassets.blob.core.windows.net/assets/shutterstock-solar-home.jpg'

interface Props {
}

interface State {
}

class Feature extends React.Component<Props, State> {

  state = {
  }


  render() {
    return (
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          marginBottom: '20px',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${featureBanner})`,
        }}
      >
        {/* Increase the priority of the hero background image */}
        {<img style={{ display: 'none' }} src={featureBanner} alt="Solar panel roof" />}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)',
          }}
        />
        <Grid container>
          <Grid item md={8}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 4 },
                pr: { md: 0 },
              }}
            >
              <Typography component={'h1'} variant="h2" color="inherit" gutterBottom>
                <strong>Renewable Energy Homes</strong>
              </Typography>
              <Typography component={'h1'} variant="h5" color="inherit" paragraph>
                Find eco-friendly homes with renewable energy installations
              </Typography>
              <Typography component={'h1'} color="inherit" paragraph>
                <ul>
                  <li>Solar panel roof installations</li>
                  <li>Wind turbine generators</li>
                  <li>Battery storage units</li>
                  <li>EV charging points</li>
                </ul>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default Feature;