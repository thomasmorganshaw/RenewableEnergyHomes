import * as React from 'react';
import Typography from '@mui/material/Typography';

interface Props {
    propertyResult: any
}

interface State {

}

class AddressLine extends React.Component<Props, State> {
    static getDerivedStateFromProps(props, state) {
        let arr = []
        if (props.propertyResult === null) return state;
        if (props.propertyResult?.houseName?.length > 0) arr.push(props.propertyResult.houseName)
        if (props.propertyResult?.houseNumber?.length > 0) arr.push(props.propertyResult.houseNumber)
        if (props.propertyResult?.addressLine1?.length > 0) arr.push(props.propertyResult.addressLine1)
        if (props.propertyResult?.addressLine2?.length > 0) arr.push(props.propertyResult.addressLine2)
        if (props.propertyResult?.addressLine3?.length > 0) arr.push(props.propertyResult.addressLine3)
        if (props.propertyResult?.town?.length > 0) arr.push(props.propertyResult.town)
        if (props.propertyResult?.county?.length > 0) arr.push(props.propertyResult.county)
        if (props.propertyResult?.postcode?.length > 0) arr.push(props.propertyResult.postcode)
        state.addressLine = arr.join(", ")
        return state;
    }

    state = {
        addressLine: ''
    }

    render() {
        return (
            <Typography gutterBottom variant="h6" component="div">
                {this.state.addressLine}
            </Typography>
        );
    }
}

export default AddressLine;