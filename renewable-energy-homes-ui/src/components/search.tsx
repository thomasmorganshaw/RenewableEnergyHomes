import * as React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { label: 'CO38WR' },
  { label: 'S337ZP' },
  { label: 'SW11AA' },
];

const CustomButton = styled(Button)({
  color: 'white',
  lineHeight: '2.5'
});

interface Props {
  onSearch: any
}

interface State {
  postcode: String
}

class Search extends React.Component<Props, State> {

  state = {
    postcode: ''
  }

  handleChange = (event) => {
    console.log(event)
    this.setState({ postcode: event.target.innerText });
  }

  handleClick = () => {
    if (this.state.postcode.length === 0) return;
    this.props.onSearch(this.state.postcode)
  }

  render() {
    return (

      <header className="App-header">
        <Typography component={'h1'} variant="h6" color="inherit" paragraph>
          Enter full UK postcode
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              onChange={this.handleChange}
              options={top100Films.map((option) => option.label)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}

                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomButton
              onClick={this.handleClick}
              size="large" variant="contained" endIcon={<SearchIcon />} fullWidth>
              Search
            </CustomButton>
          </Grid>
        </Grid>


      </header>
    );
  }
}

export default Search;
