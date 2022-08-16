 import * as React from 'react';
 import GoogleMap from './googleMap';
 import Card from '@mui/material/Card';

interface Props {
    coordinates:any;
}
 
interface State {
    
}
 
class Map extends React.Component<Props, State> {
    state = {
        zoom: 12,
        lat: this.props.coordinates?.latitude,
        lng: this.props.coordinates?.longitude
    }

    showGoogleMap = () => {
        return this.props.coordinates?.latitude && this.props.coordinates?.longitude;
    }

    render() { 
        return (
            <>
                {!this.showGoogleMap() && <Card className="App-no-map">Oops! We couldn't find that on the map.</Card>}
                {this.showGoogleMap() && <GoogleMap zoom={this.state.zoom} latitude={this.state.lat} longitude={this.state.lng} />}
            </>
        );
    }
}
 
export default Map;