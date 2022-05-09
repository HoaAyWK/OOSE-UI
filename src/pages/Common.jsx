import React from 'react';
import { Container } from '@mui/material';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer';

const Common = ({ children }) => {
    return (
        <>
            <Navbar />
            <Container maxWidth='xl'>
                {children}
            </Container>
            <Footer />
        </>
    )
}

export default Common