import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Files from '../components/Files';

const Container = styled.div`
  transition: all 700ms;
`;

const Homepage:React.FC = () => {
  return (
    <Container>
        <Navbar />
        <Files file={{}} allFiles={[]} />
    </Container>
  )
}

export default Homepage;