import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const Word = styled.span`
    text-align: center;
    margin: 18px auto;
    font-weight: 600;
    font-size: 14px;
`;

const Form = styled.form`
    display: flex;
    flex-flow: column;
`;


const Input = styled.input`
    border: 1px solid #dadada;
    border-radius: 5px;
    outline: none;
    height: 30px;
    width: 100%;
    padding: 5px;
    margin-top: 5px;
    background-color: var(--color-elements);
    &::placeholder {
        color: #C4C4C4;
        font-size: 12px;
    }
`;

const Button = styled.button`
    color: #eeeeee;
    background-color: #04a7c4;
    border-radius: 5px;
    height: 28px;
    width: 100%;
    border: none;
    outline: none;
    font-size: 14px;
    margin-top: 5px;
`;

const SelectBox = styled.div`
    background-color: var(--color-elements);
    box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.059);
    &:hover {
        box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.334);
    }
    border-radius: 5px;
    height: auto;
    padding: 5px;
    width: 350px;
`;



const Login:React.FC = () => {
  return (
    <Container>
        <SelectBox>
                <Form method="post">
                    <Word>Login</Word>
                    <Input type='text' placeholder='Username' />
                    <Input type='text' placeholder='Password' />
                    <Button>Login</Button>
                </Form>
            </SelectBox>
    </Container>
  )
}

export default Login