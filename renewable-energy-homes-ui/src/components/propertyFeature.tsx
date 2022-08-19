import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';

const homeIcon = 'https://morganshawwebassets.blob.core.windows.net/assets/home-icon.png'
const solarIcon = 'https://morganshawwebassets.blob.core.windows.net/assets/solar-icon.png'
const windIcon = 'https://morganshawwebassets.blob.core.windows.net/assets/wind-icon.png'
const evIcon = 'https://morganshawwebassets.blob.core.windows.net/assets/ev-icon.png'

interface Props {
  feature: Feature
}

interface State {

}

class Feature {
  label: string
  propertyFeatureId: number
  propertyId: number
}

class PropertyFeature extends React.Component<Props, State> {
  state = {}

  getIcon(featureId: number) {
    switch (featureId) {
      case 1: return homeIcon
      case 2: return solarIcon
      case 3: return windIcon
      case 4: return evIcon
      default: return;
    }
  }




  render() {
    return (
      <Tooltip title={this.props.feature.label}>
        <img
          style={{ display: 'block', width: '40px', paddingRight: '10px', float: 'left' }}
          src={this.getIcon(this.props.feature.propertyFeatureId)}
          alt={this.props.feature.label} />
      </Tooltip>
    );
  }
}

export default PropertyFeature;