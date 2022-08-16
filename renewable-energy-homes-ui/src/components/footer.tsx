import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

interface Props {

}

interface State {

}

class Footer extends React.Component<Props, State> {
    render() {
        return (
            <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="subtitle1"
                        align="center"
                        color="text.secondary"
                        component="p"
                    >
                        Sample Application
                    </Typography>
                    <Typography variant="caption" align="center" display="block" gutterBottom>
                        Thomas Morganshaw
                    </Typography>
                </Container>
            </Box>
        );
    }
}

export default Footer;