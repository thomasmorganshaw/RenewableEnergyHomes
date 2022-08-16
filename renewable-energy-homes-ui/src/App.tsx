import React from 'react';
import './App.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Axios, { AxiosError } from 'axios';
import Title from './components/title';
import Search from './components/search';
import SearchResult from './components/searchResult';
import Map from './components/map';
import Footer from './components/footer';
import CircularProgress from '@mui/material/CircularProgress';
import Feature from './components/feature';
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  typography: {
    fontFamily: [
      '"Segoe UI"',
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h2: {
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    }
  },
  palette: {
    primary: {
      main: '#7FB241',
    },
    secondary: {
      main: '#f50057',
    }
  },
});


interface Props {

}

interface State {

}

class App extends React.Component<Props, State> {
  state = {
    isSearching: false,
    searchResults: null,
    postcodeCoordinates: null
  }

  handleSearch = async (postcode: String) => {
    console.log("search", postcode)
    this.resetState();

    this.setState({
      isSearching: true
    })

    var url = `${process.env.REACT_APP_API_BASE_URL}/api/property/search/${postcode}`
    var response: any = await Axios
      .get(url)
      .catch(() => this.handleError)

    console.log("search response", response)

    this.setState({
      postcodeCoordinates: response.data.postcodeLocation,
      searchResults: response.data.propertySales,
      isSearching: false
    })
  };

  handleError = (err: AxiosError) => {
    console.error("ERROR!", err)
  }

  showSearchResults = () => {
    return !this.state.isSearching && this.state.searchResults !== null;
  }

  showMap = () => {
    return !this.state.isSearching && this.state.postcodeCoordinates !== null;
  }

  resetState = () => {
    this.setState({
      searchResults: null,
      postcodeCoordinates: null
    })
  }

  render() {
    return (
      <ThemeProvider theme={appTheme}>
        <Container maxWidth="lg">
          <Title />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Feature />
              <Search onSearch={this.handleSearch} />
            </Grid>
            <Grid item xs={12} md={this.state.isSearching ? 12 : 6}>
              {this.state.isSearching && <div className="App-spinner"><CircularProgress /></div>}
              {this.showSearchResults() && <SearchResult results={this.state.searchResults} />}

            </Grid>
            <Grid item xs={12} md={6}>
              {this.showMap() && <Map coordinates={this.state.postcodeCoordinates} />}
            </Grid>
          </Grid>
          <Footer />
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;