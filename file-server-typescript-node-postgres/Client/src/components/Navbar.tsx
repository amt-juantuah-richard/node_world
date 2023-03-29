import { DarkModeOutlined } from '@mui/icons-material';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../Theme';
import { FcDocument, FcFilingCabinet } from 'react-icons/fc';

const Container = styled.div`
    width: 100vw;
    height: 80px;
    display: flex;
    padding-left: 80px;
    padding-right: 80px;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-elements);
    position: sticky;
    top: 0;
    z-index: 2;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.19);
    & a {
      display: content;
      text-decoration: none;
    }
    @media screen and (max-width: 480px) {
      padding-left: 28px;
      padding-right: 28px;
    }
`;
const Div = styled.div`
    display: contents;
    width: 130px;
`;

const Title = styled.h2`
  @media screen and (max-width: 480px) {
    font-size: 14px;
    line-height: 12px;
  }
`;

const Span = styled.span`
  @media screen and (max-width: 480px) {
      font-size: 12px;
    }
`;

const Mode = styled.p`
  width: 100px;
  cursor: pointer;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  color: hsl(0, 0%, 100%);
  opacity: 0.6;
  & svg {
    fill: var(--color-text);
    @media screen and (max-width: 480px) {
      font-size: 11px;
      line-hight: 16px;
    }
  };
  & ${Span} {
    color: var(--color-text);
    font-weight: 600;
    @media screen and (max-width: 480px) {
      font-size: 12px;
      line-hight: 16px;
    }
  }
  &:hover {
    opacity: 1;
  }
  @media screen and (max-width: 480px) {
    width: 85px;
  }
`;

const AuthDiv = styled.div`
    display: flex;
    transition: all 400ms;
    flex-flow: row;
    align-items: center;
    justify-content: space-around;
    height: 60px;
    width: 180px;
    border: 1px solid #04a7c4;
    border-radius: 5px;
`;

const Button = styled.button`
    border-radius: 5px;
    background: #04a7c46c;
    height: 30px;
    width: 75px;
    font-size: 14px;
    border: 1px solid #04a7c4;
    cursor: pointer;
    &:hover {
        background-color: red;
        color: #fff;
    }
`;


const Navbar:React.FC = () => {
  const {theme, themeToggler} = useContext(ThemeContext)
  return (
    <Container>
        <Link to="/">
          <Div>
            <Title>Documents Hub</Title>
            <Title><FcDocument /><FcFilingCabinet/></Title>
          </Div>
        </Link>

        <AuthDiv>
          <Link to="/login"><Button>Login</Button> </Link>
          <Link to="/register"><Button>Register</Button> </Link>
        </AuthDiv>
        <Mode onClick={themeToggler}>
          <DarkModeOutlined />
          <Span>{theme === "light" ? 'Dark Mode' : 'Light Mode'}</Span>
        </Mode>
    </Container>
  )
}

export default Navbar