import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 70px;
    width: 300px;
    display: flex;
    flex-flow: column;
    background-color: var(--color-elements);
    border-radius: 5px;
    box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.059);
    &:hover {
        box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.334);
    }
    @media screen and (max-width: 480px) {
        height: 60px;
        width: 300px;
    }
`;

const Label = styled.label`
    height: 15px;
    width: 300px;
    padding-left: 10px;

    @media screen and (max-width: 480px) {
        height: 15px;
    }
`;

const Input = styled.input`
    border: none;
    outline: none;
    height: 55px;
    width: 100%;
    background-color: var(--color-elements);
    &::placeholder {
        color: #C4C4C4;
        font-size: 12px;
    }
`;

type UnstructuredObject = {
    [key: string]: any;
}


const FormInput:React.FC = (props: UnstructuredObject) => {
  return (
    <Container>
        <Label>{props.label}</Label>
        <Input type={props.inputtype} placeholder={props.placeholder} />
    </Container>
  )
}

export default FormInput