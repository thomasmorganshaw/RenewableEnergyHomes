import * as React from 'react';
import Moment from 'moment';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import AddressLine from '../components/addressLine';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import PropertyFeature from '../components/propertyFeature';

const CustomButton = styled(Button)({
  color: 'white',
  lineHeight: '2.5'
});

interface Props {
  propertyResult: any
}

interface State {
}

class PropertyInfo extends React.Component<Props, State> {

  state = {}

  formatDate = (value) => {
    if (value === null) return "-";
    let date = Moment(value)
    return date.format("MMM YYYY");
  }

  formatCurrency = (value) => {
    if (value === null) return "-";
    return value.toLocaleString('en-UK', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    })
  }

  render() {
    return (
      <Card variant="outlined">
        <CardContent>
          <AddressLine propertyResult={this.props.propertyResult} />
          <Divider />
          <Grid container>
            <Grid item xs={4} md={3}>
              <Box sx={{ m: 2 }}>
                <Stack spacing={1}>
                  <label>Last Sold</label>
                  <label><strong>{
                    this.formatDate(this.props.propertyResult.dateOfSale)
                  }</strong></label>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={4} md={3}>
              <Box sx={{ m: 2 }}>
                <Stack spacing={1}>
                  <label>Sale Amount</label>
                  <label><strong>{
                    this.formatCurrency(this.props.propertyResult.saleAmount)
                  }</strong></label>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={4} md={6}>
              <Box sx={{ m: 2 }}>
                <Stack spacing={1}>
                  <label>EPC Rating</label>
                  <label><strong>{this.props.propertyResult.epcRating}</strong></label>
                </Stack>
              </Box>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={6}>
              {this.props.propertyResult.propertyFeatures.map(feature =>
                <PropertyFeature key={feature.propertyFeatureId} feature={feature} />
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Button variant="outlined" size="large" fullWidth>
                Make Booking
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default PropertyInfo;