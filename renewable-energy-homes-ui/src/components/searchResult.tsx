import * as React from 'react';
import Stack from '@mui/material/Stack';
import PropertyInfo from '../components/propertyInfo';
import Card from '@mui/material/Card';

interface Props {
    results: any
}

interface State {

}

class SearchResult extends React.Component<Props, State> {
    state = {}

    hasResults = () => {
        return this.props.results?.length !== 0;
    }

    render() {

        const { results } = this.props // object destructuring

        return (
            <>
                {!this.hasResults() && <Card className="App-no-map">No properties found.</Card>}
                {this.hasResults() &&
                    <Stack spacing={2}>
                        {results.map(result =>
                            <PropertyInfo key={result.id} propertyResult={result} />
                        )}
                    </Stack>
                }
            </>
        );
    }
}

export default SearchResult;