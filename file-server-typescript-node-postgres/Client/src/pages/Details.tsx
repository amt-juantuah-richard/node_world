import React from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Detail from '../components/Detail';


const Container = styled.div``;

const Details:React.FC = () => {
  return (
    <Container>
      <Navbar />
      <Detail />
    </Container>
  )
}

export default Details