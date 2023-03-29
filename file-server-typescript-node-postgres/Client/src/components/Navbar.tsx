import { DarkModeOutlined } from '@mui/icons-material';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../Theme';

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



const Navbar:React.FC = () => {
  const {theme, themeToggler} = useContext(ThemeContext)
  return (
    <Container>
        <Link to="/">
          <Div>
            <Title>Where in the world...</Title>
            <Span>is that country?</Span>
          </Div>
        </Link>
        <Mode onClick={themeToggler}>
          <DarkModeOutlined />
          <Span>{theme === "light" ? 'Dark Mode' : 'Light Mode'}</Span>
        </Mode>
    </Container>
  )
}

export default Navbar