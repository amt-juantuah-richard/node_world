import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Files from '../components/Files';

const Container = styled.div``;

const Homepage:React.FC = () => {
  return (
    <Container>
        <Navbar />
        <Files country={{}} allCountries={[]} />
    </Container>
  )
}

export default Homepage